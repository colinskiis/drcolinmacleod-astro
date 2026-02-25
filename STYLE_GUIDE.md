# DrColinMacleod.com Style Guide

This document defines the visual and code standards for the website. The homepage (`/`) and about page (`/about`) serve as reference implementations.

---

## Color Palette

### Primary Brand Colors (Tailwind Emerald)
| Token | Hex | Usage |
|-------|-----|-------|
| `emerald-950` | `#022c22` | Hero backgrounds, dark sections, primary headings |
| `emerald-900` | `#064e3b` | Header background, CTA sections |
| `emerald-800` | `#065f46` | Button hover states |
| `emerald-700` | `#047857` | Primary buttons, accent icons, links |
| `emerald-600` | `#059669` | Secondary accents |

### Light Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `emerald-50` | `#ecfdf5` | Light section backgrounds, card backgrounds |
| `emerald-100` | `#d1fae5` | Icon backgrounds, pills, tags |
| `emerald-200` | `#a7f3d0` | Borders, decorative elements |
| `emerald-300` | `#6ee7b7` | Hero accent text |

### Neutral Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `white` | `#ffffff` | Card backgrounds, body sections |
| `cream` | `#FDFBF7` | Warm section backgrounds |
| `stone-100` | `#f5f5f4` | Services grid background |
| `gray-600` / `slate-600` | `#4b5563` / `#475569` | Body text |
| `gray-700` / `slate-700` | `#374151` / `#334155` | Secondary text |

### CSS Custom Properties (global.css)
```css
--ink: #0f1b1a;        /* Primary text */
--forest: #0f6f5c;     /* Brand green */
--mint: #9ee0c2;       /* Light accent */
--sand: #f3efe8;       /* Warm background */
--slate: #4c5b59;      /* Muted text */
```

---

## Typography

### Font Families
- **Headings:** `Playfair Display` (serif) - weight 700
- **Body:** `Manrope` (sans-serif) - weights 400, 600, 700

### Heading Styles
```html
<!-- H1 - Page titles -->
<h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-emerald-950 tracking-tight">

<!-- H2 - Section headings -->
<h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-emerald-950">

<!-- H3 - Card headings, subsections -->
<h3 class="text-xl sm:text-2xl font-serif font-semibold text-emerald-950">
```

### Body Text
```html
<!-- Primary body text -->
<p class="text-base text-gray-600 leading-relaxed">

<!-- Large intro text -->
<p class="text-lg sm:text-xl text-gray-600 leading-relaxed">
```

---

## Icons

### Icon Library
**Use Lucide icons exclusively** via `@lucide/astro`

```astro
import { Sprout, Clock, Stethoscope } from '@lucide/astro';
```

### Icon Sizing Guidelines

| Context | Size | strokeWidth | Example |
|---------|------|-------------|---------|
| Feature cards (large) | `w-12 h-12` to `w-16 h-16` | `1` | Values strip, benefit cards |
| Card icons (medium) | `w-10 h-10` | Default (2) | IV Therapy Boosters |
| Inline icons | `w-5 h-5` | Default (2) | List items, buttons |
| Small indicators | `w-4 h-4` | Default (2) | Chevrons, checkmarks |

**Note:** Large icons (w-12 and above) use `strokeWidth={1}` for a refined, professional appearance. Thicker strokes at large sizes appear cartoonish.

### Icon Colors
- **Large feature icons:** `text-emerald-700` on light backgrounds
- **On dark backgrounds:** `text-white` or `text-emerald-300`
- **Subtle/muted icons:** `text-gray-600`

### Icon Container Patterns

**Circle container (for booster cards):**
```html
<div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
  <Zap class="w-10 h-10 text-emerald-700" aria-hidden="true" />
</div>
```

**Direct icon (for value cards):**
```html
<div class="mb-6 text-emerald-700">
  <Sprout class="w-12 h-12" strokeWidth={1} aria-hidden="true" />
</div>
```

### Icon Accessibility
- Always include `aria-hidden="true"` on decorative icons
- Use descriptive alt text if icon conveys meaning

---

## Layout Components

### Section Shell
Standard container for all sections:
```html
<div class="section-shell">
  <!-- max-w-6xl mx-auto px-5 -->
</div>
```

