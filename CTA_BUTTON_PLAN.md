# CTA Button Plan

A single system for every booking call-to-action on the site, and the rules for
keeping the Google Analytics tracking intact while changing the styling.

---

## 1. What is actually there today

Findings from the current codebase, not assumptions.

**Two components do the same job, and the documented standard is the minority.**
`STYLE_GUIDE.md` says `BookingButton` is "preferred for all booking CTAs" and to
"always use this instead of raw `<a>` tags". In practice:

| Component | Files | Instances |
|---|---|---|
| `CTAButton` | 27 | 52 |
| `BookingButton` | 14 | 18 |
| Hand-rolled `<a>` with the tracking attribute | 2 | 4 |

The style guide is outvoted roughly three to one by the code.

**The About page's translucent button was not a design decision.** It is
`BookingButton`'s *default* variant. Four call sites omit `variant=` and get the
frosted style by accident:

- `src/pages/about.astro:273` — the closing CTA
- `src/pages/[...slug].astro` — three instances in the article template

Every other `BookingButton` passes `hero` or `secondary` explicitly.

**The frosted button fails non-text contrast.** Measured against `emerald-950`
(`#022c22`):

| Element | Rendered | Ratio | WCAG 1.4.11 (needs 3:1) |
|---|---|---|---|
| `bg-white/10` fill | `#1b4138` | **1.34:1** | fail |
| `border-white/30` | `#4e6b64` | **2.61:1** | fail |
| White label on the fill | — | 11.29:1 | pass (text is fine) |

The label is readable. What fails is the boundary that says *this is a button*.

**Tracking is keyed on the attribute, not the class.** `BaseLayout.astro` binds
one delegated listener that matches `[data-booking-source]` via `closest()`. The
`booking-btn` class has **no CSS rule anywhere in the project** — it is inert. It
looks load-bearing and is not. This is the single most dangerous thing in the
current setup: a restyle that drops `data-booking-source` while carefully
preserving `booking-btn` would silently stop conversion tracking with no visible
symptom.

**The `source` taxonomy has drifted.** Around 40 distinct values with
inconsistent suffixes — `about-cta`, `me-cfs-final`, `l-carnitine-booking`,
`iv-therapy-hero`, `low-back-pain` (no suffix), `contact-page`. Both components
default to `source="unknown"`, so a forgotten prop fails silently into the data.

---

## 2. The system

### One component

Keep **`BookingButton`** as the single source of truth — it already owns the
JaneApp URL, the tracking attribute, the icon and the size scale, and the style
guide already names it. Convert `CTAButton` into a thin deprecated wrapper that
forwards to it, so all 52 existing call sites keep working and can be migrated
file by file rather than in one risky sweep.

### Two axes: emphasis and surface

The mistake to avoid is varying *emphasis* by section type — that is
inconsistency wearing a rationale. Booking is the same action everywhere, so it
should carry the same weight everywhere. What legitimately has to change is the
palette, because a solid button cannot use one fill on both dark and light
surfaces.

So: **emphasis is semantic, surface is physical.**

| | `surface="dark"` | `surface="light"` |
|---|---|---|
| **`primary`** — book an appointment | `bg-emerald-400 text-emerald-950` — **7.88:1** | `bg-emerald-900 text-white` — **9.72:1** |
| **`secondary`** — any lesser action | transparent, `border-white/40 text-white` — **3.57:1** | transparent, `border-emerald-900 text-emerald-900` — **9.72:1** |

Both primaries are solid, the same shape, the same icon, the same size scale.
They read as the same button in two palettes, which is what makes the action
recognisable across the site.

Mint (`emerald-400`) is not a new invention — it is already the fill of the
mobile header and mobile menu booking buttons in `BaseLayout.astro`, which are
the highest-traffic booking entry points on the site. Adopting it as the
on-dark primary makes the rest of the site agree with them.

Mint cannot be the light-surface fill: `emerald-400` on white is **1.92:1**.

### What happens to the frosted button

It stops being a primary. The translucent treatment is genuinely nice, and it is
the correct *look* for a lower-emphasis action — which is exactly what it should
have been all along. It becomes the `secondary` + `dark` rendition, with the
border raised from `white/30` to `white/40` so it passes 1.4.11.

The About closing CTA gets the **solid mint primary**. That section is the last
conversion opportunity on the page; de-emphasising the button there is
backwards. The headline sets up the ask, the button *is* the ask.

### Retire these variants

- **`hero`** — this is just `primary` at `size="lg"`. Delete the variant, pass a size.
- **`outline`** — folds into `secondary` + `light`.
- **`primary` (frosted)** — folds into `secondary` + `dark`.

### Sizes

Keep `sm` / `md` / `lg`. Note that `CTAButton` currently hard-codes
`px-10 py-4 text-lg` with no size prop, so every one of its 52 instances is
large; migrating them should pass `size="lg"` to avoid a visual change, then be
reviewed case by case.

### Fix while in there

- `CTAButton` hard-codes `focus-visible:ring-offset-emerald-950`. The offset
  colour must follow `surface`, or the focus ring is wrong on light sections.
