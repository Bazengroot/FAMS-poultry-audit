import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AuditSchedule, AuditType } from '../types';
import { scheduleRepo } from '../storage';
import { v4 as uuid } from 'uuid';

const AUDIT_TYPES: Record<string, string> = { routine: 'Rutin', internal: 'Internal', follow_up: 'Follow Up', special: 'Khusus', pre_operation: 'Pre-Operation', biosecurity: 'Biosecurity', management: 'Manajemen' };
const STATUS_COLORS: Record<string, string> = { scheduled: 'bg-blue-100 text-blue-700', completed: 'bg-green-100 text-green-700', cancelled: 'bg-gray-100 text-gray-600', overdue: 'bg-red-100 text-red-700' };

export default function Calendar() {
  const { schedules, farms, houses, templates, users, refreshData } = useApp();
  const [view, setView] = useState<'month' | 'list'>('list');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editSchedule, setEditSchedule] = useState<AuditSchedule | null>(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthSchedules = schedules.filter(s => {
    const d = new Date(s.scheduledDate);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  const upcomingSchedules = [...schedules].filter(s => new Date(s.scheduledDate) >= new Date() && s.status === 'scheduled')
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());

  const handleDelete = (id: string) => {
    if (confirm('Hapus jadwal ini?')) {
      scheduleRepo.delete(id);
      refreshData();
    }
  };

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Kalender Audit</h1>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button onClick={() => setView('list')} className={`px-3 py-1.5 text-sm ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}>List</button>
            <button onClick={() => setView('month')} className={`px-3 py-1.5 text-sm ${view === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}>Bulan</button>
          </div>
          <button onClick={() => { setEditSchedule(null); setShowForm(true); }} className="btn-primary text-sm flex items-center gap-1"><Plus className="w-4 h-4" /> Jadwalkan</button>
        </div>
      </div>

      {view === 'month' && (
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-1.5 rounded hover:bg-gray-100"><ChevronLeft className="w-5 h-5" /></button>
            <h3 className="font-semibold">{currentMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</h3>
            <button onClick={nextMonth} className="p-1.5 rounded hover:bg-gray-100"><ChevronRight className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['Min','Sen','Sel','Rab','Kam','Jum','Sab'].map(d => <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">{d}</div>)}
            {calendarDays.map((day, idx) => {
              const daySchedules = day ? monthSchedules.filter(s => new Date(s.scheduledDate).getDate() === day) : [];
              return (
                <div key={idx} className={`min-h-[60px] p-1 border rounded ${day ? 'border-gray-100' : 'border-transparent'}`}>
                  {day && (
                    <>
                      <span className="text-xs text-gray-400">{day}</span>
                      {daySchedules.map(s => (
                        <div key={s.id} className="text-[10px] bg-blue-50 text-blue-700 rounded px-1 py-0.5 mt-0.5 truncate">
                          {farms.find(f=>f.id===s.farmId)?.name?.replace('Farm ', '')}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === 'list' && (
        <div className="space-y-4">
          <div className="card">
            <div className="p-4 border-b"><h3 className="font-semibold">Jadwal Mendatang</h3></div>
            <div className="divide-y">
              {upcomingSchedules.map(s => (
                <div key={s.id} className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{farms.find(f=>f.id===s.farmId)?.name} - {houses.find(h=>h.id===s.houseId)?.name}</p>
                    <p className="text-xs text-gray-500">{new Date(s.scheduledDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} • {AUDIT_TYPES[s.auditType]} • {users.find(u=>u.id===s.auditorId)?.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[s.status]}`}>{s.status}</span>
                    <button onClick={() => { setEditSchedule(s); setShowForm(true); }} className="text-xs text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(s.id)} className="text-xs text-red-600 hover:underline">Hapus</button>
                  </div>
                </div>
              ))}
              {upcomingSchedules.length === 0 && <p className="p-4 text-sm text-gray-500 text-center">Tidak ada jadwal mendatang.</p>}
            </div>
          </div>

          <div className="card">
            <div className="p-4 border-b"><h3 className="font-semibold">Semua Jadwal</h3></div>
            <div className="divide-y">
              {schedules.sort((a,b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()).map(s => (
                <div key={s.id} className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{farms.find(f=>f.id===s.farmId)?.name}</p>
                    <p className="text-xs text-gray-500">{new Date(s.scheduledDate).toLocaleDateString('id-ID')} • {AUDIT_TYPES[s.auditType]}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[s.status]}`}>{s.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showForm && <ScheduleForm schedule={editSchedule} onClose={() => { setShowForm(false); refreshData(); }} farms={farms} houses={houses} templates={templates} users={users} />}
    </div>
  );
}

function ScheduleForm({ schedule, onClose, farms, houses, templates, users }: any) {
  const [form, setForm] = useState<Partial<AuditSchedule>>(schedule || {
    farmId: '', houseId: '', templateId: '', auditorId: '', scheduledDate: new Date().toISOString().split('T')[0],
    auditType: 'routine', notes: '', status: 'scheduled',
  });

  const farmHouses = houses.filter((h: any) => h.farmId === form.farmId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (schedule) {
      scheduleRepo.update(schedule.id, form);
    } else {
      scheduleRepo.create({ ...form, id: uuid(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as AuditSchedule);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">{schedule ? 'Edit Jadwal' : 'Jadwalkan Audit'}</h3>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div><label className="text-xs font-medium text-gray-600">Farm</label>
            <select value={form.farmId || ''} onChange={e => setForm({...form, farmId: e.target.value, houseId: ''})} className="input-field text-sm mt-1" required>
              <option value="">Pilih Farm...</option>
              {farms.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>
          <div><label className="text-xs font-medium text-gray-600">Kandang</label>
            <select value={form.houseId || ''} onChange={e => setForm({...form, houseId: e.target.value})} className="input-field text-sm mt-1">
              <option value="">Pilih Kandang...</option>
              {farmHouses.map((h: any) => <option key={h.id} value={h.id}>{h.name}</option>)}
            </select>
          </div>
          <div><label className="text-xs font-medium text-gray-600">Template</label>
            <select value={form.templateId || ''} onChange={e => setForm({...form, templateId: e.target.value})} className="input-field text-sm mt-1" required>
              <option value="">Pilih Template...</option>
              {templates.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-medium text-gray-600">Auditor</label>
              <select value={form.auditorId || ''} onChange={e => setForm({...form, auditorId: e.target.value})} className="input-field text-sm mt-1" required>
                <option value="">Pilih...</option>
                {users.map((u: any) => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
            <div><label className="text-xs font-medium text-gray-600">Tanggal</label>
              <input type="date" value={form.scheduledDate?.split('T')[0] || ''} onChange={e => setForm({...form, scheduledDate: e.target.value})} className="input-field text-sm mt-1" required />
            </div>
          </div>
          <div><label className="text-xs font-medium text-gray-600">Tipe Audit</label>
            <select value={form.auditType || 'routine'} onChange={e => setForm({...form, auditType: e.target.value as AuditType})} className="input-field text-sm mt-1">
              {Object.entries(AUDIT_TYPES).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div><label className="text-xs font-medium text-gray-600">Catatan</label><textarea value={form.notes || ''} onChange={e => setForm({...form, notes: e.target.value})} className="input-field text-sm mt-1" rows={2} /></div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary text-sm">Batal</button>
            <button type="submit" className="btn-primary text-sm">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
