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

const chartColors = ['#3B82F6', '#10B981', '#F59E0B'];

export function DimensionRadar({ countries }: DimensionRadarProps) {
  if (countries.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        <p className="text-gray-500 text-sm">국가를 선택하면 레이더 차트가 표시됩니다</p>
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
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#9ca3af', fontSize: 10 }}
            tickCount={6}
          />
          {countries.map((country, index) => (
            <Radar
              key={country.code}
              name={country.nameKo}
              dataKey={country.code}
              stroke={chartColors[index % chartColors.length]}
              fill={chartColors[index % chartColors.length]}
              fillOpacity={0.2}
              strokeWidth={2}
              animationDuration={300}
            />
          ))}
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value, name) => [value ?? 0, name]}
          />
          <Legend
            wrapperStyle={{ paddingTop: '10px' }}
            formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
