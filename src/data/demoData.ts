import { User, Farm, FarmHouse, AuditTemplate, Audit, Finding, CorrectiveAction, AuditSchedule, Notification, AuditTemplateSection, AuditCategory, ResponseType } from '../types';
import { v4 as uuid } from 'uuid';

function daysAgo(d: number): string {
  const date = new Date();
  date.setDate(date.getDate() - d);
  return date.toISOString();
}
function daysFromNow(d: number): string {
  const date = new Date();
  date.setDate(date.getDate() + d);
  return date.toISOString();
}

const CATEGORY_LABELS: Record<AuditCategory, string> = {
  biosecurity: 'Biosecurity',
  animal_health: 'Kesehatan Hewan',
  feed_management: 'Manajemen Pakan',
  water_management: 'Manajemen Air',
  housing: 'Kandang',
  environment: 'Lingkungan',
  equipment: 'Peralatan',
  farm_management: 'Manajemen Farm',
  personnel: 'Personalia',
  documentation: 'Dokumentasi',
  welfare: 'Kesejahteraan',
  sanitation: 'Sanitasi',
};

function makeChecklistItem(question: string, category: AuditCategory, weight: number, critical: boolean, responseType: ResponseType, guidance: string, order: number) {
  return {
    id: uuid(),
    question,
    description: '',
    category,
    weight,
    mandatory: true,
    responseType,
    critical,
    evidenceRequired: critical,
    correctiveActionRequired: critical,
    guidance,
    order,
  };
}

function makeSection(name: string, category: AuditCategory, items: ReturnType<typeof makeChecklistItem>[], order: number): AuditTemplateSection {
  return { id: uuid(), name, category, description: '', order, items };
}

