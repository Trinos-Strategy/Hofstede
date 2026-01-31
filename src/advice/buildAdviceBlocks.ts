/**
 * 컨텍스트별 조언 블록 생성 함수
 * AdviceContext에 따라 적절한 차원 조언을 조합합니다.
 */

import type { AdviceContext, AdviceBlock, CountryProfile } from '../types';

import {
  adviceForMeeting_PDI,
  adviceForDisagree_PDI,
  adviceForTeam_PDI,
  adviceForReporting_UAI,
  adviceForDecision_UAI,
  adviceForConflict_UAI,
  adviceForReward_IDV,
  adviceForFeedback_IDV,
  adviceForNegotiation_IDV,
  adviceForWorkStyle_MAS,
} from './dimensionAdvice';

/**
 * 국가 프로필과 상황에 맞는 조언 블록들을 생성합니다.
 */
export function buildAdviceBlocks(
  profile: CountryProfile,
  context: AdviceContext
): AdviceBlock[] {
  const { dimensions } = profile;
  const blocks: AdviceBlock[] = [];

  switch (context) {
    case 'MEETING_IDEA':
      blocks.push({
        title: '회의에서 아이디어를 꺼낼 때',
        titleKo: '회의에서 아이디어를 꺼낼 때',
        bullets: adviceForMeeting_PDI(dimensions.pdi),
      });
      // UAI도 영향을 줄 수 있음
      if (dimensions.uai >= 60) {
        blocks.push({
          title: '아이디어 제안 시 고려사항',
          titleKo: '아이디어 제안 시 고려사항',
          bullets: [
            '새로운 아이디어는 충분한 근거와 데이터를 함께 제시하면 수용도가 높아집니다.',
            '기존 방식과의 연결고리를 설명하면 변화에 대한 저항을 줄일 수 있습니다.',
          ],
        });
      }
      break;

    case 'DISAGREE_BOSS':
      blocks.push({
        title: '상사와 의견이 다를 때',
        titleKo: '상사와 의견이 다를 때',
        bullets: adviceForDisagree_PDI(dimensions.pdi),
      });
      // IDV에 따른 추가 조언
      if (dimensions.idv <= 40) {
        blocks.push({
          title: '관계 유지를 위한 팁',
          titleKo: '관계 유지를 위한 팁',
          bullets: [
            '의견 차이가 있어도 관계를 해치지 않도록 표현에 신경 쓰세요.',
            '제3자를 통해 간접적으로 의견을 전달하는 것도 방법입니다.',
          ],
        });
      }
      break;

    case 'REPORTING':
      blocks.push({
        title: '진행 상황 보고 습관',
        titleKo: '진행 상황 보고 습관',
        bullets: adviceForReporting_UAI(dimensions.uai),
      });
      // PDI에 따른 보고 스타일
      blocks.push({
        title: '보고 형식과 빈도',
        titleKo: '보고 형식과 빈도',
        bullets:
          dimensions.pdi >= 60
            ? [
                '정해진 보고 체계와 형식을 따르는 것이 중요합니다.',
                '상사에게 먼저 보고한 후 관련 부서와 공유하는 순서를 지키세요.',
              ]
            : [
                '필요에 따라 유연하게 보고 형식을 조정해도 괜찮습니다.',
                '관련자들에게 동시에 공유하는 것이 효율적입니다.',
              ],
      });
      break;

    case 'REWARD_RECOGNITION':
      blocks.push({
        title: '성과·보상 커뮤니케이션',
        titleKo: '성과·보상 커뮤니케이션',
        bullets: adviceForReward_IDV(dimensions.idv),
      });
      // MAS에 따른 추가 조언
      if (dimensions.mas !== undefined) {
        blocks.push({
          title: '동기부여 방식',
          titleKo: '동기부여 방식',
          bullets: adviceForWorkStyle_MAS(dimensions.mas),
        });
      }
      break;

    case 'TEAM_COLLABORATION':
      blocks.push({
        title: '팀 협업 스타일',
        titleKo: '팀 협업 스타일',
        bullets: adviceForTeam_PDI(dimensions.pdi),
      });
      blocks.push({
        title: '의사결정 방식',
        titleKo: '의사결정 방식',
        bullets: adviceForDecision_UAI(dimensions.uai),
      });
      // IDV에 따른 협업 스타일
      blocks.push({
        title: '협업 시 소통 방식',
        titleKo: '협업 시 소통 방식',
        bullets:
          dimensions.idv >= 60
            ? [
                '각자의 역할과 책임을 명확히 구분하는 것이 효율적입니다.',
                '개인의 전문성을 존중하고 자율성을 부여하세요.',
              ]
            : [
                '팀 전체의 조화와 합의를 중시하는 분위기입니다.',
                '중요한 결정은 팀원들과 충분히 논의한 후 진행하세요.',
              ],
      });
      break;

    case 'NEGOTIATION':
      blocks.push({
        title: '협상 접근법',
        titleKo: '협상 접근법',
        bullets: adviceForNegotiation_IDV(dimensions.idv),
      });
      // UAI에 따른 협상 스타일
      blocks.push({
        title: '협상 진행 방식',
        titleKo: '협상 진행 방식',
        bullets:
          dimensions.uai >= 60
            ? [
                '상세한 계약 조건과 절차를 명확히 하는 것이 중요합니다.',
                '예상 가능한 시나리오와 대응 방안을 미리 준비하세요.',
              ]
            : [
                '유연한 협상이 가능하며, 상황에 따라 조건 조정이 수월합니다.',
                '큰 틀에서 합의하고 세부 사항은 진행하면서 조정해도 됩니다.',
              ],
      });
      break;

    case 'FEEDBACK':
      blocks.push({
        title: '피드백 주고받기',
        titleKo: '피드백 주고받기',
        bullets: adviceForFeedback_IDV(dimensions.idv),
      });
      // PDI에 따른 피드백 방향
      blocks.push({
        title: '피드백 전달 시 유의점',
        titleKo: '피드백 전달 시 유의점',
        bullets:
          dimensions.pdi >= 60
            ? [
                '상사에게 피드백을 줄 때는 조심스럽게, 건의 형식으로 전달하세요.',
                '부하직원에게는 명확한 방향 제시와 함께 피드백하는 것이 효과적입니다.',
              ]
            : [
                '직급에 관계없이 솔직한 피드백이 자연스럽게 오갑니다.',
                '쌍방향 피드백 문화가 잘 작동하는 환경입니다.',
              ],
      });
      break;

    case 'CONFLICT_RESOLUTION':
      blocks.push({
        title: '갈등 해결 접근법',
        titleKo: '갈등 해결 접근법',
        bullets: adviceForConflict_UAI(dimensions.uai),
      });
      // PDI와 IDV 조합에 따른 갈등 해결
      blocks.push({
        title: '갈등 상황에서의 소통',
        titleKo: '갈등 상황에서의 소통',
        bullets:
          dimensions.pdi >= 60
            ? [
                '갈등이 상위 직급에 보고되기 전에 해결하려는 노력이 중요합니다.',
                '조정인이나 상사의 개입이 필요한 경우, 적절한 시점에 요청하세요.',
              ]
            : [
                '당사자 간 직접 대화로 해결하는 것이 선호됩니다.',
                '열린 토론을 통해 서로의 입장을 이해하고 타협점을 찾으세요.',
              ],
      });
      break;

    default:
      // 기본 조언
      blocks.push({
        title: '일반적인 소통 팁',
        titleKo: '일반적인 소통 팁',
        bullets: [
          '상대방의 문화적 배경을 이해하고 존중하는 태도가 중요합니다.',
          '명확한 의사소통과 적극적인 경청을 통해 오해를 줄이세요.',
        ],
      });
  }

  return blocks;
}

