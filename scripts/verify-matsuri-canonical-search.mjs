import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const topology = JSON.parse(
  fs.readFileSync(
    path.join(repositoryRoot, "config", "yukue-deployment-topology.json"),
    "utf8",
  ),
);
const matsuri = topology.sites?.find((site) => site.site_id === "matsuri");

assert(matsuri, "Deployment topology is missing the Matsuri site.");
assert.equal(
  matsuri.deployment_status,
  "canonical-origin-verified",
  "Matsuri canonical origin is not recorded as verified.",
);

const configuredOrigin = process.env.MATSURI_CHECK_ORIGIN ?? matsuri.canonical_origin;
const parsedOrigin = new URL(configuredOrigin);
parsedOrigin.pathname = "/";
parsedOrigin.search = "";
parsedOrigin.hash = "";
const origin = parsedOrigin.origin;

assert.equal(
  origin,
  matsuri.canonical_origin,
  `F2-22 must run against the accepted canonical origin ${matsuri.canonical_origin}.`,
);

const outputDirectory = path.resolve(
  repositoryRoot,
  process.env.MATSURI_SEARCH_ARTIFACT_DIR ??
    ".artifacts/matsuri-f2-22-search",
);
fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });

const exactQuery = "脚折雨乞";
const exactTitle = "脚折雨乞";
const filteredQuery = "雨乞";
const filteredPrefecture = "埼玉県";
const noResultQuery = "f2x22xcanonicalxsearchxnoresultx9d7e";
const emptyStatus =
  "条件に一致する記録はありません。検索語や絞り込み条件を変更してください。";

const report = {
  schema_version: 2,
  gate_id: "F2-22",
  status: "running",
  canonical_origin: origin,
  browser: "chromium",
  verified_at: new Date().toISOString(),
  exact_query: null,
  filtered_query: null,
  empty_query: null,
  page_errors: [],
  console_errors: [],
  same_origin_request_failures: [],
  ignored_telemetry_request_failures: [],
  screenshots: [],
  error: null,
};

function screenshotPath(filename) {
  report.screenshots.push(filename);
  return path.join(outputDirectory, filename);
}

function writeEvidence() {
  fs.writeFileSync(
    path.join(outputDirectory, "report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );

  const summary = [
    "# Matsuri F2-22 Browser Search Verification",
    "",
    `Status: **${report.status}**`,
    "",
    `- Canonical origin: \`${report.canonical_origin}\``,
    `- Browser: \`${report.browser}\``,
    `- Verified at: \`${report.verified_at}\``,
    `- Exact query: \`${report.exact_query?.query ?? "not completed"}\``,
    `- Exact-query results: ${report.exact_query?.result_count ?? "not completed"}`,
    `- Destination: \`${report.exact_query?.destination_url ?? "not completed"}\``,
    `- Filtered query: \`${report.filtered_query?.query ?? "not completed"}\``,
    `- Filtered-query results: ${report.filtered_query?.result_count ?? "not completed"}`,
    `- Empty query: \`${report.empty_query?.query ?? "not completed"}\``,
    `- Empty-query result count: ${report.empty_query?.result_count ?? "not completed"}`,
    `- Page errors: ${report.page_errors.length}`,
    `- Console errors: ${report.console_errors.length}`,
    `- Same-origin application request failures: ${report.same_origin_request_failures.length}`,
    `- Ignored aborted Cloudflare RUM requests: ${report.ignored_telemetry_request_failures.length}`,
    `- Screenshots: ${report.screenshots.length}`,
  ];

  if (report.error) {
    summary.push("", "## Failure", "", "```text", report.error, "```");
  }

  fs.writeFileSync(
    path.join(outputDirectory, "summary.md"),
    `${summary.join("\n")}\n`,
    "utf8",
  );
}

async function waitForSearchIdle(page) {
  await page.waitForFunction(
    () =>
      document
        .querySelector("#search-result-list")
        ?.getAttribute("aria-busy") === "false",
    undefined,
    { timeout: 60_000 },
  );
}

async function submitSearch(page, expectedQuery) {
  await page.getByRole("button", { name: "検索する" }).click();
  await page.waitForURL(
    (url) => url.pathname === "/search/" && url.searchParams.get("q") === expectedQuery,
    { timeout: 30_000 },
  );
  await waitForSearchIdle(page);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1200 },
  locale: "ja-JP",
});
const page = await context.newPage();

page.on("pageerror", (error) => {
  report.page_errors.push(error.message);
});
page.on("console", (message) => {
  if (message.type() === "error") {
    report.console_errors.push(message.text());
  }
});
page.on("requestfailed", (request) => {
  try {
    const requestUrl = new URL(request.url());
    if (requestUrl.origin !== origin) return;

    const failure = {
      url: request.url(),
      method: request.method(),
      failure: request.failure()?.errorText ?? "unknown",
    };

    const isAbortedCloudflareRum =
      requestUrl.pathname === "/cdn-cgi/rum" &&
      failure.method === "POST" &&
      failure.failure === "net::ERR_ABORTED";

    if (isAbortedCloudflareRum) {
      report.ignored_telemetry_request_failures.push(failure);
      return;
    }

    report.same_origin_request_failures.push(failure);
  } catch {
    // Ignore malformed browser-internal request URLs.
  }
});

