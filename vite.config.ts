import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      external: [
        '@noble/curves',
        '@noble/hashes',
        'semver',              // ⬅⬅⬅ KLJUČNO
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    dedupe: ['semver'],       // ⬅⬅⬅ KLJUČNO
  },
  optimizeDeps: {
    exclude: ['semver'],      // ⬅⬅⬅ KLJUČNO
  },
})
