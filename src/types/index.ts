// ============================================================
// TYPES - Farm Audit Management System (Enterprise Poultry Integrator)
// ============================================================

export type UserRole = 'super_admin' | 'admin' | 'auditor' | 'farm_manager' | 'supervisor' | 'viewer';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  department: string;
  assignedFarms: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

/**
 * @deprecated Use Facility instead. Farm is kept for backward compatibility only.
 * Migration: Farm → Facility (via legacyFarmId mapping)
 */
export type FarmType = 'parent_stock_broiler' | 'broiler' | 'layer';
export type FarmStatus = 'active' | 'inactive' | 'archived';

/**
 * @deprecated Use Facility instead. Farm is kept for backward compatibility only.
 */
export interface Farm {
  id: string;
  code: string;
  name: string;
  type: FarmType;
  company: string;
  province: string;
  regency: string;
  district: string;
  address: string;
  farmManagerId: string;
  supervisorId: string;
  numberOfHouses: number;
  capacity: number;
  status: FarmStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type ProductionStage = 'brooding' | 'growing' | 'production' | 'empty' | 'cleaning' | 'downtime';
export type HouseStatus = 'active' | 'inactive' | 'maintenance';

/**
 * @deprecated Use FacilityArea instead. FarmHouse is kept for backward compatibility only.
 * Migration: FarmHouse → FacilityArea (via legacyHouseId mapping)
 */
export interface FarmHouse {
  id: string;
  code: string;
  name: string;
  farmId: string;
  type: string;
  capacity: number;
  currentPopulation: number;
  flockId: string;
  flockAge: number;
  breed: string;
  placementDate: string;
  productionStage: ProductionStage;
  status: HouseStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type AuditCategory = 'biosecurity' | 'animal_health' | 'feed_management' | 'water_management' | 'housing' | 'environment' | 'equipment' | 'farm_management' | 'personnel' | 'documentation' | 'welfare' | 'sanitation';

export type ResponseType = 'pass_fail' | 'yes_no' | 'compliant' | 'numeric' | 'rating' | 'text' | 'na';

export interface ChecklistItem {
  id: string;
  questionCode?: string; // Unique question identifier (e.g., BF-01-001)
  question: string;
  description: string;
  category: AuditCategory;
  weight: number;
  mandatory: boolean;
  responseType: ResponseType;
  critical: boolean;
  evidenceRequired: boolean;
  correctiveActionRequired: boolean;
  guidance: string;
  order: number;
  
  // Enhanced metadata for enterprise audit system
  complianceCriteria?: string[]; // What constitutes compliance
  evidenceRequirements?: string[]; // What evidence is needed
  referenceIds?: string[]; // Links to reference standards
  severity?: 'critical' | 'major' | 'minor' | 'observation';
  scoringType?: 'binary' | 'partial' | 'numeric';
  maximumScore?: number;
  partialCreditRules?: string; // How partial credit is calculated
}

export interface AuditTemplateSection {
  id: string;
  sectionCode?: string; // Unique section identifier (e.g., BF-01)
  name: string;
  category: AuditCategory;
  description: string;
  order: number;
  items: ChecklistItem[];
  
