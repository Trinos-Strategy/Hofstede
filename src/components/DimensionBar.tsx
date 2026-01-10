import { motion } from 'framer-motion';
import type { Country } from '../types';
import { dimensionInfo, getDimensionLevelKo } from '../data/countries';

interface DimensionBarProps {
  countries: Country[];
}

const chartColors = [
  { gradient: 'from-blue-500 to-indigo-500', glow: 'rgba(59, 130, 246, 0.3)' },
  { gradient: 'from-emerald-500 to-teal-500', glow: 'rgba(16, 185, 129, 0.3)' },
  { gradient: 'from-amber-500 to-orange-500', glow: 'rgba(245, 158, 11, 0.3)' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function DimensionBar({ countries }: DimensionBarProps) {
  if (countries.length === 0) {
    return null;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {dimensionInfo.map((dim, dimIndex) => (
        <motion.div
          key={dim.key}
          variants={itemVariants}
          className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium text-white">{dim.nameKo}</h4>
              <p className="text-xs text-gray-500">{dim.name}</p>
            </div>
            <div
              className="w-3 h-3 rounded-full shadow-lg"
              style={{
                backgroundColor: dim.color,
                boxShadow: `0 0 10px ${dim.color}80`,
              }}
            />
          </div>

          <div className="space-y-3">
            {countries.map((country, index) => {
              const value = country.dimensions[dim.key];
              return (
                <div key={country.code} className="flex items-center gap-3">
                  <span className="w-16 text-sm text-gray-400 truncate">
                    {country.nameKo}
                  </span>
                  <div className="flex-1 h-7 bg-white/5 rounded-lg overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{
                        duration: 0.8,
                        delay: dimIndex * 0.1 + index * 0.05,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className={`h-full rounded-lg bg-gradient-to-r ${chartColors[index % chartColors.length].gradient} flex items-center justify-end pr-2`}
                      style={{
                        boxShadow: `0 0 15px ${chartColors[index % chartColors.length].glow}`,
                      }}
                    >
                      <span className="text-xs text-white font-bold drop-shadow-md">
                        {value}
                      </span>
                    </motion.div>
                  </div>
                  <span className="w-10 text-xs text-gray-500 text-right">
                    {getDimensionLevelKo(value)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-600" />
              {dim.lowDescription}
            </span>
            <span className="flex items-center gap-1">
              {dim.highDescription}
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dim.color }} />
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
