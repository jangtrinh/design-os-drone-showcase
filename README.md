# OPAH ONE — a scroll-scrub product page built with Design:OS

A single-page product showcase driven by three scroll-scrubbed film sequences, an
interactive exploded-view annotation tour, and a design system compiled from a DTCG
token file. It exists to demonstrate the [Design:OS](https://github.com/jangtrinh/design-os)
toolchain end to end on real footage rather than on a fixture.

**Live:** https://jangtrinh.github.io/design-os-drone-showcase/

![Scroll-through demo of the OPAH ONE page: scroll-scrubbed drone film sequences, an exploded-view annotation tour, and token-compiled sections](docs/demo.gif)

*Full-quality recording: [docs/demo.mp4](docs/demo.mp4).*

---

## The product on this page is fictional

OPAH ONE is not a real drone. Every specification on the page — 249 g, 31 minutes of
flight, 4K 60, 10 km range, the part names in the exploded view — was written for this
demo. Do not cite any of it. The footage is AI-generated video (Gemini and Seedance,
via CapCut) produced by the author; the frame sequences are extracted from those clips.

What *is* real is everything about how the page is built: the frame pipeline, the token
compilation, the scroll engine, the accessibility contract, and the lint gates below.

## How it was built

Every step is a deterministic command. Re-running the pipeline on the same inputs
produces the same bytes.

| Step | Tool | What it does |
|---|---|---|
| Frames | `pipeline/extract-frames.sh` | Splits each clip into two WebP tiers — 1600 px to view, 480 px to paint instantly during a fast scroll. 343 frames total. |
| Colour | `ui color` | Derives the accent hue from the drone's own interior in the footage, then builds an 11-stop OKLCH scale with measured WCAG contrast at every stop. |
| Tokens | `ui tokens compile` | Compiles `design/tokens.json` (DTCG) to `site/tokens.css`. No colour, size, or spacing value is hand-written in the stylesheets. |
| Scroll engine | `ui tenant-scaffold` | Emits the embeddable scrub engine verbatim. It reads the host page through exactly one door — its own bounding box — and never touches window scroll, body height, or the document root. |
| Choreography | GSAP 3 + IntersectionObserver | Static sections only. The scrub scenes are owned by the engine and CSS; no property has two writers. |
| Gates | `ui tenant-lint`, `taste-lint`, `a11y-lint`, `validate-layout`, `content-lint` | The page does not ship with any of them red. |

### Reproduce it with DESIGN:OS

Every `ui` command in the table ships with [DESIGN:OS](https://github.com/jangtrinh/design-os).
Install the toolchain, wire it into your project, then describe the page you want in plain
words inside the agent CLI you already use (Claude Code, Codex CLI, or Antigravity):

```sh
git clone https://github.com/jangtrinh/design-os ease-design && cd ease-design
npm install && npm run build && npm link
cd ~/your-project
ui init --runtime claude       # or: codex / antigravity
```

```
/ui:generate a scroll-scrub product page for a cinematic drone — film-driven hero,
exploded-view annotation tour, specs compiled from DTCG tokens
```

Start from the
[60-second quickstart](https://github.com/jangtrinh/design-os/blob/main/QUICKSTART.md);
the same pipeline and gates that shipped this page run identically on your machine.

## Accessibility

- Annotation dots are real buttons with accessible names, ≥44 px hit targets, and
  `aria-expanded`. Focus reveals exactly what hover reveals.
- The auto-rotating tour pauses on hover and on focus, and stops permanently on
  activation (WCAG 2.2.2).
- `prefers-reduced-motion: reduce` disables every autonomous motion on the page — the
  tour, the ping, the dwell meter, the count-ups, and the parallax — with a global
  safety net plus per-component guards.
- The complete annotation text also exists as a plain list below the scene, so nothing
  lives only behind a hover.

## Run it locally

```bash
python3 -m http.server 4312 --bind 127.0.0.1 --directory site
```

Then open http://127.0.0.1:4312. There is no build step and no runtime dependency to
install — the fonts, icons, and GSAP are vendored into `site/`.

## Layout

```
site/           the deployed page — HTML, CSS, JS, frames, fonts, vendored GSAP
design/         tokens.json (DTCG source of truth)
pipeline/       extract-frames.sh
docs/           the art direction and the build spec
licenses/       third-party license texts
```

## Third-party

| What | Licence |
|---|---|
| [Be Vietnam Pro](https://github.com/bettergui/BeVietnamPro) | SIL Open Font License 1.1 — `licenses/BE-VIETNAM-PRO-OFL.txt` |
| [Phosphor Icons](https://github.com/phosphor-icons/core) | MIT — `licenses/PHOSPHOR-MIT.txt` |
| [GSAP](https://gsap.com) | GreenSock Standard License — **not** MIT. See https://gsap.com/standard-license. The licence header is preserved in the minified file. |

The page's own source is MIT (`LICENSE`). That covers this repository's code and copy,
not the third-party assets above and not the AI-generated footage.
