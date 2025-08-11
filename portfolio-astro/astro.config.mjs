// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/draft')
    })
  ],
  vite: {
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks: {
            embla: ['embla-carousel']
          }
        }
      }
    },
    optimizeDeps: {
      include: ['embla-carousel']
    }
  },
  server: { port: 4321 }
});
