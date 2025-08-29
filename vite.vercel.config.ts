import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel-specific configuration to avoid Rollup native module issues
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    minify: false, // Disable minification to avoid native dependencies
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      input: './index.html',
      output: {
        format: 'es'
      }
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
})
