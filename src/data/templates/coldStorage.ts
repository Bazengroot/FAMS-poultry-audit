// Cold Storage Audit Template - COLD-PROD-V1.1
// Enhanced facility-specific audit template for cold storage facilities
// Version 1.1 - Enhanced with cold-chain specific operational controls

import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: TEMPERATURE MONITORING & CONTROL (COLD-01)
// ============================================================
const cold01_temperature = createSection({
  sectionCode: 'COLD-01',
  name: 'Temperature Monitoring & Control',
  category: 'equipment',
  description: 'Temperature monitoring, recording, and control systems',
  order: 1,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'COLD-01-001',
      question: 'Apakah temperature monitoring system terkalibrasi dan berfungsi dengan baik?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa temperature monitoring system terkalibrasi dan berfungsi dengan baik',
      complianceCriteria: ['Temperature monitoring system calibrated', 'System functioning properly', 'Calibration records available', 'Monitoring continuous'],
      evidenceRequirements: ['Calibration records', 'Temperature logs', 'System maintenance records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'COLD-01-002',
      question: 'Apakah temperature dicatat secara continuous dan alarm system berfungsi?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa temperature dicatat secara continuous dan alarm system berfungsi',
      complianceCriteria: ['Temperature recorded continuously', 'Alarm system functioning', 'Alarm tested', 'Records available'],
      evidenceRequirements: ['Temperature logs', 'Alarm test records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'COLD-01-003',
      question: 'Apakah temperature excursion ditindaklanjuti dengan segera?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa temperature excursion ditindaklanjuti dengan segera',
      complianceCriteria: ['Temperature excursion identified', 'Excursion investigated', 'Corrective action taken', 'Records documented'],
      evidenceRequirements: ['Excursion records', 'Corrective action records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 3
    }),
    createQuestion({
      questionCode: 'COLD-01-004',
      question: 'Apakah sensor placement adequate untuk memastikan monitoring yang representative?',
      category: 'equipment',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa sensor placement adequate untuk memastikan monitoring yang representative',
      complianceCriteria: ['Sensor placement adequate', 'Representative monitoring', 'No hot spots', 'Coverage complete'],
      evidenceRequirements: ['Sensor placement map', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 4
    })
  ]
});

// ============================================================
// SECTION 2: REFRIGERATION EQUIPMENT (COLD-02)
// ============================================================
const cold02_equipment = createSection({
  sectionCode: 'COLD-02',
  name: 'Refrigeration Equipment',
  category: 'equipment',
  description: 'Refrigeration system and equipment maintenance',
  order: 2,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'COLD-02-001',
      question: 'Apakah refrigeration system dimaintain sesuai jadwal?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa refrigeration system dimaintain sesuai jadwal',
      complianceCriteria: ['Maintenance schedule followed', 'Maintenance documented', 'System functioning properly', 'No breakdowns'],
      evidenceRequirements: ['Maintenance records', 'Equipment maintenance records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'COLD-02-002',
      question: 'Apakah condenser dan evaporator dalam kondisi baik dan bersih?',
      category: 'equipment',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa condenser dan evaporator dalam kondisi baik dan bersih',
      complianceCriteria: ['Condenser in good condition', 'Evaporator in good condition', 'Components clean', 'No blockages'],
      evidenceRequirements: ['Site observation', 'Maintenance records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'COLD-02-003',
      question: 'Apakah defrost system berfungsi dengan baik?',
      category: 'equipment',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa defrost system berfungsi dengan baik',
      complianceCriteria: ['Defrost system functioning', 'Defrost cycle normal', 'No ice buildup', 'System effective'],
      evidenceRequirements: ['Defrost records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    }),
    createQuestion({
      questionCode: 'COLD-02-004',
      question: 'Apakah backup power system tersedia dan diuji?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa backup power system tersedia dan diuji',
      complianceCriteria: ['Backup power available', 'Backup power tested', 'Backup functioning', 'Test records available'],
      evidenceRequirements: ['Backup power records', 'Test records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 4
    })
  ]
});

// ============================================================
// SECTION 3: STORAGE & PRODUCT HANDLING (COLD-03)
// ============================================================
const cold03_storage = createSection({
  sectionCode: 'COLD-03',
  name: 'Storage & Product Handling',
  category: 'housing',
  description: 'Product storage and handling in cold storage',
  order: 3,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'COLD-03-001',
      question: 'Apakah product segregation diimplementasi dengan benar?',
      category: 'housing',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa product segregation diimplementasi dengan benar',
      complianceCriteria: ['Product segregation implemented', 'Different products separated', 'Clear labeling', 'Prevent cross-contamination'],
      evidenceRequirements: ['Storage layout', 'Segregation procedure', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'COLD-03-002',
      question: 'Apakah airflow adequate untuk memastikan temperature uniform?',
      category: 'housing',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa airflow adequate untuk memastikan temperature uniform',
      complianceCriteria: ['Airflow adequate', 'Temperature uniform', 'No hot spots', 'Air circulation good'],
      evidenceRequirements: ['Site observation', 'Temperature mapping'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'COLD-03-003',
      question: 'Apakah stacking dilakukan dengan benar untuk mencegah damage dan memastikan airflow?',
      category: 'housing',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa stacking dilakukan dengan benar untuk mencegah damage dan memastikan airflow',
      complianceCriteria: ['Stacking proper', 'No damage to product', 'Airflow maintained', 'Height limit maintained'],
      evidenceRequirements: ['Site observation', 'Stacking procedure'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 4: HYGIENE & SANITATION (COLD-04)
// ============================================================
const cold04_hygiene = createSection({
  sectionCode: 'COLD-04',
  name: 'Hygiene & Sanitation',
  category: 'sanitation',
  description: 'Cold storage hygiene and sanitation',
  order: 4,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'COLD-04-001',
      question: 'Apakah jadwal cleaning cold storage terdokumentasi dan diimplementasi?',
      category: 'sanitation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa jadwal cleaning cold storage terdokumentasi dan diimplementasi',
      complianceCriteria: ['Cleaning schedule documented', 'Cleaning implemented', 'Cleaning effectiveness verified', 'Records documented'],
      evidenceRequirements: ['Cleaning schedule', 'Cleaning records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'COLD-04-002',
      question: 'Apakah kondensasi dan mold di cold storage dikontrol?',
      category: 'sanitation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa kondensasi dan mold di cold storage dikontrol',
      complianceCriteria: ['Condensation controlled', 'Mold controlled', 'Prevent contamination', 'Sanitation maintained'],
      evidenceRequirements: ['Site observation', 'Sanitation records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'COLD-04-003',
      question: 'Apakah drains dalam kondisi baik dan bebas dari blockage?',
      category: 'sanitation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa drains dalam kondisi baik dan bebas dari blockage',
      complianceCriteria: ['Drains in good condition', 'Drains free from blockage', 'Drainage adequate', 'No water accumulation'],
      evidenceRequirements: ['Site observation', 'Drain maintenance records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 5: PRODUCT SAFETY & QUALITY (COLD-05)
// ============================================================
const cold05_safety = createSection({
  sectionCode: 'COLD-05',
  name: 'Product Safety & Quality',
  category: 'feed_management',
  description: 'Product safety and quality control',
  order: 5,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'COLD-05-001',
      question: 'Apakah temperature excursion ditindaklanjuti dengan product disposition yang sesuai?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa temperature excursion ditindaklanjuti dengan product disposition yang sesuai',
      complianceCriteria: ['Temperature excursion identified', 'Product disposition determined', 'Disposition documented', 'Product safety ensured'],
      evidenceRequirements: ['Excursion records', 'Disposition records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'COLD-05-002',
      question: 'Apakah quarantine area tersedia untuk product yang suspect?',
      category: 'feed_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa quarantine area tersedia untuk product yang suspect',
      complianceCriteria: ['Quarantine area available', 'Suspect product isolated', 'Clear labeling', 'Prevent accidental use'],
      evidenceRequirements: ['Quarantine area', 'Quarantine records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'COLD-05-003',
      question: 'Apakah damaged packaging diidentifikasi dan dikontrol?',
      category: 'feed_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa damaged packaging diidentifikasi dan dikontrol',
      complianceCriteria: ['Damaged packaging identified', 'Product controlled', 'Disposition documented', 'Prevent contamination'],
      evidenceRequirements: ['Damaged packaging records', 'Disposition records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 6: EMERGENCY PROCEDURES (COLD-06)
// ============================================================
const cold06_emergency = createSection({
  sectionCode: 'COLD-06',
  name: 'Emergency Procedures',
  category: 'farm_management',
  description: 'Emergency response procedures for cold storage',
  order: 6,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'COLD-06-001',
      question: 'Apakah prosedur emergency untuk refrigeration failure terdokumentasi?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa prosedur emergency untuk refrigeration failure terdokumentasi',
      complianceCriteria: ['Refrigeration failure procedure documented', 'Emergency procedures available', 'Personnel trained', 'Records documented'],
      evidenceRequirements: ['Emergency procedures', 'Training records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'COLD-06-002',
      question: 'Apakah prosedur emergency untuk power outage terdokumentasi?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa prosedur emergency untuk power outage terdokumentasi',
      complianceCriteria: ['Power outage procedure documented', 'Backup power available', 'Emergency procedures available', 'Records documented'],
      evidenceRequirements: ['Emergency procedures', 'Backup power records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'COLD-06-003',
      question: 'Apakah prosedur emergency untuk temperature excursion terdokumentasi?',
      category: 'farm_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa prosedur emergency untuk temperature excursion terdokumentasi',
      complianceCriteria: ['Temperature excursion procedure documented', 'Emergency procedures available', 'Product disposition procedure', 'Records documented'],
      evidenceRequirements: ['Emergency procedures', 'Product disposition records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 7: DOCUMENTATION & RECORDS (COLD-07)
// ============================================================
const cold07_documentation = createSection({
  sectionCode: 'COLD-07',
  name: 'Documentation & Records',
  category: 'documentation',
  description: 'Temperature logs, calibration, and maintenance records',
  order: 7,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'COLD-07-001',
      question: 'Apakah temperature logs disimpan dengan baik dan accessible?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa temperature logs disimpan dengan baik dan accessible',
      complianceCriteria: ['Temperature logs stored', 'Logs accessible', 'Records complete', 'Records maintained'],
      evidenceRequirements: ['Temperature logs'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    }),
    createQuestion({
      questionCode: 'COLD-07-002',
      question: 'Apakah calibration records untuk temperature monitoring system tersedia?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa calibration records untuk temperature monitoring system tersedia',
      complianceCriteria: ['Calibration records available', 'Calibration done periodically', 'Records complete', 'Records accessible'],
      evidenceRequirements: ['Calibration records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'COLD-07-003',
      question: 'Apakah maintenance records untuk refrigeration system tersedia?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa maintenance records untuk refrigeration system tersedia',
      complianceCriteria: ['Maintenance records available', 'Maintenance done according to schedule', 'Records complete', 'Records accessible'],
      evidenceRequirements: ['Maintenance records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// Create the complete template
export const COLD_STORAGE_TEMPLATE: AuditTemplate = {
  id: 'template-cold-prod-v1',
  code: 'COLD-PROD-V1.1',
  name: 'Cold Storage Audit',
  description: 'Enhanced facility-specific audit template for cold storage facilities covering temperature monitoring, refrigeration equipment, storage, hygiene, product safety, emergency procedures, and documentation',
  facilityTypes: ['warehouse'],
  departmentId: 'dept7', // Warehouse Department
  auditCategory: 'warehouse',
  references: [
    {
      id: 'ref-cold-001',
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
    cold01_temperature,
    cold02_equipment,
    cold03_storage,
    cold04_hygiene,
    cold05_safety,
    cold06_emergency,
    cold07_documentation
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 22,
  estimatedDuration: 240, // 4 hours
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['cold-storage', 'temperature-control', 'refrigeration', 'cold-chain', 'emergency'],
  isPublic: true
};