try {
  await page.goto(`${origin}/search/`, {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
  });
  await waitForSearchIdle(page);

  await page.locator("#search-query").fill(exactQuery);
  await submitSearch(page, exactQuery);

  const exactStatus = (await page.locator("#search-status").textContent())?.trim() ?? "";
  assert.match(exactStatus, /^[1-9]\d*件の記録が見つかりました。$/u);

  const exactResultRows = page.locator("#search-result-list > li");
  const exactResultCount = await exactResultRows.count();
  assert(exactResultCount > 0, "The exact query returned no rendered result rows.");

  const exactLink = page
    .locator("#search-result-list a")
    .filter({ hasText: exactTitle })
    .first();
  assert(
    (await exactLink.count()) === 1,
    `Expected result title ${exactTitle} was not rendered.`,
  );

  const resultTitle = (await exactLink.textContent())?.trim() ?? "";
  const resultHref = await exactLink.getAttribute("href");
  assert.equal(resultTitle, exactTitle);
  assert(resultHref, "The exact-query result does not have an href.");
  assert(resultHref.startsWith("/"), "The result href must be a same-site path.");
  assert(!resultHref.startsWith("/search/"), "The result href must leave Search.");

  report.exact_query = {
    query: exactQuery,
    status: exactStatus,
    result_count: exactResultCount,
    matched_title: resultTitle,
    matched_href: resultHref,
    destination_url: null,
    destination_h1: null,
  };

  await page.screenshot({
    path: screenshotPath("01-exact-query.png"),
    fullPage: true,
  });

  await Promise.all([
    page.waitForURL(
      (url) => url.origin === origin && url.pathname !== "/search/",
      { timeout: 30_000 },
    ),
    exactLink.click(),
  ]);
  await page.waitForLoadState("domcontentloaded");

  const destinationUrl = page.url();
  const destination = new URL(destinationUrl);
  assert.equal(destination.origin, origin);
  assert.equal(destination.pathname, new URL(resultHref, origin).pathname);

  const destinationHeading = (await page.locator("h1").first().textContent())?.trim() ?? "";
  assert(
    destinationHeading.includes(exactTitle),
    `Destination H1 does not identify ${exactTitle}: ${destinationHeading}`,
  );

  report.exact_query.destination_url = destinationUrl;
  report.exact_query.destination_h1 = destinationHeading;

  await page.screenshot({
    path: screenshotPath("02-result-detail.png"),
    fullPage: true,
  });

  await page.goto(`${origin}/search/`, {
    waitUntil: "domcontentloaded",
    timeout: 60_000,
  });
  await waitForSearchIdle(page);

  await page.locator("#search-query").fill(filteredQuery);
  await page.locator("#search-prefecture").selectOption({
    label: filteredPrefecture,
  });
  await submitSearch(page, filteredQuery);

  const filteredStatus = (await page.locator("#search-status").textContent())?.trim() ?? "";
  assert.match(filteredStatus, /^[1-9]\d*件の記録が見つかりました。$/u);
  assert(
    new URL(page.url()).searchParams.has("prefecture"),
    "Filtered Search URL does not contain the prefecture parameter.",
  );

  const filteredRows = page.locator("#search-result-list > li");
  const filteredResultCount = await filteredRows.count();
  assert(filteredResultCount > 0, "The filtered query returned no result rows.");

  const filteredLink = page
    .locator("#search-result-list a")
    .filter({ hasText: exactTitle })
    .first();
  assert(
    (await filteredLink.count()) === 1,
    `The filtered query did not retain ${exactTitle}.`,
  );

  report.filtered_query = {
    query: filteredQuery,
    prefecture: filteredPrefecture,
    prefecture_value: await page.locator("#search-prefecture").inputValue(),
    status: filteredStatus,
    result_count: filteredResultCount,
    matched_title: (await filteredLink.textContent())?.trim() ?? "",
    matched_href: await filteredLink.getAttribute("href"),
  };

  await page.screenshot({
    path: screenshotPath("03-filtered-query.png"),
    fullPage: true,
  });

  await page.locator("#search-query").fill(noResultQuery);
  await page.locator("#search-prefecture").selectOption("");
  await page.locator("#search-type").selectOption("");
  await page.locator("#search-state").selectOption("");
  await submitSearch(page, noResultQuery);

  const noResultStatus = (await page.locator("#search-status").textContent())?.trim() ?? "";
  const noResultCount = await page.locator("#search-result-list > li").count();
  assert.equal(noResultStatus, emptyStatus);
  assert.equal(noResultCount, 0);

  report.empty_query = {
    query: noResultQuery,
    status: noResultStatus,
    result_count: noResultCount,
  };

  await page.screenshot({
    path: screenshotPath("04-empty-result.png"),
    fullPage: true,
  });

  assert.deepEqual(report.page_errors, [], "The page emitted browser page errors.");
  assert.deepEqual(report.console_errors, [], "The page emitted console errors.");
  assert.deepEqual(
    report.same_origin_request_failures,
    [],
    "The page emitted same-origin application request failures.",
  );

  report.status = "passed";
} catch (error) {
  report.status = "failed";
  report.error = error instanceof Error ? error.stack ?? error.message : String(error);
  try {
    await page.screenshot({
      path: screenshotPath("failure.png"),
      fullPage: true,
    });
  } catch {
    // Preserve the original verification error.
  }
} finally {
  report.verified_at = new Date().toISOString();
  writeEvidence();
  await context.close();
  await browser.close();
}

if (report.status !== "passed") {
  throw new Error(report.error ?? "F2-22 canonical browser Search verification failed.");
}

console.log(
  `Matsuri F2-22 canonical browser Search verification passed: exact query ${report.exact_query.result_count} result(s), filtered query ${report.filtered_query.result_count} result(s), empty query ${report.empty_query.result_count} result(s), destination ${report.exact_query.destination_url}, ignored aborted Cloudflare RUM requests ${report.ignored_telemetry_request_failures.length}.`,
);
