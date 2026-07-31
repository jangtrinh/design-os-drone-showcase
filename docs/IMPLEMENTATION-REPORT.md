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

## Unresolved questions

None blocking. Open item: confirm with team-lead whether their "A–F not on disk" read was a stale cache/different checkout, so it doesn't recur on the next check.
