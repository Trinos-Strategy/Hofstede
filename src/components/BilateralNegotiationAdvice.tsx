/**
 * 양국 간 조언 컴포넌트
 * 두 국가 간의 상황별 유의사항을 시각적으로 표시합니다.
 */

import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeftRight, Lightbulb, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
import type { BilateralAdviceResult, AdviceContext } from '../types';
import { getContextTitle } from '../advice';

interface BilateralNegotiationAdviceProps {
  advice: BilateralAdviceResult;
  context?: AdviceContext;
}

// 컨텍스트별 색상 테마
const contextColors: Record<AdviceContext, { gradient: string; color: string }> = {
  MEETING_IDEA: { gradient: 'from-emerald-500/20 to-teal-500/10', color: '#10b981' },
  DISAGREE_BOSS: { gradient: 'from-orange-500/20 to-amber-500/10', color: '#f97316' },
  REPORTING: { gradient: 'from-cyan-500/20 to-blue-500/10', color: '#06b6d4' },
  REWARD_RECOGNITION: { gradient: 'from-yellow-500/20 to-amber-500/10', color: '#eab308' },
  TEAM_COLLABORATION: { gradient: 'from-violet-500/20 to-purple-500/10', color: '#8b5cf6' },
  NEGOTIATION: { gradient: 'from-indigo-500/20 to-purple-500/10', color: '#6366f1' },
  FEEDBACK: { gradient: 'from-pink-500/20 to-rose-500/10', color: '#ec4899' },
  CONFLICT_RESOLUTION: { gradient: 'from-red-500/20 to-orange-500/10', color: '#ef4444' },
};

export function BilateralNegotiationAdvice({ advice, context = 'NEGOTIATION' }: BilateralNegotiationAdviceProps) {
  const { countryA, countryB, fromAtoB, fromBtoA, mutualUnderstanding } = advice;
  const nameA = countryA.nameKo || countryA.name;
  const nameB = countryB.nameKo || countryB.name;
  const contextInfo = getContextTitle(context);
  const colors = contextColors[context];

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${colors.gradient}`}
        style={{ borderColor: `${colors.color}30` }}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-5 py-2.5 bg-white/10 backdrop-blur rounded-xl border border-white/20"
          >
            <span className="font-bold text-blue-300">{nameA}</span>
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowLeftRight className="w-6 h-6" style={{ color: colors.color }} />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-5 py-2.5 bg-white/10 backdrop-blur rounded-xl border border-white/20"
          >
            <span className="font-bold text-purple-300">{nameB}</span>
          </motion.div>
        </div>
        <h2 className="text-xl font-bold text-center text-white flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" style={{ color: colors.color }} />
          양국 간 {contextInfo.title} 조언
        </h2>
        <p className="text-sm text-center text-gray-400 mt-2">
          {contextInfo.description}
        </p>
      </motion.div>

      {/* 양방향 조언 (2단 레이아웃) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* A → B 조언 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-blue-500/5 px-5 py-4 flex items-center gap-3 border-b border-white/10">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-blue-300 text-sm">
              {fromAtoB.titleKo || fromAtoB.title}
            </h3>
          </div>
          <div className="p-5">
            <ul className="space-y-3">
              {fromAtoB.bullets.map((bullet, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                  className="flex items-start gap-3 text-sm text-gray-300"
                >
                  <span className="mt-1.5 w-2 h-2 bg-blue-400 rounded-full flex-shrink-0 shadow-sm" style={{ boxShadow: '0 0 8px rgba(96, 165, 250, 0.5)' }} />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* B → A 조언 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-500/20 to-purple-500/5 px-5 py-4 flex items-center gap-3 border-b border-white/10">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-purple-300 text-sm">
              {fromBtoA.titleKo || fromBtoA.title}
            </h3>
          </div>
          <div className="p-5">
            <ul className="space-y-3">
              {fromBtoA.bullets.map((bullet, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className="flex items-start gap-3 text-sm text-gray-300"
                >
                  <span className="mt-1.5 w-2 h-2 bg-purple-400 rounded-full flex-shrink-0 shadow-sm" style={{ boxShadow: '0 0 8px rgba(192, 132, 252, 0.5)' }} />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* 상호 이해 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/10 px-5 py-4 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-semibold text-amber-300">{mutualUnderstanding.title}</h3>
        </div>

        <div className="p-5 space-y-4">
          {/* 주요 차이점 */}
          <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <h4 className="font-medium text-red-300">주요 문화적 차이</h4>
            </div>
            <ul className="space-y-2">
              {mutualUnderstanding.keyDifferences.map((diff, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  className="text-sm text-red-200/80 flex items-start gap-2"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
                  <span>{diff}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 공통 기반 */}
          <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <h4 className="font-medium text-green-300">공통 기반</h4>
            </div>
            <ul className="space-y-2">
              {mutualUnderstanding.commonGround.map((common, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                  className="text-sm text-green-200/80 flex items-start gap-2"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />
                  <span>{common}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 중재 전략 */}
          <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
            <h4 className="font-medium text-blue-300 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              성공 전략
            </h4>
            <p className="text-sm text-blue-200/80 leading-relaxed">
              {mutualUnderstanding.bridgingStrategy}
            </p>
          </div>
        </div>
      </motion.div>

      {/* 문화 차원 비교 표 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-5"
      >
        <h4 className="font-medium text-white mb-4 flex items-center gap-2">
          <div className="w-1.5 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          문화 차원 비교
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 font-medium text-gray-400">차원</th>
                <th className="text-center py-3 px-4 font-medium text-blue-400">{nameA}</th>
                <th className="text-center py-3 px-4 font-medium text-gray-500">차이</th>
                <th className="text-center py-3 px-4 font-medium text-purple-400">{nameB}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: 'pdi', label: '권력 거리 (PDI)' },
                { key: 'idv', label: '개인주의 (IDV)' },
                { key: 'uai', label: '불확실성 회피 (UAI)' },
                { key: 'mas', label: '남성성 (MAS)' },
              ].map((dim, idx) => {
                const valueA = countryA.dimensions[dim.key as keyof typeof countryA.dimensions];
                const valueB = countryB.dimensions[dim.key as keyof typeof countryB.dimensions];
                if (valueA === undefined || valueB === undefined) return null;
                const diff = Math.abs((valueA as number) - (valueB as number));
                const isHighDiff = diff >= 30;

                return (
                  <motion.tr
                    key={dim.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="py-3 px-4 text-gray-300">{dim.label}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 font-medium">
                        {valueA}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-lg ${isHighDiff ? 'bg-red-500/20 text-red-300' : 'bg-white/10 text-gray-400'}`}>
                        {diff}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 font-medium">
                        {valueB}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

export default BilateralNegotiationAdvice;
