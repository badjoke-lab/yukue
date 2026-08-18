# Project Status

**Last updated:** 2026-08-18

## Current phase

```text
Phase 10 — Matsuri Public Corpus Expansion, Nationwide Scaling, and Stabilization
```

## Current gate state

```text
F2-15 — Repository Launch Readiness Gate — completed
F2-M01 — Full-page screenshot visual-review workflow — completed
F2-M02 — Matsuri data freshness audit — completed
F2-16 through F2-27 — completed
F2-28 — final F2 Launch Gate — completed
F2-P01 through F2-P13 — completed
Phase 9 Launch Preparation — completed
Phase 10 Stabilization — active
Matsuri Detail C implementation — completed
Matsuri prefecture seed baseline — completed 47 / 47
Matsuri nationwide public corpus scaling — active
NCS-01 governing docs — completed
NCS-02 A/B/C classifier/baseline — completed
NCS-03 national source inventory — completed
NCS-04 candidate + Tier A importer / identity-dedupe pipeline — completed
NCS-05 bulk dry run + Tier A publication-readiness audit — next
Matsuri maintenance / historical depth — active in parallel
Matsuri stabilization review — reviewing / incomplete
Actual Jinja start gate — blocked
future specialist-site implementation — not activated
```

## Current sources of truth

```text
Nationwide scaling contract     docs/nationwide-corpus-scaling.md
Development schedule            docs/development-schedule.md
Corpus quality baseline         config/matsuri-corpus-quality-baseline.json
Corpus quality interpretation   docs/matsuri-corpus-quality-baseline.md
National source inventory       config/matsuri-national-source-inventory.json
Source inventory interpretation docs/matsuri-national-source-inventory.md
Tier A importer contract        config/matsuri-tier-a-importer-contract.json
Tier A importer interpretation  docs/matsuri-tier-a-importer.md
Current repository counts       config/matsuri-repository-baseline.json
Current production baseline     config/matsuri-production-baseline.json
Analytics progression           config/matsuri-analytics-activation.json
Final F2 launch gate            config/matsuri-f2-launch-gate.json
Stabilization review            config/matsuri-stabilization-review.json
Stabilization review contract   docs/matsuri-stabilization-review.md
Detail C implementation         docs/matsuri-detail-c-implementation.md
Jinja start boundary            config/jinja-start-gate.json
Production topology             docs/deployment-topology.md
```

## Corrected coverage interpretation

The existing corpus has reviewed primary presence in all 47 prefectures, but this is only a geographic seed baseline.

Current specialist-primary public corpus:

```text
Festival             49
Folk Performance      8
Total                 57
```

The project must not treat those 57 as the practical endpoint while candidate records accumulate privately.

National scaling requires useful **public** A/B/C growth from dozens to hundreds and then thousands where the authoritative-source inventory supports it.

## Public A/B/C model

```text
Tier A  Public Index
  ↓ target: about 7 calendar days
Tier B  Public Verified
  ↓ continuous deepening
Tier C  Public History / Monitoring
```

### Tier A — Public Index

Tier A is intentionally public.

A source-backed record may publish at Tier A once its reviewed identity, subject type, geography, authoritative source, source verification/access date, and identity/duplicate check satisfy the governing contract.

Tier A does **not** require completed Occurrence history, Change Events, multi-year history, Current State, organizer, Place, Relation, or coordinates before publication.

Unsupported fields remain absent. They are not filled by inference.

### Tier A → B target

A newly published Tier A record is targeted for Tier B verification in about seven calendar days.

This target:

- prioritizes due and overdue Tier A work;
- does not stop unrelated valid Tier A publication;
- does not auto-withdraw a valid Tier A after seven days;
- never permits unsupported facts merely to meet the target.

If Evidence is insufficient, the record remains public as Tier A with missing dimensions reported while research continues.

### Tier B — Public Verified

Tier B adds substantive reviewed profile/current-observation dimensions, including evidence-backed Current State and other applicable Place/timing/organizer/Relation/profile Evidence plus a dated observation anchor.

