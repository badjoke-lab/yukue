# Deployment

**Status:** F2 launch-preparation baseline / external sequence on operational hold

## Operational status

The repository-side deployment contract and verification tooling are implemented.

The external sequence is currently under an operational hold:

```text
Cloudflare Pages project creation or connection
first external deployment
reachable deployment URL acquisition
canonical origin configuration
production Search verification
crawler and indexability checks
Web Analytics activation and traffic verification
```

Do not execute those steps, record a placeholder deployment URL, or select an external deployment item as current work until the hold is explicitly removed in `development-schedule.md`, `project-status.md`, and `decision-log.md`.

Repository-only launch readiness continues through F2-15. The instructions below are retained as the exact future execution contract for F2-16 through F2-28.

## Matsuri target

`祭のゆくえ` is deployed as a static Astro site on Cloudflare Pages when the external sequence resumes.

The deployment contract deliberately keeps the existing static architecture:

```text
reviewed canonical data
→ validation
→ approved Public Projection
→ Astro static HTML
→ Pagefind static index
→ machine-readable public files
→ Cloudflare Pages static hosting
```

No Cloudflare SSR adapter, Pages Functions, D1 canonical database, KV dependency, or runtime ingestion is required for the launch baseline.

## Cloudflare Pages project settings

When F2-16 becomes active, configure the Pages project from repository `badjoke-lab/yukue` with:

```text
Production branch: main
Root directory: /
Build command: pnpm build:matsuri:pages
Build output directory: apps/matsuri/dist
```

Use the repository root as the Pages root directory because the Matsuri app consumes workspace packages from `packages/*`.

The build command uses pnpm filtering to build the Matsuri workspace and its direct and transitive workspace dependencies.

## Build environment

Set these Cloudflare Pages environment variables for both Production and Preview unless a later deployment policy explicitly changes them:

```text
NODE_VERSION=24
PNPM_VERSION=11.10.0
```

Do not rely on the Cloudflare build image defaults for these versions.

## Canonical origin boundary

Do not set `MATSURI_PUBLIC_ORIGIN` during the repository baseline or first-deployment step.

The first successful Pages deployment establishes a reachable deployment URL. F2-19 then decides the canonical public origin before F2-20 configures:

```text
MATSURI_PUBLIC_ORIGIN=https://<canonical-origin>
```

This prevents preview deployment URLs from being treated as canonical origins in generated discovery files.

While external deployment is held, keep `MATSURI_PUBLIC_ORIGIN` unset for normal development and release-readiness builds. Do not invent a production origin to make canonical checks appear complete.

## Repository commands

Build the exact Pages target from the repository root:

```text
pnpm build:matsuri:pages
```

Validate the generated Pages artifact:

```text
pnpm check:matsuri:pages
```

Run both in sequence:

```text
pnpm verify:matsuri:pages
```

The artifact check requires the static site, Browse, Reference, Current State, and Search entry pages, Pagefind runtime, machine-readable JSON files, discovery text files, and sitemap to exist under `apps/matsuri/dist`.

Repository-only release readiness is governed by F2-07 through F2-15 in `development-schedule.md`. Passing the local artifact check does not claim that production deployment, canonical origin, browser Search, indexability, or analytics verification is complete.

## First-deployment verification

After F2-17 produces the first reachable Cloudflare Pages deployment, set the reachable deployment origin and run:

```text
MATSURI_CHECK_ORIGIN=https://<deployment-host> pnpm check:matsuri:deployed
```

The deployed check verifies that the main public HTML routes, Pagefind runtime, JSON feeds, discovery text files, and sitemap are reachable, return successful HTTP responses, use expected Content-Type families, and contain non-empty bodies.

It also requires:

- Matsuri site markers,
- a representative Entity record,
- a non-empty public Entity feed,
- Search HTML that references Pagefind assets,
- sitemap content with a valid `<urlset>` structure.

The check covers these public surfaces:

```text
/
/about/
/festivals/
/performances/
/organizations/
/regions/
/changes/
/states/
/search/
/methodology/
/data/
/status/
/pagefind/pagefind.js
/version.json
/data/manifest.json
/data/entities.json
/data/events.json
/data/relations.json
/data/occurrences.json
/llms.txt
/ai.txt
/sitemap.xml
```

After automated smoke verification, F2-22 also requires one browser Search UI check that returns at least one known Matsuri record. The HTTP verifier confirms deployed assets are reachable but does not emulate the browser Pagefind runtime.

## Canonical-origin verification

After F2-19 chooses the canonical public origin, F2-20 sets the Production build environment variable:

```text
MATSURI_PUBLIC_ORIGIN=https://<canonical-origin>
```

Deploy again, then run F2-21 strict canonical verification against that same origin:

```text
MATSURI_CHECK_ORIGIN=https://<canonical-origin> pnpm check:matsuri:canonical
```

Canonical mode performs the normal deployed checks and additionally requires:

```text
data/manifest.json site_origin == checked origin
all sitemap.xml <loc> values use the checked canonical origin
```

Do not use a branch preview URL as `MATSURI_PUBLIC_ORIGIN`.

## Crawler and indexability review

After canonical verification and browser Search verification:

1. confirm public routes are reachable without authentication,
2. confirm canonical markup uses the selected production origin,
3. confirm sitemap locations use the production origin,
4. confirm no accidental blocking rule prevents intended crawling,
5. confirm machine-readable public files remain reachable,
6. submit or register the sitemap only after the canonical production state is verified,
7. record indexability checks without claiming that indexing itself is guaranteed.

These are F2-23 and F2-24. They cannot be completed against a local artifact or a nonexistent public origin.

## Analytics baseline

The governing launch analytics baseline is defined in `docs/analytics.md`.

Cloudflare Web Analytics is enabled at the Pages project level only after F2-25 becomes active. Keep analytics credentials and site-specific configuration out of the repository.

Activation sequence:

```text
Cloudflare dashboard
→ Workers & Pages
→ Matsuri Pages project
→ Metrics
→ Web Analytics
→ Enable
→ next deployment
```

After enabling analytics, F2-26 requires a subsequent deployment. F2-27 then verifies that production traffic reaches the private analytics dashboard before the analytics gate is complete.

Do not treat repository build success, artifact verification, or deployed HTTP smoke success as proof that the private analytics dashboard is receiving traffic.

## Completed F2 public surfaces

The following reference and supporting Browse surfaces are implemented and included in the deployment artifact contract:

```text
/about/
/methodology/
/data/
/status/
/organizations/
/states/
/states/<state-code>/
```

## External launch sequence — operational hold

The future external sequence is fixed in this order:

```text
F2-16  create or connect the Cloudflare Pages project
F2-17  obtain the first reachable deployment URL
F2-18  run deployed-origin smoke verification
F2-19  decide the canonical public origin and domain
F2-20  configure MATSURI_PUBLIC_ORIGIN and redeploy
F2-21  run canonical manifest and sitemap verification
F2-22  perform browser Pagefind Search verification
F2-23  review robots, canonical, sitemap, and crawler reachability
F2-24  submit the sitemap and check indexability
F2-25  enable Cloudflare Web Analytics
F2-26  deploy after analytics activation
F2-27  verify production traffic in the private dashboard
F2-28  complete the final F2 Launch Gate
```

Until the operational hold is explicitly removed:

- do not create or connect the Pages project as part of this schedule,
- do not issue or record a public deployment URL,
- do not choose a canonical production origin,
- do not run production-only verification,
- do not claim Analytics or indexing gates are complete.
