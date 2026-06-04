import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2 } from 'lucide-react';
import type { Country, ClusterType, AdviceContext, BilateralAdviceResult } from './types';
import { ClusterMap } from './components/ClusterMap';
import { CountrySelector } from './components/CountrySelector';
import { DimensionRadar } from './components/DimensionRadar';
import { DimensionBar } from './components/DimensionBar';
import { ComparisonTable } from './components/ComparisonTable';
import { AdviceContextSelector } from './components/AdviceContextSelector';
import { BilateralNegotiationAdvice } from './components/BilateralNegotiationAdvice';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { DarkModeToggle } from './components/DarkModeToggle';
import { HeroSection } from './components/HeroSection';
import { CountryNatureScene } from './components/CountryNatureScene';
import { useLanguage } from './i18n';
import { useUrlState } from './hooks/useUrlState';
import { useDarkMode } from './hooks/useDarkMode';
import { generateBilateralContextAdvice } from './advice';
import { countryToProfile } from './utils/profileConverter';
import './index.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

function App() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const { theme, toggleTheme } = useDarkMode();
  const { initialCountries, initialContext, syncUrl, popStateTrigger, parseFromUrl } = useUrlState();

  const [selectedCountries, setSelectedCountries] = useState<Country[]>(initialCountries);
  const [filterCluster, setFilterCluster] = useState<ClusterType | null>(null);
  const [selectedContext, setSelectedContext] = useState<AdviceContext | null>(null);

  // Section refs for scroll navigation
  const sidebarRef = useRef<HTMLElement>(null);

  // Sync URL when selections change
  useEffect(() => {
    syncUrl(selectedCountries, selectedContext);
  }, [selectedCountries, selectedContext, syncUrl]);

  // React to browser back/forward
  useEffect(() => {
    const { parsedCountries, parsedContext } = parseFromUrl();
    setSelectedCountries(parsedCountries);
    setSelectedContext(parsedContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popStateTrigger]);

  // PNG Export handler (dynamic import to avoid bundle bloat)
  const handleExportChart = useCallback(async () => {
    if (!radarContainerRef.current) return;
    setIsExporting(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(radarContainerRef.current, {
        backgroundColor: '#FFFFFF',
        scale: 2,
      });
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const link = document.createElement('a');
      link.download = `hofstede-chart-${timestamp}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Chart export failed:', err);
    } finally {
      setIsExporting(false);
    }
  }, []);

  // Bilateral advice - only when exactly 2 countries selected
  const bilateralAdvice = useMemo<BilateralAdviceResult | null>(() => {
    if (selectedCountries.length !== 2 || !selectedContext) {
      return null;
    }
    const profileA = countryToProfile(selectedCountries[0]);
    const profileB = countryToProfile(selectedCountries[1]);
    return generateBilateralContextAdvice(profileA, profileB, selectedContext);
  }, [selectedCountries, selectedContext]);

  const handleCountrySelect = (country: Country) => {
    if (selectedCountries.length < 3) {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const handleCountryRemove = (countryCode: string) => {
    setSelectedCountries(selectedCountries.filter((c) => c.code !== countryCode));
  };

  const handleClusterSelect = (cluster: ClusterType | null) => {
    setFilterCluster(cluster);
  };

  const handleContextSelect = (context: AdviceContext | null) => {
    setSelectedContext(context);
  };

  return (
    <div className="bg-aurora min-h-screen relative overflow-hidden">
      {/* Ambient background overlay for selected country nature biome */}
      {selectedCountries.length > 0 && (
        <CountryNatureScene
          countryCode={selectedCountries[selectedCountries.length - 1].code}
        />
      )}

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="sticky top-0 z-40 glass-strong shadow-lg"
      >
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--color-brass-light), var(--color-brass))' }}
              >
                <Globe2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
              </motion.div>
              <div>
                <h1
                  className="text-lg sm:text-xl font-bold tracking-wider text-[var(--color-brass)] uppercase"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  TRINOS | CULTURAL COMPASS
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="max-w-[1140px] mx-auto px-4 sm:px-6 py-6 sm:py-12 relative z-10">
        <HeroSection />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8"
        >
          {/* Left sidebar - Cluster Map */}
          <motion.aside
            ref={sidebarRef}
            variants={itemVariants}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 order-2 lg:order-1"
            id="cluster-sidebar"
          >
            <div className="lg:sticky lg:top-24 space-y-5 sm:space-y-8">
              <ClusterMap
                selectedCluster={filterCluster}
                onClusterSelect={handleClusterSelect}
              />
            </div>
          </motion.aside>

          {/* Main content area */}
          <div className="lg:col-span-9 space-y-5 sm:space-y-8 order-1 lg:order-2 transition-all duration-300">
            {/* Country selector */}
            <motion.div variants={itemVariants} id="country-selector" className="glass-card rounded-lg p-4 sm:p-8">
              <div className="flex flex-col gap-2 mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div className="accent-bar" />
                  <h2
                    className="text-lg sm:text-2xl font-bold text-[var(--color-brass)]"
                    style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
                  >
                    {t('countrySelection')}
                  </h2>
                  <span className="text-[10px] sm:text-xs text-[var(--color-ivory-muted)] tracking-wide uppercase ml-1 sm:ml-2">
                    {t('maxCount')}
                  </span>
                </div>
                <div className="w-16 h-[1px] bg-gradient-to-r from-[var(--color-brass)] to-transparent mt-1" />
              </div>
              <CountrySelector
                selectedCountries={selectedCountries}
                onCountrySelect={handleCountrySelect}
                onCountryRemove={handleCountryRemove}
                filterCluster={filterCluster}
              />
            </motion.div>

            {/* ============================================ */}
            {/* SECTION 1: Cultural Dimension Comparison */}
            {/* ============================================ */}
            {selectedCountries.length > 0 && (
              <motion.div variants={itemVariants} id="dimension-comparison">
                <div className="flex flex-col gap-2 mb-4 sm:mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl">📊</span>
                    <div>
                      <h2
                        className="text-lg sm:text-2xl font-bold text-[var(--color-brass)]"
                        style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
                      >
                        {t('cultureDimensionComparison')}
                      </h2>
                      <p className="text-xs sm:text-sm text-[var(--color-ivory-muted)] mt-0.5">
                        {t('compareDimensionsDescription')}
                      </p>
                    </div>
                  </div>
                  <div className="w-16 h-[1px] bg-gradient-to-r from-[var(--color-brass)] to-transparent mt-1" />
                </div>
              </motion.div>
            )}

            {/* Charts section */}
            {selectedCountries.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-5 sm:space-y-8">
                {/* Radar chart - full width with dimension explanations */}
                <div className="glass-card rounded-lg p-4 sm:p-8">
                  <div className="flex flex-col gap-2 mb-4 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <div className="accent-bar" />
                      <h2
                        className="text-base sm:text-xl font-bold text-[var(--color-brass)]"
                        style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
                      >
                        {t('radarChart')}
                      </h2>
                      <span className="text-[10px] sm:text-xs text-[var(--color-brass)] bg-white/5 px-2.5 py-0.5 rounded-full font-medium border border-white/5">
                        {t('sixDimensionComparison')}
                      </span>
                    </div>
                    <div className="w-16 h-[1px] bg-gradient-to-r from-[var(--color-brass)] to-transparent mt-1" />
                  </div>
                  <DimensionRadar countries={selectedCountries} />
                </div>

                {/* Bar charts */}
                <div className="glass-card rounded-lg p-4 sm:p-8">
                  <div className="flex flex-col gap-2 mb-4 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <div className="accent-bar" />
                      <h2
                        className="text-base sm:text-xl font-bold text-[var(--color-brass)]"
                        style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
                      >
                        {t('dimensionBarComparison')}
                      </h2>
                    </div>
                    <div className="w-16 h-[1px] bg-gradient-to-r from-[var(--color-brass)] to-transparent mt-1" />
                  </div>
                  <DimensionBar countries={selectedCountries} />
                </div>
              </motion.div>
            )}

            {/* Comparison table */}
            {selectedCountries.length > 0 && (
              <motion.div variants={itemVariants} id="comparison-table">
                <ComparisonTable countries={selectedCountries} />
              </motion.div>
            )}

            {/* ============================================ */}
            {/* SECTION 2: Bilateral Situational Advice */}
            {/* ============================================ */}
            <motion.div variants={itemVariants} id="bilateral-advice">
              <div className="flex flex-col gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl">💡</span>
                  <div>
                    <h2
                      className="text-lg sm:text-2xl font-bold text-[var(--color-brass)]"
                      style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
                    >
                      {t('bilateralAdvice')}
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--color-ivory-muted)] mt-0.5">
                      {t('bilateralAdviceDescription')}
                    </p>
                  </div>
                </div>
                <div className="w-16 h-[1px] bg-gradient-to-r from-[var(--color-brass)] to-transparent mt-1" />
              </div>
              {/* Framework note */}
              <div className="mb-4 sm:mb-5 px-4 py-2.5 bg-white/5 rounded-lg border border-[var(--color-brass)]/15">
                <p className="text-[10px] sm:text-xs text-[var(--color-ivory-muted)] leading-relaxed">
                  <span className="font-semibold text-[var(--color-brass)]">{t('frameworkLabel')}</span>{' '}
                  {t('frameworkDescription')}
                </p>
              </div>
            </motion.div>

            {/* Guidance messages based on country count */}
            <AnimatePresence mode="wait">
              {selectedCountries.length === 0 && (
                <motion.div
                  key="no-country"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-lg p-5 sm:p-6 text-center border-l-4 border-white/10"
                >
                  <p className="text-sm sm:text-base text-[var(--color-ivory-muted)] flex items-center justify-center gap-3">
                    <span className="text-xl">🌍</span>
                    <span dangerouslySetInnerHTML={{ __html: t('selectTwoCountriesFirst') }} />
                  </p>
                </motion.div>
              )}

              {selectedCountries.length === 1 && (
                <motion.div
                  key="one-country"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-lg p-5 sm:p-6 text-center border-l-4 border-[var(--color-brass)]"
                >
                  <p className="text-sm sm:text-base text-[var(--color-ivory-muted)] flex items-center justify-center gap-3">
                    <span className="text-xl">👆</span>
                    <span dangerouslySetInnerHTML={{ __html: t('selectOneMoreCountry') }} />
                  </p>
                </motion.div>
              )}

              {selectedCountries.length === 3 && (
                <motion.div
                  key="three-country"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-lg p-5 sm:p-6 text-center border-l-4 border-[var(--color-sage)]"
                >
                  <p className="text-sm sm:text-base text-[var(--color-ivory-muted)] flex items-center justify-center gap-3">
                    <span className="text-xl">ℹ️</span>
                    <span dangerouslySetInnerHTML={{ __html: t('bilateralOnlyForTwoCountries') }} />
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Context selector - only show when exactly 2 countries */}
            {selectedCountries.length === 2 && (
              <motion.div variants={itemVariants}>
                <AdviceContextSelector
                  selectedContext={selectedContext}
                  onContextSelect={handleContextSelect}
                />
              </motion.div>
            )}

            {/* Bilateral advice */}
            <AnimatePresence mode="wait">
              {bilateralAdvice && selectedContext && selectedCountries.length === 2 && (
                <motion.div
                  key="bilateral"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <BilateralNegotiationAdvice advice={bilateralAdvice} context={selectedContext} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state for advice - when 2 countries selected but no context */}
            <AnimatePresence>
              {selectedCountries.length === 2 && !selectedContext && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="glass-card rounded-lg p-6 sm:p-8"
                >
                  <div className="flex flex-col items-center justify-center py-8 sm:py-12 border border-dashed border-white/10 rounded-lg">
                    <span className="text-3xl sm:text-4xl mb-4">💡</span>
                    <p className="text-[var(--color-ivory-muted)] text-sm sm:text-base text-center leading-relaxed whitespace-pre-line">
                      {t('selectSituationAbove')}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-12 sm:mt-20 border-t border-white/5 bg-white/5 relative z-10">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            {/* Logo and Contact */}
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <h3
                className="text-xl sm:text-2xl font-bold tracking-wide"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: '0.06em',
                  background: 'linear-gradient(135deg, var(--color-brass-light), var(--color-brass))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Trinos Research Lab
              </h3>
              <a
                href="https://mediator.trinos.group/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury btn-gold text-sm"
                style={{ height: '48px', padding: '0 28px' }}
              >
                {t('contact')}
              </a>
            </div>

            {/* Divider */}
            <div className="divider-gold" />

            {/* Credits */}
            <div className="text-center space-y-3">
              <p className="text-sm text-[var(--color-ivory-muted)]">
                {t('basedOn')}
              </p>
              <p className="text-sm text-[var(--color-ivory-muted)]">
                {t('dataSource')}{' '}
                <a
                  href="https://www.theculturefactor.com/country-comparison-tool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-[var(--color-brass)] hover:text-[var(--color-brass-light)]"
                >
                  The Culture Factor
                </a>
              </p>
            </div>

            {/* Copyright */}
            <p className="text-xs text-[var(--color-ivory-muted)] opacity-60 tracking-wide">
              {t('copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
