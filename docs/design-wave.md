# Design wave — plan

23 September 2026 · Branch `design-wave` · **Proposed, not implemented**

This document plans a single co-ordinated change wave and records the reasoning
behind each item.

## Standing of the existing style guide

On this branch [STYLE_GUIDE.md](../STYLE_GUIDE.md) is **advisory, not binding**. Its
design positions — section order, card recipes, heading alignment, surface tinting,
decoration limits, the motion ban — are open to revision. They were written before
this wave and describe the site being replaced.

The guide is being rewritten, not discarded. Findings 1–3 below are all consequences
of drift: a page that invented its own button, two card recipes, a wandering heading
axis. An absent guide reproduces exactly that. Stage 5 rewrites the guide to describe
what this wave actually builds.

### Constraints that hold regardless

These are not design preferences and are not open on this branch:

- **Control contrast.** WCAG 1.4.11 requires 3:1 at a control's edge. `buttonStyles.ts`
  documents a real near-miss: `white/40` cleared 3.57:1 on emerald-950 but failed at
  2.74:1 on the lighter hero gradient. Every new surface is checked against the
  *lightest* surface it appears on, not the darkest.
- **Content available without JavaScript.** Nothing essential may depend on a script.
- **Visible focus, `prefers-reduced-motion`, and comfortable touch targets.**
- **Image dimensions matching the source asset's intrinsic aspect ratio.** Crops use a
  wrapper with `object-cover`; dimensions are never falsified to force one.

