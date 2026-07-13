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
F2-16 through F2-23 — completed
F2-24 through F2-28 — operational hold
```

The Matsuri canonical origin, interactive Search, robots policy, canonical metadata, sitemap inventory, and crawler-facing reachability have passed independent GitHub Actions verification. The next launch gate is F2-24 sitemap submission and indexability checking.

## Verified production baseline

```text
Worker
matsuri-yukue

Canonical origin
https://matsuri-yukue.badjoke-lab.com/

Canonical origin run
29191904624 — success

Canonical Search run
29193201911 — success

Crawler reachability run
29230475619 — success
```

Crawler evidence:

```text
robots policy                         passed
sitemap locations                     20
exact self-canonical links             20 / 20
index/follow metadata                  20 / 20
representative User-Agent checks       28 / 28
discovery-file checks                  12 / 12
```

Evidence records:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md
docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md
```

The permanent Workers origin remains non-canonical:

```text
https://matsuri-yukue.badjoke-lab.workers.dev/
```

## Accepted deployment topology

```text
yukue.badjoke-lab.com          Yukue Series portal — planned
matsuri-yukue.badjoke-lab.com  祭のゆくえ — canonical production
```

```text
apps/portal   → Worker yukue-portal
apps/matsuri  → Worker matsuri-yukue
```

The portal and Matsuri remain separate deployments. Matsuri is not hosted below a portal path.

## Completed implementation

```text
Foundation through Stage E — completed
F1 batches 01 through 10 — completed
F2-01 through F2-15 — completed
F2-M01 — completed
F2-M02 — Matsuri data freshness audit — completed
F2-16 through F2-23 — completed
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

F2 external completion:

```text
F2-16  Workers Builds connection — completed
F2-17  first static deployment — completed
F2-18  deployed-origin verification — completed
F2-19  canonical hostname decision — completed
F2-20  Custom Domain and HTTPS — completed
F2-21  canonical manifest and sitemap — completed
F2-22  browser Pagefind Search — completed
F2-23  crawler reachability — completed
```

## Remaining launch sequence

```text
F2-24  search-engine sitemap submission and indexability check — next
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

F2-24 must record actual search-engine submission evidence and an indexability check. F2-23 reachability does not itself prove submission or indexation.

Do not enable Analytics, deploy the portal, or start another specialist site before the applicable gate.

## Routine maintenance

```text
博多祇園山笠 2026  review after 2026-07-15
郡上おどり 2026    review after 2026-09-05
```

## Repository gate

```text
pnpm gate:matsuri:repository
```

The gate requires the accepted topology, static artifact integrity, canonical and origin-neutral metadata, canonical-origin evidence, browser Search evidence, crawler evidence, release hashes, data-quality baselines, completed external work through F2-23, and the F2-24 boundary.

## Current release status

```text
repository-verified-canonical-origin-browser-search-and-crawler-reachability-verified-sitemap-submission-pending
```

## Immediate next action

Proceed to F2-24. Submit the canonical sitemap through an accepted search-engine owner account, record the submission result, and check indexability without claiming that indexing has already occurred.
