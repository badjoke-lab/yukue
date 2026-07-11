# Project Status

**Last updated:** 2026-07-11

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
- baseline CI established,
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
- F2-01 Pages build and artifact contract completed,
- F2-02 public reference and secondary browse surfaces completed,
- F2-03 deployed and canonical verification tooling completed,
- F2-04 deployment verifier hardening completed,
- F2-05 analytics policy baseline completed,
- F2-06 schedule and status realignment completed.

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
F2-07 — Unified release verification command
```

The active F2 sequence is divided into:

```text
F2-01–F2-06  completed repository launch baselines and schedule alignment
F2-07–F2-15  repository-only launch readiness
F2-16–F2-28  external deployment and production verification
```

External deployment and production verification are under an operational hold. The hold does not block repository-only readiness work. Do not select F2-16 or later as active work until the hold is explicitly removed in the governing documents.

## F2 completed repository baselines

### F2-01 — Pages build and artifact contract

Repository build contract:

```text
Build command: pnpm build:matsuri:pages
Build output directory: apps/matsuri/dist
Node.js: 24
pnpm: 11.10.0
```

CI verifies that the generated artifact contains static HTML entry points, Pagefind runtime, machine-readable public JSON feeds, discovery text files, and sitemap output.

### F2-02 — Public reference and secondary browse surfaces

Implemented routes include:

```text
/about/
/methodology/
/data/
/status/
/organizations/
/states/
/states/<state-code>/
```

These routes derive public counts and browse rows from the approved Public Projection. Links are limited to published surfaces rather than invented detail routes.

### F2-03 and F2-04 — Deployment verification tooling

Repository commands:

```text
MATSURI_CHECK_ORIGIN=https://<deployment-host> pnpm check:matsuri:deployed
MATSURI_CHECK_ORIGIN=https://<canonical-origin> pnpm check:matsuri:canonical
```

The deployed check verifies public HTML routes, Pagefind assets, machine-readable feeds, discovery files, sitemap response status, Content-Type families, non-empty bodies, Matsuri markers, a representative Entity record, and a non-empty public Entity feed.

Canonical mode additionally requires:

```text
manifest.site_origin == checked origin
all sitemap <loc> values use the checked origin
```

These commands are prepared but cannot complete production verification without a reachable external deployment.

### F2-05 — Analytics policy baseline

The repository defines:

- bounded launch analytics questions,
- Cloudflare project-level activation,
- no analytics token or private dashboard export in the public repository,
- separation between HTTP deployment checks and account-level traffic verification.

Analytics activation remains an external production task and is therefore held with F2-25 through F2-27.

### F2-06 — Schedule and status realignment

The governing documents now define:

```text
F2-01–F2-06  completed repository baseline and schedule work
F2-07–F2-15  repository-only readiness before deployment
F2-16–F2-28  held external deployment and production work
```

No private operational reason is stored in the public repository. The external sequence remains documented in exact order and can resume only after an explicit governing-document update removes the hold.

## Immediate repository-only implementation order

```text
F2-07  unified release verification command — active
F2-08  static route and internal-link integrity
F2-09  HTML, JSON, Search, and sitemap consistency
F2-10  public data semantic audit
F2-11  Source and Evidence audit
F2-12  full responsive and accessibility audit
F2-13  public content, empty-state, and image-boundary audit
F2-14  release-candidate artifact freeze
F2-15  repository Launch Readiness Gate
```

The detailed scope and gate for every work package are defined in `docs/development-schedule.md`.

## External work under operational hold

```text
F2-16  create or connect the Cloudflare Pages project
F2-17  first Pages deployment and reachable URL acquisition
F2-18  deployed-origin smoke verification
F2-19  canonical public origin and domain decision
F2-20  configure MATSURI_PUBLIC_ORIGIN and redeploy
F2-21  canonical manifest and sitemap verification
F2-22  browser Pagefind Search verification
F2-23  robots, canonical, sitemap, and crawler-reachability review
F2-24  search-engine sitemap submission and indexability check
F2-25  enable Cloudflare Web Analytics
F2-26  deploy after analytics activation
F2-27  verify production traffic
F2-28  final F2 Launch Gate
```

No public deployment URL or canonical production origin is recorded yet. Development builds continue to use path-based sitemap locations when `MATSURI_PUBLIC_ORIGIN` is unset.

## Corpus status

F1 closed after ten validated expansion batches.

The launch corpus includes structurally different cases across:

- Festivals,
- Folk Performances,
- Tradition Units,
- Organizations,
- Shrine context seeds,
- Current State snapshots,
- held, cancelled, partially held, and scheduled Occurrences,
- suspension, return, revival, format, schedule, organization, designation, and disaster-recovery Change Events,
- precise organizer, preservation, ritual, venue, component, and tradition Relations,
- Source and Evidence records targeted to individual assertions.

Representative continuity cases include:

```text
脚折雨乞
相馬野馬追
祇園祭 / 鷹山
早池峰神楽
佐陀神能
東栄町の花祭 / 布川地区花祭
布橋灌頂会
弘前ねぷたまつり
大日堂舞楽
YOSAKOIソーラン演舞
```

Current State remains separate from annual Occurrence outcomes. Historical revival remains a Change Event rather than a normal Current State value.

## Machine-readable baseline

Generated public files:

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

All baseline files are generated from the same approved Public Projection used by public rendering and Search. The manifest includes public record counts, version markers, data-safety markers, and the public file inventory.

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

## Public Search and Browse

Search route:

```text
/search/
```

Predictable URL state:

```text
q
type
prefecture
state
```

Initial filters:

```text
Entity Type
Prefecture
Current State
```

Public Browse surfaces:

```text
/festivals/
/performances/
/organizations/
/regions/
/changes/
/states/
```

## Next gate

Complete F2-07 without adding deferred product scope.

F2-07 requires one documented repository release-verification contract covering:

```text
workspace build
workspace check
workspace typecheck
Matsuri Pages build
Pages artifact verification
deployed-verifier syntax verification
```

The command and CI must use or mirror the same checks. Missing launch-critical scripts must be reported rather than silently ignored.

After F2-07, the next implementation item is:

```text
F2-08 — Static route and internal-link integrity
```

The next major gate is F2-15 Repository Launch Readiness. The final F2 Launch Gate remains F2-28 and cannot be completed until the external operational hold is removed and production checks pass.

## Not yet committed to MVP

- Stats,
- Compare,
- dynamic API,
- MCP,
- paid API,
- x402 billing,
- D1 canonical database,
- real-time ingestion.
