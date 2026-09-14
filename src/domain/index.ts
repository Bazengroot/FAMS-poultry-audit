/**
 * Domain Layer
 * 
 * This layer contains the core business logic and domain rules.
 * It is independent from the persistence layer and UI layer.
 * 
 * Domain rules include:
 * - Audit lifecycle management
 * - Department + Facility matching
 * - Template version selection
 * - Audit snapshot creation
 * - Response handling
 * - Finding classification
 * - Score calculation
 * - Status transitions
 */

import { Audit, AuditTemplate, Finding, CorrectiveAction, AuditSection, AuditResponse } from '../types';
import { v4 as uuid } from 'uuid';

/**
 * Audit Status Transitions
 * Defines valid status transitions for audits
 */
export const AUDIT_STATUS_TRANSITIONS: Record<string, string[]> = {
  draft: ['in_progress', 'submitted'],
  in_progress: ['submitted', 'draft'],
  submitted: ['reviewed', 'approved', 'rejected'],
  reviewed: ['approved', 'rejected'],
  approved: ['closed'],
  rejected: ['in_progress', 'draft'],
  closed: [],
};

/**
 * Check if a status transition is valid
 * 
 * @param currentStatus - The current audit status
 * @param newStatus - The new status to transition to
 * @returns true if the transition is valid, false otherwise
 */
export function isValidStatusTransition(currentStatus: string, newStatus: string): boolean {
  const allowedTransitions = AUDIT_STATUS_TRANSITIONS[currentStatus] || [];
  return allowedTransitions.includes(newStatus);
}

/**
 * Validate a status transition
 * Throws an error if the transition is not valid
 * 
 * @param currentStatus - The current audit status
 * @param newStatus - The new status to transition to
 * @throws Error if the transition is not valid
 */
export function validateStatusTransition(currentStatus: string, newStatus: string): void {
  if (!isValidStatusTransition(currentStatus, newStatus)) {
    throw new Error(
      `Invalid status transition: Cannot transition from '${currentStatus}' to '${newStatus}'`
    );
  }
}

/**
 * Create an audit snapshot from a template
 * This preserves the template state at the time of audit creation
 * 
 * @param template - The audit template to snapshot
 * @returns An array of audit sections with empty responses
 */
export function createAuditSnapshot(template: AuditTemplate): AuditSection[] {
  return template.sections.map(section => ({
    id: uuid(),
    name: section.name,
    category: section.category,
    items: section.items.map(item => ({
      itemId: item.id,
      question: item.question,
      category: item.category,
      weight: item.weight,
      critical: item.critical,
      responseType: item.responseType,
      response: '',
      notes: '',
      evidence: '',
      hasFinding: false,
      needsCorrectiveAction: false,
      score: 0,
      maxScore: item.weight,
    })),
  }));
}

/**
 * Match a template to a facility based on department and facility type
 * 
 * @param departmentId - The department ID
 * @param facilityType - The facility type
 * @param templates - Available templates
 * @returns The matching template or undefined if no match found
 */
export function matchTemplateToFacility(
  departmentId: string,
  facilityType: string,
  templates: AuditTemplate[]
): AuditTemplate | undefined {
  // Filter templates by department and facility type
  const matchingTemplates = templates.filter(template => {
    // Check if template matches department
    const matchesDepartment = template.departmentId === departmentId;
    
    // Check if template matches facility type
    const matchesFacilityType = template.facilityTypes?.includes(facilityType as any);
    
    return matchesDepartment && matchesFacilityType;
  });

  // Return the first matching template (or undefined if none found)
  return matchingTemplates[0];
}

/**
 * Classify a finding based on the audit response
 * 
 * @param response - The audit response
 * @returns The finding severity or undefined if no finding
 */
export function classifyFinding(response: AuditResponse): 'critical' | 'major' | 'minor' | 'observation' | undefined {
  // If response is compliant, no finding
  if (response.response === 'pass' || response.response === 'yes' || response.response === 'compliant') {
    return undefined;
  }

  // If response is N/A, no finding
  if (response.response === 'na' || response.response === 'N/A') {
    return undefined;
  }

  // If item is critical and failed, classify as critical
  if (response.critical && (response.response === 'fail' || response.response === 'no' || response.response === 'non_compliant')) {
    return 'critical';
  }

  // If item is not critical but failed, classify based on weight
  if (response.response === 'fail' || response.response === 'no' || response.response === 'non_compliant') {
    if (response.weight >= 3) {
      return 'major';
    } else if (response.weight >= 2) {
      return 'minor';
    } else {
      return 'observation';
    }
  }

  return undefined;
}

/**
 * Create a finding from an audit response
 * 
 * @param response - The audit response
 * @param auditId - The audit ID
 * @param facilityId - The facility ID
 * @returns A new finding or undefined if no finding needed
 */
export function createFindingFromResponse(
  response: AuditResponse,
  auditId: string,
  facilityId: string
): Finding | undefined {
  const severity = classifyFinding(response);
  
  if (!severity) {
    return undefined;
  }

  return {
    id: uuid(),
    auditId,
    facilityId,
    category: response.category,
    checklistItemId: response.itemId,
    title: `Temuan: ${response.question.substring(0, 60)}`,
    description: `Item tidak memenuhi standar.`,
    severity,
    risk: severity === 'critical' ? 'Tinggi' : severity === 'major' ? 'Sedang' : 'Rendah',
    rootCause: '',
    evidence: '',
    status: 'open',
    createdBy: '', // Will be set by the caller
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Create a corrective action from a finding
 * 
 * @param finding - The finding
 * @param auditId - The audit ID
 * @param facilityId - The facility ID
 * @returns A new corrective action
 */
export function createCorrectiveActionFromFinding(
  finding: Finding,
  auditId: string,
  facilityId: string
): CorrectiveAction {
  return {
    id: uuid(),
    findingId: finding.id,
    auditId,
    facilityId,
    responsiblePersonId: '', // Will be set by the caller
    actionDescription: `Tindakan korektif untuk: ${finding.title}`,
    rootCause: '',
    preventiveAction: '',
    targetDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0], // 14 days from now
    priority: finding.severity === 'critical' ? 'urgent' : finding.severity === 'major' ? 'high' : 'medium',
    status: 'open',
    verificationNotes: '',
    evidence: '',
    createdBy: '', // Will be set by the caller
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Calculate audit score from responses
 * This is a placeholder - the actual scoring logic is in scoringService
 * 
 * @param sections - The audit sections with responses
 * @returns The overall score (0-100)
 */
export function calculateAuditScore(sections: AuditSection[]): number {
  // This is a placeholder - the actual implementation is in scoringService
  // This function is here to show the domain layer concept
  return 0;
}

/**
 * Domain Layer Initialization
 * Call this on application startup
 */
export function initializeDomain(): void {
  console.log('[Domain] Domain layer initialized');
}

/**
 * Domain Layer Cleanup
 * Call this on application shutdown
 */
export function cleanupDomain(): void {
  console.log('[Domain] Domain layer cleaned up');
}
