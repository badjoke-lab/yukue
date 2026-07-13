# Matsuri F2-23 Crawler Reachability Verification

**Verification date:** 2026-07-13  
**Status:** Passed  
**Canonical origin:** `https://matsuri-yukue.badjoke-lab.com`

## Purpose

This audit records the external evidence required to complete F2-23. It verifies the published crawler policy, canonical sitemap, exact self-canonical metadata, indexing directives, public route reachability, representative User-Agent labels, and discovery files on the active canonical origin.

## Successful external execution

```text
Workflow
Verify Matsuri crawler reachability

Run ID
29230475619

Run number
12

Job
verify-crawler-reachability

Job ID
86753387839

Conclusion
success

Head branch
agent/f2-23-completion-record

Head SHA
62588bf5821cb5b86f5fc1b70d52dc0ca4c5c412

Pull-request merge test SHA
fe899d7004cc3f2c9b35df448c36750a7352b0dc
```

## Evidence artifact

```text
Artifact ID
8271321515

Artifact name
matsuri-crawler-reachability-fe899d7004cc3f2c9b35df448c36750a7352b0dc

Size
1716 bytes

Digest
sha256:ed678ef3be66522db2f54ff4fbec3a561297a7eea9a6ad75071cbec89acff648

Created
2026-07-13T06:57:08Z

Expires
2026-08-12T06:57:08Z
```

The artifact contains `report.json` and `report.md`.

## Verified robots policy

```text
HTTP status          200
Content-Type         text/plain
Public root allowed  true
Public root blocked  false
Sitemap              https://matsuri-yukue.badjoke-lab.com/sitemap.xml
```

The live `robots.txt` contains `User-agent: *`, `Allow: /`, no complete-site `Disallow: /`, and the exact canonical Sitemap directive.

## Verified sitemap and public routes

```text
Sitemap HTTP status       200
Sitemap Content-Type      application/xml
Sitemap locations         20
Canonical-origin only     true
Duplicate locations       0
Verified sitemap routes   20
```

Every sitemap route returned HTTP 200 and contained:

```text
<link rel="canonical" href="<exact self-canonical URL>">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
```

No route returned a blocking `X-Robots-Tag`.

## Representative User-Agent checks

```text
User-Agent labels     4
Representative paths  7
Total checks          28
Successful checks     28
```

Labels used:

```text
yukue-crawler-reachability/1.0
Googlebot
bingbot
OAI-SearchBot
```

Representative paths:

```text
/
/festivals/
/festivals/suneori-amagoi/
/search/
/methodology/
/data/
/status/
```

Every request returned HTTP 200, the exact self-canonical URL, index/follow metadata, and no blocking `X-Robots-Tag`.

## Discovery-file checks

```text
User-Agent labels  2
Discovery files    6
Total checks       12
Successful checks  12
```

Verified files:

```text
/robots.txt
/sitemap.xml
/llms.txt
/ai.txt
/version.json
/data/manifest.json
```

The generic verifier and `OAI-SearchBot` label both received HTTP 200 with the expected public content types.

## Initial failed run and remediation

The first hosted run was diagnostic evidence, not completion evidence:

```text
Run ID       29229537646
Job ID       86750575933
Conclusion   failure
Artifact ID  8271137175
```

It verified the robots policy and 20 canonical sitemap URLs, then failed because the Home page lacked a canonical link. The accepted remediation on `main` was:

```text
fad66e8ad20b4ea6a76769aa21b4dc8d5905231f
Emit canonical metadata for F2-23 crawler verification
```

The remediation added canonical Astro site configuration, exact self-canonical links, indexable robots metadata for canonical builds, `noindex,nofollow` for origin-neutral artifacts, and static verification in both build modes. The successful run above verifies the deployed result.

## Limitations

- Representative User-Agent labels do not prove access from a crawler operator's own network or verified IP ranges.
- `robots.txt` is a publication-policy signal, not an authentication or access-control boundary.
- This gate verifies reachability and indexing directives; it does not prove search-engine submission or indexation.

## Gate result

```text
F2-23  crawler-reachability review — completed
F2-24  search-engine sitemap submission and indexability check — next
F2-25 through F2-28 — hold
```

## Boundary

This audit does not claim sitemap submission, search-engine indexation, Cloudflare Web Analytics activation, production traffic recording, or final F2 launch completion.
