import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User, Farm, FarmHouse, AuditTemplate, Audit, Finding, CorrectiveAction, AuditSchedule, Notification, Department, Facility, FacilityArea, Evidence, Approval, TimelineEvent, AuditTypeMaster } from '../types';
import { userRepo, farmRepo, houseRepo, templateRepo, auditRepo, findingRepo, correctiveActionRepo, scheduleRepo, notificationRepo, authService, departmentRepo, facilityRepo, facilityAreaRepo, evidenceRepo, approvalRepo, timelineEventRepo, auditTypeMasterRepo } from '../storage';
import { initializeDemoData } from '../data/demoData';
import { initializeEnterpriseDemoData } from '../data/enterpriseDemoData';
import { initializeSecurity, cleanupSecurity, hasPermission as securityHasPermission } from '../security';
import { initializePersistence, cleanupPersistence } from '../persistence';
import { initializeDomain, cleanupDomain } from '../domain';

interface AppState {
  currentUser: User | null;
  users: User[];
  farms: Farm[];
  houses: FarmHouse[];
  templates: AuditTemplate[];
  audits: Audit[];
  findings: Finding[];
  correctiveActions: CorrectiveAction[];
  schedules: AuditSchedule[];
  notifications: Notification[];
  sidebarOpen: boolean;
  // Enterprise entities
  departments: Department[];
  facilities: Facility[];
  facilityAreas: FacilityArea[];
  evidence: Evidence[];
  approvals: Approval[];
  timelineEvents: TimelineEvent[];
  auditTypeMasters: AuditTypeMaster[];
  // Initialization state
  isInitialized: boolean;
}

interface AppContextType extends AppState {
  login: (username: string, password: string) => boolean;
  logout: () => void;
  refreshData: () => void;
  setSidebarOpen: (open: boolean) => void;
  addNotification: (n: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  hasPermission: (action: string) => boolean;
  isInitialized: boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize all layers synchronously on first load
  initializeDemoData();
  initializeEnterpriseDemoData();
  initializeSecurity();
  initializePersistence();
  initializeDomain();
  
  // Initialize currentUser synchronously from localStorage to prevent auth race condition
  const [state, setState] = useState<AppState>(() => {
    const currentUser = authService.getCurrentUser();
    return {
      currentUser,
      users: userRepo.getAll(),
      farms: farmRepo.getAll(),
      houses: houseRepo.getAll(),
      templates: templateRepo.getAll(),
      audits: auditRepo.getAll(),
      findings: findingRepo.getAll(),
      correctiveActions: correctiveActionRepo.getAll(),
      schedules: scheduleRepo.getAll(),
      notifications: notificationRepo.getAll(),
      sidebarOpen: true,
      departments: departmentRepo.getAll(),
      facilities: facilityRepo.getAll(),
      facilityAreas: facilityAreaRepo.getAll(),
      evidence: evidenceRepo.getAll(),
      approvals: approvalRepo.getAll(),
      timelineEvents: timelineEventRepo.getAll(),
      auditTypeMasters: auditTypeMasterRepo.getAll(),
      isInitialized: true,
    };
  });

  const refreshData = useCallback(() => {
    setState(prev => ({
      ...prev,
      users: userRepo.getAll(),
      farms: farmRepo.getAll(),
      houses: houseRepo.getAll(),
      templates: templateRepo.getAll(),
      audits: auditRepo.getAll(),
      findings: findingRepo.getAll(),
      correctiveActions: correctiveActionRepo.getAll(),
      schedules: scheduleRepo.getAll(),
      notifications: notificationRepo.getAll(),
      departments: departmentRepo.getAll(),
      facilities: facilityRepo.getAll(),
      facilityAreas: facilityAreaRepo.getAll(),
      evidence: evidenceRepo.getAll(),
      approvals: approvalRepo.getAll(),
      timelineEvents: timelineEventRepo.getAll(),
      auditTypeMasters: auditTypeMasterRepo.getAll(),
      isInitialized: true,
    }));
  }, []);

  const login = (username: string, password: string): boolean => {
    const user = authService.login(username, password);
    if (user) {
      setState(prev => ({ ...prev, currentUser: user }));
      refreshData();
      return true;
    }
    return false;
  };

  const logout = () => {
    // Clear authentication session only, preserve all application data
    authService.logout();
    // Update state to reflect logged out status
    setState(prev => ({ ...prev, currentUser: null }));
  };

  const setSidebarOpen = (open: boolean) => {
    setState(prev => ({ ...prev, sidebarOpen: open }));
  };

  const addNotification = (n: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const notification: Notification = {
      ...n, id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(), createdAt: new Date().toISOString(), read: false,
    };
    notificationRepo.create(notification);
    refreshData();
  };

  const markNotificationRead = (id: string) => {
    notificationRepo.update(id, { read: true });
    refreshData();
  };

  const hasPermission = (action: string): boolean => {
    // Use the security layer for permission checks
    // This provides a clear abstraction that can be migrated to server-side validation
    return securityHasPermission(action);
  };

  return (
    <AppContext.Provider value={{ ...state, login, logout, refreshData, setSidebarOpen, addNotification, markNotificationRead, hasPermission }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
