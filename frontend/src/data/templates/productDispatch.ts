// Product Dispatch Audit Template - PD-DIST-V1.0
import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

const pd01_dispatch = createSection({
  sectionCode: 'PD-01',
  name: 'Dispatch Management',
  category: 'farm_management',
  description: 'Product dispatch management',
  order: 1,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'PD-01-001',
      question: 'Apakah prosedur dispatch terdokumentasi dan diimplementasi?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur dispatch',
      complianceCriteria: ['Prosedur dispatch tertulis', 'Prosedur diimplementasi', 'Personel memahami prosedur'],
      evidenceRequirements: ['Dispatch procedure', 'Implementation records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const pd02_verification = createSection({
  sectionCode: 'PD-02',
  name: 'Product Verification',
  category: 'documentation',
  description: 'Product verification before dispatch',
  order: 2,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'PD-02-001',
      question: 'Apakah produk diverifikasi sebelum dispatch?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi verifikasi produk',
      complianceCriteria: ['Produk diverifikasi', 'Batch/lot diverifikasi', 'Kuantitas diverifikasi', 'Label diverifikasi'],
      evidenceRequirements: ['Verification records', 'Dispatch records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const pd03_vehicle = createSection({
  sectionCode: 'PD-03',
  name: 'Vehicle Verification',
  category: 'equipment',
  description: 'Vehicle verification and cleanliness',
  order: 3,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'PD-03-001',
      question: 'Apakah kendaraan diverifikasi sebelum loading?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi verifikasi kendaraan',
      complianceCriteria: ['Kendaraan diverifikasi', 'Kendaraan bersih', 'Kendaraan sesuai', 'Inspeksi didokumentasi'],
      evidenceRequirements: ['Vehicle inspection records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const pd04_loading = createSection({
  sectionCode: 'PD-04',
  name: 'Loading Practices',
  category: 'feed_management',
  description: 'Loading practices and procedures',
  order: 4,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'PD-04-001',
      question: 'Apakah loading dilakukan dengan prosedur yang benar?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur loading',
      complianceCriteria: ['Prosedur loading tertulis', 'Loading dilakukan dengan benar', 'Produk tidak rusak', 'Catatan loading lengkap'],
      evidenceRequirements: ['Loading procedure', 'Loading records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const pd05_traceability = createSection({
  sectionCode: 'PD-05',
  name: 'Traceability & Documentation',
  category: 'documentation',
  description: 'Product traceability and documentation',
  order: 5,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'PD-05-001',
      question: 'Apakah sistem traceability produk tersedia?',
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

const pd06_security = createSection({
  sectionCode: 'PD-06',
  name: 'Security & Tampering Prevention',
  category: 'documentation',
  description: 'Security and tampering prevention',
  order: 6,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'PD-06-001',
      question: 'Apakah keamanan produk dijaga selama dispatch?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi keamanan produk',
      complianceCriteria: ['Keamanan produk dijaga', 'Tampering prevention tersedia', 'Segel tersedia', 'Catatan keamanan lengkap'],
      evidenceRequirements: ['Security procedure', 'Tampering prevention records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const pd07_capa = createSection({
  sectionCode: 'PD-07',
  name: 'CAPA & Documentation',
  category: 'farm_management',
  description: 'Corrective actions and documentation',
  order: 7,
  weight: 1.2,
  items: [
    createQuestion({
      questionCode: 'PD-07-001',
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

export const PRODUCT_DISPATCH_TEMPLATE: AuditTemplate = {
  id: 'template-pd-dist-v1',
  code: 'PD-DIST-V1.0',
  name: 'Product Dispatch Audit',
  description: 'Comprehensive audit template for product dispatch and distribution facilities',
  facilityTypes: ['product_dispatch'],
  departmentId: 'dept9', // Logistics Department
  auditCategory: 'logistics',
  references: [
    {
      id: 'ref-pd-001',
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
    pd01_dispatch,
    pd02_verification,
    pd03_vehicle,
    pd04_loading,
    pd05_traceability,
    pd06_security,
    pd07_capa
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
  tags: ['product-dispatch', 'distribution', 'logistics'],
  isPublic: true
};
