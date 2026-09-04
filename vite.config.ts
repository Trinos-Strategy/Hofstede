import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  optimizeDeps: {
    include: ['react', 'react-dom', 'recharts', 'framer-motion'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          // React 생태계 + React를 참조하는 라이브러리는 반드시 한 청크로
          // (recharts 내부의 react-smooth, react-resize-detector 등이
          //  React.forwardRef를 참조하므로 vendor-react와 분리되면 undefined 에러 발생)
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react/jsx-runtime') ||
            id.includes('node_modules/react/jsx-dev-runtime') ||
            id.includes('node_modules/scheduler/') ||
            id.includes('node_modules/react-is/') ||
            id.includes('node_modules/prop-types/') ||
            id.includes('node_modules/react-smooth/') ||
            id.includes('node_modules/react-resize-detector/')
          ) {
            return 'vendor-react';
          }

          if (
            id.includes('node_modules/recharts/') ||
            id.includes('node_modules/d3') ||
            id.includes('node_modules/classnames/') ||
            id.includes('node_modules/lodash/')
          ) {
            return 'vendor-charts';
          }

          if (
            id.includes('node_modules/framer-motion/') ||
            id.includes('node_modules/motion-dom/') ||
            id.includes('node_modules/motion-utils/')
          ) {
            return 'vendor-motion';
          }

          if (
            id.includes('node_modules/lucide-react/') ||
            id.includes('node_modules/@lucide/')
          ) {
            return 'vendor-icons';
          }
        },
      },
    },
  },
})
