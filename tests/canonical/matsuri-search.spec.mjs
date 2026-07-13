import { expect, test } from "@playwright/test";

const canonicalOrigin = "https://matsuri-yukue.badjoke-lab.com";

async function waitForSearch(page) {
  await expect(page.locator("#search-result-list")).toHaveAttribute(
    "aria-busy",
    "false",
  );
  await expect(page.locator("#search-status")).not.toHaveText(
    /読み込んでいます|検索しています/u,
  );
}

async function attachScreenshot(page, testInfo, name) {
  await testInfo.attach(name, {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
}

function collectRuntimeErrors(page) {
  const pageErrors = [];
  const consoleErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  return { pageErrors, consoleErrors };
}

test("exact-name query returns 脚折雨乞 and navigates to its detail page", async ({
  page,
}, testInfo) => {
  const { pageErrors, consoleErrors } = collectRuntimeErrors(page);

  const response = await page.goto("/search/", { waitUntil: "domcontentloaded" });
  expect(response).not.toBeNull();
  expect(response.status()).toBeLessThan(400);
  await waitForSearch(page);

  await page.locator("#search-query").fill("脚折雨乞");
  await page.getByRole("button", { name: "検索する" }).click();

  await expect(page).toHaveURL(
    `${canonicalOrigin}/search/?q=${encodeURIComponent("脚折雨乞")}`,
  );
  await waitForSearch(page);

  await expect(page.locator("#search-status")).toHaveText(/\d+件の記録が見つかりました。/u);
  const resultLink = page.getByRole("link", { name: "脚折雨乞", exact: true });
  await expect(resultLink).toBeVisible();
  await expect(resultLink).toHaveAttribute("href", "/festivals/suneori-amagoi/");

  await attachScreenshot(page, testInfo, "canonical-search-exact-name");

  await resultLink.click();
  await expect(page).toHaveURL(`${canonicalOrigin}/festivals/suneori-amagoi/`);
  await expect(page.locator("h1")).toContainText("脚折雨乞");
  await attachScreenshot(page, testInfo, "canonical-search-result-navigation");

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test("query and structured filters produce a matching result and a no-result state", async ({
  page,
}, testInfo) => {
  const { pageErrors, consoleErrors } = collectRuntimeErrors(page);

  const response = await page.goto("/search/", { waitUntil: "domcontentloaded" });
  expect(response).not.toBeNull();
  expect(response.status()).toBeLessThan(400);
  await waitForSearch(page);

  await page.locator("#search-query").fill("脚折雨乞");
  await page.locator("#search-type").selectOption("festival");
  await page.locator("#search-prefecture").selectOption("11");
  await page.locator("#search-state").selectOption("active");
  await page.getByRole("button", { name: "検索する" }).click();

  await expect(page).toHaveURL(
    `${canonicalOrigin}/search/?q=${encodeURIComponent("脚折雨乞")}&type=festival&prefecture=11&state=active`,
  );
  await waitForSearch(page);
  await expect(page.getByRole("link", { name: "脚折雨乞", exact: true })).toBeVisible();
  await attachScreenshot(page, testInfo, "canonical-search-filter-match");

  await page.locator("#search-prefecture").selectOption("16");
  await page.getByRole("button", { name: "検索する" }).click();
  await waitForSearch(page);

  await expect(page.locator("#search-status")).toHaveText(
    "条件に一致する記録はありません。検索語や絞り込み条件を変更してください。",
  );
  await expect(page.locator("#search-result-list > li")).toHaveCount(0);
  await attachScreenshot(page, testInfo, "canonical-search-no-result");

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});
