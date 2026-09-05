# Hofstede Cultural Compass

An interactive, bilingual (Korean / English) visualization tool for comparing cultural dimensions across 42 countries using **Geert Hofstede's** framework and **Huib Wursten's** "Mental Images" cultural clusters. Explore Power Distance, Individualism, Masculinity, Uncertainty Avoidance, Long-Term Orientation, and Indulgence through animated radar charts, bar comparisons, and situational bilateral advice.

---

## ✨ Features

### Phase A — Foundation
- 42 countries mapped to 6 cultural clusters (Contest, Network, Family, Pyramid, Solar System, Machine)
- Full i18n support (Korean & English) with localStorage persistence
- Responsive luxury UI inspired by high-end editorial design
- Sticky header, hamburger navigation, and smooth scroll sections

### Phase B — Radar Chart Upgrade
- Interactive Recharts radar with 8-color palette, dashed strokes, and shape markers
- Clickable legend to toggle country visibility
- Dimension toggle pills (LTO / IVR)
- Persistent vertex value labels and custom tooltips
- Per-country profile cards showing highest / lowest dimensions
- `prefers-reduced-motion` and full ARIA support

### Phase C — Ambient Nature Scenes
- Dynamic SVG particle backgrounds that change based on the first selected country
- 9 particle types: snow, sakura, leaves, sand, rain, aurora, mist, fireflies, stars
- Page Visibility API pause and reduced-motion fallback
- Framer Motion cross-fade transitions between scenes

### Phase D — UX Polish & Deployment Readiness
- **URL state sync** — shareable links with `?countries=KOR,USA&context=NEGOTIATION`
- **React Error Boundary** — friendly fallback UI with reload button
- **PNG Export** — download radar chart as `hofstede-chart-{timestamp}.png` via dynamic `html2canvas` import
- **Dark mode toggle** — persisted in `localStorage`, flash-free inline script in `index.html`
- **Keyboard navigation** — Arrow keys, Enter, Escape in country dropdown
- **SEO / OG meta tags** — title, description, Open Graph, theme-color

---


---

## 🔐 Custom Domain & HTTPS (✅ 완료 — 2026-09-05)

커스텀 도메인 `hofstede.trinos.group`(CNAME → `trinos-strategy.github.io`)이 HTTPS로 서빙됩니다.

- 조직 도메인 `trinos.group`: **Verified**
- 저장소 Pages: **Enforce HTTPS 활성화** (http → https 301 리다이렉트)
- 인증: Cloudflare TXT `_github-pages-challenge-Trinos-Strategy` 추가로 완료

> ⚠️ **DNS는 Porkbun이 아니라 Cloudflare에서 관리됩니다** (NS: `gabe.ns.cloudflare.com`, `sydney.ns.cloudflare.com`).
> 이 도메인의 레코드 추가/변경은 반드시 **Cloudflare 대시보드**에서 하세요. Porkbun에서
> "기본 네임서버로 변경"을 누르면 Cloudflare 존의 모든 레코드가 끊깁니다.

---

## 🚀 Local Setup

```bash
# Clone the repository
git clone https://github.com/Trinos-Strategy/hofstede-culture-viz.git
cd hofstede-culture-viz

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🏗️ Build

```bash
npm run build
```

The production bundle is output to `dist/`.

---

## 🌐 Deploy

This project uses **GitHub Pages** via the existing GitHub Actions workflow:

```bash
# Push to main (or any claude/* branch) to trigger deployment
git push origin main
```

The workflow is defined in `.github/workflows/deploy.yml`:
- Builds on Node.js 20
- Uploads `dist/` as a Pages artifact
- Deploys automatically on push to `main`, `master`, or `claude/*`

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | `^19.2.0` |
| Language | TypeScript | `~5.9.3` |
| Build Tool | Vite | `^7.2.4` |
| Styling | Tailwind CSS | `^4.1.18` |
| Charts | Recharts | `^3.6.0` |
| Animation | Framer Motion | `^12.25.0` |
| Icons | Lucide React | `^0.562.0` |
| Export | html2canvas | `^1.4.1` (dynamic import) |
| Lint | ESLint | `^9.39.1` |
| Deploy | GitHub Pages | — |

---

## 📚 Credits

- **Geert Hofstede** — Cultural Dimensions Theory
- **Huib Wursten** — "Mental Images" cultural cluster research
- **Trinos Strategy** — Research Lab, design & development
- Data source: [The Culture Factor](https://www.theculturefactor.com/country-comparison-tool)

---

*© 2026 Trinos Research Lab. All rights reserved.*
