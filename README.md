# DESIGN:OS OPAH ONE Drone Showcase (`design-os-drone-showcase`)

**Reference hardware product showcase and scroll-scrub kinematic storytelling engine for the sub-249g OPAH ONE indoor cinewhoop drone.**

Demonstrates how DESIGN:OS combines 2:1 axonometric CAD callouts, scroll-coupled explosion kinematics, acoustic/thrust telemetry tables, and zero-dependency GitHub Pages engineering for physical hardware launches.

<p align="center">
  <img src="site/images/cover.png" alt="DESIGN:OS OPAH ONE Drone Showcase — 2:1 Axonometric Technical Architecture" width="840">
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-202020?style=flat-square&labelColor=202020&color=444444" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/Claude_Code_%C2%B7_Codex_%C2%B7_Gemini_%C2%B7_Antigravity-skill-202020?style=flat-square&labelColor=202020&color=444444" alt="Compatible agents">
  <a href="commands/doctor.md"><img src="https://img.shields.io/badge/diagnostics-%2Fdoctor-202020?style=flat-square&labelColor=202020&color=444444" alt="Doctor command"></a>
  <a href="https://jangtrinh.github.io/design-os-drone-showcase/"><img src="https://img.shields.io/badge/live_docs-GitHub_Pages-202020?style=flat-square&labelColor=202020&color=444444" alt="Live GitHub Pages"></a>
  <a href="https://buymeacoffee.com/jangtrinh"><img src="https://img.shields.io/badge/Buy_Me_a_Coffee-FFDD00?style=flat-square&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me a Coffee"></a>
</p>

<p align="center">
  <a href="#quickstart">Quickstart</a> · <a href="#what-it-makes">What it makes</a> · <a href="#installation">Install</a> · <a href="#how-it-works">How it works</a> · <a href="#commands--diagnostics">Commands</a> · <a href="#quality-bar--limitations">Limits</a>
</p>

---

## Why this exists

Hardware and industrial design teams often struggle to present physical engineering rigor on the web without bloated 50MB WebGL bundles that crash mobile browsers. **`design-os-drone-showcase`** proves how lightweight scroll-coupled kinematics, technical isometric diagrams, and structured specification tables deliver Apple-grade hardware storytelling.

| Dimension | Generic AI / Manual Workflow | DESIGN:OS OPAH ONE Drone Showcase (`DESIGN:OS`) |
| :--- | :--- | :--- |
| **Page Load & Mobile Perf** | 50MB unoptimized WebGL scenes that freeze mobile Safari | Instant-loading progressive assets and 60fps scroll-scrubbed kinematics |
| **Engineering Credibility** | Vague marketing adjectives with zero measurable specs | Exact mass budgets (249g), thrust-to-weight tables, and acoustic dB telemetry |
| **Visual Art Direction** | Inconsistent renders mixed with stock photos | Unified 2:1 axonometric technical line art and high-contrast studio callouts |
| **AI & Search Indexing** | Canvas-only text invisible to search crawlers and LLMs | Semantic HTML specification tables + `JSON-LD` + `llms.txt` |
| **Privacy & Telemetry** | Opaque cloud telemetry or unverified third-party APIs | **Zero telemetry** — 100% local execution ([`PRIVACY.md`](PRIVACY.md) audited) |

---

## Quickstart

### 1. Install the plugin or CLI

**In Claude Code:**

```text
/plugin marketplace add jangtrinh/design-os-drone-showcase
/plugin install design-os-drone-showcase@design-os-drone-showcase
```

**Or from your terminal (Codex, Gemini CLI, Antigravity, OpenCode, or standalone CLI):**

```bash
git clone https://github.com/jangtrinh/design-os-drone-showcase.git
cd design-os-drone-showcase
python3 scripts/self_check.py
```

### 2. Ask in plain English

Open your project in your AI coding agent and describe what you need:

> "Scaffold a hardware launch showcase page with scroll-scrubbed exploded assembly stages and BOM specification tables."

> "Generate 2:1 axonometric technical callout diagrams highlighting propulsion ducts, flight controller stack, and mass budget."

> "Verify our hardware product page against the DESIGN:OS 10-gate SEO, AEO, and GEO discovery harness."

### 3. Verify your setup

```bash
python3 scripts/self_check.py
```

---

## What it makes

Every deliverable produced by `design-os-drone-showcase` is backed by a deterministic verification gate rather than freehand AI guesswork.

