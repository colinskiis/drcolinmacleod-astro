#!/bin/bash

# Deploy script for drcolinmacleod.com
# Builds the site and syncs to Namecheap hosting

set -e

echo "🔨 Building site..."
npm run build

echo "🚀 Deploying to Namecheap..."
rsync -avz --delete \
    -e "ssh -p 21098 -i ~/.ssh/namecheap_rsa" \
    dist/ \
    drcohmrh@business81.web-hosting.com:~/public_html/

echo "✅ Deployment complete!"
echo "🌐 Site: https://drcolinmacleod.com"
