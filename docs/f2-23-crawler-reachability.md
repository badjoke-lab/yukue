# F2-23 Matsuri Crawler Reachability

**Status:** Gate implemented / canonical-link remediation deployed / external re-verification pending

## Objective

Verify that the canonical Matsuri production surface is reachable and indexable according to its published crawler-facing signals:

```text
https://matsuri-yukue.badjoke-lab.com
```

F2-23 follows the successful canonical-origin and browser Search gates. It verifies crawler-facing policy and live output without submitting the sitemap or claiming indexation.

## Public robots baseline

The static build generates:

```text
/robots.txt
```

Canonical production output must contain:

```text
User-agent: *
Allow: /

Sitemap: https://matsuri-yukue.badjoke-lab.com/sitemap.xml
```

The origin-neutral repository artifact keeps the allow policy but omits the absolute Sitemap directive because no production origin is active in that artifact.

`robots.txt` is a publication-policy signal. It is not authentication, authorization, rate limiting, or a private-route security boundary.

## Canonical HTML baseline

Every public HTML route in the canonical production artifact must contain one exact self-canonical link derived from:

```text
MATSURI_PUBLIC_ORIGIN
+ generated public route pathname
```

The origin-neutral repository artifact omits canonical links because it does not claim an active production origin.

## Verification command

```text
MATSURI_CHECK_ORIGIN=https://matsuri-yukue.badjoke-lab.com \
  pnpm check:matsuri:crawler-reachability
```

The command writes:

```text
artifacts/matsuri-crawler-reachability/report.json
artifacts/matsuri-crawler-reachability/report.md
```

## Required checks

### robots.txt

- HTTP success and non-empty text response,
- `User-agent: *`,
- `Allow: /`,
- no complete-site `Disallow: /`,
- exact canonical Sitemap directive.

### sitemap.xml

- HTTP success and XML response,
- at least one location,
- no duplicate locations,
- canonical origin only,
- no query strings or fragments,
- every sitemap URL responds with indexable HTML,
- every sitemap URL has an exact self-canonical link,
- no blocking `meta robots` or `X-Robots-Tag` directive.

### Representative User-Agent labels

The external gate repeats representative public-page requests with these labels:

```text
yukue-crawler-reachability/1.0
Googlebot
bingbot
OAI-SearchBot
```

This detects explicit User-Agent-dependent blocking from the public runner network. It does not prove access from a crawler operator's own network or verified IP ranges.

### Public discovery files

The gate verifies public access to:

```text
/robots.txt
/sitemap.xml
/llms.txt
/ai.txt
/version.json
/data/manifest.json
```

## Initial external finding and remediation

The first hosted run established that:

- `robots.txt` returned HTTP 200,
- the public root was allowed,
- the exact canonical Sitemap directive was present,
- `sitemap.xml` returned HTTP 200,
- the sitemap contained 20 canonical-origin URLs,
- no duplicate sitemap URLs were present.

It then failed on the first sitemap URL because the Home page had no canonical link.

The remediation:

- emits self-canonical links from the shared `PageShell` during canonical Matsuri builds,
- keeps origin-neutral builds free of canonical claims,
- verifies all generated HTML canonical links during repository artifact checks,
- re-runs the hosted crawler gate after Cloudflare deployment.

The failed run is diagnostic evidence only and does not complete F2-23.

## Evidence workflow

```text
Verify Matsuri crawler reachability
```

The workflow uploads the JSON and Markdown report for 30 days.

## Completion boundary

F2-23 is complete only after:

- the canonical production deployment contains the generated robots policy,
- every sitemap route contains the exact self-canonical link,
- the hosted crawler-reachability workflow succeeds,
- the successful workflow run and artifact are recorded in an audit document,
- release metadata and repository governance advance to F2-24.

## Remaining sequence

```text
F2-24  search-engine sitemap submission and indexability check
F2-25  Cloudflare Web Analytics activation
F2-26  post-activation deployment
F2-27  production traffic verification
F2-28  final F2 Launch Gate
```

F2-23 does not perform any of those actions.
