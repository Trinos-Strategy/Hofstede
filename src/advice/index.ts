/**
 * 문화 조언 시스템 모듈
 * Hofstede 문화 차원을 기반으로 상황별 조언을 생성합니다.
 */

// 메인 API
export { generateAdvice, generateMultipleAdvice, generateAllAdvice } from './generateAdvice';

// 조언 블록 생성
export { buildAdviceBlocks, getContextSummary } from './buildAdviceBlocks';

// 차원별 조언 함수
export {
  // PDI 관련
  adviceForMeeting_PDI,
  adviceForDisagree_PDI,
  adviceForTeam_PDI,
  // UAI 관련
  adviceForReporting_UAI,
  adviceForDecision_UAI,
  adviceForConflict_UAI,
  // IDV 관련
  adviceForReward_IDV,
  adviceForFeedback_IDV,
  adviceForNegotiation_IDV,
  // MAS 관련
  adviceForWorkStyle_MAS,
} from './dimensionAdvice';

// 샘플 프로필
export {
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
  sampleProfiles,
  getProfileByCode,
  getProfilesByCultureType,
} from './sampleProfiles';
