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

## 🔐 Custom Domain & HTTPS (중요 — 현재 HTTPS 미적용 상태)

이 저장소는 커스텀 도메인 `hofstede.trinos.group`(CNAME → `trinos-strategy.github.io`)을 사용합니다.

**현재 상태(2026-09-04 기준):** GitHub Pages 설정에서 도메인이 **미인증(unverified)** 상태이고
HTTPS 인증서가 발급되지 않아, `https://hofstede.trinos.group/` 접속 시 인증서 오류
(`ERR_CERT_COMMON_NAME_INVALID`)가 발생합니다. GitHub은 2025년부터 인증된 도메인에만
인증서를 발급합니다.

### 복구 절차 (DNS 관리자 필요 — trinos.group은 Porkbun 관리)

1. 저장소 **Settings → Pages → Custom domain**에 `hofstede.trinos.group`을 다시 입력합니다.
   GitHub이 인증용 TXT 레코드를 표시합니다. 보통 형식은:
   - 이름(Host): `_github-pages-challenge-Trinos-Strategy` (조직 소유 저장소의 경우)
   - 값: GitHub이 표시하는 고유 코드
2. DNS(Porkbun)에서 위 TXT 레코드를 추가합니다.
3. Pages 설정으로 돌아와 도메인을 **Verify**합니다. 인증서 발급은 보통 수 분 ~ 1시간 걸립니다.
4. 인증서가 발급되면 **Enforce HTTPS**를 체크합니다.

DNS 수정 전까지는 `http://hofstede.trinos.group/`(HTTP) 또는
`https://trinos-strategy.github.io/Hofstede/`로 접속할 수 있습니다.

> 빌드는 `base: './'`(상대 경로)이므로 커스텀 도메인 제거 후 프로젝트 페이지
> (`/Hofstede/` 경로)에서도 그대로 작동합니다. `public/CNAME` 파일이 커스텀 도메인을
> 유지하도록 보장합니다.

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
