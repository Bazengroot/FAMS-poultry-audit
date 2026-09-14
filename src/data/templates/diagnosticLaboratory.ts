// Diagnostic Laboratory Audit Template - DIAG-LAB-V1.0
// Comprehensive audit template for diagnostic laboratory facilities

import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: LABORATORY ORGANIZATION (DL-01)
// ============================================================
const dl01_organization = createSection({
  sectionCode: 'DL-01',
  name: 'Laboratory Organization',
  category: 'farm_management',
  description: 'Laboratory organization and management',
  order: 1,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'DL-01-001',
      question: 'Apakah struktur organisasi laboratorium diagnostik terdokumentasi dengan jelas?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Periksa dokumentasi struktur organisasi laboratorium',
      complianceCriteria: ['Struktur organisasi terdokumentasi', 'Tugas dan tanggung jawab jelas', 'Hierarki pelaporan terdefinisi'],
      evidenceRequirements: ['Organization chart', 'Job descriptions'],
      referenceIds: ['ref-sni-006'],
      severity: 'minor',
      order: 1
    }),
    createQuestion({
      questionCode: 'DL-01-002',
      question: 'Apakah personel laboratorium memiliki kompetensi yang sesuai?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kompetensi personel laboratorium',
      complianceCriteria: ['Personel terlatih', 'Kompetensi sesuai tugas', 'Training records tersedia'],
      evidenceRequirements: ['Training records', 'Competency matrix'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 2: SAMPLE MANAGEMENT (DL-02)
// ============================================================
const dl02_sample = createSection({
  sectionCode: 'DL-02',
  name: 'Sample Management',
  category: 'documentation',
  description: 'Sample receiving, identification, and storage',
  order: 2,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'DL-02-001',
      question: 'Apakah prosedur penerimaan sampel terdokumentasi dan diimplementasi?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur penerimaan sampel',
      complianceCriteria: ['Prosedur penerimaan tertulis', 'Sampel diidentifikasi dengan benar', 'Kondisi sampel diperiksa', 'Catatan penerimaan lengkap'],
      evidenceRequirements: ['Sample receiving procedure', 'Sample receiving records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'DL-02-002',
      question: 'Apakah chain of custody sampel dijaga dengan baik?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi chain of custody',
      complianceCriteria: ['Chain of custody terdokumentasi', 'Sampel dapat ditelusuri', 'Penyimpanan sampel sesuai'],
      evidenceRequirements: ['Chain of custody records', 'Sample storage records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 3: BIOSAFETY & BIOSECURITY (DL-03)
// ============================================================
const dl03_biosafety = createSection({
  sectionCode: 'DL-03',
  name: 'Biosafety & Biosecurity',
  category: 'biosecurity',
  description: 'Laboratory biosafety and biosecurity',
  order: 3,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'DL-03-001',
      question: 'Apakah prosedur biosafety diimplementasi dengan benar?',
      category: 'biosecurity',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi implementasi biosafety',
      complianceCriteria: ['Prosedur biosafety tersedia', 'Personel memahami prosedur', 'APD disediakan dan digunakan'],
      evidenceRequirements: ['Biosafety procedure', 'Training records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'DL-03-002',
      question: 'Apakah prosedur biosecurity diimplementasi dengan benar?',
      category: 'biosecurity',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi implementasi biosecurity',
      complianceCriteria: ['Prosedur biosecurity tersedia', 'Akses laboratorium dikontrol', 'Dekontaminasi dilakukan'],
      evidenceRequirements: ['Biosecurity procedure', 'Access control records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 4: DIAGNOSTIC METHODS (DL-04)
// ============================================================
const dl04_methods = createSection({
  sectionCode: 'DL-04',
  name: 'Diagnostic Methods',
  category: 'documentation',
  description: 'Diagnostic method validation and control',
  order: 4,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'DL-04-001',
      question: 'Apakah metode diagnostik yang digunakan divalidasi atau diverifikasi?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi validasi metode diagnostik',
      complianceCriteria: ['Metode diagnostik terdokumentasi', 'Metode divalidasi atau diverifikasi', 'Validasi/verifikasi didokumentasi'],
      evidenceRequirements: ['Diagnostic method documents', 'Validation/verification records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'DL-04-002',
      question: 'Apakah personel terlatih dalam metode diagnostik yang digunakan?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi training metode diagnostik',
      complianceCriteria: ['Personel terlatih', 'Training records tersedia', 'Personel kompeten'],
      evidenceRequirements: ['Training records', 'Competency records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 5: EQUIPMENT & CALIBRATION (DL-05)
// ============================================================
const dl05_equipment = createSection({
  sectionCode: 'DL-05',
  name: 'Equipment & Calibration',
  category: 'equipment',
  description: 'Laboratory equipment and calibration',
  order: 5,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'DL-05-001',
      question: 'Apakah peralatan laboratorium dikalibrasi sesuai jadwal?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kalibrasi peralatan',
      complianceCriteria: ['Peralatan dikalibrasi sesuai jadwal', 'Kalibrasi dilakukan oleh personel kompeten', 'Sertifikat kalibrasi tersedia'],
      evidenceRequirements: ['Calibration schedule', 'Calibration records', 'Calibration certificates'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 6: REAGENTS & REFERENCE MATERIALS (DL-06)
// ============================================================
const dl06_reagents = createSection({
  sectionCode: 'DL-06',
  name: 'Reagents & Reference Materials',
  category: 'documentation',
  description: 'Reagent and reference material management',
  order: 6,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'DL-06-001',
      question: 'Apakah reagen dan reference materials dikelola dengan baik?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pengelolaan reagen dan reference materials',
      complianceCriteria: ['Reagen diidentifikasi dengan benar', 'Reagen disimpan dengan benar', 'Reagen tidak expired', 'Reference materials tersedia'],
      evidenceRequirements: ['Reagent inventory', 'Storage conditions', 'Expiry date records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 7: QUALITY CONTROL (DL-07)
// ============================================================
const dl07_qc = createSection({
  sectionCode: 'DL-07',
  name: 'Quality Control',
  category: 'documentation',
  description: 'Quality control samples and controls',
  order: 7,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'DL-07-001',
      question: 'Apakah quality control samples diuji secara rutin?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pengujian quality control samples',
      complianceCriteria: ['QC samples diuji secara rutin', 'Positive dan negative controls tersedia', 'Hasil QC dalam kontrol'],
      evidenceRequirements: ['QC records', 'Control records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'DL-07-002',
      question: 'Apakah hasil pengujian diverifikasi sebelum dilaporkan?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi verifikasi hasil pengujian',
      complianceCriteria: ['Hasil diverifikasi', 'Verifikasi dilakukan oleh personel berwenang', 'Catatan verifikasi lengkap'],
      evidenceRequirements: ['Result verification records', 'Approval records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 8: RESULT REPORTING (DL-08)
// ============================================================
const dl08_reporting = createSection({
  sectionCode: 'DL-08',
  name: 'Result Reporting',
  category: 'documentation',
  description: 'Result interpretation and reporting',
  order: 8,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'DL-08-001',
      question: 'Apakah hasil pengujian dilaporkan dengan benar dan tepat waktu?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pelaporan hasil pengujian',
      complianceCriteria: ['Hasil dilaporkan dengan benar', 'Hasil dilaporkan tepat waktu', 'Laporan lengkap dan akurat'],
      evidenceRequirements: ['Report templates', 'Report records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'DL-08-002',
      question: 'Apakah critical results dilaporkan segera?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pelaporan critical results',
      complianceCriteria: ['Critical results diidentifikasi', 'Critical results dilaporkan segera', 'Catatan pelaporan lengkap'],
      evidenceRequirements: ['Critical result reporting procedure', 'Report records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 9: DATA INTEGRITY & CONFIDENTIALITY (DL-09)
// ============================================================
const dl09_data = createSection({
  sectionCode: 'DL-09',
  name: 'Data Integrity & Confidentiality',
  category: 'documentation',
  description: 'Data integrity and confidentiality',
  order: 9,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'DL-09-001',
      question: 'Apakah data integrity dijaga dengan baik?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi data integrity',
      complianceCriteria: ['Data tidak diubah tanpa otorisasi', 'Audit trail tersedia', 'Data backup dilakukan'],
      evidenceRequirements: ['Data integrity procedure', 'Audit trail records', 'Backup records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'DL-09-002',
      question: 'Apakah kerahasiaan data dijaga dengan baik?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kerahasiaan data',
      complianceCriteria: ['Data dijaga kerahasiaannya', 'Akses data dikontrol', 'Prosedur kerahasiaan tersedia'],
      evidenceRequirements: ['Confidentiality procedure', 'Access control records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 10: WASTE MANAGEMENT & DECONTAMINATION (DL-10)
// ============================================================
const dl10_waste = createSection({
  sectionCode: 'DL-10',
  name: 'Waste Management & Decontamination',
  category: 'environment',
  description: 'Waste management and decontamination',
  order: 10,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'DL-10-001',
      question: 'Apakah limbah laboratorium ditangani dengan benar?',
      category: 'environment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi penanganan limbah laboratorium',
      complianceCriteria: ['Limbah dipisahkan dengan benar', 'Limbah dimusnahkan sesuai regulasi', 'Catatan penanganan limbah lengkap'],
      evidenceRequirements: ['Waste management procedure', 'Waste disposal records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'DL-10-002',
      question: 'Apakah dekontaminasi dilakukan dengan benar?',
      category: 'environment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi dekontaminasi',
      complianceCriteria: ['Dekontaminasi dilakukan rutin', 'Prosedur dekontaminasi tersedia', 'Efektivitas dekontaminasi diverifikasi'],
      evidenceRequirements: ['Decontamination procedure', 'Decontamination records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 11: INCIDENT MANAGEMENT (DL-11)
// ============================================================
const dl11_incident = createSection({
  sectionCode: 'DL-11',
  name: 'Incident Management',
  category: 'farm_management',
  description: 'Incident management and emergency procedures',
  order: 11,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'DL-11-001',
      question: 'Apakah prosedur incident management tersedia?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur incident management',
      complianceCriteria: ['Prosedur incident management tersedia', 'Personel memahami prosedur', 'Incident dicatat dan diinvestigasi'],
      evidenceRequirements: ['Incident management procedure', 'Incident records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 12: CORRECTIVE ACTION (DL-12)
// ============================================================
const dl12_capa = createSection({
  sectionCode: 'DL-12',
  name: 'Corrective Action',
  category: 'farm_management',
  description: 'Corrective and preventive actions',
  order: 12,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'DL-12-001',
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

// ============================================================
// SECTION 13: INTERNAL AUDIT & DOCUMENTATION (DL-13)
// ============================================================
const dl13_audit = createSection({
  sectionCode: 'DL-13',
  name: 'Internal Audit & Documentation',
  category: 'farm_management',
  description: 'Internal audit and documentation control',
  order: 13,
  weight: 1.2,
  items: [
    createQuestion({
      questionCode: 'DL-13-001',
      question: 'Apakah internal audit dilakukan secara periodik?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi program internal audit',
      complianceCriteria: ['Program internal audit terdokumentasi', 'Internal audit dilakukan sesuai jadwal', 'Hasil audit ditindaklanjuti'],
      evidenceRequirements: ['Internal audit program', 'Internal audit records'],
      referenceIds: ['ref-sni-006'],
      severity: 'minor',
      order: 1
    }),
    createQuestion({
      questionCode: 'DL-13-002',
      question: 'Apakah dokumentasi laboratorium terkontrol dengan baik?',
      category: 'farm_management',
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

// Create the complete template
export const DIAGNOSTIC_LABORATORY_TEMPLATE: AuditTemplate = {
  id: 'template-diag-lab-v1',
  code: 'DIAG-LAB-V1.0',
  name: 'Diagnostic Laboratory Audit',
  description: 'Comprehensive audit template for diagnostic laboratory facilities covering biosafety, diagnostic methods, quality control, and result reporting',
  facilityTypes: ['laboratory'],
  departmentId: 'dept6', // Quality Assurance Department
  auditCategory: 'laboratory',
  references: [
    {
      id: 'ref-dl-001',
      code: 'SNI ISO/IEC 17025:2017',
      title: 'Persyaratan umum untuk kompetensi laboratorium pengujian dan kalibrasi',
      organization: 'BSN',
      year: '2017',
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
    dl01_organization,
    dl02_sample,
    dl03_biosafety,
    dl04_methods,
    dl05_equipment,
    dl06_reagents,
    dl07_qc,
    dl08_reporting,
    dl09_data,
    dl10_waste,
    dl11_incident,
    dl12_capa,
    dl13_audit
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 24,
  estimatedDuration: 420, // 7 hours
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['laboratory', 'diagnostic', 'biosafety', 'testing'],
  isPublic: true
};
