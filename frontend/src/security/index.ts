/**
 * Security Boundary Layer
 * 
 * IMPORTANT: This is a CLIENT-SIDE DEVELOPMENT GUARD, NOT PRODUCTION SECURITY.
 * 
 * This layer provides a clear abstraction for security-sensitive operations
 * that can be migrated to server-side security (Supabase) in the future.
 * 
 * Current implementation: Client-side only (localStorage)
 * Future migration: Server-side validation with Supabase RLS
 */

import { User, UserRole } from '../types';
import { authService } from '../storage';

/**
 * Permission definitions for each role
 * These define what actions each role can perform
 */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  super_admin: [
    'audit:create',
    'audit:read',
    'audit:update',
    'audit:delete',
    'audit:submit',
    'audit:approve',
    'audit:reject',
    'template:create',
    'template:read',
    'template:update',
    'template:delete',
    'finding:create',
    'finding:read',
    'finding:update',
    'finding:delete',
    'corrective_action:create',
    'corrective_action:read',
    'corrective_action:update',
    'corrective_action:delete',
    'corrective_action:verify',
    'department:create',
    'department:read',
    'department:update',
    'department:delete',
    'facility:create',
    'facility:read',
    'facility:update',
    'facility:delete',
    'user:create',
    'user:read',
    'user:update',
    'user:delete',
    'evidence:upload',
    'evidence:read',
    'evidence:delete',
    'report:generate',
    'report:read',
  ],
  admin: [
    'audit:create',
    'audit:read',
    'audit:update',
    'audit:submit',
    'template:create',
    'template:read',
    'template:update',
    'finding:create',
    'finding:read',
    'finding:update',
    'corrective_action:create',
    'corrective_action:read',
    'corrective_action:update',
    'corrective_action:verify',
    'department:read',
    'facility:create',
    'facility:read',
    'facility:update',
    'user:read',
    'evidence:upload',
    'evidence:read',
    'evidence:delete',
    'report:generate',
    'report:read',
  ],
  auditor: [
    'audit:create',
    'audit:read',
    'audit:update',
    'audit:submit',
    'template:read',
    'finding:create',
    'finding:read',
    'finding:update',
    'corrective_action:create',
    'corrective_action:read',
    'corrective_action:update',
    'department:read',
    'facility:read',
    'evidence:upload',
    'evidence:read',
    'report:read',
  ],
  farm_manager: [
    'audit:read',
    'template:read',
    'finding:read',
    'corrective_action:read',
    'corrective_action:update',
    'department:read',
    'facility:read',
    'evidence:read',
    'report:read',
  ],
  supervisor: [
    'audit:read',
    'audit:approve',
    'audit:reject',
    'template:read',
    'finding:read',
    'corrective_action:read',
    'corrective_action:verify',
    'department:read',
    'facility:read',
    'evidence:read',
    'report:read',
  ],
  viewer: [
    'audit:read',
    'template:read',
    'finding:read',
    'corrective_action:read',
    'department:read',
    'facility:read',
    'evidence:read',
    'report:read',
  ],
};

/**
 * Security Context Interface
 * Provides security-related information about the current session
 */
export interface SecurityContext {
  isAuthenticated: boolean;
  currentUser: User | null;
  currentRole: UserRole | null;
  permissions: string[];
}

/**
 * Get the current security context
 * This is the main entry point for security checks
 */
export function getSecurityContext(): SecurityContext {
  const user = authService.getCurrentUser();
  
  if (!user) {
    return {
      isAuthenticated: false,
      currentUser: null,
      currentRole: null,
      permissions: [],
    };
  }

  return {
    isAuthenticated: true,
    currentUser: user,
    currentRole: user.role,
    permissions: ROLE_PERMISSIONS[user.role] || [],
  };
}

/**
 * Check if the current user has a specific permission
 * 
 * @param permission - The permission to check (e.g., 'audit:create')
 * @returns true if the user has the permission, false otherwise
 */
export function hasPermission(permission: string): boolean {
  const context = getSecurityContext();
  return context.permissions.includes(permission);
}