<p align="center">
  <img src="site/images/cover.png" alt="DESIGN:OS OPAH ONE Drone Showcase Output Specimen" width="840"><br>
  <sub>Prompt: <code>"Scaffold a hardware launch showcase page with scroll-scrubbed exploded assembly stages and BOM specification tables."</code></sub>
</p>

| Deliverable / Mode | Best for | Output Format | Verification Gate |
| :--- | :--- | :--- | :--- |
| **Scroll-Scrub Hardware Stage** | Coupling scroll progress to exploded mechanical assembly callouts | `Zero-dependency HTML/CSS/JS` | `60fps scroll & reduced-motion fallback` |
| **Technical Spec & BOM Ledger** | Presenting mass, power, propulsion, and sensor tolerances clearly | `Semantic HTML + Markdown tables` | `100% unit consistency check` |
| **AEO/GEO Hardware Index** | Making hardware specs citable by AI answer engines and engineering buyers | `site/llms.txt + JSON-LD` | `10/10 SEO/AEO/GEO harness PASS` |

---

## Installation

Choose the setup that matches your AI coding agent. Every option installs the same canonical skill (`skills/design-os-drone-showcase/SKILL.md`) and `/doctor` diagnostic suite.

### Claude Code

Run these two commands inside Claude Code:

```text
/plugin marketplace add jangtrinh/design-os-drone-showcase
/plugin install design-os-drone-showcase@design-os-drone-showcase
```

### OpenAI Codex

Install to your personal Codex skills directory:

```bash
git clone https://github.com/jangtrinh/design-os-drone-showcase.git /tmp/design-os-drone-showcase
mkdir -p ~/.codex/skills/design-os-drone-showcase ~/.codex/prompts
cp -R /tmp/design-os-drone-showcase/skills/design-os-drone-showcase/* ~/.codex/skills/design-os-drone-showcase/
cp /tmp/design-os-drone-showcase/prompts/doctor.md ~/.codex/prompts/design-os-drone-showcase-doctor.md
rm -rf /tmp/design-os-drone-showcase
```

### Gemini CLI & Google Antigravity

```bash
git clone https://github.com/jangtrinh/design-os-drone-showcase.git /tmp/design-os-drone-showcase
mkdir -p ~/.gemini/skills/design-os-drone-showcase
cp -R /tmp/design-os-drone-showcase/skills/design-os-drone-showcase/* ~/.gemini/skills/design-os-drone-showcase/
rm -rf /tmp/design-os-drone-showcase
```

### OpenCode, Cursor, Windsurf & Other Agent Harnesses

```bash
git clone https://github.com/jangtrinh/design-os-drone-showcase.git /tmp/design-os-drone-showcase
mkdir -p ~/.agents/skills/design-os-drone-showcase
cp -R /tmp/design-os-drone-showcase/skills/design-os-drone-showcase/* ~/.agents/skills/design-os-drone-showcase/
rm -rf /tmp/design-os-drone-showcase
```

<details>
<summary>Verify or uninstall</summary>

**Verify installation:**

```bash
python3 scripts/self_check.py
```

Or run `/doctor` inside Claude Code / Codex to inspect installed skill paths, plugin manifests, and gate health.

**Uninstall:**

```bash
rm -rf ~/.claude/skills/design-os-drone-showcase ~/.codex/skills/design-os-drone-showcase ~/.gemini/skills/design-os-drone-showcase ~/.agents/skills/design-os-drone-showcase
```

</details>

---

## Usage & Prompt Cookbook

Once installed, `skills/design-os-drone-showcase/SKILL.md` activates automatically when your prompt matches its domain triggers. Browse [`docs/cookbook.md`](docs/cookbook.md) for copy-paste prompt recipes.

**Generate & Scaffold**

```text
"Scaffold a hardware launch showcase page with scroll-scrubbed exploded assembly stages and BOM specification tables."
```

**Audit & Verify**

```text
"Generate 2:1 axonometric technical callout diagrams highlighting propulsion ducts, flight controller stack, and mass budget."
```

**Export & Automate**

```text
"Verify our hardware product page against the DESIGN:OS 10-gate SEO, AEO, and GEO discovery harness."
```

---

## Commands & Diagnostics

| Command | Environment | What it does |
| :--- | :--- | :--- |
| `/doctor` | Claude Code / Codex | Read-only diagnostic check of installed skill paths, plugin manifests, and runtime prerequisites |
| `python3 scripts/self_check.py` | Terminal / CI | Deterministic offline verification of manifests, skill contracts, and governance files |
| `python3 scripts/self_check.py` | Terminal / CI | Verify hardware showcase assets, telemetry specification tables, and AI-Ready delivery gates |

