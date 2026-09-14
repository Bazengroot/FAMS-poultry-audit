// Parent Stock / Breeder Farm Production Audit Template - PS-PROD-V1.0
// Comprehensive audit template for parent stock/breeder farm facilities

import { AuditTemplate } from '../../types';
import { createSection, createBiosecurityQuestion, createAnimalHealthQuestion, createFeedManagementQuestion, createWaterManagementQuestion, createHousingQuestion, createDocumentationQuestion, createWelfareQuestion, createSanitationQuestion, createPersonnelQuestion, createFarmManagementQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: BIOSECURITY (PS-01)
// ============================================================
const ps01_biosecurity = createSection({
  sectionCode: 'PS-01',
  name: 'Biosecurity',
  category: 'biosecurity',
  description: 'Biosecurity measures specific to breeder operations',
  order: 1,
  weight: 1.5,
  items: [
    createBiosecurityQuestion('PS-01-001', 'Apakah akses masuk farm breeder dikontrol dengan ketat?', 3, true, 'Farm breeder harus memiliki kontrol akses yang lebih ketat daripada farm broiler', ['Pos keamanan 24 jam', 'Akses terbatas untuk personel terlatih', 'Prosedur akses tertulis dan dipahami', 'Visitor log lengkap'], ['Visitor log', 'Access control SOP', 'Site observation'], 'critical', 1, ['ref-woah-001']),
    createBiosecurityQuestion('PS-01-002', 'Apakah ada pemisahan yang jelas antara area breeder dan area lain?', 3, true, 'Farm breeder harus terpisah dari farm broiler dan fasilitas lain', ['Jarak minimal sesuai standar', 'Tidak ada kontak dengan unggas non-breeder', 'Peralatan terpisah', 'Personel tidak berpindah tanpa dekontaminasi'], ['Farm layout', 'Site observation', 'Photographic evidence'], 'critical', 2, ['ref-woah-001']),
    createBiosecurityQuestion('PS-01-003', 'Apakah program sanitasi kendaraan dan peralatan berjalan efektif?', 3, true, 'Semua kendaraan dan peralatan harus disanitasi sebelum masuk', ['Area sanitasi tersedia', 'Prosedur sanitasi tertulis', 'Semua kendaraan disanitasi', 'Catatan sanitasi lengkap'], ['Sanitization log', 'Site observation', 'Photographic evidence'], 'critical', 3, ['ref-woah-001'])
  ]
});

// ============================================================
// SECTION 2: FLOCK PLACEMENT (PS-02)
// ============================================================
const ps02_flockPlacement = createSection({
  sectionCode: 'PS-02',
  name: 'Flock Placement',
  category: 'animal_health',
  description: 'Chick placement and initial management',
  order: 2,
  weight: 1.2,
  items: [
    createAnimalHealthQuestion('PS-02-001', 'Apakah chick placement dilakukan sesuai prosedur?', 3, true, 'Chick harus ditempatkan dengan prosedur yang benar untuk memastikan kesejahteraan', ['Chick diterima dalam kondisi baik', 'Penempatan dilakukan dengan hati-hati', 'Densitas sesuai standar', 'Chick segera mendapat akses pakan dan air'], ['Placement records', 'Site observation', 'Photographic evidence'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('PS-02-002', 'Apakah sexing dan seleksi chick dilakukan dengan benar?', 2, false, 'Chick harus diseleksi berdasarkan jenis kelamin dan kualitas', ['Sexing dilakukan oleh personel terlatih', 'Chick berkualitas baik dipilih', 'Chick abnormal dipisahkan', 'Catatan seleksi lengkap'], ['Selection records', 'Staff interview', 'Site observation'], 'major', 2, ['ref-id-003']),
    createAnimalHealthQuestion('PS-02-003', 'Apakah dokumentasi asal-usul chick (pedigree) tersedia?', 3, true, 'Semua chick breeder harus memiliki dokumentasi pedigree yang lengkap', ['Dokumentasi pedigree tersedia', 'Informasi genetic lengkap', 'Asal-usul chick terverifikasi', 'Catatan disimpan dengan baik'], ['Pedigree documents', 'Breeding records', 'Site observation'], 'critical', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 3: MALE MANAGEMENT (PS-03)
// ============================================================
const ps03_maleManagement = createSection({
  sectionCode: 'PS-03',
  name: 'Male Management',
  category: 'animal_health',
  description: 'Specific management of male breeder birds',
  order: 3,
  weight: 1.3,
  items: [
    createAnimalHealthQuestion('PS-03-001', 'Apakah rasio jantan terhadap betina sesuai standar?', 3, true, 'Rasio jantan-betina harus sesuai untuk memastikan fertilitas optimal', ['Rasio sesuai standar perusahaan', 'Rasio dimonitor rutin', 'Penyesuaian dilakukan jika perlu', 'Catatan rasio lengkap'], ['Flock records', 'Management records', 'Staff interview'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('PS-03-002', 'Apakah kondisi fisik jantan dimonitor rutin?', 2, false, 'Jantan harus dalam kondisi fisik yang baik untuk memastikan fertilitas', ['Jantan dalam kondisi baik', 'Berat badan sesuai standar', 'Tidak ada cedera atau penyakit', 'Mobilitas baik'], ['Physical examination records', 'Site observation', 'Photographic evidence'], 'major', 2, ['ref-id-003']),
    createAnimalHealthQuestion('PS-03-003', 'Apakah jantan yang tidak produktif dipisahkan?', 2, false, 'Jantan yang tidak produktif harus dipisahkan untuk mengoptimalkan fertilitas', ['Jantan tidak produktif diidentifikasi', 'Jantan tidak produktif dipisahkan', 'Catatan pemisahan lengkap', 'Evaluasi dilakukan rutin'], ['Separation records', 'Fertility records', 'Site observation'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 4: FEMALE MANAGEMENT (PS-04)
// ============================================================
const ps04_femaleManagement = createSection({
  sectionCode: 'PS-04',
  name: 'Female Management',
  category: 'animal_health',
  description: 'Specific management of female breeder birds',
  order: 4,
  weight: 1.3,
  items: [
    createAnimalHealthQuestion('PS-04-001', 'Apakah kondisi fisik betina dimonitor rutin?', 3, true, 'Betina harus dalam kondisi fisik yang baik untuk produksi telur optimal', ['Betina dalam kondisi baik', 'Berat badan sesuai standar', 'Tidak ada cedera atau penyakit', 'Mobilitas baik'], ['Physical examination records', 'Site observation', 'Photographic evidence'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('PS-04-002', 'Apakah uniformitas flock betina sesuai standar?', 3, true, 'Uniformitas flock harus dijaga untuk memastikan produksi telur yang konsisten', ['Uniformitas diukur rutin', 'Uniformitas sesuai target', 'Tindakan korektif dilakukan jika perlu', 'Catatan uniformitas lengkap'], ['Uniformity records', 'Flock records', 'Management records'], 'critical', 2, ['ref-id-003']),
    createAnimalHealthQuestion('PS-04-003', 'Apakah betina yang tidak produktif diidentifikasi dan dipisahkan?', 2, false, 'Betina yang tidak produktif harus dipisahkan untuk mengoptimalkan produksi', ['Betina tidak produktif diidentifikasi', 'Betina tidak produktif dipisahkan', 'Catatan pemisahan lengkap', 'Evaluasi dilakukan rutin'], ['Separation records', 'Production records', 'Site observation'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 5: FEEDING PROGRAM (PS-05)
// ============================================================
const ps05_feedingProgram = createSection({
  sectionCode: 'PS-05',
  name: 'Feeding Program',
  category: 'feed_management',
  description: 'Breeder-specific feeding program',
  order: 5,
  weight: 1.4,
  items: [
    createFeedManagementQuestion('PS-05-001', 'Apakah program pakan breeder sesuai dengan fase produksi?', 3, true, 'Pakan harus disesuaikan dengan fase produksi (rearing, production, late production)', ['Program pakan tertulis', 'Pakan sesuai fase produksi', 'Formulasi pakan sesuai standar', 'Penyesuaian dilakukan jika perlu'], ['Feed program', 'Feed formulation', 'Feed records'], 'critical', 1, ['ref-sni-001']),
    createFeedManagementQuestion('PS-05-002', 'Apakah pembatasan pakan (feed restriction) dilakukan dengan benar?', 3, true, 'Feed restriction harus dilakukan dengan tepat untuk mengontrol berat badan', ['Feed restriction sesuai program', 'Distribusi pakan merata', 'Waktu pemberian pakan tepat', 'Catatan feed restriction lengkap'], ['Feed restriction records', 'Feed distribution records', 'Site observation'], 'critical', 2, ['ref-sni-001']),
    createFeedManagementQuestion('PS-05-003', 'Apakah kualitas pakan dimonitor rutin?', 2, false, 'Kualitas pakan harus dijaga untuk memastikan nutrisi yang adequate', ['Kualitas pakan diperiksa rutin', 'Tidak ada kontaminasi', 'Kadar air sesuai standar', 'Catatan quality control lengkap'], ['Feed quality records', 'Laboratory results', 'Site observation'], 'major', 3, ['ref-sni-001'])
  ]
});

// ============================================================
// SECTION 6: BODY WEIGHT MONITORING (PS-06)
// ============================================================
const ps06_bodyWeightMonitoring = createSection({
  sectionCode: 'PS-06',
  name: 'Body Weight Monitoring',
  category: 'animal_health',
  description: 'Regular body weight monitoring for breeders',
  order: 6,
  weight: 1.3,
  items: [
    createAnimalHealthQuestion('PS-06-001', 'Apakah penimbangan berat badan dilakukan rutin?', 3, true, 'Berat badan harus dimonitor rutin untuk memastikan pertumbuhan yang sesuai', ['Penimbangan dilakukan sesuai jadwal', 'Sample size adequate', 'Timbangan dikalibrasi', 'Catatan penimbangan lengkap'], ['Weighing records', 'Calibration records', 'Site observation'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('PS-06-002', 'Apakah berat badan sesuai dengan target standar?', 3, true, 'Berat badan harus sesuai dengan target standar breed', ['Berat badan sesuai target', 'Deviasi dimonitor', 'Tindakan korektif dilakukan jika perlu', 'Catatan perbandingan dengan standar lengkap'], ['Body weight records', 'Standard comparison', 'Management records'], 'critical', 2, ['ref-id-003']),
    createAnimalHealthQuestion('PS-06-003', 'Apakah grafik pertumbuhan berat badan dimonitor?', 2, false, 'Grafik pertumbuhan harus dimonitor untuk mengidentifikasi masalah dini', ['Grafik pertumbuhan dibuat', 'Grafik dimonitor rutin', 'Trend diidentifikasi', 'Tindakan korektif dilakukan jika perlu'], ['Growth curves', 'Management records', 'Site observation'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 7: EGG PRODUCTION (PS-07)
// ============================================================
const ps07_eggProduction = createSection({
  sectionCode: 'PS-07',
  name: 'Egg Production',
  category: 'animal_health',
  description: 'Monitoring and management of egg production',
  order: 7,
  weight: 1.5,
  items: [
    createAnimalHealthQuestion('PS-07-001', 'Apakah produksi telur dimonitor harian?', 3, true, 'Produksi telur harus dimonitor harian untuk mengidentifikasi masalah dini', ['Produksi telur dicatat harian', 'Persentase produksi dihitung', 'Trend diidentifikasi', 'Catatan produksi lengkap'], ['Egg production records', 'Daily records', 'Management records'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('PS-07-002', 'Apakah produksi telur sesuai dengan target standar?', 3, true, 'Produksi telur harus sesuai dengan target standar breed', ['Produksi sesuai target', 'Deviasi dimonitor', 'Tindakan korektif dilakukan jika perlu', 'Catatan perbandingan dengan standar lengkap'], ['Production records', 'Standard comparison', 'Management records'], 'critical', 2, ['ref-id-003']),
    createAnimalHealthQuestion('PS-07-003', 'Apakah penurunan produksi diinvestigasi dengan benar?', 2, false, 'Penurunan produksi harus diinvestigasi untuk mengidentifikasi penyebab', ['Penurunan diidentifikasi', 'Investigasi dilakukan', 'Penyebab diidentifikasi', 'Tindakan korektif dilakukan'], ['Investigation records', 'Production records', 'Corrective action records'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 8: EGG COLLECTION (PS-08)
// ============================================================
const ps08_eggCollection = createSection({
  sectionCode: 'PS-08',
  name: 'Egg Collection',
  category: 'animal_health',
  description: 'Egg collection procedures and management',
  order: 8,
  weight: 1.3,
  items: [
    createAnimalHealthQuestion('PS-08-001', 'Apakah pengumpulan telur dilakukan dengan prosedur yang benar?', 3, true, 'Telur harus dikumpulkan dengan prosedur yang benar untuk mencegah kerusakan', ['Pengumpulan dilakukan rutin', 'Telur ditangani dengan hati-hati', 'Telur rusak dipisahkan', 'Catatan pengumpulan lengkap'], ['Collection records', 'Site observation', 'Staff interview'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('PS-08-002', 'Apakah telur lantai (floor eggs) diminimalkan?', 2, false, 'Floor eggs harus diminimalkan untuk mencegah kontaminasi', ['Nesting box adequate', 'Floor eggs diminimalkan', 'Floor eggs dipisahkan', 'Catatan floor eggs lengkap'], ['Floor egg records', 'Site observation', 'Photographic evidence'], 'major', 2, ['ref-id-003']),
    createAnimalHealthQuestion('PS-08-003', 'Apakah telur kotor (dirty eggs) dipisahkan?', 2, false, 'Telur kotor harus dipisahkan dari telur bersih', ['Telur kotor diidentifikasi', 'Telur kotor dipisahkan', 'Prosedur penanganan telur kotor tertulis', 'Catatan telur kotor lengkap'], ['Dirty egg records', 'Site observation', 'Photographic evidence'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 9: EGG QUALITY (PS-09)
// ============================================================
const ps09_eggQuality = createSection({
  sectionCode: 'PS-09',
  name: 'Egg Quality',
  category: 'animal_health',
  description: 'Egg quality monitoring and management',
  order: 9,
  weight: 1.4,
  items: [
    createAnimalHealthQuestion('PS-09-001', 'Apakah kualitas telur internal dimonitor rutin?', 3, true, 'Kualitas telur internal (Haugh unit, yolk color, dll) harus dimonitor', ['Monitoring kualitas internal dilakukan', 'Parameter yang diukur sesuai standar', 'Alat ukur dikalibrasi', 'Catatan kualitas lengkap'], ['Egg quality records', 'Calibration records', 'Laboratory results'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('PS-09-002', 'Apakah kualitas telur eksternal dimonitor rutin?', 2, false, 'Kualitas telur eksternal (shell quality, cleanliness, dll) harus dimonitor', ['Monitoring kualitas eksternal dilakukan', 'Parameter yang diukur sesuai standar', 'Telur retak/cacat dipisahkan', 'Catatan kualitas lengkap'], ['Egg quality records', 'Site observation', 'Photographic evidence'], 'major', 2, ['ref-id-003']),
    createAnimalHealthQuestion('PS-09-003', 'Apakah telur yang tidak memenuhi standar ditangani dengan benar?', 2, false, 'Telur yang tidak memenuhi standar harus ditangani dengan prosedur yang benar', ['Telur tidak memenuhi standar diidentifikasi', 'Telur tidak memenuhi standar dipisahkan', 'Prosedur penanganan tertulis', 'Catatan penanganan lengkap'], ['Rejection records', 'Handling procedures', 'Site observation'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 10: HATCHING EGG HANDLING (PS-10)
// ============================================================
const ps10_hatchingEggHandling = createSection({
  sectionCode: 'PS-10',
  name: 'Hatching Egg Handling',
  category: 'animal_health',
  description: 'Proper handling of hatching eggs',
  order: 10,
  weight: 1.5,
  items: [
    createAnimalHealthQuestion('PS-10-001', 'Apakah telur tetas ditangani dengan prosedur yang benar?', 3, true, 'Telur tetas harus ditangani dengan prosedur yang benar untuk menjaga viabilitas', ['Prosedur penanganan tertulis', 'Telur ditangani dengan hati-hati', 'Telur tidak jatuh atau terbentur', 'Staff terlatih dalam penanganan'], ['Handling procedures', 'Staff training records', 'Site observation'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('PS-10-002', 'Apakah sanitasi telur tetas dilakukan dengan benar?', 3, true, 'Telur tetas harus disanitasi untuk mencegah kontaminasi', ['Prosedur sanitasi tertulis', 'Sanitasi dilakukan dengan benar', 'Bahan sanitasi sesuai standar', 'Catatan sanitasi lengkap'], ['Sanitization procedures', 'Sanitization records', 'Site observation'], 'critical', 2, ['ref-woah-001']),
    createAnimalHealthQuestion('PS-10-003', 'Apakah penyimpanan telur tetas dilakukan dalam kondisi yang tepat?', 3, true, 'Telur tetas harus disimpan dalam kondisi suhu dan kelembaban yang tepat', ['Suhu penyimpanan sesuai standar', 'Kelembaban penyimpanan sesuai standar', 'Durasi penyimpanan sesuai standar', 'Catatan kondisi penyimpanan lengkap'], ['Storage conditions records', 'Temperature/humidity logs', 'Site observation'], 'critical', 3, ['ref-id-003'])
  ]
});

// Create the complete template
export const PARENT_STOCK_TEMPLATE: AuditTemplate = {
  id: 'template-ps-prod-v1',
  code: 'PS-PROD-V1.0',
  name: 'Parent Stock / Breeder Farm Audit',
  description: 'Comprehensive audit template for parent stock/breeder farm facilities covering biosecurity, flock management, male/female management, egg production, and hatching egg handling',
  facilityTypes: ['parent_stock_broiler'],
  departmentId: 'dept2', // Breeding Department
  auditCategory: 'production',
  references: [
    {
      id: 'ref-ps-001',
      code: 'WOAH Terrestrial Code Ch. 6.5',
      title: 'Biosecurity in Poultry Breeding Flocks',
      organization: 'WOAH',
      year: '2023',
      status: 'valid',
      sourceType: 'standard',
      verificationStatus: 'verified',
      country: 'International',
      language: 'en'
    },
    {
      id: 'ref-ps-002',
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
    ps01_biosecurity,
    ps02_flockPlacement,
    ps03_maleManagement,
    ps04_femaleManagement,
    ps05_feedingProgram,
    ps06_bodyWeightMonitoring,
    ps07_eggProduction,
    ps08_eggCollection,
    ps09_eggQuality,
    ps10_hatchingEggHandling
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 30,
  estimatedDuration: 480, // 8 hours
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['parent-stock', 'breeder', 'production', 'biosecurity', 'egg-production'],
  isPublic: true
};
