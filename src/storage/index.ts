import { User, Farm, FarmHouse, AuditTemplate, Audit, Finding, CorrectiveAction, AuditSchedule, Notification, AppSettings, MasterDataItem, BackupData, Department, Facility, FacilityArea, Evidence, Approval, TimelineEvent, AuditTypeMaster } from '../types';

const STORAGE_PREFIX = 'fams_';

class StorageAdapter {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  }

  remove(key: string): void {
    localStorage.removeItem(STORAGE_PREFIX + key);
  }

  clear(): void {
    Object.keys(localStorage)
      .filter(k => k.startsWith(STORAGE_PREFIX))
      .forEach(k => localStorage.removeItem(k));
  }
}

export const storage = new StorageAdapter();

// Repositories
class Repository<T extends { id: string }> {
  private key: string;
  constructor(key: string) {
    this.key = key;
  }

  getAll(): T[] {
    return storage.get<T[]>(this.key, []);
  }

  getById(id: string): T | undefined {
    return this.getAll().find(item => item.id === id);
  }

  create(item: T): T {
    const items = this.getAll();
    items.push(item);
    storage.set(this.key, items);
    return item;
  }

  update(id: string, updates: Partial<T>): T | undefined {
    const items = this.getAll();
    const idx = items.findIndex(item => item.id === id);
    if (idx === -1) return undefined;
    items[idx] = { ...items[idx], ...updates, updatedAt: new Date().toISOString() };
    storage.set(this.key, items);
    return items[idx];
  }

  delete(id: string): boolean {
    const items = this.getAll();
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length === items.length) return false;
    storage.set(this.key, filtered);
    return true;
  }

  setAll(items: T[]): void {
    storage.set(this.key, items);
  }
}

export const userRepo = new Repository<User>('users');
export const farmRepo = new Repository<Farm>('farms');
export const houseRepo = new Repository<FarmHouse>('houses');
export const templateRepo = new Repository<AuditTemplate>('templates');
export const auditRepo = new Repository<Audit>('audits');
export const findingRepo = new Repository<Finding>('findings');
export const correctiveActionRepo = new Repository<CorrectiveAction>('correctiveActions');
export const scheduleRepo = new Repository<AuditSchedule>('schedules');
export const notificationRepo = new Repository<Notification>('notifications');
export const masterDataRepo = new Repository<MasterDataItem>('masterData');

// Enterprise repositories
export const departmentRepo = new Repository<Department>('departments');
export const facilityRepo = new Repository<Facility>('facilities');
export const facilityAreaRepo = new Repository<FacilityArea>('facilityAreas');
export const evidenceRepo = new Repository<Evidence>('evidence');
export const approvalRepo = new Repository<Approval>('approvals');
export const timelineEventRepo = new Repository<TimelineEvent>('timelineEvents');
export const auditTypeMasterRepo = new Repository<AuditTypeMaster>('auditTypeMasters');

export const settingsService = {
  get(): AppSettings {
    return storage.get<AppSettings>('settings', {
      appName: 'FAMS - Farm Audit Management System',
      companyName: 'PT Poultry Farm Indonesia',
      timezone: 'Asia/Jakarta',
      dateFormat: 'DD/MM/YYYY',
      scoreThresholds: { excellent: 90, good: 80, needsImprovement: 70, poor: 60 },
      requireEvidence: true,
      requireCorrectiveAction: true,
    });
  },
  set(settings: AppSettings): void {
    storage.set('settings', settings);
  }
};

export const authService = {
  login(username: string, password: string): User | null {
    const users = userRepo.getAll();
    const user = users.find(u => u.username === username && u.password === password && u.status === 'active');
    if (user) {
      userRepo.update(user.id, { lastLogin: new Date().toISOString() });
      storage.set('currentUser', { ...user, password: '' });
      return { ...user, password: '' };
    }
    return null;
  },
  logout(): void {
    // Only remove authentication session, preserve all other data
    storage.remove('currentUser');
  },
  getCurrentUser(): User | null {
    try {
      const user = storage.get<User | null>('currentUser', null);
      // Validate that the user object has required fields
      if (!user || typeof user !== 'object') return null;
      if (!user.id || !user.username || !user.role || !user.status) return null;
      // Additional validation for role and status values
      const validRoles = ['super_admin', 'admin', 'auditor', 'farm_manager', 'supervisor', 'viewer'];
      const validStatuses = ['active', 'inactive'];
      if (!validRoles.includes(user.role)) return null;
      if (!validStatuses.includes(user.status)) return null;
      return user;
    } catch (error) {
      // If there's any error reading/parsing the user, treat as unauthenticated
      console.warn('Error reading current user from storage:', error);
      storage.remove('currentUser');
      return null;
    }
  },
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  },
  resetSession(): void {
    // Reset only the authentication session, preserve all application data
    // This is useful for developers/testers to return to login without clearing data
    this.logout();
  }
};

export const backupService = {
  exportAll(): BackupData {
    return {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      users: userRepo.getAll(),
      farms: farmRepo.getAll(),
      houses: houseRepo.getAll(),
      templates: templateRepo.getAll(),
      audits: auditRepo.getAll(),
      findings: findingRepo.getAll(),
      correctiveActions: correctiveActionRepo.getAll(),
      schedules: scheduleRepo.getAll(),
      notifications: notificationRepo.getAll(),
      settings: settingsService.get(),
      masterData: masterDataRepo.getAll(),
      departments: departmentRepo.getAll(),
      facilities: facilityRepo.getAll(),
      facilityAreas: facilityAreaRepo.getAll(),
      evidence: evidenceRepo.getAll(),
      approvals: approvalRepo.getAll(),
      timelineEvents: timelineEventRepo.getAll(),
    };
  },
  importAll(data: BackupData): boolean {
    if (!data.version || !data.farms || !data.audits) return false;
    try {
      userRepo.setAll(data.users || []);
      farmRepo.setAll(data.farms || []);
      houseRepo.setAll(data.houses || []);
      templateRepo.setAll(data.templates || []);
      auditRepo.setAll(data.audits || []);
      findingRepo.setAll(data.findings || []);
      correctiveActionRepo.setAll(data.correctiveActions || []);
      scheduleRepo.setAll(data.schedules || []);
      notificationRepo.setAll(data.notifications || []);
      if (data.settings) settingsService.set(data.settings);
      if (data.masterData) masterDataRepo.setAll(data.masterData);
      if (data.departments) departmentRepo.setAll(data.departments);
      if (data.facilities) facilityRepo.setAll(data.facilities);
      if (data.facilityAreas) facilityAreaRepo.setAll(data.facilityAreas);
      if (data.evidence) evidenceRepo.setAll(data.evidence);
      if (data.approvals) approvalRepo.setAll(data.approvals);
      if (data.timelineEvents) timelineEventRepo.setAll(data.timelineEvents);
      return true;
    } catch {
      return false;
    }
  }
};

export function exportCSV(data: Record<string, unknown>[], filename: string): void {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const escapeCSV = (val: string) => {
    // Escape quotes by doubling them, wrap in quotes if contains comma, newline, or quote
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(h => escapeCSV(String(row[h] ?? ''))).join(','))
  ].join('\n');
  // Add BOM for Excel compatibility
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

export function downloadJSON(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}
