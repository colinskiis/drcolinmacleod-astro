#!/usr/bin/env node
/**
 * One-off helper: replace inline FAQ section wrappers with <FAQSection />.
 * Run from repo root: node scripts/migrate-faq-sections.mjs
 */
import fs from 'fs';
import path from 'path';

const pagesDir = 'src/pages';

function detectBg(sectionOpen) {
  if (sectionOpen.includes('bg-gray-50')) return 'gray';
  if (sectionOpen.includes('bg-white')) return 'white';
  return 'emerald';
}

function detectTitle(block) {
  const m = block.match(/<h2[^>]*>([^<]+)<\/h2>/);
  return m ? m[1].trim() : 'Frequently Asked Questions';
}

function migrateFile(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');
  if (!src.includes('FAQAccordion items={')) return false;
  if (src.includes('FAQSection')) return false;

  const startRe = /<!-- FAQ[^>]*-->\s*<section[^>]*>/;
  const startMatch = src.match(startRe);
  if (!startMatch) return false;

  const startIdx = src.indexOf(startMatch[0]);
  const itemsIdx = src.indexOf('FAQAccordion items={', startIdx);
  if (itemsIdx === -1) return false;

  // Find matching closing of items array
  let i = src.indexOf('{', itemsIdx + 'FAQAccordion items='.length);
  let depth = 0;
  let itemsEnd = -1;
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) {
        itemsEnd = i + 1;
        break;
      }
    }
  }
  if (itemsEnd === -1) return false;

  const afterItems = src.slice(itemsEnd);
  const sectionClose = afterItems.indexOf('</section>');
  if (sectionClose === -1) return false;
  const endIdx = itemsEnd + sectionClose + '</section>'.length;

  const block = src.slice(startIdx, endIdx);
  const bg = detectBg(block);
  const title = detectTitle(block);
  const itemsArray = src.slice(itemsIdx + 'FAQAccordion items='.length, itemsEnd).trim();

  const titleAttr =
    title !== 'Frequently Asked Questions' ? ` title="${title.replace(/"/g, '\\"')}"` : '';
  const bgAttr = bg !== 'emerald' ? ` bg="${bg}"` : '';
  const replacement = `<FAQSection${titleAttr}${bgAttr} items=${itemsArray} />`;

  src = src.slice(0, startIdx) + replacement + src.slice(endIdx);

  // Remove duplicate FAQ schema blocks immediately following (optional cleanup)
  src = src.replace(
    /\n\s*<!-- FAQ Schema[^>]*-->\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
    ''
  );

  if (!src.includes("import FAQSection from '../components/FAQSection.astro'") &&
      !src.includes('import FAQSection from "../components/FAQSection.astro"')) {
    const importLine = "import FAQSection from '../components/FAQSection.astro';\n";
    const faqImport = src.match(/import FAQAccordion[^\n]+\n/);
    if (faqImport) {
      src = src.replace(faqImport[0], importLine);
    } else {
      const firstImport = src.match(/^import .+;\n/m);
      if (firstImport) {
        src = src.replace(firstImport[0], firstImport[0] + importLine);
      }
    }
  }

  src = src.replace(/import FAQAccordion[^\n]+\n/g, '');

  fs.writeFileSync(filePath, src);
  return true;
}

const files = fs
  .readdirSync(pagesDir)
  .filter((f) => f.endsWith('.astro'))
  .map((f) => path.join(pagesDir, f));

let count = 0;
for (const file of files) {
  if (migrateFile(file)) {
    console.log('migrated', file);
    count++;
  }
}

console.log(`Done. Migrated ${count} files.`);
