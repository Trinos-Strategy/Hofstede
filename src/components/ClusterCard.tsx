import { motion } from 'framer-motion';
import type { ClusterType } from '../types';
import { clusterInfo, getCountriesByCluster } from '../data/countries';

interface ClusterCardProps {
  cluster: ClusterType;
  isSelected: boolean;
  onClick: (cluster: ClusterType) => void;
}

const clusterGradients: Record<ClusterType, string> = {
  contest: 'from-red-500 to-orange-500',
  network: 'from-cyan-500 to-blue-500',
  family: 'from-amber-500 to-yellow-500',
  pyramid: 'from-purple-500 to-violet-500',
  solarSystem: 'from-orange-500 to-yellow-500',
  machine: 'from-blue-500 to-indigo-500',
};

const clusterBgColors: Record<ClusterType, string> = {
  contest: 'rgba(239, 68, 68, 0.15)',
  network: 'rgba(6, 182, 212, 0.15)',
  family: 'rgba(245, 158, 11, 0.15)',
  pyramid: 'rgba(168, 85, 247, 0.15)',
  solarSystem: 'rgba(249, 115, 22, 0.15)',
  machine: 'rgba(59, 130, 246, 0.15)',
};

const clusterGlowColors: Record<ClusterType, string> = {
  contest: 'rgba(239, 68, 68, 0.3)',
  network: 'rgba(6, 182, 212, 0.3)',
  family: 'rgba(245, 158, 11, 0.3)',
  pyramid: 'rgba(168, 85, 247, 0.3)',
  solarSystem: 'rgba(249, 115, 22, 0.3)',
  machine: 'rgba(59, 130, 246, 0.3)',
};

export function ClusterCard({ cluster, isSelected, onClick }: ClusterCardProps) {
  const info = clusterInfo[cluster];
  const countriesInCluster = getCountriesByCluster(cluster);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(cluster)}
      className={`
        cursor-pointer rounded-xl p-4
        backdrop-blur-xl transition-all duration-300
        border
        ${isSelected
          ? 'border-white/30'
          : 'border-white/10 hover:border-white/20'
        }
      `}
      style={{
        background: isSelected ? clusterBgColors[cluster] : 'rgba(255, 255, 255, 0.05)',
        boxShadow: isSelected ? `0 0 30px ${clusterGlowColors[cluster]}` : 'none',
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center text-xl
            bg-gradient-to-br ${clusterGradients[cluster]} shadow-lg
          `}
        >
          {info.icon}
        </motion.div>
        <div>
          <h3
            className="font-bold text-sm"
            style={{ color: info.color }}
          >
            {info.nameKo}
          </h3>
          <p className="text-xs text-gray-400">{info.name}</p>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">
        {info.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {countriesInCluster.slice(0, 3).map((country) => (
          <span
            key={country.code}
            className="text-xs px-2 py-1 rounded-lg bg-white/10 text-gray-300"
          >
            {country.nameKo}
          </span>
        ))}
        {countriesInCluster.length > 3 && (
          <span className="text-xs px-2 py-1 rounded-lg bg-white/5 text-gray-500">
            +{countriesInCluster.length - 3}
          </span>
        )}
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2"
        >
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: info.color }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
