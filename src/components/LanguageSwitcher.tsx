/**
 * LanguageSwitcher Component
 * 
 * Modern language toggle with 2025-2026 UI trends:
 * - Liquid Glass style with backdrop blur
 * - Smooth pill-shaped toggle
 * - Accessible with keyboard navigation
 * - Responsive for mobile
 */

import { useLanguage } from '../i18n';
import './LanguageSwitcher.css';

export function LanguageSwitcher() {
  const { language, toggleLanguage, t } = useLanguage();
  const isKorean = language === 'ko';

  return (
    <button
      className="language-switcher"
      onClick={toggleLanguage}
      aria-label={t('languageSwitcher.ariaLabel')}
      title={t('languageSwitcher.tooltip')}
    >
      <span className="language-switcher__globe" aria-hidden="true">
        🌐
      </span>
      <span className="language-switcher__options">
        <span 
          className={`language-switcher__option ${isKorean ? 'active' : ''}`}
          aria-current={isKorean ? 'true' : undefined}
        >
          KO
        </span>
        <span className="language-switcher__divider">/</span>
        <span 
          className={`language-switcher__option ${!isKorean ? 'active' : ''}`}
          aria-current={!isKorean ? 'true' : undefined}
        >
          EN
        </span>
      </span>
    </button>
  );
}

export default LanguageSwitcher;
