# F2-22 Matsuri Canonical Browser Search Verification

**Status:** Completed and externally verified

## Objective

Verify that Pagefind Search works interactively on the active canonical Matsuri origin:

```text
https://matsuri-yukue.badjoke-lab.com
```

F2-20 and F2-21 established HTTPS reachability, canonical manifest output, and canonical sitemap output. F2-22 adds real-browser query, filter, result-rendering, result-navigation, and empty-state evidence.

## Verification result

```text
Workflow
Verify Matsuri canonical browser Search

Run ID
29227617530

Conclusion
success

Verified at
2026-07-13T05:58:53.795Z

Head commit
9bafec45f648e930b3673316ee9352aaf7122b83
```

Evidence artifact:

```text
matsuri-f2-22-browser-search-2fd5f4f5f1716d8f72e55f661eaa2c17f27a8ddd

Artifact ID
8270337394

Artifact SHA-256
367466dac434cc26bc755604d858ed70a1234e327e8d9b4ff9cdbf4bfc461e1a
```

Detailed audit:

```text
docs/audits/matsuri-f2-22-browser-search-2026-07-13.md
```

## Verified exact query

```text
Query                 脚折雨乞
Status                1件の記録が見つかりました。
Rendered results      1
Matched title         脚折雨乞
Matched href          /festivals/suneori-amagoi/
Destination URL       https://matsuri-yukue.badjoke-lab.com/festivals/suneori-amagoi/
Destination H1        脚折雨乞
```

The browser submitted the Search form, observed the URL query string, rendered the Pagefind result, followed the generated link, remained on the canonical origin, and confirmed the destination identity.

## Verified filtered query

```text
Query                 雨乞
Prefecture label      埼玉県
Prefecture value      11
Status                1件の記録が見つかりました。
Rendered results      1
Matched title         脚折雨乞
Matched href          /festivals/suneori-amagoi/
```

This confirms that the public prefecture filter is applied together with the Pagefind query and represented in the Search URL.

## Verified empty result

```text
Query
f2x22xcanonicalxsearchxnoresultx9d7e

Rendered results
0

Status
条件に一致する記録はありません。検索語や絞り込み条件を変更してください。
```

This confirms the public empty state and removal of stale prior results.

## Browser and request result

```text
Page errors                               0
Console errors                            0
Same-origin application request failures 0
Ignored aborted Cloudflare RUM requests   2
Screenshots                               4
```

Cloudflare may inject Real User Monitoring requests at:

```text
/cdn-cgi/rum
```

A `POST` to that path may be reported as `net::ERR_ABORTED` when Chromium leaves a page. The verifier records these navigation-cancelled telemetry requests separately. It does not ignore other methods, paths, failure types, Pagefind requests, public-data requests, HTML requests, or result-navigation failures.

## Verification command

```text
pnpm check:matsuri:canonical-search
```

Environment:

```text
MATSURI_CHECK_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

The script refuses a non-canonical origin by comparing it with `config/yukue-deployment-topology.json`.

## Evidence output

```text
.artifacts/matsuri-f2-22-search/
  report.json
  summary.md
  01-exact-query.png
  02-result-detail.png
  03-filtered-query.png
  04-empty-result.png
```

The JSON report records:

- gate ID,
- canonical origin,
- browser engine,
- verification time,
- exact-query result count,
- matched result title and href,
- destination URL and H1,
- filtered-query result count,
- empty-query status,
- same-origin application request failures,
- ignored aborted Cloudflare RUM requests,
- page errors,
- console errors,
- screenshot inventory.

## Completion decision

```text
F2-22  canonical browser Pagefind Search verification — completed
F2-23  crawler-reachability review — next gate
F2-24 through F2-28 — hold
```

## Remaining boundary

This gate does not:

- establish crawler access policy correctness,
- submit the sitemap,
- establish search-engine indexation,
- enable Cloudflare Web Analytics,
- prove production traffic,
- complete F2-23 through F2-28.
