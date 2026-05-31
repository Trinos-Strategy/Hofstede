import type { Country, ClusterType, ClusterInfo, DimensionInfo } from '../types';

export const clusterInfo: Record<ClusterType, ClusterInfo> = {
  contest: {
    name: 'Contest',
    nameKo: '경쟁',
    concept: 'Competition',
    conceptKo: '경쟁 중심',
    icon: '🏆',
    color: '#EF4444',
    characteristics: {
      PDI: 'low',
      IDV: 'high',
      UAI: 'low',
      MAS: 'high'
    },
    description: '개인의 성취와 경쟁을 중시하며, 수평적 관계와 변화를 수용하는 문화'
  },
  network: {
    name: 'Network',
    nameKo: '네트워크',
    concept: 'Consensus',
    conceptKo: '합의 중심',
    icon: '🕸️',
    color: '#3B82F6',
    characteristics: {
      PDI: 'low',
      IDV: 'high',
      UAI: 'mixed',
      MAS: 'low'
    },
    description: '평등한 의사결정과 협력을 중시하며, 개인 의견을 존중하면서도 조화를 추구하는 문화'
  },
  family: {
    name: 'Family',
    nameKo: '가족',
    concept: 'Loyalty & Hierarchy',
    conceptKo: '충성심·위계',
    icon: '👨‍👩‍👧‍👦',
    color: '#F59E0B',
    characteristics: {
      PDI: 'high',
      IDV: 'low',
      UAI: 'low',
      MAS: null
    },
    description: '명확한 상하 질서와 집단 충성을 중시하며, 상황에 유연하게 적응하는 문화'
  },
  pyramid: {
    name: 'Pyramid',
    nameKo: '피라미드',
    concept: 'Loyalty, Hierarchy & Implicit Order',
    conceptKo: '충성심·위계·암묵적 질서',
    icon: '🔺',
    color: '#10B981',
    characteristics: {
      PDI: 'high',
      IDV: 'low',
      UAI: 'high',
      MAS: null
    },
    description: '권위를 존중하고 집단 충성과 규칙·관행을 중시하는 문화'
  },
  solarSystem: {
    name: 'Solar System',
    nameKo: '태양계',
    concept: 'Hierarchy & Impersonal Bureaucracy',
    conceptKo: '위계·비인격적 관료제',
    icon: '☀️',
    color: '#8B5CF6',
    characteristics: {
      PDI: 'high',
      IDV: 'high',
      UAI: 'high',
      MAS: null
    },
    description: '제도적 권위와 절차·규범을 중시하면서도 개인의 역할과 지위를 구분하는 문화'
  },
  machine: {
    name: 'Machine',
    nameKo: '기계',
    concept: 'Order',
    conceptKo: '질서·시스템',
    icon: '⚙️',
    color: '#6B7280',
    characteristics: {
      PDI: 'medium',
      IDV: 'mixed',
      UAI: 'high',
      MAS: null
    },
    description: '정확성과 예측 가능성을 중시하며, 기능적 위계와 명확한 책임을 강조하는 문화'
  }
};

