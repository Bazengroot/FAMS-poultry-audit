// Maintenance Workshop Audit Template - MNT-WORK-V1.0
import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

const mnt01_management = createSection({
  sectionCode: 'MNT-01',
  name: 'Maintenance Management',
  category: 'farm_management',
  description: 'Maintenance workshop management',
  order: 1,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'MNT-01-001',
      question: 'Apakah prosedur maintenance terdokumentasi dan diimplementasi?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur maintenance',
      complianceCriteria: ['Prosedur maintenance tertulis', 'Prosedur diimplementasi', 'Personel memahami prosedur'],
      evidenceRequirements: ['Maintenance procedure', 'Implementation records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const mnt02_workorders = createSection({
  sectionCode: 'MNT-02',
  name: 'Work Order Management',
  category: 'documentation',
  description: 'Work order management',
  order: 2,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'MNT-02-001',
      question: 'Apakah work order dikelola dengan sistem yang baik?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi sistem work order',
      complianceCriteria: ['Sistem work order tersedia', 'Work order dicatat', 'Status work order dimonitor'],
      evidenceRequirements: ['Work order system', 'Work order records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    })
  ]
});

const mnt03_tools = createSection({
  sectionCode: 'MNT-03',
  name: 'Tools & Equipment',
  category: 'equipment',
  description: 'Tools and equipment management',
  order: 3,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'MNT-03-001',
      question: 'Apakah tools dan equipment dalam kondisi baik?',
      category: 'equipment',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kondisi tools dan equipment',
      complianceCriteria: ['Tools dalam kondisi baik', 'Equipment dimaintain', 'Calibration dilakukan jika diperlukan'],
      evidenceRequirements: ['Tool inventory', 'Equipment maintenance records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    })
  ]
});

const mnt04_safety = createSection({
  sectionCode: 'MNT-04',
  name: 'Safety & PPE',
  category: 'personnel',
  description: 'Safety and PPE requirements',
  order: 4,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'MNT-04-001',
      question: 'Apakah prosedur K3 diimplementasi di workshop?',
      category: 'personnel',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi implementasi K3',
      complianceCriteria: ['Prosedur K3 tersedia', 'APD disediakan dan digunakan', 'Training K3 dilakukan'],
      evidenceRequirements: ['K3 procedure', 'Training records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const mnt05_contamination = createSection({
  sectionCode: 'MNT-05',
  name: 'Contamination Prevention',
  category: 'feed_management',
  description: 'Contamination prevention in maintenance',
  order: 5,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'MNT-05-001',
      question: 'Apakah prosedur pencegahan kontaminasi diimplementasi?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pencegahan kontaminasi',
      complianceCriteria: ['Prosedur pencegahan kontaminasi tersedia', 'Prosedur diimplementasi', 'Foreign material prevention dilakukan'],
      evidenceRequirements: ['Contamination prevention procedure', 'Implementation records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const mnt06_housekeeping = createSection({
  sectionCode: 'MNT-06',
  name: 'Housekeeping',
  category: 'sanitation',
  description: 'Workshop housekeeping',
  order: 6,
  weight: 1.2,
  items: [
    createQuestion({
      questionCode: 'MNT-06-001',
      question: 'Apakah housekeeping workshop dilakukan dengan baik?',
      category: 'sanitation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi housekeeping workshop',
      complianceCriteria: ['Workshop bersih', 'Area terorganisir', 'Tidak ada sampah atau debris'],
      evidenceRequirements: ['Housekeeping records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    })
  ]
});

const mnt07_capa = createSection({
  sectionCode: 'MNT-07',
  name: 'CAPA & Documentation',
  category: 'farm_management',
  description: 'Corrective actions and documentation',
  order: 7,
  weight: 1.2,
  items: [
    createQuestion({
      questionCode: 'MNT-07-001',
      question: 'Apakah sistem CAPA diimplementasi dengan efektif?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi implementasi sistem CAPA',
      complianceCriteria: ['Sistem CAPA terdokumentasi', 'CAPA diidentifikasi', 'Efektivitas CAPA diverifikasi'],
      evidenceRequirements: ['CAPA procedure', 'CAPA records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    })
  ]
});

export const MAINTENANCE_WORKSHOP_TEMPLATE: AuditTemplate = {
  id: 'template-mnt-work-v1',
  code: 'MNT-WORK-V1.0',
  name: 'Maintenance Workshop Audit',
  description: 'Comprehensive audit template for maintenance workshop facilities',
  facilityTypes: ['maintenance_workshop'],
  departmentId: 'dept8',
  auditCategory: 'maintenance',
  references: [
    {
      id: 'ref-mnt-001',
      code: 'SNI 7388:2009',
      title: 'Pedoman Cara Produksi Pakan Ternak yang Baik',
      organization: 'BSN',
      year: '2009',
      status: 'valid',
      sourceType: 'standard',
      verificationStatus: 'verified',
      country: 'Indonesia',
      language: 'id'
    }
  ],
  version: '1.0',
  effectiveDate: new Date().toISOString(),
  status: 'active',
  sections: [
    mnt01_management,
    mnt02_workorders,
    mnt03_tools,
    mnt04_safety,
    mnt05_contamination,
    mnt06_housekeeping,
    mnt07_capa
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 7,
  estimatedDuration: 180,
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['maintenance', 'workshop', 'safety'],
  isPublic: true
};
