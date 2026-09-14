// WWTP Audit Template - WWTP-PROD-V1.0
import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

const wwtp01_management = createSection({
  sectionCode: 'WWTP-01',
  name: 'WWTP Management',
  category: 'farm_management',
  description: 'WWTP management structure',
  order: 1,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'WWTP-01-001',
      question: 'Apakah struktur organisasi WWTP terdokumentasi?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Periksa dokumentasi struktur organisasi',
      complianceCriteria: ['Struktur organisasi terdokumentasi', 'Tanggung jawab jelas'],
      evidenceRequirements: ['Organization chart', 'Job descriptions'],
      referenceIds: ['ref-sni-006'],
      severity: 'minor',
      order: 1
    })
  ]
});

const wwtp02_treatment = createSection({
  sectionCode: 'WWTP-02',
  name: 'Wastewater Treatment Process',
  category: 'environment',
  description: 'Wastewater treatment process',
  order: 2,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'WWTP-02-001',
      question: 'Apakah proses treatment limbah dilakukan dengan prosedur yang benar?',
      category: 'environment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi proses treatment limbah',
      complianceCriteria: ['Prosedur treatment tertulis', 'Treatment dilakukan dengan benar', 'Parameter treatment sesuai'],
      evidenceRequirements: ['Treatment procedure', 'Treatment records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const wwtp03_monitoring = createSection({
  sectionCode: 'WWTP-03',
  name: 'Effluent Monitoring',
  category: 'environment',
  description: 'Effluent quality monitoring',
  order: 3,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'WWTP-03-001',
      question: 'Apakah kualitas effluent dimonitor secara rutin?',
      category: 'environment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi monitoring kualitas effluent',
      complianceCriteria: ['Kualitas effluent dimonitor rutin', 'Parameter monitoring sesuai', 'Hasil monitoring dicatat'],
      evidenceRequirements: ['Effluent monitoring records', 'Laboratory test results'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const wwtp04_compliance = createSection({
  sectionCode: 'WWTP-04',
  name: 'Environmental Compliance',
  category: 'environment',
  description: 'Environmental compliance',
  order: 4,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'WWTP-04-001',
      question: 'Apakah WWTP mematuhi regulasi lingkungan yang berlaku?',
      category: 'environment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kepatuhan terhadap regulasi lingkungan',
      complianceCriteria: ['Regulasi lingkungan diidentifikasi', 'Kepatuhan dimonitor', 'Izin lingkungan tersedia'],
      evidenceRequirements: ['Environmental permits', 'Compliance records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const wwtp05_sludge = createSection({
  sectionCode: 'WWTP-05',
  name: 'Sludge Management',
  category: 'environment',
  description: 'Sludge management and disposal',
  order: 5,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'WWTP-05-001',
      question: 'Apakah sludge ditangani dengan benar?',
      category: 'environment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi penanganan sludge',
      complianceCriteria: ['Sludge dipisahkan', 'Sludge disimpan dengan benar', 'Sludge dimusnahkan sesuai regulasi'],
      evidenceRequirements: ['Sludge management procedure', 'Sludge disposal records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const wwtp06_safety = createSection({
  sectionCode: 'WWTP-06',
  name: 'Worker Safety',
  category: 'personnel',
  description: 'Worker safety and PPE',
  order: 6,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'WWTP-06-001',
      question: 'Apakah prosedur K3 diimplementasi?',
      category: 'personnel',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi implementasi K3',
      complianceCriteria: ['Prosedur K3 tersedia', 'APD disediakan', 'Training K3 dilakukan'],
      evidenceRequirements: ['K3 procedure', 'Training records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const wwtp07_capa = createSection({
  sectionCode: 'WWTP-07',
  name: 'CAPA & Documentation',
  category: 'farm_management',
  description: 'Corrective actions and documentation',
  order: 7,
  weight: 1.2,
  items: [
    createQuestion({
      questionCode: 'WWTP-07-001',
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

export const WWTP_TEMPLATE: AuditTemplate = {
  id: 'template-wwtp-prod-v1',
  code: 'WWTP-PROD-V1.0',
  name: 'Wastewater Treatment Plant Audit',
  description: 'Comprehensive audit template for wastewater treatment plant facilities',
  facilityTypes: ['wwtp'],
  departmentId: 'dept11',
  auditCategory: 'utility',
  references: [
    {
      id: 'ref-wwtp-001',
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
    wwtp01_management,
    wwtp02_treatment,
    wwtp03_monitoring,
    wwtp04_compliance,
    wwtp05_sludge,
    wwtp06_safety,
    wwtp07_capa
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 7,
  estimatedDuration: 240,
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['wwtp', 'wastewater', 'environment'],
  isPublic: true
};
