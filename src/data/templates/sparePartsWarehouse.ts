// Spare Parts Warehouse Audit Template - SPW-PROD-V1.0
import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

const spw01_management = createSection({
  sectionCode: 'SPW-01',
  name: 'Warehouse Management',
  category: 'farm_management',
  description: 'Spare parts warehouse management',
  order: 1,
  weight: 1.2,
  items: [
    createQuestion({
      questionCode: 'SPW-01-001',
      question: 'Apakah struktur organisasi spare parts warehouse terdokumentasi?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Periksa dokumentasi struktur organisasi',
      complianceCriteria: ['Struktur organisasi terdokumentasi', 'Tanggung jawab jelas'],
      evidenceRequirements: ['Organization chart', 'Job descriptions'],
      referenceIds: ['ref-sni-006'],
      severity: 'minor',
      order: 1
    })
  ]
});

const spw02_identification = createSection({
  sectionCode: 'SPW-02',
  name: 'Spare Part Identification',
  category: 'documentation',
  description: 'Spare part identification and numbering',
  order: 2,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'SPW-02-001',
      question: 'Apakah setiap spare part diidentifikasi dengan part number yang jelas?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi identifikasi spare part',
      complianceCriteria: ['Setiap spare part memiliki part number', 'Part number terdokumentasi', 'Label jelas dan lengkap'],
      evidenceRequirements: ['Part numbering system', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const spw03_inventory = createSection({
  sectionCode: 'SPW-03',
  name: 'Inventory Control',
  category: 'documentation',
  description: 'Inventory control and accuracy',
  order: 3,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'SPW-03-001',
      question: 'Apakah inventory spare parts dimonitor dan dicatat dengan akurat?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi inventory control',
      complianceCriteria: ['Inventory dicatat', 'Stock opname dilakukan periodik', 'Akurasi inventory tinggi'],
      evidenceRequirements: ['Inventory records', 'Stock opname records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const spw04_storage = createSection({
  sectionCode: 'SPW-04',
  name: 'Storage & Preservation',
  category: 'housing',
  description: 'Storage and preservation of spare parts',
  order: 4,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'SPW-04-001',
      question: 'Apakah spare parts disimpan dengan kondisi yang sesuai?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kondisi penyimpanan',
      complianceCriteria: ['Spare parts disimpan dengan benar', 'Preservasi dilakukan', 'Kondisi penyimpanan sesuai'],
      evidenceRequirements: ['Storage procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const spw05_issue = createSection({
  sectionCode: 'SPW-05',
  name: 'Issue & Return Control',
  category: 'documentation',
  description: 'Spare part issue and return control',
  order: 5,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'SPW-05-001',
      question: 'Apakah pengeluaran spare parts dicatat dengan benar?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pencatatan pengeluaran',
      complianceCriteria: ['Pengeluaran dicatat', 'Work order linkage tersedia', 'Catatan pengeluaran lengkap'],
      evidenceRequirements: ['Issue records', 'Work order records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    })
  ]
});

const spw06_traceability = createSection({
  sectionCode: 'SPW-06',
  name: 'Traceability',
  category: 'documentation',
  description: 'Spare part traceability',
  order: 6,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'SPW-06-001',
      question: 'Apakah sistem traceability spare parts tersedia?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Uji kemampuan traceability',
      complianceCriteria: ['Sistem traceability tersedia', 'Spare parts dapat ditelusuri', 'Catatan traceability lengkap'],
      evidenceRequirements: ['Traceability system', 'Traceability records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const spw07_safety = createSection({
  sectionCode: 'SPW-07',
  name: 'Safety & Housekeeping',
  category: 'personnel',
  description: 'Safety and housekeeping',
  order: 7,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'SPW-07-001',
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
    })
  ]
});

const spw08_capa = createSection({
  sectionCode: 'SPW-08',
  name: 'CAPA & Documentation',
  category: 'farm_management',
  description: 'Corrective actions and documentation',
  order: 8,
  weight: 1.2,
  items: [
    createQuestion({
      questionCode: 'SPW-08-001',
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

export const SPARE_PARTS_WAREHOUSE_TEMPLATE: AuditTemplate = {
  id: 'template-spw-prod-v1',
  code: 'SPW-PROD-V1.0',
  name: 'Spare Parts Warehouse Audit',
  description: 'Comprehensive audit template for spare parts warehouse facilities',
  facilityTypes: ['spare_parts_warehouse'],
  departmentId: 'dept8', // Maintenance Department
  auditCategory: 'warehouse',
  references: [
    {
      id: 'ref-spw-001',
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
    spw01_management,
    spw02_identification,
    spw03_inventory,
    spw04_storage,
    spw05_issue,
    spw06_traceability,
    spw07_safety,
    spw08_capa
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 8,
  estimatedDuration: 180,
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['spare-parts', 'warehouse', 'maintenance'],
  isPublic: true
};
