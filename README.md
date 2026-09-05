# DrColinMacleod.com

Naturopathic care website built with Astro.

## Development

```bash
npm ci           # Install locked dependencies
npm run dev      # Start dev server at localhost:4321
npm run check    # Check types and Astro templates
```

## Contact Form Bot Protection (Cloudflare Turnstile)

Set your Turnstile site key before building:

```bash
PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here npm run build
```

For local development, add it to `.env`:

```bash
PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
```

Set your Turnstile secret key in a PHP config file outside web root:

```php
<?php
return 'your_turnstile_secret_key_here';
```

Path on Namecheap:

```bash
~/turnstile_config.php
```

## Deployment

Push to `main` and let the **Deploy production site** GitHub Actions workflow
build, publish and verify the site. Check `gh run list` after pushing.

`deploy.sh` is legacy reference material. Do not run it or publish over SSH.
SSH (`ssh namecheap`) is for inspection and debugging only.

The workflow reads `PUBLIC_TURNSTILE_SITE_KEY` from the `production` environment
variable in GitHub. A local build must also set that public site key as shown above.
Turnstile and Resend secret keys remain outside the server's web root.

## Runtime and checks

Use Node.js 22.12 or newer (CI uses Node 22).

```bash
npm run check
PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here npm run build
npm audit
```

The site uses Astro's Content Layer API. Collections are configured in
`src/content.config.ts`; underscore-prefixed archive folders are excluded.
Tailwind 3 runs through PostCSS, and the unified Markdown processor preserves
our reference and image-attribute plugins.

The optional button audit dependencies are included in `devDependencies`:

```bash
npx playwright install chromium
npm run preview -- --port 4322
# In another terminal:
npm run audit:buttons
```

The button audit inspects a locally built site; it is not a complete accessibility audit.
