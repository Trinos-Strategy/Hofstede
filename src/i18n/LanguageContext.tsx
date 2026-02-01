/**
 * Language Context for i18n support
 *
 * Provides language state management with React Context.
 * - Stores language preference in localStorage
 * - Default language: Korean (ko)
 * - Supports toggle between Korean and English
 */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { translations, type Language, type TranslationKeys, interpolate } from './translations';

// Storage key for localStorage
const LANGUAGE_STORAGE_KEY = 'hofstede-language';

// Default language
const DEFAULT_LANGUAGE: Language = 'ko';

// Context type definition
interface LanguageContextType {
  /** Current language */
  language: Language;
  /** Set specific language */
  setLanguage: (lang: Language) => void;
  /** Toggle between ko and en */
  toggleLanguage: () => void;
  /** Get translation by key */
  t: (key: keyof TranslationKeys, variables?: Record<string, string | number>) => string;
  /** Check if current language is Korean */
  isKorean: boolean;
  /** Check if current language is English */
  isEnglish: boolean;
}

// Create context with undefined as default (will be checked in useLanguage hook)
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider props
interface LanguageProviderProps {
  children: ReactNode;
  /** Override default language (useful for testing) */
  defaultLanguage?: Language;
}

/**
 * Get initial language from localStorage or default
 */
function getInitialLanguage(defaultLang: Language = DEFAULT_LANGUAGE): Language {
  if (typeof window === 'undefined') {
    return defaultLang;
  }

  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === 'ko' || stored === 'en') {
      return stored;
    }
  } catch (error) {
    // localStorage might be unavailable in some contexts
    console.warn('Failed to read language from localStorage:', error);
  }

  return defaultLang;
}

/**
 * Save language to localStorage
 */
function saveLanguage(lang: Language): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch (error) {
    console.warn('Failed to save language to localStorage:', error);
  }
}

/**
 * Language Provider Component
 *
 * Wrap your app with this provider to enable i18n support.
 *
 * @example
 * ```tsx
 * import { LanguageProvider } from './i18n';
 *
 * function App() {
 *   return (
 *     <LanguageProvider>
 *       <YourApp />
 *     </LanguageProvider>
 *   );
 * }
 * ```
 */
export function LanguageProvider({ children, defaultLanguage }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() =>
    getInitialLanguage(defaultLanguage)
  );

  // Sync with localStorage on mount (handle SSR)
  useEffect(() => {
    const stored = getInitialLanguage(defaultLanguage);
    if (stored !== language) {
      setLanguageState(stored);
    }
  }, [defaultLanguage]);

  // Set language and persist to localStorage
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    saveLanguage(lang);
  }, []);

  // Toggle between ko and en
  const toggleLanguage = useCallback(() => {
    const newLang: Language = language === 'ko' ? 'en' : 'ko';
    setLanguage(newLang);
  }, [language, setLanguage]);

  // Translation function with variable interpolation support
  const t = useCallback(
    (key: keyof TranslationKeys, variables?: Record<string, string | number>): string => {
      const text = translations[language][key];
      if (variables) {
        return interpolate(text, variables);
      }
      return text;
    },
    [language]
  );

  // Convenience boolean flags
  const isKorean = language === 'ko';
  const isEnglish = language === 'en';

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isKorean,
    isEnglish,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to access language context
 *
 * @throws Error if used outside of LanguageProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { t, language, toggleLanguage } = useLanguage();
 *
 *   return (
 *     <div>
 *       <h1>{t('appTitle')}</h1>
 *       <p>Current: {language}</p>
 *       <button onClick={toggleLanguage}>Switch Language</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}

/**
 * Hook to get just the translation function
 * Useful when you only need translations without language state
 *
 * @example
 * ```tsx
 * function Label() {
 *   const t = useTranslation();
 *   return <span>{t('countrySelection')}</span>;
 * }
 * ```
 */
export function useTranslation() {
  const { t } = useLanguage();
  return t;
}

export { LanguageContext };
export type { LanguageContextType, LanguageProviderProps };
