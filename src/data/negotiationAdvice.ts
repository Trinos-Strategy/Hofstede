/**
 * 양국 간 협상 조언 데이터
 * 학술 연구 기반: Hofstede Cultural Dimensions, Hall's Context Theory, Meyer's Culture Map
 */

// 문화적 차이 타입
export interface CulturalDifference {
  dimension: string;
  countryA: string;
  countryB: string;
}

// 핵심 전략 타입
export interface KeyStrategy {
  title: string;
  titleKo: string;
  icon: string;
  description: string;
  details: string[];
}

// Do's and Don'ts 타입
export interface DosDonts {
  dos: string[];
  donts: string[];
}

// 양국 간 상세 협상 조언
export interface DetailedNegotiationAdvice {
  fromCountryCode: string;
  toCountryCode: string;
  title: string;
  culturalContext: string;
  culturalDifferences: CulturalDifference[];
  keyStrategies: KeyStrategy[];
  dosDonts: DosDonts;
}

// 협상 조언 데이터베이스
export interface NegotiationAdviceDatabase {
  [key: string]: DetailedNegotiationAdvice;
}

/**
 * US → Korea 협상 조언
 * 학술 근거: Hall (1976) High/Low Context, Hofstede (2010), Meyer (2014) Culture Map
 */
const usToKoreaAdvice: DetailedNegotiationAdvice = {
  fromCountryCode: 'USA',
  toCountryCode: 'KOR',
  title: '미국 → 한국 협상 전략',
  culturalContext: '미국은 저맥락(Low-context) 문화로 직접적이고 명시적인 의사소통을 선호하는 반면, 한국은 고맥락(High-context) 문화로 비언어적 단서와 관계적 맥락을 중시합니다. 이러한 차이를 이해하고 적응하는 것이 성공적인 협상의 핵심입니다.',
  culturalDifferences: [
    {
      dimension: '의사소통 방식',
      countryA: '저맥락(Low-context): 직접적, 명시적',
      countryB: '고맥락(High-context): 간접적, 맥락 의존',
    },
    {
      dimension: '의사결정',
      countryA: '개인주의: 개인 권한과 빠른 결정',
      countryB: '집단주의: 합의 기반, 시간 소요',
    },
    {
      dimension: '권력 구조',
      countryA: '낮은 PDI: 평등주의, 수평적',
      countryB: '높은 PDI: 위계 중시, 수직적',
    },
    {
      dimension: '불확실성 대응',
      countryA: '낮은 UAI: 유연성, 리스크 수용',
      countryB: '높은 UAI: 상세한 계약, 절차 중시',
    },
  ],
  keyStrategies: [
    {
      title: 'Build Relationships First',
      titleKo: '관계 구축 우선',
      icon: '🤝',
      description: '비즈니스 논의 전에 신뢰와 유대 관계를 형성하세요.',
      details: [
        '눈치(nunchi): 상대방의 감정과 비언어적 신호를 읽는 한국의 핵심 사회 기술을 이해하세요',
        '비즈니스 식사, 회식 문화에 적극적으로 참여하세요. 이는 관계 구축의 핵심입니다',
        '첫 미팅에서 바로 비즈니스로 들어가지 말고, 인사와 관계 형성에 시간을 투자하세요',
        '장기적 파트너십 관점을 제시하면 신뢰를 얻는 데 효과적입니다',
      ],
    },
    {
      title: 'Respect the Hierarchy',
      titleKo: '계층 존중',
      icon: '👔',
      description: '한국의 위계적 조직 문화를 이해하고 존중하세요.',
      details: [
        '직급 매칭: 협상 시 상대방과 동등한 직급의 담당자를 배치하세요',
        '명함 교환: 양손으로 주고받으며, 받은 명함은 즉시 주머니에 넣지 마세요',
        '실제 의사결정권자를 파악하세요. 회의 참석자 중 가장 고위직이 최종 결정권을 가질 가능성이 높습니다',
        '연공서열(seniority)을 존중하되, 젊은 실무자들의 전문성도 인정하세요',
      ],
    },
    {
      title: 'Indirect Communication',
      titleKo: '간접 의사소통 이해',
      icon: '💬',
      description: '"예"가 항상 동의를 의미하지 않으며, "아니오"를 직접적으로 말하지 않습니다.',
      details: [
        '"생각해 보겠습니다", "어렵습니다"는 종종 거절의 완곡한 표현입니다',
        '비언어적 신호(침묵, 망설임, 시선 회피)를 주의 깊게 관찰하세요',
        '공개적인 자리에서 상대방을 난처하게 만드는 질문을 피하세요',
        '중요한 논의는 공식 회의보다 비공식 자리에서 더 솔직하게 이루어질 수 있습니다',
      ],
    },
    {
      title: 'Patience and Process',
      titleKo: '인내와 프로세스',
      icon: '⏳',
      description: '한국은 높은 불확실성 회피 문화로, 상세한 검토와 합의 과정이 필요합니다.',
      details: [
        '의사결정에 예상보다 더 많은 시간이 걸릴 수 있음을 이해하세요',
        '상세한 계약서와 문서화를 준비하세요. 구두 합의만으로는 부족합니다',
        '여러 차례의 회의와 검토 과정을 거칠 준비를 하세요',
        '급한 마감을 강요하면 역효과가 날 수 있습니다. 인내심을 보여주세요',
      ],
    },
    {
      title: 'Preserve Harmony',
      titleKo: '집단 조화 유지',
      icon: '☯️',
      description: '체면(face)과 기분(kibun)을 손상시키지 않도록 주의하세요.',
      details: [
        '공개적인 비판이나 반박은 절대 피하세요. 사적인 자리에서 문제를 제기하세요',
        '실수나 문제가 있어도 상대방의 체면을 세워주는 방식으로 해결하세요',
        '팀 전체의 성과를 인정하고, 개인을 지나치게 부각시키지 마세요',
        '감정적 대립을 피하고, 차분하고 존중하는 태도를 유지하세요',
      ],
    },
  ],
  dosDonts: {
    dos: [
      '협상 시 상대방과 동등한 직급의 담당자를 매칭하세요',
      '명함을 양손으로 주고받고, 받은 명함을 테이블 위에 정중히 놓으세요',
      '비즈니스 식사와 회식(hoesik)에 적극 참여하세요',
      '의사결정에 충분한 시간을 허용하세요',
      '비언어적 신호와 맥락을 주의 깊게 관찰하세요',
      '장기적 파트너십과 상호 이익을 강조하세요',
      '상세한 계약서와 문서를 준비하세요',
      '상대방의 전문성과 회사의 성과를 인정하는 말을 하세요',
    ],
    donts: [
      '첫 미팅에서 빠른 결정을 압박하지 마세요',
      '공개적인 자리에서 비판하거나 반박하지 마세요',
      '직급과 연공서열을 무시하지 마세요',
      '"아니오"나 침묵을 문자 그대로 해석하지 마세요',
      '개인의 이익만 강조하지 말고 집단적 가치를 고려하세요',
      '의사결정을 서두르거나 독촉하지 마세요',
      '계약서 세부사항 검토를 귀찮아하지 마세요',
      '비공식적 관계 구축의 중요성을 과소평가하지 마세요',
    ],
  },
};