  // Enhanced section metadata
  weight?: number; // Section weight in overall scoring
  mandatory?: boolean; // Whether section is mandatory
  estimatedDuration?: number; // Estimated time in minutes
  prerequisites?: string[]; // What should be checked before this section
  relatedSections?: string[]; // Related section IDs
}

export type TemplateStatus = 'active' | 'inactive' | 'archived' | 'draft';

export interface AuditTemplate {
  id: string;
  code?: string;
  name: string;
  description: string;
  /**
   * @deprecated Use facilityTypes instead. Kept for backward compatibility.
   */
  farmType?: FarmType | 'all';
  /**
   * Enterprise: Facility types this template applies to
   */
  facilityTypes?: FacilityType[];
  /**
   * Enterprise: Department this template belongs to
   */
  departmentId?: string;
  /**
   * Enterprise: Audit category (biosecurity, quality, etc.)
   */
  auditCategory?: string;
  /**
   * Enterprise: Reference standards (SNI, WOAH, FAO, etc.)
   */
  references?: TemplateReference[];
  version: string;
  effectiveDate?: string;
  reviewDate?: string; // When template should be reviewed
  status: TemplateStatus;
  sections: AuditTemplateSection[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy?: string; // Who last updated
  
  // Enhanced template metadata
  totalQuestions?: number; // Total number of questions
  estimatedDuration?: number; // Estimated audit duration in minutes
  scoringConfiguration?: {
    passThreshold?: number; // Minimum score to pass
    criticalWeight?: number; // Weight for critical items
    majorWeight?: number; // Weight for major items
    minorWeight?: number; // Weight for minor items
  };
  tags?: string[]; // Template tags for filtering
  icon?: string; // Template icon
  color?: string; // Template color
  isPublic?: boolean; // Whether template is publicly available
  usageCount?: number; // How many times template has been used
}

export interface TemplateReference {
  id: string;
  code: string; // e.g., "SNI 8173-2:2023"
  title: string;
  organization: string; // e.g., "BSN", "WOAH", "FAO"
  year?: string;
  status: 'valid' | 'superseded' | 'withdrawn';
  url?: string;
  notes?: string;
  
