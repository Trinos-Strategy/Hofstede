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
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-5xl sm:text-7xl font-light tracking-wide text-primary leading-tight uppercase"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: 'var(--text-primary)',
          letterSpacing: '0.04em'
        }}
      >
        {t('heroTitle')}
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#B8956A] to-transparent my-6"
      />

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-base sm:text-lg font-light tracking-wider max-w-2xl leading-relaxed text-muted"
        style={{
          fontFamily: "'Inter', sans-serif",
          color: 'var(--text-muted)'
        }}
      >
        {t('heroSubtitle')}
      </motion.p>
    </motion.section>
  );
}

export default HeroSection;
