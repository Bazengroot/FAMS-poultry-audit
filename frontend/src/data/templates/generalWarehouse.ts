// General Warehouse Audit Template - GWH-PROD-V1.0
// Comprehensive audit template for general warehouse facilities

import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: WAREHOUSE MANAGEMENT (GWH-01)
// ============================================================
const gwh01_management = createSection({
  sectionCode: 'GWH-01',
  name: 'Warehouse Management',
  category: 'farm_management',
  description: 'Warehouse management structure and organization',
  order: 1,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'GWH-01-001',
      question: 'Apakah struktur organisasi gudang terdokumentasi dengan jelas?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Periksa dokumentasi struktur organisasi gudang',
      complianceCriteria: ['Struktur organisasi terdokumentasi', 'Tugas dan tanggung jawab jelas', 'Hierarki pelaporan terdefinisi'],
      evidenceRequirements: ['Organization chart', 'Job descriptions'],
      referenceIds: ['ref-sni-006'],
      severity: 'minor',
      order: 1
    }),
    createQuestion({
      questionCode: 'GWH-01-002',
      question: 'Apakah personel gudang memiliki kompetensi yang sesuai?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kompetensi personel gudang',
      complianceCriteria: ['Personel terlatih', 'Kompetensi sesuai tugas', 'Training records tersedia'],
      evidenceRequirements: ['Training records', 'Competency matrix'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 2: SCOPE & PERMITTED MATERIALS (GWH-02)
// ============================================================
const gwh02_scope = createSection({
  sectionCode: 'GWH-02',
  name: 'Scope & Permitted Materials',
  category: 'documentation',
  description: 'Warehouse scope and permitted materials',
  order: 2,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'GWH-02-001',
      question: 'Apakah daftar material yang diizinkan disimpan terdokumentasi?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi daftar material yang diizinkan',
      complianceCriteria: ['Daftar material terdokumentasi', 'Material yang disimpan sesuai daftar', 'Material tidak diidentifikasi tidak disimpan'],
      evidenceRequirements: ['Permitted materials list', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 3: LAYOUT & ZONING (GWH-03)
// ============================================================
const gwh03_layout = createSection({
  sectionCode: 'GWH-03',
  name: 'Layout & Zoning',
  category: 'housing',
  description: 'Warehouse layout and zoning',
  order: 3,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'GWH-03-001',
      question: 'Apakah layout gudang mencegah kontaminasi silang?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi layout dan zoning gudang',
      complianceCriteria: ['Area receiving dan dispatch terpisah', 'Material berbeda disimpan terpisah', 'Alur proses satu arah'],
      evidenceRequirements: ['Warehouse layout', 'Zoning procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 4: RECEIVING (GWH-04)
// ============================================================
const gwh04_receiving = createSection({
  sectionCode: 'GWH-04',
  name: 'Receiving & Inspection',
  category: 'feed_management',
  description: 'Material receiving and inspection',
  order: 4,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'GWH-04-001',
      question: 'Apakah material diterima dengan prosedur yang benar?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur penerimaan material',
      complianceCriteria: ['Prosedur penerimaan tertulis', 'Material diperiksa saat diterima', 'Dokumen pengiriman lengkap', 'Catatan penerimaan lengkap'],
      evidenceRequirements: ['Receiving procedure', 'Receiving records', 'Delivery documents'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'GWH-04-002',
      question: 'Apakah inspeksi penerimaan dilakukan dengan benar?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi inspeksi penerimaan',
      complianceCriteria: ['Inspeksi dilakukan', 'Kuantitas diverifikasi', 'Kondisi material diperiksa', 'Catatan inspeksi lengkap'],
      evidenceRequirements: ['Inspection procedure', 'Inspection records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 5: MATERIAL IDENTIFICATION (GWH-05)
// ============================================================
const gwh05_identification = createSection({
  sectionCode: 'GWH-05',
  name: 'Material Identification',
  category: 'documentation',
  description: 'Material identification and labeling',
  order: 5,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'GWH-05-001',
      question: 'Apakah setiap material diidentifikasi dengan jelas?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Periksa identifikasi material',
      complianceCriteria: ['Setiap material memiliki label', 'Label mencakup nama material', 'Label mencakup batch/lot number', 'Label mencakup tanggal penerimaan'],
      evidenceRequirements: ['Labeling procedure', 'Site observation', 'Photographic evidence'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 6: BATCH/LOT CONTROL (GWH-06)
// ============================================================
const gwh06_batch = createSection({
  sectionCode: 'GWH-06',
  name: 'Batch/Lot Control & Expiry',
  category: 'documentation',
  description: 'Batch/lot control and expiry management',
  order: 6,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'GWH-06-001',
      question: 'Apakah batch/lot control diimplementasi dengan benar?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi batch/lot control',
      complianceCriteria: ['Batch/lot number tercatat', 'Batch/lot dapat ditelusuri', 'Catatan batch/lot lengkap'],
      evidenceRequirements: ['Batch/lot records', 'Traceability records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'GWH-06-002',
      question: 'Apakah expiry control diimplementasi dengan benar?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi expiry control',
      complianceCriteria: ['Tanggal expiry tercatat', 'Material mendekati expiry diidentifikasi', 'FEFO diimplementasi', 'Material expired dipisahkan'],
      evidenceRequirements: ['Expiry control records', 'FEFO records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 7: STORAGE CONDITIONS (GWH-07)
// ============================================================
const gwh07_storage = createSection({
  sectionCode: 'GWH-07',
  name: 'Storage Conditions',
  category: 'housing',
  description: 'Storage conditions and environmental monitoring',
  order: 7,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'GWH-07-001',
      question: 'Apakah kondisi penyimpanan material sesuai dengan persyaratan?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Periksa kondisi penyimpanan',
      complianceCriteria: ['Suhu dan kelembaban sesuai', 'Ventilasi adequate', 'Material tidak kontak dengan lantai', 'Gudang bersih dan terorganisir'],
      evidenceRequirements: ['Storage conditions records', 'Temperature/humidity logs', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 8: SEGREGATION (GWH-08)
// ============================================================
const gwh08_segregation = createSection({
  sectionCode: 'GWH-08',
  name: 'Segregation & Quarantine',
  category: 'housing',
  description: 'Material segregation and quarantine',
  order: 8,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'GWH-08-001',
      question: 'Apakah material berbeda disimpan terpisah?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi segregasi material',
      complianceCriteria: ['Material berbeda disimpan terpisah', 'Area penyimpanan teridentifikasi', 'Cross-contamination dicegah'],
      evidenceRequirements: ['Storage layout', 'Segregation procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'GWH-08-002',
      question: 'Apakah area quarantine tersedia dan digunakan dengan benar?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi area quarantine',
      complianceCriteria: ['Area quarantine tersedia', 'Area quarantine teridentifikasi', 'Material quarantine dipisahkan', 'Catatan quarantine lengkap'],
      evidenceRequirements: ['Quarantine procedure', 'Quarantine records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 9: INVENTORY CONTROL (GWH-09)
// ============================================================
const gwh09_inventory = createSection({
  sectionCode: 'GWH-09',
  name: 'Inventory Control',
  category: 'documentation',
  description: 'Inventory control and accuracy',
  order: 9,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'GWH-09-001',
      question: 'Apakah inventory dimonitor dan dicatat dengan akurat?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi inventory control',
      complianceCriteria: ['Inventory dicatat', 'Stock opname dilakukan periodik', 'Akurasi inventory tinggi', 'Deviasi diinvestigasi'],
      evidenceRequirements: ['Inventory records', 'Stock opname records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 10: TRACEABILITY (GWH-10)
// ============================================================
const gwh10_traceability = createSection({
  sectionCode: 'GWH-10',
  name: 'Traceability',
  category: 'documentation',
  description: 'Material traceability system',
  order: 10,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'GWH-10-001',
      question: 'Apakah sistem traceability material tersedia?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Uji kemampuan traceability',
      complianceCriteria: ['Sistem traceability tersedia', 'Material dapat ditelusuri ke supplier', 'Material dapat ditelusuri ke user', 'Catatan traceability lengkap'],
      evidenceRequirements: ['Traceability system', 'Traceability records', 'Traceability test'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 11: DISPATCH (GWH-11)
// ============================================================
const gwh11_dispatch = createSection({
  sectionCode: 'GWH-11',
  name: 'Dispatch & Distribution',
  category: 'documentation',
  description: 'Material dispatch and distribution',
  order: 11,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'GWH-11-001',
      question: 'Apakah prosedur dispatch terdokumentasi dan diimplementasi?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur dispatch',
      complianceCriteria: ['Prosedur dispatch tertulis', 'Verifikasi order dilakukan', 'Dokumen pengiriman lengkap'],
      evidenceRequirements: ['Dispatch procedure', 'Dispatch records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 12: HOUSEKEEPING & PEST CONTROL (GWH-12)
// ============================================================
const gwh12_housekeeping = createSection({
  sectionCode: 'GWH-12',
  name: 'Housekeeping & Pest Control',
  category: 'sanitation',
  description: 'Housekeeping and pest control',
  order: 12,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'GWH-12-001',
      question: 'Apakah housekeeping gudang dilakukan dengan baik?',
      category: 'sanitation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi housekeeping gudang',
      complianceCriteria: ['Gudang bersih', 'Area terorganisir', 'Tidak ada sampah atau debris'],
      evidenceRequirements: ['Housekeeping records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    }),
    createQuestion({
      questionCode: 'GWH-12-002',
      question: 'Apakah program pest control berjalan efektif?',
      category: 'sanitation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi program pest control',
      complianceCriteria: ['Program pest control tertulis', 'Monitoring dilakukan rutin', 'Hasil monitoring dicatat'],
      evidenceRequirements: ['Pest control program', 'Pest control records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 13: SAFETY & FIRE PROTECTION (GWH-13)
// ============================================================
const gwh13_safety = createSection({
  sectionCode: 'GWH-13',
  name: 'Safety & Fire Protection',
  category: 'personnel',
  description: 'Safety and fire protection',
  order: 13,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'GWH-13-001',
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
    }),
    createQuestion({
      questionCode: 'GWH-13-002',
      question: 'Apakah fire protection system tersedia dan berfungsi?',
      category: 'personnel',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi fire protection system',
      complianceCriteria: ['Fire protection system tersedia', 'System diuji rutin', 'System berfungsi baik'],
      evidenceRequirements: ['Fire protection system', 'Test records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 14: DOCUMENTATION & CAPA (GWH-14)
// ============================================================
const gwh14_documentation = createSection({
  sectionCode: 'GWH-14',
  name: 'Documentation & CAPA',
  category: 'farm_management',
  description: 'Documentation and corrective actions',
  order: 14,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'GWH-14-001',
      question: 'Apakah dokumentasi gudang terkontrol dengan baik?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kontrol dokumentasi',
      complianceCriteria: ['Dokumentasi terkontrol', 'Versi dokumen terkini', 'Dokumen tersimpan dengan baik'],
      evidenceRequirements: ['Document control procedure', 'Document master list'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    }),
    createQuestion({
      questionCode: 'GWH-14-002',
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
      order: 2
    })
  ]
});

// Create the complete template
export const GENERAL_WAREHOUSE_TEMPLATE: AuditTemplate = {
  id: 'template-gwh-prod-v1',
  code: 'GWH-PROD-V1.0',
  name: 'General Warehouse Audit',
  description: 'Comprehensive audit template for general warehouse facilities covering receiving, storage, inventory, traceability, and dispatch',
  facilityTypes: ['warehouse'],
  departmentId: 'dept7', // Warehouse Department
  auditCategory: 'warehouse',
  references: [
    {
      id: 'ref-gwh-001',
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
    gwh01_management,
    gwh02_scope,
    gwh03_layout,
    gwh04_receiving,
    gwh05_identification,
    gwh06_batch,
    gwh07_storage,
    gwh08_segregation,
    gwh09_inventory,
    gwh10_traceability,
    gwh11_dispatch,
    gwh12_housekeeping,
    gwh13_safety,
    gwh14_documentation
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 20,
  estimatedDuration: 300, // 5 hours
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['warehouse', 'general', 'storage', 'inventory'],
  isPublic: true
};
