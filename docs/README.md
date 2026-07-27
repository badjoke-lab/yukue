# Project Documentation

This directory contains the public project reference documents for the Yukue Series repository.

## Working rule

Before implementing a feature, check the relevant document here. When a decision changes, update the governing document and `decision-log.md` in the same pull request whenever practical.

## Current launch references

| Document | Status | Purpose |
|---|---|---|
| `project-status.md` | Living / F2-26 active | Current phase, completed F2-25 state, blockers, and next gate |
| `development-schedule.md` | Current / F2-26 active | Concrete gate and implementation sequence |
| `roadmap.md` | Current | Long-range phases and gates |
| `matsuri-repository-baseline.md` | Machine-checked current | Exact current bundle, Entity, Analytics-boundary, and Jinja-boundary values |
| `f2-25-cloudflare-web-analytics.md` | Completed | Automatic setup activation result, timestamp provenance, machine record, and privacy boundary |
| `audits/matsuri-f2-25-analytics-activation-2026-07-27.md` | Passed audit | Public-safe proof that Automatic setup was observed enabled without publishing private dashboard material |
| `f2-26-f2-28-launch-closure.md` | F2-26 active | Post-activation main deployment, traffic verification, and final launch-gate sequence |
| `deployment-topology.md` | Matsuri active | Exact portal and specialist-site hostnames and separate Worker boundary |
| `jinja-start-gate.md` | Blocked guardrail | Prerequisites and inactive boundary before Jinja implementation |

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
| `technical-architecture.md` | F2 production baseline | Build, projection, search, multi-Worker deployment, canonical metadata, crawler verification, and Search Console evidence |
| `verification-policy.md` | Current | Review and publication rules |
| `source-policy.md` | Current | Source and Evidence rules |
| `image-policy.md` | Current | Real-image, rights, credit, and gallery rules |
| `machine-readable-layer.md` | Current direction | Public machine-readable outputs and crawler invariants |

## Data, provenance, and maintenance contracts

| Document | Status | Purpose |
|---|---|---|
| `future-site-seed-inventory.md` | Candidate-only current | Relation-backed extraction without activating future applications |
| `future-site-seed-readiness.md` | Candidate-only current | Carry-forward context, identity Evidence, and explicit target-site gaps |
| `future-site-seed-provenance-bundle.md` | Candidate-only current | Self-contained public Source, Evidence, Place, Relation, State, and Entity context |
| `future-site-seed-artifact-contract.md` | F2-P07 completed | Contract for candidate inventory and provenance artifacts |
| `matsuri-correction-contract.md` | F2-P10 through F2-P13 completed | Ordered corrections and shared canonical assembly |
| `matsuri-data-freshness-audit.md` | F2-M02 completed | Completed fixed-date audit and routine maintenance rules |
| `matsuri-data-freshness-contract.md` | Active repository contract | Strict closed-outcome, State-age, and external-link-age gate |
| `matsuri-relation-coverage-contract.md` | Active repository contract | Strict zero-gap Relation coverage gate |

## Deployment and verification history

Historical F2-20 through F2-24 activation, Search, crawler, and Search Console audits remain under `docs/audits/`. Historical audit values describe the verified state at their recorded time and are not rewritten as current values change.

The private Cloudflare dashboard screenshots used to establish F2-25 are deliberately not stored in this public repository. The public audit retains only the canonical hostname, provider, Automatic setup state, first verified UTC observation, sanitized result, and privacy review.

## Schedule model

```text
roadmap.md
= long-range phases and gates

development-schedule.md
= concrete implementation and PR sequence

project-status.md
= current position and next gate
```

## Agent instruction hierarchy

Read the root `AGENTS.md` first, then the nearest nested `AGENTS.md` for the path being changed.

```text
/AGENTS.md
→ /docs/AGENTS.md
→ nearest app or package AGENTS.md
```

## Source-of-truth rule

Repository documents are the implementation reference for public project behavior. Private research notes, dashboard screenshots, candidate queues, internal confidence notes, unresolved source conflicts, private operational notes, and internal commercial planning are not stored in this public repository.

## Update discipline

A pull request that changes public behavior or project gates should update the governing specification, current status, active schedule, roadmap, machine record, and relevant verification contract in the same bounded change.
