import React, { useState, useEffect } from 'react';
import { Search, Download, Edit, Eye, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/Toast';
import { Finding, FindingSeverity, FindingStatus } from '../types';
import { findingRepo, evidenceRepo, exportCSV } from '../storage';
import { evidenceStorageService } from '../services/evidenceStorageService';
import { CATEGORY_LABELS } from '../data/demoData';

const SEVERITY_COLORS: Record<string, string> = { critical: 'bg-red-100 text-red-700', major: 'bg-orange-100 text-orange-700', minor: 'bg-yellow-100 text-yellow-700', observation: 'bg-blue-100 text-blue-700' };
const STATUS_COLORS: Record<string, string> = { open: 'bg-gray-100 text-gray-700', in_progress: 'bg-blue-100 text-blue-700', resolved: 'bg-green-100 text-green-700', verified: 'bg-teal-100 text-teal-700', closed: 'bg-gray-200 text-gray-600', rejected: 'bg-red-100 text-red-600' };
const STATUS_LABELS: Record<string, string> = { open: 'Terbuka', in_progress: 'Dalam Proses', resolved: 'Terselesaikan', verified: 'Terverifikasi', closed: 'Ditutup', rejected: 'Ditolak' };

export default function Findings() {
  const { findings, facilities, audits, currentUser, refreshData } = useApp();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [facilityFilter, setFacilityFilter] = useState('');
  const [editFinding, setEditFinding] = useState<Finding | null>(null);
  const [showDetail, setShowDetail] = useState<Finding | null>(null);
  const [findingEvidence, setFindingEvidence] = useState<{ id: string; previewUrl: string; caption: string }[]>([]);

  // Load evidence when detail modal opens
  useEffect(() => {
    if (showDetail) {
      const loadEvidence = async () => {
        try {
          const evidence = evidenceRepo.getAll().filter(e => e.findingId === showDetail.id);
          const evidenceWithUrls = await Promise.all(
            evidence.map(async (e) => {
              const url = await evidenceStorageService.getObjectUrl(e.id);
              return { id: e.id, previewUrl: url || '', caption: e.caption || '' };
            })
          );
          setFindingEvidence(evidenceWithUrls);
        } catch (error) {
          console.error('Failed to load evidence:', error);
          setFindingEvidence([]);
        }
      };
      loadEvidence();
    } else {
      setFindingEvidence([]);
    }
  }, [showDetail]);

  const filtered = findings.filter(f => {
    if (search && !f.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (severityFilter && f.severity !== severityFilter) return false;
    if (statusFilter && f.status !== statusFilter) return false;
    if (facilityFilter && f.facilityId !== facilityFilter) return false;
    return true;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleExport = () => {
    exportCSV(filtered.map(f => ({ Title: f.title, Severity: f.severity, Status: f.status, Facility: facilities.find((fm: any)=>fm.id===f.facilityId)?.name, Category: CATEGORY_LABELS[f.category], Created: f.createdAt })), 'findings');
  };

  const handleStatusChange = (id: string, status: FindingStatus) => {
    findingRepo.update(id, { status });
    refreshData();
    toast.success('Status temuan diperbarui');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Temuan</h1>
        <button onClick={handleExport} className="btn-secondary text-sm flex items-center gap-1"><Download className="w-4 h-4" /> Export CSV</button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari temuan..." className="input-field pl-9" />
        </div>
        <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} className="input-field w-auto">
          <option value="">Semua Severity</option>
          <option value="critical">Kritis</option><option value="major">Mayor</option><option value="minor">Minor</option><option value="observation">Observasi</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field w-auto">
          <option value="">Semua Status</option>
          {Object.entries(STATUS_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={facilityFilter} onChange={e => setFacilityFilter(e.target.value)} className="input-field w-auto">
          <option value="">Semua Fasilitas</option>
          {facilities.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr>
            <th className="text-left p-3 font-medium text-gray-600">Judul</th>
            <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">Fasilitas</th>
            <th className="text-left p-3 font-medium text-gray-600 hidden lg:table-cell">Kategori</th>
            <th className="text-left p-3 font-medium text-gray-600">Severity</th>
            <th className="text-left p-3 font-medium text-gray-600">Status</th>
            <th className="text-left p-3 font-medium text-gray-600">Aksi</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(f => (
              <tr key={f.id} className="hover:bg-gray-50">
                <td className="p-3 font-medium max-w-[250px] truncate">{f.title}</td>
                <td className="p-3 hidden md:table-cell">{facilities.find((fm: any)=>fm.id===f.facilityId)?.name}</td>
                <td className="p-3 hidden lg:table-cell text-gray-500">{CATEGORY_LABELS[f.category]}</td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SEVERITY_COLORS[f.severity]}`}>{f.severity}</span></td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[f.status]}`}>{STATUS_LABELS[f.status]}</span></td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <button onClick={() => setShowDetail(f)} className="p-1.5 rounded hover:bg-blue-50 text-blue-600"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => setEditFinding(f)} className="p-1.5 rounded hover:bg-gray-100 text-gray-600"><Edit className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-8 text-center text-gray-500">Tidak ada temuan.</p>}
      </div>

      {/* Detail modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Detail Temuan</h3>
              <button onClick={() => setShowDetail(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div><span className="text-gray-500">Judul:</span><p className="font-medium">{showDetail.title}</p></div>
              <div><span className="text-gray-500">Deskripsi:</span><p>{showDetail.description}</p></div>
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-gray-500">Severity:</span><br/><span className={`text-xs px-2 py-0.5 rounded-full ${SEVERITY_COLORS[showDetail.severity]}`}>{showDetail.severity}</span></div>
                <div><span className="text-gray-500">Status:</span><br/><span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[showDetail.status]}`}>{STATUS_LABELS[showDetail.status]}</span></div>
              </div>
              <div><span className="text-gray-500">Fasilitas:</span> {facilities.find((f: any)=>f.id===showDetail.facilityId)?.name}</div>
              <div><span className="text-gray-500">Kategori:</span> {CATEGORY_LABELS[showDetail.category]}</div>
              <div><span className="text-gray-500">Root Cause:</span><p>{showDetail.rootCause || '-'}</p></div>
              
              {/* Evidence Section */}
              {findingEvidence.length > 0 && (
                <div className="pt-3 border-t">
                  <label className="text-xs font-medium text-gray-600 mb-2 block">Bukti:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {findingEvidence.map((evidence) => (
                      <div key={evidence.id} className="border border-gray-200 rounded-lg overflow">
                        {evidence.previewUrl ? (
                          <img src={evidence.previewUrl} alt={evidence.caption || 'Evidence'} className="w-full h-32 object-cover" />
                        ) : (
                          <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-400">No preview</span>
                          </div>
                        )}
                        {evidence.caption && (
                          <div className="p-2 bg-gray-50">
                            <p className="text-xs text-gray-600">{evidence.caption}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-3 border-t">
                <label className="text-xs font-medium text-gray-600">Ubah Status:</label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {(['open','in_progress','resolved','verified','closed'] as FindingStatus[]).filter(s => s !== showDetail.status).map(s => (
                    <button key={s} onClick={() => { handleStatusChange(showDetail.id, s); setShowDetail({...showDetail, status: s}); }}
                      className={`text-xs px-2 py-1 rounded ${STATUS_COLORS[s]} hover:opacity-80`}>{STATUS_LABELS[s]}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editFinding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Edit Temuan</h3>
              <button onClick={() => setEditFinding(null)}><X className="w-5 h-5" /></button>
            </div>
            <FindingsForm finding={editFinding} onClose={() => { setEditFinding(null); refreshData(); }} />
          </div>
        </div>
      )}
    </div>
  );
}

function FindingsForm({ finding, onClose }: { finding: Finding; onClose: () => void }) {
  const toast = useToast();
  const [form, setForm] = useState(finding);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    findingRepo.update(finding.id, form);
    toast.success('Temuan berhasil diperbarui');
    onClose();
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <div><label className="text-xs font-medium text-gray-600">Judul</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field text-sm" /></div>
      <div><label className="text-xs font-medium text-gray-600">Deskripsi</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field text-sm" rows={3} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-xs font-medium text-gray-600">Severity</label>
          <select value={form.severity} onChange={e => setForm({...form, severity: e.target.value as FindingSeverity})} className="input-field text-sm">
            <option value="critical">Kritis</option><option value="major">Mayor</option><option value="minor">Minor</option><option value="observation">Observasi</option>
          </select>
        </div>
        <div><label className="text-xs font-medium text-gray-600">Status</label>
          <select value={form.status} onChange={e => setForm({...form, status: e.target.value as FindingStatus})} className="input-field text-sm">
            {Object.entries(STATUS_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
      </div>
      <div><label className="text-xs font-medium text-gray-600">Root Cause</label><textarea value={form.rootCause} onChange={e => setForm({...form, rootCause: e.target.value})} className="input-field text-sm" rows={2} /></div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className="btn-secondary text-sm">Batal</button>
        <button type="submit" className="btn-primary text-sm">Simpan</button>
      </div>
    </form>
  );
}
