import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import type { ClusterType } from '../types';
import { clusterInfo, getCountriesByCluster } from '../data/countries';
import { useLanguage } from '../i18n';
import type { TranslationKeys } from '../i18n/translations';

interface ClusterCardProps {
  cluster: ClusterType;
  isSelected: boolean;
  onClick: (cluster: ClusterType) => void;
  onInfoClick?: (cluster: ClusterType) => void;
}

// Cluster styles with unique icon colors
const clusterStyles: Record<ClusterType, {
  color: string;
  iconColor: string;  // Vivid color for the icon
  lightBg: string;
}> = {
  contest: {
    color: '#7A5D2E',
    iconColor: '#D4A017',  // Gold/Orange - Trophy color
    lightBg: 'linear-gradient(135deg, rgba(212, 160, 23, 0.06), rgba(255, 215, 0, 0.03))',
  },
  network: {
    color: '#2E6B5E',
    iconColor: '#1B9E77',  // Teal/Blue-green
    lightBg: 'linear-gradient(135deg, rgba(27, 158, 119, 0.06), rgba(46, 107, 94, 0.03))',
  },
  family: {
    color: '#8B4513',
    iconColor: '#CD853F',  // Warm brown/Peru
    lightBg: 'linear-gradient(135deg, rgba(205, 133, 63, 0.06), rgba(139, 69, 19, 0.03))',
  },
  pyramid: {
    color: '#8B2323',
    iconColor: '#C41E3A',  // Cardinal Red
    lightBg: 'linear-gradient(135deg, rgba(196, 30, 58, 0.06), rgba(139, 35, 35, 0.03))',
  },
  solarSystem: {
    color: '#B8860B',
    iconColor: '#FFB300',  // Amber/Gold - Sun color
    lightBg: 'linear-gradient(135deg, rgba(255, 179, 0, 0.06), rgba(184, 134, 11, 0.03))',
  },
  machine: {
    color: '#4A5568',
    iconColor: '#5B7C99',  // Steel Blue
    lightBg: 'linear-gradient(135deg, rgba(91, 124, 153, 0.06), rgba(74, 85, 104, 0.03))',
  },
};

// Map cluster types to translation keys
const clusterTranslationKeys: Record<ClusterType, { name: keyof TranslationKeys; desc: keyof TranslationKeys }> = {
  contest: { name: 'clusterContest', desc: 'descContest' },
  network: { name: 'clusterNetwork', desc: 'descNetwork' },
  family: { name: 'clusterFamily', desc: 'descFamily' },
  pyramid: { name: 'clusterPyramid', desc: 'descPyramid' },
  solarSystem: { name: 'clusterSolarSystem', desc: 'descSolarSystem' },
  machine: { name: 'clusterMachine', desc: 'descMachine' },
};

export function ClusterCard({ cluster, isSelected, onClick, onInfoClick }: ClusterCardProps) {
  const { t, isKorean } = useLanguage();
  const info = clusterInfo[cluster];
  const countriesInCluster = getCountriesByCluster(cluster);
  const style = clusterStyles[cluster];
  const translationKeys = clusterTranslationKeys[cluster];

  const handleClick = () => {
    onClick(cluster);
  };

  const handleDoubleClick = () => {
    if (onInfoClick) {
      onInfoClick(cluster);
    }
  };

  const handleInfoButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInfoClick) {
      onInfoClick(cluster);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={`
        cursor-pointer rounded-xl p-5 relative overflow-hidden
        transition-all duration-500
        ${isSelected
          ? 'shadow-lg border-l-4'
          : 'border border-black/6 hover:shadow-lg hover:border-transparent'
        }
      `}
      style={{
        background: isSelected ? style.lightBg : '#FFFFFF',
        borderLeftColor: isSelected ? style.iconColor : 'transparent',
      }}
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: style.lightBg }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          {/* Large colorful icon without background */}
          <motion.div
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <span
              className="text-4xl filter drop-shadow-md"
              style={{
                filter: `drop-shadow(0 2px 4px ${style.iconColor}40)`,
              }}
            >
              {info.icon}
            </span>
          </motion.div>
          <div className="flex-1">
            <h3
              className="font-semibold text-base tracking-wide"
              style={{
                color: style.color,
                fontFamily: "'Playfair Display', serif"
              }}
            >
              {t(translationKeys.name)}
            </h3>
            <p className="text-xs text-[#555555] tracking-wide font-medium">{isKorean ? info.name : info.nameKo}</p>
          </div>
          {/* Info button */}
          {onInfoClick && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleInfoButtonClick}
              className="p-2 rounded-lg border border-black/10 hover:border-[#B8956A] hover:bg-[#FAFAF8] transition-all duration-300"
              title={isKorean ? '상세 정보 보기' : 'View details'}
            >
              <Info className="w-4 h-4 text-[#555555]" strokeWidth={1.5} />
            </motion.button>
          )}
        </div>

        <p className="text-sm text-[#444444] mb-4 line-clamp-2 leading-relaxed">
          {t(translationKeys.desc)}
        </p>

        <div className="flex flex-wrap gap-2">
          {countriesInCluster.slice(0, 3).map((country) => (
            <span
              key={country.code}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/80 text-[#333333] font-medium border border-black/5 shadow-sm"
            >
              {isKorean ? country.nameKo : country.name}
            </span>
          ))}
          {countriesInCluster.length > 3 && (
            <span
              className="text-xs px-3 py-1.5 rounded-lg font-medium border shadow-sm"
              style={{
                backgroundColor: `${style.iconColor}15`,
                color: style.color,
                borderColor: `${style.iconColor}25`,
              }}
            >
              +{countriesInCluster.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Selected indicator - animated pulse */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute top-4 right-4"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: style.iconColor,
              boxShadow: `0 0 8px ${style.iconColor}60`,
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
