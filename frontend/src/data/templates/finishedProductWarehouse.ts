// Finished Product Warehouse Audit Template - FPW-PROD-V1.1
// Enhanced facility-specific audit template for finished product warehouse facilities
// Version 1.1 - Enhanced with facility-specific operational controls

import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: PRODUCT RECEIVING & QC (FPW-01)
// ============================================================
const fpw01_receiving = createSection({
  sectionCode: 'FPW-01',
  name: 'Product Receiving & QC',
  category: 'feed_management',
  description: 'Finished product receiving and QC release',
  order: 1,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'FPW-01-001',
      question: 'Apakah produk jadi diterima dengan dokumen produksi yang lengkap dan valid?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kelengkapan dokumen produksi termasuk batch record, QC release, dan certificate of analysis',
      complianceCriteria: ['Batch record tersedia', 'QC release available', 'Certificate of Analysis available', 'Documents verified before receiving'],
      evidenceRequirements: ['Batch records', 'QC release documents', 'Certificate of Analysis'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FPW-01-002',
      question: 'Apakah product identification dan batch/lot number jelas pada setiap produk?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa product identification dan batch/lot number jelas pada setiap produk',
      complianceCriteria: ['Product identification clear', 'Batch/lot number clear', 'Label complete', 'Production date recorded'],
      evidenceRequirements: ['Product labels', 'Receiving records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'FPW-01-003',
      question: 'Apakah QC release dilakukan sebelum produk dirilis untuk distribusi?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa QC release dilakukan sebelum produk dirilis untuk distribusi',
      complianceCriteria: ['QC release done', 'Release documented', 'Product only released after QC approval', 'Release records available'],
      evidenceRequirements: ['QC release records', 'Release documentation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 2: STORAGE & SEGREGATION (FPW-02)
// ============================================================
const fpw02_storage = createSection({
  sectionCode: 'FPW-02',
  name: 'Storage & Segregation',
  category: 'housing',
  description: 'Product storage conditions and segregation',
  order: 2,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FPW-02-001',
      question: 'Apakah produk disimpan dengan segregasi yang sesuai untuk mencegah kontaminasi silang?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa produk disimpan dengan segregasi yang sesuai untuk mencegah kontaminasi silang antar produk',
      complianceCriteria: ['Different products stored separately', 'Segregation maintained', 'Cross-contamination prevented', 'Storage zoning clear'],
      evidenceRequirements: ['Storage layout', 'Segregation procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FPW-02-002',
      question: 'Apakah kondisi penyimpanan (temperature, humidity) dimonitor dan dicatat?',
      category: 'housing',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa kondisi penyimpanan dimonitor dan dicatat untuk memastikan kualitas produk',
      complianceCriteria: ['Temperature monitored', 'Humidity monitored', 'Monitoring done periodically', 'Records documented'],
      evidenceRequirements: ['Temperature logs', 'Humidity logs', 'Monitoring records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'FPW-02-003',
      question: 'Apakah pallet dan stacking dilakukan dengan benar untuk mencegah kerusakan?',
      category: 'housing',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa pallet dan stacking dilakukan dengan benar untuk mencegah kerusakan produk',
      complianceCriteria: ['Pallets in good condition', 'Stacking stable', 'Height limit maintained', 'No damaged stacking'],
      evidenceRequirements: ['Site observation', 'Photographic evidence'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 3: FIFO/FEFO & TRACEABILITY (FPW-03)
// ============================================================
const fpw03_fifo = createSection({
  sectionCode: 'FPW-03',
  name: 'FIFO/FEFO & Traceability',
  category: 'documentation',
  description: 'Stock rotation and product traceability',
  order: 3,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FPW-03-001',
      question: 'Apakah sistem FIFO/FEFO diimplementasi untuk stock rotation?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa sistem FIFO/FEFO diimplementasi untuk memastikan produk lama didistribusikan lebih dulu',
      complianceCriteria: ['FIFO/FEFO system implemented', 'Older products distributed first', 'Date identification clear', 'Stock rotation maintained'],
      evidenceRequirements: ['FIFO/FEFO procedure', 'Stock rotation records', 'Date labels'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FPW-03-002',
      question: 'Apakah lot/batch traceability dari produksi hingga distribusi dapat ditelusuri?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa lot/batch traceability dari produksi hingga distribusi dapat ditelusuri',
      complianceCriteria: ['Production batch traceable', 'Storage location traceable', 'Distribution traceable', 'Traceability records complete'],
      evidenceRequirements: ['Traceability records', 'Production records', 'Distribution records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'FPW-03-003',
      question: 'Apakah stock records akurat dan diupdate secara periodik?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa stock records akurat dan diupdate secara periodik',
      complianceCriteria: ['Stock records accurate', 'Stock records updated', 'Physical reconciliation done', 'Discrepancy investigated'],
      evidenceRequirements: ['Stock records', 'Reconciliation records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 4: DAMAGED & REJECTED PRODUCT (FPW-04)
// ============================================================
const fpw04_damaged = createSection({
  sectionCode: 'FPW-04',
  name: 'Damaged & Rejected Product',
  category: 'documentation',
  description: 'Damaged and rejected product control',
  order: 4,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FPW-04-001',
      question: 'Apakah damaged product dan rejected product diidentifikasi dan diisolasi?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa damaged product dan rejected product diidentifikasi dan diisolasi',
      complianceCriteria: ['Damaged product identified', 'Rejected product identified', 'Products isolated', 'Disposition documented'],
      evidenceRequirements: ['Damaged product records', 'Rejection records', 'Disposition records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FPW-04-002',
      question: 'Apakah returned product diidentifikasi dan dikontrol?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa returned product diidentifikasi dan dikontrol',
      complianceCriteria: ['Returned product identified', 'Product controlled', 'Disposition documented', 'Records maintained'],
      evidenceRequirements: ['Return records', 'Disposition records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'FPW-04-003',
      question: 'Apakah quarantine area tersedia untuk produk yang hold?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa quarantine area tersedia untuk produk yang hold',
      complianceCriteria: ['Quarantine area available', 'Hold products isolated', 'Clear labeling', 'Prevent accidental use'],
      evidenceRequirements: ['Quarantine area', 'Hold tags'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 5: PEST CONTROL & SANITATION (FPW-05)
// ============================================================
const fpw05_pest = createSection({
  sectionCode: 'FPW-05',
  name: 'Pest Control & Sanitation',
  category: 'sanitation',
  description: 'Pest control and warehouse sanitation',
  order: 5,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FPW-05-001',
      question: 'Apakah program pest control terdokumentasi dan diimplementasi?',
      category: 'sanitation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa program pest control terdokumentasi dan diimplementasi secara efektif',
      complianceCriteria: ['Pest control program documented', 'Program implemented', 'Monitoring done', 'Records documented'],
      evidenceRequirements: ['Pest control program', 'Monitoring records', 'Pest control records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FPW-05-002',
      question: 'Apakah jadwal cleaning gudang terdokumentasi dan diimplementasi?',
      category: 'sanitation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa jadwal cleaning gudang terdokumentasi dan diimplementasi',
      complianceCriteria: ['Cleaning schedule documented', 'Cleaning implemented', 'Cleaning effectiveness verified', 'Records documented'],
      evidenceRequirements: ['Cleaning schedule', 'Cleaning records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'FPW-05-003',
      question: 'Apakah cross-contamination prevention diimplementasi antara produk berbeda?',
      category: 'sanitation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa cross-contamination prevention diimplementasi antara produk berbeda',
      complianceCriteria: ['Cross-contamination prevention implemented', 'Different products segregated', 'Cleaning between products', 'Prevent cross-contamination'],
      evidenceRequirements: ['Segregation procedure', 'Cleaning records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 6: LOADING & DISPATCH (FPW-06)
// ============================================================
const fpw06_loading = createSection({
  sectionCode: 'FPW-06',
  name: 'Loading & Dispatch',
  category: 'feed_management',
  description: 'Product loading and dispatch procedures',
  order: 6,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FPW-06-001',
      question: 'Apakah vehicle condition diperiksa sebelum loading?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa vehicle condition diperiksa sebelum loading untuk mencegah kontaminasi',
      complianceCriteria: ['Vehicle condition checked', 'Vehicle clean', 'Vehicle suitable', 'Inspection documented'],
      evidenceRequirements: ['Vehicle inspection records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FPW-06-002',
      question: 'Apakah product identity dan batch/lot diverifikasi saat loading?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa product identity dan batch/lot diverifikasi saat loading',
      complianceCriteria: ['Product identity verified', 'Batch/lot verified', 'Quantity verified', 'Loading documented'],
      evidenceRequirements: ['Loading records', 'Dispatch records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'FPW-06-003',
      question: 'Apakah traceability dari warehouse hingga destination maintained?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa traceability dari warehouse hingga destination maintained',
      complianceCriteria: ['Warehouse location traceable', 'Destination traceable', 'Dispatch time recorded', 'Traceability records complete'],
      evidenceRequirements: ['Traceability records', 'Dispatch records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 7: PRODUCT PROTECTION (FPW-07)
// ============================================================
const fpw07_protection = createSection({
  sectionCode: 'FPW-07',
  name: 'Product Protection',
  category: 'feed_management',
  description: 'Product protection during storage and handling',
  order: 7,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FPW-07-001',
      question: 'Apakah product protection diimplementasi selama storage dan handling?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa product protection diimplementasi selama storage dan handling',
      complianceCriteria: ['Product protection implemented', 'Packaging intact', 'Handling procedures followed', 'Prevent damage'],
      evidenceRequirements: ['Site observation', 'Handling procedures'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FPW-07-002',
      question: 'Apakah packaging integrity dipertahankan selama storage?',
      category: 'feed_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa packaging integrity dipertahankan selama storage',
      complianceCriteria: ['Packaging intact', 'No damaged packaging', 'Storage conditions maintained', 'Prevent contamination'],
      evidenceRequirements: ['Site observation', 'Packaging inspection records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 8: RECALL READINESS (FPW-08)
// ============================================================
const fpw08_recall = createSection({
  sectionCode: 'FPW-08',
  name: 'Recall Readiness',
  category: 'farm_management',
  description: 'Product recall readiness and procedures',
  order: 8,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'FPW-08-001',
      question: 'Apakah prosedur recall terdokumentasi dan diuji?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa prosedur recall terdokumentasi dan diuji secara periodik',
      complianceCriteria: ['Recall procedure documented', 'Recall procedure tested', 'Personnel trained', 'Records documented'],
      evidenceRequirements: ['Recall procedure', 'Recall test records', 'Training records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FPW-08-002',
      question: 'Apakah traceability system memungkinkan recall yang efektif?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa traceability system memungkinkan recall yang efektif',
      complianceCriteria: ['Traceability system effective', 'Product traceable', 'Distribution traceable', 'Recall can be executed'],
      evidenceRequirements: ['Traceability records', 'Recall procedure'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 9: EMERGENCY PROCEDURES (FPW-09)
// ============================================================
const fpw09_emergency = createSection({
  sectionCode: 'FPW-09',
  name: 'Emergency Procedures',
  category: 'farm_management',
  description: 'Emergency response procedures',
  order: 9,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'FPW-09-001',
      question: 'Apakah prosedur emergency untuk spill, kontaminasi, dan fire terdokumentasi?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa prosedur emergency untuk spill, kontaminasi, dan fire terdokumentasi',
      complianceCriteria: ['Spill procedure documented', 'Contamination procedure documented', 'Fire procedure documented', 'Emergency procedures available'],
      evidenceRequirements: ['Emergency procedures', 'Emergency response records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    }),
    createQuestion({
      questionCode: 'FPW-09-002',
      question: 'Apakah emergency equipment tersedia dan dimaintain?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa emergency equipment tersedia dan dimaintain',
      complianceCriteria: ['Emergency equipment available', 'Equipment maintained', 'Equipment accessible', 'Maintenance records documented'],
      evidenceRequirements: ['Emergency equipment', 'Maintenance records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    })
  ]
});

// Create the complete template
export const FINISHED_PRODUCT_WAREHOUSE_TEMPLATE: AuditTemplate = {
  id: 'template-fpw-prod-v1',
  code: 'FPW-PROD-V1.1',
  name: 'Finished Product Warehouse Audit',
  description: 'Enhanced facility-specific audit template for finished product warehouse facilities covering receiving, storage, FIFO/FEFO, damaged product, pest control, loading, product protection, recall readiness, and emergency procedures',
  facilityTypes: ['warehouse'],
  departmentId: 'dept7', // Warehouse Department
  auditCategory: 'warehouse',
  references: [
    {
      id: 'ref-fpw-001',
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
  version: '1.1',
  effectiveDate: new Date().toISOString(),
  status: 'active',
  sections: [
    fpw01_receiving,
    fpw02_storage,
    fpw03_fifo,
    fpw04_damaged,
    fpw05_pest,
    fpw06_loading,
    fpw07_protection,
    fpw08_recall,
    fpw09_emergency
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 24,
  estimatedDuration: 240, // 4 hours
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['warehouse', 'finished-product', 'storage', 'recall', 'product-protection'],
  isPublic: true
};
