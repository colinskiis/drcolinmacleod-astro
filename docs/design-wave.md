# Design wave — plan

23 September 2026 · Branch `design-wave` · **Proposed, not implemented**

The canonical design policy is [STYLE_GUIDE.md](../STYLE_GUIDE.md). This document
plans a single co-ordinated change wave and records the reasoning behind each item.
Where an item changes a shared design rule, it names the guide section to amend in
the same commit. Nothing here authorises a change to clinical claims, the protected
terms in `AGENTS.md`, or the initial-consultation policy.

## Why a wave rather than incremental changes

Deployment is push-to-`main`. Visual consistency work is only verifiable in
aggregate — a half-applied surface token or a partly-unified heading axis looks
worse than either the old or the new state. The wave lands on this branch as a
sequence of revertible commits and merges once, after a responsive review.

## Assessment

Reviewed locally at 1440px and 390px: home, `/services/`, `/prolotherapy/`,
`/conditions/`, `/new-patients/`, `/articles/`. This is a visual and consistency
assessment. It is not an accessibility audit, a performance audit, or a content review.

### What is working and must survive the wave

- The button system in `src/lib/buttonStyles.ts`, including its documented contrast
  ratios against both dark surfaces. Any new surface must be checked against the
  *lightest* part of the hero gradient, as that file already warns.
- Page families and the care-section rhythm in `global.css`.
- Content organised by visitor task rather than by service catalogue.
- Article reading column, citation handling and editorial identity.

### Findings

| # | Finding | Evidence | Severity |
| --- | --- | --- | --- |
| 1 | Homepage heading axis jumps left → centre → centre | `src/pages/index.astro:161` left-aligned; `:183` and `FAQSection.astro:37` centred | High |
| 2 | "View All Services" is a hand-rolled button outside the button system | `src/pages/index.astro:194`, `bg-emerald-900` pill; guide forbids per-page button colours | High |
| 3 | Two card surfaces 400px apart | Concern cards `bg-emerald-50/40` (`index.astro:171`) vs service cards `bg-white` (`FeaturedServices.astro:12`) | Medium |
| 4 | Directory heroes waste roughly a screen of vertical space, and their centred title fights the left-aligned H2 below | `/services/`, `/conditions/`; `.page-hero--general` in `global.css` | Medium |
| 5 | Palette is emerald end to end, with no neutral counterweight | Whole site | Medium |
| 6 | Service card photography is not colour-matched (cool clinical / warm outdoor / neutral) | `FeaturedServices.astro`; `AGENTS.md` asks for consistent colour treatment within a group | Medium |
| 7 | Service hero media column is top-aligned, leaving an empty lower-right quadrant | `/prolotherapy/` at ≥1024px | Low |
| 8 | Site has effectively no motion beyond hover lift, `details` transition and the search overlay | — | Low (by prior decision; see below) |

## The motion question

`STYLE_GUIDE.md` currently states: *"Scroll-triggered content reveals have been
removed: body content and the footer are visible immediately."*
[docs/design-review.md](design-review.md) records that as a deliberate September
decision.

**That decision was correct and is not being reversed.** It was made about
JavaScript-driven reveals, where content is `opacity: 0` until a script runs. That
pattern fails to a blank page on a script error or a slow connection, and it delays
text a patient came to read.

This wave introduces motion that cannot fail that way:

- **CSS-only, no JavaScript.** Reveals use `animation-timeline: view()` inside an
  `@supports (animation-timeline: view())` guard. Where the feature is unsupported
  the rule does not apply and content renders normally. The failure mode is "no
  animation", never "no content".
- **No opacity-0 default outside the guard.** No element is hidden in a stylesheet
  that a browser might apply without the timeline that reveals it.
- **Reduced motion respected.** The existing `prefers-reduced-motion` block in
  `global.css:552` already neutralises animations globally; new rules must be
  verified against it rather than assumed covered.
