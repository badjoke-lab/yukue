import { defineConfig } from "@playwright/test";
import {
  matsuriTabletBrowserDevice,
  matsuriVisualDevices,
} from "./config/matsuri-visual-routes.mjs";

export default defineConfig({
  testDir: "./tests/browser",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [["line"]],
  use: {
    baseURL: "http://127.0.0.1:4321",
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command:
      "pnpm --dir apps/matsuri exec astro preview --host 127.0.0.1 --port 4321",
    url: "http://127.0.0.1:4321/status/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop-chromium",
      use: {
        browserName: "chromium",
        viewport: matsuriVisualDevices.desktop.viewport,
      },
    },
    {
      name: "tablet-chromium",
      use: {
        browserName: "chromium",
        viewport: matsuriTabletBrowserDevice.viewport,
        hasTouch: matsuriTabletBrowserDevice.hasTouch,
      },
    },
    {
      name: "mobile-chromium",
      use: {
        browserName: "chromium",
        viewport: matsuriVisualDevices.mobile.viewport,
        hasTouch: matsuriVisualDevices.mobile.hasTouch,
        isMobile: matsuriVisualDevices.mobile.isMobile,
      },
    },
  ],
});