export function generateDemoData() {
  const users: User[] = [
    { id: 'u1', name: 'Super Admin', username: 'superadmin', email: 'admin@fams.com', password: 'superadmin123', role: 'super_admin', department: 'Management', assignedFarms: [], status: 'active', createdAt: daysAgo(90), updatedAt: daysAgo(1), lastLogin: daysAgo(0) },
    { id: 'u2', name: 'Budi Santoso', username: 'budi', email: 'budi@fams.com', password: 'budi123', role: 'auditor', department: 'Quality Assurance', assignedFarms: [], status: 'active', createdAt: daysAgo(60), updatedAt: daysAgo(5), lastLogin: daysAgo(2) },
    { id: 'u3', name: 'Siti Rahayu', username: 'siti', email: 'siti@fams.com', password: 'siti123', role: 'farm_manager', department: 'Operations', assignedFarms: [], status: 'active', createdAt: daysAgo(60), updatedAt: daysAgo(3), lastLogin: daysAgo(1) },
    { id: 'u4', name: 'Ahmad Wijaya', username: 'ahmad', email: 'ahmad@fams.com', password: 'ahmad123', role: 'supervisor', department: 'Operations', assignedFarms: [], status: 'active', createdAt: daysAgo(45), updatedAt: daysAgo(7), lastLogin: daysAgo(3) },
    { id: 'u5', name: 'Dewi Lestari', username: 'dewi', email: 'dewi@fams.com', password: 'dewi123', role: 'admin', department: 'Administration', assignedFarms: [], status: 'active', createdAt: daysAgo(30), updatedAt: daysAgo(2), lastLogin: daysAgo(0) },
  ];

  // Legacy farms kept for backward compatibility only
  const farms: Farm[] = [];

  // Legacy houses kept for backward compatibility only
  const houses: FarmHouse[] = [];

  // Create audit templates with comprehensive checklist items
  const biosecurityItems = [
    makeChecklistItem('Apakah akses masuk farm terkontrol dengan baik?', 'biosecurity', 3, true, 'pass_fail', 'Periksa adanya pos keamanan, barrier, dan prosedur akses', 1),
    makeChecklistItem('Apakah catatan pengunjung tersedia dan terupdate?', 'biosecurity', 2, false, 'pass_fail', 'Buku tamu harus mencatat nama, tujuan, dan waktu kunjungan', 2),
    makeChecklistItem('Apakah rambu biosecurity terpasang di area masuk?', 'biosecurity', 2, false, 'pass_fail', 'Rambu harus jelas terlihat dan dalam kondisi baik', 3),
    makeChecklistItem('Apakah footbath tersedia dan larutan desinfektan diganti rutin?', 'biosecurity', 3, true, 'pass_fail', 'Footbath harus ada di setiap pintu masuk kandang', 4),
    makeChecklistItem('Apakah sanitasi kendaraan dilakukan sebelum masuk?', 'biosecurity', 3, true, 'pass_fail', 'Semua kendaraan harus disemprot desinfektan', 5),
    makeChecklistItem('Apakah pergerakan personel dibatasi sesuai zona?', 'biosecurity', 2, false, 'pass_fail', 'Personel tidak boleh berpindah zona tanpa prosedur', 6),
    makeChecklistItem('Apakah prosedur downtime diikuti setelah kontak dengan unggas lain?', 'biosecurity', 3, true, 'pass_fail', 'Minimal 48 jam downtime', 7),
    makeChecklistItem('Apakah disposal bangkai dilakukan dengan benar?', 'biosecurity', 3, true, 'pass_fail', 'Bangkai harus dibakar atau diinkubasi dengan benar', 8),
  ];

  const animalHealthItems = [
    makeChecklistItem('Apakah observasi kesehatan flock harian dicatat?', 'animal_health', 3, true, 'pass_fail', 'Catatan harus mencakup perilaku, nafsu makan, dan kondisi fisik', 1),
    makeChecklistItem('Apakah catatan mortalitas diupdate setiap hari?', 'animal_health', 3, true, 'pass_fail', 'Mortalitas harus dicatat dengan tanggal dan jumlah', 2),
    makeChecklistItem('Apakah tanda-tanda abnormal didokumentasikan?', 'animal_health', 2, false, 'pass_fail', 'Termasuk gejala penyakit, perubahan perilaku', 3),
    makeChecklistItem('Apakah catatan vaksinasi lengkap dan sesuai jadwal?', 'animal_health', 3, true, 'pass_fail', 'Semua vaksinasi harus tercatat dengan batch number', 4),
    makeChecklistItem('Apakah catatan pengobatan lengkap?', 'animal_health', 2, false, 'pass_fail', 'Obat, dosis, dan durasi harus tercatat', 5),
    makeChecklistItem('Apakah rekomendasi dokter hewan ditindaklanjuti?', 'animal_health', 2, false, 'yes_no', 'Cek catatan kunjungan dokter hewan', 6),
  ];

  const feedItems = [
    makeChecklistItem('Apakah penyimpanan pakan bersih dan kering?', 'feed_management', 3, true, 'pass_fail', 'Gudang pakan harus bebas kelembaban dan hama', 1),
    makeChecklistItem('Apakah silo pakan dalam kondisi baik?', 'feed_management', 2, false, 'pass_fail', 'Tidak ada kebocoran, karat, atau kontaminasi', 2),
    makeChecklistItem('Apakah inventori pakan dimonitor?', 'feed_management', 2, false, 'pass_fail', 'Stok pakan harus tercatat dan sesuai', 3),
    makeChecklistItem('Apakah pencegahan kontaminasi pakan dilakukan?', 'feed_management', 3, true, 'pass_fail', 'Tidak ada akses hewan liar ke area pakan', 4),
  ];

  const waterItems = [
    makeChecklistItem('Apakah sumber air bersih?', 'water_management', 3, true, 'pass_fail', 'Cek kualitas visual dan hasil lab jika ada', 1),
    makeChecklistItem('Apakah kualitas air dimonitor secara rutin?', 'water_management', 2, false, 'pass_fail', 'pH, TDS, bakteri harus diuji', 2),
    makeChecklistItem('Apakah nipple drinker berfungsi baik?', 'water_management', 2, false, 'pass_fail', 'Tidak ada kebocoran, aliran normal', 3),
    makeChecklistItem('Apakah flushing saluran air dilakukan rutin?', 'water_management', 2, false, 'yes_no', 'Minimal seminggu sekali', 4),
    makeChecklistItem('Apakah konsumsi air dimonitor harian?', 'water_management', 2, false, 'pass_fail', 'Penurunan konsumsi bisa indikasi masalah', 5),
  ];

  const housingItems = [
    makeChecklistItem('Apakah kebersihan kandang memenuhi standar?', 'housing', 3, true, 'pass_fail', 'Lantai, dinding, langit-langit harus bersih', 1),
    makeChecklistItem('Apakah peralatan berfungsi dengan baik?', 'housing', 2, false, 'pass_fail', 'Feeder, drinker, ventilasi harus operational', 2),
    makeChecklistItem('Apakah ventilasi memadai?', 'housing', 3, true, 'pass_fail', 'Airflow harus sesuai standar untuk umur flock', 3),
    makeChecklistItem('Apakah suhu dan kelembaban dimonitor?', 'housing', 2, false, 'pass_fail', 'Thermometer/hygrometer harus tersedia dan dibaca', 4),
    makeChecklistItem('Apakah pencahayaan sesuai?', 'housing', 2, false, 'rating', 'Intensitas lux sesuai umur dan tipe', 5),
    makeChecklistItem('Apakah kondisi litter/lantai acceptable?', 'housing', 2, false, 'pass_fail', 'Litter tidak boleh basah atau berjamur', 6),
  ];

  const environmentItems = [
    makeChecklistItem('Apakah kadar amonia terkontrol?', 'environment', 3, true, 'pass_fail', 'Maksimal 25 ppm', 1),
    makeChecklistItem('Apakah ventilasi sufficient?', 'environment', 2, false, 'pass_fail', 'Fan dan inlet berfungsi sesuai kebutuhan', 2),
    makeChecklistItem('Apakah catatan lingkungan tersedia?', 'environment', 2, false, 'pass_fail', 'Suhu, kelembaban, amonia dicatat harian', 3),
    makeChecklistItem('Apakah peralatan lingkungan termaintain?', 'environment', 2, false, 'pass_fail', 'Cooling pad, fan, heater dalam kondisi baik', 4),
  ];

  const documentationItems = [
    makeChecklistItem('Apakah catatan harian lengkap?', 'documentation', 2, false, 'pass_fail', 'Mortality, feed, water, temperature dicatat', 1),
    makeChecklistItem('Apakah catatan mortalitas akurat?', 'documentation', 2, false, 'pass_fail', 'Cross-check dengan fisik', 2),
    makeChecklistItem('Apakah catatan pakan tersedia?', 'documentation', 2, false, 'pass_fail', 'Feed intake harian tercatat', 3),
    makeChecklistItem('Apakah catatan pengobatan lengkap?', 'documentation', 2, false, 'pass_fail', 'Semua treatment tercatat', 4),
    makeChecklistItem('Apakah temuan audit sebelumnya ditindaklanjuti?', 'documentation', 3, true, 'pass_fail', 'CAP dari audit sebelumnya harus ada bukti', 5),
  ];

  const managementItems = [
    makeChecklistItem('Apakah SOP tersedia dan diimplementasi?', 'farm_management', 2, false, 'pass_fail', 'SOP harus tertulis dan dipahami staf', 1),
    makeChecklistItem('Apakah personel terlatih?', 'farm_management', 2, false, 'pass_fail', 'Bukti training tersedia', 2),
    makeChecklistItem('Apakah tindakan korektif ditindaklanjuti?', 'farm_management', 3, true, 'pass_fail', 'CAP harus selesai sesuai target', 3),
    makeChecklistItem('Apakah insiden didokumentasikan?', 'farm_management', 2, false, 'yes_no', 'Laporan insiden tersedia', 4),
  ];

  const welfareItems = [
    makeChecklistItem('Apakah stocking density sesuai standar?', 'welfare', 3, true, 'pass_fail', 'Cek jumlah vs kapasitas kandang', 1),
    makeChecklistItem('Apakah akses pakan dan air memadai?', 'welfare', 3, true, 'pass_fail', 'Feeder/drinker ratio sesuai standar', 2),
    makeChecklistItem('Apakah bird terlihat sehat dan aktif?', 'welfare', 2, false, 'rating', 'Observasi visual kondisi bird', 3),
  ];

  const sanitationItems = [
    makeChecklistItem('Apakah program sanitasi berjalan?', 'sanitation', 3, true, 'pass_fail', 'Jadwal CIP dan fogging dijalankan', 1),
    makeChecklistItem('Apakah area sekitar kandang bersih?', 'sanitation', 2, false, 'pass_fail', 'Tidak ada sampah, genangan, vegetasi berlebihan', 2),
    makeChecklistItem('Apakah pest control efektif?', 'sanitation', 2, false, 'pass_fail', 'Tidak ada tikus, serangga berlebihan', 3),
  ];

  const template1: AuditTemplate = {
    id: 't1', code: 'PSB-BIOSEC-001', name: 'Audit Parent Stock Komprehensif', description: 'Template audit lengkap untuk farm parent stock broiler', 
    facilityTypes: ['parent_stock_broiler'], departmentId: 'dept2', auditCategory: 'biosecurity',
    references: [
      { id: 'ref1', code: 'WOAH Terrestrial Code Ch. 6.5', title: 'Biosecurity in Poultry Breeding Flocks', organization: 'WOAH', status: 'valid', url: 'https://www.woah.org/en/what-we-do/standards/codes-and-manuals/' },
      { id: 'ref2', code: 'SNI 8173-1:2023', title: 'Pedoman Budidaya Ayam Ras Pedaging', organization: 'BSN', status: 'valid' }
    ],
    version: '1.0', effectiveDate: daysAgo(90), status: 'active',
    sections: [
      makeSection('Biosecurity', 'biosecurity', biosecurityItems, 1),
      makeSection('Kesehatan Hewan', 'animal_health', animalHealthItems, 2),
      makeSection('Manajemen Pakan', 'feed_management', feedItems, 3),
      makeSection('Manajemen Air', 'water_management', waterItems, 4),
      makeSection('Kandang', 'housing', housingItems, 5),
      makeSection('Lingkungan', 'environment', environmentItems, 6),
      makeSection('Dokumentasi', 'documentation', documentationItems, 7),
      makeSection('Manajemen Farm', 'farm_management', managementItems, 8),
      makeSection('Kesejahteraan', 'welfare', welfareItems, 9),
      makeSection('Sanitasi', 'sanitation', sanitationItems, 10),
    ],
    createdBy: 'u1', createdAt: daysAgo(90), updatedAt: daysAgo(30),
  };

  const template2: AuditTemplate = {
    id: 't2', code: 'BRO-STD-001', name: 'Audit Broiler Standar', description: 'Template audit standar untuk broiler farm', 
    facilityTypes: ['broiler_farm'], departmentId: 'dept1', auditCategory: 'routine',
    references: [
      { id: 'ref3', code: 'SNI 8173-2:2023', title: 'Pakan ayam ras pedaging (broiler) – Bagian 2: Masa awal (starter)', organization: 'BSN', status: 'valid' },
      { id: 'ref4', code: 'Pedoman Ditjen PKH 2024', title: 'Pedoman Biosekuriti Pada Peternakan Unggas Komersil', organization: 'Ditjen PKH', year: '2024', status: 'valid' }
    ],
    version: '1.0', effectiveDate: daysAgo(80), status: 'active',
    sections: [
      makeSection('Biosecurity', 'biosecurity', biosecurityItems.slice(0, 5), 1),
      makeSection('Kesehatan Hewan', 'animal_health', animalHealthItems.slice(0, 4), 2),
      makeSection('Manajemen Pakan', 'feed_management', feedItems, 3),
      makeSection('Manajemen Air', 'water_management', waterItems.slice(0, 3), 4),
      makeSection('Kandang', 'housing', housingItems.slice(0, 4), 5),
      makeSection('Lingkungan', 'environment', environmentItems.slice(0, 2), 6),
      makeSection('Dokumentasi', 'documentation', documentationItems.slice(0, 3), 7),
    ],
    createdBy: 'u1', createdAt: daysAgo(80), updatedAt: daysAgo(20),
  };

  const template3: AuditTemplate = {
    id: 't3', code: 'LYR-BIOSEC-001', name: 'Audit Layer Farm', description: 'Template audit untuk layer farm', 
    facilityTypes: ['layer_farm'], departmentId: 'dept1', auditCategory: 'biosecurity',
    references: [
      { id: 'ref5', code: 'FAO Poultry Production', title: 'Good Practices for Layer Farm Management', organization: 'FAO', status: 'valid', url: 'https://www.fao.org/' }
    ],
    version: '1.0', effectiveDate: daysAgo(70), status: 'active',
    sections: [
      makeSection('Biosecurity', 'biosecurity', biosecurityItems.slice(0, 6), 1),
      makeSection('Kesehatan Hewan', 'animal_health', animalHealthItems, 2),
      makeSection('Manajemen Pakan', 'feed_management', feedItems.slice(0, 3), 3),
      makeSection('Kandang', 'housing', housingItems, 4),
      makeSection('Dokumentasi', 'documentation', documentationItems, 5),
      makeSection('Kesejahteraan', 'welfare', welfareItems, 6),
    ],
    createdBy: 'u1', createdAt: daysAgo(70), updatedAt: daysAgo(15),
  };

  // Hatchery Audit Template
  const hatcheryItems = [
    makeChecklistItem('Apakah penerimaan telur dilakukan dengan prosedur standar?', 'biosecurity', 3, true, 'pass_fail', 'Telur harus diperiksa dan disanitasi sebelum masuk inkubator', 1),
    makeChecklistItem('Apakah penyimpanan telur pada suhu dan kelembaban yang tepat?', 'biosecurity', 3, true, 'pass_fail', 'Suhu 15-18°C, kelembaban 70-80%', 2),
    makeChecklistItem('Apakah sanitasi telur dilakukan sebelum setting?', 'sanitation', 3, true, 'pass_fail', 'Fumigasi atau spraying dengan desinfektan yang sesuai', 3),
    makeChecklistItem('Apakah suhu dan kelembaban inkubator dimonitor harian?', 'environment', 3, true, 'pass_fail', 'Suhu 37.5-37.8°C, kelembaban 55-65% untuk setter', 4),
    makeChecklistItem('Apakah candling dilakukan pada hari ke 7-10?', 'documentation', 2, false, 'pass_fail', 'Identifikasi telur infertil dan early dead', 5),
    makeChecklistItem('Apakah transfer ke hatcher dilakukan pada hari ke 18-19?', 'documentation', 2, false, 'pass_fail', 'Transfer harus dilakukan dengan hati-hati', 6),
    makeChecklistItem('Apakah suhu hatcher dipertahankan 36.7-37.2°C?', 'environment', 3, true, 'pass_fail', 'Suhu lebih rendah dari setter', 7),
    makeChecklistItem('Apakah penanganan DOC sesuai prosedur?', 'welfare', 3, true, 'pass_fail', 'DOC harus ditangani dengan lembut dan cepat', 8),
    makeChecklistItem('Apakah vaksinasi DOC dilakukan sesuai jadwal?', 'animal_health', 3, true, 'pass_fail', 'Vaksinasi harus dilakukan di hatchery', 9),
    makeChecklistItem('Apakah grading DOC dilakukan dengan standar yang jelas?', 'documentation', 2, false, 'pass_fail', 'Grade A, B, C, cull', 10),
  ];

  const template4: AuditTemplate = {
    id: 't4', code: 'HCH-BIOSEC-001', name: 'Audit Hatchery Biosecurity & Production', description: 'Template audit biosecurity dan produksi untuk hatchery', 
    facilityTypes: ['hatchery'], departmentId: 'dept4', auditCategory: 'biosecurity',
    references: [
      { id: 'ref6', code: 'WOAH Terrestrial Code Ch. 6.6', title: 'Biosecurity in Hatcheries', organization: 'WOAH', status: 'valid', url: 'https://www.woah.org/en/what-we-do/standards/codes-and-manuals/' },
      { id: 'ref7', code: 'SNI 8173-3:2023', title: 'Pedoman Manajemen Hatchery Unggas', organization: 'BSN', status: 'valid' }
    ],
    version: '1.0', effectiveDate: daysAgo(60), status: 'active',
    sections: [
      makeSection('Penerimaan & Penyimpanan Telur', 'biosecurity', hatcheryItems.slice(0, 2), 1),
      makeSection('Sanitasi Telur', 'sanitation', hatcheryItems.slice(2, 3), 2),
      makeSection('Inkubasi', 'environment', hatcheryItems.slice(3, 7), 3),
      makeSection('Penanganan DOC', 'welfare', hatcheryItems.slice(7, 9), 4),
      makeSection('Dokumentasi & Grading', 'documentation', hatcheryItems.slice(9, 10), 5),
      makeSection('Kesehatan & Vaksinasi', 'animal_health', hatcheryItems.slice(8, 9), 6),
    ],
    createdBy: 'u1', createdAt: daysAgo(60), updatedAt: daysAgo(10),
  };

  // Feedmill Audit Template
  const feedmillItems = [
    makeChecklistItem('Apakah penerimaan bahan baku dilakukan dengan inspeksi visual?', 'feed_management', 3, true, 'pass_fail', 'Periksa warna, bau, kontaminasi', 1),
    makeChecklistItem('Apakah sampling bahan baku dilakukan sesuai prosedur?', 'feed_management', 3, true, 'pass_fail', 'Sampling harus representatif', 2),
    makeChecklistItem('Apakah penyimpanan bahan baku menggunakan sistem FIFO/FEFO?', 'feed_management', 3, true, 'pass_fail', 'First In First Out atau First Expired First Out', 3),
    makeChecklistItem('Apakah formulasi pakan dikontrol dengan ketat?', 'feed_management', 3, true, 'pass_fail', 'Formulasi harus sesuai dengan standar', 4),
    makeChecklistItem('Apakah penimbangan bahan baku akurat?', 'feed_management', 3, true, 'pass_fail', 'Timbangan harus dikalibrasi', 5),
    makeChecklistItem('Apakah proses mixing dilakukan sesuai waktu standar?', 'feed_management', 2, false, 'pass_fail', 'Waktu mixing harus cukup untuk homogenitas', 6),
    makeChecklistItem('Apakah pelleting dilakukan pada suhu yang tepat?', 'feed_management', 2, false, 'pass_fail', 'Suhu pelleting 75-85°C', 7),
    makeChecklistItem('Apakah QC pakan jadi dilakukan sebelum dispatch?', 'feed_management', 3, true, 'pass_fail', 'Analisa proksimat, fisik, mikrobiologi', 8),
    makeChecklistItem('Apakah label dan kemasan sesuai standar?', 'documentation', 2, false, 'pass_fail', 'Label harus mencantumkan komposisi, tanggal produksi, expired', 9),
    makeChecklistItem('Apakah traceability bahan baku hingga pakan jadi tersedia?', 'documentation', 3, true, 'pass_fail', 'Sistem harus mampu menelusuri dari supplier hingga customer', 10),
  ];

  const template5: AuditTemplate = {
    id: 't5', code: 'FDM-GMP-001', name: 'Audit Feedmill GMP & Quality', description: 'Template audit GMP dan quality untuk feedmill', 
    facilityTypes: ['feedmill'], departmentId: 'dept3', auditCategory: 'quality',
    references: [
      { id: 'ref8', code: 'SNI 8173-2:2023', title: 'Pakan ayam ras pedaging (broiler)', organization: 'BSN', status: 'valid' },
      { id: 'ref9', code: 'Codex Alimentarius CAC/RCP 1-1969', title: 'General Principles of Food Hygiene', organization: 'Codex', status: 'valid', url: 'https://www.fao.org/fao-who-codexalimentarius/codes/en/' }
    ],
    version: '1.0', effectiveDate: daysAgo(50), status: 'active',
    sections: [
      makeSection('Penerimaan Bahan Baku', 'feed_management', feedmillItems.slice(0, 2), 1),
      makeSection('Penyimpanan Bahan Baku', 'feed_management', feedmillItems.slice(2, 3), 2),
      makeSection('Formulasi & Pencampuran', 'feed_management', feedmillItems.slice(3, 6), 3),
      makeSection('Pelleting & Processing', 'feed_management', feedmillItems.slice(6, 7), 4),
      makeSection('Quality Control', 'feed_management', feedmillItems.slice(7, 8), 5),
      makeSection('Labeling & Packaging', 'documentation', feedmillItems.slice(8, 9), 6),
      makeSection('Traceability', 'documentation', feedmillItems.slice(9, 10), 7),
    ],
    createdBy: 'u1', createdAt: daysAgo(50), updatedAt: daysAgo(5),
  };

  // Generate demo audits with responses
  function makeAuditResponse(item: typeof biosecurityItems[0], response: string, score: number): any {
    return {
      itemId: item.id, question: item.question, category: item.category, weight: item.weight,
      critical: item.critical, responseType: item.responseType, response, notes: '', evidence: '',
      hasFinding: response === 'fail' || response === 'no' || response === 'non_compliant',
      needsCorrectiveAction: item.critical && (response === 'fail' || response === 'no'),
      score, maxScore: item.weight,
    };
  }

  function generateAuditResponses(template: AuditTemplate, passRate: number) {
    return template.sections.map(section => ({
      id: uuid(), name: section.name, category: section.category,
      items: section.items.map(item => {
        const rand = Math.random();
        let response: string;
        let score: number;
        if (rand < passRate) {
          response = item.responseType === 'pass_fail' ? 'pass' : item.responseType === 'yes_no' ? 'yes' : item.responseType === 'compliant' ? 'compliant' : item.responseType === 'rating' ? '4' : 'pass';
          score = item.weight;
        } else {
          response = item.responseType === 'pass_fail' ? 'fail' : item.responseType === 'yes_no' ? 'no' : item.responseType === 'compliant' ? 'non_compliant' : item.responseType === 'rating' ? '2' : 'fail';
          score = 0;
        }
        return makeAuditResponse(item, response, score);
      })
    }));
  }

  const audits: Audit[] = [];
  const auditConfigs = [
    { facilityId: 'fac1', facilityAreaId: 'area1', templateId: 't1', daysAgo: 5, status: 'approved' as const, passRate: 0.85 },
    { facilityId: 'fac1', facilityAreaId: 'area2', templateId: 't1', daysAgo: 12, status: 'approved' as const, passRate: 0.9 },
    { facilityId: 'fac1', facilityAreaId: 'area1', templateId: 't1', daysAgo: 20, status: 'approved' as const, passRate: 0.75 },
    { facilityId: 'fac2', facilityAreaId: 'area1', templateId: 't2', daysAgo: 3, status: 'submitted' as const, passRate: 0.8 },
    { facilityId: 'fac2', facilityAreaId: 'area2', templateId: 't2', daysAgo: 15, status: 'approved' as const, passRate: 0.88 },
    { facilityId: 'fac3', facilityAreaId: 'area1', templateId: 't3', daysAgo: 7, status: 'approved' as const, passRate: 0.82 },
    { facilityId: 'fac3', facilityAreaId: 'area2', templateId: 't3', daysAgo: 25, status: 'reviewed' as const, passRate: 0.78 },
    { facilityId: 'fac4', facilityAreaId: 'area1', templateId: 't2', daysAgo: 10, status: 'approved' as const, passRate: 0.92 },
    { facilityId: 'fac5', facilityAreaId: 'area4', templateId: 't4', daysAgo: 35, status: 'approved' as const, passRate: 0.7 },
    { facilityId: 'fac6', facilityAreaId: 'area8', templateId: 't5', daysAgo: 40, status: 'approved' as const, passRate: 0.65 },
  ];

  auditConfigs.forEach((config, idx) => {
    const template = [template1, template2, template3, template4, template5].find(t => t.id === config.templateId)!;
    const sections = generateAuditResponses(template, config.passRate);
    let totalEarned = 0, totalMax = 0, passCount = 0, failCount = 0, naCount = 0;
    let hasCritical = false;
    sections.forEach(s => s.items.forEach(item => {
      if (item.response === 'na') { naCount++; return; }
      totalEarned += item.score;
      totalMax += item.maxScore;
      if (item.score === item.maxScore) passCount++; else { failCount++; if (item.critical) hasCritical = true; }
    }));
    const score = totalMax > 0 ? Math.round((totalEarned / totalMax) * 10000) / 100 : 0;
    const riskLevel = hasCritical ? 'Kritis' : score >= 90 ? 'Excellent' : score >= 80 ? 'Baik' : score >= 70 ? 'Perlu Perbaikan' : score >= 60 ? 'Buruk' : 'Kritis';
    audits.push({
      id: `a${idx + 1}`, referenceNumber: `AUD-2024-${String(idx + 1).padStart(4, '0')}`,
      facilityId: config.facilityId, facilityAreaId: config.facilityAreaId, templateId: config.templateId,
      templateName: template.name, templateVersion: template.version, auditorId: 'u2',
      auditDate: daysAgo(config.daysAgo), auditType: 'routine', status: config.status,
      sections, overallScore: score, riskLevel, hasCriticalFailure: hasCritical,
      passCount, failCount, naCount, notes: '',
      submittedAt: daysAgo(config.daysAgo - 1), reviewedAt: config.status !== 'submitted' ? daysAgo(config.daysAgo - 2) : undefined,
      approvedAt: config.status === 'approved' ? daysAgo(config.daysAgo - 3) : undefined,
      createdAt: daysAgo(config.daysAgo), updatedAt: daysAgo(config.daysAgo - 1),
    });
  });

  // Generate findings
  const findings: Finding[] = [];
  let fIdx = 0;
  audits.forEach(audit => {
    audit.sections.forEach(section => {
      section.items.forEach(item => {
        if (item.hasFinding && fIdx < 15) {
          const severity: any = item.critical ? 'critical' : Math.random() > 0.5 ? 'major' : 'minor';
          findings.push({
            id: `fd${++fIdx}`, auditId: audit.id, facilityId: audit.facilityId, facilityAreaId: audit.facilityAreaId,
            category: item.category, checklistItemId: item.itemId,
            title: `Temuan: ${item.question.substring(0, 50)}...`, description: `Tidak memenuhi standar pada item audit.`,
            severity, risk: item.critical ? 'Tinggi' : severity === 'major' ? 'Sedang' : 'Rendah',
            rootCause: 'Perlu investigasi lebih lanjut', evidence: '', status: Math.random() > 0.4 ? 'open' : 'in_progress',
            createdBy: 'u2', createdAt: audit.auditDate, updatedAt: audit.auditDate,
          });
        }
      });
    });
  });

  // Generate corrective actions
  const correctiveActions: CorrectiveAction[] = [];
  findings.slice(0, 15).forEach((finding, idx) => {
    const targetDays = idx < 5 ? -2 : idx < 10 ? 7 : 14;
    const status: any = idx < 3 ? 'overdue' : idx < 6 ? 'in_progress' : idx < 9 ? 'open' : idx < 12 ? 'submitted_verification' : 'closed';
    correctiveActions.push({
      id: `ca${idx + 1}`, findingId: finding.id, auditId: finding.auditId, facilityId: finding.facilityId,
      responsiblePersonId: 'u3', actionDescription: `Tindakan korektif untuk: ${finding.title}`,
      rootCause: finding.rootCause, preventiveAction: 'Implementasi prosedur pencegahan',
      targetDate: targetDays < 0 ? daysAgo(Math.abs(targetDays)) : daysFromNow(targetDays),
      completionDate: status === 'closed' || status === 'submitted_verification' ? daysAgo(1) : undefined,
      verificationDate: status === 'closed' ? daysAgo(0) : undefined,
      priority: finding.severity === 'critical' ? 'urgent' : finding.severity === 'major' ? 'high' : 'medium',
      status, verificationNotes: status === 'closed' ? 'Tindakan telah diverifikasi' : '',
      evidence: '', createdBy: 'u2', createdAt: finding.createdAt, updatedAt: daysAgo(0),
    });
  });

  // Schedules
  const schedules: AuditSchedule[] = [
    { id: 's1', farmId: 'f1', houseId: 'h1', templateId: 't1', auditorId: 'u2', scheduledDate: daysFromNow(7), auditType: 'routine', notes: 'Audit rutin bulanan', status: 'scheduled', createdAt: daysAgo(0), updatedAt: daysAgo(0) },
    { id: 's2', farmId: 'f2', houseId: 'h5', templateId: 't2', auditorId: 'u2', scheduledDate: daysFromNow(14), auditType: 'routine', notes: '', status: 'scheduled', createdAt: daysAgo(0), updatedAt: daysAgo(0) },
    { id: 's3', farmId: 'f3', houseId: 'h8', templateId: 't3', auditorId: 'u2', scheduledDate: daysFromNow(3), auditType: 'follow_up', notes: 'Follow up temuan sebelumnya', status: 'scheduled', createdAt: daysAgo(0), updatedAt: daysAgo(0) },
    { id: 's4', farmId: 'f1', houseId: 'h4', templateId: 't1', auditorId: 'u2', scheduledDate: daysAgo(2), auditType: 'biosecurity', notes: 'Audit biosecurity khusus', status: 'overdue', createdAt: daysAgo(10), updatedAt: daysAgo(0) },
  ];

  // Notifications
  const notifications: Notification[] = [
    { id: 'n1', userId: 'u1', type: 'audit_submitted', title: 'Audit Dikirim', message: 'Audit AUD-2024-0004 telah dikirim untuk review', read: false, link: '/audits/a4', createdAt: daysAgo(3) },
    { id: 'n2', userId: 'u1', type: 'critical_finding', title: 'Temuan Kritis', message: 'Temuan kritis pada audit Farm Alpha House 01', read: false, link: '/findings', createdAt: daysAgo(5) },
    { id: 'n3', userId: 'u1', type: 'overdue_action', title: 'Tindakan Korektif Overdue', message: '3 tindakan korektif melewati target tanggal', read: false, link: '/corrective-actions', createdAt: daysAgo(1) },
    { id: 'n4', userId: 'u1', type: 'upcoming_audit', title: 'Audit Mendatang', message: 'Audit terjadwal untuk Farm Gamma dalam 3 hari', read: true, link: '/calendar', createdAt: daysAgo(0) },
    { id: 'n5', userId: 'u1', type: 'verification_request', title: 'Permintaan Verifikasi', message: 'Tindakan korektif CA-004 menunggu verifikasi', read: true, link: '/corrective-actions', createdAt: daysAgo(1) },
  ];

  return { users, farms, houses, templates: [template1, template2, template3, template4, template5], audits, findings, correctiveActions, schedules, notifications };
}

export function initializeDemoData(): void {
  const initialized = localStorage.getItem('fams_initialized');
  if (initialized) return;
  const data = generateDemoData();
  localStorage.setItem('fams_users', JSON.stringify(data.users));
  localStorage.setItem('fams_farms', JSON.stringify(data.farms));
  localStorage.setItem('fams_houses', JSON.stringify(data.houses));
  localStorage.setItem('fams_templates', JSON.stringify(data.templates));
  localStorage.setItem('fams_audits', JSON.stringify(data.audits));
  localStorage.setItem('fams_findings', JSON.stringify(data.findings));
  localStorage.setItem('fams_correctiveActions', JSON.stringify(data.correctiveActions));
  localStorage.setItem('fams_schedules', JSON.stringify(data.schedules));
  localStorage.setItem('fams_notifications', JSON.stringify(data.notifications));
  localStorage.setItem('fams_masterData', JSON.stringify([]));
  localStorage.setItem('fams_initialized', 'true');
}

export function resetDemoData(): void {
  Object.keys(localStorage).filter(k => k.startsWith('fams_')).forEach(k => localStorage.removeItem(k));
  initializeDemoData();
}

export { CATEGORY_LABELS };
