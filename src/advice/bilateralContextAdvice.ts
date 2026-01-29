/**
 * 모든 컨텍스트에 대한 양국 간 조언 생성 시스템
 * 각 상황별로 문화 차원 기반 양방향 조언을 제공합니다.
 */

import type {
  CountryProfile,
  BilateralAdviceResult,
  MutualUnderstandingBlock,
  AdviceBlock,
  DimensionGap,
  AdviceContext,
} from '../types';
import { analyzeDimensionGaps } from './bilateralNegotiation';

// 컨텍스트별 조언 타이틀 매핑
const contextTitles: Record<AdviceContext, { title: string; description: string }> = {
  MEETING_IDEA: {
    title: '회의에서 아이디어 제안',
    description: '회의에서 효과적으로 아이디어를 제안하는 방법을 안내합니다.',
  },
  DISAGREE_BOSS: {
    title: '상사와 의견 다를 때',
    description: '상사와 의견이 다를 때 효과적으로 소통하는 방법을 안내합니다.',
  },
  REPORTING: {
    title: '보고 및 중간 점검',
    description: '보고 및 중간 점검 시 유의사항을 안내합니다.',
  },
  REWARD_RECOGNITION: {
    title: '성과/보상 커뮤니케이션',
    description: '성과와 보상에 대해 소통하는 방법을 안내합니다.',
  },
  TEAM_COLLABORATION: {
    title: '팀 협업',
    description: '효과적인 팀 협업을 위한 조언을 제공합니다.',
  },
  NEGOTIATION: {
    title: '협상',
    description: '협상 시 문화적 차이를 고려한 전략을 제공합니다.',
  },
  FEEDBACK: {
    title: '피드백 주고받기',
    description: '피드백을 주고받을 때의 문화적 고려사항을 안내합니다.',
  },
  CONFLICT_RESOLUTION: {
    title: '갈등 해결',
    description: '갈등 상황에서 효과적으로 해결하는 방법을 안내합니다.',
  },
};

/**
 * 회의에서 아이디어 제안 - A→B 조언 생성
 */
function generateMeetingAdvice(
  profileA: CountryProfile,
  profileB: CountryProfile,
  gaps: DimensionGap[]
): string[] {
  const bullets: string[] = [];

  // PDI 기반 조언
  const pdiGap = gaps.find((g) => g.dimension === 'PDI');
  if (pdiGap) {
    if (profileA.dimensions.pdi > profileB.dimensions.pdi + 15) {
      // 고PDI → 저PDI
      bullets.push('사전 승인 필요 없음. 회의에서 자유롭게 제안하세요.');
      bullets.push('직급과 관계없이 아이디어 자체의 가치로 평가받습니다.');
    } else if (profileA.dimensions.pdi < profileB.dimensions.pdi - 15) {
      // 저PDI → 고PDI
      bullets.push('상사 사전 동의 확보. 형식적 절차를 존중하세요.');
      bullets.push('회의 전 상사에게 먼저 아이디어를 공유하는 것이 좋습니다.');
    }
  }

  // IDV 기반 조언
  const idvGap = gaps.find((g) => g.dimension === 'IDV');
  if (idvGap) {
    if (profileA.dimensions.idv > profileB.dimensions.idv + 20) {
      // 고IDV → 저IDV
      bullets.push('팀 이익을 강조하세요. "우리"로 표현하면 더 효과적입니다.');
      bullets.push('아이디어가 팀 전체에 어떤 도움이 되는지 설명하세요.');
    } else if (profileA.dimensions.idv < profileB.dimensions.idv - 20) {
      // 저IDV → 고IDV
      bullets.push('개인 기여를 명확히 하세요. 담당자를 지정하세요.');
      bullets.push('누가 어떤 역할을 맡을지 구체적으로 제안하세요.');
    }
  }

  // UAI 기반 조언
  const uaiGap = gaps.find((g) => g.dimension === 'UAI');
  if (uaiGap) {
    if (profileA.dimensions.uai > profileB.dimensions.uai + 15) {
      // 고UAI → 저UAI
      bullets.push('유연성을 강조하세요. 큰 그림 중심으로 제안하세요.');
      bullets.push('세부 사항보다는 전략적 방향에 초점을 맞추세요.');
    } else if (profileA.dimensions.uai < profileB.dimensions.uai - 15) {
      // 저UAI → 고UAI
      bullets.push('상세 계획과 데이터 준비가 필수입니다.');
      bullets.push('예상 리스크와 대응 방안도 함께 준비하세요.');
    }
  }

  if (bullets.length === 0) {
    bullets.push('두 문화 간 큰 차이가 없어 자연스러운 소통이 가능합니다.');
    bullets.push('명확하고 논리적인 제안을 통해 효과적으로 아이디어를 전달하세요.');
  }

  return bullets;
}

