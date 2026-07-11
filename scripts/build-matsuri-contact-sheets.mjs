import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";
import {
  argValue,
  matsuriScreenshotRoot,
  repositoryRoot,
  selectedDeviceNames,
} from "./lib/matsuri-visual-utils.mjs";

const deviceNames = selectedDeviceNames(
  argValue("device", process.env.MATSURI_SCREENSHOT_DEVICE ?? "all"),
);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const auditPath = path.join(matsuriScreenshotRoot, "visual-audit.json");
if (!fs.existsSync(auditPath)) {
  throw new Error("Matsuri visual audit is missing. Run the screenshot audit before contact sheets.");
}

const audit = JSON.parse(fs.readFileSync(auditPath, "utf8"));
if (!audit.ok) {
  throw new Error("Matsuri visual audit did not pass; contact sheets are not final review artifacts.");
}

const browser = await chromium.launch();

try {
  for (const deviceName of deviceNames) {
    const manifestPath = path.join(
      matsuriScreenshotRoot,
      `manifest.${deviceName}.json`,
    );
    if (!fs.existsSync(manifestPath)) {
      throw new Error(`${deviceName} screenshot manifest is missing.`);
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const records = Array.isArray(manifest.records) ? manifest.records : [];
    const cards = records
      .map((record, index) => {
        const absoluteImagePath = path.join(repositoryRoot, record.file);
        if (!fs.existsSync(absoluteImagePath)) {
          throw new Error(`Contact-sheet source screenshot is missing: ${record.file}`);
        }

        return `
          <figure>
            <div class="thumbnail">
              <img src="${escapeHtml(pathToFileURL(absoluteImagePath).href)}" alt="" />
            </div>
            <figcaption>
              <strong>${String(index + 1).padStart(2, "0")} — ${escapeHtml(record.route)}</strong>
              <span>${escapeHtml(record.metrics?.title ?? "Untitled")}</span>
              <span>${Number(record.metrics?.documentHeight) || 0}px document height</span>
            </figcaption>
          </figure>
        `;
      })
      .join("\n");

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Matsuri ${escapeHtml(deviceName)} contact sheet</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 32px;
      background: #e9e9e5;
      color: #171717;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: end;
      gap: 24px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #171717;
    }
    h1 { margin: 0; font-size: 28px; }
    header p { margin: 0; color: #555; }
    main {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 20px;
    }
    figure {
      min-width: 0;
      margin: 0;
      background: #fff;
      border: 1px solid #bdbdb7;
    }
    .thumbnail {
      height: 420px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      overflow: hidden;
      background: #f8f8f6;
      border-bottom: 1px solid #d9d9d4;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: top center;
      display: block;
    }
    figcaption {
      display: grid;
      gap: 4px;
      min-height: 92px;
      padding: 12px;
      font-size: 13px;
      line-height: 1.4;
    }
    figcaption strong {
      font-size: 14px;
      overflow-wrap: anywhere;
    }
    figcaption span { color: #5f5f5b; }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>Matsuri full-page contact sheet — ${escapeHtml(deviceName)}</h1>
      <p>${manifest.viewport.width} × ${manifest.viewport.height} viewport / ${records.length} routes</p>
    </div>
    <p>F2-M01 local-preview artifact</p>
  </header>
  <main>${cards}</main>
</body>
</html>`;

    const temporaryHtmlPath = path.join(
      matsuriScreenshotRoot,
      `.contact-sheet.${deviceName}.html`,
    );
    const outputPath = path.join(
      matsuriScreenshotRoot,
      `contact-sheet.${deviceName}.png`,
    );

    fs.writeFileSync(temporaryHtmlPath, html, "utf8");

    const context = await browser.newContext({
      viewport: { width: 1600, height: 1200 },
      deviceScaleFactor: 1,
      colorScheme: "light",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    try {
      await page.goto(pathToFileURL(temporaryHtmlPath).href, {
        waitUntil: "load",
      });
      await page.waitForFunction(() =>
        [...document.images].every(
          (image) => image.complete && image.naturalWidth > 0,
        ),
      );
      await page.screenshot({
        path: outputPath,
        fullPage: true,
        animations: "disabled",
        caret: "hide",
      });
      console.log(
        `[${deviceName}] contact sheet written: ${path.relative(repositoryRoot, outputPath)}`,
      );
    } finally {
      await page.close();
      await context.close();
      fs.rmSync(temporaryHtmlPath, { force: true });
    }
  }
} finally {
  await browser.close();
}
