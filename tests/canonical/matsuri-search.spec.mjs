import { expect, test } from "@playwright/test";

const canonicalOrigin = "https://matsuri-yukue.badjoke-lab.com";

function observeBrowserErrors(page) {
  const errors = [];

  page.on("pageerror", (error) => {
    errors.push(`pageerror: ${error.message}`);
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(`console.error: ${message.text()}`);
    }
  });

  return errors;
}

async function waitForSearch(page) {
  const resultList = page.locator("#search-result-list");
  await expect(resultList).toHaveAttribute("aria-busy", "false");
  await expect(page.locator("#search-status")).not.toContainText("検索indexを読み込んでいます");
  await expect(page.locator("#search-status")).not.toContainText("検索しています");
}

async function submitQuery(page, query) {
  await page.locator("#search-query").fill(query);
  await page.getByRole("button", { name: "検索する" }).click();
  await expect(page).toHaveURL((url) => {
    return (
      url.origin === canonicalOrigin &&
      url.pathname === "/search/" &&
      url.searchParams.get("q") === query
    );
  });
  await waitForSearch(page);
}

test.describe("Matsuri canonical Pagefind Search", () => {
  test("finds an exact festival record and follows the result", async ({ page }, testInfo) => {
    const browserErrors = observeBrowserErrors(page);

    await page.goto("/search/", { waitUntil: "networkidle" });
    await expect(page).toHaveTitle(/検索｜祭のゆくえ/);
    await waitForSearch(page);

    await submitQuery(page, "脚折雨乞");

    const status = page.locator("#search-status");
    await expect(status).toContainText(/\d+件の記録が見つかりました。/);

    const resultLink = page
      .locator("#search-result-list a")
      .filter({ hasText: "脚折雨乞" })
      .first();
    await expect(resultLink).toBeVisible();

    const searchScreenshot = testInfo.outputPath("search-suneori-amagoi.png");
    await page.screenshot({ path: searchScreenshot, fullPage: true });
    await testInfo.attach("search-suneori-amagoi", {
      path: searchScreenshot,
      contentType: "image/png",
    });

    await resultLink.click();
    await expect(page).toHaveURL((url) => {
      return url.origin === canonicalOrigin && url.pathname !== "/search/";
    });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("脚折雨乞");

    const detailScreenshot = testInfo.outputPath("result-suneori-amagoi.png");
    await page.screenshot({ path: detailScreenshot, fullPage: true });
    await testInfo.attach("result-suneori-amagoi", {
      path: detailScreenshot,
      contentType: "image/png",
    });

    expect(browserErrors, browserErrors.join("\n")).toEqual([]);
  });

  test("supports a second exact query and a zero-result state", async ({ page }, testInfo) => {
    const browserErrors = observeBrowserErrors(page);

    await page.goto("/search/", { waitUntil: "networkidle" });
    await waitForSearch(page);

    await submitQuery(page, "相馬野馬追");
    await expect(page.locator("#search-status")).toContainText(/\d+件の記録が見つかりました。/);
    await expect(
      page.locator("#search-result-list a").filter({ hasText: "相馬野馬追" }).first(),
    ).toBeVisible();

    await submitQuery(page, "該当記録なし-f2-22-browser-gate");
    await expect(page.locator("#search-status")).toHaveText(
      "条件に一致する記録はありません。検索語や絞り込み条件を変更してください。",
    );
    await expect(page.locator("#search-result-list > li")).toHaveCount(0);

    const emptyScreenshot = testInfo.outputPath("search-zero-result.png");
    await page.screenshot({ path: emptyScreenshot, fullPage: true });
    await testInfo.attach("search-zero-result", {
      path: emptyScreenshot,
      contentType: "image/png",
    });

    expect(browserErrors, browserErrors.join("\n")).toEqual([]);
  });
});
