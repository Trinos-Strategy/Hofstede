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
    name: 'Masculinity',
    nameKo: '남성성',
    description: '성취와 경쟁(남성적) vs 배려와 삶의 질(여성적) 중시 정도',
    lowDescription: '협력, 삶의 질 중시',
    highDescription: '경쟁, 성취 중시',
    color: '#22C55E'
  }
];

export const countries: Country[] = [
  // Contest 클러스터
  { code: 'USA', name: 'United States', nameKo: '미국', cluster: 'contest', dimensions: { PDI: 40, IDV: 91, UAI: 46, MAS: 62 } },
  { code: 'GBR', name: 'United Kingdom', nameKo: '영국', cluster: 'contest', dimensions: { PDI: 35, IDV: 89, UAI: 35, MAS: 66 } },
  { code: 'AUS', name: 'Australia', nameKo: '호주', cluster: 'contest', dimensions: { PDI: 38, IDV: 90, UAI: 51, MAS: 61 } },
  { code: 'IRL', name: 'Ireland', nameKo: '아일랜드', cluster: 'contest', dimensions: { PDI: 28, IDV: 70, UAI: 35, MAS: 68 } },
  { code: 'NZL', name: 'New Zealand', nameKo: '뉴질랜드', cluster: 'contest', dimensions: { PDI: 22, IDV: 79, UAI: 49, MAS: 58 } },

  // Network 클러스터
  { code: 'DNK', name: 'Denmark', nameKo: '덴마크', cluster: 'network', dimensions: { PDI: 18, IDV: 74, UAI: 23, MAS: 16 } },
  { code: 'NLD', name: 'Netherlands', nameKo: '네덜란드', cluster: 'network', dimensions: { PDI: 38, IDV: 80, UAI: 53, MAS: 14 } },
  { code: 'NOR', name: 'Norway', nameKo: '노르웨이', cluster: 'network', dimensions: { PDI: 31, IDV: 69, UAI: 50, MAS: 8 } },
  { code: 'SWE', name: 'Sweden', nameKo: '스웨덴', cluster: 'network', dimensions: { PDI: 31, IDV: 71, UAI: 29, MAS: 5 } },
  { code: 'FIN', name: 'Finland', nameKo: '핀란드', cluster: 'network', dimensions: { PDI: 33, IDV: 63, UAI: 59, MAS: 26 } },

  // Family 클러스터
  { code: 'CHN', name: 'China', nameKo: '중국', cluster: 'family', dimensions: { PDI: 80, IDV: 20, UAI: 30, MAS: 66 } },
  { code: 'HKG', name: 'Hong Kong', nameKo: '홍콩', cluster: 'family', dimensions: { PDI: 68, IDV: 25, UAI: 29, MAS: 57 } },
  { code: 'IND', name: 'India', nameKo: '인도', cluster: 'family', dimensions: { PDI: 77, IDV: 48, UAI: 40, MAS: 56 } },
  { code: 'IDN', name: 'Indonesia', nameKo: '인도네시아', cluster: 'family', dimensions: { PDI: 78, IDV: 14, UAI: 48, MAS: 46 } },
  { code: 'MYS', name: 'Malaysia', nameKo: '말레이시아', cluster: 'family', dimensions: { PDI: 100, IDV: 26, UAI: 36, MAS: 50 } },
  { code: 'PHL', name: 'Philippines', nameKo: '필리핀', cluster: 'family', dimensions: { PDI: 94, IDV: 32, UAI: 44, MAS: 64 } },
  { code: 'SGP', name: 'Singapore', nameKo: '싱가포르', cluster: 'family', dimensions: { PDI: 74, IDV: 20, UAI: 8, MAS: 48 } },

  // Pyramid 클러스터
  { code: 'BRA', name: 'Brazil', nameKo: '브라질', cluster: 'pyramid', dimensions: { PDI: 69, IDV: 38, UAI: 76, MAS: 49 } },
  { code: 'CHL', name: 'Chile', nameKo: '칠레', cluster: 'pyramid', dimensions: { PDI: 63, IDV: 23, UAI: 86, MAS: 28 } },
  { code: 'COL', name: 'Colombia', nameKo: '콜롬비아', cluster: 'pyramid', dimensions: { PDI: 67, IDV: 13, UAI: 80, MAS: 64 } },
  { code: 'GRC', name: 'Greece', nameKo: '그리스', cluster: 'pyramid', dimensions: { PDI: 60, IDV: 35, UAI: 100, MAS: 57 } },
  { code: 'KOR', name: 'South Korea', nameKo: '대한민국', cluster: 'pyramid', dimensions: { PDI: 60, IDV: 18, UAI: 85, MAS: 39 } },
  { code: 'MEX', name: 'Mexico', nameKo: '멕시코', cluster: 'pyramid', dimensions: { PDI: 81, IDV: 30, UAI: 82, MAS: 69 } },
  { code: 'PER', name: 'Peru', nameKo: '페루', cluster: 'pyramid', dimensions: { PDI: 64, IDV: 16, UAI: 87, MAS: 42 } },
  { code: 'PRT', name: 'Portugal', nameKo: '포르투갈', cluster: 'pyramid', dimensions: { PDI: 63, IDV: 27, UAI: 99, MAS: 31 } },
  { code: 'RUS', name: 'Russia', nameKo: '러시아', cluster: 'pyramid', dimensions: { PDI: 93, IDV: 39, UAI: 95, MAS: 36 } },
  { code: 'TWN', name: 'Taiwan', nameKo: '대만', cluster: 'pyramid', dimensions: { PDI: 58, IDV: 17, UAI: 69, MAS: 45 } },
  { code: 'THA', name: 'Thailand', nameKo: '태국', cluster: 'pyramid', dimensions: { PDI: 64, IDV: 20, UAI: 64, MAS: 34 } },
  { code: 'TUR', name: 'Turkey', nameKo: '튀르키예', cluster: 'pyramid', dimensions: { PDI: 66, IDV: 37, UAI: 85, MAS: 45 } },
  { code: 'VEN', name: 'Venezuela', nameKo: '베네수엘라', cluster: 'pyramid', dimensions: { PDI: 81, IDV: 12, UAI: 76, MAS: 73 } },
  { code: 'JPN', name: 'Japan', nameKo: '일본', cluster: 'pyramid', dimensions: { PDI: 54, IDV: 46, UAI: 92, MAS: 95 } },

  // Solar System 클러스터
  { code: 'BEL', name: 'Belgium', nameKo: '벨기에', cluster: 'solarSystem', dimensions: { PDI: 65, IDV: 75, UAI: 94, MAS: 54 } },
  { code: 'FRA', name: 'France', nameKo: '프랑스', cluster: 'solarSystem', dimensions: { PDI: 68, IDV: 71, UAI: 86, MAS: 43 } },
  { code: 'ITA', name: 'Italy', nameKo: '이탈리아', cluster: 'solarSystem', dimensions: { PDI: 50, IDV: 76, UAI: 75, MAS: 70 } },
  { code: 'ESP', name: 'Spain', nameKo: '스페인', cluster: 'solarSystem', dimensions: { PDI: 57, IDV: 51, UAI: 86, MAS: 42 } },
  { code: 'POL', name: 'Poland', nameKo: '폴란드', cluster: 'solarSystem', dimensions: { PDI: 68, IDV: 60, UAI: 93, MAS: 64 } },

  // Machine 클러스터
  { code: 'AUT', name: 'Austria', nameKo: '오스트리아', cluster: 'machine', dimensions: { PDI: 11, IDV: 55, UAI: 70, MAS: 79 } },
  { code: 'CZE', name: 'Czech Republic', nameKo: '체코', cluster: 'machine', dimensions: { PDI: 57, IDV: 58, UAI: 74, MAS: 57 } },
  { code: 'DEU', name: 'Germany', nameKo: '독일', cluster: 'machine', dimensions: { PDI: 35, IDV: 67, UAI: 65, MAS: 66 } },
  { code: 'HUN', name: 'Hungary', nameKo: '헝가리', cluster: 'machine', dimensions: { PDI: 46, IDV: 80, UAI: 82, MAS: 88 } },
  { code: 'CHE', name: 'Switzerland', nameKo: '스위스', cluster: 'machine', dimensions: { PDI: 34, IDV: 68, UAI: 58, MAS: 70 } },
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
