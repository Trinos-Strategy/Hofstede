import { motion, useReducedMotion } from 'framer-motion';
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
import type { TranslationKeys } from '../i18n/translations';

interface DimensionRadarProps {
  countries: Country[];
}

// 8 Premium colors qualitative palette
const chartColors = [
  {
    stroke: '#4FC3C3',
    fill: 'rgba(79, 195, 195, 0.15)',
    strokeDasharray: undefined,
    marker: 'circle' as const,
  },
  {
    stroke: '#E8A838',
    fill: 'rgba(232, 168, 56, 0.15)',
    strokeDasharray: '8 4',
    marker: 'square' as const,
  },
  {
    stroke: '#7B68EE',
    fill: 'rgba(123, 104, 238, 0.15)',
    strokeDasharray: '3 3',
    marker: 'triangle' as const,
  },
  {
    stroke: '#FF6B9D',
    fill: 'rgba(255, 107, 157, 0.15)',
    strokeDasharray: undefined,
    marker: 'circle' as const,
  },
  {
    stroke: '#56D4A0',
    fill: 'rgba(86, 212, 160, 0.15)',
    strokeDasharray: '8 4',
    marker: 'square' as const,
  },
  {
    stroke: '#FF8C69',
    fill: 'rgba(255, 140, 105, 0.15)',
    strokeDasharray: '3 3',
    marker: 'triangle' as const,
  },
  {
    stroke: '#87CEEB',
    fill: 'rgba(135, 206, 235, 0.15)',
    strokeDasharray: undefined,
    marker: 'circle' as const,
  },
  {
    stroke: '#DDA0DD',
    fill: 'rgba(221, 160, 221, 0.15)',
    strokeDasharray: '8 4',
    marker: 'square' as const,
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
    case 'triangle': {
      const points = `${cx},${cy - size * 1.2} ${cx - size},${cy + size * 0.8} ${cx + size},${cy + size * 0.8}`;
      return (
        <polygon
          points={points}
          fill={fill}
          stroke={fill}
          strokeWidth={1}
        />
      );
    }
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
interface CustomTickProps {
  x?: string | number;
  y?: string | number;
  cx?: string | number;
  cy?: string | number;
  index?: number;
  textAnchor?: 'inherit' | 'end' | 'middle' | 'start';
  countries: Country[];
  shouldReduceMotion: boolean;
}

function CustomTick({
  x = 0,
  y = 0,
  cx = 0,
  cy = 0,
  index = 0,
  textAnchor = 'middle',
  countries,
  shouldReduceMotion,
}: CustomTickProps) {
  const dim = dimensionInfo[index];
  if (!dim) return null;

  const scoresStr = countries
    .map((country) => `${country.code}: ${country.dimensions[dim.key]}`)
    .join(' / ');
  const labelText = `${dim.key} (${scoresStr})`;

  const numericX = typeof x === 'string' ? parseFloat(x) : x;
  const numericY = typeof y === 'string' ? parseFloat(y) : y;
  const numericCx = typeof cx === 'string' ? parseFloat(cx) : cx;
  const numericCy = typeof cy === 'string' ? parseFloat(cy) : cy;

  const dx = numericX - numericCx;
  const dy = numericY - numericCy;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const offsetDist = 18;
  const ux = distance > 0 ? dx / distance : 0;
  const uy = distance > 0 ? dy / distance : 0;
  const badgeX = numericX + ux * offsetDist;
  const badgeY = numericY + uy * offsetDist;

  return (
    <g className="select-none">
      {/* Mobile-only fallback */}
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        className="sm:hidden text-[9px] font-bold fill-[#444444]"
        dy={4}
      >
        {dim.key}
      </text>

      {/* Desktop-only brass-gold badge pill */}
      <foreignObject
        x={badgeX - 120}
        y={badgeY - 18}
        width={240}
        height={36}
        className="hidden sm:block overflow-visible pointer-events-none"
      >
        <div className="w-full h-full flex items-center justify-center">
          <motion.div
            initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: shouldReduceMotion ? 0 : index * 0.1,
            }}
            className="bg-gradient-to-r from-[#DFC495] via-[#C5A059] to-[#B8956A] text-[#2D1F10] border border-[#9C7A3C]/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md whitespace-nowrap"
          >
            {labelText}
          </motion.div>
        </div>
      </foreignObject>
    </g>
  );
}

