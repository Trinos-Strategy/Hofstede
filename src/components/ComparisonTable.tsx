import { motion } from 'framer-motion';
import { Table, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Country } from '../types';
import { clusterInfo, dimensionInfo, getDimensionLevel } from '../data/countries';
import { useLanguage } from '../i18n';
import type { TranslationKeys } from '../i18n/translations';

interface ComparisonTableProps {
  countries: Country[];
}

// ColorBrewer qualitative palette - consistent with radar chart
const countryColors = [
  { bg: '#1b9e77', light: 'rgba(27, 158, 119, 0.12)' },  // Teal - 1st country
  { bg: '#d95f02', light: 'rgba(217, 95, 2, 0.12)' },    // Orange - 2nd country
  { bg: '#7570b3', light: 'rgba(117, 112, 179, 0.12)' }, // Purple - 3rd country
];

// Dimension level colors - WCAG AA compliant with stronger contrast
const getDimensionColorClass = (value: number): { bg: string; text: string } => {
  const level = getDimensionLevel(value);
  switch (level) {
    case 'low':
      return { bg: 'rgba(74, 90, 62, 0.15)', text: '#3D4D32' };   // Darker sage
    case 'medium':
      return { bg: 'rgba(60, 60, 60, 0.10)', text: '#444444' };   // Darker gray
    case 'high':
      return { bg: 'rgba(139, 89, 42, 0.15)', text: '#6B4420' };  // Darker gold
  }
};

// Separate core dimensions (Wursten cluster basis) and extended dimensions
const coreDimensions = dimensionInfo.filter(d => ['PDI', 'IDV', 'UAI', 'MAS'].includes(d.key));
const extendedDimensions = dimensionInfo.filter(d => ['LTO', 'IVR'].includes(d.key));

// Map dimension keys to translation keys
const dimensionTranslationKeys: Record<string, { name: keyof TranslationKeys; desc: keyof TranslationKeys }> = {
  PDI: { name: 'dimensionPDI', desc: 'descPDI' },
  IDV: { name: 'dimensionIDV', desc: 'descIDV' },
  UAI: { name: 'dimensionUAI', desc: 'descUAI' },
  MAS: { name: 'dimensionMAS', desc: 'descMAS' },
  LTO: { name: 'dimensionLTO', desc: 'descLTO' },
  IVR: { name: 'dimensionIVR', desc: 'descIVR' },
};

