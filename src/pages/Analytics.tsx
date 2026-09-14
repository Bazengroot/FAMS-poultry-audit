import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { useApp } from '../context/AppContext';
import { CATEGORY_LABELS } from '../data/demoData';

export function Performance() {
  const { farms, audits, findings, correctiveActions } = useApp();
  const [period, setPeriod] = useState('90');

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - parseInt(period));

  const farmPerformance = farms.map(farm => {
    const farmAudits = audits.filter(a => a.farmId === farm.id && new Date(a.auditDate) >= cutoff && a.overallScore > 0);
    const avgScore = farmAudits.length > 0 ? farmAudits.reduce((s, a) => s + a.overallScore, 0) / farmAudits.length : 0;
    const farmFindings = findings.filter(f => f.farmId === farm.id);
    const critical = farmFindings.filter(f => f.severity === 'critical' && !['closed','verified','rejected'].includes(f.status)).length;
    const major = farmFindings.filter(f => f.severity === 'major' && !['closed','verified','rejected'].includes(f.status)).length;
    const minor = farmFindings.filter(f => f.severity === 'minor' && !['closed','verified','rejected'].includes(f.status)).length;
    const farmCA = correctiveActions.filter(ca => ca.farmId === farm.id);
    const overdue = farmCA.filter(ca => !['closed','verified'].includes(ca.status) && new Date(ca.targetDate) < new Date()).length;
    const closed = farmCA.filter(ca => ['closed','verified'].includes(ca.status)).length;
    const closureRate = farmCA.length > 0 ? (closed / farmCA.length) * 100 : 100;
    return { farm, avgScore, auditCount: farmAudits.length, critical, major, minor, overdue, closureRate: Math.round(closureRate) };
  }).filter(fp => fp.auditCount > 0).sort((a, b) => b.avgScore - a.avgScore);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Performa Farm</h1>
        <select value={period} onChange={e => setPeriod(e.target.value)} className="input-field w-auto text-sm">
          <option value="30">30 Hari</option><option value="90">90 Hari</option><option value="180">6 Bulan</option><option value="365">12 Bulan</option>
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr>
            <th className="text-left p-3 font-medium text-gray-600">#</th>
            <th className="text-left p-3 font-medium text-gray-600">Farm</th>
            <th className="text-left p-3 font-medium text-gray-600">Avg Skor</th>
            <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">Audit</th>
            <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">Kritis</th>
            <th className="text-left p-3 font-medium text-gray-600 hidden lg:table-cell">Mayor</th>
            <th className="text-left p-3 font-medium text-gray-600 hidden lg:table-cell">Minor</th>
            <th className="text-left p-3 font-medium text-gray-600 hidden md:table-cell">CA Overdue</th>
            <th className="text-left p-3 font-medium text-gray-600">Closure Rate</th>
          </tr></thead>
          <tbody className="divide-y">
            {farmPerformance.map((fp, idx) => (
              <tr key={fp.farm.id} className="hover:bg-gray-50">
                <td className="p-3 font-bold text-gray-400">{idx + 1}</td>
                <td className="p-3 font-medium">{fp.farm.name}</td>
                <td className="p-3"><span className={`text-sm font-bold ${fp.avgScore >= 80 ? 'text-green-600' : fp.avgScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{fp.avgScore.toFixed(1)}%</span></td>
                <td className="p-3 hidden md:table-cell">{fp.auditCount}</td>
                <td className="p-3 hidden md:table-cell">{fp.critical > 0 ? <span className="text-red-600 font-medium">{fp.critical}</span> : '0'}</td>
                <td className="p-3 hidden lg:table-cell">{fp.major}</td>
                <td className="p-3 hidden lg:table-cell">{fp.minor}</td>
                <td className="p-3 hidden md:table-cell">{fp.overdue > 0 ? <span className="text-red-600 font-medium">{fp.overdue}</span> : '0'}</td>
                <td className="p-3"><span className={`text-sm ${fp.closureRate >= 80 ? 'text-green-600' : fp.closureRate >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>{fp.closureRate}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {farmPerformance.length === 0 && <p className="p-8 text-center text-gray-500">Belum ada data performa.</p>}
      </div>

      {/* Chart */}
      <div className="card p-4">
        <h3 className="font-semibold mb-4">Perbandingan Skor Farm</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={farmPerformance.map(fp => ({ name: fp.farm.name.replace('Farm ', ''), score: Math.round(fp.avgScore) }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis domain={[0, 100]} fontSize={12} />
            <Tooltip />
            <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function Analytics() {
  const { audits, findings, correctiveActions, farms } = useApp();
  const [farmFilter, setFarmFilter] = useState('');

  const filteredAudits = audits.filter(a => !farmFilter || a.farmId === farmFilter);
  const filteredFindings = findings.filter(f => !farmFilter || f.farmId === farmFilter);

  // Score trend
  const scoreTrend = useMemo(() => {
    const sorted = [...filteredAudits].filter(a => a.overallScore > 0).sort((a, b) => new Date(a.auditDate).getTime() - new Date(b.auditDate).getTime());
    return sorted.map(a => ({ date: new Date(a.auditDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }), score: Math.round(a.overallScore) }));
  }, [filteredAudits]);

  // Findings by severity
  const findingsBySeverity = [
    { name: 'Kritis', value: filteredFindings.filter(f => f.severity === 'critical').length, color: '#ef4444' },
    { name: 'Mayor', value: filteredFindings.filter(f => f.severity === 'major').length, color: '#f97316' },
    { name: 'Minor', value: filteredFindings.filter(f => f.severity === 'minor').length, color: '#eab308' },
    { name: 'Observasi', value: filteredFindings.filter(f => f.severity === 'observation').length, color: '#3b82f6' },
  ].filter(d => d.value > 0);

  // Findings by category
  const findingsByCategory = Object.entries(CATEGORY_LABELS).map(([key, label]) => ({
    name: label, count: filteredFindings.filter(f => f.category === key).length,
  })).filter(f => f.count > 0);

  // Score by farm
  const scoreByFarm = farms.map(f => {
    const fa = filteredAudits.filter(a => a.farmId === f.id && a.overallScore > 0);
    return { name: f.name.replace('Farm ', ''), score: fa.length > 0 ? Math.round(fa.reduce((s, a) => s + a.overallScore, 0) / fa.length) : 0, count: fa.length };
  }).filter(f => f.count > 0);

  // Monthly audit volume
  const monthlyVolume = useMemo(() => {
    const months: Record<string, number> = {};
    filteredAudits.forEach(a => {
      const key = new Date(a.auditDate).toLocaleDateString('id-ID', { month: 'short', year: '2-digit' });
      months[key] = (months[key] || 0) + 1;
    });
    return Object.entries(months).map(([name, count]) => ({ name, count }));
  }, [filteredAudits]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Analitik Audit</h1>
        <select value={farmFilter} onChange={e => setFarmFilter(e.target.value)} className="input-field w-auto text-sm">
          <option value="">Semua Farm</option>
          {farms.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-4">
          <h3 className="font-semibold mb-4">Tren Skor Audit</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={scoreTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={11} />
              <YAxis domain={[0, 100]} fontSize={11} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-4">
          <h3 className="font-semibold mb-4">Temuan per Severity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={findingsBySeverity} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {findingsBySeverity.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-4">
          <h3 className="font-semibold mb-4">Temuan per Kategori</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={findingsByCategory} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" fontSize={11} />
              <YAxis type="category" dataKey="name" fontSize={10} width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-4">
          <h3 className="font-semibold mb-4">Volume Audit per Bulan</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyVolume}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-4">
          <h3 className="font-semibold mb-4">Skor per Farm</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={scoreByFarm}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={11} />
              <YAxis domain={[0, 100]} fontSize={11} />
              <Tooltip />
              <Bar dataKey="score" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-4">
          <h3 className="font-semibold mb-4">Status Tindakan Korektif</h3>
          {(() => {
            const caData = [
              { name: 'Open', value: correctiveActions.filter(ca => ca.status === 'open').length, color: '#9ca3af' },
              { name: 'In Progress', value: correctiveActions.filter(ca => ca.status === 'in_progress').length, color: '#3b82f6' },
              { name: 'Overdue', value: correctiveActions.filter(ca => !['closed','verified'].includes(ca.status) && new Date(ca.targetDate) < new Date()).length, color: '#ef4444' },
              { name: 'Closed', value: correctiveActions.filter(ca => ['closed','verified'].includes(ca.status)).length, color: '#10b981' },
            ].filter(d => d.value > 0);
            return (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={caData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {caData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
