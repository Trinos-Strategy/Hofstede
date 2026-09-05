/**
 * Hofstede Cultural Dimensions Comparison Tool - Translations
 *
 * Supports Korean (ko) and English (en)
 * Note: MAS dimension is translated as '성취 중시' (Achievement Focus) instead of '남성성' (Masculinity)
 */

export type Language = 'ko' | 'en';

export type TranslationKeys = {
  // App header
  appTitle: string;
  appSubtitle: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroStatCountries: string;
  heroStatDimensions: string;
  heroStatClusters: string;
  heroArtAlt: string;
  info: string;

  // Info panel
  infoTitle: string;
  infoDescription: string;

  // Dimension tags
  pdiTag: string;
  idvTag: string;
  uaiTag: string;
  masTag: string;
  ltoTag: string;
  ivrTag: string;

  // Country selection
  countrySelection: string;
  maxCount: string;
  selectCountry: string;
  addCountry: string;
  maxSelectionComplete: string;
  searchCountry: string;
  noSearchResults: string;

  // Section titles
  cultureDimensionComparison: string;
  compareDimensionsDescription: string;
  radarChart: string;
  sixDimensionComparison: string;
  exportPng: string;
  vsBiggestGap: string;
  vsBarsLabel: string;
  vsRadarLabel: string;
  dimensionBarComparison: string;
  detailedDimensionComparison: string;

  // Cultural clusters
  culturalClusters: string;
  clickFilterDoubleClickDetails: string;
  tapFilterInfoDetails: string;
  classificationBasis: string;
  classificationDescription: string;
  selectedLabel: string;
  selectCluster: string;
  resetFilter: string;
  close: string;

  // Cluster names
  clusterContest: string;
  clusterNetwork: string;
  clusterFamily: string;
  clusterPyramid: string;
  clusterSolarSystem: string;
  clusterMachine: string;

  // Cluster concepts
  conceptContest: string;
  conceptNetwork: string;
  conceptFamily: string;
  conceptPyramid: string;
  conceptSolarSystem: string;
  conceptMachine: string;

  // Cluster descriptions
  descContest: string;
  descNetwork: string;
  descFamily: string;
  descPyramid: string;
  descSolarSystem: string;
  descMachine: string;

  // Cluster detail modal
  clusterDescription: string;
  coreValues: string;
  memberCountries: string;

  // Cluster values - Contest
  contestValue1: string;
  contestValue2: string;
  contestValue3: string;
  contestValue4: string;

  // Cluster values - Network
  networkValue1: string;
  networkValue2: string;
  networkValue3: string;
  networkValue4: string;

  // Cluster values - Family
  familyValue1: string;
  familyValue2: string;
  familyValue3: string;
  familyValue4: string;

  // Cluster values - Pyramid
  pyramidValue1: string;
  pyramidValue2: string;
  pyramidValue3: string;
  pyramidValue4: string;

  // Cluster values - Solar System
  solarSystemValue1: string;
  solarSystemValue2: string;
  solarSystemValue3: string;
  solarSystemValue4: string;

  // Cluster values - Machine
  machineValue1: string;
  machineValue2: string;
  machineValue3: string;
  machineValue4: string;

  // Dimensions
  dimensionPDI: string;
  dimensionIDV: string;
  dimensionUAI: string;
  dimensionMAS: string;
  dimensionLTO: string;
  dimensionIVR: string;

  // Dimension full names (English)
  dimensionPDIFull: string;
  dimensionIDVFull: string;
  dimensionUAIFull: string;
  dimensionMASFull: string;
  dimensionLTOFull: string;
  dimensionIVRFull: string;

  // Dimension descriptions
  descPDI: string;
  descIDV: string;
  descUAI: string;
  descMAS: string;
  descLTO: string;
  descIVR: string;

  // Dimension low/high descriptions
  pdiLow: string;
  pdiHigh: string;
  idvLow: string;
  idvHigh: string;
  uaiLow: string;
  uaiHigh: string;
  masLow: string;
  masHigh: string;
  ltoLow: string;
  ltoHigh: string;
  ivrLow: string;
  ivrHigh: string;

  // Dimension levels
  levelLow: string;
  levelMedium: string;
  levelHigh: string;

  // Comparison table
  country: string;
  cluster: string;
  coreDimensions: string;
  extendedDimensions: string;
  dimension: string;
  difference: string;
  scrollHorizontal: string;
  selectCountryToShowTable: string;
  selectCountryToShowRadar: string;

  // Bilateral advice
  bilateralAdvice: string;
  bilateralAdviceDescription: string;
  frameworkLabel: string;
  frameworkDescription: string;
  analysisFrameworkLabel: string;
  analysisFrameworkDescription: string;

  // Guidance messages
  selectTwoCountriesFirst: string;
  selectOneMoreCountry: string;
  bilateralOnlyForTwoCountries: string;
  selectSituationAbove: string;

  // Context selection
  selectSituation: string;
  whatSituationAdvice: string;

  // Advice contexts
  contextMeetingIdea: string;
  contextMeetingIdeaDesc: string;
  contextDisagreeBoss: string;
  contextDisagreeBossDesc: string;
  contextReporting: string;
  contextReportingDesc: string;
  contextRewardRecognition: string;
  contextRewardRecognitionDesc: string;
  contextTeamCollaboration: string;
  contextTeamCollaborationDesc: string;
  contextNegotiation: string;
  contextNegotiationDesc: string;
  contextFeedback: string;
  contextFeedbackDesc: string;
  contextConflictResolution: string;
  contextConflictResolutionDesc: string;

  // Radar chart
  countryProfile: string;
  highestDimension: string;
  lowestDimension: string;
  profileHighPDI: string;
  profileLowPDI: string;
  profileHighIDV: string;
  profileLowIDV: string;
  profileHighUAI: string;
  profileLowUAI: string;
  profileHighMAS: string;
  profileLowMAS: string;
  profileHighLTO: string;
  profileLowLTO: string;
  profileHighIVR: string;
  profileLowIVR: string;

  // Bilateral negotiation advice
  adviceExpandHint: string;
  bilateralAdviceFor: string;
  mutualUnderstandingTitle: string;
  dosRecommended: string;
  dontsNotRecommended: string;
  keyCulturalDifferences: string;
  commonGround: string;
  successStrategy: string;
  keyStrategies: string;
  dosAndDonts: string;
  culturalBackground: string;
  culturalDimensionComparison: string;
  academicReferences: string;

  // Dark mode
  darkMode: string;
  lightMode: string;

  // PNG Export
  saveChart: string;
  savingChart: string;

  // Error Boundary
  errorTitle: string;
  errorDescription: string;
  reloadPage: string;

  // Hamburger menu
  menu: string;
  dimensionComparison: string;
  clusterInfo: string;
  closeMenu: string;
  openMenu: string;

  // Footer
  copyright: string;
  basedOn: string;
  dataSource: string;
  contact: string;

  // Countries (nameKo)
  countryUSA: string;
  countryGBR: string;
  countryAUS: string;
  countryIRL: string;
  countryNZL: string;
  countryDNK: string;
  countryNLD: string;
  countryNOR: string;
  countrySWE: string;
  countryFIN: string;
  countryCHN: string;
  countryHKG: string;
  countryIND: string;
  countryIDN: string;
  countryMYS: string;
  countryPHL: string;
  countrySGP: string;
  countryBRA: string;
  countryCHL: string;
  countryCOL: string;
  countryGRC: string;
  countryKOR: string;
  countryMEX: string;
  countryPER: string;
  countryPRT: string;
  countryRUS: string;
  countryTWN: string;
  countryTHA: string;
  countryTUR: string;
  countryVEN: string;
  countryJPN: string;
  countryBEL: string;
  countryFRA: string;
  countryITA: string;
  countryESP: string;
  countryPOL: string;
  countryAUT: string;
  countryCZE: string;
  countryDEU: string;
  countryHUN: string;
  countryCHE: string;
};

