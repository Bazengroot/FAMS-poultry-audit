import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { id } from './id';
import { en } from './en';

export type Language = 'id' | 'en';

type Translations = typeof id;

const translations: Record<Language, Translations> = {
  id,
  en,
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = 'fams_language';
const DEFAULT_LANGUAGE: Language = 'id';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored === 'id' || stored === 'en') ? stored : DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: keyof Translations, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || key;
    
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    
    return text;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

// Helper function to get facility-specific approval titles
export function getApprovalTitle(type: 'supervisor' | 'manager', facilityType?: string, t?: (key: any) => string): string {
  if (!t) return type === 'supervisor' ? 'Supervisor' : 'Manager';
  
  const isFarm = facilityType?.includes('farm') || facilityType?.includes('layer') || facilityType?.includes('broiler');
  
  if (type === 'supervisor') {
    return isFarm ? t('pdf.supervisorFarm') : t('pdf.supervisorFacility');
  } else {
    return isFarm ? t('pdf.managerFarm') : t('pdf.managerFacility');
  }
}
