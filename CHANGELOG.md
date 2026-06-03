# Changelog

All notable changes to the Hofstede Cultural Compass project are documented in this file.

## [2.0.0] — 2026-06-03

### Added — Phase D (UX Polish & Deployment Readiness)
- URL query parameter sync for `selectedCountries` and `selectedContext` (`?countries=KOR,USA&context=NEGOTIATION`) — `useUrlState` hook with `pushState` / `popstate`
- React Error Boundary (`ErrorBoundary.tsx`) with KO/EN fallback UI and reload button
- PNG chart export button with dynamic `html2canvas` import; filename includes ISO timestamp
- Dark mode toggle (Moon/Sun icons) with `localStorage` persistence and inline flash-prevention script in `index.html`
- Tailwind `dark:` variants and CSS custom property overrides for body, cards, tables, and text colors
- Full keyboard navigation in country dropdown (Arrow Up/Down, Enter, Escape, Home, End) with `aria-activedescendant` and `role="listbox"` / `role="option"`
- SEO & OG meta tags in `index.html`: title, description, Open Graph, theme-color
- Complete README rewrite with feature list, setup/build/deploy instructions, tech stack table, and credits
- This CHANGELOG file

### Added — Phase C (Dynamic Country Nature Ambient Scenes)
- `CountryNatureScene` component with SVG particle system (9 biome types)
- `countryNatureProfiles.ts` mapping 41 countries to nature profiles
- Page Visibility API pause for particles
- `prefers-reduced-motion` static-gradient fallback

### Added — Phase B (Radar Chart Upgrade)
- 8-color luxury palette with stroke dash patterns and 3 marker shapes
- Interactive legend (click to toggle visibility)
- Dimension toggle pills for LTO / IVR
- Persistent vertex value labels and custom tooltips
- Per-country profile cards
- ARIA label and reduced-motion support

### Fixed — Phase A (Foundation)
- ESLint `no-case-declarations` in `DimensionRadar.tsx`
- ESLint `react-refresh/only-export-components` in `AdviceContextSelector.tsx`
- ESLint `react-hooks/set-state-in-effect` and `exhaustive-deps` in `LanguageContext.tsx`
- Replaced all hardcoded Korean UI strings with `t()` calls in `AdviceContextSelector`, `BilateralNegotiationAdvice`, and `HamburgerMenu`
- Added missing i18n translation keys for radar chart, profile cards, and advice components
- Responsive mobile fix in `ClusterMap` (resize-aware behavior)

### Data Update
- Korea IDV revised: 18 → 58 (Hofstede Insights 2023)
- Korea cluster revised: pyramid → machine

---

## [1.0.0] — 2026-05-10

- Initial release with country selection, radar chart, bar chart, comparison table, and bilateral negotiation advice
- 6 cultural clusters (Wursten Mental Images)
- 8 situational advice contexts
- Korean / English bilingual support
- Luxury editorial UI design system

---

*Commit hashes for reference:*
- `21a78fc` — Phase C: dynamic country nature ambient scenes
- `fee7e35` — Phase B: radar chart with animations, interactivity, and accessibility
- `f31ec05` — Phase A: resolve lint errors, i18n gaps, and mobile resize bug
- `9931963` — Data: update Korea IDV 18→58, revise cluster & negotiation advice
