import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Camera, Trash2 } from 'lucide-react';
import { evidenceStorageService } from '../services/evidenceStorageService';
import { evidenceRepo } from '../storage';
import { Evidence } from '../types';
import { v4 as uuid } from 'uuid';
import { useToast } from './Toast';
import { useI18n } from '../i18n';
import { useApp } from '../context/AppContext';
import { processEvidenceImage, validateFileSize, formatFileSize } from '../services/imageProcessingService';

interface EvidenceUploadProps {
  auditId: string;
  findingId?: string;
  checklistItemId?: string;
  correctiveActionId?: string;
  facilityId?: string;
  onEvidenceChange?: () => void;
}

interface EvidenceWithPreview extends Evidence {
  previewUrl?: string;
}

const MAX_INPUT_SIZE = 20 * 1024 * 1024; // 20MB max input size
const ACCEPTED_TYPES = 'image/jpeg,image/png,image/webp,image/heic,image/heif';

export default function EvidenceUpload({
  auditId,
  findingId,
  checklistItemId,
  correctiveActionId,
  facilityId,
  onEvidenceChange,
}: EvidenceUploadProps) {
  const { currentUser } = useApp();
  const toast = useToast();
  const { t } = useI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [evidenceList, setEvidenceList] = useState<EvidenceWithPreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

  // Load existing evidence
  useEffect(() => {
    loadEvidence();
  }, [auditId, findingId, checklistItemId, correctiveActionId]);

  const loadEvidence = async () => {
    try {
      const allEvidence = evidenceRepo.getAll();
      const filtered = allEvidence.filter(e => {
        if (correctiveActionId) return e.correctiveActionId === correctiveActionId;
        if (findingId) return e.findingId === findingId;
        if (checklistItemId) return e.checklistItemId === checklistItemId;
        return e.auditId === auditId;
      });

      // Load previews
      const withPreviews = await Promise.all(
        filtered.map(async (e) => {
          const url = await evidenceStorageService.getObjectUrl(e.id);
          return { ...e, previewUrl: url || undefined };
        })
      );

      setEvidenceList(withPreviews);
    } catch (error) {
      console.error('Failed to load evidence:', error);
    }
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      evidenceList.forEach(e => {
        if (e.previewUrl) {
          evidenceStorageService.revokeObjectUrl(e.previewUrl);
        }
      });
    };
  }, [evidenceList]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (allow large files for processing)
    if (!validateFileSize(file, 20)) {
      toast.error(t('validation.fileTooLarge'), 'Max: 20MB');
      return;
    }

    // Show processing state
    setUploading(true);
    toast.info('Processing image...');

    try {
      // Process image (convert, resize, compress)
      const processed = await processEvidenceImage(file, {
        maxWidth: 1920,
        maxHeight: 1920,
        quality: 0.8,
        outputFormat: 'image/jpeg',
      });

      // Convert blob to File for storage
      const optimizedFile = new File(
        [processed.blob],
        processed.originalName.replace(/\.[^/.]+$/, '') + '.jpg',
        { type: processed.outputType }
      );

      setSelectedFile(optimizedFile);
      setPreview(processed.previewUrl);
      
      // Show compression results
      const reduction = ((processed.originalSize - processed.optimizedSize) / processed.originalSize * 100).toFixed(1);
      toast.success(
        'Image optimized',
        `${formatFileSize(processed.originalSize)} → ${formatFileSize(processed.optimizedSize)} (${reduction}% reduction)`
      );
    } catch (error) {
      console.error('Image processing failed:', error);
      toast.error('Image processing failed', error instanceof Error ? error.message : 'Please try another image');
      setSelectedFile(null);
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !currentUser) return;

    setUploading(true);
    try {
      const evidenceId = uuid();
      
      // Save to IndexedDB
      await evidenceStorageService.save(
        evidenceId,
        selectedFile,
        selectedFile.name,
        selectedFile.type
      );

      // Create evidence record
      const evidence: Evidence = {
        id: evidenceId,
        auditId,
        findingId,
        checklistItemId,
        correctiveActionId,
        facilityId,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
        storageReference: evidenceId,
        caption,
        evidenceType: 'photo',
        uploadedBy: currentUser.id,
        uploadedAt: new Date().toISOString(),
      };

      evidenceRepo.create(evidence);
      
      toast.success(t('evidence.uploadSuccess'));
      
      // Reset form
      setSelectedFile(null);
      setPreview(null);
      setCaption('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Reload evidence list
      await loadEvidence();
      onEvidenceChange?.();
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error(t('evidence.uploadFailed'));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (evidenceId: string) => {
    if (!confirm(t('evidence.deleteConfirm'))) return;

    try {
      // Delete from IndexedDB
      await evidenceStorageService.delete(evidenceId);
      
      // Delete record
      evidenceRepo.delete(evidenceId);
      
      toast.success(t('evidence.deleteSuccess'));
      
      // Reload evidence list
      await loadEvidence();
      onEvidenceChange?.();
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error(t('evidence.deleteFailed'));
    }
  };

  const cancelSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    setCaption('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Section */}
      <div className="card p-4">
        <h4 className="font-semibold text-sm mb-3">{t('evidence.upload')}</h4>
        
        {!selectedFile ? (
          <div className="space-y-2">
            {/* File input for gallery/file picker */}
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_TYPES}
              onChange={handleFileSelect}
              className="hidden"
              id={`evidence-file-${auditId}-${findingId || checklistItemId || correctiveActionId || 'general'}`}
            />
            {/* File input for camera capture */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
              id={`evidence-camera-${auditId}-${findingId || checklistItemId || correctiveActionId || 'general'}`}
            />
            <div className="flex gap-2">
              <label
                htmlFor={`evidence-file-${auditId}-${findingId || checklistItemId || correctiveActionId || 'general'}`}
                className="btn-secondary text-sm flex items-center gap-2 cursor-pointer flex-1 justify-center"
              >
                <ImageIcon className="w-4 h-4" />
                {t('evidence.selectPhoto')}
              </label>
              <label
                htmlFor={`evidence-camera-${auditId}-${findingId || checklistItemId || correctiveActionId || 'general'}`}
                className="btn-primary text-sm flex items-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                {t('evidence.takePhoto')}
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Preview */}
            {preview && (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={cancelSelection}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* File Info */}
            <div className="text-xs text-gray-600">
              <p><strong>{t('evidence.fileName')}:</strong> {selectedFile.name}</p>
              <p><strong>{t('evidence.fileSize')}:</strong> {formatFileSize(selectedFile.size)}</p>
              <p><strong>{t('evidence.fileType')}:</strong> {selectedFile.type}</p>
            </div>

            {/* Caption */}
            <div>
              <label className="text-xs font-medium text-gray-600">{t('evidence.caption')}</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder={t('evidence.captionPlaceholder')}
                className="input-field text-sm mt-1"
              />
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="btn-primary text-sm w-full flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t('evidence.uploading')}
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  {t('evidence.upload')}
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Evidence List */}
      {evidenceList.length > 0 && (
        <div className="card p-4">
          <h4 className="font-semibold text-sm mb-3">
            {t('evidence.title')} ({evidenceList.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {evidenceList.map((evidence) => (
              <div key={evidence.id} className="relative group">
                {evidence.previewUrl ? (
                  <img
                    src={evidence.previewUrl}
                    alt={evidence.caption || evidence.fileName}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(evidence.id)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                </button>

                {/* Caption */}
                {evidence.caption && (
                  <div className="mt-1 text-xs text-gray-600 line-clamp-2">
                    {evidence.caption}
                  </div>
                )}

                {/* Metadata */}
                <div className="mt-1 text-[10px] text-gray-400">
                  {new Date(evidence.uploadedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
