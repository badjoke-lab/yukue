# Project Documentation

This directory contains the public project reference documents for the Yukue Series repository.

## Working rule

Before implementing a feature, check the relevant document here. When a gate changes, update the governing specification, machine record, current status, active schedule, roadmap, and verification contract in the same bounded pull request.

For corpus expansion, bulk ingestion, coverage metrics, future-site seeds, or specialist-site activation, `nationwide-corpus-scaling.md` is a governing specification and must be read together with `project-status.md` and `development-schedule.md`.

## Current launch and stabilization references

| Document | Status | Purpose |
|---|---|---|
| `project-status.md` | Living / nationwide scaling active / stabilization reviewing | Current phase, completed F2 state, nationwide scaling track, blockers, and immediate next work |
| `development-schedule.md` | Current / Phase 10 active | Concrete NCS sequence plus maintenance and bounded post-launch review order |
| `roadmap.md` | Phase 10 active | Long-range phases and gates |
| `nationwide-corpus-scaling.md` | Accepted direction / governing specification | National breadth, anti-thin-record rule, substantive public minimum, automation boundary, depth-preservation gate, and future-site quality prerequisites |
| `matsuri-stabilization-review.md` | Active contract | `observing -> reviewing -> complete` state machine, minimum duration, evidence, privacy, and completion rules |
| `audits/matsuri-stabilization-start-2026-07-27.md` | Observation-start audit | Public-safe start record and earliest eligible review date |
| `audits/matsuri-stabilization-review-eligibility-2026-08-11.md` | Review-eligibility audit | Calendar eligibility transition without completing the formal review |
| `audits/matsuri-stabilization-public-review-2026-08-11.md` | Public/repository review passed | Public production, canonical, Search, crawler, freshness, Relation, Evidence, and correction-contract review inputs |
| `audits/matsuri-stabilization-maintenance-review-2026-08-12.md` | Maintenance review passed | Known critical-correction count, production deployment-failure count, maintenance burden, and transition to reviewing; private observations remain pending |
| `audits/matsuri-detail-c-embedded-map-remediation-2026-07-28.md` | Passed corrective audit | Embedded-map remediation, exhaustive coverage, browser checks, and visual proof |
| `matsuri-repository-baseline.md` | Machine-checked current | Exact bundle, Entity, launch-boundary, and Jinja-boundary values |
| `audits/matsuri-batch-43-production-verification-2026-08-11.md` | Passed production audit | Batch 43 release, 47/47 prefecture seed baseline, Miyazaki routes, 2024 held/modified and 2026 scheduled assertions, sitemap, and canonical verification |
| `audits/matsuri-f2-27-production-traffic-2026-07-27.md` | Passed audit | Public-safe production traffic evidence |
| `audits/matsuri-f2-28-final-launch-gate-2026-07-27.md` | Passed audit | Final F2 launch evaluation |
| `deployment-topology.md` | Matsuri active | Portal and specialist-site hostname and Worker boundaries |
| `jinja-start-gate.md` | Blocked post-launch guardrail | Remaining prerequisites before Jinja implementation |

## Corpus expansion audits

The 47 / 47 result below is now treated as a **prefecture seed baseline**, not nationwide corpus completion. Historical audit results remain valid records of the original expansion work.