/**
 * 상사와 의견 다를 때 - A→B 조언 생성
 */
function generateDisagreementAdvice(
  profileA: CountryProfile,
  profileB: CountryProfile,
  gaps: DimensionGap[]
): string[] {
  const bullets: string[] = [];

  // PDI 기반 조언
  const pdiGap = gaps.find((g) => g.dimension === 'PDI');
  if (pdiGap) {
    if (profileA.dimensions.pdi > profileB.dimensions.pdi + 15) {
      // 고PDI → 저PDI
      bullets.push('회의에서 직접 반론 가능합니다. 논리적 토론이 환영됩니다.');
      bullets.push('공개적으로 다른 의견을 표현해도 부정적으로 여겨지지 않습니다.');
    } else if (profileA.dimensions.pdi < profileB.dimensions.pdi - 15) {
      // 저PDI → 고PDI
      bullets.push('공개 반대는 피하세요. 사적 면담을 요청하세요.');
      bullets.push('상사의 체면을 세워주면서 의견을 전달하는 것이 중요합니다.');
    }
  }

  // IDV 기반 조언
  const idvGap = gaps.find((g) => g.dimension === 'IDV');
  if (idvGap) {
    if (profileA.dimensions.idv > profileB.dimensions.idv + 20) {
      // 고IDV → 저IDV
      bullets.push('팀 합의를 강조하세요. 다수 의견을 언급하면 효과적입니다.');
      bullets.push('"팀에서 논의한 결과..."로 시작하면 수용성이 높아집니다.');
    } else if (profileA.dimensions.idv < profileB.dimensions.idv - 20) {
      // 저IDV → 고IDV
      bullets.push('개인 분석과 근거를 제시하세요. 책임감을 표현하세요.');
      bullets.push('자신의 전문성을 바탕으로 논리적으로 설명하세요.');
    }
  }

  // UAI 기반 조언
  const uaiGap = gaps.find((g) => g.dimension === 'UAI');
  if (uaiGap) {
    if (profileA.dimensions.uai > profileB.dimensions.uai + 15) {
      // 고UAI → 저UAI
      bullets.push('질문 형식으로 접근하세요. 대안 없이도 의견 표출 가능합니다.');
      bullets.push('"이런 방향은 어떨까요?"와 같이 열린 질문을 활용하세요.');
    } else if (profileA.dimensions.uai < profileB.dimensions.uai - 15) {
      // 저UAI → 고UAI
      bullets.push('구체적 대안을 제시하세요. 리스크 분석도 포함하세요.');
      bullets.push('현재 방식의 문제점과 대안의 장점을 데이터로 뒷받침하세요.');
    }
  }

  if (bullets.length === 0) {
    bullets.push('두 문화 간 큰 차이가 없어 자연스러운 의견 교환이 가능합니다.');
    bullets.push('존중하는 태도로 논리적인 근거를 제시하세요.');
  }

  return bullets;
}

/**
 * 보고 및 중간 점검 - A→B 조언 생성
 */