/**
 * Korea → US 협상 조언
 * 학술 근거: Hall (1976), Hofstede (2010), Meyer (2014), Korean-US Business Studies
 */
const koreaToUsAdvice: DetailedNegotiationAdvice = {
  fromCountryCode: 'KOR',
  toCountryCode: 'USA',
  title: '한국 → 미국 협상 전략',
  culturalContext: '미국은 법적이고 명시적이며 빠른 진행과 결과를 지향하는 문화입니다. 한국의 관계 중심, 맥락 의존적 소통 방식에서 벗어나 직접적이고 효율적인 접근이 필요합니다.',
  culturalDifferences: [
    {
      dimension: '의사소통 방식',
      countryA: '고맥락: 간접적, 맥락 의존',
      countryB: '저맥락: 직접적, 명시적',
    },
    {
      dimension: '시간 관념',
      countryA: '유연한 시간 개념, 관계 우선',
      countryB: '"Time is money": 효율성, 시간 엄수',
    },
    {
      dimension: '의사결정',
      countryA: '집단 합의, 상위 결재',
      countryB: '개인 권한, 현장 결정',
    },
    {
      dimension: '설득 방식',
      countryA: '관계와 감정(Pathos) 기반',
      countryB: '논리와 데이터(Logos) 기반',
    },
  ],
  keyStrategies: [
    {
      title: 'Direct Communication',
      titleKo: '직접적 의사소통',
      icon: '🎯',
      description: 'Yes/No를 명확히 하고, 모호함을 피하세요.',
      details: [
        '의견이나 입장을 명확하게 표현하세요. 에둘러 말하면 우유부단하게 보일 수 있습니다',
        '"생각해 보겠습니다"보다 구체적인 일정이나 조건을 제시하세요',
        '데이터, 사실, 수치를 기반으로 논리적인 제안을 하세요',
        '질문이 있으면 주저하지 말고 직접 물어보세요. 이는 적극성으로 인식됩니다',
      ],
    },
    {
      title: 'Time Efficiency',
      titleKo: '시간 효율성',
      icon: '⏰',
      description: '"Time is money" - 빠른 진행과 신속한 응답이 중요합니다.',
      details: [
        '미팅은 정해진 시간에 시작하고 끝내세요. 시간 엄수는 프로페셔널리즘의 표시입니다',
        '이메일이나 메시지에 가능한 빨리(24시간 이내) 응답하세요',
        '미팅 전 아젠다를 공유하고, 아젠다에 맞춰 진행하세요',
        '결론과 다음 단계(action items)를 명확히 정리하세요',
      ],
    },
    {
      title: 'Individual Accountability',
      titleKo: '개인 책임과 성과',
      icon: '🏆',
      description: '개인의 기여와 역할을 명확히 하고, 자신의 의견을 표명하세요.',
      details: [
        '미팅에서 자신의 의견을 적극적으로 표현하세요. 침묵은 무관심으로 오해될 수 있습니다',
        '개인의 전문성과 성과를 자신 있게 어필하세요',
        '"우리 팀"보다 "제가 기여한 부분"을 구체적으로 설명하세요',
        '의사결정 시 개인적 책임을 명확히 질 준비를 하세요',
      ],
    },
    {
      title: 'Egalitarianism',
      titleKo: '평등주의',
      icon: '🤝',
      description: '직급보다 전문성과 역할이 중요하며, 수평적 관계를 기대합니다.',
      details: [
        'First name으로 호칭하는 것이 일반적입니다. 너무 격식을 차리면 거리감이 생길 수 있습니다',
        '직급에 상관없이 전문성 있는 의견은 환영받습니다',
        '주니어도 시니어에게 건설적인 의견을 제시할 수 있습니다',
        '의사결정권이 현장 담당자에게 있는 경우가 많습니다',
      ],
    },
    {
      title: 'Contract-Centric',
      titleKo: '법적/계약 중심',
      icon: '📜',
      description: '계약서가 최종 권위이며, 법적 검토가 일상적입니다.',
      details: [
        '구두 합의보다 서면 계약을 중시합니다. 모든 것을 문서화하세요',
        '법률 검토(legal review)는 불신의 표시가 아닌 표준 절차입니다',
        '계약서의 모든 조항을 세밀하게 검토하고 협상하세요',
        '계약 조건 변경은 반드시 서면으로 합의해야 합니다',
      ],
    },
    {
      title: 'Data-Driven Persuasion',
      titleKo: '논리와 데이터',
      icon: '📊',
      description: 'Logos(논리) 기반 설득이 효과적입니다.',
      details: [
        '감정적 호소보다 사실, 수치, ROI를 제시하세요',
        '시장 데이터, 벤치마크, 사례 연구를 준비하세요',
        '제안의 비용-효과 분석을 명확히 보여주세요',
        '리스크와 완화 방안을 논리적으로 설명하세요',
      ],
    },
  ],
  dosDonts: {
    dos: [
      '의견과 입장을 명확하고 직접적으로 표현하세요',
      '미팅 시간을 엄수하고, 효율적으로 진행하세요',
      '전문성을 자신 있게 어필하고, 개인 성과를 구체적으로 설명하세요',
      '데이터, 사실, ROI를 기반으로 제안하세요',
      '계약서를 꼼꼼히 검토하고, 법적 조언을 구하세요',
      '이메일과 메시지에 신속하게 응답하세요',
      '건설적인 토론과 이견 표현을 두려워하지 마세요',
      '명확한 다음 단계(action items)와 마감일을 설정하세요',
    ],
    donts: [
      '모호하거나 애매한 표현을 사용하지 마세요',
      '의사결정을 불필요하게 지연시키지 마세요',
      '관계 구축에만 의존하고 비즈니스 논의를 미루지 마세요',
      '직급이나 연공서열만으로 권위를 주장하지 마세요',
      '감정적 호소에만 의존하지 마세요',
      '계약서 세부사항을 소홀히 다루지 마세요',
      '침묵으로 동의나 거절을 표현하려 하지 마세요',
      '미팅 중 스마트폰을 자주 확인하지 마세요',
    ],
  },
};