Multi-year history is not required.

### Tier C — Public History / Monitoring

Tier C adds longitudinal depth and/or active monitoring, including multiple-year Occurrences, cancellation/postponement/partial-held/revival history, meaningful Change Events, governance/venue changes, freshness monitoring, or richer supported Relation history.

## NCS-02 completed baseline

NCS-02 was merged by PR #270 at main commit `031b5de385330d9ef1eb3db728a8b11a3d04807c`.

Exact measured baseline:

```text
Specialist primary subjects                  57
Tier A — Public Index                        19
Tier B — Public Verified                      8
Tier C — Public History / Monitoring         30
Below Tier A                                  0
Public specialist-primary total              57
Prefectures represented                      47
Municipality scopes represented              55
```

Existing historical depth remains descriptive only:

```text
Completed Occurrence history                52 / 57
Multi-year completed Occurrence history     37 / 57
Evidence-backed Change Events               57 / 57
Current State Evidence                      56 / 57
Direct profile Evidence                     39 / 57
```

The 37 / 57 value is **not** a publication quota or release floor for new Tier A/B records.

Among the current 19 Tier A records, the main A→B gap is direct profile Evidence for 18 records. One record also lacks approved Current State/State Evidence/timing-recurrence coverage.

The legacy records do not carry authentic Tier A publication timestamps, so their A→B age is reported as metadata-missing rather than guessed.

## NCS-03 completed source inventory

NCS-03 defines the source-family contract NCS-04 and later acquisition work must consume.

Machine and human sources of truth:

```text
config/matsuri-national-source-inventory.json
docs/matsuri-national-source-inventory.md
```

Current inventory:

```text
source families                     11
prefecture control set              47 / 47
national DB current CSV ceiling     2,000 records per export
future-site activation              false
bulk public release authorization   false
```

Source roles are explicit:

```text
direct Tier A identity
conditional Tier A identity
discovery-only / resolve-first
supporting-only
```

The inventory records Agency for Cultural Affairs scale references of 8,255 locally designated intangible folk cultural properties as of 2025-05-01 and 342 nationally designated Important Intangible Folk Cultural Properties as of 2026-08-01. These are source-universe scale references, not counts of Japanese festivals and not corpus targets.

Cultural Heritage Online and Japan Search remain discovery/source-resolution layers. The importer must resolve the underlying authoritative provider before Tier A readiness.

Authority and reuse permission remain separate. The national cultural-property database text-use rule is recorded separately from image-rights restrictions, and publisher-specific rights remain publisher-specific.

## NCS-04 completed importer

NCS-04 was merged by PR #273 at main commit `0047a7853c45c561e14c7119e05c9556cd4ca5ad`.

Sources of truth:

```text
config/matsuri-tier-a-importer-contract.json
docs/matsuri-tier-a-importer.md
scripts/lib/matsuri-tier-a-importer.mjs
scripts/import-matsuri-tier-a-candidates.mjs
scripts/check-matsuri-tier-a-importer.mjs
```

The importer is readiness-only. It:

```text
consumes the NCS-03 source-family registry
resolves discovery-only sources before Tier A readiness
requires reviewed source role / source access metadata
normalizes identity and geography without inventing facts
checks existing-public, same-batch, and provider-record identity conflicts
emits explicit blocked_input / blocked_source / blocked_identity results
keeps unsupported Tier B/C dimensions out of Tier A drafts
rejects candidate-supplied tier_a_published_at
writes no canonical public data
publishes no Tier A records
assigns no canonical ID or public slug
```

Synthetic contract coverage verifies direct, conditional, resolved-discovery, unresolved-source, duplicate, provider-conflict, broader-scope, supporting-only, and forbidden-publication-time cases.

NCS-04 completion does not count as public corpus growth. NCS-05 must now exercise the importer against a bounded real-source acquisition sample without committing a real candidate queue.

