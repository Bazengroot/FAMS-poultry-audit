// Template Catalog - Complete collection of all audit templates
// This catalog provides a centralized registry of all available templates

import { AuditTemplate } from '../types';
import { BROILER_FARM_TEMPLATE } from './templates/broilerFarm';
import { ENHANCED_BROILER_FARM_TEMPLATE } from './templates/broilerFarmEnhanced';
import { PARENT_STOCK_TEMPLATE } from './templates/parentStock';
import { LAYER_FARM_TEMPLATE } from './templates/layerFarm';
import { PULLET_FARM_TEMPLATE } from './templates/pulletFarm';
import { HATCHERY_TEMPLATE } from './templates/hatchery';
import { FEED_MILL_TEMPLATE } from './templates/feedMill';
import { RAW_MATERIAL_WAREHOUSE_TEMPLATE } from './templates/rawMaterialWarehouse';
import { FINISHED_FEED_WAREHOUSE_TEMPLATE } from './templates/finishedFeedWarehouse';
import { FINISHED_PRODUCT_WAREHOUSE_TEMPLATE } from './templates/finishedProductWarehouse';
import { COLD_STORAGE_TEMPLATE } from './templates/coldStorage';
import { FEED_TRANSPORTATION_TEMPLATE } from './templates/feedTransportation';
import { LIVE_BIRD_TRANSPORTATION_TEMPLATE } from './templates/liveBirdTransportation';
import { SLAUGHTERHOUSE_TEMPLATE } from './templates/slaughterhouse';
import { POULTRY_PROCESSING_PLANT_TEMPLATE } from './templates/poultryProcessingPlant';
import { FURTHER_PROCESSING_PLANT_TEMPLATE } from './templates/furtherProcessingPlant';
import { EGG_GRADING_TEMPLATE } from './templates/eggGrading';
import { EGG_PACKING_TEMPLATE } from './templates/eggPacking';
import { QC_LABORATORY_TEMPLATE } from './templates/qcLaboratory';
import { DIAGNOSTIC_LABORATORY_TEMPLATE } from './templates/diagnosticLaboratory';
import { GENERAL_WAREHOUSE_TEMPLATE } from './templates/generalWarehouse';
import { CHEMICAL_STORAGE_TEMPLATE } from './templates/chemicalStorage';
import { SPARE_PARTS_WAREHOUSE_TEMPLATE } from './templates/sparePartsWarehouse';
import { PRODUCT_DISPATCH_TEMPLATE } from './templates/productDispatch';
import { VETERINARY_FACILITY_TEMPLATE } from './templates/veterinaryFacility';
import { WATER_TREATMENT_TEMPLATE } from './templates/waterTreatment';
import { WATER_SOURCE_TEMPLATE } from './templates/waterSource';
import { WWTP_TEMPLATE } from './templates/wwtp';
import { MAINTENANCE_WORKSHOP_TEMPLATE } from './templates/maintenanceWorkshop';
import { BOILER_UTILITY_TEMPLATE } from './templates/boilerUtility';
import { BIOSECURITY_FACILITY_TEMPLATE } from './templates/biosecurityFacility';

