# Repository Launch Readiness

**Status:** Completed repository gate / F2-19 canonical topology accepted

## Decision

`祭のゆくえ` has completed the repository-side launch-preparation gate.

This means the reviewed canonical dataset, Public Projection, static site, Search artifact, machine-readable output, internal navigation, semantic rules, Evidence, public content, browser behavior, release-candidate artifact, and accepted deployment topology have passed the unified repository checks.

The first exhaustive successful-render visual-review baseline is also implemented and reviewed.

It does not mean that the custom domain or public production launch is complete.

## Gate command

Run:

```text
pnpm gate:matsuri:repository
```

The gate executes:

```text
pnpm check:yukue:deployment-topology
pnpm check:matsuri:workers-config
pnpm verify:release
pnpm freeze:matsuri:release
node scripts/check-matsuri-readiness-gate.mjs
```

## Completed repository and maintenance work

```text
F2-07  unified release verification
F2-08  static route and internal-link integrity
F2-09  HTML, JSON, Search, and sitemap consistency
F2-10  public data semantic audit
F2-11  Source and Evidence audit
F2-12  responsive and accessibility browser audit
F2-13  public content, empty-state, and image-boundary audit
F2-14  release-candidate artifact freeze
F2-15  Repository Launch Readiness Gate
F2-M01 full-page screenshot visual-review workflow
F2-M02 Matsuri data freshness audit
```

## Required passing state

The repository gate requires:

- the accepted portal and specialist-site topology validates,
- portal and Matsuri Worker names and hostnames remain distinct,
- specialist sites are not nested under a portal path,
- all workspaces build,
- shared checks and typechecks pass,
- the exact Matsuri static artifact builds,
- required routes and local assets exist,
- internal links resolve,
- sitemap and route inventories match,
- JSON feeds, manifest, Status counts, State pages, and Pagefind inputs agree,
- the complete public corpus passes semantic checks,
- critical records have appropriate Source and Evidence coverage,
- Current State Evidence meets the freshness rule,
- public content and infrastructure status remain honest,
- image, empty-state, map, and external-link boundaries pass,
- all public routes pass the desktop, tablet, and mobile Chromium audit,
- desktop and mobile pass the automated WCAG A/AA scan,
- the verified artifact freezes successfully,
- every frozen file and aggregate artifact digest revalidate,
- the release manifest records F2-16 through F2-19 as completed external work,
- the release manifest records F2-20 through F2-28 as pending,
- the accepted Matsuri hostname is recorded as a decision but not as an active canonical origin.

The screenshot workflow remains separate because successful-render retention and human visual review are not deterministic release-integrity checks.

## Current operating state

```text
repository launch readiness   completed
visual-review baseline        implemented and reviewed
F2-M02 data audit             completed
Workers deployment            reachable and verified
F2-19 hostname decision       completed
Matsuri custom domain         not attached
MATSURI_PUBLIC_ORIGIN         unset
active canonical origin       none
production browser Search     not verified
crawler and indexability      not verified
Web Analytics                 not enabled
production traffic            not verified
```

## Accepted topology

```text
yukue.badjoke-lab.com          portal
matsuri-yukue.badjoke-lab.com  Matsuri
```

```text
apps/portal   → Worker yukue-portal
apps/matsuri  → Worker matsuri-yukue
```

The portal is the series entrance. It does not serve Matsuri from a `/matsuri/` path.

Governing specification:

```text
docs/deployment-topology.md
```

Machine-readable contract:

```text
config/yukue-deployment-topology.json
```

## Visual-review baseline

F2-M01 added a successful-render review workflow without reopening product scope or changing the F2-15 release gate.

The workflow:

- builds the site in GitHub Actions,
- serves the local build without Cloudflare,
- captures every current public route on desktop and mobile,
- retains full-page PNGs, manifests, audits, ZIP files, and contact sheets,
- supports human review of hierarchy, whitespace, density, long-page structure, and mobile reading rhythm.

The governing specification is:

```text
docs/visual-review-workflow.md
```

The first review record is:

```text
docs/audits/matsuri-f2-m01-visual-review-2026-07-11.md
```

A green repository gate remains necessary but is not proof that subjective UI review is complete. Future non-trivial UI changes must generate and review a new screenshot artifact.

## External activation sequence

Completed:

```text
F2-16  Workers Builds connection
F2-17  first Workers Static Assets deployment and reachable URL
F2-18  deployed-origin smoke verification
F2-19  exact canonical Matsuri hostname decision
```

Pending:

```text
F2-20  attach custom domain, configure MATSURI_PUBLIC_ORIGIN, redeploy
F2-21  canonical manifest and sitemap verification
F2-22  production browser Search verification
F2-23  crawler-reachability review
F2-24  sitemap submission and indexability check
F2-25  Web Analytics activation
F2-26  post-activation deployment
F2-27  production traffic verification
F2-28  final F2 Launch Gate
```

The governing external runbook is:

```text
docs/cloudflare-pages-launch-runbook.md
```

F2-19 does not authorize canonical production claims. F2-20 must attach the exact hostname, set the exact HTTPS environment value, and redeploy before canonical verification begins.

## Maintenance during activation

- keep approved Current State and scheduled Occurrence records fresh,
- accept reviewed factual corrections,
- preserve passing repository checks,
- regenerate the release candidate after any public code or data change,
- capture and review successful full-page screenshots for non-trivial UI changes,
- keep deployment and canonical claims aligned with verified external evidence.

Stats, Compare, dynamic API, MCP, paid API, x402, D1 canonical storage, and real-time ingestion remain outside the MVP unless separately approved.