## Rejected obsolete rules

The following rules are not part of the current contract:

```text
Tier A-equivalent thin records must all remain private
completed Occurrence required for first public publication
Change Event required for first public publication
completed Occurrence + Change Event both required
37 / 57 or 64.9% multi-year-history release floor
overdue Tier A globally blocks the next publication wave
valid Tier A is automatically unpublished after seven days
public growth may remain around 57 while private candidates accumulate
```

## Nationwide scaling track

Governing issue:

```text
#267 — Scale Matsuri nationwide with public A/B/C corpus tiers
```

```text
NCS-01  governing specification and schedule alignment — completed
NCS-02  A/B/C classifier + current-corpus baseline — completed
NCS-03  national authoritative-source inventory — completed
NCS-04  deterministic candidate + Tier A importer / identity-dedupe pipeline — completed
NCS-05  bulk dry run + Tier A publication-readiness audit — next
NCS-06  first bounded Tier A public wave + continuous A→B promotion
NCS-07  cumulative 500 public primary Matsuri records
NCS-08  cumulative 1,000 public primary Matsuri records
NCS-09  source-inventory-derived national target + continued A→B→C expansion
```

NCS-05 is not public expansion by itself. NCS-06 must actually add reviewed public Tier A records.

500 and 1,000 are public A/B/C specialist-primary checkpoints, not private candidate counts.

## Matsuri maintenance remains active

Existing correctness and freshness work continues in parallel:

```text
pnpm audit:matsuri:freshness
pnpm audit:matsuri:relations
pnpm check:matsuri:evidence
pnpm check:matsuri:bundle-inventory
pnpm check:matsuri:detail-navigation
pnpm check:matsuri:stabilization-review
```

The exact-head audit on 2026-08-18 detected five closed-unresolved 2026 Occurrences plus one stale Current State. These remain fail-closed until direct Evidence supports a change. Elapsed dates, event-page persistence, ticket sales, or absence of a cancellation notice do not justify `held`.

Those maintenance cases do not change the national scaling rule and do not create an A/B/C global stop.

## Stabilization review

```text
Started               2026-07-27
Minimum duration      14 days
Earliest review       2026-08-10
Current status        reviewing
Review eligible       true
Formal review complete false
```

Current owner-private observations still required by the existing stabilization contract remain separate from NCS repository work.

## Future-site boundary

The project has four specialist sites in its series design:

```text
祭のゆくえ
神社のゆくえ
寺院のゆくえ
弔いのゆくえ
```

Only Matsuri is currently activated for implementation/publication work.

Jinja, Jiin, and Tomurai remain separately gated. Matsuri Shrine/Temple relation seeds do not automatically become public Tier A records on future specialist sites; each site must satisfy its own Tier A identity/source contract first.

```text
Matsuri F2-28 complete                 true
Matsuri stabilization review          false
Portal/Jinja implementation order     false
Jinja State specification approved    false
Explicit start authorization          false
Actual Jinja start gate                blocked
```

Do not activate future-site hostname, Worker, public implementation, or specialist-site publication from this Matsuri NCS work.

## Immediate next actions

```text
1. run NCS-05 bounded real-source acquisition / importer dry run outside the public candidate queue
2. audit source-resolution success, Tier A-ready count, blocked-source/input/identity reasons, geography, source-family distribution, provider-ID conflicts, partition completeness, and rights/reuse handling
3. store only public-safe aggregate/audit output in the repository; do not commit the real candidate queue
4. fix importer or source-quality defects exposed by NCS-05 without inventing identity, geography, State, Occurrence, organizer, Place, Relation, or coordinates
5. keep tier_a_published_at absent/null throughout NCS-05
6. after NCS-05 passes, run NCS-06 and actually publish a bounded reviewed Tier A wave
7. start the real A→B seven-day target from each NCS-06 publication timestamp
8. advance toward 500 then 1,000 public primary records while B→C deepening continues
9. maintain due Occurrences and stale State independently without inference
```
