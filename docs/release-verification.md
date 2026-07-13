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

The release metadata separately records the active verified canonical origin and canonical Search evidence.

### Canonical browser Search

```text
pnpm check:matsuri:canonical-search
```

This layer targets the live canonical origin without starting a local server. Desktop and mobile Chromium verify exact-name Search, result rendering, result navigation, structured filters, no-result behavior, and runtime error absence.

## Static artifact integrity

The repository checks verify:

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

The gate rejects duplicate identities, path nesting below the portal, workers.dev canonical claims, and missing external verification evidence.

## External canonical-origin verification

```text
Origin     https://matsuri-yukue.badjoke-lab.com
Workflow   Verify Matsuri canonical origin gate
Run        29191904624 — success
Attempt    1 of 18
```

Evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
```

## External canonical Search verification

```text
Origin       https://matsuri-yukue.badjoke-lab.com
Workflow     Verify Matsuri canonical Search
Run          29193201911 — success
Job          86651403427 — success
Artifact ID  8260207484
```

The browser gate verifies desktop and mobile Chromium interactions for `脚折雨乞`, result navigation, structured filters, no-result behavior, and absence of page or console errors.

Evidence:

```text
docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md
```

## What the current gate proves

- repository artifacts are reproducible and internally consistent,
- the production Workers artifact contains the exact canonical origin,
- the Custom Domain is reachable over HTTPS,
- required public files are served,
- manifest and sitemap canonical values are correct,
- Pagefind Search works interactively on desktop and mobile Chromium,
- the representative result navigates to the canonical Detail page,
- F2-16 through F2-22 are complete.

## What it does not prove

- crawler reachability or crawler-policy correctness,
- search-engine submission or indexation,
- Web Analytics activation,
- production traffic recording,
- final launch completion.

Those remain F2-23 through F2-28.
