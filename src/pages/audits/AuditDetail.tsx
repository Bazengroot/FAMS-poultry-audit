import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, AlertTriangle, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Audit, Finding, Facility } from '../../types';
import { auditRepo, findingRepo, correctiveActionRepo, evidenceRepo } from '../../storage';
import { calculateAuditScore, getScoreBadgeColor, getRiskBadgeColor } from '../../services/scoringService';
import { evidenceStorageService } from '../../services/evidenceStorageService';
import { CATEGORY_LABELS } from '../../data/demoData';
import EvidenceUpload from '../../components/EvidenceUpload';
import { STATUS_LABELS, STATUS_COLORS, AUDIT_TYPES } from './AuditsList';

function FindingsWithEvidence({ auditId, findings, facilityId }: { auditId: string; findings: Finding[]; facilityId?: string }) {
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null);
  const [evidencePreviews, setEvidencePreviews] = useState<Record<string, string[]>>({});

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const loadPreviews = async () => {
      const previews: Record<string, string[]> = {};
      for (const finding of findings) {
        if (!isMounted) break;
        const evidenceList = evidenceRepo.getAll().filter(e => e.findingId === finding.id);
        const urls: string[] = [];
        for (const evidence of evidenceList) {
          if (!isMounted) break;
          const url = await evidenceStorageService.getObjectUrl(evidence.id);
          if (url) urls.push(url);
        }
        previews[finding.id] = urls;
      }
      if (isMounted) {
        setEvidencePreviews(previews);
      }
    };
    loadPreviews();

    return () => {
      isMounted = false;
      abortController.abort();
      Object.values(evidencePreviews).flat().forEach(url => {
        evidenceStorageService.revokeObjectUrl(url);
      });
    };
  }, [findings]);

  if (findings.length === 0) {
    return (
      <div className="card">
        <div className="p-4 border-b"><h3 className="font-semibold">Temuan (0)</h3></div>
        <p className="p-4 text-sm text-gray-500 text-center">Tidak ada temuan</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="p-4 border-b"><h3 className="font-semibold">Temuan ({findings.length})</h3></div>
      <div className="divide-y">
        {findings.map(f => {
          const isExpanded = expandedFinding === f.id;
          const evidenceUrls = evidencePreviews[f.id] || [];
          
          return (
            <div key={f.id} className="p-3">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedFinding(isExpanded ? null : f.id)}>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{f.title}</p>
                    {evidenceUrls.length > 0 && (
                      <span className="flex items-center gap-1 text-xs text-blue-600">
                        <span className="w-3 h-3 bg-blue-500 rounded-full inline-block" />
                        {evidenceUrls.length}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{CATEGORY_LABELS[f.category]}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${f.severity === 'critical' ? 'bg-red-100 text-red-700' : f.severity === 'major' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>{f.severity}</span>
              </div>
              
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  {f.description && (
                    <p className="text-sm text-gray-700 mb-3">{f.description}</p>
                  )}
                  
                  <EvidenceUpload
                    auditId={auditId}
                    findingId={f.id}
                    facilityId={facilityId}
                    onEvidenceChange={() => {
                      const loadPreviews = async () => {
                        const evidenceList = evidenceRepo.getAll().filter(e => e.findingId === f.id);
                        const urls: string[] = [];
                        for (const evidence of evidenceList) {
                          const url = await evidenceStorageService.getObjectUrl(evidence.id);
                          if (url) urls.push(url);
                        }
                        setEvidencePreviews(prev => ({ ...prev, [f.id]: urls }));
                      };
                      loadPreviews();
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AuditDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { audits, departments, facilities, users, findings, correctiveActions, refreshData } = useApp();
  const audit = audits.find(a => a.id === id);
  if (!audit) return <div className="text-center py-12 text-gray-500">Audit tidak ditemukan</div>;

  const department = departments.find((d: any) => d.id === audit.departmentId);
  const facility = facilities.find((f: Facility) => f.id === audit.facilityId);
  const auditor = users.find((u: any) => u.id === audit.auditorId);
  const auditFindings = findings.filter((f: any) => f.auditId === audit.id);
  const auditCA = correctiveActions.filter((ca: any) => ca.auditId === audit.id);
  const scoreResult = calculateAuditScore(audit.sections);

  const handleStatusChange = (newStatus: string) => {
    auditRepo.update(audit.id, { status: newStatus as any, updatedAt: new Date().toISOString(),
      ...(newStatus === 'approved' ? { approvedAt: new Date().toISOString() } : {}),
      ...(newStatus === 'reviewed' ? { reviewedAt: new Date().toISOString() } : {}),
    });
    refreshData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 flex-wrap">
        <button onClick={() => navigate('/audits')} className="p-1.5 rounded hover:bg-gray-100"><ChevronLeft className="w-5 h-5" /></button>
        <div>
          <h1 className="text-xl font-bold">{audit.referenceNumber}</h1>
          <p className="text-sm text-gray-500">{department?.name} • {facility?.name}</p>
        </div>
        <span className={`ml-auto text-xs px-2 py-1 rounded-full ${STATUS_COLORS[audit.status]}`}>{STATUS_LABELS[audit.status]}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card p-4 text-center">
          <p className="text-xs text-gray-500">Skor</p>
          <p className={`text-2xl font-bold ${scoreResult.overallScore >= 80 ? 'text-green-600' : scoreResult.overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{audit.overallScore.toFixed(1)}%</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-gray-500">Level Risiko</p>
          <p className={`text-lg font-bold inline-block px-2 py-0.5 rounded-full text-sm ${getRiskBadgeColor(audit.riskLevel)}`}>{audit.riskLevel || '-'}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-gray-500">Pass / Fail / N/A</p>
          <p className="text-lg font-bold">{audit.passCount} / {audit.failCount} / {audit.naCount}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-gray-500">Temuan</p>
          <p className="text-lg font-bold text-orange-600">{auditFindings.length}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-gray-500">CA</p>
          <p className="text-lg font-bold text-blue-600">{auditCA.length}</p>
        </div>
      </div>

      {audit.hasCriticalFailure && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <div><p className="font-semibold text-red-800">CRITICAL ACTION REQUIRED</p><p className="text-sm text-red-600">Terdapat item kritis yang tidak memenuhi standar.</p></div>
        </div>
      )}

      <div className="card p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><span className="text-gray-500">Auditor:</span><br/><span className="font-medium">{auditor?.name || '-'}</span></div>
          <div><span className="text-gray-500">Tanggal:</span><br/><span className="font-medium">{new Date(audit.auditDate).toLocaleDateString('id-ID')}</span></div>
          <div><span className="text-gray-500">Template:</span><br/><span className="font-medium">{audit.templateName} v{audit.templateVersion}</span></div>
          <div><span className="text-gray-500">Tipe:</span><br/><span className="font-medium">{AUDIT_TYPES[audit.auditType]}</span></div>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b"><h3 className="font-semibold">Skor per Kategori</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50"><tr>
              <th className="text-left p-3">Kategori</th><th className="p-3">Applicable</th><th className="p-3">Pass</th><th className="p-3">Fail</th><th className="p-3">Skor</th>
            </tr></thead>
            <tbody className="divide-y">
              {audit.sections.map(s => {
                const applicable = s.items.filter(i => i.response && i.response !== 'na' && i.response !== 'N/A').length;
                const pass = s.items.filter(i => i.score === i.maxScore && i.response && i.response !== 'na').length;
                const fail = applicable - pass;
                const totalMax = s.items.reduce((sum, i) => sum + (i.response && i.response !== 'na' ? i.maxScore : 0), 0);
                const score = totalMax > 0 ? (s.items.reduce((sum, i) => sum + (i.response && i.response !== 'na' ? i.score : 0), 0) / totalMax) * 100 : 0;
                return (
                  <tr key={s.id}>
                    <td className="p-3 font-medium">{s.name}</td>
                    <td className="p-3 text-center">{applicable}</td>
                    <td className="p-3 text-center text-green-600">{pass}</td>
                    <td className="p-3 text-center text-red-600">{fail}</td>
                    <td className="p-3 text-center"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getScoreBadgeColor(score)}`}>{score.toFixed(0)}%</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <FindingsWithEvidence 
        auditId={audit.id} 
        findings={auditFindings} 
        facilityId={audit.facilityId}
      />

      {audit.status === 'submitted' && (
        <div className="flex gap-2">
          <button onClick={() => handleStatusChange('reviewed')} className="btn-secondary text-sm">Tandai Direview</button>
          <button onClick={() => handleStatusChange('approved')} className="btn-primary text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Setujui</button>
          <button onClick={() => handleStatusChange('rejected')} className="btn-danger text-sm">Tolak</button>
        </div>
      )}
      {audit.status === 'reviewed' && (
        <div className="flex gap-2">
          <button onClick={() => handleStatusChange('approved')} className="btn-primary text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Setujui</button>
          <button onClick={() => handleStatusChange('rejected')} className="btn-danger text-sm">Tolak</button>
        </div>
      )}
    </div>
  );
}
