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
import type { Country } from '../types';
import { dimensionInfo } from '../data/countries';

interface DimensionRadarProps {
  countries: Country[];
}

const chartColors = [
  { stroke: '#B8956A', fill: 'rgba(184, 149, 106, 0.25)' },
  { stroke: '#7D8471', fill: 'rgba(125, 132, 113, 0.25)' },
  { stroke: '#C4886B', fill: 'rgba(196, 136, 107, 0.25)' },
];

export function DimensionRadar({ countries }: DimensionRadarProps) {
  if (countries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-80 border border-dashed border-black/10 rounded-lg">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-4xl mb-3 block text-center">📈</span>
        </motion.div>
        <p className="text-[#5A5A5A] text-sm">국가를 선택하면 레이더 차트가 표시됩니다</p>
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
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid stroke="rgba(0, 0, 0, 0.08)" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#5A5A5A', fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#5A5A5A', fontSize: 10 }}
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
              animationDuration={800}
              animationBegin={index * 150}
            />
          ))}
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
              padding: '12px 16px',
            }}
            itemStyle={{ color: '#2D2D2D' }}
            labelStyle={{ color: '#5A5A5A', marginBottom: '8px' }}
            formatter={(value, name) => [value ?? 0, name]}
          />
          <Legend
            wrapperStyle={{ paddingTop: '15px' }}
            formatter={(value, entry) => (
              <span
                className="text-sm tracking-wide"
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
