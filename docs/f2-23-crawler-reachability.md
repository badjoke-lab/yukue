# F2-23 Matsuri Crawler Reachability

**Status:** Completed and externally verified

## Objective

Verify that the canonical Matsuri production surface is reachable and indexable according to its published crawler-facing signals:

```text
https://matsuri-yukue.badjoke-lab.com
```

F2-23 verifies crawler-facing policy and live output without submitting the sitemap or claiming indexation.

## Canonical crawler surface

Production output includes:

```text
/robots.txt
/sitemap.xml
```

`robots.txt` allows the public site and advertises:

```text
Sitemap: https://matsuri-yukue.badjoke-lab.com/sitemap.xml
```

Every public sitemap route emits:

```text
<link rel="canonical" href="<exact canonical route URL>">
<meta name="robots" content="index,follow,...">
```

Origin-neutral repository artifacts emit no canonical link and use `noindex,nofollow`.

Static validation:

```text
pnpm check:matsuri:canonical-metadata
```

## External verification evidence

```text
Workflow
Verify Matsuri crawler reachability

Run ID
29230233384

Conclusion
success

Artifact ID
8271238535

Artifact digest
sha256:ae292efac09e25fc9ad0cefd0a7de3c40d4a38c28472734035d728ecd26f2506
```

Detailed audit:

```text
docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md
```

## Verified scope

### robots.txt

- successful response,
- `User-agent: *`,
- public `Allow: /`,
- no complete-site `Disallow: /`,
- exact canonical Sitemap directive.

### sitemap and HTML

- valid XML response,
- unique canonical-origin locations,
- no query strings or fragments,
- successful responses for sitemap routes,
- exact self-canonical links,
- no blocking `meta robots` or `X-Robots-Tag`,
- no challenge pages.

### Representative User-Agent labels

```text
yukue-crawler-reachability/1.0
Googlebot
bingbot
OAI-SearchBot
```

All representative requests succeeded from the GitHub-hosted runner network. This does not guarantee future crawling or prove access from a crawler operator's verified IP ranges.

### Public discovery files

```text
/robots.txt
/sitemap.xml
/llms.txt
/ai.txt
/version.json
/data/manifest.json
```

## Gate result

```text
F2-23  robots, canonical, sitemap, crawler-reachability review — completed
F2-24  search-engine sitemap submission and indexability check — next
```

## Boundary

F2-23 does not establish sitemap submission, search-engine ownership, indexation, impressions, Analytics activation, production traffic, or final F2 launch completion.

Those remain F2-24 through F2-28.
