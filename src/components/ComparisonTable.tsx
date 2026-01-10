import { motion } from 'framer-motion';
import { Table } from 'lucide-react';
import type { Country } from '../types';
import { clusterInfo, dimensionInfo, getDimensionLevel, getDimensionLevelKo } from '../data/countries';

interface ComparisonTableProps {
  countries: Country[];
}

const getDimensionColorClass = (value: number): { bg: string; text: string; glow: string } => {
  const level = getDimensionLevel(value);
  switch (level) {
    case 'low':
      return { bg: 'rgba(59, 130, 246, 0.2)', text: '#60a5fa', glow: 'rgba(59, 130, 246, 0.3)' };
    case 'medium':
      return { bg: 'rgba(156, 163, 175, 0.2)', text: '#9ca3af', glow: 'rgba(156, 163, 175, 0.2)' };
    case 'high':
      return { bg: 'rgba(249, 115, 22, 0.2)', text: '#fb923c', glow: 'rgba(249, 115, 22, 0.3)' };
  }
};

export function ComparisonTable({ countries }: ComparisonTableProps) {
  if (countries.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1.5 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
          <h3 className="text-lg font-bold text-white">차원 상세 비교</h3>
        </div>
        <div className="flex flex-col items-center justify-center h-32 bg-white/5 rounded-xl border border-dashed border-white/20">
          <Table className="w-8 h-8 text-gray-500 mb-2" />
          <p className="text-gray-400 text-sm">국가를 선택하면 비교 테이블이 표시됩니다</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1.5 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
        <h3 className="text-lg font-bold text-white">차원 상세 비교</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full modern-table">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                국가
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">
                클러스터
              </th>
              {dimensionInfo.map((dim) => (
                <th
                  key={dim.key}
                  className="text-center py-3 px-4 text-sm font-semibold"
                  style={{ color: dim.color }}
                >
                  <div>{dim.nameKo}</div>
                  <div className="text-xs font-normal text-gray-500">{dim.key}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => {
              const cluster = clusterInfo[country.cluster];
              return (
                <motion.tr
                  key={country.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{country.nameKo}</div>
                    <div className="text-xs text-gray-500">{country.name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{
                        backgroundColor: `${cluster.color}20`,
                        color: cluster.color,
                        boxShadow: `0 0 10px ${cluster.color}20`,
                      }}
                    >
                      <span>{cluster.icon}</span>
                      {cluster.nameKo}
                    </span>
                  </td>
                  {dimensionInfo.map((dim) => {
                    const value = country.dimensions[dim.key];
                    const colors = getDimensionColorClass(value);
                    return (
                      <td key={dim.key} className="py-3 px-4 text-center">
                        <span
                          className="inline-block px-3 py-1.5 rounded-lg text-sm font-medium"
                          style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                            boxShadow: `0 0 10px ${colors.glow}`,
                          }}
                        >
                          {value}
                          <span className="ml-1 text-xs opacity-75">
                            {getDimensionLevelKo(value)}
                          </span>
                        </span>
                      </td>
                    );
                  })}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Dimension explanations */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {dimensionInfo.map((dim, index) => (
          <motion.div
            key={dim.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            style={{
              borderLeft: `3px solid ${dim.color}`,
            }}
          >
            <h4 className="font-medium text-sm text-white mb-1 flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: dim.color }}
              />
              {dim.nameKo} ({dim.key})
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">{dim.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
