# Development Schedule

**Updated:** 2026-08-27

**Status:** Matsuri nationwide scaling active / Matsuri stabilization reviewing / Jinja repository implementation complete / Jinja workers.dev preview deployed / Jinja canonical activation still blocked

This project is gate-driven rather than deadline-driven. Work that is independently authorized proceeds in parallel; one maintenance or owner-access dependency must not freeze unrelated read-only, repository, review, or noncanonical-preview work.

## Current position

```text
Foundation through Stage E                completed
F1 corpus expansion                        completed
F2-01 through F2-28           completed
Phase 9 Launch Preparation                 completed
Phase 10 Stabilization                     active
Phase 10A Detail C repair     completed
Phase 10B Prefecture seed     completed 47 / 47
Phase 10C Maintenance         active
Phase 10D Nationwide scaling  active
NCS-01 through NCS-05                      completed
NCS-06                        active
Stabilization review          reviewing
Formal review complete        false
Actual Jinja start gate       blocked

JINJA-I01 specialist contract/state/order  completed
JINJA-I02 repository/local authorization   completed
JINJA-I03 Astro/shared-UI implementation   completed
JINJA-P01 workers.dev preview gate         completed
JINJA-P02 workers.dev deployment           completed
JINJA-P03 live visual parity audit         completed / green
JINJA-D01 reviewed Tier A expansion        active next lane
JINJA-D02 evidence-backed A→B deepening    active next lane
JINJA-D03 Event/Relation/history deepening active next lane
JINJA-C01 canonical/custom-domain gate     blocked on Matsuri stabilization

Jiin implementation/publication            not activated
Tomurai implementation/publication         not activated
```

## Parallel work model

The active lanes are:

```text
A. Matsuri nationwide A/B/C public corpus scaling
B. Matsuri correctness / freshness / historical maintenance
C. Jinja reviewed data expansion and evidence deepening
D. Jinja preview regression / visual parity maintenance
E. owner-private stabilization observations when owner access is available
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

Jinja now has three distinct activation stages. They must not be collapsed back into one all-or-nothing gate.

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

**Status: active next work**

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

Current prerequisite state:

```text
Matsuri F2-28 complete                  true
Portal/Jinja order decided             true
Jinja State specification approved     true
Explicit Jinja start authorization     true
Matsuri stabilization review complete  false
```

Only the later canonical/custom-domain activation remains blocked. Repository implementation and workers.dev preview are already separately authorized.

Do not activate until the machine gate changes:

```text
Jinja custom hostname/domain route
canonical publication
Search Console submission
indexability
```

## Owner-private stabilization observations

Cloudflare Web Analytics and Google Search Console observations remain owner-private operational inputs. When owner access is unavailable they remain pending and must not be inferred.

They block later canonical/custom-domain activation through the stabilization contract, but they do **not** block:

```text
Matsuri nationwide scaling
Matsuri maintenance
Jinja repository implementation
Jinja workers.dev preview
Jinja source research
Jinja reviewed data expansion
Jinja visual-parity regression work
```

## Jiin / Tomurai boundary

No Jinja work in this schedule activates:

```text
apps/jiin
apps/tomurai
Jiin Worker/hostname/publication
Tomurai Worker/hostname/publication
```

Their own specialist contracts and explicit activation decisions remain required.

## Immediate execution order

```text
1. keep #327 live visual-parity coverage green as Jinja UI changes
2. resolve Matsuri #326 from direct Evidence without outcome inference
3. prepare the next bounded Jinja Tier A reviewed batch from authoritative sources
4. deepen the current Jinja records toward Tier B where State/profile Evidence exists
5. add reviewed Event/Relation/history only where direct Evidence supports it
6. continue Matsuri national A/B/C publication and A→B verification in parallel
7. when owner-private stabilization observations are available, complete the stabilization review
8. only then reevaluate Jinja custom-domain/canonical activation
```
