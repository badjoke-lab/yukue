# Project Status

**Last updated:** 2026-07-10

## Current phase

```text
Execution Stage A — UI Foundation Implementation
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
- UI Foundation Specification merged.

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
= concrete implementation and PR order

project-status.md
= current position and next gate
```

## Current work

```text
PR 4 — Shared design tokens and layout primitives
```

Target scope:

- package-level token definitions,
- site accent injection,
- Mincho stack,
- shared containers,
- section primitive,
- rule system,
- base links and focus behavior,
- shared page-shell foundation.

## Next gates

After PR 4:

```text
PR 5 — Shared navigation and reference patterns
PR 6 — Shared history, relation, evidence, place, and image patterns
PR 7 — Matsuri Home H1 static implementation
PR 8 — Festival Detail C static implementation
PR 9 — UI review corrections and accessibility baseline
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
