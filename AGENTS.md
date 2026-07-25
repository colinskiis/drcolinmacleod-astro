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

### Protected terms (regulatory — do not regress)

Following a July 2026 letter from counsel for the College of Physicians and
Surgeons of NS citing s.22(1) of the *Medical Act*, the site must not describe
this practice as "medicine". When writing new content:

- Use "naturopathic care", "herbal therapy", "sports performance and injury
  care", "regenerative therapy" — never "naturopathic/herbal/sports/
  regenerative medicine", and never "medical" to describe services offered here.
- The credential is "Naturopathic Doctor (ND)" — the title authorised by s.19 of
  the Chiropractic and Naturopathy Regulations. Do not write "Doctor of
  Naturopathic Medicine".
- Legitimate and intentionally kept: journal/organisation names in citations,
  the Canadian College of Naturopathic Medicine as the school's name, historical
  traditions (TCM, Ayurvedic), drug products, and language directing patients to
  a physician. Don't "clean these up" — altering them falsifies sources or
  weakens patient-safety guidance.

## Button Text Standards

- All booking buttons: "Book Online"
- Articles should NOT have inline booking links
