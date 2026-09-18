import { Department, Facility, FacilityArea, AuditTypeMaster, FacilityType } from '../types';
import { v4 as uuid } from 'uuid';

function daysAgo(d: number): string {
  const date = new Date();
  date.setDate(date.getDate() - d);
  return date.toISOString();
}

// Department definitions
export const DEPARTMENT_DEFINITIONS: { code: string; name: string; description: string }[] = [
  { code: 'PROD', name: 'Production', description: 'Broiler and layer production operations' },
  { code: 'BREED', name: 'Breeding', description: 'Parent stock management and breeding operations' },
  { code: 'FEED', name: 'Feed Production', description: 'Feedmill operations and feed manufacturing' },
  { code: 'HATCH', name: 'Hatchery', description: 'Egg incubation and chick production' },
  { code: 'PROC', name: 'Processing', description: 'Dressing plant and meat processing' },
  { code: 'QA', name: 'Quality Assurance', description: 'Quality control and assurance across all operations' },
  { code: 'LOG', name: 'Logistics', description: 'Distribution and logistics operations' },
  { code: 'WH', name: 'Warehouse', description: 'Storage and warehouse management' },
  { code: 'MAINT', name: 'Maintenance', description: 'Equipment and facility maintenance' },
  { code: 'LAB', name: 'Laboratory', description: 'Testing and laboratory services' },
];

// Facility type definitions
export const FACILITY_TYPE_LABELS: Record<FacilityType, string> = {
  broiler_farm: 'Broiler Farm',
  parent_stock_broiler: 'Parent Stock Broiler',
  layer_farm: 'Layer Farm',
  parent_stock_layer: 'Parent Stock Layer',
  pullet_farm: 'Pullet Farm',
  hatchery: 'Hatchery',
  feedmill: 'Feedmill',
  dressing_plant: 'Dressing Plant',
  slaughterhouse: 'Slaughterhouse',
  processing_plant: 'Processing Plant',
  warehouse: 'Warehouse',
  distribution_center: 'Distribution Center',
  laboratory: 'Laboratory',
  logistics: 'Logistics',
  maintenance: 'Maintenance',
  office: 'Office',
  chemical_storage: 'Chemical Storage',
  spare_parts_warehouse: 'Spare Parts Warehouse',
  product_dispatch: 'Product Dispatch',
  veterinary: 'Veterinary Facility',
  water_treatment: 'Water Treatment',
  water_source: 'Water Source',
  wwtp: 'Wastewater Treatment Plant',
  maintenance_workshop: 'Maintenance Workshop',
  boiler_utility: 'Boiler/Utility',
  biosecurity_facility: 'Biosecurity Facility',
  other: 'Other',
};

// Audit type definitions
export const AUDIT_TYPE_DEFINITIONS: { code: string; name: string; description: string; applicableFacilityTypes: FacilityType[] }[] = [
  { code: 'ROUTINE', name: 'Routine Audit', description: 'Regular scheduled audit', applicableFacilityTypes: ['broiler_farm', 'parent_stock_broiler', 'layer_farm', 'parent_stock_layer', 'hatchery', 'feedmill', 'dressing_plant'] },
  { code: 'INTERNAL', name: 'Internal Audit', description: 'Internal compliance audit', applicableFacilityTypes: ['broiler_farm', 'parent_stock_broiler', 'layer_farm', 'parent_stock_layer', 'hatchery', 'feedmill', 'dressing_plant', 'warehouse', 'laboratory'] },
  { code: 'BIOSEC', name: 'Biosecurity Audit', description: 'Biosecurity compliance audit', applicableFacilityTypes: ['broiler_farm', 'parent_stock_broiler', 'layer_farm', 'parent_stock_layer', 'hatchery', 'feedmill', 'dressing_plant'] },
  { code: 'WELFARE', name: 'Animal Welfare Audit', description: 'Animal welfare compliance', applicableFacilityTypes: ['broiler_farm', 'parent_stock_broiler', 'layer_farm', 'parent_stock_layer'] },
  { code: 'FEED_SAFETY', name: 'Feed Safety Audit', description: 'Feed safety and quality', applicableFacilityTypes: ['feedmill'] },
  { code: 'QUALITY', name: 'Quality Audit', description: 'Quality management system', applicableFacilityTypes: ['broiler_farm', 'parent_stock_broiler', 'layer_farm', 'hatchery', 'feedmill', 'dressing_plant', 'laboratory'] },
  { code: 'COMPLIANCE', name: 'Compliance Audit', description: 'Regulatory compliance', applicableFacilityTypes: ['broiler_farm', 'parent_stock_broiler', 'layer_farm', 'parent_stock_layer', 'hatchery', 'feedmill', 'dressing_plant'] },
  { code: 'FACILITY', name: 'Facility Inspection', description: 'General facility inspection', applicableFacilityTypes: ['broiler_farm', 'parent_stock_broiler', 'layer_farm', 'parent_stock_layer', 'hatchery', 'feedmill', 'dressing_plant', 'warehouse', 'distribution_center', 'laboratory', 'logistics', 'maintenance', 'office'] },
  { code: 'GMP', name: 'GMP Audit', description: 'Good Manufacturing Practices', applicableFacilityTypes: ['feedmill', 'dressing_plant', 'processing_plant', 'hatchery'] },
  { code: 'HACCP', name: 'HACCP Audit', description: 'Hazard Analysis Critical Control Points', applicableFacilityTypes: ['feedmill', 'dressing_plant', 'processing_plant'] },
];

