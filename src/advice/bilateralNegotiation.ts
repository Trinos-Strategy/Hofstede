/**
 * 양국 간 협상 조언 생성
 * 두 국가의 문화 차원을 비교하여 상호 협상 시 유의사항을 제공합니다.
 */

import type {
  CountryProfile,
  BilateralAdviceResult,
  MutualUnderstandingBlock,
  AdviceBlock,
  DimensionGap,
} from '../types';

/**
 * 두 국가 간의 차원별 차이를 분석합니다.
 */
function analyzeDimensionGaps(
  profileA: CountryProfile,
  profileB: CountryProfile
): DimensionGap[] {
  const gaps: DimensionGap[] = [];

  // PDI 분석
  const pdiGap = Math.abs(profileA.dimensions.pdi - profileB.dimensions.pdi);
  gaps.push({
    dimension: 'PDI',
    valueA: profileA.dimensions.pdi,
    valueB: profileB.dimensions.pdi,
    gap: pdiGap,
    significance: pdiGap >= 30 ? 'high' : pdiGap >= 15 ? 'medium' : 'low',
  });

  // IDV 분석
  const idvGap = Math.abs(profileA.dimensions.idv - profileB.dimensions.idv);
  gaps.push({
    dimension: 'IDV',
    valueA: profileA.dimensions.idv,
    valueB: profileB.dimensions.idv,
    gap: idvGap,
    significance: idvGap >= 40 ? 'high' : idvGap >= 20 ? 'medium' : 'low',
  });

  // UAI 분석
  const uaiGap = Math.abs(profileA.dimensions.uai - profileB.dimensions.uai);
  gaps.push({
    dimension: 'UAI',
    valueA: profileA.dimensions.uai,
    valueB: profileB.dimensions.uai,
    gap: uaiGap,
    significance: uaiGap >= 30 ? 'high' : uaiGap >= 15 ? 'medium' : 'low',
  });

  // MAS 분석 (optional)
  if (profileA.dimensions.mas !== undefined && profileB.dimensions.mas !== undefined) {
    const masGap = Math.abs(profileA.dimensions.mas - profileB.dimensions.mas);
    gaps.push({
      dimension: 'MAS',
      valueA: profileA.dimensions.mas,
      valueB: profileB.dimensions.mas,
      gap: masGap,
      significance: masGap >= 30 ? 'high' : masGap >= 15 ? 'medium' : 'low',
    });
  }

  return gaps;
}

/**
 * A국가가 B국가와 협상할 때의 조언을 생성합니다.
 */
function generateAdviceFromAtoB(
  profileA: CountryProfile,
  profileB: CountryProfile,
  gaps: DimensionGap[]
): AdviceBlock {
  const nameA = profileA.nameKo || profileA.name;
  const nameB = profileB.nameKo || profileB.name;
  const bullets: string[] = [];

  // PDI 기반 조언
  const pdiGap = gaps.find((g) => g.dimension === 'PDI');
  if (pdiGap) {
    if (profileB.dimensions.pdi > profileA.dimensions.pdi + 15) {
      // B가 더 위계적
      bullets.push(
        '상대국은 위계를 중시합니다. 의사결정권자를 파악하고 적절히 존중하세요.'
      );
      bullets.push(
        '실무자 단독으로 즉답하기 어려울 수 있으니, 의사결정 시간을 충분히 확보하세요.'
      );
    } else if (profileB.dimensions.pdi < profileA.dimensions.pdi - 15) {
      // B가 더 평등적
      bullets.push(
        '상대국은 수평적 문화입니다. 직급보다 역할과 전문성에 초점을 맞추세요.'
      );
      bullets.push(
        '현장 담당자도 상당한 결정 권한이 있으니, 실무 협의가 효과적입니다.'
      );
    }
  }

  // IDV 기반 조언
  const idvGap = gaps.find((g) => g.dimension === 'IDV');
  if (idvGap) {
    if (profileB.dimensions.idv > profileA.dimensions.idv + 20) {
      // B가 더 개인주의적
      bullets.push(
        '직접적이고 명확한 의사 표현을 선호합니다. 에둘러 말하기보다 분명하게 요구사항을 제시하세요.'
      );
      bullets.push(
        '개인의 성과와 이익을 강조하세요. 팀보다 개인별 인센티브가 효과적입니다.'
      );
    } else if (profileB.dimensions.idv < profileA.dimensions.idv - 20) {
      // B가 더 집단주의적
      bullets.push(
        '관계 구축에 시간을 투자하세요. 비즈니스 외 신뢰 형성이 중요합니다.'
      );
      bullets.push(
        '팀 전체의 이익과 조직 차원의 가치를 강조하면 공감을 얻기 쉽습니다.'
      );
    }
  }

  // UAI 기반 조언
  const uaiGap = gaps.find((g) => g.dimension === 'UAI');
  if (uaiGap) {
    if (profileB.dimensions.uai > profileA.dimensions.uai + 15) {
      // B가 더 불확실성 회피
      bullets.push(
        '상세한 계획과 문서화를 중시합니다. 구두 합의만으로는 부족할 수 있습니다.'
      );
      bullets.push(
        '예상 시나리오와 리스크 대응 방안을 미리 준비하면 신뢰를 얻을 수 있습니다.'
      );
    } else if (profileB.dimensions.uai < profileA.dimensions.uai - 15) {
      // B가 더 불확실성 수용
      bullets.push(
        '유연한 협상이 가능합니다. 큰 틀에서 합의하고 세부사항은 진행하며 조정하세요.'
      );
      bullets.push(
        '과도한 문서화나 절차보다 실질적 진행을 더 중요하게 여깁니다.'
      );
    }
  }

  // MAS 기반 조언
  const masGap = gaps.find((g) => g.dimension === 'MAS');
  if (masGap && masGap.significance !== 'low') {
    if (profileB.dimensions.mas! > profileA.dimensions.mas! + 20) {
      bullets.push(
        '성과와 경쟁을 중시합니다. 구체적인 성과 지표와 목표를 명확히 하세요.'
      );
    } else if (profileB.dimensions.mas! < profileA.dimensions.mas! - 20) {
      bullets.push(
        '협력과 삶의 질을 중시합니다. 윈-윈 관계와 장기적 파트너십을 강조하세요.'
      );
    }
  }

  // 기본 조언 (차이가 크지 않을 때)
  if (bullets.length === 0) {
    bullets.push(
      '두 문화 간 큰 차이가 없어 자연스러운 소통이 가능합니다.'
    );
    bullets.push(
      '상호 존중과 명확한 의사소통을 유지하면 원활한 협상이 가능합니다.'
    );
  }

  return {
    title: `${nameA} → ${nameB} 협상 시 유의사항`,
    titleKo: `${nameA} → ${nameB} 협상 시 유의사항`,
    bullets,
  };
}

