# Release Verification

**Status:** Repository and external verification baseline completed through F2-24 / Analytics owner access pending

## Commands

```text
pnpm verify:matsuri:workers
pnpm verify:release
pnpm freeze:matsuri:release
pnpm gate:matsuri:repository
pnpm check:matsuri:canonical-search
pnpm check:matsuri:crawler-reachability
pnpm check:matsuri:indexability-preflight
pnpm check:matsuri:search-engine-submission-record
pnpm check:matsuri:analytics-activation-record
```

## Verification layers

### Canonical Workers artifact

```text
pnpm verify:matsuri:workers
```

This layer:

- validates the deployment topology,
- validates `wrangler.jsonc`,
- builds with the verified canonical origin,
- checks required routes and assets,
- verifies `manifest.site_origin`,
- verifies canonical sitemap locations,
- checks public-output consistency.

### Origin-neutral repository artifact

```text
pnpm verify:release
pnpm freeze:matsuri:release
```

This layer rebuilds without `MATSURI_PUBLIC_ORIGIN`, verifies the complete repository contract, and freezes a reproducible origin-neutral artifact with per-file and aggregate hashes.

The release metadata separately records the active verified canonical origin, browser Search, crawler-reachability, Search Console submission, technical indexability, Analytics progression, and Jinja start-gate evidence.

### Canonical browser Search

```text
pnpm check:matsuri:canonical-search
```

This layer targets the live canonical origin without starting a local server. Desktop and mobile Chromium verify exact-name Search, result rendering, result navigation, structured filters, no-result behavior, and runtime error absence.

### Crawler reachability

```text
pnpm check:matsuri:crawler-reachability
```

This layer verifies the live `robots.txt`, sitemap discovery, sitemap routes, self-canonical metadata, indexing directives, representative User-Agent access, and public discovery files. It does not submit a sitemap or prove indexation.

### Search Console submission and technical indexability

```text
pnpm check:matsuri:search-engine-submission-record
pnpm check:matsuri:indexability-preflight
```

The submission-record validator checks the sanitized F2-24 evidence. The technical preflight independently verifies crawler-facing public routes. Neither command uses a search-engine owner account, and neither treats submission as proof of indexation.

### Analytics progression

```text
pnpm check:matsuri:analytics-activation-record
```

This validator preserves the current `pending-owner-access` state and rejects false F2-25, F2-26, or F2-27 completion claims.

## Static artifact integrity

The repository checks verify:

- every required public route,
- generated route inventory against `sitemap.xml`,
- internal HTML and asset links,
- Pagefind runtime and inputs,
- public JSON, manifest, version, Status, and State consistency,
- canonical-loader and HTML-projection bundle alignment,
- semantic record rules,
- Source and Evidence coverage,
- public-content boundaries,
- desktop, tablet, and mobile Chromium behavior,
- WCAG A/AA automated checks,
- GitHub Actions checkout/setup-node Node 24 runtime majors,
- the blocked Jinja start-gate boundary.

## Deployment topology

```text
yukue.badjoke-lab.com          → Worker yukue-portal — planned
matsuri-yukue.badjoke-lab.com  → Worker matsuri-yukue — verified
```

The gate rejects duplicate identities, path nesting below the portal, workers.dev canonical claims, and missing external verification evidence.

## External evidence

### Canonical origin

```text
Origin     https://matsuri-yukue.badjoke-lab.com
Workflow   Verify Matsuri canonical origin gate
Run        29191904624 — success
Attempt    1 of 18
```

### Canonical Search

```text
Workflow     Verify Matsuri canonical Search
Run          29193201911 — success
Job          86651403427 — success
Artifact ID  8260207484
```

### Crawler reachability

```text
Workflow     Verify Matsuri crawler reachability
Run          29230233384 — success
Artifact ID  8271238535
```

### Search Console and indexability

```text
Search Console sitemap status  success
Submitted                      2026-07-14
Last read                      2026-07-14
Discovered pages               20
Representative live test       indexable
Indexing requests              3 submitted
Technical preflight run        29232294960 — success
Indexation claimed             false
```

Evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md
docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md
docs/audits/matsuri-f2-24-search-console-2026-07-14.md
```

## What the current gate proves

- repository artifacts are reproducible and internally consistent,
- the production Workers artifact contains the exact canonical origin,
- the Custom Domain is reachable over HTTPS,
- required public files are served,
- manifest and sitemap canonical values are correct,
- Pagefind Search works interactively on desktop and mobile Chromium,
- crawler-facing production surfaces passed the recorded review,
- the Search Console sitemap was accepted with 20 discovered pages,
- the representative live test was technically indexable at the recorded time,
- three representative indexing requests were submitted,
- F2-16 through F2-24 are complete.

## What it does not prove

- that any URL is indexed,
- Web Analytics activation,
- a post-activation deployment,
- production traffic recording,
- final launch completion.

Those remain separated across F2-25 through F2-28. F2-25 is currently blocked only by owner Cloudflare access.
