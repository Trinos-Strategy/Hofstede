import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import type { Country, ClusterType } from '../types';
import { countries, clusterInfo } from '../data/countries';
import { useLanguage } from '../i18n';

interface CountrySelectorProps {
  selectedCountries: Country[];
  onCountrySelect: (country: Country) => void;
  onCountryRemove: (countryCode: string) => void;
  filterCluster: ClusterType | null;
  maxSelections?: number;
}

const countryColors = [
  { bg: 'var(--color-teal, #1b9e77)', text: 'var(--color-ivory, #F5F0E8)' },   // Teal
  { bg: 'var(--color-coral, #d95f02)', text: 'var(--color-ivory, #F5F0E8)' },  // Orange
  { bg: 'var(--color-sage, #7570b3)', text: 'var(--color-ivory, #F5F0E8)' },   // Purple
];

const clusterColors: Record<ClusterType, string> = {
  contest: 'var(--contest-color, #8B6914)',
  network: 'var(--network-color, #5A6350)',
  family: 'var(--family-color, #9D7E00)',
  pyramid: 'var(--pyramid-color, #6B5A42)',
  solarSystem: 'var(--solar-color, #A0654A)',
  machine: 'var(--machine-color, #4A5A6B)',
};

function getCountryFlag(code: string): string {
  const flags: Record<string, string> = {
    USA: '🇺🇸', GBR: '🇬🇧', AUS: '🇦🇺', IRL: '🇮🇪', NZL: '🇳🇿',
    DNK: '🇩🇰', NLD: '🇳🇱', NOR: '🇳🇴', SWE: '🇸🇪', FIN: '🇫🇮',
    CHN: '🇨🇳', HKG: '🇭🇰', IND: '🇮🇳', IDN: '🇮🇩', MYS: '🇲🇾', PHL: '🇵🇭', SGP: '🇸🇬',
    BRA: '🇧🇷', CHL: '🇨🇱', COL: '🇨🇴', GRC: '🇬🇷', KOR: '🇰🇷', MEX: '🇲🇽', PER: '🇵🇪',
    PRT: '🇵🇹', RUS: '🇷🇺', TWN: '🇹🇼', THA: '🇹🇭', TUR: '🇹🇷', VEN: '🇻🇪', JPN: '🇯🇵',
    BEL: '🇧🇪', FRA: '🇫🇷', ITA: '🇮🇹', ESP: '🇪🇸', POL: '🇵🇱',
    AUT: '🇦🇹', CZE: '🇨🇿', DEU: '🇩🇪', HUN: '🇭🇺', CHE: '🇨🇭'
  };
  return flags[code] || '🏳️';
}

// Common alternate names so everyday queries ("한국", "미국", "Holland") match.
const countryAliases: Record<string, string[]> = {
  KOR: ['한국', '남한', 'korea', 'south korea'],
  USA: ['미국', 'america', 'united states', 'us', 'usa'],
  GBR: ['영국', 'britain', 'uk', 'united kingdom', 'england'],
  CHN: ['중국', 'china', 'prc'],
  JPN: ['일본', 'japan'],
  DEU: ['독일', 'germany'],
  NLD: ['네덜란드', 'holland'],
  TWN: ['대만', 'taiwan'],
  HKG: ['홍콩', 'hong kong'],
  CZE: ['체코', 'czech'],
  VEN: ['베네수엘라', 'venezuela'],
  RUS: ['러시아', 'russia'],
};

