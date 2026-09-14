// Template Validation Service
// Validates audit templates for structural integrity, quality, and compliance

import { AuditTemplate, AuditTemplateSection, ChecklistItem, TemplateReference } from '../types';
import { REFERENCE_LIBRARY } from '../data/referenceLibrary';

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  score: number; // 0-100 quality score
}

export interface ValidationError {
  code: string;
  message: string;
  severity: 'critical' | 'major';
  location?: string;
}

export interface ValidationWarning {
  code: string;
  message: string;
  severity: 'minor' | 'info';
  location?: string;
}

// Main validation function
export function validateTemplate(template: AuditTemplate): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  let score = 100;

  // 1. Validate template metadata
  validateTemplateMetadata(template, errors, warnings);

  // 2. Validate sections
  template.sections.forEach((section, idx) => {
    validateSection(section, idx, errors, warnings);
  });

  // 3. Validate questions
  template.sections.forEach((section, sIdx) => {
    section.items.forEach((item, qIdx) => {
      validateQuestion(item, sIdx, qIdx, errors, warnings);
    });
  });

  // 4. Validate references
  if (template.references) {
    template.references.forEach((ref, idx) => {
      validateReference(ref, idx, errors, warnings);
    });
  }

  // 5. Check for duplicates
  checkDuplicates(template, errors, warnings);

  // 6. Calculate quality score
  score = calculateQualityScore(template, errors, warnings);

  return {
    valid: errors.filter(e => e.severity === 'critical').length === 0,
    errors,
    warnings,
    score
  };
}

// Validate template metadata
function validateTemplateMetadata(template: AuditTemplate, errors: ValidationError[], warnings: ValidationWarning[]): void {
  if (!template.code || template.code.trim() === '') {
    errors.push({
      code: 'TMPL-001',
      message: 'Template code is required',
      severity: 'critical',
      location: 'template.code'
    });
  }

  if (!template.name || template.name.trim() === '') {
    errors.push({
      code: 'TMPL-002',
      message: 'Template name is required',
      severity: 'critical',
      location: 'template.name'
    });
  }

  if (!template.description || template.description.trim() === '') {
    warnings.push({
      code: 'TMPL-003',
      message: 'Template description is recommended',
      severity: 'minor',
      location: 'template.description'
    });
  }

  if (!template.facilityTypes || template.facilityTypes.length === 0) {
    errors.push({
      code: 'TMPL-004',
      message: 'At least one facility type must be specified',
      severity: 'critical',
      location: 'template.facilityTypes'
    });
  }

  if (!template.departmentId) {
    warnings.push({
      code: 'TMPL-005',
      message: 'Department assignment is recommended',
      severity: 'minor',
      location: 'template.departmentId'
    });
  }

  if (!template.version || template.version.trim() === '') {
    errors.push({
      code: 'TMPL-006',
      message: 'Template version is required',
      severity: 'critical',
      location: 'template.version'
    });
  }

  if (template.sections.length === 0) {
    errors.push({
      code: 'TMPL-007',
      message: 'Template must have at least one section',
      severity: 'critical',
      location: 'template.sections'
    });
  }
}

// Validate section
function validateSection(section: AuditTemplateSection, index: number, errors: ValidationError[], warnings: ValidationWarning[]): void {
  if (!section.name || section.name.trim() === '') {
    errors.push({
      code: 'SEC-001',
      message: `Section ${index + 1}: Name is required`,
      severity: 'critical',
      location: `template.sections[${index}].name`
    });
  }

  if (!section.category) {
    errors.push({
      code: 'SEC-002',
      message: `Section ${index + 1} (${section.name}): Category is required`,
      severity: 'critical',
      location: `template.sections[${index}].category`
    });
  }

  if (section.items.length === 0) {
    errors.push({
      code: 'SEC-003',
      message: `Section ${index + 1} (${section.name}): Must have at least one question`,
      severity: 'critical',
      location: `template.sections[${index}].items`
    });
  }

  if (section.items.length < 3) {
    warnings.push({
      code: 'SEC-004',
      message: `Section ${index + 1} (${section.name}): Consider adding more questions (currently ${section.items.length})`,
      severity: 'info',
      location: `template.sections[${index}].items`
    });
  }

  if (!section.description || section.description.trim() === '') {
    warnings.push({
      code: 'SEC-005',
      message: `Section ${index + 1} (${section.name}): Description is recommended`,
      severity: 'minor',
      location: `template.sections[${index}].description`
    });
  }
}

