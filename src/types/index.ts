export type ClusterType =
  | 'contest'
  | 'network'
  | 'family'
  | 'pyramid'
  | 'solarSystem'
  | 'machine';

export type DimensionLevel = 'low' | 'medium' | 'high' | 'mixed' | null;

export interface Dimensions {
  PDI: number;
  IDV: number;
  UAI: number;
  MAS: number;
}

export interface Country {
  code: string;
  name: string;
  nameKo: string;
  cluster: ClusterType;
  dimensions: Dimensions;
}

export interface ClusterCharacteristics {
  PDI: DimensionLevel;
  IDV: DimensionLevel;
  UAI: DimensionLevel;
  MAS: DimensionLevel;
}

export interface ClusterInfo {
  name: string;
  nameKo: string;
  concept: string;
  conceptKo: string;
  icon: string;
  color: string;
  characteristics: ClusterCharacteristics;
  description: string;
}

export interface DimensionInfo {
  key: keyof Dimensions;
  name: string;
  nameKo: string;
  description: string;
  lowDescription: string;
  highDescription: string;
  color: string;
}

// ============================================
// 문화 조언 시스템 타입 정의
// ============================================

// 1. 문화 차원과 국가 프로필 타입
export type HofstedeDimensions = {
  pdi: number; // Power Distance (권력 거리)
  idv: number; // Individualism (개인주의)
  uai: number; // Uncertainty Avoidance (불확실성 회피)
  mas?: number; // Masculinity (남성성) - optional
  lto?: number; // Long Term Orientation (장기 지향성) - optional
  ivr?: number; // Indulgence vs Restraint (관용 vs 자제) - optional
};

export type CultureType =
  | 'CONTEST'
  | 'NETWORK'
  | 'FAMILY'
  | 'PYRAMID'
  | 'SOLAR_SYSTEM'
  | 'MACHINE'
  | 'OTHER';

export type CountryProfile = {
  code: string; // 'KR', 'US' ...
  name: string; // 'Korea', 'United States' ...
  nameKo?: string; // '한국', '미국' ...
  dimensions: HofstedeDimensions;
  cultureType: CultureType;
};

// 2. 조언이 필요한 상황 카테고리
export type AdviceContext =
  | 'MEETING_IDEA' // 회의에서 아이디어 제안
  | 'DISAGREE_BOSS' // 상사와 의견 다를 때
  | 'REPORTING' // 보고 / 중간 점검
  | 'REWARD_RECOGNITION' // 성과/보상 커뮤니케이션
  | 'TEAM_COLLABORATION' // 팀 협업
  | 'NEGOTIATION' // 협상
  | 'FEEDBACK' // 피드백 주고받기
  | 'CONFLICT_RESOLUTION'; // 갈등 해결

// 3. 최종 조언 출력 구조
export type AdviceBlock = {
  title: string;
  titleKo?: string;
  bullets: string[];
  bulletsKo?: string[];
};

export type AdviceResult = {
  country: CountryProfile;
  context: AdviceContext;
  blocks: AdviceBlock[];
  summary?: string;
  summaryKo?: string;
};

// 4. 조언 컨텍스트 메타데이터
export type AdviceContextInfo = {
  key: AdviceContext;
  name: string;
  nameKo: string;
  description: string;
  descriptionKo: string;
  icon: string;
};

// 5. CultureType과 ClusterType 매핑 헬퍼
export const cultureTypeToCluster: Record<CultureType, ClusterType | null> = {
  CONTEST: 'contest',
  NETWORK: 'network',
  FAMILY: 'family',
  PYRAMID: 'pyramid',
  SOLAR_SYSTEM: 'solarSystem',
  MACHINE: 'machine',
  OTHER: null,
};

export const clusterToCultureType: Record<ClusterType, CultureType> = {
  contest: 'CONTEST',
  network: 'NETWORK',
  family: 'FAMILY',
  pyramid: 'PYRAMID',
  solarSystem: 'SOLAR_SYSTEM',
  machine: 'MACHINE',
};