export function CountrySelector({
  selectedCountries,
  onCountrySelect,
  onCountryRemove,
  filterCluster,
  maxSelections = 3
}: CountrySelectorProps) {
  const { t, isKorean } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
              setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const query = searchTerm.toLowerCase();
      const aliases = countryAliases[country.code] ?? [];
      const matchesSearch =
        country.name.toLowerCase().includes(query) ||
        country.nameKo.includes(searchTerm) ||
        country.code.toLowerCase().includes(query) ||
        aliases.some((a) => a.includes(query));
      const matchesCluster = filterCluster ? country.cluster === filterCluster : true;
      const notSelected = !selectedCountries.find((c) => c.code === country.code);
      return matchesSearch && matchesCluster && notSelected;
    });
  }, [searchTerm, filterCluster, selectedCountries]);

  // Reset active index when search or list changes
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setActiveIndex(0);
    });
    return () => cancelAnimationFrame(handle);
  }, [filteredCountries]);

  // Scroll active item into view
  useEffect(() => {
    if (isOpen && optionsListRef.current) {
      const activeEl = optionsListRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        const listHeight = optionsListRef.current.clientHeight;
        const listScrollTop = optionsListRef.current.scrollTop;
        const elOffsetTop = activeEl.offsetTop;
        const elHeight = activeEl.clientHeight;

        if (elOffsetTop < listScrollTop) {
          optionsListRef.current.scrollTop = elOffsetTop;
        } else if (elOffsetTop + elHeight > listScrollTop + listHeight) {
          optionsListRef.current.scrollTop = elOffsetTop + elHeight - listHeight;
        }
      }
    }
  }, [activeIndex, isOpen]);

  // Flatten all visible options for keyboard navigation — memoized to keep deps stable
    const groupedCountries = useMemo(() => {
    const groups: Record<string, Country[]> = {};
    filteredCountries.forEach((country) => {
      const cluster = country.cluster || 'other';
      if (!groups[cluster]) groups[cluster] = [];
      groups[cluster].push(country);
    });
    return groups;
  }, [filteredCountries]);

  const _flatOptions = useMemo(() => {
    const options: { country: Country; cluster: ClusterType; index: number }[] = [];
    Object.entries(groupedCountries).forEach(([cluster, clusterCountries]) => {
      clusterCountries.forEach((country) => {
        options.push({ country, cluster: cluster as ClusterType, index: options.length });
      });
    });
    return options;
  }, [groupedCountries]);

  const canAddMore = selectedCountries.length < maxSelections;

  const selectCountry = (country: Country) => {
    onCountrySelect(country);
    setSearchTerm('');
    if (selectedCountries.length + 1 >= maxSelections) {
      setIsOpen(false);
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!canAddMore) return;

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (filteredCountries.length > 0 ? (prev + 1) % filteredCountries.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (filteredCountries.length > 0 ? (prev - 1 + filteredCountries.length) % filteredCountries.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCountries[activeIndex]) {
        selectCountry(filteredCountries[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Selected Countries Pills ABOVE the input */}
      <div className="flex flex-wrap gap-2.5 mb-4 min-h-[40px] items-center">
        <AnimatePresence mode="popLayout">
          {selectedCountries.map((country, index) => (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, scale: 0.85, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="country-pill flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold shadow-md border border-white/10"
              style={{
                backgroundColor: countryColors[index % countryColors.length].bg,
                color: countryColors[index % countryColors.length].text,
              }}
            >
              <span className="text-sm">{getCountryFlag(country.code)}</span>
              <span className="tracking-wide">
                {isKorean ? country.nameKo : country.name}
              </span>
              <button
                onClick={() => {
                  onCountryRemove(country.code);
                  inputRef.current?.focus();
                }}
                className="remove-btn p-0.5 rounded-full hover:bg-white/20 transition-colors duration-200 cursor-pointer flex items-center justify-center ml-1"
                aria-label={`Remove ${country.name}`}
              >
                <X className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {selectedCountries.length === 0 && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-[var(--color-ivory-muted, #C8C0B0)] italic tracking-wide pl-1"
          >
            {t('selectCountry', { max: maxSelections })}
          </motion.span>
        )}
      </div>

      {/* Input Field with Search Icon */}
      <div className="relative w-full">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-[var(--color-ivory-muted)]" strokeWidth={1.5} />
        </div>
        <input
          ref={inputRef}
          type="text"
          disabled={!canAddMore}
          value={canAddMore ? searchTerm : ''}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => canAddMore && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={
            canAddMore
              ? (isKorean ? '국가 검색...' : 'Search countries...')
              : t('maxSelectionComplete')
          }
          className={`
            w-full pl-11 pr-4 h-12 text-sm rounded-lg bg-white/5 border border-white/10
            placeholder-[var(--color-ivory-muted)]/60
            focus:border-[var(--color-brass)]/60 focus:ring-0 focus:outline-none
            transition-all duration-300
            ${canAddMore
              ? 'text-[var(--color-ivory, #F5F0E8)]'
              : 'text-[var(--color-ivory-muted, #C8C0B0)]/40 cursor-not-allowed opacity-50'
            }
          `}
        />
      </div>

      {/* Dropdown Container using glass-card styling */}
      <AnimatePresence>
        {isOpen && canAddMore && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute z-50 w-full mt-2 rounded-xl border border-white/10 bg-[#12172a]/95 backdrop-blur-xl shadow-2xl max-h-[300px] overflow-y-auto"
            ref={optionsListRef}
          >
            {filteredCountries.map((country, index) => {
              const isActive = index === activeIndex;
              const clr = clusterColors[country.cluster];
              return (
                <button
                  key={country.code}
                  onClick={() => selectCountry(country)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`
                    w-full px-5 py-3 text-left text-sm flex items-center justify-between
                    transition-all duration-200 border-b border-white/5 cursor-pointer min-h-[48px]
                    hover:bg-white/5
                    ${isActive
                      ? 'bg-white/10 border-l-2 border-l-[var(--color-brass)] pl-4'
                      : 'bg-transparent'
                    }
                  `}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-base">{getCountryFlag(country.code)}</span>
                    <span className={`text-[var(--color-ivory)] ${isActive ? 'font-bold' : 'font-medium'}`}>
                      {isKorean ? country.nameKo : country.name}
                    </span>
                    <span className="text-xs text-[var(--color-ivory-muted)] opacity-60">
                      ({country.code})
                    </span>
                  </span>

                  {/* Cluster badge */}
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide uppercase border"
                    style={{
                      backgroundColor: `${clr}15`,
                      color: clr,
                      borderColor: `${clr}35`,
                    }}
                  >
                    {isKorean ? clusterInfo[country.cluster].nameKo : clusterInfo[country.cluster].name}
                  </span>
                </button>
              );
            })}

            {filteredCountries.length === 0 && (
              <div className="px-5 py-8 text-sm text-[var(--color-ivory-muted)] text-center flex flex-col items-center justify-center gap-2">
                <Search className="w-6 h-6 opacity-30" strokeWidth={1.5} />
                <span>{t('noSearchResults')}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CountrySelector;
