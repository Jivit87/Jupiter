---
name: ui-ux-frontend-design
description: Comprehensive UI/UX, web design, mobile-responsive design, and frontend engineering playbook for building distinctive, accessible, production-quality interfaces that work on every screen size. Use this skill for ANY task that touches how something looks or feels in a browser or app — building a new page, component, dashboard, landing page, form, or design system; redesigning or "polishing" existing UI; choosing colors, type, spacing, or layout; making a layout mobile-friendly/responsive; picking a component library or CSS framework; fixing accessibility or touch-target issues; or reviewing frontend code for design quality. Trigger this even when the user doesn't say "UI/UX" explicitly — phrases like "make it look better," "build a landing page," "design a dashboard," "make it mobile responsive," "this looks generic/AI-generated," "improve the frontend," or any request to create/edit React, Vue, HTML/CSS, or a design system should pull this skill in. Covers design principles, typography, color, layout, mobile-first responsive design (breakpoints, touch targets, viewport, safe areas), accessibility (WCAG 2.2), motion, component libraries (shadcn/ui, Radix, MUI, Chakra, Mantine), CSS frameworks (Tailwind), design tokens, and the current (2026) design-tool landscape.
---

# UI/UX & Frontend Design

You are acting as a senior product designer + frontend engineer, not just a code generator. The goal is never "technically renders" — it's an interface that is visually distinctive, usable by everyone, and built on real engineering discipline (semantic HTML, accessible components, responsive layout, clean CSS architecture).

Read this whole file before starting design or frontend work. For deep dives, jump to the referenced sections below as needed — you don't need to re-derive first principles every time, but do run through the **Pre-ship checklist** at the end before calling anything done.

---

## 1. How to approach a design task

1. **Pin down the brief.** If the request doesn't specify what's being built, for whom, and the page/screen's single job, decide these yourself and state the assumption in one line, then proceed — don't stall on clarifying questions for a design task. Ground every choice in the real subject matter and content, not a placeholder.
2. **Plan before you code.** Sketch a compact "token system" in your head or in a short note: 4–6 named colors (with hex), 2 typefaces (display + body, plus optional mono/utility), a layout concept (described in a sentence + rough wireframe), and one *signature element* — the single thing this design will be remembered by.
3. **Self-critique the plan against genericness** (see §8) before writing code. If the plan is what any AI would produce for a similar brief, revise it.
4. **Build with real engineering discipline**: semantic HTML first, then layout (Flexbox/Grid), then visual polish, then motion. Don't reach for a component library to solve a problem plain CSS solves better, and don't hand-roll what an accessible primitive (Radix, Headless UI) already solves correctly.
5. **Critique your own output.** If you can render/screenshot it, do. Check contrast, spacing rhythm, responsive breakpoints, and keyboard navigation before presenting it as done.

---

## 2. Foundational UX principles

These are load-bearing — apply them by default, not just when asked for "UX."

**Nielsen's 10 usability heuristics** (still the industry baseline):
1. Visibility of system status — always show what's happening (loading, saved, error states).
2. Match between system and the real world — use the user's language and mental models, not internal jargon.
3. User control and freedom — clear undo/cancel/back paths ("emergency exit") for every action.
4. Consistency and standards — same word, same icon, same place, every time; don't make users guess if different words mean the same thing.
5. Error prevention — prevent problems before they happen (confirmations for destructive actions, constraints on invalid input) rather than just messaging after the fact.
6. Recognition over recall — make options, actions, and objects visible; don't force the user to remember information across screens.
7. Flexibility and efficiency of use — accelerators (shortcuts, defaults, bulk actions) for expert users without cluttering the experience for novices.
8. Aesthetic and minimalist design — every extra unit of information competes with the relevant ones; cut anything not earning its place.
9. Help users recognize, diagnose, and recover from errors — plain-language errors, no error codes alone, and a concrete next step.
10. Help and documentation — even a well-designed system may need it; make it searchable and task-focused, not a dump.

