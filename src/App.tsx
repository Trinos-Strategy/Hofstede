import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2, Info, Sparkles, X } from 'lucide-react';
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
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
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
        transition={{ duration: 0.5 }}
        className="glass-card sticky top-0 z-40 border-t-0 border-x-0 rounded-none"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg glow-purple"
              >
                <Globe2 className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  Hofstede 문화 차원 비교
                </h1>
                <p className="text-sm text-gray-400">
                  국가별 문화 특성을 시각적으로 비교하고 조언을 받으세요
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInfo(!showInfo)}
              className="p-3 rounded-xl glass-card hover:glow-blue transition-all"
              title="정보"
            >
              <Info className="w-5 h-5 text-gray-300" />
            </motion.button>
          </div>

          {/* Info panel */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-5 glass-card rounded-xl border-purple-500/30 relative">
                  <button
                    onClick={() => setShowInfo(false)}
                    className="absolute top-3 right-3 p-1 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-300 mb-2">Hofstede 문화 차원 이론</h3>
                      <p className="text-sm text-gray-400 mb-3 leading-relaxed">
                        Geert Hofstede의 문화 차원 이론은 국가 간 문화적 차이를 6가지 차원으로 분석합니다.
                        이 도구는 Huib Wursten의 "Mental Images" 연구를 기반으로 국가들을 6개의 문화 클러스터로 분류하고,
                        상황별 문화 조언을 제공합니다.
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-3 py-1.5 bg-orange-500/20 text-orange-300 rounded-lg">PDI: 권력 거리</span>
                        <span className="px-3 py-1.5 bg-cyan-500/20 text-cyan-300 rounded-lg">IDV: 개인주의</span>
                        <span className="px-3 py-1.5 bg-pink-500/20 text-pink-300 rounded-lg">UAI: 불확실성 회피</span>
                        <span className="px-3 py-1.5 bg-green-500/20 text-green-300 rounded-lg">MAS: 남성성</span>
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
      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Left sidebar - Cluster Map */}
          <motion.aside variants={itemVariants} className="lg:col-span-3">
            <div className="sticky top-28 space-y-6">
              <ClusterMap
                selectedCluster={filterCluster}
                onClusterSelect={handleClusterSelect}
              />
            </div>
          </motion.aside>

          {/* Main content area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Country selector */}
            <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                <h2 className="text-lg font-bold text-white">국가 선택</h2>
                <span className="text-xs text-gray-500 ml-2">최대 3개</span>
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
                    className="mt-4 p-3 bg-indigo-500/20 rounded-xl border border-indigo-500/30"
                  >
                    <p className="text-xs text-indigo-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
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
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex flex-col items-center justify-center h-32 bg-white/5 rounded-xl border border-dashed border-white/20">
                    <Sparkles className="w-8 h-8 text-gray-500 mb-2" />
                    <p className="text-gray-400 text-sm text-center">
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
                  className="glass-card rounded-2xl p-4 border-amber-500/30"
                >
                  <p className="text-sm text-amber-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span><strong>팁:</strong> 국가를 하나 더 선택하면 양국 간 비교 조언을 받을 수 있습니다.</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Charts section */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Radar chart */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
                  <h2 className="text-lg font-bold text-white">레이더 차트</h2>
                </div>
                <DimensionRadar countries={selectedCountries} />
              </div>

              {/* Bar charts */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
                  <h2 className="text-lg font-bold text-white">차원별 비교</h2>
                </div>
                {selectedCountries.length > 0 ? (
                  <DimensionBar countries={selectedCountries} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-80 bg-white/5 rounded-xl border border-dashed border-white/20">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mb-3">
                      <Globe2 className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-gray-400 text-sm">국가를 선택하면 막대 그래프가 표시됩니다</p>
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
      <footer className="mt-12 border-t border-white/10" style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col items-center gap-6">
            {/* Logo and Contact */}
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-lg font-bold gradient-text">Trinos Research Lab</h3>
              <a
                href="https://mediator.trinos.group/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 hover:text-purple-200 transition-all text-sm font-medium border border-purple-500/30"
              >
                Contact
              </a>
            </div>

            {/* Divider */}
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Credits */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-400">
                Based on Hofstede's Cultural Dimensions Theory and Huib Wursten's "Mental Images" research
              </p>
              <p className="text-sm text-gray-500">
                Data source:{' '}
                <a
                  href="https://www.hofstede-insights.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2"
                >
                  Hofstede Insights
                </a>
              </p>
            </div>

            {/* Copyright */}
            <p className="text-xs text-gray-600">
              © 2024 Trinos Research Lab. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
