import { defineConfig } from "@playwright/test";

const expectedOrigin = "https://matsuri-yukue.badjoke-lab.com";
const configuredOrigin = process.env.MATSURI_CANONICAL_ORIGIN;

if (!configuredOrigin) {
  throw new Error("MATSURI_CANONICAL_ORIGIN is required for canonical browser verification.");
}

const parsedOrigin = new URL(configuredOrigin);
parsedOrigin.pathname = "/";
parsedOrigin.search = "";
parsedOrigin.hash = "";

if (parsedOrigin.origin !== expectedOrigin) {
  throw new Error(
    `Unexpected Matsuri canonical origin: ${parsedOrigin.origin}; expected ${expectedOrigin}.`,
  );
}

export default defineConfig({
  testDir: "./tests/canonical",
  timeout: 90_000,
  expect: {
    timeout: 20_000,
  },
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  outputDir: "test-results/canonical",
  reporter: [
    ["line"],
    ["html", { outputFolder: "playwright-report/canonical", open: "never" }],
  ],
  use: {
    baseURL: expectedOrigin,
    headless: true,
    viewport: { width: 1440, height: 1000 },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "canonical-chromium",
      use: {
        browserName: "chromium",
      },
    },
  ],
});
