# Website Improvement Plan
**Dr. Colin MacLeod ND - drcolinmacleod.com**
*Created: December 2, 2025*

---

## Overview

This document outlines the findings from a comprehensive UX and content audit of the website, along with prioritized action items for improvement.

---

## Critical Issues

### 1. Private Blood Work Visibility (HIGH PRIORITY)

**Problem:** Lab testing/private blood work is buried in service grids. There is no mention of:
- "Private blood work" terminology
- Optimal Wellbeing Clinic partnership
- The key selling point: patients can get blood work without a doctor's requisition

**Files to modify:**
- `src/pages/index.astro` - Add prominent callout section
- `src/content/pages/lab-testing.md` - Update content to mention Optimal Wellbeing Clinic

**Action Items:**
- [ ] Add dedicated blood work callout section on home page (after hero or values strip)
- [ ] Update lab-testing.md with Optimal Wellbeing Clinic partnership details
- [ ] Add "Private Blood Testing" badge or highlight to services grid
- [ ] Consider adding to header navigation or as featured service

**Suggested home page section:**
```html
<!-- Private Blood Testing Callout -->
<section class="bg-emerald-50 py-12">
  <div class="section-shell text-center">
    <p class="pill mb-4">NEW SERVICE</p>
    <h2 class="text-3xl font-serif font-bold mb-4">Private Blood Testing Available</h2>
    <p class="text-lg text-slate-700 max-w-2xl mx-auto mb-6">
      Get comprehensive blood work without a doctor's requisition.
      Same-day appointments available through our partnership with Optimal Wellbeing Clinic.
    </p>
    <div class="flex gap-4 justify-center">
      <a href="/services/lab-testing" class="btn-primary">Learn More</a>
      <a href="https://macleodnaturopathic.janeapp.com/" class="btn-secondary">Book Blood Work</a>
    </div>
  </div>
</section>
```

---

### 2. Dead-End Links on Conditions Page (HIGH PRIORITY)

**Problem:** The conditions page has 6 cards that reference content that doesn't exist, creating a frustrating user experience.

**File to modify:** `src/pages/conditions.astro`

| Card | Current Text | Status |
|------|-------------|--------|
| Skin Conditions | "See dermatology article" | NO ARTICLE EXISTS |
| Digestive Health | "See digestive health articles" | NO ARTICLES EXIST |
| Immune Support | "Available in consultation" | NO ARTICLES EXIST |
| Athletic Performance | "See performance articles" | 2 articles exist (partial) |
| Sports Injuries | "See injury treatment pages" | Condition pages exist |
| Recovery Enhancement | "See nutrition articles" | Partial match |

**Action Items:**
- [ ] Option A: Remove dead-end link text until articles are written
- [ ] Option B: Write placeholder articles for missing topics
- [ ] Update Athletic Performance card to link to existing articles
- [ ] Update Sports Injuries to link to specific condition pages

---

## Content Gaps - Articles to Write

### Priority 1: Missing Content (No articles exist)

#### Digestive Health Article
**Suggested title:** "Natural Approaches to Digestive Health"
**Topics to cover:**
- IBS and natural treatment options
- SIBO overview
- Gut microbiome health
- Food sensitivities and elimination diets
- Digestive enzyme support
- Probiotics and when to use them

**File to create:** `src/content/articles/digestive-health-natural-approaches.md`

---

#### Immune Support Article
**Suggested title:** "Strengthening Your Immune System Naturally"
**Topics to cover:**
- Key nutrients for immune function (Vitamin D, C, Zinc)
- Herbal immune support (Echinacea, Elderberry, Astragalus)
- Lifestyle factors affecting immunity
- IV therapy for immune support
- When to see a naturopath for immune concerns

**File to create:** `src/content/articles/immune-support-natural-approaches.md`

---

#### Sports Injuries Overview Article
**Suggested title:** "Natural Treatment for Sports Injuries"
**Topics to cover:**
- Common sports injuries treated
- Prolotherapy for sports injuries
- Acupuncture for injury recovery
- Nutritional support for healing
- When to seek treatment
- Link to specific condition pages (tennis elbow, frozen shoulder, etc.)

**File to create:** `src/content/articles/sports-injuries-natural-treatment.md`

---

### Priority 2: Expand Existing Content

