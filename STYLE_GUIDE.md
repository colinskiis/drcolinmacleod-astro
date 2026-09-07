# DrColinMacleod.com Design Guide

Canonical design policy · Updated 7 September 2026

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
documents the September rollout and validation; it is not another style guide.

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

- [Global styles](src/styles/global.css): font imports, CSS variables, headings,
  `.section-shell`, `.prose` and shared utilities.
- [Tailwind configuration](tailwind.config.mjs): inspect the configured font families
  and extensions before adding tokens.
- [Button styles](src/lib/buttonStyles.ts): button emphasis, surfaces, sizing and focus.
- [Base layout](src/layouts/BaseLayout.astro): global header, navigation and footer.
- [Route inventory](src/config/routes.ts): service/condition identity and breadcrumbs.

### Colour and typography

Use emerald-950 for dark care-page headers and strong headings, slate-600 for ordinary
body text on white, and emerald accents for links and purposeful emphasis. White is
the default content surface. The shared `--care-paper` surface marks a meaningful
change in subject and introduces directories and practical pages. Amber is reserved for relevant cautionary information. Do not alternate
backgrounds mechanically after every heading.

Use the existing Playfair Display heading font at its loaded weight of 500 and
Manrope for body text and controls. Avoid synthetic bold serif headings. Let heading
size, spacing and position do the work before adding a badge or icon. Use one H1 and
logical H2/H3 levels. Most care-page H2s should be 30–36px and H3s 20–24px; these are
defaults, not reasons to override a shared component. Body copy is normally 16–18px;
long-form `.prose` already defines readable typography.

### Width and spacing

Always use `.section-shell` for outer alignment. Use a maximum content width around
`max-w-5xl` for care pages and approximately 65–70 characters for long prose. `.prose` must retain `min-width: 0`
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
text-led dark header. Directories and practical pages use a pale header. Articles
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

## Cards, icons and disclosure

**Cards group a meaningful object or destination.** They are appropriate for linked
services, article previews and an occasional self-contained reference or caution.
Ordinary explanatory paragraphs should default to open text, lists or divided rows.
Use `.care-item` for divided information blocks, `.care-note` for a supporting note
and `.directory-link` for a compact destination. `BenefitCard` retains its compatible
name but renders an open information block; its old icon badge is no longer displayed.
Avoid nested cards and successive grids of static cards.

- Only genuinely interactive elements receive interactive hover, lift or pointer
  styling. Do not apply `.site-card-interactive` to static explanatory blocks.
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

Motion should confirm an interaction. Scroll-triggered content reveals have been
removed: body content and the footer are visible immediately. The homepage introduction is also visible immediately. Respect reduced-motion
preferences across all controls.
Content must remain available when animation or JavaScript fails.

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

## Keeping the guide useful

Before a design change, identify the page family and reuse its defaults. Afterward,
check whether emphasis reflects the visitor's task and whether any box, icon or CTA
can be removed without losing meaning. Update this guide only for decisions intended
to apply beyond one page. Keep page-specific findings in the review or task notes.

A recurring pattern should become a shared component once its structure is understood.
Avoid a universal component with dozens of flags to reproduce every old layout.
Use the shared family implementation as the reference. A local exception should not
become the next page’s default accidentally.
