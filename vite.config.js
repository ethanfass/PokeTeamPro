import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replaceAll('\\', '/')

          if (normalizedId.includes('/node_modules/react')) {
            return 'react-vendor'
          }

          if (normalizedId.includes('/src/data/')) {
            return 'pokemon-data'
          }
        },
      },
    },
  },
})