// Validate question
function validateQuestion(item: ChecklistItem, sectionIndex: number, questionIndex: number, errors: ValidationError[], warnings: ValidationWarning[]): void {
  const location = `template.sections[${sectionIndex}].items[${questionIndex}]`;
  const sectionName = `Section ${sectionIndex + 1}, Question ${questionIndex + 1}`;

  if (!item.questionCode || item.questionCode.trim() === '') {
    warnings.push({
      code: 'Q-001',
      message: `${sectionName}: Question code is recommended for traceability`,
      severity: 'minor',
      location: `${location}.questionCode`
    });
  }

  if (!item.question || item.question.trim() === '') {
    errors.push({
      code: 'Q-002',
      message: `${sectionName}: Question text is required`,
      severity: 'critical',
      location: `${location}.question`
    });
  }

  if (item.question.length < 20) {
    warnings.push({
      code: 'Q-003',
      message: `${sectionName}: Question text is too short (minimum 20 characters recommended)`,
      severity: 'minor',
      location: `${location}.question`
    });
  }

  if (!item.category) {
    errors.push({
      code: 'Q-004',
      message: `${sectionName}: Category is required`,
      severity: 'critical',
      location: `${location}.category`
    });
  }

  if (!item.weight || item.weight <= 0) {
    errors.push({
      code: 'Q-005',
      message: `${sectionName}: Weight must be greater than 0`,
      severity: 'critical',
      location: `${location}.weight`
    });
  }

  if (!item.responseType) {
    errors.push({
      code: 'Q-006',
      message: `${sectionName}: Response type is required`,
      severity: 'critical',
      location: `${location}.responseType`
    });
  }

  if (!item.guidance || item.guidance.trim() === '') {
    warnings.push({
      code: 'Q-007',
      message: `${sectionName}: Guidance is recommended for auditors`,
      severity: 'minor',
      location: `${location}.guidance`
    });
  }

  if (item.critical && !item.evidenceRequired) {
    warnings.push({
      code: 'Q-008',
      message: `${sectionName}: Critical items should require evidence`,
      severity: 'minor',
      location: `${location}.evidenceRequired`
    });
  }

  if (!item.complianceCriteria || item.complianceCriteria.length === 0) {
    warnings.push({
      code: 'Q-009',
      message: `${sectionName}: Compliance criteria are recommended`,
      severity: 'minor',
      location: `${location}.complianceCriteria`
    });
  }

  if (!item.evidenceRequirements || item.evidenceRequirements.length === 0) {
    warnings.push({
      code: 'Q-010',
      message: `${sectionName}: Evidence requirements are recommended`,
      severity: 'minor',
      location: `${location}.evidenceRequirements`
    });
  }

  // Check for vague questions
  const vagueTerms = ['good', 'proper', 'adequate', 'sufficient', 'appropriate'];
  const questionLower = item.question.toLowerCase();
  const hasVagueTerm = vagueTerms.some(term => questionLower.includes(term));
  
  if (hasVagueTerm && !item.complianceCriteria?.length) {
    warnings.push({
      code: 'Q-011',
      message: `${sectionName}: Question contains vague terms. Consider adding specific compliance criteria`,
      severity: 'info',
      location: `${location}.question`
    });
  }
}

// Validate reference
function validateReference(ref: TemplateReference, index: number, errors: ValidationError[], warnings: ValidationWarning[]): void {
  const location = `template.references[${index}]`;

  if (!ref.code || ref.code.trim() === '') {
    errors.push({
      code: 'REF-001',
      message: `Reference ${index + 1}: Code is required`,
      severity: 'critical',
      location: `${location}.code`
    });
  }

  if (!ref.title || ref.title.trim() === '') {
    errors.push({
      code: 'REF-002',
      message: `Reference ${index + 1}: Title is required`,
      severity: 'critical',
      location: `${location}.title`
    });
  }

  if (!ref.organization || ref.organization.trim() === '') {
    errors.push({
      code: 'REF-003',
      message: `Reference ${index + 1}: Organization is required`,
      severity: 'critical',
      location: `${location}.organization`
    });
  }

  // Check if reference exists in library
  const libraryRef = REFERENCE_LIBRARY.find(r => r.code === ref.code);
  if (!libraryRef) {
    warnings.push({
      code: 'REF-004',
      message: `Reference ${index + 1} (${ref.code}): Not found in reference library. Verify this reference.`,
      severity: 'minor',
      location: `${location}.code`
    });
  } else if (libraryRef.verificationStatus === 'unverified') {
    warnings.push({
      code: 'REF-005',
      message: `Reference ${index + 1} (${ref.code}): Reference is unverified. Use with caution.`,
      severity: 'minor',
      location: `${location}.code`
    });
  }
}