---

## How it works

1. **Intent Routing** — Your AI agent matches your request against `skills/design-os-drone-showcase/SKILL.md` frontmatter triggers.
2. **Progressive Context Loading** — Only the entry-point `SKILL.md` router loads initially; detailed recipes and scripts load on demand.
3. **Deterministic Execution** — Domain scripts and contracts execute locally with reproducible inputs and outputs.
4. **Gate Verification** — `scripts/self_check.py` and domain verifiers (`python3 scripts/self_check.py`) validate the artifact before completion.
5. **Zero-Telemetry Delivery** — Verified files are written directly to your workspace with zero external network calls.

```text
User Prompt / CLI Invocation
            │
            ▼
┌───────────────────────────────────────────────┐
│ skills/design-os-drone-showcase/SKILL.md
│ Progressive disclosure router & hard rules    │
└───────────┬───────────────────────────────────┘
            │ loads on demand
            ▼
┌───────────────────────────────────────────────┐
│ python3 scripts/self_check.py
│ Deterministic build & contract enforcement    │
└───────────┬───────────────────────────────────┘
            │ verifies
            ▼
┌───────────────────────────────────────────────┐
│ python3 scripts/self_check.py + /doctor       │
│ Zero-telemetry local verification gate        │
└───────────────────────────────────────────────┘
```

### What loads when

`design-os-drone-showcase` uses progressive context disclosure so your agent's context window stays fast and focused:

| File | Loaded when |
| :--- | :--- |
| `skills/design-os-drone-showcase/SKILL.md` | Always (~100–150 lines) — routing rules, triggers, and execution workflow |
| `docs/cookbook.md` | When selecting multi-step prompt recipes or domain patterns |
| `commands/doctor.md` / `prompts/doctor.md` | Only when running `/doctor` diagnostics |
| `llms.txt` | When indexed by AI answer engines, RAG pipelines, or repo crawlers |

---

## File structure

```text
design-os-drone-showcase/
├── .claude-plugin/
│   ├── plugin.json                 # Claude Code plugin manifest
│   └── marketplace.json            # Claude Code marketplace catalog
├── .codex-plugin/
│   └── plugin.json                 # OpenAI Codex plugin & interface manifest
├── .agents/
│   └── plugins/marketplace.json    # Cross-agent local plugin registry
├── .factory-plugin/
│   ├── plugin.json                 # Factory / Droid plugin manifest
│   └── marketplace.json            # Factory marketplace metadata
├── skills/
│   └── design-os-drone-showcase/
│       └── SKILL.md                # Canonical agent skill entrypoint
├── commands/
│   └── doctor.md                   # /doctor diagnostic slash command
├── prompts/
│   └── doctor.md                   # Codex diagnostic prompt mirror
├── scripts/
│   └── self_check.py               # Deterministic repository & skill self-check
├── docs/
│   ├── cookbook.md                 # Copy-paste prompt recipes by job
│   └── llms.txt                    # GEO / LLM discovery index
├── PRIVACY.md                      # Zero-telemetry & local-first privacy commitment
├── SECURITY.md                     # Vulnerability disclosure & security policy
├── CONTRIBUTING.md                 # Contribution workflow & verification rules
├── CODE_OF_CONDUCT.md              # Contributor Covenant code of conduct
├── CHANGELOG.md                    # Release history
├── llms.txt                        # Root LLM indexing manifest
├── LICENSE                         # MIT License
└── README.md
```

---

## Quality bar & Limitations

### It's working if...

- `python3 scripts/self_check.py` prints `ok: design-os-drone-showcase self-check passed (design-os-drone-showcase)` and exits `0`.
- `python3 scripts/self_check.py` passes with zero contract or test regressions.
- Your AI coding agent loads `skills/design-os-drone-showcase/SKILL.md` automatically when given any prompt from [`docs/cookbook.md`](docs/cookbook.md).
- Network traffic during execution remains zero (guaranteed by [`PRIVACY.md`](PRIVACY.md)).

### When not to use

- Flight-controller C++/Rust firmware development or real-time MAVLink ground-control station software.
- Purely text-based API libraries with no physical or visual product storytelling surface.
- Automated PCB autorouting or aerodynamic CFD simulation.

---

## DESIGN:OS Ecosystem

`design-os-drone-showcase` is one of the 13 open-source engines in the **`DESIGN:OS`** ecosystem:

