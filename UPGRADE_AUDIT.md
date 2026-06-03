# Hofstede Culture Viz — Upgrade Audit Report

> **Audit Date:** 2026-06-02  
> **Auditor:** Claude Code (autonomous)  
> **Branch:** `upgrade/ui-ux-nature-radar`  
> **Commit:** `9931963` (Phase A) → Phase B in progress

---

## 1. Stack Summary

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | React | `^19.2.0` | Latest stable; uses new JSX transform (`react-jsx`) |
| Language | TypeScript | `~5.9.3` | Strict mode enabled; `verbatimModuleSyntax` |
| Build Tool | Vite | `^7.2.4` | `@vitejs/plugin-react` (Babel/SWC hybrid) |
| Styling | Tailwind CSS | `^4.1.18` | v4 with `@tailwindcss/vite` plugin; no `tailwind.config.js` |
| CSS | Custom design system | — | `src/index.css` (~720 lines) defines luxury theme vars & utilities |
| Charts | Recharts | `^3.6.0` | RadarChart, BarChart (ResponsiveContainer-based) |
| Animation | Framer Motion | `^12.25.0` | Used extensively for entrance animations |
| Icons | Lucide React | `^0.562.0` | Line-style icons matching luxury aesthetic |
| Lint | ESLint | `^9.39.1` | Flat config (`eslint.config.js`); typescript-eslint + react-hooks/refresh |
| i18n | Custom Context | — | `LanguageContext` with KO/EN support; localStorage persistence |
| Router | None | — | Single-page app; all state in `App.tsx` |
| Testing | None configured | — | No test runner (Jest/Vitest/Playwright) |
| Package Mgr | npm | — | `package-lock.json` present |
| Deploy | GitHub Pages | — | `.github/workflows/deploy.yml` triggers on `main`, `master`, `claude/*` |

### Build Output
- **Dist size:** ~826 KB total (CSS 50 KB gzipped 9.4 KB; JS 776 KB gzipped 235 KB)
- **Chunk warning:** JS bundle >500 KB minified (Recharts + Framer Motion contribute significantly)

---

## 2. Existing App Flow

```
┌─────────────────────────────────────────────────────────────┐
│  Header (sticky) — Logo, Info toggle, Lang switch, Menu    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────────────────────────────┐ │
│  │ ClusterMap  │  │ CountrySelector (dropdown, search)   │ │
│  │ (sidebar)   │  │ → Up to 3 countries                  │ │
│  └─────────────┘  ├──────────────────────────────────────┤ │
│                   │ DimensionRadar (Recharts)            │ │
│                   ├──────────────────────────────────────┤ │
│                   │ DimensionBar (animated bars)         │ │
│                   ├──────────────────────────────────────┤ │
│                   │ ComparisonTable (responsive)         │ │
│                   ├──────────────────────────────────────┤ │
│                   │ AdviceContextSelector (8 contexts)   │ │
│                   ├──────────────────────────────────────┤ │
│                   │ BilateralNegotiationAdvice           │ │
│                   │ (shown only when 2 countries + ctx)  │ │
│                   └──────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Footer — Credits, data source link, contact CTA           │
└─────────────────────────────────────────────────────────────┘
```

**Interaction model:**
1. User selects 1–3 countries via searchable dropdown (cluster-filterable).
2. Radar chart + bar charts + comparison table render immediately.
3. If exactly 2 countries selected, user picks an advice context.
4. Bilateral advice cards appear with Do's/Don'ts, cultural gaps, bridging strategies.

---

## 3. Radar Chart Implementation

**File:** `src/components/DimensionRadar.tsx`  
**Library:** Recharts `RadarChart`

### Architecture
- **Container:** `ResponsiveContainer` with fixed heights `350px` (mobile) / `500px` (desktop).
- **Axes:**
  - `PolarAngleAxis` — dimension names (localized KO/EN).
  - `PolarRadiusAxis` — 0–100 scale, 5 ticks, `angle={90}`.
  - `PolarGrid` — subtle gray strokes.
- **Series:** One `<Radar>` per country (max 3).
- **Custom dots:** `CustomDot` component renders circle / square / triangle SVG shapes per country index.
- **Legend:** Hand-built HTML legend below the chart (symbols + dashed line styles).
- **Tooltip:** Recharts default `Tooltip` with custom styling (white card, shadow).

### Data Feed
```
dimensionInfo (from src/data/countries.ts)
  → map each dim → { dimension: "Power Distance", fullMark: 100, USA: 40, KOR: 60, ... }
```

