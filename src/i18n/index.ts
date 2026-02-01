/**
 * Hofstede i18n Module
 *
 * Provides internationalization support for Korean and English.
 *
 * @example
 * ```tsx
 * // In your main App wrapper:
 * import { LanguageProvider } from './i18n';
 *
 * function App() {
 *   return (
 *     <LanguageProvider>
 *       <YourApp />
 *     </LanguageProvider>
 *   );
 * }
 *
 * // In any component:
 * import { useLanguage } from './i18n';
 *
 * function MyComponent() {
 *   const { t, language, toggleLanguage } = useLanguage();
 *
 *   return (
 *     <div>
 *       <h1>{t('appTitle')}</h1>
 *       <button onClick={toggleLanguage}>
 *         {language === 'ko' ? 'English' : '한국어'}
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */

// Context and hooks
export {
  LanguageProvider,
  useLanguage,
  useTranslation,
  LanguageContext,
  type LanguageContextType,
  type LanguageProviderProps,
} from './LanguageContext';

// Translations
export {
  translations,
  getTranslation,
  interpolate,
  type Language,
  type TranslationKeys,
} from './translations';
