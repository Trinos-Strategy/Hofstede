export interface NatureProfile {
  biome: 'alpine' | 'forest' | 'coastal' | 'desert' | 'aurora' | 'tropical' | 'temperate' | 'steppe' | 'neutral';
  gradientFrom: string;
  gradientTo: string;
  particleType: 'snow' | 'leaves' | 'sand' | 'rain' | 'aurora' | 'sakura' | 'mist' | 'fireflies' | 'stars' | 'none';
  motionIntensity: 1 | 2 | 3;
}

export const countryNatureProfiles: Record<string, NatureProfile> = {
  KOR: { biome: 'alpine', gradientFrom: '#0f172a', gradientTo: '#1e1b4b', particleType: 'snow', motionIntensity: 2 },
  JPN: { biome: 'temperate', gradientFrom: '#1a0f2e', gradientTo: '#2d1b4e', particleType: 'sakura', motionIntensity: 2 },
  CHN: { biome: 'temperate', gradientFrom: '#0f1a2e', gradientTo: '#1e2d4e', particleType: 'mist', motionIntensity: 1 },
  USA: { biome: 'temperate', gradientFrom: '#0f1e2e', gradientTo: '#1a2d4e', particleType: 'fireflies', motionIntensity: 1 },
  GBR: { biome: 'coastal', gradientFrom: '#0f172e', gradientTo: '#1a2340', particleType: 'rain', motionIntensity: 2 },
  DEU: { biome: 'forest', gradientFrom: '#0f1a14', gradientTo: '#1a2d1e', particleType: 'mist', motionIntensity: 1 },
  FRA: { biome: 'temperate', gradientFrom: '#1a0f2e', gradientTo: '#2d1a3e', particleType: 'mist', motionIntensity: 1 },
  ITA: { biome: 'coastal', gradientFrom: '#0f1a2e', gradientTo: '#1e2a3e', particleType: 'mist', motionIntensity: 1 },
  NLD: { biome: 'coastal', gradientFrom: '#0f1e2e', gradientTo: '#1a2e3e', particleType: 'rain', motionIntensity: 1 },
  BEL: { biome: 'forest', gradientFrom: '#0f1a14', gradientTo: '#1e2e1e', particleType: 'mist', motionIntensity: 1 },
  SWE: { biome: 'aurora', gradientFrom: '#050e1a', gradientTo: '#0a1a2e', particleType: 'aurora', motionIntensity: 2 },
  NOR: { biome: 'aurora', gradientFrom: '#050e14', gradientTo: '#081a1e', particleType: 'aurora', motionIntensity: 1 },
  DNK: { biome: 'coastal', gradientFrom: '#0f1e2e', gradientTo: '#1a2e3e', particleType: 'rain', motionIntensity: 1 },
  FIN: { biome: 'aurora', gradientFrom: '#050e1a', gradientTo: '#0a1428', particleType: 'aurora', motionIntensity: 2 },
  POL: { biome: 'forest', gradientFrom: '#0f1a14', gradientTo: '#1a2e1e', particleType: 'leaves', motionIntensity: 1 },
  RUS: { biome: 'steppe', gradientFrom: '#0a0f1a', gradientTo: '#141e2e', particleType: 'snow', motionIntensity: 2 },
  CHE: { biome: 'alpine', gradientFrom: '#0f1a2e', gradientTo: '#1a2e4e', particleType: 'snow', motionIntensity: 2 },
  AUT: { biome: 'alpine', gradientFrom: '#0f1a2e', gradientTo: '#1a2840', particleType: 'snow', motionIntensity: 1 },
  ESP: { biome: 'temperate', gradientFrom: '#1a0f0a', gradientTo: '#2e1a0f', particleType: 'mist', motionIntensity: 1 },
  PRT: { biome: 'coastal', gradientFrom: '#0f1a28', gradientTo: '#1a2840', particleType: 'rain', motionIntensity: 1 },
  GRC: { biome: 'coastal', gradientFrom: '#0f1e2e', gradientTo: '#1e3040', particleType: 'mist', motionIntensity: 1 },
  TUR: { biome: 'steppe', gradientFrom: '#1a0f0a', gradientTo: '#2e1a14', particleType: 'sand', motionIntensity: 2 },
  IND: { biome: 'tropical', gradientFrom: '#0f1a0a', gradientTo: '#1e2e14', particleType: 'leaves', motionIntensity: 2 },
  THA: { biome: 'tropical', gradientFrom: '#0a1a0f', gradientTo: '#142e1e', particleType: 'leaves', motionIntensity: 3 },
  IDN: { biome: 'tropical', gradientFrom: '#0a1e14', gradientTo: '#142e1e', particleType: 'leaves', motionIntensity: 3 },
  MYS: { biome: 'tropical', gradientFrom: '#0a1a0f', gradientTo: '#142814', particleType: 'leaves', motionIntensity: 2 },
  SGP: { biome: 'coastal', gradientFrom: '#0f1e28', gradientTo: '#1a2e3e', particleType: 'rain', motionIntensity: 1 },
  PHL: { biome: 'tropical', gradientFrom: '#0a1e14', gradientTo: '#142e1e', particleType: 'leaves', motionIntensity: 2 },
  AUS: { biome: 'coastal', gradientFrom: '#0f1e28', gradientTo: '#1a2e40', particleType: 'mist', motionIntensity: 1 },
  NZL: { biome: 'coastal', gradientFrom: '#0f1e2e', gradientTo: '#1a2e40', particleType: 'mist', motionIntensity: 1 },
  BRA: { biome: 'tropical', gradientFrom: '#0a1e0f', gradientTo: '#142e1a', particleType: 'leaves', motionIntensity: 3 },
  MEX: { biome: 'desert', gradientFrom: '#1a0f0a', gradientTo: '#2e1e0f', particleType: 'sand', motionIntensity: 2 },
  COL: { biome: 'tropical', gradientFrom: '#0a1a0f', gradientTo: '#14281e', particleType: 'leaves', motionIntensity: 2 },
  // Codes present in dataset but not explicitly assigned in Phase C instructions
  IRL: { biome: 'coastal', gradientFrom: '#0f1e2e', gradientTo: '#1a2e40', particleType: 'rain', motionIntensity: 1 },
  HKG: { biome: 'coastal', gradientFrom: '#0f1e28', gradientTo: '#1a2e3e', particleType: 'rain', motionIntensity: 1 },
  CHL: { biome: 'coastal', gradientFrom: '#0f1e2e', gradientTo: '#1a2e3e', particleType: 'mist', motionIntensity: 1 },
  PER: { biome: 'coastal', gradientFrom: '#0f1e2e', gradientTo: '#1a2e3e', particleType: 'mist', motionIntensity: 1 },
  TWN: { biome: 'coastal', gradientFrom: '#0f1e28', gradientTo: '#1a2e3e', particleType: 'rain', motionIntensity: 2 },
  VEN: { biome: 'tropical', gradientFrom: '#0a1e0f', gradientTo: '#142e1a', particleType: 'leaves', motionIntensity: 2 },
  CZE: { biome: 'forest', gradientFrom: '#0f1a14', gradientTo: '#1a2e1e', particleType: 'mist', motionIntensity: 1 },
  HUN: { biome: 'forest', gradientFrom: '#0f1a14', gradientTo: '#1a2e1e', particleType: 'mist', motionIntensity: 1 },
};

export const fallbackNatureProfile: NatureProfile = {
  biome: 'neutral',
  gradientFrom: '#0f172a',
  gradientTo: '#1e2040',
  particleType: 'stars',
  motionIntensity: 1,
};

export function getNatureProfile(countryCode: string | null | undefined): NatureProfile {
  if (!countryCode) return fallbackNatureProfile;
  return countryNatureProfiles[countryCode] || fallbackNatureProfile;
}