| Batch | Audit | Result |
|---:|---|---|
| 11 | `audits/matsuri-corpus-expansion-batch-11-2026-07-27.md` | First measured post-Detail-C breadth-and-depth expansion |
| 12 | `audits/matsuri-corpus-expansion-batch-12-2026-07-27.md` | Okinawa breadth and Aomori depth |
| 13 | `audits/matsuri-corpus-expansion-batch-13-2026-07-28.md` | Yamagata breadth and Chichibu depth |
| 14 | `audits/matsuri-corpus-expansion-batch-14-2026-07-29.md` | Tokyo breadth, Akita depth, due Occurrence closure |
| 15 | `audits/matsuri-corpus-expansion-batch-15-2026-07-29.md` | Nagasaki breadth and Gion depth |
| 16 | `audits/matsuri-corpus-expansion-batch-16-2026-07-29.md` | Kochi breadth and Toei Hana depth |
| 17 | `audits/matsuri-corpus-expansion-batch-17-2026-07-29.md` | Chiba breadth and Yamaga depth |
| 18 | `audits/matsuri-corpus-expansion-batch-18-2026-07-29.md` | Oita breadth and Hayachine component depth |
| 19 | `audits/matsuri-corpus-expansion-batch-19-2026-07-31.md` | Hiroshima breadth and Sada Shin Noh depth |
| 20 | `audits/matsuri-corpus-expansion-batch-20-2026-07-31.md` | Tochigi breadth, ritual-anchor correction, Dainichido depth |
| 21 | `audits/matsuri-corpus-expansion-batch-21-2026-07-31.md` | Ishikawa breadth and Nunokawa depth |
| 22 | `audits/matsuri-corpus-expansion-batch-22-2026-08-02.md` | Yamanashi breadth, Aso Onda depth, Gion closure |
| 23 | `audits/matsuri-corpus-expansion-batch-23-2026-08-02.md` | Mie breadth and Sanja format history |
| 24 | `audits/matsuri-corpus-expansion-batch-24-2026-08-02.md` | Ibaraki breadth and Hayachine parent depth |
| 25 | `audits/matsuri-corpus-expansion-batch-25-2026-08-03.md` | Nara breadth and Suneori cancellation/return depth |
| 26 | `audits/matsuri-corpus-expansion-batch-26-2026-08-03.md` | Shiga breadth and Sada special-performance depth plus the museum-hall Place-route correction |
| 27 | `audits/matsuri-corpus-expansion-batch-27-2026-08-03.md` | Kagawa breadth and Hayachine component designation history |
| 28 | `audits/matsuri-corpus-expansion-batch-28-2026-08-05.md` | Ehime breadth and Aso Onda group-designation history |
| 29 | `audits/matsuri-corpus-expansion-batch-29-2026-08-05.md` | Shizuoka breadth and Nunobashi occurrence history |
| 30 | `audits/matsuri-corpus-expansion-batch-30-2026-08-05.md` | Okayama breadth and Soma Nomaoi 2025 occurrence and participation-rule history |
| 31 | `audits/matsuri-corpus-expansion-batch-31-2026-08-06.md` | Fukui breadth and Nunokawa national-designation history |
| 32 | `audits/matsuri-corpus-expansion-batch-32-2026-08-07.md` | Due Hirosaki/Akita occurrence closure and Saga breadth through Karatsu Kunchi |
| 33 | `audits/matsuri-corpus-expansion-batch-33-2026-08-09.md` | Kanagawa breadth through Chigasaki Kaigan Hamaori-sai plus the due Sendai 2026 outcome rollover |
| 34 | `audits/matsuri-corpus-expansion-batch-34-2026-08-09.md` | Kagoshima breadth through Ohara Festival and official-route map remediation |
| 35 | `audits/matsuri-corpus-expansion-batch-35-2026-08-09.md` | Osaka breadth through Kishiwada Danjiri Festival with split September/October components |
| 36 | `audits/matsuri-corpus-expansion-batch-36-2026-08-09.md` | Tottori breadth through Tottori Shanshan Festival with annual recurrence and official-map anchor |
| 37 | `audits/matsuri-corpus-expansion-batch-37-2026-08-09.md` | Hyogo breadth through Kobe Festival with the held 2026 occurrence and official-map anchor |
| 38 | `audits/matsuri-corpus-expansion-batch-38-2026-08-10.md` | Gunma breadth through Kiryu Yagibushi Festival with 1964/1988 history and a verified 2024 held edition |
| 39 | `audits/matsuri-corpus-expansion-batch-39-2026-08-10.md` | Nagano breadth through Nagano Binzuru with a 1971 start and verified 2025 held edition |
| 40 | `audits/matsuri-corpus-expansion-batch-40-2026-08-10.md` | Niigata breadth through Niigata Matsuri with a 1955 start and verified 2025 held/modified edition |
| 41 | `audits/matsuri-corpus-expansion-batch-41-2026-08-10.md` | Yamaguchi breadth through Yamaguchi Gion Matsuri with a 1459 start and verified 2023 held edition |
| 42 | `audits/matsuri-corpus-expansion-batch-42-2026-08-11.md` | Wakayama breadth through Waka Matsuri with a 1622 start and verified 2026 held edition |
| 43 | `audits/matsuri-corpus-expansion-batch-43-2026-08-11.md` | Miyazaki breadth through Miyazaki Jingu Grand Festival, completing 47/47 prefecture seed coverage with 2024 held/modified and 2026 scheduled editions |

