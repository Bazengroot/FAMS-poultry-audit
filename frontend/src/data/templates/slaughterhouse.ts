// Slaughterhouse Audit Template - SH-PROD-V1.0
// Comprehensive audit template for slaughterhouse facilities

import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: MANAGEMENT & LEGAL COMPLIANCE (SH-01)
// ============================================================
const sh01_management = createSection({
  sectionCode: 'SH-01',
  name: 'Management & Legal Compliance',
  category: 'farm_management',
  description: 'Management structure and legal compliance',
  order: 1,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'SH-01-001',
      question: 'Apakah semua izin dan lisensi yang diperlukan tersedia dan valid?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi semua izin operasional, lingkungan, dan lisensi lainnya',
      complianceCriteria: ['Semua izin yang diperlukan teridentifikasi', 'Izin masih valid dan tidak expired', 'Izin ditampilkan atau tersedia untuk inspeksi', 'Dokumentasi izin lengkap'],
      evidenceRequirements: ['Permits and licenses', 'Registration certificates', 'Environmental permits'],
      referenceIds: ['ref-id-004'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'SH-01-002',
      question: 'Apakah struktur organisasi slaughterhouse terdokumentasi dengan jelas?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Periksa dokumentasi struktur organisasi dan pembagian tugas',
      complianceCriteria: ['Struktur organisasi terdokumentasi', 'Tugas dan tanggung jawab jelas', 'Hierarki pelaporan terdefinisi'],
      evidenceRequirements: ['Organization chart', 'Job descriptions'],
      referenceIds: ['ref-sni-006'],
      severity: 'minor',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 2: FACILITY LAYOUT & ZONING (SH-02)
// ============================================================
const sh02_layout = createSection({
  sectionCode: 'SH-02',
  name: 'Facility Layout & Zoning',
  category: 'housing',
  description: 'Facility layout and zoning control',
  order: 2,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'SH-02-001',
      question: 'Apakah layout fasilitas mencegah kontaminasi silang antara area clean dan dirty?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi layout dan alur proses untuk mencegah kontaminasi silang',
      complianceCriteria: ['Area clean dan dirty terpisah', 'Alur proses satu arah', 'Tidak ada cross-flow', 'Zoning terdokumentasi'],
      evidenceRequirements: ['Facility layout', 'Zoning procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'SH-02-002',
      question: 'Apakah area receiving unggas hidup terpisah dari area processing?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pemisahan area receiving dan processing',
      complianceCriteria: ['Area receiving terpisah', 'Tidak ada kontaminasi silang', 'Personel tidak berpindah tanpa dekontaminasi'],
      evidenceRequirements: ['Facility layout', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 3: PERSONNEL HYGIENE (SH-03)
// ============================================================
const sh03_hygiene = createSection({
  sectionCode: 'SH-03',
  name: 'Personnel Hygiene',
  category: 'personnel',
  description: 'Personnel hygiene requirements',
  order: 3,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'SH-03-001',
      question: 'Apakah personel menggunakan pakaian kerja yang bersih dan sesuai?',
      category: 'personnel',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pakaian kerja dan APD personel',
      complianceCriteria: ['Pakaian kerja bersih', 'APD lengkap', 'Pakaian diganti rutin', 'Pakaian tidak digunakan di luar area kerja'],
      evidenceRequirements: ['PPE procedure', 'Site observation', 'Photographic evidence'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'SH-03-002',
      question: 'Apakah personel mencuci tangan sebelum masuk area processing?',
      category: 'personnel',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur cuci tangan',
      complianceCriteria: ['Fasilitas cuci tangan tersedia', 'Sabun dan air tersedia', 'Personel mencuci tangan', 'Prosedur cuci tangan terpasang'],
      evidenceRequirements: ['Hand washing procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 4: LIVE BIRD RECEIVING (SH-04)
// ============================================================
const sh04_receiving = createSection({
  sectionCode: 'SH-04',
  name: 'Live Bird Receiving',
  category: 'animal_health',
  description: 'Live bird receiving procedures',
  order: 4,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'SH-04-001',
      question: 'Apakah unggas diterima dengan prosedur yang benar?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur penerimaan unggas hidup',
      complianceCriteria: ['Prosedur penerimaan tertulis', 'Ungas diperiksa saat diterima', 'Dokumen pengiriman lengkap', 'Catatan penerimaan lengkap'],
      evidenceRequirements: ['Receiving procedure', 'Receiving records', 'Delivery documents'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'SH-04-002',
      question: 'Apakah identifikasi unggas (farm asal, batch) tercatat?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pencatatan identifikasi unggas',
      complianceCriteria: ['Farm asal tercatat', 'Batch number tercatat', 'Jumlah unggas tercatat', 'Tanggal penerimaan tercatat'],
      evidenceRequirements: ['Receiving records', 'Traceability records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 5: ANTE-MORTEM INSPECTION (SH-05)
// ============================================================
const sh05_antemortem = createSection({
  sectionCode: 'SH-05',
  name: 'Ante-Mortem Inspection',
  category: 'animal_health',
  description: 'Ante-mortem inspection procedures',
  order: 5,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'SH-05-001',
      question: 'Apakah ante-mortem inspection dilakukan oleh dokter hewan atau personel terlatih?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pelaksanaan ante-mortem inspection',
      complianceCriteria: ['Ante-mortem inspection dilakukan', 'Dilakukan oleh personel berwenang', 'Ungas sakit diidentifikasi', 'Ungas sakit dipisahkan'],
      evidenceRequirements: ['Ante-mortem inspection records', 'Veterinary records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'SH-05-002',
      question: 'Apakah unggas yang tidak layak diproses dipisahkan?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pemisahan unggas tidak layak',
      complianceCriteria: ['Unggas tidak layak diidentifikasi', 'Unggas tidak layak dipisahkan', 'Catatan pemisahan lengkap', 'Penanganan sesuai prosedur'],
      evidenceRequirements: ['Rejection records', 'Separation records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 6: STUNNING (SH-06)
// ============================================================
const sh06_stunning = createSection({
  sectionCode: 'SH-06',
  name: 'Stunning',
  category: 'welfare',
  description: 'Stunning procedures',
  order: 6,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'SH-06-001',
      question: 'Apakah stunning dilakukan dengan prosedur yang benar?',
      category: 'welfare',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur stunning',
      complianceCriteria: ['Prosedur stunning tertulis', 'Stunning dilakukan dengan benar', 'Peralatan berfungsi baik', 'Personel terlatih'],
      evidenceRequirements: ['Stunning procedure', 'Equipment maintenance records', 'Site observation'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'SH-06-002',
      question: 'Apakah efektivitas stunning dimonitor?',
      category: 'welfare',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi monitoring efektivitas stunning',
      complianceCriteria: ['Efektivitas stunning dimonitor', 'Parameter monitoring terdefinisi', 'Catatan monitoring lengkap'],
      evidenceRequirements: ['Stunning effectiveness records', 'Monitoring records'],
      referenceIds: ['ref-woah-004'],
      severity: 'major',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 7: BLEEDING (SH-07)
// ============================================================
const sh07_bleeding = createSection({
  sectionCode: 'SH-07',
  name: 'Bleeding',
  category: 'animal_health',
  description: 'Bleeding procedures',
  order: 7,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'SH-07-001',
      question: 'Apakah bleeding dilakukan dengan prosedur yang benar?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur bleeding',
      complianceCriteria: ['Prosedur bleeding tertulis', 'Bleeding dilakukan dengan benar', 'Durasi bleeding sesuai', 'Peralatan tajam dan bersih'],
      evidenceRequirements: ['Bleeding procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 8: EVISCERATION (SH-08)
// ============================================================
const sh08_evisceration = createSection({
  sectionCode: 'SH-08',
  name: 'Evisceration',
  category: 'feed_management',
  description: 'Evisceration procedures',
  order: 8,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'SH-08-001',
      question: 'Apakah evisceration dilakukan dengan prosedur yang mencegah kontaminasi?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi prosedur evisceration',
      complianceCriteria: ['Prosedur evisceration tertulis', 'Kontaminasi usus dicegah', 'Peralatan bersih', 'Area evisceration bersih'],
      evidenceRequirements: ['Evisceration procedure', 'Site observation', 'Photographic evidence'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'SH-08-002',
      question: 'Apakah offal ditangani dengan prosedur yang benar?',
      category: 'feed_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi penanganan offal',
      complianceCriteria: ['Offal ditangani dengan benar', 'Offal edible dan inedible dipisahkan', 'Penanganan sesuai prosedur'],
      evidenceRequirements: ['Offal handling procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 9: CARCASS INSPECTION (SH-09)
// ============================================================
const sh09_inspection = createSection({
  sectionCode: 'SH-09',
  name: 'Carcass Inspection',
  category: 'animal_health',
  description: 'Post-mortem carcass inspection',
  order: 9,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'SH-09-001',
      question: 'Apakah post-mortem inspection dilakukan oleh dokter hewan atau personel terlatih?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pelaksanaan post-mortem inspection',
      complianceCriteria: ['Post-mortem inspection dilakukan', 'Dilakukan oleh personel berwenang', 'Karkas tidak layak diidentifikasi', 'Karkas tidak layak dipisahkan'],
      evidenceRequirements: ['Post-mortem inspection records', 'Veterinary records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'SH-09-002',
      question: 'Apakah karkas yang tidak layak dipisahkan dan ditangani dengan benar?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi penanganan karkas tidak layak',
      complianceCriteria: ['Karkas tidak layak diidentifikasi', 'Karkas tidak layak dipisahkan', 'Penanganan sesuai prosedur', 'Catatan lengkap'],
      evidenceRequirements: ['Rejection records', 'Condemned product records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 10: CHILLING (SH-10)
// ============================================================
const sh10_chilling = createSection({
  sectionCode: 'SH-10',
  name: 'Chilling',
  category: 'equipment',
  description: 'Carcass chilling procedures',
  order: 10,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'SH-10-001',
      question: 'Apakah suhu chilling dimonitor dan dicatat?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi monitoring suhu chilling',
      complianceCriteria: ['Suhu chilling dimonitor', 'Suhu dicatat rutin', 'Suhu sesuai spesifikasi', 'Deviasi ditindaklanjuti'],
      evidenceRequirements: ['Temperature monitoring records', 'Chilling records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'SH-10-002',
      question: 'Apakah peralatan chilling dimaintain dengan baik?',
      category: 'equipment',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi maintenance peralatan chilling',
      complianceCriteria: ['Peralatan chilling berfungsi baik', 'Maintenance dilakukan rutin', 'Catatan maintenance lengkap'],
      evidenceRequirements: ['Equipment maintenance records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 11: CROSS-CONTAMINATION PREVENTION (SH-11)
// ============================================================
const sh11_contamination = createSection({
  sectionCode: 'SH-11',
  name: 'Cross-Contamination Prevention',
  category: 'feed_management',
  description: 'Cross-contamination prevention',
  order: 11,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'SH-11-001',
      question: 'Apakah prosedur pencegahan kontaminasi silang diimplementasi?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi pencegahan kontaminasi silang',
      complianceCriteria: ['Prosedur pencegahan kontaminasi tertulis', 'Peralatan dipisahkan', 'Personel tidak berpindah tanpa dekontaminasi', 'Area clean dan dirty terpisah'],
      evidenceRequirements: ['Cross-contamination prevention procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 12: SANITATION (SH-12)
// ============================================================
const sh12_sanitation = createSection({
  sectionCode: 'SH-12',
  name: 'Cleaning & Sanitation',
  category: 'sanitation',
  description: 'Cleaning and sanitation procedures',
  order: 12,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'SH-12-001',
      question: 'Apakah jadwal cleaning dan sanitation terdokumentasi dan diimplementasi?',
      category: 'sanitation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi jadwal dan implementasi cleaning/sanitation',
      complianceCriteria: ['Jadwal cleaning terdokumentasi', 'Cleaning dilakukan sesuai jadwal', 'Bahan cleaning sesuai standar', 'Catatan cleaning lengkap'],
      evidenceRequirements: ['Cleaning schedule', 'Cleaning records', 'Sanitation records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'SH-12-002',
      question: 'Apakah efektivitas sanitation diverifikasi?',
      category: 'sanitation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi efektivitas sanitation',
      complianceCriteria: ['Efektivitas sanitation diverifikasi', 'Metode verifikasi valid', 'Hasil verifikasi sesuai standar'],
      evidenceRequirements: ['Sanitation verification records', 'Microbiological test results'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 13: HACCP (SH-13)
// ============================================================
const sh13_haccp = createSection({
  sectionCode: 'SH-13',
  name: 'HACCP & Food Safety',
  category: 'farm_management',
  description: 'HACCP and food safety management',
  order: 13,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'SH-13-001',
      question: 'Apakah sistem HACCP diimplementasi dengan efektif?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi implementasi sistem HACCP',
      complianceCriteria: ['Sistem HACCP terdokumentasi', 'CCP diidentifikasi', 'Critical limit ditetapkan', 'Monitoring CCP dilakukan'],
      evidenceRequirements: ['HACCP plan', 'CCP monitoring records', 'HACCP team records'],
      referenceIds: ['ref-codex-001'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'SH-13-002',
      question: 'Apakah CCP dimonitor sesuai prosedur?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi monitoring CCP',
      complianceCriteria: ['CCP dimonitor sesuai frekuensi', 'Parameter monitoring sesuai', 'Deviasi diidentifikasi', 'Tindakan korektif dilakukan'],
      evidenceRequirements: ['CCP monitoring records', 'Deviation records', 'Corrective action records'],
      referenceIds: ['ref-codex-001'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 14: TRACEABILITY (SH-14)
// ============================================================
const sh14_traceability = createSection({
  sectionCode: 'SH-14',
  name: 'Traceability',
  category: 'documentation',
  description: 'Product traceability system',
  order: 14,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'SH-14-001',
      question: 'Apakah sistem traceability memungkinkan penelusuran dari farm asal hingga produk jadi?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Uji kemampuan traceability',
      complianceCriteria: ['Sistem traceability tersedia', 'Unggas dapat ditelusuri ke farm asal', 'Produk dapat ditelusuri ke batch', 'Catatan traceability lengkap'],
      evidenceRequirements: ['Traceability system', 'Traceability records', 'Traceability test'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 15: WASTE MANAGEMENT (SH-15)
// ============================================================
const sh15_waste = createSection({
  sectionCode: 'SH-15',
  name: 'Waste & By-Product Handling',
  category: 'environment',
  description: 'Waste and by-product handling',
  order: 15,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'SH-15-001',
      question: 'Apakah limbah dan by-product ditangani dengan prosedur yang benar?',
      category: 'environment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi penanganan limbah dan by-product',
      complianceCriteria: ['Prosedur penanganan limbah tertulis', 'Limbah dipisahkan dengan benar', 'Limbah dibuang sesuai regulasi', 'Catatan penanganan lengkap'],
      evidenceRequirements: ['Waste management procedure', 'Waste disposal records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 16: WORKER SAFETY (SH-16)
// ============================================================
const sh16_safety = createSection({
  sectionCode: 'SH-16',
  name: 'Worker Safety',
  category: 'personnel',
  description: 'Worker safety and emergency preparedness',
  order: 16,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'SH-16-001',
      question: 'Apakah program K3 (Keselamatan dan Kesehatan Kerja) diimplementasi?',
      category: 'personnel',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi implementasi program K3',
      complianceCriteria: ['Program K3 terdokumentasi', 'APD disediakan dan digunakan', 'Training K3 dilakukan', 'Insiden dicatat dan diinvestigasi'],
      evidenceRequirements: ['K3 program', 'Training records', 'Incident records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    })
  ]
});

// ============================================================
// SECTION 17: CAPA & DOCUMENTATION (SH-17)
// ============================================================
const sh17_capa = createSection({
  sectionCode: 'SH-17',
  name: 'CAPA & Documentation',
  category: 'farm_management',
  description: 'Corrective actions and documentation',
  order: 17,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'SH-17-001',
      question: 'Apakah sistem CAPA diimplementasi dengan efektif?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi implementasi sistem CAPA',
      complianceCriteria: ['Sistem CAPA terdokumentasi', 'CAPA diidentifikasi dan didokumentasi', 'Root cause analysis dilakukan', 'Efektivitas CAPA diverifikasi'],
      evidenceRequirements: ['CAPA procedure', 'CAPA records', 'Root cause analysis records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    }),
    createQuestion({
      questionCode: 'SH-17-002',
      question: 'Apakah dokumentasi slaughterhouse terkontrol dengan baik?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kontrol dokumentasi',
      complianceCriteria: ['Sistem dokumentasi terdokumentasi', 'Dokumen terkontrol versi', 'Rekaman disimpan dengan aman', 'Rekaman dapat diakses saat diperlukan'],
      evidenceRequirements: ['Document control procedure', 'Document master list', 'Record retention schedule'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    })
  ]
});

// Create the complete template
export const SLAUGHTERHOUSE_TEMPLATE: AuditTemplate = {
  id: 'template-sh-prod-v1',
  code: 'SH-PROD-V1.0',
  name: 'Slaughterhouse Audit',
  description: 'Comprehensive audit template for slaughterhouse facilities covering management, live bird handling, processing, food safety, and traceability',
  facilityTypes: ['slaughterhouse'],
  departmentId: 'dept5', // Processing Department
  auditCategory: 'processing',
  references: [
    {
      id: 'ref-sh-001',
      code: 'SNI 7388:2009',
      title: 'Pedoman Cara Produksi Pakan Ternak yang Baik',
      organization: 'BSN',
      year: '2009',
      status: 'valid',
      sourceType: 'standard',
      verificationStatus: 'verified',
      country: 'Indonesia',
      language: 'id'
    },
    {
      id: 'ref-sh-002',
      code: 'Codex CXC 1-1969',
      title: 'General Principles of Food Hygiene',
      organization: 'Codex Alimentarius',
      year: '1969',
      status: 'valid',
      sourceType: 'standard',
      verificationStatus: 'verified',
      country: 'International',
      language: 'en'
    },
    {
      id: 'ref-sh-003',
      code: 'WOAH Terrestrial Code Ch. 7.5',
      title: 'Welfare of Broiler Chickens',
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
    sh01_management,
    sh02_layout,
    sh03_hygiene,
    sh04_receiving,
    sh05_antemortem,
    sh06_stunning,
    sh07_bleeding,
    sh08_evisceration,
    sh09_inspection,
    sh10_chilling,
    sh11_contamination,
    sh12_sanitation,
    sh13_haccp,
    sh14_traceability,
    sh15_waste,
    sh16_safety,
    sh17_capa
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 32,
  estimatedDuration: 480, // 8 hours
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['slaughterhouse', 'processing', 'food-safety', 'haccp', 'animal-welfare'],
  isPublic: true
};
