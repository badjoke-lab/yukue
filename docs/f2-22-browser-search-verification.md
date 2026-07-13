# F2-22 Matsuri Canonical Browser Search Verification

**Status:** Verification tooling prepared / external browser evidence pending

## Objective

Verify that Pagefind Search works interactively on the active canonical Matsuri origin:

```text
https://matsuri-yukue.badjoke-lab.com
```

F2-20 and F2-21 already established that `/search/` and Pagefind assets are reachable over HTTPS and that the canonical manifest and sitemap are correct. F2-22 adds real-browser interaction evidence.

## Required browser behavior

The Chromium verification must:

1. open `/search/` on the exact canonical origin,
2. wait until the initial Pagefind query completes,
3. enter a representative exact Japanese query,
4. submit the form without a full-page form fallback,
5. confirm that the URL query string updates,
6. confirm that at least one result appears,
7. confirm that the expected result title is present,
8. follow the result link,
9. confirm that navigation stays on the canonical origin,
10. confirm that the destination page identifies the selected record,
11. return to Search and exercise a prefecture-filtered query,
12. exercise a no-result query and confirm the public empty state,
13. record browser, console, request, result, destination, and screenshot evidence.

## Representative cases

### Exact record query

```text
query
脚折雨乞

expected result title
脚折雨乞
```

The test does not hard-code the destination slug. It reads the generated result link, requires a same-site public path, follows it, and confirms the destination H1.

### Filtered query

```text
query
雨乞

prefecture
埼玉県

expected result title
脚折雨乞
```

This verifies Pagefind query execution together with the public prefecture filter.

### Empty result

A deliberately unmatched query must produce:

```text
条件に一致する記録はありません。検索語や絞り込み条件を変更してください。
```

and an empty result list.

## Verification command

```text
pnpm check:matsuri:canonical-search
```

Environment:

```text
MATSURI_CHECK_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

The script refuses a non-canonical origin by comparing it with `config/yukue-deployment-topology.json`.

## Request-failure classification

Same-origin failures for application HTML, Pagefind assets, public data, and result navigation fail the gate.

Cloudflare may inject Real User Monitoring requests at:

```text
/cdn-cgi/rum
```

A `POST` to that path may be reported as `net::ERR_ABORTED` when Chromium leaves a page. This is a navigation-cancelled telemetry request rather than a Search or public-asset failure. The verifier records these events separately as ignored telemetry failures. It does not ignore other methods, paths, failure types, or same-origin application requests.

## Evidence output

The command writes:

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

## GitHub Actions gate

Workflow:

```text
Verify Matsuri canonical browser Search
```

The workflow installs Chromium, runs the verification command against the live canonical origin, and uploads the complete evidence directory whether the test passes or fails.

## Completion boundary

F2-22 is complete only after a GitHub-hosted Chromium run succeeds and the workflow run ID is recorded in:

- the deployment topology or release evidence,
- `docs/project-status.md`,
- `docs/development-schedule.md`,
- a dated audit record.

A local run alone is not sufficient completion evidence.

## Failure boundary

If browser verification fails:

- F2-22 remains incomplete,
- F2-23 through F2-28 remain blocked,
- preserve the failure screenshots and report,
- distinguish Pagefind loading failure, query failure, filter failure, result rendering failure, and destination navigation failure,
- repair only the verified cause before rerunning.

## Excluded scope

This gate does not:

- submit the sitemap,
- establish search-engine indexation,
- enable Cloudflare Web Analytics,
- prove production traffic,
- complete F2-23 through F2-28,
- change Search UI or public data unless a verified defect requires a separate repair.