**Classic UX/perception laws worth knowing by name and applying:**
- **Fitts's Law** — the time to reach a target depends on its size and distance. Make frequent/critical targets (primary CTA, close button) large and close; don't make destructive actions the easiest to hit.
- **Hick's Law** — more choices = longer decision time. Reduce/group options; progressive disclosure over showing everything at once.
- **Jakob's Law** — users spend most of their time on *other* sites/apps, so they expect yours to work the same way. Novelty in visual identity is good; novelty in core interaction patterns (nav, forms, checkout) usually costs usability.
- **Miller's Law** — working memory holds roughly 7±2 items; chunk related information (grouped fields, sectioned nav) instead of flat long lists.
- **Von Restorff (isolation) effect** — a visually distinct item is more memorable. Use sparingly, for the one thing that should stand out (primary CTA), not everywhere.
- **Aesthetic-usability effect** — users perceive attractive designs as more usable, which raises the bar: bad visual design also reads as untrustworthy even if functionally fine.
- **Gestalt principles** — proximity, similarity, continuity, closure, figure/ground. Grouping and whitespace communicate structure before any label does; if related things aren't visually grouped, no amount of copy fixes it.

**Progressive disclosure**: show only what's needed for the current step; reveal complexity on demand (accordions, "advanced settings," multi-step flows) rather than front-loading every option.

---

## 3. Visual design fundamentals

### Typography
- Pair a **display face** (personality, used with restraint — headlines, hero) with a **body face** (readable at small sizes, used for the bulk of content). Add a **mono/utility face** only if the content calls for it (code, data, labels).
- Set an intentional type scale (e.g. a modular scale like 1.25×) rather than ad hoc sizes. Limit yourself to ~4-6 sizes per page.
- Body text: 16px minimum on the web, line-height 1.5–1.6, line length ~50–75 characters. Never justify body text on the web.
- Font weight and spacing carry as much personality as the typeface choice — don't default to regular 400 weight everywhere.

### Color
- Build a system, not a palette of favorites: a primary, 1–2 accents, a neutral/gray scale (5–9 steps), and semantic colors (success/warning/error/info). Describe it as named hex values so it's reusable as design tokens.
- Contrast is non-negotiable, not just for accessibility but for legibility: body text ≥4.5:1 against its background, large text (≥18pt/24px or bold ≥14pt) ≥3:1 (WCAG AA). Never convey meaning by color alone — pair it with an icon, label, or pattern.
- Dark mode is not "invert the colors" — recompute contrast, desaturate deep-in-shadow surfaces slightly, and re-check every semantic color.

### Layout & spacing
- Use a consistent spacing scale (e.g. 4px or 8px base unit: 4/8/12/16/24/32/48/64...) instead of arbitrary pixel values — this alone makes a layout look intentional.
- Whitespace is a design element, not empty space to fill. Group related items tightly, separate unrelated groups generously (Gestalt proximity).
- Grid systems (12-column, or CSS Grid areas) create alignment discipline; align to a grid even in "freeform" layouts.
- Responsive is not optional: design mobile-first or at minimum verify at 375px, 768px, 1024px, 1440px. Don't just shrink desktop layouts — rethink navigation, tables, and multi-column content for small screens (stacked cards, off-canvas nav, horizontal scroll for tables).

### Composition
- The hero/above-the-fold area should open with the single most characteristic thing about the subject — not a generic "big headline + subhead + two buttons" template unless that's genuinely the right call.
- Structural devices (numbering, dividers, eyebrows/labels) should encode real information (an actual sequence, an actual category), not just decorate.
- Spend visual boldness in one place — the signature element — and keep the rest disciplined. An interface where everything shouts is one where nothing is heard.

---

## 4. Mobile-responsive & mobile web design (required baseline, not an enhancement)

Treat every build as mobile-first by default unless told otherwise: design and implement the small-screen layout first, then progressively enhance for larger viewports. It's far easier to add space than to rescue a cramped desktop layout after the fact.

**Viewport & meta**
- Always include `<meta name="viewport" content="width=device-width, initial-scale=1">`. Never disable pinch-zoom (`user-scalable=no` / `maximum-scale=1`) — that's an accessibility violation (WCAG 1.4.4).
- Use relative units (`rem`, `%`, `vw`/`vh`, `clamp()`) over fixed pixel widths for anything that needs to scale across devices.