export function ComparisonTable({ countries }: ComparisonTableProps) {
  const { t, isKorean } = useLanguage();

  // Get dimension level text based on language
  const getDimensionLevelText = (value: number): string => {
    const level = getDimensionLevel(value);
    switch (level) {
      case 'low': return t('levelLow');
      case 'medium': return t('levelMedium');
      case 'high': return t('levelHigh');
    }
  };
  if (countries.length === 0) {
    return (
      <div className="luxury-card rounded-lg p-4 sm:p-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="accent-bar" />
          <h3
            className="text-base sm:text-xl font-medium text-[#1A1A1A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('detailedDimensionComparison')}
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center py-8 sm:py-12 border border-dashed border-black/10 rounded-lg">
          <Table className="w-6 h-6 sm:w-8 sm:h-8 text-[#444444]/40 mb-3" strokeWidth={1.5} />
          <p className="text-[#444444] text-xs sm:text-sm">{t('selectCountryToShowTable')}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="luxury-card rounded-lg p-4 sm:p-8"
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="accent-bar" />
        <h3
          className="text-base sm:text-xl font-medium text-[#1A1A1A]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t('detailedDimensionComparison')}
        </h3>
      </div>

      {/* Mobile scroll hint */}
      <div className="sm:hidden flex items-center justify-center gap-2 mb-3 py-2 px-3 bg-[#F5F4F0] rounded-lg">
        <ChevronLeft className="w-4 h-4 text-[#9D7E57]" strokeWidth={1.5} />
        <span className="text-[10px] text-[#555555] font-medium">{t('scrollHorizontal')}</span>
        <ChevronRight className="w-4 h-4 text-[#9D7E57]" strokeWidth={1.5} />
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-thin">
        <table className="w-full modern-table min-w-[600px] sm:min-w-0">
          <thead>
            <tr className="border-b border-black/8">
              <th className="text-left py-3 sm:py-4 px-3 sm:px-5 text-xs sm:text-sm font-medium text-[#444444] tracking-wide">
                {t('country')}
              </th>
              <th className="text-left py-3 sm:py-4 px-3 sm:px-5 text-xs sm:text-sm font-medium text-[#444444] tracking-wide">
                {t('cluster')}
              </th>
              {/* Core Dimensions Header */}
              <th
                colSpan={4}
                className="text-center py-2 px-2 text-[10px] sm:text-xs font-medium tracking-wide border-l border-black/5"
                style={{ color: '#9D7E57', backgroundColor: 'rgba(184, 149, 106, 0.08)' }}
              >
                {t('coreDimensions')}
              </th>
              {/* Extended Dimensions Header */}
              <th
                colSpan={2}
                className="text-center py-2 px-2 text-[10px] sm:text-xs font-medium tracking-wide border-l border-black/5"
                style={{ color: '#7C3AED', backgroundColor: 'rgba(139, 92, 246, 0.08)' }}
              >
                {t('extendedDimensions')}
              </th>
            </tr>
            <tr className="border-b border-black/8">
              <th className="py-2"></th>
              <th className="py-2"></th>
              {/* Core dimension columns */}
              {coreDimensions.map((dim, idx) => (
                <th
                  key={dim.key}
                  className={`text-center py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium ${idx === 0 ? 'border-l border-black/5' : ''}`}
                  style={{ color: dim.color }}
                >
                  <div>{t(dimensionTranslationKeys[dim.key].name)}</div>
                  <div className="text-[10px] sm:text-xs font-normal text-[#444444]/50 mt-0.5">{dim.key}</div>
                </th>
              ))}
              {/* Extended dimension columns */}
              {extendedDimensions.map((dim, idx) => (
                <th
                  key={dim.key}
                  className={`text-center py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium ${idx === 0 ? 'border-l border-black/5' : ''}`}
                  style={{ color: dim.color }}
                >
                  <div>{t(dimensionTranslationKeys[dim.key].name)}</div>
                  <div className="text-[10px] sm:text-xs font-normal text-[#444444]/50 mt-0.5">{dim.key}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => {
              const cluster = clusterInfo[country.cluster];
              const countryColor = countryColors[index % countryColors.length];
              return (
                <motion.tr
                  key={country.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="border-b border-black/5 hover:bg-[#F5F4F0] transition-colors duration-300"
                  style={{ borderLeftWidth: '3px', borderLeftColor: countryColor.bg }}
                >
                  <td className="py-3 sm:py-4 px-3 sm:px-5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: countryColor.bg }}
                      />
                      <div>
                        <div className="font-medium text-xs sm:text-sm" style={{ color: countryColor.bg }}>{isKorean ? country.nameKo : country.name}</div>
                        <div className="text-[10px] sm:text-xs text-[#444444]/60 tracking-wide">{isKorean ? country.name : country.nameKo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-5">
                    <span
                      className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-[10px] sm:text-xs font-medium"
                      style={{
                        backgroundColor: `${cluster.color}12`,
                        color: cluster.color,
                      }}
                    >
                      <span className="hidden sm:inline">{cluster.icon}</span>
                      {isKorean ? cluster.nameKo : cluster.name}
                    </span>
                  </td>
                  {/* Core dimensions */}
                  {coreDimensions.map((dim, dimIdx) => {
                    const value = country.dimensions[dim.key];
                    const colors = getDimensionColorClass(value);
                    return (
                      <td key={dim.key} className={`py-3 sm:py-4 px-2 sm:px-4 ${dimIdx === 0 ? 'border-l border-black/5' : ''}`}>
                        <div className="flex flex-col items-center gap-1.5">
                          {/* Value and Level */}
                          <div className="text-center">
                            <span
                              className="text-sm sm:text-base font-semibold"
                              style={{ color: countryColor.bg }}
                            >
                              {value}
                            </span>
                            <span
                              className="ml-1.5 text-[10px] sm:text-xs font-medium"
                              style={{ color: colors.text }}
                            >
                              {getDimensionLevelText(value)}
                            </span>
                          </div>
                          {/* Mini Progress Bar */}
                          <div className="w-full max-w-[80px] h-1.5 sm:h-2 bg-[#E8E7E3] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: countryColor.bg }}
                            />
                          </div>
                        </div>
                      </td>
                    );
                  })}
                  {/* Extended dimensions */}
                  {extendedDimensions.map((dim, dimIdx) => {
                    const value = country.dimensions[dim.key];
                    const colors = getDimensionColorClass(value);
                    return (
                      <td key={dim.key} className={`py-3 sm:py-4 px-2 sm:px-4 ${dimIdx === 0 ? 'border-l border-black/5' : ''}`}>
                        <div className="flex flex-col items-center gap-1.5">
                          {/* Value and Level */}
                          <div className="text-center">
                            <span
                              className="text-sm sm:text-base font-semibold"
                              style={{ color: countryColor.bg }}
                            >
                              {value}
                            </span>
                            <span
                              className="ml-1.5 text-[10px] sm:text-xs font-medium"
                              style={{ color: colors.text }}
                            >
                              {getDimensionLevelText(value)}
                            </span>
                          </div>
                          {/* Mini Progress Bar */}
                          <div className="w-full max-w-[80px] h-1.5 sm:h-2 bg-[#E8E7E3] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: countryColor.bg }}
                            />
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Dimension explanations - grouped */}
      <div className="mt-6 sm:mt-8 space-y-6">
        {/* Core Dimensions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#B8956A] to-[#9D7E57]" />
            <span className="text-xs font-medium text-[#9D7E57]">{t('coreDimensions')}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {coreDimensions.map((dim, index) => (
              <motion.div
                key={dim.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.06,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="p-4 sm:p-5 rounded-lg bg-[#F5F4F0] border border-black/5 hover:border-[#B8956A]/30 transition-all duration-500 border-l-2"
                style={{
                  borderLeftColor: dim.color,
                }}
              >
                <h4
                  className="font-medium text-xs sm:text-sm text-[#1A1A1A] mb-2 flex items-center gap-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: dim.color }}
                  />
                  {t(dimensionTranslationKeys[dim.key].name)} ({dim.key})
                </h4>
                <p className="text-[10px] sm:text-xs text-[#444444] leading-relaxed">{t(dimensionTranslationKeys[dim.key].desc)}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-[#8B5CF6]/30" />

        {/* Extended Dimensions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#6D28D9]" />
            <span className="text-xs font-medium text-[#7C3AED]">{t('extendedDimensions')}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {extendedDimensions.map((dim, index) => (
              <motion.div
                key={dim.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + index * 0.06,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="p-4 sm:p-5 rounded-lg bg-[#F5F4F0] border border-black/5 hover:border-[#8B5CF6]/30 transition-all duration-500 border-l-2"
                style={{
                  borderLeftColor: dim.color,
                }}
              >
                <h4
                  className="font-medium text-xs sm:text-sm text-[#1A1A1A] mb-2 flex items-center gap-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: dim.color }}
                  />
                  {t(dimensionTranslationKeys[dim.key].name)} ({dim.key})
                </h4>
                <p className="text-[10px] sm:text-xs text-[#444444] leading-relaxed">{t(dimensionTranslationKeys[dim.key].desc)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
