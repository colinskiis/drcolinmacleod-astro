# Style Consistency Audit — drcolinmacleod.com

> **Date:** February 23, 2026  
> **Method:** Systematic grep/search analysis across all 35+ page files, 8 components, layout, and global CSS  
> **Focus:** Pattern-by-pattern consistency audit — identifying every variation in supposedly-uniform design tokens

---

## 1. FAQ / Accordion Pattern — 6 DIFFERENT IMPLEMENTATIONS

This is the largest consistency problem in the project. FAQ sections appear on nearly every page but use **six distinct style patterns**:

| Pattern | Pages Using It | Classes |
|---------|---------------|---------|
| **A** — `rounded-xl shadow-md` on white | `iv-therapy`, `iv-vitamin-c`, `sports-medicine` | `bg-white rounded-xl shadow-md group` |
| **B** — `rounded-xl shadow-md` on emerald-50 | `specialized-testing`, `nad-therapy`, `thyroid-testing`, `hormone-testing`, `wellness-blood-work`, `nutrient-testing`, `digestive-health-testing` | `bg-emerald-50 rounded-xl shadow-md group` |
| **C** — `rounded-xl shadow-md border` on white | `clinical-nutrition` | `bg-white rounded-xl shadow-md group border border-emerald-100` |
| **D** — `rounded-2xl shadow-lg` on white | `prolotherapy-for-osgood-schlatter` | `group bg-white rounded-2xl shadow-lg` |
| **E** — `rounded-2xl` on emerald-50 (no shadow) | `prolotherapy`, `low-back-pain`, `fibromyalgia`, `chelation-therapy`, `chronic-fatigue-syndrome`, `herbal-medicine` | `group bg-emerald-50 rounded-2xl` |
| **F** — `rounded-2xl shadow-sm border` with open states | `acupuncture`, `herbal-medicine` (FAQ section), `index` | `group bg-white rounded-2xl shadow-sm border border-emerald-100/50 overflow-hidden transition-all duration-300 hover:shadow-md open:shadow-lg open:ring-1 open:ring-emerald-500/20` |
| **G** — Custom JS accordion (not `<details>`) | `contact` | button-based with `.faq-question` class, `rounded-lg shadow-sm` wrapper |

**Summary:** You have 7 different FAQ looks. The chevron icon patterns also differ — some use `group-open:rotate-180` on a ChevronDown SVG, others use `group-open:rotate-45` on a Plus SVG, and the contact page uses JavaScript toggling.

**Recommendation:** Pick Pattern **F** (the most polished, with border, hover, and open states) and apply it universally. Build it into the existing `FAQAccordion.astro` component and use that everywhere.

---

## 2. Section H2 Heading — Bottom Margin Inconsistency

All pages share the base pattern `text-3xl sm:text-4xl font-serif font-bold text-emerald-950` for h2 headings. But the bottom margin varies:

| Margin | Count | Pages (examples) |
|--------|-------|-------------------|
| `mb-4` | ~45+ | services, conditions, book, clinical-nutrition, acupuncture, nad-therapy |
| `mb-6` | ~30+ | iv-therapy, iv-vitamin-c, sports-medicine, specialized-testing, thyroid-testing |
| `mb-8` | ~25+ | prolotherapy-for-osgood-schlatter, FAQ sections (centered), "Getting Started" sections |
| `mb-12` | 2 | prolotherapy-for-osgood-schlatter (line 358) |

Plus, `text-center` is sometimes added and sometimes not for the same section types:
- **FAQ headings:** Some are `mb-8 text-center`, some are `mb-4` (left-aligned)
- **"What to Expect" headings:** Some are `mb-8 text-center`, some are `mb-6` or `mb-4`

**Homepage is different entirely:** The homepage h2 headings use `text-4xl sm:text-5xl font-serif font-medium` — note `font-medium` vs `font-bold` used everywhere else, and the larger size `text-4xl sm:text-5xl` vs the standard `text-3xl sm:text-4xl`.

**Recommendation:** Standardize on `mb-6` for all section h2 headings. Use `text-center` consistently for standalone section headings, and left-aligned for headings that introduce side-by-side content.

---

## 3. Body Text Color — `text-gray-600` vs `text-slate-600`

The project uses two different Tailwind gray scales for body text:

