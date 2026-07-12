# Project Status

**Last updated:** 2026-07-12

## Current phase

```text
Execution Stage F — Launch Preparation
```

## Current gate state

```text
F2-15 — Repository Launch Readiness Gate — completed
F2-M01 — Full-page screenshot visual-review workflow — completed
F2-16 through F2-18 — completed
F2-19 through F2-28 — operational hold
F2-M02 — Matsuri data freshness audit — active
```

The first Matsuri Cloudflare Workers Static Assets deployment is reachable and has passed the deployed-origin verification workflow. Domain-dependent work is paused until custom-domain operations can resume.

## Verified external baseline

```text
Cloudflare Worker
matsuri-yukue

Permanent Workers origin
https://matsuri-yukue.badjoke-lab.workers.dev/

Verified deployment origin
https://f757f092-matsuri-yukue.badjoke-lab.workers.dev/

GitHub Actions verification
run 29182976642 — success

Verified source commit
f6fdd5055c2712838ef30ed54048abf7f0674b4c
```

The deployed-origin verifier confirmed the required public HTML routes, Pagefind assets, public JSON, discovery files, Matsuri markers, representative Entity data, and sitemap structure.

This does not mean that a canonical origin, custom domain, production Search on that canonical origin, crawler reachability, search-engine indexability, Web Analytics, or production traffic has been verified.

## Completed implementation

### Foundation and reference layer

- Yukue Series monorepo,
- portal and Matsuri application foundations,
- shared package foundations,
- GitHub Actions baseline,
- public project reference documents,
- repository `AGENTS.md` hierarchy,
- Home H1 Search First Hybrid,
- Detail C Integrated Overview,
- Basic Profile + Observation product model,
- static-first architecture,
- real-image-only policy,
- map-ready Place model,
- Mincho-only public typography direction,
- four-site accent palette.

### Stages A through E

```text
Stage A  shared UI foundation
Stage B  Matsuri Home and representative Detail surfaces
Stage C  schemas and cross-record validation
Stage D  representative canonical data and Public Projection
Stage E  Browse, Pagefind Search, and machine-readable baseline
```

### F1 corpus expansion

F1 batches 01 through 10 are completed and validated. The corpus covers Festivals, Folk Performances, Tradition Units, Organizations, Shrine context seeds, Current State Snapshots, Occurrences, Change Events, Relations, Designations, Sources, and Evidence.

### F2 repository launch preparation

```text
F2-01  static build and artifact contract — completed
F2-02  public reference and secondary browse surfaces — completed
F2-03  deployed and canonical verification tooling — completed
F2-04  deployment verifier hardening — completed
F2-05  analytics policy baseline — completed
F2-06  schedule and status realignment — completed
F2-07  unified release verification — completed
F2-08  static route and internal-link integrity — completed
F2-09  HTML, JSON, Search, and sitemap consistency — completed
F2-10  public data semantic audit — completed
F2-11  Source and Evidence audit — completed
F2-12  responsive and accessibility browser audit — completed
F2-13  public content, empty-state, and image-boundary audit — completed
F2-14  release-candidate artifact freeze — completed
F2-15  Repository Launch Readiness Gate — completed
F2-M01 full-page screenshot visual-review workflow — completed
```

### F2 external deployment

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment and reachable URL — completed
F2-18  deployed-origin smoke verification — completed
```

Accepted deployment contract:

```text
Worker name                    matsuri-yukue
Repository                     badjoke-lab/yukue
Production branch              main
Root directory                 repository root
Build command                  pnpm build:matsuri:workers
Deploy command                 npx wrangler deploy
Non-production deploy command  npx wrangler versions upload
Asset directory                ./apps/matsuri/dist
Worker main entry              absent
```

The deployment remains fully static. Do not add an Astro Cloudflare SSR adapter, Worker runtime entry point, runtime bindings, D1, KV, or runtime ingestion without a later approved requirement.

## Domain-dependent operational hold

```text
F2-19  exact canonical Matsuri subdomain decision — hold
F2-20  custom-domain attachment, MATSURI_PUBLIC_ORIGIN, redeployment — hold
F2-21  canonical manifest and sitemap verification — hold
F2-22  browser Pagefind Search verification on canonical origin — hold
F2-23  crawler-reachability review — hold
F2-24  sitemap submission and indexability check — hold
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

During the hold:

- do not attach a custom domain,
- do not set `MATSURI_PUBLIC_ORIGIN`,
- do not treat the Workers origin as canonical,
- do not submit the sitemap,
- do not enable Web Analytics,
- do not claim final launch completion.

## Active package: F2-M02

### Goal

Review and improve the public Matsuri corpus while domain work is paused.

Governing document:

```text
docs/matsuri-data-freshness-audit.md
```

Priority order:

```text
1. non-future scheduled and unresolved Occurrence outcomes
2. Current State observation freshness
3. Source and Evidence quality
4. cross-site reusable Relations
5. deployed-environment maintenance checks
```

F2-M02 does not replace F2-19 through F2-28 and does not make the Workers origin canonical.

## Repository gate

```text
pnpm gate:matsuri:repository
```

The gate verifies the static artifact, Workers configuration, internal links, semantic consistency, Source and Evidence rules, responsive and accessibility behavior, public-content boundaries, release-candidate hashes, completed external work through F2-18, and preservation of the F2-19 through F2-28 hold.

## Current release status

```text
repository-verified-deployed-origin-verified-domain-hold
```

## Immediate next action

Run the F2-M02 candidate inventory and begin the first bounded data-freshness correction batch. Keep domain, canonical, indexing, and Analytics work untouched.
