import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n';

export function HeroSection() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={false}
      className="relative overflow-hidden w-full pt-6 pb-3 sm:py-12 max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
    >
      {/* Mobile background art overlay */}
      <div className="lg:hidden absolute inset-0 -z-10" aria-hidden="true">
        <img
          src="/art/hero-aurora.webp"
          alt=""
          className="w-full h-full object-cover opacity-25"
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1376}
          height={768}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-midnight)]/60 to-[var(--color-midnight)]" />
      </div>

      {/* Left Column (col-span-7) */}
      <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-brass)]/30 bg-[var(--surface-1)] px-4 py-1.5 mb-5"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-brass)] flex-shrink-0" />
          <span className="text-xs tracking-widest uppercase text-[var(--color-brass)] font-medium">
            {t('heroBadge')}
          </span>
        </motion.div>

        {/* Main Heading — no entrance animation: it is the LCP element on
            mobile and any fade delays the largest paint. */}
        <motion.h1
          initial={false}
          className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-wide leading-[1.15] uppercase text-gradient-gold text-balance"
          style={{
            fontFamily: "'Cormorant Garamond', 'Pretendard', serif",
            letterSpacing: '0.04em'
          }}
        >
          {t('heroTitle')}
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.35, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-24 h-[1px] bg-gradient-to-r from-[var(--color-brass)] to-transparent my-4"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-base sm:text-lg font-light tracking-wider max-w-xl leading-relaxed text-muted text-balance"
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
          transition={{ delay: 0.55, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-6 w-full sm:w-auto"
        >
          <button
            type="button"
            onClick={() => document.getElementById('country-selector')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-luxury btn-gold !h-12 !px-7 text-sm cursor-pointer w-full sm:w-auto flex items-center justify-center"
            style={{ height: '48px', padding: '0 28px' }}
          >
            {t('heroCtaPrimary')}
          </button>
          <a
            href="#bilateral-advice"
            className="rounded-full border border-[var(--surface-border)] px-7 h-12 flex items-center justify-center text-sm text-[var(--color-ivory-muted)] hover:border-[var(--color-brass)]/60 hover:text-[var(--color-brass)] transition-colors w-full sm:w-auto"
          >
            {t('heroCtaSecondary')}
          </a>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-8 flex items-center justify-center lg:justify-start gap-6 sm:gap-10"
        >
          <div className="flex flex-col items-center lg:items-start">
            <span
              className="numeric text-2xl sm:text-3xl text-gradient-gold"
            >
              {t('heroStatCountries')}
            </span>
          </div>
          <div className="w-px h-8 bg-[var(--surface-2)]" />
          <div className="flex flex-col items-center lg:items-start">
            <span
              className="numeric text-2xl sm:text-3xl text-gradient-gold"
            >
              {t('heroStatDimensions')}
            </span>
          </div>
          <div className="w-px h-8 bg-[var(--surface-2)]" />
          <div className="flex flex-col items-center lg:items-start">
            <span
              className="numeric text-2xl sm:text-3xl text-gradient-gold"
            >
              {t('heroStatClusters')}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Right Column (col-span-5): Hero Art Frame */}
      {/* No entrance fade on the art frame: an opacity animation delays the
          hero image's first paint and regresses LCP. Float loop only. */}
      <motion.div
        initial={false}
        className="hidden lg:flex lg:col-span-5 relative items-center justify-center mt-6 lg:mt-0"
      >
        {/* Frame behind blur glow decoration */}
        <div
          className="absolute -inset-6 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.25),rgba(45,125,154,0.18),transparent_70%)] -z-10 opacity-35 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Floating Frame */}
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full aspect-[16/10] rounded-2xl overflow-hidden card-gradient-border glow-gold shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          <img
            src="/art/hero-aurora.webp"
            alt={t('heroArtAlt')}
            width={1376}
            height={768}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover rounded-2xl"
            style={{ objectPosition: '72% center' }}
          />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="lg:col-span-12 mt-10 flex flex-col items-center gap-2 text-[var(--color-ivory-muted)]/60">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-[var(--color-brass)]/60 to-transparent animate-pulse" />
      </div>
    </motion.section>
  );
}

export default HeroSection;
