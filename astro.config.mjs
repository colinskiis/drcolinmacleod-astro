// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import rehypeReferences from './src/lib/rehype-references.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://drcolinmacleod.com',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap(),
    tailwind()
  ],
  markdown: {
    rehypePlugins: [rehypeReferences],
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  }
});