  // Enhanced reference metadata
  sourceType?: 'regulation' | 'standard' | 'guideline' | 'best-practice' | 'company-policy';
  verificationStatus?: 'verified' | 'unverified' | 'deprecated';
  clause?: string; // Specific clause/section
  section?: string; // Document section
  country?: string; // Country of origin
  language?: string; // Document language
  lastVerified?: string; // When this reference was last verified
}

export type AuditType = 'routine' | 'internal' | 'follow_up' | 'special' | 'pre_operation' | 'biosecurity' | 'management';
export type AuditStatus = 'draft' | 'in_progress' | 'submitted' | 'reviewed' | 'approved' | 'rejected' | 'archived';

export interface AuditResponse {
  itemId: string;
  question: string;
  category: AuditCategory;
  weight: number;
  critical: boolean;
  responseType: ResponseType;
  response: string;
  notes: string;
  evidence: string;
  hasFinding: boolean;
  needsCorrectiveAction: boolean;
  score: number;
  maxScore: number;
}

export interface AuditSection {
  id: string;
  name: string;
  category: AuditCategory;
  items: AuditResponse[];
}

export interface Audit {
  id: string;
  referenceNumber: string;
  /**
   * @deprecated Use facilityId instead. Kept for backward compatibility.
   */
  farmId?: string;
  /**
   * @deprecated Use facilityAreaId instead. Kept for backward compatibility.
   */
  houseId?: string;
  /**
   * Enterprise: Department reference
   */
  departmentId?: string;
  /**
   * Primary facility reference for enterprise audit system
   */
  facilityId?: string;
  /**
   * Optional facility area/unit within the facility
   */
  facilityAreaId?: string;
  templateId: string;
  templateName: string;
  templateVersion: string;
  auditorId: string;
  auditDate: string;
  auditType: AuditType;
  status: AuditStatus;
  sections: AuditSection[];
  overallScore: number;
  riskLevel: string;
  hasCriticalFailure: boolean;
  passCount: number;
  failCount: number;
  naCount: number;
  notes: string;
  submittedAt?: string;
  reviewedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export type FindingSeverity = 'critical' | 'major' | 'minor' | 'observation';
export type FindingStatus = 'open' | 'in_progress' | 'resolved' | 'verified' | 'closed' | 'rejected';

export interface Finding {
  id: string;
  auditId: string;
  /**
   * @deprecated Use facilityId instead. Kept for backward compatibility.
   */
  farmId?: string;
  /**
   * @deprecated Use facilityAreaId instead. Kept for backward compatibility.
   */
  houseId?: string;
  /**
   * Primary facility reference for enterprise audit system
   */
  facilityId?: string;
  /**
   * Optional facility area/unit within the facility
   */
  facilityAreaId?: string;
  category: AuditCategory;
  checklistItemId: string;
  title: string;
  description: string;
  severity: FindingSeverity;
  risk: string;
  rootCause: string;
  evidence: string;
  status: FindingStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type CAPriority = 'urgent' | 'high' | 'medium' | 'low';
export type CAStatus = 'open' | 'in_progress' | 'submitted_verification' | 'verified' | 'closed' | 'overdue' | 'rejected';

export interface CorrectiveAction {
  id: string;
  findingId: string;
  auditId: string;
  /**
   * @deprecated Use facilityId instead. Kept for backward compatibility.
   */
  farmId?: string;
  /**
   * Primary facility reference for enterprise audit system
   */
  facilityId?: string;
  /**
   * Optional facility area/unit within the facility
   */
  facilityAreaId?: string;
  responsiblePersonId: string;
  actionDescription: string;
  rootCause: string;
  preventiveAction: string;
  targetDate: string;
  completionDate?: string;
  verificationDate?: string;
  priority: CAPriority;
  status: CAStatus;
  verificationNotes: string;
  evidence: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditSchedule {
  id: string;
  farmId: string;
  houseId: string;
  templateId: string;
  auditorId: string;
  scheduledDate: string;
  auditType: AuditType;
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'overdue';
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface AppSettings {
  appName: string;
  companyName: string;
  timezone: string;
  dateFormat: string;
  scoreThresholds: {
    excellent: number;
    good: number;
    needsImprovement: number;
    poor: number;
  };
  requireEvidence: boolean;
  requireCorrectiveAction: boolean;
}

export interface MasterDataItem {
  id: string;
  name: string;
  code: string;
  category: string;
  active: boolean;
}

export interface BackupData {
  version: string;
  exportedAt: string;
  users: User[];
  farms: Farm[];
  houses: FarmHouse[];
  templates: AuditTemplate[];
  audits: Audit[];
  findings: Finding[];
  correctiveActions: CorrectiveAction[];
  schedules: AuditSchedule[];
  notifications: Notification[];
  settings: AppSettings;
  masterData: MasterDataItem[];
  departments?: Department[];
  facilities?: Facility[];
  facilityAreas?: FacilityArea[];
  evidence?: Evidence[];
  approvals?: Approval[];
  timelineEvents?: TimelineEvent[];
}

// ============================================================
// ENTERPRISE AUDIT ARCHITECTURE TYPES
// ============================================================

// Department - Generic organizational unit
export type DepartmentStatus = 'active' | 'inactive' | 'archived';

export interface Department {
  id: string;
  code: string;
  name: string;
  description: string;
  managerId: string;
  status: DepartmentStatus;
  createdAt: string;
  updatedAt: string;
}

// Facility Types - Comprehensive poultry integrator coverage
export type FacilityType = 
  | 'broiler_farm'
  | 'parent_stock_broiler'
  | 'layer_farm'
  | 'parent_stock_layer'
  | 'pullet_farm'
  | 'hatchery'
  | 'feedmill'
  | 'dressing_plant'
  | 'slaughterhouse'
  | 'processing_plant'
  | 'warehouse'
  | 'distribution_center'
  | 'laboratory'
  | 'logistics'
  | 'maintenance'
  | 'office'
  | 'chemical_storage'
  | 'spare_parts_warehouse'
  | 'product_dispatch'
  | 'veterinary'
  | 'water_treatment'
  | 'water_source'
  | 'wwtp'
  | 'maintenance_workshop'
  | 'boiler_utility'
  | 'biosecurity_facility'
  | 'other';

export type FacilityStatus = 'active' | 'inactive' | 'archived' | 'under_construction';

// Facility - Generic physical location (extends Farm concept)
export interface Facility {
  id: string;
  facilityCode: string;
  name: string;
  facilityType: FacilityType;
  departmentId: string;
  location: string;
  address: string;
  province: string;
  regency: string;
  district: string;
  managerId: string;
  supervisorId: string;
  capacity: number;
  status: FacilityStatus;
  description: string;
  // Legacy compatibility - links to old Farm if migrated
  legacyFarmId?: string;
  createdAt: string;
  updatedAt: string;
}

// Facility Area/Unit - Generic subdivision of a facility
export type FacilityAreaStatus = 'active' | 'inactive' | 'under_maintenance' | 'closed';

export interface FacilityArea {
  id: string;
  facilityId: string;
  code: string;
  name: string;
  areaType: string; // Generic type (e.g., "house", "production_line", "storage_area")
  description: string;
  capacity: number;
  status: FacilityAreaStatus;
  // Legacy compatibility - links to old FarmHouse if migrated
  legacyHouseId?: string;
  createdAt: string;
  updatedAt: string;
}

// Evidence - Photo/document attachments
export type EvidenceType = 'photo' | 'document' | 'video' | 'other';

export interface Evidence {
  id: string;
  auditId: string;
  findingId?: string;
  checklistItemId?: string;
  correctiveActionId?: string;
  facilityId?: string;
  areaId?: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  storageReference: string; // IndexedDB key or future Supabase path
  thumbnailReference?: string;
  caption: string;
  evidenceType: EvidenceType;
  uploadedBy: string;
  uploadedAt: string;
}

// Approval - Audit approval workflow
export type ApprovalLevel = 'supervisor' | 'manager' | 'director';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'returned';

export interface Approval {
  id: string;
  auditId: string;
  level: ApprovalLevel;
  approverId: string;
  status: ApprovalStatus;
  comments: string;
  approvedAt?: string;
  rejectedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Timeline Event - Audit lifecycle tracking
export type TimelineEventType = 
  | 'audit_created'
  | 'audit_started'
  | 'checklist_updated'
  | 'finding_created'
  | 'evidence_added'
  | 'corrective_action_created'
  | 'audit_submitted'
  | 'audit_reviewed'
  | 'audit_approved'
  | 'audit_rejected'
  | 'audit_closed'
  | 'report_generated';

export interface TimelineEvent {
  id: string;
  auditId: string;
  eventType: TimelineEventType;
  userId: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

// Extended Audit - Support for enterprise architecture
// Note: Existing Audit interface remains for backward compatibility
// New fields are optional to support both old and new structure
export interface ExtendedAudit extends Audit {
  // Enterprise fields (optional for backward compatibility)
  departmentId?: string;
  facilityId?: string;
  areaId?: string;
  title?: string;
  scope?: string;
  plannedDate?: string;
  startDate?: string;
  endDate?: string;
  leadAuditorId?: string;
  supportingAuditorIds?: string[];
  observerIds?: string[];
  summary?: string;
  auditNumber?: string; // Formal audit number (e.g., AUD-2026-000001)
}

// Extended Finding - Support for enterprise architecture
export interface ExtendedFinding extends Finding {
  facilityId?: string;
  areaId?: string;
  findingNumber?: string; // Sequential within audit (e.g., F-01, F-02)
  requirement?: string;
  auditorNotes?: string;
}

// Extended CorrectiveAction - Support for enterprise architecture
export interface ExtendedCorrectiveAction extends CorrectiveAction {
  actionNumber?: string; // Sequential within audit
  facilityId?: string;
  areaId?: string;
}

// Audit Type Master Data
export interface AuditTypeMaster {
  id: string;
  code: string;
  name: string;
  description: string;
  applicableFacilityTypes: FacilityType[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Extended AuditTemplate - Support for facility applicability
export interface ExtendedAuditTemplate extends AuditTemplate {
  applicableFacilityTypes: FacilityType[];
  auditTypeId?: string;
}
