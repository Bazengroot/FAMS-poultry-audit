// Hatchery Production Audit Template - HAT-PROD-V1.0
// Comprehensive audit template for hatchery facilities

import { AuditTemplate } from '../../types';
import { createSection, createBiosecurityQuestion, createAnimalHealthQuestion, createSanitationQuestion, createDocumentationQuestion, createHousingQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: BIOSECURITY (HAT-01)
// ============================================================
const hat01_biosecurity = createSection({
  sectionCode: 'HAT-01',
  name: 'Hatchery Biosecurity',
  category: 'biosecurity',
  description: 'Biosecurity measures specific to hatchery operations',
  order: 1,
  weight: 1.5,
  items: [
    createBiosecurityQuestion('HAT-01-001', 'Apakah akses masuk hatchery dikontrol dengan ketat?', 3, true, 'Hatchery harus memiliki kontrol akses yang sangat ketat untuk mencegah kontaminasi', ['Pos keamanan 24 jam', 'Akses terbatas untuk personel terlatih', 'Prosedur akses tertulis dan dipahami', 'Visitor log lengkap'], ['Visitor log', 'Access control SOP', 'Site observation'], 'critical', 1, ['ref-woah-002']),
    createBiosecurityQuestion('HAT-01-002', 'Apakah ada pemisahan yang jelas antara area clean dan dirty?', 3, true, 'Hatchery harus memiliki pemisahan yang jelas antara area clean dan dirty', ['Area clean dan dirty terpisah', 'Alur kerja satu arah', 'Personel tidak berpindah tanpa dekontaminasi', 'Peralatan terpisah'], ['Hatchery layout', 'Site observation', 'Photographic evidence'], 'critical', 2, ['ref-woah-002']),
    createBiosecurityQuestion('HAT-01-003', 'Apakah program sanitasi hatchery berjalan efektif?', 3, true, 'Program sanitasi hatchery harus terdokumentasi dan berjalan efektif', ['Program sanitasi tertulis', 'Sanitasi dilakukan sesuai jadwal', 'Bahan sanitasi sesuai standar', 'Catatan sanitasi lengkap'], ['Sanitization program', 'Sanitization records', 'Site observation'], 'critical', 3, ['ref-woah-002'])
  ]
});

// ============================================================
// SECTION 2: EGG RECEIVING (HAT-02)
// ============================================================
const hat02_eggReceiving = createSection({
  sectionCode: 'HAT-02',
  name: 'Egg Receiving',
  category: 'animal_health',
  description: 'Procedures for receiving hatching eggs',
  order: 2,
  weight: 1.4,
  items: [
    createAnimalHealthQuestion('HAT-02-001', 'Apakah telur tetas diterima dengan prosedur yang benar?', 3, true, 'Telur tetas harus diterima dengan prosedur yang benar untuk menjaga kualitas', ['Prosedur penerimaan tertulis', 'Telur diperiksa saat diterima', 'Telur rusak dipisahkan', 'Catatan penerimaan lengkap'], ['Receiving procedures', 'Receiving records', 'Site observation'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('HAT-02-002', 'Apakah identifikasi telur (flock, date, supplier) lengkap?', 3, true, 'Setiap telur harus teridentifikasi dengan jelas untuk traceability', ['Identifikasi flock tersedia', 'Tanggal produksi tercatat', 'Supplier teridentifikasi', 'Label jelas dan lengkap'], ['Egg identification records', 'Traceability records', 'Site observation'], 'critical', 2, ['ref-id-003']),
    createAnimalHealthQuestion('HAT-02-003', 'Apakah kualitas telur tetas diperiksa saat diterima?', 2, false, 'Kualitas telur tetas harus diperiksa untuk memastikan kualitas', ['Kualitas telur diperiksa', 'Telur tidak memenuhi standar dipisahkan', 'Catatan pemeriksaan kualitas lengkap', 'Kriteria penerimaan jelas'], ['Quality inspection records', 'Rejection records', 'Site observation'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 3: EGG STORAGE (HAT-03)
// ============================================================
const hat03_eggStorage = createSection({
  sectionCode: 'HAT-03',
  name: 'Egg Storage',
  category: 'housing',
  description: 'Proper storage of hatching eggs',
  order: 3,
  weight: 1.3,
  items: [
    createHousingQuestion('HAT-03-001', 'Apakah kondisi penyimpanan telur tetas sesuai standar?', 3, true, 'Telur tetas harus disimpan dalam kondisi suhu dan kelembaban yang tepat', ['Suhu penyimpanan sesuai standar', 'Kelembaban penyimpanan sesuai standar', 'Sirkulasi udara baik', 'Catatan kondisi penyimpanan lengkap'], ['Storage conditions records', 'Temperature/humidity logs', 'Site observation'], 'critical', 1, ['ref-id-003']),
    createHousingQuestion('HAT-03-002', 'Apakah durasi penyimpanan telur tetas sesuai standar?', 2, false, 'Durasi penyimpanan telur tetas harus sesuai standar untuk menjaga viabilitas', ['Durasi penyimpanan sesuai standar', 'Telur lama diproses lebih dulu (FIFO)', 'Catatan durasi penyimpanan lengkap', 'Telur yang melebihi durasi dipisahkan'], ['Storage duration records', 'FIFO records', 'Site observation'], 'major', 2, ['ref-id-003']),
    createHousingQuestion('HAT-03-003', 'Apakah area penyimpanan telur bersih dan terorganisir?', 2, false, 'Area penyimpanan harus bersih dan terorganisir untuk mencegah kontaminasi', ['Area penyimpanan bersih', 'Telur tersusun rapi', 'Tidak ada kontaminasi', 'Catatan kebersihan lengkap'], ['Site observation', 'Photographic evidence', 'Cleaning records'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 4: INCUBATION (HAT-04)
// ============================================================
const hat04_incubation = createSection({
  sectionCode: 'HAT-04',
  name: 'Incubation',
  category: 'animal_health',
  description: 'Incubation process management',
  order: 4,
  weight: 1.5,
  items: [
    createAnimalHealthQuestion('HAT-04-001', 'Apakah kondisi inkubator sesuai standar?', 3, true, 'Kondisi inkubator (suhu, kelembaban, ventilasi) harus sesuai standar', ['Suhu inkubator sesuai standar', 'Kelembaban inkubator sesuai standar', 'Ventilasi baik', 'Catatan kondisi inkubator lengkap'], ['Incubator conditions records', 'Temperature/humidity logs', 'Site observation'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('HAT-04-002', 'Apakah monitoring inkubator dilakukan rutin?', 3, true, 'Monitoring inkubator harus dilakukan rutin untuk memastikan kondisi optimal', ['Monitoring dilakukan rutin', 'Parameter yang dimonitor sesuai standar', 'Deviasi diidentifikasi dan ditangani', 'Catatan monitoring lengkap'], ['Monitoring records', 'Deviation records', 'Site observation'], 'critical', 2, ['ref-id-003']),
    createAnimalHealthQuestion('HAT-04-003', 'Apakah egg turning dilakukan dengan benar?', 2, false, 'Egg turning harus dilakukan dengan benar untuk memastikan perkembangan embrio yang baik', ['Egg turning dilakukan sesuai jadwal', 'Sudut turning sesuai standar', 'Mekanisme turning berfungsi baik', 'Catatan turning lengkap'], ['Turning records', 'Site observation', 'Equipment maintenance records'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 5: HATCHING (HAT-05)
// ============================================================
const hat05_hatching = createSection({
  sectionCode: 'HAT-05',
  name: 'Hatching',
  category: 'animal_health',
  description: 'Hatching process management',
  order: 5,
  weight: 1.5,
  items: [
    createAnimalHealthQuestion('HAT-05-001', 'Apakah kondisi hatcher sesuai standar?', 3, true, 'Kondisi hatcher (suhu, kelembaban, ventilasi) harus sesuai standar', ['Suhu hatcher sesuai standar', 'Kelembaban hatcher sesuai standar', 'Ventilasi baik', 'Catatan kondisi hatcher lengkap'], ['Hatcher conditions records', 'Temperature/humidity logs', 'Site observation'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('HAT-05-002', 'Apakah monitoring hatching dilakukan rutin?', 3, true, 'Monitoring hatching harus dilakukan rutin untuk mengidentifikasi masalah', ['Monitoring dilakukan rutin', 'Hatchability dimonitor', 'Masalah diidentifikasi dini', 'Catatan monitoring lengkap'], ['Hatching records', 'Hatchability records', 'Site observation'], 'critical', 2, ['ref-id-003']),
    createAnimalHealthQuestion('HAT-05-003', 'Apakah hatchability sesuai dengan target standar?', 2, false, 'Hatchability harus sesuai dengan target standar breed', ['Hatchability sesuai target', 'Deviasi dimonitor', 'Tindakan korektif dilakukan jika perlu', 'Catatan perbandingan dengan standar lengkap'], ['Hatchability records', 'Standard comparison', 'Management records'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 6: CHICK QUALITY (HAT-06)
// ============================================================
const hat06_chickQuality = createSection({
  sectionCode: 'HAT-06',
  name: 'Chick Quality',
  category: 'animal_health',
  description: 'Chick quality assessment and management',
  order: 6,
  weight: 1.4,
  items: [
    createAnimalHealthQuestion('HAT-06-001', 'Apakah kualitas chick dinilai dengan prosedur yang benar?', 3, true, 'Kualitas chick harus dinilai dengan prosedur yang benar untuk memastikan kualitas', ['Prosedur penilaian kualitas tertulis', 'Penilaian dilakukan oleh personel terlatih', 'Parameter penilaian sesuai standar', 'Catatan penilaian lengkap'], ['Chick quality assessment procedures', 'Assessment records', 'Staff training records'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('HAT-06-002', 'Apakah chick yang tidak memenuhi standar dipisahkan?', 2, false, 'Chick yang tidak memenuhi standar harus dipisahkan', ['Chick tidak memenuhi standar diidentifikasi', 'Chick tidak memenuhi standar dipisahkan', 'Catatan pemisahan lengkap', 'Prosedur penanganan tertulis'], ['Rejection records', 'Separation records', 'Site observation'], 'major', 2, ['ref-id-003']),
    createAnimalHealthQuestion('HAT-06-003', 'Apakah Tona score chick sesuai standar?', 2, false, 'Tona score chick harus sesuai standar untuk memastikan kualitas', ['Tona score dinilai', 'Tona score sesuai standar', 'Deviasi dimonitor', 'Catatan Tona score lengkap'], ['Tona score records', 'Chick quality records', 'Site observation'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 7: CHICK VACCINATION (HAT-07)
// ============================================================
const hat07_chickVaccination = createSection({
  sectionCode: 'HAT-07',
  name: 'Chick Vaccination',
  category: 'animal_health',
  description: 'Chick vaccination procedures and management',
  order: 7,
  weight: 1.4,
  items: [
    createAnimalHealthQuestion('HAT-07-001', 'Apakah program vaksinasi chick dilaksanakan sesuai jadwal?', 3, true, 'Program vaksinasi chick harus dilaksanakan sesuai jadwal untuk mencegah penyakit', ['Program vaksinasi tertulis', 'Vaksinasi dilaksanakan sesuai jadwal', 'Vaksin disimpan dengan benar', 'Catatan vaksinasi lengkap'], ['Vaccination program', 'Vaccination records', 'Vaccine storage records'], 'critical', 1, ['ref-id-003']),
    createAnimalHealthQuestion('HAT-07-002', 'Apakah prosedur vaksinasi dilakukan dengan benar?', 3, true, 'Prosedur vaksinasi harus dilakukan dengan benar untuk memastikan efektivitas', ['Prosedur vaksinasi tertulis', 'Vaksinasi dilakukan oleh personel terlatih', 'Dosis dan metode sesuai standar', 'Catatan prosedur lengkap'], ['Vaccination procedures', 'Staff training records', 'Vaccination records'], 'critical', 2, ['ref-id-003']),
    createAnimalHealthQuestion('HAT-07-003', 'Apakah cold chain vaksin dijaga dengan baik?', 3, true, 'Cold chain vaksin harus dijaga untuk memastikan efektivitas vaksin', ['Suhu penyimpanan vaksin sesuai standar', 'Suhu dimonitor rutin', 'Vaksin tidak kedaluwarsa', 'Catatan cold chain lengkap'], ['Cold chain records', 'Temperature logs', 'Vaccine inventory records'], 'critical', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 8: SANITATION (HAT-08)
// ============================================================
const hat08_sanitation = createSection({
  sectionCode: 'HAT-08',
  name: 'Hatchery Sanitation',
  category: 'sanitation',
  description: 'Sanitation procedures for hatchery',
  order: 8,
  weight: 1.5,
  items: [
    createSanitationQuestion('HAT-08-001', 'Apakah cleaning dan disinfection hatchery dilakukan rutin?', 3, true, 'Cleaning dan disinfection harus dilakukan rutin untuk mencegah kontaminasi', ['Jadwal cleaning dan disinfection tertulis', 'Cleaning dan disinfection dilakukan sesuai jadwal', 'Bahan sanitasi sesuai standar', 'Catatan cleaning dan disinfection lengkap'], ['Cleaning schedule', 'Cleaning records', 'Disinfection records'], 'critical', 1, ['ref-woah-002']),
    createSanitationQuestion('HAT-08-002', 'Apakah sanitasi inkubator dan hatcher dilakukan dengan benar?', 3, true, 'Sanitasi inkubator dan hatcher harus dilakukan dengan benar setelah setiap cycle', ['Prosedur sanitasi tertulis', 'Sanitasi dilakukan setelah setiap cycle', 'Bahan sanitasi sesuai standar', 'Catatan sanitasi lengkap'], ['Sanitization procedures', 'Sanitization records', 'Site observation'], 'critical', 2, ['ref-woah-002']),
    createSanitationQuestion('HAT-08-003', 'Apakah monitoring efektivitas sanitasi dilakukan?', 2, false, 'Efektivitas sanitasi harus dimonitor untuk memastikan keberhasilan', ['Monitoring efektivitas sanitasi dilakukan', 'Parameter monitoring sesuai standar', 'Hasil monitoring sesuai standar', 'Catatan monitoring lengkap'], ['Sanitation monitoring records', 'Microbiological test results', 'Site observation'], 'major', 3, ['ref-woah-002'])
  ]
});

// ============================================================
// SECTION 9: EQUIPMENT (HAT-09)
// ============================================================
const hat09_equipment = createSection({
  sectionCode: 'HAT-09',
  name: 'Hatchery Equipment',
  category: 'equipment',
  description: 'Hatchery equipment maintenance and calibration',
  order: 9,
  weight: 1.3,
  items: [
    createHousingQuestion('HAT-09-001', 'Apakah inkubator dan hatcher dimaintain dengan baik?', 3, true, 'Inkubator dan hatcher harus dimaintain untuk memastikan kinerja optimal', ['Maintenance dilakukan rutin', 'Inkubator dan hatcher berfungsi baik', 'Spare parts tersedia', 'Catatan maintenance lengkap'], ['Maintenance records', 'Equipment maintenance records', 'Site observation'], 'critical', 1, ['ref-id-003']),
    createHousingQuestion('HAT-09-002', 'Apakah sensor suhu dan kelembaban dikalibrasi rutin?', 3, true, 'Sensor suhu dan kelembaban harus dikalibrasi untuk memastikan akurasi', ['Kalibrasi dilakukan rutin', 'Sensor dikalibrasi oleh personel terlatih', 'Hasil kalibrasi sesuai standar', 'Catatan kalibrasi lengkap'], ['Calibration records', 'Calibration certificates', 'Site observation'], 'critical', 2, ['ref-id-003']),
    createHousingQuestion('HAT-09-003', 'Apakah sistem alarm berfungsi dengan baik?', 2, false, 'Sistem alarm harus berfungsi untuk mengidentifikasi masalah dini', ['Sistem alarm berfungsi', 'Alarm diuji rutin', 'Personel memahami prosedur alarm', 'Catatan pengujian alarm lengkap'], ['Alarm test records', 'Site observation', 'Staff interview'], 'major', 3, ['ref-id-003'])
  ]
});

// ============================================================
// SECTION 10: TRACEABILITY (HAT-10)
// ============================================================
const hat10_traceability = createSection({
  sectionCode: 'HAT-10',
  name: 'Traceability',
  category: 'documentation',
  description: 'Traceability system for hatchery operations',
  order: 10,
  weight: 1.4,
  items: [
    createDocumentationQuestion('HAT-10-001', 'Apakah sistem traceability telur tetas hingga chick tersedia?', 3, true, 'Sistem traceability harus tersedia untuk melacak telur tetas hingga chick', ['Sistem traceability tersedia', 'Setiap batch teridentifikasi', 'Traceability dari flock hingga chick', 'Catatan traceability lengkap'], ['Traceability system', 'Batch records', 'Traceability records'], 'critical', 1, ['ref-id-003']),
    createDocumentationQuestion('HAT-10-002', 'Apakah catatan hatchery lengkap dan terorganisir?', 2, false, 'Catatan hatchery harus lengkap dan terorganisir untuk audit trail', ['Catatan hatchery lengkap', 'Catatan terorganisir', 'Catatan disimpan dengan baik', 'Audit trail tersedia'], ['Hatchery records', 'Site observation', 'Document management records'], 'major', 2, ['ref-id-003']),
    createDocumentationQuestion('HAT-10-003', 'Apakah recall procedure tersedia dan diuji?', 2, false, 'Recall procedure harus tersedia dan diuji untuk menangani masalah', ['Recall procedure tertulis', 'Recall procedure diuji', 'Personel memahami prosedur', 'Catatan pengujian recall lengkap'], ['Recall procedure', 'Recall test records', 'Staff interview'], 'major', 3, ['ref-id-003'])
  ]
});

// Create the complete template
export const HATCHERY_TEMPLATE: AuditTemplate = {
  id: 'template-hat-prod-v1',
  code: 'HAT-PROD-V1.0',
  name: 'Hatchery Production Audit',
  description: 'Comprehensive audit template for hatchery facilities covering biosecurity, egg handling, incubation, hatching, chick quality, vaccination, sanitation, and traceability',
  facilityTypes: ['hatchery'],
  departmentId: 'dept4', // Hatchery Department
  auditCategory: 'production',
  references: [
    {
      id: 'ref-hat-001',
      code: 'WOAH Terrestrial Code Ch. 6.6',
      title: 'Biosecurity in Hatcheries',
      organization: 'WOAH',
      year: '2023',
      status: 'valid',
      sourceType: 'standard',
      verificationStatus: 'verified',
      country: 'International',
      language: 'en'
    },
    {
      id: 'ref-hat-002',
      code: 'SNI 8173-3:2023',
      title: 'Pedoman Manajemen Hatchery Unggas',
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
    hat01_biosecurity,
    hat02_eggReceiving,
    hat03_eggStorage,
    hat04_incubation,
    hat05_hatching,
    hat06_chickQuality,
    hat07_chickVaccination,
    hat08_sanitation,
    hat09_equipment,
    hat10_traceability
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
  tags: ['hatchery', 'production', 'biosecurity', 'incubation', 'chick-quality'],
  isPublic: true
};
