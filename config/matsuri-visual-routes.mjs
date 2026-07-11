export const matsuriPublicRoutes = Object.freeze([
  "/",
  "/about/",
  "/festivals/",
  "/festivals/suneori-amagoi/",
  "/performances/",
  "/organizations/",
  "/regions/",
  "/changes/",
  "/states/",
  "/states/active/",
  "/states/reduced_activity/",
  "/states/suspended/",
  "/states/dormant/",
  "/states/reviving/",
  "/states/discontinued/",
  "/states/unknown/",
  "/search/",
  "/methodology/",
  "/data/",
  "/status/",
]);

export const matsuriVisualDevices = Object.freeze({
  desktop: Object.freeze({
    viewport: Object.freeze({ width: 1440, height: 900 }),
    isMobile: false,
    hasTouch: false,
  }),
  mobile: Object.freeze({
    viewport: Object.freeze({ width: 390, height: 844 }),
    isMobile: true,
    hasTouch: true,
  }),
});

export const matsuriTabletBrowserDevice = Object.freeze({
  viewport: Object.freeze({ width: 768, height: 1024 }),
  isMobile: false,
  hasTouch: true,
});

export function assertMatsuriVisualContract() {
  if (matsuriPublicRoutes.length !== 20) {
    throw new Error(
      `F2-M01 requires 20 exhaustive Matsuri public routes; found ${matsuriPublicRoutes.length}. Update docs/visual-review-workflow.md before changing the coverage model.`,
    );
  }

  if (new Set(matsuriPublicRoutes).size !== matsuriPublicRoutes.length) {
    throw new Error("Matsuri visual route contract contains duplicate routes.");
  }

  for (const route of matsuriPublicRoutes) {
    if (!route.startsWith("/") || !route.endsWith("/")) {
      throw new Error(`Matsuri visual route must be root-relative and end with a slash: ${route}`);
    }
  }

  return true;
}
