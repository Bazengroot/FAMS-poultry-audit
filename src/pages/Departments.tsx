import React, { useState } from 'react';
import { Plus, Edit, Archive, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/Toast';
import { Department } from '../types';
import { departmentRepo } from '../storage';
import { v4 as uuid } from 'uuid';

export default function Departments() {
  const { departments, users, refreshData } = useApp();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editDept, setEditDept] = useState<Department | null>(null);

  const filtered = departments.filter(d => 
    !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleArchive = (id: string) => {
    if (confirm('Arsipkan departemen ini?')) {
      departmentRepo.update(id, { status: 'archived' });
      refreshData();
      toast.success('Departemen diarsipkan');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Departemen</h1>
        <button onClick={() => { setEditDept(null); setShowForm(true); }} className="btn-primary text-sm flex items-center gap-1">
          <Plus className="w-4 h-4" /> Tambah Departemen
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari departemen..." className="input-field pl-9" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(dept => {
          const manager = users.find(u => u.id === dept.managerId);
          return (
            <div key={dept.id} className="card p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-sm">{dept.name}</h3>
                  <p className="text-xs text-gray-500 font-mono">{dept.code}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${dept.status === 'active' ? 'bg-green-100 text-green-700' : dept.status === 'archived' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{dept.status}</span>
              </div>
              <p className="text-xs text-gray-600 mb-3">{dept.description}</p>
              <p className="text-xs text-gray-500">Manager: {manager?.name || '-'}</p>
              <div className="flex gap-1 mt-3">
                <button onClick={() => { setEditDept(dept); setShowForm(true); }} className="p-1.5 rounded hover:bg-gray-100 text-gray-600"><Edit className="w-4 h-4" /></button>
                {dept.status !== 'archived' && <button onClick={() => handleArchive(dept.id)} className="p-1.5 rounded hover:bg-yellow-50 text-yellow-600"><Archive className="w-4 h-4" /></button>}
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && <p className="text-center text-gray-500 py-8">Tidak ada departemen.</p>}

      {showForm && <DepartmentForm dept={editDept} onClose={() => { setShowForm(false); refreshData(); }} users={users} />}
    </div>
  );
}

function DepartmentForm({ dept, onClose, users }: { dept: Department | null; onClose: () => void; users: any[] }) {
  const toast = useToast();
  const [form, setForm] = useState<Partial<Department>>(dept || { code: '', name: '', description: '', managerId: '', status: 'active' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim() || !form.code?.trim()) {
      toast.error('Nama dan kode departemen wajib diisi');
      return;
    }
    if (dept) {
      departmentRepo.update(dept.id, form);
      toast.success('Departemen berhasil diperbarui');
    } else {
      departmentRepo.create({ ...form, id: uuid(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as Department);
      toast.success('Departemen berhasil ditambahkan');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-4 border-b"><h3 className="font-semibold">{dept ? 'Edit Departemen' : 'Tambah Departemen'}</h3></div>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Kode</label><input value={form.code || ''} onChange={e => setForm({...form, code: e.target.value})} className="input-field text-sm" required /></div>
            <div><label className="text-xs font-medium text-gray-600">Nama</label><input value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} className="input-field text-sm" required /></div>
          </div>
          <div><label className="text-xs font-medium text-gray-600">Deskripsi</label><textarea value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} className="input-field text-sm" rows={2} /></div>
          <div><label className="text-xs font-medium text-gray-600">Manager</label>
            <select value={form.managerId || ''} onChange={e => setForm({...form, managerId: e.target.value})} className="input-field text-sm">
              <option value="">Pilih Manager...</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
          <div><label className="text-xs font-medium text-gray-600">Status</label>
            <select value={form.status || 'active'} onChange={e => setForm({...form, status: e.target.value as any})} className="input-field text-sm">
              <option value="active">Aktif</option><option value="inactive">Nonaktif</option><option value="archived">Arsip</option>
            </select>
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
