// Biosecurity Facility Audit Template - BIOSEC-V1.0
import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

const bio01_management = createSection({
  sectionCode: 'BIO-01',
  name: 'Biosecurity Management',
  category: 'farm_management',
  description: 'Biosecurity facility management',
  order: 1,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'BIO-01-001',
      question: 'Apakah prosedur biosecurity terdokumentasi dan diimplementasi?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur biosecurity',
      complianceCriteria: ['Prosedur biosecurity tertulis', 'Prosedur diimplementasi', 'Personel memahami prosedur'],
      evidenceRequirements: ['Biosecurity procedure', 'Implementation records'],
      referenceIds: ['ref-woah-001'],
      severity: 'critical',
      order: 1
    })
  ]
});

const bio02_access = createSection({
  sectionCode: 'BIO-02',
  name: 'Access Control',
  category: 'biosecurity',
  description: 'Site access control',
  order: 2,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'BIO-02-001',
      question: 'Apakah akses ke site dikontrol dengan ketat?',
      category: 'biosecurity',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kontrol akses',
      complianceCriteria: ['Akses dikontrol', 'Visitor log tersedia', 'Personel berwenang saja'],
      evidenceRequirements: ['Access control procedure', 'Visitor log', 'Site observation'],
      referenceIds: ['ref-woah-001'],
      severity: 'critical',
      order: 1
    })
  ]
});

const bio03_hygiene = createSection({
  sectionCode: 'BIO-03',
  name: 'Personnel Hygiene',
  category: 'personnel',
  description: 'Personnel hygiene requirements',
  order: 3,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'BIO-03-001',
      question: 'Apakah prosedur higiene personel diimplementasi?',
      category: 'personnel',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur higiene personel',
      complianceCriteria: ['Prosedur higiene tersedia', 'Personel mencuci tangan', 'APD digunakan'],
      evidenceRequirements: ['Hygiene procedure', 'Site observation'],
      referenceIds: ['ref-woah-001'],
      severity: 'critical',
      order: 1
    })
  ]
});

const bio04_disinfection = createSection({
  sectionCode: 'BIO-04',
  name: 'Cleaning & Disinfection',
  category: 'sanitation',
  description: 'Cleaning and disinfection procedures',
  order: 4,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'BIO-04-001',
      question: 'Apakah prosedur cleaning dan disinfection diimplementasi?',
      category: 'sanitation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur cleaning dan disinfection',
      complianceCriteria: ['Prosedur cleaning tertulis', 'Prosedur disinfection tertulis', 'Prosedur diimplementasi'],
      evidenceRequirements: ['Cleaning procedure', 'Disinfection procedure', 'Implementation records'],
      referenceIds: ['ref-woah-001'],
      severity: 'critical',
      order: 1
    })
  ]
});

const bio05_vehicle = createSection({
  sectionCode: 'BIO-05',
  name: 'Vehicle Disinfection',
  category: 'biosecurity',
  description: 'Vehicle disinfection procedures',
  order: 5,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'BIO-05-001',
      question: 'Apakah kendaraan didesinfeksi sebelum masuk site?',
      category: 'biosecurity',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi desinfeksi kendaraan',
      complianceCriteria: ['Kendaraan didesinfeksi', 'Disinfektan sesuai', 'Catatan desinfeksi lengkap'],
      evidenceRequirements: ['Vehicle disinfection procedure', 'Disinfection records'],
      referenceIds: ['ref-woah-001'],
      severity: 'critical',
      order: 1
    })
  ]
});

const bio06_zoning = createSection({
  sectionCode: 'BIO-06',
  name: 'Zoning & Movement Control',
  category: 'biosecurity',
  description: 'Zoning and movement control',
  order: 6,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'BIO-06-001',
      question: 'Apakah zoning dan movement control diimplementasi?',
      category: 'biosecurity',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi zoning dan movement control',
      complianceCriteria: ['Zoning terdokumentasi', 'Movement control diimplementasi', 'Clean/dirty separation'],
      evidenceRequirements: ['Zoning procedure', 'Movement control records', 'Site observation'],
      referenceIds: ['ref-woah-001'],
      severity: 'critical',
      order: 1
    })
  ]
});

const bio07_monitoring = createSection({
  sectionCode: 'BIO-07',
  name: 'Biosecurity Monitoring',
  category: 'biosecurity',
  description: 'Biosecurity monitoring and compliance',
  order: 7,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'BIO-07-001',
      question: 'Apakah kepatuhan biosecurity dimonitor secara rutin?',
      category: 'biosecurity',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi monitoring kepatuhan biosecurity',
      complianceCriteria: ['Kepatuhan dimonitor', 'Audit biosecurity dilakukan', 'Hasil monitoring dicatat'],
      evidenceRequirements: ['Biosecurity monitoring records', 'Audit records'],
      referenceIds: ['ref-woah-001'],
      severity: 'major',
      order: 1
    })
  ]
});

const bio08_capa = createSection({
  sectionCode: 'BIO-08',
  name: 'CAPA & Documentation',
  category: 'farm_management',
  description: 'Corrective actions and documentation',
  order: 8,
  weight: 1.2,
  items: [
    createQuestion({
      questionCode: 'BIO-08-001',
      question: 'Apakah sistem CAPA diimplementasi dengan efektif?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi implementasi sistem CAPA',
      complianceCriteria: ['Sistem CAPA terdokumentasi', 'CAPA diidentifikasi', 'Efektivitas CAPA diverifikasi'],
      evidenceRequirements: ['CAPA procedure', 'CAPA records'],
      referenceIds: ['ref-woah-001'],
      severity: 'major',
      order: 1
    })
  ]
});

export const BIOSECURITY_FACILITY_TEMPLATE: AuditTemplate = {
  id: 'template-biosec-v1',
  code: 'BIOSEC-V1.0',
  name: 'Biosecurity / Access Control Facility Audit',
  description: 'Comprehensive audit template for biosecurity and access control facilities',
  facilityTypes: ['biosecurity_facility'],
  departmentId: 'dept12', // Biosecurity Department
  auditCategory: 'biosecurity',
  references: [
    {
      id: 'ref-bio-001',
      code: 'WOAH Terrestrial Code Ch. 6.5',
      title: 'Biosecurity in Poultry Breeding Flocks',
      organization: 'WOAH',
      year: '2023',
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
    bio01_management,
    bio02_access,
    bio03_hygiene,
    bio04_disinfection,
    bio05_vehicle,
    bio06_zoning,
    bio07_monitoring,
    bio08_capa
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 8,
  estimatedDuration: 240,
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['biosecurity', 'access-control', 'disease-prevention'],
  isPublic: true
};
