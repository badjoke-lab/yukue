# F2-22 Matsuri Canonical Search Browser Verification

**Status:** Verification implementation prepared / external browser evidence pending

## Objective

Verify that Pagefind Search works interactively on the active Matsuri canonical origin:

```text
https://matsuri-yukue.badjoke-lab.com
```

F2-20 and F2-21 proved that `/search/` and Pagefind assets are reachable over HTTPS. F2-22 is a separate browser gate because static HTTP access does not prove that client-side module loading, query submission, result rendering, history updates, and result navigation work together.

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

It does not start a local preview server. All page and asset requests go to the canonical production origin.

## Browser matrix

```text
Browser   Chromium
Viewport  1440 × 1000
Workers   1
Retries   2 in CI
```

The gate is intentionally focused on production Search behavior rather than repeating the full local responsive and accessibility audit.

## Required scenarios

### 1. Exact record Search and navigation

```text
Query  脚折雨乞
```

The test must confirm:

- the Search page loads from the exact canonical origin,
- the query is submitted without a full page navigation,
- the URL query parameter is updated,
- Pagefind finishes and clears `aria-busy`,
- the status reports one or more results,
- a visible result contains `脚折雨乞`,
- following the result remains on the canonical origin,
- the destination H1 contains `脚折雨乞`.

### 2. Second exact query

```text
Query  相馬野馬追
```

The test must confirm that a visible result contains the exact record name.

### 3. Zero-result state

```text
Query  qxjv9072416358zmkp
```

The test uses a collision-resistant ASCII identifier rather than meaningful Japanese words. A natural-language phrase containing terms such as `記録` can legitimately match indexed descriptions and is therefore unsuitable as a guaranteed zero-result probe.

The test must confirm:

- the documented zero-result message is displayed,
- no result rows remain,
- no page-level or console errors were recorded.

## Evidence artifacts

The workflow retains for 30 days:

```text
test-results/canonical/
playwright-report/canonical/
```

The tests attach full-page screenshots for:

- the 脚折雨乞 result list,
- the destination record page,
- the zero-result state.

Failure artifacts may also contain Playwright traces, screenshots, and video.

## GitHub Actions workflow

```text
Verify Matsuri canonical Search
```

Workflow file:

```text
.github/workflows/verify-matsuri-canonical-search.yml
```

The workflow installs Chromium and executes the canonical Search command from an independent GitHub-hosted runner.

## Completion condition

F2-22 is complete only when:

- the dedicated workflow concludes successfully,
- both exact queries return their expected records,
- result navigation reaches the correct detail surface,
- the zero-result state is correct,
- browser and console error capture remains empty,
- the workflow run ID and evidence result are recorded in an audit document,
- project status, schedule, roadmap, release metadata, and repository gate advance to F2-23.

## Boundary

A successful F2-22 gate does not establish:

- crawler behavior or robots policy,
- search-engine sitemap submission,
- search-engine indexation,
- Web Analytics activation,
- production traffic recording,
- final F2 launch completion.

Those remain F2-23 through F2-28.
