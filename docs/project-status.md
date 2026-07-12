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
F2-16 through F2-21 — completed
F2-22 through F2-28 — operational hold
```

The Matsuri Custom Domain is active and the exact canonical origin has passed independent GitHub Actions verification. The next launch gate is interactive browser Search verification on the canonical origin.

## Verified canonical production baseline

```text
Cloudflare Worker
matsuri-yukue

Canonical origin
https://matsuri-yukue.badjoke-lab.com/

Canonical verification workflow
Verify Matsuri canonical origin gate

GitHub Actions run
29191904624 — success

Successful attempt
1 of 18

Activation merge commit
f978bc50a1ab51964687ec0457a448dc37b2aaf9
```

The canonical verifier confirmed:

- HTTPS reachability,
- required public HTML routes,
- Pagefind runtime asset reachability,
- public JSON and discovery files,
- Matsuri identity markers,
- representative Entity data,
- exact `manifest.site_origin`,
- canonical absolute sitemap locations.

Verification record:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
```

The permanent Workers origin remains available as non-canonical deployment infrastructure:

```text
https://matsuri-yukue.badjoke-lab.workers.dev/
```

## Accepted deployment topology

```text
yukue.badjoke-lab.com          Yukue Series portal — planned
matsuri-yukue.badjoke-lab.com  祭のゆくえ — canonical origin verified
```

Deployment boundary:

```text
apps/portal   → Worker yukue-portal
apps/matsuri  → Worker matsuri-yukue
```

The portal and Matsuri are separate public deployments. Matsuri is not hosted under `yukue.badjoke-lab.com/matsuri/`.

Governing files:

```text
docs/deployment-topology.md
config/yukue-deployment-topology.json
```

## Completed implementation

### Foundation through Stage E

```text
Foundation  monorepo, app skeletons, shared packages, CI — completed
Stage A     shared UI foundation — completed
Stage B     Matsuri static surfaces — completed
Stage C     schemas and cross-record validation — completed
Stage D     canonical data and Public Projection — completed
Stage E     Browse, Pagefind Search, machine-readable layer — completed
```

### F1 corpus expansion

F1 batches 01 through 10 are completed and validated. The corpus covers Festivals, Folk Performances, Tradition Units, Organizations, Shrine context seeds, Current State Snapshots, Occurrences, Change Events, Relations, Designations, Sources, and Evidence.

### F2 repository and maintenance work

```text
F2-01 through F2-15 — completed
F2-M01 full-page screenshot visual-review workflow — completed
F2-M02 Matsuri data freshness audit — completed
```

F2-M02 completion result:

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
F2-20  Custom Domain activation, canonical build, HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
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
Custom Domain                  matsuri-yukue.badjoke-lab.com
Canonical origin               https://matsuri-yukue.badjoke-lab.com
```

The deployment remains fully static. Do not add an Astro Cloudflare SSR adapter, Worker runtime entry point, runtime bindings, D1, KV, or runtime ingestion without a later approved requirement.

## Remaining launch sequence

```text
F2-22  browser Pagefind Search verification on canonical origin — next gate
F2-23  crawler-reachability review — hold
F2-24  sitemap submission and indexability check — hold
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

F2-22 must exercise Search in a real browser. The HTTP canonical verifier proving that `/search/` and Pagefind assets are reachable does not by itself prove interactive query behavior.

Do not:

- submit the sitemap before F2-24,
- enable Web Analytics before F2-25,
- claim F2-22 through F2-28 completion without their evidence.

## Routine maintenance after F2-M02

```text
博多祇園山笠 2026  review after 2026-07-15
郡上おどり 2026    review after 2026-09-05
```

New official changes, Source failures, corrections, and security or dependency repairs may be handled as normal bounded maintenance without reopening F2-M02.

## Repository gate

```text
pnpm gate:matsuri:repository
```

The gate verifies the accepted topology, static artifacts, Workers Custom Domain configuration, canonical verification evidence, internal links, semantic consistency, Source and Evidence rules, browser and accessibility behavior, release-candidate hashes, completed external work through F2-21, and preservation of the F2-22 through F2-28 boundary.

## Current release status

```text
repository-verified-canonical-origin-verified-browser-search-pending
```

## Immediate next action

Run F2-22: open the canonical Search page in Chromium, submit representative queries, confirm Pagefind results and result navigation, and preserve the browser evidence. Do not advance crawler, sitemap-submission, or Analytics work before F2-22 passes.
