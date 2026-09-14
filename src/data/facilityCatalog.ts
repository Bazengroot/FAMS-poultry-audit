// Facility Catalog - Complete Poultry Enterprise Facility Types
// This catalog defines all facility types in the poultry enterprise value chain

export interface FacilityCategory {
  code: string;
  name: string;
  description: string;
  facilities: FacilityDefinition[];
}

export interface FacilityDefinition {
  code: string;
  name: string;
  description: string;
  category: string;
  typicalDepartments: string[];
  keyRisks: string[];
  regulatoryFocus: string[];
}

export const FACILITY_CATALOG: FacilityCategory[] = [
  {
    code: 'PRODUCTION',
    name: 'Production',
    description: 'Live bird production facilities',
    facilities: [
      {
        code: 'BF',
        name: 'Broiler Farm',
        description: 'Commercial broiler production facility for meat-type chickens',
        category: 'PRODUCTION',
        typicalDepartments: ['Production', 'Operations'],
        keyRisks: ['Biosecurity', 'Animal Health', 'Feed Quality', 'Environmental Control'],
        regulatoryFocus: ['Animal Welfare', 'Food Safety', 'Environmental Compliance']
      },
      {
        code: 'PS',
        name: 'Parent Stock / Breeder Farm',
        description: 'Breeding facility for parent stock producing hatching eggs',
        category: 'PRODUCTION',
        typicalDepartments: ['Breeding', 'Production'],
        keyRisks: ['Biosecurity', 'Genetic Integrity', 'Egg Quality', 'Fertility'],
        regulatoryFocus: ['Animal Welfare', 'Breeding Standards', 'Biosecurity']
      },
      {
        code: 'LF',
        name: 'Layer Farm',
        description: 'Commercial layer production facility for egg-laying hens',
        category: 'PRODUCTION',
        typicalDepartments: ['Production', 'Operations'],
        keyRisks: ['Biosecurity', 'Egg Quality', 'Animal Health', 'Welfare'],
        regulatoryFocus: ['Animal Welfare', 'Egg Safety', 'Environmental Compliance']
      },
      {
        code: 'PL',
        name: 'Pullet Farm',
        description: 'Rearing facility for young hens before transfer to layer farms',
        category: 'PRODUCTION',
        typicalDepartments: ['Production', 'Operations'],
        keyRisks: ['Biosecurity', 'Growth Uniformity', 'Vaccination', 'Welfare'],
        regulatoryFocus: ['Animal Welfare', 'Vaccination Standards']
      },
      {
        code: 'GP',
        name: 'Grandparent / Breeding Facility',
        description: 'Primary breeding facility for grandparent stock',
        category: 'PRODUCTION',
        typicalDepartments: ['Breeding', 'Genetics'],
        keyRisks: ['Biosecurity', 'Genetic Purity', 'Disease Control'],
        regulatoryFocus: ['Breeding Standards', 'Biosecurity', 'Genetic Integrity']
      }
    ]
  },
  {
    code: 'HATCHERY',
    name: 'Hatchery',
    description: 'Egg incubation and chick production facilities',
    facilities: [
      {
        code: 'HAT',
        name: 'Hatchery',
        description: 'Facility for incubating hatching eggs and producing day-old chicks',
        category: 'HATCHERY',
        typicalDepartments: ['Hatchery', 'Production'],
        keyRisks: ['Biosecurity', 'Incubation Conditions', 'Chick Quality', 'Sanitation'],
        regulatoryFocus: ['Animal Welfare', 'Hatchery Standards', 'Biosecurity']
      },
      {
        code: 'HER',
        name: 'Hatching Egg Receiving / Storage',
        description: 'Facility for receiving and storing hatching eggs before incubation',
        category: 'HATCHERY',
        typicalDepartments: ['Hatchery', 'Logistics'],
        keyRisks: ['Egg Quality', 'Storage Conditions', 'Contamination'],
        regulatoryFocus: ['Egg Handling Standards', 'Storage Standards']
      }
    ]
  },
  {
    code: 'FEED',
    name: 'Feed',
    description: 'Feed manufacturing and storage facilities',
    facilities: [
      {
        code: 'FM',
        name: 'Feed Mill',
        description: 'Facility for manufacturing poultry feed from raw materials',
        category: 'FEED',
        typicalDepartments: ['Feed Production', 'Operations'],
        keyRisks: ['Feed Safety', 'Contamination', 'Formulation Accuracy', 'Mycotoxins'],
        regulatoryFocus: ['Feed Safety', 'GMP', 'HACCP', 'Labeling']
      },
      {
        code: 'RMW',
        name: 'Raw Material Warehouse',
        description: 'Storage facility for feed raw materials',
        category: 'FEED',
        typicalDepartments: ['Warehouse', 'Feed Production'],
        keyRisks: ['Contamination', 'Pest Control', 'Moisture Control', 'FIFO'],
        regulatoryFocus: ['Storage Standards', 'Pest Control', 'Quality Control']
      },
      {
        code: 'FFW',
        name: 'Finished Feed Warehouse',
        description: 'Storage facility for finished feed products',
        category: 'FEED',
        typicalDepartments: ['Warehouse', 'Logistics'],
        keyRisks: ['Contamination', 'Pest Control', 'FEFO', 'Traceability'],
        regulatoryFocus: ['Storage Standards', 'Traceability', 'Quality Control']
      },
      {
        code: 'FT',
        name: 'Feed Transportation',
        description: 'Transportation service for feed delivery',
        category: 'FEED',
        typicalDepartments: ['Logistics', 'Transportation'],
        keyRisks: ['Contamination', 'Temperature Control', 'Delivery Accuracy'],
        regulatoryFocus: ['Transportation Standards', 'Food Safety']
      }
    ]
  },
  {
    code: 'PROCESSING',
    name: 'Processing',
    description: 'Meat processing and cold chain facilities',
    facilities: [
      {
        code: 'SLH',
        name: 'Slaughterhouse',
        description: 'Facility for slaughtering poultry and initial processing',
        category: 'PROCESSING',
        typicalDepartments: ['Processing', 'Operations'],
        keyRisks: ['Food Safety', 'Animal Welfare', 'Hygiene', 'HACCP'],
        regulatoryFocus: ['Food Safety', 'Animal Welfare', 'HACCP', 'Hygiene Standards']
      },
      {
        code: 'PROC',
        name: 'Poultry Processing Plant',
        description: 'Facility for further processing of poultry meat',
        category: 'PROCESSING',
        typicalDepartments: ['Processing', 'Production'],
        keyRisks: ['Food Safety', 'Contamination', 'Temperature Control', 'HACCP'],
        regulatoryFocus: ['Food Safety', 'HACCP', 'GMP', 'Labeling']
      },
      {
        code: 'FP',
        name: 'Further Processing Plant',
        description: 'Facility for value-added poultry products',
        category: 'PROCESSING',
        typicalDepartments: ['Processing', 'Production'],
        keyRisks: ['Food Safety', 'Contamination', 'Temperature Control', 'Allergens'],
        regulatoryFocus: ['Food Safety', 'HACCP', 'GMP', 'Labeling', 'Allergen Control']
      },
      {
        code: 'COLD',
        name: 'Cold Storage',
        description: 'Refrigerated/frozen storage facility for poultry products',
        category: 'PROCESSING',
        typicalDepartments: ['Warehouse', 'Logistics'],
        keyRisks: ['Temperature Control', 'Contamination', 'FEFO', 'Cold Chain'],
        regulatoryFocus: ['Cold Chain Standards', 'Food Safety', 'Storage Standards']
      },
      {
        code: 'FPW',
        name: 'Finished Product Warehouse',
        description: 'Storage facility for finished poultry products',
        category: 'PROCESSING',
        typicalDepartments: ['Warehouse', 'Logistics'],
        keyRisks: ['Temperature Control', 'Contamination', 'FEFO', 'Traceability'],
        regulatoryFocus: ['Storage Standards', 'Traceability', 'Food Safety']
      },
      {
        code: 'PDA',
        name: 'Product Dispatch Area',
        description: 'Area for loading and dispatching finished products',
        category: 'PROCESSING',
        typicalDepartments: ['Logistics', 'Warehouse'],
        keyRisks: ['Temperature Control', 'Loading Accuracy', 'Documentation'],
        regulatoryFocus: ['Dispatch Standards', 'Documentation', 'Traceability']
      }
    ]
  },
  {
    code: 'EGG',
    name: 'Egg Business',
    description: 'Egg handling and packaging facilities',
    facilities: [
      {
        code: 'EGG',
        name: 'Egg Grading Facility',
        description: 'Facility for grading and sorting eggs',
        category: 'EGG',
        typicalDepartments: ['Egg Processing', 'Production'],
        keyRisks: ['Egg Quality', 'Contamination', 'Grading Accuracy'],
        regulatoryFocus: ['Egg Grading Standards', 'Food Safety', 'Quality Control']
      },
      {
        code: 'EGP',
        name: 'Egg Packing Facility',
        description: 'Facility for packing eggs for distribution',
        category: 'EGG',
        typicalDepartments: ['Egg Processing', 'Packaging'],
        keyRisks: ['Egg Quality', 'Contamination', 'Packaging Integrity', 'Labeling'],
        regulatoryFocus: ['Egg Packing Standards', 'Labeling', 'Food Safety']
      },
      {
        code: 'EGS',
        name: 'Egg Storage Facility',
        description: 'Storage facility for table eggs',
        category: 'EGG',
        typicalDepartments: ['Warehouse', 'Egg Processing'],
        keyRisks: ['Temperature Control', 'Humidity Control', 'FEFO', 'Contamination'],
        regulatoryFocus: ['Egg Storage Standards', 'Temperature Control', 'Food Safety']
      }
    ]
  },
  {
    code: 'HEALTH',
    name: 'Animal Health / Laboratory',
    description: 'Veterinary and laboratory facilities',
    facilities: [
      {
        code: 'VET',
        name: 'Veterinary / Animal Health Facility',
        description: 'Veterinary clinic or animal health facility',
        category: 'HEALTH',
        typicalDepartments: ['Veterinary', 'Animal Health'],
        keyRisks: ['Biosecurity', 'Disease Control', 'Medication Management'],
        regulatoryFocus: ['Veterinary Standards', 'Medication Control', 'Biosecurity']
      },
      {
        code: 'LAB-D',
        name: 'Diagnostic Laboratory',
        description: 'Laboratory for disease diagnosis and monitoring',
        category: 'HEALTH',
        typicalDepartments: ['Laboratory', 'Veterinary'],
        keyRisks: ['Sample Integrity', 'Test Accuracy', 'Biosafety', 'Data Integrity'],
        regulatoryFocus: ['Laboratory Standards', 'Biosafety', 'Quality Control']
      },
      {
        code: 'LAB-Q',
        name: 'QC Laboratory',
        description: 'Quality control laboratory for feed, water, and product testing',
        category: 'HEALTH',
        typicalDepartments: ['Laboratory', 'Quality Assurance'],
        keyRisks: ['Sample Integrity', 'Test Accuracy', 'Calibration', 'Data Integrity'],
        regulatoryFocus: ['Laboratory Standards', 'Quality Control', 'Calibration Standards']
      }
    ]
  },
  {
    code: 'UTILITY',
    name: 'Utilities',
    description: 'Utility and support facilities',
    facilities: [
      {
        code: 'WT',
        name: 'Water Treatment Facility',
        description: 'Facility for treating water for poultry consumption',
        category: 'UTILITY',
        typicalDepartments: ['Utility', 'Operations'],
        keyRisks: ['Water Quality', 'Chemical Control', 'Equipment Maintenance'],
        regulatoryFocus: ['Water Quality Standards', 'Chemical Handling', 'Environmental Compliance']
      },
      {
        code: 'WS',
        name: 'Water Source / Reservoir',
        description: 'Water source or reservoir facility',
        category: 'UTILITY',
        typicalDepartments: ['Utility', 'Operations'],
        keyRisks: ['Water Quality', 'Contamination', 'Capacity'],
        regulatoryFocus: ['Water Quality Standards', 'Environmental Compliance']
      },
      {
        code: 'WWTP',
        name: 'Wastewater Treatment Plant / WWTP',
        description: 'Facility for treating wastewater',
        category: 'UTILITY',
        typicalDepartments: ['Utility', 'Environmental'],
        keyRisks: ['Effluent Quality', 'Chemical Control', 'Environmental Compliance'],
        regulatoryFocus: ['Effluent Standards', 'Environmental Compliance', 'Chemical Handling']
      },
      {
        code: 'CHEM',
        name: 'Chemical Storage',
        description: 'Storage facility for chemicals and hazardous materials',
        category: 'UTILITY',
        typicalDepartments: ['Warehouse', 'Utility'],
        keyRisks: ['Chemical Safety', 'Contamination', 'Spill Control', 'Access Control'],
        regulatoryFocus: ['Chemical Storage Standards', 'Safety Standards', 'Environmental Compliance']
      },
      {
        code: 'MW',
        name: 'Maintenance Workshop',
        description: 'Workshop for equipment maintenance and repair',
        category: 'UTILITY',
        typicalDepartments: ['Maintenance', 'Engineering'],
        keyRisks: ['Equipment Safety', 'Spare Parts', 'Calibration', 'Lockout/Tagout'],
        regulatoryFocus: ['Equipment Safety Standards', 'Maintenance Standards']
      },
      {
        code: 'UTIL',
        name: 'Boiler / Generator / Utility Facility',
        description: 'Facility for power generation and utilities',
        category: 'UTILITY',
        typicalDepartments: ['Utility', 'Engineering'],
        keyRisks: ['Equipment Safety', 'Emissions', 'Fuel Storage', 'Maintenance'],
        regulatoryFocus: ['Equipment Safety Standards', 'Emission Standards', 'Environmental Compliance']
      }
    ]
  },
  {
    code: 'SUPPORT',
    name: 'Enterprise Support',
    description: 'Support and administrative facilities',
    facilities: [
      {
        code: 'BIO',
        name: 'Biosecurity / Access Control Facility',
        description: 'Facility for biosecurity screening and access control',
        category: 'SUPPORT',
        typicalDepartments: ['Biosecurity', 'Security'],
        keyRisks: ['Biosecurity Breach', 'Access Control', 'Decontamination'],
        regulatoryFocus: ['Biosecurity Standards', 'Access Control Standards']
      },
      {
        code: 'LBT',
        name: 'Live Bird Transportation',
        description: 'Transportation service for live birds',
        category: 'SUPPORT',
        typicalDepartments: ['Logistics', 'Transportation'],
        keyRisks: ['Animal Welfare', 'Biosecurity', 'Temperature Control', 'Stress'],
        regulatoryFocus: ['Animal Welfare', 'Transportation Standards', 'Biosecurity']
      },
      {
        code: 'LBH',
        name: 'Live Bird Holding Area',
        description: 'Area for holding live birds before processing',
        category: 'SUPPORT',
        typicalDepartments: ['Processing', 'Operations'],
        keyRisks: ['Animal Welfare', 'Biosecurity', 'Temperature Control', 'Lairage Time'],
        regulatoryFocus: ['Animal Welfare', 'Lairage Standards', 'Biosecurity']
      },
      {
        code: 'OFF',
        name: 'Administration / Office Facility',
        description: 'Administrative office facility',
        category: 'SUPPORT',
        typicalDepartments: ['Administration', 'Management'],
        keyRisks: ['Data Security', 'Access Control', 'Record Keeping'],
        regulatoryFocus: ['Data Protection', 'Record Keeping Standards']
      }
    ]
  }
];

// Helper function to get facility definition by code
export function getFacilityByCode(code: string): FacilityDefinition | undefined {
  for (const category of FACILITY_CATALOG) {
    const facility = category.facilities.find(f => f.code === code);
    if (facility) return facility;
  }
  return undefined;
}

// Helper function to get all facility codes
export function getAllFacilityCodes(): string[] {
  const codes: string[] = [];
  for (const category of FACILITY_CATALOG) {
    for (const facility of category.facilities) {
      codes.push(facility.code);
    }
  }
  return codes;
}

// Helper function to get facilities by category
export function getFacilitiesByCategory(categoryCode: string): FacilityDefinition[] {
  const category = FACILITY_CATALOG.find(c => c.code === categoryCode);
  return category ? category.facilities : [];
}

// Total facility count
export const TOTAL_FACILITY_TYPES = getAllFacilityCodes().length;
