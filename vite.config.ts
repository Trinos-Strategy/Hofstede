import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the build works at any host path: the apex custom domain
// (hofstede.trinos.group) and the GitHub Pages project URL
// (trinos-strategy.github.io/Hofstede/) alike.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  optimizeDeps: {
    include: ['react', 'react-dom', 'recharts', 'framer-motion'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    minify: 'terser',
    // manualChunks 제거: recharts 내부 라이브러리(react-smooth, react-resize-detector 등)가
    // React.forwardRef를 참조하는데, 수동 청크 분리로 인해 청크 로드 순서 문제가
    // 발생하여 앱이 백지로 렌더되는 문제를 해결하기 위해,
    // Rollup이 의존성 그래프 기반으로 자동 분할하도록 맡깁니다.
  },
})
