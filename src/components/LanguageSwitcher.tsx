/**
 * Language Switcher Component
 *
 * A modern, accessible language toggle with Liquid Glass design.
 * Features:
 * - Glassmorphism effect with backdrop blur
 * - Smooth pill-shaped toggle animation
 * - Keyboard accessible (Tab, Enter, Space)
 * - Responsive: compact on mobile, full on desktop
 */

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '../i18n';

export function LanguageSwitcher() {
  const { language, toggleLanguage, isKorean } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleLanguage();
        }
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="
        relative flex items-center gap-1.5 sm:gap-2
        px-2 sm:px-3 py-2 sm:py-2.5
        rounded-full
        bg-white/60 backdrop-blur-md
        border border-white/40
        shadow-[0_2px_12px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]
        hover:bg-white/80 hover:border-[#B8956A]/30
        hover:shadow-[0_4px_16px_rgba(184,149,106,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]
        focus:outline-none focus:ring-2 focus:ring-[#B8956A]/40 focus:ring-offset-2 focus:ring-offset-white/50
        transition-all duration-300 ease-out
        cursor-pointer
        min-h-[44px]
      "
      aria-label={isKorean ? 'Switch to English' : '한국어로 변경'}
      role="switch"
      aria-checked={isKorean}
    >
      {/* Globe icon - visible on mobile */}
      <Globe
        className="w-4 h-4 text-[#9D7E57] sm:hidden flex-shrink-0"
        strokeWidth={1.5}
      />

      {/* Language options container */}
      <div className="relative flex items-center">
        {/* Sliding pill background */}
        <motion.div
          className="absolute inset-y-0 rounded-full bg-gradient-to-r from-[#B8956A] to-[#9D7E57] shadow-sm"
          initial={false}
          animate={{
            left: isKorean ? 0 : '50%',
            width: '50%',
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        />

        {/* Korean option */}
        <span
          className={`
            relative z-10 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium
            transition-colors duration-300 ease-out
            ${isKorean
              ? 'text-white'
              : 'text-[#666666] hover:text-[#444444]'
            }
          `}
        >
          <span className="hidden sm:inline">한국어</span>
          <span className="sm:hidden">KO</span>
        </span>

        {/* English option */}
        <span
          className={`
            relative z-10 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium
            transition-colors duration-300 ease-out
            ${!isKorean
              ? 'text-white'
              : 'text-[#666666] hover:text-[#444444]'
            }
          `}
        >
          <span className="hidden sm:inline">EN</span>
          <span className="sm:hidden">EN</span>
        </span>
      </div>
    </motion.button>
  );
}

export default LanguageSwitcher;
