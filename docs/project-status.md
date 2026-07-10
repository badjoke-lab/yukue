# Project Status

**Last updated:** 2026-07-10

## Current phase

```text
Execution Stage D — Sample Canonical Data and Projection
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
- B1 Matsuri Home H1 static implementation completed,
- B2 Festival Detail C static implementation completed,
- B3 UI review corrections and accessibility baseline completed,
- C1 common schema contracts completed,
- C2 Matsuri schema extensions and vocabularies completed,
- C3 cross-record validation completed,
- D1 representative sample canonical data completed and validated.

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
D2 — Public Projection pipeline
```

D1 representative sample coverage is now fixed as:

```text
脚折雨乞
相馬野馬追
祇園祭 / 鷹山
早池峰神楽
佐陀神能
東栄町の花祭 / 布川地区花祭
```

The D1 batch exercises route-based Place behavior, multi-area festivals, umbrella/component identity, collective Folk Performance identity, Occurrence and Occurrence Series records, Recurrence Patterns, Change Events, Relations, Designations, Sources, and targeted Evidence.

D2 must introduce an explicit projection boundary:

```text
approved canonical input
→ validation
→ Public Projection
→ HTML-facing data + public JSON-facing data
→ projection leak check
```

Only reviewed public-safe canonical records belong in repository data. Unresolved private research notes and source conflicts remain outside the public data layer.

## Next gates

After D2:

```text
D3 — Connect Matsuri Home and Detail to projection data
```

Then proceed through the remaining work packages in `development-schedule.md`.

## Not yet committed to MVP

- Stats,
- Compare,
- dynamic API,
- MCP,
- paid API,
- x402 billing,
- D1 canonical database,
- real-time ingestion.
