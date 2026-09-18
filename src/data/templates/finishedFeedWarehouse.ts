// Finished Feed Warehouse Audit Template - FFW-PROD-V1.1
// Enhanced facility-specific audit template for finished feed warehouse facilities
// Version 1.1 - Enhanced with facility-specific operational controls

import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: FINISHED FEED RECEIVING (FFW-01)
// ============================================================
const ffw01_receiving = createSection({
  sectionCode: 'FFW-01',
  name: 'Finished Feed Receiving',
  category: 'feed_management',
  description: 'Finished feed receiving from production',
  order: 1,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'FFW-01-001',
      question: 'Apakah pakan jadi diterima dengan dokumen produksi yang lengkap dan valid?',
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
      questionCode: 'FFW-01-002',
      question: 'Apakah batch identification dan product status jelas pada setiap pakan jadi?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa batch identification dan product status jelas pada setiap pakan jadi',
      complianceCriteria: ['Batch number jelas', 'Product status jelas', 'Label lengkap', 'Production date recorded'],
      evidenceRequirements: ['Product labels', 'Receiving records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'FFW-01-003',
      question: 'Apakah verifikasi kuantitas dan kondisi kemasan dilakukan saat penerimaan?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa kuantitas sesuai dengan dokumen dan kondisi kemasan tidak rusak',
      complianceCriteria: ['Kuantitas diverifikasi', 'Kondisi kemasan diperiksa', 'Kemasan rusak ditolak', 'Discrepancy reported'],
      evidenceRequirements: ['Weighing records', 'Inspection reports', 'Rejection records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 2: PRODUCT STATUS & QC RELEASE (FFW-02)
// ============================================================
const ffw02_qc = createSection({
  sectionCode: 'FFW-02',
  name: 'Product Status & QC Release',
  category: 'documentation',
  description: 'Product status control and QC release',
  order: 2,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'FFW-02-001',
      question: 'Apakah status produk (approved, released, hold, rejected) diidentifikasi dengan jelas?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa status produk diidentifikasi dengan jelas untuk mencegah penggunaan produk yang tidak approved',
      complianceCriteria: ['Product status identified', 'Approved products segregated', 'Hold products segregated', 'Rejected products segregated'],
      evidenceRequirements: ['Status labels', 'Segregation records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FFW-02-002',
      question: 'Apakah QC release dilakukan sebelum produk dirilis untuk distribusi?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa QC release dilakukan sebelum produk dirilis untuk distribusi',
      complianceCriteria: ['QC release done', 'Release documented', 'Product only released after QC approval', 'Release records available'],
      evidenceRequirements: ['QC release records', 'Release documentation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'FFW-02-003',
      question: 'Apakah produk yang hold atau rejected diisolasi dan ditandai dengan jelas?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa produk yang hold atau rejected diisolasi dan ditandai dengan jelas',
      complianceCriteria: ['Hold products isolated', 'Rejected products isolated', 'Clear labeling', 'Prevent accidental use'],
      evidenceRequirements: ['Quarantine area', 'Hold tags', 'Rejection records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 3: STORAGE & SEGREGATION (FFW-03)
// ============================================================
const ffw03_storage = createSection({
  sectionCode: 'FFW-03',
  name: 'Storage & Segregation',
  category: 'housing',
  description: 'Product storage conditions and segregation',
  order: 3,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FFW-03-001',
      question: 'Apakah pakan jadi disimpan dengan segregasi yang sesuai untuk mencegah kontaminasi silang?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa pakan jadi disimpan dengan segregasi yang sesuai untuk mencegah kontaminasi silang antar produk',
      complianceCriteria: ['Different products stored separately', 'Segregation maintained', 'Cross-contamination prevented', 'Storage zoning clear'],
      evidenceRequirements: ['Storage layout', 'Segregation procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FFW-03-002',
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
      questionCode: 'FFW-03-003',
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
// SECTION 4: FIFO/FEFO & TRACEABILITY (FFW-04)
// ============================================================
const ffw04_fifo = createSection({
  sectionCode: 'FFW-04',
  name: 'FIFO/FEFO & Traceability',
  category: 'documentation',
  description: 'Stock rotation and product traceability',
  order: 4,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FFW-04-001',
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
      questionCode: 'FFW-04-002',
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
      questionCode: 'FFW-04-003',
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
// SECTION 5: PEST CONTROL & SANITATION (FFW-05)
// ============================================================
const ffw05_pest = createSection({
  sectionCode: 'FFW-05',
  name: 'Pest Control & Sanitation',
  category: 'sanitation',
  description: 'Pest control and warehouse sanitation',
  order: 5,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FFW-05-001',
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
      questionCode: 'FFW-05-002',
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
      questionCode: 'FFW-05-003',
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
// SECTION 6: MEDICATION & ADDITIVE SEGREGATION (FFW-06)
// ============================================================
const ffw06_medication = createSection({
  sectionCode: 'FFW-06',
  name: 'Medication & Additive Segregation',
  category: 'feed_management',
  description: 'Segregation of medicated feed and additives',
  order: 6,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'FFW-06-001',
      question: 'Apakah pakan bermedikasi dipisahkan dari pakan non-medikasi?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa pakan bermedikasi dipisahkan dari pakan non-medikasi untuk mencegah kontaminasi silang',
      complianceCriteria: ['Medicated feed segregated', 'Non-medicated feed segregated', 'Clear labeling', 'Prevent cross-contamination'],
      evidenceRequirements: ['Segregation procedure', 'Labeling records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FFW-06-002',
      question: 'Apakah feed additive disimpan di area terpisah dan ditandai dengan jelas?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa feed additive disimpan di area terpisah dan ditandai dengan jelas',
      complianceCriteria: ['Additives stored separately', 'Clear labeling', 'Storage area designated', 'Prevent accidental use'],
      evidenceRequirements: ['Storage layout', 'Labeling records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 7: DAMAGED & REJECTED PRODUCT (FFW-07)
// ============================================================
const ffw07_damaged = createSection({
  sectionCode: 'FFW-07',
  name: 'Damaged & Rejected Product',
  category: 'documentation',
  description: 'Damaged and rejected product control',
  order: 7,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FFW-07-001',
      question: 'Apakah damaged bags dan rejected product diidentifikasi dan diisolasi?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa damaged bags dan rejected product diidentifikasi dan diisolasi',
      complianceCriteria: ['Damaged bags identified', 'Rejected product identified', 'Products isolated', 'Disposition documented'],
      evidenceRequirements: ['Damaged product records', 'Rejection records', 'Disposition records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FFW-07-002',
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
      questionCode: 'FFW-07-003',
      question: 'Apakah obsolete atau expired product diidentifikasi dan dikontrol?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa obsolete atau expired product diidentifikasi dan dikontrol',
      complianceCriteria: ['Obsolete product identified', 'Expired product identified', 'Products controlled', 'Disposition documented'],
      evidenceRequirements: ['Obsolete product list', 'Expired product list', 'Disposition records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 8: LOADING & DISPATCH (FFW-08)
// ============================================================
const ffw08_loading = createSection({
  sectionCode: 'FFW-08',
  name: 'Loading & Dispatch',
  category: 'feed_management',
  description: 'Product loading and dispatch procedures',
  order: 8,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FFW-08-001',
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
      questionCode: 'FFW-08-002',
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
      questionCode: 'FFW-08-003',
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
// SECTION 9: RECALL READINESS (FFW-09)
// ============================================================
const ffw09_recall = createSection({
  sectionCode: 'FFW-09',
  name: 'Recall Readiness',
  category: 'farm_management',
  description: 'Product recall readiness and procedures',
  order: 9,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'FFW-09-001',
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
      questionCode: 'FFW-09-002',
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
// SECTION 10: EMERGENCY PROCEDURES (FFW-10)
// ============================================================
const ffw10_emergency = createSection({
  sectionCode: 'FFW-10',
  name: 'Emergency Procedures',
  category: 'farm_management',
  description: 'Emergency response procedures',
  order: 10,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'FFW-10-001',
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
      questionCode: 'FFW-10-002',
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
export const FINISHED_FEED_WAREHOUSE_TEMPLATE: AuditTemplate = {
  id: 'template-ffw-prod-v1',
  code: 'FFW-PROD-V1.1',
  name: 'Finished Feed Warehouse Audit',
  description: 'Enhanced facility-specific audit template for finished feed warehouse facilities covering receiving, QC release, storage, FIFO/FEFO, pest control, medication segregation, damaged product, loading, recall readiness, and emergency procedures',
  facilityTypes: ['warehouse'],
  departmentId: 'dept7', // Warehouse Department
  auditCategory: 'warehouse',
  references: [
    {
      id: 'ref-ffw-001',
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
    ffw01_receiving,
    ffw02_qc,
    ffw03_storage,
    ffw04_fifo,
    ffw05_pest,
    ffw06_medication,
    ffw07_damaged,
    ffw08_loading,
    ffw09_recall,
    ffw10_emergency
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 26,
  estimatedDuration: 270, // 4.5 hours
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['warehouse', 'finished-feed', 'storage', 'recall', 'medication'],
  isPublic: true
};
