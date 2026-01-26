import { motion } from 'framer-motion';
import type { ClusterType } from '../types';
import { clusterInfo, getCountriesByCluster } from '../data/countries';

interface ClusterCardProps {
  cluster: ClusterType;
  isSelected: boolean;
  onClick: (cluster: ClusterType) => void;
}

// Cluster accent colors - Darker for WCAG AA compliance (4.5:1 contrast)
const clusterAccentColors: Record<ClusterType, string> = {
  contest: '#7A5D2E',      // Darker gold - readable on white
  network: '#4A5A3E',      // Darker sage
  family: '#8B6914',       // Darker mustard
  pyramid: '#5A4832',      // Darker bronze
  solarSystem: '#8B5A3A',  // Darker terracotta
  machine: '#3D4D5C',      // Darker slate
};

export function ClusterCard({ cluster, isSelected, onClick }: ClusterCardProps) {
  const info = clusterInfo[cluster];
  const countriesInCluster = getCountriesByCluster(cluster);
  const accentColor = clusterAccentColors[cluster];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(cluster)}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`
        cursor-pointer rounded-lg p-5 relative
        transition-all duration-500
        ${isSelected
          ? 'bg-white shadow-md border-l-2'
          : 'bg-white border border-black/6 hover:shadow-md'
        }
      `}
      style={{
        borderLeftColor: isSelected ? accentColor : 'transparent',
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center text-xl"
          style={{
            backgroundColor: `${accentColor}15`,
          }}
        >
          {info.icon}
        </div>
        <div>
          <h3
            className="font-medium text-sm tracking-wide"
            style={{
              color: accentColor,
              fontFamily: "'Playfair Display', serif"
            }}
          >
            {info.nameKo}
          </h3>
          <p className="text-xs text-[#666666] tracking-wide font-medium">{info.name}</p>
        </div>
      </div>

      <p className="text-xs text-[#444444] mb-4 line-clamp-2 leading-relaxed">
        {info.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {countriesInCluster.slice(0, 3).map((country) => (
          <span
            key={country.code}
            className="text-xs px-3 py-1.5 rounded-md bg-[#F5F4F0] text-[#333333] font-medium border border-black/5"
          >
            {country.nameKo}
          </span>
        ))}
        {countriesInCluster.length > 3 && (
          <span className="text-xs px-3 py-1.5 rounded-md bg-[#FAFAF8] text-[#666666] font-medium border border-black/5">
            +{countriesInCluster.length - 3}
          </span>
        )}
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute top-4 right-4"
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
