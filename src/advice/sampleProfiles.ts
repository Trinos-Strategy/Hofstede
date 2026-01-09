/**
 * 샘플 국가 프로필
 * Hofstede 데이터를 기반으로 한 주요 국가들의 문화 프로필입니다.
 */

import type { CountryProfile, CultureType } from '../types';

// ============================================
// 주요 국가 프로필
// ============================================

export const korea: CountryProfile = {
  code: 'KR',
  name: 'South Korea',
  nameKo: '한국',
  dimensions: {
    pdi: 60,
    idv: 18,
    uai: 85,
    mas: 39,
    lto: 100,
    ivr: 29,
  },
  cultureType: 'PYRAMID',
};

export const usa: CountryProfile = {
  code: 'US',
  name: 'United States',
  nameKo: '미국',
  dimensions: {
    pdi: 40,
    idv: 91,
    uai: 46,
    mas: 62,
    lto: 26,
    ivr: 68,
  },
  cultureType: 'CONTEST',
};

export const japan: CountryProfile = {
  code: 'JP',
  name: 'Japan',
  nameKo: '일본',
  dimensions: {
    pdi: 54,
    idv: 46,
    uai: 92,
    mas: 95,
    lto: 88,
    ivr: 42,
  },
  cultureType: 'PYRAMID',
};

export const germany: CountryProfile = {
  code: 'DE',
  name: 'Germany',
  nameKo: '독일',
  dimensions: {
    pdi: 35,
    idv: 67,
    uai: 65,
    mas: 66,
    lto: 83,
    ivr: 40,
  },
  cultureType: 'MACHINE',
};

export const china: CountryProfile = {
  code: 'CN',
  name: 'China',
  nameKo: '중국',
  dimensions: {
    pdi: 80,
    idv: 20,
    uai: 30,
    mas: 66,
    lto: 87,
    ivr: 24,
  },
  cultureType: 'FAMILY',
};

export const france: CountryProfile = {
  code: 'FR',
  name: 'France',
  nameKo: '프랑스',
  dimensions: {
    pdi: 68,
    idv: 71,
    uai: 86,
    mas: 43,
    lto: 63,
    ivr: 48,
  },
  cultureType: 'SOLAR_SYSTEM',
};

export const sweden: CountryProfile = {
  code: 'SE',
  name: 'Sweden',
  nameKo: '스웨덴',
  dimensions: {
    pdi: 31,
    idv: 71,
    uai: 29,
    mas: 5,
    lto: 53,
    ivr: 78,
  },
  cultureType: 'NETWORK',
};

export const brazil: CountryProfile = {
  code: 'BR',
  name: 'Brazil',
  nameKo: '브라질',
  dimensions: {
    pdi: 69,
    idv: 38,
    uai: 76,
    mas: 49,
    lto: 44,
    ivr: 59,
  },
  cultureType: 'PYRAMID',
};

export const india: CountryProfile = {
  code: 'IN',
  name: 'India',
  nameKo: '인도',
  dimensions: {
    pdi: 77,
    idv: 48,
    uai: 40,
    mas: 56,
    lto: 51,
    ivr: 26,
  },
  cultureType: 'FAMILY',
};

export const netherlands: CountryProfile = {
  code: 'NL',
  name: 'Netherlands',
  nameKo: '네덜란드',
  dimensions: {
    pdi: 38,
    idv: 80,
    uai: 53,
    mas: 14,
    lto: 67,
    ivr: 68,
  },
  cultureType: 'NETWORK',
};

// ============================================
// 프로필 컬렉션
// ============================================

export const sampleProfiles: CountryProfile[] = [
  korea,
  usa,
  japan,
  germany,
  china,
  france,
  sweden,
  brazil,
  india,
  netherlands,
];

/**
 * 국가 코드로 프로필을 찾습니다.
 */
export function getProfileByCode(code: string): CountryProfile | undefined {
  return sampleProfiles.find(
    (p) => p.code.toUpperCase() === code.toUpperCase()
  );
}

/**
 * 문화 유형별로 프로필을 그룹화합니다.
 */
export function getProfilesByCultureType(): Record<CultureType, CountryProfile[]> {
  const grouped: Record<CultureType, CountryProfile[]> = {
    CONTEST: [],
    NETWORK: [],
    FAMILY: [],
    PYRAMID: [],
    SOLAR_SYSTEM: [],
    MACHINE: [],
    OTHER: [],
  };

  sampleProfiles.forEach((profile) => {
    grouped[profile.cultureType].push(profile);
  });

  return grouped;
}
