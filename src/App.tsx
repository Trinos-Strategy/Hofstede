import { useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2, Info } from 'lucide-react';
import type { Country, ClusterType, AdviceContext, BilateralAdviceResult } from './types';
import { ClusterMap } from './components/ClusterMap';
import { CountrySelector } from './components/CountrySelector';
import { DimensionRadar } from './components/DimensionRadar';
import { DimensionBar } from './components/DimensionBar';
import { ComparisonTable } from './components/ComparisonTable';
import { AdviceContextSelector } from './components/AdviceContextSelector';
import { BilateralNegotiationAdvice } from './components/BilateralNegotiationAdvice';
import { HamburgerMenu } from './components/HamburgerMenu';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { DisclaimerModal, useDisclaimerModal } from './components/DisclaimerModal';
import { useLanguage } from './i18n';
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

  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [filterCluster, setFilterCluster] = useState<ClusterType | null>(null);
  const [selectedContext, setSelectedContext] = useState<AdviceContext | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Disclaimer modal state
  const { isOpen: showDisclaimer, openModal: openDisclaimer, closeModal: closeDisclaimer } = useDisclaimerModal();

  // Section refs for scroll navigation
  const sidebarRef = useRef<HTMLElement>(null);

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

  // Scroll to section handler
  const handleScrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  // Toggle sidebar visibility (especially useful for mobile)
  const handleToggleSidebar = useCallback(() => {
    setSidebarVisible(prev => !prev);
    // On mobile, also scroll to sidebar if making it visible
    if (!sidebarVisible && sidebarRef.current) {
      setTimeout(() => {
        sidebarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [sidebarVisible]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/5"
      >
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #B8956A, #9D7E57)' }}
              >
                <Globe2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
              </motion.div>
              <div>
                <h1 className="text-lg sm:text-2xl font-medium tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('appTitle')}
                </h1>
                <p className="text-xs sm:text-sm text-[#444444] tracking-wide mt-0.5 hidden sm:block">
                  {t('appSubtitle')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                onClick={openDisclaimer}
                className="p-3 rounded-lg border border-black/10 hover:border-[#B8956A] hover:bg-[#FAFAF8] transition-all duration-500"
                title={t('info')}
              >
                <Info className="w-5 h-5 text-[#444444]" strokeWidth={1.5} />
              </motion.button>
              <LanguageSwitcher />
              <HamburgerMenu
                onScrollToSection={handleScrollToSection}
                onToggleSidebar={handleToggleSidebar}
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="max-w-[1140px] mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8"
        >
          {/* Left sidebar - Cluster Map */}
          <AnimatePresence>
            {sidebarVisible && (
              <motion.aside
                ref={sidebarRef}
                variants={itemVariants}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
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
            )}
          </AnimatePresence>

          {/* Main content area */}
          <div className={`${sidebarVisible ? 'lg:col-span-9' : 'lg:col-span-12'} space-y-5 sm:space-y-8 order-1 lg:order-2 transition-all duration-300`}>
            {/* Country selector */}
            <motion.div variants={itemVariants} id="country-selector" className="luxury-card rounded-lg p-4 sm:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="accent-bar" />
                <h2 className="text-lg sm:text-xl font-medium text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('countrySelection')}
                </h2>
                <span className="text-[10px] sm:text-xs text-[#444444] tracking-wide uppercase ml-1 sm:ml-2">{t('maxCount')}</span>
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
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <span className="text-xl sm:text-2xl">📊</span>
                  <div>
                    <h2 className="text-lg sm:text-xl font-medium text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {t('cultureDimensionComparison')}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#444444] mt-0.5">
                      {t('compareDimensionsDescription')}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Charts section */}
            {selectedCountries.length > 0 && (
            <motion.div variants={itemVariants} className="space-y-5 sm:space-y-8">
              {/* Radar chart - full width with dimension explanations */}
              <div className="luxury-card rounded-lg p-4 sm:p-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="accent-bar" />
                  <h2 className="text-base sm:text-lg font-medium text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t('radarChart')}
                  </h2>
                  <span className="text-[10px] sm:text-xs text-[#9D7E57] bg-[#B8956A]/10 px-2 py-0.5 rounded-full font-medium">
                    {t('sixDimensionComparison')}
                  </span>
                </div>
                <DimensionRadar countries={selectedCountries} />
              </div>

              {/* Bar charts */}
              <div className="luxury-card rounded-lg p-4 sm:p-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="accent-bar" />
                  <h2 className="text-base sm:text-lg font-medium text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t('dimensionBarComparison')}
                  </h2>
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
              <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <span className="text-xl sm:text-2xl">💡</span>
                <div>
                  <h2 className="text-lg sm:text-xl font-medium text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t('bilateralAdvice')}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#444444] mt-0.5">
                    {t('bilateralAdviceDescription')}
                  </p>
                </div>
              </div>
              {/* Framework note */}
              <div className="mb-4 sm:mb-5 px-4 py-2.5 bg-[#F5F4F0] rounded-lg border border-[#B8956A]/15">
                <p className="text-[10px] sm:text-xs text-[#555555] leading-relaxed">
                  <span className="font-medium text-[#9D7E57]">{t('frameworkLabel')}</span>{' '}
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
                  className="luxury-card rounded-lg p-5 sm:p-6 text-center border-l-4 border-[#5A5A5A]/30"
                >
                  <p className="text-sm sm:text-base text-[#444444] flex items-center justify-center gap-3">
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
                  className="luxury-card rounded-lg p-5 sm:p-6 text-center border-l-4 border-[#C9A227]"
                >
                  <p className="text-sm sm:text-base text-[#444444] flex items-center justify-center gap-3">
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
                  className="luxury-card rounded-lg p-5 sm:p-6 text-center border-l-4 border-[#6B7B8C]"
                >
                  <p className="text-sm sm:text-base text-[#444444] flex items-center justify-center gap-3">
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
                  className="luxury-card rounded-lg p-6 sm:p-8"
                >
                  <div className="flex flex-col items-center justify-center py-8 sm:py-12 border border-dashed border-black/10 rounded-lg">
                    <span className="text-3xl sm:text-4xl mb-4">💡</span>
                    <p className="text-[#444444] text-sm sm:text-base text-center leading-relaxed whitespace-pre-line">
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
      <footer className="mt-12 sm:mt-20 border-t border-black/5 bg-[#F5F4F0]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            {/* Logo and Contact */}
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <h3
                className="text-xl sm:text-2xl font-medium tracking-wide"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  background: 'linear-gradient(135deg, #B8956A, #9D7E57)',
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
              <p className="text-sm text-[#444444]">
                {t('basedOn')}
              </p>
              <p className="text-sm text-[#444444]">
                {t('dataSource')}{' '}
                <a
                  href="https://www.theculturefactor.com/country-comparison-tool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-[#9D7E57] hover:text-[#B8956A]"
                >
                  The Culture Factor
                </a>
              </p>
            </div>

            {/* Copyright */}
            <p className="text-xs text-[#444444]/60 tracking-wide">
              {t('copyright')}
            </p>
          </div>
        </div>
      </footer>

      {/* Disclaimer Modal */}
      <DisclaimerModal isOpen={showDisclaimer} onClose={closeDisclaimer} />
    </div>
  );
}

export default App;
