// Template Helper Functions
// Reusable utilities for creating audit template questions and sections

import { ChecklistItem, AuditTemplateSection, AuditCategory } from '../../types';
import { v4 as uuid } from 'uuid';

export type ResponseType = 'pass_fail' | 'yes_no' | 'compliant' | 'rating' | 'text' | 'numeric' | 'percentage' | 'temperature' | 'date' | 'select' | 'multi_select' | 'na';
export type Severity = 'critical' | 'major' | 'minor' | 'observation';
export type ScoringType = 'binary' | 'partial' | 'numeric';
export type ReferenceType = 'REGULATORY' | 'SNI' | 'GOVERNMENT_GUIDANCE' | 'CODEX' | 'WOAH' | 'HACCP' | 'GMP' | 'GHP' | 'COMPANY_STANDARD' | 'INDUSTRY_STANDARD' | 'INDUSTRY_BEST_PRACTICE' | 'VERIFICATION_REQUIRED';

export interface QuestionConfig {
  questionCode: string;
  question: string;
  category: AuditCategory;
  weight: number;
  critical: boolean;
  responseType: ResponseType;
  guidance: string;
  complianceCriteria: string[];
  evidenceRequirements: string[];
  referenceIds: string[];
  severity: Severity;
  order: number;
  requirement?: string;
  scoringType?: ScoringType;
  maximumScore?: number;
}

export interface SectionConfig {
  sectionCode: string;
  name: string;
  category: AuditCategory;
  description: string;
  items: ChecklistItem[];
  order: number;
  weight?: number;
}

/**
 * Create a checklist item (question) with all metadata
 */
export function createQuestion(config: QuestionConfig): ChecklistItem {
  return {
    id: uuid(),
    questionCode: config.questionCode,
    question: config.question,
    description: config.requirement || '',
    category: config.category,
    weight: config.weight,
    mandatory: true,
    responseType: config.responseType as any,
    critical: config.critical,
    evidenceRequired: config.critical || config.evidenceRequirements.length > 0,
    correctiveActionRequired: config.critical,
    guidance: config.guidance,
    order: config.order,
    complianceCriteria: config.complianceCriteria,
    evidenceRequirements: config.evidenceRequirements,
    referenceIds: config.referenceIds,
    severity: config.severity,
    scoringType: config.scoringType || (config.responseType === 'rating' || config.responseType === 'numeric' ? 'numeric' : 'binary'),
    maximumScore: config.maximumScore || config.weight
  };
}

/**
 * Create a template section with questions
 */
export function createSection(config: SectionConfig): AuditTemplateSection {
  return {
    id: uuid(),
    sectionCode: config.sectionCode,
    name: config.name,
    category: config.category,
    description: config.description,
    order: config.order,
    items: config.items,
    weight: config.weight || 1,
    mandatory: true
  };
}

/**
 * Create a biosecurity question with standard structure
 */
export function createBiosecurityQuestion(
  code: string,
  question: string,
  weight: number,
  critical: boolean,
  guidance: string,
  complianceCriteria: string[],
  evidence: string[],
  severity: Severity,
  order: number,
  referenceIds: string[] = ['ref-woah-001']
): ChecklistItem {
  return createQuestion({
    questionCode: code,
    question,
    category: 'biosecurity',
    weight,
    critical,
    responseType: 'pass_fail',
    guidance,
    complianceCriteria,
    evidenceRequirements: evidence,
    referenceIds,
    severity,
    order
  });
}

/**
 * Create an animal health question
 */
export function createAnimalHealthQuestion(
  code: string,
  question: string,
  weight: number,
  critical: boolean,
  guidance: string,
  complianceCriteria: string[],
  evidence: string[],
  severity: Severity,
  order: number,
  referenceIds: string[] = ['ref-id-003']
): ChecklistItem {
  return createQuestion({
    questionCode: code,
    question,
    category: 'animal_health',
    weight,
    critical,
    responseType: 'pass_fail',
    guidance,
    complianceCriteria,
    evidenceRequirements: evidence,
    referenceIds,
    severity,
    order
  });
}

/**
 * Create a feed management question
 */
export function createFeedManagementQuestion(
  code: string,
  question: string,
  weight: number,
  critical: boolean,
  guidance: string,
  complianceCriteria: string[],
  evidence: string[],
  severity: Severity,
  order: number,
  referenceIds: string[] = ['ref-sni-001']
): ChecklistItem {
  return createQuestion({
    questionCode: code,
    question,
    category: 'feed_management',
    weight,
    critical,
    responseType: 'pass_fail',
    guidance,
    complianceCriteria,
    evidenceRequirements: evidence,
    referenceIds,
    severity,
    order
  });
}

