# DrColinMacleod.com Design Guide

Canonical design policy · Updated 23 September 2026

## Purpose and authority

The site should feel calm, credible and easy to navigate. Visitors should understand
what a page offers, find the information relevant to them and see a clear next step.
Visual emphasis must reflect information priority.

This is the single source of truth for design decisions. `AGENTS.md` owns practice,
content and deployment constraints; those constraints take precedence. The files
below implement this guide. Reuse their tokens and components rather than copying
values into individual pages. When changing a shared design rule, update this guide
and its implementation together.

These standards are implemented through the shared page families and apply to new
and revised work. The [design review and implementation record](docs/design-review.md)
documents the September rollout; [the design wave plan](docs/design-wave.md) documents
the later pass that produced the current tokens, surfaces and motion, including the
positions it deliberately reversed. Neither is another style guide.

## Constraints that are not design preferences

The rest of this guide is open to revision by a future design pass. These four are
not, and a pass that changes them is doing something other than design:

- **Control contrast.** WCAG 1.4.11 requires 3:1 at a control's edge and 4.5:1 for
  ordinary text. `src/lib/buttonStyles.ts` records a worked near-miss: a border at
  `white/40` cleared 3.57:1 on emerald-950 and failed at 2.74:1 on the lighter part
  of the hero gradient. Check a new surface against the **lightest** surface a
  control appears on, never the darkest, and re-run `npm run audit:buttons`.
- **Content available without JavaScript.** Nothing essential may depend on a script.
- **Visible focus, `prefers-reduced-motion`, and comfortable touch targets.**
- **Truthful image dimensions.** `width`/`height` preserve the source asset's
  intrinsic ratio; crops use a wrapper with `object-cover`, never falsified
  dimensions.

`AGENTS.md` owns practice, content and deployment constraints, including the
regulatory protected terms and the initial-consultation policy. Those take
precedence over everything here.

**Required:** shared branding, accessible interactions, accurate content, consistent
button semantics and the correct page family. **Defaults:** section order, spacing,
image placement and optional modules. Adapt defaults to the content. A useful diagram,
safety notice or comparison can justify an exception; document the reason briefly in
the relevant component or change description. No separate approval process is needed
for routine layout choices.

## One brand, distinct page families

| Family | Visitor's task | Recognizable structure |
| --- | --- | --- |
| Home | Understand the practice and choose a direction | Distinctive introductory hero, practitioner photography, concise overview and selected destinations |
| Services | Understand a service and what a visit involves | Compact service header, practical section navigation, assessment/process content, relevant options and next step |
| Conditions | Understand a concern and possible care | Compact condition header, reading-focused overview, symptoms/assessment, care options and important guidance |
| Directories | Choose a service, condition or article | Short introduction, useful group labels and compact linked entries |
| Articles | Read and explore a topic | Editorial title, author/date, continuous prose, citations and related reading |
| Practical pages | Complete a task | Fees, appointment preparation, contact or directions presented directly |

Service and condition pages form a related **care-page family**. Distinguish them
through the breadcrumb, section labels and content sequence, while keeping the same
palette, header scale, reading width and controls. Do not create a new colour scheme,
icon set or decorative motif for each service. Articles keep their editorial metadata
and reading structure; care pages emphasize assessment and practical next steps.

## Shared visual foundations

Implementation sources:

- [Global styles](src/styles/global.css): font imports, the type scale and warm
  surface tokens, headings, `.section-shell`, `.h-section`/`.h-sub`, `.card-link`,
  `.prose`, and the feature-detected motion layer.
- [Tailwind configuration](tailwind.config.mjs): inspect the configured font families
  and extensions before adding tokens.
- [Button styles](src/lib/buttonStyles.ts): button emphasis, surfaces, sizing and focus.
- [Base layout](src/layouts/BaseLayout.astro): global header, navigation and footer.
- [Route inventory](src/config/routes.ts): service/condition identity and breadcrumbs.

### Colour and surfaces

Use emerald-950 for dark care-page headers and strong headings, slate-600 for ordinary
body text, and emerald accents for links and purposeful emphasis. Amber is reserved for
relevant cautionary information.

