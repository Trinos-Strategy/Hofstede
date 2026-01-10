import { motion } from 'framer-motion';
import { Table } from 'lucide-react';
import type { Country } from '../types';
import { clusterInfo, dimensionInfo, getDimensionLevel, getDimensionLevelKo } from '../data/countries';

interface ComparisonTableProps {
  countries: Country[];
}

const getDimensionColorClass = (value: number): { bg: string; text: string } => {
  const level = getDimensionLevel(value);
  switch (level) {
    case 'low':
      return { bg: 'rgba(125, 132, 113, 0.12)', text: '#7D8471' };
    case 'medium':
      return { bg: 'rgba(90, 90, 90, 0.08)', text: '#5A5A5A' };
    case 'high':
      return { bg: 'rgba(184, 149, 106, 0.12)', text: '#9D7E57' };
  }
};

export function ComparisonTable({ countries }: ComparisonTableProps) {
  if (countries.length === 0) {
    return (
      <div className="luxury-card rounded-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="accent-bar" />
          <h3
            className="text-xl font-medium text-[#1A1A1A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            차원 상세 비교
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center py-12 border border-dashed border-black/10 rounded-lg">
          <Table className="w-8 h-8 text-[#5A5A5A]/40 mb-3" strokeWidth={1.5} />
          <p className="text-[#5A5A5A] text-sm">국가를 선택하면 비교 테이블이 표시됩니다</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="luxury-card rounded-lg p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="accent-bar" />
        <h3
          className="text-xl font-medium text-[#1A1A1A]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          차원 상세 비교
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full modern-table">
          <thead>
            <tr className="border-b border-black/8">
              <th className="text-left py-4 px-5 text-sm font-medium text-[#5A5A5A] tracking-wide">
                국가
              </th>
              <th className="text-left py-4 px-5 text-sm font-medium text-[#5A5A5A] tracking-wide">
                클러스터
              </th>
              {dimensionInfo.map((dim) => (
                <th
                  key={dim.key}
                  className="text-center py-4 px-5 text-sm font-medium"
                  style={{ color: dim.color }}
                >
                  <div>{dim.nameKo}</div>
                  <div className="text-xs font-normal text-[#5A5A5A]/50 mt-0.5">{dim.key}</div>
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
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="border-b border-black/5 hover:bg-[#F5F4F0] transition-colors duration-300"
                >
                  <td className="py-4 px-5">
                    <div className="font-medium text-[#1A1A1A]">{country.nameKo}</div>
                    <div className="text-xs text-[#5A5A5A]/60 tracking-wide">{country.name}</div>
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium"
                      style={{
                        backgroundColor: `${cluster.color}12`,
                        color: cluster.color,
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
                      <td key={dim.key} className="py-4 px-5 text-center">
                        <span
                          className="inline-block px-4 py-2 rounded-md text-sm font-medium"
                          style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                          }}
                        >
                          {value}
                          <span className="ml-1.5 text-xs opacity-60">
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
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {dimensionInfo.map((dim, index) => (
          <motion.div
            key={dim.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3 + index * 0.06,
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="p-5 rounded-lg bg-[#F5F4F0] border border-black/5 hover:border-[#B8956A]/30 transition-all duration-500 border-l-2"
            style={{
              borderLeftColor: dim.color,
            }}
          >
            <h4
              className="font-medium text-sm text-[#1A1A1A] mb-2 flex items-center gap-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: dim.color }}
              />
              {dim.nameKo} ({dim.key})
            </h4>
            <p className="text-xs text-[#5A5A5A] leading-relaxed">{dim.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