// Import all templates
export const TEMPLATE_CATALOG: AuditTemplate[] = [
  BROILER_FARM_TEMPLATE,
  ENHANCED_BROILER_FARM_TEMPLATE,
  PARENT_STOCK_TEMPLATE,
  LAYER_FARM_TEMPLATE,
  PULLET_FARM_TEMPLATE,
  HATCHERY_TEMPLATE,
  FEED_MILL_TEMPLATE,
  RAW_MATERIAL_WAREHOUSE_TEMPLATE,
  FINISHED_FEED_WAREHOUSE_TEMPLATE,
  FINISHED_PRODUCT_WAREHOUSE_TEMPLATE,
  COLD_STORAGE_TEMPLATE,
  FEED_TRANSPORTATION_TEMPLATE,
  LIVE_BIRD_TRANSPORTATION_TEMPLATE,
  SLAUGHTERHOUSE_TEMPLATE,
  POULTRY_PROCESSING_PLANT_TEMPLATE,
  FURTHER_PROCESSING_PLANT_TEMPLATE,
  EGG_GRADING_TEMPLATE,
  EGG_PACKING_TEMPLATE,
  QC_LABORATORY_TEMPLATE,
  DIAGNOSTIC_LABORATORY_TEMPLATE,
  GENERAL_WAREHOUSE_TEMPLATE,
  CHEMICAL_STORAGE_TEMPLATE,
  SPARE_PARTS_WAREHOUSE_TEMPLATE,
  PRODUCT_DISPATCH_TEMPLATE,
  VETERINARY_FACILITY_TEMPLATE,
  WATER_TREATMENT_TEMPLATE,
  WATER_SOURCE_TEMPLATE,
  WWTP_TEMPLATE,
  MAINTENANCE_WORKSHOP_TEMPLATE,
  BOILER_UTILITY_TEMPLATE,
  BIOSECURITY_FACILITY_TEMPLATE,
];

// Template coverage matrix
export interface TemplateCoverage {
  facilityCode: string;
  facilityName: string;
  templateCode: string;
  templateName: string;
  status: 'active' | 'inactive' | 'draft' | 'not-available';
  sections: number;
  questions: number;
  estimatedDuration: number;
  lastUpdated: string;
}

