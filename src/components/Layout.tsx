import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Building2, Home, ClipboardCheck, Calendar, FileText, Library, AlertTriangle, Wrench, BarChart3, PieChart, Users, Settings, Menu, X, Bell, LogOut, ChevronDown, Search, Factory, Briefcase } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n';
import LanguageSelector from './LanguageSelector';

type NavItem = { label: string; path: string; icon: React.ComponentType<{className?: string}> };
type NavGroup = { group: string; items: NavItem[] };
type NavEntry = NavItem | NavGroup;

const navItems: NavEntry[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { group: 'Operasi', items: [
    { label: 'Audit', path: '/audits', icon: ClipboardCheck },
    { label: 'Kalender Audit', path: '/calendar', icon: Calendar },
  ]},
  { group: 'Enterprise', items: [
    { label: 'Departemen', path: '/departments', icon: Briefcase },
    { label: 'Fasilitas', path: '/facilities', icon: Factory },
  ]},
  { group: 'Manajemen Audit', items: [
    { label: 'Template Audit', path: '/templates', icon: FileText },
    { label: 'Checklist Library', path: '/checklist-library', icon: Library },
    { label: 'Temuan', path: '/findings', icon: AlertTriangle },
    { label: 'Tindakan Korektif', path: '/corrective-actions', icon: Wrench },
  ]},
  { group: 'Analitik', items: [
    { label: 'Performa Fasilitas', path: '/performance', icon: BarChart3 },
    { label: 'Analitik Audit', path: '/analytics', icon: PieChart },
    { label: 'Laporan', path: '/reports', icon: FileText },
  ]},
  { group: 'Administrasi', items: [
    { label: 'Pengguna', path: '/users', icon: Users },
    { label: 'Pengaturan', path: '/settings', icon: Settings },
  ]},
];

function isNavItem(item: NavEntry): item is NavItem {
  return 'path' in item;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout, notifications, sidebarOpen, setSidebarOpen, markNotificationRead } = useApp();
  const { t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read && n.userId === currentUser?.id).length;

  const handleLogout = () => {
    logout();
    // Force navigation to login page
    navigate('/login', { replace: true });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-sm">FAMS</h1>
            <p className="text-xs text-gray-500">Farm Audit System</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item, idx) => {
          if (isNavItem(item)) {
            const Icon = item.icon;
            return (
              <Link key={idx} to={item.path} onClick={() => setMobileOpen(false)}
                className={location.pathname === item.path ? 'sidebar-link-active' : 'sidebar-link'}>
                <Icon className="w-4 h-4" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          }
          return (
            <div key={idx}>
              {sidebarOpen && <p className="text-xs font-semibold text-gray-400 uppercase px-3 pt-4 pb-1">{item.group}</p>}
              {item.items.map((sub, sidx) => {
                const SubIcon = sub.icon;
                return (
                  <Link key={sidx} to={sub.path} onClick={() => setMobileOpen(false)}
                    className={location.pathname === sub.path ? 'sidebar-link-active' : 'sidebar-link'}>
                    <SubIcon className="w-4 h-4" />
                    {sidebarOpen && <span>{sub.label}</span>}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col border-r border-gray-200 bg-white transition-all duration-200 ${sidebarOpen ? 'w-60' : 'w-16'}`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-white flex flex-col z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => { if (window.innerWidth < 768) setMobileOpen(!mobileOpen); else setSidebarOpen(!sidebarOpen); }}
              className="p-1.5 rounded-lg hover:bg-gray-100">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => { setShowNotif(!showNotif); setShowUser(false); }}
                className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{unreadCount}</span>
                )}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-3 border-b border-gray-100 font-semibold text-sm">Notifikasi</div>
                  {notifications.filter(n => n.userId === currentUser?.id).slice(0, 10).map(n => (
                    <div key={n.id} onClick={() => { markNotificationRead(n.id); if (n.link) navigate(n.link); setShowNotif(false); }}
                      className={`p-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 ${!n.read ? 'bg-blue-50' : ''}`}>
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-gray-500">{n.message}</p>
                    </div>
                  ))}
                  {notifications.length === 0 && <p className="p-4 text-sm text-gray-500 text-center">Tidak ada notifikasi</p>}
                </div>
              )}
            </div>
            {/* User menu */}
            <div className="relative">
              <button onClick={() => { setShowUser(!showUser); setShowNotif(false); }}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100">
                <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-700">{currentUser?.name?.charAt(0) || 'U'}</span>
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">{currentUser?.name}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
              {showUser && (
                <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-medium">{currentUser?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{currentUser?.role?.replace('_', ' ')}</p>
                  </div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4" /> Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
