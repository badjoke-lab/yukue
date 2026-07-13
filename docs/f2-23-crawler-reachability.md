# F2-23 Matsuri Crawler Reachability

**Status:** Repository implementation prepared / production deployment and external evidence pending

## Objective

Verify that the active Matsuri canonical origin exposes one internally consistent crawler-facing surface:

```text
https://matsuri-yukue.badjoke-lab.com
```

The gate covers:

- root `robots.txt`,
- exact canonical sitemap discovery,
- absolute canonical links on public HTML,
- indexable robots metadata,
- absence of crawler-specific HTTP denial or challenge pages,
- representative public HTML, JSON, and discovery files.

It does not submit the sitemap to a search engine and does not enable Analytics.

## Build behavior

### Canonical production artifact

```text
robots.txt       allow public crawling
Sitemap          exact canonical sitemap URL
HTML canonical   exact route URL
robots meta      index,follow
```

### Origin-neutral repository artifact

```text
robots.txt       Disallow: /
Sitemap          path-only locations
HTML canonical   omitted
robots meta      noindex,nofollow
```

This prevents an origin-neutral artifact from accidentally presenting itself as a second production origin.

## Repository validation

```text
pnpm check:matsuri:crawler-artifact
```

The command checks all generated HTML routes and requires the robots, canonical, robots-meta, and sitemap modes to agree with `MATSURI_PUBLIC_ORIGIN`.

## Live verification

```text
MATSURI_CRAWLER_ORIGIN=https://matsuri-yukue.badjoke-lab.com \
MATSURI_CRAWLER_REPORT=test-results/crawler/crawler-verification.json \
pnpm check:matsuri:crawler-live
```

Representative User-Agent requests:

```text
Googlebot
Bingbot
OAI-SearchBot
```

Representative public paths:

```text
/
/search/
/festivals/suneori-amagoi/
/data/manifest.json
/llms.txt
/ai.txt
```

The verifier fails on non-200 responses, redirects away from the exact canonical URL, challenge pages, `noindex` response headers, incorrect canonical tags, missing sitemap locations, duplicate sitemap locations, or non-canonical sitemap origins.

## Deployment workflow

```text
.github/workflows/verify-matsuri-crawler-reachability.yml
```

The workflow runs after a relevant push to `main`, allowing Cloudflare Workers Builds time to deploy the new static artifact. It retries up to 18 times at 30-second intervals and retains the JSON report for 30 days.

## Completion condition

F2-23 is complete only after:

1. this implementation is merged to `main`,
2. the production Workers deployment completes,
3. the crawler-reachability workflow succeeds,
4. the workflow run and artifact evidence are recorded,
5. release metadata and repository gates advance to F2-24.

## Boundary

A successful F2-23 gate does not establish:

- sitemap submission,
- search-engine ownership verification,
- indexation,
- search impressions,
- Web Analytics activation,
- production traffic recording,
- final F2 launch completion.

Those remain F2-24 through F2-28.
