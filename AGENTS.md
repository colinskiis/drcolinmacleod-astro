# Codex Context

## Project Overview

DrColinMacleod.com - Naturopathic medicine practice website built with Astro.

## Deployment

**Deployment is automatic: push to `main`.** The `Deploy production site`
GitHub Actions workflow builds, rsyncs to Namecheap, and verifies production.

**Manual fallback:**
```bash
PUBLIC_TURNSTILE_SITE_KEY=<site key> ./deploy.sh
```

This script:
1. Runs `npm run check` and builds the site (`npm run build`)
2. Aborts if the contact form has no Turnstile site key baked in
3. Syncs `dist/` to Namecheap via rsync over SSH

**SSH Details:**
- Host: `business81.web-hosting.com`
- Port: `21098`
- User: `drcohmrh`
- Key: `~/.ssh/namecheap_rsa`

Manual SSH: `ssh namecheap`

## Key Directories

- `src/pages/` - Page components (.astro)
- `src/content/articles/` - Blog articles (.md)
- `src/components/` - Reusable components
- `src/layouts/` - Page layouts
- `public/images/` - Static images

## Conventions

- **Routes**: `trailingSlash: 'always'`. Every internal link must end in `/` —
  without one the request costs a 301 redirect.
- **Nav/breadcrumb page lists** live only in `src/config/routes.ts`. Adding or
  retiring a page means editing that file, not BaseLayout/HeroSection.
- **Retiring a page**: add a 301 in `public/.htaccess` before deleting it, or
  the live URL becomes a 404.
- **Markdown images** get width/height/lazy-loading injected automatically by
  `src/lib/rehype-image-attrs.mjs` — don't hand-write them.

## Button Text Standards

- All booking buttons: "Book Online"
- Articles should NOT have inline booking links
