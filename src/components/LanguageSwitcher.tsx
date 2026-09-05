import { useLanguage } from '../i18n';

export function LanguageSwitcher() {
  const { isKorean, setLanguage } = useLanguage();

  return (
    <div
      role="radiogroup"
      aria-label="Language"
      className="flex rounded-full border border-[var(--surface-border)] bg-[var(--surface-1)] backdrop-blur-md p-1 gap-1"
    >
      <button
        type="button"
        role="radio"
        aria-checked={isKorean}
        onClick={() => {
          if (!isKorean) setLanguage('ko');
        }}
        className={`min-w-[56px] h-9 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brass)]/60 ${
          isKorean
            ? 'bg-[var(--color-brass)] text-white shadow-sm'
            : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-ivory)]'
        }`}
      >
        한국어
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={!isKorean}
        onClick={() => {
          if (isKorean) setLanguage('en');
        }}
        className={`min-w-[56px] h-9 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brass)]/60 ${
          !isKorean
            ? 'bg-[var(--color-brass)] text-white shadow-sm'
            : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-ivory)]'
        }`}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSwitcher;
