import { motion } from 'framer-motion';
import type { Country } from '../types';
import { dimensionInfo, getDimensionLevelKo } from '../data/countries';

interface DimensionBarProps {
  countries: Country[];
}

const chartColors = [
  { bg: '#B8956A', light: 'rgba(184, 149, 106, 0.15)' },
  { bg: '#7D8471', light: 'rgba(125, 132, 113, 0.15)' },
  { bg: '#C4886B', light: 'rgba(196, 136, 107, 0.15)' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
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
      className="space-y-5"
    >
      {dimensionInfo.map((dim, dimIndex) => (
        <motion.div
          key={dim.key}
          variants={itemVariants}
          className="bg-[#F5F4F0] rounded-lg p-5 border border-black/5 hover:border-[#B8956A]/30 transition-all duration-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4
                className="font-medium text-[#1A1A1A]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {dim.nameKo}
              </h4>
              <p className="text-xs text-[#5A5A5A]/60 tracking-wide">{dim.name}</p>
            </div>
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: dim.color }}
            />
          </div>

          <div className="space-y-3">
            {countries.map((country, index) => {
              const value = country.dimensions[dim.key];
              return (
                <div key={country.code} className="flex items-center gap-4">
                  <span className="w-16 text-sm text-[#5A5A5A] truncate">
                    {country.nameKo}
                  </span>
                  <div className="flex-1 h-8 bg-white rounded-lg overflow-hidden relative border border-black/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{
                        duration: 1,
                        delay: dimIndex * 0.1 + index * 0.06,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      className="h-full rounded-lg flex items-center justify-end pr-3"
                      style={{
                        backgroundColor: chartColors[index % chartColors.length].bg,
                      }}
                    >
                      <span className="text-xs text-white font-medium">
                        {value}
                      </span>
                    </motion.div>
                  </div>
                  <span className="w-10 text-xs text-[#5A5A5A]/60 text-right">
                    {getDimensionLevelKo(value)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-4 text-xs text-[#5A5A5A]/50">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EDECEA]" />
              {dim.lowDescription}
            </span>
            <span className="flex items-center gap-2">
              {dim.highDescription}
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: dim.color }}
              />
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
