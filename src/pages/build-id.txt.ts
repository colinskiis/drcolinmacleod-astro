import type { APIRoute } from 'astro';

// Emits the commit this build came from, so the deploy workflow can prove the
// new build is actually being served. Checking a page's HTML for the hashed
// asset is unreliable — Cloudflare can answer a bot-looking request with a 200
// challenge page, which passes a status check but contains none of the markup.
const buildId = process.env.GITHUB_SHA ?? 'local-dev';

export const GET: APIRoute = async () =>
  new Response(`${buildId}\n`, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
