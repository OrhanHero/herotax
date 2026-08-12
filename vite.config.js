import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sitemapPlugin } from './scripts/sitemap.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sitemapPlugin()],
  define: {
    /* Zeitpunkt des Builds. Der Deploy-Workflow baut bei jedem Push und
       zusätzlich alle 4 Stunden per Cron, damit entspricht dieser Wert
       dem Stand der ausgelieferten Webseite. */
    __BUILD_TIME__: JSON.stringify(Date.now()),
  },
})
