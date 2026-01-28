import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, X, ChevronDown } from 'lucide-react';
import type { ClusterType } from '../types';
import { clusterOrder } from '../data/countries';
import { ClusterCard } from './ClusterCard';
import { ClusterDetailModal } from './ClusterDetailModal';

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
  const [modalCluster, setModalCluster] = useState<ClusterType | null>(null);
  const [isExpanded, setIsExpanded] = useState(false); // Collapsed by default on mobile

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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="luxury-card rounded-lg p-4 sm:p-6">
      {/* Header - Clickable on mobile for accordion */}
      <div
        className="flex items-center justify-between mb-4 sm:mb-5 cursor-pointer lg:cursor-default"
        onClick={() => window.innerWidth < 1024 && toggleExpand()}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="accent-bar" />
          <h2
            className="text-base sm:text-lg font-medium text-[#1A1A1A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            문화 클러스터
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {selectedCluster && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => {
                e.stopPropagation();
                onClusterSelect(null);
              }}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-black/10 hover:border-[#B8956A] hover:bg-[#FAFAF8] transition-all duration-500"
              title="필터 초기화"
            >
              <X className="w-4 h-4 text-[#444444]" strokeWidth={1.5} />
            </motion.button>
          )}
          {/* Mobile expand/collapse button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
            className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-black/10 hover:border-[#B8956A] hover:bg-[#FAFAF8] transition-all duration-500"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-[#444444]" strokeWidth={1.5} />
          </motion.button>
        </div>
      </div>

      {/* Guidance text */}
      <p className="text-[10px] sm:text-xs text-[#555555] mb-4 sm:mb-5 flex items-center gap-2 font-medium">
        <Layers className="w-3 h-3 flex-shrink-0" strokeWidth={1.5} />
        <span className="hidden sm:inline">클릭: 필터 · 더블클릭: 상세정보</span>
        <span className="sm:hidden">탭: 필터 · ℹ️: 상세정보</span>
      </p>

      {/* Cluster cards - Always visible on desktop, expandable on mobile */}
      <AnimatePresence>
        {(isExpanded || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden lg:!h-auto lg:!opacity-100"
          >
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
                    onInfoClick={handleClusterInfo}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Cluster classification note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-5 pt-4 border-t border-black/5"
            >
              <p className="text-[10px] sm:text-xs text-[#555555] leading-relaxed">
                <span className="font-medium text-[#9D7E57]">ℹ️ 분류 기준:</span>{' '}
                Wursten의 문화 클러스터는 Hofstede의 4개 핵심 차원(PDI, IDV, UAI, MAS)을 기반으로 분류됩니다.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed state summary on mobile */}
      {!isExpanded && (
        <div className="lg:hidden">
          {selectedCluster ? (
            <div className="flex items-center gap-2 py-2 px-3 bg-[#F5F4F0] rounded-lg">
              <span className="text-sm font-medium text-[#9D7E57]">선택됨:</span>
              <span className="text-sm text-[#444444]">{selectedCluster}</span>
            </div>
          ) : (
            <button
              onClick={toggleExpand}
              className="w-full py-3 px-4 bg-[#F5F4F0] rounded-lg text-sm text-[#444444] font-medium hover:bg-[#EDECEA] transition-colors duration-300 min-h-[48px]"
            >
              클러스터 선택하기 ↓
            </button>
          )}
        </div>
      )}

      {/* Cluster Detail Modal */}
      <ClusterDetailModal
        cluster={modalCluster}
        isOpen={modalCluster !== null}
        onClose={handleCloseModal}
      />
    </div>
  );
}
