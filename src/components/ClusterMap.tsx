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
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  }
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
    <div className="luxury-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="accent-bar" />
          <h2
            className="text-lg font-medium text-[#1A1A1A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            문화 클러스터
          </h2>
        </div>
        {selectedCluster && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.4 }}
            onClick={() => onClusterSelect(null)}
            className="p-2 rounded-lg border border-black/10 hover:border-[#B8956A] hover:bg-[#FAFAF8] transition-all duration-500"
            title="필터 초기화"
          >
            <X className="w-4 h-4 text-[#5A5A5A]" strokeWidth={1.5} />
          </motion.button>
        )}
      </div>

      <p className="text-xs text-[#5A5A5A] mb-5 flex items-center gap-2">
        <Layers className="w-3 h-3" strokeWidth={1.5} />
        클러스터를 클릭하여 필터링하세요
      </p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
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