/**
 * Create a water management question
 */
export function createWaterManagementQuestion(
  code: string,
  question: string,
  weight: number,
  critical: boolean,
  guidance: string,
  complianceCriteria: string[],
  evidence: string[],
  severity: Severity,
  order: number,
  referenceIds: string[] = ['ref-sni-001']
): ChecklistItem {
  return createQuestion({
    questionCode: code,
    question,
    category: 'water_management',
    weight,
    critical,
    responseType: 'pass_fail',
    guidance,
    complianceCriteria,
    evidenceRequirements: evidence,
    referenceIds,
    severity,
    order
  });
}

/**
 * Create a housing/environment question
 */
export function createHousingQuestion(
  code: string,
  question: string,
  weight: number,
  critical: boolean,
  guidance: string,
  complianceCriteria: string[],
  evidence: string[],
  severity: Severity,
  order: number,
  referenceIds: string[] = ['ref-sni-001']
): ChecklistItem {
  return createQuestion({
    questionCode: code,
    question,
    category: 'housing',
    weight,
    critical,
    responseType: 'pass_fail',
    guidance,
    complianceCriteria,
    evidenceRequirements: evidence,
    referenceIds,
    severity,
    order
  });
}

/**
 * Create a documentation question
 */
export function createDocumentationQuestion(
  code: string,
  question: string,
  weight: number,
  critical: boolean,
  guidance: string,
  complianceCriteria: string[],
  evidence: string[],
  severity: Severity,
  order: number,
  referenceIds: string[] = ['ref-id-003']
): ChecklistItem {
  return createQuestion({
    questionCode: code,
    question,
    category: 'documentation',
    weight,
    critical,
    responseType: 'pass_fail',
    guidance,
    complianceCriteria,
    evidenceRequirements: evidence,
    referenceIds,
    severity,
    order
  });
}

/**
 * Create a welfare question
 */
export function createWelfareQuestion(
  code: string,
  question: string,
  weight: number,
  critical: boolean,
  guidance: string,
  complianceCriteria: string[],
  evidence: string[],
  severity: Severity,
  order: number,
  referenceIds: string[] = ['ref-woah-004']
): ChecklistItem {
  return createQuestion({
    questionCode: code,
    question,
    category: 'welfare',
    weight,
    critical,
    responseType: 'pass_fail',
    guidance,
    complianceCriteria,
    evidenceRequirements: evidence,
    referenceIds,
    severity,
    order
  });
}

/**
 * Create a sanitation question
 */
export function createSanitationQuestion(
  code: string,
  question: string,
  weight: number,
  critical: boolean,
  guidance: string,
  complianceCriteria: string[],
  evidence: string[],
  severity: Severity,
  order: number,
  referenceIds: string[] = ['ref-woah-001']
): ChecklistItem {
  return createQuestion({
    questionCode: code,
    question,
    category: 'sanitation',
    weight,
    critical,
    responseType: 'pass_fail',
    guidance,
    complianceCriteria,
    evidenceRequirements: evidence,
    referenceIds,
    severity,
    order
  });
}

/**
 * Create a personnel question
 */
export function createPersonnelQuestion(
  code: string,
  question: string,
  weight: number,
  critical: boolean,
  guidance: string,
  complianceCriteria: string[],
  evidence: string[],
  severity: Severity,
  order: number,
  referenceIds: string[] = ['ref-id-003']
): ChecklistItem {
  return createQuestion({
    questionCode: code,
    question,
    category: 'personnel',
    weight,
    critical,
    responseType: 'pass_fail',
    guidance,
    complianceCriteria,
    evidenceRequirements: evidence,
    referenceIds,
    severity,
    order
  });
}

/**
 * Create a farm management question
 */
export function createFarmManagementQuestion(
  code: string,
  question: string,
  weight: number,
  critical: boolean,
  guidance: string,
  complianceCriteria: string[],
  evidence: string[],
  severity: Severity,
  order: number,
  referenceIds: string[] = ['ref-id-003']
): ChecklistItem {
  return createQuestion({
    questionCode: code,
    question,
    category: 'farm_management',
    weight,
    critical,
    responseType: 'pass_fail',
    guidance,
    complianceCriteria,
    evidenceRequirements: evidence,
    referenceIds,
    severity,
    order
  });
}
