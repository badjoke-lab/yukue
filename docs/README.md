# Project Documentation

This directory contains the public project reference documents for the Yukue Series repository.

## Working rule

Before implementing a feature, check the relevant document here. When a gate changes, update the governing specification, machine record, current status, active schedule, roadmap, and verification contract in the same bounded pull request.

## Current launch and stabilization references

| Document | Status | Purpose |
|---|---|---|
| `project-status.md` | Living / stabilization observing | Current phase, completed F2 state, blockers, and immediate next work |
| `development-schedule.md` | Current / Phase 10 active | Concrete maintenance and bounded post-launch review sequence |
| `roadmap.md` | Phase 10 observing | Long-range phases and gates |
| `matsuri-stabilization-review.md` | Active contract | Review state machine, minimum duration, evidence, privacy, and completion rules |
| `audits/matsuri-stabilization-start-2026-07-27.md` | Observation-start audit | Public-safe start record and earliest eligible review date |
| `audits/matsuri-detail-c-embedded-map-remediation-2026-07-28.md` | Passed corrective audit | Embedded-map remediation, exhaustive coverage, browser checks, and visual proof |
| `matsuri-repository-baseline.md` | Machine-checked current | Exact bundle, Entity, launch-boundary, and Jinja-boundary values |
| `audits/matsuri-batch-29-production-verification-2026-08-05.md` | Passed production audit | Batch 29 release, exact counts, Hamamatsu and Nunobashi routes, sitemap, title, and indexability verification |
| `audits/matsuri-f2-27-production-traffic-2026-07-27.md` | Passed audit | Public-safe production traffic evidence |
| `audits/matsuri-f2-28-final-launch-gate-2026-07-27.md` | Passed audit | Final F2 launch evaluation |
| `deployment-topology.md` | Matsuri active | Portal and specialist-site hostname and Worker boundaries |
| `jinja-start-gate.md` | Blocked post-launch guardrail | Remaining prerequisites before Jinja implementation |

## Corpus expansion audits

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

## Core specifications

| Document | Status | Purpose |
|---|---|---|
| `project-concept.md` | Current | Series purpose and boundaries |
| `product-spec.md` | Working | Product capabilities and user needs |
| `public-data-model.md` | Working | Public record model and projection rules |
| `matsuri-mvp-spec.md` | Working | Matsuri MVP scope |
| `information-architecture.md` | Accepted / implemented | Home H1 and Detail C order, including required embedded-map behavior |
| `matsuri-detail-c-implementation.md` | Required implementation contract | Detail composition, routes, Relations, Evidence, Places, maps, seeds, individual JSON, and build failures |
| `ui-direction.md` | Accepted direction | Visual character, typography, palette, and layout language |
| `design-tokens.md` | Initial baseline | Shared typography, color, spacing, layout, and component tokens |
| `ui-foundation-spec.md` | Implementation spec | Shared shell, patterns, responsive and accessibility rules |
| `technical-architecture.md` | F2 production baseline | Build, search, deployment, canonical metadata, crawler, and Search Console evidence |
| `verification-policy.md` | Current | Review and publication rules |
| `source-policy.md` | Current | Source and Evidence rules |
| `image-policy.md` | Current | Real-image, rights, credit, and gallery rules |
| `machine-readable-layer.md` | Current direction | Public machine-readable outputs and crawler invariants |

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

## Public/private boundary

Private Cloudflare dashboard screenshots, account identity, raw traffic counts, tokens, visitor-level data, candidate queues, internal confidence notes, and private commercial planning are not stored in this repository. Public audits retain only sanitized facts required to prove the relevant gate.
