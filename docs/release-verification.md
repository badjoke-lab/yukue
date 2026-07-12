# Release Verification

**Status:** Repository and canonical deployment baseline through F2-21

## Commands

```text
pnpm verify:matsuri:workers
pnpm verify:release
pnpm freeze:matsuri:release
pnpm gate:matsuri:repository
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

The release metadata separately records the active verified canonical origin.

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

The gate rejects duplicate identities, path nesting below the portal, workers.dev canonical claims, and missing canonical verification evidence.

## External canonical verification

```text
Origin     https://matsuri-yukue.badjoke-lab.com
Workflow   Verify Matsuri canonical origin gate
Run        29191904624 — success
Attempt    1 of 18
```

The external verifier checks required HTML routes, Pagefind assets, public JSON, representative Entity data, exact `manifest.site_origin`, and canonical sitemap locations.

Evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
```

## What the current gate proves

- repository artifacts are reproducible and internally consistent,
- the production Workers artifact contains the exact canonical origin,
- the Custom Domain is reachable over HTTPS,
- required public files are served,
- manifest and sitemap canonical values are correct,
- F2-16 through F2-21 are complete.

## What it does not prove

- interactive Pagefind queries and result navigation in a browser,
- crawler behavior beyond fetched launch files,
- search-engine submission or indexation,
- Web Analytics activation,
- production traffic recording,
- final launch completion.

Those remain F2-22 through F2-28.
