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
