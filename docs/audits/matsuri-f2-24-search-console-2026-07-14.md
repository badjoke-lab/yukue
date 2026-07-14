# Matsuri F2-24 Search Console Submission and Indexability Audit

**Audit date:** 2026-07-14  
**Result:** Passed  
**Scope:** Public-safe Google Search Console evidence for the canonical Matsuri origin

## Canonical target

```text
Canonical origin
https://matsuri-yukue.badjoke-lab.com

Canonical sitemap
https://matsuri-yukue.badjoke-lab.com/sitemap.xml
```

## Search Console property

```text
Search engine        Google Search Console
Property type        URL-prefix
Ownership access     verified by successful owner-session actions
```

No account email, owner identifier, verification token, or private property-management detail is retained in this audit.

## Sitemap submission

The Search Console Sitemaps report showed:

```text
Sitemap              /sitemap.xml
Submitted date       2026-07-14
Last read date       2026-07-14
Submission status    success
Discovered pages     20
```

The evidence was observed in the owner session on 2026-07-14. Search Console exposed the submission date, not a precise submission timestamp, so the machine-readable record preserves the observed date without inventing a time.

## Representative Google live test

```text
URL
https://matsuri-yukue.badjoke-lab.com/

Checked at UTC
2026-07-14T14:13:45Z

Method
google-search-console-url-inspection

Current index status
unknown

Live test result
indexable
```

Public-safe result summary:

- Google reported that the URL could be indexed.
- Crawling was allowed.
- Page retrieval succeeded.
- Indexing was allowed.
- The user-declared canonical was the canonical Matsuri home URL.
- No claim is made that Google had already indexed the URL.

## Registration requests

The owner confirmed that indexing requests were submitted for all three representative canonical URLs on 2026-07-14:

```text
https://matsuri-yukue.badjoke-lab.com/
https://matsuri-yukue.badjoke-lab.com/festivals/suneori-amagoi/
https://matsuri-yukue.badjoke-lab.com/data/
```

Request submission is recorded separately from indexation. It does not establish that any page is already indexed.

## Technical preflight evidence

```text
Workflow
Verify Matsuri F2-24 indexability preflight

Run ID
29232294960

Conclusion
success

Artifact ID
8271994696

Artifact digest
sha256:935f9c97644875f6be14498dc5dc0de700b1dd3026f98b4efe804ebc7976958d

Sitemap routes checked
20
```

The automated preflight verified every sitemap URL for HTTPS, canonical-origin-only inventory, HTTP 200 without redirect, exact self-canonical metadata, indexable robots directives, a non-empty title, and exactly one H1.

## Evidence interpretation

F2-24 uses complementary evidence rather than repeating the same live test for every representative route:

1. the automated preflight checks all 20 sitemap routes,
2. Search Console confirms successful sitemap acceptance and discovery of 20 pages,
3. a representative Google live test confirms Google-specific fetch and indexability behavior,
4. the owner confirms registration requests for the three required representative URLs.

```text
Technical indexability verified  true
Sitemap submission verified      true
Indexation claimed               false
F2-24 complete                   true
```

## Privacy review

```text
Account email retained                 no
Account or owner identifier retained   no
Verification token retained            no
Private screenshots committed          no
Only public URLs and sanitized facts   yes
```
