# AGENTS.md

These instructions apply repository-wide unless a more specific nested `AGENTS.md` adds path-specific rules.

## Project

This repository contains the Yukue Series monorepo.

Current applications:

```text
apps/portal
apps/matsuri
apps/jinja
```

Shared packages:

```text
packages/observation-core
packages/schemas
packages/validation
packages/machine-readable
packages/search
packages/ui
```

The series design has four specialist sites:

```text
祭のゆくえ
神社のゆくえ
寺院のゆくえ
弔いのゆくえ
```

Matsuri is the active canonical public site. Jinja repository implementation is active, and an explicit owner-authorized, noncanonical, `noindex,nofollow` workers.dev public preview is permitted only under `config/jinja-preview-deployment-gate.json`. Jinja custom-domain activation, canonical publication, Search submission, and indexability remain blocked until the canonical start gate is satisfied. Jiin and Tomurai remain inactive; do not create their public apps, hostnames, Workers, or publication without explicit later gates.

## Required reading before work

Before modifying code or public data:

1. read `docs/README.md`,
2. read `docs/project-status.md`,
3. read `docs/development-schedule.md`,
4. read the governing specification documents for the task,
5. for corpus expansion, bulk ingestion, coverage metrics, future-site seeds, or specialist-site activation, read `docs/nationwide-corpus-scaling.md`,
6. read the nearest nested `AGENTS.md` for the path being changed.

Do not treat chat history as the implementation source of truth when repository documentation exists.

## Source-of-truth hierarchy

For implementation decisions, use this order:

```text
accepted repository specifications
accepted decision log
current project status
development schedule
code and tests
open PR discussion
```

When documents conflict, stop the conflict from spreading: identify the inconsistency and update the governing document in the same bounded change where practical.

## Public/private boundary

This is a public repository.

Do not commit:

- private candidate queues,
- internal confidence notes,
- unresolved private source-conflict notes,
- private reviewer commentary,
- private operational credentials,
- private monetization planning,
- secrets or tokens.

Approved public canonical data, public-safe methodology, public verification rules, and implementation specifications may be committed.

A private candidate and public Tier A are different states. A reviewed record that satisfies the Tier A minimum is intentionally public even if Tier B/C dimensions remain incomplete.

## Project invariants

Preserve these unless `decision-log.md` explicitly changes them:

```text
Japanese canonical record language
Basic Profile + Observation product model
Home H1 Search First Hybrid
Detail C Integrated Overview
white background
black/gray neutral system
one Mincho family system
site-specific accent palette
real images only
no placeholder images
static-first architecture
approved Public Projection boundary
national public breadth and record depth scale in parallel
Tier A is a valid public Index tier
Tier A targets Tier B in about seven days without a global overdue stop
Tier C history/monitoring deepens continuously
private candidates do not count as public coverage
future-site seeds are not automatically specialist-site Tier A records
```

Do not reintroduce as invariants:

```text
all thin source-backed records are non-public
completed Occurrence required for Tier A
Change Event required for Tier A
37 / 57 or 64.9% multi-year-history publication floor
a single overdue Tier A stops unrelated publication
valid Tier A auto-unpublishes after seven days
```

## Data-model invariants

Do not conflate:

- Entity State and one-year Occurrence outcome,
- Source and Evidence,
- Geographic Scope and Place,
- usual Recurrence and actual Occurrence history,
- Change Event and Current State.

A cancelled Occurrence does not automatically change Entity State.

`revived` is not a standard Current State value.

Do not introduce generic relations when a precise relation is supported.

For nationwide scaling, do not weaken Source/Evidence semantics to fit a bulk importer. Importers must adapt to the existing Source/Evidence, State/Occurrence, Place/scope, Relation, correction, and freshness contracts.

Tier A may omit unsupported Current State, organizer, Place, Relation, coordinates, Occurrence outcome, or history. Absence is preferable to inference.

## Nationwide scaling invariants

The governing Matsuri model is:

```text
Tier A  Public Index
  ↓ target: about 7 calendar days
Tier B  Public Verified
  ↓ continuous deepening
Tier C  Public History / Monitoring
```

For Tier A, require the reviewed identity/geography/authoritative-source/source-date/dedupe minimum defined in `docs/nationwide-corpus-scaling.md`.

For Tier B, require applicable evidence-backed verification dimensions without requiring multi-year history.

For Tier C, measure and deepen longitudinal history/monitoring.

Overdue Tier A is a work-priority signal, not a repository-wide stop condition. A valid Tier A record remains public if Tier B cannot yet be established safely.

## UI invariants

Do not drift toward:

- tourism portal styling,
- SaaS dashboard styling,
- pseudo-traditional decorative themes,
- large colored cards,
- excessive rounded surfaces,
- heavy shadow systems,
- placeholder or AI imagery.

Use repository UI documents as the reference:

```text
docs/information-architecture.md
docs/ui-direction.md
docs/design-tokens.md
docs/ui-foundation-spec.md
```

## Visual review discipline

For a non-trivial Matsuri UI, layout, typography, spacing, responsive, or shared-shell change:

1. read `docs/visual-review-workflow.md`,
2. run or trigger the dedicated full-page screenshot workflow,
3. inspect the desktop and mobile contact sheets,
4. inspect the top, middle, and bottom of every affected full-resolution PNG,
5. record the workflow run and artifact in the pull request,
6. record problems found, corrections made, intentional remaining limitations, and the post-fix recapture result.

A green browser/accessibility audit is not proof that the visual review is complete.

A green screenshot integrity audit is not human visual approval.

Do not claim UI closure from source inspection alone when rendered screenshot artifacts are available or required.

## Implementation discipline

Keep PRs bounded to the active schedule item.

Do not opportunistically add deferred infrastructure or features.

Before changing public behavior, identify the governing document.

Update documentation when changing:

- record structure,
- vocabularies,
- publication rules,
- IA,
- UI direction,
- evidence rules,
- image rules,
- machine-readable outputs,
- roadmap gates,
- active schedule sequence,
- corpus scaling rules,
- public tier minimums,
- coverage/depth metrics.
