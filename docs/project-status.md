# Project Status

**Last updated:** 2026-07-10

## Current phase

```text
Execution Stage F — Corpus Expansion and Launch Preparation
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
- D1 representative sample canonical data completed and validated,
- D2 Public Projection pipeline completed and validated,
- D3 Matsuri Home and Festival Detail integration with Public Projection completed and validated,
- E1 Projection-backed Browse surfaces for Festivals, Performances, Regions, and Changes completed and validated,
- E2 Pagefind full-text search and initial Entity Type, Prefecture, and Current State filters completed and validated,
- E3 machine-readable public baseline completed and validated.

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
F1 — Corpus expansion
```

Corpus expansion must increase coverage across:

```text
Festival records
Folk Performance records
Organization records
Occurrence history
Change Events
Relations
Evidence coverage
```

Do not maximize Entity count while leaving Occurrence, Change, Relation, or Evidence coverage weak.

The machine-readable baseline now generates:

```text
/version.json
/data/manifest.json
/data/entities.json
/data/events.json
/data/relations.json
/data/occurrences.json
/llms.txt
/ai.txt
/sitemap.xml
```

All baseline machine-readable files are generated from the same approved Public Projection used by public rendering and search. The manifest includes public record counts, version markers, data-safety markers, and the public file inventory.

Production sitemap origins are supplied through deployment configuration. Development builds use path-based sitemap locations until Launch Preparation establishes and validates the canonical public origin.

The public rendering and discovery path is now:

```text
reviewed canonical data
→ validation
→ approved Public Projection
→ Matsuri Home / Detail / Browse view models
→ Astro static HTML
→ Pagefind static search index
→ machine-readable public baseline
```

Search remains available at:

```text
/search/
```

with predictable URL state:

```text
q
type
prefecture
state
```

and initial filters:

```text
Entity Type
Prefecture
Current State
```

The first Browse surfaces remain:

```text
/festivals/
/performances/
/regions/
/changes/
```

D1 representative sample coverage remains:

```text
脚折雨乞
相馬野馬追
祇園祭 / 鷹山
早池峰神楽
佐陀神能
東栄町の花祭 / 布川地区花祭
```

Only reviewed public-safe canonical records belong in repository data. Unresolved private research notes and source conflicts remain outside the public data layer.

## Next gate

After F1:

```text
F2 — Launch preparation
```

Launch preparation covers:

```text
Cloudflare deployment
custom domain decision
canonical URL validation
sitemap validation
search indexing checks
analytics baseline
status page
methodology page
data access page
```

## Not yet committed to MVP

- Stats,
- Compare,
- dynamic API,
- MCP,
- paid API,
- x402 billing,
- D1 canonical database,
- real-time ingestion.
