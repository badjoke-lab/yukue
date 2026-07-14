# Matsuri F2-24 Sitemap Submission Evidence

**Template only — do not mark F2-24 complete from this file**

## Submission

```text
Search engine
Google Search Console

Property type
<domain | url-prefix>

Canonical origin
https://matsuri-yukue.badjoke-lab.com

Sitemap URL
https://matsuri-yukue.badjoke-lab.com/sitemap.xml

Submitted on
<YYYY-MM-DD>

Submission observed at UTC
<YYYY-MM-DDTHH:MM:SSZ>

Submission result
<success | failure>

Discovered pages
<positive integer>
```

Use a precise `submitted_at` timestamp only when the search-engine UI or another accepted source exposes it. Do not invent a time from a date-only submission record.

## Representative Google live test

Record at least one canonical public URL that was tested live by Google.

```text
URL
<public canonical URL>

Checked at UTC
<YYYY-MM-DDTHH:MM:SSZ>

Method
google-search-console-url-inspection

Current index status
<indexed | not-indexed | unknown>

Live test result
<indexable | not-indexable | not-run>

Public-safe note
<brief result without account identity or private UI data>
```

## Representative indexing requests

Record at least these three canonical public URLs:

```text
https://matsuri-yukue.badjoke-lab.com/
https://matsuri-yukue.badjoke-lab.com/festivals/suneori-amagoi/
https://matsuri-yukue.badjoke-lab.com/data/
```

For each URL:

```text
URL
<public canonical URL>

Requested
<true | false>

Confirmed on
<YYYY-MM-DD>

Public-safe note
<brief confirmation without account identity or private UI data>
```

An indexing request does not establish that a URL is already indexed.

## Technical preflight evidence

```text
Workflow
<Verify Matsuri F2-24 indexability preflight>

Run ID
<run ID>

Job ID
<job ID when available>

Conclusion
<success>

Artifact ID
<artifact ID>

Artifact digest
<sha256:...>

Sitemap routes checked
<count>
```

## Interpretation

Record these independently:

```text
Technical indexability verified  <true | false>
Sitemap submission verified      <true | false>
Indexation claimed               false
F2-24 complete                   <true | false>
```

Completion requires complementary evidence:

1. all sitemap routes pass the automated live preflight,
2. Search Console reports a successful sitemap submission,
3. at least one representative Google live test reports `indexable`,
4. indexing requests are confirmed for the three required representative URLs.

A successful sitemap submission, a successful live test, or a submitted indexing request does not establish that any page is already indexed.

## Privacy review

Confirm before publishing the audit:

```text
Account email removed                 yes
Account or owner identifier removed   yes
Verification token removed            yes
Private screenshots committed         no
Only public URLs retained              yes
```
