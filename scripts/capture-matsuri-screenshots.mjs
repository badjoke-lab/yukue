import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import {
  assertMatsuriVisualContract,
  matsuriPublicRoutes,
  matsuriVisualDevices,
} from "../config/matsuri-visual-routes.mjs";
import {
  argValue,
  compareRouteInventories,
  discoverGeneratedPublicRoutes,
  matsuriScreenshotRoot,
  repositoryRoot,
  safeScreenshotFilename,
  selectedDeviceNames,
  sha256File,
  toPosix,
  zipDirectory,
} from "./lib/matsuri-visual-utils.mjs";

const baseUrl = argValue(
  "base-url",
  process.env.MATSURI_SCREENSHOT_BASE_URL ?? "http://127.0.0.1:4321",
).replace(/\/$/u, "");
const deviceNames = selectedDeviceNames(
  argValue("device", process.env.MATSURI_SCREENSHOT_DEVICE ?? "all"),
);

assertMatsuriVisualContract();
const generatedRoutes = await discoverGeneratedPublicRoutes();
compareRouteInventories(
  generatedRoutes,
  matsuriPublicRoutes,
  "Generated Matsuri and configured visual",
);

fs.mkdirSync(matsuriScreenshotRoot, { recursive: true });

const browser = await chromium.launch();
let totalFailures = 0;

try {
  for (const deviceName of deviceNames) {
    const device = matsuriVisualDevices[deviceName];
    const outputDirectory = path.join(matsuriScreenshotRoot, deviceName);
    const manifestPath = path.join(
      matsuriScreenshotRoot,
      `manifest.${deviceName}.json`,
    );
    const zipPath = path.join(
      matsuriScreenshotRoot,
      `screenshots-${deviceName}.zip`,
    );

    fs.rmSync(outputDirectory, { recursive: true, force: true });
    fs.rmSync(manifestPath, { force: true });
    fs.rmSync(zipPath, { force: true });
    fs.mkdirSync(outputDirectory, { recursive: true });

    const context = await browser.newContext({
      viewport: device.viewport,
      deviceScaleFactor: 1,
      isMobile: device.isMobile,
      hasTouch: device.hasTouch,
      reducedMotion: "reduce",
      colorScheme: "light",
    });

    const records = [];
    const failures = [];

    for (const route of matsuriPublicRoutes) {
      const resolvedUrl = `${baseUrl}${route}`;
      const filePath = path.join(
        outputDirectory,
        safeScreenshotFilename(route),
      );
      const page = await context.newPage();
      const pageErrors = [];
      const consoleErrors = [];

      page.on("pageerror", (error) => pageErrors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });

      try {
        const response = await page.goto(resolvedUrl, {
          waitUntil: "networkidle",
          timeout: 60_000,
        });

        if (!response || !response.ok()) {
          throw new Error(`HTTP ${response?.status() ?? "no response"}`);
        }

        await page.evaluate(async () => {
          if (document.fonts) await document.fonts.ready;
        });
        await page.addStyleTag({
          content: `
            *, *::before, *::after {
              animation-duration: 0s !important;
              animation-delay: 0s !important;
              transition-duration: 0s !important;
              caret-color: transparent !important;
            }
            html { scroll-behavior: auto !important; }
          `,
        });

        const metrics = await page.evaluate(() => {
          const visible = (element) => {
            if (!(element instanceof HTMLElement)) return false;
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return (
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              Number(style.opacity) > 0 &&
              rect.width > 0 &&
              rect.height > 0
            );
          };

          const documentElement = document.documentElement;
          const body = document.body;
          const horizontalOverflowPixels = Math.max(
            0,
            documentElement.scrollWidth - documentElement.clientWidth,
            body.scrollWidth - window.innerWidth,
          );
          const documentHeight = Math.max(
            documentElement.scrollHeight,
            documentElement.offsetHeight,
            body.scrollHeight,
            body.offsetHeight,
          );
          const brokenImages = [...document.images]
            .filter((image) => image.complete && image.naturalWidth === 0)
            .map((image) => image.currentSrc || image.getAttribute("src") || "missing-src");
          const visibleEmptyStateCount = [
            ...document.querySelectorAll(".empty-state, [data-empty-state]"),
          ].filter(visible).length;

          return {
            title: document.title,
            h1Count: document.querySelectorAll("h1").length,
            mainCount: document.querySelectorAll("main").length,
            documentHeight,
            viewportWidth: documentElement.clientWidth,
            horizontalOverflowPixels,
            brokenImages,
            visibleEmptyStateCount,
          };
        });

        await page.screenshot({
          path: filePath,
          fullPage: true,
          animations: "disabled",
          caret: "hide",
        });

        const screenshotBytes = fs.statSync(filePath).size;
        const screenshotSha256 = sha256File(filePath);

        records.push({
          route,
          resolved_url: resolvedUrl,
          http_status: response.status(),
          file: toPosix(path.relative(repositoryRoot, filePath)),
          screenshot_bytes: screenshotBytes,
          screenshot_sha256: screenshotSha256,
          metrics: {
            ...metrics,
            pageErrors,
            consoleErrors,
          },
        });
        console.log(`[${deviceName}] captured ${route}`);
      } catch (error) {
        failures.push({
          route,
          resolved_url: resolvedUrl,
          error: error instanceof Error ? error.message : String(error),
          page_errors: pageErrors,
          console_errors: consoleErrors,
        });
        console.error(
          `[${deviceName}] failed ${route}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      } finally {
        await page.close();
      }
    }

    await context.close();

    const manifest = {
      schema_version: "1.0",
      generated_at: new Date().toISOString(),
      source_type: "local-preview",
      base_url: baseUrl,
      device: deviceName,
      viewport: device.viewport,
      configured_route_count: matsuriPublicRoutes.length,
      generated_route_count: generatedRoutes.length,
      selected_route_count: matsuriPublicRoutes.length,
      captured_count: records.length,
      failed_count: failures.length,
      records,
      failures,
    };

    fs.writeFileSync(
      manifestPath,
      `${JSON.stringify(manifest, null, 2)}\n`,
      "utf8",
    );

    await zipDirectory(outputDirectory, zipPath);
    totalFailures += failures.length;

    console.log(
      `[${deviceName}] ${records.length}/${matsuriPublicRoutes.length} routes captured; ${failures.length} failed.`,
    );
  }
} finally {
  await browser.close();
}

if (totalFailures > 0) {
  process.exitCode = 1;
}