// Generate coverage matrix
export function getTemplateCoverage(): TemplateCoverage[] {
  const coverage: TemplateCoverage[] = [];
  
  // Map facility codes to templates
  const facilityTemplateMap: Record<string, AuditTemplate> = {
    'BF': ENHANCED_BROILER_FARM_TEMPLATE,
    'PS': PARENT_STOCK_TEMPLATE,
    'LF': LAYER_FARM_TEMPLATE,
    'PL': PULLET_FARM_TEMPLATE,
    'HAT': HATCHERY_TEMPLATE,
    'FM': FEED_MILL_TEMPLATE,
    'RMW': RAW_MATERIAL_WAREHOUSE_TEMPLATE,
    'FFW': FINISHED_FEED_WAREHOUSE_TEMPLATE,
    'FPW': FINISHED_PRODUCT_WAREHOUSE_TEMPLATE,
    'COLD': COLD_STORAGE_TEMPLATE,
    'FT': FEED_TRANSPORTATION_TEMPLATE,
    'LBT': LIVE_BIRD_TRANSPORTATION_TEMPLATE,
    'SLH': SLAUGHTERHOUSE_TEMPLATE,
    'PROC': POULTRY_PROCESSING_PLANT_TEMPLATE,
    'FP': FURTHER_PROCESSING_PLANT_TEMPLATE,
    'EGG': EGG_GRADING_TEMPLATE,
    'EGP': EGG_PACKING_TEMPLATE,
    'LAB-Q': QC_LABORATORY_TEMPLATE,
    'LAB-D': DIAGNOSTIC_LABORATORY_TEMPLATE,
    'GWH': GENERAL_WAREHOUSE_TEMPLATE,
    'CHEM': CHEMICAL_STORAGE_TEMPLATE,
    'SPW': SPARE_PARTS_WAREHOUSE_TEMPLATE,
    'PD': PRODUCT_DISPATCH_TEMPLATE,
    'VET': VETERINARY_FACILITY_TEMPLATE,
    'WTR': WATER_TREATMENT_TEMPLATE,
    'WSRC': WATER_SOURCE_TEMPLATE,
    'WWTP': WWTP_TEMPLATE,
    'MNT': MAINTENANCE_WORKSHOP_TEMPLATE,
    'UTIL': BOILER_UTILITY_TEMPLATE,
    'BIO': BIOSECURITY_FACILITY_TEMPLATE,
    // Add more mappings as templates are created
  };

  // Get all facility codes from catalog
  const facilityCodes = ['BF', 'PS', 'LF', 'PL', 'GP', 'HAT', 'HER', 'FM', 'RMW', 'FFW', 'FT', 'SLH', 'PROC', 'FP', 'COLD', 'FPW', 'PDA', 'EGG', 'EGP', 'EGS', 'VET', 'LAB-D', 'LAB-Q', 'WT', 'WS', 'WWTP', 'CHEM', 'MW', 'UTIL', 'BIO', 'LBT', 'LBH', 'OFF'];

  const facilityNames: Record<string, string> = {
    'BF': 'Broiler Farm',
    'PS': 'Parent Stock / Breeder Farm',
    'LF': 'Layer Farm',
    'PL': 'Pullet Farm',
    'GP': 'Grandparent / Breeding Facility',
    'HAT': 'Hatchery',
    'HER': 'Hatching Egg Receiving / Storage',
    'FM': 'Feed Mill',
    'RMW': 'Raw Material Warehouse',
    'FFW': 'Finished Feed Warehouse',
    'FT': 'Feed Transportation',
    'SLH': 'Slaughterhouse',
    'PROC': 'Poultry Processing Plant',
    'FP': 'Further Processing Plant',
    'COLD': 'Cold Storage',
    'FPW': 'Finished Product Warehouse',
    'PDA': 'Product Dispatch Area',
    'EGG': 'Egg Grading Facility',
    'EGP': 'Egg Packing Facility',
    'EGS': 'Egg Storage Facility',
    'VET': 'Veterinary / Animal Health Facility',
    'LAB-D': 'Diagnostic Laboratory',
    'LAB-Q': 'QC Laboratory',
    'WT': 'Water Treatment Facility',
    'WS': 'Water Source / Reservoir',
    'WWTP': 'Wastewater Treatment Plant',
    'CHEM': 'Chemical Storage',
    'MW': 'Maintenance Workshop',
    'UTIL': 'Boiler / Generator / Utility Facility',
    'BIO': 'Biosecurity / Access Control Facility',
    'LBT': 'Live Bird Transportation',
    'LBH': 'Live Bird Holding Area',
    'OFF': 'Administration / Office Facility'
  };

  for (const code of facilityCodes) {
    const template = facilityTemplateMap[code];
    coverage.push({
      facilityCode: code,
      facilityName: facilityNames[code] || code,
      templateCode: template?.code || 'N/A',
      templateName: template?.name || 'Template not available',
      status: template ? (template.status as any) : 'not-available',
      sections: template?.sections.length || 0,
      questions: template?.totalQuestions || template?.sections.reduce((sum, s) => sum + s.items.length, 0) || 0,
      estimatedDuration: template?.estimatedDuration || 0,
      lastUpdated: template?.updatedAt || 'N/A'
    });
  }

  return coverage;
}

// Helper function to get template by facility code
export function getTemplateByFacilityCode(facilityCode: string): AuditTemplate | undefined {
  const templateMap: Record<string, AuditTemplate> = {
    'BF': ENHANCED_BROILER_FARM_TEMPLATE,
    'PS': PARENT_STOCK_TEMPLATE,
    'LF': LAYER_FARM_TEMPLATE,
    'PL': PULLET_FARM_TEMPLATE,
    'HAT': HATCHERY_TEMPLATE,
    'FM': FEED_MILL_TEMPLATE,
    'RMW': RAW_MATERIAL_WAREHOUSE_TEMPLATE,
    'FFW': FINISHED_FEED_WAREHOUSE_TEMPLATE,
    'FPW': FINISHED_PRODUCT_WAREHOUSE_TEMPLATE,
    'COLD': COLD_STORAGE_TEMPLATE,
    'FT': FEED_TRANSPORTATION_TEMPLATE,
    'LBT': LIVE_BIRD_TRANSPORTATION_TEMPLATE,
    'SLH': SLAUGHTERHOUSE_TEMPLATE,
    'PROC': POULTRY_PROCESSING_PLANT_TEMPLATE,
    'FP': FURTHER_PROCESSING_PLANT_TEMPLATE,
    'EGG': EGG_GRADING_TEMPLATE,
    'EGP': EGG_PACKING_TEMPLATE,
    'LAB-Q': QC_LABORATORY_TEMPLATE,
    'LAB-D': DIAGNOSTIC_LABORATORY_TEMPLATE,
    'GWH': GENERAL_WAREHOUSE_TEMPLATE,
    'CHEM': CHEMICAL_STORAGE_TEMPLATE,
    'SPW': SPARE_PARTS_WAREHOUSE_TEMPLATE,
    'PD': PRODUCT_DISPATCH_TEMPLATE,
    'VET': VETERINARY_FACILITY_TEMPLATE,
    'WTR': WATER_TREATMENT_TEMPLATE,
    'WSRC': WATER_SOURCE_TEMPLATE,
    'WWTP': WWTP_TEMPLATE,
    'MNT': MAINTENANCE_WORKSHOP_TEMPLATE,
    'UTIL': BOILER_UTILITY_TEMPLATE,
    'BIO': BIOSECURITY_FACILITY_TEMPLATE,
    // Add more mappings as templates are created
  };
  return templateMap[facilityCode];
}

