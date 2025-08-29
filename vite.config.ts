import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    target: 'es2015',
    sourcemap: false,
    rollupOptions: {
      input: './index.html'
    }
  },
  esbuild: {
    target: 'es2015'
  },
  server: {
    port: 3000
  }
})