There are **two content surfaces**: white, and one warm neutral. The warm ramp lives in
`:root` as `--surface-warm` (#f6f3ec), `--surface-warm-strong` and `--border-warm`.
`--care-paper` is an alias of `--surface-warm`, so the care family's pale band and the
directory headers are the same surface as everything else. Do not introduce a third
pale surface, and do not reintroduce a cool mint tint beside the warm one.

The warm surface exists as a counterweight: an all-emerald page stops reading as a
brand choice. It also gives white cards an edge they do not have on a white section.
Alternate surfaces where the subject genuinely changes — the homepage runs dark, warm,
white, warm, white, dark, warm — not mechanically after every heading.

Contrast on the warm surface is recorded in the token comment in `global.css`. Note
that `--surface-warm-strong` carries emerald-700 link text at 4.54:1, which clears AA
by 0.04; prefer it for borders, hovers and small fills rather than as a surface for
body links.

### Typography

Playfair Display at its loaded weight of 500 for headings, Manrope for body text and
controls. Avoid synthetic bold serif headings. Let heading size, spacing and position
do the work before adding a badge or icon. Use one H1 and logical H2/H3 levels.

**Section headings use the scale tokens, not breakpoint pairs.** `--text-h2`,
`--text-h3`, `--text-h4` and `--text-lead` are defined in `:root`, and `.h-section`
and `.h-sub` consume them. Write `class="h-section font-serif font-medium
text-emerald-950"`, never `text-3xl sm:text-4xl`. Changing a section-heading size
site-wide is then a one-line edit rather than a find-and-replace across 169 call
sites — which is what the previous spelling had grown to, in two different orders.

Body copy is normally 16–18px; long-form `.prose` defines its own readable typography.

### Alignment

**One left axis per page.** Content sections align their heading, intro and body to
the same left edge. Centred text is reserved for the dark closing band, where the
composition is deliberately symmetrical.

This means a section must not nest a centred `max-w-* mx-auto` wrapper inside
`.section-shell`: the shell already sets the measure, and a narrower centred box
inside it produces a second left edge that shifts as the reader scrolls. Constrain the
measure with `max-w-*` alone and let it align left. Prose measures (`max-w-2xl` on a
paragraph) are fine — they cap line length without moving the axis.

### Width and spacing

Always use `.section-shell` for outer alignment. Use a maximum content width around
`max-w-5xl` for care pages and approximately 65–70 characters for long prose, applied
without `mx-auto` so the left axis holds (see Alignment above). `.prose` must retain `min-width: 0`
so long content cannot force a grid column wider than a phone screen. A wide
viewport must not produce very long paragraphs.

For composed care sections, use `.care-section`, which applies the shared responsive
`--care-space` token (48–72px). Use `.care-section--tint` for a meaningful pale band
and `.care-closing` for the final dark invitation. Start with gaps of 24–32px within
a section and 32–64px between columns. Keep related content together before adding
space. Adjust shared component spacing deliberately with its consumers in mind rather than
layering page-specific overrides.

Collapse split layouts into a single reading sequence on small screens. Avoid tall
empty columns, forced equal heights and oversized headings merely to fill space.

## Care-page templates

### Shared opening and ending

Use [HeroSection](src/components/HeroSection.astro) with a breadcrumb, descriptive
H1 and a short introduction. It selects the care family from the route inventory:
services use a compact dark header with optional landscape media; conditions use a
text-led dark header. Directories and practical pages use a warm header, left-aligned
to the same axis as the content below it and tightened to 32/36px of block padding —
a directory header introduces a task and should not push the first destination off
the first screen.

Pass `textOnly` to suppress hero media. There was also a `centered` prop; once the
header stopped centring its text, it did nothing that `textOnly` did not, so it was
removed rather than left as a second spelling. Articles
retain their white editorial header with author/date information. A hero does not need an image.
If an image helps explain the service, use a restrained landscape crop. Keep stacked
hero media constrained on tablet as well as mobile; do not allow it to become a
full-screen photograph. Shared hero media
has a 512px maximum until the side-by-side layout is available at 1024px. The image
column occupies less space than the introduction. Aim for one short paragraph; add
detail to the relevant body section rather than enlarging the hero.

Use one section-navigation pattern on long pages:
[PageJumpLinks](src/components/PageJumpLinks.astro) for composed sections, or
[OnThisPage](src/components/OnThisPage.astro) through the reading layout. Do not stack
both. Use short labels that clearly describe their target headings. Links must land below
the header. Composed pages show a wrapping desktop link row and a native collapsed
mobile disclosure; reading pages show a quiet desktop sidebar and mobile disclosure.
Do not use a horizontally clipped strip or make section navigation depend on hover.

End with relevant questions when needed, a small related-care group and one primary
closing invitation. Avoid repeating the same invitation in a sidebar, boxed footer
and closing band. The global header already provides booking access.

### Service page default

1. Compact service header and optional section links.
2. What the service involves and when it may be considered.
3. Assessment or visit process, preferably concise rows or a real ordered sequence.
4. Relevant options, preparation and limitations; use only modules the service needs.
5. Optional reference details or FAQ, related care and closing next step.

Prefer open two-column sections: a short heading/lead on the left, readable detail on
the right. Use definition lists for parallel options and ordered lists only for
actual sequences. A pale section can distinguish the central care approach.

Clinical nutrition's revised assessment rows, food-first section and expandable
nutrient reference illustrate this direction. Herbal therapy's divided quality list
and unboxed applications show how to retain a page's character within the family.
These are layout references, not blanket endorsements of every sentence or component
on those pages.

### Condition page default

1. Compact text-led condition header with a Conditions breadcrumb.
2. Brief explanation and common symptoms in ordinary prose or lists.
3. Assessment and when additional care is needed, with important safety guidance visible.
4. Care options in context, with limitations alongside the relevant option.
5. Practical expectations, optional FAQ, related care and closing next step.

Start from [ClinicalContentLayout](src/components/ClinicalContentLayout.astro) for
reading-heavy pages. All Markdown care pages use this layout; the legacy branch has been removed.
`pageTemplate: clinical` remains an optional compatible frontmatter value, and the
schema defaults to it. Preserve useful
headings and stable anchors. Use diagrams only where they explain anatomy or a
process. Condition pages do not require lifestyle hero photography, prevalence
statistic strips, feature grids or a repeated “why choose” section.

Symptoms, evidence and safety guidance should remain easy to find. Simplifying the
layout must not remove necessary qualifications or weaken advice to seek other care.
This guide does not authorize changes to clinical claims merely to shorten a page.

## Article template and editorial rules

[The shared article template](src/pages/articles/[...slug].astro) owns the article
family. The [article review record](docs/article-review.md) documents the rollout.
Articles use a white editorial header, a short descriptive introduction,
author/date and reading time, restrained cover media and continuous prose. Do not
recreate service-page cards, booking sections or promotional local endings inside
articles.

- Keep the reading column at a maximum of 44rem (roughly 65–70 characters). Show
  the 14rem contents sidebar only at 1280px and above, with a 4rem gap. At smaller
  widths, use the native “On This Page” disclosure above the text.
- Treat the description as the short opening orientation. State what the reader
  will learn or the key distinction; avoid hype or a second sales headline. Do not
  add a mandatory takeaway box that simply repeats the introduction.
- Keep cover images subordinate to reading: within the text column, using the
  shared 12:5 crop. No full-bleed article hero is needed.
- Prefer short, descriptive H2s, with H3s for meaningful subsections. The contents
  list comes from Astro's rendered headings, so its labels and anchors cannot drift.
  Preserve useful old heading URLs with `.article-anchor` spans when renaming them.
- Explain a point once. A comparison, note or summary should replace repetition,
  not sit beside a paragraph saying the same thing. Optional notes use an open left
  rule; ordinary paragraphs and lists need no cards or icons.
- Length follows the subject. Short articles need no extra sections to match long
  ones. For long articles, consolidate overlapping explanations and generic endings
  before cutting substantive detail. Preserve evidence limitations, safety guidance,
  source attribution and advice to seek other care.
- Keep references visible at the end, in compact text with wrapping links. Reading
  time excludes the reference list and markup. Reading progress measures the body,
  excluding the author footer and related destinations.
- Use optional `relatedLinks` frontmatter for curated further resources. The shared
  footer provides a compact author bio, those links and up to three further articles,
  avoiding duplicate destinations. No inline booking requests or repeated Halifax
  practice pitches are needed.

Editorial layout changes are not a new clinical evidence review. Do not update
clinical claims, recommendation strength or research dates merely to make a paragraph
shorter. Draft and archived articles remain unpublished.

## Cards, icons and disclosure

**Cards group a meaningful object or destination.** They are appropriate for linked
services, article previews and an occasional self-contained reference or caution.
Ordinary explanatory paragraphs should default to open text, lists or divided rows.
Use `.care-item` for divided information blocks, `.care-note` for a supporting note
and `.directory-link` for a compact destination. `BenefitCard` retains its compatible
name but renders an open information block; its old icon badge is no longer displayed.
Avoid nested cards and successive grids of static cards.

**A linked card uses `.card-link` — the one recipe.** White surface, emerald-100
border, border-colour change on hover, shared focus ring. Two recipes previously sat
within one screen of each other on the homepage, and the tinted one read cool once the
warm surface arrived. Do not add a second card surface.

- Only genuinely interactive elements receive interactive hover, lift or pointer
  styling. Do not apply `.site-card-interactive` to static explanatory blocks. The
  lift and shadow belong to actual buttons, via `BASE` in `buttonStyles.ts`.
- Linked cards should have one clear destination, an accessible name and visible
  keyboard focus; avoid nested links or buttons inside an enclosing link.
- Use modest borders and little or no shadow. Large shadows and glass effects are
  not the default content treatment.
- Use Lucide icons when they clarify an action or meaning. Do not add an icon to
  every heading or list item. Decorative icons are hidden from assistive technology;
  icon-only controls need accessible labels.
- Use native `details`/`summary` or [FAQSection](src/components/FAQSection.astro) for
  optional reference material. Essential explanations, costs needed for a decision
  and safety guidance must not be available only behind disclosure.

The [FeaturedServices](src/components/FeaturedServices.astro) component is the shared
homepage/services preview group. Keep its images subordinate to the destination
label and description. Directory cards are navigation and can remain; simplify their
density instead of removing useful grouping.

## Images and motion

Prefer authentic practitioner and clinic photography. Use an explanatory image or
suitable stock only where an authentic asset is unavailable. Keep a consistent colour
treatment and avoid mixing unrelated photographic and illustration styles within a
group. See `AGENTS.md` for intrinsic dimensions and Markdown image handling.

Use [PublicImage](src/components/PublicImage.astro) for local images in Astro templates.
It measures the asset at build time using the same cache as Markdown image handling;
manual display dimensions must not be passed as intrinsic dimensions. Crops belong
in CSS. Retain eager loading for meaningful hero images and lazy loading below them.

Crop with an aspect-ratio or fixed-size wrapper, `overflow-hidden` and `object-cover`;
never falsify image dimensions to force the crop. Use useful alternative text and
empty alt for purely decorative images. Video should use the shared preview pattern,
with an explicit play action and appropriate accessible labelling.

### Motion

Motion is permitted, and it is **CSS-only and feature-detected**. The rule it replaces
banned scroll reveals outright; that ban was aimed at JavaScript-driven reveals, where
content sits at `opacity: 0` until a script runs and a script error leaves a blank
page. That failure mode is still prohibited. The current approach cannot produce it:

- Reveals use `animation-timeline: view()` inside `@supports (animation-timeline:
  view())`. An unsupported browser never applies the rule, so content renders
  normally. The failure mode is "no animation", never "no content".
- **No element has an `opacity: 0` start frame outside a block that guarantees the
  timeline which ends it.** This is the property that makes the approach safe; a
  change that breaks it reintroduces the original bug.
- `@media print` forces reveals to their end frame. Print has no scroll timeline, so
  an animation never advances and a section would otherwise print blank. This is the
  one remaining way a CSS-only reveal can hide content, and it is closed explicitly.
- Page transitions use `@view-transition { navigation: auto; }`, a no-op where
  unsupported. `#site-header` carries a `view-transition-name` so it persists across
  navigation instead of repainting.
- The header's scrolled state uses `animation-timeline: scroll()`. It replaced a JS
  scroll listener; do not run both.
- Every block respects `prefers-reduced-motion`, in addition to the global
  reduced-motion rule.

**The hero headline is not animated.** It is the LCP text and the first thing a
patient in pain reads. Animate below the fold.

Sections opt in with `data-reveal`; `.care-section` opts in by selector.

## Buttons and booking

Use [BookingButton](src/components/BookingButton.astro) for new booking CTAs and
[ActionButton](src/components/ActionButton.astro) for other button-like links/actions.
Both share `buttonStyles.ts`. `CTAButton` is a compatibility wrapper; do not introduce
new uses. Preserve existing global-header integration when changing navigation.

- Booking label: **Book Online**. Booking destinations come from the booking config.
- `variant` controls emphasis; `surface` matches the actual light or dark background.
  Do not invent per-page button colours.
- Supply a meaningful `source` and the appropriate `placement`. Preserve
  `data-booking-source`, which drives booking tracking; non-booking links must not
  fire booking events.
- Use ordinary text links for minor navigation. Do not turn every related reference
  into a pill button.
- Show appointment information where it helps a decision. Reuse
  [AppointmentSummary](src/components/AppointmentSummary.astro) where appropriate,
  and link to the canonical fees information instead of repeating paragraphs.
- Follow the initial-consultation policy in `AGENTS.md`. Articles have no inline
  booking links. A shorter visual layout must never imply same-day initial treatment.

Check button contrast against the actual rendered surface, including the lightest
part of a gradient. Keep the shared focus treatment; do not assume a pale decorative
border is sufficient for a control boundary.

## Accessibility and responsive review

Review changed pages at 320/390px, tablet width and a desktop width. Check keyboard
navigation, visible focus, heading order, readable contrast, text zoom, disclosure
states, anchor destinations and horizontal overflow. Make touch controls comfortably
large; aim for at least 44px where practical. Do not depend on hover for essential
navigation. Dropdown destination links and disclosure controls must remain distinct.

For implementation changes run `npm run check` and the build with the required public
Turnstile key, as described in `AGENTS.md`. Inspect actual browser rendering; a passing
build does not validate layout. For button changes, `npm run audit:buttons` requires
its installed dependencies, Playwright Chromium and a preview server; report missing
prerequisites instead of treating an unrun audit as passed.

For documentation-only changes, verify linked local paths and consistency with the
implementation; a production build is unnecessary.

## Positions this guide deliberately reversed

The September 2026 guide said otherwise on the points below. They were changed on
purpose, with the reasoning in [the design wave plan](docs/design-wave.md). Do not
restore them on the assumption that they were overlooked.

| Then | Now | Why |
| --- | --- | --- |
| Scroll-triggered reveals removed entirely | CSS-only, feature-detected reveals permitted | The ban targeted JS-gated reveals. Content can no longer be hidden by a script failure, and print is guarded. |
| `--care-paper` was a cool mint (#f3f7f4) | Alias of the warm `--surface-warm` | Two pale surfaces on one site is the same problem the two card recipes had. |
| Section headings free to be centred | One left axis; centring only on the dark closing band | The homepage axis jumped left, centre, centre within one scroll. |
| Two card surfaces (white and tinted) | One `.card-link` recipe | They sat within a screen of each other and read as unresolved. |
| Breakpoint size pairs in templates | `.h-section` / `.h-sub` scale tokens | The pair had grown to 169 call sites in two spellings. |
| Directory header centred and full-height | Left-aligned, tightened, warm | Its title sat 44px inside the content below it and cost a screen of space. |

## Keeping the guide useful

Before a design change, identify the page family and reuse its defaults. Afterward,
check whether emphasis reflects the visitor's task and whether any box, icon or CTA
can be removed without losing meaning. Update this guide only for decisions intended
to apply beyond one page. Keep page-specific findings in the review or task notes.

A recurring pattern should become a shared component once its structure is understood.
Avoid a universal component with dozens of flags to reproduce every old layout.
Use the shared family implementation as the reference. A local exception should not
become the next page’s default accidentally.