/**
 * Check if the current user has a specific role
 * 
 * @param role - The role to check
 * @returns true if the user has the role, false otherwise
 */
export function hasRole(role: UserRole): boolean {
  const context = getSecurityContext();
  return context.currentRole === role;
}

/**
 * Check if the current user is authenticated
 * 
 * @returns true if authenticated, false otherwise
 */
export function isAuthenticated(): boolean {
  const context = getSecurityContext();
  return context.isAuthenticated;
}

/**
 * Get the current user
 * 
 * @returns The current user or null if not authenticated
 */
export function getCurrentUser(): User | null {
  const context = getSecurityContext();
  return context.currentUser;
}

/**
 * Check if the current user can access a specific resource
 * This is a placeholder for future server-side validation
 * 
 * @param resourceType - The type of resource (e.g., 'audit', 'finding')
 * @param resourceId - The ID of the resource
 * @param action - The action to perform (e.g., 'read', 'update', 'delete')
 * @returns true if access is allowed, false otherwise
 * 
 * NOTE: This is currently client-side only. In production, this should be
 * validated server-side with Supabase RLS policies.
 */
export function canAccessResource(
  resourceType: string,
  resourceId: string,
  action: 'read' | 'update' | 'delete'
): boolean {
  const context = getSecurityContext();
  
  if (!context.isAuthenticated) {
    return false;
  }

  const permission = `${resourceType}:${action}`;
  
  if (!context.permissions.includes(permission)) {
    return false;
  }

  // TODO: In production, validate ownership/department access server-side
  // For now, all authenticated users with the permission can access all resources
  
  return true;
}

/**
 * Validate that a user can perform an action on a resource
 * Throws an error if the action is not allowed
 * 
 * @param resourceType - The type of resource
 * @param resourceId - The ID of the resource
 * @param action - The action to perform
 * @throws Error if the action is not allowed
 */
export function validateAccess(
  resourceType: string,
  resourceId: string,
  action: 'read' | 'update' | 'delete'
): void {
  if (!canAccessResource(resourceType, resourceId, action)) {
    throw new Error(
      `Access denied: User does not have permission to ${action} ${resourceType}`
    );
  }
}

/**
 * Check if the current user can create a resource
 * 
 * @param resourceType - The type of resource to create
 * @returns true if the user can create the resource, false otherwise
 */
export function canCreate(resourceType: string): boolean {
  return hasPermission(`${resourceType}:create`);
}

/**
 * Check if the current user can read a resource
 * 
 * @param resourceType - The type of resource to read
 * @returns true if the user can read the resource, false otherwise
 */
export function canRead(resourceType: string): boolean {
  return hasPermission(`${resourceType}:read`);
}

/**
 * Check if the current user can update a resource
 * 
 * @param resourceType - The type of resource to update
 * @param resourceId - The ID of the resource
 * @returns true if the user can update the resource, false otherwise
 */
export function canUpdate(resourceType: string, resourceId: string): boolean {
  return canAccessResource(resourceType, resourceId, 'update');
}

/**
 * Check if the current user can delete a resource
 * 
 * @param resourceType - The type of resource to delete
 * @param resourceId - The ID of the resource
 * @returns true if the user can delete the resource, false otherwise
 */
export function canDelete(resourceType: string, resourceId: string): boolean {
  return canAccessResource(resourceType, resourceId, 'delete');
}

/**
 * Security boundary layer initialization
 * Call this on application startup to initialize security context
 */
export function initializeSecurity(): void {
  // Currently a no-op since we're using client-side auth
  // In production, this would initialize server-side session validation
  console.log('[Security] Security boundary layer initialized (CLIENT-SIDE MODE)');
}

/**
 * Security boundary layer cleanup
 * Call this on application shutdown or logout
 */
export function cleanupSecurity(): void {
  // Currently a no-op since we're using client-side auth
  // In production, this would invalidate server-side sessions
  console.log('[Security] Security boundary layer cleaned up');
}
