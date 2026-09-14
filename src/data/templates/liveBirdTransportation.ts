// Live Bird Transportation Audit Template - LBT-PROD-V1.1
// Enhanced facility-specific audit template for live bird transportation operations
// Version 1.1 - Enhanced with animal welfare and biosecurity focus

import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: PRE-LOADING & BIRD HEALTH (LBT-01)
// ============================================================
const lbt01_preloading = createSection({
  sectionCode: 'LBT-01',
  name: 'Pre-Loading & Bird Health',
  category: 'animal_health',
  description: 'Bird health status and loading preparation',
  order: 1,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'LBT-01-001',
      question: 'Apakah bird health status diverifikasi sebelum loading?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa bird health status diverifikasi sebelum loading untuk memastikan bird fit for transport',
      complianceCriteria: ['Bird health status verified', 'Birds fit for transport', 'Sick birds segregated', 'Health records documented'],
      evidenceRequirements: ['Health records', 'Site observation'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'LBT-01-002',
      question: 'Apakah loading preparation dilakukan dengan benar?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa loading preparation dilakukan dengan benar untuk mencegah stress dan injury',
      complianceCriteria: ['Loading preparation done', 'Equipment ready', 'Personnel trained', 'Prevent stress and injury'],
      evidenceRequirements: ['Loading procedure', 'Site observation'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'LBT-01-003',
      question: 'Apakah catching crew terlatih dan kompeten?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa catching crew terlatih dan kompeten dalam handling bird',
      complianceCriteria: ['Catching crew trained', 'Crew competent', 'Training records available', 'Handling procedures followed'],
      evidenceRequirements: ['Training records', 'Site observation'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 2: CATCHING & HANDLING (LBT-02)
// ============================================================
const lbt02_catching = createSection({
  sectionCode: 'LBT-02',
  name: 'Catching & Handling',
  category: 'animal_health',
  description: 'Bird catching and handling procedures',
  order: 2,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'LBT-02-001',
      question: 'Apakah bird handling dilakukan dengan cara yang meminimalkan injury?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa bird handling dilakukan dengan cara yang meminimalkan injury',
      complianceCriteria: ['Bird handling minimizes injury', 'Handling procedures followed', 'No rough handling', 'Prevent injury'],
      evidenceRequirements: ['Site observation', 'Handling procedures'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'LBT-02-002',
      question: 'Apakah injury prevention diimplementasi saat catching?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa injury prevention diimplementasi saat catching',
      complianceCriteria: ['Injury prevention implemented', 'Proper handling techniques', 'Prevent wing and leg injuries', 'Monitoring done'],
      evidenceRequirements: ['Site observation', 'Injury records'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'LBT-02-003',
      question: 'Apakah injured birds diidentifikasi dan ditangani dengan benar?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa injured birds diidentifikasi dan ditangani dengan benar',
      complianceCriteria: ['Injured birds identified', 'Injured birds handled properly', 'Treatment provided', 'Records documented'],
      evidenceRequirements: ['Injury records', 'Treatment records'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 3: CRATES & LOADING DENSITY (LBT-03)
// ============================================================
const lbt03_crates = createSection({
  sectionCode: 'LBT-03',
  name: 'Crates & Loading Density',
  category: 'equipment',
  description: 'Crate condition and loading density',
  order: 3,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'LBT-03-001',
      question: 'Apakah crates dalam kondisi baik dan bersih?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa crates dalam kondisi baik dan bersih untuk mencegah injury dan contamination',
      complianceCriteria: ['Crates in good condition', 'Crates clean', 'No damaged crates', 'Prevent injury and contamination'],
      evidenceRequirements: ['Site observation', 'Crate inspection records'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'LBT-03-002',
      question: 'Apakah loading density sesuai untuk mencegah stress dan injury?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa loading density sesuai untuk mencegah stress dan injury',
      complianceCriteria: ['Loading density appropriate', 'Prevent stress', 'Prevent injury', 'Adequate space'],
      evidenceRequirements: ['Site observation', 'Loading density records'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'LBT-03-003',
      question: 'Apakah ventilation dalam crate adequate?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa ventilation dalam crate adequate untuk mencegah heat stress',
      complianceCriteria: ['Ventilation adequate', 'Prevent heat stress', 'Adequate airflow', 'Monitor bird condition'],
      evidenceRequirements: ['Site observation', 'Ventilation records'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 4: VEHICLE SUITABILITY & BIOSECURITY (LBT-04)
// ============================================================
const lbt04_vehicle = createSection({
  sectionCode: 'LBT-04',
  name: 'Vehicle Suitability & Biosecurity',
  category: 'equipment',
  description: 'Vehicle suitability and biosecurity during transport',
  order: 4,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'LBT-04-001',
      question: 'Apakah vehicle suitable untuk transportasi unggas hidup?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa vehicle suitable untuk transportasi unggas hidup',
      complianceCriteria: ['Vehicle suitable', 'Ventilation adequate', 'Protection from weather', 'Vehicle in good condition'],
      evidenceRequirements: ['Vehicle inspection records', 'Site observation'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'LBT-04-002',
      question: 'Apakah vehicle dibersihkan dan didesinfeksi sebelum digunakan?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa vehicle dibersihkan dan didesinfeksi sebelum digunakan untuk mencegah cross-contamination',
      complianceCriteria: ['Vehicle cleaned', 'Vehicle disinfected', 'Cleaning documented', 'Prevent cross-contamination'],
      evidenceRequirements: ['Cleaning records', 'Disinfection records'],
      referenceIds: ['ref-woah-001'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'LBT-04-003',
      question: 'Apakah biosecurity diimplementasi selama transportasi?',
      category: 'biosecurity',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa biosecurity diimplementasi selama transportasi untuk mencegah disease transmission',
      complianceCriteria: ['Biosecurity implemented', 'Vehicle disinfected', 'Prevent disease transmission', 'Biosecurity records documented'],
      evidenceRequirements: ['Biosecurity procedure', 'Biosecurity records'],
      referenceIds: ['ref-woah-001'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 5: TRANSPORT & MONITORING (LBT-05)
// ============================================================
const lbt05_transport = createSection({
  sectionCode: 'LBT-05',
  name: 'Transport & Monitoring',
  category: 'animal_health',
  description: 'Transport conditions and bird monitoring',
  order: 5,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'LBT-05-001',
      question: 'Apakah travel duration records dicatat dan dimonitor?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa travel duration records dicatat dan dimonitor untuk memastikan bird welfare',
      complianceCriteria: ['Travel duration recorded', 'Duration monitored', 'Prevent prolonged transport', 'Records documented'],
      evidenceRequirements: ['Travel records', 'Duration records'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'LBT-05-002',
      question: 'Apakah environmental conditions dimonitor selama transportasi?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa environmental conditions dimonitor selama transportasi untuk memastikan bird welfare',
      complianceCriteria: ['Environmental conditions monitored', 'Temperature monitored', 'Humidity monitored', 'Records documented'],
      evidenceRequirements: ['Environmental monitoring records', 'Temperature records'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'LBT-05-003',
      question: 'Apakah mortality dimonitor dan dicatat selama transportasi?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa mortality dimonitor dan dicatat selama transportasi',
      complianceCriteria: ['Mortality monitored', 'Mortality recorded', 'Causes investigated', 'Records documented'],
      evidenceRequirements: ['Mortality records', 'Investigation records'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 6: ARRIVAL & UNLOADING (LBT-06)
// ============================================================
const lbt06_arrival = createSection({
  sectionCode: 'LBT-06',
  name: 'Arrival & Unloading',
  category: 'animal_health',
  description: 'Bird arrival and unloading procedures',
  order: 6,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'LBT-06-001',
      question: 'Apakah unloading dilakukan dengan cara yang meminimalkan stress dan injury?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa unloading dilakukan dengan cara yang meminimalkan stress dan injury',
      complianceCriteria: ['Unloading minimizes stress', 'Unloading minimizes injury', 'Proper handling', 'Prevent injury'],
      evidenceRequirements: ['Site observation', 'Handling procedures'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'LBT-06-002',
      question: 'Apakah mortality recording dilakukan saat arrival?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa mortality recording dilakukan saat arrival',
      complianceCriteria: ['Mortality recorded at arrival', 'DOA recorded', 'Injured birds recorded', 'Records documented'],
      evidenceRequirements: ['Mortality records', 'Arrival records'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'LBT-06-003',
      question: 'Apakah DOA (Dead on Arrival) evaluation dilakukan?',
      category: 'animal_health',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa DOA (Dead on Arrival) evaluation dilakukan',
      complianceCriteria: ['DOA evaluation done', 'Causes investigated', 'Corrective action taken', 'Records documented'],
      evidenceRequirements: ['DOA records', 'Investigation records'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 7: BIOSECURITY & CROSS-CONTAMINATION (LBT-07)
// ============================================================
const lbt07_biosecurity = createSection({
  sectionCode: 'LBT-07',
  name: 'Biosecurity & Cross-Contamination',
  category: 'biosecurity',
  description: 'Biosecurity and cross-contamination prevention',
  order: 7,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'LBT-07-001',
      question: 'Apakah vehicle cleaning dan disinfection dilakukan setelah setiap transport?',
      category: 'biosecurity',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa vehicle cleaning dan disinfection dilakukan setelah setiap transport untuk mencegah cross-contamination',
      complianceCriteria: ['Vehicle cleaned after transport', 'Vehicle disinfected', 'Cleaning documented', 'Prevent cross-contamination'],
      evidenceRequirements: ['Cleaning records', 'Disinfection records'],
      referenceIds: ['ref-woah-001'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'LBT-07-002',
      question: 'Apakah route/farm biosecurity diimplementasi?',
      category: 'biosecurity',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa route/farm biosecurity diimplementasi untuk mencegah disease transmission',
      complianceCriteria: ['Route biosecurity implemented', 'Farm biosecurity implemented', 'Prevent disease transmission', 'Biosecurity records documented'],
      evidenceRequirements: ['Biosecurity procedure', 'Biosecurity records'],
      referenceIds: ['ref-woah-001'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'LBT-07-003',
      question: 'Apakah cross-contamination prevention diimplementasi?',
      category: 'biosecurity',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa cross-contamination prevention diimplementasi',
      complianceCriteria: ['Cross-contamination prevention implemented', 'Vehicle cleaned', 'Prevent contamination', 'Records documented'],
      evidenceRequirements: ['Biosecurity procedure', 'Cleaning records'],
      referenceIds: ['ref-woah-001'],
      severity: 'critical',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 8: DOCUMENTATION & RECORDS (LBT-08)
// ============================================================
const lbt08_documentation = createSection({
  sectionCode: 'LBT-08',
  name: 'Documentation & Records',
  category: 'documentation',
  description: 'Transport documentation and records',
  order: 8,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'LBT-08-001',
      question: 'Apakah origin, destination, dan flock information terdokumentasi?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa origin, destination, dan flock information terdokumentasi',
      complianceCriteria: ['Origin documented', 'Destination documented', 'Flock information documented', 'Records complete'],
      evidenceRequirements: ['Transport documents', 'Flock records'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'LBT-08-002',
      question: 'Apakah date/time, vehicle, dan driver terdokumentasi?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa date/time, vehicle, dan driver terdokumentasi',
      complianceCriteria: ['Date/time documented', 'Vehicle documented', 'Driver documented', 'Records complete'],
      evidenceRequirements: ['Transport documents'],
      referenceIds: ['ref-woah-004'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'LBT-08-003',
      question: 'Apakah mortality dan incidents terdokumentasi?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa mortality dan incidents terdokumentasi',
      complianceCriteria: ['Mortality documented', 'Incidents documented', 'Records complete', 'Investigation documented'],
      evidenceRequirements: ['Mortality records', 'Incident records'],
      referenceIds: ['ref-woah-004'],
      severity: 'critical',
      order: 3
    })
  ]
});

// Create the complete template
export const LIVE_BIRD_TRANSPORTATION_TEMPLATE: AuditTemplate = {
  id: 'template-lbt-prod-v1',
  code: 'LBT-PROD-V1.1',
  name: 'Live Bird Transportation Audit',
  description: 'Enhanced facility-specific audit template for live bird transportation operations covering pre-loading, catching, crates, vehicle suitability, transport monitoring, arrival, biosecurity, and documentation',
  facilityTypes: ['logistics'],
  departmentId: 'dept8', // Logistics Department
  auditCategory: 'transportation',
  references: [
    {
      id: 'ref-lbt-001',
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
      id: 'ref-lbt-002',
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
  version: '1.1',
  effectiveDate: new Date().toISOString(),
  status: 'active',
  sections: [
    lbt01_preloading,
    lbt02_catching,
    lbt03_crates,
    lbt04_vehicle,
    lbt05_transport,
    lbt06_arrival,
    lbt07_biosecurity,
    lbt08_documentation
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 24,
  estimatedDuration: 240, // 4 hours
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['transportation', 'live-bird', 'animal-welfare', 'biosecurity', 'mortality'],
  isPublic: true
};