function generateReportingAdvice(
  profileA: CountryProfile,
  profileB: CountryProfile,
  gaps: DimensionGap[]
): string[] {
  const bullets: string[] = [];

  // PDI 기반 조언
  const pdiGap = gaps.find((g) => g.dimension === 'PDI');
  if (pdiGap) {
    if (profileA.dimensions.pdi > profileB.dimensions.pdi + 15) {
      // 고PDI → 저PDI
      bullets.push('간단한 업데이트로 충분합니다. 이메일로도 가능합니다.');
      bullets.push('격식을 차리기보다 핵심 내용을 간결하게 전달하세요.');
    } else if (profileA.dimensions.pdi < profileB.dimensions.pdi - 15) {
      // 저PDI → 고PDI
      bullets.push('형식적 보고서를 작성하세요. 상세히 기록하세요.');
      bullets.push('정기적인 대면 보고가 신뢰를 쌓는 데 효과적입니다.');
    }
  }

  // UAI 기반 조언
  const uaiGap = gaps.find((g) => g.dimension === 'UAI');
  if (uaiGap) {
    if (profileA.dimensions.uai > profileB.dimensions.uai + 15) {
      // 고UAI → 저UAI
      bullets.push('진행상황 중심으로 보고하세요. 변경사항을 강조하세요.');
      bullets.push('유연한 진행을 보여주면 긍정적으로 평가받습니다.');
    } else if (profileA.dimensions.uai < profileB.dimensions.uai - 15) {
      // 저UAI → 고UAI
      bullets.push('리스크와 대응계획을 포함하세요. 필수입니다.');
      bullets.push('예상되는 문제와 해결 방안을 미리 준비하세요.');
    }
  }

  // MAS 기반 조언
  const masGap = gaps.find((g) => g.dimension === 'MAS');
  if (masGap && masGap.significance !== 'low') {
    if (profileA.dimensions.mas! > profileB.dimensions.mas! + 20) {
      // 고MAS → 저MAS
      bullets.push('프로세스와 협력 과정을 강조하세요.');
      bullets.push('팀워크와 조화로운 진행 상황을 보고하세요.');
    } else if (profileA.dimensions.mas! < profileB.dimensions.mas! - 20) {
      // 저MAS → 고MAS
      bullets.push('성과 지표와 달성률을 명시하세요.');
      bullets.push('구체적인 수치와 목표 대비 진행률을 강조하세요.');
    }
  }

  if (bullets.length === 0) {
    bullets.push('두 문화 간 큰 차이가 없어 일반적인 보고 형식으로 충분합니다.');
    bullets.push('명확하고 구조화된 보고를 통해 진행 상황을 전달하세요.');
  }

  return bullets;
}

/**
 * 성과/보상 커뮤니케이션 - A→B 조언 생성
 */
function generateRewardsAdvice(
  profileA: CountryProfile,
  profileB: CountryProfile,
  gaps: DimensionGap[]
): string[] {
  const bullets: string[] = [];

  // IDV 기반 조언
  const idvGap = gaps.find((g) => g.dimension === 'IDV');
  if (idvGap) {
    if (profileA.dimensions.idv > profileB.dimensions.idv + 20) {
      // 고IDV → 저IDV
      bullets.push('팀 기여를 인정하세요. 집단 보상을 제안하세요.');
      bullets.push('개인보다 팀 성과를 강조하면 동기부여에 효과적입니다.');
    } else if (profileA.dimensions.idv < profileB.dimensions.idv - 20) {
      // 저IDV → 고IDV
      bullets.push('개인 성과를 구체적으로 언급하세요. 차별화된 보상을 제안하세요.');
      bullets.push('각 개인의 기여도를 명확히 구분하여 인정하세요.');
    }
  }

  // PDI 기반 조언
  const pdiGap = gaps.find((g) => g.dimension === 'PDI');
  if (pdiGap) {
    if (profileA.dimensions.pdi > profileB.dimensions.pdi + 15) {
      // 고PDI → 저PDI
      bullets.push('직접 대화가 가능합니다. 투명한 기준을 공유하세요.');
      bullets.push('보상 기준을 명확히 설명하고 질문을 받으세요.');
    } else if (profileA.dimensions.pdi < profileB.dimensions.pdi - 15) {
      // 저PDI → 고PDI
      bullets.push('상사를 통해 전달하세요. 권위를 존중하세요.');
      bullets.push('공식적인 채널을 통한 커뮤니케이션이 효과적입니다.');
    }
  }

  // MAS 기반 조언
  const masGap = gaps.find((g) => g.dimension === 'MAS');
  if (masGap && masGap.significance !== 'low') {
    if (profileA.dimensions.mas! > profileB.dimensions.mas! + 20) {
      // 고MAS → 저MAS
      bullets.push('일과 삶의 균형을 강조하세요. 복지 혜택을 언급하세요.');
      bullets.push('금전적 보상 외에 시간, 유연성 등의 가치를 제안하세요.');
    } else if (profileA.dimensions.mas! < profileB.dimensions.mas! - 20) {
      // 저MAS → 고MAS
      bullets.push('경쟁과 승진 기회를 강조하세요.');
      bullets.push('성과에 따른 차별화된 보상과 커리어 성장을 연결하세요.');
    }
  }

  if (bullets.length === 0) {
    bullets.push('두 문화 간 큰 차이가 없어 일반적인 보상 커뮤니케이션이 효과적입니다.');
    bullets.push('공정성과 투명성을 바탕으로 성과를 인정하세요.');
  }

  return bullets;
}

