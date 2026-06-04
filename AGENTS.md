# AGENTS.md — Hofstede Cultural Compass v3

## Project Overview

Bilingual (KO/EN) React SPA for Hofstede's 6 cultural dimensions across 42 countries. Live: https://hofstede.trinos.group Owner: Trinos Strategy (DK Kim)

## Tech Stack

- React 19.2 + TypeScript 5.9
- Vite 7.2 + Tailwind CSS v4
- Recharts 3.6 (radar + bar charts — DO NOT REPLACE)
- Framer Motion 12 (animations — DO NOT REPLACE)
- Lucide React (icons)
- Deploy: GitHub Pages via Actions

## Local Path

~/Documents/10-projects/Hofstede

## Sacred Rules (NEVER violate)

1. src/data/ is READ-ONLY — country dimension values must not change
2. Keep Recharts as the chart library
3. Keep Framer Motion — do not add GSAP, anime.js
4. All user-facing text needs both KO + EN in src/i18n/translations.ts
5. URL state format (?countries=KOR,USA&context=NEGOTIATION) must stay stable
6. Dark mode class toggle on document.documentElement must stay functional
7. No `any` TypeScript types

## Git Conventions

- Branch naming: redesign/v3-*
- Commit format: feat|fix|perf|style: description
- Always run `npm run lint && npm run build` before committing

## Definition of DONE

- npm run lint: 0 errors
- npm run build: passes, no warnings about missing chunks
- All existing features accessible: radar, bar chart, bilateral advice, country selector, dark mode, language toggle, PNG export, URL sharing