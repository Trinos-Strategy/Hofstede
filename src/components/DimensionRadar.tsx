import { useState, useMemo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { Country, Dimensions } from '../types';
import { dimensionInfo } from '../data/countries';
import { useLanguage } from '../i18n';
import type { TranslationKeys } from '../i18n/translations';
import { useWindowSize } from '../hooks/useWindowSize';

interface DimensionRadarProps {
  countries: Country[];
}

// ─── Color Palette (8 distinct luxury colors) ───
const chartColors = [
  { stroke: '#B8956A', fill: 'rgba(184, 149, 106, 0.2)', strokeDasharray: undefined as string | undefined, marker: 'circle' as const },
  { stroke: '#7D8471', fill: 'rgba(125, 132, 113, 0.2)', strokeDasharray: '8 4', marker: 'square' as const },
  { stroke: '#C4886B', fill: 'rgba(196, 136, 107, 0.2)', strokeDasharray: '3 3', marker: 'triangle' as const },
  { stroke: '#6B7B8C', fill: 'rgba(107, 123, 140, 0.2)', strokeDasharray: undefined as string | undefined, marker: 'circle' as const },
  { stroke: '#9D7E57', fill: 'rgba(157, 126, 87, 0.2)', strokeDasharray: '8 4', marker: 'square' as const },
  { stroke: '#C9A227', fill: 'rgba(201, 162, 39, 0.2)', strokeDasharray: '3 3', marker: 'triangle' as const },
  { stroke: '#722F37', fill: 'rgba(114, 47, 55, 0.2)', strokeDasharray: undefined as string | undefined, marker: 'circle' as const },
  { stroke: '#8B9E8B', fill: 'rgba(139, 158, 139, 0.2)', strokeDasharray: '8 4', marker: 'square' as const },
];

// ─── Flag Emoji Helper ───
const alpha3ToAlpha2: Record<string, string> = {
  USA: 'US', GBR: 'GB', AUS: 'AU', IRL: 'IE', NZL: 'NZ',
  DNK: 'DK', NLD: 'NL', NOR: 'NO', SWE: 'SE', FIN: 'FI',
  CHN: 'CN', HKG: 'HK', IND: 'IN', IDN: 'ID', MYS: 'MY',
  PHL: 'PH', SGP: 'SG', BRA: 'BR', CHL: 'CL', COL: 'CO',
  GRC: 'GR', KOR: 'KR', MEX: 'MX', PER: 'PE', PRT: 'PT',
  RUS: 'RU', TWN: 'TW', THA: 'TH', TUR: 'TR', VEN: 'VE',
  JPN: 'JP', BEL: 'BE', FRA: 'FR', ITA: 'IT', ESP: 'ES',
  POL: 'PL', AUT: 'AT', CZE: 'CZ', DEU: 'DE', HUN: 'HU',
  CHE: 'CH',
};

function getFlagEmoji(code: string): string {
  const a2 = alpha3ToAlpha2[code];
  if (!a2) return '🏳️';
  const points = Array.from(a2.toUpperCase()).map(
    (ch) => 0x1F1E6 + (ch.charCodeAt(0) - 65)
  );
  return String.fromCodePoint(...points);
}

// ─── Dimension Translation Key Mapping ───
const dimensionTranslationKeys: Record<string, { name: keyof TranslationKeys; desc: keyof TranslationKeys; full: keyof TranslationKeys }> = {
  PDI: { name: 'dimensionPDI', desc: 'descPDI', full: 'dimensionPDIFull' },
  IDV: { name: 'dimensionIDV', desc: 'descIDV', full: 'dimensionIDVFull' },
  UAI: { name: 'dimensionUAI', desc: 'descUAI', full: 'dimensionUAIFull' },
  MAS: { name: 'dimensionMAS', desc: 'descMAS', full: 'dimensionMASFull' },
  LTO: { name: 'dimensionLTO', desc: 'descLTO', full: 'dimensionLTOFull' },
  IVR: { name: 'dimensionIVR', desc: 'descIVR', full: 'dimensionIVRFull' },
};

// ─── Profile Phrase Mapping ───
const profilePhraseKeys: Record<string, { high: keyof TranslationKeys; low: keyof TranslationKeys }> = {
  PDI: { high: 'profileHighPDI', low: 'profileLowPDI' },
  IDV: { high: 'profileHighIDV', low: 'profileLowIDV' },
  UAI: { high: 'profileHighUAI', low: 'profileLowUAI' },
  MAS: { high: 'profileHighMAS', low: 'profileLowMAS' },
  LTO: { high: 'profileHighLTO', low: 'profileLowLTO' },
  IVR: { high: 'profileHighIVR', low: 'profileLowIVR' },
};

// ─── Custom Dot (preserved shapes) ───
interface CustomDotProps {
  cx?: string | number;
  cy?: string | number;
  markerType: 'circle' | 'square' | 'triangle';
  fill: string;
}

function CustomDot({ cx = 0, cy = 0, markerType, fill }: CustomDotProps) {
  const x = typeof cx === 'string' ? parseFloat(cx) : cx;
  const y = typeof cy === 'string' ? parseFloat(cy) : cy;
  const size = 5;
  switch (markerType) {
    case 'square':
      return (
        <rect
          x={x - size}
          y={y - size}
          width={size * 2}
          height={size * 2}
          fill={fill}
          stroke={fill}
          strokeWidth={1}
        />
      );
    case 'triangle': {
      const points = `${x},${y - size * 1.2} ${x - size},${y + size * 0.8} ${x + size},${y + size * 0.8}`;
      return (
        <polygon points={points} fill={fill} stroke={fill} strokeWidth={1} />
      );
    }
    case 'circle':
    default:
      return <circle cx={x} cy={y} r={size} fill={fill} stroke={fill} strokeWidth={1} />;
  }
}

// ─── Radar Vertex Label ───
function RadarVertexLabel(props: { cx?: string | number; cy?: string | number; value?: number | string | null | boolean }) {
  const cx = typeof props.cx === 'string' ? parseFloat(props.cx) : props.cx ?? 0;
  const cy = typeof props.cy === 'string' ? parseFloat(props.cy) : props.cy ?? 0;
  const value = typeof props.value === 'number' ? props.value : typeof props.value === 'string' ? parseFloat(props.value) : undefined;
  return (
    <text
      x={cx}
      y={cy - 10}
      textAnchor="middle"
      dominantBaseline="middle"
      style={{
        fontSize: '9px',
        fontWeight: 600,
        fill: '#444444',
        pointerEvents: 'none',
      }}
    >
      {value}
    </text>
  );
}

// ─── Polar Angle Axis Tick ───
function PolarTick(props: {
  x?: string | number;
  y?: string | number;
  payload?: { value?: string };
  textAnchor?: React.SVGProps<SVGTextElement>['textAnchor'];
  isMobile: boolean;
}) {
  const x = typeof props.x === 'string' ? parseFloat(props.x) : props.x ?? 0;
  const y = typeof props.y === 'string' ? parseFloat(props.y) : props.y ?? 0;
  const value = props.payload?.value ?? '';
  const dimEntry = dimensionInfo.find((d) => d.name === value || d.nameKo === value);
  const label = props.isMobile && dimEntry ? dimEntry.key : value;
  return (
    <text
      x={x}
      y={y}
      textAnchor={props.textAnchor}
      dominantBaseline="central"
      style={{
        fontSize: props.isMobile ? 9 : 10,
        fontWeight: 500,
        fill: '#444444',
      }}
    >
      {label}
    </text>
  );
}

// ─── Custom Tooltip ───
interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
  dataKey: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  const { t, isKorean } = useLanguage();

  if (!active || !payload || payload.length === 0 || !label) return null;

  const dimEntry = dimensionInfo.find((d) => (isKorean ? d.nameKo : d.name) === label);
  const dimKey = dimEntry?.key;
  const fullName = dimKey ? t(dimensionTranslationKeys[dimKey].full) : label;
  const description = dimKey ? t(dimensionTranslationKeys[dimKey].desc) : '';

  return (
    <div
      className="rounded-lg border border-black/5 bg-white shadow-lg"
      style={{
        padding: '12px 16px',
        minWidth: '200px',
        maxWidth: '320px',
      }}
    >
      <div className="mb-2 pb-2 border-b border-black/5">
        <p
          className="text-xs font-semibold text-[#1A1A1A]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {fullName}
        </p>
        <p className="text-[10px] text-[#666666] leading-relaxed mt-0.5">{description}</p>
      </div>
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-[#444444]">{entry.name}</span>
            </div>
            <span className="text-xs font-semibold text-[#1A1A1A]">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Country Profile Card ───
function CountryProfileCard({
  country,
  color,
  index,
}: {
  country: Country;
  color: string;
  index: number;
}) {
  const { t, isKorean } = useLanguage();

  const profile = useMemo(() => {
    const entries = Object.entries(country.dimensions) as [keyof Dimensions, number][];
    let highest = entries[0];
    let lowest = entries[0];
    let mostExtreme = entries[0];
    let maxDist = Math.abs(entries[0][1] - 50);

    for (const [key, value] of entries) {
      if (value > highest[1]) highest = [key, value];
      if (value < lowest[1]) lowest = [key, value];
      const dist = Math.abs(value - 50);
      if (dist > maxDist) {
        maxDist = dist;
        mostExtreme = [key, value];
      }
    }

    const [extremeKey, extremeValue] = mostExtreme;
    const phraseMap = profilePhraseKeys[extremeKey];
    let phrase: string | null = null;
    if (phraseMap) {
      if (extremeValue >= 65) phrase = t(phraseMap.high);
      else if (extremeValue <= 35) phrase = t(phraseMap.low);
    }

    return {
      highest,
      lowest,
      phrase,
    };
  }, [country, t]);

  const highestLabel = dimensionTranslationKeys[profile.highest[0]]?.name ?? profile.highest[0];
  const lowestLabel = dimensionTranslationKeys[profile.lowest[0]]?.name ?? profile.lowest[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2 + index * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="luxury-card rounded-lg p-4 sm:p-5"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{getFlagEmoji(country.code)}</span>
        <h4
          className="font-medium text-sm text-[#1A1A1A]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {isKorean ? country.nameKo : country.name}
        </h4>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#666666]">{t('highestDimension')}</span>
          <span className="font-medium text-[#1A1A1A]">
            {t(highestLabel as keyof TranslationKeys)} ({profile.highest[1]})
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#666666]">{t('lowestDimension')}</span>
          <span className="font-medium text-[#1A1A1A]">
            {t(lowestLabel as keyof TranslationKeys)} ({profile.lowest[1]})
          </span>
        </div>
      </div>

      {profile.phrase && (
        <div className="mt-3 pt-3 border-t border-black/5">
          <p className="text-[11px] text-[#9D7E57] font-medium leading-relaxed">
            {profile.phrase}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Component ───
export function DimensionRadar({ countries }: DimensionRadarProps) {
  const { t, isKorean } = useLanguage();
  const { width } = useWindowSize();
  const shouldReduceMotion = useReducedMotion();

  const isMobile = width < 640;

  // Visibility state for interactive legend — Set of hidden country codes
  const [hiddenCountries, setHiddenCountries] = useState<Set<string>>(new Set());

  // Compute visibility map from current countries + hidden set
  const visibilityMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    for (const c of countries) {
      map[c.code] = !hiddenCountries.has(c.code);
    }
    return map;
  }, [countries, hiddenCountries]);

  const toggleCountryVisibility = useCallback((code: string) => {
    setHiddenCountries((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  }, []);

  // Active dimensions toggle (LTO / IVR)
  const [activeDimensions, setActiveDimensions] = useState<Set<string>>(
    new Set(['PDI', 'IDV', 'UAI', 'MAS', 'LTO', 'IVR'])
  );

  const toggleDimension = useCallback((key: string) => {
    setActiveDimensions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        // Prevent hiding all dimensions — keep at least one
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const activeDimensionInfo = useMemo(
    () => dimensionInfo.filter((d) => activeDimensions.has(d.key)),
    [activeDimensions]
  );

  const coreDimensions = activeDimensionInfo.filter((d) =>
    ['PDI', 'IDV', 'UAI', 'MAS'].includes(d.key)
  );
  const extendedDimensions = activeDimensionInfo.filter((d) =>
    ['LTO', 'IVR'].includes(d.key)
  );

  // Build radar data from active dimensions only
  const data = useMemo(() => {
    return activeDimensionInfo.map((dim) => {
      const dataPoint: Record<string, string | number> = {
        dimension: isKorean ? dim.nameKo : dim.name,
        dimensionKey: dim.key,
        fullMark: 100,
      };
      for (const country of countries) {
        dataPoint[country.code] = country.dimensions[dim.key];
      }
      return dataPoint;
    });
  }, [activeDimensionInfo, countries, isKorean]);

  // Aria label
  const ariaLabel = useMemo(() => {
    const names = countries.map((c) => (isKorean ? c.nameKo : c.name)).join(', ');
    return `Cultural dimensions radar chart comparing ${names}`;
  }, [countries, isKorean]);

  if (countries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] border border-dashed border-black/10 rounded-lg">
        <motion.div
          initial={shouldReduceMotion ? undefined : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-3xl sm:text-4xl mb-3 block text-center">📈</span>
        </motion.div>
        <p className="text-[#444444] text-xs sm:text-sm">{t('selectCountryToShowRadar')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Radar Chart */}
      <motion.div
        initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="h-[350px] sm:h-[500px]"
        role="img"
        aria-label={ariaLabel}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
            <PolarGrid stroke="rgba(0, 0, 0, 0.08)" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={(props) => <PolarTick {...props} isMobile={isMobile} />}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#666666', fontSize: 9 }}
              tickCount={5}
              axisLine={false}
            />
            {countries.map((country, index) => {
              const isVisible = visibilityMap[country.code] !== false;
              if (!isVisible) return null;
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
                      markerType={colorConfig.marker}
                      fill={colorConfig.stroke}
                    />
                  )}
                  label={
                    !isMobile
                      ? (props) => (
                          <RadarVertexLabel
                            cx={props.cx}
                            cy={props.cy}
                            value={props.value}
                          />
                        )
                      : false
                  }
                  animationDuration={shouldReduceMotion ? 0 : 600}
                  animationEasing="ease-in-out"
                  animationBegin={shouldReduceMotion ? 0 : index * 100}
                />
              );
            })}
            <Tooltip
              content={<CustomTooltip />}
              wrapperStyle={{ outline: 'none' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Dimension Toggle Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {dimensionInfo
          .filter((d) => ['LTO', 'IVR'].includes(d.key))
          .map((dim) => {
            const isActive = activeDimensions.has(dim.key);
            return (
              <button
                key={dim.key}
                onClick={() => toggleDimension(dim.key)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                  border
                  ${
                    isActive
                      ? 'bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-sm'
                      : 'bg-white text-[#666666] border-black/10 hover:border-[#8B5CF6]/40'
                  }
                `}
              >
                {isKorean ? dim.nameKo : dim.name} ({dim.key})
              </button>
            );
          })}
      </div>

      {/* Interactive Legend */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 py-2.5 sm:py-3 px-3 sm:px-4 bg-[#F5F4F0] rounded-lg border border-black/5">
        {countries.map((country, index) => {
          const colorConfig = chartColors[index % chartColors.length];
          const isVisible = visibilityMap[country.code] !== false;
          const markerSymbol =
            colorConfig.marker === 'circle' ? '●'
            : colorConfig.marker === 'square' ? '■'
            : '▲';
          const lineStyle =
            colorConfig.strokeDasharray === undefined ? '━━'
            : colorConfig.strokeDasharray === '8 4' ? '┅┅'
            : '···';
          return (
            <button
              key={country.code}
              onClick={() => toggleCountryVisibility(country.code)}
              className={`
                flex items-center gap-1.5 sm:gap-2 transition-all duration-300
                ${isVisible ? 'opacity-100' : 'opacity-40'}
              `}
              aria-pressed={isVisible}
              title={isVisible ? 'Click to hide' : 'Click to show'}
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
            </button>
          );
        })}
      </div>

      {/* Country Profile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country, index) => {
          const colorConfig = chartColors[index % chartColors.length];
          return (
            <CountryProfileCard
              key={country.code}
              country={country}
              color={colorConfig.stroke}
              index={index}
            />
          );
        })}
      </div>

      {/* Dimension explanations */}
      <div className="space-y-5 pt-4">
        {/* Core Dimensions */}
        {coreDimensions.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#B8956A] to-[#9D7E57]" />
              <span className="text-xs font-medium text-[#9D7E57]">{t('coreDimensions')}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {coreDimensions.map((dim, index) => (
                <motion.div
                  key={dim.key}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + index * 0.06,
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="p-3 sm:p-4 rounded-lg bg-[#F5F4F0] border border-black/5 hover:border-[#B8956A]/30 transition-all duration-500 border-l-2"
                  style={{ borderLeftColor: dim.color }}
                >
                  <h4
                    className="font-medium text-xs text-[#1A1A1A] mb-1.5 flex items-center gap-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dim.color }} />
                    {isKorean ? dim.nameKo : dim.name} ({dim.key})
                  </h4>
                  <p className="text-[10px] text-[#444444] leading-relaxed">
                    {t(dimensionTranslationKeys[dim.key].desc)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        {coreDimensions.length > 0 && extendedDimensions.length > 0 && (
          <div className="border-t border-dashed border-[#8B5CF6]/30" />
        )}

        {/* Extended Dimensions */}
        {extendedDimensions.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#6D28D9]" />
              <span className="text-xs font-medium text-[#7C3AED]">{t('extendedDimensions')}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {extendedDimensions.map((dim, index) => (
                <motion.div
                  key={dim.key}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5 + index * 0.06,
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="p-3 sm:p-4 rounded-lg bg-[#F5F4F0] border border-black/5 hover:border-[#8B5CF6]/30 transition-all duration-500 border-l-2"
                  style={{ borderLeftColor: dim.color }}
                >
                  <h4
                    className="font-medium text-xs text-[#1A1A1A] mb-1.5 flex items-center gap-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dim.color }} />
                    {isKorean ? dim.nameKo : dim.name} ({dim.key})
                  </h4>
                  <p className="text-[10px] text-[#444444] leading-relaxed">
                    {t(dimensionTranslationKeys[dim.key].desc)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