// Separate core dimensions (Wursten cluster basis) and extended dimensions
const coreDimensions = dimensionInfo.filter(d => ['PDI', 'IDV', 'UAI', 'MAS'].includes(d.key));
const extendedDimensions = dimensionInfo.filter(d => ['LTO', 'IVR'].includes(d.key));

// Map dimension keys to translation keys
const dimensionTranslationKeys: Record<string, { name: keyof TranslationKeys; desc: keyof TranslationKeys }> = {
  PDI: { name: 'dimensionPDI', desc: 'descPDI' },
  IDV: { name: 'dimensionIDV', desc: 'descIDV' },
  UAI: { name: 'dimensionUAI', desc: 'descUAI' },
  MAS: { name: 'dimensionMAS', desc: 'descMAS' },
  LTO: { name: 'dimensionLTO', desc: 'descLTO' },
  IVR: { name: 'dimensionIVR', desc: 'descIVR' },
};

export function DimensionRadar({ countries }: DimensionRadarProps) {
  const { t, isKorean } = useLanguage();
  const shouldReduceMotion = !!useReducedMotion();

  if (countries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] border border-dashed border-black/10 rounded-lg">
        <motion.div
          initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.25, 0.1, 0.25, 1] }}
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
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-radar-grid .recharts-polar-grid-concentric > * {
          stroke: #8E8D8A;
        }
        .custom-radar-grid .recharts-polar-grid-concentric > *:nth-child(2) {
          stroke-opacity: 0.4;
        }
        .custom-radar-grid .recharts-polar-grid-concentric > *:nth-child(3) {
          stroke-opacity: 0.25;
        }
        .custom-radar-grid .recharts-polar-grid-concentric > *:nth-child(4) {
          stroke-opacity: 0.15;
        }
        .custom-radar-grid .recharts-polar-grid-concentric > *:nth-child(5),
        .custom-radar-grid .recharts-polar-grid-concentric > *:last-child {
          stroke: #B8956A !important;
          stroke-opacity: 0.5 !important;
          stroke-width: 1.5px;
        }
      `}} />

      {/* Radar Chart */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' }}
        className="h-[350px] sm:h-[500px]"
        style={{ overflow: 'visible' }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={data}
            margin={{ top: 30, right: 90, bottom: 30, left: 90 }}
            className="custom-radar-grid"
            style={{ overflow: 'visible' }}
          >
            <defs>
              {countries.map((country, index) => {
                const colorConfig = chartColors[index % chartColors.length];
                return (
                  <radialGradient
                    key={`radial-gradient-${country.code}`}
                    id={`radial-gradient-${country.code}`}
                    cx="50%"
                    cy="50%"
                    r="50%"
                  >
                    {!shouldReduceMotion && (
                      <animate
                        attributeName="r"
                        values="35%;55%;35%"
                        dur="10s"
                        repeatCount="indefinite"
                      />
                    )}
                    <stop offset="0%" stopColor={colorConfig.stroke} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={colorConfig.stroke} stopOpacity={0} />
                  </radialGradient>
                );
              })}
              {countries.map((country) => {
                return (
                  <filter key={`glow-${country.code}`} id={`glow-${country.code}`}>
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                  </filter>
                );
              })}
            </defs>

            <PolarGrid gridType="circle" stroke="rgba(0, 0, 0, 0.08)" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={(props) => (
                <CustomTick
                  {...props}
                  countries={countries}
                  shouldReduceMotion={shouldReduceMotion}
                />
              )}
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
              const fillValue = shouldReduceMotion
                ? colorConfig.stroke
                : `url(#radial-gradient-${country.code})`;
              const filterValue = shouldReduceMotion
                ? undefined
                : `url(#glow-${country.code})`;
              return (
                <Radar
                  key={country.code}
                  name={isKorean ? country.nameKo : country.name}
                  dataKey={country.code}
                  stroke={colorConfig.stroke}
                  fill={fillValue}
                  fillOpacity={0.2}
                  filter={filterValue}
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
                  isAnimationActive={!shouldReduceMotion}
                  animationDuration={shouldReduceMotion ? 0 : 800}
                  animationBegin={shouldReduceMotion ? 0 : index * 150}
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
                <p className="text-[10px] text-[#444444] leading-relaxed">{t(dimensionTranslationKeys[dim.key].desc)}</p>
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
                <p className="text-[10px] text-[#444444] leading-relaxed">{t(dimensionTranslationKeys[dim.key].desc)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
