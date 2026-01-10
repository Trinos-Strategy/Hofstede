import { motion } from 'framer-motion';
import type { ClusterType } from '../types';
import { clusterInfo, getCountriesByCluster } from '../data/countries';

interface ClusterCardProps {
  cluster: ClusterType;
  isSelected: boolean;
  onClick: (cluster: ClusterType) => void;
}

const clusterAccentColors: Record<ClusterType, string> = {
  contest: '#9D7E57',
  network: '#7D8471',
  family: '#C9A227',
  pyramid: '#8B7355',
  solarSystem: '#C4886B',
  machine: '#6B7B8C',
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
          <p className="text-xs text-[#5A5A5A]/60 tracking-wide">{info.name}</p>
        </div>
      </div>

      <p className="text-xs text-[#5A5A5A] mb-4 line-clamp-2 leading-relaxed">
        {info.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {countriesInCluster.slice(0, 3).map((country) => (
          <span
            key={country.code}
            className="text-xs px-3 py-1.5 rounded-md bg-[#F5F4F0] text-[#5A5A5A] border border-black/5"
          >
            {country.nameKo}
          </span>
        ))}
        {countriesInCluster.length > 3 && (
          <span className="text-xs px-3 py-1.5 rounded-md bg-[#FAFAF8] text-[#5A5A5A]/50 border border-black/5">
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
