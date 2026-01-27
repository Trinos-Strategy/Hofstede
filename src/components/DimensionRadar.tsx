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

// ColorBrewer qualitative palette - high contrast colors
const chartColors = [
  {
    stroke: '#1b9e77', // Teal
    fill: 'rgba(27, 158, 119, 0.2)',
    strokeDasharray: undefined, // Solid line
    marker: 'circle' as const,
  },
  {
    stroke: '#d95f02', // Orange
    fill: 'rgba(217, 95, 2, 0.15)',
    strokeDasharray: '8 4', // Dashed line
    marker: 'square' as const,
  },
  {
    stroke: '#7570b3', // Purple
    fill: 'rgba(117, 112, 179, 0.15)',
    strokeDasharray: '3 3', // Dotted line
    marker: 'triangle' as const,
  },
];

// Custom dot component for different marker shapes
interface CustomDotProps {
  cx?: number;
  cy?: number;
  index?: number;
  markerType: 'circle' | 'square' | 'triangle';
  fill: string;
}

function CustomDot({ cx = 0, cy = 0, markerType, fill }: CustomDotProps) {
  const size = 5;

  switch (markerType) {
    case 'square':
      return (
        <rect
          x={cx - size}
          y={cy - size}
          width={size * 2}
          height={size * 2}
          fill={fill}
          stroke={fill}
          strokeWidth={1}
        />
      );
    case 'triangle':
      const points = `${cx},${cy - size * 1.2} ${cx - size},${cy + size * 0.8} ${cx + size},${cy + size * 0.8}`;
      return (
        <polygon
          points={points}
          fill={fill}
          stroke={fill}
          strokeWidth={1}
        />
      );
    case 'circle':
    default:
      return (
        <circle
          cx={cx}
          cy={cy}
          r={size}
          fill={fill}
          stroke={fill}
          strokeWidth={1}
        />
      );
  }
}

export function DimensionRadar({ countries }: DimensionRadarProps) {
  if (countries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-80 sm:h-[420px] border border-dashed border-black/10 rounded-lg">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-3xl sm:text-4xl mb-3 block text-center">📈</span>
        </motion.div>
        <p className="text-[#444444] text-xs sm:text-sm">국가를 선택하면 레이더 차트가 표시됩니다</p>
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
      className="h-80 sm:h-[420px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 25, right: 40, bottom: 25, left: 40 }}>
          <PolarGrid stroke="rgba(0, 0, 0, 0.08)" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#444444', fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#666666', fontSize: 11 }}
            tickCount={6}
            axisLine={false}
          />
          {countries.map((country, index) => {
            const colorConfig = chartColors[index % chartColors.length];
            return (
              <Radar
                key={country.code}
                name={country.nameKo}
                dataKey={country.code}
                stroke={colorConfig.stroke}
                fill={colorConfig.fill}
                strokeWidth={2.5}
                strokeDasharray={colorConfig.strokeDasharray}
                dot={(props) => (
                  <CustomDot
                    key={`dot-${country.code}-${props.index}`}
                    cx={props.cx}
                    cy={props.cy}
                    index={props.index}
                    markerType={colorConfig.marker}
                    fill={colorConfig.stroke}
                  />
                )}
                animationDuration={800}
                animationBegin={index * 150}
              />
            );
          })}
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
            formatter={(value, _entry, index) => {
              const colorConfig = chartColors[index % chartColors.length];
              const markerSymbol = colorConfig.marker === 'circle' ? '●'
                : colorConfig.marker === 'square' ? '■'
                : '▲';
              const lineStyle = colorConfig.strokeDasharray === undefined ? '━━'
                : colorConfig.strokeDasharray === '8 4' ? '┅┅'
                : '···';
              return (
                <span
                  className="text-sm tracking-wide font-medium"
                  style={{ color: colorConfig.stroke }}
                >
                  {markerSymbol} {lineStyle} {value}
                </span>
              );
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