- Add a visually-hidden "(opens in a new tab)" to the accessible name. Every one
  of these links is `target="_blank"` with no announcement.
- Drop `aria-label={text}` from `BookingButton`. It duplicates the visible label
  and will silently override it if the two ever diverge.
- Fix the hierarchy inversion on the About page: the underlined `emerald-300`
  link is currently more prominent than the CTA. Once the button is solid mint,
  soften that link to white with an underline.

---

## 3. Analytics contract

**Property:** GA4 `G-HWHX5T8PEG`, loaded via `gtag` in `BaseLayout.astro`,
production only. `send_page_view: false` with an explicit `page_view` on
`astro:page-load`, because Astro's client router would otherwise double-count.

**The rule that must not be broken:**

> Every booking CTA must render `data-booking-source="<value>"` on the root
> `<a>` element. This attribute — not the `booking-btn` class — is what fires
> the `booking_click` event.

The listener uses `closest()`, so nested spans and icons inside the anchor are
fine. Restyling is safe; removing or renaming the attribute is not.

### Changes to make

**Delete the `booking-btn` class.** It has no styling behind it and it invites
exactly the wrong assumption about what the tracking hook is. Removing it makes
the attribute obviously load-bearing. *(Check the GA4 property and Google Tag
Manager first — if any tag or trigger was ever configured against `.booking-btn`
outside this repo, keep it and add a comment instead.)*

**Make `source` required.** Type it as a required prop and drop the
`'unknown'` default so a missing value is a build error rather than silent data
loss.

**Add a structured placement, keep the old value.** Historical continuity
matters more than tidiness, so do not rewrite `button_source`. Add a second
parameter alongside it:

```js
gtag('event', 'booking_click', {
  button_source: bookingLink.getAttribute('data-booking-source') || 'unknown',
  button_placement: bookingLink.getAttribute('data-booking-placement') || 'unspecified',
  page_path: window.location.pathname,
  link_url: bookingLink.getAttribute('href') || ''
});
```

With `placement` drawn from a fixed vocabulary: `hero`, `inline`, `sidebar`,
`closing`, `nav`, `footer`, `sticky`. That gives a low-cardinality dimension you
can actually group by in GA4 — "how do closing CTAs perform against heroes"
becomes answerable, which it currently is not across 40 free-text values.

**Register the GA4 custom dimension.** `button_placement` must be registered as
a custom dimension in the GA4 admin or it will not appear in reports. Same
applies to `button_source` — worth confirming it was ever registered, otherwise
the existing data is only reachable through the Realtime and DebugView panels.

**Mark `booking_click` as a key event** in GA4 admin. It is the site's
conversion and should be counted as one.

**Known gap, leave as-is:** middle-click and ⌘/Ctrl-click fire `auxclick`, not
`click`, so those opens are not tracked. The links open in a new tab anyway, so
there is no navigation race to worry about and no need for `transport: 'beacon'`.

---

## 4. Migration

Ordered so nothing is ever half-migrated in a user-visible way.

**Phase 1 — component, no visual change.** Add `surface` and the new variants to
`BookingButton`. Keep the old variant names working as aliases. Nothing on the
site changes yet.

**Phase 2 — make `CTAButton` a wrapper.** Forward its props to `BookingButton`
(`primary`→`primary`+`dark` at `size="lg"`, `secondary`→`secondary`+`dark`),
mark it `@deprecated`. All 52 call sites keep rendering identically.

**Phase 3 — the visual switch.** Change the on-dark primary from white to solid
mint in one commit, so the whole site changes together rather than page by page.
This is the only commit with a visible before/after, which makes it easy to
review and easy to revert.

**Phase 4 — the four accidental frosted buttons.** About page closing CTA to
`primary`. The three in `[...slug].astro` reviewed individually: the sidebar
"Next Step" card is on a light surface and should be `primary`+`light`.

**Phase 5 — absorb the hand-rolled links.** The four raw `<a>` tags in
`BaseLayout.astro` (mobile header, mobile menu) and `contact.astro` become
`BookingButton` instances. These already use the right mint and emerald-900
fills, so this is a refactor, not a restyle.

**Phase 6 — placement attribute and the analytics changes** from section 3.

**Phase 7 — delete `CTAButton`** once no call sites remain, and update
`STYLE_GUIDE.md` to describe the two-axis system.

---

## 5. Verification

Before merging phase 3:

- [ ] `grep -rc 'data-booking-source' src/` — count matches the count before the change
- [ ] Build and confirm every rendered CTA still carries the attribute:
      `grep -o 'data-booking-source' dist/**/*.html | wc -l`
- [ ] GA4 DebugView: click a CTA on a dark section, a light section, the mobile
      header, and the footer — four `booking_click` events with correct `button_source`
- [ ] Contrast: every button boundary ≥ 3:1 against its own background
- [ ] Keyboard: tab to each variant, focus ring visible on both surfaces
- [ ] Compare a GA4 `booking_click` daily count either side of the deploy — a
      drop to zero means the attribute was lost somewhere

After phase 6, confirm `button_placement` appears in GA4 (allow up to 24h for a
newly registered custom dimension to populate reports).
