# F2-22 Matsuri Canonical Search Browser Verification

**Status:** Completed and externally verified

## Objective

Verify that Pagefind Search works interactively on the active Matsuri canonical origin:

```text
https://matsuri-yukue.badjoke-lab.com
```

F2-20 and F2-21 proved that `/search/` and Pagefind assets are reachable over HTTPS. F2-22 separately verifies client-side module loading, query submission, result rendering, history updates, zero-result handling, and result navigation.

## Verification command

```text
MATSURI_CANONICAL_ORIGIN=https://matsuri-yukue.badjoke-lab.com \
  pnpm check:matsuri:canonical-search
```

The command uses:

```text
playwright.canonical.config.mjs
tests/canonical/matsuri-search.spec.mjs
```

No local preview server is used. All requests go to the canonical production origin.

## Successful evidence

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
```

Detailed audit:

```text
docs/audits/matsuri-f2-22-browser-search-2026-07-13.md
```

## Verified scenarios

### Exact record Search and navigation

```text
Query  脚折雨乞
```

Verified:

- exact canonical Search origin,
- URL query parameter update,
- Pagefind completion and `aria-busy` clearing,
- visible exact-name result,
- canonical result navigation,
- destination H1 containing `脚折雨乞`.

### Second exact query

```text
Query  相馬野馬追
```

A visible exact-name result was rendered.

### Zero-result state

```text
Query  qxjv9072416358zmkp
```

The collision-resistant probe produced the documented zero-result message and zero rows.

A previous natural-language probe contained `記録`, which legitimately matched an indexed description. That result was a test-data collision, not a production defect.

## Browser error result

```text
page errors     0
console errors  0
```

## Evidence artifacts

The 30-day workflow artifact contains:

```text
test-results/canonical/
playwright-report/canonical/
```

It includes full-page screenshots for the 脚折雨乞 result list, the destination page, and the zero-result state.

## Gate result

```text
F2-22  browser Pagefind Search verification — completed
F2-23  crawler-reachability review — next
```

## Boundary

F2-22 does not establish:

- crawler behavior or robots policy,
- search-engine sitemap submission,
- search-engine indexation,
- Web Analytics activation,
- production traffic recording,
- final F2 launch completion.

Those remain F2-23 through F2-28.