/**
 * 컨텍스트에 대한 요약 설명을 생성합니다.
 */
export function getContextSummary(
  profile: CountryProfile,
  context: AdviceContext
): string {
  const countryName = profile.nameKo || profile.name;

  const contextDescriptions: Record<AdviceContext, string> = {
    MEETING_IDEA: `${countryName} 문화에서 회의 중 아이디어를 효과적으로 제안하는 방법입니다.`,
    DISAGREE_BOSS: `${countryName} 문화에서 상사와 의견이 다를 때 현명하게 대처하는 방법입니다.`,
    REPORTING: `${countryName} 문화에서 효과적인 보고와 업무 진행 상황 공유 방법입니다.`,
    REWARD_RECOGNITION: `${countryName} 문화에서 성과를 인정하고 보상을 전달하는 효과적인 방법입니다.`,
    TEAM_COLLABORATION: `${countryName} 문화에서 팀원들과 효과적으로 협업하는 방법입니다.`,
    NEGOTIATION: `${countryName} 문화에서 성공적인 협상을 위한 접근법입니다.`,
    FEEDBACK: `${countryName} 문화에서 피드백을 주고받을 때 유의할 점입니다.`,
    CONFLICT_RESOLUTION: `${countryName} 문화에서 갈등 상황을 원만하게 해결하는 방법입니다.`,
  };

  return contextDescriptions[context] || `${countryName} 문화에 맞는 소통 방법입니다.`;
}
