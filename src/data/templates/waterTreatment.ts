// Water Treatment Facility Audit Template - WTR-TREAT-V1.0
import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

const wtr01_source = createSection({
  sectionCode: 'WTR-01',
  name: 'Water Source Identification',
  category: 'water_management',
  description: 'Water source identification',
  order: 1,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'WTR-01-001',
      question: 'Apakah sumber air teridentifikasi dengan jelas?',
      category: 'water_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi identifikasi sumber air',
      complianceCriteria: ['Sumber air teridentifikasi', 'Kualitas sumber air dimonitor', 'Catatan sumber air lengkap'],
      evidenceRequirements: ['Water source records', 'Water quality records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const wtr02_treatment = createSection({
  sectionCode: 'WTR-02',
  name: 'Treatment Process',
  category: 'water_management',
  description: 'Water treatment process',
  order: 2,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'WTR-02-001',
      question: 'Apakah proses treatment air dilakukan dengan prosedur yang benar?',
      category: 'water_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi proses treatment',
      complianceCriteria: ['Prosedur treatment tertulis', 'Treatment dilakukan dengan benar', 'Parameter treatment sesuai'],
      evidenceRequirements: ['Treatment procedure', 'Treatment records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const wtr03_monitoring = createSection({
  sectionCode: 'WTR-03',
  name: 'Water Quality Monitoring',
  category: 'water_management',
  description: 'Water quality monitoring and testing',
  order: 3,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'WTR-03-001',
      question: 'Apakah kualitas air dimonitor secara rutin?',
      category: 'water_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi monitoring kualitas air',
      complianceCriteria: ['Kualitas air dimonitor rutin', 'Parameter monitoring sesuai', 'Hasil monitoring dicatat'],
      evidenceRequirements: ['Water quality monitoring records', 'Laboratory test results'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const wtr04_equipment = createSection({
  sectionCode: 'WTR-04',
  name: 'Equipment & Calibration',
  category: 'equipment',
  description: 'Treatment equipment and calibration',
  order: 4,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'WTR-04-001',
      question: 'Apakah peralatan treatment dimaintain dengan baik?',
      category: 'equipment',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi maintenance peralatan',
      complianceCriteria: ['Peralatan dimaintain sesuai jadwal', 'Peralatan berfungsi baik', 'Catatan maintenance lengkap'],
      evidenceRequirements: ['Maintenance records', 'Equipment maintenance records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    })
  ]
});

const wtr05_chemicals = createSection({
  sectionCode: 'WTR-05',
  name: 'Chemical Management',
  category: 'documentation',
  description: 'Treatment chemical management',
  order: 5,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'WTR-05-001',
      question: 'Apakah chemical treatment disimpan dengan benar?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi penyimpanan chemical treatment',
      complianceCriteria: ['Chemical disimpan dengan benar', 'Chemical tidak expired', 'Label jelas'],
      evidenceRequirements: ['Chemical storage records', 'Expiry date records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const wtr06_distribution = createSection({
  sectionCode: 'WTR-06',
  name: 'Distribution System',
  category: 'water_management',
  description: 'Water distribution system',
  order: 6,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'WTR-06-001',
      question: 'Apakah sistem distribusi air dijaga dengan baik?',
      category: 'water_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi sistem distribusi',
      complianceCriteria: ['Sistem distribusi dalam kondisi baik', 'Tidak ada kebocoran', 'Tekanan air sesuai'],
      evidenceRequirements: ['Distribution system records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    })
  ]
});

const wtr07_emergency = createSection({
  sectionCode: 'WTR-07',
  name: 'Emergency Response',
  category: 'farm_management',
  description: 'Emergency response procedures',
  order: 7,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'WTR-07-001',
      question: 'Apakah prosedur emergency response tersedia?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur emergency response',
      complianceCriteria: ['Prosedur emergency response tersedia', 'Personel memahami prosedur', 'Prosedur diuji'],
      evidenceRequirements: ['Emergency procedure', 'Drill records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const wtr08_capa = createSection({
  sectionCode: 'WTR-08',
  name: 'CAPA & Documentation',
  category: 'farm_management',
  description: 'Corrective actions and documentation',
  order: 8,
  weight: 1.2,
  items: [
    createQuestion({
      questionCode: 'WTR-08-001',
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

export const WATER_TREATMENT_TEMPLATE: AuditTemplate = {
  id: 'template-wtr-treat-v1',
  code: 'WTR-TREAT-V1.0',
  name: 'Water Treatment Facility Audit',
  description: 'Comprehensive audit template for water treatment facilities',
  facilityTypes: ['water_treatment'],
  departmentId: 'dept11', // Utility Department
  auditCategory: 'utility',
  references: [
    {
      id: 'ref-wtr-001',
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
    wtr01_source,
    wtr02_treatment,
    wtr03_monitoring,
    wtr04_equipment,
    wtr05_chemicals,
    wtr06_distribution,
    wtr07_emergency,
    wtr08_capa
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 8,
  estimatedDuration: 240,
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['water-treatment', 'utility', 'water-quality'],
  isPublic: true
};
