// Chemical Storage Audit Template - CHEM-STOR-V1.0
// Comprehensive audit template for chemical storage facilities

import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: CHEMICAL INVENTORY (CHEM-01)
// ============================================================
const chem01_inventory = createSection({
  sectionCode: 'CHEM-01',
  name: 'Chemical Inventory',
  category: 'documentation',
  description: 'Chemical inventory management',
  order: 1,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'CHEM-01-001',
      question: 'Apakah inventori bahan kimia terdokumentasi dengan lengkap?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi inventori bahan kimia',
      complianceCriteria: ['Inventori bahan kimia terdokumentasi', 'Setiap bahan kimia tercatat', 'Jumlah dan lokasi tercatat', 'Inventori diupdate secara berkala'],
      evidenceRequirements: ['Chemical inventory list', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'CHEM-01-002',
      question: 'Apakah SDS (Safety Data Sheet) tersedia untuk setiap bahan kimia?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi ketersediaan SDS',
      complianceCriteria: ['SDS tersedia untuk setiap bahan kimia', 'SDS dalam bahasa yang dipahami', 'SDS mudah diakses', 'SDS terkini'],
      evidenceRequirements: ['SDS documents', 'SDS accessibility'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 2: CHEMICAL IDENTIFICATION (CHEM-02)
// ============================================================
const chem02_identification = createSection({
  sectionCode: 'CHEM-02',
  name: 'Chemical Identification & Labeling',
  category: 'documentation',
  description: 'Chemical identification and labeling',
  order: 2,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'CHEM-02-001',
      question: 'Apakah setiap bahan kimia diidentifikasi dengan label yang jelas?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Periksa labeling bahan kimia',
      complianceCriteria: ['Setiap bahan kimia memiliki label', 'Label mencakup nama bahan kimia', 'Label mencakup hazard warning', 'Label dalam kondisi baik'],
      evidenceRequirements: ['Labeling procedure', 'Site observation', 'Photographic evidence'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 3: STORAGE COMPATIBILITY (CHEM-03)
// ============================================================
const chem03_compatibility = createSection({
  sectionCode: 'CHEM-03',
  name: 'Storage Compatibility & Segregation',
  category: 'housing',
  description: 'Chemical storage compatibility and segregation',
  order: 3,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'CHEM-03-001',
      question: 'Apakah bahan kimia disimpan sesuai dengan kompatibilitas?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi penyimpanan berdasarkan kompatibilitas',
      complianceCriteria: ['Bahan kimia incompatible dipisahkan', 'Penyimpanan sesuai SDS', 'Secondary containment tersedia', 'Spill kit tersedia'],
      evidenceRequirements: ['Compatibility matrix', 'Storage layout', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'CHEM-03-002',
      question: 'Apakah bahan kimia flammable, corrosive, dan toxic disimpan terpisah?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi segregasi bahan kimia berbahaya',
      complianceCriteria: ['Bahan kimia flammable disimpan terpisah', 'Bahan kimia corrosive disimpan terpisah', 'Bahan kimia toxic disimpan terpisah', 'Area penyimpanan teridentifikasi'],
      evidenceRequirements: ['Storage procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 4: CONTAINER INTEGRITY (CHEM-04)
// ============================================================
const chem04_container = createSection({
  sectionCode: 'CHEM-04',
  name: 'Container Integrity',
  category: 'housing',
  description: 'Chemical container integrity',
  order: 4,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'CHEM-04-001',
      question: 'Apakah container bahan kimia dalam kondisi baik?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Periksa kondisi container bahan kimia',
      complianceCriteria: ['Container tidak bocor', 'Container tidak korosi', 'Container tertutup dengan baik', 'Container tidak rusak'],
      evidenceRequirements: ['Site observation', 'Photographic evidence'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 5: SPILL PREVENTION & RESPONSE (CHEM-05)
// ============================================================
const chem05_spill = createSection({
  sectionCode: 'CHEM-05',
  name: 'Spill Prevention & Response',
  category: 'environment',
  description: 'Spill prevention and response procedures',
  order: 5,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'CHEM-05-001',
      question: 'Apakah prosedur spill prevention dan response terdokumentasi?',
      category: 'environment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur spill',
      complianceCriteria: ['Prosedur spill prevention tertulis', 'Prosedur spill response tertulis', 'Personel terlatih', 'Spill kit tersedia'],
      evidenceRequirements: ['Spill procedure', 'Spill kit', 'Training records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'CHEM-05-002',
      question: 'Apakah secondary containment tersedia untuk bahan kimia?',
      category: 'environment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi secondary containment',
      complianceCriteria: ['Secondary containment tersedia', 'Kapasitas adequate', 'Secondary containment dalam kondisi baik'],
      evidenceRequirements: ['Secondary containment', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 6: ACCESS CONTROL (CHEM-06)
// ============================================================
const chem06_access = createSection({
  sectionCode: 'CHEM-06',
  name: 'Access Control',
  category: 'documentation',
  description: 'Chemical storage access control',
  order: 6,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'CHEM-06-001',
      question: 'Apakah akses ke area penyimpanan bahan kimia dikontrol?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kontrol akses',
      complianceCriteria: ['Akses terbatas untuk personel berwenang', 'Sistem kontrol akses tersedia', 'Visitor log tersedia'],
      evidenceRequirements: ['Access control procedure', 'Visitor log', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 7: PPE & SAFETY (CHEM-07)
// ============================================================
const chem07_ppe = createSection({
  sectionCode: 'CHEM-07',
  name: 'PPE & Safety Equipment',
  category: 'personnel',
  description: 'Personal protective equipment and safety equipment',
  order: 7,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'CHEM-07-001',
      question: 'Apakah PPE yang sesuai tersedia dan digunakan?',
      category: 'personnel',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi ketersediaan dan penggunaan PPE',
      complianceCriteria: ['PPE tersedia', 'PPE sesuai dengan bahan kimia', 'Personel menggunakan PPE', 'PPE dalam kondisi baik'],
      evidenceRequirements: ['PPE inventory', 'Site observation', 'Photographic evidence'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'CHEM-07-002',
      question: 'Apakah emergency equipment tersedia dan berfungsi?',
      category: 'personnel',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi emergency equipment',
      complianceCriteria: ['Eyewash station tersedia', 'Safety shower tersedia', 'Emergency equipment diuji rutin', 'Emergency equipment berfungsi'],
      evidenceRequirements: ['Emergency equipment', 'Test records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 8: FIRE PROTECTION & VENTILATION (CHEM-08)
// ============================================================
const chem08_fire = createSection({
  sectionCode: 'CHEM-08',
  name: 'Fire Protection & Ventilation',
  category: 'personnel',
  description: 'Fire protection and ventilation',
  order: 8,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'CHEM-08-001',
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
      order: 1
    }),
    createQuestion({
      questionCode: 'CHEM-08-002',
      question: 'Apakah ventilasi adequate untuk area penyimpanan bahan kimia?',
      category: 'personnel',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi ventilasi',
      complianceCriteria: ['Ventilasi adequate', 'Ventilasi berfungsi baik', 'Airflow sesuai standar'],
      evidenceRequirements: ['Ventilation system', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 9: CHEMICAL ISSUE & EXPIRY (CHEM-09)
// ============================================================
const chem09_issue = createSection({
  sectionCode: 'CHEM-09',
  name: 'Chemical Issue & Expiry Control',
  category: 'documentation',
  description: 'Chemical issue and expiry control',
  order: 9,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'CHEM-09-001',
      question: 'Apakah pengeluaran bahan kimia dicatat dengan benar?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pencatatan pengeluaran bahan kimia',
      complianceCriteria: ['Pengeluaran bahan kimia dicatat', 'Jumlah dan tujuan tercatat', 'Catatan pengeluaran lengkap'],
      evidenceRequirements: ['Chemical issue records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    }),
    createQuestion({
      questionCode: 'CHEM-09-002',
      question: 'Apakah expiry control bahan kimia diimplementasi?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi expiry control',
      complianceCriteria: ['Tanggal expiry tercatat', 'Bahan kimia mendekati expiry diidentifikasi', 'Bahan kimia expired dipisahkan', 'Bahan kimia expired dimusnahkan dengan benar'],
      evidenceRequirements: ['Expiry control records', 'Disposal records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 10: WASTE MANAGEMENT (CHEM-10)
// ============================================================
const chem10_waste = createSection({
  sectionCode: 'CHEM-10',
  name: 'Waste Chemical Management',
  category: 'environment',
  description: 'Waste chemical and empty container management',
  order: 10,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'CHEM-10-001',
      question: 'Apakah limbah bahan kimia ditangani dengan benar?',
      category: 'environment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi penanganan limbah bahan kimia',
      complianceCriteria: ['Limbah bahan kimia dipisahkan', 'Limbah disimpan dengan benar', 'Limbah dimusnahkan sesuai regulasi', 'Catatan penanganan limbah lengkap'],
      evidenceRequirements: ['Waste management procedure', 'Waste disposal records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'CHEM-10-002',
      question: 'Apakah container kosong ditangani dengan benar?',
      category: 'environment',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi penanganan container kosong',
      complianceCriteria: ['Container kosong dibersihkan', 'Container kosong disimpan dengan benar', 'Container kosong dimusnahkan dengan benar'],
      evidenceRequirements: ['Container disposal records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 11: TRAINING & DOCUMENTATION (CHEM-11)
// ============================================================
const chem11_training = createSection({
  sectionCode: 'CHEM-11',
  name: 'Training & Documentation',
  category: 'personnel',
  description: 'Training and documentation',
  order: 11,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'CHEM-11-001',
      question: 'Apakah personel terlatih dalam penanganan bahan kimia?',
      category: 'personnel',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi training penanganan bahan kimia',
      complianceCriteria: ['Training penanganan bahan kimia dilakukan', 'Personel memahami prosedur', 'Training records tersedia'],
      evidenceRequirements: ['Training records', 'Staff interview'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'CHEM-11-002',
      question: 'Apakah dokumentasi penyimpanan bahan kimia terkontrol dengan baik?',
      category: 'personnel',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kontrol dokumentasi',
      complianceCriteria: ['Dokumentasi terkontrol', 'Versi dokumen terkini', 'Dokumen tersimpan dengan baik'],
      evidenceRequirements: ['Document control procedure', 'Document master list'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 12: EMERGENCY RESPONSE & CAPA (CHEM-12)
// ============================================================
const chem12_emergency = createSection({
  sectionCode: 'CHEM-12',
  name: 'Emergency Response & CAPA',
  category: 'farm_management',
  description: 'Emergency response and corrective actions',
  order: 12,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'CHEM-12-001',
      question: 'Apakah prosedur emergency response tersedia dan diuji?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur emergency response',
      complianceCriteria: ['Prosedur emergency response tersedia', 'Prosedur diuji secara periodik', 'Personel memahami prosedur'],
      evidenceRequirements: ['Emergency procedure', 'Drill records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'CHEM-12-002',
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
export const CHEMICAL_STORAGE_TEMPLATE: AuditTemplate = {
  id: 'template-chem-stor-v1',
  code: 'CHEM-STOR-V1.0',
  name: 'Chemical Storage Audit',
  description: 'Comprehensive audit template for chemical storage facilities covering inventory, compatibility, safety, spill prevention, and waste management',
  facilityTypes: ['chemical_storage'],
  departmentId: 'dept7', // Warehouse Department
  auditCategory: 'warehouse',
  references: [
    {
      id: 'ref-chem-001',
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
    chem01_inventory,
    chem02_identification,
    chem03_compatibility,
    chem04_container,
    chem05_spill,
    chem06_access,
    chem07_ppe,
    chem08_fire,
    chem09_issue,
    chem10_waste,
    chem11_training,
    chem12_emergency
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 22,
  estimatedDuration: 300, // 5 hours
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['chemical-storage', 'safety', 'hazardous-materials'],
  isPublic: true
};
