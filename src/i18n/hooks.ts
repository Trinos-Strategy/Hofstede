import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import type { LanguageContextType } from './LanguageContext';

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
