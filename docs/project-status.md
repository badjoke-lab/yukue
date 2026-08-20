# Project Status

**Last updated:** 2026-08-20

**Matsuri canonical public origin:** https://matsuri-yukue.badjoke-lab.com

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
NCS-05 bulk dry run + Tier A publication-readiness audit — completed
NCS-06 first bounded Tier A public wave + A→B promotion — active; wave 001 merged + production verified; next bounded public waves active
Matsuri maintenance / historical depth — active in parallel
Matsuri stabilization review — reviewing / incomplete
Actual Jinja start gate — blocked
future specialist-site implementation — not activated
```

## Current sources of truth

```text
Nationwide scaling contract             docs/nationwide-corpus-scaling.md
Development schedule                    docs/development-schedule.md
Corpus quality baseline                 config/matsuri-corpus-quality-baseline.json
Corpus quality interpretation           docs/matsuri-corpus-quality-baseline.md
National source inventory               config/matsuri-national-source-inventory.json
Source inventory interpretation         docs/matsuri-national-source-inventory.md
Tier A importer contract                config/matsuri-tier-a-importer-contract.json
Tier A importer interpretation          docs/matsuri-tier-a-importer.md
Tier A publication-readiness contract   config/matsuri-tier-a-publication-readiness-contract.json
NCS-05 real-source aggregate            config/matsuri-tier-a-dry-run-baseline.json
NCS-05 interpretation                   docs/matsuri-tier-a-dry-run.md
NCS-06 wave 001                         config/matsuri-tier-a-publication-wave-001.json
NCS-06 production verification          config/matsuri-tier-a-production-wave-001-verification.json
Current repository counts               config/matsuri-repository-baseline.json
Legacy production baseline snapshot     config/matsuri-production-baseline.json
Analytics progression                   config/matsuri-analytics-activation.json
Final F2 launch gate                    config/matsuri-f2-launch-gate.json
Stabilization review                    config/matsuri-stabilization-review.json
Stabilization review contract           docs/matsuri-stabilization-review.md
Detail C implementation                 docs/matsuri-detail-c-implementation.md
Jinja start boundary                    config/jinja-start-gate.json
Production topology                     docs/deployment-topology.md
```

## Corrected coverage interpretation

The corpus has reviewed primary presence in all 47 prefectures, but this is only a geographic seed baseline.

Current canonical-production specialist-primary corpus after NCS-06 wave 001:

```text
Festival             50
Folk Performance     10
Total                 60

Tier A — Public Index                        22
Tier B — Public Verified                      8
Tier C — Public History / Monitoring         30
Below Tier A                                  0
```

The project must not treat those 60 as the practical endpoint while candidate records accumulate privately.

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

Exact measured baseline before the first NCS-06 public wave:

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

Existing historical depth at that baseline remains descriptive only:

```text
Completed Occurrence history                52 / 57
Multi-year completed Occurrence history     37 / 57
Evidence-backed Change Events               57 / 57
Current State Evidence                      56 / 57
Direct profile Evidence                     39 / 57
```

The 37 / 57 value is **not** a publication quota or release floor for new Tier A/B records.

Among the legacy 19 Tier A records, the main A→B gap is direct profile Evidence for 18 records. One record also lacks approved Current State/State Evidence/timing-recurrence coverage.

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

## NCS-05 completed dry run and review hardening

NCS-05 was merged by PR #275 at main commit `4f8afbd0dd429e84c92988e5ba0d6089d28785aa`.

Sources of truth:

```text
config/matsuri-tier-a-publication-readiness-contract.json
config/matsuri-tier-a-dry-run-baseline.json
docs/matsuri-tier-a-dry-run.md
scripts/lib/matsuri-tier-a-publication-readiness.mjs
scripts/check-matsuri-tier-a-publication-readiness.mjs
scripts/check-matsuri-tier-a-dry-run.mjs
```

The bounded real-source dry run recorded only a public-safe aggregate:

```text
real-source candidates                   6
source-resolution success                6
Tier A publication-ready                 2
blocked_review                           3
blocked_input                            1
blocked_source                           0
blocked_identity                         0
published                                0
```

The operational candidate queue, candidate identities, provider identifiers, and candidate URLs remain outside the public repository.

NCS-05 hardened publication readiness so an NCS-04-ready record must also carry an explicit review attestation for identity, subject type, geography, source role, and name variants. Automation cannot self-approve. A broader geographic scope without a municipality requires an explicit source-supported basis.

Exact deterministic identity checks remain in NCS-04. NCS-05 does not introduce fuzzy automatic alias merging.

NCS-05 published no records, wrote no canonical public data, wrote no `tier_a_published_at`, and activated no future site.

## NCS-06 first public Tier A wave

PR #278 merged as main commit `96c7f778133b67b523b29344d8226a4c097b104e`.

Selected reviewed records:

```text
久多の花笠踊
平戸のジャンガラ
間々田のじゃがまいた
```

The initially considered 脚折の雨乞行事 was rejected because the same subject already exists as `fst-suneori-amagoi`.

The three selected records add only the Tier A minimum: reviewed identity/type/geography, authoritative Source, identity Evidence, explicit Tier A classification, and an authentic shared publication timestamp of `2026-08-18T16:33:34Z`.

They intentionally do not add unsupported Current State, Occurrence, Change Event, organizer, Place, Relation, coordinates, or history.

Production verification completed at `2026-08-19T15:57:44Z` by GitHub Actions run `32273129036`, job `96134104817`.

The exact production feed/manifest/sitemap counts are recorded only in the machine verification record below so narrative status does not duplicate repository-baseline count fields.

The production smoke verified all three selected records in `/data/entities.json` as `tier_a_index`, each selected detail HTML route, manifest/feed count consistency, and each selected canonical sitemap URL.

Current specialist-primary result after the verified wave:

```text
Public specialist-primary total              60
Tier A — Public Index                        22
Tier B — Public Verified                      8
Tier C — Public History / Monitoring         30
Below Tier A                                  0
```

Machine record:

```text
config/matsuri-tier-a-production-wave-001-verification.json
```

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
NCS-05  bulk dry run + Tier A publication-readiness audit — completed
NCS-06  first bounded Tier A public wave — production verified; A→B + next waves active
NCS-07  cumulative 500 public primary Matsuri records
NCS-08  cumulative 1,000 public primary Matsuri records
NCS-09  source-inventory-derived national target + continued A→B→C expansion
```

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

The current exact-head audit still detects closed-unresolved 2026 Occurrences. These remain fail-closed until direct Evidence supports a change. Elapsed dates, event-page persistence, ticket sales, or absence of a cancellation notice do not justify `held`.

Those maintenance cases do not change the national scaling rule and do not create an A/B/C global stop.

## Stabilization review

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
1. merge the reusable NCS-06 production-smoke verifier and production-verification record after exact-head CI
2. start evidence-backed A→B promotion for the three wave-001 Tier A records from their authentic publication timestamp
3. prepare the next bounded public Tier A wave toward NCS-07 without making A→B a global release blocker
4. refresh the older general production-baseline snapshot from independently measured production data without deleting historical assertions
5. continue direct-Evidence review of closed-unresolved Occurrences separately; do not infer held/cancelled outcomes
```