export const translations: Record<Language, TranslationKeys> = {
  ko: {
    // App header
    appTitle: '호프스테드 문화 차원 비교',
    appSubtitle: '글로벌 비즈니스를 위한 문화 지능',
    heroTitle: '문화 지성',
    heroSubtitle: '데이터 기반 인사이트로 탐색하는 문화적 복잡성',
    heroBadge: '데이터 기반 문화 인텔리전스',
    heroCtaPrimary: '국가 비교 시작',
    heroCtaSecondary: 'Hofstede 차원 알아보기',
    heroStatCountries: '42개국',
    heroStatDimensions: '6대 차원',
    heroStatClusters: '6개 클러스터',
    heroArtAlt: '황금빛 세계지도 아트',
    info: '정보',

    // Info panel
    infoTitle: 'Hofstede 문화 차원 이론',
    infoDescription: 'Geert Hofstede의 문화 차원 이론은 국가 간 문화적 차이를 6가지 차원으로 분석합니다. 이 도구는 Huib Wursten의 "Mental Images" 연구를 기반으로 국가들을 6개의 문화 클러스터로 분류하고, 상황별 문화 조언을 제공합니다.',

    // Dimension tags
    pdiTag: 'PDI: 권력 거리',
    idvTag: 'IDV: 개인주의',
    uaiTag: 'UAI: 불확실성 회피',
    masTag: 'MAS: 성취 중시',
    ltoTag: 'LTO: 장기 지향성',
    ivrTag: 'IVR: 탐닉',

    // Country selection
    countrySelection: '국가 선택',
    maxCount: '최대 3개',
    selectCountry: '국가를 선택하세요 (최대 {max}개)',
    addCountry: '국가 추가...',
    maxSelectionComplete: '최대 선택 완료',
    searchCountry: '국가 검색...',
    noSearchResults: '검색 결과가 없습니다',

    // Section titles
    cultureDimensionComparison: '문화 차원 비교',
    compareDimensionsDescription: '1~3개국 선택 시 Hofstede 차원을 비교합니다',
    radarChart: '레이더 차트',
    exportPng: '차트를 PNG로 저장',
    sixDimensionComparison: '6차원 비교',
    vsBiggestGap: '가장 큰 차이',
    vsBarsLabel: '막대 비교',
    vsRadarLabel: '레이더',
    dimensionBarComparison: '차원별 막대 비교',
    detailedDimensionComparison: '차원 상세 비교',

    // Cultural clusters
    culturalClusters: '문화 클러스터',
    clickFilterDoubleClickDetails: '클릭: 필터 · 더블클릭: 상세정보',
    tapFilterInfoDetails: '탭: 필터 · ℹ️: 상세정보',
    classificationBasis: 'ℹ️ 분류 기준:',
    classificationDescription: 'Wursten의 문화 클러스터는 Hofstede의 4개 핵심 차원(PDI, IDV, UAI, MAS)을 기반으로 분류됩니다.',
    selectedLabel: '선택됨:',
    selectCluster: '클러스터 선택하기 ↓',
    resetFilter: '필터 초기화',
    close: '닫기',

    // Cluster names
    clusterContest: '경쟁',
    clusterNetwork: '네트워크',
    clusterFamily: '가족',
    clusterPyramid: '피라미드',
    clusterSolarSystem: '태양계',
    clusterMachine: '기계',

    // Cluster concepts
    conceptContest: '경쟁 중심',
    conceptNetwork: '합의 중심',
    conceptFamily: '충성심·위계',
    conceptPyramid: '충성심·위계·암묵적 질서',
    conceptSolarSystem: '위계·비인격적 관료제',
    conceptMachine: '질서·시스템',

    // Cluster descriptions
    descContest: '개인의 성취와 경쟁을 중시하며, 수평적 관계와 변화를 수용하는 문화',
    descNetwork: '평등한 의사결정과 협력을 중시하며, 개인 의견을 존중하면서도 조화를 추구하는 문화',
    descFamily: '명확한 상하 질서와 집단 충성을 중시하며, 상황에 유연하게 적응하는 문화',
    descPyramid: '권위를 존중하고 집단 충성과 규칙·관행을 중시하는 문화',
    descSolarSystem: '제도적 권위와 절차·규범을 중시하면서도 개인의 역할과 지위를 구분하는 문화',
    descMachine: '정확성과 예측 가능성을 중시하며, 기능적 위계와 명확한 책임을 강조하는 문화',

    // Cluster detail modal
    clusterDescription: '클러스터 설명',
    coreValues: '핵심 가치관',
    memberCountries: '소속 국가 ({count}개국)',

    // Cluster values - Contest
    contestValue1: '개인의 성취와 경쟁을 통한 성공 추구',
    contestValue2: '수평적이고 실력주의적인 관계',
    contestValue3: '변화와 혁신에 대한 개방성',
    contestValue4: '직접적이고 명확한 커뮤니케이션',

    // Cluster values - Network
    networkValue1: '합의와 협력을 통한 의사결정',
    networkValue2: '평등과 개인 의견 존중',
    networkValue3: '삶의 질과 워라밸 중시',
    networkValue4: '간접적이고 조화로운 소통',

    // Cluster values - Family
    familyValue1: '가족적 유대와 충성심 중시',
    familyValue2: '어른과 권위에 대한 존경',
    familyValue3: '관계 중심의 비즈니스',
    familyValue4: '유연하고 상황에 따른 규칙 적용',

    // Cluster values - Pyramid
    pyramidValue1: '명확한 위계질서와 역할 구분',
    pyramidValue2: '집단의 조화와 안정 중시',
    pyramidValue3: '규칙과 절차에 대한 존중',
    pyramidValue4: '장기적 관계와 신뢰 구축',

    // Cluster values - Solar System
    solarSystemValue1: '제도적 권위와 전문성 존중',
    solarSystemValue2: '개인의 역할과 책임 명확화',
    solarSystemValue3: '공식적 절차와 규범 준수',
    solarSystemValue4: '논리적이고 분석적인 접근',

    // Cluster values - Machine
    machineValue1: '정확성과 효율성 추구',
    machineValue2: '체계적이고 예측 가능한 시스템',
    machineValue3: '기술과 전문 지식 중시',
    machineValue4: '명확한 책임과 결과 중심',

    // Dimensions
    dimensionPDI: '권력 거리',
    dimensionIDV: '개인주의',
    dimensionUAI: '불확실성 회피',
    dimensionMAS: '성취 중시',
    dimensionLTO: '장기 지향성',
    dimensionIVR: '탐닉',

    // Dimension full names (English)
    dimensionPDIFull: 'Power Distance',
    dimensionIDVFull: 'Individualism',
    dimensionUAIFull: 'Uncertainty Avoidance',
    dimensionMASFull: 'Motivation towards Achievement and Success',
    dimensionLTOFull: 'Long Term Orientation',
    dimensionIVRFull: 'Indulgence',

    // Dimension descriptions
    descPDI: '사회에서 권력이 덜한 구성원이 권력 불평등을 수용하는 정도',
    descIDV: '개인과 집단 중 어디에 우선순위를 두는지의 정도',
    descUAI: '불확실한 상황이나 모호함을 회피하려는 정도',
    descMAS: '성취와 경쟁 지향 vs 배려와 삶의 질 지향 정도',
    descLTO: '미래를 위한 준비와 인내를 중시하는 정도 vs 전통과 단기적 결과를 중시하는 정도',
    descIVR: '삶을 즐기고 욕구를 자유롭게 충족하는 정도 vs 사회적 규범으로 억제하는 정도',

    // Dimension low/high descriptions
    pdiLow: '평등한 관계, 수평적 의사결정',
    pdiHigh: '위계 존중, 권위 수용',
    idvLow: '집단 중시, 소속감 강조',
    idvHigh: '개인 중시, 자율성 강조',
    uaiLow: '변화 수용, 유연함',
    uaiHigh: '규칙 선호, 안정 추구',
    masLow: '배려 지향, 삶의 질 중시',
    masHigh: '성취 지향, 경쟁 중시',
    ltoLow: '전통 존중, 단기적 결과 중시',
    ltoHigh: '미래 지향, 인내와 적응 중시',
    ivrLow: '절제, 억제적 사회',
    ivrHigh: '자유로운 욕구 충족, 삶의 즐거움 추구',

    // Dimension levels
    levelLow: '낮음',
    levelMedium: '중간',
    levelHigh: '높음',

    // Comparison table
    country: '국가',
    cluster: '클러스터',
    coreDimensions: '핵심 차원 (Wursten 클러스터 기준)',
    extendedDimensions: '추가 차원 (Hofstede 확장)',
    dimension: '차원',
    difference: '차이',
    scrollHorizontal: '좌우로 스크롤하여 모든 차원 보기',
    selectCountryToShowTable: '국가를 선택하면 비교 테이블이 표시됩니다',
    selectCountryToShowRadar: '국가를 선택하면 레이더 차트가 표시됩니다',

    // Bilateral advice
    bilateralAdvice: '상황별 양국 간 조언',
    bilateralAdviceDescription: '정확히 2개국 선택 시 상호 비교 조언을 제공합니다',
    frameworkLabel: '프레임워크:',
    frameworkDescription: '양국 간 조언은 Huib Wursten의 Mental Images 프레임워크에 기반하며, 4개 핵심 차원(PDI, IDV, UAI, MAS)을 사용합니다.',
    analysisFrameworkLabel: '분석 프레임워크:',
    analysisFrameworkDescription: 'Wursten 문화 클러스터(PDI, IDV, UAI, MAS 기반)와 Hofstede 문화 차원 이론(LTO, IVR 포함)을 기반으로 합니다.',

    // Guidance messages
    selectTwoCountriesFirst: '상황별 조언을 보려면 먼저 <strong>2개 국가</strong>를 선택하세요.',
    selectOneMoreCountry: '상황별 조언을 보려면 <strong>1개 국가를 더</strong> 선택하세요. (현재: 1개국)',
    bilateralOnlyForTwoCountries: '상황별 조언은 <strong>2개 국가 간 비교</strong>에서만 제공됩니다. 1개 국가를 제거하세요.',
    selectSituationAbove: '위에서 상황을 선택하면\n양국 간 문화 조언이 표시됩니다',

    // Context selection
    selectSituation: '상황 선택',
    whatSituationAdvice: '어떤 상황에서의 조언이 필요한가요?',

    // Advice contexts
    contextMeetingIdea: '회의에서 아이디어 제안',
    contextMeetingIdeaDesc: '회의 중 새로운 아이디어를 효과적으로 제안하는 방법',
    contextDisagreeBoss: '상사와 의견 다를 때',
    contextDisagreeBossDesc: '상사와 의견 차이가 있을 때 현명하게 대처하는 방법',
    contextReporting: '보고 및 중간 점검',
    contextReportingDesc: '업무 진행 상황을 효과적으로 보고하는 방법',
    contextRewardRecognition: '성과/보상 커뮤니케이션',
    contextRewardRecognitionDesc: '성과를 인정하고 보상을 전달하는 효과적인 방법',
    contextTeamCollaboration: '팀 협업',
    contextTeamCollaborationDesc: '팀원들과 효과적으로 협업하는 방법',
    contextNegotiation: '협상',
    contextNegotiationDesc: '성공적인 협상을 위한 접근법',
    contextFeedback: '피드백 주고받기',
    contextFeedbackDesc: '피드백을 효과적으로 주고받는 방법',
    contextConflictResolution: '갈등 해결',
    contextConflictResolutionDesc: '갈등 상황을 원만하게 해결하는 방법',

    // Radar chart
    countryProfile: '국가 프로필',
    highestDimension: '최고 차원',
    lowestDimension: '최저 차원',
    profileHighPDI: '강한 위계 지향',
    profileLowPDI: '평등주의 문화',
    profileHighIDV: '강한 개인주의',
    profileLowIDV: '집단 중심 문화',
    profileHighUAI: '규칙 중시, 리스크 회피',
    profileLowUAI: '유연하고 적응력 높음',
    profileHighMAS: '성취 지향적',
    profileLowMAS: '협력 지향적',
    profileHighLTO: '장기 계획 지향',
    profileLowLTO: '전통 중시',
    profileHighIVR: '탐닉적, 즐거움 추구',
    profileLowIVR: '절제적, 규율 중시',

    // Bilateral negotiation advice
    adviceExpandHint: '섹션을 눌러 펼쳐보세요',
    bilateralAdviceFor: '양국 간 {context} 조언',
    mutualUnderstandingTitle: '{context} - 상호 이해 핵심 포인트',
    dosRecommended: "Do's (권장 사항)",
    dontsNotRecommended: "Don'ts (금지 사항)",
    keyCulturalDifferences: '주요 문화적 차이',
    commonGround: '공통 기반',
    successStrategy: '성공 전략',
    keyStrategies: '핵심 전략',
    dosAndDonts: "Do's & Don'ts",
    culturalBackground: '문화적 배경',
    culturalDimensionComparison: '문화 차원 비교',
    academicReferences: '학술 참고문헌',

    // Dark mode
    darkMode: '다크 모드',
    lightMode: '라이트 모드',

    // PNG Export
    saveChart: '차트 저장',
    savingChart: '저장 중...',

    // Error Boundary
    errorTitle: '문제가 발생했습니다',
    errorDescription: '앱 실행 중 오류가 발생했습니다. 페이지를 새로고침해 보세요.',
    reloadPage: '새로고침',

    // Hamburger menu
    menu: '메뉴',
    dimensionComparison: '차원별 비교',
    clusterInfo: '문화 클러스터 정보',
    closeMenu: '메뉴 닫기',
    openMenu: '메뉴 열기',

    // Footer
    copyright: '© 2026 Trinos Research Lab. All rights reserved.',
    basedOn: "Based on Hofstede's Cultural Dimensions Theory and Huib Wursten's \"Mental Images\" research",
    dataSource: 'Data source:',
    contact: 'Contact',

    // Countries
    countryUSA: '미국',
    countryGBR: '영국',
    countryAUS: '호주',
    countryIRL: '아일랜드',
    countryNZL: '뉴질랜드',
    countryDNK: '덴마크',
    countryNLD: '네덜란드',
    countryNOR: '노르웨이',
    countrySWE: '스웨덴',
    countryFIN: '핀란드',
    countryCHN: '중국',
    countryHKG: '홍콩',
    countryIND: '인도',
    countryIDN: '인도네시아',
    countryMYS: '말레이시아',
    countryPHL: '필리핀',
    countrySGP: '싱가포르',
    countryBRA: '브라질',
    countryCHL: '칠레',
    countryCOL: '콜롬비아',
    countryGRC: '그리스',
    countryKOR: '대한민국',
    countryMEX: '멕시코',
    countryPER: '페루',
    countryPRT: '포르투갈',
    countryRUS: '러시아',
    countryTWN: '대만',
    countryTHA: '태국',
    countryTUR: '튀르키예',
    countryVEN: '베네수엘라',
    countryJPN: '일본',
    countryBEL: '벨기에',
    countryFRA: '프랑스',
    countryITA: '이탈리아',
    countryESP: '스페인',
    countryPOL: '폴란드',
    countryAUT: '오스트리아',
    countryCZE: '체코',
    countryDEU: '독일',
    countryHUN: '헝가리',
    countryCHE: '스위스',
  },

  en: {
    // App header
    appTitle: 'Hofstede Cultural Dimensions Comparison',
    appSubtitle: 'Cultural Intelligence for Global Business',
    heroTitle: 'Cultural Intelligence',
    heroSubtitle: 'Navigating cultural complexity with data-driven insights',
    heroBadge: 'Data-driven cultural intelligence',
    heroCtaPrimary: 'Start comparing',
    heroCtaSecondary: 'Explore the dimensions',
    heroStatCountries: '42 countries',
    heroStatDimensions: '6 dimensions',
    heroStatClusters: '6 clusters',
    heroArtAlt: 'Golden world map art',
    info: 'Information',

    // Info panel
    infoTitle: "Hofstede's Cultural Dimension Theory",
    infoDescription: "Geert Hofstede's Cultural Dimension Theory analyzes cultural differences between countries across 6 dimensions. This tool classifies countries into 6 cultural clusters based on Huib Wursten's \"Mental Images\" research and provides situational cultural advice.",

    // Dimension tags
    pdiTag: 'PDI: Power Distance',
    idvTag: 'IDV: Individualism',
    uaiTag: 'UAI: Uncertainty Avoidance',
    masTag: 'MAS: Achievement Focus',
    ltoTag: 'LTO: Long-Term Orientation',
    ivrTag: 'IVR: Indulgence',

    // Country selection
    countrySelection: 'Country Selection',
    maxCount: 'Max 3',
    selectCountry: 'Select countries (max {max})',
    addCountry: 'Add country...',
    maxSelectionComplete: 'Maximum selection reached',
    searchCountry: 'Search country...',
    noSearchResults: 'No search results',

    // Section titles
    cultureDimensionComparison: 'Cultural Dimension Comparison',
    compareDimensionsDescription: 'Compare Hofstede dimensions when 1-3 countries are selected',
    radarChart: 'Radar Chart',
    exportPng: 'Export chart as PNG',
    sixDimensionComparison: '6-Dimension Comparison',
    vsBiggestGap: 'Biggest gap',
    vsBarsLabel: 'Bar compare',
    vsRadarLabel: 'Radar',
    dimensionBarComparison: 'Dimension Bar Comparison',
    detailedDimensionComparison: 'Detailed Dimension Comparison',

    // Cultural clusters
    culturalClusters: 'Cultural Clusters',
    clickFilterDoubleClickDetails: 'Click: Filter · Double-click: Details',
    tapFilterInfoDetails: 'Tap: Filter · ℹ️: Details',
    classificationBasis: 'ℹ️ Classification Basis:',
    classificationDescription: "Wursten's cultural clusters are classified based on Hofstede's 4 core dimensions (PDI, IDV, UAI, MAS).",
    selectedLabel: 'Selected:',
    selectCluster: 'Select Cluster ↓',
    resetFilter: 'Reset Filter',
    close: 'Close',

    // Cluster names
    clusterContest: 'Contest',
    clusterNetwork: 'Network',
    clusterFamily: 'Family',
    clusterPyramid: 'Pyramid',
    clusterSolarSystem: 'Solar System',
    clusterMachine: 'Machine',

    // Cluster concepts
    conceptContest: 'Competition-focused',
    conceptNetwork: 'Consensus-focused',
    conceptFamily: 'Loyalty & Hierarchy',
    conceptPyramid: 'Loyalty, Hierarchy & Implicit Order',
    conceptSolarSystem: 'Hierarchy & Impersonal Bureaucracy',
    conceptMachine: 'Order & System',

    // Cluster descriptions
    descContest: 'A culture that values individual achievement and competition, embracing horizontal relationships and change',
    descNetwork: 'A culture that values equal decision-making and cooperation, respecting individual opinions while pursuing harmony',
    descFamily: 'A culture that values clear hierarchical order and group loyalty, adapting flexibly to situations',
    descPyramid: 'A culture that respects authority and values group loyalty, rules, and conventions',
    descSolarSystem: 'A culture that values institutional authority and procedures while distinguishing individual roles and status',
    descMachine: 'A culture that values precision and predictability, emphasizing functional hierarchy and clear responsibilities',

    // Cluster detail modal
    clusterDescription: 'Cluster Description',
    coreValues: 'Core Values',
    memberCountries: 'Member Countries ({count})',

    // Cluster values - Contest
    contestValue1: 'Pursuing success through individual achievement and competition',
    contestValue2: 'Horizontal, merit-based relationships',
    contestValue3: 'Openness to change and innovation',
    contestValue4: 'Direct and clear communication',

    // Cluster values - Network
    networkValue1: 'Decision-making through consensus and cooperation',
    networkValue2: 'Equality and respect for individual opinions',
    networkValue3: 'Quality of life and work-life balance',
    networkValue4: 'Indirect and harmonious communication',

    // Cluster values - Family
    familyValue1: 'Family bonds and loyalty',
    familyValue2: 'Respect for elders and authority',
    familyValue3: 'Relationship-focused business',
    familyValue4: 'Flexible, situational rule application',

    // Cluster values - Pyramid
    pyramidValue1: 'Clear hierarchy and role distinction',
    pyramidValue2: 'Group harmony and stability',
    pyramidValue3: 'Respect for rules and procedures',
    pyramidValue4: 'Long-term relationships and trust building',

    // Cluster values - Solar System
    solarSystemValue1: 'Institutional authority and professional expertise',
    solarSystemValue2: 'Clear individual roles and responsibilities',
    solarSystemValue3: 'Adherence to formal procedures and norms',
    solarSystemValue4: 'Logical and analytical approach',

    // Cluster values - Machine
    machineValue1: 'Pursuit of accuracy and efficiency',
    machineValue2: 'Systematic and predictable systems',
    machineValue3: 'Technology and professional expertise',
    machineValue4: 'Clear responsibility and results-oriented',

    // Dimensions
    dimensionPDI: 'Power Distance',
    dimensionIDV: 'Individualism',
    dimensionUAI: 'Uncertainty Avoidance',
    dimensionMAS: 'Achievement Focus',
    dimensionLTO: 'Long-Term Orientation',
    dimensionIVR: 'Indulgence',

    // Dimension full names (English)
    dimensionPDIFull: 'Power Distance',
    dimensionIDVFull: 'Individualism',
    dimensionUAIFull: 'Uncertainty Avoidance',
    dimensionMASFull: 'Motivation towards Achievement and Success',
    dimensionLTOFull: 'Long Term Orientation',
    dimensionIVRFull: 'Indulgence',

    // Dimension descriptions
    descPDI: 'The degree to which less powerful members of a society accept power inequality',
    descIDV: 'The degree to which individuals prioritize themselves vs the group',
    descUAI: 'The degree to which people avoid uncertainty or ambiguity',
    descMAS: 'Achievement and competition orientation vs caring and quality of life orientation',
    descLTO: 'Emphasis on future preparation and perseverance vs tradition and short-term results',
    descIVR: 'The degree to which people freely satisfy desires vs restrain by social norms',

    // Dimension low/high descriptions
    pdiLow: 'Equal relationships, horizontal decision-making',
    pdiHigh: 'Respect for hierarchy, acceptance of authority',
    idvLow: 'Group-focused, emphasis on belonging',
    idvHigh: 'Individual-focused, emphasis on autonomy',
    uaiLow: 'Accepts change, flexibility',
    uaiHigh: 'Prefers rules, seeks stability',
    masLow: 'Care-oriented, quality of life important',
    masHigh: 'Achievement-oriented, competition important',
    ltoLow: 'Respects tradition, short-term results',
    ltoHigh: 'Future-oriented, patience and adaptation',
    ivrLow: 'Restraint, restrictive society',
    ivrHigh: 'Free gratification, pursuit of enjoyment',

    // Dimension levels
    levelLow: 'Low',
    levelMedium: 'Medium',
    levelHigh: 'High',

    // Comparison table
    country: 'Country',
    cluster: 'Cluster',
    coreDimensions: 'Core Dimensions (Wursten Cluster Basis)',
    extendedDimensions: 'Extended Dimensions (Hofstede)',
    dimension: 'Dimension',
    difference: 'Difference',
    scrollHorizontal: 'Scroll left/right to see all dimensions',
    selectCountryToShowTable: 'Select countries to display comparison table',
    selectCountryToShowRadar: 'Select countries to display radar chart',

    // Bilateral advice
    bilateralAdvice: 'Situational Bilateral Advice',
    bilateralAdviceDescription: 'Provides mutual comparison advice when exactly 2 countries are selected',
    frameworkLabel: 'Framework:',
    frameworkDescription: "Bilateral advice is based on Huib Wursten's Mental Images framework, using 4 core dimensions (PDI, IDV, UAI, MAS).",
    analysisFrameworkLabel: 'Analysis Framework:',
    analysisFrameworkDescription: 'Based on Wursten Cultural Clusters (PDI, IDV, UAI, MAS) and Hofstede Cultural Dimension Theory (including LTO, IVR).',

    // Guidance messages
    selectTwoCountriesFirst: 'Select <strong>2 countries</strong> first to see situational advice.',
    selectOneMoreCountry: 'Select <strong>1 more country</strong> to see situational advice. (Current: 1)',
    bilateralOnlyForTwoCountries: 'Situational advice is only available for <strong>2-country comparison</strong>. Remove 1 country.',
    selectSituationAbove: 'Select a situation above to see\nbilateral cultural advice',

    // Context selection
    selectSituation: 'Select Situation',
    whatSituationAdvice: 'What situation do you need advice for?',

    // Advice contexts
    contextMeetingIdea: 'Presenting Ideas in Meetings',
    contextMeetingIdeaDesc: 'How to effectively propose new ideas during meetings',
    contextDisagreeBoss: 'Disagreeing with Boss',
    contextDisagreeBossDesc: 'How to wisely handle disagreements with your boss',
    contextReporting: 'Reporting and Check-ins',
    contextReportingDesc: 'How to effectively report work progress',
    contextRewardRecognition: 'Performance/Reward Communication',
    contextRewardRecognitionDesc: 'Effective ways to recognize performance and deliver rewards',
    contextTeamCollaboration: 'Team Collaboration',
    contextTeamCollaborationDesc: 'How to collaborate effectively with team members',
    contextNegotiation: 'Negotiation',
    contextNegotiationDesc: 'Approaches for successful negotiation',
    contextFeedback: 'Giving and Receiving Feedback',
    contextFeedbackDesc: 'How to effectively give and receive feedback',
    contextConflictResolution: 'Conflict Resolution',
    contextConflictResolutionDesc: 'How to resolve conflict situations smoothly',

    // Radar chart
    countryProfile: 'Country Profile',
    highestDimension: 'Highest Dimension',
    lowestDimension: 'Lowest Dimension',
    profileHighPDI: 'Strong hierarchical orientation',
    profileLowPDI: 'Egalitarian culture',
    profileHighIDV: 'Highly individualistic',
    profileLowIDV: 'Collectivist culture',
    profileHighUAI: 'Rule-oriented, risk-averse',
    profileLowUAI: 'Flexible and adaptable',
    profileHighMAS: 'Achievement-driven',
    profileLowMAS: 'Collaboration-oriented',
    profileHighLTO: 'Long-term planner',
    profileLowLTO: 'Tradition-minded',
    profileHighIVR: 'Indulgent, pleasure-seeking',
    profileLowIVR: 'Restrained, disciplined',

    // Bilateral negotiation advice
    adviceExpandHint: 'Tap a section to expand',
    bilateralAdviceFor: 'Bilateral {context} Advice',
    mutualUnderstandingTitle: '{context} - Key Mutual Understanding Points',
    dosRecommended: "Do's (Recommended)",
    dontsNotRecommended: "Don'ts (Not Recommended)",
    keyCulturalDifferences: 'Key Cultural Differences',
    commonGround: 'Common Ground',
    successStrategy: 'Success Strategy',
    keyStrategies: 'Key Strategies',
    dosAndDonts: "Do's & Don'ts",
    culturalBackground: 'Cultural Background',
    culturalDimensionComparison: 'Cultural Dimension Comparison',
    academicReferences: 'Academic References',

    // Dark mode
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',

    // PNG Export
    saveChart: 'Save Chart',
    savingChart: 'Saving...',

    // Error Boundary
    errorTitle: 'Something went wrong',
    errorDescription: 'An error occurred while running the app. Please reload the page.',
    reloadPage: 'Reload',

    // Hamburger menu
    menu: 'Menu',
    dimensionComparison: 'Dimension Comparison',
    clusterInfo: 'Cultural Cluster Information',
    closeMenu: 'Close Menu',
    openMenu: 'Open Menu',

    // Footer
    copyright: '© 2026 Trinos Research Lab. All rights reserved.',
    basedOn: "Based on Hofstede's Cultural Dimensions Theory and Huib Wursten's \"Mental Images\" research",
    dataSource: 'Data source:',
    contact: 'Contact',

    // Countries
    countryUSA: 'United States',
    countryGBR: 'United Kingdom',
    countryAUS: 'Australia',
    countryIRL: 'Ireland',
    countryNZL: 'New Zealand',
    countryDNK: 'Denmark',
    countryNLD: 'Netherlands',
    countryNOR: 'Norway',
    countrySWE: 'Sweden',
    countryFIN: 'Finland',
    countryCHN: 'China',
    countryHKG: 'Hong Kong',
    countryIND: 'India',
    countryIDN: 'Indonesia',
    countryMYS: 'Malaysia',
    countryPHL: 'Philippines',
    countrySGP: 'Singapore',
    countryBRA: 'Brazil',
    countryCHL: 'Chile',
    countryCOL: 'Colombia',
    countryGRC: 'Greece',
    countryKOR: 'South Korea',
    countryMEX: 'Mexico',
    countryPER: 'Peru',
    countryPRT: 'Portugal',
    countryRUS: 'Russia',
    countryTWN: 'Taiwan',
    countryTHA: 'Thailand',
    countryTUR: 'Turkey',
    countryVEN: 'Venezuela',
    countryJPN: 'Japan',
    countryBEL: 'Belgium',
    countryFRA: 'France',
    countryITA: 'Italy',
    countryESP: 'Spain',
    countryPOL: 'Poland',
    countryAUT: 'Austria',
    countryCZE: 'Czech Republic',
    countryDEU: 'Germany',
    countryHUN: 'Hungary',
    countryCHE: 'Switzerland',
  },
};

/**
 * Helper function to get translation by key
 */
export function getTranslation(language: Language, key: keyof TranslationKeys): string {
  return translations[language][key];
}

/**
 * Helper function to interpolate variables in translation strings
 * Usage: interpolate("Select countries (max {max})", { max: 3 })
 */
export function interpolate(text: string, variables: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, key) => String(variables[key] ?? `{${key}}`));
}

export default translations;
