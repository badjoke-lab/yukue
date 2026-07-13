import { defineConfig } from "@playwright/test";

const canonicalOrigin =
  process.env.MATSURI_CANONICAL_ORIGIN ??
  "https://matsuri-yukue.badjoke-lab.com";

export default defineConfig({
  testDir: "./tests/canonical",
  testMatch: "matsuri-search.spec.mjs",
  timeout: 90_000,
  expect: {
    timeout: 20_000,
  },
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ["line"],
    ["html", { outputFolder: "playwright-report/canonical-search", open: "never" }],
  ],
  outputDir: "test-results/canonical-search",
  use: {
    baseURL: canonicalOrigin,
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    navigationTimeout: 30_000,
    actionTimeout: 15_000,
  },
  projects: [
    {
      name: "desktop-chromium",
      use: {
        browserName: "chromium",
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile-chromium",
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
      },
    },
  ],
});
