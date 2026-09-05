import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ClusterType } from '../types';
import { clusterOrder } from '../data/countries';
import { ClusterCard } from './ClusterCard';
import { ClusterDetailModal } from './ClusterDetailModal';
import { useLanguage } from '../i18n';

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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export function ClusterMap({ selectedCluster, onClusterSelect }: ClusterMapProps) {
  const { t } = useLanguage();
  const [modalCluster, setModalCluster] = useState<ClusterType | null>(null);

  const handleClusterClick = (cluster: ClusterType) => {
    if (selectedCluster === cluster) {
      onClusterSelect(null);
    } else {
      onClusterSelect(cluster);
    }
  };

  const handleClusterInfo = (cluster: ClusterType) => {
    setModalCluster(cluster);
  };

  const handleCloseModal = () => {
    setModalCluster(null);
  };

  return (
    <div className="w-full">
      {/* Cluster cards bento grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4"
      >
        {clusterOrder.map((cluster) => (
          <motion.div key={cluster} variants={itemVariants}>
            <ClusterCard
              cluster={cluster}
              isSelected={selectedCluster === cluster}
              onClick={handleClusterClick}
              onInfoClick={handleClusterInfo}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Double-click guidance hint caption */}
      <p className="text-[11px] text-[var(--color-ivory-muted)]/70 text-center mt-4 font-medium">
        {t('clickFilterDoubleClickDetails')}
      </p>

      {/* Cluster Detail Modal */}
      <ClusterDetailModal
        cluster={modalCluster}
        isOpen={modalCluster !== null}
        onClose={handleCloseModal}
      />
    </div>
  );
}
