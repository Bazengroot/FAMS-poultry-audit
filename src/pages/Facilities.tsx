import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Eye, Search, Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/Toast';
import { Facility, FacilityType } from '../types';
import { facilityRepo } from '../storage';
import { facilityTypeLabels } from '../data/enterpriseDemoData';
import { v4 as uuid } from 'uuid';

const STATUS_COLORS: Record<string, string> = { active: 'bg-green-100 text-green-700', inactive: 'bg-gray-100 text-gray-600', archived: 'bg-yellow-100 text-yellow-700', under_construction: 'bg-blue-100 text-blue-700' };

export default function Facilities() {
  const { facilities, departments, users, refreshData } = useApp();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editFacility, setEditFacility] = useState<Facility | null>(null);

  const filtered = facilities.filter(f => {
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !f.facilityCode.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter && f.facilityType !== typeFilter) return false;
    if (deptFilter && f.departmentId !== deptFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Fasilitas</h1>
        <button onClick={() => { setEditFacility(null); setShowForm(true); }} className="btn-primary text-sm flex items-center gap-1">
          <Plus className="w-4 h-4" /> Tambah Fasilitas
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari fasilitas..." className="input-field pl-9" />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="input-field w-auto">
          <option value="">Semua Tipe</option>
          {Object.entries(facilityTypeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="input-field w-auto">
          <option value="">Semua Departemen</option>
          {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(facility => {
          const dept = departments.find(d => d.id === facility.departmentId);
          const manager = users.find(u => u.id === facility.managerId);
          return (
            <div key={facility.id} className="card p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-sm">{facility.name}</h3>
                    <p className="text-xs text-gray-500 font-mono">{facility.facilityCode}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[facility.status]}`}>{facility.status}</span>
              </div>
              <div className="space-y-1 text-xs text-gray-600 mb-3">
                <p><span className="text-gray-400">Tipe:</span> {facilityTypeLabels[facility.facilityType]}</p>
                <p><span className="text-gray-400">Departemen:</span> {dept?.name || '-'}</p>
                <p><span className="text-gray-400">Lokasi:</span> {facility.location}</p>
                <p><span className="text-gray-400">Manager:</span> {manager?.name || '-'}</p>
              </div>
              <div className="flex gap-1">
                <Link to={`/facilities/${facility.id}`} className="p-1.5 rounded hover:bg-blue-50 text-blue-600"><Eye className="w-4 h-4" /></Link>
                <button onClick={() => { setEditFacility(facility); setShowForm(true); }} className="p-1.5 rounded hover:bg-gray-100 text-gray-600"><Edit className="w-4 h-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && <p className="text-center text-gray-500 py-8">Tidak ada fasilitas.</p>}

      {showForm && <FacilityForm facility={editFacility} onClose={() => { setShowForm(false); refreshData(); }} departments={departments} users={users} />}
    </div>
  );
}

function FacilityForm({ facility, onClose, departments, users }: { facility: Facility | null; onClose: () => void; departments: any[]; users: any[] }) {
  const toast = useToast();
  const [form, setForm] = useState<Partial<Facility>>(facility || {
    facilityCode: `FAC-${Date.now().toString().slice(-6)}`, name: '', facilityType: 'broiler_farm', departmentId: '',
    location: '', address: '', province: '', regency: '', district: '', managerId: '', supervisorId: '',
    capacity: 0, status: 'active', description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim() || !form.facilityCode?.trim()) {
      toast.error('Nama dan kode fasilitas wajib diisi');
      return;
    }
    if (facility) {
      facilityRepo.update(facility.id, form);
      toast.success('Fasilitas berhasil diperbarui');
    } else {
      facilityRepo.create({ ...form, id: uuid(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as Facility);
      toast.success('Fasilitas berhasil ditambahkan');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b"><h3 className="font-semibold">{facility ? 'Edit Fasilitas' : 'Tambah Fasilitas'}</h3></div>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Kode</label><input value={form.facilityCode || ''} onChange={e => setForm({...form, facilityCode: e.target.value})} className="input-field text-sm" required /></div>
            <div><label className="text-xs font-medium text-gray-600">Nama</label><input value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} className="input-field text-sm" required /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Tipe Fasilitas</label>
              <select value={form.facilityType || 'broiler_farm'} onChange={e => setForm({...form, facilityType: e.target.value as FacilityType})} className="input-field text-sm">
                {Object.entries(facilityTypeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div><label className="text-xs font-medium text-gray-600">Departemen</label>
              <select value={form.departmentId || ''} onChange={e => setForm({...form, departmentId: e.target.value})} className="input-field text-sm">
                <option value="">Pilih...</option>
                {departments.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Lokasi</label><input value={form.location || ''} onChange={e => setForm({...form, location: e.target.value})} className="input-field text-sm" /></div>
            <div><label className="text-xs font-medium text-gray-600">Kapasitas</label><input type="number" value={form.capacity || 0} onChange={e => setForm({...form, capacity: parseInt(e.target.value)})} className="input-field text-sm" /></div>
          </div>
          <div><label className="text-xs font-medium text-gray-600">Alamat</label><textarea value={form.address || ''} onChange={e => setForm({...form, address: e.target.value})} className="input-field text-sm" rows={2} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Manager</label>
              <select value={form.managerId || ''} onChange={e => setForm({...form, managerId: e.target.value})} className="input-field text-sm">
                <option value="">Pilih...</option>
                {users.map((u: any) => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
            <div><label className="text-xs font-medium text-gray-600">Supervisor</label>
              <select value={form.supervisorId || ''} onChange={e => setForm({...form, supervisorId: e.target.value})} className="input-field text-sm">
                <option value="">Pilih...</option>
                {users.map((u: any) => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
          </div>
          <div><label className="text-xs font-medium text-gray-600">Deskripsi</label><textarea value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} className="input-field text-sm" rows={2} /></div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary text-sm">Batal</button>
            <button type="submit" className="btn-primary text-sm">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
