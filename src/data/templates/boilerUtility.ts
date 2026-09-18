// Boiler/Utility Facility Audit Template - UTIL-BOILER-GEN-V1.0
import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

const util01_management = createSection({
  sectionCode: 'UTIL-01',
  name: 'Utility Management',
  category: 'farm_management',
  description: 'Utility facility management',
  order: 1,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'UTIL-01-001',
      question: 'Apakah prosedur operasi utility terdokumentasi dan diimplementasi?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur operasi utility',
      complianceCriteria: ['Prosedur operasi tertulis', 'Prosedur diimplementasi', 'Personel memahami prosedur'],
      evidenceRequirements: ['Operation procedure', 'Implementation records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const util02_equipment = createSection({
  sectionCode: 'UTIL-02',
  name: 'Equipment Maintenance',
  category: 'equipment',
  description: 'Boiler and generator maintenance',
  order: 2,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'UTIL-02-001',
      question: 'Apakah boiler dan generator dimaintain dengan baik?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi maintenance boiler dan generator',
      complianceCriteria: ['Maintenance dilakukan sesuai jadwal', 'Equipment berfungsi baik', 'Catatan maintenance lengkap'],
      evidenceRequirements: ['Maintenance records', 'Equipment maintenance records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const util03_safety = createSection({
  sectionCode: 'UTIL-03',
  name: 'Safety & Pressure Controls',
  category: 'personnel',
  description: 'Safety and pressure-related controls',
  order: 3,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'UTIL-03-001',
      question: 'Apakah pressure controls dan safety devices berfungsi dengan baik?',
      category: 'personnel',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pressure controls dan safety devices',
      complianceCriteria: ['Pressure controls berfungsi', 'Safety devices berfungsi', 'Diuji secara rutin'],
      evidenceRequirements: ['Safety device test records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const util04_fuel = createSection({
  sectionCode: 'UTIL-04',
  name: 'Fuel Management',
  category: 'feed_management',
  description: 'Fuel storage and handling',
  order: 4,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'UTIL-04-001',
      question: 'Apakah bahan bakar disimpan dan ditangani dengan benar?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi penyimpanan dan penanganan bahan bakar',
      complianceCriteria: ['Bahan bakar disimpan dengan benar', 'Penanganan sesuai prosedur', 'Spill prevention tersedia'],
      evidenceRequirements: ['Fuel storage records', 'Fuel handling procedure'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const util05_emissions = createSection({
  sectionCode: 'UTIL-05',
  name: 'Emission Monitoring',
  category: 'environment',
  description: 'Emission monitoring and control',
  order: 5,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'UTIL-05-001',
      question: 'Apakah emisi dimonitor dan dikontrol dengan baik?',
      category: 'environment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi monitoring dan kontrol emisi',
      complianceCriteria: ['Emisi dimonitor', 'Emisi dikontrol', 'Kepatuhan terhadap regulasi'],
      evidenceRequirements: ['Emission monitoring records', 'Environmental compliance records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const util06_emergency = createSection({
  sectionCode: 'UTIL-06',
  name: 'Emergency Preparedness',
  category: 'farm_management',
  description: 'Emergency preparedness and response',
  order: 6,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'UTIL-06-001',
      question: 'Apakah prosedur emergency response tersedia dan diuji?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur emergency response',
      complianceCriteria: ['Prosedur emergency response tersedia', 'Prosedur diuji', 'Personel memahami prosedur'],
      evidenceRequirements: ['Emergency procedure', 'Drill records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const util07_capa = createSection({
  sectionCode: 'UTIL-07',
  name: 'CAPA & Documentation',
  category: 'farm_management',
  description: 'Corrective actions and documentation',
  order: 7,
  weight: 1.2,
  items: [
    createQuestion({
      questionCode: 'UTIL-07-001',
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

export const BOILER_UTILITY_TEMPLATE: AuditTemplate = {
  id: 'template-util-boiler-gen-v1',
  code: 'UTIL-BOILER-GEN-V1.0',
  name: 'Boiler / Generator / Utility Facility Audit',
  description: 'Comprehensive audit template for boiler, generator, and utility facilities',
  facilityTypes: ['boiler_utility'],
  departmentId: 'dept11',
  auditCategory: 'utility',
  references: [
    {
      id: 'ref-util-001',
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
    util01_management,
    util02_equipment,
    util03_safety,
    util04_fuel,
    util05_emissions,
    util06_emergency,
    util07_capa
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 7,
  estimatedDuration: 240,
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['boiler', 'utility', 'generator'],
  isPublic: true
};
