# Repository Launch Readiness

**Status:** Completed repository gate / external deployment held

## Decision

`祭のゆくえ` has completed the repository-side launch-preparation gate.

This means the reviewed canonical dataset, Public Projection, static site, Search artifact, machine-readable output, internal navigation, semantic rules, Evidence, public content, browser behavior, and release-candidate artifact have passed the unified repository checks.

It does not mean that a public production deployment exists.

## Gate command

Run:

```text
pnpm gate:matsuri:repository
```

The gate executes:

```text
pnpm verify:release
pnpm freeze:matsuri:release
node scripts/check-matsuri-readiness-gate.mjs
```

## Completed repository work

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
```

## Required passing state

The gate requires:

- all workspaces build,
- shared checks and typechecks pass,
- the exact Matsuri Pages artifact builds,
- required routes and local assets exist,
- internal links resolve,
- sitemap and route inventories match,
- JSON feeds, manifest, Status counts, State pages, and Pagefind inputs agree,
- the complete public corpus passes semantic checks,
- critical records have appropriate Source and Evidence coverage,
- Current State Evidence meets the freshness rule,
- public content and infrastructure status remain honest,
- image, empty-state, map, and external-link boundaries pass,
- all 20 public routes pass the desktop, tablet, and mobile Chromium audit,
- desktop and mobile pass the automated WCAG A/AA scan,
- the verified artifact freezes successfully,
- every frozen file and aggregate artifact digest revalidate,
- the release manifest records F2-16 through F2-28 as pending external work.

## Current operating state

```text
repository launch readiness   completed
public Cloudflare deployment  not performed
canonical production origin   not configured
production browser Search     not verified
crawler and indexability      not verified
Web Analytics                 not enabled
production traffic            not verified
```

## External hold

The following work remains under operational hold:

```text
F2-16  create or connect the Cloudflare Pages project
F2-17  first deployment and reachable URL
F2-18  deployed-origin smoke verification
F2-19  canonical origin and domain decision
F2-20  configure MATSURI_PUBLIC_ORIGIN and redeploy
F2-21  canonical manifest and sitemap verification
F2-22  production browser Search verification
F2-23  crawler-reachability review
F2-24  sitemap submission and indexability check
F2-25  Web Analytics activation
F2-26  post-activation deployment
F2-27  production traffic verification
F2-28  final F2 Launch Gate
```

None of these items becomes active merely because the repository gate is complete.

The hold is removed only through an explicit governing-document update.

## Maintenance while held

While external deployment remains held:

- keep approved Current State and scheduled Occurrence records fresh,
- accept reviewed factual corrections,
- preserve passing repository checks,
- regenerate the release candidate after any public code or data change,
- do not add new prelaunch product scope solely to fill the waiting period.

Stats, Compare, dynamic API, MCP, paid API, x402, D1 canonical storage, and real-time ingestion remain outside the MVP unless separately approved.
