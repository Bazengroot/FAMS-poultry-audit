// Veterinary Facility Audit Template - VET-AH-V1.0
import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

const vet01_management = createSection({
  sectionCode: 'VET-01',
  name: 'Veterinary Management',
  category: 'farm_management',
  description: 'Veterinary facility management',
  order: 1,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'VET-01-001',
      question: 'Apakah struktur organisasi veterinary facility terdokumentasi?',
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

const vet02_medication = createSection({
  sectionCode: 'VET-02',
  name: 'Medication Management',
  category: 'animal_health',
  description: 'Veterinary drug and medication management',
  order: 2,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'VET-02-001',
      question: 'Apakah obat hewan disimpan dengan kondisi yang sesuai?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi penyimpanan obat hewan',
      complianceCriteria: ['Obat disimpan sesuai spesifikasi', 'Suhu penyimpanan sesuai', 'Obat tidak expired', 'Label jelas'],
      evidenceRequirements: ['Storage conditions records', 'Temperature logs'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const vet03_vaccine = createSection({
  sectionCode: 'VET-03',
  name: 'Vaccine Management',
  category: 'animal_health',
  description: 'Vaccine storage and cold chain',
  order: 3,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'VET-03-001',
      question: 'Apakah cold chain vaksin dijaga dengan baik?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi cold chain vaksin',
      complianceCriteria: ['Suhu penyimpanan vaksin sesuai', 'Suhu dimonitor rutin', 'Vaksin tidak expired', 'Catatan cold chain lengkap'],
      evidenceRequirements: ['Cold chain records', 'Temperature logs'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const vet04_biosecurity = createSection({
  sectionCode: 'VET-04',
  name: 'Biosecurity',
  category: 'biosecurity',
  description: 'Veterinary facility biosecurity',
  order: 4,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'VET-04-001',
      question: 'Apakah prosedur biosecurity diimplementasi?',
      category: 'biosecurity',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi implementasi biosecurity',
      complianceCriteria: ['Prosedur biosecurity tersedia', 'Prosedur diimplementasi', 'Personel memahami prosedur'],
      evidenceRequirements: ['Biosecurity procedure', 'Implementation records'],
      referenceIds: ['ref-woah-001'],
      severity: 'critical',
      order: 1
    })
  ]
});

const vet05_records = createSection({
  sectionCode: 'VET-05',
  name: 'Treatment Records',
  category: 'documentation',
  description: 'Treatment and medication records',
  order: 5,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'VET-05-001',
      question: 'Apakah catatan pengobatan hewan terdokumentasi dengan lengkap?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi catatan pengobatan',
      complianceCriteria: ['Catatan pengobatan lengkap', 'Withdrawal period tercatat', 'Catatan tersimpan dengan baik'],
      evidenceRequirements: ['Treatment records', 'Medication records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const vet06_equipment = createSection({
  sectionCode: 'VET-06',
  name: 'Veterinary Equipment',
  category: 'equipment',
  description: 'Veterinary equipment and calibration',
  order: 6,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'VET-06-001',
      question: 'Apakah peralatan veterinary dikalibrasi sesuai jadwal?',
      category: 'equipment',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kalibrasi peralatan',
      complianceCriteria: ['Peralatan dikalibrasi sesuai jadwal', 'Sertifikat kalibrasi tersedia'],
      evidenceRequirements: ['Calibration records', 'Calibration certificates'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    })
  ]
});

const vet07_waste = createSection({
  sectionCode: 'VET-07',
  name: 'Medical Waste Management',
  category: 'environment',
  description: 'Medical and veterinary waste management',
  order: 7,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'VET-07-001',
      question: 'Apakah limbah medis ditangani dengan benar?',
      category: 'environment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi penanganan limbah medis',
      complianceCriteria: ['Limbah medis dipisahkan', 'Limbah disimpan dengan benar', 'Limbah dimusnahkan sesuai regulasi'],
      evidenceRequirements: ['Waste management procedure', 'Waste disposal records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

const vet08_capa = createSection({
  sectionCode: 'VET-08',
  name: 'CAPA & Documentation',
  category: 'farm_management',
  description: 'Corrective actions and documentation',
  order: 8,
  weight: 1.2,
  items: [
    createQuestion({
      questionCode: 'VET-08-001',
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

export const VETERINARY_FACILITY_TEMPLATE: AuditTemplate = {
  id: 'template-vet-ah-v1',
  code: 'VET-AH-V1.0',
  name: 'Veterinary / Animal Health Facility Audit',
  description: 'Comprehensive audit template for veterinary and animal health facilities',
  facilityTypes: ['veterinary'],
  departmentId: 'dept10', // Veterinary Department
  auditCategory: 'animal_health',
  references: [
    {
      id: 'ref-vet-001',
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
    vet01_management,
    vet02_medication,
    vet03_vaccine,
    vet04_biosecurity,
    vet05_records,
    vet06_equipment,
    vet07_waste,
    vet08_capa
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
  tags: ['veterinary', 'animal-health', 'medication'],
  isPublic: true
};
