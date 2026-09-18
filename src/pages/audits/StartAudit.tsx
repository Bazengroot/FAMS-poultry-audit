import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, AlertTriangle, Save, Send, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/Toast';
import { useI18n } from '../../i18n';
import { Audit, AuditSection, Facility, Finding, CorrectiveAction } from '../../types';
import { auditRepo, findingRepo, correctiveActionRepo, evidenceRepo } from '../../storage';
import { calculateAuditScore, getScoreBadgeColor } from '../../services/scoringService';
import { v4 as uuid } from 'uuid';
import EvidenceUpload from '../../components/EvidenceUpload';
import { STATUS_LABELS, STATUS_COLORS, AUDIT_TYPES } from './AuditsList';

export function StartAudit() {
  const { departments, facilities, templates, users, currentUser, refreshData } = useApp();
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useI18n();
  const [step, setStep] = useState(1);
  const [departmentId, setDepartmentId] = useState('');
  const [facilityId, setFacilityId] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [auditType, setAuditType] = useState('routine');
  const [auditDate, setAuditDate] = useState(new Date().toISOString().split('T')[0]);
  const [sections, setSections] = useState<AuditSection[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [auditId, setAuditId] = useState<string | null>(null);
  const [hasDraft, setHasDraft] = useState(false);
  const autoSaveRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef = useRef({ departmentId, facilityId, templateId, auditType, auditDate, sections, auditId });

  useEffect(() => {
    stateRef.current = { departmentId, facilityId, templateId, auditType, auditDate, sections, auditId };
  }, [departmentId, facilityId, templateId, auditType, auditDate, sections, auditId]);

  const selectedDepartment = departments.find((d: any) => d.id === departmentId);
  const selectedFacility = facilities.find((f: any) => f.id === facilityId);
  const selectedTemplate = templates.find(t => t.id === templateId);
  
  const availableFacilities = facilities.filter((f: any) => {
    if (f.status !== 'active') return false;
    if (f.departmentId) {
      return f.departmentId === departmentId;
    }
    return true;
  });
  
  const availableTemplates = templates.filter(t => {
    if (t.status !== 'active') return false;
    if (t.facilityTypes && t.facilityTypes.length > 0 && selectedFacility) {
      return t.facilityTypes.includes(selectedFacility.facilityType);
    }
    if (t.departmentId && selectedDepartment) {
      return t.departmentId === departmentId;
    }
    return true;
  });

  useEffect(() => {
    const draft = localStorage.getItem('fams_audit_draft');
    if (draft) {
      try {
        const d = JSON.parse(draft);
        if (d.sections?.length > 0) {
          setHasDraft(true);
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (step === 2 && sections.length > 0) {
      autoSaveRef.current = setInterval(() => {
        const s = stateRef.current;
        if (s.sections.length === 0) return;
        const draft = { departmentId: s.departmentId, facilityId: s.facilityId, templateId: s.templateId, auditType: s.auditType, auditDate: s.auditDate, sections: s.sections, auditId: s.auditId, savedAt: new Date().toISOString() };
        localStorage.setItem('fams_audit_draft', JSON.stringify(draft));
        setSavedAt(draft.savedAt);
        if (!s.auditId && selectedTemplate) {
          const newAudit: Audit = {
            id: uuid(), referenceNumber: `AUD-${Date.now()}`, departmentId: s.departmentId, facilityId: s.facilityId, templateId: s.templateId,
            templateName: selectedTemplate.name, templateVersion: selectedTemplate.version,
            auditorId: currentUser?.id || '', auditDate: s.auditDate, auditType: s.auditType as any,
            status: 'draft', sections: s.sections, overallScore: 0, riskLevel: '', hasCriticalFailure: false,
            passCount: 0, failCount: 0, naCount: 0, notes: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
          };
          auditRepo.create(newAudit);
          setAuditId(newAudit.id);
        } else if (s.auditId) {
          auditRepo.update(s.auditId, { sections: s.sections, updatedAt: new Date().toISOString() });
        }
        refreshData();
      }, 30000);
    }
    return () => {
      if (autoSaveRef.current) clearInterval(autoSaveRef.current);
    };
  }, [step, sections.length]);

  const loadDraft = () => {
    const draft = localStorage.getItem('fams_audit_draft');
    if (draft) {
      try {
        const d = JSON.parse(draft);
        setDepartmentId(d.departmentId || '');
        setFacilityId(d.facilityId || '');
        setTemplateId(d.templateId || '');
        setAuditType(d.auditType || 'routine');
        setAuditDate(d.auditDate || new Date().toISOString().split('T')[0]);
        setSections(d.sections || []);
        setAuditId(d.auditId || null);
        setSavedAt(d.savedAt || null);
        setStep(2);
        setHasDraft(false);
        toast.info('Draft dimuat', 'Melanjutkan audit yang tersimpan.');
      } catch {
        toast.error('Gagal memuat draft');
      }
    }
  };

  const discardDraft = () => {
    localStorage.removeItem('fams_audit_draft');
    setHasDraft(false);
    toast.info('Draft dibuang');
  };

  const saveDraftSilent = () => {
    const s = stateRef.current;
    if (s.sections.length === 0) return;
    const draft = { departmentId: s.departmentId, facilityId: s.facilityId, templateId: s.templateId, auditType: s.auditType, auditDate: s.auditDate, sections: s.sections, auditId: s.auditId, savedAt: new Date().toISOString() };
    localStorage.setItem('fams_audit_draft', JSON.stringify(draft));
    setSavedAt(draft.savedAt);
    if (!s.auditId && selectedTemplate) {
      const newAudit: Audit = {
        id: uuid(), referenceNumber: `AUD-${Date.now()}`, departmentId: s.departmentId, facilityId: s.facilityId, templateId: s.templateId,
        templateName: selectedTemplate.name, templateVersion: selectedTemplate.version,
        auditorId: currentUser?.id || '', auditDate: s.auditDate, auditType: s.auditType as any,
        status: 'draft', sections: s.sections, overallScore: 0, riskLevel: '', hasCriticalFailure: false,
        passCount: 0, failCount: 0, naCount: 0, notes: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      };
      auditRepo.create(newAudit);
      setAuditId(newAudit.id);
      draft.auditId = newAudit.id;
      localStorage.setItem('fams_audit_draft', JSON.stringify(draft));
    } else if (s.auditId) {
      auditRepo.update(s.auditId, { sections: s.sections, updatedAt: new Date().toISOString() });
    }
    refreshData();
  };

  const saveDraft = () => {
    saveDraftSilent();
    toast.success('Draft berhasil disimpan');
  };

  const startChecklist = () => {
    if (!selectedTemplate) return;
    
    let currentAuditId = auditId;
    if (!currentAuditId) {
      const newAudit: Audit = {
        id: uuid(), referenceNumber: `AUD-${Date.now()}`, departmentId, facilityId, templateId,
        templateName: selectedTemplate.name, templateVersion: selectedTemplate.version,
        auditorId: currentUser?.id || '', auditDate, auditType: auditType as any,
        status: 'draft', sections: [], overallScore: 0, riskLevel: '', hasCriticalFailure: false,
        passCount: 0, failCount: 0, naCount: 0, notes: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      };
      auditRepo.create(newAudit);
      currentAuditId = newAudit.id;
      setAuditId(newAudit.id);
    }
    
    const snapshot: AuditSection[] = selectedTemplate.sections.map(s => ({
      id: s.id, name: s.name, category: s.category,
      items: s.items.map(item => ({
        itemId: item.id, question: item.question, category: item.category, weight: item.weight,
        critical: item.critical, responseType: item.responseType, response: '', notes: '', evidence: '',
        hasFinding: false, needsCorrectiveAction: false, score: 0, maxScore: item.weight,
      }))
    }));
    setSections(snapshot);
    setStep(2);
    
    return currentAuditId;
  };

  const updateResponse = (sectionIdx: number, itemIdx: number, field: string, value: string) => {
    const newSections = [...sections];
    const item = { ...newSections[sectionIdx].items[itemIdx] };
    (item as any)[field] = value;
    if (field === 'response') {
      if (value === 'pass' || value === 'yes' || value === 'compliant') { item.score = item.maxScore; item.hasFinding = false; }
      else if (value === 'fail' || value === 'no' || value === 'non_compliant') { item.score = 0; item.hasFinding = true; item.needsCorrectiveAction = item.critical; }
      else if (value === 'na' || value === 'N/A') { item.score = 0; item.hasFinding = false; }
      else if (item.responseType === 'rating') { item.score = (parseFloat(value) / 5) * item.maxScore; item.hasFinding = parseFloat(value) < 3; }
    }
    newSections[sectionIdx] = { ...newSections[sectionIdx], items: [...newSections[sectionIdx].items] };
    newSections[sectionIdx].items[itemIdx] = item;
    setSections(newSections);
  };

  const scoreResult = calculateAuditScore(sections);
  const totalItems = sections.reduce((s, sec) => s + sec.items.length, 0);
  const answeredItems = sections.reduce((s, sec) => s + sec.items.filter(i => i.response).length, 0);
  const mandatoryUnanswered = sections.reduce((s, sec) => s + sec.items.filter(i => !i.response && i.responseType !== 'text').length, 0);

  const submitAudit = () => {
    if (mandatoryUnanswered > 0) {
      toast.warning('Audit belum lengkap', `Masih ada ${mandatoryUnanswered} item wajib yang belum dijawab.`);
      return;
    }
    if (totalItems === 0) {
      toast.error('Template kosong', 'Template tidak memiliki item checklist.');
      return;
    }
    
    const failedItemsWithoutEvidence: string[] = [];
    const allEvidence = evidenceRepo.getAll();
    const evidenceMap = new Map<string, number>();
    
    allEvidence.forEach(e => {
      const key = `${e.auditId}_${e.checklistItemId}`;
      evidenceMap.set(key, (evidenceMap.get(key) || 0) + 1);
    });

    sections.forEach(section => {
      section.items.forEach(item => {
        if ((item.response === 'fail' || item.response === 'no' || item.response === 'non_compliant') && auditId) {
          const key = `${auditId}_${item.itemId}`;
          const evidenceCount = evidenceMap.get(key) || 0;
          if (evidenceCount === 0) {
            failedItemsWithoutEvidence.push(item.question.substring(0, 50));
          }
        }
      });
    });
    
    if (failedItemsWithoutEvidence.length > 0) {
      toast.error(
        'Bukti wajib untuk item yang gagal',
        `${failedItemsWithoutEvidence.length} item gagal belum memiliki bukti. ${t('evidence.requiredForFailed')}`
      );
      return;
    }
    
    saveDraftSilent();
    const id = auditId || uuid();

    const existingFindings = findingRepo.getAll().filter(f => f.auditId === id);
    const existingFindingItemIds = new Set(existingFindings.map(f => f.checklistItemId));

    const auditData: Partial<Audit> = {
      id, referenceNumber: auditId ? undefined : `AUD-${Date.now()}`,
      departmentId, facilityId, templateId,
      templateName: selectedTemplate?.name || '', templateVersion: selectedTemplate?.version || '',
      auditorId: currentUser?.id || '', auditDate, auditType: auditType as any,
      status: 'submitted', sections, overallScore: scoreResult.overallScore,
      riskLevel: scoreResult.riskLevel, hasCriticalFailure: scoreResult.hasCriticalFailure,
      passCount: scoreResult.passCount, failCount: scoreResult.failCount, naCount: scoreResult.naCount,
      submittedAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    if (auditId) {
      auditRepo.update(auditId, auditData);
    } else {
      auditRepo.create({ ...auditData, createdAt: new Date().toISOString() } as Audit);
    }

    let newFindingsCount = 0;
    sections.forEach(section => {
      section.items.forEach(item => {
        if (item.hasFinding && !existingFindingItemIds.has(item.itemId)) {
          const finding: Finding = {
            id: uuid(), auditId: id, facilityId, category: item.category,
            checklistItemId: item.itemId, title: `Temuan: ${item.question.substring(0, 60)}`,
            description: `Item tidak memenuhi standar.`, severity: item.critical ? 'critical' : 'major',
            risk: item.critical ? 'Tinggi' : 'Sedang', rootCause: '', evidence: item.evidence,
            status: 'open', createdBy: currentUser?.id || '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
          };
          findingRepo.create(finding);
          newFindingsCount++;
          
          const evidenceList = evidenceRepo.getAll().filter(e => 
            e.auditId === id && e.checklistItemId === item.itemId
          );
          evidenceList.forEach(evidence => {
            evidenceRepo.update(evidence.id, { findingId: finding.id });
          });
          
          if (item.needsCorrectiveAction) {
            const ca: CorrectiveAction = {
              id: uuid(), findingId: finding.id, auditId: id, facilityId,
              responsiblePersonId: '', actionDescription: `Tindakan korektif untuk: ${item.question.substring(0, 60)}`,
              rootCause: '', preventiveAction: '', targetDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
              priority: item.critical ? 'urgent' : 'high', status: 'open', verificationNotes: '',
              evidence: '', createdBy: currentUser?.id || '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
            };
            correctiveActionRepo.create(ca);
          }
        }
      });
    });

    localStorage.removeItem('fams_audit_draft');
    refreshData();
    toast.success('Audit berhasil dikirim', `Skor: ${scoreResult.overallScore.toFixed(1)}% • ${newFindingsCount} temuan baru dibuat.`);
    navigate(`/audits/${id}`);
  };

  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Mulai Audit Baru</h1>
        {hasDraft && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm font-medium text-yellow-800 mb-2">Draft audit sebelumnya ditemukan.</p>
            <p className="text-xs text-yellow-700 mb-3">Apakah Anda ingin melanjutkan audit yang tersimpan?</p>
            <div className="flex gap-2">
              <button onClick={loadDraft} className="btn-primary text-xs">Lanjutkan Draft</button>
              <button onClick={discardDraft} className="btn-secondary text-xs">Mulai Baru</button>
            </div>
          </div>
        )}
        <div className="card p-6 space-y-4">
          <div><label className="text-sm font-medium text-gray-700">Departemen</label>
            <select value={departmentId} onChange={e => { 
              setDepartmentId(e.target.value); 
              setFacilityId(''); 
              setTemplateId(''); 
            }} className="input-field mt-1">
              <option value="">Pilih Departemen...</option>
              {departments.filter((d: any) => d.status === 'active').map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            {departments.filter((d: any) => d.status === 'active').length === 0 && (
              <p className="text-xs text-orange-600 mt-1">Belum ada departemen aktif. <Link to="/departments" className="text-blue-600 hover:underline">Kelola Departemen</Link></p>
            )}
          </div>
          <div><label className="text-sm font-medium text-gray-700">Fasilitas / Site</label>
            <select value={facilityId} onChange={e => { 
              setFacilityId(e.target.value); 
              setTemplateId(''); 
            }} className="input-field mt-1" disabled={!departmentId}>
              <option value="">{departmentId ? 'Pilih Fasilitas...' : 'Pilih departemen terlebih dahulu'}</option>
              {availableFacilities.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
            {departmentId && availableFacilities.length === 0 && (
              <p className="text-xs text-orange-600 mt-1">Belum ada fasilitas aktif untuk departemen ini. <Link to="/facilities" className="text-blue-600 hover:underline">Kelola Fasilitas</Link></p>
            )}
          </div>
          <div><label className="text-sm font-medium text-gray-700">Template Audit</label>
            <select value={templateId} onChange={e => setTemplateId(e.target.value)} className="input-field mt-1" disabled={!facilityId}>
              <option value="">{facilityId ? 'Pilih Template...' : 'Pilih fasilitas terlebih dahulu'}</option>
              {availableTemplates.map(t => <option key={t.id} value={t.id}>{t.name} (v{t.version})</option>)}
            </select>
            {facilityId && availableTemplates.length === 0 && (
              <p className="text-xs text-orange-600 mt-1">Belum tersedia template audit untuk kombinasi departemen dan fasilitas ini. <Link to="/templates" className="text-blue-600 hover:underline">Kelola Template</Link></p>
            )}
          </div>
          {selectedTemplate && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs">
              <p className="font-semibold text-blue-900 mb-1">Ringkasan Template</p>
              <p className="text-blue-800"><strong>Nama:</strong> {selectedTemplate.name}</p>
              <p className="text-blue-800"><strong>Versi:</strong> {selectedTemplate.version}</p>
              <p className="text-blue-800"><strong>Bagian:</strong> {selectedTemplate.sections.length} bagian</p>
              <p className="text-blue-800"><strong>Total Item:</strong> {selectedTemplate.sections.reduce((sum, s) => sum + s.items.length, 0)} item checklist</p>
              {selectedTemplate.references && selectedTemplate.references.length > 0 && (
                <p className="text-blue-800"><strong>Referensi:</strong> {selectedTemplate.references.map(r => r.code).join(', ')}</p>
              )}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-gray-700">Tanggal Audit</label>
              <input type="date" value={auditDate} onChange={e => setAuditDate(e.target.value)} className="input-field mt-1" />
            </div>
            <div><label className="text-sm font-medium text-gray-700">Tipe Audit</label>
              <select value={auditType} onChange={e => setAuditType(e.target.value)} className="input-field mt-1">
                {Object.entries(AUDIT_TYPES).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>
          <button onClick={startChecklist} disabled={!departmentId || !facilityId || !templateId} className="btn-primary w-full mt-4">
            Mulai Checklist →
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    const section = sections[currentSection];
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button onClick={() => setStep(1)} className="p-1.5 rounded hover:bg-gray-100"><ChevronLeft className="w-5 h-5" /></button>
            <div>
              <h1 className="text-xl font-bold">Checklist Audit</h1>
              <p className="text-sm text-gray-500">{selectedFacility?.name} • {selectedTemplate?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {savedAt && <span className="text-xs text-gray-400">Draft: {new Date(savedAt).toLocaleTimeString('id-ID')}</span>}
            <button onClick={saveDraft} className="btn-secondary text-sm flex items-center gap-1"><Save className="w-4 h-4" /> Simpan Draft</button>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{answeredItems} / {totalItems} item selesai</span>
            <span className="text-sm text-gray-500">{Math.round((answeredItems/totalItems)*100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${(answeredItems/totalItems)*100}%` }} />
          </div>
          <div className="flex items-center gap-4 mt-3 text-sm">
            <span className="flex items-center gap-1"><span className={`font-bold ${getScoreBadgeColor(scoreResult.overallScore).includes('green') ? 'text-green-600' : getScoreBadgeColor(scoreResult.overallScore).includes('yellow') ? 'text-yellow-600' : 'text-red-600'}`}>Skor: {scoreResult.overallScore.toFixed(1)}%</span></span>
            {scoreResult.hasCriticalFailure && <span className="flex items-center gap-1 text-red-600 font-medium"><AlertTriangle className="w-4 h-4" /> TEMUAN KRITIS!</span>}
            {mandatoryUnanswered > 0 && <span className="text-orange-600">{mandatoryUnanswered} wajib belum dijawab</span>}
          </div>
        </div>

        <div className="flex gap-1 overflow-x-auto pb-2">
          {sections.map((s, i) => (
            <button key={i} onClick={() => setCurrentSection(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${i === currentSection ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {s.name}
            </button>
          ))}
        </div>

        <div className="card">
          <div className="p-4 border-b"><h3 className="font-semibold">{section?.name}</h3></div>
          <div className="divide-y">
            {section?.items.map((item, idx) => (
              <div key={idx} className={`p-4 ${item.critical ? 'border-l-4 border-l-red-400' : ''}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{item.question}</span>
                      {item.critical && <span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-700 rounded font-medium">KRITIS</span>}
                      <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">Bobot: {item.weight}</span>
                    </div>
                    {item.responseType === 'pass_fail' && (
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => updateResponse(currentSection, idx, 'response', 'pass')}
                          className={`px-3 py-1 rounded text-xs font-medium ${item.response === 'pass' ? 'bg-green-100 text-green-700 ring-2 ring-green-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Pass</button>
                        <button onClick={() => updateResponse(currentSection, idx, 'response', 'fail')}
                          className={`px-3 py-1 rounded text-xs font-medium ${item.response === 'fail' ? 'bg-red-100 text-red-700 ring-2 ring-red-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Fail</button>
                        <button onClick={() => updateResponse(currentSection, idx, 'response', 'na')}
                          className={`px-3 py-1 rounded text-xs font-medium ${item.response === 'na' ? 'bg-gray-200 text-gray-700 ring-2 ring-gray-400' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>N/A</button>
                      </div>
                    )}
                    {item.responseType === 'yes_no' && (
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => updateResponse(currentSection, idx, 'response', 'yes')}
                          className={`px-3 py-1 rounded text-xs font-medium ${item.response === 'yes' ? 'bg-green-100 text-green-700 ring-2 ring-green-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Ya</button>
                        <button onClick={() => updateResponse(currentSection, idx, 'response', 'no')}
                          className={`px-3 py-1 rounded text-xs font-medium ${item.response === 'no' ? 'bg-red-100 text-red-700 ring-2 ring-red-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Tidak</button>
                      </div>
                    )}
                    {item.responseType === 'compliant' && (
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => updateResponse(currentSection, idx, 'response', 'compliant')}
                          className={`px-3 py-1 rounded text-xs font-medium ${item.response === 'compliant' ? 'bg-green-100 text-green-700 ring-2 ring-green-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Compliant</button>
                        <button onClick={() => updateResponse(currentSection, idx, 'response', 'non_compliant')}
                          className={`px-3 py-1 rounded text-xs font-medium ${item.response === 'non_compliant' ? 'bg-red-100 text-red-700 ring-2 ring-red-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Non-Compliant</button>
                      </div>
                    )}
                    {item.responseType === 'rating' && (
                      <div className="flex gap-1 mt-2">
                        {[1,2,3,4,5].map(r => (
                          <button key={r} onClick={() => updateResponse(currentSection, idx, 'response', String(r))}
                            className={`w-8 h-8 rounded text-xs font-medium ${item.response === String(r) ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{r}</button>
                        ))}
                      </div>
                    )}
                    <input value={item.notes} onChange={e => updateResponse(currentSection, idx, 'notes', e.target.value)}
                      placeholder="Catatan..." className="input-field mt-2 text-xs" />
                    
                    {/* Evidence Upload - Always visible */}
                    {auditId && (
                      <div className={`mt-3 p-3 rounded-lg ${
                        (item.response === 'fail' || item.response === 'no' || item.response === 'non_compliant') 
                          ? 'bg-red-50 border border-red-200' 
                          : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <ImageIcon className={`w-4 h-4 ${
                              (item.response === 'fail' || item.response === 'no' || item.response === 'non_compliant') 
                               ? 'text-red-600' 
                               : 'text-gray-600'
                            }`} />
                            <span className={`text-sm font-medium ${
                              (item.response === 'fail' || item.response === 'no' || item.response === 'non_compliant') 
                               ? 'text-red-900' 
                               : 'text-gray-900'
                            }`}>
                              {t('evidence.title')}
                            </span>
                            {(item.response === 'fail' || item.response === 'no' || item.response === 'non_compliant') ? (
                              <span className="text-xs text-red-600 font-semibold">* {t('evidence.required')}</span>
                            ) : (
                              <span className="text-xs text-gray-500">({t('evidence.optional')})</span>
                            )}
                          </div>
                        </div>
                        <EvidenceUpload
                          auditId={auditId}
                          checklistItemId={item.itemId}
                          facilityId={facilityId}
                          onEvidenceChange={() => {
                            refreshData();
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {item.response && (
                    <div className="text-right shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${item.score === item.maxScore ? 'bg-green-100 text-green-700' : item.response === 'na' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'}`}>
                        {item.score}/{item.maxScore}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button onClick={() => setCurrentSection(Math.max(0, currentSection - 1))} disabled={currentSection === 0}
            className="btn-secondary text-sm" >← Sebelumnya</button>
          <span className="text-sm text-gray-500">Bagian {currentSection + 1} / {sections.length}</span>
          {currentSection < sections.length - 1 ? (
            <button onClick={() => setCurrentSection(currentSection + 1)} className="btn-primary text-sm">Selanjutnya →</button>
          ) : (
            <button onClick={submitAudit} className="btn-primary text-sm flex items-center gap-1 bg-green-600 hover:bg-green-700">
              <Send className="w-4 h-4" /> Kirim Audit
            </button>
          )}
        </div>
      </div>
    );
  }
}
