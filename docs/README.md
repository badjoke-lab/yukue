# Project Documentation

This directory contains the public project reference documents for the Yukue Series repository.

## Working rule

Before implementing a feature, check the relevant document here. When a decision changes, update the governing document and `decision-log.md` in the same pull request whenever practical.

## Documents

| Document | Status | Purpose |
|---|---|---|
| `project-concept.md` | Current | Series purpose and boundaries |
| `product-spec.md` | Working | Product capabilities and user needs |
| `public-data-model.md` | Working | Public record model and projection rules |
| `matsuri-mvp-spec.md` | Working | Matsuri MVP scope |
| `information-architecture.md` | Accepted direction | Home H1 and Detail C |
| `ui-direction.md` | Accepted direction | Visual character, typography, palette, layout language |
| `design-tokens.md` | Initial baseline | Shared typography, color, spacing, layout, and component tokens |
| `ui-foundation-spec.md` | Implementation spec | Shared shell, patterns, responsive and accessibility rules |
| `technical-architecture.md` | Current direction | Build, projection, search, deployment |
| `cloudflare-pages-launch-runbook.md` | F2-16–F2-18 completed | Workers Builds deployment contract, first deployment evidence, and hold boundary |
| `deployment.md` | F2-18 verified / F2-19 hold | Current Workers deployment state and canonical-origin boundary |
| `matsuri-data-freshness-audit.md` | F2-M02 active | Occurrence, Current State, Source, Evidence, Relation, and deployed-origin maintenance audit |
| `audits/matsuri-f2-m02-candidate-inventory-2026-07-12.md` | Baseline completed | Initial Occurrence, Current State, and external-link freshness candidate inventory |
| `audits/matsuri-f2-m02-relation-inventory-2026-07-12.md` | Baseline completed | Initial Relation coverage inventory, first maintenance correction, and remaining evidence candidates |
| `audits/matsuri-f2-m02-suneori-relation-2026-07-12.md` | Maintenance batch 02 | 脚折雨乞行事保存会 Entity, `organized_by` Relation, and 2024 Occurrence organizer correction |
| `release-verification.md` | F2 repository baseline | Unified release-candidate command, workspace contract, CI stages, and external limits |
| `release-candidate.md` | F2 repository baseline | Verified static artifact freeze, hashes, CI retention, and reproduction |
| `repository-launch-readiness.md` | Completed repository gate | F2-15 decision, required checks, maintenance state, and external activation boundary |
| `visual-review-workflow.md` | Implemented repository baseline | Successful full-page screenshot capture, automated checks, contact sheets, and human UI review |
| `audits/matsuri-f2-m01-visual-review-2026-07-11.md` | Passed audit | First exhaustive Matsuri desktop/mobile screenshot review |
| `source-evidence-audit.md` | F2 repository baseline | Source metadata, Evidence targeting, Current State freshness, and audit boundaries |
| `browser-accessibility-audit.md` | F2 repository baseline | Chromium viewport matrix, WCAG checks, keyboard behavior, and audit limits |
| `public-content-audit.md` | F2 repository baseline | Data and Methodology alignment, deployment status, empty states, image and map boundaries |
| `analytics.md` | Initial baseline | Launch analytics purpose, activation, verification, and privacy boundary |
| `roadmap.md` | Current | Long-range phases and gates |
| `development-schedule.md` | Current | Concrete implementation and PR sequence |
| `verification-policy.md` | Current | Review and publication rules |
| `source-policy.md` | Current | Source and evidence rules |
| `image-policy.md` | Current | Real-image, rights, credit, gallery rules |
| `data-workflow.md` | Current direction | Research-to-public data workflow |
| `versioning-policy.md` | Current direction | Schema and record versioning rules |
| `machine-readable-layer.md` | Current direction | Public machine-readable outputs and invariants |
| `decision-log.md` | Living | Project decisions and reversals |
| `project-status.md` | Living | Current phase and next gate |

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
/docs/AGENTS.md
/apps/matsuri/AGENTS.md
/packages/AGENTS.md
```

## Source-of-truth rule

Repository documents are the implementation reference for public project behavior. Private research notes, candidate queues, internal confidence notes, unresolved source conflicts under review, private operational notes, and internal commercial planning are not stored in this public repository.

## Update discipline

A pull request that changes public behavior should update the relevant specification when it affects record structure, publication behavior, page structure, navigation, evidence rules, image rules, UI direction, design tokens, UI foundation behavior, technical architecture, roadmap gates, active implementation sequence, or project status.
