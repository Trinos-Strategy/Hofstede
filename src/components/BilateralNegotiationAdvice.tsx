/**
 * 양국 간 조언 컴포넌트
 * 두 국가 간의 상황별 유의사항을 시각적으로 표시합니다.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeftRight,
  Check,
  X,
  ChevronDown,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Heart
} from 'lucide-react';
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
  MEETING_IDEA: { color: 'var(--color-brass, #B8956A)', emoji: '💡' },
  DISAGREE_BOSS: { color: 'var(--color-coral, #C4886B)', emoji: '🗣️' },
  REPORTING: { color: 'var(--color-sage, #7D8471)', emoji: '📋' },
  REWARD_RECOGNITION: { color: 'var(--color-brass-light, #C9A227)', emoji: '🏆' },
  TEAM_COLLABORATION: { color: 'var(--color-brass, #8B7355)', emoji: '🤝' },
  NEGOTIATION: { color: 'var(--color-brass, #9D7E57)', emoji: '🎯' },
  FEEDBACK: { color: 'var(--color-teal, #6B7B8C)', emoji: '💬' },
  CONFLICT_RESOLUTION: { color: 'var(--color-coral, #722F37)', emoji: '⚖️' },
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
      className="glass-card rounded-lg overflow-hidden hover:scale-[1.01] transition-all duration-300"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-white/5 transition-colors duration-300 min-h-[56px] cursor-pointer"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-xl sm:text-2xl">{strategy.icon}</span>
          <div className="text-left">
            <h4
              className="font-semibold text-sm sm:text-base text-[var(--color-ivory)]"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
            >
              {strategy.titleKo}
            </h4>
            <p className="text-[10px] sm:text-xs text-[var(--color-ivory-muted)] opacity-60 mt-0.5">{strategy.title}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center"
        >
          <ChevronDown className="w-5 h-5 text-[var(--color-ivory-muted)]" strokeWidth={1.5} />
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
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-white/5">
              <p className="text-xs sm:text-sm text-[var(--color-ivory)] leading-relaxed mt-3 sm:mt-4 mb-3 sm:mb-4 pl-9 sm:pl-12">
                {strategy.description}
              </p>
              <ul className="space-y-2.5 sm:space-y-3 pl-9 sm:pl-12">
                {strategy.details.map((detail, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-[var(--color-ivory-muted)] leading-relaxed"
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Do's */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="glass-card rounded-lg overflow-hidden border-l-4 border-l-emerald-500/50"
      >
        <div className="px-5 py-4 flex items-center gap-3 border-b border-white/5 bg-emerald-500/5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-600/20">
            <Check className="w-4 h-4 text-emerald-400" strokeWidth={2} />
          </div>
          <h3
            className="font-semibold text-sm sm:text-base text-emerald-400"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
          >
            Do's (권장 사항)
          </h3>
        </div>
        <div className="p-5">
          <ul className="space-y-3.5">
            {dos.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.05, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-start gap-3 text-xs sm:text-sm text-[var(--color-ivory-muted)] leading-relaxed"
              >
                <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-emerald-400" strokeWidth={2.5} />
                </span>
                <span className="text-[var(--color-ivory)]">{item}</span>
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
        className="glass-card rounded-lg overflow-hidden border-l-4 border-l-rose-500/50"
      >
        <div className="px-5 py-4 flex items-center gap-3 border-b border-white/5 bg-rose-500/5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-600/20">
            <X className="w-4 h-4 text-rose-400" strokeWidth={2} />
          </div>
          <h3
            className="font-semibold text-sm sm:text-base text-rose-400"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
          >
            Don'ts (금지 사항)
          </h3>
        </div>
        <div className="p-5">
          <ul className="space-y-3.5">
            {donts.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.05, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-start gap-3 text-xs sm:text-sm text-[var(--color-ivory-muted)] leading-relaxed"
              >
                <span className="mt-0.5 w-5 h-5 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                  <X className="w-3 h-3 text-rose-400" strokeWidth={2.5} />
                </span>
                <span className="text-[var(--color-ivory)]">{item}</span>
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
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      {/* Left Column: Context & Differences (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        {/* 문화적 맥락 */}
        <div className="glass-card rounded-lg p-5">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-5 h-5 text-[#C9A227]" strokeWidth={1.5} />
            <h4
              className="font-semibold text-sm sm:text-base text-[var(--color-ivory)]"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
            >
              문화적 배경
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-ivory-muted)] leading-relaxed">{advice.culturalContext}</p>
        </div>

        {/* 문화적 차이 테이블 */}
        <div className="glass-card rounded-lg p-5">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-[#C4886B]" strokeWidth={1.5} />
            <h4
              className="font-semibold text-sm sm:text-base text-[var(--color-ivory)]"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
            >
              주요 문화적 차이
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 px-3 text-[10px] sm:text-xs font-semibold text-[var(--color-ivory-muted)]">차원</th>
                  <th className="text-left py-2 px-3 text-[10px] sm:text-xs font-semibold" style={{ color: accentColor }}>
                    {advice.fromCountryCode === 'USA' ? '미국' : '한국'}
                  </th>
                  <th className="text-left py-2 px-3 text-[10px] sm:text-xs font-semibold text-[var(--color-sage, #7D8471)]">
                    {advice.toCountryCode === 'KOR' ? '한국' : '미국'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {advice.culturalDifferences.map((diff, idx) => (
                  <tr key={idx} className="border-b border-white/5">
                    <td className="py-2.5 px-3 text-[10px] sm:text-xs font-medium text-[var(--color-ivory)]">{diff.dimension}</td>
                    <td className="py-2.5 px-3 text-[10px] sm:text-xs text-[var(--color-ivory-muted)]">{diff.countryA}</td>
                    <td className="py-2.5 px-3 text-[10px] sm:text-xs text-[var(--color-ivory-muted)]">{diff.countryB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Column: Key Strategies & Do's/Don'ts (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        {/* 핵심 전략 */}
        <div>
          <div className="flex items-center gap-3 mb-4 px-1">
            <div className="w-1 h-5 rounded-full bg-[var(--color-brass)]" />
            <h4
              className="font-semibold text-sm sm:text-base text-[var(--color-ivory)]"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
            >
              핵심 전략
            </h4>
          </div>
          <div className="space-y-4">
            {advice.keyStrategies.map((strategy, idx) => (
              <StrategyCard key={idx} strategy={strategy} index={idx} accentColor={accentColor} />
            ))}
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div>
          <div className="flex items-center gap-3 mb-4 px-1">
            <div className="w-1 h-5 rounded-full bg-[var(--color-brass)]" />
            <h4
              className="font-semibold text-sm sm:text-base text-[var(--color-ivory)]"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
            >
              Do's & Don'ts
            </h4>
          </div>
          <DosDontsSection dos={advice.dosDonts.dos} donts={advice.dosDonts.donts} />
        </div>
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
    <div className="space-y-6">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="glass-card rounded-lg p-6 sm:p-8"
      >
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-5">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-2.5 bg-white/5 rounded-lg border border-white/10"
          >
            <span
              className="font-semibold tracking-wide text-sm sm:text-base text-[var(--color-brass)]"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
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
            className="px-4 py-2.5 bg-white/5 rounded-lg border border-white/10"
          >
            <span
              className="font-semibold tracking-wide text-sm sm:text-base text-[var(--color-sage, #7D8471)]"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
            >
              {nameB}
            </span>
          </motion.div>
        </div>
        <h2
          className="text-lg sm:text-2xl font-bold text-center text-[var(--color-brass)] flex items-center justify-center gap-2 sm:gap-3"
          style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
        >
          <span className="text-xl sm:text-2xl">{colors.emoji}</span>
          {t('bilateralAdviceFor', { context: t(contextKey) })}
        </h2>
        <p className="text-xs sm:text-sm text-center text-[var(--color-ivory-muted)] mt-3 leading-relaxed">
          {contextInfo.description}
        </p>

        {/* 프레임워크 안내 */}
        <div className="mt-5 p-4 rounded-lg bg-white/5 border border-white/5">
          <p className="text-[10px] sm:text-xs text-[var(--color-ivory-muted)] leading-relaxed text-center opacity-80">
            <span className="font-semibold text-[var(--color-brass)]">분석 프레임워크:</span>{' '}
            Wursten 문화 클러스터(PDI, IDV, UAI, MAS 기반)와 Hofstede 문화 차원 이론(LTO, IVR 포함)을 기반으로 합니다.
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
            className="flex gap-3"
          >
            {detailedAtoBAdvice && (
              <button
                onClick={() => setActiveTab('AtoB')}
                className={`flex-1 py-3.5 px-6 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2 cursor-pointer border ${
                  activeTab === 'AtoB'
                    ? 'bg-[var(--color-brass)] border-[var(--color-brass)] text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-[var(--color-ivory-muted)] hover:bg-white/10'
                }`}
              >
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                {nameA} → {nameB}
              </button>
            )}
            {detailedBtoAAdvice && (
              <button
                onClick={() => setActiveTab('BtoA')}
                className={`flex-1 py-3.5 px-6 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2 cursor-pointer border ${
                  activeTab === 'BtoA'
                    ? 'bg-[var(--color-sage, #7D8471)] border-[var(--color-sage, #7D8471)] text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-[var(--color-ivory-muted)] hover:bg-white/10'
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
                <DetailedAdviceSection advice={detailedAtoBAdvice} accentColor="var(--color-brass)" direction="AtoB" />
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
                <DetailedAdviceSection advice={detailedBtoAAdvice} accentColor="var(--color-sage, #7D8471)" direction="BtoA" />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        /* 기본 양방향 조언 (기존 코드) */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* A → B 조언 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card rounded-lg overflow-hidden"
          >
            <div className="px-5 py-4 flex items-center gap-4 border-b border-white/5 bg-white/5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
                style={{ backgroundColor: 'var(--color-brass, #B8956A)' }}
              >
                <ArrowRight className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <h3
                className="font-semibold text-sm sm:text-base tracking-wide"
                style={{ color: 'var(--color-brass)', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
              >
                {fromAtoB.titleKo || fromAtoB.title}
              </h3>
            </div>
            <div className="p-5">
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
                    className="flex items-start gap-4 text-xs sm:text-sm text-[var(--color-ivory-muted)] leading-relaxed p-3.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-[var(--color-brass)] flex-shrink-0 text-xs font-bold gap-1 shadow-sm">
                      {idx + 1}
                    </span>
                    <span className="mt-1 text-[var(--color-brass)] flex-shrink-0">
                      {idx % 3 === 0 ? <TrendingUp className="w-4 h-4" /> : idx % 3 === 1 ? <AlertTriangle className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                    </span>
                    <span className="text-[var(--color-ivory)]">{bullet}</span>
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
            className="glass-card rounded-lg overflow-hidden"
          >
            <div className="px-5 py-4 flex items-center gap-4 border-b border-white/5 bg-white/5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
                style={{ backgroundColor: 'var(--color-sage, #7D8471)' }}
              >
                <ArrowRight className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <h3
                className="font-semibold text-sm sm:text-base tracking-wide"
                style={{ color: 'var(--color-brass)', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
              >
                {fromBtoA.titleKo || fromBtoA.title}
              </h3>
            </div>
            <div className="p-5">
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
                    className="flex items-start gap-4 text-xs sm:text-sm text-[var(--color-ivory-muted)] leading-relaxed p-3.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-[var(--color-brass)] flex-shrink-0 text-xs font-bold gap-1 shadow-sm">
                      {idx + 1}
                    </span>
                    <span className="mt-1 text-[var(--color-brass)] flex-shrink-0">
                      {idx % 3 === 0 ? <TrendingUp className="w-4 h-4" /> : idx % 3 === 1 ? <AlertTriangle className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
                    </span>
                    <span className="text-[var(--color-ivory)]">{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}

      {/* 상호 이해 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="glass-card rounded-lg overflow-hidden"
      >
        <div className="px-5 py-4 flex items-center gap-4 border-b border-white/5 bg-white/5">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
            style={{ backgroundColor: 'var(--color-brass-light, #C9A227)' }}
          >
            <span className="text-base sm:text-lg">💡</span>
          </div>
          <h3
            className="font-semibold text-sm sm:text-base text-[var(--color-brass)]"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
          >
            {t('mutualUnderstandingTitle', { context: t(contextKey) })}
          </h3>
        </div>

        <div className="p-5 space-y-5">
          {/* 주요 차이점 */}
          <div className="p-5 rounded-lg bg-rose-500/5 border border-rose-500/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-base sm:text-lg text-rose-400">⚠️</span>
              <h4
                className="font-semibold text-rose-400 text-xs sm:text-sm"
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
              >
                {t('keyCulturalDifferences')}
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
                  className="text-xs sm:text-sm text-rose-300/80 flex items-start gap-3 leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 bg-rose-400/60 rounded-full flex-shrink-0" />
                  <span>{diff}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 공통 기반 */}
          <div className="p-5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-base sm:text-lg text-emerald-400">✓</span>
              <h4
                className="font-semibold text-emerald-400 text-xs sm:text-sm"
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
              >
                {t('commonGround')}
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
                  className="text-xs sm:text-sm text-emerald-300/80 flex items-start gap-3 leading-relaxed"
                >
                  <span className="mt-2 w-1.5 h-1.5 bg-emerald-400/60 rounded-full flex-shrink-0" />
                  <span>{common}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 가교 전략 (Bridging Strategy) */}
          <div className="p-5 rounded-lg bg-white/5 border border-white/5">
            <h4
              className="font-semibold text-[var(--color-brass)] mb-3 flex items-center gap-3 text-xs sm:text-sm"
              style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
            >
              <span className="text-base sm:text-lg">✨</span>
              {t('successStrategy')}
            </h4>
            <p className="text-xs sm:text-sm text-[var(--color-ivory)] leading-relaxed">
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
        className="glass-card rounded-lg p-5"
      >
        <h4
          className="font-semibold text-[var(--color-brass)] mb-5 flex items-center gap-3 text-sm sm:text-base"
          style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
        >
          <div className="w-1 h-5 rounded-full bg-[var(--color-brass)]" />
          문화 차원 비교
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 font-semibold text-[var(--color-ivory-muted)] tracking-wide">차원</th>
                <th className="text-center py-3 px-4 font-semibold text-[var(--color-brass)]">{nameA}</th>
                <th className="text-center py-3 px-4 font-semibold text-[var(--color-ivory-muted)] opacity-50">차이</th>
                <th className="text-center py-3 px-4 font-semibold text-[var(--color-sage, #7D8471)]">{nameB}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: 'PDI', label: '권력 거리 (PDI)' },
                { key: 'IDV', label: '개인주의 (IDV)' },
                { key: 'UAI', label: '불확실성 회피 (UAI)' },
                { key: 'MAS', label: '성취 중시 (MAS)' },
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
                    className="border-b border-white/5 hover:bg-white/5 transition-colors duration-300"
                  >
                    <td className="py-3.5 px-4 text-[var(--color-ivory)] font-medium">{dim.label}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-3 py-1.5 rounded-md bg-white/5 text-[var(--color-brass)] font-semibold border border-white/5">
                        {valueA}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${isHighDiff ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-white/5 text-[var(--color-ivory-muted)] opacity-60'}`}>
                        {diff}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-3 py-1.5 rounded-md bg-white/5 text-[var(--color-sage, #7D8471)] font-semibold border border-white/5">
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
        className="glass-card rounded-lg p-5"
      >
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-5 h-5 text-[var(--color-teal, #6B7B8C)]" strokeWidth={1.5} />
          <h4
            className="font-semibold text-xs sm:text-sm text-[var(--color-teal, #6B7B8C)]"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.06em' }}
          >
            {t('academicReferences')}
          </h4>
        </div>
        <p className="text-[10px] sm:text-xs text-[var(--color-ivory-muted)] opacity-70 leading-relaxed mb-4 italic">
          {academicReferences.shortDescription}
        </p>
        <div className="space-y-2">
          {academicReferences.sources.map((source, idx) => (
            <p key={idx} className="text-[9px] sm:text-[10px] text-[var(--color-ivory-muted)] opacity-50 leading-relaxed">
              • {source}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default BilateralNegotiationAdvice;
