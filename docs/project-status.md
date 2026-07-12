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
F2-16 through F2-19 — completed
F2-20 through F2-28 — operational hold
F2-M02 — Matsuri data freshness audit — completed
```

The first Matsuri Cloudflare Workers Static Assets deployment is reachable and verified. The exact portal and Matsuri hostnames are now decided. The remaining hold begins at the external custom-domain attachment step.

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

This does not mean that the custom domain, active canonical origin, production Search on that origin, crawler reachability, search-engine indexability, Web Analytics, or production traffic has been verified.

## Accepted deployment topology

```text
yukue.badjoke-lab.com          Yukue Series portal
matsuri-yukue.badjoke-lab.com  祭のゆくえ
```

Deployment boundary:

```text
apps/portal   → Worker yukue-portal
apps/matsuri  → Worker matsuri-yukue
```

The portal and Matsuri are separate public deployments. Matsuri will not later move under `yukue.badjoke-lab.com/matsuri/`.

The portal deployment remains planned. The Matsuri Worker and build contract remain unchanged when the portal is deployed later.

Governing files:

```text
docs/deployment-topology.md
config/yukue-deployment-topology.json
```

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
F2-M02 Matsuri data freshness audit — completed
```

### F2-M02 completion result

```text
Occurrences total                    24
Resolved Occurrences                 15
Closed-period unresolved              0
Stale Current State candidates        0
Stale external-link candidates        0
Specialist Entities with no Relation  0
Relations missing Evidence            0
```

Completed bounded maintenance:

```text
郡上おどり    → 郡上おどり保存会          maintained_by
脚折雨乞      → 脚折雨乞行事保存会        organized_by
布橋灌頂会    → 富山県［立山博物館］      supported_by
相馬野馬追2026                           outcome: held
```

Future-dated Occurrences remain subject to normal date-triggered maintenance. Their future review dates do not keep F2-M02 open.

### F2 external deployment

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment and reachable URL — completed
F2-18  deployed-origin smoke verification — completed
F2-19  exact canonical Matsuri hostname decision — completed
```

Accepted Matsuri deployment contract:

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
Canonical hostname decision    matsuri-yukue.badjoke-lab.com
```

The deployment remains fully static. Do not add an Astro Cloudflare SSR adapter, Worker runtime entry point, runtime bindings, D1, KV, or runtime ingestion without a later approved requirement.

## Domain activation operational hold

```text
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

Current activation state:

```text
Matsuri custom domain       not attached
MATSURI_PUBLIC_ORIGIN       unset
active canonical origin     none
workers.dev canonical       false
```

During the hold:

- do not treat the hostname decision as an active canonical origin,
- do not set `MATSURI_PUBLIC_ORIGIN` before the custom domain is attached,
- do not submit the sitemap,
- do not enable Web Analytics,
- do not claim F2-20 through F2-28 completion.

## Routine maintenance after F2-M02

Governing document:

```text
docs/matsuri-data-freshness-audit.md
```

Scheduled review points:

```text
博多祇園山笠 2026  review after 2026-07-15
郡上おどり 2026    review after 2026-09-05
```

New official changes, Source failures, corrections, and security or dependency repairs may be handled as normal bounded maintenance without reopening F2-M02.

## Repository gate

```text
pnpm gate:matsuri:repository
```

The gate verifies the accepted deployment topology, static artifact, Workers configuration, internal links, semantic consistency, Source and Evidence rules, responsive and accessibility behavior, public-content boundaries, release-candidate hashes, completed external work through F2-19, completed F2-M02 audit records, and preservation of the F2-20 through F2-28 hold.

## Current release status

```text
repository-verified-deployed-origin-verified-canonical-hostname-decided-domain-attachment-pending
```

## Immediate next action

Perform F2-20 in Cloudflare:

1. attach `matsuri-yukue.badjoke-lab.com` to Worker `matsuri-yukue`,
2. set `MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com`,
3. trigger a new production deployment,
4. record the resulting custom-domain URL and deployment evidence.

Do not attach `yukue.badjoke-lab.com` to the Matsuri Worker; it is reserved for the separate portal deployment.
