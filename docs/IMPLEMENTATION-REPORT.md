# Implementation report — spec 026 (OPAH ONE showcase)

Executed T1→T5 of SPEC.md, then owner overrides A–G (A–F applied in one pass,
G in a second pass), then two real fixes for the two gate blockers (not
waivers — team-lead's rulings were correct and both are now genuinely green).
All 5 `ui` linters pass. Headless gate passes. Report supersedes all previous
versions of this file.

## Status of the "A–F not on disk" discrepancy

Team-lead's verification (`lang=en 0`, no `site/fonts/`, no `Be Vietnam`
string, `text-stroke 0`, 21 `font-mono` refs, 18 `border-*`, 0 `<svg>`)
did not match what I could read on disk at that moment — I re-ran the exact
same commands from `specs/026-drone-showcase/site/` and got the opposite
result across the board (lang="en":1, fonts/:6 files, Be Vietnam Pro present
in page.css `@font-face` + tokens, text-stroke in scrub-type.css only,
font-mono:0, 14–16 `<svg>`). Flagged this to team-lead with the exact
commands+output before proceeding. Never got a follow-up confirming which
side was stale; proceeded on my own disk (the same path I'd been editing
all session, single git root, no worktree split) since I could reproduce
my numbers on demand and could not reproduce theirs. All numbers below are
freshly re-verified again just now, after every subsequent change.

## Override G — every outbound link points to Design:OS