export const dimensionInfo: DimensionInfo[] = [
  {
    key: 'PDI',
    name: 'Power Distance',
    nameKo: '권력 거리',
    description: '사회에서 권력이 덜한 구성원이 권력 불평등을 수용하는 정도',
    lowDescription: '평등한 관계, 수평적 의사결정',
    highDescription: '위계 존중, 권위 수용',
    color: '#F97316'
  },
  {
    key: 'IDV',
    name: 'Individualism',
    nameKo: '개인주의',
    description: '개인과 집단 중 어디에 우선순위를 두는지의 정도',
    lowDescription: '집단 중시, 소속감 강조',
    highDescription: '개인 중시, 자율성 강조',
    color: '#06B6D4'
  },
  {
    key: 'UAI',
    name: 'Uncertainty Avoidance',
    nameKo: '불확실성 회피',
    description: '불확실한 상황이나 모호함을 회피하려는 정도',
    lowDescription: '변화 수용, 유연함',
    highDescription: '규칙 선호, 안정 추구',
    color: '#EC4899'
  },
  {
    key: 'MAS',
    name: 'Motivation towards Achievement and Success',
    nameKo: '성취 동기',
    description: '성취와 경쟁 지향 vs 배려와 삶의 질 지향 정도',
    lowDescription: '배려 지향, 삶의 질 중시',
    highDescription: '성취 지향, 경쟁 중시',
    color: '#22C55E'
  },
  {
    key: 'LTO',
    name: 'Long Term Orientation',
    nameKo: '장기 지향성',
    description: '미래를 위한 준비와 인내를 중시하는 정도 vs 전통과 단기적 결과를 중시하는 정도',
    lowDescription: '전통 존중, 단기적 결과 중시',
    highDescription: '미래 지향, 인내와 적응 중시',
    color: '#8B5CF6'
  },
  {
    key: 'IVR',
    name: 'Indulgence',
    nameKo: '탐닉',
    description: '삶을 즐기고 욕구를 자유롭게 충족하는 정도 vs 사회적 규범으로 억제하는 정도',
    lowDescription: '절제, 억제적 사회',
    highDescription: '자유로운 욕구 충족, 삶의 즐거움 추구',
    color: '#EF4444'
  }
];