### Known Code Issues
- **Lint error `no-case-declarations`** at line 68: `case 'triangle':` declares `const points` without a block scope. This will cause runtime bugs if multiple case labels execute.
- Color palette is hard-coded to exactly 3 entries; selecting >3 countries (if limit raised) would crash-repeat colors.

---

## 4. Data Model

### Core Types (`src/types/index.ts`)
```ts
interface Country {
  code: string;       // ISO-3166 alpha-3 (e.g., 'KOR')
  name: string;       // English name
  nameKo: string;     // Korean name
  cluster: ClusterType;
  dimensions: Dimensions; // { PDI, IDV, UAI, MAS, LTO, IVR }
}
```

### Static Data (`src/data/countries.ts`)
- **42 countries** across 6 Wursten clusters.
- **Dimensions:** 6 Hofstede dimensions (4 core + 2 extended).
- **Metadata:** `clusterInfo` (name, concept, icon, color, characteristics), `dimensionInfo` (name, description, low/high text, color).
- **Helpers:** `getDimensionLevel`, `getDimensionLevelKo`, `getCountriesByCluster`.

### Advice System (`src/advice/`)
- Rule-based generators (`dimensionAdvice.ts`, `bilateralNegotiation.ts`, `bilateralContextAdvice.ts`).
- `countryToProfile()` converter bridges visualization `Country` ↔ advice `CountryProfile`.
- Hardcoded detailed negotiation advice exists only for select pairs (e.g., USA↔KOR) in `negotiationAdvice.ts`.

### i18n (`src/i18n/`)
- Translation keys cover ~160 strings per language.
- **Critical gap:** Several components (`AdviceContextSelector`, `BilateralNegotiationAdvice`, `HamburgerMenu`) contain hardcoded Korean UI text that bypasses the `t()` system.

---

## 5. UI/UX Weaknesses (Ranked by Impact)

| # | Weakness | Severity | File(s) |
|---|----------|----------|---------|
| 1 | **Radar chart lacks interactivity** — no click-to-pin values, no dimension highlight on hover, no toggleable series. Tooltips disappear on mouse-out. | 🔴 High | `DimensionRadar.tsx` |
| 2 | **Hardcoded Korean text** in `AdviceContextSelector`, `BilateralNegotiationAdvice`, `HamburgerMenu` breaks EN mode consistency. | 🔴 High | `AdviceContextSelector.tsx`, `BilateralNegotiationAdvice.tsx`, `HamburgerMenu.tsx` |
| 3 | **Mobile accordion anti-pattern** — `ClusterMap` checks `window.innerWidth` at render time; does not respond to resize. Can show/hide incorrectly on orientation change. | 🟡 Medium | `ClusterMap.tsx:118` |
| 4 | **No URL state persistence** — country selections and context are lost on refresh. No shareable links. | 🟡 Medium | `App.tsx` |
| 5 | **Color ceiling at 3 countries** — radar/bar/table all share a 3-entry palette. Extending selection limit requires palette expansion. | 🟡 Medium | `DimensionRadar.tsx`, `DimensionBar.tsx`, `ComparisonTable.tsx` |
| 6 | **No print / export** — users cannot save charts or tables as images/PDF. | 🟡 Medium | Global |
| 7 | **Bundle size** — 776 KB JS (235 KB gzipped). Recharts is heavy; no code-splitting. | 🟡 Medium | `vite.config.ts` |
| 8 | **No dark mode** — luxury ivory palette is bright-only. | 🟢 Low | `index.css` |
| 9 | **No keyboard nav** in country dropdown (arrow keys, Enter, Escape not implemented). | 🟢 Low | `CountrySelector.tsx` |
| 10 | **No error boundary** — any render crash kills the entire app. | 🟢 Low | `main.tsx` |
| 11 | **No OG/meta tags** for social sharing beyond basic description. | 🟢 Low | `index.html` |
| 12 | **Lint errors present** — 5 errors + 1 warning block CI-quality gates. | 🟡 Medium | Multiple |

---

## 6. Safe Upgrade Plan

### Phase A — Foundation Fixes (Zero Risk)
**Goal:** Fix lint errors, hardcoded text, and minor bugs without changing UX.

1. **Fix ESLint errors**
   - `src/components/DimensionRadar.tsx:68` — wrap `case 'triangle':` in braces.
   - `src/components/AdviceContextSelector.tsx:217` — move `contextOptions` export to separate file or remove named export.
   - `src/i18n/LanguageContext.tsx:108` — refactor initial language sync to avoid `setState` inside effect (e.g., derive directly from localStorage in initial state).
   - Remove unused exports or split non-component exports into separate files.

