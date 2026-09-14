import React, { useState } from 'react';
import { Download, Printer, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { exportCSV, downloadJSON } from '../storage';
import { CATEGORY_LABELS } from '../data/demoData';

export default function Reports() {
  const { audits, farms, houses, findings, correctiveActions, users } = useApp();
  const [reportType, setReportType] = useState('audit_summary');
  const [farmFilter, setFarmFilter] = useState('');
  const [selectedAudit, setSelectedAudit] = useState('');

  const filteredAudits = audits.filter(a => !farmFilter || a.farmId === farmFilter);

  const handleExportCSV = () => {
    switch (reportType) {
      case 'audit_summary':
        exportCSV(filteredAudits.map(a => ({
          Reference: a.referenceNumber, Farm: farms.find(f=>f.id===a.farmId)?.name, Date: a.auditDate,
          Score: a.overallScore, Risk: a.riskLevel, Status: a.status, Type: a.auditType,
        })), 'report_audits');
        break;
      case 'findings':
        exportCSV(findings.filter(f => !farmFilter || f.farmId === farmFilter).map(f => ({
          Title: f.title, Severity: f.severity, Status: f.status, Farm: farms.find(fm=>fm.id===f.farmId)?.name,
          Category: CATEGORY_LABELS[f.category], Created: f.createdAt,
        })), 'report_findings');
        break;
      case 'corrective_actions':
        exportCSV(correctiveActions.filter(ca => !farmFilter || ca.farmId === farmFilter).map(ca => ({
          Action: ca.actionDescription, Priority: ca.priority, Status: ca.status,
          Farm: farms.find(f=>f.id===ca.farmId)?.name, Target: ca.targetDate,
        })), 'report_ca');
        break;
      case 'farm_performance':
        exportCSV(farms.map(f => {
          const fa = audits.filter(a => a.farmId === f.id && a.overallScore > 0);
          const avg = fa.length > 0 ? fa.reduce((s, a) => s + a.overallScore, 0) / fa.length : 0;
          return { Farm: f.name, Type: f.type, Audits: fa.length, AvgScore: avg.toFixed(1), Status: f.status };
        }), 'report_performance');
        break;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const audit = selectedAudit ? audits.find(a => a.id === selectedAudit) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Laporan</h1>
        <div className="flex gap-2">
          <button onClick={handlePrint} className="btn-secondary text-sm flex items-center gap-1"><Printer className="w-4 h-4" /> Print</button>
          <button onClick={handleExportCSV} className="btn-primary text-sm flex items-center gap-1"><Download className="w-4 h-4" /> Export CSV</button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <select value={reportType} onChange={e => setReportType(e.target.value)} className="input-field w-auto text-sm">
          <option value="audit_summary">Ringkasan Audit</option>
          <option value="farm_performance">Performa Farm</option>
          <option value="findings">Temuan</option>
          <option value="corrective_actions">Tindakan Korektif</option>
          <option value="audit_detail">Detail Audit</option>
        </select>
        <select value={farmFilter} onChange={e => setFarmFilter(e.target.value)} className="input-field w-auto text-sm">
          <option value="">Semua Farm</option>
          {farms.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
        {reportType === 'audit_detail' && (
          <select value={selectedAudit} onChange={e => setSelectedAudit(e.target.value)} className="input-field w-auto text-sm">
            <option value="">Pilih Audit...</option>
            {filteredAudits.map(a => <option key={a.id} value={a.id}>{a.referenceNumber}</option>)}
          </select>
        )}
      </div>

      {/* Report Preview */}
      <div className="card p-6 print:p-0 print:border-0 print:shadow-none">
        {reportType === 'audit_summary' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Laporan Ringkasan Audit</h2>
            <p className="text-sm text-gray-500 mb-4">Periode: Semua data • Farm: {farmFilter ? farms.find(f=>f.id===farmFilter)?.name : 'Semua'}</p>
            <table className="w-full text-sm border">
              <thead className="bg-gray-100"><tr>
                <th className="border p-2 text-left">No. Ref</th><th className="border p-2 text-left">Farm</th>
                <th className="border p-2 text-left">Tanggal</th><th className="border p-2 text-center">Skor</th>
                <th className="border p-2 text-center">Status</th>
              </tr></thead>
              <tbody>
                {filteredAudits.map(a => (
                  <tr key={a.id}>
                    <td className="border p-2 font-mono text-xs">{a.referenceNumber}</td>
                    <td className="border p-2">{farms.find(f=>f.id===a.farmId)?.name}</td>
                    <td className="border p-2">{new Date(a.auditDate).toLocaleDateString('id-ID')}</td>
                    <td className="border p-2 text-center">{a.overallScore.toFixed(1)}%</td>
                    <td className="border p-2 text-center">{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {reportType === 'farm_performance' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Laporan Performa Farm</h2>
            <table className="w-full text-sm border">
              <thead className="bg-gray-100"><tr>
                <th className="border p-2 text-left">Farm</th><th className="border p-2 text-center">Total Audit</th>
                <th className="border p-2 text-center">Avg Skor</th><th className="border p-2 text-center">Status</th>
              </tr></thead>
              <tbody>
                {farms.map(f => {
                  const fa = audits.filter(a => a.farmId === f.id && a.overallScore > 0);
                  const avg = fa.length > 0 ? fa.reduce((s, a) => s + a.overallScore, 0) / fa.length : 0;
                  return (
                    <tr key={f.id}>
                      <td className="border p-2">{f.name}</td>
                      <td className="border p-2 text-center">{fa.length}</td>
                      <td className="border p-2 text-center">{avg.toFixed(1)}%</td>
                      <td className="border p-2 text-center">{f.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {reportType === 'findings' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Laporan Temuan</h2>
            <table className="w-full text-sm border">
              <thead className="bg-gray-100"><tr>
                <th className="border p-2 text-left">Judul</th><th className="border p-2 text-left">Farm</th>
                <th className="border p-2 text-center">Severity</th><th className="border p-2 text-center">Status</th>
              </tr></thead>
              <tbody>
                {findings.filter(f => !farmFilter || f.farmId === farmFilter).map(f => (
                  <tr key={f.id}>
                    <td className="border p-2">{f.title}</td>
                    <td className="border p-2">{farms.find(fm=>fm.id===f.farmId)?.name}</td>
                    <td className="border p-2 text-center">{f.severity}</td>
                    <td className="border p-2 text-center">{f.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {reportType === 'corrective_actions' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Laporan Tindakan Korektif</h2>
            <table className="w-full text-sm border">
              <thead className="bg-gray-100"><tr>
                <th className="border p-2 text-left">Tindakan</th><th className="border p-2 text-left">Farm</th>
                <th className="border p-2 text-center">Prioritas</th><th className="border p-2 text-center">Status</th>
                <th className="border p-2 text-center">Target</th>
              </tr></thead>
              <tbody>
                {correctiveActions.filter(ca => !farmFilter || ca.farmId === farmFilter).map(ca => (
                  <tr key={ca.id}>
                    <td className="border p-2">{ca.actionDescription}</td>
                    <td className="border p-2">{farms.find(f=>f.id===ca.farmId)?.name}</td>
                    <td className="border p-2 text-center">{ca.priority}</td>
                    <td className="border p-2 text-center">{ca.status}</td>
                    <td className="border p-2 text-center">{new Date(ca.targetDate).toLocaleDateString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {reportType === 'audit_detail' && audit && (
          <div>
            <h2 className="text-lg font-bold mb-2">Laporan Detail Audit</h2>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div><strong>No. Referensi:</strong> {audit.referenceNumber}</div>
              <div><strong>Farm:</strong> {farms.find(f=>f.id===audit.farmId)?.name}</div>
              <div><strong>Kandang:</strong> {houses.find(h=>h.id===audit.houseId)?.name}</div>
              <div><strong>Tanggal:</strong> {new Date(audit.auditDate).toLocaleDateString('id-ID')}</div>
              <div><strong>Auditor:</strong> {users.find(u=>u.id===audit.auditorId)?.name}</div>
              <div><strong>Template:</strong> {audit.templateName} v{audit.templateVersion}</div>
              <div><strong>Skor:</strong> {audit.overallScore.toFixed(1)}%</div>
              <div><strong>Risk Level:</strong> {audit.riskLevel}</div>
            </div>
            <h3 className="font-semibold mb-2">Skor per Kategori</h3>
            <table className="w-full text-sm border mb-4">
              <thead className="bg-gray-100"><tr>
                <th className="border p-2 text-left">Kategori</th><th className="border p-2 text-center">Pass</th>
                <th className="border p-2 text-center">Fail</th><th className="border p-2 text-center">Skor</th>
              </tr></thead>
              <tbody>
                {audit.sections.map(s => {
                  const pass = s.items.filter(i => i.score === i.maxScore && i.response && i.response !== 'na').length;
                  const total = s.items.filter(i => i.response && i.response !== 'na').length;
                  const score = total > 0 ? (s.items.reduce((sum, i) => sum + (i.response && i.response !== 'na' ? i.score : 0), 0) / s.items.reduce((sum, i) => sum + (i.response && i.response !== 'na' ? i.maxScore : 0), 0)) * 100 : 0;
                  return (
                    <tr key={s.id}><td className="border p-2">{s.name}</td><td className="border p-2 text-center">{pass}</td><td className="border p-2 text-center">{total - pass}</td><td className="border p-2 text-center">{score.toFixed(0)}%</td></tr>
                  );
                })}
              </tbody>
            </table>
            <h3 className="font-semibold mb-2">Temuan</h3>
            {findings.filter(f => f.auditId === audit.id).map(f => (
              <div key={f.id} className="text-sm mb-2 p-2 bg-gray-50 rounded">
                <span className="font-medium">{f.title}</span> <span className="text-gray-500">[{f.severity}]</span>
              </div>
            ))}
          </div>
        )}

        {reportType === 'audit_detail' && !audit && (
          <p className="text-gray-500 text-center py-8">Pilih audit untuk melihat detail laporan.</p>
        )}
      </div>
    </div>
  );
}
