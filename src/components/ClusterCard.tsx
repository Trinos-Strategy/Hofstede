import type { ClusterType } from '../types';
import { clusterInfo, getCountriesByCluster } from '../data/countries';

interface ClusterCardProps {
  cluster: ClusterType;
  isSelected: boolean;
  onClick: (cluster: ClusterType) => void;
}

export function ClusterCard({ cluster, isSelected, onClick }: ClusterCardProps) {
  const info = clusterInfo[cluster];
  const countriesInCluster = getCountriesByCluster(cluster);

  return (
    <div
      className={`cluster-card cursor-pointer rounded-lg p-3 border-2 transition-all ${
        isSelected
          ? 'border-opacity-100 bg-opacity-10'
          : 'border-transparent hover:border-opacity-50'
      }`}
      style={{
        borderColor: isSelected ? info.color : 'transparent',
        backgroundColor: isSelected ? `${info.color}15` : 'white',
      }}
      onClick={() => onClick(cluster)}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{info.icon}</span>
        <div>
          <h3 className="font-semibold text-sm" style={{ color: info.color }}>
            {info.nameKo}
          </h3>
          <p className="text-xs text-gray-500">{info.name}</p>
        </div>
      </div>
      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{info.description}</p>
      <div className="flex flex-wrap gap-1">
        {countriesInCluster.slice(0, 4).map((country) => (
          <span
            key={country.code}
            className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600"
          >
            {country.nameKo}
          </span>
        ))}
        {countriesInCluster.length > 4 && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
            +{countriesInCluster.length - 4}
          </span>
        )}
      </div>
    </div>
  );
}
