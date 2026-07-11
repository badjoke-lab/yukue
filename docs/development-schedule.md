# Development Schedule

**Status:** Current implementation sequence

This document defines the active implementation order. It complements:

- `roadmap.md` — long-range phases and gates,
- `project-status.md` — current position and next gate,
- this file — concrete implementation sequence and bounded work packages.

The project is gate-driven rather than deadline-driven. Do not skip a gate merely to preserve a calendar date.

GitHub PR numbers are not used as permanent schedule identifiers because documentation, governance, or corrective PRs may consume numbers. Stable work-package IDs are used instead.

## Current position

Completed implementation stages:

```text
Foundation 1  Monorepo foundation
Foundation 2  Project reference document set
Foundation 3  UI direction, design tokens, UI foundation specification
Governance    Development schedule and AGENTS hierarchy
Stage A       UI foundation implementation
Stage B       Matsuri static surfaces
Stage C       Data core
Stage D       Sample canonical data and Public Projection
Stage E       Browse, Search, and machine-readable baseline
Stage F1      Initial corpus expansion
F2-01–F2-05  Repository launch baselines
```

Active work:

```text
F2-06 — Schedule and status realignment
```

External deployment work is under an operational hold. Continue repository-only F2 readiness work through F2-15. Do not select F2-16 or later as active work until the hold is explicitly removed in the governing documents.

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

Status: **Completed through validated batches 01–10.**

### F2 — Launch preparation

F2 is split into three ordered blocks:

```text
A. completed repository launch baselines
B. repository-only launch readiness work
C. external deployment and production verification
```

External deployment being unavailable does not stop block B. Block C remains on operational hold until the governing documents explicitly reactivate it.

#### Block A — Completed repository launch baselines

##### F2-01 — Pages build and artifact contract

Status: **Completed**

Scope:

- repository-root Matsuri Pages build command,
- static output directory contract,
- Node.js and pnpm version pins,
- generated artifact verification in CI.

##### F2-02 — Public reference and secondary browse surfaces

Status: **Completed**

Scope:

- About,
- Methodology,
- Data Access,
- public Status,
- Organization Browse,
- Current State Browse.

##### F2-03 — Deployed and canonical verification tooling

Status: **Completed**

Scope:

- deployed-origin HTTP verifier,
- canonical-origin strict mode,
- public route and machine-readable response checks,
- manifest and sitemap origin checks.

##### F2-04 — Deployment verifier hardening

Status: **Completed**

Scope:

- representative Entity feed assertion,
- Search page Pagefind asset assertion,
- sitemap structure assertion,
- stale or incomplete deployment detection.

##### F2-05 — Analytics policy baseline

Status: **Completed**

Scope:

- bounded analytics purpose,
- Cloudflare project-level activation model,
- privacy and repository boundary,
- account-level verification gate.

#### Block B — Repository-only launch readiness

##### F2-06 — Schedule and status realignment

Status: **Active**

Scope:

- expand F2 into stable work-package IDs,
- separate repository-only work from external deployment work,
- record the operational hold without exposing private operational details,
- align `development-schedule.md`, `project-status.md`, `roadmap.md`, `deployment.md`, and `decision-log.md`.

Gate:

- all schedule documents identify F2-06 as current,
- F2-07 through F2-15 are ordered before external deployment,
- F2-16 through F2-28 are explicitly held,
- no deferred product feature is promoted into MVP scope.

##### F2-07 — Unified release verification command

Scope:

```text
workspace build
workspace check
workspace typecheck
Matsuri Pages build
Pages artifact verification
deployed-verifier syntax verification
```

Gate:

- one documented repository command runs the complete release-candidate verification set,
- CI uses or mirrors the same contract,
- missing scripts are reported rather than silently ignored where launch assurance requires them.

##### F2-08 — Static route and internal-link integrity

Scope:

- require every published Home, Browse, Reference, Search, and Detail route,
- detect broken internal links,
- prevent links to unpublished Shrine or Temple detail routes,
- compare generated route inventory with sitemap inventory.

Gate:

- generated internal links resolve within the static artifact,
- no invented detail route is linked,
- sitemap path inventory matches publishable routes.

##### F2-09 — HTML, JSON, Search, and sitemap consistency

