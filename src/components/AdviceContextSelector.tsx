/**
 * 조언 상황(AdviceContext) 선택 컴포넌트
 */

import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Lightbulb,
  Users,
  FileText,
  Award,
  Handshake,
  MessageCircle,
  Scale,
} from 'lucide-react';
import type { AdviceContext } from '../types';

interface ContextOption {
  key: AdviceContext;
  name: string;
  nameKo: string;
  icon: React.ReactNode;
  color: string;
  emoji: string;
  description: string;
}

const contextOptions: ContextOption[] = [
  {
    key: 'MEETING_IDEA',
    name: 'Meeting Ideas',
    nameKo: '회의에서 아이디어 제안',
    icon: <Lightbulb className="w-5 h-5" strokeWidth={1.5} />,
    color: '#B8956A',
    emoji: '💡',
    description: '회의 중 새로운 아이디어를 효과적으로 제안하는 방법',
  },
  {
    key: 'DISAGREE_BOSS',
    name: 'Disagree with Boss',
    nameKo: '상사와 의견 다를 때',
    icon: <MessageSquare className="w-5 h-5" strokeWidth={1.5} />,
    color: '#C4886B',
    emoji: '🗣️',
    description: '상사와 의견 차이가 있을 때 현명하게 대처하는 방법',
  },
  {
    key: 'REPORTING',
    name: 'Reporting',
    nameKo: '보고 및 중간 점검',
    icon: <FileText className="w-5 h-5" strokeWidth={1.5} />,
    color: '#7D8471',
    emoji: '📋',
    description: '업무 진행 상황을 효과적으로 보고하는 방법',
  },
  {
    key: 'REWARD_RECOGNITION',
    name: 'Reward & Recognition',
    nameKo: '성과/보상 커뮤니케이션',
    icon: <Award className="w-5 h-5" strokeWidth={1.5} />,
    color: '#C9A227',
    emoji: '🏆',
    description: '성과를 인정하고 보상을 전달하는 효과적인 방법',
  },
  {
    key: 'TEAM_COLLABORATION',
    name: 'Team Collaboration',
    nameKo: '팀 협업',
    icon: <Users className="w-5 h-5" strokeWidth={1.5} />,
    color: '#8B7355',
    emoji: '🤝',
    description: '팀원들과 효과적으로 협업하는 방법',
  },
  {
    key: 'NEGOTIATION',
    name: 'Negotiation',
    nameKo: '협상',
    icon: <Handshake className="w-5 h-5" strokeWidth={1.5} />,
    color: '#9D7E57',
    emoji: '🎯',
    description: '성공적인 협상을 위한 접근법',
  },
  {
    key: 'FEEDBACK',
    name: 'Feedback',
    nameKo: '피드백 주고받기',
    icon: <MessageCircle className="w-5 h-5" strokeWidth={1.5} />,
    color: '#6B7B8C',
    emoji: '💬',
    description: '피드백을 효과적으로 주고받는 방법',
  },
  {
    key: 'CONFLICT_RESOLUTION',
    name: 'Conflict Resolution',
    nameKo: '갈등 해결',
    icon: <Scale className="w-5 h-5" strokeWidth={1.5} />,
    color: '#722F37',
    emoji: '⚖️',
    description: '갈등 상황을 원만하게 해결하는 방법',
  },
];

interface AdviceContextSelectorProps {
  selectedContext: AdviceContext | null;
  onContextSelect: (context: AdviceContext | null) => void;
}

export function AdviceContextSelector({
  selectedContext,
  onContextSelect,
}: AdviceContextSelectorProps) {
  return (
    <div className="luxury-card rounded-lg p-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="accent-bar" />
        <h2
          className="text-xl font-medium text-[#1A1A1A]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          상황 선택
        </h2>
      </div>
      <p className="text-sm text-[#5A5A5A] mb-6 flex items-center gap-2">
        <span className="text-lg">💼</span>
        어떤 상황에서의 조언이 필요한가요?
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {contextOptions.map((option, index) => {
          const isSelected = selectedContext === option.key;
          return (
            <motion.button
              key={option.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.06,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                onContextSelect(isSelected ? null : option.key)
              }
              className={`
                relative flex flex-col items-center gap-3 p-5 rounded-lg
                transition-all duration-500 text-center
                ${isSelected
                  ? 'bg-white shadow-md border-b-2'
                  : 'bg-[#F5F4F0] border border-black/5 hover:bg-white hover:shadow-sm'
                }
              `}
              style={{
                borderBottomColor: isSelected ? option.color : 'transparent',
              }}
              title={option.description}
            >
              {/* Emoji */}
              <span className="text-2xl">{option.emoji}</span>

              {/* Label */}
              <span
                className={`text-xs font-medium leading-tight tracking-wide ${
                  isSelected ? 'text-[#1A1A1A]' : 'text-[#5A5A5A]'
                }`}
              >
                {option.nameKo}
              </span>

              {/* Selected indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -top-1 -right-1"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected context description */}
      <AnimatePresence>
        {selectedContext && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-6 overflow-hidden"
          >
            <div
              className="p-5 rounded-lg border-l-2 bg-[#F5F4F0]"
              style={{
                borderLeftColor: contextOptions.find((o) => o.key === selectedContext)?.color,
              }}
            >
              <p className="text-sm text-[#5A5A5A] leading-relaxed">
                {contextOptions.find((o) => o.key === selectedContext)?.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { contextOptions };
export default AdviceContextSelector;
