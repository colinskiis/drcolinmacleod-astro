import type { APIRoute } from 'astro';

// Emits the commit this build came from, so the deploy workflow can prove the
// new build is actually being served. Checking a page's HTML for the hashed
// asset is unreliable — Cloudflare can answer a bot-looking request with a 200
// challenge page, which passes a status check but contains none of the markup.
const buildId = process.env.GITHUB_SHA ?? 'local-dev';

// NOTE: this is a static build, so these headers are NOT sent in production —
// Astro writes the body to dist/build-id.txt and Apache serves it with its own
// headers. The real no-store rule lives in public/.htaccess; keep the two in
// sync. The headers below only apply to `astro dev`.
export const GET: APIRoute = async () =>
  new Response(`${buildId}\n`, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
