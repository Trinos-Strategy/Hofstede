import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';

export function LanguageSwitcher() {
  const { isKorean, setLanguage } = useLanguage();

  return (
    <div
      role="radiogroup"
      aria-label="Language"
      className="inline-flex h-8 items-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-1)] p-0.5"
    >
      <button
        type="button"
        role="radio"
        aria-checked={isKorean}
        onClick={() => {
          if (!isKorean) setLanguage('ko');
        }}
        className={`relative isolate px-3 h-7 rounded-full text-xs font-medium transition-colors duration-200 cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brass)]/60 ${
          isKorean
            ? 'bg-[var(--color-brass)]/15 text-[var(--color-brass-light)]'
            : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-ivory)]'
        }`}
      >
        {isKorean && (
          <motion.span
            layoutId="lang-pill"
            className="absolute inset-0 rounded-full bg-[var(--surface-2)] -z-10"
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            aria-hidden="true"
          />
        )}
        <span className="relative z-10">한국어</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={!isKorean}
        onClick={() => {
          if (isKorean) setLanguage('en');
        }}
        className={`relative isolate px-3 h-7 rounded-full text-xs font-medium transition-colors duration-200 cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brass)]/60 ${
          !isKorean
            ? 'bg-[var(--color-brass)]/15 text-[var(--color-brass-light)]'
            : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-ivory)]'
        }`}
      >
        {!isKorean && (
          <motion.span
            layoutId="lang-pill"
            className="absolute inset-0 rounded-full bg-[var(--surface-2)] -z-10"
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            aria-hidden="true"
          />
        )}
        <span className="relative z-10">EN</span>
      </button>
    </div>
  );
}

export default LanguageSwitcher;

