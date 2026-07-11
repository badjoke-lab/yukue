# Deployment

**Status:** F2-16 active / external deployment sequence resumed

## Operational status

The repository-side deployment contract and verification tooling are implemented.

The external operational hold was removed on 2026-07-12.

Current work:

```text
F2-16  create or connect the Cloudflare Pages project
```

Pending external sequence:

```text
F2-17  first external deployment and reachable URL
F2-18  deployed-origin smoke verification
F2-19  canonical origin decision
F2-20  canonical-origin configuration and redeployment
F2-21  canonical verification
F2-22  production Search verification
F2-23  crawler reachability review
F2-24  sitemap submission and indexability check
F2-25  Web Analytics activation
F2-26  post-activation deployment
F2-27  production traffic verification
F2-28  final F2 Launch Gate
```

The operational dashboard procedure is defined in `docs/cloudflare-pages-launch-runbook.md`.

## Matsuri target

`祭のゆくえ` is deployed as a static Astro site on Cloudflare Pages.

The deployment contract keeps the existing static architecture:

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

Configure the Pages project from repository `badjoke-lab/yukue` with:

```text
Project name: matsuri-yukue
Production branch: main
Framework preset: None
Root directory: repository root / blank
Build command: pnpm build:matsuri:pages
Build output directory: apps/matsuri/dist
Build system: v3 / current default
```

Use the repository root as the Pages root directory because the Matsuri app consumes workspace packages from `packages/*` and root scripts.

The build command uses pnpm filtering to build the Matsuri workspace and its direct and transitive workspace dependencies.

Do not select `apps/matsuri` as the Pages root. Doing so would remove the root workspace context required by the build.

## Build environment

Set these Cloudflare Pages environment variables for both Production and Preview:

```text
NODE_VERSION=24
PNPM_VERSION=11.10.0
```

The repository also contains `.node-version` with `24`. The explicit dashboard value keeps the external build contract visible and avoids relying on build-image defaults.

The Cloudflare Pages v3 build image does not infer the desired pnpm version from the lockfile or the package-manager declaration, so `PNPM_VERSION` is required.

## Git integration boundary

Use Cloudflare Pages Git integration.

This enables:

- automatic production builds from `main`,
- preview deployments for pull requests and non-production branches,
- deployment records linked to Git commits.

A Git-integrated Pages project cannot later be converted into a Direct Upload project. Automatic deployments may be disabled later and Wrangler may deploy to the existing project if the operating model changes.

## Canonical origin boundary

Do not set `MATSURI_PUBLIC_ORIGIN` during F2-16 or the first deployment at F2-17.

The first successful Pages deployment establishes a reachable deployment URL. F2-19 then decides the canonical public origin before F2-20 configures:

```text
MATSURI_PUBLIC_ORIGIN=https://<canonical-origin>
```

This prevents preview deployment URLs or an unverified hostname from being treated as canonical origins in generated discovery files.

Normal repository release-readiness builds keep `MATSURI_PUBLIC_ORIGIN` unset until F2-20.

## Repository commands

Build the exact Pages target from the repository root:

```text
pnpm build:matsuri:pages
```

Validate the generated Pages artifact:

```text
pnpm check:matsuri:pages
```

Run the full repository target verification:

```text
pnpm verify:matsuri:pages
```

The artifact check requires the static site, Browse, Reference, Current State, and Search entry pages, Pagefind runtime, machine-readable JSON files, discovery text files, and sitemap to exist under `apps/matsuri/dist`.

Passing repository verification does not prove external deployment, canonical origin, browser Search, indexability, Analytics, or production traffic.

## First-deployment verification

After F2-17 produces the first reachable Cloudflare Pages deployment, use the manual GitHub Actions workflow:

```text
Verify Matsuri deployed origin
```

Inputs:

```text
origin     exact https://<deployment-host>
canonical  false
```

Equivalent command:

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

The check covers:

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

The HTTP verifier confirms deployed assets are reachable but does not emulate the browser Pagefind runtime. Browser Search remains F2-22.

## Canonical-origin verification

After F2-19 chooses the canonical public origin, F2-20 sets the Production build environment variable:

```text
MATSURI_PUBLIC_ORIGIN=https://<canonical-origin>
```

Deploy again, then run F2-21 strict canonical verification against that same origin:

```text
MATSURI_CHECK_ORIGIN=https://<canonical-origin> pnpm check:matsuri:canonical
```

or use the manual workflow with:

```text
canonical  true
```

Canonical mode requires:

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

These are F2-23 and F2-24. They cannot be completed against a local artifact or an unverified public origin.

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

After enabling Analytics, F2-26 requires a subsequent deployment. F2-27 then verifies that production traffic reaches the private analytics dashboard before the Analytics gate is complete.

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

## External launch order

```text
F2-16  create or connect the Cloudflare Pages project — active
F2-17  obtain the first reachable deployment URL — pending
F2-18  run deployed-origin smoke verification — pending
F2-19  decide the canonical public origin and domain — pending
F2-20  configure MATSURI_PUBLIC_ORIGIN and redeploy — pending
F2-21  run canonical manifest and sitemap verification — pending
F2-22  perform browser Pagefind Search verification — pending
F2-23  review robots, canonical, sitemap, and crawler reachability — pending
F2-24  submit the sitemap and check indexability — pending
F2-25  enable Cloudflare Web Analytics — pending
F2-26  deploy after Analytics activation — pending
F2-27  verify production traffic in the private dashboard — pending
F2-28  complete the final F2 Launch Gate — pending
```

Do not skip directly from Pages project creation to custom-domain, indexing, or Analytics work.
