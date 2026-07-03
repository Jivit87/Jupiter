# Mobile Responsive Design — Audit & Fix Skill

A general-purpose skill for auditing and fixing mobile responsiveness on **any** page or website — not tied to a single site. Use this whenever a page "works on desktop but breaks/feels wrong on mobile," or when reviewing a design/build before ship.

---

## 1. Core Principles (2026 baseline)

Responsive design rests on three foundational techniques, plus two that are now considered standard practice:

1. **Fluid grids** — layout widths in relative units (`%`, `fr`, `minmax()`) instead of fixed pixels, using CSS Grid/Flexbox.
2. **Flexible media** — images/video capped with `max-width: 100%` so they scale within their container instead of overflowing.
3. **Media queries** — breakpoints defined by **where content breaks**, not by specific device models.
4. **Container queries** *(2026 standard)* — components respond to their *parent container's* width, not just the viewport. This is what makes a card, button, or form field responsive on its own, regardless of whether it's in a sidebar, modal, or hero.
5. **Fluid typography with `clamp()`** *(2026 standard)* — text scales smoothly between a min/max size across viewport widths instead of jumping at fixed breakpoints.

**Mobile-first is the recommended default for new work:** design/build the smallest screen first, then layer on complexity with `min-width` media queries as space increases. This forces prioritization (what actually matters gets kept) rather than the common failure mode of designing desktop first and cramming it down later. Google also uses **mobile-first indexing** — it crawls and ranks based on the mobile version of a page, so mobile UX is directly an SEO factor, not just a UX nicety.

> Rule of thumb: designing responsively means asking **"how should this content rearrange as space changes?"** — not **"how do I shrink this to fit?"**. A layout that just scales down desktop proportions is not truly responsive, even if it "fits."

---

## 2. The #1 Failure Pattern: Naive Stacking

The most common real-world mobile bug is **not** "things don't fit" — it's that a designer/dev took a desktop layout with items **side by side** and simply stacked them **vertically, at the same size, in the same order**, without redesigning the component for a narrow, tall viewport. Symptoms:

- Multi-column rows (icons, cards, badges, footer columns) become one long single column instead of a smarter grid.
- Visual connectors between items (arrows, dashed lines showing a sequence/flow) are silently dropped when the row becomes a column, breaking the meaning ("these are steps in order").
- Icons/illustrations sized for a 3-or-4-across desktop row keep their full size when stacked, so each item alone eats most of a phone screen.
- Section padding/margins tuned for large desktop whitespace carry straight through to mobile, multiplying scroll length.
- Text blocks and their associated media (e.g., a paragraph + a video) both go full-width and full-stack, rather than being redesigned to be visually compact at narrow widths.

Fixing this pattern is usually the single highest-leverage mobile improvement available on any page.

---

## 3. Audit Checklist (apply per component, not per page)

Walk each component through these questions — don't just eyeball the whole page:

### Layout & structure
- [ ] **Grid vs. single column:** Could 3+ items in a row become a **2-column grid** on mobile instead of a 1-column stack? (Trust badges, feature icons, small cards almost always benefit from this.)
- [ ] **Horizontal scroll/carousel:** For "many similar items" (category chips, product cards, testimonials, avatars) — keep them in a row and let users swipe, rather than stacking vertically.
- [ ] **Icon-left/text-right instead of icon-top/text-bottom:** Converts tall stacked steps/list items into a shorter, denser list. Good for step-by-step flows, footer nav groups, feature lists.
- [ ] **Preserve sequence/connector language:** If desktop shows arrows or dashed lines linking steps, mobile needs an equivalent (typically a **vertical connector line**) — don't let it silently disappear.
- [ ] **Icon/illustration scaling:** Large decorative icons/illustrations sized for a horizontal desktop row should shrink (often 30–50%) when stacked vertically, or they'll each dominate a full screen.
- [ ] **Collapsible sections/accordions:** For footers, FAQs, or long nav groups — consider letting users expand only what they need instead of forcing a full scroll past everything.
- [ ] **Mid-breakpoint awareness:** Not everything needs to collapse straight from desktop to single-column mobile. Some 2-up layouts can survive down to ~480–600px before stacking.
- [ ] **One-handed reachability:** Place frequently-tapped elements (primary CTA, nav) in the bottom two-thirds of the screen where thumbs comfortably reach.
- [ ] **Above-the-fold priority:** Critical CTAs and the core value proposition should be visible without scrolling on a ~360–390px wide viewport.

### Media & images
- [ ] Images use `max-width: 100%` (or equivalent) so they never overflow their container.
- [ ] `width`/`height` attributes (or `aspect-ratio`) are set so images/video reserve space before loading — prevents layout shift (CLS).
- [ ] Wide banner/hero images have a **mobile-specific focal point or crop** — a naive center-crop on a wide image often cuts off the actual subject on a narrow viewport.
- [ ] Video/embeds have a defined aspect-ratio box and a poster image/fallback, so a failed load doesn't collapse or blow out the layout.
- [ ] Responsive images (`srcset`/`sizes`) serve appropriately sized assets to mobile rather than shipping desktop-resolution images over a mobile connection.

### Typography
- [ ] Text uses fluid sizing (`clamp()` or equivalent) rather than fixed pixel sizes that either overflow or become unreadably small.
- [ ] Line length stays in a readable range (~45–75 characters) at every width — don't let paragraphs stretch edge-to-edge on wide phones/tablets.
- [ ] Text block spacing (margins, line-height) is tightened for mobile, not just carried over at desktop proportions within a narrower column.
- [ ] Layout does not break when text is resized up to 200% (WCAG 2.2 requirement — also a strong signal of genuinely fluid typography vs. just "fits at default size").

