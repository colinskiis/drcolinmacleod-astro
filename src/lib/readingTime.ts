/** Estimate time spent reading the article, excluding markup and its source list. */
export function readingTime(text: string): number {
  const prose = text
    .replace(/^#{2,4} References\s*$[\s\S]*/im, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .trim();
  const words = prose ? prose.split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 225));
}
