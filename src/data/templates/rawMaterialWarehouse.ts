// Raw Material Warehouse Audit Template - RMW-PROD-V1.1
// Enhanced facility-specific audit template for raw material warehouse facilities
// Version 1.1 - Enhanced with facility-specific operational controls

import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: RECEIVING & AUTHORIZATION (RMW-01)
// ============================================================
const rmw01_receiving = createSection({
  sectionCode: 'RMW-01',
  name: 'Receiving & Authorization',
  category: 'documentation',
  description: 'Material receiving authorization and documentation',
  order: 1,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'RMW-01-001',
      question: 'Apakah semua penerimaan bahan baku memiliki dokumen pengiriman yang lengkap dan valid?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi kelengkapan dokumen pengiriman termasuk delivery order, surat jalan, dan sertifikat analisis',
      complianceCriteria: ['Delivery order tersedia untuk setiap pengiriman', 'Surat jalan lengkap dengan detail material', 'Sertifikat analisis tersedia untuk bahan baku kritis', 'Dokumen diverifikasi sebelum penerimaan'],
      evidenceRequirements: ['Delivery order samples', 'Surat jalan documents', 'Certificate of Analysis'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'RMW-01-002',
      question: 'Apakah identifikasi supplier dan material dilakukan dengan benar saat penerimaan?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa supplier dan material diidentifikasi dengan benar dan sesuai dengan approved supplier list',
      complianceCriteria: ['Supplier terverifikasi dalam approved supplier list', 'Material sesuai dengan purchase order', 'Label material jelas dan lengkap', 'Batch/lot number tercatat'],
      evidenceRequirements: ['Approved supplier list', 'Purchase order', 'Material labels', 'Receiving records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'RMW-01-003',
      question: 'Apakah verifikasi kuantitas dan kondisi kemasan dilakukan saat penerimaan?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa kuantitas sesuai dengan dokumen dan kondisi kemasan tidak rusak',
      complianceCriteria: ['Kuantitas diverifikasi dengan timbangan atau perhitungan', 'Kondisi kemasan diperiksa', 'Kemasan rusak ditolak atau dicatat', 'Discrepancy dilaporkan'],
      evidenceRequirements: ['Weighing records', 'Inspection reports', 'Rejection records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 3
    }),
    createQuestion({
      questionCode: 'RMW-01-004',
      question: 'Apakah tanda-tanda kontaminasi atau kerusakan pada bahan baku diperiksa?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa bahan baku diperiksa untuk tanda-tanda kontaminasi, kerusakan, atau infestasi',
      complianceCriteria: ['Inspeksi visual dilakukan', 'Tanda kontaminasi diperiksa', 'Tanda kerusakan diperiksa', 'Tanda infestasi diperiksa'],
      evidenceRequirements: ['Inspection checklist', 'Photographic evidence', 'Rejection records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 4
    })
  ]
});

// ============================================================
// SECTION 2: SAMPLING & QC (RMW-02)
// ============================================================
const rmw02_sampling = createSection({
  sectionCode: 'RMW-02',
  name: 'Sampling & Quality Control',
  category: 'documentation',
  description: 'Material sampling and quality control release',
  order: 2,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'RMW-02-001',
      question: 'Apakah prosedur sampling bahan baku terdokumentasi dan diimplementasi?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa prosedur sampling terdokumentasi dan sampling dilakukan secara representative',
      complianceCriteria: ['Prosedur sampling terdokumentasi', 'Sampling dilakukan sesuai prosedur', 'Sample representative', 'Sample identification jelas'],
      evidenceRequirements: ['Sampling procedure', 'Sampling records', 'Sample labels'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'RMW-02-002',
      question: 'Apakah sample diidentifikasi dengan benar dan ditelusuri?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa sample diidentifikasi dengan batch number, tanggal sampling, dan lokasi',
      complianceCriteria: ['Sample label lengkap', 'Batch number tercatat', 'Tanggal sampling tercatat', 'Lokasi sampling tercatat'],
      evidenceRequirements: ['Sample labels', 'Sampling log'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'RMW-02-003',
      question: 'Apakah hasil QC tersedia sebelum material dirilis untuk penggunaan?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa hasil QC tersedia dan material hanya dirilis setelah QC approved',
      complianceCriteria: ['Hasil QC tersedia', 'Material hanya dirilis setelah approved', 'QC release documented', 'Rejected material segregated'],
      evidenceRequirements: ['QC reports', 'Release records', 'Rejection records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 3
    }),
    createQuestion({
      questionCode: 'RMW-02-004',
      question: 'Apakah material yang ditolak atau hold diisolasi dan ditandai dengan jelas?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa material yang ditolak atau hold diisolasi dan ditandai dengan jelas untuk mencegah penggunaan',
      complianceCriteria: ['Material rejected diisolasi', 'Material hold ditandai', 'Area quarantine jelas', 'Prevent accidental use'],
      evidenceRequirements: ['Quarantine area', 'Hold tags', 'Rejection records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 4
    })
  ]
});

// ============================================================
// SECTION 3: STORAGE & SEGREGATION (RMW-03)
// ============================================================
const rmw03_storage = createSection({
  sectionCode: 'RMW-03',
  name: 'Storage & Segregation',
  category: 'housing',
  description: 'Material storage conditions and segregation',
  order: 3,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'RMW-03-001',
      question: 'Apakah bahan baku disimpan dengan segregasi yang sesuai untuk mencegah kontaminasi silang?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa bahan baku disimpan dengan segregasi yang sesuai untuk mencegah kontaminasi silang antar bahan',
      complianceCriteria: ['Bahan baku berbeda disimpan terpisah', 'Segregation sesuai standar', 'Cross-contamination dicegah', 'Storage zoning jelas'],
      evidenceRequirements: ['Storage layout', 'Segregation procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'RMW-03-002',
      question: 'Apakah praktik penyimpanan pallet dan stacking dilakukan dengan benar?',
      category: 'housing',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa pallet dan stacking dilakukan dengan benar untuk mencegah kerusakan dan memastikan stabilitas',
      complianceCriteria: ['Pallet dalam kondisi baik', 'Stacking stabil', 'Height limit sesuai', 'No damaged stacking'],
      evidenceRequirements: ['Site observation', 'Photographic evidence'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'RMW-03-003',
      question: 'Apakah kondisi lantai dan dinding gudang dalam kondisi baik?',
      category: 'housing',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa lantai dan dinding gudang dalam kondisi baik, tidak ada kerusakan atau kebocoran',
      complianceCriteria: ['Lantai dalam kondisi baik', 'Dinding dalam kondisi baik', 'Tidak ada kerusakan', 'Tidak ada kebocoran'],
      evidenceRequirements: ['Site observation', 'Photographic evidence'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    }),
    createQuestion({
      questionCode: 'RMW-03-004',
      question: 'Apakah clearance dari dinding dan lantai dijaga untuk mencegah kontaminasi?',
      category: 'housing',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa clearance dari dinding dan lantai dijaga untuk mencegah kontaminasi dan memudahkan pembersihan',
      complianceCriteria: ['Clearance dari dinding dijaga', 'Clearance dari lantai dijaga', 'Prevent kontaminasi', 'Facilitate cleaning'],
      evidenceRequirements: ['Site observation', 'Photographic evidence'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 4
    })
  ]
});

// ============================================================
// SECTION 4: FIFO/FEFO & INVENTORY (RMW-04)
// ============================================================
const rmw04_fifo = createSection({
  sectionCode: 'RMW-04',
  name: 'FIFO/FEFO & Inventory Control',
  category: 'documentation',
  description: 'Stock rotation and inventory management',
  order: 4,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'RMW-04-001',
      question: 'Apakah sistem FIFO/FEFO diimplementasi untuk stock rotation?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa sistem FIFO/FEFO diimplementasi untuk memastikan material lama digunakan lebih dulu',
      complianceCriteria: ['Sistem FIFO/FEFO terdokumentasi', 'Material lama digunakan lebih dulu', 'Date identification jelas', 'Stock rotation implemented'],
      evidenceRequirements: ['FIFO/FEFO procedure', 'Stock rotation records', 'Date labels'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'RMW-04-002',
      question: 'Apakah lot/batch identification dan date identification jelas pada setiap material?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa lot/batch identification dan date identification jelas pada setiap material',
      complianceCriteria: ['Lot/batch number jelas', 'Date identification jelas', 'Label lengkap', 'Traceability maintained'],
      evidenceRequirements: ['Material labels', 'Inventory records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'RMW-04-003',
      question: 'Apakah stock reconciliation dilakukan secara periodik?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa stock reconciliation dilakukan secara periodik untuk memastikan akurasi inventory',
      complianceCriteria: ['Stock reconciliation dilakukan periodically', 'Discrepancy diinvestigasi', 'Inventory records accurate', 'Reconciliation documented'],
      evidenceRequirements: ['Stock reconciliation records', 'Inventory records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    }),
    createQuestion({
      questionCode: 'RMW-04-004',
      question: 'Apakah material yang expired atau aging stock diidentifikasi dan dikontrol?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa material yang expired atau aging stock diidentifikasi dan dikontrol untuk mencegah penggunaan',
      complianceCriteria: ['Expired material diidentifikasi', 'Aging stock diidentifikasi', 'Material expired diisolasi', 'Prevent accidental use'],
      evidenceRequirements: ['Expired material list', 'Aging stock report', 'Disposal records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 4
    })
  ]
});

// ============================================================
// SECTION 5: ENVIRONMENTAL CONTROL (RMW-05)
// ============================================================
const rmw05_environmental = createSection({
  sectionCode: 'RMW-05',
  name: 'Environmental Control',
  category: 'housing',
  description: 'Temperature and humidity control',
  order: 5,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'RMW-05-001',
      question: 'Apakah kondisi lingkungan gudang (temperature, humidity) dimonitor dan dicatat?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa kondisi lingkungan gudang dimonitor dan dicatat untuk memastikan kualitas material',
      complianceCriteria: ['Temperature dimonitor', 'Humidity dimonitor', 'Monitoring dilakukan periodically', 'Records dicatat'],
      evidenceRequirements: ['Temperature logs', 'Humidity logs', 'Monitoring records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'RMW-05-002',
      question: 'Apakah ventilasi gudang adequate untuk mencegah kondensasi dan kontaminasi?',
      category: 'housing',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa ventilasi gudang adequate untuk mencegah kondensasi dan kontaminasi',
      complianceCriteria: ['Ventilasi adequate', 'Kondensasi dicegah', 'Kontaminasi dicegah', 'Airflow adequate'],
      evidenceRequirements: ['Site observation', 'Ventilation records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'RMW-05-003',
      question: 'Apakah atap dan dinding gudang bebas dari kebocoran dan water ingress?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa atap dan dinding gudang bebas dari kebocoran dan water ingress',
      complianceCriteria: ['Atap bebas kebocoran', 'Dinding bebas kebocoran', 'Tidak ada water ingress', 'Roof condition maintained'],
      evidenceRequirements: ['Site observation', 'Photographic evidence'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 6: PEST CONTROL (RMW-06)
// ============================================================
const rmw06_pest = createSection({
  sectionCode: 'RMW-06',
  name: 'Pest Control',
  category: 'sanitation',
  description: 'Pest prevention and control',
  order: 6,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'RMW-06-001',
      question: 'Apakah program pest control terdokumentasi dan diimplementasi?',
      category: 'sanitation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa program pest control terdokumentasi dan diimplementasi secara efektif',
      complianceCriteria: ['Program pest control terdokumentasi', 'Program diimplementasi', 'Monitoring dilakukan', 'Records dicatat'],
      evidenceRequirements: ['Pest control program', 'Monitoring records', 'Pest control records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'RMW-06-002',
      question: 'Apakah bait station dan pest control device dikontrol dan dimonitor?',
      category: 'sanitation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa bait station dan pest control device dikontrol dan dimonitor secara periodik',
      complianceCriteria: ['Bait station dikontrol', 'Pest control device dimonitor', 'Monitoring dilakukan periodically', 'Records dicatat'],
      evidenceRequirements: ['Bait station map', 'Monitoring records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'RMW-06-003',
      question: 'Apakah tanda-tanda infestasi pest diperiksa dan ditindaklanjuti?',
      category: 'sanitation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa tanda-tanda infestasi pest diperiksa dan ditindaklanjuti dengan segera',
      complianceCriteria: ['Tanda infestasi diperiksa', 'Infestasi ditindaklanjuti', 'Corrective action dilakukan', 'Records dicatat'],
      evidenceRequirements: ['Inspection records', 'Corrective action records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 7: SANITATION & CLEANING (RMW-07)
// ============================================================
const rmw07_sanitation = createSection({
  sectionCode: 'RMW-07',
  name: 'Sanitation & Cleaning',
  category: 'sanitation',
  description: 'Warehouse cleaning and sanitation',
  order: 7,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'RMW-07-001',
      question: 'Apakah jadwal cleaning gudang terdokumentasi dan diimplementasi?',
      category: 'sanitation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa jadwal cleaning gudang terdokumentasi dan diimplementasi secara efektif',
      complianceCriteria: ['Jadwal cleaning terdokumentasi', 'Cleaning diimplementasi', 'Cleaning effectiveness verified', 'Records dicatat'],
      evidenceRequirements: ['Cleaning schedule', 'Cleaning records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'RMW-07-002',
      question: 'Apakah akumulasi debu dan waste di gudang dikontrol?',
      category: 'sanitation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa akumulasi debu dan waste di gudang dikontrol untuk mencegah kontaminasi',
      complianceCriteria: ['Akumulasi debu dikontrol', 'Waste dikontrol', 'Prevent kontaminasi', 'Housekeeping maintained'],
      evidenceRequirements: ['Site observation', 'Cleaning records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'RMW-07-003',
      question: 'Apakah spill management procedure terdokumentasi dan diimplementasi?',
      category: 'sanitation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa spill management procedure terdokumentasi dan diimplementasi',
      complianceCriteria: ['Spill management procedure terdokumentasi', 'Spill ditindaklanjuti', 'Spill kit tersedia', 'Records dicatat'],
      evidenceRequirements: ['Spill management procedure', 'Spill records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 8: MYCOTOXIN & BIOLOGICAL RISK (RMW-08)
// ============================================================
const rmw08_mycotoxin = createSection({
  sectionCode: 'RMW-08',
  name: 'Mycotoxin & Biological Risk',
  category: 'documentation',
  description: 'Mycotoxin and biological risk control',
  order: 8,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'RMW-08-001',
      question: 'Apakah bahan baku berisiko tinggi terhadap mycotoxin diidentifikasi dan dikontrol?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa bahan baku berisiko tinggi terhadap mycotoxin diidentifikasi dan dikontrol',
      complianceCriteria: ['High-risk materials diidentifikasi', 'Mycotoxin control implemented', 'Monitoring dilakukan', 'Records dicatat'],
      evidenceRequirements: ['Risk assessment', 'Mycotoxin testing records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'RMW-08-002',
      question: 'Apakah kadar moisture bahan baku dimonitor dan dikontrol?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa kadar moisture bahan baku dimonitor dan dikontrol untuk mencegah pertumbuhan mold',
      complianceCriteria: ['Moisture dimonitor', 'Moisture controlled', 'Prevent mold growth', 'Records dicatat'],
      evidenceRequirements: ['Moisture testing records', 'Storage conditions records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'RMW-08-003',
      question: 'Apakah tanda-tanda mold atau kontaminasi biologis diperiksa?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa tanda-tanda mold atau kontaminasi biologis diperiksa dan ditindaklanjuti',
      complianceCriteria: ['Tanda mold diperiksa', 'Tanda kontaminasi biologis diperiksa', 'Contamination ditindaklanjuti', 'Records dicatat'],
      evidenceRequirements: ['Inspection records', 'Corrective action records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 9: CHEMICAL SEPARATION (RMW-09)
// ============================================================
const rmw09_chemical = createSection({
  sectionCode: 'RMW-09',
  name: 'Chemical & Non-feed Material Separation',
  category: 'housing',
  description: 'Prevention of contamination between feed and non-feed materials',
  order: 9,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'RMW-09-001',
      question: 'Apakah bahan baku pakan dipisahkan dari bahan kimia dan material non-pakan?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa bahan baku pakan dipisahkan dari bahan kimia dan material non-pakan untuk mencegah kontaminasi',
      complianceCriteria: ['Feed materials separated from chemicals', 'Non-feed materials separated', 'Prevent cross-contamination', 'Storage areas clearly marked'],
      evidenceRequirements: ['Storage layout', 'Site observation', 'Labeling records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'RMW-09-002',
      question: 'Apakah bahan kimia dan material maintenance disimpan di area terpisah?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa bahan kimia dan material maintenance disimpan di area terpisah dari bahan baku pakan',
      complianceCriteria: ['Chemicals stored separately', 'Maintenance materials stored separately', 'Separate storage areas', 'Prevent contamination'],
      evidenceRequirements: ['Storage layout', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 10: TRACEABILITY (RMW-10)
// ============================================================
const rmw10_traceability = createSection({
  sectionCode: 'RMW-10',
  name: 'Traceability',
  category: 'documentation',
  description: 'Material traceability from supplier to usage',
  order: 10,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'RMW-10-001',
      question: 'Apakah traceability material dari supplier hingga penggunaan dapat ditelusuri?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa traceability material dari supplier hingga penggunaan dapat ditelusuri',
      complianceCriteria: ['Supplier traceable', 'Lot/batch traceable', 'Receiving date traceable', 'Storage location traceable'],
      evidenceRequirements: ['Traceability records', 'Receiving records', 'Inventory records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'RMW-10-002',
      question: 'Apakah stock movement dan release/rejection dicatat dengan lengkap?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa stock movement dan release/rejection dicatat dengan lengkap',
      complianceCriteria: ['Stock movement recorded', 'Release recorded', 'Rejection recorded', 'Records complete'],
      evidenceRequirements: ['Stock movement records', 'Release records', 'Rejection records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 11: INVENTORY MANAGEMENT (RMW-11)
// ============================================================
const rmw11_inventory = createSection({
  sectionCode: 'RMW-11',
  name: 'Inventory Management',
  category: 'documentation',
  description: 'Stock records and physical reconciliation',
  order: 11,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'RMW-11-001',
      question: 'Apakah stock records akurat dan diupdate secara periodik?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa stock records akurat dan diupdate secara periodik',
      complianceCriteria: ['Stock records accurate', 'Stock records updated', 'Physical reconciliation done', 'Discrepancy investigated'],
      evidenceRequirements: ['Stock records', 'Reconciliation records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    }),
    createQuestion({
      questionCode: 'RMW-11-002',
      question: 'Apakah physical stock reconciliation dilakukan secara periodik?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa physical stock reconciliation dilakukan secara periodik',
      complianceCriteria: ['Physical reconciliation done periodically', 'Discrepancy investigated', 'Corrective action taken', 'Records documented'],
      evidenceRequirements: ['Reconciliation records', 'Corrective action records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'RMW-11-003',
      question: 'Apakah damaged stock dan obsolete stock diidentifikasi dan dikontrol?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa damaged stock dan obsolete stock diidentifikasi dan dikontrol',
      complianceCriteria: ['Damaged stock identified', 'Obsolete stock identified', 'Stock controlled', 'Disposition documented'],
      evidenceRequirements: ['Damaged stock records', 'Obsolete stock records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 12: EMERGENCY PROCEDURES (RMW-12)
// ============================================================
const rmw12_emergency = createSection({
  sectionCode: 'RMW-12',
  name: 'Emergency Procedures',
  category: 'farm_management',
  description: 'Emergency response procedures',
  order: 12,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'RMW-12-001',
      question: 'Apakah prosedur emergency untuk spill, kontaminasi, dan infestasi pest terdokumentasi?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa prosedur emergency untuk spill, kontaminasi, dan infestasi pest terdokumentasi',
      complianceCriteria: ['Spill procedure documented', 'Contamination procedure documented', 'Pest infestation procedure documented', 'Emergency procedures available'],
      evidenceRequirements: ['Emergency procedures', 'Emergency response records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    }),
    createQuestion({
      questionCode: 'RMW-12-002',
      question: 'Apakah prosedur emergency untuk water ingress dan fire terdokumentasi?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa prosedur emergency untuk water ingress dan fire terdokumentasi',
      complianceCriteria: ['Water ingress procedure documented', 'Fire procedure documented', 'Emergency procedures available', 'Emergency equipment available'],
      evidenceRequirements: ['Emergency procedures', 'Emergency equipment records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    })
  ]
});

// ============================================================
// SECTION 13: DOCUMENTATION & RECORDS (RMW-13)
// ============================================================
const rmw13_documentation = createSection({
  sectionCode: 'RMW-13',
  name: 'Documentation & Records',
  category: 'documentation',
  description: 'SOP and records management',
  order: 13,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'RMW-13-001',
      question: 'Apakah SOP untuk receiving, storage, dan inventory terdokumentasi?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa SOP untuk receiving, storage, dan inventory terdokumentasi',
      complianceCriteria: ['Receiving SOP documented', 'Storage SOP documented', 'Inventory SOP documented', 'SOPs available'],
      evidenceRequirements: ['SOP documents'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    }),
    createQuestion({
      questionCode: 'RMW-13-002',
      question: 'Apakah receiving records, QC records, dan inventory records disimpan dengan baik?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa receiving records, QC records, dan inventory records disimpan dengan baik',
      complianceCriteria: ['Receiving records stored', 'QC records stored', 'Inventory records stored', 'Records accessible'],
      evidenceRequirements: ['Receiving records', 'QC records', 'Inventory records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'RMW-13-003',
      question: 'Apakah cleaning records dan pest control records disimpan dengan baik?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa cleaning records dan pest control records disimpan dengan baik',
      complianceCriteria: ['Cleaning records stored', 'Pest control records stored', 'Records accessible', 'Records complete'],
      evidenceRequirements: ['Cleaning records', 'Pest control records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// Create the complete template
export const RAW_MATERIAL_WAREHOUSE_TEMPLATE: AuditTemplate = {
  id: 'template-rmw-prod-v1',
  code: 'RMW-PROD-V1.1',
  name: 'Raw Material Warehouse Audit',
  description: 'Enhanced facility-specific audit template for raw material warehouse facilities covering receiving, sampling, storage, FIFO/FEFO, environmental control, pest control, sanitation, mycotoxin control, chemical separation, traceability, inventory, emergency procedures, and documentation',
  facilityTypes: ['warehouse'],
  departmentId: 'dept7', // Warehouse Department
  auditCategory: 'warehouse',
  references: [
    {
      id: 'ref-rmw-001',
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
  version: '1.1',
  effectiveDate: new Date().toISOString(),
  status: 'active',
  sections: [
    rmw01_receiving,
    rmw02_sampling,
    rmw03_storage,
    rmw04_fifo,
    rmw05_environmental,
    rmw06_pest,
    rmw07_sanitation,
    rmw08_mycotoxin,
    rmw09_chemical,
    rmw10_traceability,
    rmw11_inventory,
    rmw12_emergency,
    rmw13_documentation
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 30,
  estimatedDuration: 300, // 5 hours
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['warehouse', 'raw-material', 'storage', 'traceability', 'mycotoxin', 'pest-control'],
  isPublic: true
};