**Layout technique**
- Build with CSS Grid/Flexbox + `flex-wrap` and container-relative sizing rather than fixed-width columns; let content reflow naturally instead of hard-coding breakpoint-specific widths everywhere.
- Use `clamp(min, preferred, max)` for fluid type and spacing so text/gaps scale smoothly between breakpoints instead of jumping.
- Standard breakpoints to actually test at: **375px** (small phone), **414–430px** (large phone), **768px** (tablet portrait), **1024px** (tablet landscape / small laptop), **1440px+** (desktop). Don't just check one phone size and call it done.
- Prefer `@container` queries over `@media` queries for components that need to adapt based on their own container (cards, sidebars) rather than the full viewport — this makes components portable across layouts.

**Navigation & structure on small screens**
- Rethink navigation for mobile rather than shrinking a desktop nav bar: bottom tab bar, hamburger/off-canvas drawer, or a collapsed menu are standard patterns — pick based on how many top-level destinations exist (bottom nav for ≤5 items).
- Convert multi-column layouts to single-column stacks; convert wide data tables to stacked cards, horizontally-scrollable tables with a sticky first column, or a "priority columns" pattern rather than shrinking text to fit.
- Sticky headers/footers on mobile eat significant vertical space — keep them minimal and make sure they don't obscure focused elements (WCAG 2.2 focus-not-obscured) or the keyboard on inputs.

**Touch, not hover**
- Nothing essential should depend on `:hover` — mobile has no hover state. Any hover-revealed content (tooltips, dropdown triggers) needs a tap-accessible equivalent.
- Touch targets minimum **44×44px** (Apple HIG / WCAG 2.2 recommended) with real spacing between adjacent tappable elements to prevent mis-taps — this applies to icon buttons, list rows, and form controls alike, not just obvious buttons.
- Design for thumb reach: primary actions in the lower two-thirds of the screen where they're easy to reach one-handed; avoid critical top-corner-only controls on tall phones.
- Support native touch gestures where users expect them (swipe to dismiss, pull to refresh) but never make a gesture the *only* way to trigger something essential — always provide a visible tappable alternative.

**Forms on mobile**
- Use the correct `<input type>` and `inputmode`/`autocomplete` attributes (`email`, `tel`, `numeric`, `one-time-code`, etc.) so the right keyboard appears automatically.
- Font size on inputs should be **≥16px** — smaller sizes cause iOS Safari to auto-zoom into the field, which is jarring.
- Minimize typing: prefer pickers, toggles, and native `<select>`/date inputs over free text where possible on touch devices.

**Performance is a mobile UX issue, not just a technical one**
- Mobile networks and devices are slower and more variable than desktop dev environments — treat performance budgets as part of the design brief. Compress and responsively-size images (`srcset`/`sizes` or `<picture>`), lazy-load offscreen content, and avoid layout shift (reserve space for images/ads/embeds via width/height or `aspect-ratio`) to prevent Cumulative Layout Shift.
- Avoid large render-blocking JS/CSS bundles; code-split where the framework supports it.

**Safe areas & device quirks**
- On iOS, respect the notch/home-indicator safe areas with `env(safe-area-inset-*)` in CSS for any fixed/full-bleed header or footer.
- Test with the on-screen keyboard open — inputs and their submit actions must stay reachable and not get hidden behind the keyboard.
- Verify both portrait and landscape orientation; don't lock orientation unless there's a real functional reason (e.g. a game).

---

## 5. Accessibility (non-negotiable baseline: WCAG 2.2 AA)

Accessibility is a design requirement, not a QA afterthought — most WCAG 2.2 criteria are easiest to satisfy by designing for them from the start, not patching later. Organize around **POUR**: Perceivable, Operable, Understandable, Robust.

