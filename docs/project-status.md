# Project Status

**Last updated:** 2026-08-27

**Matsuri canonical public origin:** https://matsuri-yukue.badjoke-lab.com

**Jinja noncanonical preview origin:** https://jinja-yukue.badjoke-lab.workers.dev

## Current phase

```text
Phase 10 — Matsuri Public Corpus Expansion, Nationwide Scaling, and Stabilization
Jinja — repository implementation + noncanonical workers.dev preview active in parallel
```

## Current gate state

```text
F2-16 through F2-27 — completed
F2-28 — final F2 Launch Gate — completed
Phase 10 Stabilization — active
Matsuri Detail C implementation — completed
Matsuri prefecture seed baseline — completed 47 / 47
Matsuri nationwide public corpus scaling — active
NCS-06 first bounded Tier A public wave + A→B promotion — active
Matsuri maintenance / historical depth — active in parallel
Matsuri stabilization review — reviewing / incomplete

Jinja repository/local implementation — authorized and implemented
Jinja workers.dev preview — authorized and deployed
Jinja live visual parity audit — completed / green
Actual Jinja start gate — blocked
Jinja custom domain — blocked
Jinja canonical publication — blocked
Jinja Search submission / indexability — blocked

Jiin implementation/publication — not activated
Tomurai implementation/publication — not activated
```

`Actual Jinja start gate — blocked` refers to the later **canonical/custom-domain activation gate**. It does not block the separately authorized repository implementation or noncanonical `workers.dev` preview.

## Current sources of truth

```text
Series / project status                 docs/project-status.md
Development schedule                    docs/development-schedule.md
Nationwide scaling contract             docs/nationwide-corpus-scaling.md
Current Matsuri repository baseline     config/matsuri-repository-baseline.json
Current Matsuri quality baseline        config/matsuri-corpus-quality-baseline.json
Matsuri stabilization                   config/matsuri-stabilization-review.json
Jinja canonical start gate              config/jinja-start-gate.json
Jinja implementation gate               config/jinja-implementation-gate.json
Jinja preview deployment gate           config/jinja-preview-deployment-gate.json
Jinja activation work plan              docs/jinja-start-plan.md
Jinja specialist contract               docs/jinja-specialist-contract.md
Shared four-site UI implementation      packages/ui
Matsuri reference implementation        apps/matsuri
Jinja preview implementation            apps/jinja
```

When narrative documentation and a newer machine gate differ, the newer machine gate plus its validator governs. Narrative docs must then be synchronized rather than used to re-impose an obsolete block.

## Matsuri current measured baseline

The current repository baseline is dated 2026-08-26:

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

These are current repository measurements, not a claim of national completeness. Tier A is intentionally public once its identity/source minimum is met; unsupported Tier B/C dimensions remain absent rather than inferred.

Matsuri nationwide scaling continues toward larger public A/B/C coverage. A difficult or overdue Tier A record does not globally block unrelated valid publication.

## Matsuri stabilization review

The stabilization machine record remains in `reviewing` state. These exact observations remain current and are retained here because repository validators treat them as explicit public-safe status markers:

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Current status        reviewing
Review eligible       true
Formal review complete false
Known unresolved critical corrections   0
Production deployment failures           1
Manual maintenance burden                acceptable
Cloudflare Web Analytics traffic receipt pending
Search Console observation               pending
```

The current source of truth is `config/matsuri-stabilization-review.json`. Owner-private Analytics and Search Console observations remain pending; they are never inferred or fabricated.

## Matsuri freshness maintenance

The 2026-08-27 freshness audit identifies one closed-unresolved occurrence:

```text
occ-shinjo-matsuri-2026-schedule
新庄まつり
scheduled range: 2026-08-24 through 2026-08-26
recorded outcome: scheduled
tracking issue: #326
```

This is a Matsuri maintenance case, not a Jinja regression. Elapsed dates alone do not justify changing the result to `held`, `cancelled`, or another outcome. Direct/authoritative Evidence is required.

## Jinja current state

Jinja now uses the same Astro/shared-UI architecture as Matsuri rather than a separate HTML string builder.

Current implementation boundary:

```text
apps/jinja exists                         true
Astro application                         true
@badjoke-lab/yukue-ui workspace usage     true
workers.dev Worker                        jinja-yukue
workers.dev preview                       deployed
preview robots                            noindex,nofollow
custom domain                             false
canonical                                 false
indexable                                 false
Search submission                         false
```

PR #325 rebuilt Jinja on the Matsuri/Yukue shared architecture and merged as `aafec2e8a790cce3f0346fac6e7f21e299f011ed`.

The deployment workflow then successfully built, deployed, and externally verified the public preview in Actions run `33031665150`.

PR #327 added reproducible live Chromium parity checks and merged as `8e5eecbc51729c55e66f5f8ef31012eb501dcda7`. The final audit checked 20 paired route/device combinations across Matsuri and Jinja and reported `failures=0`.

Representative audited page families:

```text
home
index
entity detail
regions
changes
search
about
methodology
data
status
```

Devices:

```text
desktop 1440 × 900
mobile   390 × 844
```

The audit checks real public URLs, shared shell, body/background/font contract, container width, header/footer/navigation, horizontal overflow, and Jinja detail-page Evidence / PlaceMap / Changes / Relations / Record Updates / machine-readable sections.

## Jinja data boundary

The current preview corpus is intentionally evidence-limited. Missing State, Event, Relation, history, deity, corporate/administrative relationship, or other specialist fields are not inferred from a shrine name, address, official URL, Matsuri Relation, or elapsed time.

Jinja work may continue in three parallel lanes while canonical activation remains blocked:

```text
1. reviewed Tier A identity/geography/source expansion
2. evidence-backed Tier A → B profile/current-state deepening
3. evidence-backed Event / Relation / history deepening toward Tier C
```

Every promotion remains Jinja-specific. Matsuri shrine Relations may seed research but never auto-promote a Jinja public record.

## Canonical/custom-domain boundary

Current machine gates record:

```text
Matsuri F2-28 complete                  true
Portal/Jinja order decided             true
Jinja State specification approved     true
Explicit Jinja start authorization     true
Matsuri stabilization review complete  false
```

Therefore repository implementation and the `workers.dev` preview are authorized, but the later canonical start gate remains blocked by the incomplete Matsuri stabilization prerequisite.

Until that changes, do not activate:

```text
jinja-yukue.badjoke-lab.com or another custom-domain route
canonical publication claim
Search Console submission
indexability
```

Owner-private Cloudflare Web Analytics and Google Search Console observations remain pending where owner access is unavailable. They are not inferred or fabricated.

## Four-site boundary

The series remains exactly:

```text
1. 祭のゆくえ
2. 神社のゆくえ
3. 寺院のゆくえ
4. 弔いのゆくえ
```

Jinja preview activation does not activate Jiin or Tomurai.

## Immediate next actions

```text
1. keep the live Jinja/Matsuri visual-parity audit as a regression check
2. resolve Matsuri freshness issue #326 only from direct Evidence
3. expand Jinja reviewed Tier A records in bounded batches from authoritative sources
4. deepen current Jinja records with evidence-backed State/profile fields where supportable
5. add reviewed Event / Relation / history only when direct Evidence supports them
6. continue Matsuri nationwide A/B/C scaling independently
7. when owner-private stabilization observations become available, complete Matsuri stabilization and reevaluate the Jinja canonical/custom-domain gate
```
