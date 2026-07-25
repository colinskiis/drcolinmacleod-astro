// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import rehypeReferences from './src/lib/rehype-references.mjs';
import rehypeImageAttrs from './src/lib/rehype-image-attrs.mjs';

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
    rehypePlugins: [rehypeReferences, rehypeImageAttrs],
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  }
});
