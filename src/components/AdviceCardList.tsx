/**
 * 문화 조언 카드 리스트 컴포넌트
 * AdviceResult를 받아 카드 형태로 렌더링합니다.
 */

import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb, Users, FileText, Award, Handshake, MessageCircle, Scale } from 'lucide-react';
import type { AdviceResult, AdviceContext, AdviceBlock } from '../types';

// 컨텍스트별 아이콘 매핑
const contextIcons: Record<AdviceContext, React.ReactNode> = {
  MEETING_IDEA: <Lightbulb className="w-5 h-5" />,
  DISAGREE_BOSS: <MessageSquare className="w-5 h-5" />,
  REPORTING: <FileText className="w-5 h-5" />,
  REWARD_RECOGNITION: <Award className="w-5 h-5" />,
  TEAM_COLLABORATION: <Users className="w-5 h-5" />,
  NEGOTIATION: <Handshake className="w-5 h-5" />,
  FEEDBACK: <MessageCircle className="w-5 h-5" />,
  CONFLICT_RESOLUTION: <Scale className="w-5 h-5" />,
};

// 컨텍스트별 색상 및 그라데이션 매핑
const contextColors: Record<AdviceContext, { color: string; gradient: string }> = {
  MEETING_IDEA: { color: '#3B82F6', gradient: 'from-blue-500 to-indigo-500' },
  DISAGREE_BOSS: { color: '#EF4444', gradient: 'from-red-500 to-orange-500' },
  REPORTING: { color: '#10B981', gradient: 'from-emerald-500 to-teal-500' },
  REWARD_RECOGNITION: { color: '#F59E0B', gradient: 'from-amber-500 to-yellow-500' },
  TEAM_COLLABORATION: { color: '#8B5CF6', gradient: 'from-purple-500 to-violet-500' },
  NEGOTIATION: { color: '#EC4899', gradient: 'from-pink-500 to-rose-500' },
  FEEDBACK: { color: '#06B6D4', gradient: 'from-cyan-500 to-blue-500' },
  CONFLICT_RESOLUTION: { color: '#6366F1', gradient: 'from-indigo-500 to-purple-500' },
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
      transition={{ delay: index * 0.1 }}
      className="rounded-xl bg-white/5 border border-white/10 p-5 hover:border-white/20 transition-all"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <h3 className="text-base font-semibold mb-4 text-white">
        {block.titleKo || block.title}
      </h3>
      <ul className="space-y-3">
        {(block.bulletsKo || block.bullets).map((bullet, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + idx * 0.05 }}
            className="flex items-start gap-3 text-sm text-gray-300"
          >
            <span
              className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}80`,
              }}
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
  const { color, gradient } = contextColors[context];
  const icon = contextIcons[context];
  const contextName = contextNames[context];

  return (
    <div className="space-y-4">
      {/* 헤더 카드 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-5"
        style={{
          background: `linear-gradient(135deg, ${color}15, transparent)`,
          borderColor: `${color}30`,
        }}
      >
        <div className="flex items-center gap-4 mb-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}
            style={{ boxShadow: `0 4px 20px ${color}40` }}
          >
            {icon}
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {country.nameKo || country.name}
            </h2>
            <p className="text-sm" style={{ color }}>{contextName}</p>
          </div>
        </div>
        {summary && (
          <p className="text-sm text-gray-400 leading-relaxed">{summary}</p>
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
      <div className="text-center py-8 text-gray-500">
        조언을 생성할 국가와 상황을 선택해주세요.
      </div>
    );
  }

  const country = adviceList[0]?.country;

  return (
    <div className="space-y-6">
      {/* 국가 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), transparent)',
        }}
      >
        <h2 className="text-xl font-bold text-white mb-2">
          {country?.nameKo || country?.name} 조직과 일할 때 고려할 점
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          선택하신 국가의 문화 차원을 바탕으로, 다양한 상황에서 유의하면 좋은 행동 힌트를 정리했습니다.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 bg-orange-500/20 text-orange-300 rounded-lg text-xs font-medium">
            PDI: {country?.dimensions.pdi}
          </span>
          <span className="px-3 py-1.5 bg-cyan-500/20 text-cyan-300 rounded-lg text-xs font-medium">
            IDV: {country?.dimensions.idv}
          </span>
          <span className="px-3 py-1.5 bg-pink-500/20 text-pink-300 rounded-lg text-xs font-medium">
            UAI: {country?.dimensions.uai}
          </span>
          {country?.dimensions.mas !== undefined && (
            <span className="px-3 py-1.5 bg-green-500/20 text-green-300 rounded-lg text-xs font-medium">
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
          transition={{ delay: idx * 0.1 }}
          className="space-y-3"
        >
          <AdviceCardList advice={advice} />
        </motion.div>
      ))}
    </div>
  );
}

export default AdviceCardList;
