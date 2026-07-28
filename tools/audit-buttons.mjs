import { chromium } from 'playwright';
import { PNG } from 'pngjs';

/**
 * Measures every button-like control against the pixels actually rendered
 * behind it.
 *
 *   npm i -D playwright pngjs      # not permanent deps: CI does not run this
 *   npx astro build && npx astro preview --port 4322
 *   npm run audit:buttons
 *
 * An earlier version walked up the DOM for an ancestor background-color. That
 * is wrong wherever the backdrop is a gradient or an image — it reported the
 * homepage hero as light grey when it is dark green, and flagged a passing
 * button as a 1.79:1 failure. Sampling the framebuffer cannot be fooled that
 * way.
 */
const PAGES = [
  '/', '/about/', '/contact/', '/new-patients/', '/services/', '/conditions/',
  '/articles/', '/patient-resources/', '/lab-testing/', '/iv-therapy/',
  '/low-back-pain/', '/acupuncture/', '/prolotherapy/', '/nad-therapy/',
  '/hormone-testing/', '/clinical-nutrition/', '/herbal-therapy/',
  '/chelation-therapy/', '/trace-minerals/', '/l-carnitine/',
];

const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => { const [x, y] = [L(a), L(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const hex = ([r, g, b]) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

const browser = await chromium.launch();
// 2x so a 1px border occupies two device pixels and cannot be stepped over.
const DPR = 2;
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: DPR });
const styles = new Map();

for (const path of PAGES) {
  await page.goto(`http://localhost:4322${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(250);
  await page.evaluate(() => window.scrollTo(0, 0));

  const cands = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('a, button')) {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      // A control, not a card: pill-ish, modest size, and it has a fill or border.
      const radius = parseFloat(cs.borderRadius) || 0;
      const filled = cs.backgroundColor !== 'rgba(0, 0, 0, 0)';
      const bordered = parseFloat(cs.borderTopWidth) > 0;
      if (r.width < 60 || r.width > 460 || r.height < 28 || r.height > 90) continue;
      if (radius < 14) continue;
      if (!filled && !bordered) continue;
      const text = (el.innerText || '').trim().replace(/\s+/g, ' ');
      if (!text) continue;
      out.push({
        text: text.slice(0, 30), bg: cs.backgroundColor, color: cs.color,
        border: bordered ? cs.borderTopColor : null,
        booking: el.hasAttribute('data-booking-source'),
        key: `${cs.backgroundColor}|${cs.borderTopColor}|${cs.borderTopWidth}|${cs.color}`,
        sel: el.getAttribute('data-booking-source') || text.slice(0, 22),
      });
    }
    return out;
  });
  if (!cands.length) continue;

  const shotBuf = await page.screenshot({ fullPage: true });
  const png = PNG.sync.read(shotBuf);
  const px = (x, y) => {
    x = Math.round(x * DPR); y = Math.round(y * DPR);
    if (x < 0 || y < 0 || x >= png.width || y >= png.height) return null;
    const i = (png.width * y + x) << 2;
    return [png.data[i], png.data[i + 1], png.data[i + 2]];
  };

  const boxes = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('a, button')) {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const radius = parseFloat(cs.borderRadius) || 0;
      const filled = cs.backgroundColor !== 'rgba(0, 0, 0, 0)';
      const bordered = parseFloat(cs.borderTopWidth) > 0;
      if (r.width < 60 || r.width > 460 || r.height < 28 || r.height > 90) continue;
      if (radius < 14) continue;
      if (!filled && !bordered) continue;
      if (!(el.innerText || '').trim()) continue;
      out.push({ x: r.x + window.scrollX, y: r.y + window.scrollY, w: r.width, h: r.height });
    }
    return out;
  });

  for (let i = 0; i < cands.length && i < boxes.length; i++) {
    const c = cands[i], b = boxes[i];
    // Just outside the edge, vertically centred.
    const outside = [px(b.x - 8, b.y + b.h / 2), px(b.x + b.w + 8, b.y + b.h / 2)].filter(Boolean);
    // Well inside the fill, above the text baseline where no glyphs sit.
    const inside = [px(b.x + b.w / 2, b.y + 5), px(b.x + 8, b.y + b.h / 2)].filter(Boolean);
    if (!outside.length || !inside.length) continue;
    const back = outside[0];
    const fill = inside[0];
    // Sweep across the edge rather than guessing where it is. A 1px border on a
    // rounded pill is antialiased and lands at a subpixel offset, so probing a
    // single column silently measured the fill instead and reported a 9.7:1
    // button as 1.18:1. Take whichever pixel in the band is most distinct from
    // the backdrop: that is the edge a user actually sees.
    let edge = fill, best = -1;
    for (let dx = -1.5; dx <= 4; dx += 0.5) {
      const s1 = px(b.x + dx, b.y + b.h / 2);
      if (!s1) continue;
      const c = ratio(s1, back);
      if (c > best) { best = c; edge = s1; }
    }
    const rec = styles.get(c.key) || { ...c, n: 0, pages: new Set(), fill, back, edge };
    rec.n++; rec.pages.add(path);
    styles.set(c.key, rec);
  }
}
await browser.close();

// Either the fill or the border can delineate the control, so the effective
// boundary is whichever a user can actually see.
const list = [...styles.values()].map((r) => ({
  ...r,
  boundary: Math.max(ratio(r.fill, r.back), ratio(r.edge, r.back)),
  via: ratio(r.edge, r.back) > ratio(r.fill, r.back) ? 'border' : 'fill',
})).sort((a, b) => a.boundary - b.boundary);

console.log(`\n${list.reduce((s, r) => s + r.n, 0)} controls, ${list.length} distinct styles\n`);
console.log('bound   n   label                          fill      backdrop');
console.log('-'.repeat(92));
for (const r of list) {
  const flag = r.boundary < 3 ? 'FAIL' : ' ok ';
  console.log(
    `${r.boundary.toFixed(2).padStart(5)} ${flag} ${String(r.n).padStart(3)}  ` +
    `${(r.booking ? '[book] ' : '') + r.text}`.padEnd(32).slice(0, 32) +
    ` ${hex(r.via === 'border' ? r.edge : r.fill)} (${r.via}) on ${hex(r.back)}`,
  );
  if (r.boundary < 3) console.log(`            ${[...r.pages].slice(0, 5).join(' ')}`);
}