Scope:

- compare public record counts,
- compare Current State presentation across HTML and JSON,
- verify Pagefind records derive only from Public Projection,
- verify manifest inventory and counts,
- prevent placeholder production origins when canonical origin is unset.

Gate:

- HTML, machine-readable output, Search, manifest, and sitemap agree on the reviewed public dataset,
- no internal field or unpublished record appears in public discovery output.

##### F2-10 — Public data semantic audit

Scope:

- State versus Occurrence separation,
- Change Event versus Occurrence separation,
- revival modeling,
- Relation endpoint correctness,
- Designation separation,
- duplicate-identity review,
- scheduled versus historical occurrence treatment.

Gate:

- all F1 batches pass the semantic review checklist,
- no unsupported State transition or identity duplication remains in the launch corpus.

##### F2-11 — Source and Evidence audit

Scope:

- Current State freshness,
- Evidence target specificity,
- Relation evidence coverage,
- Occurrence outcome and date evidence,
- source metadata quality,
- long-term State conclusions not relying on weak evidence alone.

Gate:

- every launch-critical assertion has appropriate public Evidence,
- unsupported or conflicted material remains outside Public Projection.

##### F2-12 — Full responsive and accessibility audit

Scope:

- all public surfaces at desktop and mobile widths,
- keyboard navigation,
- heading and landmark structure,
- table semantics,
- focus visibility,
- text alternatives and non-color status communication,
- map and lightbox fallback behavior where applicable.

Gate:

- the accessibility baseline applies to all launch surfaces, not only the original Home and representative Detail fixtures,
- blocking defects are corrected before release-candidate freeze.

##### F2-13 — Public content, empty-state, and image-boundary audit

Scope:

- Methodology and implementation alignment,
- Data Access inventory accuracy,
- Status wording accuracy,
- honest empty states,
- zero-image behavior,
- image-rights gate,
- route-based and distributed map representation,
- external-link labeling.

Gate:

- no public page claims an inactive capability is active,
- no placeholder or unapproved image enters the artifact,
- empty and sparse datasets remain intentional and readable.

##### F2-14 — Release-candidate artifact freeze

Scope:

- generate the exact static release candidate,
- record route inventory,
- record public record counts,
- record machine-readable file inventory,
- record checks and known external-only verification limits.

Gate:

- a reproducible release-candidate artifact passes F2-07 through F2-13,
- remaining checks are exclusively external deployment or production checks.

##### F2-15 — Repository Launch Readiness Gate

Required state:

```text
build green
check green
typecheck green
static routes complete
internal links valid
Public Projection safe
HTML / JSON / Search consistent
Source / Evidence audit passed
responsive review passed
accessibility review passed
image rights boundary passed
release artifact verified
```

Gate:

- repository-side launch preparation is complete,
- continued work is limited to approved data freshness corrections until external deployment resumes,
- do not invent additional prelaunch product scope merely because external deployment remains held.

#### Block C — External deployment and production verification

Status for F2-16 through F2-28: **Operational hold**

These items must remain in order and must not become active until the hold is explicitly removed.

##### F2-16 — Create or connect the Cloudflare Pages project

##### F2-17 — First Pages deployment and reachable URL acquisition

##### F2-18 — Deployed-origin smoke verification

Run the deployed verifier against the first reachable deployment URL.

##### F2-19 — Canonical public origin and domain decision

##### F2-20 — Configure `MATSURI_PUBLIC_ORIGIN` and redeploy

##### F2-21 — Canonical manifest and sitemap verification

##### F2-22 — Browser Pagefind Search verification on production

##### F2-23 — Robots, canonical, sitemap, and crawler-reachability review

##### F2-24 — Search-engine sitemap submission and indexability check

##### F2-25 — Enable Cloudflare Web Analytics

##### F2-26 — Deploy after analytics activation

##### F2-27 — Verify production traffic in the private analytics dashboard

##### F2-28 — Final F2 Launch Gate

Required state:

```text
deployed public build reachable
canonical origin configured and validated
sitemap validated against canonical origin
browser Search verified
crawler and indexability checks completed
Web Analytics enabled
production traffic observed
public Status wording updated to the verified state
```

After F2-28, advance to stabilization rather than adding deferred MVP scope.

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
