# F2-24 Matsuri Sitemap Submission and Indexability

**Status:** Technical preflight implemented / search-engine owner action pending

## Objective

Submit the exact canonical Matsuri sitemap through an accepted search-engine owner account and record public-safe evidence that representative canonical URLs remain technically indexable.

```text
Canonical origin
https://matsuri-yukue.badjoke-lab.com

Canonical sitemap
https://matsuri-yukue.badjoke-lab.com/sitemap.xml
```

F2-24 separates four different facts:

1. the sitemap is publicly reachable,
2. an owner account can access the canonical property,
3. the sitemap was submitted successfully,
4. individual URLs may or may not already be indexed.

A submission result must not be represented as proof of indexation.

## Repository records

```text
config/matsuri-search-engine-submission.json
scripts/check-matsuri-search-engine-submission-record.mjs
scripts/check-matsuri-indexability-preflight.mjs
docs/templates/matsuri-f2-24-submission-evidence.md
```

The submission record initially remains:

```text
status: pending-owner-action
submitted: false
f2_24_complete: false
```

No automated or documentation-only change may set it to complete without owner-account evidence.

## Technical preflight

```text
MATSURI_CHECK_ORIGIN=https://matsuri-yukue.badjoke-lab.com \
  pnpm check:matsuri:indexability-preflight
```

The preflight verifies:

- HTTPS canonical origin,
- reachable `robots.txt`,
- exact canonical Sitemap directive,
- reachable `sitemap.xml`,
- unique canonical-origin-only sitemap URLs,
- HTTP 200 and no redirect for each sitemap URL,
- exact self-canonical links,
- no blocking `meta robots` or `X-Robots-Tag`,
- non-empty page titles,
- exactly one H1 per public route.

The preflight writes:

```text
artifacts/matsuri-indexability-preflight/report.json
artifacts/matsuri-indexability-preflight/report.md
```

It explicitly records that search-engine submission was not performed.

## Accepted primary submission path

The initial F2-24 search engine is:

```text
Google Search Console
```

Use either:

- a verified Domain property covering `badjoke-lab.com`, or
- a verified URL-prefix property covering `https://matsuri-yukue.badjoke-lab.com/`.

Do not store the owner email, account identifier, verification token, or private property-management details in the repository.

## Owner-account procedure

1. Open Google Search Console.
2. Select a verified property covering the canonical origin.
3. Open the Sitemaps report.
4. Submit the exact canonical sitemap:

   ```text
   https://matsuri-yukue.badjoke-lab.com/sitemap.xml
   ```

5. Record the UTC submission time and the returned submission status.
6. Use URL Inspection for at least these representative routes:

   ```text
   https://matsuri-yukue.badjoke-lab.com/
   https://matsuri-yukue.badjoke-lab.com/festivals/suneori-amagoi/
   https://matsuri-yukue.badjoke-lab.com/data/
   ```

7. Run the live test for each representative URL and record whether the live URL is indexable.
8. Record the separate current index status as `indexed`, `not-indexed`, or `unknown` without converting it into a stronger claim.
9. Create a sanitized audit from the template.
10. Update `config/matsuri-search-engine-submission.json` and run the repository gate.

## Completion record requirements

F2-24 may be completed only when the machine-readable record establishes:

```text
status                         submitted-indexability-checked
ownership_verified             true
submitted                      true
submission_result              success
representative inspections     at least 3
all live test results          indexable
technical_indexability         verified
sitemap submission             verified
indexation claimed             false
f2_24_complete                 true
```

The audit document must exist under:

```text
docs/audits/matsuri-f2-24-*.md
```

## Privacy boundary

Public evidence may include:

- search engine name,
- property type,
- public canonical origin,
- public sitemap URL,
- UTC timestamps,
- sanitized submission result,
- representative public URLs,
- public-safe inspection summaries.

Public evidence must exclude:

- account email,
- account or owner identifier,
- verification token,
- private screenshots containing account UI identity,
- private property-management details.

## Remaining sequence

```text
F2-24  sitemap submission and indexability check — owner action pending
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

F2-25 must not begin until the F2-24 completion record passes validation.
