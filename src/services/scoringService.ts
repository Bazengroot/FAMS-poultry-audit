import { AuditResponse, AuditSection, AppSettings } from '../types';
import { settingsService } from '../storage';

export interface ScoreResult {
  overallScore: number;
  categoryScores: Record<string, { earned: number; max: number; score: number; applicable: number; pass: number; fail: number; na: number }>;
  passCount: number;
  failCount: number;
  naCount: number;
  criticalFailures: AuditResponse[];
  riskLevel: string;
  hasCriticalFailure: boolean;
}

export function calculateItemScore(response: AuditResponse): number {
  if (response.response === 'na' || response.response === 'N/A') return 0;
  if (response.responseType === 'pass_fail' || response.responseType === 'yes_no' || response.responseType === 'compliant') {
    if (response.response === 'pass' || response.response === 'yes' || response.response === 'compliant') {
      return response.weight;
    }
    return 0;
  }
  if (response.responseType === 'rating') {
    const val = parseFloat(response.response);
    if (isNaN(val)) return 0;
    return (val / 5) * response.weight;
  }
  if (response.responseType === 'numeric') {
    const val = parseFloat(response.response);
    if (isNaN(val)) return 0;
    return Math.min(val / 100, 1) * response.weight;
  }
  // text responses get full weight if answered
  if (response.response && response.response.trim().length > 0) return response.weight;
  return 0;
}

export function calculateAuditScore(sections: AuditSection[]): ScoreResult {
  let totalEarned = 0;
  let totalMax = 0;
  let passCount = 0;
  let failCount = 0;
  let naCount = 0;
  const criticalFailures: AuditResponse[] = [];
  const categoryScores: Record<string, { earned: number; max: number; score: number; applicable: number; pass: number; fail: number; na: number }> = {};

  for (const section of sections) {
    const cat = section.category;
    if (!categoryScores[cat]) {
      categoryScores[cat] = { earned: 0, max: 0, score: 0, applicable: 0, pass: 0, fail: 0, na: 0 };
    }
    for (const item of section.items) {
      if (!item.response || item.response === '') continue;
      if (item.response === 'na' || item.response === 'N/A') {
        naCount++;
        categoryScores[cat].na++;
        continue;
      }
      const earned = calculateItemScore(item);
      const max = item.weight;
      totalEarned += earned;
      totalMax += max;
      categoryScores[cat].earned += earned;
      categoryScores[cat].max += max;
      categoryScores[cat].applicable++;
      // Pass if earned >= 80% of max weight (allows partial)
      if (earned >= max * 0.8) {
        passCount++;
        categoryScores[cat].pass++;
      } else {
        failCount++;
        categoryScores[cat].fail++;
        if (item.critical) {
          criticalFailures.push(item);
        }
      }
    }
  }

  for (const cat of Object.keys(categoryScores)) {
    const cs = categoryScores[cat];
    cs.score = cs.max > 0 ? (cs.earned / cs.max) * 100 : 0;
  }

  const overallScore = totalMax > 0 ? (totalEarned / totalMax) * 100 : 0;
  const settings = settingsService.get();
  const riskLevel = getRiskLevel(overallScore, settings, criticalFailures.length > 0);

  return {
    overallScore: Math.round(overallScore * 100) / 100,
    categoryScores,
    passCount,
    failCount,
    naCount,
    criticalFailures,
    riskLevel,
    hasCriticalFailure: criticalFailures.length > 0,
  };
}

function getRiskLevel(score: number, settings: AppSettings, hasCritical: boolean): string {
  if (hasCritical) return 'Kritis';
  if (score >= settings.scoreThresholds.excellent) return 'Excellent';
  if (score >= settings.scoreThresholds.good) return 'Baik';
  if (score >= settings.scoreThresholds.needsImprovement) return 'Perlu Perbaikan';
  if (score >= settings.scoreThresholds.poor) return 'Buruk';
  return 'Kritis';
}

export function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-blue-600';
  if (score >= 70) return 'text-yellow-600';
  if (score >= 60) return 'text-orange-600';
  return 'text-red-600';
}

export function getScoreBadgeColor(score: number): string {
  if (score >= 90) return 'bg-green-100 text-green-800';
  if (score >= 80) return 'bg-blue-100 text-blue-800';
  if (score >= 70) return 'bg-yellow-100 text-yellow-800';
  if (score >= 60) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
}

export function getRiskColor(risk: string): string {
  switch (risk) {
    case 'Excellent': return 'text-green-600';
    case 'Baik': return 'text-blue-600';
    case 'Perlu Perbaikan': return 'text-yellow-600';
    case 'Buruk': return 'text-orange-600';
    case 'Kritis': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

export function getRiskBadgeColor(risk: string): string {
  switch (risk) {
    case 'Excellent': return 'bg-green-100 text-green-800';
    case 'Baik': return 'bg-blue-100 text-blue-800';
    case 'Perlu Perbaikan': return 'bg-yellow-100 text-yellow-800';
    case 'Buruk': return 'bg-orange-100 text-orange-800';
    case 'Kritis': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}