/**
 * 팀 협업 - A→B 조언 생성
 */
function generateCollaborationAdvice(
  profileA: CountryProfile,
  profileB: CountryProfile,
  gaps: DimensionGap[]
): string[] {
  const bullets: string[] = [];

  // IDV 기반 조언
  const idvGap = gaps.find((g) => g.dimension === 'IDV');
  if (idvGap) {
    if (profileA.dimensions.idv > profileB.dimensions.idv + 20) {
      // 고IDV → 저IDV
      bullets.push('공동 책임을 강조하세요. 집단 의사결정을 존중하세요.');
      bullets.push('개인 성과보다 팀 목표 달성을 우선시하세요.');
    } else if (profileA.dimensions.idv < profileB.dimensions.idv - 20) {
      // 저IDV → 고IDV
      bullets.push('명확한 역할 분담을 하세요. 개인 책임을 지정하세요.');
      bullets.push('각자의 담당 영역과 기대 결과물을 명확히 정의하세요.');
    }
  }

  // UAI 기반 조언
  const uaiGap = gaps.find((g) => g.dimension === 'UAI');
  if (uaiGap) {
    if (profileA.dimensions.uai > profileB.dimensions.uai + 15) {
      // 고UAI → 저UAI
      bullets.push('유연한 접근을 하세요. 즉흥적 조정이 가능합니다.');
      bullets.push('상황에 따라 계획을 수정하는 것을 자연스럽게 받아들이세요.');
    } else if (profileA.dimensions.uai < profileB.dimensions.uai - 15) {
      // 저UAI → 고UAI
      bullets.push('상세 프로세스와 일정을 공유하세요.');
      bullets.push('명확한 마일스톤과 체크포인트를 설정하세요.');
    }
  }

  // PDI 기반 조언
  const pdiGap = gaps.find((g) => g.dimension === 'PDI');
  if (pdiGap) {
    if (profileA.dimensions.pdi > profileB.dimensions.pdi + 15) {
      // 고PDI → 저PDI
      bullets.push('수평적 협력을 하세요. 직급과 무관하게 소통하세요.');
      bullets.push('모든 팀원의 의견을 동등하게 존중하세요.');
    } else if (profileA.dimensions.pdi < profileB.dimensions.pdi - 15) {
      // 저PDI → 고PDI
      bullets.push('리더의 조정 역할을 존중하세요. 계층을 인정하세요.');
      bullets.push('주요 결정은 리더를 통해 진행하는 것이 효과적입니다.');
    }
  }

  if (bullets.length === 0) {
    bullets.push('두 문화 간 큰 차이가 없어 자연스러운 협업이 가능합니다.');
    bullets.push('명확한 목표와 열린 커뮤니케이션으로 효과적으로 협력하세요.');
  }

  return bullets;
}

/**
 * 피드백 주고받기 - A→B 조언 생성
 */
