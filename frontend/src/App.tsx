import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './components/Toast';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuditsList, StartAudit, AuditDetail } from './pages/Audits';
import AuditTemplates, { ChecklistLibrary } from './pages/Templates';
import Findings from './pages/Findings';
import CorrectiveActions from './pages/CorrectiveActions';
import { Performance, Analytics } from './pages/Analytics';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Calendar from './pages/Calendar';
import Departments from './pages/Departments';
import Facilities from './pages/Facilities';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
}

function AppRoutes() {
  const { currentUser, isInitialized } = useApp();

  // Show loading state until initialization is complete
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, all unknown routes go to login
  // If authenticated, unknown routes go to dashboard
  const defaultRedirect = currentUser ? '/dashboard' : '/login';

  return (
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/" element={<Navigate to={defaultRedirect} replace />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/audits" element={<ProtectedRoute><AuditsList /></ProtectedRoute>} />
      <Route path="/audits/new" element={<ProtectedRoute><StartAudit /></ProtectedRoute>} />
      <Route path="/audits/:id" element={<ProtectedRoute><AuditDetail /></ProtectedRoute>} />
      <Route path="/templates" element={<ProtectedRoute><AuditTemplates /></ProtectedRoute>} />
      <Route path="/checklist-library" element={<ProtectedRoute><ChecklistLibrary /></ProtectedRoute>} />
      <Route path="/findings" element={<ProtectedRoute><Findings /></ProtectedRoute>} />
      <Route path="/corrective-actions" element={<ProtectedRoute><CorrectiveActions /></ProtectedRoute>} />
      <Route path="/performance" element={<ProtectedRoute><Performance /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
      <Route path="/departments" element={<ProtectedRoute><Departments /></ProtectedRoute>} />
      <Route path="/facilities" element={<ProtectedRoute><Facilities /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={defaultRedirect} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
