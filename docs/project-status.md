# Project Status

**Last updated:** 2026-07-13

## Current phase

```text
Execution Stage F — Launch Preparation
```

## Current gate state

```text
F2-15 — Repository Launch Readiness Gate — completed
F2-M01 — Full-page screenshot visual-review workflow — completed
F2-M02 — Matsuri data freshness audit — completed
F2-16 through F2-22 — completed
F2-23 through F2-28 — operational hold
```

The Matsuri canonical origin and interactive Pagefind Search have passed independent GitHub Actions verification. The next launch gate is the robots, canonical, sitemap, and crawler-reachability review.

## Verified canonical production baseline

```text
Worker
matsuri-yukue

Canonical origin
https://matsuri-yukue.badjoke-lab.com/

Canonical HTTP verification
run 29191904624 — success

Canonical browser Search verification
run 29227617530 — success
```

Canonical HTTP evidence confirms HTTPS, required public routes, Pagefind asset reachability, public JSON, exact `manifest.site_origin`, and canonical sitemap locations.

Browser Search evidence confirms:

```text
Exact query          脚折雨乞 → 1 result
Destination          /festivals/suneori-amagoi/
Filtered query       雨乞 + 埼玉県 → 1 result
Empty query          0 results and correct empty state
Page errors          0
Console errors       0
Application failures 0
Screenshots          4
```

Evidence records:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-browser-search-2026-07-13.md
```

The permanent Workers origin remains non-canonical deployment infrastructure:

```text
https://matsuri-yukue.badjoke-lab.workers.dev/
```

## Accepted deployment topology

```text
yukue.badjoke-lab.com          Yukue Series portal — planned
matsuri-yukue.badjoke-lab.com  祭のゆくえ — canonical origin and Search verified
```

```text
apps/portal   → Worker yukue-portal
apps/matsuri  → Worker matsuri-yukue
```

The portal and Matsuri remain separate public deployments. Matsuri is not hosted under a portal path.

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

F1 batches 01 through 10 are completed and validated.

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
F2-22  canonical browser Pagefind Search verification — completed
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

The deployment remains fully static.

## Remaining launch sequence

```text
F2-23  robots, canonical, sitemap, and crawler-reachability review — next gate
F2-24  sitemap submission and indexability check — hold
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

F2-23 must verify the live `robots.txt`, canonical links, sitemap references, crawler-visible response behavior, and absence of unintended crawler blocking before sitemap submission begins.

Do not:

- submit the sitemap before F2-24,
- enable Web Analytics before F2-25,
- claim F2-23 through F2-28 completion without their evidence.

## Routine maintenance after F2-M02

```text
博多祇園山笠 2026  review after 2026-07-15
郡上おどり 2026    review after 2026-09-05
```

## Repository gate

```text
pnpm gate:matsuri:repository
```

The gate verifies the accepted topology, canonical and browser Search evidence, static artifacts, Workers configuration, internal links, semantic consistency, Source and Evidence rules, browser and accessibility behavior, release-candidate hashes, completed external work through F2-22, and preservation of the F2-23 through F2-28 boundary.

## Current release status

```text
repository-verified-canonical-origin-and-browser-search-verified-crawler-review-pending
```

## Immediate next action

Run F2-23: verify the live crawler surface and record robots, canonical, sitemap, and crawler-reachability evidence before any search-engine submission.