#### Skin Conditions
**Existing:** `acne-eczema-psoriasis-treatments.md`
**Action:** Either rename the conditions page link to match, or write a more comprehensive dermatology overview article

---

#### Athletic Performance
**Existing articles:**
- `nutrients-for-athletic-performance.md`
- `how-much-sleep-does-an-athlete-need.md`

**Action:** Update conditions page to link to these existing articles

---

#### Recovery Enhancement
**Suggested article:** "Optimizing Recovery: Natural Approaches for Athletes"
**Topics to cover:**
- Post-workout nutrition
- IV therapy for recovery (Myers Cocktail)
- Sleep optimization
- Reducing inflammation naturally
- Supplements for recovery

**File to create:** `src/content/articles/recovery-enhancement-natural-approaches.md`

---

## IV Therapy Content Expansion

**Current state:** Good basic info on Myers Cocktail with pricing ($140)

**File to update:** `src/content/pages/iv-therapy.md`

**Action Items:**
- [ ] Clean up legacy WordPress Stackable block HTML markup
- [ ] Add more IV treatment options if offered (NAD+, High-Dose Vitamin C, Glutathione)
- [ ] Add FAQ section
- [ ] Add patient testimonials or success stories
- [ ] Create supporting article: "What to Expect from Your First IV Treatment"

---

## Acupuncture Content Expansion

**Current state:** Single page focused only on injury/pain

**File:** `src/content/pages/acupuncture-for-injury-pain.md`

**Action Items:**
- [ ] Expand to cover other acupuncture applications:
  - Stress and anxiety
  - Digestive issues
  - Fertility support
  - Headaches/migraines
- [ ] Create general "Acupuncture" overview page
- [ ] Link existing article `quit-smoking-with-acupuncture.md` from acupuncture pages
- [ ] Consider article: "Acupuncture FAQ - What to Expect"

---

## Technical Debt

### Legacy WordPress Markup Cleanup

These files contain old WordPress Stackable block HTML that doesn't render properly:

- [ ] `src/content/pages/iv-therapy.md` - Clean up wp-block-stackable-* classes
- [ ] `src/content/pages/lab-testing.md` - Clean up wp-block-stackable-* classes

**Note:** This content was migrated from WordPress and needs to be converted to clean markdown/HTML that works with the Astro site.

---

## User Journey Improvements

### Current Issues:
1. No clear path from articles back to booking
2. Conditions page dead ends for 3 categories
3. Lab testing buried in service grid

### Recommendations:
- [ ] Add booking CTA at the end of all articles
- [ ] Add "Related Services" section to articles
- [ ] Create clear pathways from conditions → articles → booking
- [ ] Consider adding "Patient Resources" section to navigation

---

## Implementation Priority Order

### Phase 1: Quick Wins (Do First)
1. Add blood work callout to home page
2. Update lab-testing.md with Optimal Wellbeing Clinic info
3. Fix/remove dead-end links on conditions page

### Phase 2: Content Creation
1. Write Digestive Health article
2. Write Immune Support article
3. Write Sports Injuries overview article
4. Write Recovery Enhancement article

### Phase 3: Content Expansion
1. Expand acupuncture content
2. Add more IV therapy content
3. Clean up legacy WordPress markup

### Phase 4: Polish
1. Add booking CTAs to all articles
2. Improve cross-linking between related content
3. Add patient testimonials where appropriate

---

## Files Reference

### Pages to modify:
- `src/pages/index.astro` - Home page (add blood work callout)
- `src/pages/conditions.astro` - Fix dead-end links
- `src/pages/services.astro` - Highlight blood work service

### Content to update:
- `src/content/pages/lab-testing.md` - Add Optimal Wellbeing Clinic
- `src/content/pages/iv-therapy.md` - Clean up, expand
- `src/content/pages/acupuncture-for-injury-pain.md` - Expand scope

### New articles to create:
- `src/content/articles/digestive-health-natural-approaches.md`
- `src/content/articles/immune-support-natural-approaches.md`
- `src/content/articles/sports-injuries-natural-treatment.md`
- `src/content/articles/recovery-enhancement-natural-approaches.md`

---

## Notes

- The site uses Astro framework with TailwindCSS
- Content collections are in `src/content/`
- Booking is through JaneApp: `macleodnaturopathic.janeapp.com`
- Current color scheme: emerald/slate palette

---

*Ready to pick up where we left off! Just reference this document and let me know which items you'd like to tackle first.*