function generateFeedbackAdvice(
  profileA: CountryProfile,
  profileB: CountryProfile,
  gaps: DimensionGap[]
): string[] {
  const bullets: string[] = [];

  // PDI 기반 조언
  const pdiGap = gaps.find((g) => g.dimension === 'PDI');
  if (pdiGap) {
    if (profileA.dimensions.pdi > profileB.dimensions.pdi + 15) {
      // 고PDI → 저PDI
      bullets.push('직접적 피드백이 가능합니다. 공개 토론을 활용하세요.');
      bullets.push('솔직하고 구체적인 피드백이 환영받습니다.');
    } else if (profileA.dimensions.pdi < profileB.dimensions.pdi - 15) {
      // 저PDI → 고PDI
      bullets.push('간접적 표현을 사용하세요. 사적 면담을 선호합니다.');
      bullets.push('공개적 비판을 피하고 개인적으로 피드백을 전달하세요.');
    }
  }

  // IDV 기반 조언
  const idvGap = gaps.find((g) => g.dimension === 'IDV');
  if (idvGap) {
    if (profileA.dimensions.idv > profileB.dimensions.idv + 20) {
      // 고IDV → 저IDV
      bullets.push('관계를 배려하세요. 집단 조화를 고려하세요.');
      bullets.push('피드백이 관계에 미치는 영향을 고려하여 표현하세요.');
    } else if (profileA.dimensions.idv < profileB.dimensions.idv - 20) {
      // 저IDV → 고IDV
      bullets.push('직설적 피드백을 하세요. 개인 대상으로 명확히 전달하세요.');
      bullets.push('에둘러 말하지 말고 핵심을 바로 전달하세요.');
    }
  }

  // UAI 기반 조언
  const uaiGap = gaps.find((g) => g.dimension === 'UAI');
  if (uaiGap) {
    if (profileA.dimensions.uai > profileB.dimensions.uai + 15) {
      // 고UAI → 저UAI
      bullets.push('일반적 방향 제시로 충분합니다.');
      bullets.push('큰 방향만 제시하고 세부 사항은 자율에 맡기세요.');
    } else if (profileA.dimensions.uai < profileB.dimensions.uai - 15) {
      // 저UAI → 고UAI
      bullets.push('구체적 개선방안과 절차를 제공하세요.');
      bullets.push('문제점과 함께 구체적인 해결 방법을 제안하세요.');
    }
  }

  if (bullets.length === 0) {
    bullets.push('두 문화 간 큰 차이가 없어 일반적인 피드백 방식이 효과적입니다.');
    bullets.push('건설적이고 구체적인 피드백을 존중하는 태도로 전달하세요.');
  }

  return bullets;
}

/**
 * 갈등 해결 - A→B 조언 생성
 */
function generateConflictAdvice(
  profileA: CountryProfile,
  profileB: CountryProfile,
  gaps: DimensionGap[]
): string[] {
  const bullets: string[] = [];

  // PDI 기반 조언
  const pdiGap = gaps.find((g) => g.dimension === 'PDI');
  if (pdiGap) {
    if (profileA.dimensions.pdi > profileB.dimensions.pdi + 15) {
      // 고PDI → 저PDI
      bullets.push('당사자 간 직접 해결하세요. 제3자의 개입을 최소화하세요.');
      bullets.push('직접 대화를 통해 문제를 해결하는 것을 선호합니다.');
    } else if (profileA.dimensions.pdi < profileB.dimensions.pdi - 15) {
      // 저PDI → 고PDI
      bullets.push('상급자나 조정인을 통해 해결하세요.');
      bullets.push('공식적인 절차를 통한 갈등 해결이 더 효과적입니다.');
    }
  }

  // IDV 기반 조언
  const idvGap = gaps.find((g) => g.dimension === 'IDV');
  if (idvGap) {
    if (profileA.dimensions.idv > profileB.dimensions.idv + 20) {
      // 고IDV → 저IDV
      bullets.push('관계 회복을 중심으로 접근하세요. 화해를 강조하세요.');
      bullets.push('장기적인 관계 유지를 위해 감정적 화해를 우선시하세요.');
    } else if (profileA.dimensions.idv < profileB.dimensions.idv - 20) {
      // 저IDV → 고IDV
      bullets.push('이슈 해결 중심으로 접근하세요. 논리적 합의를 도출하세요.');
      bullets.push('감정보다 사실과 논리에 기반한 해결책을 제시하세요.');
    }
  }

  // UAI 기반 조언
  const uaiGap = gaps.find((g) => g.dimension === 'UAI');
  if (uaiGap) {
    if (profileA.dimensions.uai > profileB.dimensions.uai + 15) {
      // 고UAI → 저UAI
      bullets.push('유연한 해결을 추구하세요. 상황별로 조정하세요.');
      bullets.push('정해진 규칙보다 상황에 맞는 해결책을 찾으세요.');
    } else if (profileA.dimensions.uai < profileB.dimensions.uai - 15) {
      // 저UAI → 고UAI
      bullets.push('명확한 합의문과 규칙을 수립하세요.');
      bullets.push('향후 유사 상황을 방지할 수 있는 명문화된 합의를 도출하세요.');
    }
  }

  if (bullets.length === 0) {
    bullets.push('두 문화 간 큰 차이가 없어 일반적인 갈등 해결 방식이 효과적입니다.');
    bullets.push('상호 존중을 바탕으로 열린 대화를 통해 해결책을 찾으세요.');
  }

  return bullets;
}

