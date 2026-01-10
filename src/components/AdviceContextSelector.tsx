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
  Sparkles,
} from 'lucide-react';
import type { AdviceContext } from '../types';

interface ContextOption {
  key: AdviceContext;
  name: string;
  nameKo: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  description: string;
}

const contextOptions: ContextOption[] = [
  {
    key: 'MEETING_IDEA',
    name: 'Meeting Ideas',
    nameKo: '회의에서 아이디어 제안',
    icon: <Lightbulb className="w-5 h-5" />,
    color: '#3B82F6',
    gradient: 'from-blue-500 to-indigo-500',
    description: '회의 중 새로운 아이디어를 효과적으로 제안하는 방법',
  },
  {
    key: 'DISAGREE_BOSS',
    name: 'Disagree with Boss',
    nameKo: '상사와 의견 다를 때',
    icon: <MessageSquare className="w-5 h-5" />,
    color: '#EF4444',
    gradient: 'from-red-500 to-orange-500',
    description: '상사와 의견 차이가 있을 때 현명하게 대처하는 방법',
  },
  {
    key: 'REPORTING',
    name: 'Reporting',
    nameKo: '보고 및 중간 점검',
    icon: <FileText className="w-5 h-5" />,
    color: '#10B981',
    gradient: 'from-emerald-500 to-teal-500',
    description: '업무 진행 상황을 효과적으로 보고하는 방법',
  },
  {
    key: 'REWARD_RECOGNITION',
    name: 'Reward & Recognition',
    nameKo: '성과/보상 커뮤니케이션',
    icon: <Award className="w-5 h-5" />,
    color: '#F59E0B',
    gradient: 'from-amber-500 to-yellow-500',
    description: '성과를 인정하고 보상을 전달하는 효과적인 방법',
  },
  {
    key: 'TEAM_COLLABORATION',
    name: 'Team Collaboration',
    nameKo: '팀 협업',
    icon: <Users className="w-5 h-5" />,
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-violet-500',
    description: '팀원들과 효과적으로 협업하는 방법',
  },
  {
    key: 'NEGOTIATION',
    name: 'Negotiation',
    nameKo: '협상',
    icon: <Handshake className="w-5 h-5" />,
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-500',
    description: '성공적인 협상을 위한 접근법',
  },
  {
    key: 'FEEDBACK',
    name: 'Feedback',
    nameKo: '피드백 주고받기',
    icon: <MessageCircle className="w-5 h-5" />,
    color: '#06B6D4',
    gradient: 'from-cyan-500 to-blue-500',
    description: '피드백을 효과적으로 주고받는 방법',
  },
  {
    key: 'CONFLICT_RESOLUTION',
    name: 'Conflict Resolution',
    nameKo: '갈등 해결',
    icon: <Scale className="w-5 h-5" />,
    color: '#6366F1',
    gradient: 'from-indigo-500 to-purple-500',
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
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1.5 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
        <h2 className="text-lg font-bold text-white">상황 선택</h2>
      </div>
      <p className="text-sm text-gray-400 mb-5 flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        어떤 상황에서의 조언이 필요한가요?
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {contextOptions.map((option, index) => {
          const isSelected = selectedContext === option.key;
          return (
            <motion.button
              key={option.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                onContextSelect(isSelected ? null : option.key)
              }
              className={`
                relative flex flex-col items-center gap-2 p-4 rounded-xl
                border transition-all duration-300 text-center
                ${isSelected
                  ? 'border-white/30'
                  : 'border-white/10 hover:border-white/20'
                }
              `}
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${option.color}30, ${option.color}10)`
                  : 'rgba(255, 255, 255, 0.05)',
                boxShadow: isSelected
                  ? `0 0 30px ${option.color}40`
                  : 'none',
              }}
              title={option.description}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 5 }}
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  ${isSelected
                    ? `bg-gradient-to-br ${option.gradient} text-white shadow-lg`
                    : 'bg-white/10 text-gray-400'
                  }
                `}
                style={{
                  boxShadow: isSelected
                    ? `0 4px 15px ${option.color}50`
                    : 'none',
                }}
              >
                {option.icon}
              </motion.div>

              {/* Label */}
              <span
                className={`text-xs font-medium leading-tight ${
                  isSelected ? 'text-white' : 'text-gray-400'
                }`}
              >
                {option.nameKo}
              </span>

              {/* Selected indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <div
                    className="w-3 h-3 rounded-full animate-pulse"
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
            className="mt-5 overflow-hidden"
          >
            <div
              className="p-4 rounded-xl border"
              style={{
                background: `linear-gradient(135deg, ${
                  contextOptions.find((o) => o.key === selectedContext)?.color
                }20, transparent)`,
                borderColor: `${
                  contextOptions.find((o) => o.key === selectedContext)?.color
                }30`,
              }}
            >
              <p
                className="text-sm"
                style={{
                  color: contextOptions.find((o) => o.key === selectedContext)
                    ?.color,
                }}
              >
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
