#!/bin/bash

# Deploy script for drcolinmacleod.com
# Builds the site and syncs to Namecheap hosting

set -e

echo "🔨 Building site..."
npm run build

echo "🚀 Deploying to Namecheap..."
SSH_KEY_PATH="${SSH_KEY_PATH:-$HOME/.ssh/namecheap_rsa}"
RSYNC_SSH="ssh -p 21098"

if [ -n "${SSH_KEY_PATH:-}" ] && [ -f "$SSH_KEY_PATH" ]; then
    RSYNC_SSH="$RSYNC_SSH -i \"$SSH_KEY_PATH\""
fi

rsync -avz --delete \
    --exclude '.well-known/' \
    -e "$RSYNC_SSH" \
    dist/ \
    drcohmrh@business81.web-hosting.com:~/public_html/

echo "✅ Deployment complete!"
echo "🌐 Site: https://drcolinmacleod.com"