- **The hero headline is not animated.** It is the LCP text and the first thing a
  patient in pain reads. This is a deliberate exception to record in the guide.

Browser support to verify against current data before merging, not to assume:
scroll-driven animations are established in Chromium and shipped in recent Safari;
Firefox support is more recent and should be checked. Cross-document view
transitions are in Chromium and recent Safari; Firefox had not shipped them as of
early 2026. Both sit behind feature detection, so the support picture affects how
many visitors see the effect, not whether the site works.

## Work items

### Stage 1 — Tokens and foundations

1. Add a warm neutral surface ramp to `:root` in `global.css` alongside the existing
   `--care-paper`. One bone/sand tone plus a border tone. Emerald remains the brand.
2. Add a fluid type scale as tokens, replacing repeated `text-3xl sm:text-4xl`
   pairs in page templates. No visual size change intended at this stage.
3. Verify every new surface against `buttonStyles.ts` contrast requirements,
   including primary and secondary on the new neutral.

### Stage 2 — Consistency fixes (findings 1–3)

4. Unify the homepage heading axis to left-aligned for content sections. Centring is
   retained only for the closing dark band. Requires an alignment prop on
   `FAQSection.astro`, which currently hardcodes `text-center` on its H2 — default
   preserved so other consumers are unaffected.
5. Replace the "View All Services" pill with `ActionButton` at secondary emphasis,
   or an ordinary text link. Removes a competing second primary from the page.
6. Settle on one card surface. Proposal: white card with emerald border as the single
   recipe; the tinted variant is retired rather than kept as an option.
7. Remove the stray empty `class=""` and trailing-space class attributes in
   `index.astro` noted during review.

### Stage 3 — Rhythm and surfaces (findings 4–7)

8. Tighten `.page-hero--general` vertical padding and left-align its title to match
   the content axis below it.
9. Apply the warm neutral to alternating sections so the homepage no longer runs
   white → white → white between the trust strip and the closing band.
10. Centre-align the service hero media column at ≥1024px.
11. Colour-grade the three `FeaturedServices` photographs to a consistent treatment.
    Grading only — no reshoot, no stock substitution.

### Stage 4 — Motion (finding 8)

12. `@view-transition { navigation: auto; }` for cross-document page transitions,
    with the header named so it persists across navigation rather than repainting.
13. Scroll-driven reveals on below-the-fold sections, guarded as described above.
    Hero excluded.
14. Replace the JS `.scrolled` header class (`BaseLayout.astro:1016`) with
    `animation-timeline: scroll()`, removing the scroll listener.
15. Press states on buttons and eased nav underlines.

### Stage 5 — Guide and verification

16. Amend the "Images and motion" section of `STYLE_GUIDE.md`: record that CSS-only,
    feature-detected reveals are permitted, that JavaScript-gated reveals remain
    prohibited, and that the hero headline is not animated. Amend the rule; do not
    silently contradict it.
17. Update the card, button and surface guidance to match what stages 2–3 landed.
18. `npm run check` and a build with `PUBLIC_TURNSTILE_SITE_KEY`.
19. Responsive review at 320/390/768/1440 per the guide: keyboard navigation, visible
    focus, heading order, contrast on the new neutral, text zoom, horizontal overflow.
20. `npm run audit:buttons` after the stage 2 button change, or report it unrun.

## Explicitly out of scope

- Any change to clinical claims, evidence, safety guidance or protected terms.
- Content rewrites. This wave changes presentation.
- Testimonials or review claims (`AGENTS.md` requires a separate advertising review).
- Restructuring navigation or the route inventory.
- Animating the hero headline.
- Article template changes beyond inherited token updates.

## Open questions

- Which exact warm neutral. Proposal is a low-chroma bone that reads as warm beside
  emerald without turning cream. To be decided against a rendered comparison, not a
  hex value on paper.
- Whether finding 6 grading is done in-repo or the source assets are re-exported.
