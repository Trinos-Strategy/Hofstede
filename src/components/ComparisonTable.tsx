import type { Country } from '../types';
import { clusterInfo, dimensionInfo, getDimensionLevel, getDimensionLevelKo } from '../data/countries';

interface ComparisonTableProps {
  countries: Country[];
}

const getDimensionColorClass = (value: number): string => {
  const level = getDimensionLevel(value);
  switch (level) {
    case 'low':
      return 'bg-blue-50 text-blue-700';
    case 'medium':
      return 'bg-gray-50 text-gray-700';
    case 'high':
      return 'bg-orange-50 text-orange-700';
  }
};

export function ComparisonTable({ countries }: ComparisonTableProps) {
  if (countries.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">차원 상세 비교</h3>
        <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <p className="text-gray-500 text-sm">국가를 선택하면 비교 테이블이 표시됩니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">차원 상세 비교</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                국가
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                클러스터
              </th>
              {dimensionInfo.map((dim) => (
                <th
                  key={dim.key}
                  className="text-center py-3 px-4 text-sm font-semibold"
                  style={{ color: dim.color }}
                >
                  <div>{dim.nameKo}</div>
                  <div className="text-xs font-normal text-gray-400">{dim.key}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => {
              const cluster = clusterInfo[country.cluster];
              return (
                <tr key={country.code} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-800">{country.nameKo}</div>
                    <div className="text-xs text-gray-400">{country.name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${cluster.color}15`,
                        color: cluster.color
                      }}
                    >
                      <span>{cluster.icon}</span>
                      {cluster.nameKo}
                    </span>
                  </td>
                  {dimensionInfo.map((dim) => {
                    const value = country.dimensions[dim.key];
                    return (
                      <td key={dim.key} className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded text-sm font-medium ${getDimensionColorClass(value)}`}
                        >
                          {value}
                          <span className="ml-1 text-xs opacity-75">
                            {getDimensionLevelKo(value)}
                          </span>
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Dimension explanations */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {dimensionInfo.map((dim) => (
          <div
            key={dim.key}
            className="p-3 rounded-lg border border-gray-100"
            style={{ borderLeftWidth: 4, borderLeftColor: dim.color }}
          >
            <h4 className="font-medium text-sm text-gray-800 mb-1">
              {dim.nameKo} ({dim.key})
            </h4>
            <p className="text-xs text-gray-500">{dim.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