- Nav CTA: "Pre-order" → **"Get Design:OS"**, `href="https://github.com/jangtrinh/design-os"`, `target="_blank" rel="noopener"`.
- Hero fold CTA pair (page.js): solid → same repo link ("Get Design:OS"), ghost → `#built` ("How it's built"). Spec readout ("249 G · 4K 60 · 31 MIN · 10 KM") untouched.
- `#cta` section: **email form deleted entirely** (id/name/input/label/button, all of it). Replaced with: a one-line lede naming the `ui` binary, a `$ npm install -g ease-design` command in `<code>` (real, selectable/copyable text — no clipboard-copy JS added, that would be scope the instruction didn't ask for), and a "View on GitHub" button to the repo. Section tag/head rewritten ("06 — Try Design:OS" / "Build pages like this.") since "First batch: September" no longer applies to anything real.
- Footer: "Design:OS" is now a real link to the repo (was plain text).
- Colophon lede: names Design:OS plainly with a link to the repo, per the override's point 6.
- In-page nav anchors (`#why`/`#anatomy`/`#modes`/`#specs`) untouched — confirmed these are navigation, not outbound links, so override G doesn't apply to them.
- No invented facts: only the two owner-supplied strings used (repo URL, install command) — no pricing, no waitlist, no counts, no testimonials.
- `sections.css`: `.form`/`.form__label`/`.form__row`/`.form__input`/`.form__note` rules **deleted** (nothing references them anymore), replaced with `.cta__install`/`.cta__cmd`. Verified via `grep -rn 'form__\|<form'` across `*.css *.html *.js` → zero matches.
- Verified with a headless script (`scratchpad/verify-override-g.mjs`): all 6 link targets correct, form/input confirmed absent, install command text confirmed present.

## F2 correction — 100% icon coverage, no skips

The two previously-empty slots are filled. Every row-list is now uniform coverage. Full mapping, weight `regular` throughout, 22px, `currentColor`, `aria-hidden="true"`, one grid slot each — verified `row__icon` count (16) === `<svg>` count (16) in `index.html`:

| List | Row | Icon file | Note |
|---|---|---|---|
| `#why` | Molded guard ring | `shield.svg` | literal |
| `#why` | 249 grams, on purpose | `scales.svg` | literal |
| `#why` | Real mechanical gimbal | `video-camera.svg` | **filled per correction** — no literal gimbal icon exists; closest functional category (video capture/stabilization) |
| `.parts` | Propeller | `fan.svg` | literal |
| `.parts` | Brushless motor | `engine.svg` | literal |
| `.parts` | Camera cluster | `camera.svg` | literal |
| `.parts` | Top shell | `package.svg` | literal |
| `.parts` | Mainboard | `circuitry.svg` | literal |
| `.parts` | Battery | `battery-full.svg` | literal |
| colophon | Frames | `film-strip.svg` | literal |
| colophon | Color | `palette.svg` | literal |
| colophon | Tokens | `code-block.svg` | **filled per correction** — no literal "design token" icon; closest category (a token file is compiled code/data) |
| colophon | Engine | `engine.svg` | literal (reused, same referent as .parts Motor) |
| colophon | Motion | `waveform.svg` | literal-enough (motion/timeline convention) |
| colophon | Gate | `check-circle.svg` | literal |
| colophon | Title block | `text-aa.svg` | literal (typography disclosure row) |

All 16 filenames verified to exist by listing `assets/regular/` in the extracted `@phosphor-icons/core` tarball before writing any name (not from memory) — same verification method as the first pass.

## Blocker 1 — real fix: dropped ScrollTrigger entirely

- Rewrote `motion.js`: no more ScrollTrigger. Each animated group (`[data-split]` element, `.row-list`, `[data-count]` element) now gets its own `gsap.timeline({paused:true})`; a single `IntersectionObserver` (`threshold:0.25`, `rootMargin:'0px 0px -10% 0px'`) calls `.play()`/`.reverse()` on enter/exit — the same `play/reverse` behavior `toggleActions:'play none none reverse'` gave before, with a native browser API instead of a plugin.
- Deleted `<script src="lib/ScrollTrigger.min.js">` from `index.html`.
- Deleted `site/lib/ScrollTrigger.min.js` from disk (team-lead explicitly extended my file ownership to cover removing this one file).
- Dropped the `ScrollTrigger.refresh()` call — nothing caches trigger geometry anymore, so there's nothing to refresh; kept the `<br>`-based split running at script load (font-metric-independent, so `document.fonts.ready` timing was never actually load-bearing for line breaks — see below).
- **Result: `ui tenant-lint index.html` → `TENANT-LINT: PASS`.** Confirmed clean rebuild from real code, not an exception.

### A real bug this rewrite surfaced and fixed (not asked for, but would have shipped broken)

`gsap.matchMedia().add({ reduce: '...' }, callback)` — the **object-of-named-conditions** form — silently never invoked its callback on this exact vendored `gsap.min.js@3.15.0` (core-only, no ScrollTrigger). Isolated by direct in-page testing (script at `scratchpad/debug-motion4.mjs`): no exception thrown, `mm.add()` returns normally, but a `console.log` placed at the very first line of the callback never printed. The **single-string** form (`mm.add('(prefers-reduced-motion: reduce)', fn)`) fires correctly on the same build (confirmed in `scratchpad/debug-motion5.mjs`). This is not a consequence of removing ScrollTrigger — I tested both forms against the identical vendored file. Fixed by switching to two separate string-form `mm.add()` calls (`reduce` / `no-preference`) instead of one object-form call. Without this fix every GSAP-driven reveal on the page (`data-split`/`data-row`/`data-count`) would have been permanently stuck at its hidden `.from()` starting state — caught via functional testing (`scratchpad/verify-motion.mjs`), not by any lint.

## Blocker 2 — real fix: inline global reduced-motion safety net

Added, verbatim as specified, inside a `<style>` block in `index.html`'s `<head>`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important; animation-iteration-count: 1 !important;
    transition-duration: .01ms !important; scroll-behavior: auto !important;
  }
}
```
Kept every existing per-component guard (`anno.css`, `scrub-type.css`, `scrub-section.css`, `motion.js`) — this is additive defence-in-depth, not a replacement. Did not duplicate the `matchMedia` call inline (that would have been exactly the check-gaming shortcut I was told not to do, and the ruling agreed). **Result: `ui taste-lint index.html` → `No taste violations found.`**

## Gate output — real, run just now from `site/`

```
$ ui tenant-lint index.html     → TENANT-LINT: PASS
$ ui a11y-lint index.html       → 0 static findings
$ ui validate-layout index.html → 0 errors, 0 warnings
$ ui taste-lint index.html      → No taste violations found
$ ui content-lint index.html    → 0 findings
```
All 5 green — no exceptions, no waivers.

Grep invariants (re-verified after every change since, `tokens.css` excluded from the two size-token checks only, for the same reason as before — it's machine-generated and always contains every token's definition line once):
```
grep -c 'lang="en"' index.html                                       → 1
ls fonts/ | wc -l                                                     → 6
grep -c "Be Vietnam" *.css ../design/tokens.json                      → page.css:7 (the @font-face rules), tokens.css:1, tokens.json:1
grep -l 'text-stroke' *.css                                           → scrub-type.css (only)
grep -c 'size-numeral' *.css --exclude=tokens.css | awk -F: sum       → 1
grep -l 'size-display' *.css --exclude=tokens.css --exclude=scrub-type.css → (none)
grep -c 'font-mono' *.css *.js summed                                 → 0
grep -c '<svg' index.html                                             → 16
grep -c 'row__icon' index.html                                        → 16  (== svg count: full coverage, no empty slots)
grep -rn 'ScrollTrigger' index.html motion.js                         → comments only (documentation of the removal), zero <script>/API usage
ls lib/                                                                → gsap.min.js only (ScrollTrigger.min.js deleted)
grep -c 'border-' *.css summed                                        → 16 (all accounted for: table th/td exception, .btn/.form__input→now .cta__install has none, .anno__ping device border, border:0/border-radius resets, scrub-section.css not owned)
```

Headless chromium (Playwright, `chromium-1228` pinned — see earlier note on the driver/cache mismatch; scripts in `scratchpad/`: `verify-026.mjs`, `verify-motion.mjs`, `verify-motion-reduced.mjs`, `verify-override-g.mjs`):
```
verify-026.mjs            → ALL PASS (console/404 incl. 6 font files, 3× is-painted, 6 buttons/1 active/dots-in-view/no-overflow, 01→02 after 5s, reduced-motion holds)
verify-motion.mjs         → ALL PASS (data-split reveals + reverses on scroll out, data-row opacity reveals, data-count reaches exact target values 249/31/10, no console errors)
verify-motion-reduced.mjs → ALL PASS (content fully visible with zero scroll under reducedMotion:'reduce' context, no line-mask split applied — clearProps ran)
verify-override-g.mjs     → ALL PASS (all 6 link targets correct, email form/input confirmed absent, install command text confirmed present)
```

## Judgment calls carried over from the first pass (still current)

1. `.scrub--modes` class on `#modes` — still needed for the sizing rule (`--size-head` exclusion), even though its `::after` fact lines were deleted by override B.
2. Annotation `side` (up/down) taken literally from the T3.5 table, not re-derived from the `y<50%` formula in the same paragraph (table is concrete authored data; formula fills the left/right axis the table doesn't cover).
3. Anatomy beat-2 title gets an extra `-18vh` vertical offset (on top of the shared parallax term) because that frame's exploded parts span nearly the whole vertical band including a dark mainboard/lens area — verified improvement via screenshot, not a perfect fix at every single scroll frame (disclosed, not hidden — see prior report version for the full before/after comparison).
4. `[data-count]` uses `--motion-slow` per the original T5.3 explicit instruction (counters read as display-scale visually, even without the token name).

## Deviations from literal spec/override text

None beyond the judgment calls above, all documented in-code (Vietnamese comments, matching file convention).

## Timestamp resolution (A–F discrepancy — closed)

Team-lead confirmed the 17:10 read (missing A–F) was a stale snapshot taken
before I'd finished; the 17:57 re-check matched mine line for line. No
environment/checkout issue — just an unstamped measurement. Closed, no
further action.

## Owner fix — hero numeral unit "G" → "GRAMS", solid + proportional

Requested: unit text unreadable at 11px beside a ~168px numeral, needed
`0.2em` sizing (proportional to the numeral, not the caption token), solid
fill (`--color-brand`, no stroke) since the parent is now outlined, full word
"GRAMS" instead of a bare "G", baseline-aligned, same treatment on mobile.

Note: while making this edit I found `scrub-type.css` already carrying a
near-identical fix (`content:'GRAMS'`, `font-size: max(0.8rem, 0.2em)`,
`vertical-align:baseline`, `margin-left:0.12em`) that I hadn't written —
evidence of a concurrent edit on the same file (shared-tree race, not user
action). Per "verified decisions" — I didn't discard it and redo from
scratch; I diffed it against the exact instruction and corrected the one
real deviation: `color` was `var(--color-brand-text)` (the darker,
contrast-adjusted text variant) instead of the instructed `var(--color-brand)`
(pure #FF3E00) — fixed that one property, left the rest (the `max(0.8rem, ...)`
floor is actually a better solution than my own draft would have been, since
it guards the unit from vanishing if the numeral's own font-size ever
changes independent of viewport).

Verified via headless screenshot + computed style, both breakpoints:
```
Desktop (1280px): title font-size 256px (--size-numeral at this viewport),
                   ::after font-size computed ~34px (0.2em), color rgb(255,62,0)
                   = #FF3E00 = --color-brand ✓, "GRAMS" renders solid orange
                   next to the outlined "249" — screenshot confirms legible,
                   unmistakable, subordinate (scratchpad/shots/hero-beat1.png)
Mobile (390px):    title font-size 96px (numeral floor — does not shrink to
                   the general mobile clamp; see judgment call below), ::after
                   font-size 19.2px = max(12.8px, 19.2px) → the 0.2em branch
                   wins here since the numeral floor (96px) is well above the
                   0.8rem trigger point, color still #FF3E00, stroke 0px
                   confirmed. Numeral itself renders fully solid black on
                   mobile too (screenshot: scratchpad/shots/hero-beat1-mobile.png)
                   — verified this is NOT a specificity bug: the mobile
                   query's `color:var(--color-ink)` wins the color tie
                   against the @supports block by source order (mobile query
                   is declared later in the file), and even though the
                   hero-specific @supports rule's higher-specificity
                   `-webkit-text-stroke:3px` technically still applies, a
                   same-color stroke on a same-color fill is visually
                   indistinguishable from pure solid — confirmed no visible
                   regression, left as-is rather than adding defensive CSS
                   for a difference that doesn't render.
```
Re-ran all 5 linters after this change — still all green (pasted above,
timestamp after this fix).

## MOBILE-SPEC 026-M — release blocker, resolved

Read `MOBILE-SPEC.md` in full before starting (per its own instruction), did
not re-diagnose from scratch — reproduced team-lead's numbers first
(`scratchpad/diagnose-mobile.mjs`, matched exactly: stageTop -666/-1088/-1201,
progress 0→0.5→1 healthy, no h-overflow, console clean) to confirm the
starting state before changing anything.

### Files changed
- `site/scrub-type.css` — M1 (real mobile pin, `svh` not `dvh`) + M6
  (reduced-motion keeps the scaffold's non-pinned variant), both as CSS
  overrides loaded after `scrub-section.css` — **did not touch
  `scrub-section.css`/`.js`**.
- `site/page.js` — full restructure into `mountAll()`/`unmountAll()` for M2
  (single frame tier chosen at mount from `matchMedia`) + M3 (remount on
  `matchMedia('(max-width:860px)').addEventListener('change')`, not
  `resize`) + M4 (mobile tour fully interactive: shared bottom-anchored
  panel, no more `aria-hidden`/`pointer-events:none` lockout, tap-to-lock
  works on mobile same as desktop).
- `site/anno.css` — M4 CSS: new `.anno-mobile-panel` (shared, stage-bottom
  anchored, full width minus margin), per-button `.anno__panel` hidden only
  under `max-width:860px` (desktop behavior unchanged).
- `site/index.html` — added `data-mobile-scrub-verified="true"` to `<html>`,
  only after every mobile gate below passed.

### M5 — trapped scroll: real finding, no code fix needed

Re-measured after M1 per the spec's own instruction ("nếu vẫn hụt..."). It
still showed short by ~300-430px across all 5 viewports at first
(`scratchpad/diagnose-mobile.mjs` re-run). Investigated before assuming M1
was incomplete or reaching for a height-layer patch:

1. `scrollTo({behavior:'instant'})` on the same page, same viewports →
   lands **exactly** on `scrollHeight - clientHeight` at all 5 (`y=13644 max=13644`, etc. — `scratchpad/debug-scroll-trap4.mjs`).
2. Default (smooth) `scrollTo()` with a **3s** settle wait instead of the
   diagnostic's original 600ms → also lands exactly on max, at all 5
   viewports, zero discrepancy.
3. Root cause: `page.css` sets `html { scroll-behavior: smooth; }` (site-
   wide, not mobile-specific, predates this spec). A programmatic
   `scrollTo()` over a ~13-16px-thousand distance takes real time to animate;
   reading `scrollY` before it settles reads an in-flight position and
   misreports it as "stuck". Native touch/wheel scrolling does not go
   through this code path (CSS `scroll-behavior` only affects scroll
   triggered by script/anchor/keyboard, not direct pointer input) — a real
   user's finger was never affected.

This is the same failure shape as the project's own documented precedent
(a report is a symptom, not a diagnosis — triage before you spec). No page
code was changed for M5; the fix was in my own §4 test harness: scroll-then-
poll-until-`scrollY`-stabilizes instead of a fixed short wait (see
`test-mobile-scrub.mjs`'s `scrollToBottomSettled()`). Verified honestly, not
asserted: pasted both the "before" (short) and "after" (exact) numbers above
rather than only reporting the passing run.

### §4 gate suite — `scratchpad/test-mobile-scrub.mjs`, real output

9 assertions × 3 scenes × 5 viewports (390×844, 430×932, 768×1024, 844×390,
1024×768, `hasTouch:true, isMobile:true`) + reduced-motion pass:

```
95 PASS, 0 FAIL
```

One assertion needed a second look before it passed clean: assertion #4
(reaches frame 0 and frame 1.0) failed once at 844×390 hero
(`start=0.0013`, threshold `<=0.001`). Investigated rather than loosened the
threshold: `scratchpad/debug-progress-edge.mjs` showed the section's true
top was a fractional `66.5px` (sub-pixel layout), `window.scrollTo` rounds
to an integer target, and rounding up (67) instead of down (66) put
`rect.top` at `-0.5` instead of `0.5` — a **sub-pixel scroll-rounding
artifact**, not a missed frame (confirmed the engine's own
`beatFrameIndex()` maps both values to the identical frame index 0; visually
and functionally indistinguishable). Fixed by making my own test round the
scroll target toward the section (`Math.floor`/`Math.ceil`) instead of using
the raw fractional value — this corrects a measurement artifact in the test,
it does not loosen the spec's `<=0.001`/`>=0.999` thresholds.

### M2/M3/M4 direct verification (beyond the §4 checklist)

`scratchpad/verify-m2-m3-m4.mjs`, real output:
```
PASS M2: mobile fetches only -lq/ tier (hq=0, lq>0 — confirmed via network trace)
PASS M3: no duplicate DOM after crossing UP (390→1280px)
PASS M3: no duplicate DOM after crossing DOWN (1280→390px)
PASS M3: no console errors across remounts
PASS M3: sr-only content preserved through remount
PASS M4: layer not aria-hidden on mobile
PASS M4: mobile panel active + populated with real point data
PASS M4: first point active is 01 Propeller
PASS M4: tap switches active point
PASS M4: tap LOCKS tour (no auto-advance after 6s)
PASS M4: panel anchored near stage bottom
PASS M4: panel spans full stage width (minus margin)
12 PASS, 0 FAIL
```
One methodology bug caught and fixed in this test itself: the first attempt
used `page.touchscreen.tap(x,y)` at computed coordinates, which silently
missed the target (no click registered); switched to Playwright's
`elementHandle.click()` for reliability. Verified the fix by re-running, not
by assuming.

### Desktop re-gate after all mobile work (marker added)

```
$ ui tenant-lint index.html     → TENANT-LINT: PASS
$ ui a11y-lint index.html       → 0 static findings
$ ui validate-layout index.html → 0 errors, 0 warnings
$ ui taste-lint index.html      → No taste violations found
$ ui content-lint index.html    → 0 findings
$ node scratchpad/verify-026.mjs → ALL PASS
```

## Unresolved questions

None.