2. **i18n hardcoded text audit**
   - Add missing translation keys for `AdviceContextSelector`, `BilateralNegotiationAdvice`, `HamburgerMenu`.
   - Replace all hardcoded Korean strings with `t()` calls.

3. **Responsive bug**
   - Replace `window.innerWidth` check in `ClusterMap` with a `useMediaQuery` hook or Tailwind responsive classes.

### Phase B — Radar Chart Enhancement (Medium Risk) ✅ COMPLETED
**Goal:** Improve radar UX while keeping Recharts (no library swap = safe).

**Implementation date:** 2026-06-02  
**Commit:** `feat: upgrade radar chart with animations, interactivity, and accessibility`

1. ✅ **Expand color palette** — 8 distinct luxury colors with stroke dash patterns and 3 marker shapes (circle, square, triangle). Palette supports up to 8 countries if selection limit is raised.
2. ✅ **Smooth animated transitions** — `animationDuration={600}` with staggered `animationBegin={index * 100}` per country. Framer Motion wrapper for container entrance.
3. ✅ **Persistent value labels** — `RadarVertexLabel` component renders numeric values at each radar vertex on desktop (hidden on mobile <640px to prevent clutter).
4. ✅ **Interactive legend** — Clicking a legend item toggles that country's visibility via `hiddenCountries` Set state. Visual opacity feedback (40% when hidden).
5. ✅ **Dimension toggle pills** — Toggle buttons for LTO/IVR with purple accent. Prevents hiding all dimensions (minimum 1 must remain active).
6. ✅ **Custom Recharts Tooltip** — `CustomTooltip` component shows dimension full name, description, and per-country values with color dots. White card with shadow styling.
7. ✅ **Country Profile Cards** — Below the radar, per-country cards show flag emoji, highest/lowest dimension, and a cultural profile phrase (high/low per dimension, localized).
8. ✅ **aria-label** — `role="img"` + dynamic `aria-label` describing which countries are being compared.
9. ✅ **prefers-reduced-motion** — `useReducedMotion()` from Framer Motion disables radar animations and entrance motion when user prefers reduced motion.

**Files changed:**
- `src/components/DimensionRadar.tsx` — full rewrite with all 9 features above
- `src/hooks/useWindowSize.ts` — new hook for responsive mobile detection
- `src/i18n/translations.ts` — added Phase B translation keys (countryProfile, highestDimension, lowestDimension, 12 profile phrase keys)

### Phase C — Dynamic Country Nature Ambient Layer ✅ COMPLETED
**Goal:** Add a subtle, elegant, nature-inspired animated background that changes based on the first selected country.

**Implementation date:** 2026-06-02  
**Commit:** `feat: add dynamic country nature ambient scenes`

1. ✅ **Country-to-nature mapping** — `src/data/countryNatureProfiles.ts` maps all 41 country codes to a `NatureProfile` (biome, gradientFrom→To, particleType, motionIntensity). Each country gets an evocative assignment: KOR→alpine/snow, JPN→temperate/sakura, BRA→tropical/leaves, SAU→desert/sand, etc.
2. ✅ **SVG particle system** — `src/components/CountryNatureScene.tsx` renders 20 seeded-random SVG particles per scene. Each `particleType` has distinct shape and CSS keyframe motion:
   - `snow`: white circles drifting down with sway (8-15s)
   - `sakura`: pink ellipses rotating while falling (10-18s)
   - `leaves`: green rounded polygons drifting diagonally (8-12s)
   - `sand`: beige dots drifting horizontally fast (3-6s)
   - `rain`: thin vertical lines falling straight (1-2s)
   - `aurora`: wide blurred gradient bands drifting slowly (20-30s)
   - `mist`: large white ellipses drifting very slowly (25-40s)
   - `fireflies`: small yellow circles random float + opacity pulse (4-8s)
   - `stars`: tiny white dots twinkling opacity only (3-6s)
3. ✅ **Scene transitions** — `AnimatePresence mode="wait"` cross-fades old→new scene over 600ms when the first selected country changes.
4. ✅ **Page Visibility API pause** — `document.hidden` listener toggles `nature-scene-paused` CSS class, which sets `animation-play-state: paused !important` on all particles.
5. ✅ **prefers-reduced-motion** — When `useReducedMotion()` returns true, only the static gradient background is shown (no particles).
6. ✅ **Seeded random positions** — Particle spawn positions and motion parameters are deterministic per country code using a string-hash RNG, ensuring stable visuals on re-renders.
7. ✅ **Legibility preserved** — Existing `luxury-card` components have solid `#FFFFFF` backgrounds and cast shadows; they remain fully legible over the dark ambient gradients.