/**
 * 협상 - A→B 조언 생성
 */
function generateNegotiationAdvice(
  profileA: CountryProfile,
  profileB: CountryProfile,
  gaps: DimensionGap[]
): string[] {
  const bullets: string[] = [];

  // PDI 기반 조언
  const pdiGap = gaps.find((g) => g.dimension === 'PDI');
  if (pdiGap) {
    if (profileA.dimensions.pdi < profileB.dimensions.pdi - 15) {
      // 저PDI → 고PDI
      bullets.push('상대국은 위계를 중시합니다. 의사결정권자를 파악하고 적절히 존중하세요.');
      bullets.push('실무자 단독으로 즉답하기 어려울 수 있으니, 의사결정 시간을 충분히 확보하세요.');
    } else if (profileA.dimensions.pdi > profileB.dimensions.pdi + 15) {
      // 고PDI → 저PDI
      bullets.push('상대국은 수평적 문화입니다. 직급보다 역할과 전문성에 초점을 맞추세요.');
      bullets.push('현장 담당자도 상당한 결정 권한이 있으니, 실무 협의가 효과적입니다.');
    }
  }

  // IDV 기반 조언
  const idvGap = gaps.find((g) => g.dimension === 'IDV');
  if (idvGap) {
    if (profileA.dimensions.idv > profileB.dimensions.idv + 20) {
      // 고IDV → 저IDV
      bullets.push('관계 구축에 시간을 투자하세요. 비즈니스 외 신뢰 형성이 중요합니다.');
      bullets.push('팀 전체의 이익과 조직 차원의 가치를 강조하면 공감을 얻기 쉽습니다.');
    } else if (profileA.dimensions.idv < profileB.dimensions.idv - 20) {
      // 저IDV → 고IDV
      bullets.push('직접적이고 명확한 의사 표현을 선호합니다. 분명하게 요구사항을 제시하세요.');
      bullets.push('개인의 성과와 이익을 강조하세요. 팀보다 개인별 인센티브가 효과적입니다.');
    }
  }

  // UAI 기반 조언
  const uaiGap = gaps.find((g) => g.dimension === 'UAI');
  if (uaiGap) {
    if (profileA.dimensions.uai < profileB.dimensions.uai - 15) {
      // 저UAI → 고UAI
      bullets.push('상세한 계획과 문서화를 중시합니다. 구두 합의만으로는 부족할 수 있습니다.');
      bullets.push('예상 시나리오와 리스크 대응 방안을 미리 준비하면 신뢰를 얻을 수 있습니다.');
    } else if (profileA.dimensions.uai > profileB.dimensions.uai + 15) {
      // 고UAI → 저UAI
      bullets.push('유연한 협상이 가능합니다. 큰 틀에서 합의하고 세부사항은 진행하며 조정하세요.');
      bullets.push('과도한 문서화나 절차보다 실질적 진행을 더 중요하게 여깁니다.');
    }
  }

  // MAS 기반 조언
  const masGap = gaps.find((g) => g.dimension === 'MAS');
  if (masGap && masGap.significance !== 'low') {
    if (profileA.dimensions.mas! < profileB.dimensions.mas! - 20) {
      // 저MAS → 고MAS
      bullets.push('성과와 경쟁을 중시합니다. 구체적인 성과 지표와 목표를 명확히 하세요.');
    } else if (profileA.dimensions.mas! > profileB.dimensions.mas! + 20) {
      // 고MAS → 저MAS
      bullets.push('협력과 삶의 질을 중시합니다. 윈-윈 관계와 장기적 파트너십을 강조하세요.');
    }
  }

  if (bullets.length === 0) {
    bullets.push('두 문화 간 큰 차이가 없어 자연스러운 소통이 가능합니다.');
    bullets.push('상호 존중과 명확한 의사소통을 유지하면 원활한 협상이 가능합니다.');
  }

  return bullets;
}

