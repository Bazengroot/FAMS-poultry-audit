// Egg Packing Facility Audit Template - EGG-PACK-V1.0
import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

const eggpack01_receiving = createSection({
  sectionCode: 'EGP-01',
  name: 'Egg Receiving & Verification',
  category: 'feed_management',
  description: 'Egg receiving and verification',
  order: 1,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'EGP-01-001',
      question: 'Apakah telur diterima dengan prosedur yang benar?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur penerimaan telur',
      complianceCriteria: ['Prosedur penerimaan tertulis', 'Telur diperiksa', 'Dokumen lengkap'],
      evidenceRequirements: ['Receiving procedure', 'Receiving records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const eggpack02_packaging = createSection({
  sectionCode: 'EGP-02',
  name: 'Packaging Process',
  category: 'feed_management',
  description: 'Packaging process control',
  order: 2,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'EGP-02-001',
      question: 'Apakah proses packaging dilakukan dengan prosedur yang benar?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi proses packaging',
      complianceCriteria: ['Prosedur packaging tertulis', 'Packaging dilakukan dengan benar', 'Material packaging sesuai'],
      evidenceRequirements: ['Packaging procedure', 'Packaging records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const eggpack03_labeling = createSection({
  sectionCode: 'EGP-03',
  name: 'Labeling & Date Coding',
  category: 'documentation',
  description: 'Labeling and date coding',
  order: 3,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'EGP-03-001',
      question: 'Apakah labeling dan date coding dilakukan dengan benar?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi labeling dan date coding',
      complianceCriteria: ['Label sesuai spesifikasi', 'Date coding benar', 'Batch number tercatat'],
      evidenceRequirements: ['Labeling procedure', 'Labeling records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const eggpack04_storage = createSection({
  sectionCode: 'EGP-04',
  name: 'Storage & Dispatch',
  category: 'housing',
  description: 'Storage and dispatch',
  order: 4,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'EGP-04-001',
      question: 'Apakah kondisi penyimpanan telur sesuai?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kondisi penyimpanan',
      complianceCriteria: ['Suhu penyimpanan sesuai', 'FIFO diimplementasi', 'Gudang bersih'],
      evidenceRequirements: ['Storage conditions records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const eggpack05_traceability = createSection({
  sectionCode: 'EGP-05',
  name: 'Traceability & Recall',
  category: 'documentation',
  description: 'Traceability and recall',
  order: 5,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'EGP-05-001',
      question: 'Apakah sistem traceability telur tersedia?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Uji kemampuan traceability',
      complianceCriteria: ['Sistem traceability tersedia', 'Telur dapat ditelusuri', 'Catatan traceability lengkap'],
      evidenceRequirements: ['Traceability system', 'Traceability records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const eggpack06_sanitation = createSection({
  sectionCode: 'EGP-06',
  name: 'Sanitation & Hygiene',
  category: 'sanitation',
  description: 'Sanitation and hygiene',
  order: 6,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'EGP-06-001',
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

const eggpack07_capa = createSection({
  sectionCode: 'EGP-07',
  name: 'CAPA & Documentation',
  category: 'farm_management',
  description: 'Corrective actions and documentation',
  order: 7,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'EGP-07-001',
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

export const EGG_PACKING_TEMPLATE: AuditTemplate = {
  id: 'template-egg-pack-v1',
  code: 'EGG-PACK-V1.0',
  name: 'Egg Packing Facility Audit',
  description: 'Comprehensive audit template for egg packing facilities',
  facilityTypes: ['warehouse'],
  departmentId: 'dept7',
  auditCategory: 'warehouse',
  references: [
    {
      id: 'ref-eggpack-001',
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
    eggpack01_receiving,
    eggpack02_packaging,
    eggpack03_labeling,
    eggpack04_storage,
    eggpack05_traceability,
    eggpack06_sanitation,
    eggpack07_capa
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
  tags: ['egg-packing', 'egg', 'warehouse'],
  isPublic: true
};
