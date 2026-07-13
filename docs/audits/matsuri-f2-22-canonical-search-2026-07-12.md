# Matsuri F2-22 Canonical Search Browser Verification

**Verification date:** 2026-07-12  
**Status:** Passed  
**Canonical origin:** `https://matsuri-yukue.badjoke-lab.com`

## Purpose

This audit records the external browser evidence required to complete F2-22. It verifies interactive Pagefind behavior on the active canonical origin rather than only HTTP reachability of `/search/` and Pagefind assets.

## External execution evidence

```text
Workflow
Verify Matsuri canonical Search

Run ID
29193201911

Run number
1

Job
verify-search

Job ID
86651403427

Conclusion
success

Head branch
agent/f2-22-canonical-search-verification

Head SHA
ec1a84bdf4321bee0c7ecbcc702abe3bbba81b9e

Pull-request merge test SHA
290d63e1b930616867e2108e393e2f5a537eeee8
```

Every workflow step completed successfully, including dependency installation, Chromium installation, canonical Search interaction tests, evidence upload, and verification summary generation.

## Evidence artifact

```text
Artifact ID
8260207484

Artifact name
matsuri-canonical-search-290d63e1b930616867e2108e393e2f5a537eeee8

Size
1232597 bytes

Digest
sha256:29c05992a887951d91caa8f5bd4588d88b0bac97230353cba4381ec4ff0eb884

Created
2026-07-12T12:51:44Z

Expires
2026-08-11T12:51:43Z
```

The artifact contains the Playwright HTML report and canonical Search test results, including successful interaction screenshots.

## Browser coverage

```text
desktop Chromium  1440 × 1000
mobile Chromium    390 × 844
```

## Verified query and navigation

```text
query
脚折雨乞

expected result
脚折雨乞

expected result path
/festivals/suneori-amagoi/
```

The successful run established that the canonical Search page loaded, Pagefind completed, the exact-name result rendered, the result used the expected path, navigation reached the canonical Detail URL, and the destination H1 identified `脚折雨乞`.

## Verified structured filters

```text
query       脚折雨乞
entity type festival
prefecture  11 / 埼玉県
state       active
```

The matching result remained visible. Changing the prefecture to `16 / 富山県` rendered the published no-result message with an empty result list.

## Runtime boundary

The browser tests fail on page-level JavaScript errors, console errors, failed navigation, missing Pagefind completion state, unexpected result URLs, or missing no-result behavior. The external run concluded successfully.

## Gate result

```text
F2-22  browser Pagefind Search verification — completed
F2-23  crawler-reachability review — next external gate
F2-24 through F2-28 — hold
```

## Boundary

This audit does not establish crawler reachability, search-engine sitemap submission, indexation, Web Analytics activation, production traffic recording, or final F2 launch completion. Those remain F2-23 through F2-28.
