// Layer Farm Production Audit Template - LF-PROD-V1.0
// Comprehensive audit template for layer farm facilities

import { AuditTemplate } from '../../types';
import { createSection, createBiosecurityQuestion, createAnimalHealthQuestion, createFeedManagementQuestion, createWaterManagementQuestion, createHousingQuestion, createDocumentationQuestion, createWelfareQuestion, createSanitationQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: BIOSECURITY (LF-01)
// ============================================================
const lf01_biosecurity = createSection({
  sectionCode: 'LF-01',
  name: 'Biosecurity',
  category: 'biosecurity',
  description: 'Biosecurity measures for layer operations',
  order: 1,
  weight: 1.5,
  items: [
    createBiosecurityQuestion('LF-01-001', 'Apakah akses masuk farm layer dikontrol dengan baik?', 3, true, 'Akses farm layer harus dikontrol untuk mencegah masuknya penyakit', ['Pos keamanan tersedia', 'Prosedur akses tertulis', 'Visitor log lengkap', 'Tanda biosecurity terpasang'], ['Visitor log', 'Access control SOP', 'Site observation'], 'critical', 1, ['ref-woah-001']),
    createBiosecurityQuestion('LF-01-002', 'Apakah program sanitasi kendaraan dan peralatan berjalan efektif?', 3, true, 'Semua kendaraan dan peralatan harus disanitasi sebelum masuk', ['Area sanitasi tersedia', 'Prosedur sanitasi tertulis', 'Semua kendaraan disanitasi', 'Catatan sanitasi lengkap'], ['Sanitization log', 'Site observation', 'Photographic evidence'], 'critical', 2, ['ref-woah-001']),
    createBiosecurityQuestion('LF-01-003', 'Apakah program pengendalian hama berjalan efektif?', 2, false, 'Program pest control harus terdokumentasi dan berjalan efektif', ['Program pest control tertulis', 'Perangkat pest control tersedia', 'Monitoring dilakukan rutin', 'Hasil monitoring dicatat'], ['Pest control program', 'Pest control log', 'Site observation'], 'major', 3, ['ref-woah-001'])
  ]
});

// ============================================================
// SECTION 2: FLOCK MANAGEMENT (LF-02)
// ============================================================
const lf02_flockManagement = createSection({
  sectionCode: 'LF-02',
  name: 'Flock Management',
  category: 'animal_health',
  description: 'General flock management for layers',
  order: 2,
  weight: 1.3,
  items: [
    createAnimalHealthQuestion('LF-02-001', 'Apakah observasi kesehatan flock harian dilakukan?', 3, true, 'Observasi kesehatan harus dilakukan setiap hari untuk mendeteksi masalah dini', ['Observasi dilakukan harian', 'Parameter observasi jelas', 'Masalah diidentifikasi dini', 'Catatan observasi lengkap'], ['Daily observation records', 'Site observation', 'Staff interview'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('LF-02-002', 'Apakah mortalitas dicatat dan dimonitor harian?', 3, true, 'Mortalitas harus dicatat harian untuk mengidentifikasi masalah', ['Mortalitas dicatat harian', 'Penyebab mortalitas diidentifikasi', 'Tren mortalitas dimonitor', 'Catatan mortalitas lengkap'], ['Mortality records', 'Daily records', 'Management records'], 'critical', 2, ['ref-id-003']),
    createAnimalHealthQuestion('LF-02-003', 'Apakah densitas stocking sesuai standar?', 2, false, 'Densitas stocking harus sesuai untuk memastikan kesejahteraan ayam', ['Densitas sesuai standar', 'Densitas dimonitor', 'Penyesuaian dilakukan jika perlu', 'Catatan densitas lengkap'], ['Stocking density records', 'Site observation', 'Flock records'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 3: FEEDING (LF-03)
// ============================================================
const lf03_feeding = createSection({
  sectionCode: 'LF-03',
  name: 'Feeding',
  category: 'feed_management',
  description: 'Layer feeding management',
  order: 3,
  weight: 1.4,
  items: [
    createFeedManagementQuestion('LF-03-001', 'Apakah program pakan layer sesuai dengan fase produksi?', 3, true, 'Pakan harus disesuaikan dengan fase produksi layer', ['Program pakan tertulis', 'Pakan sesuai fase produksi', 'Formulasi pakan sesuai standar', 'Penyesuaian dilakukan jika perlu'], ['Feed program', 'Feed formulation', 'Feed records'], 'critical', 1, ['ref-sni-001']),
    createFeedManagementQuestion('LF-03-002', 'Apakah ketersediaan pakan di feeder adequate?', 2, false, 'Pakan harus tersedia cukup di feeder untuk semua ayam', ['Pakan tersedia di feeder', 'Distribusi pakan merata', 'Waktu pemberian pakan tepat', 'Catatan ketersediaan pakan lengkap'], ['Feed availability records', 'Site observation', 'Feed records'], 'major', 2, ['ref-sni-001']),
    createFeedManagementQuestion('LF-03-003', 'Apakah feed wastage diminimalkan?', 2, false, 'Feed wastage harus diminimalkan untuk efisiensi', ['Feed wastage dimonitor', 'Feed wastage sesuai standar', 'Tindakan korektif dilakukan jika perlu', 'Catatan feed wastage lengkap'], ['Feed wastage records', 'Feed records', 'Site observation'], 'major', 3, ['ref-sni-001'])
  ]
});

// ============================================================
// SECTION 4: WATER (LF-04)
// ============================================================
const lf04_water = createSection({
  sectionCode: 'LF-04',
  name: 'Water Management',
  category: 'water_management',
  description: 'Water quality and availability for layers',
  order: 4,
  weight: 1.3,
  items: [
    createWaterManagementQuestion('LF-04-001', 'Apakah kualitas air dimonitor rutin?', 3, true, 'Kualitas air harus dimonitor untuk memastikan air layak konsumsi', ['Kualitas air diuji rutin', 'Parameter yang diuji sesuai standar', 'Hasil uji sesuai standar', 'Catatan quality control lengkap'], ['Water quality records', 'Laboratory results', 'Site observation'], 'critical', 1, ['ref-sni-001']),
    createWaterManagementQuestion('LF-04-002', 'Apakah ketersediaan air adequate untuk semua ayam?', 2, false, 'Air harus tersedia cukup untuk semua ayam', ['Air tersedia di drinker', 'Distribusi air merata', 'Drinker berfungsi baik', 'Catatan ketersediaan air lengkap'], ['Water availability records', 'Site observation', 'Water records'], 'major', 2, ['ref-sni-001']),
    createWaterManagementQuestion('LF-04-003', 'Apakah konsumsi air dimonitor harian?', 2, false, 'Konsumsi air harus dimonitor untuk mengidentifikasi masalah dini', ['Konsumsi air dicatat harian', 'Tren konsumsi dimonitor', 'Penyimpangan diinvestigasi', 'Catatan konsumsi lengkap'], ['Water consumption records', 'Daily records', 'Management records'], 'major', 3, ['ref-sni-001'])
  ]
});

// ============================================================
// SECTION 5: LIGHTING (LF-05)
// ============================================================
const lf05_lighting = createSection({
  sectionCode: 'LF-05',
  name: 'Lighting Program',
  category: 'housing',
  description: 'Lighting management for layer production',
  order: 5,
  weight: 1.3,
  items: [
    createHousingQuestion('LF-05-001', 'Apakah program pencahayaan sesuai dengan fase produksi?', 3, true, 'Program pencahayaan harus disesuaikan dengan fase produksi layer', ['Program pencahayaan tertulis', 'Durasi pencahayaan sesuai fase', 'Intensitas cahaya sesuai standar', 'Penyesuaian dilakukan jika perlu'], ['Lighting program', 'Lighting records', 'Site observation'], 'critical', 1, ['ref-id-003']),
    createHousingQuestion('LF-05-002', 'Apakah intensitas cahaya adequate dan merata?', 2, false, 'Intensitas cahaya harus adequate dan merata di seluruh kandang', ['Intensitas cahaya diukur', 'Intensitas sesuai standar', 'Distribusi cahaya merata', 'Catatan pengukuran lengkap'], ['Light intensity records', 'Site observation', 'Photographic evidence'], 'major', 2, ['ref-id-003']),
    createHousingQuestion('LF-05-003', 'Apakah sistem pencahayaan dimaintain dengan baik?', 2, false, 'Sistem pencahayaan harus dimaintain untuk memastikan kinerja optimal', ['Sistem pencahayaan berfungsi baik', 'Maintenance dilakukan rutin', 'Lampu yang rusak segera diganti', 'Catatan maintenance lengkap'], ['Maintenance records', 'Site observation', 'Photographic evidence'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 6: EGG PRODUCTION (LF-06)
// ============================================================
const lf06_eggProduction = createSection({
  sectionCode: 'LF-06',
  name: 'Egg Production',
  category: 'animal_health',
  description: 'Monitoring and management of egg production',
  order: 6,
  weight: 1.5,
  items: [
    createAnimalHealthQuestion('LF-06-001', 'Apakah produksi telur dimonitor harian?', 3, true, 'Produksi telur harus dimonitor harian untuk mengidentifikasi masalah dini', ['Produksi telur dicatat harian', 'Persentase produksi dihitung', 'Trend diidentifikasi', 'Catatan produksi lengkap'], ['Egg production records', 'Daily records', 'Management records'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('LF-06-002', 'Apakah produksi telur sesuai dengan target standar?', 3, true, 'Produksi telur harus sesuai dengan target standar breed', ['Produksi sesuai target', 'Deviasi dimonitor', 'Tindakan korektif dilakukan jika perlu', 'Catatan perbandingan dengan standar lengkap'], ['Production records', 'Standard comparison', 'Management records'], 'critical', 2, ['ref-id-003']),
    createAnimalHealthQuestion('LF-06-003', 'Apakah penurunan produksi diinvestigasi dengan benar?', 2, false, 'Penurunan produksi harus diinvestigasi untuk mengidentifikasi penyebab', ['Penurunan diidentifikasi', 'Investigasi dilakukan', 'Penyebab diidentifikasi', 'Tindakan korektif dilakukan'], ['Investigation records', 'Production records', 'Corrective action records'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 7: EGG QUALITY (LF-07)
// ============================================================
const lf07_eggQuality = createSection({
  sectionCode: 'LF-07',
  name: 'Egg Quality',
  category: 'animal_health',
  description: 'Egg quality monitoring and management',
  order: 7,
  weight: 1.4,
  items: [
    createAnimalHealthQuestion('LF-07-001', 'Apakah kualitas telur internal dimonitor rutin?', 3, true, 'Kualitas telur internal (Haugh unit, yolk color, dll) harus dimonitor', ['Monitoring kualitas internal dilakukan', 'Parameter yang diukur sesuai standar', 'Alat ukur dikalibrasi', 'Catatan kualitas lengkap'], ['Egg quality records', 'Calibration records', 'Laboratory results'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('LF-07-002', 'Apakah kualitas telur eksternal dimonitor rutin?', 2, false, 'Kualitas telur eksternal (shell quality, cleanliness, dll) harus dimonitor', ['Monitoring kualitas eksternal dilakukan', 'Parameter yang diukur sesuai standar', 'Telur retak/cacat dipisahkan', 'Catatan kualitas lengkap'], ['Egg quality records', 'Site observation', 'Photographic evidence'], 'major', 2, ['ref-id-003']),
    createAnimalHealthQuestion('LF-07-003', 'Apakah telur yang tidak memenuhi standar ditangani dengan benar?', 2, false, 'Telur yang tidak memenuhi standar harus ditangani dengan prosedur yang benar', ['Telur tidak memenuhi standar diidentifikasi', 'Telur tidak memenuhi standar dipisahkan', 'Prosedur penanganan tertulis', 'Catatan penanganan lengkap'], ['Rejection records', 'Handling procedures', 'Site observation'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 8: EGG COLLECTION (LF-08)
// ============================================================
const lf08_eggCollection = createSection({
  sectionCode: 'LF-08',
  name: 'Egg Collection',
  category: 'animal_health',
  description: 'Egg collection procedures and management',
  order: 8,
  weight: 1.3,
  items: [
    createAnimalHealthQuestion('LF-08-001', 'Apakah pengumpulan telur dilakukan dengan prosedur yang benar?', 3, true, 'Telur harus dikumpulkan dengan prosedur yang benar untuk mencegah kerusakan', ['Pengumpulan dilakukan rutin', 'Telur ditangani dengan hati-hati', 'Telur rusak dipisahkan', 'Catatan pengumpulan lengkap'], ['Collection records', 'Site observation', 'Staff interview'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('LF-08-002', 'Apakah telur lantai (floor eggs) diminimalkan?', 2, false, 'Floor eggs harus diminimalkan untuk mencegah kontaminasi', ['Nesting box adequate', 'Floor eggs diminimalkan', 'Floor eggs dipisahkan', 'Catatan floor eggs lengkap'], ['Floor egg records', 'Site observation', 'Photographic evidence'], 'major', 2, ['ref-id-003']),
    createAnimalHealthQuestion('LF-08-003', 'Apakah telur kotor (dirty eggs) dipisahkan?', 2, false, 'Telur kotor harus dipisahkan dari telur bersih', ['Telur kotor diidentifikasi', 'Telur kotor dipisahkan', 'Prosedur penanganan telur kotor tertulis', 'Catatan telur kotor lengkap'], ['Dirty egg records', 'Site observation', 'Photographic evidence'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 9: ANIMAL HEALTH (LF-09)
// ============================================================
const lf09_animalHealth = createSection({
  sectionCode: 'LF-09',
  name: 'Animal Health',
  category: 'animal_health',
  description: 'Animal health monitoring and management',
  order: 9,
  weight: 1.4,
  items: [
    createAnimalHealthQuestion('LF-09-001', 'Apakah program vaksinasi dilaksanakan sesuai jadwal?', 3, true, 'Program vaksinasi harus dilaksanakan sesuai jadwal untuk mencegah penyakit', ['Program vaksinasi tertulis', 'Vaksinasi dilaksanakan sesuai jadwal', 'Vaksin disimpan dengan benar', 'Catatan vaksinasi lengkap'], ['Vaccination program', 'Vaccination records', 'Vaccine storage records'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('LF-09-002', 'Apakah penggunaan obat-obatan sesuai dengan resep dokter hewan?', 3, true, 'Penggunaan obat-obatan harus sesuai dengan resep dokter hewan', ['Penggunaan obat sesuai resep', 'Withdrawal period dipatuhi', 'Catatan penggunaan obat lengkap', 'Resep dokter hewan tersedia'], ['Medication records', 'Veterinary prescriptions', 'Withdrawal records'], 'critical', 2, ['ref-id-003']),
    createAnimalHealthQuestion('LF-09-003', 'Apakah penyakit diidentifikasi dan ditangani dengan benar?', 2, false, 'Penyakit harus diidentifikasi dan ditangani dengan benar', ['Penyakit diidentifikasi', 'Penanganan sesuai prosedur', 'Dokter hewan dilibatkan', 'Catatan penanganan lengkap'], ['Disease records', 'Treatment records', 'Veterinary records'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 10: WELFARE (LF-10)
// ============================================================
const lf10_welfare = createSection({
  sectionCode: 'LF-10',
  name: 'Animal Welfare',
  category: 'welfare',
  description: 'Animal welfare for layer hens',
  order: 10,
  weight: 1.3,
  items: [
    createWelfareQuestion('LF-10-001', 'Apakah ayam menunjukkan perilaku normal dan sehat?', 3, true, 'Ayam harus menunjukkan perilaku normal dan sehat', ['Ayam aktif dan waspada', 'Tidak ada tanda-tanda stres', 'Perilaku makan dan minum normal', 'Perilaku sosial normal'], ['Site observation', 'Staff interview', 'Photographic evidence'], 'critical', 1, ['ref-woah-005']),
    createWelfareQuestion('LF-10-002', 'Apakah nesting box adequate dan bersih?', 2, false, 'Nesting box harus adequate dan bersih untuk kesejahteraan ayam', ['Jumlah nesting box adequate', 'Nesting box bersih', 'Nesting box dalam kondisi baik', 'Distribusi nesting box merata'], ['Site observation', 'Photographic evidence', 'Nesting box records'], 'major', 2, ['ref-woah-005']),
    createWelfareQuestion('LF-10-003', 'Apakah perching area adequate?', 2, false, 'Perching area harus adequate untuk kesejahteraan ayam', ['Jumlah perching area adequate', 'Perching area dalam kondisi baik', 'Distribusi perching area merata', 'Ayam menggunakan perching area'], ['Site observation', 'Photographic evidence', 'Welfare records'], 'major', 3, ['ref-woah-005'])
  ]
});

// Create the complete template
export const LAYER_FARM_TEMPLATE: AuditTemplate = {
  id: 'template-lf-prod-v1',
  code: 'LF-PROD-V1.0',
  name: 'Layer Farm Production Audit',
  description: 'Comprehensive audit template for layer farm facilities covering biosecurity, flock management, feeding, egg production, egg quality, and animal welfare',
  facilityTypes: ['layer_farm'],
  departmentId: 'dept1', // Production Department
  auditCategory: 'production',
  references: [
    {
      id: 'ref-lf-001',
      code: 'WOAH Terrestrial Code Ch. 7.6',
      title: 'Welfare of Laying Hens',
      organization: 'WOAH',
      year: '2023',
      status: 'valid',
      sourceType: 'standard',
      verificationStatus: 'verified',
      country: 'International',
      language: 'en'
    },
    {
      id: 'ref-lf-002',
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
    lf01_biosecurity,
    lf02_flockManagement,
    lf03_feeding,
    lf04_water,
    lf05_lighting,
    lf06_eggProduction,
    lf07_eggQuality,
    lf08_eggCollection,
    lf09_animalHealth,
    lf10_welfare
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
  tags: ['layer', 'production', 'egg-production', 'animal-welfare'],
  isPublic: true
};
