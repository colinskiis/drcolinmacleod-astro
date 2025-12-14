# Claude Code Context

## Project Overview

DrColinMacleod.com - Naturopathic medicine practice website built with Astro.

## Deployment

**To deploy changes:**
```bash
./deploy.sh
```

This script:
1. Builds the site (`npm run build`)
2. Syncs `dist/` to Namecheap via rsync over SSH

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

## Button Text Standards

- Header: "Book Online"
- All other buttons: "Book Your Appointment"
- Articles should NOT have inline booking links
