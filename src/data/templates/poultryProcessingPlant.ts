// Poultry Processing Plant Audit Template - PPP-PROD-V1.0
// Comprehensive audit template for poultry processing plant facilities

import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: MANAGEMENT (PPP-01)
// ============================================================
const ppp01_management = createSection({
  sectionCode: 'PPP-01',
  name: 'Management & Organization',
  category: 'farm_management',
  description: 'Management structure and organization',
  order: 1,
  weight: 1.2,
  items: [
    createQuestion({
      questionCode: 'PPP-01-001',
      question: 'Apakah struktur organisasi processing plant terdokumentasi dengan jelas?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Periksa dokumentasi struktur organisasi',
      complianceCriteria: ['Struktur organisasi terdokumentasi', 'Tugas dan tanggung jawab jelas', 'Hierarki pelaporan terdefinisi'],
      evidenceRequirements: ['Organization chart', 'Job descriptions'],
      referenceIds: ['ref-sni-006'],
      severity: 'minor',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 2: GMP & GHP (PPP-02)
// ============================================================
const ppp02_gmp = createSection({
  sectionCode: 'PPP-02',
  name: 'GMP & GHP',
  category: 'farm_management',
  description: 'Good Manufacturing Practices and Good Hygiene Practices',
  order: 2,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'PPP-02-001',
      question: 'Apakah GMP dan GHP diimplementasi dengan efektif?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi implementasi GMP dan GHP',
      complianceCriteria: ['GMP dan GHP terdokumentasi', 'GMP dan GHP diimplementasi', 'Personel memahami GMP dan GHP', 'Monitoring dilakukan'],
      evidenceRequirements: ['GMP procedure', 'GHP procedure', 'Implementation records'],
      referenceIds: ['ref-codex-001'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 3: PERSONNEL HYGIENE (PPP-03)
// ============================================================
const ppp03_hygiene = createSection({
  sectionCode: 'PPP-03',
  name: 'Personnel Hygiene',
  category: 'personnel',
  description: 'Personnel hygiene requirements',
  order: 3,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'PPP-03-001',
      question: 'Apakah personel menggunakan pakaian kerja dan APD yang sesuai?',
      category: 'personnel',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pakaian kerja dan APD',
      complianceCriteria: ['Pakaian kerja bersih', 'APD lengkap', 'Pakaian diganti rutin'],
      evidenceRequirements: ['PPE procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 4: RAW MATERIAL RECEIVING (PPP-04)
// ============================================================
const ppp04_receiving = createSection({
  sectionCode: 'PPP-04',
  name: 'Raw Material Receiving',
  category: 'feed_management',
  description: 'Carcass receiving from slaughterhouse',
  order: 4,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'PPP-04-001',
      question: 'Apakah karkas diterima dengan prosedur yang benar?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur penerimaan karkas',
      complianceCriteria: ['Prosedur penerimaan tertulis', 'Karkas diperiksa saat diterima', 'Suhu karkas sesuai', 'Dokumen lengkap'],
      evidenceRequirements: ['Receiving procedure', 'Receiving records', 'Temperature records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 5: CARCASS HANDLING (PPP-05)
// ============================================================
const ppp05_handling = createSection({
  sectionCode: 'PPP-05',
  name: 'Carcass Handling',
  category: 'feed_management',
  description: 'Carcass handling procedures',
  order: 5,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'PPP-05-001',
      question: 'Apakah karkas ditangani dengan prosedur yang mencegah kontaminasi?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi penanganan karkas',
      complianceCriteria: ['Karkas ditangani dengan hati-hati', 'Kontaminasi dicegah', 'Suhu dijaga', 'Peralatan bersih'],
      evidenceRequirements: ['Handling procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 6: CUT-UP & DEBONING (PPP-06)
// ============================================================
const ppp06_cutting = createSection({
  sectionCode: 'PPP-06',
  name: 'Cut-Up & Deboning',
  category: 'feed_management',
  description: 'Cut-up and deboning procedures',
  order: 6,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'PPP-06-001',
      question: 'Apakah cut-up dan deboning dilakukan dengan prosedur yang benar?',
      category: 'feed_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur cut-up dan deboning',
      complianceCriteria: ['Prosedur cut-up dan deboning tertulis', 'Dilakukan dengan benar', 'Peralatan tajam dan bersih', 'Kontaminasi dicegah'],
      evidenceRequirements: ['Cutting procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 7: PACKAGING (PPP-07)
// ============================================================
const ppp07_packaging = createSection({
  sectionCode: 'PPP-07',
  name: 'Packaging & Labeling',
  category: 'documentation',
  description: 'Packaging and labeling procedures',
  order: 7,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'PPP-07-001',
      question: 'Apakah packaging dilakukan dengan prosedur yang benar?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur packaging',
      complianceCriteria: ['Prosedur packaging tertulis', 'Packaging dilakukan dengan benar', 'Label sesuai spesifikasi', 'Batch number tercatat'],
      evidenceRequirements: ['Packaging procedure', 'Labeling records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 8: METAL DETECTION (PPP-08)
// ============================================================
const ppp08_metal = createSection({
  sectionCode: 'PPP-08',
  name: 'Metal Detection & Foreign Material',
  category: 'feed_management',
  description: 'Metal detection and foreign material control',
  order: 8,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'PPP-08-001',
      question: 'Apakah metal detector berfungsi dengan baik dan dikalibrasi?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi metal detector',
      complianceCriteria: ['Metal detector berfungsi', 'Dikalibrasi rutin', 'Diuji dengan test piece', 'Catatan kalibrasi lengkap'],
      evidenceRequirements: ['Metal detector calibration records', 'Test records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 9: TEMPERATURE CONTROL (PPP-09)
// ============================================================
const ppp09_temperature = createSection({
  sectionCode: 'PPP-09',
  name: 'Temperature Control & Cold Chain',
  category: 'equipment',
  description: 'Temperature control and cold chain management',
  order: 9,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'PPP-09-001',
      question: 'Apakah suhu produk dimonitor dan dicatat?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi monitoring suhu',
      complianceCriteria: ['Suhu dimonitor', 'Suhu dicatat rutin', 'Suhu sesuai spesifikasi', 'Deviasi ditindaklanjuti'],
      evidenceRequirements: ['Temperature monitoring records', 'Cold chain records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 10: TRACEABILITY (PPP-10)
// ============================================================
const ppp10_traceability = createSection({
  sectionCode: 'PPP-10',
  name: 'Traceability',
  category: 'documentation',
  description: 'Product traceability system',
  order: 10,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'PPP-10-001',
      question: 'Apakah sistem traceability memungkinkan penelusuran produk?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Uji kemampuan traceability',
      complianceCriteria: ['Sistem traceability tersedia', 'Produk dapat ditelusuri ke bahan baku', 'Produk dapat ditelusuri ke customer', 'Catatan traceability lengkap'],
      evidenceRequirements: ['Traceability system', 'Traceability records', 'Traceability test'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 11: SANITATION (PPP-11)
// ============================================================
const ppp11_sanitation = createSection({
  sectionCode: 'PPP-11',
  name: 'Sanitation & Pest Control',
  category: 'sanitation',
  description: 'Sanitation and pest control',
  order: 11,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'PPP-11-001',
      question: 'Apakah jadwal cleaning dan sanitation terdokumentasi dan diimplementasi?',
      category: 'sanitation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi jadwal dan implementasi cleaning/sanitation',
      complianceCriteria: ['Jadwal cleaning terdokumentasi', 'Cleaning dilakukan sesuai jadwal', 'Bahan cleaning sesuai standar', 'Catatan cleaning lengkap'],
      evidenceRequirements: ['Cleaning schedule', 'Cleaning records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 12: HACCP (PPP-12)
// ============================================================
const ppp12_haccp = createSection({
  sectionCode: 'PPP-12',
  name: 'HACCP & Food Safety',
  category: 'farm_management',
  description: 'HACCP and food safety management',
  order: 12,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'PPP-12-001',
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

// ============================================================
// SECTION 13: NON-CONFORMING PRODUCT (PPP-13)
// ============================================================
const ppp13_nonconforming = createSection({
  sectionCode: 'PPP-13',
  name: 'Non-Conforming Product & Rework',
  category: 'feed_management',
  description: 'Non-conforming product and rework control',
  order: 13,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'PPP-13-001',
      question: 'Apakah produk tidak sesuai diidentifikasi dan dikarantina?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi penanganan produk tidak sesuai',
      complianceCriteria: ['Produk tidak sesuai diidentifikasi', 'Produk dikarantina', 'Disposisi didokumentasi', 'Tindakan korektif dilakukan'],
      evidenceRequirements: ['Nonconforming product records', 'Quarantine records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 14: CAPA & DOCUMENTATION (PPP-14)
// ============================================================
const ppp14_capa = createSection({
  sectionCode: 'PPP-14',
  name: 'CAPA & Documentation',
  category: 'farm_management',
  description: 'Corrective actions and documentation',
  order: 14,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'PPP-14-001',
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

// Create the complete template
export const POULTRY_PROCESSING_PLANT_TEMPLATE: AuditTemplate = {
  id: 'template-ppp-prod-v1',
  code: 'PPP-PROD-V1.0',
  name: 'Poultry Processing Plant Audit',
  description: 'Comprehensive audit template for poultry processing plant facilities covering processing, packaging, food safety, and traceability',
  facilityTypes: ['processing_plant'],
  departmentId: 'dept5', // Processing Department
  auditCategory: 'processing',
  references: [
    {
      id: 'ref-ppp-001',
      code: 'SNI 7388:2009',
      title: 'Pedoman Cara Produksi Pakan Ternak yang Baik',
      organization: 'BSN',
      year: '2009',
      status: 'valid',
      sourceType: 'standard',
      verificationStatus: 'verified',
      country: 'Indonesia',
      language: 'id'
    },
    {
      id: 'ref-ppp-002',
      code: 'Codex CXC 1-1969',
      title: 'General Principles of Food Hygiene',
      organization: 'Codex Alimentarius',
      year: '1969',
      status: 'valid',
      sourceType: 'standard',
      verificationStatus: 'verified',
      country: 'International',
      language: 'en'
    }
  ],
  version: '1.0',
  effectiveDate: new Date().toISOString(),
  status: 'active',
  sections: [
    ppp01_management,
    ppp02_gmp,
    ppp03_hygiene,
    ppp04_receiving,
    ppp05_handling,
    ppp06_cutting,
    ppp07_packaging,
    ppp08_metal,
    ppp09_temperature,
    ppp10_traceability,
    ppp11_sanitation,
    ppp12_haccp,
    ppp13_nonconforming,
    ppp14_capa
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 14,
  estimatedDuration: 360, // 6 hours
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['processing-plant', 'processing', 'food-safety', 'haccp'],
  isPublic: true
};
