# Development Schedule

**Status:** Current implementation sequence

This document defines the active implementation order. It complements:

- `roadmap.md` — long-range phases and gates,
- `project-status.md` — current position and next gate,
- this file — concrete implementation sequence and bounded work packages.

The project is gate-driven rather than deadline-driven. Do not skip a gate merely to preserve a calendar date.

GitHub PR numbers are not used as permanent schedule identifiers because documentation, governance, or corrective PRs may consume numbers. Stable work-package IDs are used instead.

## Current position

Completed foundation work:

```text
Foundation 1  Monorepo foundation
Foundation 2  Project reference document set
Foundation 3  UI direction, design tokens, UI foundation specification
Governance    Development schedule and AGENTS hierarchy
```

Active next work begins with Stage A.

---

## Stage A — UI Foundation Implementation

### A1 — Shared design tokens and layout primitives

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

### A2 — Shared navigation and reference patterns

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

### A3 — Shared history, relation, evidence, place, and image patterns

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

### B1 — Matsuri Home H1 static implementation

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

### B2 — Festival Detail C static implementation

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

### B3 — UI review corrections and accessibility baseline

Scope is bounded to changes found during review of B1 and B2.

Gate:

- keyboard navigation baseline,
- visible focus,
- semantic headings,
- table headers,
- sufficient contrast,
- responsive layout accepted.

---

## Stage C — Data Core

### C1 — Common schemas

Implement common record contracts from `public-data-model.md` and related accepted design decisions.

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

### C2 — Matsuri schema extensions and vocabularies

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

### C3 — Cross-record validation

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

### D1 — Representative sample canonical data

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

### D2 — Public Projection pipeline

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
- Current State is derived from approved State Snapshot,
- public records remain referentially consistent.

### D3 — Connect Matsuri Home and Detail to projection data

Replace fixture-only rendering with Public Projection consumption while preserving accepted UI behavior.

Gate:

- static pages match fixture-era visual expectations,
- no UI regressions,
- no duplicated manual page data.

---

## Stage E — Browse, Search, and Machine-readable Layer

### E1 — Browse surfaces

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

### E2 — Search and initial filters

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

### E3 — Machine-readable baseline

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

### F1 — Corpus expansion

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

### F2 — Launch preparation

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
2. read the nearest nested `AGENTS.md` for the path being changed,
3. read `docs/project-status.md`,
4. read this development schedule,
5. read the governing specifications for the affected area.

During review:

- update the governing document when public behavior changes,
- update `decision-log.md` when a project decision changes,
- update `project-status.md` when a gate or phase changes,
- update this file when the implementation sequence materially changes.

## Scope-control rule

Do not add D1 canonical storage, Cron monitoring, Queues, MCP, paid API, x402 billing, Stats, Compare, or other deferred scope merely because an implementation change makes them convenient.

Deferred features require an explicit decision update first.
