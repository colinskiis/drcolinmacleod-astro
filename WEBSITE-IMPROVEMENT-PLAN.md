# Website Improvement Plan — Complete Review Document

**Dr. Colin MacLeod ND · [drcolinmacleod.com](https://drcolinmacleod.com)**

| | |
|---|---|
| Created | December 2, 2025 |
| Last updated | May 21, 2026 |
| Purpose | Single source of truth for what’s done, what’s next, and what we’re not doing |

---

## Executive summary

The site is in **strong shape**: professional design, ~41 published articles, solid SEO/schema, working booking flow, and a successful WordPress → Astro migration. Remaining work is **incremental**.

**Phase 1 order (confirmed):**
1. Fix `/patient-resources/` — **new hub page** (not redirect-only)
2. Stop **draft articles** from publishing as public URLs
3. Build **articles-only search**
4. Lab testing: only add **Optimal Wellbeing Clinic** wording if desired (page copy is already strong)
5. **Build + link validation** after Phase 1

**Out of scope:** Unifying condition routing (`.astro` vs `content/pages/` Markdown).

---

## Current site snapshot (May 2026)

| Area | Status |
|------|--------|
| Stack | Astro 5, Tailwind, content collections, static deploy via `./deploy.sh` |
| Published articles | 41 (5 archived drafts in `_archived/`) |
| Topic hubs | 8 (`/articles/{topic}/`) |
| Site-wide search | Header overlay, Fuse.js, `/api/search-data.json` |
| Articles index search | **Live** — `ArticleSearch.astro` on `/articles/` + topic hubs |
| Homepage blood work | Live |
| `/patient-resources/` | **Live** — hub page + `.htaccess` redirects |
| Draft article URLs | **Filtered** — drafts excluded from `articles/[...slug].astro` |
| Lab testing page | Optimal Wellbeing Clinic wording added |
| `npm run check` | **`npm run check`** script in `package.json` |

---

## Completed work

- [x] Private blood work visibility on homepage
- [x] Conditions page — substantive links (incl. Runner’s Knee, SI joint)
- [x] Peptide article + layout/citation work
- [x] Contact page updates
- [x] Articles once listed as “missing” now exist (digestive health, immune support, sports injuries, recovery enhancement)

---

## Phase 1 — Quick wins (strict order)

### 1.1 Patient resources hub page — **do first**

**Priority:** High · **Effort:** Small–medium (1–2 hours)

**Problem:** `public/.htaccess` (lines 48–52) redirects legacy `/patient-info/*` URLs to `/patient-resources/`. There is no `src/pages/patient-resources.astro` — live 404.

**Decision:** **Option B — create `patient-resources.astro`**, not redirect-only to `/new-patients/`. Multiple old guide URLs land here; a small hub is more forgiving and can link forward without losing the URL.

**Suggested hub content (minimal):**
- Short intro: patient guides and resources
- Links: New Patients, Lab Testing, IV Therapy, Prolotherapy, Contact, Book Online
- Optional: short notes where archived guides used to live (no need to recreate full guide content yet)

**Action items:**
- [x] Create `src/pages/patient-resources.astro`
- [x] Match site layout (`BaseLayout`, `HeroSection`, card/link list)
- [x] Deploy and test: `/patient-resources/`, `/patient-info/new-patient-guide/`, `/patient-info/lab-testing-guide/`, etc.

**Files:** `src/pages/patient-resources.astro`, verify `public/.htaccess` targets

---

### 1.2 Filter draft articles at build — **before article search**

**Priority:** High (SEO) · **Effort:** Small (~15 min)

**Problem:** `src/pages/articles/[...slug].astro` uses `getCollection('articles')` without filtering drafts. Index, topic pages, and search data already use `draft !== true`. Archived posts under `_archived/` may still get public URLs and indexation.

**Action items:**
- [x] In `getStaticPaths`, filter `({ data }) => data.draft !== true`
- [x] `npm run build` — confirm `_archived/*` slugs are not in `dist/articles/`
- [x] If any draft URLs were ever live, consider redirects or leave to 404 after deploy

**Files:** `src/pages/articles/[...slug].astro`

---

### 1.3 Articles page search

**Priority:** High · **Effort:** Medium (half day)

**Why:** Site-wide search answers “where on the site?” Articles search answers “which post in this list?” (~40+ articles).

| | Site-wide (keep) | Articles search (add) |
|---|---|---|
| Where | Header, every page | `/articles/` + `/articles/{topic}/` |
| Scope | Articles + services + conditions | Published articles only |
| UX | Modal overlay | Inline filter on list(s) |

**v1 behaviour:**
1. Search input below topic pills — “Search articles…”
2. Debounced filter (~200ms)
3. Match: title, description, tags, categories
4. Topic pages: search within that topic’s articles only
5. “Showing X of Y” + empty state + `aria-live`

**Implementation (preferred — no new API unless needed):**
- `fuse.js` already installed — reuse it
- **Inline compact JSON index** in `ArticleSearch.astro` (or passed as prop from page)
- Hide/show existing `<a>` article links — do **not** add `/api/articles-search.json` for v1
- **Markup convention:** wrap filterable lists in a shared container, e.g. `id="article-list"` with `data-article-search-item` on each link

**Topic page caveat:** `[topic].astro` does **not** use `#article-list` today. It has:
- “Selected Articles” grid (featured)
- “All {topic} Articles” list

For v1, either:
- Wrap **both** sections in one searchable container, or
- Search only the “All … Articles” list and document that featured cards stay visible

**Action items:**
- [x] Create `ArticleSearch.astro` (index JSON + Fuse + filter logic)
- [x] Add `#article-list` (or shared wrapper) to `articles.astro` — already has `id="article-list"` at line 75
- [x] Add same wrapper + component to `[topic].astro`
- [x] Manual test: main index, one topic page, empty query, no results, keyboard/a11y

**Files:**
- `src/components/ArticleSearch.astro` (new)
- `src/pages/articles.astro`
- `src/pages/articles/[topic].astro`

---

### 1.4 Lab testing — Optimal Wellbeing wording only

**Priority:** Low (copy polish) · **Effort:** Small (~15 min)

**Correction:** Page is **`src/pages/lab-testing.astro`**, not `src/content/pages/lab-testing.md`.

**Current state:** Title, meta description, hero, and FAQ already cover private blood work and no family doctor requisition. **Do not rewrite** that messaging.

**Only if clinically/business-relevant:**
- [x] Add explicit **Optimal Wellbeing Clinic** partnership wording (site mentions clinic elsewhere — index, about, contact — but not on lab-testing page yet)
- [ ] Optional: same-day / booking path clarity if accurate

**Files:** `src/pages/lab-testing.astro`

---

### 1.5 Conditions page link audit

**Priority:** Low · **Effort:** Small (~30 min)

- [ ] Click through every card on `conditions.astro` — confirm 200
- [ ] Fix any stragglers

**Files:** `src/pages/conditions.astro`

---

### 1.6 Phase 1 validation (add after fixes)

**Priority:** High · **Effort:** Small (~30 min)

Static site risk = broken links and bad redirects, not runtime bugs.

**Action items:**
- [ ] `npm run build` — must pass clean
- [ ] Check `dist/` for absent draft article paths
- [ ] Manually verify known legacy redirects (patient-info → patient-resources)
- [ ] Spot-check: `/articles/`, one topic hub, `/lab-testing/`, `/patient-resources/`
- [ ] Optional: link crawl of `dist/` (local script or checker) before `./deploy.sh`

---

## Phase 2 — Service & content page expansion

### 2.1 IV therapy page

**File:** `src/content/pages/iv-therapy.md` (Markdown content page at `/iv-therapy/` via `[...slug].astro` — confirm route; service may also be `src/pages/iv-therapy.astro`)

**Action items:**
- [ ] Remove legacy WordPress Stackable markup in content if present
- [ ] Add treatments if offered (NAD+, high-dose vitamin C, glutathione)
- [ ] FAQ section
- [ ] Optional article: first IV visit

---

### 2.2 Acupuncture content

**File:** `src/content/pages/acupuncture-for-injury-pain.md` and/or `src/pages/acupuncture.astro`

- [ ] Expand beyond injury/pain
- [ ] Link `quit-smoking-with-acupuncture.md`
- [ ] Optional general overview

---

### 2.3 Cross-linking & article CTAs

- [ ] Verify end-of-post CTAs on newer articles
- [ ] Related services where appropriate
- [ ] **Book Online** only; no inline booking links in article body

---

## Phase 3 — Technical hygiene

### 3.1 Peptide article images

- [ ] One optimized WebP/PNG; delete duplicate ~2MB PNGs (`peptide-evidence-safety-canada.png`, `-v2.png`)
- [ ] Keep referenced `peptide-evidence-safety-canada-20260516.png` or replace with WebP

### 3.2 `astro check` script

- [x] Add to `package.json`: `"check": "astro check"`
- [ ] Run before deploy (script added; not yet routine)

### 3.3 Site-wide search index

- [ ] Document: update `search-data.json.ts` when adding service/condition pages
- [ ] Optional later: shared config for entries

---

## Phase 4 — Polish (optional)

- Testimonials on key service pages
- Hero WebP + lazy-load audit
- Design audit follow-ups
- Post–v1: `?q=` on articles index; match highlighting

---

## Out of scope

| Item | Reason |
|------|--------|
| Unify `.astro` vs Markdown condition routes | Requested; working model |
| New CMS | Static Astro fits workflow |
| Replace Jane booking | External, intentional |
| Replace site-wide search | Articles search is additive |
| New API for article search v1 | Inline JSON index is enough |

---

## Master checklist

### Phase 1 (in order)
- [x] 1.1 `patient-resources.astro` hub
- [x] 1.2 Draft filter in `articles/[...slug].astro`
- [x] 1.3 Articles search + shared list markup on topic pages
- [x] 1.4 Lab testing — Optimal Wellbeing wording
- [ ] 1.5 Conditions audit
- [x] 1.6 `npm run build` + link/redirect validation (build passed May 21, 2026)

### Phase 2
- [ ] IV content · Acupuncture · Article CTAs

### Phase 3
- [ ] Peptide images · `npm run check` · Search index docs

### Phase 4
- [ ] Polish items

---

## Post-deploy test plan

1. Homepage — Book Online, Private Blood Testing  
2. `/patient-resources/` — 200, links work  
3. Legacy `/patient-info/lab-testing-guide/` → patient resources  
4. Draft URLs — `_archived/*` not in sitemap / 404 if probed  
5. Articles index + topic hub — search filters list  
6. `/lab-testing/` — copy accurate  
7. Conditions — sample cards  
8. Contact form · Ctrl+K search · 404 page  

---

## Files reference

| Purpose | Path |
|---------|------|
| Patient resources (new) | `src/pages/patient-resources.astro` |
| Draft fix | `src/pages/articles/[...slug].astro` |
| Articles index | `src/pages/articles.astro` (`#article-list` line 75) |
| Topic hubs | `src/pages/articles/[topic].astro` (needs list wrapper) |
| Articles search (new) | `src/components/ArticleSearch.astro` |
| Lab testing | `src/pages/lab-testing.astro` |
| Redirects | `public/.htaccess` |
| Site search | `src/components/Search.astro`, `src/pages/api/search-data.json.ts` |
| Deploy | `deploy.sh` |

---

## Conventions

- Booking buttons: **Book Online**
- No inline booking links in article markdown body
- Deploy: `./deploy.sh`

---

*End of plan — May 21, 2026 (revised per Codex review)*
