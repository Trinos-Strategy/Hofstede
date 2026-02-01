import { motion } from 'framer-motion';
import type { Country, DimensionInfo } from '../types';
import { dimensionInfo, getDimensionLevel } from '../data/countries';
import { useLanguage } from '../i18n';
import type { TranslationKeys } from '../i18n/translations';

interface DimensionBarProps {
  countries: Country[];
}

// ColorBrewer qualitative palette - consistent with radar chart
const chartColors = [
  { bg: '#1b9e77', light: 'rgba(27, 158, 119, 0.15)' },  // Teal - 1st country
  { bg: '#d95f02', light: 'rgba(217, 95, 2, 0.15)' },    // Orange - 2nd country
  { bg: '#7570b3', light: 'rgba(117, 112, 179, 0.15)' }, // Purple - 3rd country
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Separate core dimensions (Wursten cluster basis) and extended dimensions
const coreDimensions = dimensionInfo.filter(d => ['PDI', 'IDV', 'UAI', 'MAS'].includes(d.key));
const extendedDimensions = dimensionInfo.filter(d => ['LTO', 'IVR'].includes(d.key));

// Map dimension keys to translation keys
const dimensionTranslationKeys: Record<string, { name: keyof TranslationKeys; low: keyof TranslationKeys; high: keyof TranslationKeys }> = {
  PDI: { name: 'dimensionPDI', low: 'pdiLow', high: 'pdiHigh' },
  IDV: { name: 'dimensionIDV', low: 'idvLow', high: 'idvHigh' },
  UAI: { name: 'dimensionUAI', low: 'uaiLow', high: 'uaiHigh' },
  MAS: { name: 'dimensionMAS', low: 'masLow', high: 'masHigh' },
  LTO: { name: 'dimensionLTO', low: 'ltoLow', high: 'ltoHigh' },
  IVR: { name: 'dimensionIVR', low: 'ivrLow', high: 'ivrHigh' },
};

interface DimensionBarItemProps {
  dim: DimensionInfo;
  dimIndex: number;
  countries: Country[];
  t: (key: keyof TranslationKeys) => string;
  isKorean: boolean;
}

function DimensionBarItem({ dim, dimIndex, countries, t, isKorean }: DimensionBarItemProps) {
  const translationKeys = dimensionTranslationKeys[dim.key];

  // Get dimension level text based on language
  const getDimensionLevelText = (value: number): string => {
    const level = getDimensionLevel(value);
    switch (level) {
      case 'low': return t('levelLow');
      case 'medium': return t('levelMedium');
      case 'high': return t('levelHigh');
    }
  };

  return (
    <motion.div
      key={dim.key}
      variants={itemVariants}
      className="bg-[#F5F4F0] rounded-lg p-5 border border-black/5 hover:border-[#B8956A]/30 transition-all duration-500"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4
            className="font-medium text-[#1A1A1A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t(translationKeys.name)}
          </h4>
          <p className="text-xs text-[#444444]/60 tracking-wide">{dim.key}</p>
        </div>
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: dim.color }}
        />
      </div>

      <div className="space-y-3">
        {countries.map((country, index) => {
          const value = country.dimensions[dim.key];
          return (
            <div key={country.code} className="flex items-center gap-4">
              <span className="w-16 text-sm text-[#444444] truncate">
                {isKorean ? country.nameKo : country.name}
              </span>
              <div className="flex-1 h-8 bg-white rounded-lg overflow-hidden relative border border-black/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{
                    duration: 1,
                    delay: dimIndex * 0.1 + index * 0.06,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="h-full rounded-lg flex items-center justify-end pr-3"
                  style={{
                    backgroundColor: chartColors[index % chartColors.length].bg,
                  }}
                >
                  <span className="text-xs text-white font-medium">
                    {value}
                  </span>
                </motion.div>
              </div>
              <span className="w-10 text-xs text-[#444444]/60 text-right">
                {getDimensionLevelText(value)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-4 text-xs text-[#444444]/50">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#EDECEA]" />
          {t(translationKeys.low)}
        </span>
        <span className="flex items-center gap-2">
          {t(translationKeys.high)}
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: dim.color }}
          />
        </span>
      </div>
    </motion.div>
  );
}

export function DimensionBar({ countries }: DimensionBarProps) {
  const { t, isKorean } = useLanguage();

  if (countries.length === 0) {
    return null;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Core Dimensions Section */}
      <div>
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 mb-4"
        >
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-[#B8956A] to-[#9D7E57]" />
          <h3 className="text-sm font-medium text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('coreDimensions').split(' (')[0]}
          </h3>
          <span className="text-[10px] text-[#9D7E57] bg-[#B8956A]/10 px-2 py-0.5 rounded-full font-medium">
            {isKorean ? 'Wursten 클러스터 기준' : 'Wursten Cluster Basis'}
          </span>
        </motion.div>
        <div className="space-y-4">
          {coreDimensions.map((dim, dimIndex) => (
            <DimensionBarItem
              key={dim.key}
              dim={dim}
              dimIndex={dimIndex}
              countries={countries}
              t={t}
              isKorean={isKorean}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <motion.div
        variants={itemVariants}
        className="border-t border-dashed border-[#B8956A]/30"
      />

      {/* Extended Dimensions Section */}
      <div>
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 mb-4"
        >
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#6D28D9]" />
          <h3 className="text-sm font-medium text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('extendedDimensions').split(' (')[0]}
          </h3>
          <span className="text-[10px] text-[#7C3AED] bg-[#8B5CF6]/10 px-2 py-0.5 rounded-full font-medium">
            {isKorean ? 'Hofstede 확장' : 'Hofstede Extended'}
          </span>
        </motion.div>
        <div className="space-y-4">
          {extendedDimensions.map((dim, dimIndex) => (
            <DimensionBarItem
              key={dim.key}
              dim={dim}
              dimIndex={dimIndex + coreDimensions.length}
              countries={countries}
              t={t}
              isKorean={isKorean}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
