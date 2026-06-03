import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Search, Plus } from 'lucide-react';
import type { Country, ClusterType } from '../types';
import { countries, clusterInfo, clusterOrder } from '../data/countries';
import { useLanguage } from '../i18n';

interface CountrySelectorProps {
  selectedCountries: Country[];
  onCountrySelect: (country: Country) => void;
  onCountryRemove: (countryCode: string) => void;
  filterCluster: ClusterType | null;
  maxSelections?: number;
}

// ColorBrewer qualitative palette - consistent with radar chart
const countryColors = [
  { bg: '#1b9e77', text: '#FFFFFF' }, // Teal - 1st country
  { bg: '#d95f02', text: '#FFFFFF' }, // Orange - 2nd country
  { bg: '#7570b3', text: '#FFFFFF' }, // Purple - 3rd country
];

export function CountrySelector({
  selectedCountries,
  onCountrySelect,
  onCountryRemove,
  filterCluster,
  maxSelections = 3
}: CountrySelectorProps) {
  const { t, isKorean } = useLanguage();
  const [isOpen, setIsOpenState] = useState(false);
  const [searchTerm, setSearchTermState] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Controlled open/close with focused index reset
  const setIsOpen = useCallback((open: boolean) => {
    setIsOpenState(open);
    if (open) {
      setFocusedIndex(-1);
      optionRefs.current = [];
    }
  }, []);

  // Controlled search with focused index reset
  const setSearchTerm = useCallback((term: string) => {
    setSearchTermState(term);
    setFocusedIndex(-1);
    optionRefs.current = [];
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpenState(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch =
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.nameKo.includes(searchTerm);
    const matchesCluster = filterCluster ? country.cluster === filterCluster : true;
    const notSelected = !selectedCountries.find((c) => c.code === country.code);
    return matchesSearch && matchesCluster && notSelected;
  });

  const groupedCountries = clusterOrder.reduce((acc, cluster) => {
    const clusterCountries = filteredCountries.filter((c) => c.cluster === cluster);
    if (clusterCountries.length > 0) {
      acc[cluster] = clusterCountries;
    }
    return acc;
  }, {} as Record<ClusterType, Country[]>);

  // Flatten all visible options for keyboard navigation — memoized to keep deps stable
  const flatOptions = useMemo(() => {
    const options: { country: Country; cluster: ClusterType; index: number }[] = [];
    Object.entries(groupedCountries).forEach(([cluster, clusterCountries]) => {
      clusterCountries.forEach((country) => {
        options.push({ country, cluster: cluster as ClusterType, index: options.length });
      });
    });
    return options;
  }, [groupedCountries]);

  const canAddMore = selectedCountries.length < maxSelections;

  const handleSelectCountry = useCallback((country: Country) => {
    onCountrySelect(country);
    setSearchTermState('');
    if (selectedCountries.length + 1 >= maxSelections) {
      setIsOpenState(false);
    }
    setFocusedIndex(-1);
    optionRefs.current = [];
  }, [onCountrySelect, selectedCountries.length, maxSelections]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (canAddMore) {
          setIsOpen(true);
        }
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = prev + 1;
          if (next >= flatOptions.length) return 0;
          return next;
        });
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = prev - 1;
          if (next < 0) return flatOptions.length - 1;
          return next;
        });
        break;
      }
      case 'Enter': {
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < flatOptions.length) {
          handleSelectCountry(flatOptions[focusedIndex].country);
        }
        break;
      }
      case 'Escape': {
        e.preventDefault();
        setIsOpenState(false);
        setFocusedIndex(-1);
        break;
      }
      case 'Home': {
        e.preventDefault();
        setFocusedIndex(0);
        break;
      }
      case 'End': {
        e.preventDefault();
        setFocusedIndex(flatOptions.length - 1);
        break;
      }
    }
  }, [isOpen, canAddMore, flatOptions, focusedIndex, handleSelectCountry, setIsOpen]);

  // Scroll focused option into view
  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [focusedIndex]);

  // Build active descendant ID
  const activeDescendantId = focusedIndex >= 0 ? `country-option-${flatOptions[focusedIndex]?.country.code}` : undefined;

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="mb-5">
        <div className="flex flex-wrap gap-3 mb-3">
          <AnimatePresence mode="popLayout">
            {selectedCountries.map((country, index) => (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="country-pill flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: countryColors[index % countryColors.length].bg,
                  color: countryColors[index % countryColors.length].text,
                }}
              >
                <span className="tracking-wide">{isKorean ? country.nameKo : country.name}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onCountryRemove(country.code)}
                  className="remove-btn p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {selectedCountries.length === 0 && (
          <p className="text-sm text-[#444444] flex items-center gap-2">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            {t('selectCountry', { max: maxSelections })}
          </p>
        )}
      </div>

      <motion.button
        whileHover={canAddMore ? { scale: 1.005 } : {}}
        whileTap={canAddMore ? { scale: 0.995 } : {}}
        onClick={() => canAddMore && setIsOpen(!isOpen)}
        disabled={!canAddMore}
        onKeyDown={handleKeyDown}
        className={`
          w-full flex items-center justify-between px-5 py-4
          rounded-lg transition-all duration-500
          ${canAddMore
            ? 'bg-[#F5F4F0] border border-black/8 hover:border-[#B8956A]/50 cursor-pointer'
            : 'bg-[#F5F4F0] border border-black/5 cursor-not-allowed opacity-50'
          }
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'country-listbox' : undefined}
      >
        <span className={`text-sm ${canAddMore ? 'text-[#444444]' : 'text-[#444444]/50'}`}>
          {canAddMore ? t('addCountry') : t('maxSelectionComplete')}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''} ${
            canAddMore ? 'text-[#444444]' : 'text-[#444444]/50'
          }`}
          strokeWidth={1.5}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute z-50 w-full mt-3 rounded-lg overflow-hidden border border-black/8 bg-white"
            style={{
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)'
            }}
          >
            <div className="p-4 border-b border-black/5 bg-[#FAFAF8]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#444444]" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder={t('searchCountry')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-11 pr-4 py-3 text-sm
                    bg-white border border-black/8 rounded-lg
                    text-[#1A1A1A] placeholder-[#5A5A5A]/60
                    focus:border-[#B8956A] focus:ring-0
                    transition-all duration-300"
                  autoFocus
                  aria-autocomplete="list"
                  aria-controls="country-listbox"
                  aria-activedescendant={activeDescendantId}
                />
              </div>
            </div>
            <div
              ref={listboxRef}
              id="country-listbox"
              role="listbox"
              className="max-h-[70vh] overflow-y-auto bg-white"
              aria-label={t('searchCountry')}
            >
              {Object.entries(groupedCountries).map(([cluster, clusterCountries]) => {
                const info = clusterInfo[cluster as ClusterType];
                return (
                  <div key={cluster}>
                    <div
                      className="px-5 py-2.5 text-xs font-medium uppercase tracking-wider sticky top-0 bg-[#F5F4F0] border-b border-black/5"
                      style={{ color: info.color }}
                    >
                      <span className="mr-2">{info.icon}</span>
                      {isKorean ? info.nameKo : info.name}
                    </div>
                    {clusterCountries.map((country) => {
                      const flatIndex = flatOptions.findIndex((o) => o.country.code === country.code);
                      const isFocused = flatIndex === focusedIndex;
                      return (
                        <motion.button
                          key={country.code}
                          id={`country-option-${country.code}`}
                          ref={(el) => { optionRefs.current[flatIndex] = el; }}
                          role="option"
                          aria-selected={isFocused}
                          whileHover={{ backgroundColor: '#FAFAF8' }}
                          onClick={() => {
                            handleSelectCountry(country);
                          }}
                          onMouseEnter={() => setFocusedIndex(flatIndex)}
                          className={`w-full px-5 py-4 text-left text-sm flex items-center justify-between
                            transition-colors duration-300 border-b border-black/3 min-h-[52px]
                            ${isFocused ? 'bg-[#FAFAF8] outline outline-1 outline-[#B8956A]/40' : ''}
                          `}
                        >
                          <span className="text-[#1A1A1A] font-medium">{isKorean ? country.nameKo : country.name}</span>
                          <span className="text-xs text-[#444444]/60 tracking-wide">{isKorean ? country.name : country.nameKo}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                );
              })}
              {Object.keys(groupedCountries).length === 0 && (
                <div className="px-5 py-10 text-sm text-[#444444] text-center">
                  <Search className="w-8 h-8 mx-auto mb-3 opacity-30" strokeWidth={1.5} />
                  {t('noSearchResults')}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
