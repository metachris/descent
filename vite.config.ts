import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    // Force full page reload when content.ts changes
    {
      name: 'reload-content',
      handleHotUpdate({ file, server }) {
        if (file.endsWith('content.ts')) {
          server.ws.send({ type: 'full-reload' })
          return []
        }
      }
    }
  ],
  server: {
    port: 3000,
    open: false,
    host: true,
    allowedHosts: true,
  }
})
