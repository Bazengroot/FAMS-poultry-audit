import heic2any from 'heic2any';

export interface ProcessedImage {
  blob: Blob;
  previewUrl: string;
  originalName: string;
  originalSize: number;
  optimizedSize: number;
  originalType: string;
  outputType: string;
  width: number;
  height: number;
}

export interface ImageProcessingOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  outputFormat?: 'image/jpeg' | 'image/webp';
}

const DEFAULT_OPTIONS: ImageProcessingOptions = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.8,
  outputFormat: 'image/jpeg',
};

/**
 * Check if a file is HEIC/HEIF format
 */
function isHeicFormat(file: File): boolean {
  const heicTypes = ['image/heic', 'image/heif'];
  const heicExtensions = ['.heic', '.heif'];
  
  if (heicTypes.includes(file.type)) {
    return true;
  }
  
  const fileName = file.name.toLowerCase();
  return heicExtensions.some(ext => fileName.endsWith(ext));
}

/**
 * Check if a file is a supported image format
 */
function isSupportedImage(file: File): boolean {
  const supportedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
  ];
  
  if (supportedTypes.includes(file.type)) {
    return true;
  }
  
  // Check by extension as fallback
  const fileName = file.name.toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'].some(ext => 
    fileName.endsWith(ext)
  );
}

/**
 * Convert HEIC/HEIF to JPEG
 */
async function convertHeicToJpeg(file: File): Promise<Blob> {
  try {
    const converted = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.8,
    });
    
    // heic2any returns a Blob or Blob[]
    if (Array.isArray(converted)) {
      return converted[0];
    }
    return converted;
  } catch (error) {
    console.error('HEIC conversion failed:', error);
    throw new Error('HEIC conversion failed');
  }
}

/**
 * Get image dimensions from blob
 */
function getImageDimensions(blob: Blob): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
}

/**
 * Resize image to fit within max dimensions while maintaining aspect ratio
 */
async function resizeImage(
  blob: Blob,
  maxWidth: number,
  maxHeight: number
): Promise<Blob> {
  const dimensions = await getImageDimensions(blob);
  let { width, height } = dimensions;
  
  // Check if resizing is needed
  if (width <= maxWidth && height <= maxHeight) {
    return blob;
  }
  
  // Calculate new dimensions maintaining aspect ratio
  const ratio = Math.min(maxWidth / width, maxHeight / height);
  width = Math.floor(width * ratio);
  height = Math.floor(height * ratio);
  
  // Create canvas and resize
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }
  
  // Load image
  const img = new Image();
  const url = URL.createObjectURL(blob);
  
  await new Promise<void>((resolve, reject) => {
    img.onload = () => {
      // Handle EXIF orientation
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
  
  // Convert canvas to blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to convert canvas to blob'));
        }
      },
      'image/jpeg',
      0.9
    );
  });
}

/**
 * Compress image to target quality
 */
async function compressImage(
  blob: Blob,
  quality: number,
  outputFormat: 'image/jpeg' | 'image/webp'
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }
  
  // Load image
  const img = new Image();
  const url = URL.createObjectURL(blob);
  
  await new Promise<void>((resolve, reject) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      resolve();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
  
  // Compress
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to compress image'));
        }
      },
      outputFormat,
      quality
    );
  });
}

/**
 * Process evidence image with full pipeline:
 * 1. Validate format
 * 2. Convert HEIC/HEIF if needed
 * 3. Resize if needed
 * 4. Compress
 * 5. Generate preview
 */
export async function processEvidenceImage(
  file: File,
  options: ImageProcessingOptions = {}
): Promise<ProcessedImage> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // Validate file type
  if (!isSupportedImage(file)) {
    throw new Error('Unsupported image format');
  }
  
  let currentBlob: Blob = file;
  let outputType = file.type;
  
  // Step 1: Convert HEIC/HEIF if needed
  if (isHeicFormat(file)) {
    try {
      currentBlob = await convertHeicToJpeg(file);
      outputType = 'image/jpeg';
    } catch (error) {
      throw new Error('HEIC/HEIF conversion failed. Please use JPG or PNG format.');
    }
  }
  
  // Step 2: Get original dimensions
  const dimensions = await getImageDimensions(currentBlob);
  
  // Step 3: Resize if needed
  if (dimensions.width > opts.maxWidth! || dimensions.height > opts.maxHeight!) {
    currentBlob = await resizeImage(currentBlob, opts.maxWidth!, opts.maxHeight!);
  }
  
  // Step 4: Compress
  currentBlob = await compressImage(currentBlob, opts.quality!, opts.outputFormat!);
  outputType = opts.outputFormat!;
  
  // Step 5: Generate preview URL
  const previewUrl = URL.createObjectURL(currentBlob);
  
  // Get final dimensions
  const finalDimensions = await getImageDimensions(currentBlob);
  
  return {
    blob: currentBlob,
    previewUrl,
    originalName: file.name,
    originalSize: file.size,
    optimizedSize: currentBlob.size,
    originalType: file.type,
    outputType,
    width: finalDimensions.width,
    height: finalDimensions.height,
  };
}

/**
 * Validate file size before processing
 */
export function validateFileSize(file: File, maxSizeMB: number = 20): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

/**
 * Get human-readable file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