**Must-do baseline for every interface you build:**
- **Semantic HTML first.** Use `<button>`, `<nav>`, `<main>`, `<label>`, heading hierarchy (`h1`→`h2`→`h3`, no skipped levels) before reaching for ARIA. ARIA supplements HTML semantics; it doesn't replace them.
- **Color contrast**: body/small text ≥4.5:1, large text ≥3:1, UI component/graphic boundaries ≥3:1 against adjacent colors.
- **Keyboard operability**: every interactive element reachable and operable via Tab/Enter/Space/Arrow keys, with a visible focus indicator (don't remove `outline` without replacing it) that isn't obscured by sticky headers or other content.
- **Alt text**: meaningful images get descriptive alt text; purely decorative images get `alt=""`; complex images (charts) get a text equivalent nearby.
- **Forms**: every input has an associated, visible `<label>`; errors are described in text (not color/icon alone) and programmatically associated with the field; don't force users to re-enter information they already gave you in the same session.
- **Touch targets**: at least 44×44px (24×24px minimum per WCAG 2.2, 44px recommended) for anything tappable, with adequate spacing between adjacent targets.
- **Text resize/reflow**: content must reflow without loss of function up to 400% zoom / 200% text-size increase, no horizontal scroll required.
- **Motion**: respect `prefers-reduced-motion`; nothing flashes more than 3×/second; provide pause/stop controls for anything that auto-plays or auto-advances.
- **No CAPTCHA-only or cognitive-test-only authentication** without an accessible alternative (WCAG 2.2 new criterion).
- **Focus not obscured**: when an element receives keyboard focus, it must not be fully hidden behind sticky headers/footers (WCAG 2.2 new criterion).

**Testing**: verify with a keyboard only (unplug the mouse mentally), run an automated scanner (axe, Lighthouse, WAVE) as a floor not a ceiling, and check real contrast values — automated tools catch maybe 30-40% of issues, the rest need manual/screen-reader review (NVDA on Windows/Firefox, VoiceOver on macOS/iOS).

---

## 6. Motion & interaction

- Motion should clarify, not decorate: use it to show relationships (where did this panel come from/go to), give feedback (button press, save confirmation), or direct attention (one orchestrated moment beats scattered micro-animations everywhere).
- Prefer CSS transitions/transforms for simple state changes (opacity, transform: translate/scale) — they're cheap and GPU-accelerated. Reach for a JS animation library (Framer Motion, GSAP) only for choreography plain CSS can't express.
- Keep durations short: ~150-250ms for micro-interactions, ~300-500ms for larger transitions. Use ease-out for things entering, ease-in for things leaving.
- Always respect `prefers-reduced-motion: reduce` — provide a reduced/no-motion fallback, don't just disable everything jarringly.
- Over-animating is one of the biggest tells of a templated/AI-generated feel — restraint is often the more sophisticated choice.

---

## 7. Component libraries, CSS frameworks & tooling (2026 landscape)

Pick based on project constraints, not habit. Don't hand-roll accessible primitives (dropdowns, dialogs, comboboxes) when a well-tested headless library already solves the hard parts (focus trapping, ARIA, keyboard nav).

**CSS approach**
- **Tailwind CSS** is the dominant utility-first approach in 2026 and pairs naturally with component-driven frameworks (React/Vue/Svelte). Good default unless the project already has an established CSS methodology.
- Plain CSS with custom properties (design tokens as CSS variables) remains the right call for simpler sites or when avoiding a build step.

**Component/primitive libraries**
- **shadcn/ui** — not a traditional npm dependency; you copy accessible, Tailwind-styled component source into your repo and own/customize it. Built on Radix primitives. Excellent default for React + Tailwind projects wanting full control.
- **Radix UI / Radix Primitives** — unstyled, fully accessible interaction primitives (dialog, dropdown, tooltip, etc.) — the foundation many other libraries (including shadcn/ui) are built on. Use directly when you want your own visual system with correct accessibility behavior underneath.
- **Material UI (MUI)** — comprehensive, production-ready, Google Material Design out of the box; good for admin/internal tools where speed matters more than a bespoke identity.
- **Chakra UI** — accessible, themeable, good developer ergonomics for React.
- **Mantine** — 100+ components, hooks, full TypeScript support, strong free tier.
- **Ant Design** — enterprise/admin-dashboard-oriented, very complete out of the box.
- Pick **headless/unstyled** (Radix, Headless UI, React Aria) when the brief calls for a distinctive visual identity; pick a **fully-styled system** (MUI, Ant Design, Chakra) when speed and consistency matter more than uniqueness (internal tools, admin panels, MVPs).

**Design files → code**
- **Figma** remains the dominant design tool in 2026 — Variables (design tokens), Auto Layout (mirrors CSS Flexbox), and Dev Mode for code handoff are the relevant features if collaborating with designers or importing a Figma spec.
- **Penpot** is the leading open-source alternative with a CSS-native layout model, useful when avoiding proprietary tooling matters.
- AI-assisted design-to-code tools (v0.app, Figma Make, Google Stitch, UX Pilot) are increasingly used for first-draft scaffolding — treat their output as a starting point to refine, not final code, especially for accessibility and design-token consistency.

**Design tokens**: whatever stack is used, define color/spacing/type/radius/shadow as named tokens (CSS variables, Tailwind theme config, or a tokens.json) rather than hardcoding values inline — this is what makes a design system actually maintainable and themeable (including dark mode).

---

## 8. Writing & microcopy

Words are part of the interface, not an afterthought layered on after the visuals are done.

- Write from the user's side of the screen: name things by what people recognize and control, not by internal system/implementation names.
- Default to active voice and consistent verbs: a button that says "Save changes" should produce a confirmation that says "Saved," not "Submitted successfully."
- Errors state what went wrong and how to fix it, in plain language — never a bare error code, never vague ("Something went wrong").
- Empty states are an invitation to act, not just an absence — tell the user what would appear here and how to add it.
- Be specific over clever. Sentence case over Title Case for UI labels in most modern products. Cut filler words ruthlessly.

---

## 9. Avoiding the "generic AI-generated" look

As of 2026, AI-generated interfaces cluster around a few recognizable defaults. Recognize them so you can consciously choose otherwise, not fall into them by default:
- Warm cream background (~#F4F1EA) + high-contrast serif display + terracotta accent.
- Near-black background + one bright acid-green or vermilion accent.
- Broadsheet/newspaper layout: hairline rules, zero border-radius, dense columns.
- Numbered markers (01 / 02 / 03) used decoratively on content that isn't actually sequential.
- A hero of "big headline + subhead + two buttons + gradient blob" regardless of subject matter.
- Overuse of glassmorphism, excessive box-shadow, or animation on every single element.

None of these are wrong when the brief genuinely calls for them — the problem is using them by default regardless of subject. Ground every visual choice in the actual content and audience of what's being built, and take one deliberate risk you can justify from the brief.

---

## 10. Pre-ship checklist

Before presenting frontend/design work as finished, verify:

- [ ] Responsive from ~375px to large desktop; no horizontal scroll, no broken layouts at any standard breakpoint (375 / 414 / 768 / 1024 / 1440)
- [ ] Tested in both portrait and landscape; on-screen keyboard doesn't hide the active input or its submit action
- [ ] No functionality depends on `:hover` alone; all touch targets ≥44×44px with real spacing between them
- [ ] Viewport meta tag present and pinch-zoom is NOT disabled
- [ ] Images are responsively sized (`srcset`/`sizes`) and space is reserved to avoid layout shift
- [ ] Keyboard-only pass: can Tab through every interactive element in a logical order with a visible focus state
- [ ] Color contrast checked (4.5:1 body text, 3:1 large text/UI components) — not eyeballed
- [ ] All images have appropriate alt text (or `alt=""` if decorative); all form inputs have associated labels
- [ ] Headings are hierarchical and semantic (`h1`→`h2`→`h3`, no skipped levels, no styling-only heading tags)
- [ ] Motion respects `prefers-reduced-motion`; nothing flashes >3×/sec
- [ ] Spacing and type sizes come from a consistent scale, not arbitrary one-off values
- [ ] Loading, empty, error, and success states are all designed, not just the happy path
- [ ] The design doesn't default to a generic AI-look pattern (§8) without a reason grounded in the brief
- [ ] CSS specificity is clean — no classes silently overriding each other, especially for spacing between sections