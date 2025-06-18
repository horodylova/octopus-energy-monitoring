import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "url"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 0,
  },
  resolve: {
    alias: [
      { find: '@assets/templates/ai-usage-monitoring', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
    ],
  },
})
