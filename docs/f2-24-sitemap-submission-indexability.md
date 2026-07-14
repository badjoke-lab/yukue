# F2-24 Matsuri Sitemap Submission and Indexability

**Status:** Completed

## Objective

Submit the exact canonical Matsuri sitemap through an accepted search-engine owner account and record public-safe evidence that the canonical production surface is technically indexable.

```text
Canonical origin
https://matsuri-yukue.badjoke-lab.com

Canonical sitemap
https://matsuri-yukue.badjoke-lab.com/sitemap.xml
```

F2-24 keeps these facts separate:

1. the sitemap is publicly reachable,
2. an owner account can access the canonical property,
3. the sitemap was submitted successfully,
4. Google can fetch and index a representative live URL,
5. indexing requests were submitted for representative URLs,
6. individual URLs may or may not already be indexed.

Successful submission or a successful live test must not be represented as proof of indexation.

## Repository records

```text
config/matsuri-search-engine-submission.json
scripts/check-matsuri-search-engine-submission-record.mjs
scripts/check-matsuri-indexability-preflight.mjs
docs/audits/matsuri-f2-24-search-console-2026-07-14.md
docs/templates/matsuri-f2-24-submission-evidence.md
```

## Technical preflight

```text
MATSURI_CHECK_ORIGIN=https://matsuri-yukue.badjoke-lab.com \
  pnpm check:matsuri:indexability-preflight
```

The preflight verifies every sitemap route for:

- HTTPS canonical origin,
- reachable `robots.txt`,
- exact canonical Sitemap directive,
- reachable `sitemap.xml`,
- unique canonical-origin-only sitemap URLs,
- HTTP 200 and no redirect,
- exact self-canonical links,
- no blocking `meta robots` or `X-Robots-Tag`,
- non-empty page titles,
- exactly one H1.

Accepted preflight evidence:

```text
Workflow     Verify Matsuri F2-24 indexability preflight
Run ID       29232294960
Conclusion   success
Artifact ID  8271994696
Digest       sha256:935f9c97644875f6be14498dc5dc0de700b1dd3026f98b4efe804ebc7976958d
Routes       20
```

## Search Console submission

The accepted primary search engine is Google Search Console.

Accepted property:

```text
Property type       URL-prefix
Canonical property  https://matsuri-yukue.badjoke-lab.com/
```

Accepted submission evidence:

```text
Sitemap            /sitemap.xml
Submitted date     2026-07-14
Last read date     2026-07-14
Submission result  success
Discovered pages   20
```

Search Console exposed a submission date rather than a precise submission timestamp. The public record therefore stores `submitted_on` and the UTC time at which the successful result was observed, without inventing an exact submission time.

## Representative URL evidence

The Google live test for the canonical home URL reported that:

- the URL could be indexed,
- crawling was allowed,
- page retrieval succeeded,
- indexing was allowed,
- the user-declared canonical was the canonical Matsuri home URL.

```text
URL
https://matsuri-yukue.badjoke-lab.com/

Checked at UTC
2026-07-14T14:13:45Z

Current index status
unknown

Live test result
indexable
```

Indexing requests were confirmed for:

```text
https://matsuri-yukue.badjoke-lab.com/
https://matsuri-yukue.badjoke-lab.com/festivals/suneori-amagoi/
https://matsuri-yukue.badjoke-lab.com/data/
```

## Evidence composition rule

F2-24 does not require three duplicate Google live tests when stronger complementary evidence covers the full route inventory.

The completion record combines:

1. an automated live preflight over all 20 sitemap routes,
2. a successful Search Console sitemap submission with 20 discovered pages,
3. at least one representative Google live test reporting `indexable`,
4. indexing-request confirmation for the three required representative URLs.

This rule verifies both full-site technical behavior and Google-specific behavior without converting registration requests into indexation claims.

## Completion record requirements

F2-24 is complete only when the machine-readable record establishes:

```text
status                         submitted-indexability-checked
ownership_verified             true
submitted                      true
submitted_on                   valid date
submission_result              success
discovered_pages               positive count
representative Google live test at least 1 and indexable
representative indexing requests at least 3
technical indexability         verified
sitemap submission             verified
indexation claimed             false
f2_24_complete                 true
```

The public-safe audit must exist under:

```text
docs/audits/matsuri-f2-24-*.md
```

## Privacy boundary

Public evidence may include:

- search engine name,
- property type,
- public canonical origin,
- public sitemap URL,
- public dates and UTC observation timestamps,
- sanitized submission result,
- discovered page count,
- representative public URLs,
- public-safe inspection summaries.

Public evidence must exclude:

- account email,
- account or owner identifier,
- verification token,
- private screenshots containing account identity,
- private property-management details.

## Completed result

```text
F2-24  sitemap submission and indexability check — completed
F2-25  Web Analytics activation — next
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

F2-25 may begin only after the completed submission record and the repository gate pass validation.
