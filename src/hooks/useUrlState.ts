import { useState, useEffect, useCallback } from 'react';
import type { Country, AdviceContext } from '../types';
import { countries } from '../data/countries';

const ALLOWED_CONTEXTS: AdviceContext[] = [
  'MEETING_IDEA',
  'DISAGREE_BOSS',
  'REPORTING',
  'REWARD_RECOGNITION',
  'TEAM_COLLABORATION',
  'NEGOTIATION',
  'FEEDBACK',
  'CONFLICT_RESOLUTION',
];

// Static lookup map — never changes, so safe to keep at module level
const countryMap = new Map(countries.map((c) => [c.code, c]));

function parseUrlParams(): { countryCodes: string[]; context: AdviceContext | null } {
  if (typeof window === 'undefined') {
    return { countryCodes: [], context: null };
  }
  const params = new URLSearchParams(window.location.search);
  const rawCountries = params.get('countries');
  const rawContext = params.get('context');

  const countryCodes = rawCountries
    ? rawCountries
        .split(',')
        .map((c) => c.trim().toUpperCase())
        .filter((c) => c.length > 0)
    : [];

  const context =
    rawContext && ALLOWED_CONTEXTS.includes(rawContext as AdviceContext)
      ? (rawContext as AdviceContext)
      : null;

  return { countryCodes, context };
}

function buildQueryString(selectedCountries: Country[], selectedContext: AdviceContext | null): string {
  const params = new URLSearchParams();
  if (selectedCountries.length > 0) {
    params.set('countries', selectedCountries.map((c) => c.code).join(','));
  }
  if (selectedContext) {
    params.set('context', selectedContext);
  }
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

interface UrlStateResult {
  initialCountries: Country[];
  initialContext: AdviceContext | null;
  syncUrl: (countries: Country[], context: AdviceContext | null) => void;
  popStateTrigger: number;
  parseFromUrl: () => { parsedCountries: Country[]; parsedContext: AdviceContext | null };
}

/**
 * Hook to sync selected countries and advice context with URL query parameters.
 * - Reads initial state from URL on first render.
 * - Provides syncUrl() to push updated query params via history.pushState.
 * - Listens to popstate for back/forward navigation.
 */
export function useUrlState(): UrlStateResult {
  const { countryCodes, context: initialContext } = parseUrlParams();

  const initialCountries = countryCodes
    .map((code) => countryMap.get(code))
    .filter((c): c is Country => c !== undefined)
    .slice(0, 3);

  const [popStateTrigger, setPopStateTrigger] = useState(0);

  // Listen to browser back/forward
  useEffect(() => {
    function handlePopState() {
      setPopStateTrigger((t) => t + 1);
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Re-parse URL when back/forward is pressed and update state via callback
  // Note: consumers should use a key or effect to react to popStateTrigger
  const syncUrl = useCallback((selectedCountries: Country[], selectedContext: AdviceContext | null) => {
    const newQs = buildQueryString(selectedCountries, selectedContext);
    const currentQs = window.location.search;
    if (newQs !== currentQs) {
      window.history.pushState({ countries: selectedCountries.map((c) => c.code), context: selectedContext }, '', newQs || window.location.pathname);
    }
  }, []);

  // When popstate fires, consumers react to popStateTrigger. We expose a helper to re-parse.
  const parseFromUrl = useCallback(() => {
    const { countryCodes: codes, context: ctx } = parseUrlParams();
    const parsedCountries = codes
      .map((code) => countryMap.get(code))
      .filter((c): c is Country => c !== undefined)
      .slice(0, 3);
    return { parsedCountries, parsedContext: ctx };
  }, []);

  // Return popStateTrigger so consumers can detect changes
  return { initialCountries, initialContext, syncUrl, popStateTrigger, parseFromUrl };
}
