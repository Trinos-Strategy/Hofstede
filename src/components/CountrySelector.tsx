import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Search, Plus } from 'lucide-react';
import type { Country, ClusterType } from '../types';
import { countries, clusterInfo, clusterOrder } from '../data/countries';

interface CountrySelectorProps {
  selectedCountries: Country[];
  onCountrySelect: (country: Country) => void;
  onCountryRemove: (countryCode: string) => void;
  filterCluster: ClusterType | null;
  maxSelections?: number;
}

const countryColors = [
  { bg: '#B8956A', text: '#FFFFFF' },
  { bg: '#7D8471', text: '#FFFFFF' },
  { bg: '#C4886B', text: '#FFFFFF' },
];

export function CountrySelector({
  selectedCountries,
  onCountrySelect,
  onCountryRemove,
  filterCluster,
  maxSelections = 3
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
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

  const canAddMore = selectedCountries.length < maxSelections;

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
                <span className="tracking-wide">{country.nameKo}</span>
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
          <p className="text-sm text-[#5A5A5A] flex items-center gap-2">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            국가를 선택하세요 (최대 {maxSelections}개)
          </p>
        )}
      </div>

      <motion.button
        whileHover={canAddMore ? { scale: 1.005 } : {}}
        whileTap={canAddMore ? { scale: 0.995 } : {}}
        onClick={() => canAddMore && setIsOpen(!isOpen)}
        disabled={!canAddMore}
        className={`
          w-full flex items-center justify-between px-5 py-4
          rounded-lg transition-all duration-500
          ${canAddMore
            ? 'bg-[#F5F4F0] border border-black/8 hover:border-[#B8956A]/50 cursor-pointer'
            : 'bg-[#F5F4F0] border border-black/5 cursor-not-allowed opacity-50'
          }
        `}
      >
        <span className={`text-sm ${canAddMore ? 'text-[#5A5A5A]' : 'text-[#5A5A5A]/50'}`}>
          {canAddMore ? '국가 추가...' : '최대 선택 완료'}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''} ${
            canAddMore ? 'text-[#5A5A5A]' : 'text-[#5A5A5A]/50'
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
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5A5A5A]" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="국가 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-sm
                    bg-white border border-black/8 rounded-lg
                    text-[#1A1A1A] placeholder-[#5A5A5A]/60
                    focus:border-[#B8956A] focus:ring-0
                    transition-all duration-300"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto bg-white">
              {Object.entries(groupedCountries).map(([cluster, clusterCountries]) => {
                const info = clusterInfo[cluster as ClusterType];
                return (
                  <div key={cluster}>
                    <div
                      className="px-5 py-2.5 text-xs font-medium uppercase tracking-wider sticky top-0 bg-[#F5F4F0] border-b border-black/5"
                      style={{ color: info.color }}
                    >
                      <span className="mr-2">{info.icon}</span>
                      {info.nameKo}
                    </div>
                    {clusterCountries.map((country) => (
                      <motion.button
                        key={country.code}
                        whileHover={{ backgroundColor: '#FAFAF8' }}
                        onClick={() => {
                          onCountrySelect(country);
                          setSearchTerm('');
                          if (selectedCountries.length + 1 >= maxSelections) {
                            setIsOpen(false);
                          }
                        }}
                        className="w-full px-5 py-3.5 text-left text-sm flex items-center justify-between
                          transition-colors duration-300 border-b border-black/3"
                      >
                        <span className="text-[#1A1A1A]">{country.nameKo}</span>
                        <span className="text-xs text-[#5A5A5A]/60 tracking-wide">{country.name}</span>
                      </motion.button>
                    ))}
                  </div>
                );
              })}
              {Object.keys(groupedCountries).length === 0 && (
                <div className="px-5 py-10 text-sm text-[#5A5A5A] text-center">
                  <Search className="w-8 h-8 mx-auto mb-3 opacity-30" strokeWidth={1.5} />
                  검색 결과가 없습니다
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
