import { motion } from 'framer-motion';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { Globe2 } from 'lucide-react';
import type { Country } from '../types';
import { dimensionInfo } from '../data/countries';

interface DimensionRadarProps {
  countries: Country[];
}

const chartColors = [
  { stroke: '#3B82F6', fill: 'rgba(59, 130, 246, 0.3)' },
  { stroke: '#10B981', fill: 'rgba(16, 185, 129, 0.3)' },
  { stroke: '#F59E0B', fill: 'rgba(245, 158, 11, 0.3)' },
];

export function DimensionRadar({ countries }: DimensionRadarProps) {
  if (countries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-80 bg-white/5 rounded-xl border border-dashed border-white/20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-3"
        >
          <Globe2 className="w-8 h-8 text-gray-500" />
        </motion.div>
        <p className="text-gray-400 text-sm">국가를 선택하면 레이더 차트가 표시됩니다</p>
      </div>
    );
  }

  const data = dimensionInfo.map((dim) => {
    const dataPoint: Record<string, string | number> = {
      dimension: dim.nameKo,
      fullMark: 100,
    };
    countries.forEach((country) => {
      dataPoint[country.code] = country.dimensions[dim.key];
    });
    return dataPoint;
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#9ca3af', fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#6b7280', fontSize: 10 }}
            tickCount={6}
            axisLine={false}
          />
          {countries.map((country, index) => (
            <Radar
              key={country.code}
              name={country.nameKo}
              dataKey={country.code}
              stroke={chartColors[index % chartColors.length].stroke}
              fill={chartColors[index % chartColors.length].fill}
              strokeWidth={2}
              animationDuration={500}
              animationBegin={index * 100}
            />
          ))}
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
              padding: '12px 16px',
            }}
            itemStyle={{ color: '#e5e7eb' }}
            labelStyle={{ color: '#9ca3af', marginBottom: '8px' }}
            formatter={(value, name) => [value ?? 0, name]}
          />
          <Legend
            wrapperStyle={{ paddingTop: '15px' }}
            formatter={(value, entry) => (
              <span
                className="text-sm"
                style={{ color: entry.color }}
              >
                {value}
              </span>
            )}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
