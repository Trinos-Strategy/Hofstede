import type { ClusterType } from '../types';
import { clusterOrder } from '../data/countries';
import { ClusterCard } from './ClusterCard';

interface ClusterMapProps {
  selectedCluster: ClusterType | null;
  onClusterSelect: (cluster: ClusterType | null) => void;
}

export function ClusterMap({ selectedCluster, onClusterSelect }: ClusterMapProps) {
  const handleClusterClick = (cluster: ClusterType) => {
    if (selectedCluster === cluster) {
      onClusterSelect(null);
    } else {
      onClusterSelect(cluster);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-3">문화 클러스터</h2>
      <p className="text-xs text-gray-500 mb-4">
        클러스터를 클릭하여 필터링하세요
      </p>
      <div className="space-y-2">
        {clusterOrder.map((cluster) => (
          <ClusterCard
            key={cluster}
            cluster={cluster}
            isSelected={selectedCluster === cluster}
            onClick={handleClusterClick}
          />
        ))}
      </div>
    </div>
  );
}
