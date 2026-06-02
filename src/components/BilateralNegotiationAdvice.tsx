/**
 * 양국 간 조언 컴포넌트
 * 두 국가 간의 상황별 유의사항을 시각적으로 표시합니다.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeftRight, Check, X, ChevronDown, BookOpen, AlertTriangle, Lightbulb } from 'lucide-react';
import type { BilateralAdviceResult, AdviceContext } from '../types';
import { useLanguage } from '../i18n';
import type { TranslationKeys } from '../i18n/translations';
import {
  getDetailedNegotiationAdvice,
  hasDetailedAdvice,
  academicReferences,
  type DetailedNegotiationAdvice,
  type KeyStrategy,
} from '../data/negotiationAdvice';

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

const contextTranslationKeys: Record<AdviceContext, keyof TranslationKeys> = {
  MEETING_IDEA: 'contextMeetingIdea',
  DISAGREE_BOSS: 'contextDisagreeBoss',
  REPORTING: 'contextReporting',
  REWARD_RECOGNITION: 'contextRewardRecognition',
  TEAM_COLLABORATION: 'contextTeamCollaboration',
  NEGOTIATION: 'contextNegotiation',
  FEEDBACK: 'contextFeedback',
  CONFLICT_RESOLUTION: 'contextConflictResolution',
};

// 전략 카드 컴포넌트
function StrategyCard({ strategy, index, accentColor }: { strategy: KeyStrategy; index: number; accentColor: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="luxury-card rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-[#F5F4F0] transition-colors duration-300 min-h-[56px]"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-xl sm:text-2xl">{strategy.icon}</span>
          <div className="text-left">
            <h4
              className="font-medium text-sm sm:text-base text-[#1A1A1A]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {strategy.titleKo}
            </h4>
            <p className="text-[10px] sm:text-xs text-[#666666] mt-0.5">{strategy.title}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center"
        >
          <ChevronDown className="w-5 h-5 text-[#444444]" strokeWidth={1.5} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-black/5">
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed mt-3 sm:mt-4 mb-3 sm:mb-4 pl-9 sm:pl-12">
                {strategy.description}
              </p>
              <ul className="space-y-2.5 sm:space-y-3 pl-9 sm:pl-12">
                {strategy.details.map((detail, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#555555] leading-relaxed"
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Do's and Don'ts 섹션 컴포넌트
function DosDontsSection({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
      {/* Do's */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="luxury-card rounded-lg overflow-hidden"
      >
        <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sm:gap-4 border-b border-black/5 bg-[#4A5A3E]/10">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-[#4A5A3E]">
            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2} />
          </div>
          <h3
            className="font-medium text-sm sm:text-base"
            style={{ color: '#3D4D32', fontFamily: "'Playfair Display', serif" }}
          >
            Do's (권장 사항)
          </h3>
        </div>
        <div className="p-4 sm:p-6">
          <ul className="space-y-3 sm:space-y-4">
            {dos.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.05, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-start gap-3 sm:gap-4 text-xs sm:text-sm text-[#444444] leading-relaxed"
              >
                <span className="mt-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#4A5A3E]/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#4A5A3E]" strokeWidth={2.5} />
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Don'ts */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="luxury-card rounded-lg overflow-hidden"
      >
        <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sm:gap-4 border-b border-black/5 bg-[#722F37]/10">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-[#722F37]">
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2} />
          </div>
          <h3
            className="font-medium text-sm sm:text-base"
            style={{ color: '#722F37', fontFamily: "'Playfair Display', serif" }}
          >
            Don'ts (금지 사항)
          </h3>
        </div>
        <div className="p-4 sm:p-6">
          <ul className="space-y-3 sm:space-y-4">
            {donts.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.05, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-start gap-3 sm:gap-4 text-xs sm:text-sm text-[#444444] leading-relaxed"
              >
                <span className="mt-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#722F37]/15 flex items-center justify-center flex-shrink-0">
                  <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#722F37]" strokeWidth={2.5} />
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

// 상세 협상 조언 컴포넌트
function DetailedAdviceSection({
  advice,
  accentColor,
  direction,
}: {
  advice: DetailedNegotiationAdvice;
  accentColor: string;
  direction: 'AtoB' | 'BtoA';
}) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: direction === 'AtoB' ? 0.1 : 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="space-y-4 sm:space-y-6"
    >
      {/* 문화적 맥락 */}
      <div className="luxury-card rounded-lg p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Lightbulb className="w-5 h-5 text-[#C9A227]" strokeWidth={1.5} />
          <h4
            className="font-medium text-sm sm:text-base text-[#1A1A1A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('culturalBackground')}
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">{advice.culturalContext}</p>
      </div>

      {/* 문화적 차이 테이블 */}
      <div className="luxury-card rounded-lg p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <AlertTriangle className="w-5 h-5 text-[#C4886B]" strokeWidth={1.5} />
          <h4
            className="font-medium text-sm sm:text-base text-[#1A1A1A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('keyCulturalDifferences')}
          </h4>
        </div>
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[400px] sm:min-w-0">
            <thead>
              <tr className="border-b border-black/10">
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-[#666666]">{t('dimension')}</th>
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium" style={{ color: accentColor }}>
                  {advice.fromCountryCode === 'USA' ? t('countryUSA') : t('countryKOR')}
                </th>
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-[#7D8471]">
                  {advice.toCountryCode === 'KOR' ? t('countryKOR') : t('countryUSA')}
                </th>
              </tr>
            </thead>
            <tbody>
              {advice.culturalDifferences.map((diff, idx) => (
                <tr key={idx} className="border-b border-black/5">
                  <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs font-medium text-[#444444]">{diff.dimension}</td>
                  <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs text-[#555555]">{diff.countryA}</td>
                  <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-[10px] sm:text-xs text-[#555555]">{diff.countryB}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 핵심 전략 */}
      <div>
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-1">
          <div className="accent-bar" />
          <h4
            className="font-medium text-sm sm:text-base text-[#1A1A1A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('keyStrategies')}
          </h4>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {advice.keyStrategies.map((strategy, idx) => (
            <StrategyCard key={idx} strategy={strategy} index={idx} accentColor={accentColor} />
          ))}
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div>
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-1">
          <div className="accent-bar" />
          <h4
            className="font-medium text-sm sm:text-base text-[#1A1A1A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('dosAndDonts')}
          </h4>
        </div>
        <DosDontsSection dos={advice.dosDonts.dos} donts={advice.dosDonts.donts} />
      </div>
    </motion.div>
  );
}

export function BilateralNegotiationAdvice({ advice, context = 'NEGOTIATION' }: BilateralNegotiationAdviceProps) {
  const { t, isKorean } = useLanguage();
  const { countryA, countryB, fromAtoB, fromBtoA, mutualUnderstanding } = advice;
  const nameA = isKorean ? countryA.nameKo || countryA.name : countryA.name;
  const nameB = isKorean ? countryB.nameKo || countryB.name : countryB.name;
  const colors = contextColors[context];
  const contextKey = contextTranslationKeys[context];

  // 상세 협상 조언 확인
  const detailedAtoBAdvice = getDetailedNegotiationAdvice(countryA.code, countryB.code);
  const detailedBtoAAdvice = getDetailedNegotiationAdvice(countryB.code, countryA.code);
  const hasDetailed = hasDetailedAdvice(countryA.code, countryB.code);

  // 탭 상태 (상세 조언이 있을 경우)
  const [activeTab, setActiveTab] = useState<'AtoB' | 'BtoA'>('AtoB');

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="luxury-card rounded-lg p-4 sm:p-8"
      >
        <div className="flex items-center justify-center gap-3 sm:gap-5 mb-4 sm:mb-5">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-[#F5F4F0] rounded-lg border border-black/6"
          >
            <span
              className="font-medium tracking-wide text-sm sm:text-base"
              style={{ fontFamily: "'Playfair Display', serif", color: '#B8956A' }}
            >
              {nameA}
            </span>
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowLeftRight className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.color }} strokeWidth={1.5} />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-[#F5F4F0] rounded-lg border border-black/6"
          >
            <span
              className="font-medium tracking-wide text-sm sm:text-base"
              style={{ fontFamily: "'Playfair Display', serif", color: '#7D8471' }}
            >
              {nameB}
            </span>
          </motion.div>
        </div>
        <h2
          className="text-lg sm:text-xl font-medium text-center text-[#1A1A1A] flex items-center justify-center gap-2 sm:gap-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-xl sm:text-2xl">{colors.emoji}</span>
          {t('bilateralAdviceFor', { context: t(contextKey) })}
        </h2>
        <p className="text-xs sm:text-sm text-center text-[#444444] mt-2 sm:mt-3 leading-relaxed">
          {t('selectSituationAbove')}
        </p>

        {/* 프레임워크 안내 - Option C */}
        <div className="mt-4 sm:mt-5 p-3 sm:p-4 rounded-lg bg-[#F5F4F0] border border-black/5">
          <p className="text-[10px] sm:text-xs text-[#666666] leading-relaxed text-center">
            <span className="font-medium text-[#9D7E57]">{t('analysisFrameworkLabel')}</span>{' '}
            {t('analysisFrameworkDescription')}
          </p>
        </div>
      </motion.div>

      {/* 상세 협상 조언이 있는 경우 */}
      {hasDetailed && context === 'NEGOTIATION' && (detailedAtoBAdvice || detailedBtoAAdvice) ? (
        <>
          {/* 방향 탭 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex gap-2 sm:gap-3"
          >
            {detailedAtoBAdvice && (
              <button
                onClick={() => setActiveTab('AtoB')}
                className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2 ${
                  activeTab === 'AtoB'
                    ? 'bg-[#B8956A] text-white shadow-md'
                    : 'bg-[#F5F4F0] text-[#444444] hover:bg-[#EDECE8]'
                }`}
              >
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                {nameA} → {nameB}
              </button>
            )}
            {detailedBtoAAdvice && (
              <button
                onClick={() => setActiveTab('BtoA')}
                className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2 ${
                  activeTab === 'BtoA'
                    ? 'bg-[#7D8471] text-white shadow-md'
                    : 'bg-[#F5F4F0] text-[#444444] hover:bg-[#EDECE8]'
                }`}
              >
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                {nameB} → {nameA}
              </button>
            )}
          </motion.div>

          {/* 상세 조언 콘텐츠 */}
          <AnimatePresence mode="wait">
            {activeTab === 'AtoB' && detailedAtoBAdvice && (
              <motion.div
                key="AtoB"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <DetailedAdviceSection advice={detailedAtoBAdvice} accentColor="#B8956A" direction="AtoB" />
              </motion.div>
            )}
            {activeTab === 'BtoA' && detailedBtoAAdvice && (
              <motion.div
                key="BtoA"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <DetailedAdviceSection advice={detailedBtoAAdvice} accentColor="#7D8471" direction="BtoA" />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        /* 기본 양방향 조언 (기존 코드) */
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {/* A → B 조언 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="luxury-card rounded-lg overflow-hidden"
            >
              <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sm:gap-4 border-b border-black/5 bg-[#F5F4F0]">
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#B8956A' }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={1.5} />
                </div>
                <h3
                  className="font-medium text-xs sm:text-sm tracking-wide"
                  style={{ color: '#9D7E57', fontFamily: "'Playfair Display', serif" }}
                >
                  {fromAtoB.titleKo || fromAtoB.title}
                </h3>
              </div>
              <div className="p-4 sm:p-6">
                <ul className="space-y-3 sm:space-y-4">
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
                      className="flex items-start gap-3 sm:gap-4 text-xs sm:text-sm text-[#444444] leading-relaxed"
                    >
                      <span className="mt-1.5 sm:mt-2 w-1.5 h-1.5 bg-[#B8956A] rounded-full flex-shrink-0" />
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
              <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sm:gap-4 border-b border-black/5 bg-[#F5F4F0]">
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#7D8471' }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={1.5} />
                </div>
                <h3
                  className="font-medium text-xs sm:text-sm tracking-wide"
                  style={{ color: '#7D8471', fontFamily: "'Playfair Display', serif" }}
                >
                  {fromBtoA.titleKo || fromBtoA.title}
                </h3>
              </div>
              <div className="p-4 sm:p-6">
                <ul className="space-y-3 sm:space-y-4">
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
                      className="flex items-start gap-3 sm:gap-4 text-xs sm:text-sm text-[#444444] leading-relaxed"
                    >
                      <span className="mt-1.5 sm:mt-2 w-1.5 h-1.5 bg-[#7D8471] rounded-full flex-shrink-0" />
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </>
      )}

      {/* 상호 이해 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="luxury-card rounded-lg overflow-hidden"
      >
        <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sm:gap-4 border-b border-black/5 bg-[#F5F4F0]">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#C9A227' }}
          >
            <span className="text-base sm:text-lg">💡</span>
          </div>
          <h3
            className="font-medium text-sm sm:text-base"
            style={{ color: '#9D7E57', fontFamily: "'Playfair Display', serif" }}
          >
            {t('mutualUnderstandingTitle', { context: t(contextKey) })}
          </h3>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* 주요 차이점 */}
          <div className="p-4 sm:p-5 rounded-lg bg-[#722F37]/5 border border-[#722F37]/10">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="text-base sm:text-lg">⚠️</span>
              <h4
                className="font-medium text-[#722F37] text-xs sm:text-sm"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t('keyCulturalDifferences')}
              </h4>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              {mutualUnderstanding.keyDifferences.map((diff, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.4 + idx * 0.05,
                    duration: 0.4
                  }}
                  className="text-xs sm:text-sm text-[#722F37]/80 flex items-start gap-2 sm:gap-3 leading-relaxed"
                >
                  <span className="mt-1.5 sm:mt-2 w-1 h-1 bg-[#722F37]/60 rounded-full flex-shrink-0" />
                  <span>{diff}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 공통 기반 */}
          <div className="p-4 sm:p-5 rounded-lg bg-[#7D8471]/5 border border-[#7D8471]/10">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="text-base sm:text-lg">✓</span>
              <h4
                className="font-medium text-[#7D8471] text-xs sm:text-sm"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t('commonGround')}
              </h4>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              {mutualUnderstanding.commonGround.map((common, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.5 + idx * 0.05,
                    duration: 0.4
                  }}
                  className="text-xs sm:text-sm text-[#7D8471]/80 flex items-start gap-2 sm:gap-3 leading-relaxed"
                >
                  <span className="mt-1.5 sm:mt-2 w-1 h-1 bg-[#7D8471]/60 rounded-full flex-shrink-0" />
                  <span>{common}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 가교 전략 (Bridging Strategy) */}
          <div className="p-4 sm:p-5 rounded-lg bg-[#B8956A]/5 border border-[#B8956A]/10">
            <h4
              className="font-medium text-[#9D7E57] mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-base sm:text-lg">✨</span>
              {t('successStrategy')}
            </h4>
            <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
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
        className="luxury-card rounded-lg p-4 sm:p-6"
      >
        <h4
          className="font-medium text-[#1A1A1A] mb-4 sm:mb-5 flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <div className="accent-bar" />
          {t('culturalDimensionComparison')}
        </h4>
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-xs sm:text-sm modern-table min-w-[400px] sm:min-w-0">
            <thead>
              <tr className="border-b border-black/8">
                <th className="text-left py-3 sm:py-4 px-3 sm:px-5 font-medium text-[#444444] tracking-wide">{t('dimension')}</th>
                <th className="text-center py-3 sm:py-4 px-2 sm:px-5 font-medium" style={{ color: '#B8956A' }}>{nameA}</th>
                <th className="text-center py-3 sm:py-4 px-2 sm:px-5 font-medium text-[#444444]/50">{t('difference')}</th>
                <th className="text-center py-3 sm:py-4 px-2 sm:px-5 font-medium" style={{ color: '#7D8471' }}>{nameB}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: 'pdi', labelKey: 'dimensionPDI' },
                { key: 'idv', labelKey: 'dimensionIDV' },
                { key: 'uai', labelKey: 'dimensionUAI' },
                { key: 'mas', labelKey: 'dimensionMAS' },
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
                    <td className="py-3 sm:py-4 px-3 sm:px-5 text-[#444444] text-[10px] sm:text-sm">{t(dim.labelKey as keyof TranslationKeys)} ({dim.key.toUpperCase()})</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-5 text-center">
                      <span className="px-2 sm:px-4 py-1 sm:py-2 rounded-md bg-[#B8956A]/10 text-[#9D7E57] font-medium">
                        {valueA}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-5 text-center">
                      <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md ${isHighDiff ? 'bg-[#722F37]/10 text-[#722F37]' : 'bg-[#F5F4F0] text-[#444444]/50'}`}>
                        {diff}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-5 text-center">
                      <span className="px-2 sm:px-4 py-1 sm:py-2 rounded-md bg-[#7D8471]/10 text-[#7D8471] font-medium">
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

      {/* 학술 참고문헌 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="luxury-card rounded-lg p-4 sm:p-6"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7B8C]" strokeWidth={1.5} />
          <h4
            className="font-medium text-xs sm:text-sm text-[#6B7B8C]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('academicReferences')}
          </h4>
        </div>
        <p className="text-[10px] sm:text-xs text-[#666666] leading-relaxed mb-3 sm:mb-4 italic">
          {academicReferences.shortDescription}
        </p>
        <div className="space-y-1.5 sm:space-y-2">
          {academicReferences.sources.map((source, idx) => (
            <p key={idx} className="text-[9px] sm:text-[10px] text-[#888888] leading-relaxed">
              • {source}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default BilateralNegotiationAdvice;
