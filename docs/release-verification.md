# Release Verification

**Status:** Repository and production baseline through F2-23

## Commands

```text
pnpm verify:matsuri:workers
pnpm verify:release
pnpm freeze:matsuri:release
pnpm gate:matsuri:repository
pnpm check:matsuri:canonical-search
pnpm check:matsuri:crawler-reachability
```

## Verification layers

### Canonical Workers artifact

Validates topology, Wrangler Custom Domain configuration, the production-origin build, required routes and files, exact self-canonical links, index/follow metadata, manifest origin, canonical sitemap, and public-output consistency.

### Origin-neutral repository artifact

Rebuilds without an active origin, verifies `noindex,nofollow` and absence of canonical claims, then freezes a reproducible artifact with per-file and aggregate SHA-256 values.

### Canonical browser Search

Desktop and mobile Chromium verify exact-name Search, result rendering and navigation, structured filters, no-result behavior, and runtime error absence.

### Crawler reachability

The live gate verifies:

- `robots.txt` policy and canonical Sitemap directive,
- all 20 sitemap routes,
- exact self-canonical links,
- index/follow metadata,
- no blocking `X-Robots-Tag`,
- 28 representative User-Agent checks,
- 12 discovery-file checks.

## External evidence

```text
Canonical origin
Workflow     Verify Matsuri canonical origin gate
Run          29191904624 — success
Audit        docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md

Canonical Search
Workflow     Verify Matsuri canonical Search
Run          29193201911 — success
Job          86651403427
Artifact     8260207484
Audit        docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md

Crawler reachability
Workflow     Verify Matsuri crawler reachability
Run          29230475619 — success
Job          86753387839
Artifact     8271321515
Audit        docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md
```

## What the current gate proves

- repository artifacts are reproducible and internally consistent,
- canonical and origin-neutral metadata modes are distinct and verified,
- the Custom Domain is reachable over HTTPS,
- public files, Search, robots policy, sitemap, canonical links, and indexing directives work as specified,
- representative User-Agent labels are not explicitly blocked from the runner network,
- F2-16 through F2-23 are complete.

## What it does not prove

- sitemap submission to a search engine,
- actual page indexation,
- Web Analytics activation,
- production traffic recording,
- final launch completion.

Those remain F2-24 through F2-28.