## Core specifications

| Document | Status | Purpose |
|---|---|---|
| `project-concept.md` | Current | Series purpose, boundaries, and national breadth/depth direction |
| `product-spec.md` | Working | Product capabilities, user needs, and public corpus quality expectations |
| `nationwide-corpus-scaling.md` | Accepted direction / governing specification | Candidate/public boundary, substantive public minimum, depth-preservation rules, automation, coverage metrics, and future-site prerequisites |
| `public-data-model.md` | Working | Public record model, candidate boundary, derived quality/depth classes, and projection rules |
| `matsuri-mvp-spec.md` | Working | Matsuri scope, vocabularies, public-record minimum reference, and future-site seed boundary |
| `information-architecture.md` | Accepted / implemented | Home H1 and Detail C order, including required embedded-map behavior |
| `matsuri-detail-c-implementation.md` | Required implementation contract | Detail composition, routes, Relations, Evidence, Places, maps, seeds, individual JSON, and build failures |
| `ui-direction.md` | Accepted direction | Visual character, typography, palette, and layout language |
| `design-tokens.md` | Initial baseline | Shared typography, color, spacing, layout, and component tokens |
| `ui-foundation-spec.md` | Implementation spec | Shared shell, patterns, responsive and accessibility rules |
| `technical-architecture.md` | F2 production baseline | Build, search, deployment, canonical metadata, crawler, and Search Console evidence |
| `verification-policy.md` | Current | Review and publication rules, including bulk-scaling fail-close boundaries |
| `source-policy.md` | Current | Source and Evidence rules |
| `image-policy.md` | Current | Real-image, rights, credit, and gallery rules |
| `machine-readable-layer.md` | Current direction | Public machine-readable outputs and crawler invariants |

## Nationwide scaling checkpoints

```text
NCS-01  governing specification and schedule alignment
NCS-02  machine quality/depth classifier over existing corpus
NCS-03  national authoritative-source inventory
NCS-04  deterministic candidate importer + identity/dedupe pipeline
NCS-05  non-public bulk dry run and error audit
NCS-06  first public-quality expansion pilot
NCS-07  cumulative 500 public-quality primary Matsuri records
NCS-08  cumulative 1,000 public-quality primary Matsuri records
NCS-09  source-inventory-derived national coverage target
```

500 and 1,000 are scaling checkpoints, not nationwide-completion claims.

Thin name/location/link subjects may exist only as non-public candidates. They are not a public coverage tier.

## Data and maintenance contracts

| Document | Status | Purpose |
|---|---|---|
| `future-site-seed-inventory.md` | Candidate-only current | Relation-backed extraction without future-site activation |
| `future-site-seed-readiness.md` | Candidate-only current | Carry-forward context and explicit gaps |
| `future-site-seed-provenance-bundle.md` | Candidate-only current | Self-contained public provenance context |
| `future-site-seed-artifact-contract.md` | Completed | Candidate artifact contract |
| `matsuri-correction-contract.md` | Completed / active | Ordered corrections and shared canonical assembly |
| `matsuri-data-freshness-contract.md` | Active | Strict outcome, State-age, and link-age gate |
| `matsuri-relation-coverage-contract.md` | Active | Strict zero-gap Relation gate |
| `visual-review-workflow.md` | Active | Representative full-page screenshot and embedded-map review contract |

## Future-site quality boundary

State-free Shrine and Temple records extracted from Matsuri are candidate/reference seeds only. They are not automatically acceptable public primary records for 神社のゆくえ or 寺院のゆくえ.

Each future specialist site must define and enforce its own substantive public-record minimum, authoritative source inventory, ingestion/dedupe path, machine quality/depth metrics, and public quality gate before activation. The same requirement applies to 弔いのゆくえ.

## Public/private boundary

Private Cloudflare dashboard screenshots, account identity, raw traffic counts, tokens, visitor-level data, candidate queues, internal confidence notes, and private commercial planning are not stored in this repository. Public audits retain only sanitized facts required to prove the relevant gate.
