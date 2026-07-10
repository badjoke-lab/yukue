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
- E3 machine-readable public baseline completed and validated,
- F1 corpus expansion batches 01 through 10 completed and validated,
- F1 corpus-expansion gate completed with balanced Festival, Folk Performance, Organization, Occurrence, Change Event, Relation, and Evidence coverage,
- F2 Cloudflare Pages repository deployment baseline completed and validated,
- F2 About, Methodology, Data Access, public Status, Organization Browse, and Current State Browse surfaces completed and validated.

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

Immediate implementation order:

```text
1. Cloudflare Pages repository deployment baseline — completed
2. About, Methodology, Data Access, public Status, Organization Browse, and Current State Browse surfaces — completed
3. first Pages project deployment and reachable URL verification
4. canonical public origin decision and configuration
5. sitemap and search-index validation against the deployed origin
6. analytics baseline
```

The repository deployment baseline fixes the Matsuri Pages build contract at repository root with:

```text
Build command: pnpm build:matsuri:pages
Build output directory: apps/matsuri/dist
Node.js: 24
pnpm: 11.10.0
```

CI verifies that the generated Pages artifact contains the static HTML entry points, Pagefind runtime, machine-readable public JSON feeds, discovery text files, and sitemap. The actual Cloudflare account project deployment and resulting public URL are not yet completed and remain the next external deployment step.

The public reference and secondary browse layer now includes:

```text
/about/
/methodology/
/data/
/status/
/organizations/
/states/
/states/<state-code>/
```

These routes are generated as static HTML, included in the sitemap inventory, and enforced by the Pages artifact checker. Public Status counts are generated from the approved Public Projection. Organization and Current State browse rows are likewise projection-backed, and links are limited to published browse surfaces rather than invented detail routes.

F1 closed after ten validated expansion batches. Batch 01 and batch 02 broadened Festival, Folk Performance, Organization, Occurrence, Relation, Designation, and Evidence coverage. Batch 03 shifted emphasis toward occurrence and change-history depth, including cancelled, partially held, reduced-scale, and scheduled annual editions while keeping Current State separate from individual Occurrence outcomes. Batch 04 deepened existing D1 entities without adding new Entities, recording a schedule-rule change for 相馬野馬追 and a revival-completion Event plus return Occurrence for 鷹山. Batch 05 added a first-party documented long-hiatus revival case for 布橋灌頂会 and deepened 脚折雨乞 with a quadrennial Series, Recurrence Pattern, and 2028 scheduled Occurrence. Batch 06 added an official-source disaster-recovery lifecycle around 阿蘇神社 and 御田祭, keeping shrine damage and restoration Events separate from festival Current State and the 2026 scheduled Occurrence instead of inferring an unsupported festival cancellation. Batch 07 added 弘前ねぷたまつり as an explicit festival-level continuity sequence: cancelled 2020, cancelled 2021, held again in 2022, with suspension-start and suspension-end Events linked to the occurrence history. Batch 08 deepened Organization and Relation coverage around 弘前ねぷた300年祭 by separating the anniversary program, its execution committee, and the participant-group council, then representing organized-by, supported-by, and part-of-tradition relationships explicitly. Batch 09 deepened Folk Performance continuity with 大日堂舞楽 by recording historical suspension and restart Events without invented dates, four-community transmission, annual January 2 recurrence, a preservation-group Organization, a maintained-by Relation, and a performed-at Relation to a shrine context Entity. Batch 10 closed the remaining Folk Performance occurrence-history gap with a three-year YOSAKOIソーラン sequence: cancelled 2020, cancelled 2021, held again in 2022, linked to suspension-start and suspension-end Events while keeping Current State independent from historical Occurrence outcomes.

The machine-readable baseline generates:

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

The public rendering and discovery path is:

```text
reviewed canonical data
→ validation
→ approved Public Projection
→ Matsuri Home / Detail / Browse / Reference view models
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

Public Browse surfaces now include:

```text
/festivals/
/performances/
/organizations/
/regions/
/changes/
/states/
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

Complete F2 launch preparation without adding deferred product scope.

The launch gate requires:

```text
deployed public build
canonical origin configured and validated
sitemap validated against the canonical origin
search index checked on the deployed site
analytics baseline established
status page available — completed
methodology page available — completed
data access page available — completed
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
