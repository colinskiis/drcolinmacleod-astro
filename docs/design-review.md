# Service and condition design review

7 September 2026 · Working-tree assessment

The canonical design policy is [STYLE_GUIDE.md](../STYLE_GUIDE.md). This document
records the initial findings and completed implementation; it does not add design rules.

## Scope and method

Reviewed the route inventory, generated-page template and schema, shared care
components, conditions directory, bespoke low back pain, fibromyalgia and ME/CFS
pages, and the recent service-page work. Compared the article template for page-family
identity. Browser spot checks included low back pain and osteoarthritis at the current
tablet-sized preview; clinical nutrition and herbal therapy were reviewed during their
preceding layout changes. This is a structural/visual review, not a complete responsive
or accessibility audit of all routes, nor a review of clinical evidence.

At the start of this review, the inventory contained 25 service routes and 17 condition
routes. Conditions used three approaches: 3 bespoke Astro pages, 3 Markdown pages explicitly selecting
`pageTemplate: clinical`, and 11 Markdown pages using the legacy default. Of the four
Markdown treatment pages, three used the clinical template and Myers' Cocktail used
legacy. Other service routes used bespoke Astro components. This fragmentation was a
major source of inconsistent hierarchy and repeated UI.

## Initial findings

| Area | What needs improvement | Recommended change |
| --- | --- | --- |
| Low back pain | Large stacked hero photo delays useful information; statistic strip, seven static `site-card-interactive` blocks, additional hover panels and repeated promotional sections compete for attention | First condition pilot: compact text-led header, section navigation, readable symptoms/assessment and open care-option sections; consolidate booking prompts |
| Fibromyalgia | Symptom card, prominent treatment panel, four animated static care cards and large numbered process markers give most sections equal emphasis | Second pilot: prioritize condition overview and assessment; present treatment options and qualifications together in restrained prose/rows |
| ME/CFS | Repeated symptom, pacing, assessment and testing card groups make an already long page demanding to scan | Preserve pacing prominence and all safety/evidence qualifications; remove nested boxes inside the pacing section and turn assessment/testing grids into divided lists |
| Legacy Markdown conditions | Template adds a booking sidebar, boxed content-footer invitation and another closing invitation, as well as related navigation | Migrate to the existing clinical template after checking headings, anchors, related links and CTA content; avoid automatic content rewrites |
| Existing clinical Markdown pages | Quieter structure and a single closing CTA provide a useful base, but large lead photos can still postpone the actual explanation | Keep the base; assess image value, crop and placement individually. Osteoarthritis's opening image still dominates the first content screen |
| Conditions directory | Grouping is useful and cards are actual links; repeated raised boxes add visual bulk | Retain the three subject groups and clear link targets; use compact entries and lighter separation |
| Services | Recent clinical nutrition and herbal therapy changes are calmer, but other bespoke pages can continue to drift | Apply one service-family opening, navigation and section rhythm; extract repeated structure after validating representative pages |
| Existing style guide | Stale font/token guidance and static hover-card recipes encourage excessive decoration | Replaced in place with page-family guidance, component ownership and adaptable defaults |

## Implementation completed

The subsequent site-wide pass implemented the families in the canonical guide:

- All 18 Markdown care pages now use `ClinicalContentLayout`, related-care links and
  a single closing invitation. The legacy branch was removed and the schema updated.
- All bespoke service and condition pages use consistent care-section spacing,
  compact shared headers, open information blocks and section navigation where useful.
- Low back pain and fibromyalgia have text-led introductions and no prevalence-stat
  strips. Low back pain's repeated promotional section was removed. Reference lists,
  FAQs and treatment qualifications remain.
- ME/CFS retains prominent pacing guidance and its evidence/safety information in a
  quieter layout. The pale section carries that emphasis without nested dark cards.
- Directories and practical pages have pale introductory headers. Condition links,
  article-topic links, related care and supporting article lists use lighter separation.
- Article pages retain their editorial identity and have improved reading-column
  sizing. Featured article previews are compact on phones, with all three available.
- FAQ and page-navigation disclosures use native controls. Mobile menu behaviour,
  search, booking destinations and tracking are preserved.
- `PublicImage` shares build-time image measurement with Markdown handling. Intrinsic
  dimensions no longer depend on a display-size guess in individual templates.
- The 404 page uses the practical-page header and shared action/link patterns.
- Body/footer scroll-reveal and homepage entrance animations were removed so information
  and primary actions appear immediately.

## Validation record

- Astro check: no errors, warnings or hints.
- Production build: 101 pages, using the required public Turnstile key.
- Built-page checks: one H1 per page, unique IDs and valid internal fragment targets
  across the 100 directory-index pages.
- Browser layout checks: all 100 pages at 320px, 768px and 1440px. A narrow-screen
  article-column overflow was found and corrected with `min-width: 0` on `.prose`.
- Built image audit: all 281 rendered local images have correct intrinsic dimensions
  across 95 unique assets.
- Additional 390px checks covered the 32 bespoke service, condition and practical pages.
- Rendered opaque text checks passed on those 32 pages. These checks supplement visual
  inspection and do not constitute a full accessibility certification.
- Interaction checks covered mobile disclosures, Escape/focus behaviour, section
  anchors and article search. Form delivery and external booking were not submitted.

This record describes local implementation. Publication follows the GitHub workflow
specified in `AGENTS.md`; no deployment is implied by this design pass.
