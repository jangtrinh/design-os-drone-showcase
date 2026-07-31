# Art direction — OPAH ONE

The direction this page was built to. Written before the rebuild, after a first version
passed every lint gate and still read as, in the owner's words, a soulless shell.

## Why green gates produced a shell

The persona was applied as a *negative* checklist — no radius, no shadow, flat colour
field, tokens everywhere — and negation cannot produce identity. Three concrete absences:

1. **No spine.** Eleven correct templates in a row is grammar without a sentence.
2. **No signature device.** A page built from design DNA alone reads competent-but-anonymous:
   every axis correct, nothing that stops the eye.
3. **The type range never peaked.** Extreme contrast was declared, then applied evenly —
   a dynamic range nobody plays is a flat range.

Lints measure floors. None of those three is a floor.

## The spine

**The engineering dossier that performs itself.** What a viewer describes afterwards:
*a giant technical drawing where the drone takes itself apart as you scroll.*

This fuses the two products into one claim. The drone's promise — 38 parts, none spare,
each with exactly one place it fits — and the toolchain's promise — not one pixel here is
accidental — are the same promise: precision you prove by taking the thing apart in public.

So the page is built as a technical drawing. The white studio film is the drawing sheet.
Uppercase labels are dimension callouts. The section numbers are the dossier's clause
numbers. The annotation layer is the instrument that measures the drawing. The dark block
at the end is the title block, where the sheet is signed.

## Two signature devices, pinned

**Hero — viewport-scaled display type, fired exactly once.** The numeral **249** spans the
sheet edge to edge over the circling drone, outlined so the footage reads through the
letterforms, with the unit solid beside it. One move carries three obligations: the number
*is* the layout, it is the product's whole argument, and it puts real evidence in the hero.

**Anatomy — the square-ping callout grammar.** A brand square, a mono label, a flat ink
panel. It lives only in the exploded-view scene, as the dossier's instrument layer.

Everything else is forbidden from being loud. No echo type, no marquee, no sticker tilt,
no blend-difference nav. The orange claim band's entire loudness budget is *colour*; the
modes scene's is *repetition*.

## Rhythm

Long quiet build → slam → read → measure → long interactive centrepiece → exhale → fast
chant → flat rest → tonal drop → quiet close.

The spec table is deliberately the flattest moment on the page: a rest is only a rest if
something refuses to perform.

The three scrub scenes are three different **relationships between film and type** — that,
not different footage, is what stops them reading as one trick three times:

| Scene | Relationship |
|---|---|
| Hero | film leads — type absent until it arrives once, at the peak |
| Anatomy | film + instrument layer — the only interactive scene on the page |
| Modes | type leads — the mode word is the subject, the flight footage is backdrop |

## Type

The true maximum lands in exactly one place: the 249 numeral, at a token used once on the
page — which makes the rule greppable. Everything steps down from there: display for
film-scene titles only, head for the claim line and section heads, and the uppercase label
register as the counter-voice everywhere.

## Motion as one system

**The drafting reveal** — every element enters the way a drawing is inked: unmasked from
behind a hairline edge, along a single axis. The line-masks on static headings, the
clip-path lift on scrub titles, and the annotation layer's rise are three expressions of
one gesture, not three effects.

One easing curve, `cubic-bezier(0.16, 1, 0.3, 1)`. Three durations, no others: 180 ms for
state feedback, 560 ms for element reveals, 900 ms reserved for display-scale type.

Ownership is partitioned so no property ever has two writers: GSAP owns the static
sections, the scroll engine and CSS own the scrub scenes, and the page script owns the
annotation tour.

## The annotation tour

The owner asked for glowing dots with hover detail on a five-second rotation. That was
honoured by **translation, not transplantation**.

"Glow" became a **hairline square ping** — a 1px outline expanding and fading from the
active dot. On a white studio ground a full-saturation brand square is already the most
luminous thing on the page; blur would only dirty the one thing the film gives for free.
Light arrives as motion instead.

The "dark popover" became a **flat ink panel** with no radius, no shadow, and no tail —
carrying the part name, one spec line, an index, and a dwell meter that fills across the
five seconds. It holds no image (the film frame under the dot *is* the image) and no
button (there is no destination, and inventing one would invent a product fact).

The tour is a **map with a moving spotlight**: all six dots stay visible because the frame
is an exploded diagram and hiding dots hides the map. The dots are numbered in
left-to-right order so that number, tour order, and spatial order are one system — and the
text list below the scene is ordered to match.

## Later owner overrides

Recorded so they are not mistaken for drift:

- Copy is English, cut roughly in half; film scenes carry a title and nothing else.
- Titles are centred over the frame with parallax, not anchored to a bottom rule.
- Titles are outline type, with mandatory solid fallbacks on small screens, under
  `prefers-contrast: more`, and where `text-stroke` is unsupported.
- The page's hairline rules were removed; separation is whitespace and weight. The spec
  table keeps its row separators, which are functional rather than decorative.
- One typeface, three weights.
- Icons appear on every row of any list that uses them — coverage is all-or-nothing.
- Every outbound link and CTA points at the toolchain. The pre-order email form was
  deleted outright: a fake signup collecting a real address was the one genuinely
  dishonest element on the page.
