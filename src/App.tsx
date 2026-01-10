import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2, Info, X } from 'lucide-react';
import type { Country, ClusterType, AdviceContext, AdviceResult, BilateralAdviceResult } from './types';
import { ClusterMap } from './components/ClusterMap';
import { CountrySelector } from './components/CountrySelector';
import { DimensionRadar } from './components/DimensionRadar';
import { DimensionBar } from './components/DimensionBar';
import { ComparisonTable } from './components/ComparisonTable';
import { AdviceContextSelector } from './components/AdviceContextSelector';
import { AdviceCardList } from './components/AdviceCardList';
import { BilateralNegotiationAdvice } from './components/BilateralNegotiationAdvice';
import { generateAdvice, generateBilateralContextAdvice } from './advice';
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
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [filterCluster, setFilterCluster] = useState<ClusterType | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedContext, setSelectedContext] = useState<AdviceContext | null>(null);

  const isBilateralMode =
    selectedContext !== null && selectedCountries.length >= 2;

  const adviceResult = useMemo<AdviceResult | null>(() => {
    if (selectedCountries.length === 0 || !selectedContext) {
      return null;
    }
    if (isBilateralMode) {
      return null;
    }
    const profile = countryToProfile(selectedCountries[0]);
    return generateAdvice(profile, selectedContext);
  }, [selectedCountries, selectedContext, isBilateralMode]);

  const bilateralAdvice = useMemo<BilateralAdviceResult | null>(() => {
    if (!isBilateralMode || !selectedContext) {
      return null;
    }
    const profileA = countryToProfile(selectedCountries[0]);
    const profileB = countryToProfile(selectedCountries[1]);
    return generateBilateralContextAdvice(profileA, profileB, selectedContext);
  }, [selectedCountries, isBilateralMode, selectedContext]);

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
                  Hofstede Cultural Dimensions
                </h1>
                <p className="text-xs sm:text-sm text-[#5A5A5A] tracking-wide mt-0.5 hidden sm:block">
                  Cross-Cultural Intelligence for Global Business
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              onClick={() => setShowInfo(!showInfo)}
              className="p-3 rounded-lg border border-black/10 hover:border-[#B8956A] hover:bg-[#FAFAF8] transition-all duration-500"
              title="정보"
            >
              <Info className="w-5 h-5 text-[#5A5A5A]" strokeWidth={1.5} />
            </motion.button>
          </div>

          {/* Info panel */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 sm:mt-6 p-4 sm:p-8 bg-[#F5F4F0] rounded-lg border border-black/5 relative">
                  <button
                    onClick={() => setShowInfo(false)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-lg hover:bg-white/50 transition-colors duration-300"
                  >
                    <X className="w-4 h-4 text-[#5A5A5A]" strokeWidth={1.5} />
                  </button>
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-5">
                    <div className="text-2xl sm:text-3xl">📚</div>
                    <div>
                      <h3 className="text-lg font-medium text-[#1A1A1A] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Hofstede 문화 차원 이론
                      </h3>
                      <p className="text-sm text-[#5A5A5A] mb-4 leading-relaxed">
                        Geert Hofstede의 문화 차원 이론은 국가 간 문화적 차이를 6가지 차원으로 분석합니다.
                        이 도구는 Huib Wursten의 "Mental Images" 연구를 기반으로 국가들을 6개의 문화 클러스터로 분류하고,
                        상황별 문화 조언을 제공합니다.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-white rounded-md text-xs font-medium text-[#B8956A] border border-[#B8956A]/20 tracking-wide">
                          PDI: 권력 거리
                        </span>
                        <span className="px-4 py-2 bg-white rounded-md text-xs font-medium text-[#7D8471] border border-[#7D8471]/20 tracking-wide">
                          IDV: 개인주의
                        </span>
                        <span className="px-4 py-2 bg-white rounded-md text-xs font-medium text-[#C4886B] border border-[#C4886B]/20 tracking-wide">
                          UAI: 불확실성 회피
                        </span>
                        <span className="px-4 py-2 bg-white rounded-md text-xs font-medium text-[#6B7B8C] border border-[#6B7B8C]/20 tracking-wide">
                          MAS: 남성성
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
          <motion.aside variants={itemVariants} className="lg:col-span-3 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24 space-y-5 sm:space-y-8">
              <ClusterMap
                selectedCluster={filterCluster}
                onClusterSelect={handleClusterSelect}
              />
            </div>
          </motion.aside>

          {/* Main content area */}
          <div className="lg:col-span-9 space-y-5 sm:space-y-8 order-1 lg:order-2">
            {/* Country selector */}
            <motion.div variants={itemVariants} className="luxury-card rounded-lg p-4 sm:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="accent-bar" />
                <h2 className="text-lg sm:text-xl font-medium text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  국가 선택
                </h2>
                <span className="text-[10px] sm:text-xs text-[#5A5A5A] tracking-wide uppercase ml-1 sm:ml-2">최대 3개</span>
              </div>
              <CountrySelector
                selectedCountries={selectedCountries}
                onCountrySelect={handleCountrySelect}
                onCountryRemove={handleCountryRemove}
                filterCluster={filterCluster}
              />

              {/* Bilateral mode indicator */}
              <AnimatePresence>
                {selectedCountries.length >= 2 && selectedContext && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 p-5 bg-[#F5F4F0] rounded-lg border border-[#B8956A]/20"
                  >
                    <p className="text-sm text-[#9D7E57] flex items-center gap-3">
                      <span className="text-xl">✨</span>
                      <span><strong>양국 간 비교 모드:</strong> 2개 국가가 선택되어 상호 비교 조언이 활성화됩니다.</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Context selector */}
            <motion.div variants={itemVariants}>
              <AdviceContextSelector
                selectedContext={selectedContext}
                onContextSelect={handleContextSelect}
              />
            </motion.div>

            {/* Bilateral advice */}
            <AnimatePresence mode="wait">
              {bilateralAdvice && selectedContext && (
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

            {/* Single country advice */}
            <AnimatePresence mode="wait">
              {adviceResult && (
                <motion.div
                  key="single"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <AdviceCardList advice={adviceResult} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state for advice */}
            <AnimatePresence>
              {selectedCountries.length > 0 && !selectedContext && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="luxury-card rounded-lg p-8"
                >
                  <div className="flex flex-col items-center justify-center py-12 border border-dashed border-black/10 rounded-lg">
                    <span className="text-4xl mb-4">💡</span>
                    <p className="text-[#5A5A5A] text-center leading-relaxed">
                      위에서 상황을 선택하면<br />
                      해당 국가에 맞는 문화 조언이 표시됩니다
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tip for single country */}
            <AnimatePresence>
              {selectedCountries.length === 1 && selectedContext && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="matte-card rounded-lg p-5 border-l-2 border-[#C9A227]"
                >
                  <p className="text-sm text-[#5A5A5A] flex items-center gap-3">
                    <span className="text-xl">💡</span>
                    <span><strong className="text-[#1A1A1A]">팁:</strong> 국가를 하나 더 선택하면 양국 간 비교 조언을 받을 수 있습니다.</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Charts section */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-8">
              {/* Radar chart */}
              <div className="luxury-card rounded-lg p-4 sm:p-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="accent-bar" />
                  <h2 className="text-lg sm:text-xl font-medium text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    레이더 차트
                  </h2>
                </div>
                <DimensionRadar countries={selectedCountries} />
              </div>

              {/* Bar charts */}
              <div className="luxury-card rounded-lg p-4 sm:p-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="accent-bar" />
                  <h2 className="text-lg sm:text-xl font-medium text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    차원별 비교
                  </h2>
                </div>
                {selectedCountries.length > 0 ? (
                  <DimensionBar countries={selectedCountries} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-60 sm:h-80 border border-dashed border-black/10 rounded-lg">
                    <span className="text-3xl sm:text-4xl mb-3">📊</span>
                    <p className="text-[#5A5A5A] text-xs sm:text-sm">국가를 선택하면 막대 그래프가 표시됩니다</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Comparison table */}
            <motion.div variants={itemVariants}>
              <ComparisonTable countries={selectedCountries} />
            </motion.div>
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
                Contact
              </a>
            </div>

            {/* Divider */}
            <div className="divider-gold" />

            {/* Credits */}
            <div className="text-center space-y-3">
              <p className="text-sm text-[#5A5A5A]">
                Based on Hofstede's Cultural Dimensions Theory and Huib Wursten's "Mental Images" research
              </p>
              <p className="text-sm text-[#5A5A5A]">
                Data source:{' '}
                <a
                  href="https://www.hofstede-insights.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-[#9D7E57] hover:text-[#B8956A]"
                >
                  Hofstede Insights
                </a>
              </p>
            </div>

            {/* Copyright */}
            <p className="text-xs text-[#5A5A5A]/60 tracking-wide">
              © 2026 Trinos Research Lab. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
