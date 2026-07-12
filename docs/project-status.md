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
F2-M02 — Matsuri data freshness audit — completed
F2-16 through F2-20 — completed
F2-21 through F2-28 — operational hold
```

The Matsuri Cloudflare Worker is deployed, its Custom Domain is active, and the canonical origin has passed the independent GitHub Actions verification gate.

## Active public topology

```text
yukue.badjoke-lab.com
└─ Yukue Series portal — reserved / not yet deployed

matsuri-yukue.badjoke-lab.com
└─ 祭のゆくえ — active canonical origin
```

Deployment boundary:

```text
apps/portal   → Worker yukue-portal
apps/matsuri  → Worker matsuri-yukue
```

The portal and Matsuri remain separate applications and separate Workers. Matsuri is not hosted under `yukue.badjoke-lab.com/matsuri/`.

## Verified external evidence

```text
Worker
matsuri-yukue

Permanent Workers origin
https://matsuri-yukue.badjoke-lab.workers.dev/

Active canonical origin
https://matsuri-yukue.badjoke-lab.com/

Initial deployed-origin verification
GitHub Actions run 29182976642 — success

Canonical-origin verification
GitHub Actions run 29191904624 — success
```

The canonical verification confirmed:

- HTTPS reachability,
- required public HTML routes,
- correct Matsuri content,
- Pagefind assets,
- public JSON and discovery files,
- `manifest.site_origin` equal to `https://matsuri-yukue.badjoke-lab.com`,
- sitemap locations using the exact canonical origin,
- the `workers.dev` origin remaining non-canonical.

## Completed implementation

### Foundation through Stage E

```text
Foundation  monorepo, app skeletons, shared packages, CI — completed
Stage A     shared UI foundation — completed
Stage B     Matsuri static surfaces — completed
Stage C     data core — completed
Stage D     canonical data and Public Projection — completed
Stage E     Browse, Pagefind Search, machine-readable layer — completed
```

### F1 corpus expansion

F1 batches 01 through 10 are completed and validated. The corpus covers Festivals, Folk Performances, Tradition Units, Organizations, Shrine context seeds, Current State Snapshots, Occurrences, Change Events, Relations, Designations, Sources, and Evidence.

### F2 repository and maintenance work

```text
F2-01 through F2-15 — completed
F2-M01 — completed
F2-M02 — completed
```

F2-M02 final result:

```text
Occurrences total                    24
Resolved Occurrences                 15
Closed-period unresolved              0
Stale Current State candidates        0
Stale external-link candidates        0
Specialist Entities with no Relation  0
Relations missing Evidence            0
```

### F2 external deployment

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  deployed-origin smoke verification — completed
F2-19  exact canonical Matsuri hostname decision — completed
F2-20  Custom Domain activation and canonical-origin verification — completed
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
Canonical origin               https://matsuri-yukue.badjoke-lab.com
```

The production site remains fully static. No Astro SSR adapter, Worker runtime entry point, D1, KV, or runtime ingestion is part of the launch baseline.

## Current operational hold

```text
F2-21  canonical manifest and sitemap verification as a recorded gate — hold
F2-22  browser Pagefind Search verification on canonical origin — hold
F2-23  robots, canonical, sitemap, crawler-reachability review — hold
F2-24  sitemap submission and indexability check — hold
F2-25  Cloudflare Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

F2-21 begins from the already successful canonical verification run and formalizes the manifest and sitemap evidence as the next recorded gate.

Do not:

- submit the sitemap before F2-24,
- enable Web Analytics before F2-25,
- claim production traffic before F2-27,
- claim final launch completion before F2-28,
- attach `yukue.badjoke-lab.com` to the Matsuri Worker.

## Routine maintenance

```text
博多祇園山笠 2026  review after 2026-07-15
郡上おどり 2026    review after 2026-09-05
```

These date-triggered reviews do not reopen F2-M02.

## Repository gate

```text
pnpm gate:matsuri:repository
```

The gate verifies the accepted deployment topology, active canonical origin record, successful F2-20 evidence, static artifact, Workers configuration, internal links, semantic consistency, Source and Evidence rules, browser behavior, release-candidate hashes, completed work through F2-20, and preservation of the F2-21 through F2-28 boundary.

## Current release status

```text
repository-verified-deployed-origin-verified-canonical-origin-active
```

## Immediate next action

Complete F2-21 by recording the exact canonical `manifest.site_origin` and sitemap URL evidence from successful GitHub Actions run `29191904624`. Then proceed to browser Pagefind Search verification at F2-22.
