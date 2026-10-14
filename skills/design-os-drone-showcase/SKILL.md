---
name: design-os-drone-showcase
description: "Use when working with DESIGN:OS OPAH ONE Drone Showcase — Reference hardware product showcase and scroll-scrub kinematic storytelling engine for the sub-249g OPAH ONE indoor cinewhoop drone."
---

# DESIGN:OS OPAH ONE Drone Showcase (`design-os-drone-showcase`)

Demonstrates how DESIGN:OS combines 2:1 axonometric CAD callouts, scroll-coupled explosion kinematics, acoustic/thrust telemetry tables, and zero-dependency GitHub Pages engineering for physical hardware launches.

## When to Use

Activate this skill when the user asks to:
- `"Scaffold a hardware launch showcase page with scroll-scrubbed exploded assembly stages and BOM specification tables."`
- `"Generate 2:1 axonometric technical callout diagrams highlighting propulsion ducts, flight controller stack, and mass budget."`
- `"Verify our hardware product page against the DESIGN:OS 10-gate SEO, AEO, and GEO discovery harness."`

## Progressive Disclosure Routing (`What loads when`)

1. **Always Loaded**: `skills/design-os-drone-showcase/SKILL.md` (this router — keeps context lean).
2. **On Demand — Prompt Recipes**: Load `docs/cookbook.md` when selecting multi-step workflows or copy-paste prompt templates.
3. **On Demand — Diagnostics**: Load `commands/doctor.md` or run `python3 scripts/self_check.py` when verifying installation or troubleshooting.
4. **On Demand — Ecosystem Discovery**: Load `llms.txt` when cross-referencing companion `DESIGN:OS` engines.

## Core Execution Workflow

1. **Inspect Context**: Read the target repository or workspace constraints before mutating files.
2. **Execute Deterministically**: Run `python3 scripts/self_check.py` or `python3 scripts/self_check.py` rather than guessing outputs freehand.
3. **Verify Quality Gates**: Run `python3 scripts/self_check.py` and confirm zero errors before reporting completion.

## Quality Bar & Anti-Scope

### It's working if...
- `python3 scripts/self_check.py` exits `0`.
- Outputs match the `DESIGN:OS` 2:1 axonometric B&W art direction and deterministic verification gates.
- Execution remains 100% local with zero external telemetry (`PRIVACY.md`).

### When NOT to use
- Flight-controller C++/Rust firmware development or real-time MAVLink ground-control station software.
- Purely text-based API libraries with no physical or visual product storytelling surface.
- Automated PCB autorouting or aerodynamic CFD simulation.
