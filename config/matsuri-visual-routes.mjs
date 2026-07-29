export const matsuriPublicRoutes = Object.freeze([
  "/",
  "/about/",
  "/festivals/",
  "/festivals/suneori-amagoi/",
  "/festivals/aso-onda-matsuri/",
  "/festivals/soma-nomaoi/",
  "/festivals/nunokawa-hana-matsuri/",
  "/festivals/gion-matsuri-kyoto/",
  "/festivals/gion-takayama/",
  "/festivals/shinjo-matsuri/",
  "/festivals/sanja-matsuri/",
  "/festivals/nagasaki-kunchi/",
  "/performances/",
  "/performances/hayachine-kagura/",
  "/performances/dainichido-bugaku/",
  "/organizations/",
  "/organizations/suneori-amagoi-hozonkai/",
  "/organizations/aomori-nebuta-committee/",
  "/references/shrines/aso-jinja/",
  "/references/shrines/shinjo-tenmangu/",
  "/references/shrines/asakusa-jinja/",
  "/references/shrines/nagasaki-suwa-jinja/",
  "/places/suneori-shirahige/",
  "/places/gion-yamahoko-route/",
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
  if (matsuriPublicRoutes.length !== 38) {
    throw new Error(
      `The representative Matsuri visual contract requires 38 routes; found ${matsuriPublicRoutes.length}. Update docs/visual-review-workflow.md before changing the coverage model.`,
    );
  }

  if (new Set(matsuriPublicRoutes).size !== matsuriPublicRoutes.length) {
    throw new Error("Matsuri visual route contract contains duplicate routes.");
  }

  const requiredFamilies = [
    "/",
    "/festivals/",
    "/performances/",
    "/organizations/",
    "/references/shrines/",
    "/places/",
    "/states/",
    "/search/",
  ];
  for (const family of requiredFamilies) {
    if (!matsuriPublicRoutes.some((route) => route.startsWith(family))) {
      throw new Error(`Matsuri visual contract is missing page-family coverage for ${family}`);
    }
  }

  if (!matsuriPublicRoutes.includes("/festivals/aso-onda-matsuri/")) {
    throw new Error("Matsuri visual contract must retain the 御田祭 ritual-anchor regression route.");
  }
  if (!matsuriPublicRoutes.includes("/festivals/shinjo-matsuri/")) {
    throw new Error("Matsuri visual contract must retain the new 新庄まつり Detail C route.");
  }
  if (!matsuriPublicRoutes.includes("/references/shrines/shinjo-tenmangu/")) {
    throw new Error("Matsuri visual contract must retain the State-free 新庄天満神社 seed route.");
  }
  if (!matsuriPublicRoutes.includes("/festivals/sanja-matsuri/")) {
    throw new Error("Matsuri visual contract must retain the new 三社祭 Detail C route.");
  }
  if (!matsuriPublicRoutes.includes("/references/shrines/asakusa-jinja/")) {
    throw new Error("Matsuri visual contract must retain the State-free 浅草神社 seed route.");
  }
  if (!matsuriPublicRoutes.includes("/festivals/gion-matsuri-kyoto/")) {
    throw new Error("Matsuri visual contract must retain the deepened 祇園祭 Detail C route.");
  }
  if (!matsuriPublicRoutes.includes("/festivals/nagasaki-kunchi/")) {
    throw new Error("Matsuri visual contract must retain the new 長崎くんち Detail C route.");
  }
  if (!matsuriPublicRoutes.includes("/references/shrines/nagasaki-suwa-jinja/")) {
    throw new Error("Matsuri visual contract must retain the State-free 長崎諏訪神社 seed route.");
  }

  for (const route of matsuriPublicRoutes) {
    if (!route.startsWith("/") || !route.endsWith("/")) {
      throw new Error(`Matsuri visual route must be root-relative and end with a slash: ${route}`);
    }
  }

  return true;
}
