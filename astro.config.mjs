// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import rehypeReferences from './src/lib/rehype-references.mjs';
import rehypeImageAttrs from './src/lib/rehype-image-attrs.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://drcolinmacleod.com',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [
    mdx(),
    sitemap()
  ],
  vite: { css: { postcss: { plugins: [tailwind(), autoprefixer()] } } },
  markdown: {
    processor: unified({ rehypePlugins: [rehypeReferences, rehypeImageAttrs] }),
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  }
});
