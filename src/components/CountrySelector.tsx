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
  'from-blue-500 to-indigo-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
];

const countryGlows = [
  'rgba(59, 130, 246, 0.4)',
  'rgba(16, 185, 129, 0.4)',
  'rgba(245, 158, 11, 0.4)',
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
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-2">
          <AnimatePresence mode="popLayout">
            {selectedCountries.map((country, index) => (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`
                  country-pill flex items-center gap-2 px-4 py-2 rounded-xl
                  text-white text-sm font-medium
                  bg-gradient-to-r ${countryColors[index % countryColors.length]}
                  shadow-lg
                `}
                style={{ boxShadow: `0 4px 20px ${countryGlows[index % countryGlows.length]}` }}
              >
                <span>{country.nameKo}</span>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onCountryRemove(country.code)}
                  className="remove-btn p-0.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {selectedCountries.length === 0 && (
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            국가를 선택하세요 (최대 {maxSelections}개)
          </p>
        )}
      </div>

      <motion.button
        whileHover={canAddMore ? { scale: 1.01 } : {}}
        whileTap={canAddMore ? { scale: 0.99 } : {}}
        onClick={() => canAddMore && setIsOpen(!isOpen)}
        disabled={!canAddMore}
        className={`
          w-full flex items-center justify-between px-4 py-3
          rounded-xl transition-all duration-300
          ${canAddMore
            ? 'bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10 cursor-pointer'
            : 'bg-white/5 border border-white/10 cursor-not-allowed opacity-50'
          }
        `}
      >
        <span className={canAddMore ? 'text-gray-300' : 'text-gray-500'}>
          {canAddMore ? '국가 추가...' : '최대 선택 완료'}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${
            canAddMore ? 'text-gray-400' : 'text-gray-600'
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 rounded-xl overflow-hidden border border-white/10"
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.98)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)'
            }}
          >
            <div className="p-3 border-b border-white/10 bg-slate-900/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="국가 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm
                    bg-slate-800/80 border border-white/10 rounded-lg
                    text-white placeholder-gray-400
                    focus:border-purple-500/50 focus:bg-slate-800
                    transition-all duration-200"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto bg-slate-900/30">
              {Object.entries(groupedCountries).map(([cluster, clusterCountries]) => {
                const info = clusterInfo[cluster as ClusterType];
                return (
                  <div key={cluster}>
                    <div
                      className="px-4 py-2 text-xs font-semibold sticky top-0 bg-slate-800/90 backdrop-blur-sm border-b border-white/5"
                      style={{ color: info.color }}
                    >
                      {info.icon} {info.nameKo}
                    </div>
                    {clusterCountries.map((country) => (
                      <motion.button
                        key={country.code}
                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                        onClick={() => {
                          onCountrySelect(country);
                          setSearchTerm('');
                          if (selectedCountries.length + 1 >= maxSelections) {
                            setIsOpen(false);
                          }
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm flex items-center justify-between
                          transition-colors duration-150 hover:bg-slate-700/50"
                      >
                        <span className="text-gray-100">{country.nameKo}</span>
                        <span className="text-xs text-gray-400">{country.name}</span>
                      </motion.button>
                    ))}
                  </div>
                );
              })}
              {Object.keys(groupedCountries).length === 0 && (
                <div className="px-4 py-8 text-sm text-gray-500 text-center">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
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
