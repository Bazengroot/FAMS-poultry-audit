// Pullet / Rearing Farm Production Audit Template - PF-PROD-V1.0
// Comprehensive audit template for pullet/rearing farm facilities

import { AuditTemplate } from '../../types';
import { createSection, createBiosecurityQuestion, createAnimalHealthQuestion, createFeedManagementQuestion, createWaterManagementQuestion, createHousingQuestion, createDocumentationQuestion, createWelfareQuestion, createSanitationQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: BIOSECURITY (PF-01)
// ============================================================
const pf01_biosecurity = createSection({
  sectionCode: 'PF-01',
  name: 'Biosecurity',
  category: 'biosecurity',
  description: 'Biosecurity measures for pullet/rearing operations',
  order: 1,
  weight: 1.5,
  items: [
    createBiosecurityQuestion('PF-01-001', 'Apakah akses masuk farm pullet dikontrol dengan baik?', 3, true, 'Akses farm pullet harus dikontrol untuk mencegah masuknya penyakit', ['Pos keamanan tersedia', 'Prosedur akses tertulis', 'Visitor log lengkap', 'Tanda biosecurity terpasang'], ['Visitor log', 'Access control SOP', 'Site observation'], 'critical', 1, ['ref-woah-001']),
    createBiosecurityQuestion('PF-01-002', 'Apakah program sanitasi kendaraan dan peralatan berjalan efektif?', 3, true, 'Semua kendaraan dan peralatan harus disanitasi sebelum masuk', ['Area sanitasi tersedia', 'Prosedur sanitasi tertulis', 'Semua kendaraan disanitasi', 'Catatan sanitasi lengkap'], ['Sanitization log', 'Site observation', 'Photographic evidence'], 'critical', 2, ['ref-woah-001']),
    createBiosecurityQuestion('PF-01-003', 'Apakah program pengendalian hama berjalan efektif?', 2, false, 'Program pest control harus terdokumentasi dan berjalan efektif', ['Program pest control tertulis', 'Perangkat pest control tersedia', 'Monitoring dilakukan rutin', 'Hasil monitoring dicatat'], ['Pest control program', 'Pest control log', 'Site observation'], 'major', 3, ['ref-woah-001'])
  ]
});

// ============================================================
// SECTION 2: CHICK PLACEMENT (PF-02)
// ============================================================
const pf02_chickPlacement = createSection({
  sectionCode: 'PF-02',
  name: 'Chick Placement',
  category: 'animal_health',
  description: 'Chick placement and initial management',
  order: 2,
  weight: 1.3,
  items: [
    createAnimalHealthQuestion('PF-02-001', 'Apakah chick placement dilakukan sesuai prosedur?', 3, true, 'Chick harus ditempatkan dengan prosedur yang benar untuk memastikan kesejahteraan', ['Chick diterima dalam kondisi baik', 'Penempatan dilakukan dengan hati-hati', 'Densitas sesuai standar', 'Chick segera mendapat akses pakan dan air'], ['Placement records', 'Site observation', 'Photographic evidence'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('PF-02-002', 'Apakah dokumentasi asal-usul chick tersedia?', 2, false, 'Semua chick harus memiliki dokumentasi asal-usul yang lengkap', ['Dokumentasi asal-usul tersedia', 'Informasi hatchery lengkap', 'Asal-usul chick terverifikasi', 'Catatan disimpan dengan baik'], ['Pedigree documents', 'Hatchery records', 'Site observation'], 'major', 2, ['ref-id-003']),
    createAnimalHealthQuestion('PF-02-003', 'Apakah chick dalam kondisi sehat saat diterima?', 3, true, 'Chick harus dalam kondisi sehat untuk memastikan pertumbuhan yang baik', ['Chick aktif dan waspada', 'Tidak ada tanda-tanda penyakit', 'Chick tidak cacat', 'Catatan kondisi chick lengkap'], ['Chick quality records', 'Site observation', 'Photographic evidence'], 'critical', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 3: BROODING (PF-03)
// ============================================================
const pf03_brooding = createSection({
  sectionCode: 'PF-03',
  name: 'Brooding Management',
  category: 'animal_health',
  description: 'Brooding management for pullets',
  order: 3,
  weight: 1.4,
  items: [
    createAnimalHealthQuestion('PF-03-001', 'Apakah suhu brooding sesuai standar?', 3, true, 'Suhu brooding harus sesuai standar untuk memastikan kenyamanan chick', ['Suhu brooding sesuai standar', 'Suhu dimonitor rutin', 'Penyesuaian dilakukan jika perlu', 'Catatan suhu lengkap'], ['Brooding temperature records', 'Site observation', 'Photographic evidence'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('PF-03-002', 'Apakah persiapan brooding area dilakukan dengan benar?', 2, false, 'Brooding area harus dipersiapkan dengan benar sebelum chick datang', ['Brooding area bersih dan disanitasi', 'Peralatan brooding tersedia', 'Litter dalam kondisi baik', 'Catatan persiapan lengkap'], ['Brooding preparation records', 'Site observation', 'Photographic evidence'], 'major', 2, ['ref-id-003']),
    createAnimalHealthQuestion('PF-03-003', 'Apakah chick behavior dimonitor selama brooding?', 2, false, 'Chick behavior harus dimonitor untuk mengidentifikasi masalah dini', ['Chick behavior dimonitor', 'Tanda-tanda stres diidentifikasi', 'Tindakan korektif dilakukan jika perlu', 'Catatan monitoring lengkap'], ['Chick behavior records', 'Site observation', 'Staff interview'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 4: GROWING MANAGEMENT (PF-04)
// ============================================================
const pf04_growingManagement = createSection({
  sectionCode: 'PF-04',
  name: 'Growing Management',
  category: 'animal_health',
  description: 'Growing management for pullets',
  order: 4,
  weight: 1.3,
  items: [
    createAnimalHealthQuestion('PF-04-001', 'Apakah observasi kesehatan flock harian dilakukan?', 3, true, 'Observasi kesehatan harus dilakukan setiap hari untuk mendeteksi masalah dini', ['Observasi dilakukan harian', 'Parameter observasi jelas', 'Masalah diidentifikasi dini', 'Catatan observasi lengkap'], ['Daily observation records', 'Site observation', 'Staff interview'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('PF-04-002', 'Apakah mortalitas dicatat dan dimonitor harian?', 3, true, 'Mortalitas harus dicatat harian untuk mengidentifikasi masalah', ['Mortalitas dicatat harian', 'Penyebab mortalitas diidentifikasi', 'Tren mortalitas dimonitor', 'Catatan mortalitas lengkap'], ['Mortality records', 'Daily records', 'Management records'], 'critical', 2, ['ref-id-003']),
    createAnimalHealthQuestion('PF-04-003', 'Apakah densitas stocking sesuai standar?', 2, false, 'Densitas stocking harus sesuai untuk memastikan kesejahteraan ayam', ['Densitas sesuai standar', 'Densitas dimonitor', 'Penyesuaian dilakukan jika perlu', 'Catatan densitas lengkap'], ['Stocking density records', 'Site observation', 'Flock records'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 5: FEEDING (PF-05)
// ============================================================
const pf05_feeding = createSection({
  sectionCode: 'PF-05',
  name: 'Feeding Program',
  category: 'feed_management',
  description: 'Pullet feeding management',
  order: 5,
  weight: 1.4,
  items: [
    createFeedManagementQuestion('PF-05-001', 'Apakah program pakan pullet sesuai dengan fase pertumbuhan?', 3, true, 'Pakan harus disesuaikan dengan fase pertumbuhan pullet', ['Program pakan tertulis', 'Pakan sesuai fase pertumbuhan', 'Formulasi pakan sesuai standar', 'Penyesuaian dilakukan jika perlu'], ['Feed program', 'Feed formulation', 'Feed records'], 'critical', 1, ['ref-sni-001']),
    createFeedManagementQuestion('PF-05-002', 'Apakah ketersediaan pakan di feeder adequate?', 2, false, 'Pakan harus tersedia cukup di feeder untuk semua ayam', ['Pakan tersedia di feeder', 'Distribusi pakan merata', 'Waktu pemberian pakan tepat', 'Catatan ketersediaan pakan lengkap'], ['Feed availability records', 'Site observation', 'Feed records'], 'major', 2, ['ref-sni-001']),
    createFeedManagementQuestion('PF-05-003', 'Apakah feed conversion ratio (FCR) dimonitor?', 2, false, 'FCR harus dimonitor untuk memastikan efisiensi pakan', ['FCR dihitung rutin', 'FCR sesuai target', 'Deviasi diinvestigasi', 'Catatan FCR lengkap'], ['FCR records', 'Feed records', 'Management records'], 'major', 3, ['ref-sni-001'])
  ]
});

// ============================================================
// SECTION 6: WATER (PF-06)
// ============================================================
const pf06_water = createSection({
  sectionCode: 'PF-06',
  name: 'Water Management',
  category: 'water_management',
  description: 'Water quality and availability for pullets',
  order: 6,
  weight: 1.3,
  items: [
    createWaterManagementQuestion('PF-06-001', 'Apakah kualitas air dimonitor rutin?', 3, true, 'Kualitas air harus dimonitor untuk memastikan air layak konsumsi', ['Kualitas air diuji rutin', 'Parameter yang diuji sesuai standar', 'Hasil uji sesuai standar', 'Catatan quality control lengkap'], ['Water quality records', 'Laboratory results', 'Site observation'], 'critical', 1, ['ref-sni-001']),
    createWaterManagementQuestion('PF-06-002', 'Apakah ketersediaan air adequate untuk semua ayam?', 2, false, 'Air harus tersedia cukup untuk semua ayam', ['Air tersedia di drinker', 'Distribusi air merata', 'Drinker berfungsi baik', 'Catatan ketersediaan air lengkap'], ['Water availability records', 'Site observation', 'Water records'], 'major', 2, ['ref-sni-001']),
    createWaterManagementQuestion('PF-06-003', 'Apakah konsumsi air dimonitor harian?', 2, false, 'Konsumsi air harus dimonitor untuk mengidentifikasi masalah dini', ['Konsumsi air dicatat harian', 'Tren konsumsi dimonitor', 'Penyimpangan diinvestigasi', 'Catatan konsumsi lengkap'], ['Water consumption records', 'Daily records', 'Management records'], 'major', 3, ['ref-sni-001'])
  ]
});

// ============================================================
// SECTION 7: BODY WEIGHT (PF-07)
// ============================================================
const pf07_bodyWeight = createSection({
  sectionCode: 'PF-07',
  name: 'Body Weight Monitoring',
  category: 'animal_health',
  description: 'Regular body weight monitoring for pullets',
  order: 7,
  weight: 1.4,
  items: [
    createAnimalHealthQuestion('PF-07-001', 'Apakah penimbangan berat badan dilakukan rutin?', 3, true, 'Berat badan harus dimonitor rutin untuk memastikan pertumbuhan yang sesuai', ['Penimbangan dilakukan sesuai jadwal', 'Sample size adequate', 'Timbangan dikalibrasi', 'Catatan penimbangan lengkap'], ['Weighing records', 'Calibration records', 'Site observation'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('PF-07-002', 'Apakah berat badan sesuai dengan target standar?', 3, true, 'Berat badan harus sesuai dengan target standar breed', ['Berat badan sesuai target', 'Deviasi dimonitor', 'Tindakan korektif dilakukan jika perlu', 'Catatan perbandingan dengan standar lengkap'], ['Body weight records', 'Standard comparison', 'Management records'], 'critical', 2, ['ref-id-003']),
    createAnimalHealthQuestion('PF-07-003', 'Apakah uniformitas flock sesuai standar?', 3, true, 'Uniformitas flock harus dijaga untuk memastikan pertumbuhan yang konsisten', ['Uniformitas diukur rutin', 'Uniformitas sesuai target', 'Tindakan korektif dilakukan jika perlu', 'Catatan uniformitas lengkap'], ['Uniformity records', 'Flock records', 'Management records'], 'critical', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 8: VACCINATION (PF-08)
// ============================================================
const pf08_vaccination = createSection({
  sectionCode: 'PF-08',
  name: 'Vaccination Program',
  category: 'animal_health',
  description: 'Vaccination program for pullets',
  order: 8,
  weight: 1.4,
  items: [
    createAnimalHealthQuestion('PF-08-001', 'Apakah program vaksinasi dilaksanakan sesuai jadwal?', 3, true, 'Program vaksinasi harus dilaksanakan sesuai jadwal untuk mencegah penyakit', ['Program vaksinasi tertulis', 'Vaksinasi dilaksanakan sesuai jadwal', 'Vaksin disimpan dengan benar', 'Catatan vaksinasi lengkap'], ['Vaccination program', 'Vaccination records', 'Vaccine storage records'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('PF-08-002', 'Apakah prosedur vaksinasi dilakukan dengan benar?', 2, false, 'Prosedur vaksinasi harus dilakukan dengan benar untuk memastikan efektivitas', ['Prosedur vaksinasi tertulis', 'Vaksinasi dilakukan oleh personel terlatih', 'Dosis dan metode sesuai standar', 'Catatan prosedur lengkap'], ['Vaccination procedures', 'Staff training records', 'Vaccination records'], 'major', 2, ['ref-id-003']),
    createAnimalHealthQuestion('PF-08-003', 'Apakah cold chain vaksin dijaga dengan baik?', 3, true, 'Cold chain vaksin harus dijaga untuk memastikan efektivitas vaksin', ['Suhu penyimpanan vaksin sesuai standar', 'Suhu dimonitor rutin', 'Vaksin tidak kedaluwarsa', 'Catatan cold chain lengkap'], ['Cold chain records', 'Temperature logs', 'Vaccine inventory records'], 'critical', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 9: WELFARE (PF-09)
// ============================================================
const pf09_welfare = createSection({
  sectionCode: 'PF-09',
  name: 'Animal Welfare',
  category: 'welfare',
  description: 'Animal welfare for pullets',
  order: 9,
  weight: 1.3,
  items: [
    createWelfareQuestion('PF-09-001', 'Apakah ayam menunjukkan perilaku normal dan sehat?', 3, true, 'Ayam harus menunjukkan perilaku normal dan sehat', ['Ayam aktif dan waspada', 'Tidak ada tanda-tanda stres', 'Perilaku makan dan minum normal', 'Perilaku sosial normal'], ['Site observation', 'Staff interview', 'Photographic evidence'], 'critical', 1, ['ref-woah-004']),
    createWelfareQuestion('PF-09-002', 'Apakah handling ayam dilakukan dengan benar?', 2, false, 'Handling ayam harus dilakukan dengan benar untuk mencegah stres dan cedera', ['Prosedur handling tertulis', 'Handling dilakukan dengan hati-hati', 'Personel terlatih', 'Catatan handling lengkap'], ['Handling procedures', 'Staff training records', 'Site observation'], 'major', 2, ['ref-woah-004']),
    createWelfareQuestion('PF-09-003', 'Apakah lingkungan kandang sesuai untuk kesejahteraan ayam?', 2, false, 'Lingkungan kandang harus sesuai untuk memastikan kesejahteraan ayam', ['Ventilasi baik', 'Pencahayaan adequate', 'Densitas sesuai standar', 'Litter dalam kondisi baik'], ['Site observation', 'Environmental records', 'Photographic evidence'], 'major', 3, ['ref-woah-004'])
  ]
});

// ============================================================
// SECTION 10: TRANSFER PREPARATION (PF-10)
// ============================================================
const pf10_transferPreparation = createSection({
  sectionCode: 'PF-10',
  name: 'Transfer Preparation',
  category: 'animal_health',
  description: 'Preparation for transfer to layer farm',
  order: 10,
  weight: 1.3,
  items: [
    createAnimalHealthQuestion('PF-10-001', 'Apakah pullet siap untuk ditransfer ke layer farm?', 3, true, 'Pullet harus siap untuk ditransfer berdasarkan berat badan dan uniformitas', ['Berat badan sesuai target', 'Uniformitas sesuai standar', 'Kesehatan baik', 'Catatan kesiapan lengkap'], ['Transfer readiness records', 'Body weight records', 'Uniformity records'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('PF-10-002', 'Apakah prosedur transfer pullet tersedia?', 2, false, 'Prosedur transfer harus tersedia untuk memastikan transfer berjalan lancar', ['Prosedur transfer tertulis', 'Transportasi sesuai standar', 'Personel terlatih', 'Catatan prosedur lengkap'], ['Transfer procedures', 'Transportation records', 'Staff training records'], 'major', 2, ['ref-id-003']),
    createAnimalHealthQuestion('PF-10-003', 'Apakah dokumentasi pullet lengkap untuk transfer?', 2, false, 'Dokumentasi pullet harus lengkap untuk transfer ke layer farm', ['Dokumentasi vaksinasi lengkap', 'Dokumentasi kesehatan lengkap', 'Dokumentasi berat badan lengkap', 'Catatan transfer lengkap'], ['Transfer documentation', 'Vaccination records', 'Health records'], 'major', 3, ['ref-id-003'])
  ]
});

// Create the complete template
export const PULLET_FARM_TEMPLATE: AuditTemplate = {
  id: 'template-pf-prod-v1',
  code: 'PF-PROD-V1.0',
  name: 'Pullet / Rearing Farm Audit',
  description: 'Comprehensive audit template for pullet/rearing farm facilities covering biosecurity, chick placement, brooding, growing management, feeding, body weight monitoring, vaccination, welfare, and transfer preparation',
  facilityTypes: ['pullet_farm'],
  departmentId: 'dept1', // Production Department
  auditCategory: 'production',
  references: [
    {
      id: 'ref-pf-001',
      code: 'WOAH Terrestrial Code Ch. 7.5',
      title: 'Welfare of Broiler Chickens',
      organization: 'WOAH',
      year: '2023',
      status: 'valid',
      sourceType: 'standard',
      verificationStatus: 'verified',
      country: 'International',
      language: 'en'
    },
    {
      id: 'ref-pf-002',
      code: 'SNI 8173-1:2023',
      title: 'Pedoman Budidaya Ayam Ras Pedaging',
      organization: 'BSN',
      year: '2023',
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
    pf01_biosecurity,
    pf02_chickPlacement,
    pf03_brooding,
    pf04_growingManagement,
    pf05_feeding,
    pf06_water,
    pf07_bodyWeight,
    pf08_vaccination,
    pf09_welfare,
    pf10_transferPreparation
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 30,
  estimatedDuration: 360, // 6 hours
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['pullet', 'rearing', 'production', 'brooding', 'growing'],
  isPublic: true
};
