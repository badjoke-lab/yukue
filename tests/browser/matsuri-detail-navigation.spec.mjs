import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const repositoryRoot = process.cwd();
const entityEnvelope = JSON.parse(
  fs.readFileSync(
    path.join(repositoryRoot, "apps", "matsuri", "dist", "data", "entities.json"),
    "utf8",
  ),
);
const entities = entityEnvelope.records ?? [];

function routeKind(entityType) {
  switch (entityType) {
    case "festival":
    case "tradition_unit":
      return "festivals";
    case "folk_performance":
      return "performances";
    case "organization":
      return "organizations";
    case "shrine":
      return "shrines";
    case "temple":
      return "temples";
    default:
      return null;
  }
}

function entityRoute(entity) {
  const kind = routeKind(entity.entity_type);
  if (!kind || !entity.slug) return null;
  if (["shrine", "temple"].includes(entity.entity_type)) {
    return `/references/${kind}/${entity.slug}/`;
  }
  return `/${kind}/${entity.slug}/`;
}

async function verifyLoadedMap(iframe, route) {
  await iframe.scrollIntoViewIfNeeded();
  const handle = await iframe.elementHandle();
  expect(handle, `${route}: embedded map element handle`).not.toBeNull();

  const deadline = Date.now() + 30_000;
  let frame = null;
  while (Date.now() < deadline) {
    frame = await handle.contentFrame();
    if (frame?.url().startsWith("https://www.google.com/maps")) break;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  expect(frame, `${route}: embedded map frame`).not.toBeNull();
  expect(frame.url(), `${route}: embedded map origin`).toMatch(
    /^https:\/\/www\.google\.com\/maps/u,
  );
  await frame.waitForLoadState("domcontentloaded", { timeout: 30_000 });
  await frame.locator("body").waitFor({ state: "visible", timeout: 30_000 });
  await expect
    .poll(
      async () =>
        frame.locator("body").evaluate(
          (body) =>
            body.innerHTML.length >= 500 &&
            body.querySelectorAll("*").length >= 10,
        ),
      { timeout: 30_000, message: `${route}: embedded map body must render` },
    )
    .toBe(true);
}

const detailEntities = entities.filter((entity) => entityRoute(entity));
const primaryEntities = detailEntities.filter((entity) =>
  ["festival", "tradition_unit", "folk_performance", "organization"].includes(
    entity.entity_type,
  ),
);
const seedEntities = detailEntities.filter((entity) =>
  ["shrine", "temple"].includes(entity.entity_type),
);

test("all Matsuri records navigate through real Detail C pages", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Exhaustive navigation runs once");
  test.setTimeout(600_000);

  expect(primaryEntities.length).toBeGreaterThan(1);

  for (const entity of detailEntities) {
    const route = entityRoute(entity);
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response, `No response for ${route}`).not.toBeNull();
    expect(response.status(), `Unexpected response for ${route}`).toBeLessThan(400);
    await expect(page.locator("article[data-detail-page]")).toHaveAttribute(
      "data-entity-id",
      entity.id,
    );
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("#machine-data a[href$='.json']")).toHaveCount(1);

    const relationRows = page.locator("[data-relation-row]");
    for (let index = 0; index < (await relationRows.count()); index += 1) {
      await expect(relationRows.nth(index).locator("a[data-relation-target]")).toHaveCount(1);
    }

    const placeRows = page.locator("[data-place-item]");
    const placeCount = await placeRows.count();
    if (placeCount > 0) {
      const map = page.locator(".yk-place-map");
      await expect(map).toHaveCount(1);
      await expect(map).toHaveAttribute("data-has-map", "true");
      await expect(map).toHaveAttribute(
        "data-map-mode",
        /^(point|representative|area)$/u,
      );
      await expect(map).toHaveAttribute("data-map-provider", "google-maps-query");
      const iframe = map.locator("iframe[data-embedded-map]");
      await expect(iframe).toHaveCount(1);
      await expect(iframe).toHaveAttribute(
        "src",
        /^https:\/\/www\.google\.com\/maps\?[^#]*\boutput=embed\b/u,
      );
      await expect(iframe).toHaveAttribute("title", /.+/u);
      await expect(map.locator("a[data-place-map-link]")).toHaveCount(placeCount);
      await verifyLoadedMap(iframe, route);
    }

    if (["shrine", "temple"].includes(entity.entity_type)) {
      await expect(page.locator("#reference-boundary")).toHaveCount(1);
      await expect(
        page.locator(".yk-overview__label", { hasText: /^現在状態$/u }),
      ).toHaveCount(0);
    }
  }

  const browseContracts = [
    ["/festivals/", primaryEntities.filter((entity) => ["festival", "tradition_unit"].includes(entity.entity_type))],
    ["/performances/", primaryEntities.filter((entity) => entity.entity_type === "folk_performance")],
    ["/organizations/", primaryEntities.filter((entity) => entity.entity_type === "organization")],
  ];

  for (const [route, expectedEntities] of browseContracts) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    for (const entity of expectedEntities) {
      const row = page.locator(`[data-entity-id="${entity.id}"]`);
      await expect(row).toHaveCount(1);
      await expect(row.locator(`h2 a[href="${entityRoute(entity)}"]`)).toHaveCount(1);
    }
  }

  await page.goto("/festivals/", { waitUntil: "domcontentloaded" });
  const firstDetailLink = page.locator(".browse-entity-row h2 a").first();
  const firstDetailHref = await firstDetailLink.getAttribute("href");
  expect(firstDetailHref).toMatch(/^\/festivals\/[^/]+\/$/u);
  await firstDetailLink.click();
  await expect(page.locator("article[data-detail-page]")).toHaveCount(1);

  const firstRelationTarget = page.locator("a[data-relation-target]").first();
  if ((await firstRelationTarget.count()) > 0) {
    await firstRelationTarget.click();
    await expect(page.locator("article[data-detail-page]")).toHaveCount(1);
  }

  const placeLink = page.locator("a[data-place-link]").first();
  if ((await placeLink.count()) > 0) {
    await placeLink.click();
    await expect(page.locator("article[data-place-detail-page]")).toHaveCount(1);
    await expect(page.locator("#related-records a[data-relation-target]").first()).toBeVisible();
  }
});
