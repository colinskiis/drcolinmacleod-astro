# DrColinMacleod.com

Naturopathic medicine website built with Astro.

## Development

```bash
npm install      # Install dependencies
npm run dev      # Start dev server at localhost:4321
npm run build    # Build for production
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
