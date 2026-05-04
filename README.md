# DrColinMacleod.com

Naturopathic medicine website built with Astro.

## Development

```bash
npm install      # Install dependencies
npm run dev      # Start dev server at localhost:4321
npm run build    # Build for production
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

Deploy to Namecheap hosting via SSH:

```bash
./deploy.sh
```

This builds the site and syncs to the server using rsync (only uploads changed files).

### SSH Setup

The deploy script uses SSH key authentication:
- **Host**: `business81.web-hosting.com`
- **Port**: `21098`
- **User**: `drcohmrh`
- **Key**: `~/.ssh/namecheap_rsa`

To connect manually: `ssh namecheap` (configured in `~/.ssh/config`)
