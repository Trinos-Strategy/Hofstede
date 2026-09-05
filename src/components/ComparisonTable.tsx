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
  { bg: 'var(--color-brass, #B8956A)', light: 'rgba(184, 149, 106, 0.12)' },
  { bg: 'var(--color-sage, #7D8471)', light: 'rgba(125, 132, 113, 0.12)' },
  { bg: 'var(--color-coral, #C4886B)', light: 'rgba(196, 136, 107, 0.12)' },
];

// Dimension level colors - WCAG AA compliant with stronger contrast
const getDimensionColorClass = (value: number): { bg: string; text: string } => {
  const level = getDimensionLevel(value);
  switch (level) {
    case 'low':
      return { bg: 'rgba(125, 132, 113, 0.15)', text: 'var(--color-sage, #7D8471)' };
    case 'medium':
      return { bg: 'rgba(255, 255, 255, 0.10)', text: 'var(--color-ivory-muted)' };
    case 'high':
      return { bg: 'rgba(184, 149, 106, 0.15)', text: 'var(--color-brass, #B8956A)' };
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
      <div className="glass-card rounded-lg p-4 sm:p-8">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-1.5 h-6 rounded-full bg-[var(--color-brass)] animate-pulse" />
          <h3
            className="text-base sm:text-xl font-semibold text-[var(--color-brass)]"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
          >
            {t('detailedDimensionComparison')}
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center py-8 sm:py-12 border border-dashed border-[var(--surface-border)] rounded-lg">
          <Table className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-ivory-muted)]/40 mb-3" strokeWidth={1.5} />
          <p className="text-[var(--color-ivory-muted)] text-xs sm:text-sm">{t('selectCountryToShowTable')}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="glass-card rounded-lg p-4 sm:p-8"
    >
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-1.5 h-6 rounded-full bg-[var(--color-brass)]" />
        <h3
          className="text-base sm:text-xl font-semibold text-[var(--color-brass)]"
          style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
        >
          {t('detailedDimensionComparison')}
        </h3>
      </div>

      {/* Mobile scroll hint */}
      <div className="sm:hidden flex items-center justify-center gap-2 mb-3 py-2 px-3 bg-[var(--surface-1)] rounded-lg border border-[var(--surface-border)]">
        <ChevronLeft className="w-4 h-4 text-[var(--color-brass)]" strokeWidth={1.5} />
        <span className="text-[10px] text-[var(--color-ivory-muted)] font-medium">{t('scrollHorizontal')}</span>
        <ChevronRight className="w-4 h-4 text-[var(--color-brass)]" strokeWidth={1.5} />
      </div>

      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-thin">
        <table className="w-full modern-table min-w-[600px] sm:min-w-0">
          <thead>
            <tr className="border-b border-[var(--surface-border)]">
              <th className="text-left py-3 sm:py-4 px-3 sm:px-5 text-xs sm:text-sm font-medium text-[var(--color-ivory-muted)] tracking-wide">
                {t('country')}
              </th>
              <th className="text-left py-3 sm:py-4 px-3 sm:px-5 text-xs sm:text-sm font-medium text-[var(--color-ivory-muted)] tracking-wide">
                {t('cluster')}
              </th>
              {/* Core Dimensions Header */}
              <th
                colSpan={4}
                className="text-center py-2 px-2 text-[10px] sm:text-xs font-semibold tracking-wide border-l border-[var(--surface-border)]"
                style={{ color: 'var(--color-brass)', backgroundColor: 'rgba(184, 149, 106, 0.05)' }}
              >
                {t('coreDimensions')}
              </th>
              {/* Extended Dimensions Header */}
              <th
                colSpan={2}
                className="text-center py-2 px-2 text-[10px] sm:text-xs font-semibold tracking-wide border-l border-[var(--surface-border)]"
                style={{ color: 'var(--color-coral)', backgroundColor: 'rgba(196, 136, 107, 0.05)' }}
              >
                {t('extendedDimensions')}
              </th>
            </tr>
            <tr className="border-b border-[var(--surface-border)]">
              <th className="py-2"></th>
              <th className="py-2"></th>
              {/* Core dimension columns */}
              {coreDimensions.map((dim, idx) => (
                <th
                  key={dim.key}
                  className={`text-center py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold ${idx === 0 ? 'border-l border-[var(--surface-border)]' : ''}`}
                  style={{ color: dim.color }}
                >
                  <div>{t(dimensionTranslationKeys[dim.key].name)}</div>
                  <div className="text-[10px] sm:text-xs font-normal text-[var(--color-ivory-muted)]/50 mt-0.5">{dim.key}</div>
                </th>
              ))}
              {/* Extended dimension columns */}
              {extendedDimensions.map((dim, idx) => (
                <th
                  key={dim.key}
                  className={`text-center py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold ${idx === 0 ? 'border-l border-[var(--surface-border)]' : ''}`}
                  style={{ color: dim.color }}
                >
                  <div>{t(dimensionTranslationKeys[dim.key].name)}</div>
                  <div className="text-[10px] sm:text-xs font-normal text-[var(--color-ivory-muted)]/50 mt-0.5">{dim.key}</div>
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
                  className="border-b border-[var(--surface-border)] hover:bg-[var(--surface-1)] transition-colors duration-300"
                  style={{ borderLeftWidth: '3px', borderLeftColor: countryColor.bg }}
                >
                  <td className="py-3 sm:py-4 px-3 sm:px-5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: countryColor.bg }}
                      />
                      <div>
                        <div className="font-semibold text-xs sm:text-sm" style={{ color: countryColor.bg }}>{isKorean ? country.nameKo : country.name}</div>
                        <div className="text-[10px] sm:text-xs text-[var(--color-ivory-muted)]/60 tracking-wide">{isKorean ? country.name : country.nameKo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-5">
                    <span
                      className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-[10px] sm:text-xs font-medium"
                      style={{
                        backgroundColor: `${cluster.color}15`,
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
                      <td key={dim.key} className={`py-3 sm:py-4 px-2 sm:px-4 ${dimIdx === 0 ? 'border-l border-[var(--surface-border)]' : ''}`}>
                        <div className="flex flex-col items-center gap-1.5">
                          {/* Value and Level */}
                          <div className="text-center">
                            <span
                              className="text-sm sm:text-base font-bold"
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
                          <div className="w-full max-w-[80px] h-1.5 sm:h-2 bg-[var(--surface-2)] rounded-full overflow-hidden">
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
                      <td key={dim.key} className={`py-3 sm:py-4 px-2 sm:px-4 ${dimIdx === 0 ? 'border-l border-[var(--surface-border)]' : ''}`}>
                        <div className="flex flex-col items-center gap-1.5">
                          {/* Value and Level */}
                          <div className="text-center">
                            <span
                              className="text-sm sm:text-base font-bold"
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
                          <div className="w-full max-w-[80px] h-1.5 sm:h-2 bg-[var(--surface-2)] rounded-full overflow-hidden">
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
            <span className="text-xs font-medium text-[var(--color-brass)]">{t('coreDimensions')}</span>
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
                className="p-4 sm:p-5 rounded-lg bg-[var(--surface-1)] border border-[var(--surface-border)] hover:border-[var(--color-brass)]/30 transition-all duration-500 border-l-2"
                style={{
                  borderLeftColor: dim.color,
                }}
              >
                <h4
                  className="font-semibold text-xs sm:text-sm text-[var(--color-ivory)] mb-2 flex items-center gap-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: dim.color }}
                  />
                  {t(dimensionTranslationKeys[dim.key].name)} ({dim.key})
                </h4>
                <p className="text-[10px] sm:text-xs text-[var(--color-ivory-muted)] leading-relaxed">{t(dimensionTranslationKeys[dim.key].desc)}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-[var(--surface-border)]" />

        {/* Extended Dimensions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#6D28D9]" />
            <span className="text-xs font-medium text-purple-400">{t('extendedDimensions')}</span>
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
                className="p-4 sm:p-5 rounded-lg bg-[var(--surface-1)] border border-[var(--surface-border)] hover:border-purple-500/30 transition-all duration-500 border-l-2"
                style={{
                  borderLeftColor: dim.color,
                }}
              >
                <h4
                  className="font-semibold text-xs sm:text-sm text-[var(--color-ivory)] mb-2 flex items-center gap-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: dim.color }}
                  />
                  {t(dimensionTranslationKeys[dim.key].name)} ({dim.key})
                </h4>
                <p className="text-[10px] sm:text-xs text-[var(--color-ivory-muted)] leading-relaxed">{t(dimensionTranslationKeys[dim.key].desc)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