### Section Spacing
```html
<!-- Standard sections -->
<section class="py-16 lg:py-24 bg-white">

<!-- Large sections -->
<section class="py-24 lg:py-32 bg-stone-100">
```

### Grid Patterns
```html
<!-- 2-column with sidebar -->
<div class="grid lg:grid-cols-3 gap-12">

<!-- 3-column cards -->
<div class="grid md:grid-cols-3 gap-8">

<!-- 4-column cards -->
<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
```

---

## Card Patterns

### Feature Card (White Background)
Used on homepage Values section:
```html
<div class="bg-white rounded-2xl px-6 py-8 flex flex-col items-center text-center shadow-sm">
  <div class="mb-6 text-emerald-700">
    <Icon class="w-12 h-12" strokeWidth={1.5} aria-hidden="true" />
  </div>
  <h3 class="text-2xl font-serif mb-3 tracking-tight text-emerald-900">Title</h3>
  <p class="text-base leading-relaxed text-emerald-700">Description</p>
</div>
```

### Green Feature Card
Used for benefits/highlights:
```html
<div class="bg-emerald-700 text-white rounded-2xl p-8 text-center hover:bg-emerald-800 transition-colors">
  <div class="flex justify-center mb-6">
    <Icon class="w-16 h-16" strokeWidth={1.5} aria-hidden="true" />
  </div>
  <h3 class="text-xl font-serif font-semibold mb-3 text-white">Title</h3>
  <p class="text-white/90">Description</p>
</div>
```

### Booster/Service Card (Clickable)
```html
<a href="/link" class="bg-white border border-emerald-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow block group">
  <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
    <Icon class="w-10 h-10 text-emerald-700" aria-hidden="true" />
  </div>
  <h3 class="text-lg font-semibold text-emerald-950 mb-2 group-hover:text-emerald-700 transition-colors">Title</h3>
  <p class="text-gray-600 text-sm">Description</p>
</a>
```

### Service Card (Image + Text)
```html
<a href="/link" class="group block overflow-hidden rounded-3xl bg-white shadow-xl shadow-emerald-900/5 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1 transition-all duration-300">
  <div class="aspect-[4/3] overflow-hidden">
    <img src="..." class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
  </div>
  <div class="p-8 space-y-4">
    <h3 class="text-2xl font-serif font-medium text-emerald-950 group-hover:text-emerald-700 transition-colors">Title</h3>
    <p class="text-base text-slate-600 leading-relaxed font-light">Description</p>
  </div>
</a>
```

---

## Button Styles

### Primary Button (Green)
```html
<a class="bg-emerald-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-800 transition-colors shadow-lg inline-flex items-center">
  Book Online
  <Calendar class="w-5 h-5 ml-2" />
</a>
```

### Secondary Button (White on Dark)
```html
<a class="bg-white text-emerald-950 px-10 py-4 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-colors shadow-xl inline-flex items-center">
  Book Online
</a>
```

### Outline Button
```html
<a class="border-2 border-emerald-700 text-emerald-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-emerald-700 hover:text-white transition-colors">
  Learn More
</a>
```

### Pill Link
```html
<a class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-all">
  <Icon class="w-4 h-4 text-emerald-300" />
  Label
  <ChevronRight class="w-3.5 h-3.5 text-emerald-400" />
</a>
```

---

## Hero Sections

### Standard Hero (with HeroSection component)
```astro
<HeroSection
  title="Page Title"
  image={{ src: "/images/...", alt: "Description" }}
>
  <p>Intro paragraph</p>
  <CTAButton slot="cta" />
</HeroSection>
```

### Hero Props
- `title` - Page heading (required)
- `centered` - Center-aligned text layout
- `compact` - Reduced padding
- `textOnly` - No media column
- `image` - Image object with src, alt, aspect
- `video` - YouTube embed object with src, title

---

## Section Backgrounds

| Background | Class | Usage |
|------------|-------|-------|
| White | `bg-white` | Default content sections |
| Light green | `bg-emerald-50` | Alternating sections, FAQ |
| Warm cream | `bg-cream` | "What to Expect" sections |
| Light gray | `bg-stone-100` | Services grid |
| Dark green | `bg-emerald-950` | Hero, CTA sections |