| Color | Pages |
|-------|-------|
| **`text-gray-600`** | `conditions`, `services`, `index`, `about`, `contact`, `404`, iv-therapy, iv-vitamin-c, sports-medicine, clinical-nutrition, acupuncture, nad-therapy, thyroid-testing, specialized-testing, chronic-fatigue-syndrome, herbal-medicine, lab-testing, hormone-testing, book, wellness-blood-work, nutrient-testing, digestive-health-testing, low-back-pain, fibromyalgia, chelation-therapy |
| **`text-slate-600`** | `prolotherapy`, `prolotherapy-for-osgood-schlatter`, `prolotherapy-for-back-pain`, `prolotherapy-for-tendon-injuries`, `prolotherapy-for-arthritis`, `prolozone` |

The prolotherapy-family pages consistently use `text-slate-600` while all other pages use `text-gray-600`. Tailwind's `gray-600` (#4B5563) and `slate-600` (#475569) are visually very similar but subtly different — slate has a blue tint. This creates a barely-perceptible but real inconsistency.

**Recommendation:** Standardize on **`text-gray-600`** everywhere since it's the dominant pattern. Or, even better, define a semantic color variable like `--color-text-secondary` and use it throughout.

---

## 4. CTA Button in Bottom Dark Section — 3+ Variants

The dark `bg-emerald-950` CTA section at the bottom of each page uses different button styles:

| Button Style | Pages |
|-------------|-------|
| `bg-white text-emerald-950 px-10 py-4 rounded-full ... shadow-xl` (white on dark) | Most pages — iv-vitamin-c, acupuncture, prolotherapy, sports-medicine, herbal-medicine, fibromyalgia, etc. |
| `bg-emerald-700 text-white px-10 py-4 rounded-full ... shadow-xl` (green on dark) | **nad-therapy** (line 402), **chelation-therapy** (line 385), **prolotherapy-for-arthritis** (line 531) |
| `bg-white text-emerald-950 px-10 py-4 rounded-full ... shadow-xl inline-flex items-center justify-center` (adds `justify-center`) | conditions, services, lab-testing, articles, chronic-fatigue-syndrome, clinical-nutrition |
| Same as above without `justify-center` | iv-vitamin-c, acupuncture, prolotherapy, herbal-medicine, etc. |

The **nad-therapy**, **chelation-therapy**, and **prolotherapy-for-arthritis** pages use a `bg-emerald-700` button instead of `bg-white`, which reverses the expected button contrast on a dark section.

Some buttons include `justify-center` and some don't (this affects inline-flex alignment). Some add `items-center` only while others add both `items-center justify-center`.

**Recommendation:** Pick the `bg-white text-emerald-950` variant as the canonical CTA for dark sections (it provides the strongest contrast), and ensure all use `inline-flex items-center justify-center` consistently.

---

## 5. Mid-Page "Book Online" Button — 2 Variants

Mid-page "Getting Started" or "What to Expect" sections also have booking buttons in different styles:

| Style | Pages |
|-------|-------|
| `bg-emerald-700 text-white px-8 py-4 rounded-full ... shadow-lg` | specialized-testing, thyroid-testing, hormone-testing, low-back-pain, wellness-blood-work, nutrient-testing, digestive-health-testing |
| `w-full bg-emerald-700 text-white px-8 py-4 rounded-full ... shadow-lg` (adds `w-full`) | iv-therapy (line 95), nad-therapy (line 241), chelation-therapy (line 158), prolotherapy-for-arthritis (line 255) |

The `w-full` variant stretches the button to full-width, creating a distinctly different look.

---

## 6. Card Image Aspect Ratios — 2 Conflicting Patterns

| Ratio | Pages |
|-------|-------|
| `aspect-[16/10]` | `conditions` (all cards), `articles`, `lab-testing` |
| `aspect-[4/3]` | `services` (all cards), `index` (service cards) |

The `conditions` page cards use 16:10 (wider) while the `services` page cards use 4:3 (taller). If a visitor navigates from Services → Conditions, the card images have a notably different aspect ratio, breaking visual continuity.

The `about` page uses `aspect-[3/4]` (portrait) for the headshot, which is appropriate and separate. And `chelation-therapy` uses `aspect-video` for its video embed, also appropriate.

**Recommendation:** Pick one ratio for all listing/card images — `aspect-[16/10]` is more modern and better for wide-screen images. Use it on both services and conditions.

---

## 7. Card Heading Typography — `font-serif` Inconsistency

| Pattern | Where |
|---------|-------|
| `text-xl font-semibold mb-3 group-hover:text-emerald-700 transition-colors` (sans-serif) | `conditions.astro` (all 28 card headings), `services.astro` (all 12 service card headings) |
| `text-xl font-serif font-semibold text-emerald-950 mb-3 group-hover:text-emerald-700 transition-colors` (serif + explicit color) | NOT found on listing cards ✅ |
| `text-2xl font-serif font-medium text-emerald-950 leading-tight group-hover:text-emerald-700 transition-colors` | `index.astro` (line 370 — service preview cards) |

