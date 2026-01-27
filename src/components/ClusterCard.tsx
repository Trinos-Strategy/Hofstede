import { motion } from 'framer-motion';
import type { ClusterType } from '../types';
import { clusterInfo, getCountriesByCluster } from '../data/countries';

interface ClusterCardProps {
  cluster: ClusterType;
  isSelected: boolean;
  onClick: (cluster: ClusterType) => void;
}

// Cluster accent colors with gradient pairs - Darker for WCAG AA compliance
const clusterStyles: Record<ClusterType, { color: string; gradient: string; lightBg: string }> = {
  contest: {
    color: '#7A5D2E',
    gradient: 'linear-gradient(135deg, #7A5D2E, #9D7E57)',
    lightBg: 'linear-gradient(135deg, rgba(122, 93, 46, 0.08), rgba(157, 126, 87, 0.04))',
  },
  network: {
    color: '#4A5A3E',
    gradient: 'linear-gradient(135deg, #4A5A3E, #7D8471)',
    lightBg: 'linear-gradient(135deg, rgba(74, 90, 62, 0.08), rgba(125, 132, 113, 0.04))',
  },
  family: {
    color: '#8B6914',
    gradient: 'linear-gradient(135deg, #8B6914, #C9A227)',
    lightBg: 'linear-gradient(135deg, rgba(139, 105, 20, 0.08), rgba(201, 162, 39, 0.04))',
  },
  pyramid: {
    color: '#5A4832',
    gradient: 'linear-gradient(135deg, #5A4832, #8B7355)',
    lightBg: 'linear-gradient(135deg, rgba(90, 72, 50, 0.08), rgba(139, 115, 85, 0.04))',
  },
  solarSystem: {
    color: '#8B5A3A',
    gradient: 'linear-gradient(135deg, #8B5A3A, #C4886B)',
    lightBg: 'linear-gradient(135deg, rgba(139, 90, 58, 0.08), rgba(196, 136, 107, 0.04))',
  },
  machine: {
    color: '#3D4D5C',
    gradient: 'linear-gradient(135deg, #3D4D5C, #6B7B8C)',
    lightBg: 'linear-gradient(135deg, rgba(61, 77, 92, 0.08), rgba(107, 123, 140, 0.04))',
  },
};

export function ClusterCard({ cluster, isSelected, onClick }: ClusterCardProps) {
  const info = clusterInfo[cluster];
  const countriesInCluster = getCountriesByCluster(cluster);
  const style = clusterStyles[cluster];

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(cluster)}
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
        borderLeftColor: isSelected ? style.color : 'transparent',
      }}
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: style.lightBg }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          {/* Larger icon with gradient background */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-sm"
            style={{
              background: style.gradient,
              boxShadow: `0 4px 12px ${style.color}30`,
            }}
          >
            <span className="filter drop-shadow-sm">{info.icon}</span>
          </motion.div>
          <div>
            <h3
              className="font-semibold text-base tracking-wide"
              style={{
                color: style.color,
                fontFamily: "'Playfair Display', serif"
              }}
            >
              {info.nameKo}
            </h3>
            <p className="text-xs text-[#555555] tracking-wide font-medium">{info.name}</p>
          </div>
        </div>

        <p className="text-sm text-[#444444] mb-4 line-clamp-2 leading-relaxed">
          {info.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {countriesInCluster.slice(0, 3).map((country) => (
            <span
              key={country.code}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/80 text-[#333333] font-medium border border-black/5 shadow-sm"
            >
              {country.nameKo}
            </span>
          ))}
          {countriesInCluster.length > 3 && (
            <span
              className="text-xs px-3 py-1.5 rounded-lg font-medium border shadow-sm"
              style={{
                backgroundColor: `${style.color}10`,
                color: style.color,
                borderColor: `${style.color}20`,
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
              background: style.gradient,
              boxShadow: `0 0 8px ${style.color}60`,
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
