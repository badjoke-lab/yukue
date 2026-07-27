# Project Documentation

This directory contains the public project reference documents for the Yukue Series repository.

## Working rule

Before implementing a feature, check the relevant document here. When a gate changes, update the governing specification, machine record, current status, active schedule, roadmap, and verification contract in the same bounded pull request.

## Current launch and stabilization references

| Document | Status | Purpose |
|---|---|---|
| `project-status.md` | Living / stabilization observing | Current phase, completed F2 state, active review window, blockers, and next review |
| `development-schedule.md` | Current / Phase 10 active | Concrete maintenance and bounded post-launch review sequence |
| `roadmap.md` | Phase 10 observing | Long-range phases and gates |
| `matsuri-stabilization-review.md` | Active contract | Review state machine, minimum duration, evidence, privacy, and completion rules |
| `audits/matsuri-stabilization-start-2026-07-27.md` | Observation-start audit | Public-safe start record and earliest eligible review date |
| `audits/matsuri-corpus-expansion-batch-11-2026-07-27.md` | Passed | First measured post-Detail-C breadth-and-depth corpus expansion |
| `audits/matsuri-corpus-expansion-batch-12-2026-07-27.md` | Passed | Okinawa breadth addition and Aomori occurrence/change-history depth maintenance |
| `matsuri-repository-baseline.md` | Machine-checked current | Exact bundle, Entity, launch-boundary, and Jinja-boundary values |
| `f2-25-cloudflare-web-analytics.md` | Completed | Analytics activation and privacy boundary |
| `audits/matsuri-f2-27-production-traffic-2026-07-27.md` | Passed audit | Public-safe production traffic evidence |
| `audits/matsuri-f2-28-final-launch-gate-2026-07-27.md` | Passed audit | Final F2 launch evaluation |
| `f2-26-f2-28-launch-closure.md` | Completed | Closed Analytics and launch-gate sequence |
| `deployment-topology.md` | Matsuri active | Portal and specialist-site hostname and Worker boundaries |
| `jinja-start-gate.md` | Blocked post-launch guardrail | Remaining prerequisites before Jinja implementation |

## Core specifications

| Document | Status | Purpose |
|---|---|---|
| `project-concept.md` | Current | Series purpose and boundaries |
| `product-spec.md` | Working | Product capabilities and user needs |
| `public-data-model.md` | Working | Public record model and projection rules |
| `matsuri-mvp-spec.md` | Working | Matsuri MVP scope |
| `information-architecture.md` | Accepted / implemented | Home H1 and Detail C order |
| `matsuri-detail-c-implementation.md` | Required implementation contract | Concrete Japanese detail composition, real routes, Relations, Evidence, Places, seed boundaries, individual JSON, and build failures |
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
| `future-site-seed-artifact-contract.md` | F2-P07 completed | Candidate artifact contract |
| `matsuri-correction-contract.md` | F2-P10 through F2-P13 completed | Ordered corrections and shared canonical assembly |
| `matsuri-data-freshness-contract.md` | Active | Strict outcome, State-age, and link-age gate |
| `matsuri-relation-coverage-contract.md` | Active | Strict zero-gap Relation gate |
| `audits/matsuri-corpus-expansion-batch-11-2026-07-27.md` | Passed corpus evidence | Coverage audit, selected breadth/depth records, and resulting corpus totals |
| `audits/matsuri-corpus-expansion-batch-12-2026-07-27.md` | Passed corpus evidence | Batch 12 Sources, Evidence, final counts, validation, product behavior, and boundaries |

## Public/private boundary

Private Cloudflare dashboard screenshots, account identity, raw traffic counts, tokens, visitor-level data, candidate queues, internal confidence notes, and private commercial planning are not stored in this repository. Public audits retain only sanitized facts required to prove the relevant gate.
