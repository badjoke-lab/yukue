# Matsuri F2-22 Canonical Search Browser Verification

**Verification date:** 2026-07-13  
**Status:** Passed  
**Canonical origin:** `https://matsuri-yukue.badjoke-lab.com`

## Workflow evidence

```text
Workflow
Verify Matsuri canonical Search

Run ID
29227591583

Conclusion
success

Browser
Chromium

Artifact ID
8270324780

Artifact digest
sha256:d7ffcdff20e361dd6e4ecef7aec06ae1002545dc67c3915c4a23007d1cbac2d1

Retention
30 days
```

The successful run used the pull-request merge ref generated for PR #65.

## Verified scenarios

### Exact query and result navigation

```text
Query
脚折雨乞
```

The browser gate confirmed:

- `/search/` loaded from the exact canonical origin,
- the query parameter changed to the submitted value,
- Pagefind completed and cleared `aria-busy`,
- a visible result contained `脚折雨乞`,
- the result link remained on the canonical origin,
- the destination H1 contained `脚折雨乞`.

### Second exact query

```text
Query
相馬野馬追
```

A visible exact-name result was rendered by Pagefind.

### Zero-result state

```text
Query
qxjv9072416358zmkp
```

The collision-resistant probe produced:

```text
条件に一致する記録はありません。検索語や絞り込み条件を変更してください。
```

The result list contained zero rows.

An earlier natural-language probe contained the indexed Japanese word `記録` and legitimately returned 大日堂舞楽. That failed attempt was a test-data collision rather than a production Search defect. The final probe intentionally contains no meaningful indexed terms.

## Error boundary

The successful browser run recorded:

```text
browser errors  0
page errors     0
console errors  0
```

## Retained evidence

The workflow artifact contains:

- a Playwright HTML report,
- the 脚折雨乞 result screenshot,
- the 脚折雨乞 destination screenshot,
- the zero-result screenshot,
- failure traces and videos only when a retry fails.

## Gate result

```text
F2-22  browser Pagefind Search verification — completed
F2-23  crawler-reachability review — next
```

## Boundary

This verification does not establish:

- robots and crawler policy correctness,
- search-engine sitemap submission,
- indexation,
- Web Analytics activation,
- production traffic recording,
- final F2 launch completion.

Those remain F2-23 through F2-28.
