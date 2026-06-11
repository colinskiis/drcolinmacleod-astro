#!/bin/bash

# Deploy script for drcolinmacleod.com
# Builds the site and syncs to Namecheap hosting

set -euo pipefail

REMOTE="drcohmrh@business81.web-hosting.com:~/public_html/"
SSH_OPTS=(-p 21098)
SSH_KEY_PATH="${SSH_KEY_PATH:-$HOME/.ssh/namecheap_rsa}"
if [[ -f "$SSH_KEY_PATH" ]]; then
  SSH_OPTS+=(-i "$SSH_KEY_PATH")
fi
RSYNC_SSH=(ssh "${SSH_OPTS[@]}")

preflight_rsync() {
  echo "🔍 Preflight: clearing stuck rsync on server..."
  # [r] bracket prevents pkill from matching (and killing) the shell running this command
  ssh "${SSH_OPTS[@]}" drcohmrh@business81.web-hosting.com \
    "pkill -f 'rsync --serve[r]' 2>/dev/null || true"
}

echo "🔨 Building site..."
npm run build

preflight_rsync

echo "🚀 Deploying to Namecheap..."
if rsync -avz --delete --timeout=300 --stats \
    --exclude '.well-known/' \
    -e "${RSYNC_SSH[*]}" \
    dist/ \
    "$REMOTE"; then
  echo "✅ Deployment complete!"
  echo "🌐 Site: https://drcolinmacleod.com"
  exit 0
fi

echo "⚠️  Full rsync failed or timed out; retrying in smaller batches..."
for path in dist/*/; do
  name=$(basename "$path")
  [[ "$name" == "_astro" ]] && continue
  echo "→ $name"
  rsync -avz --timeout=120 --exclude '.well-known/' \
    -e "${RSYNC_SSH[*]}" \
    "$path" "$REMOTE" || exit 1
done
rsync -avz --timeout=120 \
  -e "${RSYNC_SSH[*]}" \
  dist/index.html dist/404.html dist/favicon.svg dist/sitemap-index.xml dist/sitemap-0.xml \
  "$REMOTE" 2>/dev/null || true

echo "✅ Batched deployment complete!"
echo "🌐 Site: https://drcolinmacleod.com"
