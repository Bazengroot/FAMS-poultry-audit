import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Home, ClipboardCheck, AlertTriangle, Wrench, TrendingUp, Plus, Eye } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../context/AppContext';
import { getScoreBadgeColor, getRiskColor } from '../services/scoringService';
import { CATEGORY_LABELS } from '../data/demoData';

export default function Dashboard() {
  const { departments, facilities, audits, findings, correctiveActions, currentUser } = useApp();

  const activeFacilities = facilities.filter((f: any) => f.status === 'active');
  const now = new Date();
  const thisMonth = audits.filter(a => {
    const d = new Date(a.auditDate);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const completedAudits = audits.filter(a => ['submitted', 'reviewed', 'approved'].includes(a.status));
  const pendingAudits = audits.filter(a => ['draft', 'in_progress'].includes(a.status));
  const avgScore = completedAudits.length > 0 ? completedAudits.reduce((s, a) => s + a.overallScore, 0) / completedAudits.length : 0;
  const criticalFindings = findings.filter(f => f.severity === 'critical' && !['closed', 'verified', 'rejected'].includes(f.status));
  const openFindings = findings.filter(f => !['closed', 'verified', 'rejected'].includes(f.status));
  const openCA = correctiveActions.filter(ca => !['closed', 'verified'].includes(ca.status));
  const overdueCA = correctiveActions.filter(ca => {
    if (['closed', 'verified'].includes(ca.status)) return false;
    return new Date(ca.targetDate) < now;
  });

  const kpis = [
    { label: 'Total Departemen', value: departments.length, icon: Building2, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Fasilitas', value: facilities.length, icon: Building2, color: 'bg-green-50 text-green-600' },
    { label: 'Fasilitas Aktif', value: activeFacilities.length, icon: Building2, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Audit Bulan Ini', value: thisMonth.length, icon: ClipboardCheck, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Audit Selesai', value: completedAudits.length, icon: ClipboardCheck, color: 'bg-teal-50 text-teal-600' },
    { label: 'Skor Rata-rata', value: `${avgScore.toFixed(1)}%`, icon: TrendingUp, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Temuan Kritis', value: criticalFindings.length, icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
    { label: 'Temuan Terbuka', value: openFindings.length, icon: AlertTriangle, color: 'bg-orange-50 text-orange-600' },
    { label: 'CA Terbuka', value: openCA.length, icon: Wrench, color: 'bg-purple-50 text-purple-600' },
    { label: 'CA Overdue', value: overdueCA.length, icon: Wrench, color: 'bg-rose-50 text-rose-600' },
  ];

  // Chart data
  const scoreByFacility = facilities.map((f: any) => {
    const facilityAudits = completedAudits.filter(a => a.facilityId === f.id);
    const avg = facilityAudits.length > 0 ? facilityAudits.reduce((s, a) => s + a.overallScore, 0) / facilityAudits.length : 0;
    return { name: f.name, score: Math.round(avg * 10) / 10, audits: facilityAudits.length };
  }).filter((f: any) => f.audits > 0);

  const findingsByCategory = Object.entries(CATEGORY_LABELS).map(([key, label]) => ({
    name: label,
    count: findings.filter(f => f.category === key).length,
  })).filter(f => f.count > 0);

  const auditStatusData = [
    { name: 'Draft', value: audits.filter(a => a.status === 'draft').length, color: '#9ca3af' },
    { name: 'In Progress', value: audits.filter(a => a.status === 'in_progress').length, color: '#3b82f6' },
    { name: 'Submitted', value: audits.filter(a => a.status === 'submitted').length, color: '#f59e0b' },
    { name: 'Approved', value: audits.filter(a => a.status === 'approved').length, color: '#10b981' },
    { name: 'Reviewed', value: audits.filter(a => a.status === 'reviewed').length, color: '#6366f1' },
  ].filter(d => d.value > 0);

  const caStatusData = [
    { name: 'Open', value: correctiveActions.filter(ca => ca.status === 'open').length, color: '#9ca3af' },
    { name: 'In Progress', value: correctiveActions.filter(ca => ca.status === 'in_progress').length, color: '#3b82f6' },
    { name: 'Overdue', value: overdueCA.length, color: '#ef4444' },
    { name: 'Closed', value: correctiveActions.filter(ca => ca.status === 'closed' || ca.status === 'verified').length, color: '#10b981' },
  ].filter(d => d.value > 0);

  const recentAudits = [...audits].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  const recentFindings = [...findings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Selamat datang, {currentUser?.name}</p>
        </div>
        <Link to="/audits/new" className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Audit Baru
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="card p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{kpi.label}</p>
                <p className="text-lg font-bold text-gray-900">{kpi.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Skor Audit per Fasilitas</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={scoreByFacility}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis domain={[0, 100]} fontSize={12} />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Temuan per Kategori</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={findingsByCategory} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" fontSize={12} />
              <YAxis type="category" dataKey="name" fontSize={11} width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Status Audit</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={auditStatusData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {auditStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Status Tindakan Korektif</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={caStatusData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {caStatusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Audit Terbaru</h3>
            <Link to="/audits" className="text-sm text-blue-600 hover:underline flex items-center gap-1"><Eye className="w-3 h-3" /> Lihat Semua</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentAudits.map(a => {
              const facility = facilities.find((f: any) => f.id === a.facilityId);
              return (
                <Link key={a.id} to={`/audits/${a.id}`} className="p-3 hover:bg-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{a.referenceNumber}</p>
                    <p className="text-xs text-gray-500">{facility?.name} • {new Date(a.auditDate).toLocaleDateString('id-ID')}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getScoreBadgeColor(a.overallScore)}`}>{a.overallScore.toFixed(0)}%</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${a.status === 'approved' ? 'bg-green-100 text-green-700' : a.status === 'submitted' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{a.status}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Temuan Terbaru</h3>
            <Link to="/findings" className="text-sm text-blue-600 hover:underline flex items-center gap-1"><Eye className="w-3 h-3" /> Lihat Semua</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentFindings.map(f => {
              const facility = facilities.find((fm: any) => fm.id === f.facilityId);
              return (
                <Link key={f.id} to={`/findings`} className="p-3 hover:bg-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">{f.title}</p>
                    <p className="text-xs text-gray-500">{facility?.name}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${f.severity === 'critical' ? 'bg-red-100 text-red-700' : f.severity === 'major' ? 'bg-orange-100 text-orange-700' : f.severity === 'minor' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{f.severity}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Aksi Cepat</h3>
        <div className="flex flex-wrap gap-2">
          <Link to="/audits/new" className="btn-primary text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Mulai Audit Baru</Link>
          <Link to="/templates" className="btn-secondary text-sm flex items-center gap-2"><ClipboardCheck className="w-4 h-4" /> Template Audit</Link>
          <Link to="/findings" className="btn-secondary text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Lihat Temuan</Link>
          <Link to="/corrective-actions" className="btn-secondary text-sm flex items-center gap-2"><Wrench className="w-4 h-4" /> Tindakan Korektif</Link>
        </div>
      </div>
    </div>
  );
}
