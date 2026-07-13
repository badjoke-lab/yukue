# F2-22 Matsuri Canonical Search Verification

**Status:** Completed and externally verified

## Objective

Verify that Pagefind Search works interactively on the active canonical origin:

```text
https://matsuri-yukue.badjoke-lab.com
```

F2-20 and F2-21 established HTTP reachability, Pagefind asset availability, `manifest.site_origin`, and canonical sitemap values. F2-22 additionally requires a real browser to execute the Search JavaScript, submit queries, render results, and follow a result link.

## Verification command

```text
pnpm check:matsuri:canonical-search
```

The command uses:

```text
playwright.canonical-search.config.mjs
tests/canonical/matsuri-search.spec.mjs
```

No local web server is started. Tests target the live canonical origin.

## Browser matrix

```text
desktop Chromium  1440 × 1000
mobile Chromium    390 × 844
```

## Verified interactions

### Exact-name Search

```text
query  脚折雨乞
```

The browser verified:

- the query was reflected in the Search URL,
- Pagefind returned a visible `脚折雨乞` result,
- the result linked to `/festivals/suneori-amagoi/`,
- clicking the result opened the canonical Detail page,
- the destination H1 identified `脚折雨乞`.

### Structured filters

```text
query       脚折雨乞
entity type festival
prefecture  11 / 埼玉県
state       active
```

The matching result remained visible. Changing the prefecture to `16 / 富山県` produced the published no-result state and an empty result list.

## Runtime quality checks

The tests fail on page-level JavaScript errors, console errors, failed navigation, missing Pagefind completion state, unexpected result URLs, or missing no-result behavior. No such failure remained in the successful run.

## External evidence

```text
Workflow
Verify Matsuri canonical Search

Run ID
29193201911

Job ID
86651403427

Conclusion
success

Head SHA
ec1a84bdf4321bee0c7ecbcc702abe3bbba81b9e

Pull-request merge test SHA
290d63e1b930616867e2108e393e2f5a537eeee8
```

Evidence artifact:

```text
Artifact ID
8260207484

Artifact name
matsuri-canonical-search-290d63e1b930616867e2108e393e2f5a537eeee8

Artifact digest
sha256:29c05992a887951d91caa8f5bd4588d88b0bac97230353cba4381ec4ff0eb884

Retention expires
2026-08-11T12:51:43Z
```

Detailed audit:

```text
docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md
```

## Completion result

```text
F2-22  browser Pagefind Search verification — completed
F2-23  crawler-reachability review — next
F2-24  sitemap submission and indexability check — hold
F2-25  Web Analytics activation — hold
F2-26  post-activation deployment — hold
F2-27  production traffic verification — hold
F2-28  final F2 Launch Gate — hold
```

A green local static-site browser audit does not replace this external browser gate. The successful hosted run above is the completion evidence.
