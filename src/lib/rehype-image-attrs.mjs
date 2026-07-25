// Adds intrinsic width/height plus lazy-loading hints to markdown images.
//
// Markdown `![alt](/images/…)` syntax has no way to express these attributes,
// so without this every content image ships without dimensions and reserves no
// space during layout (cumulative layout shift). Dimensions are read from the
// file in public/ at build time, so they cannot drift from the real asset.
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');

// Same file is reused across many pages; measure each one once per build.
const dimensionCache = new Map();

async function getDimensions(src) {
  if (dimensionCache.has(src)) return dimensionCache.get(src);

  const filePath = path.join(PUBLIC_DIR, src);
  // Guard against a crafted src escaping public/ via ../
  if (!filePath.startsWith(PUBLIC_DIR + path.sep) || !existsSync(filePath)) {
    dimensionCache.set(src, null);
    return null;
  }

  let result = null;
  try {
    const { width, height } = await sharp(filePath).metadata();
    if (width && height) result = { width, height };
  } catch {
    // Unreadable or unsupported file — leave the tag untouched rather than
    // failing the whole build over one image.
    result = null;
  }

  dimensionCache.set(src, result);
  return result;
}

function collectImages(node, found) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'element' && node.tagName === 'img') found.push(node);
  for (const child of node.children ?? []) collectImages(child, found);
}

export default function rehypeImageAttrs() {
  return async (tree) => {
    const images = [];
    collectImages(tree, images);

    await Promise.all(
      images.map(async (node) => {
        const props = node.properties ?? (node.properties = {});
        const src = typeof props.src === 'string' ? props.src : '';

        // Only local, root-relative assets can be measured on disk.
        if (!src.startsWith('/') || src.startsWith('//')) return;

        // Content images sit below the hero, so lazy is always the right call.
        props.loading ??= 'lazy';
        props.decoding ??= 'async';

        if (props.width != null || props.height != null) return;

        const dimensions = await getDimensions(decodeURIComponent(src));
        if (!dimensions) return;

        props.width = dimensions.width;
        props.height = dimensions.height;
      })
    );
  };
}
