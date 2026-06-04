import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  optimizeDeps: {
    include: ['recharts', 'framer-motion'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')
            ) {
              return 'vendor-react';
            }
            if (
              id.includes('node_modules/recharts/') ||
              id.includes('node_modules/d3') ||
              id.includes('node_modules/react-resize-detector/') ||
              id.includes('node_modules/react-smooth/') ||
              id.includes('node_modules/classnames/') ||
              id.includes('node_modules/prop-types/') ||
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
          }
        },
      },
    },
  },
})
