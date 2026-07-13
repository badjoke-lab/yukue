# Matsuri F2-22 Canonical Browser Search Verification

**Verification date:** 2026-07-13  
**Status:** Passed  
**Canonical origin:** `https://matsuri-yukue.badjoke-lab.com`

## Independent browser evidence

GitHub Actions executed the live Search gate from a hosted Ubuntu runner with Chromium.

```text
Workflow
Verify Matsuri canonical browser Search

Run ID
29227617530

Job
verify-canonical-browser-search

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

## Exact-query result

```text
Query
脚折雨乞

Status
1件の記録が見つかりました。

Rendered result count
1

Matched title
脚折雨乞

Matched href
/festivals/suneori-amagoi/
```

The browser followed the generated result link and verified:

```text
Destination URL
https://matsuri-yukue.badjoke-lab.com/festivals/suneori-amagoi/

Destination H1
脚折雨乞
```

This establishes interactive Pagefind execution, result rendering, same-origin result navigation, and destination identity.

## Filtered-query result

```text
Query
雨乞

Prefecture label
埼玉県

Prefecture value
11

Status
1件の記録が見つかりました。

Rendered result count
1

Matched title
脚折雨乞

Matched href
/festivals/suneori-amagoi/
```

This establishes that the public prefecture filter is applied together with the Pagefind query and preserved in the Search URL.

## Empty-result behavior

```text
Query
f2x22xcanonicalxsearchxnoresultx9d7e

Rendered result count
0

Status
条件に一致する記録はありません。検索語や絞り込み条件を変更してください。
```

This establishes the public no-result state and confirms that stale prior results are removed.

## Browser and request result

```text
Page errors                              0
Console errors                           0
Same-origin application request failures 0
Ignored aborted Cloudflare RUM requests  2
Screenshots                              4
```

The two ignored requests were:

```text
POST /cdn-cgi/rum
net::ERR_ABORTED
```

They occurred during navigation and were classified as cancelled Cloudflare telemetry rather than Search, Pagefind, public-data, or destination failures. No other same-origin failure was ignored.

## Screenshot inventory

```text
01-exact-query.png
02-result-detail.png
03-filtered-query.png
04-empty-result.png
```

## Gate result

```text
F2-22  canonical browser Pagefind Search verification — completed
F2-23  robots, canonical, sitemap, and crawler-reachability review — next gate
F2-24 through F2-28 — hold
```

## Boundary

This verification does not establish:

- crawler access policy correctness,
- search-engine sitemap submission,
- search-engine indexation,
- Cloudflare Web Analytics activation,
- production traffic recording,
- final F2 launch completion.

Those remain F2-23 through F2-28.
