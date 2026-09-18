/**
 * Persistence Abstraction Layer
 * 
 * This layer provides a clean abstraction over the persistence mechanism.
 * Currently uses localStorage, but can be migrated to Supabase in the future.
 * 
 * The UI and domain logic should use these repository interfaces instead of
 * directly accessing localStorage.
 */

import { User, Farm, FarmHouse, AuditTemplate, Audit, Finding, CorrectiveAction, AuditSchedule, Notification, Department, Facility, FacilityArea, Evidence, Approval, TimelineEvent, AuditTypeMaster } from '../types';
import { storage } from '../storage';

/**
 * Repository Interface
 * Generic repository interface for CRUD operations
 */
export interface IRepository<T extends { id: string }> {
  getAll(): T[];
  getById(id: string): T | undefined;
  create(item: T): T;
  update(id: string, updates: Partial<T>): T | undefined;
  delete(id: string): boolean;
  setAll(items: T[]): void;
}

/**
 * Repository Implementation
 * Generic repository implementation using localStorage
 * 
 * In the future, this can be replaced with a Supabase implementation
 * without changing the rest of the application.
 */
class LocalStorageRepository<T extends { id: string }> implements IRepository<T> {
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

/**
 * Repository Factory
 * Creates repositories for each entity type
 * 
 * In the future, this factory can be updated to return Supabase repositories
 * instead of localStorage repositories.
 */
export const repositories = {
  users: new LocalStorageRepository<User>('users'),
  farms: new LocalStorageRepository<Farm>('farms'),
  houses: new LocalStorageRepository<FarmHouse>('houses'),
  templates: new LocalStorageRepository<AuditTemplate>('templates'),
  audits: new LocalStorageRepository<Audit>('audits'),
  findings: new LocalStorageRepository<Finding>('findings'),
  correctiveActions: new LocalStorageRepository<CorrectiveAction>('correctiveActions'),
  schedules: new LocalStorageRepository<AuditSchedule>('schedules'),
  notifications: new LocalStorageRepository<Notification>('notifications'),
  departments: new LocalStorageRepository<Department>('departments'),
  facilities: new LocalStorageRepository<Facility>('facilities'),
  facilityAreas: new LocalStorageRepository<FacilityArea>('facilityAreas'),
  evidence: new LocalStorageRepository<Evidence>('evidence'),
  approvals: new LocalStorageRepository<Approval>('approvals'),
  timelineEvents: new LocalStorageRepository<TimelineEvent>('timelineEvents'),
  auditTypeMasters: new LocalStorageRepository<AuditTypeMaster>('auditTypeMasters'),
};

/**
 * Persistence Layer Initialization
 * Call this on application startup
 */
export function initializePersistence(): void {
  console.log('[Persistence] Persistence layer initialized (LOCAL STORAGE MODE)');
}

/**
 * Persistence Layer Cleanup
 * Call this on application shutdown
 */
export function cleanupPersistence(): void {
  console.log('[Persistence] Persistence layer cleaned up');
}

/**
 * Get the current persistence mode
 * Returns 'localStorage' or 'supabase' (future)
 */
export function getPersistenceMode(): 'localStorage' | 'supabase' {
  return 'localStorage';
}
