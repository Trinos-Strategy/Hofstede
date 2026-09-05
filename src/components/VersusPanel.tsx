import { useMemo } from 'react';
import type { Country } from '../types';
import { dimensionInfo } from '../data/countries';
import { useLanguage } from '../i18n';
import type { TranslationKeys } from '../i18n/translations';

interface VersusPanelProps {
  countries: Country[];
}

const COLOR_A = '#4FC3C3';
const COLOR_B = '#E8A838';

const descKeys: Record<string, keyof TranslationKeys> = {
  PDI: 'descPDI',
  IDV: 'descIDV',
  UAI: 'descUAI',
  MAS: 'descMAS',
  LTO: 'descLTO',
  IVR: 'descIVR',
};

export function VersusPanel({ countries }: VersusPanelProps) {
  const { t, isKorean } = useLanguage();

  const countryA = countries[0];
  const countryB = countries[1];

  const rows = useMemo(() => {
    if (!countryA || !countryB) return [];
    return dimensionInfo.map((dim) => {
      const valA = countryA.dimensions[dim.key] ?? 0;
      const valB = countryB.dimensions[dim.key] ?? 0;
      const gap = Math.abs(valA - valB);
      return {
        dim,
        valA,
        valB,
        gap,
        isHigherA: valA > valB,
        isHigherB: valB > valA,
      };
    });
  }, [countryA, countryB]);

  const biggestGapRow = useMemo(() => {
    if (rows.length === 0) return null;
    let max = rows[0];
    for (const r of rows) {
      if (r.gap > max.gap) {
        max = r;
      }
    }
    return max;
  }, [rows]);

  if (countries.length !== 2 || !countryA || !countryB || !biggestGapRow) {
    return null;
  }

  const nameA = isKorean ? countryA.nameKo : countryA.name;
  const nameB = isKorean ? countryB.nameKo : countryB.name;

  return (
    <div className="w-full space-y-6">
      {/* 1) Top summary card */}
      <div className="glass-card p-3.5 sm:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-widest text-[var(--color-brass)] font-semibold">
            {t('vsBiggestGap')}
          </span>
          <h4 className="text-base font-semibold text-[var(--color-ivory)] mt-0.5">
            {isKorean ? biggestGapRow.dim.nameKo : biggestGapRow.dim.name} ({biggestGapRow.dim.key})
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold" style={{ color: COLOR_A }}>
            {nameA} {biggestGapRow.valA}
          </span>
          <span className="text-sm font-medium text-[var(--color-ivory-muted)]">vs</span>
          <span className="text-2xl font-bold" style={{ color: COLOR_B }}>
            {nameB} {biggestGapRow.valB}
          </span>
        </div>
      </div>

      {/* Legend with two country names above first row */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--surface-border)] px-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLOR_A }} />
          <span className="text-sm font-semibold text-[var(--color-ivory)]">{nameA}</span>
        </div>
        <span className="text-xs font-semibold tracking-wider text-[var(--color-brass)] uppercase">
          {t('vsBarsLabel')}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[var(--color-ivory)]">{nameB}</span>
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLOR_B }} />
        </div>
      </div>

      {/* 2) 6 Dimension rows */}
      <div className="space-y-4 sm:space-y-5">
        {rows.map(({ dim, valA, valB, isHigherA, isHigherB }) => (
          <div key={dim.key} className="space-y-1.5">
            {/* Row header */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: dim.color }}
                />
                <span className="text-base font-semibold text-[var(--color-ivory)]">
                  {isKorean ? dim.nameKo : dim.name}
                </span>
                <span className="text-xs text-[var(--color-brass)] font-medium">({dim.key})</span>
              </div>
              <span className="text-xs text-[var(--color-ivory-muted)] line-clamp-1 max-w-md text-start">
                {t(descKeys[dim.key])}
              </span>
            </div>

            {/* Bars container */}
            <div className="flex items-center gap-3 h-8">
              {/* Country A value */}
              <div className="w-14 text-right flex items-center justify-end gap-1 flex-shrink-0">
                {isHigherA && (
                  <span className="text-xs font-bold" style={{ color: COLOR_A }}>
                    ▲
                  </span>
                )}
                <span className="text-2xl font-bold" style={{ color: COLOR_A }}>
                  {valA}
                </span>
              </div>

              {/* Dual bars */}
              <div className="flex-1 flex items-center h-full">
                {/* Left bar (Country A) */}
                <div className="flex-1 flex justify-end items-center h-full">
                  <div
                    className="h-3 rounded-l-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.max(0, valA))}%`,
                      backgroundColor: COLOR_A,
                    }}
                  />
                </div>

                {/* Center 2px vertical line */}
                <div className="w-0.5 h-6 bg-white/20 flex-shrink-0" />

                {/* Right bar (Country B) */}
                <div className="flex-1 flex justify-start items-center h-full">
                  <div
                    className="h-3 rounded-r-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.max(0, valB))}%`,
                      backgroundColor: COLOR_B,
                    }}
                  />
                </div>
              </div>

              {/* Country B value */}
              <div className="w-14 text-left flex items-center justify-start gap-1 flex-shrink-0">
                <span className="text-2xl font-bold" style={{ color: COLOR_B }}>
                  {valB}
                </span>
                {isHigherB && (
                  <span className="text-xs font-bold" style={{ color: COLOR_B }}>
                    ▲
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VersusPanel;
