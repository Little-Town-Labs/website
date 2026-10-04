import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.littletownlabs.com',
  output: 'static',
  integrations: [sitemap()],
  build: {
    // Keep CSS and JS as external files so a strict CSP (no inline) works.
    inlineStylesheets: 'never',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
