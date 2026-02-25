# Design Audit Report — drcolinmacleod.com

> **Date:** February 23, 2026  
> **Scope:** Full design review of the Astro + Tailwind CSS naturopathic doctor website  
> **Method:** Live site inspection (desktop + mobile), source code analysis of all 35 pages, 8 components, 1 layout, 1 global stylesheet, and Tailwind configuration

---

## Executive Summary

The site presents a **highly professional, trust-building design** that effectively balances clinical authority with naturopathic warmth. The emerald color palette, serif/sans-serif font pairing, and generous whitespace create a premium healthcare experience. However, there are several **consistency issues, technical misconfigurations, and refinement opportunities** that an expert designer should address.

---

## 1. What Works Well

### Brand Identity & Color System
- The **emerald green palette** (`emerald-950` → `emerald-50`) is perfectly suited for a naturopathic medicine brand — it signals health, nature, and trust
- The `hero-gradient` in [global.css](file:///Users/colin/Projects/drcolinmacleod-astro/src/styles/global.css#L303-L310) uses layered radial gradients that create visual depth rather than a flat solid color
- Custom CSS variables (`:root` block, lines 9–38) provide a solid foundation for theming
- The `card-glass` component with its multi-stop gradient background is elegant and distinctive

### Typography
- **Playfair Display** for headings + **Manrope** for body text is an excellent pairing — high-end serif authority meets approachable modern readability
- Heading line-heights are well-tuned: h1 at `1.05`, h2 at `1.1`, h3/h4 at `1.15` — tight but readable
- Negative letter-spacing on headings (`-0.02em`) and body (`-0.01em`) adds a refined, designed feel

### Layout & Spacing
- Generous vertical padding on sections (`py-24 lg:py-32`) gives the content room to breathe — critical for a healthcare audience that needs to feel "calm"
- The `section-shell` utility (`max-w-6xl` + padding) provides consistent horizontal containment
- The homepage grid rhythm (hero → values → nav hub → services → FAQ) creates a logical information hierarchy

### SEO & Technical Foundation
- Excellent structured data (MedicalBusiness + Person + FAQPage schemas) in [BaseLayout.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/layouts/BaseLayout.astro)
- Proper OpenGraph and Twitter card meta tags
- Canonical URLs, sitemap integration, and Google Analytics with View Transitions support
- `picture` elements with AVIF → WebP → JPEG fallbacks on the hero image

### Accessibility
- Skip-to-content link in the header
- `aria-expanded`, `aria-current="page"`, and `aria-label` attributes throughout
- Focus rings (`focus:ring-2 focus:ring-emerald-500`) on all interactive elements
- `prefers-reduced-motion` media query disabling animations

### Interaction Design
- The scroll-triggered `reveal` animation system is tasteful — `translateY(24px)` + fade with staggered delays
- Header shadow intensifies on scroll (`scrolled` class) — good subtle feedback
- Service cards with `hover:-translate-y-1` and image `group-hover:scale-105` add life without being distracting
- The [BookingButton](file:///Users/colin/Projects/drcolinmacleod-astro/src/components/BookingButton.astro) component with GA tracking is well-architected

---

## 2. Issues & Inconsistencies

### 🔴 Critical Issues

#### Font Configuration Mismatch
The Tailwind config in [tailwind.config.mjs](file:///Users/colin/Projects/drcolinmacleod-astro/tailwind.config.mjs#L22-L25) declares `Inter` as the sans-serif font, but [global.css](file:///Users/colin/Projects/drcolinmacleod-astro/src/styles/global.css#L3) imports **Manrope** from Google Fonts, and the `html` base rule (line 72) sets `font-family: 'Manrope'`. The body element in [BaseLayout.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/layouts/BaseLayout.astro#L249) applies `font-sans`, which would resolve to `Inter` per Tailwind. This means:
- `font-sans` in Tailwind classes resolves to `Inter` (which is **never loaded**)
- The actual displayed font is Manrope (set by the CSS base rule, which overrides Tailwind)
- If the HTML base rule were ever removed, `font-sans` classes would fall through to `system-ui`
- **Fix:** Update [tailwind.config.mjs](file:///Users/colin/Projects/drcolinmacleod-astro/tailwind.config.mjs) to declare `Manrope` instead of `Inter`, or vice versa

#### Comment/Code Mismatch
Line 246 of [BaseLayout.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/layouts/BaseLayout.astro#L246) says `<!-- Fonts loaded via global.css (Manrope, Playfair Display) -->` — this correctly describes what's happening, but the Tailwind config tells a different story. This will confuse any future developer.

---

### 🟡 Design Consistency Issues

#### Inconsistent FAQ Implementations
Two different FAQ patterns exist across the site:

| Pattern | Used On | Mechanism | Styling |
|---------|---------|-----------|---------|
| Native `<details>` | [index.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/index.astro#L399-L431) | Browser-native expand/collapse | `rounded-2xl`, `shadow-sm`, `border-emerald-100/50`, chevron rotation |
| Custom JS accordion | [contact.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/contact.astro#L226-L273) | JavaScript click handlers | `rounded-lg`, `shadow-sm`, no border, manual `hidden` class toggle |

Despite the [FAQAccordion.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/components/FAQAccordion.astro) component existing, the homepage and contact page both implement FAQs inline with different approaches. **Pick one pattern and reuse the component everywhere.**

#### Inconsistent Service Card Heading Classes
On the service cards across [services.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/services.astro) and [conditions.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/conditions.astro), most card headings use `text-xl font-semibold` but the first section's cards use `text-xl font-serif font-semibold`. This means:
- **IV Therapy and Lab Testing headings** → Playfair Display (serif)
- **Chelation Therapy, NAD+ Therapy, Prolotherapy, etc.** → Manrope (sans-serif)

This is visible on the live site and breaks visual consistency within the same page section.

#### Inconsistent CTA Button Patterns
The site uses at least 4 different patterns for the "Book Online" CTA:

1. **`BookingButton` component** — rounded-full, multiple variants, GA tracking ([index.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/index.astro#L123), about.astro)
2. **Header nav button** — `rounded-lg`, inline in [BaseLayout.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/layouts/BaseLayout.astro#L290-L299)
3. **Inline `<a>` with `rounded-full`** — different styling per page ([services.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/services.astro#L304-L311), [conditions.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/conditions.astro#L479-L488))
4. **`CTAButton` component** — used on services/conditions hero sections

**Recommendation:** Consolidate all booking CTAs to use the `BookingButton` component for consistent styling and unified analytics tracking.

#### Mixed Icon Approaches
The project uses two icon systems simultaneously:
- **Lucide icons** (`@lucide/astro`) — used in [index.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/index.astro), [about.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/about.astro), [BaseLayout.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/layouts/BaseLayout.astro)
- **Inline SVGs** — used in [contact.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/contact.astro#L135-L138), [conditions.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/conditions.astro#L94-L96), [404.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/404.astro)

Inline SVGs add bundle weight and make icon style changes harder to maintain. **Standardize on Lucide icons.**

---

### 🟡 Responsive Design Issues

#### Mobile Header Crowding (375px)
At 375px viewport width, the header packs the logo, search icon, "Book" button, and hamburger menu into a tight row. The gap between elements is minimal (`gap-2`), and the touch targets are barely at the 44px minimum. Consider:
- Moving the search icon into the mobile menu
- Or reducing the logo to just the leaf mark on small screens

#### Homepage Hero on Mobile
The mobile hero shows a small `w-36 h-36` circular portrait before the text content. The text below is center-aligned, which works, but the vertical stack (image → text → CTAs → badges → insurance note) creates a very tall hero section that may push the first real content below the fold on smaller phones.

---

### 🟡 CSS Architecture Concerns

#### Hardcoded Colors in Scoped Styles
The [...slug].astro page template uses [hardcoded hex colors](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/%5B...slug%5D.astro#L162-L278) in its scoped `<style>` block:
```css
:global(.prose h2) { color: #065f46 !important; }
:global(.prose strong) { color: #065f46; }
.prose a { color: #059669; }
```
These bypass the CSS custom property system and will **not respond to the dark theme**. This means markdown content pages rendered through the `[...slug]` route will have broken typography colors in dark mode.

#### Excessive `!important` Usage
The dark theme overrides in [global.css](file:///Users/colin/Projects/drcolinmacleod-astro/src/styles/global.css#L329-L574) rely heavily on `!important` declarations (30+ instances). This is a maintenance risk — each new Tailwind class added to templates will potentially need another `!important` override. A more sustainable approach would be using CSS layers or higher-specificity selectors.

#### WordPress Compatibility Styles
[global.css](file:///Users/colin/Projects/drcolinmacleod-astro/src/styles/global.css#L131-L148) contains WordPress-specific classes (`.alignright`, `.alignleft`, `.aligncenter`, `.wp-image-2282`, `.wp-image-2291`). If the content migration is complete, these should be cleaned up. If content still uses these classes, they should be documented.

#### Unused Tailwind Color
The `cream` color (`#FDFBF7`) is defined in the Tailwind config but also exists as `--color-bg-tertiary: #FDFBF7` in the CSS variables. The `bg-cream` class appears in [about.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/about.astro#L149). Having the same color defined in two systems creates confusion about which to use.

---

## 3. Design Refinement Opportunities

### Section Transition Treatment
Every section transition is a **hard edge** between different background colors (emerald-950 → white → emerald-50 → stone-100 → white). While the current approach is clean, adding subtle SVG waves or soft gradient transitions between high-contrast sections (particularly dark hero → light content) would add polish.

### Corner Radius Inconsistency
The design uses multiple radius values with no clear system:
- Footer card: `rounded-3xl` (large)
- Service cards: `rounded-3xl`
- FAQ items: `rounded-2xl` (homepage) vs `rounded-lg` (contact)
- Pricing cards: `rounded-2xl`
- Button shapes: `rounded-lg` (header) vs `rounded-full` (CTAs)

**Recommendation:** Establish a clear radius scale (e.g., cards = `rounded-2xl`, containers = `rounded-3xl`, buttons = `rounded-full`, inputs = `rounded-lg`) and enforce it globally.

### Image Optimization Gaps
- Service card images on [index.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/index.astro#L367) use single `<img>` tags with `.webp` and `.jpeg`/`.png` sources — no `<picture>` element with AVIF fallbacks like the hero image has
- Lab testing card on the homepage uses `.jpeg` directly: `'/images/reference/services/lab-testing.jpeg'` while the services page uses `.webp` for the same image
- Consider using Astro's built-in `<Image>` component for automatic optimization

### Navigation — Missing "Services" Dropdown
With 12+ service pages and 14+ condition pages, the flat navigation (Home, About, Services, Conditions, Contact, Articles) requires users to always visit a landing page before finding specific content. A mega-menu or dropdown on hover/click for Services and Conditions would reduce clicks-to-content.

### Social Proof / Trust Signals
The current site lacks:
- **Patient testimonials or reviews** — high-impact trust builder for medical practices
- **Professional association badges** (e.g., Nova Scotia Association of Naturopathic Doctors)
- **Google Reviews integration** or star rating display
- **Social media links** in the footer

### Content Architecture — URL Inconsistency
Condition pages use two different URL patterns:
- Dedicated pages: `/low-back-pain`, `/fibromyalgia`, `/chronic-fatigue-syndrome` (flat)
- Article links: `/articles/acne-eczema-psoriasis-treatments` (nested)

This means some "conditions" point to top-level pages and others point to articles, which is confusing for users and SEO. Consider using a consistent `/conditions/slug` pattern.

### Footer Privacy Link
The footer contains a `<MedicalDisclaimer />` component but the privacy policy link is mentioned there — verify that `/privacy` actually links to a comprehensive, compliant privacy policy page (it exists at [privacy.astro](file:///Users/colin/Projects/drcolinmacleod-astro/src/pages/privacy.astro)).

---

## 4. Dark Mode Assessment

The dark mode implementation in [global.css](file:///Users/colin/Projects/drcolinmacleod-astro/src/styles/global.css#L40-L574) is comprehensive but has these issues:
- **No toggle mechanism visible** — `data-theme="dark"` must be set manually; there's no UI toggle or system preference detection
- **Scoped `.prose` styles in `[...slug].astro` won't inherit dark mode** — hardcoded `#065f46` colors override dark theme variables
- The dark mode design (Variant C - "Refined Dark") uses a near-black background (`#0A0A0A`) with warm off-white text (`#F5F2ED`), which is a good choice for readability

If dark mode is intended to be user-facing, a theme toggle should be added. If it's for future use, it should be noted as such.

---

## 5. Performance Notes (Design-Related)

| Item | Status | Notes |
|------|--------|-------|
| Font loading strategy | ⚠️ | `@import url()` in CSS blocks rendering. Use `<link rel="preload">` in `<head>` instead |
| Image lazy loading | ✅ | `loading="lazy"` on all non-hero images |
| Hero image eager loading | ✅ | `loading="eager"` on the above-fold portrait |
| Google Analytics blocking | ⚠️ | GA script is `async` but loaded in `<head>` without `defer` — consider moving to `<body>` end |
| View Transitions | ✅ | `<ClientRouter />` for smooth page transitions |
| Sitemap generation | ✅ | `@astrojs/sitemap` integration configured |

---

## 6. Summary — Priority Action Items

| Priority | Issue | Impact |
|----------|-------|--------|
| 🔴 High | Fix font config mismatch (Tailwind says Inter, CSS uses Manrope) | Fragile foundation |
| 🔴 High | Fix hardcoded colors in `[...slug].astro` prose styles — dark mode breakage | Broken dark theme |
| 🟡 Medium | Standardize FAQ component usage across all pages | Consistency |
| 🟡 Medium | Standardize service card heading classes (`font-serif` inconsistency) | Visual consistency |
| 🟡 Medium | Consolidate all booking CTAs into `BookingButton` component | Analytics + DRY |
| 🟡 Medium | Standardize on Lucide icons, remove inline SVGs | Maintainability |
| 🟡 Medium | Move font `@import` to `<link rel="preload">` in `<head>` | Performance |
| 🟡 Medium | Address mobile header crowding at 375px | Mobile UX |
| 🔵 Low | Clean up or document WordPress compatibility classes | Code hygiene |
| 🔵 Low | Establish and document corner radius design system | Design system |
| 🔵 Low | Add social proof (testimonials, reviews, badges) | Conversion |
| 🔵 Low | Consider navigation dropdowns for Services/Conditions | Information architecture |
| 🔵 Low | Add dark mode toggle if dark mode is user-facing | Feature completeness |

---

*This audit focused on design, consistency, and frontend implementation quality. It did not cover backend logic, deployment infrastructure, or content accuracy beyond structural concerns.*