`AGENTS.md` is a separate file and is outside the scope of this branch entirely. The
protected terms (regulatory, following counsel's July 2026 letter), the
initial-consultation policy, deployment rules and image handling hold everywhere.
Nothing here authorises a change to clinical claims, evidence or safety guidance.

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
- Content organised by visitor task rather than by service catalogue.
- Article reading column, citation handling and editorial identity.
- The page-family concept in `global.css` — distinct structures for care pages,
  directories and articles. The concept is sound; its specific spacing and surface
  choices are open like everything else.

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

The old guide banned scroll reveals outright, and
[docs/design-review.md](design-review.md) records that as a deliberate September
decision. The ban itself is advisory here — but the *reason* behind it is one of the
standing constraints above, so it still shapes the approach.

The September removal was aimed at JavaScript-driven reveals, where content is
`opacity: 0` until a script runs. That pattern fails to a blank page on a script error
or a slow connection, and it delays text a patient came to read. That failure mode
stays prohibited. Motion that cannot fail that way is in scope:

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
  patient in pain reads. A recommendation, not a hard constraint — but it should be
  overturned deliberately rather than by accident.

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

With the guide advisory, these settle on one answer each; the answer is not required
to be the old guide's answer. Each decision is recorded in the Stage 5 rewrite.

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

### Stage 5 — Guide rewrite and verification

16. Rewrite `STYLE_GUIDE.md` to describe what this wave built: the surface ramp and
    type scale, the single card recipe, the heading axis, the button hierarchy, and
    the motion rules (CSS-only and feature-detected permitted; JavaScript-gated
    reveals prohibited; hero headline static by default).
17. Carry the standing constraints above into the rewritten guide verbatim, including
    the `buttonStyles.ts` contrast worked example. These survived the wave because
    they are not design preferences, and the new guide must say so explicitly.
18. Note in the rewrite which positions were deliberately reversed from the September
    guide, so the next pass does not restore them by assuming they were overlooked.
19. `npm run check` and a build with `PUBLIC_TURNSTILE_SITE_KEY`.
20. Responsive review at 320/390/768/1440: keyboard navigation, visible focus,
    heading order, contrast on the new neutral, text zoom, horizontal overflow.
21. `npm run audit:buttons` after the stage 2 button change, or report it unrun.

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

## Findings added during implementation

| # | Finding | Evidence | Stage |
| --- | --- | --- | --- |
| 9 | Three IV pages use centred numbered step tiles while the rest of the care family uses left-aligned numbered rows | `trace-minerals.astro:213`, `l-carnitine.astro:200`, `nad-therapy.astro:243`; `lab-testing.astro:99` uses a third variant | 3 |
| 10 | Section content widths disagree within a page: `.section-shell` is 67rem on care pages, but several sections nest a `max-w-4xl mx-auto` inside it, producing two different left edges as you scroll | `prolotherapy-for-back-pain.astro:99` and similar | 3 |

Finding 10 is the reason the heading-axis fix does not fully land on care pages:
the headings are left-aligned now, but they are left-aligned to two different
axes depending on the section.

## Implementation notes

- **Screenshot pixel-diffing is not usable as a regression check here.** Two
  captures of identical code differ by 2.8-3.2% of pixels because images load
  lazily and the capture races them. Verify rendering by measuring computed
  styles, which is deterministic, and use screenshots for human review only.
- Two spellings of the heading size pair were in use — adjacent, and split
  across other utilities — so a naive find-and-replace finds only 106 of 169.

## Corrections to the original findings

Two findings were wrong as written, and measurement caught both.

**Finding 7 (hero media) said "top-aligned".** It was already centred. The real
problem was scale: 210px of media against a 469px text column, leaving ~129px
empty above *and* below. Fixed by widening the column and cropping 4:3.

**Finding 6 (photo colour) said "cool clinical / warm outdoor / neutral beige".**
Sampling the rendered pixels says otherwise:

| image | mean R,G,B | warmth (R-B) | saturation |
| --- | --- | --- | --- |
| `in-office-blood-draw.webp` | 144, 132, 116 | 28 | 28 |
| `iv-patient-woman.webp` | 177, 174, 148 | 30 | 30 |
| `prolotherapy-knee-injection.webp` | 124, 123, 121 | 3 | 3 |

Two of the three are already closely matched for warmth (28 and 30). The actual
mismatches are that `iv-patient-woman` is roughly 35 points brighter than the
other two, and `prolotherapy-knee-injection` is nearly monochrome at saturation
3 against their 28-30.

So the fix is an exposure and saturation match, not a white-balance match.

**This one is deliberately not done in this wave.** Altering photographs of an
identifiable practitioner and patients is a content decision, not a CSS change,
and it should be a re-export from the source files rather than a filter applied
over clinical imagery. It needs the source assets and an explicit go-ahead.

## Screenshot QA after the motion change

A full-page screenshot of this site now shows blank sections, and that is an
artifact, not a bug. Chromium captures a `fullPage` screenshot with the document
at scroll position 0, so any section driven by `animation-timeline: view()` is
captured at its start frame — `opacity: 0` — even though a real visitor sees it
animate in normally.

Verified at 390px by probing computed opacity while scrolling:

| scrollY | section 1 | section 2 | section 3 |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 600 | 1 | 0 | 0 |
| 1200 | 1 | 1 | 0 |
| 2400 | 1 | 1 | 1 |

Every section reaches full opacity as it enters the viewport. For visual QA,
take viewport-sized screenshots at several scroll offsets, or emulate print
media, rather than relying on `fullPage`.

This is the second way the screenshot harness misleads on this site; the first
is the non-determinism noted above.

## Status

| Stage | State |
| --- | --- |
| 1 Tokens and foundations | Done |
| 2 Consistency fixes | Done |
| 3 Rhythm and surfaces | Done except item 11 (photography) and finding 9 |
| 4 Motion | Done |
| 5 Guide rewrite and verification | Done |

**Outstanding, both needing a decision rather than more implementation:**

- **Item 11, photography.** Needs the source assets and a go-ahead. The measured
  mismatch is exposure and saturation, not white balance — see the corrections
  above. Not appropriate to solve with a CSS filter over clinical imagery.
- **Finding 9, step tiles.** `trace-minerals`, `l-carnitine` and `nad-therapy` use
  centred numbered tiles; `lab-testing` uses a third variant; the rest of the care
  family uses left-aligned numbered rows. Consolidating means restructuring each
  page's step section, which is per-page design work rather than a sweep.

**Verification run on the final state:** `npm run check` 0 errors / 0 warnings;
production build 100 pages; no horizontal overflow, heading-level skips or duplicate
H1s at 320/390/768/1440 across eight representative pages; `npm run audit:buttons`
63 controls, 8 distinct styles, all clearing their contrast bound, the lowest at
4.21:1 against a 3:1 requirement.

A scripted text-contrast sweep flagged seven items, all inside the homepage hero.
All seven are false positives: the hero's background is a gradient, so
`backgroundColor` reports transparent and the script walks up to the body colour.
The hero's real contrast is documented in `buttonStyles.ts`. A contrast checker
used on this site needs to resolve gradient backgrounds before its output means
anything.
