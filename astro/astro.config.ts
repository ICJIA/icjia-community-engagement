import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Absolute origin (no path). Placeholder Netlify URL for the manager
  // preview — swap for the real domain when one is assigned.
  site: 'https://icjia-community-engagement.netlify.app',
  output: 'static',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto',
  },
  // Tailwind 4 ships as a Vite plugin (not the v3 PostCSS pipeline).
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
