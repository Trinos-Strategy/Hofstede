export type BiomeType =
  | 'aurora'
  | 'stars'
  | 'forest'
  | 'desert'
  | 'mountains'
  | 'ocean'
  | 'plains'
  | 'savanna'
  | 'tundra';

export type ParticleType =
  | 'aurora'
  | 'star'
  | 'leaf'
  | 'sand'
  | 'mist'
  | 'bubble'
  | 'petal'
  | 'sparkle'
  | 'snow';

export interface CountryNatureProfile {
  countryCode: string;
  biome: BiomeType;
  particleType: ParticleType;
  gradients: {
    light: string;
    dark: string;
  };
  particleColors: string[];
}

export const countryNatureProfiles: Record<string, CountryNatureProfile> = {
  USA: {
    countryCode: 'USA',
    biome: 'plains',
    particleType: 'petal',
    gradients: {
      light: 'linear-gradient(180deg, rgba(232, 245, 233, 0.2) 0%, rgba(200, 230, 201, 0.1) 100%)',
      dark: 'linear-gradient(180deg, #0F1F15 0%, #0A140E 60%, #0A0E1A 100%)',
    },
    particleColors: ['#FFCDD2', '#EF9A9A', '#E8F5E9', '#FFF9C4'],
  },
  GBR: {
    countryCode: 'GBR',
    biome: 'ocean',
    particleType: 'bubble',
    gradients: {
      light: 'radial-gradient(circle at 70% 30%, rgba(0, 180, 216, 0.12) 0%, rgba(2, 62, 138, 0.04) 70%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 70% 30%, rgba(0, 119, 182, 0.2) 0%, rgba(3, 4, 94, 0.35) 70%, #0A0E1A 100%)',
    },
    particleColors: ['#B2EBF2', '#80DEEA', '#4DD0E1', '#E0F7FA'],
  },
  AUS: {
    countryCode: 'AUS',
    biome: 'desert',
    particleType: 'sand',
    gradients: {
      light: 'linear-gradient(180deg, rgba(250, 217, 97, 0.15) 0%, rgba(247, 107, 28, 0.08) 100%)',
      dark: 'linear-gradient(180deg, #1A0B05 0%, #30180D 50%, #0A0E1A 100%)',
    },
    particleColors: ['#FF8A65', '#FFB74D', '#FFD54F', '#D84315'],
  },
  IRL: {
    countryCode: 'IRL',
    biome: 'ocean',
    particleType: 'bubble',
    gradients: {
      light: 'radial-gradient(circle at 70% 30%, rgba(0, 180, 216, 0.12) 0%, rgba(2, 62, 138, 0.04) 70%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 70% 30%, rgba(0, 119, 182, 0.2) 0%, rgba(3, 4, 94, 0.35) 70%, #0A0E1A 100%)',
    },
    particleColors: ['#B2EBF2', '#80DEEA', '#4DD0E1', '#E0F7FA'],
  },
  NZL: {
    countryCode: 'NZL',
    biome: 'ocean',
    particleType: 'bubble',
    gradients: {
      light: 'radial-gradient(circle at 70% 30%, rgba(0, 180, 216, 0.12) 0%, rgba(2, 62, 138, 0.04) 70%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 70% 30%, rgba(0, 119, 182, 0.2) 0%, rgba(3, 4, 94, 0.35) 70%, #0A0E1A 100%)',
    },
    particleColors: ['#B2EBF2', '#80DEEA', '#4DD0E1', '#E0F7FA'],
  },
  DNK: {
    countryCode: 'DNK',
    biome: 'ocean',
    particleType: 'bubble',
    gradients: {
      light: 'radial-gradient(circle at 70% 30%, rgba(0, 180, 216, 0.12) 0%, rgba(2, 62, 138, 0.04) 70%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 70% 30%, rgba(0, 119, 182, 0.2) 0%, rgba(3, 4, 94, 0.35) 70%, #0A0E1A 100%)',
    },
    particleColors: ['#B2EBF2', '#80DEEA', '#4DD0E1', '#E0F7FA'],
  },
  NLD: {
    countryCode: 'NLD',
    biome: 'ocean',
    particleType: 'bubble',
    gradients: {
      light: 'radial-gradient(circle at 70% 30%, rgba(0, 180, 216, 0.12) 0%, rgba(2, 62, 138, 0.04) 70%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 70% 30%, rgba(0, 119, 182, 0.2) 0%, rgba(3, 4, 94, 0.35) 70%, #0A0E1A 100%)',
    },
    particleColors: ['#B2EBF2', '#80DEEA', '#4DD0E1', '#E0F7FA'],
  },
  NOR: {
    countryCode: 'NOR',
    biome: 'aurora',
    particleType: 'aurora',
    gradients: {
      light: 'radial-gradient(circle at 50% -20%, rgba(0, 242, 96, 0.15) 0%, rgba(5, 117, 230, 0.05) 50%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 50% -20%, rgba(0, 242, 96, 0.2) 0%, rgba(5, 117, 230, 0.08) 50%, #0A0E1A 100%)',
    },
    particleColors: ['#00F260', '#0575E6', '#8E2DE2', '#4A00E0'],
  },
  SWE: {
    countryCode: 'SWE',
    biome: 'aurora',
    particleType: 'aurora',
    gradients: {
      light: 'radial-gradient(circle at 50% -20%, rgba(0, 242, 96, 0.15) 0%, rgba(5, 117, 230, 0.05) 50%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 50% -20%, rgba(0, 242, 96, 0.2) 0%, rgba(5, 117, 230, 0.08) 50%, #0A0E1A 100%)',
    },
    particleColors: ['#00F260', '#0575E6', '#8E2DE2', '#4A00E0'],
  },
  FIN: {
    countryCode: 'FIN',
    biome: 'aurora',
    particleType: 'aurora',
    gradients: {
      light: 'radial-gradient(circle at 50% -20%, rgba(0, 242, 96, 0.15) 0%, rgba(5, 117, 230, 0.05) 50%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 50% -20%, rgba(0, 242, 96, 0.2) 0%, rgba(5, 117, 230, 0.08) 50%, #0A0E1A 100%)',
    },
    particleColors: ['#00F260', '#0575E6', '#8E2DE2', '#4A00E0'],
  },
  CHN: {
    countryCode: 'CHN',
    biome: 'mountains',
    particleType: 'mist',
    gradients: {
      light: 'linear-gradient(135deg, rgba(176, 190, 197, 0.18) 0%, rgba(120, 144, 156, 0.08) 100%)',
      dark: 'linear-gradient(135deg, #1A2332 0%, #101725 60%, #0A0E1A 100%)',
    },
    particleColors: ['#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE'],
  },
  HKG: {
    countryCode: 'HKG',
    biome: 'ocean',
    particleType: 'bubble',
    gradients: {
      light: 'radial-gradient(circle at 70% 30%, rgba(0, 180, 216, 0.12) 0%, rgba(2, 62, 138, 0.04) 70%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 70% 30%, rgba(0, 119, 182, 0.2) 0%, rgba(3, 4, 94, 0.35) 70%, #0A0E1A 100%)',
    },
    particleColors: ['#B2EBF2', '#80DEEA', '#4DD0E1', '#E0F7FA'],
  },
  IND: {
    countryCode: 'IND',
    biome: 'savanna',
    particleType: 'sparkle',
    gradients: {
      light: 'linear-gradient(135deg, rgba(255, 224, 178, 0.2) 0%, rgba(255, 204, 128, 0.1) 100%)',
      dark: 'linear-gradient(135deg, #2D1A04 0%, #190F02 60%, #0A0E1A 100%)',
    },
    particleColors: ['#FFB74D', '#FFA726', '#FF8F00', '#FF6F00'],
  },
  IDN: {
    countryCode: 'IDN',
    biome: 'savanna',
    particleType: 'sparkle',
    gradients: {
      light: 'linear-gradient(135deg, rgba(255, 224, 178, 0.2) 0%, rgba(255, 204, 128, 0.1) 100%)',
      dark: 'linear-gradient(135deg, #2D1A04 0%, #190F02 60%, #0A0E1A 100%)',
    },
    particleColors: ['#FFB74D', '#FFA726', '#FF8F00', '#FF6F00'],
  },
  MYS: {
    countryCode: 'MYS',
    biome: 'savanna',
    particleType: 'sparkle',
    gradients: {
      light: 'linear-gradient(135deg, rgba(255, 224, 178, 0.2) 0%, rgba(255, 204, 128, 0.1) 100%)',
      dark: 'linear-gradient(135deg, #2D1A04 0%, #190F02 60%, #0A0E1A 100%)',
    },
    particleColors: ['#FFB74D', '#FFA726', '#FF8F00', '#FF6F00'],
  },
  PHL: {
    countryCode: 'PHL',
    biome: 'savanna',
    particleType: 'sparkle',
    gradients: {
      light: 'linear-gradient(135deg, rgba(255, 224, 178, 0.2) 0%, rgba(255, 204, 128, 0.1) 100%)',
      dark: 'linear-gradient(135deg, #2D1A04 0%, #190F02 60%, #0A0E1A 100%)',
    },
    particleColors: ['#FFB74D', '#FFA726', '#FF8F00', '#FF6F00'],
  },
  SGP: {
    countryCode: 'SGP',
    biome: 'ocean',
    particleType: 'bubble',
    gradients: {
      light: 'radial-gradient(circle at 70% 30%, rgba(0, 180, 216, 0.12) 0%, rgba(2, 62, 138, 0.04) 70%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 70% 30%, rgba(0, 119, 182, 0.2) 0%, rgba(3, 4, 94, 0.35) 70%, #0A0E1A 100%)',
    },
    particleColors: ['#B2EBF2', '#80DEEA', '#4DD0E1', '#E0F7FA'],
  },
  BRA: {
    countryCode: 'BRA',
    biome: 'forest',
    particleType: 'leaf',
    gradients: {
      light: 'radial-gradient(circle at 30% 20%, rgba(76, 175, 80, 0.12) 0%, rgba(139, 195, 74, 0.04) 60%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 30% 20%, rgba(20, 50, 20, 0.35) 0%, rgba(10, 25, 10, 0.5) 60%, #0A0E1A 100%)',
    },
    particleColors: ['#81C784', '#AED581', '#FFD54F', '#D4AF37'],
  },
  CHL: {
    countryCode: 'CHL',
    biome: 'mountains',
    particleType: 'mist',
    gradients: {
      light: 'linear-gradient(135deg, rgba(176, 190, 197, 0.18) 0%, rgba(120, 144, 156, 0.08) 100%)',
      dark: 'linear-gradient(135deg, #1A2332 0%, #101725 60%, #0A0E1A 100%)',
    },
    particleColors: ['#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE'],
  },
  COL: {
    countryCode: 'COL',
    biome: 'mountains',
    particleType: 'mist',
    gradients: {
      light: 'linear-gradient(135deg, rgba(176, 190, 197, 0.18) 0%, rgba(120, 144, 156, 0.08) 100%)',
      dark: 'linear-gradient(135deg, #1A2332 0%, #101725 60%, #0A0E1A 100%)',
    },
    particleColors: ['#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE'],
  },
  GRC: {
    countryCode: 'GRC',
    biome: 'mountains',
    particleType: 'mist',
    gradients: {
      light: 'linear-gradient(135deg, rgba(176, 190, 197, 0.18) 0%, rgba(120, 144, 156, 0.08) 100%)',
      dark: 'linear-gradient(135deg, #1A2332 0%, #101725 60%, #0A0E1A 100%)',
    },
    particleColors: ['#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE'],
  },
  KOR: {
    countryCode: 'KOR',
    biome: 'stars',
    particleType: 'star',
    gradients: {
      light: 'linear-gradient(180deg, #1A1C29 0%, #2B3A55 60%, #E8D5C4 100%)',
      dark: 'linear-gradient(180deg, #090A0F 0%, #0D1321 50%, #151E3D 100%)',
    },
    particleColors: ['#FFE082', '#FFF59D', '#ECEFF1', '#FFFFFF'],
  },
  MEX: {
    countryCode: 'MEX',
    biome: 'desert',
    particleType: 'sand',
    gradients: {
      light: 'linear-gradient(180deg, rgba(250, 217, 97, 0.15) 0%, rgba(247, 107, 28, 0.08) 100%)',
      dark: 'linear-gradient(180deg, #1A0B05 0%, #30180D 50%, #0A0E1A 100%)',
    },
    particleColors: ['#FF8A65', '#FFB74D', '#FFD54F', '#D84315'],
  },
  PER: {
    countryCode: 'PER',
    biome: 'mountains',
    particleType: 'mist',
    gradients: {
      light: 'linear-gradient(135deg, rgba(176, 190, 197, 0.18) 0%, rgba(120, 144, 156, 0.08) 100%)',
      dark: 'linear-gradient(135deg, #1A2332 0%, #101725 60%, #0A0E1A 100%)',
    },
    particleColors: ['#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE'],
  },
  PRT: {
    countryCode: 'PRT',
    biome: 'ocean',
    particleType: 'bubble',
    gradients: {
      light: 'radial-gradient(circle at 70% 30%, rgba(0, 180, 216, 0.12) 0%, rgba(2, 62, 138, 0.04) 70%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 70% 30%, rgba(0, 119, 182, 0.2) 0%, rgba(3, 4, 94, 0.35) 70%, #0A0E1A 100%)',
    },
    particleColors: ['#B2EBF2', '#80DEEA', '#4DD0E1', '#E0F7FA'],
  },
  RUS: {
    countryCode: 'RUS',
    biome: 'tundra',
    particleType: 'snow',
    gradients: {
      light: 'linear-gradient(180deg, rgba(224, 247, 250, 0.2) 0%, rgba(178, 235, 242, 0.1) 100%)',
      dark: 'linear-gradient(180deg, #102A35 0%, #0C1E26 60%, #0A0E1A 100%)',
    },
    particleColors: ['#FFFFFF', '#E0F7FA', '#B2EBF2', '#ECEFF1'],
  },
  TWN: {
    countryCode: 'TWN',
    biome: 'plains',
    particleType: 'petal',
    gradients: {
      light: 'linear-gradient(180deg, rgba(232, 245, 233, 0.2) 0%, rgba(200, 230, 201, 0.1) 100%)',
      dark: 'linear-gradient(180deg, #0F1F15 0%, #0A140E 60%, #0A0E1A 100%)',
    },
    particleColors: ['#FFCDD2', '#EF9A9A', '#E8F5E9', '#FFF9C4'],
  },
  THA: {
    countryCode: 'THA',
    biome: 'savanna',
    particleType: 'sparkle',
    gradients: {
      light: 'linear-gradient(135deg, rgba(255, 224, 178, 0.2) 0%, rgba(255, 204, 128, 0.1) 100%)',
      dark: 'linear-gradient(135deg, #2D1A04 0%, #190F02 60%, #0A0E1A 100%)',
    },
    particleColors: ['#FFB74D', '#FFA726', '#FF8F00', '#FF6F00'],
  },
  TUR: {
    countryCode: 'TUR',
    biome: 'plains',
    particleType: 'petal',
    gradients: {
      light: 'linear-gradient(180deg, rgba(232, 245, 233, 0.2) 0%, rgba(200, 230, 201, 0.1) 100%)',
      dark: 'linear-gradient(180deg, #0F1F15 0%, #0A140E 60%, #0A0E1A 100%)',
    },
    particleColors: ['#FFCDD2', '#EF9A9A', '#E8F5E9', '#FFF9C4'],
  },
  VEN: {
    countryCode: 'VEN',
    biome: 'savanna',
    particleType: 'sparkle',
    gradients: {
      light: 'linear-gradient(135deg, rgba(255, 224, 178, 0.2) 0%, rgba(255, 204, 128, 0.1) 100%)',
      dark: 'linear-gradient(135deg, #2D1A04 0%, #190F02 60%, #0A0E1A 100%)',
    },
    particleColors: ['#FFB74D', '#FFA726', '#FF8F00', '#FF6F00'],
  },
  JPN: {
    countryCode: 'JPN',
    biome: 'mountains',
    particleType: 'mist',
    gradients: {
      light: 'linear-gradient(135deg, rgba(176, 190, 197, 0.18) 0%, rgba(120, 144, 156, 0.08) 100%)',
      dark: 'linear-gradient(135deg, #1A2332 0%, #101725 60%, #0A0E1A 100%)',
    },
    particleColors: ['#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE'],
  },
  BEL: {
    countryCode: 'BEL',
    biome: 'forest',
    particleType: 'leaf',
    gradients: {
      light: 'radial-gradient(circle at 30% 20%, rgba(76, 175, 80, 0.12) 0%, rgba(139, 195, 74, 0.04) 60%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 30% 20%, rgba(20, 50, 20, 0.35) 0%, rgba(10, 25, 10, 0.5) 60%, #0A0E1A 100%)',
    },
    particleColors: ['#81C784', '#AED581', '#FFD54F', '#D4AF37'],
  },
  FRA: {
    countryCode: 'FRA',
    biome: 'plains',
    particleType: 'petal',
    gradients: {
      light: 'linear-gradient(180deg, rgba(232, 245, 233, 0.2) 0%, rgba(200, 230, 201, 0.1) 100%)',
      dark: 'linear-gradient(180deg, #0F1F15 0%, #0A140E 60%, #0A0E1A 100%)',
    },
    particleColors: ['#FFCDD2', '#EF9A9A', '#E8F5E9', '#FFF9C4'],
  },
  ITA: {
    countryCode: 'ITA',
    biome: 'plains',
    particleType: 'petal',
    gradients: {
      light: 'linear-gradient(180deg, rgba(232, 245, 233, 0.2) 0%, rgba(200, 230, 201, 0.1) 100%)',
      dark: 'linear-gradient(180deg, #0F1F15 0%, #0A140E 60%, #0A0E1A 100%)',
    },
    particleColors: ['#FFCDD2', '#EF9A9A', '#E8F5E9', '#FFF9C4'],
  },
  ESP: {
    countryCode: 'ESP',
    biome: 'plains',
    particleType: 'petal',
    gradients: {
      light: 'linear-gradient(180deg, rgba(232, 245, 233, 0.2) 0%, rgba(200, 230, 201, 0.1) 100%)',
      dark: 'linear-gradient(180deg, #0F1F15 0%, #0A140E 60%, #0A0E1A 100%)',
    },
    particleColors: ['#FFCDD2', '#EF9A9A', '#E8F5E9', '#FFF9C4'],
  },
  POL: {
    countryCode: 'POL',
    biome: 'forest',
    particleType: 'leaf',
    gradients: {
      light: 'radial-gradient(circle at 30% 20%, rgba(76, 175, 80, 0.12) 0%, rgba(139, 195, 74, 0.04) 60%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 30% 20%, rgba(20, 50, 20, 0.35) 0%, rgba(10, 25, 10, 0.5) 60%, #0A0E1A 100%)',
    },
    particleColors: ['#81C784', '#AED581', '#FFD54F', '#D4AF37'],
  },
  AUT: {
    countryCode: 'AUT',
    biome: 'forest',
    particleType: 'leaf',
    gradients: {
      light: 'radial-gradient(circle at 30% 20%, rgba(76, 175, 80, 0.12) 0%, rgba(139, 195, 74, 0.04) 60%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 30% 20%, rgba(20, 50, 20, 0.35) 0%, rgba(10, 25, 10, 0.5) 60%, #0A0E1A 100%)',
    },
    particleColors: ['#81C784', '#AED581', '#FFD54F', '#D4AF37'],
  },
  CZE: {
    countryCode: 'CZE',
    biome: 'forest',
    particleType: 'leaf',
    gradients: {
      light: 'radial-gradient(circle at 30% 20%, rgba(76, 175, 80, 0.12) 0%, rgba(139, 195, 74, 0.04) 60%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 30% 20%, rgba(20, 50, 20, 0.35) 0%, rgba(10, 25, 10, 0.5) 60%, #0A0E1A 100%)',
    },
    particleColors: ['#81C784', '#AED581', '#FFD54F', '#D4AF37'],
  },
  DEU: {
    countryCode: 'DEU',
    biome: 'forest',
    particleType: 'leaf',
    gradients: {
      light: 'radial-gradient(circle at 30% 20%, rgba(76, 175, 80, 0.12) 0%, rgba(139, 195, 74, 0.04) 60%, #F5F0E8 100%)',
      dark: 'radial-gradient(circle at 30% 20%, rgba(20, 50, 20, 0.35) 0%, rgba(10, 25, 10, 0.5) 60%, #0A0E1A 100%)',
    },
    particleColors: ['#81C784', '#AED581', '#FFD54F', '#D4AF37'],
  },
  HUN: {
    countryCode: 'HUN',
    biome: 'plains',
    particleType: 'petal',
    gradients: {
      light: 'linear-gradient(180deg, rgba(232, 245, 233, 0.2) 0%, rgba(200, 230, 201, 0.1) 100%)',
      dark: 'linear-gradient(180deg, #0F1F15 0%, #0A140E 60%, #0A0E1A 100%)',
    },
    particleColors: ['#FFCDD2', '#EF9A9A', '#E8F5E9', '#FFF9C4'],
  },
  CHE: {
    countryCode: 'CHE',
    biome: 'mountains',
    particleType: 'mist',
    gradients: {
      light: 'linear-gradient(135deg, rgba(176, 190, 197, 0.18) 0%, rgba(120, 144, 156, 0.08) 100%)',
      dark: 'linear-gradient(135deg, #1A2332 0%, #101725 60%, #0A0E1A 100%)',
    },
    particleColors: ['#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE'],
  },
};

// Fallback profile if country code isn't mapped
export const defaultNatureProfile: CountryNatureProfile = {
  countryCode: 'DEFAULT',
  biome: 'stars',
  particleType: 'star',
  gradients: {
    light: 'linear-gradient(180deg, #1A1C29 0%, #2B3A55 60%, #E8D5C4 100%)',
    dark: 'linear-gradient(180deg, #090A0F 0%, #0D1321 50%, #151E3D 100%)',
  },
  particleColors: ['#FFE082', '#FFF59D', '#ECEFF1', '#FFFFFF'],
};

export const getCountryNatureProfile = (countryCode: string): CountryNatureProfile => {
  return countryNatureProfiles[countryCode] || defaultNatureProfile;
};