The homepage service cards use `text-2xl font-serif font-medium` while services/conditions pages use `text-xl font-semibold` (sans-serif). This means:
- **Homepage cards:** Playfair Display, 2xl, medium weight
- **Services & Conditions cards:** Manrope, xl, semibold

The card heading also has `text-emerald-950` on the homepage but the services/conditions cards don't specify a text color (inheriting from body default). Both have the same `group-hover:text-emerald-700` effect.

**Recommendation:** Use the same heading pattern across all card components. Either keep all cards as `text-xl font-semibold` (clean and modern) or all as `text-xl font-serif font-semibold` (more editorial). Don't mix between listing pages.

---

## 8. CTA Section Text — Subheading Inconsistency

Below the CTA h2 on the dark sections, the paragraph text has these variants:

| Pattern | Pages |
|---------|-------|
| `text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed` | conditions, services, lab-testing, about, articles, clinical-nutrition |
| `text-lg text-white/90 mb-8` (no responsive size, no max-width, no leading-relaxed) | iv-vitamin-c, thyroid-testing, specialized-testing, chronic-fatigue-syndrome, prolozone, hormone-testing, low-back-pain, fibromyalgia, nutrient-testing, wellness-blood-work, digestive-health-testing |
| `text-lg sm:text-xl text-white/90 mb-8 leading-relaxed` (no max-width) | `[...slug].astro`, `articles/[...slug].astro` |
| `text-xl text-emerald-100 mb-8` (completely different — emerald-100 instead of white/90) | `book` (line 226), `services` (line 300) |

The `book` and `services` pages use `text-emerald-100` instead of `text-white/90`, giving those CTAs a slightly mint-tinted subheading vs the off-white used everywhere else.

**Recommendation:** Standardize on `text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed` for all CTA subheadings.

---

## 9. CTA Section Heading Text — Wording Patterns

| Text | Pages |
|------|-------|
| "Ready to Start Your Health Journey?" | `[...slug].astro` (content pages) |
| "Ready to Start Your Natural Health Journey?" | `services.astro` |
| "Ready to Get the Full Picture?" | thyroid-testing |
| "Ready to Support Your Immune System?" | iv-vitamin-c |
| "Ready to Restore Your Cellular Energy?" | nad-therapy |
| "Ready to Dig Deeper?" | specialized-testing |
| "Don't See Your Condition Listed?" | conditions |
| "Ready to Get Started?" | book |
| "Schedule Appointment" | `[...slug].astro` CTA button text |
| "Book Online" | everywhere else CTA button text |

Note: The `[...slug].astro` and `articles/[...slug].astro` pages use **"Schedule Appointment"** as the CTA button text, while every other page uses **"Book Online"**. This is a wording inconsistency users will notice.

---

## 10. Section Background Alternation Inconsistency

Most pages alternate `bg-white` → `bg-emerald-50` → `bg-white` → `bg-emerald-950` (dark section). But some pages break this rhythm:

| Issue | Pages |
|-------|-------|
| **Two consecutive `bg-white` sections** | `acupuncture` (lines 221 + 280), `clinical-nutrition` (lines 449 + 473), `sports-medicine` (lines 341 + 401) |
| **`bg-stone-100`** as alt section (rest of site uses `bg-emerald-50`) | `about.astro` (line 165) |
| **`bg-emerald-50/30`** (opacity-reduced variant) | `prolotherapy` (some sections) |

The `about` page uniquely uses `bg-stone-100` as a section background, which is a warm beige tone vs the cool mint of `bg-emerald-50` used everywhere else. This is the only page with a warm-toned section background.

---

## 11. Pricing Section Typography

The services pricing section (`services.astro` lines 208–288) uses `font-serif` on its h3 headings:
```
text-xl font-serif font-semibold text-emerald-950 mb-6 pb-4 border-b border-emerald-100
```

But the service listing card h3 headings above (lines 38–194) use:
```
text-xl font-semibold text-emerald-950 mb-3 group-hover:text-emerald-700
```

**Within the same page**, the pricing h3s get `font-serif` and `border-b` treatment while listing card h3s are sans-serif with no border. This makes the pricing section feel like a different design system.

---

## 12. "Learn More" Link Text Variations

The card link text on listing pages has these variants:

| Text | Pages |
|------|-------|
| `Learn More →` (with arrow entity) | `conditions.astro` (musculoskeletal & neurological cards), `services.astro` (all service cards) |
| `Read Article →` | `conditions.astro` (general health, sports, women's/men's, mental health, metabolic, digestive categories) |
| `Learn more` (lowercase, no arrow, inline link) | `prolotherapy.astro`, `lab-testing.astro`, `index.astro` |

The conditions page itself mixes "Learn More →" (for condition Detail Pages) and "Read Article →" (for article links), which makes semantic sense but visually shows two different card footer treatments on the same listing page.

---

## 13. Component Usage vs. Inline Patterns

Several reusable components exist but aren't used consistently:

| Component | What It Does | Where It's Bypassed |
|-----------|-------------|---------------------|
| `BookingButton.astro` | Styled "Book Online" with GA tracking | ~20 pages use raw `<a>` tags with hardcoded href to janeapp.com |
| `CTAButton.astro` | CTA for hero sections | Some hero sections have `<CTAButton>`, many don't have any CTA in the hero |
| `FAQAccordion.astro` | FAQ accordion wrapper | Only used in `[...slug].astro`; all other pages build FAQ inline |
| `HeroSection.astro` | Standard hero section | Used by `about`, `services`, `conditions`, `lab-testing`, etc. But `index`, `iv-therapy`, `prolotherapy`, and others build their own hero inline |
| `StepList.astro` | Numbered step list | Barely used; "What to Expect" / "Getting Started" sections are built inline everywhere |

**Impact:** Every inline implementation is a potential drift point. When you update the `BookingButton` component, the ~20 pages with raw `<a>` tags won't receive the update.

---

## 14. H3 Inside Cards/Sections — Weight Inconsistency

| Weight | Where |
|--------|-------|
| `font-bold` | `book.astro` h3s (all), `contact.astro` h3s, `about.astro` h3s |
| `font-semibold` | `services.astro` card h3s, `conditions.astro` card h3s, `index.astro` "Why" section h3s, `lab-testing.astro`, `404.astro` h3s |
| `font-medium` | `index.astro` card h3s (line 370), `index.astro` FAQ h3s (line 401) |

Three different font weights for h3 headings across the site.

---

## 15. Spacing Between FAQ Items

| Spacing | Pages |
|---------|-------|
| `space-y-4` | `iv-therapy`, `iv-vitamin-c`, `sports-medicine`, `nad-therapy`, `thyroid-testing`, `specialized-testing`, `clinical-nutrition` |
| `space-y-6` | `prolotherapy`, `low-back-pain`, `fibromyalgia`, `chelation-therapy`, `chronic-fatigue-syndrome` |
| `space-y-3` | `acupuncture`, `herbal-medicine`, `index` |
| none (stacked divs) | `contact` |
| `space-y-6` with different padding | `prolotherapy-for-osgood-schlatter` |

---

## Summary — Quick Reference of What to Standardize

| Element | Current Variants | Recommended Standard |
|---------|-----------------|---------------------|
| FAQ `<details>` classes | 6 variations | `group bg-white rounded-2xl shadow-sm border border-emerald-100/50 overflow-hidden transition-all duration-300 hover:shadow-md open:shadow-lg open:ring-1 open:ring-emerald-500/20` |
| Section H2 bottom margin | `mb-4`, `mb-6`, `mb-8`, `mb-12` | `mb-6` for all |
| Body text gray | `text-gray-600`, `text-slate-600` | `text-gray-600` |
| CTA dark-section button | white (`bg-white`) vs green (`bg-emerald-700`), ±`justify-center` | `bg-white text-emerald-950 ... inline-flex items-center justify-center` |
| Card image aspect ratio | `aspect-[16/10]`, `aspect-[4/3]` | `aspect-[16/10]` |
| Card headings | `font-medium`, `font-semibold`, `font-bold`; ±`font-serif` | `text-xl font-semibold` |
| CTA subheading | `text-white/90` vs `text-emerald-100`; ±`sm:text-xl`; ±`max-w-3xl mx-auto leading-relaxed` | `text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed` |
| Alt section background | `bg-emerald-50`, `bg-stone-100`, `bg-emerald-50/30` | `bg-emerald-50` |
| FAQ item spacing | `space-y-3`, `space-y-4`, `space-y-6`, none | `space-y-4` |
| CTA button text | "Book Online" vs "Schedule Appointment" | "Book Online" everywhere |
| "Book Online" implementation | `<BookingButton>` vs raw `<a>` | Always use `<BookingButton>` |

---

*This audit focused exclusively on style consistency. See the companion `design_audit_report.md` for the broader design review including broken elements, accessibility, SEO, and performance.*
