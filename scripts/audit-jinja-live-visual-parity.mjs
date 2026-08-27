import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const outputRoot = path.resolve("artifacts/jinja-live-visual-parity");
const matsuriOrigin = "https://matsuri-yukue.badjoke-lab.com";
const jinjaOrigin = "https://jinja-yukue.badjoke-lab.workers.dev";

const devices = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

const routePairs = [
  { id: "home", matsuri: "/", jinja: "/" },
  { id: "index", matsuri: "/festivals/", jinja: "/shrines/" },
  { id: "detail", matsuri: "/festivals/aso-onda-matsuri/", jinja: "/shrines/shr-aso-jinja/", detail: true },
  { id: "regions", matsuri: "/regions/", jinja: "/regions/" },
  { id: "changes", matsuri: "/changes/", jinja: "/changes/" },
  { id: "search", matsuri: "/search/", jinja: "/search/" },
  { id: "about", matsuri: "/about/", jinja: "/about/" },
  { id: "methodology", matsuri: "/methodology/", jinja: "/methodology/" },
  { id: "data", matsuri: "/data/", jinja: "/data/" },
  { id: "status", matsuri: "/status/", jinja: "/status/" },
];

function ensure(condition, message, failures) {
  if (!condition) failures.push(message);
}

function rounded(value) {
  return Math.round(Number(value) * 100) / 100;
}

async function inspect(page, origin, pathname, site, device, screenshotPath) {
  const response = await page.goto(new URL(pathname, origin).href, {
    waitUntil: "domcontentloaded",
    timeout: 45_000,
  });
  await page.waitForTimeout(800);

  const metrics = await page.evaluate(({ expectedSite, deviceName }) => {
    const style = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const computed = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        display: computed.display,
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        lineHeight: computed.lineHeight,
        color: computed.color,
        backgroundColor: computed.backgroundColor,
        width: rect.width,
        height: rect.height,
      };
    };

    const html = document.documentElement;
    const body = document.body;
    const bodyStyle = getComputedStyle(body);
    const firstWideContainer = document.querySelector('.yk-container[data-size="wide"]') ?? document.querySelector('.yk-container');
    const firstWideRect = firstWideContainer?.getBoundingClientRect();
    const header = document.querySelector('.yk-site-header');
    const footer = document.querySelector('.yk-site-footer');
    const desktopNav = document.querySelector('.yk-site-nav');
    const mobileNav = document.querySelector('.yk-site-header__mobile');
    const main = document.querySelector('main');

    return {
      expectedSite,
      deviceName,
      dataSite: html.dataset.site ?? null,
      title: document.title,
      robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? null,
      viewportWidth: window.innerWidth,
      scrollWidth: html.scrollWidth,
      bodyBackground: bodyStyle.backgroundColor,
      bodyColor: bodyStyle.color,
      bodyFontFamily: bodyStyle.fontFamily,
      h1: style('h1'),
      header: style('.yk-site-header'),
      footer: style('.yk-site-footer'),
      firstWideContainerWidth: firstWideRect?.width ?? null,
      sectionCount: document.querySelectorAll('.yk-section').length,
      headerExists: Boolean(header),
      footerExists: Boolean(footer),
      mainExists: Boolean(main),
      desktopNavDisplay: desktopNav ? getComputedStyle(desktopNav).display : null,
      mobileNavDisplay: mobileNav ? getComputedStyle(mobileNav).display : null,
      evidenceListCount: document.querySelectorAll('.yk-evidence-list').length,
      evidenceRowCount: document.querySelectorAll('[data-evidence-row]').length,
      placeMapCount: document.querySelectorAll('.yk-place-map').length,
      embeddedMapCount: document.querySelectorAll('[data-embedded-map]').length,
      changesSection: Boolean(document.querySelector('#changes')),
      relationsSection: Boolean(document.querySelector('#relations')),
      evidenceSection: Boolean(document.querySelector('#evidence')),
      recordUpdatesSection: Boolean(document.querySelector('#record-updates')),
      machineDataSection: Boolean(document.querySelector('#machine-data')),
    };
  }, { expectedSite: site, deviceName: device });

  fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
  await page.screenshot({ path: screenshotPath, fullPage: true });

  return {
    status: response?.status() ?? null,
    url: page.url(),
    metrics,
  };
}

const browser = await chromium.launch();
const failures = [];
const results = [];

