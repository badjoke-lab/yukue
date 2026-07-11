import fs from "node:fs";
import path from "node:path";
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
  selectedDeviceNames,
  sha256File,
} from "./lib/matsuri-visual-utils.mjs";

const minimumScreenshotBytes = 5_000;
const deviceNames = selectedDeviceNames(
  argValue("device", process.env.MATSURI_SCREENSHOT_DEVICE ?? "all"),
);

assertMatsuriVisualContract();
const generatedRoutes = await discoverGeneratedPublicRoutes();
const failures = [];
const warnings = [];
const summaries = [];
const capturedRoutesByDevice = new Map();

function check(condition, message) {
  if (!condition) failures.push(message);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

try {
  compareRouteInventories(
    generatedRoutes,
    matsuriPublicRoutes,
    "Generated Matsuri and configured visual",
  );
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
}

for (const deviceName of deviceNames) {
  const manifestPath = path.join(
    matsuriScreenshotRoot,
    `manifest.${deviceName}.json`,
  );

  if (!fs.existsSync(manifestPath)) {
    failures.push(`${deviceName}: capture manifest is missing.`);
    continue;
  }

  const manifest = readJson(manifestPath);
  const expectedDevice = matsuriVisualDevices[deviceName];

  check(manifest.schema_version === "1.0", `${deviceName}: manifest schema must be 1.0.`);
  check(manifest.source_type === "local-preview", `${deviceName}: source_type must be local-preview.`);
  check(manifest.device === deviceName, `${deviceName}: device marker mismatch.`);
  check(
    manifest.viewport?.width === expectedDevice.viewport.width &&
      manifest.viewport?.height === expectedDevice.viewport.height,
    `${deviceName}: viewport does not match the shared visual contract.`,
  );
  check(
    manifest.configured_route_count === matsuriPublicRoutes.length,
    `${deviceName}: configured route count mismatch.`,
  );
  check(
    manifest.generated_route_count === generatedRoutes.length,
    `${deviceName}: generated route count mismatch.`,
  );
  check(
    manifest.selected_route_count === matsuriPublicRoutes.length,
    `${deviceName}: selected route count mismatch.`,
  );
  check(manifest.failed_count === 0, `${deviceName}: ${manifest.failed_count} capture failures remain.`);
  check(
    Array.isArray(manifest.failures) && manifest.failures.length === 0,
    `${deviceName}: failure records remain in the manifest.`,
  );
  check(
    manifest.captured_count === matsuriPublicRoutes.length,
    `${deviceName}: captured ${manifest.captured_count}/${matsuriPublicRoutes.length} routes.`,
  );

  const records = Array.isArray(manifest.records) ? manifest.records : [];
  const capturedRoutes = records.map((record) => record.route);
  capturedRoutesByDevice.set(deviceName, capturedRoutes);

  try {
    compareRouteInventories(
      capturedRoutes,
      matsuriPublicRoutes,
      `${deviceName} captured and configured visual`,
    );
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
  }

  let totalScreenshotBytes = 0;
  let maximumDocumentHeight = 0;
  let visibleEmptyStateCount = 0;

  for (const record of records) {
    const absoluteFilePath = path.join(repositoryRoot, record.file ?? "");
    check(
      typeof record.http_status === "number" && record.http_status < 400,
      `${deviceName}: ${record.route} has invalid HTTP status ${String(record.http_status)}.`,
    );
    check(
      fs.existsSync(absoluteFilePath),
      `${deviceName}: screenshot file is missing for ${record.route}: ${String(record.file)}`,
    );

    if (fs.existsSync(absoluteFilePath)) {
      const size = fs.statSync(absoluteFilePath).size;
      totalScreenshotBytes += size;
      check(
        size === record.screenshot_bytes,
        `${deviceName}: screenshot byte count changed for ${record.route}.`,
      );
      check(
        size >= minimumScreenshotBytes,
        `${deviceName}: screenshot is unexpectedly small for ${record.route}: ${size} bytes.`,
      );
      check(
        sha256File(absoluteFilePath) === record.screenshot_sha256,
        `${deviceName}: screenshot SHA-256 changed for ${record.route}.`,
      );
    }

    const metrics = record.metrics ?? {};
    maximumDocumentHeight = Math.max(
      maximumDocumentHeight,
      Number(metrics.documentHeight) || 0,
    );
    visibleEmptyStateCount += Number(metrics.visibleEmptyStateCount) || 0;

    check(metrics.h1Count === 1, `${deviceName}: ${record.route} must contain exactly one H1.`);
    check(metrics.mainCount === 1, `${deviceName}: ${record.route} must contain exactly one main landmark.`);
    check(
      (Number(metrics.horizontalOverflowPixels) || 0) <= 1,
      `${deviceName}: horizontal overflow on ${record.route}: ${String(metrics.horizontalOverflowPixels)}px.`,
    );
    check(
      Array.isArray(metrics.brokenImages) && metrics.brokenImages.length === 0,
      `${deviceName}: broken images on ${record.route}: ${JSON.stringify(metrics.brokenImages ?? [])}`,
    );
    check(
      Array.isArray(metrics.pageErrors) && metrics.pageErrors.length === 0,
      `${deviceName}: page errors on ${record.route}: ${JSON.stringify(metrics.pageErrors ?? [])}`,
    );
    check(
      Array.isArray(metrics.consoleErrors) && metrics.consoleErrors.length === 0,
      `${deviceName}: console errors on ${record.route}: ${JSON.stringify(metrics.consoleErrors ?? [])}`,
    );
  }

  summaries.push({
    device: deviceName,
    viewport: manifest.viewport,
    configured_routes: matsuriPublicRoutes.length,
    generated_routes: generatedRoutes.length,
    captured_routes: records.length,
    total_screenshot_bytes: totalScreenshotBytes,
    maximum_document_height: maximumDocumentHeight,
    visible_empty_state_count: visibleEmptyStateCount,
  });
}

if (deviceNames.length === 2) {
  const desktopRoutes = capturedRoutesByDevice.get("desktop") ?? [];
  const mobileRoutes = capturedRoutesByDevice.get("mobile") ?? [];

  try {
    compareRouteInventories(
      desktopRoutes,
      mobileRoutes,
      "Desktop and mobile captured",
    );
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
  }
}

const result = {
  schema_version: "1.0",
  generated_at: new Date().toISOString(),
  work_package: "F2-M01",
  ok: failures.length === 0,
  requirements: {
    devices: deviceNames,
    exhaustive_route_count: matsuriPublicRoutes.length,
    minimum_screenshot_bytes: minimumScreenshotBytes,
    maximum_horizontal_overflow_pixels: 1,
  },
  devices: summaries,
  failures,
  warnings,
};

fs.mkdirSync(matsuriScreenshotRoot, { recursive: true });
fs.writeFileSync(
  path.join(matsuriScreenshotRoot, "visual-audit.json"),
  `${JSON.stringify(result, null, 2)}\n`,
  "utf8",
);

const markdown = [
  "# Matsuri visual screenshot audit",
  "",
  `- Work package: F2-M01`,
  `- Result: ${result.ok ? "PASS" : "FAIL"}`,
  `- Devices: ${deviceNames.join(", ")}`,
  `- Exhaustive routes: ${matsuriPublicRoutes.length}`,
  `- Minimum screenshot bytes: ${minimumScreenshotBytes}`,
  "",
  ...summaries.flatMap((summary) => [
    `## ${summary.device}`,
    "",
    `- Viewport: ${summary.viewport.width} × ${summary.viewport.height}`,
    `- Captured: ${summary.captured_routes} / ${summary.configured_routes}`,
    `- Screenshot bytes: ${summary.total_screenshot_bytes}`,
    `- Maximum document height: ${summary.maximum_document_height}px`,
    `- Visible empty states: ${summary.visible_empty_state_count}`,
    "",
  ]),
  "## Failures",
  "",
  ...(failures.length > 0
    ? failures.map((failure) => `- ${failure}`)
    : ["- None"]),
  "",
  "## Warnings",
  "",
  ...(warnings.length > 0
    ? warnings.map((warning) => `- ${warning}`)
    : ["- None"]),
  "",
].join("\n");

fs.writeFileSync(
  path.join(matsuriScreenshotRoot, "visual-audit.md"),
  markdown,
  "utf8",
);

console.log(JSON.stringify(result, null, 2));

if (failures.length > 0) {
  process.exitCode = 1;
}
