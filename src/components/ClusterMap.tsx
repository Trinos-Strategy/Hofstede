import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ClusterType } from '../types';
import { clusterOrder } from '../data/countries';
import { ClusterCard } from './ClusterCard';
import { ClusterDetailModal } from './ClusterDetailModal';

interface ClusterMapProps {
  selectedCluster: ClusterType | null;
  onClusterSelect: (cluster: ClusterType | null) => void;
}

const bannerArtMap: Record<ClusterType, string> = {
  contest: '/art/banner-contest.webp',
  network: '/art/banner-network.webp',
  family: '/art/banner-family.webp',
  pyramid: '/art/banner-pyramid.webp',
  solarSystem: '/art/banner-solar.webp',
  machine: '/art/banner-machine.webp',
};

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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
      >
        {clusterOrder.map((cluster) => (
          <motion.div key={cluster} variants={itemVariants}>
            <ClusterCard
              cluster={cluster}
              isSelected={selectedCluster === cluster}
              onClick={handleClusterClick}
              onInfoClick={handleClusterInfo}
              bannerArt={bannerArtMap[cluster]}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Cluster Detail Modal */}
      <ClusterDetailModal
        cluster={modalCluster}
        isOpen={modalCluster !== null}
        onClose={handleCloseModal}
      />
    </div>
  );
}
