import React, { useState, useRef } from 'react';
import { Download, Upload, RotateCcw, Database, Shield, Bell, FileText, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/Toast';
import { settingsService, backupService, downloadJSON, authService } from '../storage';
import { resetDemoData } from '../data/demoData';
import { AppSettings } from '../types';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { refreshData, currentUser, logout } = useApp();
  const toast = useToast();
  const navigate = useNavigate();
  const [settings, setSettings] = useState<AppSettings>(settingsService.get());
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    settingsService.set(settings);
    setSaved(true);
    toast.success('Pengaturan berhasil disimpan');
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportBackup = () => {
    const data = backupService.exportAll();
    downloadJSON(data, `fams_backup_${new Date().toISOString().split('T')[0]}`);
    toast.success('Backup berhasil diunduh');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (!data.version || !data.farms) {
          toast.error('Format file tidak valid', 'File harus berisi data backup FAMS yang valid.');
          return;
        }
        if (!confirm('Import akan menimpa semua data saat ini. Lanjutkan?')) return;
        const success = backupService.importAll(data);
        if (success) {
          refreshData();
          toast.success('Data berhasil diimport');
        } else {
          toast.error('Gagal mengimport data');
        }
      } catch {
        toast.error('File tidak valid', 'File JSON tidak dapat dibaca.');
      }
    };
    reader.readAsText(file);
    // Reset file input
    e.target.value = '';
  };

  const handleReset = () => {
    if (confirm('Reset semua data ke demo data? Semua perubahan akan hilang.')) {
      resetDemoData();
      refreshData();
      toast.success('Data berhasil direset ke demo');
    }
  };

  const handleResetSession = () => {
    if (confirm('Reset sesi login? Anda akan kembali ke halaman login. Data aplikasi tetap tersimpan.')) {
      authService.resetSession();
      logout();
      toast.success('Sesi berhasil direset');
      navigate('/login');
    }
  };

  const tabs = [
    { id: 'general', label: 'Umum', icon: FileText },
    { id: 'audit', label: 'Audit', icon: Database },
    { id: 'data', label: 'Data', icon: Database },
    { id: 'session', label: 'Sesi', icon: LogOut },
    { id: 'info', label: 'Informasi', icon: Shield },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>

      <div className="flex gap-1 border-b border-gray-200">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            <span className="flex items-center gap-2"><tab.icon className="w-4 h-4" />{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'general' && (
        <div className="card p-6 space-y-4">
          <div><label className="text-sm font-medium text-gray-700">Nama Aplikasi</label><input value={settings.appName} onChange={e => setSettings({...settings, appName: e.target.value})} className="input-field mt-1" /></div>
          <div><label className="text-sm font-medium text-gray-700">Nama Perusahaan</label><input value={settings.companyName} onChange={e => setSettings({...settings, companyName: e.target.value})} className="input-field mt-1" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-gray-700">Timezone</label>
              <select value={settings.timezone} onChange={e => setSettings({...settings, timezone: e.target.value})} className="input-field mt-1">
                <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option><option value="Asia/Makassar">Asia/Makassar (WITA)</option><option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
              </select>
            </div>
            <div><label className="text-sm font-medium text-gray-700">Format Tanggal</label>
              <select value={settings.dateFormat} onChange={e => setSettings({...settings, dateFormat: e.target.value})} className="input-field mt-1">
                <option value="DD/MM/YYYY">DD/MM/YYYY</option><option value="MM/DD/YYYY">MM/DD/YYYY</option><option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
          <button onClick={handleSave} className="btn-primary text-sm">{saved ? '✓ Tersimpan' : 'Simpan Pengaturan'}</button>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold">Score Thresholds</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><label className="text-xs font-medium text-gray-600">Excellent (≥)</label><input type="number" value={settings.scoreThresholds.excellent} onChange={e => setSettings({...settings, scoreThresholds: {...settings.scoreThresholds, excellent: parseInt(e.target.value)}})} className="input-field mt-1 text-sm" /></div>
            <div><label className="text-xs font-medium text-gray-600">Good (≥)</label><input type="number" value={settings.scoreThresholds.good} onChange={e => setSettings({...settings, scoreThresholds: {...settings.scoreThresholds, good: parseInt(e.target.value)}})} className="input-field mt-1 text-sm" /></div>
            <div><label className="text-xs font-medium text-gray-600">Needs Improvement (≥)</label><input type="number" value={settings.scoreThresholds.needsImprovement} onChange={e => setSettings({...settings, scoreThresholds: {...settings.scoreThresholds, needsImprovement: parseInt(e.target.value)}})} className="input-field mt-1 text-sm" /></div>
            <div><label className="text-xs font-medium text-gray-600">Poor (≥)</label><input type="number" value={settings.scoreThresholds.poor} onChange={e => setSettings({...settings, scoreThresholds: {...settings.scoreThresholds, poor: parseInt(e.target.value)}})} className="input-field mt-1 text-sm" /></div>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={settings.requireEvidence} onChange={e => setSettings({...settings, requireEvidence: e.target.checked})} className="rounded" /> Wajibkan Bukti untuk Temuan</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={settings.requireCorrectiveAction} onChange={e => setSettings({...settings, requireCorrectiveAction: e.target.checked})} className="rounded" /> Wajibkan Tindakan Korektif untuk Item Kritis</label>
          </div>
          <button onClick={handleSave} className="btn-primary text-sm">{saved ? '✓ Tersimpan' : 'Simpan Pengaturan'}</button>
        </div>
      )}

      {activeTab === 'data' && (
        <div className="card p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Export Backup</h3>
            <p className="text-sm text-gray-500 mb-3">Download semua data dalam format JSON untuk backup.</p>
            <button onClick={handleExportBackup} className="btn-primary text-sm flex items-center gap-2"><Download className="w-4 h-4" /> Export Semua Data</button>
          </div>
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-2">Import Backup</h3>
            <p className="text-sm text-gray-500 mb-3">Import data dari file JSON backup. Data saat ini akan ditimpa.</p>
            <input ref={fileRef} type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
            <button onClick={() => fileRef.current?.click()} className="btn-secondary text-sm flex items-center gap-2"><Upload className="w-4 h-4" /> Import Backup</button>
          </div>
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-2 text-red-600">Reset Data</h3>
            <p className="text-sm text-gray-500 mb-3">Kembalikan semua data ke kondisi demo awal. Semua perubahan akan hilang.</p>
            <button onClick={handleReset} className="btn-danger text-sm flex items-center gap-2"><RotateCcw className="w-4 h-4" /> Reset Demo Data</button>
          </div>
        </div>
      )}

      {activeTab === 'session' && (
        <div className="card p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Sesi Login Saat Ini</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
              <div className="flex justify-between"><span className="text-gray-500">Status:</span><span className="font-medium text-green-600">✓ Terautentikasi</span></div>
              <div className="flex justify-between"><span className="text-gray-500">User:</span><span className="font-medium">{currentUser?.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Username:</span><span className="font-mono">{currentUser?.username}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Role:</span><span className="font-medium">{currentUser?.role}</span></div>
            </div>
          </div>
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-2">Reset Sesi</h3>
            <p className="text-sm text-gray-500 mb-3">
              Reset sesi login Anda. Anda akan kembali ke halaman login. 
              <strong className="text-blue-600"> Semua data aplikasi tetap tersimpan</strong> (farm, audit, temuan, dll).
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Fitur ini berguna untuk developer/tester yang ingin menguji halaman login tanpa menghapus data aplikasi.
            </p>
            <button onClick={handleResetSession} className="btn-secondary text-sm flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Reset Sesi Login
            </button>
          </div>
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-2 text-red-600">Logout</h3>
            <p className="text-sm text-gray-500 mb-3">Keluar dari aplikasi dan kembali ke halaman login.</p>
            <button onClick={() => { logout(); navigate('/login'); }} className="btn-danger text-sm flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      )}

      {activeTab === 'info' && (
        <div className="card p-6 space-y-4">
          <h3 className="font-semibold">Informasi Aplikasi</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Versi:</span><span>1.0.0</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Mode:</span><span>Local Development</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Storage:</span><span>localStorage</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Backend:</span><span>None (Supabase pending)</span></div>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-medium text-sm mb-2">Demo Account</h4>
            <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-1">
              <p><span className="text-gray-500">Username:</span> <code className="bg-gray-200 px-1 rounded">superadmin</code></p>
              <p><span className="text-gray-500">Password:</span> <code className="bg-gray-200 px-1 rounded">superadmin123</code></p>
              <p><span className="text-gray-500">Role:</span> Super Admin</p>
              <p><span className="text-gray-500">Current User:</span> {currentUser?.name} ({currentUser?.role})</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
