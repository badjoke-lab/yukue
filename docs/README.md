# Project Documentation

This directory contains the public project reference documents for the Yukue Series repository.

## Working rule

Before implementing a feature, check the relevant document here. When a gate changes, update the governing specification, machine record, current status, active schedule, roadmap, and verification contract in the same bounded pull request.

For corpus expansion, bulk ingestion, coverage metrics, future-site seeds, or specialist-site activation, `nationwide-corpus-scaling.md` is a governing specification and must be read together with `project-status.md` and `development-schedule.md`.

## Current launch, stabilization, and scaling references

| Document | Status | Purpose |
|---|---|---|
| `project-status.md` | Living / nationwide scaling active / stabilization reviewing | Current phase, blockers, nationwide track, and immediate next work |
| `development-schedule.md` | Current / Phase 10 active | Concrete NCS sequence plus maintenance and post-launch review order |
| `roadmap.md` | Phase 10 active | Long-range phases and gates |
| `nationwide-corpus-scaling.md` | Accepted direction / governing specification | National breadth, anti-thin-record rule, public minimum, automation boundary, depth-preservation gate, and future-site quality prerequisites |
| `matsuri-stabilization-review.md` | Active contract | `observing -> reviewing -> complete` state machine, minimum duration, evidence, privacy, and completion rules |
| `audits/matsuri-stabilization-start-2026-07-27.md` | Observation-start audit | Public-safe start record and earliest eligible review date |
| `audits/matsuri-stabilization-review-eligibility-2026-08-11.md` | Review-eligibility audit | Calendar eligibility transition without completing the formal review |
| `audits/matsuri-stabilization-public-review-2026-08-11.md` | Public/repository review passed | Public production, canonical, Search, crawler, freshness, Relation, Evidence, and correction-contract review inputs |
| `audits/matsuri-stabilization-maintenance-review-2026-08-12.md` | Maintenance review passed | Known critical-correction count, production deployment-failure count, maintenance burden, and transition to reviewing; private observations remain pending |
| `matsuri-repository-baseline.md` | Machine-checked current | Exact bundle, Entity, launch-boundary, and Jinja-boundary values |
| `deployment-topology.md` | Matsuri active | Portal and specialist-site hostname and Worker boundaries |
| `jinja-start-gate.md` | Blocked post-launch guardrail | Remaining prerequisites before Jinja implementation |

## Corpus expansion history

Batches 11 through 43 established the current high-quality initial Matsuri corpus and at least one reviewed primary record in all 47 prefectures.

The 47 / 47 result is now treated as a **prefecture seed baseline**, not nationwide corpus completion.

Historical batch audits remain under `docs/audits/`. They continue to document the original breadth-and-depth work and are not invalidated by the nationwide-scaling redesign.

Nationwide expansion after that baseline is governed by `nationwide-corpus-scaling.md` and the NCS sequence in `development-schedule.md`.

## Core specifications

| Document | Status | Purpose |
|---|---|---|
| `project-concept.md` | Current | Series purpose, boundaries, and national breadth/depth direction |
| `product-spec.md` | Working | Product capabilities, user needs, and public corpus quality expectations |
| `nationwide-corpus-scaling.md` | Accepted direction / governing specification | Candidate/public boundary, substantive public minimum, depth-preservation rules, automation, coverage metrics, and future-site prerequisites |
| `public-data-model.md` | Working | Public record model, candidate boundary, derived quality/depth classes, and projection rules |
| `matsuri-mvp-spec.md` | Working | Matsuri scope, vocabularies, public record minimum reference, and future-site seed boundary |
| `information-architecture.md` | Accepted / implemented | Home H1 and Detail C order, including required embedded-map behavior |
| `matsuri-detail-c-implementation.md` | Required implementation contract | Detail composition, routes, Relations, Evidence, Places, maps, seeds, individual JSON, and build failures |
| `ui-direction.md` | Accepted direction | Visual character, typography, palette, and layout language |
| `design-tokens.md` | Initial baseline | Shared typography, color, spacing, layout, and component tokens |
| `ui-foundation-spec.md` | Implementation spec | Shared shell, patterns, responsive and accessibility rules |
| `technical-architecture.md` | F2 production baseline | Build, search, deployment, canonical metadata, crawler, and Search Console evidence |
| `verification-policy.md` | Current | Review/publication rules including bulk-scaling fail-close boundaries |
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

State-free Shrine and Temple records extracted from Matsuri are candidate/reference seeds only.

They are not automatically acceptable public primary records for 神社のゆくえ or 寺院のゆくえ.

Each future specialist site must define and enforce its own substantive public-record minimum, authoritative source inventory, ingestion/dedupe path, machine quality/depth metrics, and public quality gate before activation.

The same requirement applies to 弔いのゆくえ.

## Public/private boundary

Private Cloudflare dashboard screenshots, account identity, raw traffic counts, tokens, visitor-level data, candidate queues, internal confidence notes, and private commercial planning are not stored in this repository. Public audits retain only sanitized facts required to prove the relevant gate.