// Helper function to get template by ID
export function getTemplateById(id: string): AuditTemplate | undefined {
  return TEMPLATE_CATALOG.find(t => t.id === id);
}

// Helper function to get template by code
export function getTemplateByCode(code: string): AuditTemplate | undefined {
  return TEMPLATE_CATALOG.find(t => t.code === code);
}

// Helper function to get templates by facility type
export function getTemplatesByFacilityType(facilityType: string): AuditTemplate[] {
  return TEMPLATE_CATALOG.filter(t => t.facilityTypes?.includes(facilityType as any));
}

// Helper function to get templates by department
export function getTemplatesByDepartment(departmentId: string): AuditTemplate[] {
  return TEMPLATE_CATALOG.filter(t => t.departmentId === departmentId);
}

// Helper function to get active templates
export function getActiveTemplates(): AuditTemplate[] {
  return TEMPLATE_CATALOG.filter(t => t.status === 'active');
}

// Template statistics
export const TEMPLATE_STATS = {
  total: TEMPLATE_CATALOG.length,
  active: TEMPLATE_CATALOG.filter(t => t.status === 'active').length,
  inactive: TEMPLATE_CATALOG.filter(t => t.status === 'inactive').length,
  draft: TEMPLATE_CATALOG.filter(t => t.status === 'draft').length,
  totalQuestions: TEMPLATE_CATALOG.reduce((sum, t) => sum + (t.totalQuestions || t.sections.reduce((s, sec) => s + sec.items.length, 0)), 0),
  totalSections: TEMPLATE_CATALOG.reduce((sum, t) => sum + t.sections.length, 0),
  coverage: getTemplateCoverage().filter(c => c.status === 'active').length,
  totalFacilities: getTemplateCoverage().length
};

// Template coverage report
export function generateCoverageReport(): string {
  const coverage = getTemplateCoverage();
  const active = coverage.filter(c => c.status === 'active');
  const notAvailable = coverage.filter(c => c.status === 'not-available');

  let report = '=== TEMPLATE COVERAGE REPORT ===\n\n';
  report += `Total Facilities: ${coverage.length}\n`;
  report += `Templates Available: ${active.length}\n`;
  report += `Templates Missing: ${notAvailable.length}\n`;
  report += `Coverage: ${((active.length / coverage.length) * 100).toFixed(1)}%\n\n`;

  report += '--- ACTIVE TEMPLATES ---\n';
  active.forEach(c => {
    report += `${c.facilityCode.padEnd(6)} | ${c.facilityName.padEnd(40)} | ${c.templateCode.padEnd(15)} | ${c.sections} sections | ${c.questions} questions\n`;
  });

  report += '\n--- MISSING TEMPLATES ---\n';
  notAvailable.forEach(c => {
    report += `${c.facilityCode.padEnd(6)} | ${c.facilityName.padEnd(40)} | Template not available\n`;
  });

  return report;
}
