import { motion } from 'framer-motion';
import { useLanguage } from '../i18n';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-center py-12 sm:py-20 max-w-4xl mx-auto flex flex-col items-center justify-center"
    >
      {/* Eyebrow Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brass)]/30 bg-white/5 px-4 py-1.5 mb-6"
      >
        <span className="w-2 h-2 rounded-full bg-[var(--color-brass)] flex-shrink-0" />
        <span className="text-xs tracking-widest uppercase text-[var(--color-brass)]">
          {t('heroBadge')}
        </span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-5xl sm:text-7xl font-light tracking-wide leading-tight uppercase text-gradient-gold text-balance"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          letterSpacing: '0.04em'
        }}
      >
        {t('heroTitle')}
      </motion.h1>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.45, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#B8956A] to-transparent my-6"
      />

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-base sm:text-lg font-light tracking-wider max-w-2xl leading-relaxed text-muted"
        style={{
          fontFamily: "'Inter', sans-serif",
          color: 'var(--text-muted)'
        }}
      >
        {t('heroSubtitle')}
      </motion.p>

      {/* CTA Row */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-wrap items-center justify-center gap-4 mt-8"
      >
        <button
          type="button"
          onClick={() => document.getElementById('country-selector')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-luxury btn-gold !h-12 !px-7 text-sm cursor-pointer"
          style={{ height: '48px', padding: '0 28px' }}
        >
          {t('heroCtaPrimary')}
        </button>
        <a
          href="#bilateral-advice"
          className="rounded-full border border-white/15 px-7 h-12 flex items-center text-sm text-[var(--color-ivory-muted)] hover:border-[var(--color-brass)]/60 hover:text-[var(--color-brass)] transition-colors"
        >
          {t('heroCtaSecondary')}
        </a>
      </motion.div>

      {/* Stats Strip */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-12 flex items-center gap-8 sm:gap-14 justify-center"
      >
        <div className="flex flex-col items-center">
          <span
            className="text-2xl font-semibold text-gradient-gold"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t('heroStatCountries')}
          </span>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="flex flex-col items-center">
          <span
            className="text-2xl font-semibold text-gradient-gold"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t('heroStatDimensions')}
          </span>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="flex flex-col items-center">
          <span
            className="text-2xl font-semibold text-gradient-gold"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t('heroStatClusters')}
          </span>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default HeroSection;