| Engine | Live Docs | Repository | Layer |
| :--- | :--- | :--- | :--- |
| **DESIGN:OS CLI** | [jangtrinh.github.io/design-os](https://jangtrinh.github.io/design-os/) | [`jangtrinh/design-os`](https://github.com/jangtrinh/design-os) | `cli` |
| **Knowledge Builder** | [jangtrinh.github.io/design-os-knowledge-builder](https://jangtrinh.github.io/design-os-knowledge-builder/) | [`jangtrinh/design-os-knowledge-builder`](https://github.com/jangtrinh/design-os-knowledge-builder) | `compiler` |
| **Figma Plugin & CLI** | [jangtrinh.github.io/design-os-figma-plugin](https://jangtrinh.github.io/design-os-figma-plugin/) | [`jangtrinh/design-os-figma-plugin`](https://github.com/jangtrinh/design-os-figma-plugin) | `plugin` |
| **SVG Animation Engine** | [jangtrinh.github.io/design-os-svg-animation](https://jangtrinh.github.io/design-os-svg-animation/) | [`jangtrinh/design-os-svg-animation`](https://github.com/jangtrinh/design-os-svg-animation) | `engine` |
| **3D Blender Agent** | [jangtrinh.github.io/design-os-3d-blender](https://jangtrinh.github.io/design-os-3d-blender/) | [`jangtrinh/design-os-3d-blender`](https://github.com/jangtrinh/design-os-3d-blender) | `3d / cad` |
| **OPAH ONE Drone** | [jangtrinh.github.io/design-os-drone-showcase](https://jangtrinh.github.io/design-os-drone-showcase/) | [`jangtrinh/design-os-drone-showcase`](https://github.com/jangtrinh/design-os-drone-showcase) | `hardware` |
| **GitHub Pages Engine** | [jangtrinh.github.io/design-os-github-page](https://jangtrinh.github.io/design-os-github-page/) | [`jangtrinh/design-os-github-page`](https://github.com/jangtrinh/design-os-github-page) | `pages` |
| **Apple Design OS** | [jangtrinh.github.io/design-os-apple](https://jangtrinh.github.io/design-os-apple/) | [`jangtrinh/design-os-apple`](https://github.com/jangtrinh/design-os-apple) | `swiftui` |
| **Agent Teacher** | [jangtrinh.github.io/design-os-pedagogy](https://jangtrinh.github.io/design-os-pedagogy/) | [`jangtrinh/design-os-pedagogy`](https://github.com/jangtrinh/design-os-pedagogy) | `pedagogy` |
| **Origami CAD** | [jangtrinh.github.io/design-os-origami](https://jangtrinh.github.io/design-os-origami/) | [`jangtrinh/design-os-origami`](https://github.com/jangtrinh/design-os-origami) | `packaging` |
| **Voice UX Architecture** | [jangtrinh.github.io/design-os-voice-ux](https://jangtrinh.github.io/design-os-voice-ux/) | [`jangtrinh/design-os-voice-ux`](https://github.com/jangtrinh/design-os-voice-ux) | `voice-ai` |
| **Code2Flow** | [jangtrinh.github.io/design-os-code2flow](https://jangtrinh.github.io/design-os-code2flow/) | [`jangtrinh/design-os-code2flow`](https://github.com/jangtrinh/design-os-code2flow) | `ast / audit` |
| **Generative UI** | [jangtrinh.github.io/design-os-generative-ui](https://jangtrinh.github.io/design-os-generative-ui/) | [`jangtrinh/design-os-generative-ui`](https://github.com/jangtrinh/design-os-generative-ui) | `runtime` |

---

## Contributing, Governance & License

- **Contributing**: See [`CONTRIBUTING.md`](CONTRIBUTING.md) for pull request guidelines and verification gates (`python3 scripts/self_check.py`).
- **Code of Conduct**: Governed by [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
- **Security & Privacy**: Zero telemetry — see [`SECURITY.md`](SECURITY.md) and [`PRIVACY.md`](PRIVACY.md).
- **Changelog & LLM Index**: Track releases in [`CHANGELOG.md`](CHANGELOG.md) and machine-readable index in [`llms.txt`](llms.txt).
- **License**: [MIT](LICENSE) © [Jang Trinh](https://github.com/jangtrinh).

---

If `design-os-drone-showcase` saves you time, a star on GitHub helps other engineers and AI agents find it.

<p align="left">
  <a href="https://buymeacoffee.com/jangtrinh">
    <img src="https://img.shields.io/badge/Buy_Me_a_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me a Coffee">
  </a>
</p>
