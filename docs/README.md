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
| `technical-architecture.md` | F2-22 production baseline | Build, projection, search, multi-Worker deployment, and verified canonical Search |
| `deployment-topology.md` | Matsuri active | Exact portal and specialist-site hostnames, separate Worker boundary, active Matsuri origin, and migration invariants |
| `f2-20-custom-domain-activation.md` | Completed | Repository-managed Custom Domain, canonical build, and external verification evidence |
| `f2-22-browser-search-verification.md` | Completed | Canonical Chromium query, result rendering, navigation, zero-result, and artifact contract |
| `cloudflare-pages-launch-runbook.md` | F2-16–F2-22 completed | Workers Builds contract, canonical deployment, verified Search, and remaining launch sequence |
| `deployment.md` | F2-22 completed | Verified canonical Workers deployment and F2-23 crawler boundary |
| `audits/matsuri-f2-20-canonical-activation-2026-07-12.md` | Passed audit | HTTPS, required routes, manifest origin, and canonical sitemap verification run |
| `audits/matsuri-f2-22-browser-search-2026-07-13.md` | Passed audit | Chromium queries, result navigation, zero-result state, and zero browser errors |
| `matsuri-data-freshness-audit.md` | F2-M02 completed | Completed fixed-date audit and routine maintenance rules |
| `audits/matsuri-f2-m02-candidate-inventory-2026-07-12.md` | Baseline completed | Initial Occurrence, State, and external-link inventory |
| `audits/matsuri-f2-m02-soma-outcome-2026-07-12.md` | Outcome resolved | 南相馬市 Evidence and `held` correction for 相馬野馬追 2026 |
| `audits/matsuri-f2-m02-relation-inventory-2026-07-12.md` | Baseline completed | Initial Relation coverage inventory |
| `audits/matsuri-f2-m02-suneori-relation-2026-07-12.md` | Maintenance batch 02 | 脚折雨乞 organization and Relation correction |
| `audits/matsuri-f2-m02-nunobashi-relation-2026-07-12.md` | Maintenance batch 03 | 富山県［立山博物館］ Relation coverage |
| `release-verification.md` | F2 repository baseline | Unified release verification, topology check, CI stages, and external limits |
| `release-candidate.md` | Canonical Search verified | Origin-neutral artifact, active deployment evidence, and F2-23 pending state |
| `repository-launch-readiness.md` | Completed repository gate | Required checks, verified Search state, and remaining external gates |
| `visual-review-workflow.md` | Implemented repository baseline | Full-page screenshot capture, checks, contact sheets, and review |
| `audits/matsuri-f2-m01-visual-review-2026-07-11.md` | Passed audit | First exhaustive desktop/mobile visual review |
| `source-evidence-audit.md` | F2 repository baseline | Source metadata, Evidence targeting, and freshness boundaries |
| `browser-accessibility-audit.md` | F2 repository baseline | Chromium viewport matrix, WCAG checks, and keyboard behavior |
| `public-content-audit.md` | F2 repository baseline | Public content and infrastructure-status boundaries |
| `analytics.md` | Initial baseline | Analytics purpose, activation, verification, and privacy boundary |
| `roadmap.md` | Current | Long-range phases and gates |
| `development-schedule.md` | Current | Concrete implementation sequence |
| `verification-policy.md` | Current | Review and publication rules |
| `source-policy.md` | Current | Source and evidence rules |
| `image-policy.md` | Current | Real-image, rights, credit, and gallery rules |
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

A pull request that changes public behavior should update the relevant specification when it affects record structure, publication behavior, page structure, navigation, evidence rules, image rules, UI direction, design tokens, UI foundation behavior, technical architecture, deployment topology, roadmap gates, active implementation sequence, or project status.
