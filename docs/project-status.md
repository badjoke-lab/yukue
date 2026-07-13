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

The Matsuri Custom Domain, canonical output, interactive browser Search, and crawler-facing production surface have passed independent GitHub Actions verification. The next launch gate is F2-24 sitemap submission and indexability checking.

## Verified canonical production baseline

```text
Cloudflare Worker
matsuri-yukue

Canonical origin
https://matsuri-yukue.badjoke-lab.com/

Canonical origin run
29191904624 — success

Canonical Search run
29193201911 — success

Crawler reachability run
29230233384 — success

Crawler evidence artifact
8271238535
sha256:ae292efac09e25fc9ad0cefd0a7de3c40d4a38c28472734035d728ecd26f2506
```

Verified external layers:

- HTTPS and required public routes,
- exact `manifest.site_origin`,
- canonical sitemap locations,
- desktop and mobile Pagefind Search,
- structured filters and result navigation,
- `robots.txt` and exact Sitemap discovery,
- self-canonical links on sitemap routes,
- indexable robots directives,
- representative Googlebot, bingbot, and OAI-SearchBot labels,
- public discovery files.

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
matsuri-yukue.badjoke-lab.com  祭のゆくえ — canonical production verified
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

## Completed external deployment and verification

```text
F2-16  Cloudflare Workers Builds connection — completed
F2-17  first Workers Static Assets deployment — completed
F2-18  deployed-origin smoke verification — completed
F2-19  exact canonical Matsuri hostname decision — completed
F2-20  Custom Domain activation, canonical build, HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Pagefind Search verification — completed
F2-23  robots, canonical, sitemap, crawler-reachability review — completed
```

## Remaining launch sequence

```text
F2-24  search-engine sitemap submission and indexability check — next gate
F2-25  Cloudflare Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

F2-24 must record the actual search-engine submission or ownership boundary and distinguish successful submission from indexation. F2-23 did not submit the sitemap and does not claim that any search engine has indexed the site.

Do not:

- claim indexation without search-engine evidence,
- enable Web Analytics before F2-25,
- claim F2-24 through F2-28 completion without their evidence,
- begin portal deployment or a future specialist-site implementation during this sequence.

## Routine maintenance after F2-M02

```text
博多祇園山笠 2026  review after 2026-07-15
郡上おどり 2026    review after 2026-09-05
```

## Repository gate

```text
pnpm gate:matsuri:repository
```

The gate verifies the accepted topology, canonical and origin-neutral artifacts, canonical-origin evidence, browser Search evidence, crawler-reachability evidence, internal links, semantic consistency, Source and Evidence rules, browser and accessibility behavior, release-candidate hashes, completed external work through F2-23, and the F2-24 through F2-28 boundary.

## Current release status

```text
repository-verified-crawler-reachability-verified-sitemap-submission-pending
```

## Immediate next action

Run F2-24: determine the available search-engine ownership and sitemap-submission path, submit the canonical sitemap when access is available, and record submission and indexability evidence without claiming indexation prematurely.
