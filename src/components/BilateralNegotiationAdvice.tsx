/**
 * 양국 간 조언 컴포넌트
 * 두 국가 간의 상황별 유의사항을 시각적으로 표시합니다.
 */

import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeftRight } from 'lucide-react';
import type { BilateralAdviceResult, AdviceContext } from '../types';
import { getContextTitle } from '../advice';

interface BilateralNegotiationAdviceProps {
  advice: BilateralAdviceResult;
  context?: AdviceContext;
}

// 컨텍스트별 색상 테마 - 럭셔리 팔레트
const contextColors: Record<AdviceContext, { color: string; emoji: string }> = {
  MEETING_IDEA: { color: '#B8956A', emoji: '💡' },
  DISAGREE_BOSS: { color: '#C4886B', emoji: '🗣️' },
  REPORTING: { color: '#7D8471', emoji: '📋' },
  REWARD_RECOGNITION: { color: '#C9A227', emoji: '🏆' },
  TEAM_COLLABORATION: { color: '#8B7355', emoji: '🤝' },
  NEGOTIATION: { color: '#9D7E57', emoji: '🎯' },
  FEEDBACK: { color: '#6B7B8C', emoji: '💬' },
  CONFLICT_RESOLUTION: { color: '#722F37', emoji: '⚖️' },
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
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="luxury-card rounded-lg p-8"
      >
        <div className="flex items-center justify-center gap-5 mb-5">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
            className="px-6 py-3 bg-[#F5F4F0] rounded-lg border border-black/6"
          >
            <span
              className="font-medium tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif", color: '#B8956A' }}
            >
              {nameA}
            </span>
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowLeftRight className="w-6 h-6" style={{ color: colors.color }} strokeWidth={1.5} />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
            className="px-6 py-3 bg-[#F5F4F0] rounded-lg border border-black/6"
          >
            <span
              className="font-medium tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif", color: '#7D8471' }}
            >
              {nameB}
            </span>
          </motion.div>
        </div>
        <h2
          className="text-xl font-medium text-center text-[#1A1A1A] flex items-center justify-center gap-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-2xl">{colors.emoji}</span>
          양국 간 {contextInfo.title} 조언
        </h2>
        <p className="text-sm text-center text-[#5A5A5A] mt-3 leading-relaxed">
          {contextInfo.description}
        </p>
      </motion.div>

      {/* 양방향 조언 (2단 레이아웃) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* A → B 조언 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="luxury-card rounded-lg overflow-hidden"
        >
          <div className="px-6 py-5 flex items-center gap-4 border-b border-black/5 bg-[#F5F4F0]">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#B8956A' }}
            >
              <ArrowRight className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <h3
              className="font-medium text-sm tracking-wide"
              style={{ color: '#9D7E57', fontFamily: "'Playfair Display', serif" }}
            >
              {fromAtoB.titleKo || fromAtoB.title}
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {fromAtoB.bullets.map((bullet, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2 + idx * 0.05,
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="flex items-start gap-4 text-sm text-[#5A5A5A] leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 bg-[#B8956A] rounded-full flex-shrink-0" />
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
          transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="luxury-card rounded-lg overflow-hidden"
        >
          <div className="px-6 py-5 flex items-center gap-4 border-b border-black/5 bg-[#F5F4F0]">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#7D8471' }}
            >
              <ArrowRight className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <h3
              className="font-medium text-sm tracking-wide"
              style={{ color: '#7D8471', fontFamily: "'Playfair Display', serif" }}
            >
              {fromBtoA.titleKo || fromBtoA.title}
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {fromBtoA.bullets.map((bullet, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.3 + idx * 0.05,
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="flex items-start gap-4 text-sm text-[#5A5A5A] leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 bg-[#7D8471] rounded-full flex-shrink-0" />
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
        transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="luxury-card rounded-lg overflow-hidden"
      >
        <div className="px-6 py-5 flex items-center gap-4 border-b border-black/5 bg-[#F5F4F0]">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#C9A227' }}
          >
            <span className="text-lg">💡</span>
          </div>
          <h3
            className="font-medium"
            style={{ color: '#9D7E57', fontFamily: "'Playfair Display', serif" }}
          >
            {mutualUnderstanding.title}
          </h3>
        </div>

        <div className="p-6 space-y-5">
          {/* 주요 차이점 */}
          <div className="p-5 rounded-lg bg-[#722F37]/5 border border-[#722F37]/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-lg">⚠️</span>
              <h4
                className="font-medium text-[#722F37] text-sm"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                주요 문화적 차이
              </h4>
            </div>
            <ul className="space-y-3">
              {mutualUnderstanding.keyDifferences.map((diff, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.4 + idx * 0.05,
                    duration: 0.4
                  }}
                  className="text-sm text-[#722F37]/80 flex items-start gap-3 leading-relaxed"
                >
                  <span className="mt-2 w-1 h-1 bg-[#722F37]/60 rounded-full flex-shrink-0" />
                  <span>{diff}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 공통 기반 */}
          <div className="p-5 rounded-lg bg-[#7D8471]/5 border border-[#7D8471]/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-lg">✓</span>
              <h4
                className="font-medium text-[#7D8471] text-sm"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                공통 기반
              </h4>
            </div>
            <ul className="space-y-3">
              {mutualUnderstanding.commonGround.map((common, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.5 + idx * 0.05,
                    duration: 0.4
                  }}
                  className="text-sm text-[#7D8471]/80 flex items-start gap-3 leading-relaxed"
                >
                  <span className="mt-2 w-1 h-1 bg-[#7D8471]/60 rounded-full flex-shrink-0" />
                  <span>{common}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 중재 전략 */}
          <div className="p-5 rounded-lg bg-[#B8956A]/5 border border-[#B8956A]/10">
            <h4
              className="font-medium text-[#9D7E57] mb-3 flex items-center gap-3 text-sm"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-lg">✨</span>
              성공 전략
            </h4>
            <p className="text-sm text-[#5A5A5A] leading-relaxed">
              {mutualUnderstanding.bridgingStrategy}
            </p>
          </div>
        </div>
      </motion.div>

      {/* 문화 차원 비교 표 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="luxury-card rounded-lg p-6"
      >
        <h4
          className="font-medium text-[#1A1A1A] mb-5 flex items-center gap-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <div className="accent-bar" />
          문화 차원 비교
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm modern-table">
            <thead>
              <tr className="border-b border-black/8">
                <th className="text-left py-4 px-5 font-medium text-[#5A5A5A] tracking-wide">차원</th>
                <th className="text-center py-4 px-5 font-medium" style={{ color: '#B8956A' }}>{nameA}</th>
                <th className="text-center py-4 px-5 font-medium text-[#5A5A5A]/50">차이</th>
                <th className="text-center py-4 px-5 font-medium" style={{ color: '#7D8471' }}>{nameB}</th>
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
                    transition={{
                      delay: 0.5 + idx * 0.05,
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="border-b border-black/5 hover:bg-[#F5F4F0] transition-colors duration-300"
                  >
                    <td className="py-4 px-5 text-[#5A5A5A]">{dim.label}</td>
                    <td className="py-4 px-5 text-center">
                      <span className="px-4 py-2 rounded-md bg-[#B8956A]/10 text-[#9D7E57] font-medium">
                        {valueA}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className={`px-3 py-1.5 rounded-md ${isHighDiff ? 'bg-[#722F37]/10 text-[#722F37]' : 'bg-[#F5F4F0] text-[#5A5A5A]/50'}`}>
                        {diff}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className="px-4 py-2 rounded-md bg-[#7D8471]/10 text-[#7D8471] font-medium">
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
