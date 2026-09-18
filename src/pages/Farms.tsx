import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Eye, Archive, ChevronLeft, Building2, Home, ClipboardCheck, AlertTriangle, Wrench, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/Toast';
import { Farm, FarmHouse } from '../types';
import { farmRepo, houseRepo, exportCSV } from '../storage';
import { v4 as uuid } from 'uuid';

const FARM_TYPES: Record<string, string> = { parent_stock_broiler: 'Parent Stock Broiler', broiler: 'Broiler', layer: 'Layer' };
const STATUS_COLORS: Record<string, string> = { active: 'bg-green-100 text-green-700', inactive: 'bg-gray-100 text-gray-700', archived: 'bg-yellow-100 text-yellow-700' };

export function FarmsList() {
  const { farms, users, refreshData } = useApp();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editFarm, setEditFarm] = useState<Farm | null>(null);

  const filtered = farms.filter(f => {
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !f.code.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && f.status !== statusFilter) return false;
    if (typeFilter && f.type !== typeFilter) return false;
    return true;
  });

  const handleArchive = (id: string) => {
    if (confirm('Arsipkan farm ini? Data audit historis tetap tersimpan.')) {
      farmRepo.update(id, { status: 'archived' });
      refreshData();
      toast.success('Farm diarsipkan');
    }
  };

  const handleExport = () => {
    exportCSV(filtered.map(f => ({ Code: f.code, Name: f.name, Type: FARM_TYPES[f.type], Status: f.status, Province: f.province, Capacity: f.capacity })), 'farms');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Farm</h1>
        <div className="flex gap-2">
          <button onClick={handleExport} className="btn-secondary text-sm flex items-center gap-1"><Download className="w-4 h-4" /> Export</button>
          <button onClick={() => { setEditFarm(null); setShowForm(true); }} className="btn-primary text-sm flex items-center gap-1"><Plus className="w-4 h-4" /> Tambah Farm</button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari farm..." className="input-field pl-9" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field w-auto">
          <option value="">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="inactive">Nonaktif</option>
          <option value="archived">Arsip</option>
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="input-field w-auto">
          <option value="">Semua Tipe</option>
          {Object.entries(FARM_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-3 font-medium text-gray-600">Kode</th>
              <th className="text-left p-3 font-medium text-gray-600">Nama</th>
              <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">Tipe</th>
              <th className="text-left p-3 font-medium text-gray-600 hidden lg:table-cell">Lokasi</th>
              <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">Kapasitas</th>
              <th className="text-left p-3 font-medium text-gray-600">Status</th>
              <th className="text-left p-3 font-medium text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(farm => (
              <tr key={farm.id} className="hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">{farm.code}</td>
                <td className="p-3 font-medium">{farm.name}</td>
                <td className="p-3 hidden md:table-cell">{FARM_TYPES[farm.type]}</td>
                <td className="p-3 text-gray-500 hidden lg:table-cell">{farm.province}</td>
                <td className="p-3 hidden md:table-cell">{farm.capacity.toLocaleString()}</td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[farm.status]}`}>{farm.status}</span></td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <Link to={`/farms/${farm.id}`} className="p-1.5 rounded hover:bg-blue-50 text-blue-600"><Eye className="w-4 h-4" /></Link>
                    <button onClick={() => { setEditFarm(farm); setShowForm(true); }} className="p-1.5 rounded hover:bg-gray-100 text-gray-600"><Edit className="w-4 h-4" /></button>
                    {farm.status !== 'archived' && <button onClick={() => handleArchive(farm.id)} className="p-1.5 rounded hover:bg-yellow-50 text-yellow-600"><Archive className="w-4 h-4" /></button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-8 text-center text-gray-500">Tidak ada farm ditemukan.</p>}
      </div>

      {showForm && <FarmForm farm={editFarm} onClose={() => setShowForm(false)} users={users} />}
    </div>
  );
}

function FarmForm({ farm, onClose, users }: { farm: Farm | null; onClose: () => void; users: any[] }) {
  const { refreshData, farms } = useApp();
  const toast = useToast();
  const [form, setForm] = useState<Partial<Farm>>(farm || {
    code: `FRM-${String(Date.now()).slice(-3)}`, name: '', type: 'broiler', company: '', province: '', regency: '', district: '', address: '',
    farmManagerId: '', supervisorId: '', numberOfHouses: 0, capacity: 0, status: 'active', notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate unique code
    const existingCode = farms.find(f => f.code === form.code && f.id !== farm?.id);
    if (existingCode) {
      toast.error('Kode farm sudah digunakan', `Kode "${form.code}" sudah ada. Gunakan kode lain.`);
      return;
    }
    if (!form.name?.trim()) {
      toast.error('Nama farm wajib diisi');
      return;
    }
    if (farm) {
      farmRepo.update(farm.id, form);
      toast.success('Farm berhasil diperbarui');
    } else {
      farmRepo.create({ ...form, id: uuid(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as Farm);
      toast.success('Farm berhasil ditambahkan');
    }
    refreshData();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b"><h3 className="font-semibold">{farm ? 'Edit Farm' : 'Tambah Farm'}</h3></div>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Kode</label><input value={form.code || ''} onChange={e => setForm({...form, code: e.target.value})} className="input-field text-sm" required /></div>
            <div><label className="text-xs font-medium text-gray-600">Nama</label><input value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} className="input-field text-sm" required /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Tipe</label>
              <select value={form.type || 'broiler'} onChange={e => setForm({...form, type: e.target.value as any})} className="input-field text-sm">
                {Object.entries(FARM_TYPES).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div><label className="text-xs font-medium text-gray-600">Perusahaan</label><input value={form.company || ''} onChange={e => setForm({...form, company: e.target.value})} className="input-field text-sm" /></div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Provinsi</label><input value={form.province || ''} onChange={e => setForm({...form, province: e.target.value})} className="input-field text-sm" /></div>
            <div><label className="text-xs font-medium text-gray-600">Kabupaten</label><input value={form.regency || ''} onChange={e => setForm({...form, regency: e.target.value})} className="input-field text-sm" /></div>
            <div><label className="text-xs font-medium text-gray-600">Kecamatan</label><input value={form.district || ''} onChange={e => setForm({...form, district: e.target.value})} className="input-field text-sm" /></div>
          </div>
          <div><label className="text-xs font-medium text-gray-600">Alamat</label><textarea value={form.address || ''} onChange={e => setForm({...form, address: e.target.value})} className="input-field text-sm" rows={2} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Farm Manager</label>
              <select value={form.farmManagerId || ''} onChange={e => setForm({...form, farmManagerId: e.target.value})} className="input-field text-sm">
                <option value="">Pilih...</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
            <div><label className="text-xs font-medium text-gray-600">Supervisor</label>
              <select value={form.supervisorId || ''} onChange={e => setForm({...form, supervisorId: e.target.value})} className="input-field text-sm">
                <option value="">Pilih...</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Jumlah Kandang</label><input type="number" value={form.numberOfHouses || 0} onChange={e => setForm({...form, numberOfHouses: parseInt(e.target.value)})} className="input-field text-sm" /></div>
            <div><label className="text-xs font-medium text-gray-600">Kapasitas</label><input type="number" value={form.capacity || 0} onChange={e => setForm({...form, capacity: parseInt(e.target.value)})} className="input-field text-sm" /></div>
          </div>
          <div><label className="text-xs font-medium text-gray-600">Catatan</label><textarea value={form.notes || ''} onChange={e => setForm({...form, notes: e.target.value})} className="input-field text-sm" rows={2} /></div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary text-sm">Batal</button>
            <button type="submit" className="btn-primary text-sm">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function FarmDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { farms, houses, audits, findings, correctiveActions, users } = useApp();
  const farm = farms.find(f => f.id === id);
  if (!farm) return <div className="text-center py-12 text-gray-500">Farm tidak ditemukan</div>;

  const farmHouses = houses.filter(h => h.farmId === farm.id);
  const farmAudits = audits.filter(a => a.farmId === farm.id).sort((a, b) => new Date(b.auditDate).getTime() - new Date(a.auditDate).getTime());
  const farmFindings = findings.filter(f => f.farmId === farm.id);
  const farmCA = correctiveActions.filter(ca => ca.farmId === farm.id);
  const avgScore = farmAudits.filter(a => a.overallScore > 0).length > 0 ? farmAudits.filter(a => a.overallScore > 0).reduce((s, a) => s + a.overallScore, 0) / farmAudits.filter(a => a.overallScore > 0).length : 0;
  const openFindings = farmFindings.filter(f => !['closed', 'verified', 'rejected'].includes(f.status)).length;
  const overdueCA = farmCA.filter(ca => !['closed', 'verified'].includes(ca.status) && new Date(ca.targetDate) < new Date()).length;
  const manager = users.find(u => u.id === farm.farmManagerId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button onClick={() => navigate('/farms')} className="p-1.5 rounded hover:bg-gray-100"><ChevronLeft className="w-5 h-5" /></button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{farm.name}</h1>
          <p className="text-sm text-gray-500">{farm.code} • {FARM_TYPES[farm.type]}</p>
        </div>
        <span className={`ml-auto text-xs px-2 py-1 rounded-full ${STATUS_COLORS[farm.status]}`}>{farm.status}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4"><p className="text-xs text-gray-500">Avg. Skor</p><p className="text-xl font-bold text-blue-600">{avgScore.toFixed(1)}%</p></div>
        <div className="card p-4"><p className="text-xs text-gray-500">Total Audit</p><p className="text-xl font-bold">{farmAudits.length}</p></div>
        <div className="card p-4"><p className="text-xs text-gray-500">Temuan Terbuka</p><p className="text-xl font-bold text-orange-600">{openFindings}</p></div>
        <div className="card p-4"><p className="text-xs text-gray-500">CA Overdue</p><p className="text-xl font-bold text-red-600">{overdueCA}</p></div>
      </div>

      {/* Info */}
      <div className="card p-4">
        <h3 className="font-semibold mb-3">Informasi Farm</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><span className="text-gray-500">Perusahaan:</span><br/><span className="font-medium">{farm.company}</span></div>
          <div><span className="text-gray-500">Lokasi:</span><br/><span className="font-medium">{farm.province}, {farm.regency}</span></div>
          <div><span className="text-gray-500">Manager:</span><br/><span className="font-medium">{manager?.name || '-'}</span></div>
          <div><span className="text-gray-500">Kapasitas:</span><br/><span className="font-medium">{farm.capacity.toLocaleString()} ekor</span></div>
        </div>
      </div>

      {/* Houses */}
      <div className="card">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Kandang ({farmHouses.length})</h3>
          <Link to="/houses" className="text-sm text-blue-600">Kelola Kandang</Link>
        </div>
        <div className="divide-y">
          {farmHouses.map(h => (
            <div key={h.id} className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4 text-gray-400" />
                <div><p className="text-sm font-medium">{h.name}</p><p className="text-xs text-gray-500">{h.flockId || 'Empty'} • {h.productionStage}</p></div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${h.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{h.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Audits */}
      <div className="card">
        <div className="p-4 border-b"><h3 className="font-semibold">Riwayat Audit</h3></div>
        <div className="divide-y">
          {farmAudits.slice(0, 5).map(a => (
            <Link key={a.id} to={`/audits/${a.id}`} className="p-3 hover:bg-gray-50 flex items-center justify-between">
              <div><p className="text-sm font-medium">{a.referenceNumber}</p><p className="text-xs text-gray-500">{new Date(a.auditDate).toLocaleDateString('id-ID')} • {a.templateName}</p></div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.overallScore >= 80 ? 'bg-green-100 text-green-700' : a.overallScore >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{a.overallScore.toFixed(0)}%</span>
              </div>
            </Link>
          ))}
          {farmAudits.length === 0 && <p className="p-4 text-sm text-gray-500 text-center">Belum ada audit</p>}
        </div>
      </div>
    </div>
  );
}
