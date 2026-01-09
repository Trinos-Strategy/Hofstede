/**
 * Country 타입과 CountryProfile 간 변환 유틸리티
 */

import type { Country, CountryProfile, CultureType, ClusterType } from '../types';

/**
 * ClusterType을 CultureType으로 변환
 */
export function clusterToCulture(cluster: ClusterType): CultureType {
  const mapping: Record<ClusterType, CultureType> = {
    contest: 'CONTEST',
    network: 'NETWORK',
    family: 'FAMILY',
    pyramid: 'PYRAMID',
    solarSystem: 'SOLAR_SYSTEM',
    machine: 'MACHINE',
  };
  return mapping[cluster];
}

/**
 * Country 객체를 CountryProfile로 변환
 * 기존 시각화 데이터를 조언 시스템에서 사용할 수 있게 변환합니다.
 */
export function countryToProfile(country: Country): CountryProfile {
  return {
    code: country.code,
    name: country.name,
    nameKo: country.nameKo,
    dimensions: {
      pdi: country.dimensions.PDI,
      idv: country.dimensions.IDV,
      uai: country.dimensions.UAI,
      mas: country.dimensions.MAS,
    },
    cultureType: clusterToCulture(country.cluster),
  };
}

/**
 * 여러 Country 객체를 CountryProfile 배열로 변환
 */
export function countriesToProfiles(countries: Country[]): CountryProfile[] {
  return countries.map(countryToProfile);
}