/**
 * 컨텍스트별 A→B 조언 생성 함수
 */
function generateContextAdviceFromAtoB(
  profileA: CountryProfile,
  profileB: CountryProfile,
  gaps: DimensionGap[],
  context: AdviceContext
): AdviceBlock {
  const nameA = profileA.nameKo || profileA.name;
  const nameB = profileB.nameKo || profileB.name;
  const contextInfo = contextTitles[context];

  let bullets: string[];

  switch (context) {
    case 'MEETING_IDEA':
      bullets = generateMeetingAdvice(profileA, profileB, gaps);
      break;
    case 'DISAGREE_BOSS':
      bullets = generateDisagreementAdvice(profileA, profileB, gaps);
      break;
    case 'REPORTING':
      bullets = generateReportingAdvice(profileA, profileB, gaps);
      break;
    case 'REWARD_RECOGNITION':
      bullets = generateRewardsAdvice(profileA, profileB, gaps);
      break;
    case 'TEAM_COLLABORATION':
      bullets = generateCollaborationAdvice(profileA, profileB, gaps);
      break;
    case 'FEEDBACK':
      bullets = generateFeedbackAdvice(profileA, profileB, gaps);
      break;
    case 'CONFLICT_RESOLUTION':
      bullets = generateConflictAdvice(profileA, profileB, gaps);
      break;
    case 'NEGOTIATION':
      bullets = generateNegotiationAdvice(profileA, profileB, gaps);
      break;
    default:
      bullets = ['상황에 맞는 조언을 준비 중입니다.'];
  }

  return {
    title: `${nameA} → ${nameB}: ${contextInfo.title}`,
    titleKo: `${nameA} → ${nameB}: ${contextInfo.title}`,
    bullets,
  };
}

/**
 * 상호 이해를 위한 핵심 포인트 생성 (컨텍스트 인식)
 */
