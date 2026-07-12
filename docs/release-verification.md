# Release Verification

**Status:** F2 repository baseline / deployment topology enforced by repository gate

## Purpose

`pnpm verify:release` is the single repository command for verifying a Matsuri static release candidate before or between external deployments.

It does not deploy the site and does not require an active custom domain, canonical production origin, analytics access, or search-engine account access.

The complete repository gate is:

```text
pnpm gate:matsuri:repository
```

The gate validates the accepted Yukue deployment topology before release verification and freezing.

## Commands

Run from the repository root after installing dependencies:

```text
pnpm install --no-frozen-lockfile
pnpm verify:release
```

Full gate:

```text
pnpm gate:matsuri:repository
```

Topology-only check:

```text
pnpm check:yukue:deployment-topology
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
- the repository root to define the release-critical Matsuri build and verification scripts.

The Astro applications currently use their production build as their compile-time validation boundary and do not define separate `check` or `typecheck` scripts. The verifier reports those omissions explicitly instead of allowing recursive `--if-present` commands to skip them silently.

A missing required script fails before the release stages start.

## Verification stages

`pnpm verify:release` runs these stages in order:

```text
1. pnpm build
2. pnpm check
3. pnpm typecheck
4. pnpm verify:matsuri:pages
5. node --check scripts/check-matsuri-deployed.mjs
```

The historical `verify:matsuri:pages` name now verifies the static artifact used by Workers Static Assets. It does not mean that the legacy Pages product is the accepted deployment platform.

Stage 4 rebuilds the exact Matsuri static target and runs artifact integrity, public-output consistency, corpus semantic checks, Source and Evidence checks, public-content checks, and browser checks.

The command stops on the first failed stage and reports the stage name and exit condition.

## Deployment topology check

`pnpm check:yukue:deployment-topology` validates:

```text
yukue.badjoke-lab.com          → Worker yukue-portal
matsuri-yukue.badjoke-lab.com  → Worker matsuri-yukue
```

It also validates the future hostname convention, unique Worker names, unique origins, separate public sites, no specialist-site path nesting below the portal, workers.dev non-canonical status, and later dedicated-domain migration support.

The machine-readable contract is:

```text
config/yukue-deployment-topology.json
```

## Static artifact integrity

The Matsuri artifact check verifies:

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

Public route discovery is based on generated `index.html` files rather than a second manually maintained route list. The required-route list remains a minimum launch contract, while the generated-route inventory catches newly added pages that were not added to the sitemap.

External links, fragment-only links, and non-HTTP schemes such as `mailto:` are outside the local artifact link check.

## Public-output consistency

`pnpm check:matsuri:consistency` cross-checks outputs generated from the approved Public Projection.

It verifies:

- version, manifest, and every JSON feed use the same project, site, dataset, and schema markers,
- manifest file inventory matches the declared machine-readable baseline,
- manifest record counts equal feed `record_count` values and actual array lengths,
- feed record IDs are unique,
- public Status HTML counts equal the JSON feeds and derived Current State count,
- each `/states/<state-code>/` page contains exactly the Entities whose public JSON Current State has that code,
- State-page rows expose the same Entity ID and Current State code used by public JSON,
- Pagefind input contains exactly the searchable Festival, Tradition Unit, and Folk Performance records,
- Pagefind Entity Type, Current State, and result URL agree with public JSON,
- the Pagefind verification sidecar is generated outside the deployable `dist` directory,
- development builds omit `manifest.site_origin` and use path-only sitemap locations when `MATSURI_PUBLIC_ORIGIN` is unset,
- configured builds use the exact non-placeholder origin in both manifest and sitemap.

The build-only Pagefind sidecar is stored under `apps/matsuri/.build-verification/`, excluded from Git, and not included in the Workers Static Assets directory.

## Corpus semantic audit

`pnpm check:matsuri:semantics` assembles the complete reviewed Matsuri dataset, runs the shared cross-record validator, and then applies launch-specific semantic checks.

The audit verifies:

- public records carrying `review_status` are approved,
- canonical Entity records do not store derived Current State directly,
- Current State derives from approved State Snapshots and matches public JSON,
- `revived` and `active_modified` are not used as Current State values,
- State Snapshots do not contain Occurrence outcomes,
- Occurrences do not contain Entity State or Change Event fields,
- Change Events do not contain Occurrence-only fields,
- Change Event resulting State Snapshots belong to the same subject Entity,
- a revival-completion Event does not point to a non-active resulting State Snapshot,
- a past Occurrence is not left with `outcome: scheduled`,
- Relations are not self-relations and do not use generic association codes,
- likely duplicate identities are detected by normalized preferred name, Entity Type, and geographic scope,
- same-name cross-type identity splits have an explicit Relation,
- Designation data remains in separate Designation records.

The audit date defaults to the current UTC build date. A reproducible date can be supplied with:

```text
MATSURI_AUDIT_DATE=YYYY-MM-DD pnpm check:matsuri:semantics
```

### Versioned correction layer

Confirmed public corrections may be stored under `data/public/matsuri/f2/` as full replacement records with the same stable ID and a higher `record_version`.

The canonical dataset loader rejects a correction when:

- the stable ID does not already exist,
- the replacement does not increase `record_version`.

This keeps the original reviewed batch visible while ensuring the current Public Projection uses only the latest accepted record version.

## CI contract

GitHub Actions installs the pinned Node.js and pnpm versions, installs dependencies, and runs:

```text
pnpm gate:matsuri:repository
```

The gate validates topology, Workers configuration, the release contract, the frozen artifact, current status documents, completed work through F2-19, and pending work from F2-20.

The workflow preserves `release-verification.log` as a short-lived artifact when verification fails.

## Deployed-origin verification

External HTTP verification is performed separately from the repository gate.

Manual GitHub Actions workflow:

```text
Verify Matsuri deployed origin
```

Inputs:

```text
origin     exact deployed origin
canonical  false for workers.dev verification; true after F2-20
```

The workflow executes `scripts/check-matsuri-deployed.mjs` with `MATSURI_CHECK_ORIGIN` and optionally `--canonical`.

## Current canonical boundary

F2-19 decided:

```text
https://matsuri-yukue.badjoke-lab.com
```

This is not yet an active build origin.

Until F2-20:

```text
MATSURI_PUBLIC_ORIGIN  unset
manifest.site_origin   absent
active canonical       none
```

After F2-20 attaches the domain and redeploys, the deployed-origin workflow may be run with `canonical=true`.

## What a passing repository gate proves

A passing gate establishes that:

- the accepted public deployment topology is internally consistent,
- all discovered workspaces satisfy the declared script contract,
- workspace builds pass,
- shared-package checks and typechecks pass,
- the exact Matsuri static build completes,
- required static routes and public files exist,
- generated public routes and sitemap routes agree,
- generated public HTML contains no broken local targets,
- JSON feeds, manifest counts, Status counts, State pages, Pagefind inputs, and sitemap-origin mode agree,
- the complete launch corpus passes the semantic audit,
- the release candidate records F2-19 as decided but canonical activation as pending,
- the deployed-site verifier is syntactically valid.

## What a passing repository gate does not prove

It does not establish:

- that `matsuri-yukue.badjoke-lab.com` is attached to the Worker,
- that `MATSURI_PUBLIC_ORIGIN` is configured in Workers Builds,
- that the active canonical markup and sitemap locations are correct on the custom domain,
- that browser Pagefind Search works on the custom domain,
- that crawlers or search engines can reach or index the site,
- that Cloudflare Web Analytics is enabled,
- that production traffic is recorded.

Those are external F2-20 through F2-28 tasks.
