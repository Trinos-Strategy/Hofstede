import type { Country } from '../types';
import { dimensionInfo, getDimensionLevelKo } from '../data/countries';

interface DimensionBarProps {
  countries: Country[];
}

const chartColors = ['#3B82F6', '#10B981', '#F59E0B'];

export function DimensionBar({ countries }: DimensionBarProps) {
  if (countries.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {dimensionInfo.map((dim) => (
        <div key={dim.key} className="bg-white rounded-lg p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-medium text-gray-800">{dim.nameKo}</h4>
              <p className="text-xs text-gray-500">{dim.name}</p>
            </div>
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: dim.color }}
            />
          </div>
          <div className="space-y-2">
            {countries.map((country, index) => {
              const value = country.dimensions[dim.key];
              return (
                <div key={country.code} className="flex items-center gap-3">
                  <span className="w-16 text-sm text-gray-600 truncate">
                    {country.nameKo}
                  </span>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                      style={{
                        width: `${value}%`,
                        backgroundColor: chartColors[index % chartColors.length],
                      }}
                    >
                      <span className="text-xs text-white font-medium">
                        {value}
                      </span>
                    </div>
                  </div>
                  <span className="w-12 text-xs text-gray-500 text-right">
                    {getDimensionLevelKo(value)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>{dim.lowDescription}</span>
            <span>{dim.highDescription}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
