import { motion } from 'framer-motion';
import { Layers, X } from 'lucide-react';
import type { ClusterType } from '../types';
import { clusterOrder } from '../data/countries';
import { ClusterCard } from './ClusterCard';

interface ClusterMapProps {
  selectedCluster: ClusterType | null;
  onClusterSelect: (cluster: ClusterType | null) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export function ClusterMap({ selectedCluster, onClusterSelect }: ClusterMapProps) {
  const handleClusterClick = (cluster: ClusterType) => {
    if (selectedCluster === cluster) {
      onClusterSelect(null);
    } else {
      onClusterSelect(cluster);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
          <h2 className="text-lg font-bold text-white">문화 클러스터</h2>
        </div>
        {selectedCluster && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onClusterSelect(null)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            title="필터 초기화"
          >
            <X className="w-4 h-4 text-gray-400" />
          </motion.button>
        )}
      </div>

      <p className="text-xs text-gray-500 mb-4 flex items-center gap-2">
        <Layers className="w-3 h-3" />
        클러스터를 클릭하여 필터링하세요
      </p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {clusterOrder.map((cluster) => (
          <motion.div key={cluster} variants={itemVariants}>
            <ClusterCard
              cluster={cluster}
              isSelected={selectedCluster === cluster}
              onClick={handleClusterClick}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