/**
 * 상호 이해를 위한 핵심 포인트를 생성합니다.
 */
function generateMutualUnderstanding(
  profileA: CountryProfile,
  profileB: CountryProfile,
  gaps: DimensionGap[]
): MutualUnderstandingBlock {
  const nameA = profileA.nameKo || profileA.name;
  const nameB = profileB.nameKo || profileB.name;

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

  // 가교 전략 (Bridging Strategy)
  let bridgingStrategy = '';
  if (highGaps.length >= 2) {
    bridgingStrategy = `${nameA}와 ${nameB}는 상당한 문화적 차이가 있습니다. 양측 모두 상대방의 의사결정 방식과 소통 스타일을 이해하려는 노력이 필요합니다. 초기 신뢰 구축에 시간을 투자하고, 중요한 합의는 명확히 문서화하는 것이 좋습니다.`;
  } else if (highGaps.length === 1) {
    const mainGap = highGaps[0];
    switch (mainGap.dimension) {
      case 'PDI':
        bridgingStrategy = `${
          mainGap.valueA > mainGap.valueB ? nameB : nameA
        } 측은 의사결정 과정의 차이를 이해하고, ${
          mainGap.valueA > mainGap.valueB ? nameA : nameB
        } 측은 보다 직접적인 소통을 시도할 때 효과적입니다.`;
        break;
      case 'IDV':
        bridgingStrategy = `${
          mainGap.valueA > mainGap.valueB ? nameA : nameB
        } 측은 관계 구축에 시간을 투자하고, ${
          mainGap.valueA > mainGap.valueB ? nameB : nameA
        } 측은 명확한 이익 구조를 제시할 때 효과적입니다.`;
        break;
      case 'UAI':
        bridgingStrategy = `${
          mainGap.valueA > mainGap.valueB ? nameB : nameA
        } 측은 유연성을 발휘하고, ${
          mainGap.valueA > mainGap.valueB ? nameA : nameB
        } 측은 핵심 사항의 명확한 문서화를 요청할 때 효과적입니다.`;
        break;
      default:
        bridgingStrategy = `양측이 서로의 문화적 차이를 인정하고 유연하게 대응할 때 효과적입니다.`;
    }
  } else {
    bridgingStrategy = `두 문화는 비교적 유사하여 자연스러운 협력이 가능합니다. 기본적인 비즈니스 예의와 명확한 소통을 유지하세요.`;
  }

  return {
    title: '상호 이해 핵심 포인트',
    keyDifferences,
    commonGround,
    bridgingStrategy,
  };
}

/**
 * 양국 간 협상 조언을 생성합니다.
 *
 * @param countryA - 첫 번째 국가 프로필
 * @param countryB - 두 번째 국가 프로필
 * @returns 양국 간 협상 조언 결과
 */
export function generateBilateralNegotiationAdvice(
  countryA: CountryProfile,
  countryB: CountryProfile
): BilateralAdviceResult {
  const gaps = analyzeDimensionGaps(countryA, countryB);

  return {
    countryA,
    countryB,
    fromAtoB: generateAdviceFromAtoB(countryA, countryB, gaps),
    fromBtoA: generateAdviceFromAtoB(countryB, countryA, gaps),
    mutualUnderstanding: generateMutualUnderstanding(countryA, countryB, gaps),
  };
}

/**
 * 차원 차이 분석 결과를 외부에서 사용할 수 있도록 export
 */
export { analyzeDimensionGaps };
