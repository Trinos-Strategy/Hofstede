import { useState, useMemo } from 'react';
import { Globe2, Info } from 'lucide-react';
import type { Country, ClusterType, AdviceContext, AdviceResult, BilateralAdviceResult } from './types';
import { ClusterMap } from './components/ClusterMap';
import { CountrySelector } from './components/CountrySelector';
import { DimensionRadar } from './components/DimensionRadar';
import { DimensionBar } from './components/DimensionBar';
import { ComparisonTable } from './components/ComparisonTable';
import { AdviceContextSelector } from './components/AdviceContextSelector';
import { AdviceCardList } from './components/AdviceCardList';
import { BilateralNegotiationAdvice } from './components/BilateralNegotiationAdvice';
import { generateAdvice, generateBilateralNegotiationAdvice } from './advice';
import { countryToProfile } from './utils/profileConverter';
import './index.css';

function App() {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [filterCluster, setFilterCluster] = useState<ClusterType | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedContext, setSelectedContext] = useState<AdviceContext | null>(null);

  // 양국 간 협상 모드 감지
  const isBilateralNegotiationMode =
    selectedContext === 'NEGOTIATION' && selectedCountries.length >= 2;

  // 첫 번째 선택된 국가에 대한 조언 생성 (단일 국가 모드)
  const adviceResult = useMemo<AdviceResult | null>(() => {
    if (selectedCountries.length === 0 || !selectedContext) {
      return null;
    }
    // 양국 간 협상 모드에서는 단일 조언 표시 안함
    if (isBilateralNegotiationMode) {
      return null;
    }
    const profile = countryToProfile(selectedCountries[0]);
    return generateAdvice(profile, selectedContext);
  }, [selectedCountries, selectedContext, isBilateralNegotiationMode]);

  // 양국 간 협상 조언 생성
  const bilateralAdvice = useMemo<BilateralAdviceResult | null>(() => {
    if (!isBilateralNegotiationMode) {
      return null;
    }
    const profileA = countryToProfile(selectedCountries[0]);
    const profileB = countryToProfile(selectedCountries[1]);
    return generateBilateralNegotiationAdvice(profileA, profileB);
  }, [selectedCountries, isBilateralNegotiationMode]);

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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Hofstede 문화 차원 비교</h1>
                <p className="text-sm text-gray-500">국가별 문화 특성을 시각적으로 비교하고 조언을 받으세요</p>
              </div>
            </div>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="정보"
            >
              <Info className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Info panel */}
          {showInfo && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100 fade-in">
              <h3 className="font-semibold text-blue-800 mb-2">Hofstede 문화 차원 이론</h3>
              <p className="text-sm text-blue-700 mb-2">
                Geert Hofstede의 문화 차원 이론은 국가 간 문화적 차이를 6가지 차원으로 분석합니다.
                이 도구는 Huib Wursten의 "Mental Images" 연구를 기반으로 국가들을 6개의 문화 클러스터로 분류하고,
                상황별 문화 조언을 제공합니다.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">PDI: 권력 거리</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">IDV: 개인주의</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">UAI: 불확실성 회피</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">MAS: 남성성</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar - Cluster Map */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <ClusterMap
                selectedCluster={filterCluster}
                onClusterSelect={handleClusterSelect}
              />
            </div>
          </aside>

          {/* Main content area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Country selector */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">국가 선택</h2>
              <CountrySelector
                selectedCountries={selectedCountries}
                onCountrySelect={handleCountrySelect}
                onCountryRemove={handleCountryRemove}
                filterCluster={filterCluster}
              />
              {/* 양국 간 협상 모드 안내 */}
              {selectedCountries.length >= 2 && selectedContext === 'NEGOTIATION' && (
                <div className="mt-3 p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                  <p className="text-xs text-indigo-700">
                    <strong>양국 간 협상 모드:</strong> 2개 국가가 선택되어 상호 협상 조언이 활성화됩니다.
                  </p>
                </div>
              )}
            </div>

            {/* Context selector - 상황 선택 */}
            <AdviceContextSelector
              selectedContext={selectedContext}
              onContextSelect={handleContextSelect}
            />

            {/* 양국 간 협상 조언 (2개 국가 + NEGOTIATION 선택 시) */}
            {bilateralAdvice && (
              <BilateralNegotiationAdvice advice={bilateralAdvice} />
            )}

            {/* 단일 국가 조언 표시 */}
            {adviceResult && (
              <div className="fade-in">
                <AdviceCardList advice={adviceResult} />
              </div>
            )}

            {/* Empty state for advice */}
            {selectedCountries.length > 0 && !selectedContext && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm text-center">
                    위에서 상황을 선택하면<br />
                    해당 국가에 맞는 문화 조언이 표시됩니다
                  </p>
                </div>
              </div>
            )}

            {/* 협상 모드에서 1개 국가만 선택 시 안내 */}
            {selectedCountries.length === 1 && selectedContext === 'NEGOTIATION' && (
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
                <p className="text-sm text-amber-800">
                  <strong>팁:</strong> 국가를 하나 더 선택하면 양국 간 협상 조언을 받을 수 있습니다.
                </p>
              </div>
            )}

            {/* Charts section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Radar chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">레이더 차트</h2>
                <DimensionRadar countries={selectedCountries} />
              </div>

              {/* Bar charts */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">차원별 비교</h2>
                {selectedCountries.length > 0 ? (
                  <DimensionBar countries={selectedCountries} />
                ) : (
                  <div className="flex items-center justify-center h-80 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <p className="text-gray-500 text-sm">국가를 선택하면 막대 그래프가 표시됩니다</p>
                  </div>
                )}
              </div>
            </div>

            {/* Comparison table */}
            <ComparisonTable countries={selectedCountries} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              Based on Hofstede's Cultural Dimensions Theory and Huib Wursten's "Mental Images" research
            </p>
            <p className="mt-1">
              Data source:{' '}
              <a
                href="https://www.hofstede-insights.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Hofstede Insights
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
