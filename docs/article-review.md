# Article editorial and layout review

7 September 2026 · Implementation record; [STYLE_GUIDE.md](../STYLE_GUIDE.md) remains
the design authority.

## Scope

The initial pass covered all 40 published articles. The WaterTok article was then
removed at the owner’s request, leaving 39 published articles using the revised family.
Its old URL redirects permanently to `/articles/nutrition/`. The unpublished
mistletoe draft and archived articles were left unchanged.

The shared template now provides a 44rem reading column, an optional 14rem sidebar
from 1280px, compact cover photography, a native mobile contents disclosure and a
plain author/resource footer. Contents links use Astro's rendered headings. FAQs
retain native disclosure and structured data in a compact editorial section.

The collection received shorter descriptive introductions and headings, selected
title edits, removal of repeated local sales endings, and consolidation of generic
conclusions. Curated links from removed resource/promotional sections moved into
`relatedLinks` frontmatter. The footer avoids repeating these destinations in its
three related articles. Existing URLs remain unchanged, and renamed section headings
retain aliases for useful old fragment URLs.

The peptides article received the largest consolidation: overlapping category,
evidence, product-quality, marketing and anti-doping summaries were merged. Its body
went from approximately 2,227 to 1,267 words (43% shorter), excluding references and
HTML markup. The displayed reading time is six minutes. All 13 references remain.

Publication dates use UTC to prevent date-only frontmatter from displaying a day
early in Halifax. The byline labels the September editorial revision “Edited”; it
is not a claim of a new clinical evidence review. Reading time excludes references,
URLs and markup. The progress bar measures the body rather than the related-reading
footer.

## Validation

- Astro check: 81 files, no errors, warnings or hints.
- Production build: 101 pages, with the required public Turnstile key.
- Browser layout checks: 40 articles at 320, 390, 768, 1024 and 1440px (200 cases).
  No horizontal overflow, duplicate IDs, broken local section links or extra H1s.
- Visual inspection: desktop and mobile peptides, short magnesium article and
  dense IBS/IBD layout; article FAQ checked separately.
- Interaction checks: keyboard-operated mobile contents, desktop section links,
  old and new anchors, anchor positioning below the header, 44px disclosure target,
  reading progress, FAQ operation and reading/navigation with JavaScript disabled.
- Source comparison: original reference lists and citation-number sets retained
  across the published collection. This is preservation checking, not a new
  validation of the underlying clinical literature.
- Reading-time checks: reference lists, hidden anchor markup and link URLs do not
  inflate the estimate; empty content retains the one-minute minimum.
