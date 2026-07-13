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

The Matsuri canonical origin is active, its manifest and sitemap are verified, and Pagefind Search has passed interactive Chromium verification. The next gate is crawler reachability and robots/canonical/sitemap review.

## Verified canonical production baseline

```text
Cloudflare Worker
matsuri-yukue

Canonical origin
https://matsuri-yukue.badjoke-lab.com/

Canonical origin verification
run 29191904624 — success

Canonical Search verification
run 29227591583 — success

Search evidence artifact
8270324780
sha256:d7ffcdff20e361dd6e4ecef7aec06ae1002545dc67c3915c4a23007d1cbac2d1
```

Verified Search scenarios:

```text
脚折雨乞      exact result and detail navigation
相馬野馬追    exact result
qxjv9072416358zmkp  zero-result state
browser errors       0
console errors       0
```

Evidence records:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-browser-search-2026-07-13.md
```

The permanent Workers origin remains non-canonical:

```text
https://matsuri-yukue.badjoke-lab.workers.dev/
```

## Accepted deployment topology

```text
yukue.badjoke-lab.com          Yukue Series portal — planned
matsuri-yukue.badjoke-lab.com  祭のゆくえ — active and verified
```

```text
apps/portal   → Worker yukue-portal
apps/matsuri  → Worker matsuri-yukue
```

The portal and Matsuri remain separate public deployments. Matsuri is not hosted under `yukue.badjoke-lab.com/matsuri/`.

## Completed implementation

```text
Foundation through Stage E — completed
F1 batches 01 through 10 — completed
F2-01 through F2-15 — completed
F2-M01 — completed
F2-M02 — completed
F2-16 through F2-22 — completed
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

## Completed external deployment work

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  deployed-origin smoke verification — completed
F2-19  exact canonical Matsuri hostname decision — completed
F2-20  Custom Domain activation, canonical build, HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Pagefind Search verification — completed
```

## Remaining launch sequence

```text
F2-23  robots, canonical, sitemap, crawler-reachability review — next gate
F2-24  sitemap submission and indexability check — hold
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

Do not submit the sitemap before F2-24, enable Web Analytics before F2-25, or claim F2-23 through F2-28 completion without their evidence.

## Routine maintenance

```text
博多祇園山笠 2026  review after 2026-07-15
郡上おどり 2026    review after 2026-09-05
```

## Repository gate

```text
pnpm gate:matsuri:repository
```

The gate verifies the accepted topology, canonical and origin-neutral artifacts, Custom Domain configuration, canonical origin evidence, browser Search evidence, data and Evidence rules, browser and accessibility behavior, release hashes, completed work through F2-22, and the F2-23 through F2-28 boundary.

## Current release status

```text
repository-verified-canonical-search-verified-crawler-review-pending
```

## Immediate next action

Run F2-23: verify `robots.txt`, canonical markup, sitemap discovery, crawler-facing response behavior, and intended access policy on the canonical origin. Do not submit the sitemap or enable Analytics during F2-23.
