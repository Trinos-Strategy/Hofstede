/**
 * 문화 조언 카드 리스트 컴포넌트
 * AdviceResult를 받아 카드 형태로 렌더링합니다.
 */

import { motion } from 'framer-motion';
import type { AdviceResult, AdviceContext, AdviceBlock } from '../types';

// 컨텍스트별 색상 매핑 - 럭셔리 팔레트
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

// 컨텍스트 한글 이름
const contextNames: Record<AdviceContext, string> = {
  MEETING_IDEA: '회의에서 아이디어 제안',
  DISAGREE_BOSS: '상사와 의견 다를 때',
  REPORTING: '보고 및 중간 점검',
  REWARD_RECOGNITION: '성과/보상 커뮤니케이션',
  TEAM_COLLABORATION: '팀 협업',
  NEGOTIATION: '협상',
  FEEDBACK: '피드백 주고받기',
  CONFLICT_RESOLUTION: '갈등 해결',
};

interface AdviceCardProps {
  block: AdviceBlock;
  color: string;
  index: number;
}

function AdviceCard({ block, color, index }: AdviceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="rounded-lg bg-white border border-black/6 p-6 hover:shadow-md hover:border-[#B8956A]/30 transition-all duration-500 border-l-2"
      style={{ borderLeftColor: color }}
    >
      <h3
        className="text-base font-medium mb-5 text-[#1A1A1A]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {block.titleKo || block.title}
      </h3>
      <ul className="space-y-4">
        {(block.bulletsKo || block.bullets).map((bullet, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.1 + idx * 0.05,
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="flex items-start gap-4 text-sm text-[#5A5A5A] leading-relaxed"
          >
            <span
              className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span>{bullet}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

interface AdviceCardListProps {
  advice: AdviceResult;
}

export function AdviceCardList({ advice }: AdviceCardListProps) {
  const { country, context, blocks, summary } = advice;
  const { color, emoji } = contextColors[context];
  const contextName = contextNames[context];

  return (
    <div className="space-y-5">
      {/* 헤더 카드 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="luxury-card rounded-lg p-6 border-l-2"
        style={{ borderLeftColor: color }}
      >
        <div className="flex items-center gap-5 mb-4">
          <div className="text-3xl">{emoji}</div>
          <div>
            <h2
              className="text-xl font-medium text-[#1A1A1A]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {country.nameKo || country.name}
            </h2>
            <p className="text-sm mt-1" style={{ color }}>{contextName}</p>
          </div>
        </div>
        {summary && (
          <p className="text-sm text-[#5A5A5A] leading-relaxed">{summary}</p>
        )}
      </motion.div>

      {/* 조언 블록들 */}
      {blocks.map((block, idx) => (
        <AdviceCard key={idx} block={block} color={color} index={idx} />
      ))}
    </div>
  );
}

interface MultipleAdviceCardListProps {
  adviceList: AdviceResult[];
}

export function MultipleAdviceCardList({ adviceList }: MultipleAdviceCardListProps) {
  if (adviceList.length === 0) {
    return (
      <div className="text-center py-12 text-[#5A5A5A]">
        조언을 생성할 국가와 상황을 선택해주세요.
      </div>
    );
  }

  const country = adviceList[0]?.country;

  return (
    <div className="space-y-8">
      {/* 국가 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="luxury-card rounded-lg p-8"
      >
        <h2
          className="text-xl font-medium text-[#1A1A1A] mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {country?.nameKo || country?.name} 조직과 일할 때 고려할 점
        </h2>
        <p className="text-sm text-[#5A5A5A] mb-5 leading-relaxed">
          선택하신 국가의 문화 차원을 바탕으로, 다양한 상황에서 유의하면 좋은 행동 힌트를 정리했습니다.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-[#B8956A]/10 text-[#9D7E57] rounded-md text-xs font-medium tracking-wide">
            PDI: {country?.dimensions.pdi}
          </span>
          <span className="px-4 py-2 bg-[#7D8471]/10 text-[#7D8471] rounded-md text-xs font-medium tracking-wide">
            IDV: {country?.dimensions.idv}
          </span>
          <span className="px-4 py-2 bg-[#C4886B]/10 text-[#C4886B] rounded-md text-xs font-medium tracking-wide">
            UAI: {country?.dimensions.uai}
          </span>
          {country?.dimensions.mas !== undefined && (
            <span className="px-4 py-2 bg-[#6B7B8C]/10 text-[#6B7B8C] rounded-md text-xs font-medium tracking-wide">
              MAS: {country.dimensions.mas}
            </span>
          )}
        </div>
      </motion.div>

      {/* 상황별 조언 */}
      {adviceList.map((advice, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: idx * 0.1,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="space-y-4"
        >
          <AdviceCardList advice={advice} />
        </motion.div>
      ))}
    </div>
  );
}

export default AdviceCardList;
