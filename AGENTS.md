# AGENTS.md

These instructions apply repository-wide unless a more specific nested `AGENTS.md` adds path-specific rules.

## Project

This repository contains the Yukue Series monorepo.

Initial applications:

```text
apps/portal
apps/matsuri
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

## Required reading before work

Before modifying code or public data:

1. read `docs/README.md`,
2. read `docs/project-status.md`,
3. read `docs/development-schedule.md`,
4. read the governing specification documents for the task,
5. read the nearest nested `AGENTS.md` for the path being changed.

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
- active schedule sequence.

## Required validation

At minimum, run the repository checks relevant to the change.

Baseline commands:

```bash
pnpm install --no-frozen-lockfile
pnpm build
pnpm check
pnpm typecheck
```

Some workspaces may not yet implement every script. Do not fake success; report exactly which commands exist and which passed.

Add focused tests when implementing schemas, validation, projections, or behavior with regression risk.

## PR rules

A PR should state:

- governing docs consulted,
- scope included,
- scope intentionally excluded,
- validation run,
- known limitations,
- documentation updated when needed.

A non-trivial UI PR should additionally state:

- screenshot workflow run,
- screenshot artifact name,
- desktop routes reviewed,
- mobile routes reviewed,
- visual findings,
- post-fix recapture result.

Do not merge before required CI is green.

Use squash merge for normal bounded implementation PRs unless repository policy changes.

## Status updates

When a project gate is completed, update `docs/project-status.md`.

When implementation order materially changes, update `docs/development-schedule.md`.

When a project decision changes, update `docs/decision-log.md`.

## Scope currently deferred

Do not add without an explicit decision:

```text
Stats
Compare
D1 canonical database
Cron monitoring
Queues
MCP
paid API
x402 billing
real-time ingestion
complex graph visualization
```
