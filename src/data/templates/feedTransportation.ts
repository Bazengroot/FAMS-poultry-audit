// Feed Transportation Audit Template - FT-PROD-V1.1
// Enhanced facility-specific audit template for feed transportation operations
// Version 1.1 - Enhanced with transportation-specific operational controls

import { AuditTemplate } from '../../types';
import { createSection, createQuestion } from './templateHelpers';

// ============================================================
// SECTION 1: VEHICLE SUITABILITY & CLEANLINESS (FT-01)
// ============================================================
const ft01_vehicle = createSection({
  sectionCode: 'FT-01',
  name: 'Vehicle Suitability & Cleanliness',
  category: 'equipment',
  description: 'Vehicle suitability for feed transport and cleanliness',
  order: 1,
  weight: 1.5,
  items: [
    createQuestion({
      questionCode: 'FT-01-001',
      question: 'Apakah kendaraan sesuai untuk transportasi pakan dan dalam kondisi baik?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa kendaraan sesuai untuk transportasi pakan dan dalam kondisi baik',
      complianceCriteria: ['Vehicle suitable for feed transport', 'Vehicle in good condition', 'No structural damage', 'Vehicle clean'],
      evidenceRequirements: ['Vehicle inspection records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FT-01-002',
      question: 'Apakah kendaraan dibersihkan sebelum loading pakan?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa kendaraan dibersihkan sebelum loading pakan untuk mencegah kontaminasi',
      complianceCriteria: ['Vehicle cleaned before loading', 'Cleaning documented', 'No residue from previous cargo', 'Vehicle suitable'],
      evidenceRequirements: ['Cleaning records', 'Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'FT-01-003',
      question: 'Apakah previous cargo diidentifikasi dan tidak menyebabkan kontaminasi?',
      category: 'equipment',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa previous cargo diidentifikasi dan tidak menyebabkan kontaminasi',
      complianceCriteria: ['Previous cargo identified', 'No contamination risk', 'Vehicle suitable', 'Cleaning adequate'],
      evidenceRequirements: ['Cargo records', 'Cleaning records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 3
    }),
    createQuestion({
      questionCode: 'FT-01-004',
      question: 'Apakah loading area dalam kondisi baik dan bebas kontaminasi?',
      category: 'equipment',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa loading area dalam kondisi baik dan bebas kontaminasi',
      complianceCriteria: ['Loading area clean', 'No contamination sources', 'Area well-maintained', 'Proper housekeeping'],
      evidenceRequirements: ['Site observation'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 4
    })
  ]
});

// ============================================================
// SECTION 2: LOADING PROCEDURES (FT-02)
// ============================================================
const ft02_loading = createSection({
  sectionCode: 'FT-02',
  name: 'Loading Procedures',
  category: 'feed_management',
  description: 'Feed loading procedures and controls',
  order: 2,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FT-02-001',
      question: 'Apakah product identity dan batch/lot diverifikasi saat loading?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa product identity dan batch/lot diverifikasi saat loading',
      complianceCriteria: ['Product identity verified', 'Batch/lot verified', 'Quantity verified', 'Loading documented'],
      evidenceRequirements: ['Loading records', 'Product labels'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FT-02-002',
      question: 'Apakah quantity verification dilakukan saat loading?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa quantity verification dilakukan saat loading',
      complianceCriteria: ['Quantity verified', 'Loading documented', 'Discrepancy reported', 'Records complete'],
      evidenceRequirements: ['Loading records', 'Weighing records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'FT-02-003',
      question: 'Apakah packaging integrity dipertahankan saat loading?',
      category: 'feed_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa packaging integrity dipertahankan saat loading',
      complianceCriteria: ['Packaging intact', 'No damage during loading', 'Loading procedures followed', 'Prevent damage'],
      evidenceRequirements: ['Site observation', 'Loading records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 3: TRANSPORT & PRODUCT PROTECTION (FT-03)
// ============================================================
const ft03_transport = createSection({
  sectionCode: 'FT-03',
  name: 'Transport & Product Protection',
  category: 'feed_management',
  description: 'Product protection during transport',
  order: 3,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FT-03-001',
      question: 'Apakah product protection diimplementasi selama transportasi?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa product protection diimplementasi selama transportasi',
      complianceCriteria: ['Product protection implemented', 'Packaging intact', 'Prevent contamination', 'Transport conditions suitable'],
      evidenceRequirements: ['Site observation', 'Transport records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FT-03-002',
      question: 'Apakah contamination prevention diimplementasi selama transportasi?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa contamination prevention diimplementasi selama transportasi',
      complianceCriteria: ['Contamination prevention implemented', 'Vehicle clean', 'Prevent contamination', 'Transport conditions suitable'],
      evidenceRequirements: ['Site observation', 'Transport records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'FT-03-003',
      question: 'Apakah delay management diimplementasi untuk mencegah product damage?',
      category: 'feed_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa delay management diimplementasi untuk mencegah product damage',
      complianceCriteria: ['Delay management implemented', 'Prevent product damage', 'Transport conditions suitable', 'Records documented'],
      evidenceRequirements: ['Transport records', 'Delay records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 4: DELIVERY & RECEIVING (FT-04)
// ============================================================
const ft04_delivery = createSection({
  sectionCode: 'FT-04',
  name: 'Delivery & Receiving',
  category: 'feed_management',
  description: 'Delivery and receiving verification',
  order: 4,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FT-04-001',
      question: 'Apakah receiving verification dilakukan saat delivery?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa receiving verification dilakukan saat delivery',
      complianceCriteria: ['Receiving verification done', 'Product identity verified', 'Quantity verified', 'Receiving documented'],
      evidenceRequirements: ['Receiving records', 'Delivery records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FT-04-002',
      question: 'Apakah quantity dan product identity diverifikasi saat receiving?',
      category: 'feed_management',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa quantity dan product identity diverifikasi saat receiving',
      complianceCriteria: ['Quantity verified', 'Product identity verified', 'Receiving documented', 'Records complete'],
      evidenceRequirements: ['Receiving records', 'Delivery records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'FT-04-003',
      question: 'Apakah discrepancy handling diimplementasi saat receiving?',
      category: 'feed_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa discrepancy handling diimplementasi saat receiving',
      complianceCriteria: ['Discrepancy handling implemented', 'Discrepancy reported', 'Corrective action taken', 'Records documented'],
      evidenceRequirements: ['Discrepancy records', 'Corrective action records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 5: HYGIENE & CLEANING (FT-05)
// ============================================================
const ft05_hygiene = createSection({
  sectionCode: 'FT-05',
  name: 'Hygiene & Cleaning',
  category: 'sanitation',
  description: 'Vehicle hygiene and cleaning procedures',
  order: 5,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FT-05-001',
      question: 'Apakah jadwal cleaning kendaraan terdokumentasi dan diimplementasi?',
      category: 'sanitation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa jadwal cleaning kendaraan terdokumentasi dan diimplementasi',
      complianceCriteria: ['Cleaning schedule documented', 'Cleaning implemented', 'Cleaning records documented', 'Vehicle clean'],
      evidenceRequirements: ['Cleaning schedule', 'Cleaning records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FT-05-002',
      question: 'Apakah cleaning effectiveness diverifikasi?',
      category: 'sanitation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa cleaning effectiveness diverifikasi',
      complianceCriteria: ['Cleaning effectiveness verified', 'Vehicle clean', 'No contamination', 'Records documented'],
      evidenceRequirements: ['Cleaning records', 'Inspection records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'FT-05-003',
      question: 'Apakah cleaning records disimpan dengan baik?',
      category: 'sanitation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa cleaning records disimpan dengan baik',
      complianceCriteria: ['Cleaning records stored', 'Records accessible', 'Records complete', 'Records maintained'],
      evidenceRequirements: ['Cleaning records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 6: TRACEABILITY (FT-06)
// ============================================================
const ft06_traceability = createSection({
  sectionCode: 'FT-06',
  name: 'Traceability',
  category: 'documentation',
  description: 'Vehicle, driver, and batch traceability',
  order: 6,
  weight: 1.4,
  items: [
    createQuestion({
      questionCode: 'FT-06-001',
      question: 'Apakah vehicle identification dan driver terdokumentasi?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa vehicle identification dan driver terdokumentasi',
      complianceCriteria: ['Vehicle identification documented', 'Driver documented', 'Records complete'],
      evidenceRequirements: ['Vehicle records', 'Driver records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 1
    }),
    createQuestion({
      questionCode: 'FT-06-002',
      question: 'Apakah batch/lot traceability dari origin hingga destination dapat ditelusuri?',
      category: 'documentation',
      weight: 3,
      critical: true,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa batch/lot traceability dari origin hingga destination dapat ditelusuri',
      complianceCriteria: ['Origin traceable', 'Destination traceable', 'Batch/lot traceable', 'Traceability records complete'],
      evidenceRequirements: ['Traceability records', 'Dispatch records', 'Receiving records'],
      referenceIds: ['ref-sni-006'],
      severity: 'critical',
      order: 2
    }),
    createQuestion({
      questionCode: 'FT-06-003',
      question: 'Apakah dispatch time dan receipt time dicatat?',
      category: 'documentation',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa dispatch time dan receipt time dicatat',
      complianceCriteria: ['Dispatch time recorded', 'Receipt time recorded', 'Records complete'],
      evidenceRequirements: ['Dispatch records', 'Receiving records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// ============================================================
// SECTION 7: EMERGENCY PROCEDURES (FT-07)
// ============================================================
const ft07_emergency = createSection({
  sectionCode: 'FT-07',
  name: 'Emergency Procedures',
  category: 'farm_management',
  description: 'Emergency response procedures for transportation',
  order: 7,
  weight: 1.3,
  items: [
    createQuestion({
      questionCode: 'FT-07-001',
      question: 'Apakah prosedur emergency untuk vehicle breakdown terdokumentasi?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa prosedur emergency untuk vehicle breakdown terdokumentasi',
      complianceCriteria: ['Vehicle breakdown procedure documented', 'Emergency procedures available', 'Personnel trained', 'Records documented'],
      evidenceRequirements: ['Emergency procedures', 'Training records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 1
    }),
    createQuestion({
      questionCode: 'FT-07-002',
      question: 'Apakah prosedur emergency untuk accident terdokumentasi?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa prosedur emergency untuk accident terdokumentasi',
      complianceCriteria: ['Accident procedure documented', 'Emergency procedures available', 'Personnel trained', 'Records documented'],
      evidenceRequirements: ['Emergency procedures', 'Training records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 2
    }),
    createQuestion({
      questionCode: 'FT-07-003',
      question: 'Apakah prosedur emergency untuk contamination terdokumentasi?',
      category: 'farm_management',
      weight: 2,
      critical: false,
      responseType: 'pass_fail',
      guidance: 'Verifikasi bahwa prosedur emergency untuk contamination terdokumentasi',
      complianceCriteria: ['Contamination procedure documented', 'Emergency procedures available', 'Personnel trained', 'Records documented'],
      evidenceRequirements: ['Emergency procedures', 'Training records'],
      referenceIds: ['ref-sni-006'],
      severity: 'major',
      order: 3
    })
  ]
});

// Create the complete template
export const FEED_TRANSPORTATION_TEMPLATE: AuditTemplate = {
  id: 'template-ft-prod-v1',
  code: 'FT-PROD-V1.1',
  name: 'Feed Transportation Audit',
  description: 'Enhanced facility-specific audit template for feed transportation operations covering vehicle suitability, loading, transport, delivery, hygiene, traceability, and emergency procedures',
  facilityTypes: ['logistics'],
  departmentId: 'dept8', // Logistics Department
  auditCategory: 'transportation',
  references: [
    {
      id: 'ref-ft-001',
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
    ft01_vehicle,
    ft02_loading,
    ft03_transport,
    ft04_delivery,
    ft05_hygiene,
    ft06_traceability,
    ft07_emergency
  ],
  createdBy: 'u1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  totalQuestions: 22,
  estimatedDuration: 180, // 3 hours
  scoringConfiguration: {
    passThreshold: 80,
    criticalWeight: 3,
    majorWeight: 2,
    minorWeight: 1
  },
  tags: ['transportation', 'feed', 'logistics', 'vehicle', 'traceability'],
  isPublic: true
};