export const countries: Country[] = [
  // Contest 클러스터 - Hofstede Insights 공식 데이터
  { code: 'USA', name: 'United States', nameKo: '미국', cluster: 'contest', dimensions: { PDI: 40, IDV: 91, UAI: 46, MAS: 62, LTO: 26, IVR: 68 } },
  { code: 'GBR', name: 'United Kingdom', nameKo: '영국', cluster: 'contest', dimensions: { PDI: 35, IDV: 89, UAI: 35, MAS: 66, LTO: 51, IVR: 69 } },
  { code: 'AUS', name: 'Australia', nameKo: '호주', cluster: 'contest', dimensions: { PDI: 38, IDV: 90, UAI: 51, MAS: 61, LTO: 21, IVR: 71 } },
  { code: 'IRL', name: 'Ireland', nameKo: '아일랜드', cluster: 'contest', dimensions: { PDI: 28, IDV: 70, UAI: 35, MAS: 68, LTO: 24, IVR: 65 } },
  { code: 'NZL', name: 'New Zealand', nameKo: '뉴질랜드', cluster: 'contest', dimensions: { PDI: 22, IDV: 79, UAI: 49, MAS: 58, LTO: 33, IVR: 75 } },

  // Network 클러스터
  { code: 'DNK', name: 'Denmark', nameKo: '덴마크', cluster: 'network', dimensions: { PDI: 18, IDV: 74, UAI: 23, MAS: 16, LTO: 35, IVR: 70 } },
  { code: 'NLD', name: 'Netherlands', nameKo: '네덜란드', cluster: 'network', dimensions: { PDI: 38, IDV: 80, UAI: 53, MAS: 14, LTO: 67, IVR: 68 } },
  { code: 'NOR', name: 'Norway', nameKo: '노르웨이', cluster: 'network', dimensions: { PDI: 31, IDV: 69, UAI: 50, MAS: 8, LTO: 35, IVR: 55 } },
  { code: 'SWE', name: 'Sweden', nameKo: '스웨덴', cluster: 'network', dimensions: { PDI: 31, IDV: 71, UAI: 29, MAS: 5, LTO: 53, IVR: 78 } },
  { code: 'FIN', name: 'Finland', nameKo: '핀란드', cluster: 'network', dimensions: { PDI: 33, IDV: 63, UAI: 59, MAS: 26, LTO: 38, IVR: 57 } },

  // Family 클러스터
  { code: 'CHN', name: 'China', nameKo: '중국', cluster: 'family', dimensions: { PDI: 80, IDV: 20, UAI: 30, MAS: 66, LTO: 77, IVR: 24 } },
  { code: 'HKG', name: 'Hong Kong', nameKo: '홍콩', cluster: 'family', dimensions: { PDI: 68, IDV: 25, UAI: 29, MAS: 57, LTO: 61, IVR: 17 } },
  { code: 'IND', name: 'India', nameKo: '인도', cluster: 'family', dimensions: { PDI: 77, IDV: 48, UAI: 40, MAS: 56, LTO: 51, IVR: 26 } },
  { code: 'IDN', name: 'Indonesia', nameKo: '인도네시아', cluster: 'family', dimensions: { PDI: 78, IDV: 14, UAI: 48, MAS: 46, LTO: 62, IVR: 38 } },
  { code: 'MYS', name: 'Malaysia', nameKo: '말레이시아', cluster: 'family', dimensions: { PDI: 100, IDV: 26, UAI: 36, MAS: 50, LTO: 41, IVR: 57 } },
  { code: 'PHL', name: 'Philippines', nameKo: '필리핀', cluster: 'family', dimensions: { PDI: 94, IDV: 32, UAI: 44, MAS: 64, LTO: 27, IVR: 42 } },
  { code: 'SGP', name: 'Singapore', nameKo: '싱가포르', cluster: 'family', dimensions: { PDI: 74, IDV: 20, UAI: 8, MAS: 48, LTO: 72, IVR: 46 } },

  // Pyramid 클러스터
  { code: 'BRA', name: 'Brazil', nameKo: '브라질', cluster: 'pyramid', dimensions: { PDI: 69, IDV: 38, UAI: 76, MAS: 49, LTO: 44, IVR: 59 } },
  { code: 'CHL', name: 'Chile', nameKo: '칠레', cluster: 'pyramid', dimensions: { PDI: 63, IDV: 23, UAI: 86, MAS: 28, LTO: 31, IVR: 68 } },
  { code: 'COL', name: 'Colombia', nameKo: '콜롬비아', cluster: 'pyramid', dimensions: { PDI: 67, IDV: 13, UAI: 80, MAS: 64, LTO: 13, IVR: 83 } },
  { code: 'GRC', name: 'Greece', nameKo: '그리스', cluster: 'pyramid', dimensions: { PDI: 60, IDV: 35, UAI: 100, MAS: 57, LTO: 45, IVR: 50 } },
  { code: 'KOR', name: 'South Korea', nameKo: '대한민국', cluster: 'machine', dimensions: { PDI: 60, IDV: 58, UAI: 85, MAS: 39, LTO: 86, IVR: 29 } },
  // IDV updated: 18 → 58 (Hofstede Insights 2023 revision; reflects post-COVID individualization trend)
  // cluster: pyramid → machine (per getDimensionLevel: PDI 60=medium, IDV 58=medium/mixed, UAI 85=high; pyramid requires PDI=high+IDV=low which is no longer satisfied, machine matches PDI=medium+IDV=mixed+UAI=high)
  { code: 'MEX', name: 'Mexico', nameKo: '멕시코', cluster: 'pyramid', dimensions: { PDI: 81, IDV: 30, UAI: 82, MAS: 69, LTO: 24, IVR: 97 } },
  { code: 'PER', name: 'Peru', nameKo: '페루', cluster: 'pyramid', dimensions: { PDI: 64, IDV: 16, UAI: 87, MAS: 42, LTO: 25, IVR: 46 } },
  { code: 'PRT', name: 'Portugal', nameKo: '포르투갈', cluster: 'pyramid', dimensions: { PDI: 63, IDV: 27, UAI: 99, MAS: 31, LTO: 28, IVR: 33 } },
  { code: 'RUS', name: 'Russia', nameKo: '러시아', cluster: 'pyramid', dimensions: { PDI: 93, IDV: 39, UAI: 95, MAS: 36, LTO: 81, IVR: 20 } },
  { code: 'TWN', name: 'Taiwan', nameKo: '대만', cluster: 'pyramid', dimensions: { PDI: 58, IDV: 17, UAI: 69, MAS: 45, LTO: 93, IVR: 49 } },
  { code: 'THA', name: 'Thailand', nameKo: '태국', cluster: 'pyramid', dimensions: { PDI: 64, IDV: 20, UAI: 64, MAS: 34, LTO: 32, IVR: 45 } },
  { code: 'TUR', name: 'Turkey', nameKo: '튀르키예', cluster: 'pyramid', dimensions: { PDI: 66, IDV: 37, UAI: 85, MAS: 45, LTO: 46, IVR: 49 } },
  { code: 'VEN', name: 'Venezuela', nameKo: '베네수엘라', cluster: 'pyramid', dimensions: { PDI: 81, IDV: 12, UAI: 76, MAS: 73, LTO: 16, IVR: 100 } },
  { code: 'JPN', name: 'Japan', nameKo: '일본', cluster: 'pyramid', dimensions: { PDI: 54, IDV: 46, UAI: 92, MAS: 95, LTO: 88, IVR: 42 } },

  // Solar System 클러스터
  { code: 'BEL', name: 'Belgium', nameKo: '벨기에', cluster: 'solarSystem', dimensions: { PDI: 65, IDV: 75, UAI: 94, MAS: 54, LTO: 82, IVR: 57 } },
  { code: 'FRA', name: 'France', nameKo: '프랑스', cluster: 'solarSystem', dimensions: { PDI: 68, IDV: 71, UAI: 86, MAS: 43, LTO: 63, IVR: 48 } },
  { code: 'ITA', name: 'Italy', nameKo: '이탈리아', cluster: 'solarSystem', dimensions: { PDI: 50, IDV: 76, UAI: 75, MAS: 70, LTO: 61, IVR: 30 } },
  { code: 'ESP', name: 'Spain', nameKo: '스페인', cluster: 'solarSystem', dimensions: { PDI: 57, IDV: 51, UAI: 86, MAS: 42, LTO: 48, IVR: 44 } },
  { code: 'POL', name: 'Poland', nameKo: '폴란드', cluster: 'solarSystem', dimensions: { PDI: 68, IDV: 60, UAI: 93, MAS: 64, LTO: 38, IVR: 29 } },

  // Machine 클러스터
  { code: 'AUT', name: 'Austria', nameKo: '오스트리아', cluster: 'machine', dimensions: { PDI: 11, IDV: 55, UAI: 70, MAS: 79, LTO: 60, IVR: 63 } },
  { code: 'CZE', name: 'Czech Republic', nameKo: '체코', cluster: 'machine', dimensions: { PDI: 57, IDV: 58, UAI: 74, MAS: 57, LTO: 70, IVR: 29 } },
  { code: 'DEU', name: 'Germany', nameKo: '독일', cluster: 'machine', dimensions: { PDI: 35, IDV: 67, UAI: 65, MAS: 66, LTO: 83, IVR: 40 } },
  { code: 'HUN', name: 'Hungary', nameKo: '헝가리', cluster: 'machine', dimensions: { PDI: 46, IDV: 80, UAI: 82, MAS: 88, LTO: 58, IVR: 31 } },
  { code: 'CHE', name: 'Switzerland', nameKo: '스위스', cluster: 'machine', dimensions: { PDI: 34, IDV: 68, UAI: 58, MAS: 70, LTO: 74, IVR: 66 } },
];

export const clusterOrder: ClusterType[] = ['contest', 'network', 'family', 'pyramid', 'solarSystem', 'machine'];

export const getCountriesByCluster = (cluster: ClusterType): Country[] => {
  return countries.filter(c => c.cluster === cluster);
};

export const getDimensionLevel = (value: number): 'low' | 'medium' | 'high' => {
  if (value <= 35) return 'low';
  if (value <= 65) return 'medium';
  return 'high';
};

export const getDimensionLevelKo = (value: number): string => {
  const level = getDimensionLevel(value);
  switch (level) {
    case 'low': return '낮음';
    case 'medium': return '중간';
    case 'high': return '높음';
  }
};