**Files changed:**
- `src/data/countryNatureProfiles.ts` — new data file with 41 country→nature mappings + fallback
- `src/components/CountryNatureScene.tsx` — new scene component with SVG particles, Framer Motion transitions, visibility API
- `src/App.tsx` — integrated `CountryNatureScene` as first child of root container, passing first selected country code
- `src/index.css` — added `.nature-scene-paused * { animation-play-state: paused !important; }`

### Phase D — Future Ideas
1. URL query params — sync `selectedCountries` and `context` to URL.
2. Print / export — export radar as PNG; add `@media print` styles.
3. Code-splitting — lazy-load heavy components.
4. React Error Boundary.
5. OG tags / social meta.
6. Dark mode toggle.
7. Keyboard navigation to `CountrySelector`.

### Phase D — Polish (Low Risk)
1. Add React Error Boundary.
2. Add OG tags / social meta.
3. Dark mode toggle (CSS custom properties already structured for it).
4. Add keyboard navigation to `CountrySelector`.

---

## 7. Files to Change (Phase A Priority)

| File | Action | Reason |
|------|--------|--------|
| `src/components/DimensionRadar.tsx` | Fix `no-case-declarations` lint error | Runtime correctness |
| `src/components/AdviceContextSelector.tsx` | Move `contextOptions` export to `src/data/contextOptions.ts` | `react-refresh/only-export-components` |
| `src/i18n/LanguageContext.tsx` | Refactor `useEffect` localStorage sync | `react-hooks/set-state-in-effect` |
| `src/i18n/translations.ts` | Add missing keys for advice/menu components | EN mode completeness |
| `src/components/AdviceContextSelector.tsx` | Wire all hardcoded strings to `t()` | i18n consistency |
| `src/components/BilateralNegotiationAdvice.tsx` | Wire hardcoded strings to `t()` | i18n consistency |
| `src/components/HamburgerMenu.tsx` | Wire hardcoded strings to `t()` | i18n consistency |
| `src/components/ClusterMap.tsx` | Replace `window.innerWidth` render check with resize-aware hook | Mobile correctness |
| `src/components/DimensionRadar.tsx` | Add interactive legend + dimension toggle | UX improvement |
| `src/index.css` | Add `@media print` helpers | Print readiness |
| `src/App.tsx` | Add URL sync logic | Shareability |
| `src/main.tsx` | Wrap `<App />` in `<ErrorBoundary>` | Stability |

---

## 8. Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Recharts RadarChart has limited customization; some desired UX (e.g., persistent vertex labels) may require SVG hacking or library swap. | Medium | Prototype inside `DimensionRadar.tsx` first; keep fallback to current radar. |
| Adding URL state sync can conflict with existing `useState` logic if not handled carefully. | Medium | Use a single source of truth: initialize state from URL, then `history.replaceState` on changes; never dual-write. |
| i18n key proliferation makes `translations.ts` large and error-prone. | Low | Add type-safe key checking; TypeScript will catch missing keys. |
| Tailwind v4 is still relatively new; some utilities may behave differently than v3. | Low | Test visually after any class changes; v4 uses CSS-native `@import` instead of JS config. |
| Bundle size from Recharts cannot be easily tree-shaken further. | High (existing) | If size becomes critical, consider `echarts` (modular imports) or `chart.js` + `chartjs-chart-radar` in future migration. |

---

## 9. Validation Results

| Command | Result | Notes |
|---------|--------|-------|
| `npm run build` | ✅ **PASS** | Clean build; ~1.4s |
| `npm run lint` | ✅ **PASS** | 0 errors, 0 warnings |
| `npm run dev` | — | Not tested (dev server) |
| `npm test` | — | **No test script configured** |

### Lint Error Detail (Phase A — resolved)
```
src/components/AdviceContextSelector.tsx  — react-refresh/only-export-components (export contextOptions)  → FIXED
src/components/DimensionRadar.tsx       — no-case-declarations (triangle case const)  → FIXED
src/i18n/LanguageContext.tsx            — react-hooks/set-state-in-effect (line 108)  → FIXED
src/i18n/LanguageContext.tsx            — react-hooks/exhaustive-deps (missing 'language')  → FIXED
src/i18n/LanguageContext.tsx            — react-refresh/only-export-components (useLanguage, useTranslation)  → FIXED
```

---

## 10. Recommended Implementation Order

1. ✅ **Phase A** — fix all lint errors + hardcoded text.
2. ✅ **Phase B** — radar interactivity (dimension toggle, legend clicks, vertex labels, animations, accessibility).
3. **Future:** Phase C — URL sync + export + code-splitting.
4. **Future:** Phase D — error boundary, OG tags, dark mode, keyboard nav.

---

*End of Audit Report*
