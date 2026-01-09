/**
 * 조언 상황(AdviceContext) 선택 컴포넌트
 */

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
  description: string;
}

const contextOptions: ContextOption[] = [
  {
    key: 'MEETING_IDEA',
    name: 'Meeting Ideas',
    nameKo: '회의에서 아이디어 제안',
    icon: <Lightbulb className="w-4 h-4" />,
    color: '#3B82F6',
    description: '회의 중 새로운 아이디어를 효과적으로 제안하는 방법',
  },
  {
    key: 'DISAGREE_BOSS',
    name: 'Disagree with Boss',
    nameKo: '상사와 의견 다를 때',
    icon: <MessageSquare className="w-4 h-4" />,
    color: '#EF4444',
    description: '상사와 의견 차이가 있을 때 현명하게 대처하는 방법',
  },
  {
    key: 'REPORTING',
    name: 'Reporting',
    nameKo: '보고 및 중간 점검',
    icon: <FileText className="w-4 h-4" />,
    color: '#10B981',
    description: '업무 진행 상황을 효과적으로 보고하는 방법',
  },
  {
    key: 'REWARD_RECOGNITION',
    name: 'Reward & Recognition',
    nameKo: '성과/보상 커뮤니케이션',
    icon: <Award className="w-4 h-4" />,
    color: '#F59E0B',
    description: '성과를 인정하고 보상을 전달하는 효과적인 방법',
  },
  {
    key: 'TEAM_COLLABORATION',
    name: 'Team Collaboration',
    nameKo: '팀 협업',
    icon: <Users className="w-4 h-4" />,
    color: '#8B5CF6',
    description: '팀원들과 효과적으로 협업하는 방법',
  },
  {
    key: 'NEGOTIATION',
    name: 'Negotiation',
    nameKo: '협상',
    icon: <Handshake className="w-4 h-4" />,
    color: '#EC4899',
    description: '성공적인 협상을 위한 접근법',
  },
  {
    key: 'FEEDBACK',
    name: 'Feedback',
    nameKo: '피드백 주고받기',
    icon: <MessageCircle className="w-4 h-4" />,
    color: '#06B6D4',
    description: '피드백을 효과적으로 주고받는 방법',
  },
  {
    key: 'CONFLICT_RESOLUTION',
    name: 'Conflict Resolution',
    nameKo: '갈등 해결',
    icon: <Scale className="w-4 h-4" />,
    color: '#6366F1',
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-2">상황 선택</h2>
      <p className="text-sm text-gray-500 mb-4">
        어떤 상황에서의 조언이 필요한가요?
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {contextOptions.map((option) => {
          const isSelected = selectedContext === option.key;
          return (
            <button
              key={option.key}
              onClick={() =>
                onContextSelect(isSelected ? null : option.key)
              }
              className={`relative flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-center ${
                isSelected
                  ? 'border-opacity-100 shadow-md'
                  : 'border-transparent hover:border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
              style={{
                borderColor: isSelected ? option.color : undefined,
                backgroundColor: isSelected ? `${option.color}10` : undefined,
              }}
              title={option.description}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isSelected ? 'text-white' : 'text-gray-500'
                }`}
                style={{
                  backgroundColor: isSelected ? option.color : '#f1f5f9',
                }}
              >
                {option.icon}
              </div>
              <span
                className={`text-xs font-medium leading-tight ${
                  isSelected ? 'text-gray-800' : 'text-gray-600'
                }`}
              >
                {option.nameKo}
              </span>
            </button>
          );
        })}
      </div>
      {selectedContext && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-700">
            {contextOptions.find((o) => o.key === selectedContext)?.description}
          </p>
        </div>
      )}
    </div>
  );
}

export { contextOptions };
export default AdviceContextSelector;