// Generate enterprise demo data
export function generateEnterpriseDemoData() {
  const departments: Department[] = [
    { id: 'dept1', code: 'PROD', name: 'Production', description: 'Broiler and layer production operations', managerId: 'u3', status: 'active', createdAt: daysAgo(90), updatedAt: daysAgo(5) },
    { id: 'dept2', code: 'BREED', name: 'Breeding', description: 'Parent stock management and breeding operations', managerId: 'u3', status: 'active', createdAt: daysAgo(90), updatedAt: daysAgo(5) },
    { id: 'dept3', code: 'FEED', name: 'Feed Production', description: 'Feedmill operations and feed manufacturing', managerId: 'u3', status: 'active', createdAt: daysAgo(80), updatedAt: daysAgo(3) },
    { id: 'dept4', code: 'HATCH', name: 'Hatchery', description: 'Egg incubation and chick production', managerId: 'u3', status: 'active', createdAt: daysAgo(80), updatedAt: daysAgo(3) },
    { id: 'dept5', code: 'PROC', name: 'Processing', description: 'Dressing plant and meat processing', managerId: 'u3', status: 'active', createdAt: daysAgo(70), updatedAt: daysAgo(2) },
  ];

  const facilities: Facility[] = [
    // Broiler Farms (linked to existing farms for compatibility)
    { id: 'fac1', facilityCode: 'FAC-BRM-001', name: 'Farm Alpha', facilityType: 'broiler_farm', departmentId: 'dept1', location: 'Bogor', address: 'Jl. Raya Cibinong No. 10', province: 'Jawa Barat', regency: 'Bogor', district: 'Cibinong', managerId: 'u3', supervisorId: 'u4', capacity: 40000, status: 'active', description: 'Main broiler farm', legacyFarmId: 'f1', createdAt: daysAgo(90), updatedAt: daysAgo(5) },
    { id: 'fac2', facilityCode: 'FAC-BRM-002', name: 'Farm Beta', facilityType: 'broiler_farm', departmentId: 'dept1', location: 'Subang', address: 'Jl. Pamanukan Km 5', province: 'Jawa Barat', regency: 'Subang', district: 'Pamanukan', managerId: 'u3', supervisorId: 'u4', capacity: 30000, status: 'active', description: 'Modern broiler farm', legacyFarmId: 'f2', createdAt: daysAgo(80), updatedAt: daysAgo(3) },
    
    // Parent Stock Broiler
    { id: 'fac3', facilityCode: 'FAC-PSB-001', name: 'Parent Stock Farm Gamma', facilityType: 'parent_stock_broiler', departmentId: 'dept2', location: 'Semarang', address: 'Jl. Ungaran Raya No. 25', province: 'Jawa Tengah', regency: 'Semarang', district: 'Ungaran', managerId: 'u3', supervisorId: 'u4', capacity: 20000, status: 'active', description: 'Parent stock broiler operation', legacyFarmId: 'f3', createdAt: daysAgo(70), updatedAt: daysAgo(10) },
    
    // Layer Farm
    { id: 'fac4', facilityCode: 'FAC-LYR-001', name: 'Layer Farm Delta', facilityType: 'layer_farm', departmentId: 'dept1', location: 'Malang', address: 'Jl. Singosari No. 8', province: 'Jawa Timur', regency: 'Malang', district: 'Singosari', managerId: 'u3', supervisorId: 'u4', capacity: 25000, status: 'active', description: 'Layer production farm', legacyFarmId: 'f4', createdAt: daysAgo(60), updatedAt: daysAgo(7) },
    
    // Hatchery
    { id: 'fac5', facilityCode: 'FAC-HCH-001', name: 'Central Hatchery', facilityType: 'hatchery', departmentId: 'dept4', location: 'Bogor', address: 'Jl. Hatchery No. 1', province: 'Jawa Barat', regency: 'Bogor', district: 'Cibinong', managerId: 'u3', supervisorId: 'u4', capacity: 100000, status: 'active', description: 'Main hatchery facility', createdAt: daysAgo(60), updatedAt: daysAgo(2) },
    
    // Feedmill
    { id: 'fac6', facilityCode: 'FAC-FDM-001', name: 'Premium Feedmill', facilityType: 'feedmill', departmentId: 'dept3', location: 'Subang', address: 'Jl. Industrial Estate No. 5', province: 'Jawa Barat', regency: 'Subang', district: 'Pamanukan', managerId: 'u3', supervisorId: 'u4', capacity: 500, status: 'active', description: 'Feed production facility (tons/day)', createdAt: daysAgo(50), updatedAt: daysAgo(1) },
    
    // Dressing Plant
    { id: 'fac7', facilityCode: 'FAC-DRP-001', name: 'Processing Plant Alpha', facilityType: 'dressing_plant', departmentId: 'dept5', location: 'Malang', address: 'Jl. Processing No. 10', province: 'Jawa Timur', regency: 'Malang', district: 'Singosari', managerId: 'u3', supervisorId: 'u4', capacity: 10000, status: 'active', description: 'Chicken processing facility (birds/day)', createdAt: daysAgo(45), updatedAt: daysAgo(1) },
  ];

  const facilityAreas: FacilityArea[] = [
    // Farm Alpha areas (linked to existing houses)
    { id: 'area1', facilityId: 'fac1', code: 'H-001', name: 'House 01', areaType: 'house', description: 'Main production house', capacity: 10000, status: 'active', legacyHouseId: 'h1', createdAt: daysAgo(90), updatedAt: daysAgo(1) },
    { id: 'area2', facilityId: 'fac1', code: 'H-002', name: 'House 02', areaType: 'house', description: 'Secondary production house', capacity: 10000, status: 'active', legacyHouseId: 'h2', createdAt: daysAgo(90), updatedAt: daysAgo(1) },
    { id: 'area3', facilityId: 'fac1', code: 'FS-001', name: 'Feed Storage', areaType: 'storage', description: 'Feed storage area', capacity: 50, status: 'active', createdAt: daysAgo(90), updatedAt: daysAgo(1) },
    
    // Hatchery areas
    { id: 'area4', facilityId: 'fac5', code: 'ER-001', name: 'Egg Receiving', areaType: 'receiving', description: 'Egg receiving and grading', capacity: 10000, status: 'active', createdAt: daysAgo(60), updatedAt: daysAgo(1) },
    { id: 'area5', facilityId: 'fac5', code: 'SET-001', name: 'Setter Room', areaType: 'incubation', description: 'Egg setting and incubation', capacity: 50000, status: 'active', createdAt: daysAgo(60), updatedAt: daysAgo(1) },
    { id: 'area6', facilityId: 'fac5', code: 'HATCH-001', name: 'Hatcher Room', areaType: 'hatching', description: 'Hatching and chick processing', capacity: 50000, status: 'active', createdAt: daysAgo(60), updatedAt: daysAgo(1) },
    { id: 'area7', facilityId: 'fac5', code: 'VAC-001', name: 'Vaccination Area', areaType: 'vaccination', description: 'Chick vaccination and processing', capacity: 10000, status: 'active', createdAt: daysAgo(60), updatedAt: daysAgo(1) },
    
    // Feedmill areas
    { id: 'area8', facilityId: 'fac6', code: 'RMW-001', name: 'Raw Material Warehouse', areaType: 'warehouse', description: 'Raw material storage', capacity: 1000, status: 'active', createdAt: daysAgo(50), updatedAt: daysAgo(1) },
    { id: 'area9', facilityId: 'fac6', code: 'PROD-001', name: 'Production Line 1', areaType: 'production', description: 'Main feed production line', capacity: 250, status: 'active', createdAt: daysAgo(50), updatedAt: daysAgo(1) },
    { id: 'area10', facilityId: 'fac6', code: 'PROD-002', name: 'Production Line 2', areaType: 'production', description: 'Secondary feed production line', capacity: 250, status: 'active', createdAt: daysAgo(50), updatedAt: daysAgo(1) },
    { id: 'area11', facilityId: 'fac6', code: 'FGW-001', name: 'Finished Feed Warehouse', areaType: 'warehouse', description: 'Finished feed storage', capacity: 2000, status: 'active', createdAt: daysAgo(50), updatedAt: daysAgo(1) },
    
    // Dressing Plant areas
    { id: 'area12', facilityId: 'fac7', code: 'RCV-001', name: 'Receiving Area', areaType: 'receiving', description: 'Live bird receiving', capacity: 5000, status: 'active', createdAt: daysAgo(45), updatedAt: daysAgo(1) },
    { id: 'area13', facilityId: 'fac7', code: 'SLG-001', name: 'Slaughter Area', areaType: 'slaughter', description: 'Slaughter and bleeding', capacity: 5000, status: 'active', createdAt: daysAgo(45), updatedAt: daysAgo(1) },
    { id: 'area14', facilityId: 'fac7', code: 'EVIS-001', name: 'Evisceration Area', areaType: 'processing', description: 'Evisceration and cleaning', capacity: 5000, status: 'active', createdAt: daysAgo(45), updatedAt: daysAgo(1) },
    { id: 'area15', facilityId: 'fac7', code: 'CHILL-001', name: 'Chilling Area', areaType: 'processing', description: 'Carcass chilling', capacity: 5000, status: 'active', createdAt: daysAgo(45), updatedAt: daysAgo(1) },
    { id: 'area16', facilityId: 'fac7', code: 'PKG-001', name: 'Packaging Area', areaType: 'packaging', description: 'Product packaging', capacity: 5000, status: 'active', createdAt: daysAgo(45), updatedAt: daysAgo(1) },
    { id: 'area17', facilityId: 'fac7', code: 'COLD-001', name: 'Cold Storage', areaType: 'storage', description: 'Cold storage facility', capacity: 10000, status: 'active', createdAt: daysAgo(45), updatedAt: daysAgo(1) },
  ];

  const auditTypeMasters: AuditTypeMaster[] = AUDIT_TYPE_DEFINITIONS.map((def, idx) => ({
    id: `atm${idx + 1}`,
    code: def.code,
    name: def.name,
    description: def.description,
    applicableFacilityTypes: def.applicableFacilityTypes,
    active: true,
    createdAt: daysAgo(90),
    updatedAt: daysAgo(30),
  }));

  return { departments, facilities, facilityAreas, auditTypeMasters };
}

// Initialize enterprise demo data (non-destructive)
export function initializeEnterpriseDemoData(): void {
  const initialized = localStorage.getItem('fams_enterprise_initialized');
  if (initialized) return;
  
  const data = generateEnterpriseDemoData();
  localStorage.setItem('fams_departments', JSON.stringify(data.departments));
  localStorage.setItem('fams_facilities', JSON.stringify(data.facilities));
  localStorage.setItem('fams_facilityAreas', JSON.stringify(data.facilityAreas));
  localStorage.setItem('fams_auditTypeMasters', JSON.stringify(data.auditTypeMasters));
  localStorage.setItem('fams_evidence', JSON.stringify([]));
  localStorage.setItem('fams_approvals', JSON.stringify([]));
  localStorage.setItem('fams_timelineEvents', JSON.stringify([]));
  localStorage.setItem('fams_enterprise_initialized', 'true');
}

export { FACILITY_TYPE_LABELS as facilityTypeLabels };
