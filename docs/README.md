# Project Documentation

This directory contains the public project reference documents for the Yukue Series repository.

## Working rule

Before implementing a feature, check the relevant document here. When a decision changes, update the governing document and `decision-log.md` in the same pull request whenever practical.

## Current launch documents

| Document | Status | Purpose |
|---|---|---|
| `technical-architecture.md` | F2-23 production baseline | Build, projection, separate Workers, dual metadata modes, Search, and crawler verification |
| `deployment-topology.md` | Matsuri active | Portal and specialist-site hostnames, separate Worker boundary, and migration invariants |
| `f2-20-custom-domain-activation.md` | Completed | Custom Domain, canonical build, and HTTPS evidence |
| `f2-22-canonical-search-verification.md` | Completed | Desktop/mobile Pagefind interaction evidence |
| `f2-23-crawler-reachability.md` | Completed | Robots, sitemap, canonical metadata, User-Agent, and discovery-file evidence |
| `cloudflare-pages-launch-runbook.md` | F2-16–F2-23 completed | Workers Builds contract and F2-24 procedure |
| `deployment.md` | F2-23 completed | Verified production deployment and F2-24 boundary |
| `audits/matsuri-f2-20-canonical-activation-2026-07-12.md` | Passed | Canonical-origin activation evidence |
| `audits/matsuri-f2-22-canonical-search-2026-07-12.md` | Passed | Browser Search evidence |
| `audits/matsuri-f2-23-crawler-reachability-2026-07-13.md` | Passed | Crawler-facing production evidence |
| `release-verification.md` | F2-23 baseline | Repository and production verification layers |
| `release-candidate.md` | F2-23 verified | Origin-neutral artifact and external evidence metadata |
| `repository-launch-readiness.md` | Completed through F2-23 | Required checks and remaining gates |
| `roadmap.md` | Current | Long-range phases and gates |
| `development-schedule.md` | Current | Concrete implementation sequence |
| `project-status.md` | Current | Current position and next gate |

## Other reference documents

- `project-concept.md`
- `product-spec.md`
- `public-data-model.md`
- `matsuri-mvp-spec.md`
- `information-architecture.md`
- `ui-direction.md`
- `design-tokens.md`
- `ui-foundation-spec.md`
- `machine-readable-layer.md`
- `verification-policy.md`
- `source-policy.md`
- `image-policy.md`
- `data-workflow.md`
- `versioning-policy.md`
- `analytics.md`
- `visual-review-workflow.md`
- `source-evidence-audit.md`
- `browser-accessibility-audit.md`
- `public-content-audit.md`
- `matsuri-data-freshness-audit.md`
- `decision-log.md`

## Schedule model

```text
roadmap.md              long-range phases and gates
development-schedule.md concrete implementation sequence
project-status.md       current position and next gate
```

## Agent instruction hierarchy

```text
/AGENTS.md
/docs/AGENTS.md
/apps/matsuri/AGENTS.md
/packages/AGENTS.md
```

## Source-of-truth rule

Repository documents describe public project behavior. Private research notes, candidate queues, internal confidence, unresolved private source conflicts, private operations, and internal commercial planning are not stored here.

## Update discipline

A pull request that changes public behavior should update the relevant specification when it affects record structure, publication, navigation, evidence, images, UI, architecture, deployment, roadmap gates, schedule, or project status.
