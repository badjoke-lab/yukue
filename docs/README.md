# Project Documentation

This directory contains the public project reference documents for the Yukue Series repository.

## Working rule

Before implementing a feature, check the relevant document here. When a gate changes, update the governing specification, machine record, current status, active schedule, roadmap, and verification contract in the same bounded pull request.

## Current launch references

| Document | Status | Purpose |
|---|---|---|
| `project-status.md` | Living / F2-28 active | Current phase, completed F2-27 state, blockers, and next gate |
| `development-schedule.md` | Current / F2-28 active | Concrete gate and implementation sequence |
| `roadmap.md` | Current | Long-range phases and gates |
| `matsuri-repository-baseline.md` | Machine-checked current | Exact bundle, Entity, Analytics-boundary, and Jinja-boundary values |
| `f2-25-cloudflare-web-analytics.md` | Completed | Automatic setup activation and privacy boundary |
| `audits/matsuri-f2-25-analytics-activation-2026-07-27.md` | Passed audit | Public-safe F2-25 activation evidence |
| `audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md` | Passed audit | Public-safe F2-26 production deployment evidence |
| `audits/matsuri-f2-27-production-traffic-2026-07-27.md` | Passed audit | Public-safe F2-27 traffic-receipt evidence |
| `f2-26-f2-28-launch-closure.md` | F2-28 active | Final launch-gate requirements and boundaries |
| `deployment-topology.md` | Matsuri active | Portal and specialist-site hostname and Worker boundaries |
| `jinja-start-gate.md` | Blocked guardrail | Prerequisites before Jinja implementation |

## Core specifications

| Document | Status | Purpose |
|---|---|---|
| `project-concept.md` | Current | Series purpose and boundaries |
| `product-spec.md` | Working | Product capabilities and user needs |
| `public-data-model.md` | Working | Public record model and projection rules |
| `matsuri-mvp-spec.md` | Working | Matsuri MVP scope |
| `information-architecture.md` | Accepted direction | Home H1 and Detail C |
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

## Public/private boundary

Private Cloudflare dashboard screenshots, account identity, raw traffic counts, tokens, visitor-level data, candidate queues, internal confidence notes, and private commercial planning are not stored in this repository. Public audits retain only sanitized facts required to prove the relevant gate.
