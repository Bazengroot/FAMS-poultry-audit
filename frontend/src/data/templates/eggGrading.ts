// Egg Grading Facility Audit Template - EGG-GRADING-V1.0
import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

const egg01_receiving = createSection({
  sectionCode: 'EGG-01',
  name: 'Egg Receiving & Inspection',
  category: 'feed_management',
  description: 'Egg receiving and inspection',
  order: 1,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'EGG-01-001',
      question: 'Apakah telur diterima dengan prosedur yang benar?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur penerimaan telur',
      complianceCriteria: ['Prosedur penerimaan tertulis', 'Telur diperiksa saat diterima', 'Dokumen lengkap'],
      evidenceRequirements: ['Receiving procedure', 'Receiving records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const egg02_grading = createSection({
  sectionCode: 'EGG-02',
  name: 'Egg Grading & Sorting',
  category: 'feed_management',
  description: 'Egg grading and sorting',
  order: 2,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'EGG-02-001',
      question: 'Apakah grading telur dilakukan dengan prosedur yang benar?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur grading',
      complianceCriteria: ['Prosedur grading tertulis', 'Grading dilakukan dengan benar', 'Kriteria grading sesuai standar'],
      evidenceRequirements: ['Grading procedure', 'Grading records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const egg03_packaging = createSection({
  sectionCode: 'EGG-03',
  name: 'Packaging & Labeling',
  category: 'documentation',
  description: 'Packaging and labeling',
  order: 3,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'EGG-03-001',
      question: 'Apakah packaging dan labeling dilakukan dengan prosedur yang benar?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi packaging dan labeling',
      complianceCriteria: ['Prosedur packaging tertulis', 'Label sesuai spesifikasi', 'Batch number tercatat'],
      evidenceRequirements: ['Packaging procedure', 'Labeling records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const egg04_storage = createSection({
  sectionCode: 'EGG-04',
  name: 'Storage & Environmental Control',
  category: 'housing',
  description: 'Storage and environmental control',
  order: 4,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'EGG-04-001',
      question: 'Apakah kondisi penyimpanan telur sesuai?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kondisi penyimpanan',
      complianceCriteria: ['Suhu penyimpanan sesuai', 'Kelembaban sesuai', 'FIFO diimplementasi'],
      evidenceRequirements: ['Storage conditions records', 'Temperature/humidity logs'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const egg05_traceability = createSection({
  sectionCode: 'EGG-05',
  name: 'Traceability',
  category: 'documentation',
  description: 'Egg traceability',
  order: 5,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'EGG-05-001',
      question: 'Apakah sistem traceability telur tersedia?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Uji kemampuan traceability',
      complianceCriteria: ['Sistem traceability tersedia', 'Telur dapat ditelusuri ke farm asal', 'Catatan traceability lengkap'],
      evidenceRequirements: ['Traceability system', 'Traceability records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const egg06_sanitation = createSection({
  sectionCode: 'EGG-06',
  name: 'Sanitation & Hygiene',
  category: 'sanitation',
  description: 'Sanitation and hygiene',
  order: 6,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'EGG-06-001',
      question: 'Apakah jadwal cleaning dan sanitation terdokumentasi dan diimplementasi?',
      category: 'sanitation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi jadwal dan implementasi cleaning/sanitation',
      complianceCriteria: ['Jadwal cleaning terdokumentasi', 'Cleaning dilakukan sesuai jadwal', 'Catatan cleaning lengkap'],
      evidenceRequirements: ['Cleaning schedule', 'Cleaning records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const egg07_capa = createSection({
  sectionCode: 'EGG-07',
  name: 'CAPA & Documentation',
  category: 'farm_management',
  description: 'Corrective actions and documentation',
  order: 7,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'EGG-07-001',
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

export const EGG_GRADING_TEMPLATE: AuditTemplate = {
  id: 'template-egg-grading-v1',
  code: 'EGG-GRADING-V1.0',
  name: 'Egg Grading Facility Audit',
  description: 'Comprehensive audit template for egg grading facilities',
  facilityTypes: ['warehouse'],
  departmentId: 'dept7',
  auditCategory: 'warehouse',
  references: [
    {
      id: 'ref-egg-001',
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
    egg01_receiving,
    egg02_grading,
    egg03_packaging,
    egg04_storage,
    egg05_traceability,
    egg06_sanitation,
    egg07_capa
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
  tags: ['egg-grading', 'egg', 'warehouse'],
  isPublic: true
};
