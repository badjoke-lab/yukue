# Development Schedule

**Updated:** 2026-09-02

**Status:** Matsuri nationwide scaling active / Matsuri stabilization reviewing / Jinja repository implementation and workers.dev preview active / Jiin repository implementation and workers.dev preview active / Jinja and Jiin canonical activation still blocked

This project is gate-driven rather than deadline-driven. Work that is independently authorized proceeds in parallel; one maintenance or owner-access dependency must not freeze unrelated read-only, repository, review, data-expansion, or noncanonical-preview work.

## Current position

```text
Foundation through Stage E                completed
F1 corpus expansion                       completed
F2-01 through F2-28                       completed
Phase 9 Launch Preparation                completed
Phase 10 Stabilization                    active
Phase 10A Detail C repair                 completed
Phase 10B Prefecture seed                 completed 47 / 47
Phase 10C Maintenance                     active
Phase 10D Nationwide scaling              active
NCS-01 through NCS-05                     completed
NCS-06                                    active
Stabilization review                      reviewing
Formal review complete                    false

JINJA-I01 specialist contract/state/order completed
JINJA-I02 repository/local authorization  completed
JINJA-I03 Astro/shared-UI implementation  completed
JINJA-P01 workers.dev preview gate         completed
JINJA-P02 workers.dev deployment           completed
JINJA-P03 live visual parity audit         completed / green
JINJA-D01 reviewed Tier A expansion        active
JINJA-D02 evidence-backed A→B deepening    active
JINJA-D03 Event/Relation/history deepening active
JINJA-C01 canonical/custom-domain gate     blocked on Matsuri stabilization

JIIN-I01 specialist contract               completed
JIIN-I02 repository/local authorization    completed
JIIN-I03 Astro/shared-UI implementation    completed
JIIN-P01 workers.dev preview gate          completed
JIIN-P02 workers.dev deployment            completed
JIIN-D01 canonical/data foundation         active
JIIN-D02 reviewed Tier A identity expansion next lane
JIIN-D03 State/Event/Relation deepening     later evidence-backed lane
JIIN-C01 canonical/custom-domain gate      blocked / not authorized

Tomurai implementation/publication         not activated
```

## Parallel work model

The active lanes are:

```text
A. Matsuri nationwide A/B/C public corpus scaling
B. Matsuri correctness / freshness / historical maintenance
C. Jinja reviewed data expansion and evidence deepening
D. Jinja preview regression / visual parity maintenance
E. Jiin canonical data foundation and reviewed Tier A preparation
F. Jiin noncanonical preview regression maintenance
G. owner-private stabilization observations when owner access is available
```

A failure or pending item in one lane blocks another lane only when a governing machine contract explicitly says so.

## Matsuri lane

### Nationwide scaling

Governing specification:

```text
docs/nationwide-corpus-scaling.md
config/matsuri-corpus-quality-baseline.json
config/matsuri-repository-baseline.json
```

Current measured repository baseline from 2026-08-26:

```text
Public entities                         203
Specialist-primary subjects             140
Tier A — Public Index                   102
Tier B — Public Verified                  9
Tier C — Public History / Monitoring     29
Below Tier A                              0
Prefectures represented                  47
Municipalities represented              112
```

The next Matsuri corpus checkpoints remain larger public A/B/C coverage. Private candidate count is not public growth.

The Tier A → B target remains approximately seven calendar days, but overdue Tier A records do not globally block unrelated valid Tier A publication and are never auto-withdrawn solely for age.

### Freshness / maintenance

Current known maintenance case:

```text
#326 — 2026 新庄まつり closed-unresolved occurrence
```

The scheduled date range ended on 2026-08-26, but elapsed dates alone do not prove `held`, `cancelled`, or another outcome. Resolve only from direct/authoritative Evidence.

## Jinja lane

Jinja has distinct activation stages. They must not be collapsed back into one all-or-nothing gate.

### Stage 1 — repository/local implementation

**Status: completed / authorized**

Governing record:

```text
config/jinja-implementation-gate.json
```

Completed work includes:

```text
apps/jinja Astro workspace
@badjoke-lab/yukue-ui workspace imports
shared PageShell / SiteHeader / SiteFooter
Matsuri-style page hierarchy
home / shrine index / shrine detail
regions / changes / search
about / methodology / data / status
machine-readable preview JSON
no unsupported State/Event/Relation inference
```

PR #325 replaced the former Node HTML string builder with the shared Astro/Yukue architecture.

### Stage 2 — noncanonical workers.dev preview

**Status: completed / deployed / regression-maintained**

Governing record:

```text
config/jinja-preview-deployment-gate.json
```

Public preview:

```text
https://jinja-yukue.badjoke-lab.workers.dev/
```

Required boundary:

```text
workers.dev only
noncanonical
noindex,nofollow
no custom domain
no Search submission
```

The main deployment for PR #325 completed successfully in Actions run `33031665150`.

PR #327 added a live Chromium parity audit against the canonical Matsuri site. The final audit covered 20 paired device/route cases and reported zero failures.

This parity check remains a regression tool; CI green alone is not a visual-completion claim.

### Stage 3 — Jinja data expansion

