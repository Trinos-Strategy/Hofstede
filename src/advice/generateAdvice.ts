/**
 * 최종 조언 생성 API
 * CountryProfile과 AdviceContext를 받아 AdviceResult를 반환합니다.
 */

import type { AdviceContext, AdviceResult, CountryProfile } from '../types';
import { buildAdviceBlocks, getContextSummary } from './buildAdviceBlocks';

/**
 * 국가 프로필과 상황에 맞는 문화 조언을 생성합니다.
 *
 * @param profile - 대상 국가의 문화 프로필
 * @param context - 조언이 필요한 상황
 * @returns 구조화된 조언 결과
 *
 * @example
 * const korea: CountryProfile = {
 *   code: 'KR',
 *   name: 'South Korea',
 *   nameKo: '한국',
 *   dimensions: { pdi: 60, idv: 18, uai: 85, mas: 39 },
 *   cultureType: 'PYRAMID'
 * };
 *
 * const advice = generateAdvice(korea, 'MEETING_IDEA');
 * console.log(advice.blocks);
 */
export function generateAdvice(
  profile: CountryProfile,
  context: AdviceContext
): AdviceResult {
  const blocks = buildAdviceBlocks(profile, context);
  const summary = getContextSummary(profile, context);

  return {
    country: profile,
    context,
    blocks,
    summary,
    summaryKo: summary, // 현재는 한국어로 제공
  };
}

/**
 * 여러 상황에 대한 조언을 한 번에 생성합니다.
 *
 * @param profile - 대상 국가의 문화 프로필
 * @param contexts - 조언이 필요한 상황들의 배열
 * @returns 각 상황별 조언 결과 배열
 */
export function generateMultipleAdvice(
  profile: CountryProfile,
  contexts: AdviceContext[]
): AdviceResult[] {
  return contexts.map((context) => generateAdvice(profile, context));
}

/**
 * 모든 상황에 대한 조언을 생성합니다.
 *
 * @param profile - 대상 국가의 문화 프로필
 * @returns 모든 상황별 조언 결과 배열
 */
export function generateAllAdvice(profile: CountryProfile): AdviceResult[] {
  const allContexts: AdviceContext[] = [
    'MEETING_IDEA',
    'DISAGREE_BOSS',
    'REPORTING',
    'REWARD_RECOGNITION',
    'TEAM_COLLABORATION',
    'NEGOTIATION',
    'FEEDBACK',
    'CONFLICT_RESOLUTION',
  ];

  return generateMultipleAdvice(profile, allContexts);
}