function generateContextMutualUnderstanding(
  profileA: CountryProfile,
  profileB: CountryProfile,
  gaps: DimensionGap[],
  context: AdviceContext
): MutualUnderstandingBlock {
  const nameA = profileA.nameKo || profileA.name;
  const nameB = profileB.nameKo || profileB.name;
  const contextInfo = contextTitles[context];

  // 주요 차이점
  const keyDifferences: string[] = [];
  const highGaps = gaps.filter((g) => g.significance === 'high');

  for (const gap of highGaps) {
    switch (gap.dimension) {
      case 'PDI':
        keyDifferences.push(
          `권력 거리: ${nameA}(${gap.valueA}) vs ${nameB}(${gap.valueB}) - ${
            gap.valueA > gap.valueB ? '위계 중시 vs 평등 추구' : '평등 추구 vs 위계 중시'
          }`
        );
        break;
      case 'IDV':
        keyDifferences.push(
          `개인주의: ${nameA}(${gap.valueA}) vs ${nameB}(${gap.valueB}) - ${
            gap.valueA > gap.valueB ? '개인 중심 vs 집단 중심' : '집단 중심 vs 개인 중심'
          }`
        );
        break;
      case 'UAI':
        keyDifferences.push(
          `불확실성 회피: ${nameA}(${gap.valueA}) vs ${nameB}(${gap.valueB}) - ${
            gap.valueA > gap.valueB ? '규칙 선호 vs 유연함 추구' : '유연함 추구 vs 규칙 선호'
          }`
        );
        break;
      case 'MAS':
        keyDifferences.push(
          `남성성: ${nameA}(${gap.valueA}) vs ${nameB}(${gap.valueB}) - ${
            gap.valueA > gap.valueB ? '경쟁 지향 vs 협력 지향' : '협력 지향 vs 경쟁 지향'
          }`
        );
        break;
    }
  }

  if (keyDifferences.length === 0) {
    keyDifferences.push('두 문화 간 큰 차이가 발견되지 않았습니다.');
  }

  // 공통 기반 찾기
  const commonGround: string[] = [];
  const lowGaps = gaps.filter((g) => g.significance === 'low');

  if (lowGaps.some((g) => g.dimension === 'PDI')) {
    commonGround.push('유사한 수준의 권력 구조 이해');
  }
  if (lowGaps.some((g) => g.dimension === 'IDV')) {
    commonGround.push('비슷한 개인/집단 균형 감각');
  }
  if (lowGaps.some((g) => g.dimension === 'UAI')) {
    commonGround.push('유사한 리스크 관리 성향');
  }
  if (lowGaps.some((g) => g.dimension === 'MAS')) {
    commonGround.push('비슷한 성과/관계 가치관');
  }

  // 문화 유형이 같으면 추가
  if (profileA.cultureType === profileB.cultureType) {
    commonGround.push(`동일한 문화 클러스터 (${profileA.cultureType})`);
  }

  if (commonGround.length === 0) {
    commonGround.push('전문성과 비즈니스 목표에 대한 상호 존중');
  }

  // 컨텍스트별 가교 전략 (Bridging Strategy)
  const bridgingStrategies: Record<AdviceContext, string> = {
    MEETING_IDEA: `회의 문화의 차이를 인정하고, ${nameA}와 ${nameB} 양측이 서로의 제안 방식을 이해하면 더 효과적인 아이디어 교환이 가능합니다.`,
    DISAGREE_BOSS: `의견 충돌 시 ${nameA}와 ${nameB}의 소통 방식 차이를 인식하고, 상호 존중을 바탕으로 건설적인 대화를 이끌어내세요.`,
    REPORTING: `보고 스타일의 차이를 이해하고, 양측의 기대에 맞는 형식과 내용을 조율하면 효과적인 커뮤니케이션이 가능합니다.`,
    REWARD_RECOGNITION: `${nameA}와 ${nameB}의 보상에 대한 가치관 차이를 이해하고, 양측 모두가 만족할 수 있는 인정 방식을 찾으세요.`,
    TEAM_COLLABORATION: `협업 스타일의 차이를 인정하고, 각 문화의 강점을 활용하면 더 효과적인 팀워크가 가능합니다.`,
    NEGOTIATION: `협상 스타일의 차이를 이해하고, 서로의 의사결정 방식을 존중하면 윈-윈 결과를 도출할 수 있습니다.`,
    FEEDBACK: `피드백 방식의 차이를 이해하고, 상대방이 수용하기 쉬운 방식으로 전달하면 더 효과적입니다.`,
    CONFLICT_RESOLUTION: `갈등 해결 방식의 차이를 인정하고, 양측이 수용할 수 있는 해결 프로세스를 함께 설계하세요.`,
  };

  let bridgingStrategy = bridgingStrategies[context];

  // 차이가 클 때 추가 조언
  if (highGaps.length >= 2) {
    bridgingStrategy += ` 상당한 문화적 차이가 있으므로, 초기에 기대치를 명확히 조율하는 것이 중요합니다.`;
  } else if (highGaps.length === 0) {
    bridgingStrategy = `두 문화는 비교적 유사하여 자연스러운 소통이 가능합니다. 기본적인 예의와 명확한 소통을 유지하세요.`;
  }

  return {
    title: `${contextInfo.title} - 상호 이해 핵심 포인트`,
    keyDifferences,
    commonGround,
    bridgingStrategy,
  };
}

/**
 * 양국 간 컨텍스트별 조언을 생성합니다.
 *
 * @param countryA - 첫 번째 국가 프로필
 * @param countryB - 두 번째 국가 프로필
 * @param context - 상황 컨텍스트
 * @returns 양국 간 조언 결과
 */
export function generateBilateralContextAdvice(
  countryA: CountryProfile,
  countryB: CountryProfile,
  context: AdviceContext
): BilateralAdviceResult {
  const gaps = analyzeDimensionGaps(countryA, countryB);

  return {
    countryA,
    countryB,
    fromAtoB: generateContextAdviceFromAtoB(countryA, countryB, gaps, context),
    fromBtoA: generateContextAdviceFromAtoB(countryB, countryA, gaps, context),
    mutualUnderstanding: generateContextMutualUnderstanding(countryA, countryB, gaps, context),
  };
}

/**
 * 컨텍스트 타이틀 정보 가져오기
 */
export function getContextTitle(context: AdviceContext): { title: string; description: string } {
  return contextTitles[context];
}
