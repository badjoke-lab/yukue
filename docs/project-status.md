# Project Status

**Last updated:** 2026-07-10

## Current phase

```text
Execution Stage B — Matsuri Static Surfaces
```

## Completed

- repository created,
- monorepo foundation merged,
- portal app skeleton created,
- Matsuri app skeleton created,
- shared package skeletons created,
- baseline CI green,
- initial data-model validation batches completed,
- repository project reference set merged,
- Home IA accepted: H1 Search First Hybrid,
- Detail IA accepted: C Integrated Overview,
- Basic Profile layer accepted,
- Place and map-ready model accepted,
- real-image-only policy accepted,
- visual direction accepted,
- Mincho-only typography direction accepted,
- four-site accent palette accepted,
- UI Direction document merged,
- Design Tokens baseline merged,
- UI Foundation Specification merged,
- A1 shared design tokens and layout primitives completed,
- A2 shared navigation and reference patterns completed,
- A3 shared history, relation, evidence, place, and image patterns completed,
- B1 Matsuri Home H1 static implementation completed.

## Current UI direction

```text
white background
black / gray neutral system
one Mincho family system
thin rules
controlled whitespace
minimal card chrome
minimal shadows
site-specific accent color
```

Palette:

```text
祭のゆくえ      #284B63
神社のゆくえ    #A33A32
寺院のゆくえ    #684B78
弔いのゆくえ    #486457
```

## Development governance

Implementation is repository-reference-driven.

Before work:

```text
root AGENTS.md
→ nearest nested AGENTS.md
→ docs/project-status.md
→ docs/development-schedule.md
→ governing specifications
```

Schedule layers:

```text
roadmap.md
= long-range phases and gates

development-schedule.md
= stable work-package sequence

project-status.md
= current position and next gate
```

## Current work

```text
B2 — Festival Detail C static implementation
```

Target structure:

```text
Identity
Primary Image [optional only]
Integrated Overview
About
Places & Map
Occurrence History
Change History
Relations
Gallery [optional only]
Designations
Evidence & Sources
Machine-readable Data
```

B2 uses fixture data and the accepted shared UI foundation. The fixture must preserve State versus Occurrence distinction, route-based Place behavior, evidence access, and zero-image completeness.

## Next gate

After B2:

```text
B3 — UI review corrections and accessibility baseline
```

Then proceed to Data Core, sample canonical data, Public Projection, browse/search, and the machine-readable baseline according to `development-schedule.md`.

## Not yet committed to MVP

- Stats,
- Compare,
- dynamic API,
- MCP,
- paid API,
- x402 billing,
- D1 canonical database,
- real-time ingestion.
