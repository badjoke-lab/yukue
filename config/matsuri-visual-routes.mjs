export const matsuriPublicRoutes = Object.freeze([
  "/",
  "/about/",
  "/festivals/",
  "/festivals/suneori-amagoi/",
  "/festivals/aso-onda-matsuri/",
  "/festivals/soma-nomaoi/",
  "/festivals/hana-matsuri-toei/",
  "/festivals/nunokawa-hana-matsuri/",
  "/festivals/gion-matsuri-kyoto/",
  "/festivals/gion-takayama/",
  "/festivals/shinjo-matsuri/",
  "/festivals/sanja-matsuri/",
  "/festivals/nagasaki-kunchi/",
  "/festivals/kochi-yosakoi-matsuri/",
  "/festivals/sawara-grand-festival/",
  "/festivals/yamaga-toro-matsuri/",
  "/festivals/hita-gion/",
  "/festivals/mibu-hanadaue/",
  "/festivals/yamaage-matsuri/",
  "/festivals/seihakusai/",
  "/festivals/yoshida-fire-festival/",
  "/festivals/ueno-tenjin-matsuri/",
  "/festivals/ishioka-matsuri/",
  "/festivals/kasuga-wakamiya-onmatsuri/",
  "/performances/",
  "/performances/hayachine-kagura/",
  "/performances/take-kagura/",
  "/performances/ootsugunai-kagura/",
  "/performances/dainichido-bugaku/",
  "/performances/sada-shin-noh/",
  "/organizations/",
  "/organizations/suneori-amagoi-hozonkai/",
  "/organizations/aomori-nebuta-committee/",
  "/organizations/yosakoi-shinkokai/",
  "/organizations/mibu-hanadaue-hozonkai/",
  "/organizations/ueno-bunka-bijutsu-hozonkai/",
  "/references/shrines/aso-jinja/",
  "/references/shrines/shinjo-tenmangu/",
  "/references/shrines/asakusa-jinja/",
  "/references/shrines/nagasaki-suwa-jinja/",
  "/references/shrines/sawara-yasaka-jinja/",
  "/references/shrines/sawara-suwa-jinja/",
  "/references/shrines/karasuyama-yakumo-jinja/",
  "/references/shrines/nanao-oyama-jinja/",
  "/references/shrines/kitaguchi-hongu-fuji-sengen-jinja/",
  "/references/shrines/kitaguchi-suwa-jinja/",
  "/references/shrines/iga-sugawara-jinja/",
  "/references/shrines/hitachi-sosogu-jinja/",
  "/references/shrines/kasuga-wakamiya/",
  "/places/suneori-shirahige/",
  "/places/gion-yamahoko-route/",
  "/places/yosakoi-chuo-koen/",
  "/places/hita-station-front/",
  "/places/mibu-hanadaue-field/",
  "/places/karasuyama-yakumo-jinja/",
  "/places/karasuyama-city-center/",
  "/places/nanao-oyama-jinja/",
  "/places/nanao-seihakusai-route/",
  "/places/kitaguchi-hongu-fuji-sengen/",
  "/places/yoshida-fire-route/",
  "/places/iga-sugawara-jinja/",
  "/places/ueno-tenjin-route/",
  "/places/hitachi-sosogu-jinja/",
  "/places/ishioka-matsuri-route/",
  "/places/kasuga-wakamiya/",
  "/places/kasuga-onmatsuri-otabisho/",
  "/places/kasuga-onmatsuri-owatari-route/",
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
  if (matsuriPublicRoutes.length !== 81) {
    throw new Error(
      `The representative Matsuri visual contract requires 81 routes; found ${matsuriPublicRoutes.length}. Update docs/visual-review-workflow.md before changing the coverage model.`,
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

  const requiredRegressionRoutes = [
    "/festivals/suneori-amagoi/",
    "/festivals/aso-onda-matsuri/",
    "/festivals/soma-nomaoi/",
    "/festivals/hana-matsuri-toei/",
    "/festivals/nunokawa-hana-matsuri/",
    "/festivals/gion-matsuri-kyoto/",
    "/festivals/gion-takayama/",
    "/festivals/shinjo-matsuri/",
    "/festivals/sanja-matsuri/",
    "/festivals/nagasaki-kunchi/",
    "/festivals/kochi-yosakoi-matsuri/",
    "/festivals/sawara-grand-festival/",
    "/festivals/yamaga-toro-matsuri/",
    "/festivals/hita-gion/",
    "/festivals/mibu-hanadaue/",
    "/festivals/yamaage-matsuri/",
    "/festivals/seihakusai/",
    "/festivals/yoshida-fire-festival/",
    "/festivals/ueno-tenjin-matsuri/",
    "/festivals/ishioka-matsuri/",
    "/festivals/kasuga-wakamiya-onmatsuri/",
    "/performances/hayachine-kagura/",
    "/performances/take-kagura/",
    "/performances/ootsugunai-kagura/",
    "/performances/dainichido-bugaku/",
    "/performances/sada-shin-noh/",
    "/organizations/suneori-amagoi-hozonkai/",
    "/organizations/aomori-nebuta-committee/",
    "/organizations/yosakoi-shinkokai/",
    "/organizations/mibu-hanadaue-hozonkai/",
    "/organizations/ueno-bunka-bijutsu-hozonkai/",
    "/references/shrines/aso-jinja/",
    "/references/shrines/shinjo-tenmangu/",
    "/references/shrines/asakusa-jinja/",
    "/references/shrines/nagasaki-suwa-jinja/",
    "/references/shrines/sawara-yasaka-jinja/",
    "/references/shrines/sawara-suwa-jinja/",
    "/references/shrines/karasuyama-yakumo-jinja/",
    "/references/shrines/nanao-oyama-jinja/",
    "/references/shrines/kitaguchi-hongu-fuji-sengen-jinja/",
    "/references/shrines/kitaguchi-suwa-jinja/",
    "/references/shrines/iga-sugawara-jinja/",
    "/references/shrines/hitachi-sosogu-jinja/",
    "/references/shrines/kasuga-wakamiya/",
    "/places/suneori-shirahige/",
    "/places/gion-yamahoko-route/",
    "/places/yosakoi-chuo-koen/",
    "/places/hita-station-front/",
    "/places/mibu-hanadaue-field/",
    "/places/karasuyama-yakumo-jinja/",
    "/places/karasuyama-city-center/",
    "/places/nanao-oyama-jinja/",
    "/places/nanao-seihakusai-route/",
    "/places/kitaguchi-hongu-fuji-sengen/",
    "/places/yoshida-fire-route/",
    "/places/iga-sugawara-jinja/",
    "/places/ueno-tenjin-route/",
    "/places/hitachi-sosogu-jinja/",
    "/places/ishioka-matsuri-route/",
    "/places/kasuga-wakamiya/",
    "/places/kasuga-onmatsuri-otabisho/",
    "/places/kasuga-onmatsuri-owatari-route/",
  ];
  for (const route of requiredRegressionRoutes) {
    if (!matsuriPublicRoutes.includes(route)) {
      throw new Error(`Matsuri visual contract must retain regression route: ${route}`);
    }
  }

  for (const route of matsuriPublicRoutes) {
    if (!route.startsWith("/") || !route.endsWith("/")) {
      throw new Error(`Matsuri visual route must be root-relative and end with a slash: ${route}`);
    }
  }

  return true;
}