### Touch & interaction
- [ ] All interactive elements (buttons, links, icons, form fields) have a minimum touch target of **44×44px** (Apple HIG / WCAG 2.5.5 guidance), with adequate spacing so adjacent targets aren't accidentally tapped.
- [ ] Primary navigation collapses into a clear, discoverable pattern (commonly a hamburger menu) on mobile — nav is rarely the first thing a mobile user needs, so it shouldn't compete with content for space.
- [ ] Hover-only interactions (tooltips, hover menus, hover states revealing content) have a tap-based equivalent — hover doesn't exist on touchscreens.
- [ ] Forms use appropriate mobile input types (`type="email"`, `type="tel"`, `inputmode`) to trigger the right keyboard, and fields/buttons are large enough to tap accurately without zooming.

### Performance (mobile-specific)
- [ ] Core Web Vitals are evaluated on mobile specifically, not just desktop: **LCP** (Largest Contentful Paint), **CLS** (Cumulative Layout Shift), **INP** (Interaction to Next Paint).
- [ ] Unoptimized fonts, oversized images, and missing width/height attributes are checked first — they're the most common causes of mobile CWV failures.
- [ ] Test under real/throttled mobile network conditions, not just fast wifi with a resized browser window.

### Accessibility (overlaps heavily with responsive correctness)
- [ ] Minimum color contrast: 4.5:1 for normal text, 3:1 for large text.
- [ ] All interactive elements are keyboard-accessible, with visible focus states (matters even on "mobile-only" pages since assistive tech and external keyboards are used).
- [ ] No content relies purely on hover or precise mouse position to be discoverable.

### Orientation & viewport range
- [ ] Test **both portrait and landscape** — a layout that's perfect in portrait can break in landscape, especially fixed-height sections or video embeds that get cut off.
- [ ] Test a genuine range of widths (not just one phone size): ~360px (small Android), ~390–430px (modern iPhone), ~768px (tablet portrait), plus your normal desktop breakpoints. Don't assume "iPhone-shaped" is the only mobile case.
- [ ] Check for any horizontal scrollbar at any width — this is one of the clearest signs of a non-responsive layout.

### Functional bugs vs. layout bugs
- [ ] Explicitly separate "this looks bad on mobile" (a layout/CSS issue) from "this is actually broken" (e.g., a video embed failing to load, a broken link, a form that doesn't submit). Layout fixes won't resolve functional bugs, and functional bugs shouldn't be miscategorized as "just a responsive issue" — they need their own fix and often affect desktop too.

---

## 4. Testing Method

1. **Automated first pass:** Google's Mobile-Friendly Test, and Lighthouse (in Chrome DevTools) for Core Web Vitals and accessibility scoring.
2. **DevTools device emulation** for fast iteration across common breakpoints and both orientations.
3. **Real-device testing** — at minimum one mid-range Android device (a large share of global mobile traffic, and frequently under-tested by teams that only own newer iPhones) and one iOS device. Emulation catches layout bugs; it does not reliably catch touch behavior, true font rendering, or real network conditions.
4. **Manual resize test:** open the site in a desktop browser and slowly drag the window narrower — watch for the exact pixel width where something breaks, overlaps, or triggers a horizontal scrollbar, rather than only checking a few fixed breakpoints.
5. **Content-based breakpoints:** when something breaks, set the breakpoint at that content-driven point rather than at a "standard" device width — this is more robust as new device sizes (foldables, new tablets) continue to appear.

---

## 5. Quick Reference: Common Fixes

| Symptom | Likely Cause | Fix |
|---|---|---|
| Long, boring vertical scroll of many small items | Desktop row naively stacked 1-per-line | Convert to a 2-column grid, or a horizontal scroll/carousel |
| Multi-step process loses its "flow" feeling on mobile | Connector arrows/lines only styled for horizontal layout | Add a vertical connector; shrink icons so steps feel like a compact list, not separate screens |
| Footer/nav takes forever to scroll past | All columns dumped into one stack | 2×2 grid, or accordion-style collapsible groups |
| Banner image looks cropped wrong/subject missing | Naive center-crop of a wide image | Set explicit focal point or mobile-specific crop |
| Text overflows or is unreadably small | Fixed pixel font sizes | Fluid typography via `clamp()`, cap line length |
| Layout shifts/jumps while loading | Missing image/video dimensions | Set `width`/`height` or `aspect-ratio` up front |
| Buttons hard to tap accurately | Touch targets under 44×44px, insufficient spacing | Resize to ≥44×44px, add spacing between adjacent targets |
| Video/embed area is blank or shows an error, on any device | Functional bug (broken source/CDN), not a layout issue | Fix embed source; add poster image + fallback link; don't conflate with responsive work |
| Section feels bloated / too tall on mobile | Desktop padding/margins carried over unchanged | Reduce vertical padding at mobile breakpoints (roughly 40–60% of desktop values) |

---

## 6. Summary

Responsive design in 2026 is not a one-time checklist pass — it's a mindset of designing **components**, not pages, to adapt to whatever context they're placed in. The single most valuable habit: whenever you see a desktop row become a mobile column, stop and ask *"is this actually the right mobile layout, or did we just let it fall straight down?"* — then apply the grid/carousel/accordion/compact-icon patterns above rather than defaulting to a naive stack.