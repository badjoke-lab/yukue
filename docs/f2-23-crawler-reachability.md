# F2-23 Matsuri Crawler Reachability

**Status:** Completed and externally verified

## Objective

Verify the crawler-facing policy, canonical metadata, sitemap inventory, indexing directives, and public reachability of:

```text
https://matsuri-yukue.badjoke-lab.com
```

F2-23 verifies live output without submitting the sitemap or claiming search-engine indexation.

## Published crawler baseline

Canonical production output includes:

```text
User-agent: *
Allow: /

Sitemap: https://matsuri-yukue.badjoke-lab.com/sitemap.xml
```

Every public HTML route includes an exact self-canonical link and indexable robots metadata. The origin-neutral repository artifact emits no canonical link and uses `noindex,nofollow` so it cannot present itself as another production origin.

Static verification:

```text
pnpm check:matsuri:canonical-metadata
```

Live verification:

```text
MATSURI_CHECK_ORIGIN=https://matsuri-yukue.badjoke-lab.com \
  pnpm check:matsuri:crawler-reachability
```

## Successful external evidence

```text
Workflow
Verify Matsuri crawler reachability

Run ID
29230475619

Job ID
86753387839

Conclusion
success

Head SHA
62588bf5821cb5b86f5fc1b70d52dc0ca4c5c412

Pull-request merge test SHA
fe899d7004cc3f2c9b35df448c36750a7352b0dc
```

Artifact:

```text
Artifact ID
8271321515

Artifact name
matsuri-crawler-reachability-fe899d7004cc3f2c9b35df448c36750a7352b0dc

Artifact digest
sha256:ed678ef3be66522db2f54ff4fbec3a561297a7eea9a6ad75071cbec89acff648
```

Detailed record:

```text
docs/audits/matsuri-f2-23-crawler-reachability-2026-07-13.md
```

## Verified result

```text
robots policy                         passed
canonical Sitemap directive           passed
sitemap locations                     20
canonical-origin-only locations       passed
duplicate locations                   0
sitemap routes with HTTP 200           20 / 20
exact self-canonical links             20 / 20
index/follow metadata                  20 / 20
blocking X-Robots-Tag                  0
representative User-Agent checks       28 / 28
discovery-file checks                  12 / 12
```

Representative labels were `yukue-crawler-reachability/1.0`, `Googlebot`, `bingbot`, and `OAI-SearchBot`. Discovery files were checked with generic and AI-search labels.

## Initial finding and remediation

The first hosted run `29229537646` verified robots and sitemap output, then failed because the Home page had no canonical link. Main commit:

```text
fad66e8ad20b4ea6a76769aa21b4dc8d5905231f
Emit canonical metadata for F2-23 crawler verification
```

added the required canonical and robots metadata plus static checks. Run `29230475619` verifies the corrected production deployment.

## Interpretation boundary

- User-Agent labels do not prove access from a crawler operator's verified network or IP ranges.
- `robots.txt` is not authentication or access control.
- F2-23 does not prove sitemap submission or indexation.

## Completion result

```text
F2-23  crawler-reachability review — completed
F2-24  search-engine sitemap submission and indexability check — next
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

The completion-record pull request must keep the repository, canonical-origin, browser Search, and live crawler gates green before merge.
