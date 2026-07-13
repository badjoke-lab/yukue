# Matsuri F2-23 Crawler Reachability Verification

**Verification date:** 2026-07-13  
**Status:** Passed  
**Canonical origin:** `https://matsuri-yukue.badjoke-lab.com`

## Workflow evidence

```text
Workflow
Verify Matsuri crawler reachability

Run ID
29230233384

Conclusion
success

Artifact ID
8271238535

Artifact name
matsuri-crawler-reachability-781a6d11c17db2214f98c8607089c7039ce24b5f

Artifact digest
sha256:ae292efac09e25fc9ad0cefd0a7de3c40d4a38c28472734035d728ecd26f2506

Retention
30 days

Final PR-head revalidation run
29230870502 — success
```

The independent GitHub-hosted runner verified the production surface after the canonical metadata correction reached `main`. The final evidence branch was revalidated against the same production origin after the release metadata and governance records were updated.

## Verified crawler-facing signals

### robots.txt

The live response:

- returned successfully,
- declared `User-agent: *`,
- allowed the public site,
- did not contain a complete-site `Disallow: /`,
- advertised the exact canonical sitemap URL.

### Sitemap and canonical HTML

The gate verified:

- the sitemap returned valid XML,
- sitemap locations were unique,
- every location used the canonical origin,
- every sitemap URL responded successfully,
- every HTML page emitted an exact self-canonical link,
- no page emitted a blocking `meta robots` or `X-Robots-Tag`,
- no crawler request received a challenge page.

### Representative User-Agent labels

The public surface was checked using:

```text
yukue-crawler-reachability/1.0
Googlebot
bingbot
OAI-SearchBot
```

All representative requests succeeded from the GitHub-hosted runner network.

This confirms that the public configuration does not explicitly block those labels. It does not claim access from each crawler operator's verified IP ranges or guarantee future crawling.

### Public discovery files

The gate verified public access to:

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

This verification does not establish:

- sitemap submission to a search-engine account,
- ownership verification in a search console,
- indexation,
- search impressions or clicks,
- Web Analytics activation,
- production traffic recording,
- final F2 launch completion.

Those remain F2-24 through F2-28.
