import React, { useState } from 'react';
import { Plus, Edit, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/Toast';
import { User, UserRole } from '../types';
import { userRepo } from '../storage';
import { v4 as uuid } from 'uuid';

const ROLE_LABELS: Record<string, string> = { super_admin: 'Super Admin', admin: 'Admin', auditor: 'Auditor', farm_manager: 'Farm Manager', supervisor: 'Supervisor', viewer: 'Viewer' };
const ROLE_COLORS: Record<string, string> = { super_admin: 'bg-purple-100 text-purple-700', admin: 'bg-blue-100 text-blue-700', auditor: 'bg-green-100 text-green-700', farm_manager: 'bg-indigo-100 text-indigo-700', supervisor: 'bg-yellow-100 text-yellow-700', viewer: 'bg-gray-100 text-gray-700' };

export default function Users() {
  const { users, farms, refreshData } = useApp();
  const toast = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const handleToggleStatus = (u: User) => {
    const newStatus = u.status === 'active' ? 'inactive' : 'active';
    userRepo.update(u.id, { status: newStatus });
    refreshData();
    toast.success(`Pengguna ${newStatus === 'active' ? 'diaktifkan' : 'dinonaktifkan'}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Pengguna</h1>
        <button onClick={() => { setEditUser(null); setShowForm(true); }} className="btn-primary text-sm flex items-center gap-1"><Plus className="w-4 h-4" /> Tambah Pengguna</button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr>
            <th className="text-left p-3 font-medium text-gray-600">Nama</th>
            <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">Username</th>
            <th className="text-left p-3 font-medium text-gray-600 hidden lg:table-cell">Email</th>
            <th className="text-left p-3 font-medium text-gray-600">Role</th>
            <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">Department</th>
            <th className="text-left p-3 font-medium text-gray-600">Status</th>
            <th className="text-left p-3 font-medium text-gray-600">Aksi</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-3 font-medium">{u.name}</td>
                <td className="p-3 hidden md:table-cell font-mono text-xs">{u.username}</td>
                <td className="p-3 hidden lg:table-cell text-gray-500">{u.email}</td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${ROLE_COLORS[u.role]}`}>{ROLE_LABELS[u.role]}</span></td>
                <td className="p-3 hidden md:table-cell text-gray-500">{u.department}</td>
                <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{u.status}</span></td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <button onClick={() => { setEditUser(u); setShowForm(true); }} className="p-1.5 rounded hover:bg-gray-100 text-gray-600"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleToggleStatus(u)} className={`text-xs px-2 py-1 rounded ${u.status === 'active' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}>
                      {u.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && <UserForm user={editUser} onClose={() => { setShowForm(false); refreshData(); }} farms={farms} />}
    </div>
  );
}

function UserForm({ user, onClose, farms }: { user: User | null; onClose: () => void; farms: any[] }) {
  const toast = useToast();
  const [form, setForm] = useState<Partial<User>>(user || {
    name: '', username: '', email: '', password: '', role: 'auditor', department: '', assignedFarms: [], status: 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim() || !form.username?.trim()) {
      toast.error('Nama dan username wajib diisi');
      return;
    }
    if (user) {
      userRepo.update(user.id, form);
      toast.success('Pengguna berhasil diperbarui');
    } else {
      if (!form.password) {
        toast.error('Password wajib diisi untuk pengguna baru');
        return;
      }
      userRepo.create({ ...form, id: uuid(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as User);
      toast.success('Pengguna berhasil ditambahkan');
    }
    onClose();
  };

  const toggleFarm = (farmId: string) => {
    const current = form.assignedFarms || [];
    setForm({ ...form, assignedFarms: current.includes(farmId) ? current.filter(f => f !== farmId) : [...current, farmId] });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">{user ? 'Edit Pengguna' : 'Tambah Pengguna'}</h3>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Nama</label><input value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} className="input-field text-sm" required /></div>
            <div><label className="text-xs font-medium text-gray-600">Username</label><input value={form.username || ''} onChange={e => setForm({...form, username: e.target.value})} className="input-field text-sm" required /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Email</label><input type="email" value={form.email || ''} onChange={e => setForm({...form, email: e.target.value})} className="input-field text-sm" /></div>
            <div><label className="text-xs font-medium text-gray-600">Password</label><input type="text" value={form.password || ''} onChange={e => setForm({...form, password: e.target.value})} className="input-field text-sm" placeholder={user ? 'Kosongkan jika tidak diubah' : 'Wajib'} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Role</label>
              <select value={form.role || 'auditor'} onChange={e => setForm({...form, role: e.target.value as UserRole})} className="input-field text-sm">
                {Object.entries(ROLE_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div><label className="text-xs font-medium text-gray-600">Department</label><input value={form.department || ''} onChange={e => setForm({...form, department: e.target.value})} className="input-field text-sm" /></div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Assigned Farms</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {farms.map(f => (
                <label key={f.id} className="flex items-center gap-1 text-xs bg-gray-50 px-2 py-1 rounded cursor-pointer">
                  <input type="checkbox" checked={(form.assignedFarms || []).includes(f.id)} onChange={() => toggleFarm(f.id)} className="rounded" />
                  {f.name}
                </label>
              ))}
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
