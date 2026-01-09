/**
 * 문화 조언 카드 리스트 컴포넌트
 * AdviceResult를 받아 카드 형태로 렌더링합니다.
 */

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

// 컨텍스트별 색상 매핑
const contextColors: Record<AdviceContext, string> = {
  MEETING_IDEA: '#3B82F6', // blue
  DISAGREE_BOSS: '#EF4444', // red
  REPORTING: '#10B981', // emerald
  REWARD_RECOGNITION: '#F59E0B', // amber
  TEAM_COLLABORATION: '#8B5CF6', // violet
  NEGOTIATION: '#EC4899', // pink
  FEEDBACK: '#06B6D4', // cyan
  CONFLICT_RESOLUTION: '#6366F1', // indigo
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
}

function AdviceCard({ block, color }: AdviceCardProps) {
  return (
    <div
      className="rounded-lg border p-4 bg-white hover:shadow-md transition-shadow"
      style={{ borderLeftWidth: 4, borderLeftColor: color }}
    >
      <h3 className="text-base font-semibold mb-3 text-gray-800">
        {block.titleKo || block.title}
      </h3>
      <ul className="space-y-2">
        {(block.bulletsKo || block.bullets).map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface AdviceCardListProps {
  advice: AdviceResult;
}

export function AdviceCardList({ advice }: AdviceCardListProps) {
  const { country, context, blocks, summary } = advice;
  const color = contextColors[context];
  const icon = contextIcons[context];
  const contextName = contextNames[context];

  return (
    <div className="space-y-4">
      {/* 헤더 카드 */}
      <div className="rounded-lg border p-4 bg-slate-50">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {country.nameKo || country.name}
            </h2>
            <p className="text-sm text-gray-500">{contextName}</p>
          </div>
        </div>
        {summary && (
          <p className="text-sm text-gray-600 mt-2">{summary}</p>
        )}
      </div>

      {/* 조언 블록들 */}
      {blocks.map((block, idx) => (
        <AdviceCard key={idx} block={block} color={color} />
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
      <div className="rounded-xl border p-6 bg-gradient-to-r from-slate-50 to-white">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {country?.nameKo || country?.name} 조직과 일할 때 고려할 점
        </h2>
        <p className="text-sm text-gray-600">
          선택하신 국가의 문화 차원을 바탕으로, 다양한 상황에서 유의하면 좋은 행동 힌트를 정리했습니다.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
            PDI: {country?.dimensions.pdi}
          </span>
          <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded text-xs font-medium">
            IDV: {country?.dimensions.idv}
          </span>
          <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs font-medium">
            UAI: {country?.dimensions.uai}
          </span>
          {country?.dimensions.mas !== undefined && (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
              MAS: {country.dimensions.mas}
            </span>
          )}
        </div>
      </div>

      {/* 상황별 조언 */}
      {adviceList.map((advice, idx) => (
        <div key={idx} className="space-y-3">
          <AdviceCardList advice={advice} />
        </div>
      ))}
    </div>
  );
}

export default AdviceCardList;