### Section Pattern
Alternate backgrounds to create visual rhythm:
```
Hero (dark) → Content (white) → Info (emerald-50) → Content (white) → CTA (dark)
```

---

## Shadows

### Standard shadows
```html
shadow-sm          /* Subtle card shadow */
shadow-lg          /* Standard card shadow */
shadow-xl          /* Prominent card shadow */
shadow-2xl         /* Hero/featured elements */
```

### Colored shadows
```html
shadow-emerald-900/5   /* Very subtle green tint */
shadow-emerald-900/10  /* Light green tint */
shadow-emerald-900/20  /* More visible green tint */
```

---

## Border Radius

| Size | Class | Usage |
|------|-------|-------|
| Small | `rounded-lg` | Buttons, inputs |
| Medium | `rounded-xl` | Small cards, FAQ items |
| Large | `rounded-2xl` | Standard cards, images |
| Extra large | `rounded-3xl` | Feature cards, hero images |
| Full | `rounded-full` | Pills, circular icons, avatar images |

---

## Animations

### Hover Transitions
```html
transition-colors      /* Color changes */
transition-shadow      /* Shadow changes */
transition-all         /* Multiple properties */
duration-300          /* Standard timing */
duration-500          /* Slower for images */
```

### Hover Effects
```html
hover:shadow-xl       /* Elevate on hover */
hover:-translate-y-1  /* Subtle lift */
hover:bg-emerald-800  /* Darken */
group-hover:scale-105 /* Image zoom */
group-hover:translate-x-0.5  /* Chevron nudge */
```

---

## FAQ Accordion

```html
<details class="bg-white rounded-xl shadow-md group">
  <summary class="flex items-center justify-between p-6 cursor-pointer list-none">
    <span class="font-semibold text-emerald-950">Question?</span>
    <ChevronDown class="w-5 h-5 text-emerald-700 transition-transform group-open:rotate-180" />
  </summary>
  <div class="px-6 pb-6 text-gray-600">
    Answer text.
  </div>
</details>
```

---

## Checklist Patterns

### Simple checkmark list
```html
<div class="flex items-center">
  <Check class="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" aria-hidden="true" />
  <span class="text-gray-700 text-sm">Item text</span>
</div>
```

### Bullet point list
```html
<li class="flex items-start">
  <span class="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
  Item text
</li>
```

---

## Image Guidelines

### Aspect Ratios
- **Hero images:** `aspect-video` (16:9) or `aspect-[4/3]`
- **Portrait photos:** `aspect-[3/4]`
- **Square icons:** `aspect-square`

### Image Treatment
```html
<div class="rounded-2xl overflow-hidden shadow-xl">
  <img class="w-full h-full object-cover" loading="lazy" />
</div>
```

### Image Formats
- Use `.webp` as primary format
- Provide `.avif` as progressive enhancement
- Keep `.jpeg/.png` as fallback

---

## Responsive Design

### Breakpoints
- `sm:` 640px+
- `md:` 768px+
- `lg:` 1024px+
- `xl:` 1280px+

### Mobile-First Patterns
```html
<!-- Text sizing -->
text-base sm:text-lg lg:text-xl

<!-- Grid layout -->
grid md:grid-cols-2 lg:grid-cols-3

<!-- Spacing -->
py-16 lg:py-24
gap-8 lg:gap-12
```

---

## Accessibility

### Focus States
All interactive elements should have visible focus:
```html
focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
```

### Semantic HTML
- Use `<section>` for page sections
- Use `<article>` for blog posts
- Use `<nav>` for navigation
- Use proper heading hierarchy (h1 → h2 → h3)

### ARIA
- Add `aria-hidden="true"` to decorative icons
- Use `aria-label` for icon-only buttons
- Ensure sufficient color contrast

---

## Reference Pages

**Homepage (`src/pages/index.astro`)**
- Hero with circular portrait
- Values strip with Lucide icons
- Services grid with image cards
- FAQ accordion

**About Page (`src/pages/about.astro`)**
- HeroSection component usage
- 2-column layout with sidebar
- Education list with checkmarks
- Professional details card