/**
 * 협상 조언 데이터베이스
 * key 형식: "{fromCountryCode}-{toCountryCode}"
 */
export const negotiationAdviceDB: NegotiationAdviceDatabase = {
  'USA-KOR': usToKoreaAdvice,
  'KOR-USA': koreaToUsAdvice,
};

/**
 * 특정 국가 쌍의 협상 조언을 가져옵니다.
 * @param fromCode - 출발 국가 코드 (예: 'US', 'KR')
 * @param toCode - 도착 국가 코드
 * @returns 상세 협상 조언 또는 undefined
 */
export function getDetailedNegotiationAdvice(
  fromCode: string,
  toCode: string
): DetailedNegotiationAdvice | undefined {
  const key = `${fromCode}-${toCode}`;
  return negotiationAdviceDB[key];
}

/**
 * 양방향 협상 조언 존재 여부 확인
 */
export function hasDetailedAdvice(codeA: string, codeB: string): boolean {
  return (
    negotiationAdviceDB[`${codeA}-${codeB}`] !== undefined ||
    negotiationAdviceDB[`${codeB}-${codeA}`] !== undefined
  );
}

/**
 * 학술 참고문헌
 */
export const academicReferences = {
  title: 'Academic References',
  titleKo: '학술 참고문헌',
  sources: [
    'Hofstede, G. (2010). Cultures and Organizations: Software of the Mind',
    'Hall, E.T. (1976). Beyond Culture - High/Low Context Theory',
    'Meyer, E. (2014). The Culture Map: Breaking Through the Invisible Boundaries of Global Business',
    'Brett, J.M. (2007). Negotiating Globally: How to Negotiate Deals, Resolve Disputes, and Make Decisions Across Cultural Boundaries',
  ],
  shortDescription: 'Based on research: Hofstede Cultural Dimensions, Hall\'s Context Theory, Meyer\'s Culture Map, Korean-US negotiation studies',
};
