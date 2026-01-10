/**
 * 양국 간 조언 컴포넌트
 * 두 국가 간의 상황별 유의사항을 시각적으로 표시합니다.
 */

import { ArrowRight, ArrowLeftRight, Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { BilateralAdviceResult, AdviceContext } from '../types';
import { getContextTitle } from '../advice';

interface BilateralNegotiationAdviceProps {
  advice: BilateralAdviceResult;
  context?: AdviceContext;
}

// 컨텍스트별 색상 테마
const contextColors: Record<AdviceContext, { gradient: string; headerBorder: string }> = {
  MEETING_IDEA: { gradient: 'from-emerald-50 to-teal-50', headerBorder: 'border-emerald-100' },
  DISAGREE_BOSS: { gradient: 'from-orange-50 to-amber-50', headerBorder: 'border-orange-100' },
  REPORTING: { gradient: 'from-cyan-50 to-blue-50', headerBorder: 'border-cyan-100' },
  REWARD_RECOGNITION: { gradient: 'from-yellow-50 to-amber-50', headerBorder: 'border-yellow-100' },
  TEAM_COLLABORATION: { gradient: 'from-violet-50 to-purple-50', headerBorder: 'border-violet-100' },
  NEGOTIATION: { gradient: 'from-indigo-50 to-purple-50', headerBorder: 'border-indigo-100' },
  FEEDBACK: { gradient: 'from-pink-50 to-rose-50', headerBorder: 'border-pink-100' },
  CONFLICT_RESOLUTION: { gradient: 'from-red-50 to-orange-50', headerBorder: 'border-red-100' },
};

export function BilateralNegotiationAdvice({ advice, context = 'NEGOTIATION' }: BilateralNegotiationAdviceProps) {
  const { countryA, countryB, fromAtoB, fromBtoA, mutualUnderstanding } = advice;
  const nameA = countryA.nameKo || countryA.name;
  const nameB = countryB.nameKo || countryB.name;
  const contextInfo = getContextTitle(context);
  const colors = contextColors[context];

  return (
    <div className="space-y-6 fade-in">
      {/* 헤더 */}
      <div className={`bg-gradient-to-r ${colors.gradient} rounded-xl border ${colors.headerBorder} p-6`}>
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-indigo-200">
            <span className="font-bold text-indigo-700">{nameA}</span>
          </div>
          <ArrowLeftRight className="w-6 h-6 text-indigo-400" />
          <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-purple-200">
            <span className="font-bold text-purple-700">{nameB}</span>
          </div>
        </div>
        <h2 className="text-lg font-bold text-center text-gray-800">
          양국 간 {contextInfo.title} 조언
        </h2>
        <p className="text-sm text-center text-gray-600 mt-1">
          {contextInfo.description}
        </p>
      </div>

      {/* 양방향 조언 (2단 레이아웃) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* A → B 조언 */}
        <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
          <div className="bg-blue-50 px-4 py-3 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-blue-800 text-sm">
              {fromAtoB.titleKo || fromAtoB.title}
            </h3>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {fromAtoB.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* B → A 조언 */}
        <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
          <div className="bg-purple-50 px-4 py-3 flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-purple-800 text-sm">
              {fromBtoA.titleKo || fromBtoA.title}
            </h3>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {fromBtoA.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 상호 이해 섹션 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3 flex items-center gap-2 border-b border-amber-100">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-amber-800">{mutualUnderstanding.title}</h3>
        </div>

        <div className="p-4 space-y-4">
          {/* 주요 차이점 */}
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <h4 className="font-medium text-red-800">주요 문화적 차이</h4>
            </div>
            <ul className="space-y-1">
              {mutualUnderstanding.keyDifferences.map((diff, idx) => (
                <li key={idx} className="text-sm text-red-700 flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 bg-red-400 rounded-full flex-shrink-0" />
                  <span>{diff}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 공통 기반 */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <h4 className="font-medium text-green-800">공통 기반</h4>
            </div>
            <ul className="space-y-1">
              {mutualUnderstanding.commonGround.map((common, idx) => (
                <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 bg-green-400 rounded-full flex-shrink-0" />
                  <span>{common}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 중재 전략 */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-2">성공 전략</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              {mutualUnderstanding.bridgingStrategy}
            </p>
          </div>
        </div>
      </div>

      {/* 문화 차원 비교 표 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h4 className="font-medium text-gray-800 mb-3">문화 차원 비교</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-medium text-gray-600">차원</th>
                <th className="text-center py-2 px-3 font-medium text-blue-600">{nameA}</th>
                <th className="text-center py-2 px-3 font-medium text-gray-400">차이</th>
                <th className="text-center py-2 px-3 font-medium text-purple-600">{nameB}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 text-gray-700">권력 거리 (PDI)</td>
                <td className="py-2 px-3 text-center font-medium text-blue-700">
                  {countryA.dimensions.pdi}
                </td>
                <td className="py-2 px-3 text-center text-gray-500">
                  {Math.abs(countryA.dimensions.pdi - countryB.dimensions.pdi)}
                </td>
                <td className="py-2 px-3 text-center font-medium text-purple-700">
                  {countryB.dimensions.pdi}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 text-gray-700">개인주의 (IDV)</td>
                <td className="py-2 px-3 text-center font-medium text-blue-700">
                  {countryA.dimensions.idv}
                </td>
                <td className="py-2 px-3 text-center text-gray-500">
                  {Math.abs(countryA.dimensions.idv - countryB.dimensions.idv)}
                </td>
                <td className="py-2 px-3 text-center font-medium text-purple-700">
                  {countryB.dimensions.idv}
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 text-gray-700">불확실성 회피 (UAI)</td>
                <td className="py-2 px-3 text-center font-medium text-blue-700">
                  {countryA.dimensions.uai}
                </td>
                <td className="py-2 px-3 text-center text-gray-500">
                  {Math.abs(countryA.dimensions.uai - countryB.dimensions.uai)}
                </td>
                <td className="py-2 px-3 text-center font-medium text-purple-700">
                  {countryB.dimensions.uai}
                </td>
              </tr>
              {countryA.dimensions.mas !== undefined && countryB.dimensions.mas !== undefined && (
                <tr>
                  <td className="py-2 px-3 text-gray-700">남성성 (MAS)</td>
                  <td className="py-2 px-3 text-center font-medium text-blue-700">
                    {countryA.dimensions.mas}
                  </td>
                  <td className="py-2 px-3 text-center text-gray-500">
                    {Math.abs(countryA.dimensions.mas - countryB.dimensions.mas)}
                  </td>
                  <td className="py-2 px-3 text-center font-medium text-purple-700">
                    {countryB.dimensions.mas}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BilateralNegotiationAdvice;
