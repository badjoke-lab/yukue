# Release Verification

**Status:** Repository, canonical deployment, and browser Search baseline through F2-22

## Commands

```text
pnpm verify:matsuri:workers
pnpm verify:release
pnpm freeze:matsuri:release
pnpm gate:matsuri:repository
pnpm check:matsuri:canonical-search
```

## Verification layers

### Canonical Workers artifact

```text
pnpm verify:matsuri:workers
```

This layer validates the deployment topology and `wrangler.jsonc`, builds with the verified canonical origin, checks required routes and assets, verifies `manifest.site_origin` and canonical sitemap locations, and checks public-output consistency.

### Origin-neutral repository artifact

```text
pnpm verify:release
pnpm freeze:matsuri:release
```

This layer rebuilds without `MATSURI_PUBLIC_ORIGIN`, verifies the complete repository contract, and freezes a reproducible origin-neutral artifact with per-file and aggregate hashes.

Release metadata separately records the active canonical origin and the live browser Search evidence.

### Canonical browser Search

```text
MATSURI_CHECK_ORIGIN=https://matsuri-yukue.badjoke-lab.com \
pnpm check:matsuri:canonical-search
```

This external layer uses Chromium against the live canonical origin and verifies:

- exact Japanese query execution,
- URL query-state updates,
- Pagefind result rendering,
- expected result identity,
- same-origin detail navigation,
- destination H1 identity,
- prefecture filtering,
- the public empty-result state,
- zero page errors,
- zero console errors,
- zero same-origin application request failures,
- screenshot and JSON evidence generation.

## Workspace contract

The verifier discovers packages under:

```text
apps/*
packages/*
```

Every workspace must provide its required build and validation scripts. Missing release-critical scripts fail before verification stages start.

## Static artifact integrity

The Matsuri checks verify:

- every required public route,
- generated route inventory against `sitemap.xml`,
- internal HTML and asset links,
- Pagefind runtime and inputs,
- public JSON, manifest, version, Status, and State consistency,
- semantic record rules,
- Source and Evidence coverage,
- public-content boundaries,
- desktop, tablet, and mobile Chromium behavior,
- WCAG A/AA automated checks.

## Deployment topology

```text
yukue.badjoke-lab.com          → Worker yukue-portal — planned
matsuri-yukue.badjoke-lab.com  → Worker matsuri-yukue — verified
```

The gate rejects duplicate identities, path nesting below the portal, workers.dev canonical claims, missing canonical verification evidence, and missing browser Search evidence.

## External evidence

### Canonical HTTP

```text
Origin     https://matsuri-yukue.badjoke-lab.com
Workflow   Verify Matsuri canonical origin gate
Run        29191904624 — success
```

### Canonical browser Search

```text
Workflow   Verify Matsuri canonical browser Search
Run        29227617530 — success
Browser    Chromium
Exact      脚折雨乞 → 1 result
Filtered   雨乞 + 埼玉県 → 1 result
Empty      0 results
```

Evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
docs/audits/matsuri-f2-22-browser-search-2026-07-13.md
```

## What the current gate proves

- repository artifacts are reproducible and internally consistent,
- the production Workers artifact contains the exact canonical origin,
- the Custom Domain is reachable over HTTPS,
- required public files are served,
- manifest and sitemap canonical values are correct,
- Pagefind queries, filtering, result rendering, result navigation, and empty-state behavior work in live Chromium,
- F2-16 through F2-22 are complete.

## What it does not prove

- crawler policy and crawler-visible behavior beyond the completed checks,
- search-engine submission or indexation,
- Web Analytics activation,
- production traffic recording,
- final launch completion.

Those remain F2-23 through F2-28.
