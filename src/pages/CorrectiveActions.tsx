import React, { useState } from 'react';
import { Search, Download, Edit, Eye, X, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/Toast';
import { CorrectiveAction, CAStatus, CAPriority } from '../types';
import { correctiveActionRepo, exportCSV } from '../storage';
import EvidenceUpload from '../components/EvidenceUpload';

const STATUS_LABELS: Record<string, string> = { open: 'Terbuka', in_progress: 'Dalam Proses', submitted_verification: 'Menunggu Verifikasi', verified: 'Terverifikasi', closed: 'Ditutup', overdue: 'Overdue', rejected: 'Ditolak' };
const STATUS_COLORS: Record<string, string> = { open: 'bg-gray-100 text-gray-700', in_progress: 'bg-blue-100 text-blue-700', submitted_verification: 'bg-purple-100 text-purple-700', verified: 'bg-teal-100 text-teal-700', closed: 'bg-green-100 text-green-700', overdue: 'bg-red-100 text-red-700', rejected: 'bg-red-50 text-red-600' };
const PRIORITY_COLORS: Record<string, string> = { urgent: 'bg-red-100 text-red-700', high: 'bg-orange-100 text-orange-700', medium: 'bg-yellow-100 text-yellow-700', low: 'bg-gray-100 text-gray-600' };

function isOverdue(ca: CorrectiveAction): boolean {
  if (['closed', 'verified'].includes(ca.status)) return false;
  return new Date(ca.targetDate) < new Date();
}

export default function CorrectiveActions() {
  const { correctiveActions, facilities, findings, users, refreshData } = useApp();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [facilityFilter, setFacilityFilter] = useState('');
  const [editCA, setEditCA] = useState<CorrectiveAction | null>(null);
  const [showDetail, setShowDetail] = useState<CorrectiveAction | null>(null);

  const enriched = correctiveActions.map(ca => ({
    ...ca,
    _overdue: isOverdue(ca),
    _displayStatus: isOverdue(ca) ? 'overdue' : ca.status,
  }));

  const filtered = enriched.filter(ca => {
    if (search && !ca.actionDescription.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && ca._displayStatus !== statusFilter) return false;
    if (priorityFilter && ca.priority !== priorityFilter) return false;
    if (facilityFilter && ca.facilityId !== facilityFilter) return false;
    return true;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleExport = () => {
    exportCSV(filtered.map(ca => ({ ID: ca.id, Facility: facilities.find((f: any)=>f.id===ca.facilityId)?.name, Action: ca.actionDescription, Priority: ca.priority, Status: ca._displayStatus, Target: ca.targetDate })), 'corrective_actions');
  };

  const handleStatusChange = (id: string, status: CAStatus) => {
    const updates: Partial<CorrectiveAction> = { status };
    if (status === 'closed' || status === 'verified') {
      updates.verificationDate = new Date().toISOString();
      updates.completionDate = updates.completionDate || new Date().toISOString();
    }
    correctiveActionRepo.update(id, updates);
    refreshData();
    toast.success('Tindakan korektif berhasil diperbarui');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Tindakan Korektif</h1>
        <button onClick={handleExport} className="btn-secondary text-sm flex items-center gap-1"><Download className="w-4 h-4" /> Export CSV</button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari tindakan..." className="input-field pl-9" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field w-auto">
          <option value="">Semua Status</option>
          {Object.entries(STATUS_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="input-field w-auto">
          <option value="">Semua Prioritas</option>
          <option value="urgent">Urgent</option><option value="high">Tinggi</option><option value="medium">Sedang</option><option value="low">Rendah</option>
        </select>
        <select value={facilityFilter} onChange={e => setFacilityFilter(e.target.value)} className="input-field w-auto">
          <option value="">Semua Fasilitas</option>
          {facilities.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr>
            <th className="text-left p-3 font-medium text-gray-600">Tindakan</th>
            <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">Fasilitas</th>
            <th className="text-left p-3 font-medium text-gray-600 hidden lg:table-cell">Penanggung Jawab</th>
            <th className="text-left p-3 font-medium text-gray-600">Prioritas</th>
            <th className="text-left p-3 font-medium text-gray-600">Target</th>
            <th className="text-left p-3 font-medium text-gray-600">Status</th>
            <th className="text-left p-3 font-medium text-gray-600">Aksi</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(ca => (
              <tr key={ca.id} className={`hover:bg-gray-50 ${ca._overdue ? 'bg-red-50/50' : ''}`}>
                <td className="p-3 font-medium max-w-[200px] truncate">{ca.actionDescription}</td>
                <td className="p-3 hidden md:table-cell">{facilities.find((f: any)=>f.id===ca.facilityId)?.name}</td>
                <td className="p-3 hidden lg:table-cell text-gray-500">{users.find(u=>u.id===ca.responsiblePersonId)?.name || '-'}</td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${PRIORITY_COLORS[ca.priority]}`}>{ca.priority}</span></td>
                <td className="p-3 text-xs">{new Date(ca.targetDate).toLocaleDateString('id-ID')} {ca._overdue && <AlertTriangle className="w-3 h-3 inline text-red-500 ml-1" />}</td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[ca._displayStatus]}`}>{STATUS_LABELS[ca._displayStatus]}</span></td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <button onClick={() => setShowDetail(ca)} className="p-1.5 rounded hover:bg-blue-50 text-blue-600"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => setEditCA(ca)} className="p-1.5 rounded hover:bg-gray-100 text-gray-600"><Edit className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-8 text-center text-gray-500">Tidak ada tindakan korektif.</p>}
      </div>

      {/* Detail modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Detail Tindakan Korektif</h3>
              <button onClick={() => setShowDetail(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div><span className="text-gray-500">Tindakan:</span><p className="font-medium">{showDetail.actionDescription}</p></div>
              <div><span className="text-gray-500">Fasilitas:</span> {facilities.find((f: any)=>f.id===showDetail.facilityId)?.name}</div>
              <div><span className="text-gray-500">Penanggung Jawab:</span> {users.find(u=>u.id===showDetail.responsiblePersonId)?.name || '-'}</div>
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-gray-500">Prioritas:</span><br/><span className={`text-xs px-2 py-0.5 rounded-full ${PRIORITY_COLORS[showDetail.priority]}`}>{showDetail.priority}</span></div>
                <div><span className="text-gray-500">Status:</span><br/><span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[isOverdue(showDetail) ? 'overdue' : showDetail.status]}`}>{STATUS_LABELS[isOverdue(showDetail) ? 'overdue' : showDetail.status]}</span></div>
              </div>
              <div><span className="text-gray-500">Target Date:</span> {new Date(showDetail.targetDate).toLocaleDateString('id-ID')}</div>
              <div><span className="text-gray-500">Root Cause:</span><p>{showDetail.rootCause || '-'}</p></div>
              <div><span className="text-gray-500">Preventive Action:</span><p>{showDetail.preventiveAction || '-'}</p></div>
              {showDetail.verificationNotes && <div><span className="text-gray-500">Verification Notes:</span><p>{showDetail.verificationNotes}</p></div>}
              
              {/* Evidence Upload */}
              <div className="pt-3 border-t">
                <label className="text-xs font-medium text-gray-600 mb-2 block">Evidence:</label>
                <EvidenceUpload
                  auditId={showDetail.auditId}
                  correctiveActionId={showDetail.id}
                  facilityId={showDetail.facilityId}
                  onEvidenceChange={() => {
                    // Reload to refresh evidence list
                  }}
                />
              </div>
              
              <div className="pt-3 border-t">
                <label className="text-xs font-medium text-gray-600">Ubah Status:</label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {(['open','in_progress','submitted_verification','verified','closed'] as CAStatus[]).filter(s => s !== showDetail.status).map(s => (
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
      {editCA && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Edit Tindakan Korektif</h3>
              <button onClick={() => setEditCA(null)}><X className="w-5 h-5" /></button>
            </div>
            <CAForm ca={editCA} onClose={() => { setEditCA(null); refreshData(); }} users={users} />
          </div>
        </div>
      )}
    </div>
  );
}

function CAForm({ ca, onClose, users }: { ca: CorrectiveAction; onClose: () => void; users: any[] }) {
  const toast = useToast();
  const [form, setForm] = useState(ca);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    correctiveActionRepo.update(ca.id, form);
    toast.success('Tindakan korektif berhasil diperbarui');
    onClose();
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3">
      <div><label className="text-xs font-medium text-gray-600">Deskripsi Tindakan</label><textarea value={form.actionDescription} onChange={e => setForm({...form, actionDescription: e.target.value})} className="input-field text-sm" rows={2} /></div>
      <div><label className="text-xs font-medium text-gray-600">Penanggung Jawab</label>
        <select value={form.responsiblePersonId} onChange={e => setForm({...form, responsiblePersonId: e.target.value})} className="input-field text-sm">
          <option value="">Pilih...</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-xs font-medium text-gray-600">Prioritas</label>
          <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value as CAPriority})} className="input-field text-sm">
            <option value="urgent">Urgent</option><option value="high">Tinggi</option><option value="medium">Sedang</option><option value="low">Rendah</option>
          </select>
        </div>
        <div><label className="text-xs font-medium text-gray-600">Target Date</label><input type="date" value={form.targetDate.split('T')[0]} onChange={e => setForm({...form, targetDate: e.target.value})} className="input-field text-sm" /></div>
      </div>
      <div><label className="text-xs font-medium text-gray-600">Root Cause</label><textarea value={form.rootCause} onChange={e => setForm({...form, rootCause: e.target.value})} className="input-field text-sm" rows={2} /></div>
      <div><label className="text-xs font-medium text-gray-600">Preventive Action</label><textarea value={form.preventiveAction} onChange={e => setForm({...form, preventiveAction: e.target.value})} className="input-field text-sm" rows={2} /></div>
      <div><label className="text-xs font-medium text-gray-600">Verification Notes</label><textarea value={form.verificationNotes} onChange={e => setForm({...form, verificationNotes: e.target.value})} className="input-field text-sm" rows={2} /></div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className="btn-secondary text-sm">Batal</button>
        <button type="submit" className="btn-primary text-sm">Simpan</button>
      </div>
    </form>
  );
}
