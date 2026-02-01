import { motion } from 'framer-motion';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import type { Country } from '../types';
import { dimensionInfo } from '../data/countries';
import { useLanguage } from '../i18n';

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

// Separate core dimensions (Wursten cluster basis) and extended dimensions
const coreDimensions = dimensionInfo.filter(d => ['PDI', 'IDV', 'UAI', 'MAS'].includes(d.key));
const extendedDimensions = dimensionInfo.filter(d => ['LTO', 'IVR'].includes(d.key));

export function DimensionRadar({ countries }: DimensionRadarProps) {
  const { t, isKorean, language } = useLanguage();

  console.log('[DimensionRadar] Render - language:', language, 'isKorean:', isKorean);

  if (countries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] border border-dashed border-black/10 rounded-lg">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-3xl sm:text-4xl mb-3 block text-center">📈</span>
        </motion.div>
        <p className="text-[#444444] text-xs sm:text-sm">{t('selectCountryToShowRadar')}</p>
      </div>
    );
  }

  const data = dimensionInfo.map((dim) => {
    const dataPoint: Record<string, string | number> = {
      dimension: isKorean ? dim.nameKo : dim.name,
      fullMark: 100,
    };
    countries.forEach((country) => {
      dataPoint[country.code] = country.dimensions[dim.key];
    });
    return dataPoint;
  });

  return (
    <div className="space-y-6">
      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="h-[350px] sm:h-[500px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="rgba(0, 0, 0, 0.08)" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fill: '#444444', fontSize: 10, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#666666', fontSize: 9 }}
              tickCount={5}
              axisLine={false}
            />
            {countries.map((country, index) => {
              const colorConfig = chartColors[index % chartColors.length];
              return (
                <Radar
                  key={country.code}
                  name={isKorean ? country.nameKo : country.name}
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
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Custom Legend - correctly matched with country colors */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 py-2.5 sm:py-3 px-3 sm:px-4 bg-[#F5F4F0] rounded-lg border border-black/5">
        {countries.map((country, index) => {
          const colorConfig = chartColors[index % chartColors.length];
          const markerSymbol = colorConfig.marker === 'circle' ? '●'
            : colorConfig.marker === 'square' ? '■'
            : '▲';
          const lineStyle = colorConfig.strokeDasharray === undefined ? '━━'
            : colorConfig.strokeDasharray === '8 4' ? '┅┅'
            : '···';
          return (
            <div
              key={country.code}
              className="flex items-center gap-1.5 sm:gap-2"
            >
              <span
                className="text-xs sm:text-sm font-medium tracking-wide"
                style={{ color: colorConfig.stroke }}
              >
                {markerSymbol} {lineStyle}
              </span>
              <span
                className="text-xs sm:text-sm font-medium"
                style={{ color: colorConfig.stroke }}
              >
                {isKorean ? country.nameKo : country.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dimension explanations */}
      <div className="space-y-5 pt-4">
        {/* Core Dimensions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#B8956A] to-[#9D7E57]" />
            <span className="text-xs font-medium text-[#9D7E57]">{t('coreDimensions')}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {coreDimensions.map((dim, index) => (
              <motion.div
                key={dim.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.06,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="p-3 sm:p-4 rounded-lg bg-[#F5F4F0] border border-black/5 hover:border-[#B8956A]/30 transition-all duration-500 border-l-2"
                style={{
                  borderLeftColor: dim.color,
                }}
              >
                <h4
                  className="font-medium text-xs text-[#1A1A1A] mb-1.5 flex items-center gap-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: dim.color }}
                  />
                  {isKorean ? dim.nameKo : dim.name} ({dim.key})
                </h4>
                <p className="text-[10px] text-[#444444] leading-relaxed">{dim.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-[#8B5CF6]/30" />

        {/* Extended Dimensions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#6D28D9]" />
            <span className="text-xs font-medium text-[#7C3AED]">{t('extendedDimensions')}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {extendedDimensions.map((dim, index) => (
              <motion.div
                key={dim.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + index * 0.06,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="p-3 sm:p-4 rounded-lg bg-[#F5F4F0] border border-black/5 hover:border-[#8B5CF6]/30 transition-all duration-500 border-l-2"
                style={{
                  borderLeftColor: dim.color,
                }}
              >
                <h4
                  className="font-medium text-xs text-[#1A1A1A] mb-1.5 flex items-center gap-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: dim.color }}
                  />
                  {isKorean ? dim.nameKo : dim.name} ({dim.key})
                </h4>
                <p className="text-[10px] text-[#444444] leading-relaxed">{dim.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
