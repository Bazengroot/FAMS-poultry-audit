import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Eye, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { exportCSV } from '../../storage';
import { getScoreBadgeColor } from '../../services/scoringService';
import { Facility } from '../../types';

const STATUS_LABELS: Record<string, string> = { draft: 'Draft', in_progress: 'Dalam Proses', submitted: 'Dikirim', reviewed: 'Direview', approved: 'Disetujui', rejected: 'Ditolak', archived: 'Diarsipkan' };
const STATUS_COLORS: Record<string, string> = { draft: 'bg-gray-100 text-gray-700', in_progress: 'bg-blue-100 text-blue-700', submitted: 'bg-yellow-100 text-yellow-700', reviewed: 'bg-purple-100 text-purple-700', approved: 'bg-green-100 text-green-700', rejected: 'bg-red-100 text-red-700', archived: 'bg-gray-100 text-gray-500' };
const AUDIT_TYPES: Record<string, string> = { routine: 'Rutin', internal: 'Internal', follow_up: 'Follow Up', special: 'Khusus', pre_operation: 'Pre-Operation', biosecurity: 'Biosecurity', management: 'Manajemen' };

export function AuditsList() {
  const { audits, facilities, refreshData } = useApp();
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [facilityFilter, setFacilityFilter] = React.useState('');

  const filtered = audits.filter((a: any) => {
    if (search && !a.referenceNumber.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && a.status !== statusFilter) return false;
    if (facilityFilter && a.facilityId !== facilityFilter) return false;
    return true;
  }).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleExport = () => {
    exportCSV(filtered.map((a: any) => ({ Reference: a.referenceNumber, Facility: facilities.find((f: any)=>f.id===a.facilityId)?.name, Date: a.auditdate, Score: a.overallScore, Status: a.status, Type: a.auditType })), 'audits');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Audit</h1>
        <div className="flex gap-2">
          <button onClick={handleExport} className="btn-secondary text-sm flex items-center gap-1"><Download className="w-4 h-4" /> Export</button>
          <Link to="/audits/new" className="btn-primary text-sm flex items-center gap-1"><Plus className="w-4 h-4" /> Audit Baru</Link>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari audit..." className="input-field pl-9" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field w-auto">
          <option value="">Semua Status</option>
          {Object.entries(STATUS_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={facilityFilter} onChange={e => setFacilityFilter(e.target.value)} className="input-field w-auto">
          <option value="">Semua Fasilitas</option>
          {facilities.map((f: Facility) => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3 font-medium text-gray-600">No. Referensi</th>
              <th className="text-left p-3 font-medium text-gray-600">Fasilitas</th>
              <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">Tanggal</th>
              <th className="text-left p-3 font-medium text-gray-600 hidden lg:table-cell">Tipe</th>
              <th className="text-left p-3 font-medium text-gray-600">Skor</th>
              <th className="text-left p-3 font-medium text-gray-600">Status</th>
              <th className="text-left p-3 font-medium text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((audit: any) => {
              const facility = facilities.find((f: Facility) => f.id === audit.facilityId);
              return (
                <tr key={audit.id} className="hover:bg-gray-50">
                  <td className="p-3 font-mono text-xs">{audit.referenceNumber}</td>
                  <td className="p-3">{facility?.name || '-'}</td>
                  <td className="p-3 hidden md:table-cell">{new Date(audit.auditDate).toLocaleDateString('id-ID')}</td>
                  <td className="p-3 hidden lg:table-cell">{AUDIT_TYPES[audit.auditType]}</td>
                  <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getScoreBadgeColor(audit.overallScore)}`}>{audit.overallScore.toFixed(0)}%</span></td>
                  <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[audit.status]}`}>{STATUS_LABELS[audit.status]}</span></td>
                  <td className="p-3"><Link to={`/audits/${audit.id}`} className="p-1.5 rounded hover:bg-blue-50 text-blue-600"><Eye className="w-4 h-4" /></Link></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-8 text-center text-gray-500">Tidak ada audit.</p>}
      </div>
    </div>
  );
}

export { STATUS_LABELS, STATUS_COLORS, AUDIT_TYPES };