// Check for duplicates
function checkDuplicates(template: AuditTemplate, errors: ValidationError[], warnings: ValidationWarning[]): void {
  // Check for duplicate question codes
  const questionCodes = new Set<string>();
  template.sections.forEach((section, sIdx) => {
    section.items.forEach((item, qIdx) => {
      if (item.questionCode) {
        if (questionCodes.has(item.questionCode)) {
          errors.push({
            code: 'DUP-001',
            message: `Duplicate question code: ${item.questionCode}`,
            severity: 'critical',
            location: `template.sections[${sIdx}].items[${qIdx}].questionCode`
          });
        }
        questionCodes.add(item.questionCode);
      }
    });
  });

  // Check for similar questions (simple check)
  template.sections.forEach((section, sIdx) => {
    const questions = section.items.map(item => item.question.toLowerCase());
    for (let i = 0; i < questions.length; i++) {
      for (let j = i + 1; j < questions.length; j++) {
        const similarity = calculateSimilarity(questions[i], questions[j]);
        if (similarity > 0.8) {
          warnings.push({
            code: 'DUP-002',
            message: `Section ${sIdx + 1}: Questions ${i + 1} and ${j + 1} appear to be duplicates (${(similarity * 100).toFixed(0)}% similar)`,
            severity: 'info',
            location: `template.sections[${sIdx}].items`
          });
        }
      }
    }
  });
}

// Calculate string similarity (simple Jaccard similarity)
function calculateSimilarity(str1: string, str2: string): number {
  const words1 = new Set(str1.split(/\s+/));
  const words2 = new Set(str2.split(/\s+/));
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  return intersection.size / union.size;
}

// Calculate quality score
function calculateQualityScore(template: AuditTemplate, errors: ValidationError[], warnings: ValidationWarning[]): number {
  let score = 100;

  // Deduct for errors
  errors.forEach(error => {
    if (error.severity === 'critical') {
      score -= 10;
    } else {
      score -= 5;
    }
  });

  // Deduct for warnings
  warnings.forEach(warning => {
    if (warning.severity === 'minor') {
      score -= 2;
    } else {
      score -= 1;
    }
  });

  // Bonus for comprehensive templates
  const totalQuestions = template.sections.reduce((sum, s) => sum + s.items.length, 0);
  if (totalQuestions >= 100) {
    score += 5;
  }

  // Bonus for references
  if (template.references && template.references.length > 0) {
    score += 5;
  }

  // Bonus for compliance criteria
  const questionsWithCriteria = template.sections.reduce((sum, s) => 
    sum + s.items.filter(i => i.complianceCriteria && i.complianceCriteria.length > 0).length, 0);
  const criteriaPercentage = questionsWithCriteria / totalQuestions;
  if (criteriaPercentage > 0.8) {
    score += 5;
  }

  return Math.max(0, Math.min(100, score));
}

// Validate template for activation
export function validateForActivation(template: AuditTemplate): ValidationResult {
  const result = validateTemplate(template);

  // Additional checks for activation
  if (result.score < 70) {
    result.errors.push({
      code: 'ACT-001',
      message: 'Template quality score must be at least 70 to activate',
      severity: 'critical',
      location: 'template'
    });
    result.valid = false;
  }

  const criticalErrors = result.errors.filter(e => e.severity === 'critical');
  if (criticalErrors.length > 0) {
    result.valid = false;
  }

  return result;
}

// Generate validation report
export function generateValidationReport(template: AuditTemplate): string {
  const result = validateTemplate(template);
  
  let report = '=== TEMPLATE VALIDATION REPORT ===\n\n';
  report += `Template: ${template.name} (${template.code})\n`;
  report += `Version: ${template.version}\n`;
  report += `Valid: ${result.valid ? 'YES' : 'NO'}\n`;
  report += `Quality Score: ${result.score}/100\n\n`;

  if (result.errors.length > 0) {
    report += '--- ERRORS ---\n';
    result.errors.forEach(error => {
      report += `[${error.severity.toUpperCase()}] ${error.code}: ${error.message}\n`;
      if (error.location) {
        report += `  Location: ${error.location}\n`;
      }
    });
    report += '\n';
  }

  if (result.warnings.length > 0) {
    report += '--- WARNINGS ---\n';
    result.warnings.forEach(warning => {
      report += `[${warning.severity.toUpperCase()}] ${warning.code}: ${warning.message}\n`;
      if (warning.location) {
        report += `  Location: ${warning.location}\n`;
      }
    });
    report += '\n';
  }

  if (result.errors.length === 0 && result.warnings.length === 0) {
    report += '✅ No errors or warnings found. Template is high quality.\n';
  }

  return report;
}
