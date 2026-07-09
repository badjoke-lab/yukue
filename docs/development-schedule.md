# Development Schedule

**Status:** Current implementation sequence

This document defines the active implementation order. It complements:

- `roadmap.md` — long-range phases and gates,
- `project-status.md` — current phase and next gate,
- this file — concrete implementation sequence and PR grouping.

The project is gate-driven rather than deadline-driven. Do not skip a gate merely to preserve a calendar date.

## Current position

Completed:

```text
PR 1  Monorepo foundation
PR 2  Project reference document set
PR 3  UI direction, design tokens, UI foundation specification
```

Active next work begins with shared UI implementation.

---

## Stage A — UI Foundation Implementation

### PR 4 — Shared design tokens and layout primitives

Scope:

```text
packages/ui token definitions
site accent system
Mincho font stack
container primitives
section primitive
rule system
base link and focus behavior
shared page shell foundations
```

Gate:

- build passes,
- no application-specific content leaks into generic shared primitives,
- Matsuri accent can be injected without hard-coding all future apps,
- keyboard focus is visible,
- mobile container behavior works.

### PR 5 — Shared navigation and reference patterns

Scope:

```text
header
footer
search form
observation snapshot
reference overview rows
occurrence table
action links
```

Gate:

- desktop and mobile shell render correctly,
- no dashboard-card visual drift,
- no large color surfaces,
- Mincho-only public typography direction preserved.

### PR 6 — Shared history, relation, evidence, place, and image patterns

Scope:

```text
change timeline
relation list
designation list
evidence/source apparatus
place list
map container and fallback structure
image primitive
gallery/lightbox foundation
```

Gate:

- image-zero state renders no image UI,
- map fallback link remains usable,
- evidence remains readable without color,
- lightbox baseline is keyboard accessible when activated.

---

## Stage B — Matsuri Static Surfaces

### PR 7 — Matsuri Home H1 static implementation

Use fixture data only.

Required structure:

```text
Hero + Search
Current Observation Snapshot
Recent Changes
Recent Occurrences
Explore
Methodology / Evidence
Data Access
```

Gate:

- desktop visual review,
- mobile visual review,
- white background / monochrome base / Matsuri indigo accent preserved,
- no placeholder images,
- section order matches accepted IA.

### PR 8 — Festival Detail C static implementation

Use a representative fixture such as 脚折雨乞.

Required structure:

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

Gate:

- overview remains readable at mobile width,
- map behavior does not misrepresent route-based subjects,
- Occurrence and State are visually distinct,
- Evidence links are reachable,
- zero-image detail remains visually complete.

### PR 9 — UI review corrections and accessibility baseline

Scope is bounded to changes found during review of PR 7 and PR 8.

Gate:

- keyboard navigation baseline,
- visible focus,
- semantic headings,
- table headers,
- sufficient contrast,
- responsive layout accepted.

---

## Stage C — Data Core

### PR 10 — Common schemas

Implement common record contracts from `public-data-model.md` and related internal design decisions that are safe for repository implementation.

Initial contracts:

```text
Entity
Place
State Snapshot
Change Event
Occurrence
Occurrence Series
Recurrence Pattern
Relation
Designation
Source
Evidence
Image Asset
```

Gate:

- schema validation tests pass,
- schema-version rules are represented,
- stable ID fields are separated from slug fields.

### PR 11 — Matsuri schema extensions and vocabularies

Scope:

```text
Festival profile
Folk Performance profile
Tradition Unit
Organization
Shrine seed
Temple seed
Matsuri State vocabularies
Matsuri Event vocabularies
Matsuri Occurrence vocabularies
Matsuri Relation vocabularies
```

Gate:

- vocabulary validation passes,
- `revived` is not introduced as a normal Current State,
- `active_modified` is not introduced,
- one cancelled Occurrence does not change State automatically.

### PR 12 — Cross-record validation

Scope:

```text
ID uniqueness
reference integrity
Relation endpoint integrity
Evidence target integrity
Place reference integrity
Current State derivation checks
image primary uniqueness
image rights gate
public projection safety checks
```

Gate: invalid fixture cases fail as expected and valid cases pass.

---

## Stage D — Sample Canonical Data and Projection

### PR 13 — Representative sample canonical data

Use a small set of structurally different subjects before large corpus expansion.

Candidate set:

```text
脚折雨乞
相馬野馬追
祇園祭 / 鷹山
早池峰神楽
佐陀神能
one additional multi-site or organization-heavy case
```

Gate:

- model differences are exercised,
- Source and Evidence targets are explicit,
- Place and route behavior are exercised,
- no unresolved review notes enter public data.

### PR 14 — Public Projection pipeline

Scope:

```text
approved canonical input
validation
projection
HTML-facing data
public JSON-facing data
projection leak checks
```

Gate:

- private/internal-only fields do not appear,
- current State is derived from approved State Snapshot,
- public records remain referentially consistent.

### PR 15 — Connect Matsuri Home and Detail to projection data

Replace fixture-only rendering with Public Projection consumption while preserving accepted UI behavior.

Gate:

- static pages match fixture-era visual expectations,
- no UI regressions,
- no duplicated manual page data.

---

## Stage E — Browse, Search, and Machine-readable Layer

### PR 16 — Browse surfaces

Scope:

```text
Festivals
Performances
Regions
Changes
```

Gate:

- accepted navigation paths work,
- browse labels use public-facing Japanese language,
- internal vocabulary codes are not exposed as primary labels.

### PR 17 — Search and initial filters

Initial filters:

```text
Entity Type
Prefecture
Current State
```

Gate:

- full-text search works,
- zero-result state is clear,
- filter URLs or state are predictable,
- accessibility baseline passes.

### PR 18 — Machine-readable baseline

Target outputs:

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

Gate:

- outputs generated from approved Public Projection,
- manifest counts agree with public data,
- no private fields leak,
- discovery files explain dataset limits.

---

## Stage F — Corpus Expansion and Launch Preparation

### Corpus expansion sequence

Expand gradually after the representative set passes:

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

### Launch preparation

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

---

## Documentation rule for every implementation PR

Before coding:

1. read root `AGENTS.md`,
2. read `docs/project-status.md`,
3. read this development schedule,
4. read the governing specifications for the affected area,
5. read the nearest nested `AGENTS.md` for the path being changed.

During review:

- update the governing document when public behavior changes,
- update `decision-log.md` when a project decision changes,
- update `project-status.md` when a gate or phase changes,
- update this file when the implementation sequence materially changes.

## Scope-control rule

Do not add D1 canonical storage, Cron monitoring, Queues, MCP, paid API, x402 billing, Stats, Compare, or other deferred scope merely because an implementation PR makes them convenient.

Deferred features require an explicit decision update first.
