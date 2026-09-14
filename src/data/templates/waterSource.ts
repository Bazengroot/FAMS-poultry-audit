// Water Source Audit Template - WATER-SRC-V1.0
import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

const wsrc01_source = createSection({
  sectionCode: 'WSRC-01',
  name: 'Source Identification & Protection',
  category: 'water_management',
  description: 'Water source identification and protection',
  order: 1,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'WSRC-01-001',
      question: 'Apakah sumber air teridentifikasi dan dilindungi?',
      category: 'water_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi identifikasi dan proteksi sumber air',
      complianceCriteria: ['Sumber air teridentifikasi', 'Sumber air dilindungi', 'Akses dikontrol'],
      evidenceRequirements: ['Water source records', 'Protection measures'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const wsrc02_monitoring = createSection({
  sectionCode: 'WSRC-02',
  name: 'Water Quality Monitoring',
  category: 'water_management',
  description: 'Water quality monitoring',
  order: 2,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'WSRC-02-001',
      question: 'Apakah kualitas air sumber dimonitor secara rutin?',
      category: 'water_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi monitoring kualitas air',
      complianceCriteria: ['Kualitas air dimonitor rutin', 'Parameter monitoring sesuai', 'Hasil monitoring dicatat'],
      evidenceRequirements: ['Water quality monitoring records', 'Laboratory test results'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const wsrc03_integrity = createSection({
  sectionCode: 'WSRC-03',
  name: 'Reservoir Integrity',
  category: 'housing',
  description: 'Reservoir integrity and maintenance',
  order: 3,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'WSRC-03-001',
      question: 'Apakah reservoir dalam kondisi baik?',
      category: 'housing',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kondisi reservoir',
      complianceCriteria: ['Reservoir tidak bocor', 'Reservoir bersih', 'Struktur dalam kondisi baik'],
      evidenceRequirements: ['Reservoir inspection records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    })
  ]
});

const wsrc04_capa = createSection({
  sectionCode: 'WSRC-04',
  name: 'CAPA & Documentation',
  category: 'farm_management',
  description: 'Corrective actions and documentation',
  order: 4,
  weight: 1.2,
  items: [
    createQuestion({
      questionCode: 'WSRC-04-001',
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

export const WATER_SOURCE_TEMPLATE: AuditTemplate = {
  id: 'template-water-src-v1',
  code: 'WATER-SRC-V1.0',
  name: 'Water Source / Reservoir Audit',
  description: 'Comprehensive audit template for water source and reservoir facilities',
  facilityTypes: ['water_source'],
  departmentId: 'dept11',
  auditCategory: 'utility',
  references: [
    {
      id: 'ref-wsrc-001',
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
    wsrc01_source,
    wsrc02_monitoring,
    wsrc03_integrity,
    wsrc04_capa
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 4,
  estimatedDuration: 120,
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['water-source', 'reservoir', 'utility'],
  isPublic: true
};
