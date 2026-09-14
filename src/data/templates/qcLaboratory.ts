// QC Laboratory Audit Template - QC-LAB-V1.0
// Comprehensive audit template for quality control laboratory facilities

import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: LABORATORY ORGANIZATION (QCL-01)
// ============================================================
const qcl01_organization = createSection({
  sectionCode: 'QCL-01',
  name: 'Laboratory Organization',
  category: 'farm_management',
  description: 'Laboratory organization and management',
  order: 1,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'QCL-01-001',
      question: 'Apakah struktur organisasi laboratorium terdokumentasi dengan jelas?',
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
      questionCode: 'QCL-01-002',
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
// SECTION 2: SAMPLE MANAGEMENT (QCL-02)
// ============================================================
const qcl02_sample = createSection({
  sectionCode: 'QCL-02',
  name: 'Sample Management',
  category: 'documentation',
  description: 'Sample receiving, identification, and storage',
  order: 2,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'QCL-02-001',
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
      questionCode: 'QCL-02-002',
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
    }),
    createQuestion({
      questionCode: 'QCL-02-003',
      question: 'Apakah kondisi penyimpanan sampel sesuai dengan persyaratan?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Periksa kondisi penyimpanan sampel',
      complianceCriteria: ['Suhu penyimpanan sesuai', 'Kelembaban sesuai', 'Sampel tidak terkontaminasi'],
      evidenceRequirements: ['Storage conditions records', 'Temperature/humidity logs'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 3: TEST METHODS (QCL-03)
// ============================================================
const qcl03_methods = createSection({
  sectionCode: 'QCL-03',
  name: 'Test Methods',
  category: 'documentation',
  description: 'Test method validation and control',
  order: 3,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'QCL-03-001',
      question: 'Apakah metode pengujian yang digunakan divalidasi atau diverifikasi?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi validasi metode pengujian',
      complianceCriteria: ['Metode pengujian terdokumentasi', 'Metode divalidasi atau diverifikasi', 'Validasi/verifikasi didokumentasi'],
      evidenceRequirements: ['Test method documents', 'Validation/verification records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'QCL-03-002',
      question: 'Apakah personel terlatih dalam metode pengujian yang digunakan?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi training metode pengujian',
      complianceCriteria: ['Personel terlatih', 'Training records tersedia', 'Personel kompeten'],
      evidenceRequirements: ['Training records', 'Competency records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 4: EQUIPMENT & CALIBRATION (QCL-04)
// ============================================================
const qcl04_equipment = createSection({
  sectionCode: 'QCL-04',
  name: 'Equipment & Calibration',
  category: 'equipment',
  description: 'Laboratory equipment and calibration',
  order: 4,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'QCL-04-001',
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
    }),
    createQuestion({
      questionCode: 'QCL-04-002',
      question: 'Apakah peralatan laboratorium dimaintain dengan baik?',
      category: 'equipment',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi maintenance peralatan',
      complianceCriteria: ['Maintenance dilakukan sesuai jadwal', 'Peralatan berfungsi baik', 'Catatan maintenance lengkap'],
      evidenceRequirements: ['Maintenance records', 'Equipment maintenance records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 5: REAGENTS & REFERENCE STANDARDS (QCL-05)
// ============================================================
const qcl05_reagents = createSection({
  sectionCode: 'QCL-05',
  name: 'Reagents & Reference Standards',
  category: 'documentation',
  description: 'Reagent and reference standard management',
  order: 5,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'QCL-05-001',
      question: 'Apakah reagen dan reference standar dikelola dengan baik?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pengelolaan reagen dan reference standards',
      complianceCriteria: ['Reagen diidentifikasi dengan benar', 'Reagen disimpan dengan benar', 'Reagen tidak expired', 'Reference standards tersedia'],
      evidenceRequirements: ['Reagent inventory', 'Storage conditions', 'Expiry date records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'QCL-05-002',
      question: 'Apakah reagen expired dipisahkan dan dimusnahkan dengan benar?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Periksa pengelolaan reagen expired',
      complianceCriteria: ['Reagen expired diidentifikasi', 'Reagen expired dipisahkan', 'Reagen expired dimusnahkan dengan benar'],
      evidenceRequirements: ['Expired reagent records', 'Disposal records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 6: QUALITY CONTROL (QCL-06)
// ============================================================
const qcl06_qc = createSection({
  sectionCode: 'QCL-06',
  name: 'Quality Control',
  category: 'documentation',
  description: 'Quality control samples and control charts',
  order: 6,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'QCL-06-001',
      question: 'Apakah quality control samples diuji secara rutin?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pengujian quality control samples',
      complianceCriteria: ['QC samples diuji secara rutin', 'Hasil QC dalam kontrol', 'Catatan QC lengkap'],
      evidenceRequirements: ['QC records', 'Control charts'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'QCL-06-002',
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
// SECTION 7: DATA INTEGRITY (QCL-07)
// ============================================================
const qcl07_data = createSection({
  sectionCode: 'QCL-07',
  name: 'Data Integrity',
  category: 'documentation',
  description: 'Data integrity and record management',
  order: 7,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'QCL-07-001',
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
      questionCode: 'QCL-07-002',
      question: 'Apakah catatan laboratorium disimpan dengan aman?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Periksa penyimpanan catatan laboratorium',
      complianceCriteria: ['Catatan disimpan dengan aman', 'Catatan dapat diakses saat diperlukan', 'Retensi catatan sesuai'],
      evidenceRequirements: ['Record retention schedule', 'Storage conditions'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 8: BIOSAFETY & SAFETY (QCL-08)
// ============================================================
const qcl08_safety = createSection({
  sectionCode: 'QCL-08',
  name: 'Biosafety & Safety',
  category: 'personnel',
  description: 'Laboratory biosafety and safety',
  order: 8,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'QCL-08-001',
      question: 'Apakah prosedur biosafety diimplementasi dengan benar?',
      category: 'personnel',
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
      questionCode: 'QCL-08-002',
      question: 'Apakah limbah laboratorium ditangani dengan benar?',
      category: 'personnel',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi penanganan limbah laboratorium',
      complianceCriteria: ['Limbah dipisahkan dengan benar', 'Limbah dimusnahkan sesuai regulasi', 'Catatan penanganan limbah lengkap'],
      evidenceRequirements: ['Waste management procedure', 'Waste disposal records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 9: CORRECTIVE ACTION (QCL-09)
// ============================================================
const qcl09_capa = createSection({
  sectionCode: 'QCL-09',
  name: 'Corrective Action',
  category: 'farm_management',
  description: 'Corrective and preventive actions',
  order: 9,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'QCL-09-001',
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
// SECTION 10: INTERNAL AUDIT (QCL-10)
// ============================================================
const qcl10_audit = createSection({
  sectionCode: 'QCL-10',
  name: 'Internal Audit',
  category: 'farm_management',
  description: 'Internal audit program',
  order: 10,
  weight: 1.2,
  items: [
    createQuestion({
      questionCode: 'QCL-10-001',
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
    })
  ]
});

// Create the complete template
export const QC_LABORATORY_TEMPLATE: AuditTemplate = {
  id: 'template-qc-lab-v1',
  code: 'QC-LAB-V1.0',
  name: 'QC Laboratory Audit',
  description: 'Comprehensive audit template for quality control laboratory facilities covering sample management, test methods, equipment, quality control, and data integrity',
  facilityTypes: ['laboratory'],
  departmentId: 'dept6', // Quality Assurance Department
  auditCategory: 'laboratory',
  references: [
    {
      id: 'ref-qcl-001',
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
    qcl01_organization,
    qcl02_sample,
    qcl03_methods,
    qcl04_equipment,
    qcl05_reagents,
    qcl06_qc,
    qcl07_data,
    qcl08_safety,
    qcl09_capa,
    qcl10_audit
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 20,
  estimatedDuration: 360, // 6 hours
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['laboratory', 'qc', 'testing', 'quality-control'],
  isPublic: true
};
