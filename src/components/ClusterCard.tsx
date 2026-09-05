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

// Cluster styles mapping to WCAG AA theme colors
const clusterStyles: Record<ClusterType, {
  color: string;
  iconColor: string;
  lightBg: string;
}> = {
  contest: {
    color: 'var(--contest-color, #8B6914)',
    iconColor: 'var(--contest-color, #8B6914)',
    lightBg: 'linear-gradient(135deg, rgba(139, 105, 20, 0.08), rgba(139, 105, 20, 0.03))',
  },
  network: {
    color: 'var(--network-color, #5A6350)',
    iconColor: 'var(--network-color, #5A6350)',
    lightBg: 'linear-gradient(135deg, rgba(90, 99, 80, 0.08), rgba(90, 99, 80, 0.03))',
  },
  family: {
    color: 'var(--family-color, #9D7E00)',
    iconColor: 'var(--family-color, #9D7E00)',
    lightBg: 'linear-gradient(135deg, rgba(157, 126, 0, 0.08), rgba(157, 126, 0, 0.03))',
  },
  pyramid: {
    color: 'var(--pyramid-color, #6B5A42)',
    iconColor: 'var(--pyramid-color, #6B5A42)',
    lightBg: 'linear-gradient(135deg, rgba(107, 90, 66, 0.08), rgba(107, 90, 66, 0.03))',
  },
  solarSystem: {
    color: 'var(--solar-color, #A0654A)',
    iconColor: 'var(--solar-color, #A0654A)',
    lightBg: 'linear-gradient(135deg, rgba(160, 101, 74, 0.08), rgba(160, 101, 74, 0.03))',
  },
  machine: {
    color: 'var(--machine-color, #4A5A6B)',
    iconColor: 'var(--machine-color, #4A5A6B)',
    lightBg: 'linear-gradient(135deg, rgba(74, 90, 107, 0.08), rgba(74, 90, 107, 0.03))',
  },
};

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
        cursor-pointer rounded-xl p-5 relative overflow-hidden glass-card card-gradient-border glow-gold
        transition-all duration-500
        ${isSelected ? 'shadow-md border-l-4' : ''}
      `}
      style={{
        background: isSelected ? style.lightBg : 'rgba(255, 255, 255, 0.03)',
        borderLeftColor: isSelected ? style.iconColor : undefined,
        boxShadow: isSelected ? `0 0 20px ${style.iconColor}15` : undefined,
      }}
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: style.lightBg }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0"
          >
            <span
              className="text-2xl filter drop-shadow-md"
              style={{
                filter: `drop-shadow(0 2px 4px ${style.iconColor}40)`,
              }}
            >
              {info.icon}
            </span>
          </motion.div>
          <div className="flex-1">
            <h3
              className="font-bold text-base tracking-wide"
              style={{
                color: style.color,
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '0.06em'
              }}
            >
              {t(translationKeys.name)}
            </h3>
            <p className="text-xs text-[var(--color-ivory-muted)] opacity-60 tracking-wide font-medium">{isKorean ? info.name : info.nameKo}</p>
          </div>
          {/* Info button */}
          {onInfoClick && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleInfoButtonClick}
              className="p-2 rounded-lg border border-white/10 hover:border-[var(--color-brass)] hover:bg-white/5 transition-all duration-300 cursor-pointer"
              title={isKorean ? '상세 정보 보기' : 'View details'}
            >
              <Info className="w-4 h-4 text-[var(--color-ivory-muted)]" strokeWidth={1.5} />
            </motion.button>
          )}
        </div>

        <p className="text-xs leading-relaxed text-[var(--color-ivory-muted)] mb-4 line-clamp-2">
          {t(translationKeys.desc)}
        </p>

        <div className="flex flex-wrap gap-2">
          {countriesInCluster.slice(0, 3).map((country) => (
            <span
              key={country.code}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[var(--color-ivory)] font-medium shadow-sm transition-colors hover:border-[var(--color-brass)]/40"
            >
              {isKorean ? country.nameKo : country.name}
            </span>
          ))}
          {countriesInCluster.length > 3 && (
            <span
              className="text-xs px-3 py-1.5 rounded-full font-medium border shadow-sm animate-pulse"
              style={{
                backgroundColor: `${style.iconColor}10`,
                color: style.color,
                borderColor: `${style.iconColor}20`,
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
