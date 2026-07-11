import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import {
  assertMatsuriVisualContract,
  matsuriPublicRoutes,
} from "../../config/matsuri-visual-routes.mjs";

assertMatsuriVisualContract();

function formatViolations(violations) {
  return violations
    .map((violation) => {
      const nodes = violation.nodes
        .map((node) => `    ${node.target.join(" ")}: ${node.failureSummary ?? ""}`)
        .join("\n");
      return `- ${violation.id} (${violation.impact ?? "unknown"}): ${violation.help}\n${nodes}`;
    })
    .join("\n");
}

for (const route of matsuriPublicRoutes) {
  test(`${route} is responsive and accessible`, async ({ page }, testInfo) => {
    const pageErrors = [];
    const consoleErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response, `No response for ${route}`).not.toBeNull();
    expect(response.status(), `Unexpected response for ${route}`).toBeLessThan(400);

    await expect(page.locator("html")).toHaveAttribute("lang", "ja");
    await expect(page).toHaveTitle(/\S/u);
    await expect(page.locator('meta[name="viewport"]')).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("main#yk-main-content")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);

    const publicChangeTypeLabels = await page
      .locator(".recent-change-row__type, .change-row__meta span")
      .allTextContents();
    const rawChangeTypeLabels = publicChangeTypeLabels
      .map((label) => label.trim())
      .filter((label) => /^[a-z][a-z_]*$/u.test(label));
    expect(
      rawChangeTypeLabels,
      `Raw Change Event codes are visible on ${route}: ${JSON.stringify(rawChangeTypeLabels)}`,
    ).toEqual([]);

    const overflow = await page.evaluate(() => ({
      body: document.body.scrollWidth - window.innerWidth,
      document: document.documentElement.scrollWidth - window.innerWidth,
    }));
    expect(
      Math.max(overflow.body, overflow.document),
      `Horizontal page overflow on ${route} in ${testInfo.project.name}`,
    ).toBeLessThanOrEqual(1);

    const structuralIssues = await page.evaluate(() => {
      const issues = [];
      const headings = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")];
      let previousLevel = 0;

      for (const heading of headings) {
        const level = Number(heading.tagName.slice(1));
        if (!heading.textContent?.trim()) {
          issues.push(`${heading.tagName} has no text`);
        }
        if (previousLevel > 0 && level > previousLevel + 1) {
          issues.push(`heading level jumps from h${previousLevel} to h${level}`);
        }
        previousLevel = level;
      }

      const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
      const duplicates = ids.filter((id, index) => id && ids.indexOf(id) !== index);
      if (duplicates.length > 0) {
        issues.push(`duplicate IDs: ${[...new Set(duplicates)].join(", ")}`);
      }

      for (const image of document.querySelectorAll("img")) {
        if (!image.hasAttribute("alt")) {
          issues.push(`image missing alt: ${image.getAttribute("src") ?? "unknown"}`);
        }
      }

      for (const table of document.querySelectorAll("table")) {
        if (table.querySelectorAll("th").length === 0) {
          issues.push("table has no header cells");
        }
        if (
          !table.querySelector("caption") &&
          !table.getAttribute("aria-label") &&
          !table.getAttribute("aria-labelledby")
        ) {
          issues.push("table has no caption or accessible label");
        }
      }

      const formControls = document.querySelectorAll("input, select, textarea");
      for (const control of formControls) {
        const labelledBy = control.getAttribute("aria-labelledby");
        const labelledByText = labelledBy
          ? labelledBy
              .split(/\s+/u)
              .map((id) => document.getElementById(id)?.textContent?.trim() ?? "")
              .join("")
          : "";
        const hasName =
          (control.labels?.length ?? 0) > 0 ||
          Boolean(control.getAttribute("aria-label")?.trim()) ||
          Boolean(labelledByText);
        if (!hasName) {
          issues.push(`${control.tagName.toLowerCase()} has no accessible label`);
        }
      }

      const namedControls = document.querySelectorAll("button, summary");
      for (const control of namedControls) {
        const name =
          control.getAttribute("aria-label")?.trim() ?? control.textContent?.trim() ?? "";
        if (!name) {
          issues.push(`${control.tagName.toLowerCase()} has no accessible name`);
        }
      }

      for (const row of document.querySelectorAll("[data-current-state]")) {
        const stateText = row.querySelector(".browse-entity-row__state")?.textContent?.trim();
        if (!stateText) {
          issues.push(
            `Entity ${row.getAttribute("data-entity-id") ?? "unknown"} exposes a state code without visible state text`,
          );
        }
      }

      return issues;
    });
    expect(structuralIssues, structuralIssues.join("\n")).toEqual([]);

    await page.keyboard.press("Tab");
    const skipLink = page.locator(".yk-skip-link");
    await expect(skipLink).toBeFocused();
    const skipLinkVisible = await skipLink.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top < window.innerHeight &&
        rect.left < window.innerWidth &&
        style.visibility !== "hidden" &&
        style.display !== "none"
      );
    });
    expect(skipLinkVisible, `Focused skip link is not visible on ${route}`).toBe(true);
    await page.keyboard.press("Enter");
    await expect(page.locator("main#yk-main-content")).toBeFocused();

    const smallControls = await page.evaluate(() =>
      [...document.querySelectorAll("button, summary, input, select, textarea")]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          const rendered =
            rect.width > 0 &&
            rect.height > 0 &&
            element.getClientRects().length > 0 &&
            style.display !== "none" &&
            style.visibility !== "hidden";

          if (!rendered) return null;

          return {
            tag: element.tagName.toLowerCase(),
            name:
              element.getAttribute("aria-label")?.trim() ??
              element.textContent?.trim() ??
              element.getAttribute("name") ??
              "unnamed",
            width: rect.width,
            height: rect.height,
          };
        })
        .filter((control) => control !== null)
        .filter((control) => control.width < 24 || control.height < 24),
    );
    expect(
      smallControls,
      `Controls smaller than 24px on ${route}: ${JSON.stringify(smallControls)}`,
    ).toEqual([]);

    const mobileMenu = page.locator("details.yk-site-header__mobile");
    if (await mobileMenu.isVisible()) {
      const summary = mobileMenu.locator("summary");
      await summary.click();
      await expect(mobileMenu).toHaveAttribute("open", "");
      await expect(mobileMenu.locator("nav a").first()).toBeVisible();
    }

    if (testInfo.project.name !== "tablet-chromium") {
      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(
        accessibility.violations,
        `Accessibility violations on ${route} in ${testInfo.project.name}:\n${formatViolations(accessibility.violations)}`,
      ).toEqual([]);
    }

    expect(pageErrors, `Page errors on ${route}`).toEqual([]);
    expect(consoleErrors, `Console errors on ${route}`).toEqual([]);
  });
}
