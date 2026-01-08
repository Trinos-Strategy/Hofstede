import { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Search } from 'lucide-react';
import type { Country, ClusterType } from '../types';
import { countries, clusterInfo, clusterOrder } from '../data/countries';

interface CountrySelectorProps {
  selectedCountries: Country[];
  onCountrySelect: (country: Country) => void;
  onCountryRemove: (countryCode: string) => void;
  filterCluster: ClusterType | null;
  maxSelections?: number;
}

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
      <div className="mb-3">
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedCountries.map((country, index) => {
            const colors = ['#3B82F6', '#10B981', '#F59E0B'];
            return (
              <div
                key={country.code}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-sm font-medium"
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                <span>{country.nameKo}</span>
                <button
                  onClick={() => onCountryRemove(country.code)}
                  className="hover:bg-white/20 rounded-full p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
        {selectedCountries.length === 0 && (
          <p className="text-sm text-gray-500">국가를 선택하세요 (최대 {maxSelections}개)</p>
        )}
      </div>

      <button
        onClick={() => canAddMore && setIsOpen(!isOpen)}
        disabled={!canAddMore}
        className={`w-full flex items-center justify-between px-4 py-2.5 border rounded-lg transition-colors ${
          canAddMore
            ? 'border-gray-200 hover:border-gray-300 bg-white cursor-pointer'
            : 'border-gray-100 bg-gray-50 cursor-not-allowed'
        }`}
      >
        <span className={canAddMore ? 'text-gray-700' : 'text-gray-400'}>
          {canAddMore ? '국가 추가...' : '최대 선택 완료'}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${
            canAddMore ? 'text-gray-500' : 'text-gray-300'
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden fade-in">
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="국가 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {Object.entries(groupedCountries).map(([cluster, clusterCountries]) => {
              const info = clusterInfo[cluster as ClusterType];
              return (
                <div key={cluster}>
                  <div
                    className="px-3 py-1.5 text-xs font-semibold sticky top-0 bg-gray-50"
                    style={{ color: info.color }}
                  >
                    {info.icon} {info.nameKo}
                  </div>
                  {clusterCountries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        onCountrySelect(country);
                        setSearchTerm('');
                        if (selectedCountries.length + 1 >= maxSelections) {
                          setIsOpen(false);
                        }
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between"
                    >
                      <span className="text-gray-700">{country.nameKo}</span>
                      <span className="text-xs text-gray-400">{country.name}</span>
                    </button>
                  ))}
                </div>
              );
            })}
            {Object.keys(groupedCountries).length === 0 && (
              <div className="px-3 py-4 text-sm text-gray-500 text-center">
                검색 결과가 없습니다
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
