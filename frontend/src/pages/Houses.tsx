import React, { useState } from 'react';
import { Plus, Search, Edit, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/Toast';
import { FarmHouse } from '../types';
import { houseRepo, exportCSV } from '../storage';
import { v4 as uuid } from 'uuid';

const STAGES: Record<string, string> = { brooding: 'Brooding', growing: 'Growing', production: 'Production', empty: 'Empty', cleaning: 'Cleaning', downtime: 'Downtime' };
const STATUS_COLORS: Record<string, string> = { active: 'bg-green-100 text-green-700', inactive: 'bg-gray-100 text-gray-600', maintenance: 'bg-yellow-100 text-yellow-700' };

export default function Houses() {
  const { houses, farms, refreshData } = useApp();
  const [search, setSearch] = useState('');
  const [farmFilter, setFarmFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editHouse, setEditHouse] = useState<FarmHouse | null>(null);

  const filtered = houses.filter(h => {
    if (search && !h.name.toLowerCase().includes(search.toLowerCase()) && !h.code.toLowerCase().includes(search.toLowerCase())) return false;
    if (farmFilter && h.farmId !== farmFilter) return false;
    if (stageFilter && h.productionStage !== stageFilter) return false;
    return true;
  });

  const handleExport = () => {
    exportCSV(filtered.map(h => ({ Code: h.code, Name: h.name, Farm: farms.find(f=>f.id===h.farmId)?.name, Stage: h.productionStage, Population: h.currentPopulation, Status: h.status })), 'houses');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Kandang</h1>
        <div className="flex gap-2">
          <button onClick={handleExport} className="btn-secondary text-sm flex items-center gap-1"><Download className="w-4 h-4" /> Export</button>
          <button onClick={() => { setEditHouse(null); setShowForm(true); }} className="btn-primary text-sm flex items-center gap-1"><Plus className="w-4 h-4" /> Tambah Kandang</button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari kandang..." className="input-field pl-9" />
        </div>
        <select value={farmFilter} onChange={e => setFarmFilter(e.target.value)} className="input-field w-auto">
          <option value="">Semua Farm</option>
          {farms.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
        <select value={stageFilter} onChange={e => setStageFilter(e.target.value)} className="input-field w-auto">
          <option value="">Semua Stage</option>
          {Object.entries(STAGES).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr>
            <th className="text-left p-3 font-medium text-gray-600">Kode</th>
            <th className="text-left p-3 font-medium text-gray-600">Nama</th>
            <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">Farm</th>
            <th className="text-left p-3 font-medium text-gray-600 hidden lg:table-cell">Flock</th>
            <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">Populasi</th>
            <th className="text-left p-3 font-medium text-gray-600">Stage</th>
            <th className="text-left p-3 font-medium text-gray-600">Status</th>
            <th className="text-left p-3 font-medium text-gray-600">Aksi</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(h => (
              <tr key={h.id} className="hover:bg-gray-50">
                <td className="p-3 font-mono text-xs">{h.code}</td>
                <td className="p-3 font-medium">{h.name}</td>
                <td className="p-3 hidden md:table-cell">{farms.find(f=>f.id===h.farmId)?.name}</td>
                <td className="p-3 hidden lg:table-cell text-gray-500">{h.flockId || '-'}</td>
                <td className="p-3 hidden md:table-cell">{h.currentPopulation.toLocaleString()}</td>
                <td className="p-3"><span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">{STAGES[h.productionStage]}</span></td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[h.status]}`}>{h.status}</span></td>
                <td className="p-3"><button onClick={() => { setEditHouse(h); setShowForm(true); }} className="p-1.5 rounded hover:bg-gray-100 text-gray-600"><Edit className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-8 text-center text-gray-500">Tidak ada kandang.</p>}
      </div>

      {showForm && <HouseForm house={editHouse} onClose={() => setShowForm(false)} farms={farms} />}
    </div>
  );
}

function HouseForm({ house, onClose, farms }: { house: FarmHouse | null; onClose: () => void; farms: any[] }) {
  const { refreshData } = useApp();
  const toast = useToast();
  const [form, setForm] = useState<Partial<FarmHouse>>(house || {
    code: `H-${String(Date.now()).slice(-3)}`, name: '', farmId: '', type: 'Closed House', capacity: 0,
    currentPopulation: 0, flockId: '', flockAge: 0, breed: '', placementDate: '', productionStage: 'empty', status: 'active', notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim()) {
      toast.error('Nama kandang wajib diisi');
      return;
    }
    if (!form.farmId) {
      toast.error('Farm wajib dipilih');
      return;
    }
    if (house) {
      houseRepo.update(house.id, form);
      toast.success('Kandang berhasil diperbarui');
    } else {
      houseRepo.create({ ...form, id: uuid(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as FarmHouse);
      toast.success('Kandang berhasil ditambahkan');
    }
    refreshData();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b"><h3 className="font-semibold">{house ? 'Edit Kandang' : 'Tambah Kandang'}</h3></div>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Kode</label><input value={form.code || ''} onChange={e => setForm({...form, code: e.target.value})} className="input-field text-sm" required /></div>
            <div><label className="text-xs font-medium text-gray-600">Nama</label><input value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} className="input-field text-sm" required /></div>
          </div>
          <div><label className="text-xs font-medium text-gray-600">Farm</label>
            <select value={form.farmId || ''} onChange={e => setForm({...form, farmId: e.target.value})} className="input-field text-sm" required>
              <option value="">Pilih Farm...</option>
              {farms.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Tipe</label><input value={form.type || ''} onChange={e => setForm({...form, type: e.target.value})} className="input-field text-sm" /></div>
            <div><label className="text-xs font-medium text-gray-600">Kapasitas</label><input type="number" value={form.capacity || 0} onChange={e => setForm({...form, capacity: parseInt(e.target.value)})} className="input-field text-sm" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Flock ID</label><input value={form.flockId || ''} onChange={e => setForm({...form, flockId: e.target.value})} className="input-field text-sm" /></div>
            <div><label className="text-xs font-medium text-gray-600">Umur (hari)</label><input type="number" value={form.flockAge || 0} onChange={e => setForm({...form, flockAge: parseInt(e.target.value)})} className="input-field text-sm" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Breed</label><input value={form.breed || ''} onChange={e => setForm({...form, breed: e.target.value})} className="input-field text-sm" /></div>
            <div><label className="text-xs font-medium text-gray-600">Populasi</label><input type="number" value={form.currentPopulation || 0} onChange={e => setForm({...form, currentPopulation: parseInt(e.target.value)})} className="input-field text-sm" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Production Stage</label>
              <select value={form.productionStage || 'empty'} onChange={e => setForm({...form, productionStage: e.target.value as any})} className="input-field text-sm">
                {Object.entries(STAGES).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div><label className="text-xs font-medium text-gray-600">Status</label>
              <select value={form.status || 'active'} onChange={e => setForm({...form, status: e.target.value as any})} className="input-field text-sm">
                <option value="active">Aktif</option><option value="inactive">Nonaktif</option><option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary text-sm">Batal</button>
            <button type="submit" className="btn-primary text-sm">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
