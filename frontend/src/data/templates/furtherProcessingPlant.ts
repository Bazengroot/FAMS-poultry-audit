// Further Processing Plant Audit Template - FPP-PROD-V1.0
import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

const fpp01_rawMaterial = createSection({
  sectionCode: 'FPP-01',
  name: 'Raw Material Control',
  category: 'feed_management',
  description: 'Raw material receiving and verification',
  order: 1,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FPP-01-001',
      question: 'Apakah bahan baku diterima dengan prosedur yang benar?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur penerimaan bahan baku',
      complianceCriteria: ['Prosedur penerimaan tertulis', 'Bahan baku diperiksa', 'Suhu sesuai', 'Dokumen lengkap'],
      evidenceRequirements: ['Receiving procedure', 'Receiving records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const fpp02_processing = createSection({
  sectionCode: 'FPP-02',
  name: 'Processing Operations',
  category: 'feed_management',
  description: 'Cutting, grinding, mixing, cooking operations',
  order: 2,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FPP-02-001',
      question: 'Apakah operasi processing dilakukan dengan prosedur yang benar?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi operasi processing',
      complianceCriteria: ['Prosedur processing tertulis', 'Operasi dilakukan dengan benar', 'Parameter processing sesuai', 'Kontaminasi dicegah'],
      evidenceRequirements: ['Processing procedure', 'Processing records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const fpp03_cooking = createSection({
  sectionCode: 'FPP-03',
  name: 'Cooking & Thermal Processing',
  category: 'feed_management',
  description: 'Cooking and thermal processing control',
  order: 3,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'FPP-03-001',
      question: 'Apakah parameter cooking (suhu, waktu) dimonitor dan dicatat?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi monitoring parameter cooking',
      complianceCriteria: ['Parameter cooking dimonitor', 'Parameter dicatat', 'Parameter sesuai spesifikasi', 'Deviasi ditindaklanjuti'],
      evidenceRequirements: ['Cooking records', 'Temperature records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const fpp04_packaging = createSection({
  sectionCode: 'FPP-04',
  name: 'Packaging & Labeling',
  category: 'documentation',
  description: 'Packaging and labeling procedures',
  order: 4,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FPP-04-001',
      question: 'Apakah packaging dan labeling dilakukan dengan prosedur yang benar?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi packaging dan labeling',
      complianceCriteria: ['Prosedur packaging tertulis', 'Label sesuai spesifikasi', 'Batch number tercatat', 'Tanggal produksi tercatat'],
      evidenceRequirements: ['Packaging procedure', 'Labeling records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const fpp05_metalDetection = createSection({
  sectionCode: 'FPP-05',
  name: 'Metal Detection & Foreign Material',
  category: 'feed_management',
  description: 'Metal detection and foreign material control',
  order: 5,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'FPP-05-001',
      question: 'Apakah metal detector berfungsi dengan baik dan dikalibrasi?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi metal detector',
      complianceCriteria: ['Metal detector berfungsi', 'Dikalibrasi rutin', 'Diuji dengan test piece', 'Catatan kalibrasi lengkap'],
      evidenceRequirements: ['Metal detector calibration records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const fpp06_haccp = createSection({
  sectionCode: 'FPP-06',
  name: 'HACCP & Food Safety',
  category: 'farm_management',
  description: 'HACCP and food safety management',
  order: 6,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'FPP-06-001',
      question: 'Apakah sistem HACCP diimplementasi dengan efektif?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi implementasi sistem HACCP',
      complianceCriteria: ['Sistem HACCP terdokumentasi', 'CCP diidentifikasi', 'Critical limit ditetapkan', 'Monitoring CCP dilakukan'],
      evidenceRequirements: ['HACCP plan', 'CCP monitoring records'],
      referenceIds: ['ref-codex-001'],
      severity: 'critical',
      order: 1
    })
  ]
});

const fpp07_traceability = createSection({
  sectionCode: 'FPP-07',
  name: 'Traceability & Recall',
  category: 'documentation',
  description: 'Traceability and recall system',
  order: 7,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'FPP-07-001',
      question: 'Apakah sistem traceability memungkinkan penelusuran produk?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Uji kemampuan traceability',
      complianceCriteria: ['Sistem traceability tersedia', 'Produk dapat ditelusuri', 'Catatan traceability lengkap'],
      evidenceRequirements: ['Traceability system', 'Traceability records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const fpp08_sanitation = createSection({
  sectionCode: 'FPP-08',
  name: 'Sanitation & Pest Control',
  category: 'sanitation',
  description: 'Sanitation and pest control',
  order: 8,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FPP-08-001',
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

const fpp09_capa = createSection({
  sectionCode: 'FPP-09',
  name: 'CAPA & Documentation',
  category: 'farm_management',
  description: 'Corrective actions and documentation',
  order: 9,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'FPP-09-001',
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

export const FURTHER_PROCESSING_PLANT_TEMPLATE: AuditTemplate = {
  id: 'template-fpp-prod-v1',
  code: 'FPP-PROD-V1.0',
  name: 'Further Processing Plant Audit',
  description: 'Comprehensive audit template for further processing plant facilities',
  facilityTypes: ['processing_plant'],
  departmentId: 'dept5',
  auditCategory: 'processing',
  references: [
    {
      id: 'ref-fpp-001',
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
    fpp01_rawMaterial,
    fpp02_processing,
    fpp03_cooking,
    fpp04_packaging,
    fpp05_metalDetection,
    fpp06_haccp,
    fpp07_traceability,
    fpp08_sanitation,
    fpp09_capa
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 9,
  estimatedDuration: 300,
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['further-processing', 'processing', 'food-safety'],
  isPublic: true
};
