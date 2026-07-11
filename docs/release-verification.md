# Release Verification

**Status:** F2 repository baseline

## Purpose

`pnpm verify:release` is the single repository command for verifying a Matsuri release candidate before external deployment.

It does not deploy the site and does not require a Cloudflare Pages project, deployment URL, canonical production origin, analytics account access, or search-engine account access.

## Command

Run from the repository root after installing dependencies:

```text
pnpm install --no-frozen-lockfile
pnpm verify:release
```

## Workspace contract preflight

Before running build or validation commands, the verifier discovers package manifests under:

```text
apps/*
packages/*
```

The preflight requires:

- every discovered workspace to define `build`,
- every shared package under `packages/*` to define `check`,
- every shared package under `packages/*` to define `typecheck`,
- the repository root to define the release-critical Matsuri build and artifact scripts.

The Astro applications currently use their production build as their compile-time validation boundary and do not define separate `check` or `typecheck` scripts. The verifier reports those omissions explicitly instead of allowing the recursive `--if-present` commands to skip them silently.

A missing required script fails before the release stages start.

## Verification stages

The command runs these stages in order:

```text
1. pnpm build
2. pnpm check
3. pnpm typecheck
4. pnpm verify:matsuri:pages
5. node --check scripts/check-matsuri-deployed.mjs
```

Stage 4 rebuilds the exact Matsuri Pages target and verifies the generated static artifact. This intentionally preserves the Pages-specific build contract even after the full workspace build has passed.

The command stops on the first failed stage and reports the stage name and exit condition.

## Static artifact integrity

The Matsuri Pages artifact check verifies:

- every required Home, Browse, Reference, Search, Current State, and published Detail route,
- the Pagefind runtime and baseline machine-readable files,
- every generated public `index.html` route against `sitemap.xml`,
- duplicate sitemap locations,
- sitemap locations without generated HTML,
- generated HTML routes missing from the sitemap,
- every internal `href` target found in generated public HTML,
- internal links to static assets,
- links to unpublished Shrine or Temple detail surfaces,
- Matsuri `site_id` markers in the manifest and version files.

Public route discovery is based on generated `index.html` files rather than a second manually maintained route list. The required-route list remains as a minimum launch contract, while the generated-route inventory catches newly added pages that were not added to the sitemap.

External links, fragment-only links, and non-HTTP schemes such as `mailto:` are outside the local artifact link check.

## CI contract

GitHub Actions installs the pinned Node.js and pnpm versions, installs dependencies, and runs:

```text
pnpm verify:release
```

CI and local release-candidate verification therefore use the same top-level command rather than maintaining separate command lists.

## What this proves

A passing release verification establishes that:

- all discovered workspaces satisfy the declared script contract,
- workspace builds pass,
- shared-package checks pass,
- shared-package typechecks pass,
- the exact Matsuri Pages build completes,
- required static routes and public files exist in the Pages artifact,
- generated public routes and sitemap routes agree,
- generated public HTML contains no broken local `href` targets,
- generated public HTML does not link to unpublished Shrine or Temple detail surfaces,
- the deployed-site verifier is syntactically valid.

## What this does not prove

A passing repository verification does not establish:

- that a Cloudflare Pages project exists,
- that a public deployment URL is reachable,
- that the canonical public origin is configured,
- that canonical markup and sitemap locations are correct in production,
- that browser Pagefind Search works on the deployed origin,
- that crawlers or search engines can reach or index the site,
- that Cloudflare Web Analytics is enabled,
- that production traffic reaches a private analytics dashboard.

Those remain external F2-16 through F2-28 tasks and stay under the operational hold defined in the governing schedule.