try {
  for (const [deviceName, viewport] of Object.entries(devices)) {
    const context = await browser.newContext({ viewport });
    try {
      for (const pair of routePairs) {
        const matsuriPage = await context.newPage();
        const jinjaPage = await context.newPage();
        try {
          const [matsuri, jinja] = await Promise.all([
            inspect(
              matsuriPage,
              matsuriOrigin,
              pair.matsuri,
              "matsuri",
              deviceName,
              path.join(outputRoot, deviceName, `${pair.id}.matsuri.png`),
            ),
            inspect(
              jinjaPage,
              jinjaOrigin,
              pair.jinja,
              "jinja",
              deviceName,
              path.join(outputRoot, deviceName, `${pair.id}.jinja.png`),
            ),
          ]);

          const prefix = `${deviceName}/${pair.id}`;
          ensure(matsuri.status === 200, `${prefix}: Matsuri HTTP ${matsuri.status}`, failures);
          ensure(jinja.status === 200, `${prefix}: Jinja HTTP ${jinja.status}`, failures);
          ensure(matsuri.metrics.dataSite === "matsuri", `${prefix}: Matsuri data-site mismatch`, failures);
          ensure(jinja.metrics.dataSite === "jinja", `${prefix}: Jinja data-site mismatch`, failures);
          ensure(jinja.metrics.robots?.replaceAll(" ", "") === "noindex,nofollow", `${prefix}: Jinja robots boundary missing`, failures);
          ensure(matsuri.metrics.headerExists && jinja.metrics.headerExists, `${prefix}: shared header missing`, failures);
          ensure(matsuri.metrics.footerExists && jinja.metrics.footerExists, `${prefix}: shared footer missing`, failures);
          ensure(matsuri.metrics.mainExists && jinja.metrics.mainExists, `${prefix}: main landmark missing`, failures);
          ensure(jinja.metrics.sectionCount > 0, `${prefix}: Jinja shared Section structure missing`, failures);
          ensure(matsuri.metrics.scrollWidth <= matsuri.metrics.viewportWidth + 1, `${prefix}: Matsuri horizontal overflow ${matsuri.metrics.scrollWidth}/${matsuri.metrics.viewportWidth}`, failures);
          ensure(jinja.metrics.scrollWidth <= jinja.metrics.viewportWidth + 1, `${prefix}: Jinja horizontal overflow ${jinja.metrics.scrollWidth}/${jinja.metrics.viewportWidth}`, failures);
          ensure(matsuri.metrics.bodyBackground === jinja.metrics.bodyBackground, `${prefix}: body background differs`, failures);
          ensure(matsuri.metrics.bodyColor === jinja.metrics.bodyColor, `${prefix}: body text color differs`, failures);
          ensure(matsuri.metrics.bodyFontFamily === jinja.metrics.bodyFontFamily, `${prefix}: body font family differs`, failures);
          ensure(matsuri.metrics.h1?.fontFamily === jinja.metrics.h1?.fontFamily, `${prefix}: h1 font family differs`, failures);
          ensure(matsuri.metrics.h1?.fontSize === jinja.metrics.h1?.fontSize, `${prefix}: h1 font size differs (${matsuri.metrics.h1?.fontSize} vs ${jinja.metrics.h1?.fontSize})`, failures);

          if (matsuri.metrics.firstWideContainerWidth != null && jinja.metrics.firstWideContainerWidth != null) {
            const delta = Math.abs(matsuri.metrics.firstWideContainerWidth - jinja.metrics.firstWideContainerWidth);
            ensure(delta <= 2, `${prefix}: shared container width differs by ${rounded(delta)}px`, failures);
          }

          if (matsuri.metrics.header?.height != null && jinja.metrics.header?.height != null) {
            const delta = Math.abs(matsuri.metrics.header.height - jinja.metrics.header.height);
            ensure(delta <= 2, `${prefix}: shared header height differs by ${rounded(delta)}px`, failures);
          }

          if (deviceName === "desktop") {
            ensure(matsuri.metrics.desktopNavDisplay !== "none" && jinja.metrics.desktopNavDisplay !== "none", `${prefix}: desktop navigation hidden`, failures);
          } else {
            ensure(matsuri.metrics.mobileNavDisplay !== "none" && jinja.metrics.mobileNavDisplay !== "none", `${prefix}: mobile navigation hidden`, failures);
          }

          if (pair.detail) {
            ensure(jinja.metrics.placeMapCount > 0, `${prefix}: Jinja detail missing PlaceMap`, failures);
            ensure(jinja.metrics.evidenceListCount > 0 && jinja.metrics.evidenceRowCount > 0, `${prefix}: Jinja detail missing EvidenceList rows`, failures);
            ensure(jinja.metrics.changesSection, `${prefix}: Jinja detail missing Changes section`, failures);
            ensure(jinja.metrics.relationsSection, `${prefix}: Jinja detail missing Relations section`, failures);
            ensure(jinja.metrics.evidenceSection, `${prefix}: Jinja detail missing Evidence section`, failures);
            ensure(jinja.metrics.recordUpdatesSection, `${prefix}: Jinja detail missing Record Updates section`, failures);
            ensure(jinja.metrics.machineDataSection, `${prefix}: Jinja detail missing Machine-readable section`, failures);
          }

          results.push({ device: deviceName, pair, matsuri, jinja });
          console.log(
            `[visual-parity] ${prefix} OK candidates: Matsuri ${matsuri.status}, Jinja ${jinja.status}, container ${rounded(matsuri.metrics.firstWideContainerWidth)}px/${rounded(jinja.metrics.firstWideContainerWidth)}px`,
          );
        } finally {
          await matsuriPage.close();
          await jinjaPage.close();
        }
      }
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}

const report = {
  audited_at: new Date().toISOString(),
  matsuri_origin: matsuriOrigin,
  jinja_origin: jinjaOrigin,
  devices,
  route_pairs: routePairs,
  result_count: results.length,
  failure_count: failures.length,
  failures,
  results,
};

fs.mkdirSync(outputRoot, { recursive: true });
fs.writeFileSync(path.join(outputRoot, "report.json"), `${JSON.stringify(report, null, 2)}\n`);

console.log(`Jinja live visual parity audit: ${results.length} paired device/routes; failures=${failures.length}`);
if (failures.length > 0) {
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