**Status: active**

Proceed in bounded reviewed batches:

```text
JINJA-D01 — Tier A identity/geography/source expansion
JINJA-D02 — evidence-backed State/profile verification toward Tier B
JINJA-D03 — evidence-backed Event/Relation/history deepening toward Tier C
```

Rules:

```text
Matsuri Relations are research seeds only
specialist identity/dedupe review is mandatory
Jinja-acceptable authoritative Source is mandatory
unsupported fields remain absent
State is never inferred from an official URL or Matsuri state
Event/Relation/history is never invented for completeness
```

Tier A does not require State/Event/Relation/history. Those dimensions are added later only when Evidence supports them.

### Stage 4 — canonical/custom-domain activation

**Status: blocked**

Governing record:

```text
config/jinja-start-gate.json
config/matsuri-stabilization-review.json
```

Only canonical/custom-domain activation remains blocked. Repository implementation, workers.dev preview, and reviewed data expansion are separately authorized.

Do not activate until the machine gate changes:

```text
Jinja custom hostname/domain route
canonical publication
Search Console submission
indexability
```

## Jiin lane

Jiin repository implementation was explicitly activated and PR #363 was merged to `main` as `9fc9982cad40fb3dcc8efa744c12474650aa9a9d`.

### Stage 1 — repository/shared-UI implementation

**Status: completed / authorized**

Governing records:

```text
docs/jiin-specialist-contract.md
config/jiin-implementation-gate.json
```

Implemented surface:

```text
apps/jiin Astro workspace
@badjoke-lab/yukue-ui shared architecture
home / temples / regions / changes / search
about / methodology / data / status
robots.txt
Jiin series theme
```

The first hand-written visual Worker was removed. The review URL now deploys the built `apps/jiin` Astro application and shared Yukue UI directly.

### Stage 2 — noncanonical workers.dev preview

**Status: completed / deployed / regression-maintained**

Preview:

```text
https://jiin-yukue.badjoke-lab.workers.dev/
```

Required boundary:

```text
workers.dev only
noncanonical
noindex,nofollow
robots Disallow: /
no custom domain
no Search submission
```

The main deployment after PR #363 completed successfully and verified the public preview.

### Stage 3 — canonical data foundation and reviewed expansion

**Status: active**

Governing specification:

```text
docs/jiin-specialist-contract.md
docs/jiin-data-acquisition.md
apps/jiin/data/schema.json
apps/jiin/scripts/check-data.mjs
```

Execution order:

```text
JIIN-D01 — canonical schema/checker/projection and candidate review queue
JIIN-D02 — temple-specific authoritative Tier A identity expansion
JIIN-D03 — evidence-backed State/Event/Relation/history deepening
```

Rules:

```text
Matsuri/Jinja/cemetery/directory records are discovery seeds only
Jiin-specific authoritative identity Evidence is mandatory for Tier A
geography and entity-boundary/dedupe review are mandatory
State/sect/corporation/head-branch/facility relations are never inferred
cemetery/columbarium links remain facility-level and must not expose private burial/person data
```

The Jiin data model separates temples, organizations, facilities, external subjects, places, states, events, relations, evidence, and sources so non-temple subjects are not forced into the temple Entity collection.

### Stage 4 — canonical/custom-domain activation

**Status: blocked / not authorized**

Repository work, review-queue construction, Tier A research, canonical dataset construction, and the workers.dev preview may proceed independently.

Do not activate without a later explicit gate change:

```text
Jiin custom hostname/domain route
canonical/indexable publication
Search Console submission
```

## Owner-private stabilization observations

Cloudflare Web Analytics and Google Search Console observations remain owner-private operational inputs. When owner access is unavailable they remain pending and must not be inferred.

They block later canonical/custom-domain activation through the stabilization contract, but they do **not** block:

```text
Matsuri nationwide scaling
Matsuri maintenance
Jinja repository implementation or reviewed data expansion
Jinja workers.dev preview
Jiin repository implementation or reviewed data expansion
Jiin workers.dev preview
Jinja/Jiin source research and review-queue work
```

## Jiin / Tomurai boundary

Jiin is now active at repository, data-foundation, and noncanonical-preview stages. That does **not** authorize Jiin canonical/indexable publication.

Tomurai remains inactive. No Jiin work activates:

```text
apps/tomurai
Tomurai Worker/hostname/publication
```

Tomurai requires its own specialist contract checks and explicit activation decision.

## Immediate execution order

```text
1. keep Matsuri/Jinja/Jiin existing regression and correctness gates green
2. continue Matsuri national A/B/C publication and maintenance
3. continue reviewed Jinja Tier A expansion and evidence deepening
4. complete JIIN-D01 canonical data foundation and deterministic review queue
5. measure Jiin candidate count/geographic distribution from approved discovery seeds
6. add Jiin authority-source adapters for temple-specific identity verification
7. promote Jiin Tier A records only after identity/geography/dedupe gates pass
8. deepen Jiin State/Event/Relation only where direct Evidence supports it
9. when owner-private stabilization observations are available, complete the stabilization review
10. only then reevaluate later canonical/custom-domain activation gates
```
