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
  if (matsuriPublicRoutes.length !== 72) {
    throw new Error(
      `The representative Matsuri visual contract requires 72 routes; found ${matsuriPublicRoutes.length}. Update docs/visual-review-workflow.md before changing the coverage model.`,
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

  if (!matsuriPublicRoutes.includes("/festivals/aso-onda-matsuri/")) throw new Error("Matsuri visual contract must retain the 御田祭 ritual-anchor regression route.");
  if (!matsuriPublicRoutes.includes("/festivals/shinjo-matsuri/")) throw new Error("Matsuri visual contract must retain the new 新庄まつり Detail C route.");
  if (!matsuriPublicRoutes.includes("/references/shrines/shinjo-tenmangu/")) throw new Error("Matsuri visual contract must retain the State-free 新庄天満神社 seed route.");
  if (!matsuriPublicRoutes.includes("/festivals/sanja-matsuri/")) throw new Error("Matsuri visual contract must retain the deepened 三社祭 Detail C route.");
  if (!matsuriPublicRoutes.includes("/references/shrines/asakusa-jinja/")) throw new Error("Matsuri visual contract must retain the State-free 浅草神社 seed route.");
  if (!matsuriPublicRoutes.includes("/festivals/gion-matsuri-kyoto/")) throw new Error("Matsuri visual contract must retain the deepened 祇園祭 Detail C route.");
  if (!matsuriPublicRoutes.includes("/festivals/nagasaki-kunchi/")) throw new Error("Matsuri visual contract must retain the new 長崎くんち Detail C route.");
  if (!matsuriPublicRoutes.includes("/references/shrines/nagasaki-suwa-jinja/")) throw new Error("Matsuri visual contract must retain the State-free 長崎諏訪神社 seed route.");
  if (!matsuriPublicRoutes.includes("/festivals/kochi-yosakoi-matsuri/")) throw new Error("Matsuri visual contract must retain the new よさこい祭り Detail C route.");
  if (!matsuriPublicRoutes.includes("/festivals/hana-matsuri-toei/")) throw new Error("Matsuri visual contract must retain the deepened 東栄町花祭 Detail C route.");
  if (!matsuriPublicRoutes.includes("/organizations/yosakoi-shinkokai/")) throw new Error("Matsuri visual contract must retain the よさこい祭振興会 organization route.");
  if (!matsuriPublicRoutes.includes("/places/yosakoi-chuo-koen/")) throw new Error("Matsuri visual contract must retain the よさこい中央公園 Place route.");
  if (!matsuriPublicRoutes.includes("/festivals/sawara-grand-festival/")) throw new Error("Matsuri visual contract must retain the new 佐原の大祭 Detail C route.");
  if (!matsuriPublicRoutes.includes("/references/shrines/sawara-yasaka-jinja/")) throw new Error("Matsuri visual contract must retain the State-free 佐原八坂神社 seed route.");
  if (!matsuriPublicRoutes.includes("/references/shrines/sawara-suwa-jinja/")) throw new Error("Matsuri visual contract must retain the State-free 佐原諏訪神社 seed route.");
  if (!matsuriPublicRoutes.includes("/festivals/yamaga-toro-matsuri/")) throw new Error("Matsuri visual contract must retain the deepened 山鹿灯籠まつり Detail C route.");
  if (!matsuriPublicRoutes.includes("/festivals/hita-gion/")) throw new Error("Matsuri visual contract must retain the new 日田祇園 Detail C route.");
  if (!matsuriPublicRoutes.includes("/performances/take-kagura/")) throw new Error("Matsuri visual contract must retain the deepened 岳神楽 Detail C route.");
  if (!matsuriPublicRoutes.includes("/performances/ootsugunai-kagura/")) throw new Error("Matsuri visual contract must retain the deepened 大償神楽 Detail C route.");
  if (!matsuriPublicRoutes.includes("/places/hita-station-front/")) throw new Error("Matsuri visual contract must retain the 日田駅前集団顔見世 Place route.");
  if (!matsuriPublicRoutes.includes("/festivals/mibu-hanadaue/")) throw new Error("Matsuri visual contract must retain the new 壬生の花田植 Detail C route.");
  if (!matsuriPublicRoutes.includes("/performances/sada-shin-noh/")) throw new Error("Matsuri visual contract must retain the deepened 佐陀神能 Detail C route.");
  if (!matsuriPublicRoutes.includes("/organizations/mibu-hanadaue-hozonkai/")) throw new Error("Matsuri visual contract must retain the 壬生の花田植保存会 organization route.");
  if (!matsuriPublicRoutes.includes("/places/mibu-hanadaue-field/")) throw new Error("Matsuri visual contract must retain the 壬生の花田植会場 Place route.");
  if (!matsuriPublicRoutes.includes("/festivals/yamaage-matsuri/")) throw new Error("Matsuri visual contract must retain the new 山あげ祭 Detail C route.");
  if (!matsuriPublicRoutes.includes("/references/shrines/karasuyama-yakumo-jinja/")) throw new Error("Matsuri visual contract must retain the State-free 烏山八雲神社 seed route.");
  if (!matsuriPublicRoutes.includes("/places/karasuyama-yakumo-jinja/")) throw new Error("Matsuri visual contract must retain the 烏山八雲神社 Place route.");
  if (!matsuriPublicRoutes.includes("/places/karasuyama-city-center/")) throw new Error("Matsuri visual contract must retain the distributed 山あげ公演区域 Place route.");
  if (!matsuriPublicRoutes.includes("/performances/dainichido-bugaku/")) throw new Error("Matsuri visual contract must retain the deepened 大日堂舞楽 Detail C route.");
  if (!matsuriPublicRoutes.includes("/festivals/seihakusai/")) throw new Error("Matsuri visual contract must retain the new 青柏祭 Detail C route.");
  if (!matsuriPublicRoutes.includes("/references/shrines/nanao-oyama-jinja/")) throw new Error("Matsuri visual contract must retain the State-free 大地主神社 seed route.");
  if (!matsuriPublicRoutes.includes("/places/nanao-oyama-jinja/")) throw new Error("Matsuri visual contract must retain the 大地主神社 Place route.");
  if (!matsuriPublicRoutes.includes("/places/nanao-seihakusai-route/")) throw new Error("Matsuri visual contract must retain the distributed 青柏祭巡行区域 Place route.");
  if (!matsuriPublicRoutes.includes("/festivals/yoshida-fire-festival/")) throw new Error("Matsuri visual contract must retain the new 吉田の火祭 Detail C route.");
  if (!matsuriPublicRoutes.includes("/references/shrines/kitaguchi-hongu-fuji-sengen-jinja/")) throw new Error("Matsuri visual contract must retain the State-free 北口本宮冨士浅間神社 seed route.");
  if (!matsuriPublicRoutes.includes("/references/shrines/kitaguchi-suwa-jinja/")) throw new Error("Matsuri visual contract must retain the State-free 北口諏訪神社 seed route.");
  if (!matsuriPublicRoutes.includes("/places/kitaguchi-hongu-fuji-sengen/")) throw new Error("Matsuri visual contract must retain the 北口本宮冨士浅間神社・諏訪神社 Place route.");
  if (!matsuriPublicRoutes.includes("/places/yoshida-fire-route/")) throw new Error("Matsuri visual contract must retain the route-based 吉田の火祭巡行区域 Place route.");
  if (!matsuriPublicRoutes.includes("/festivals/ueno-tenjin-matsuri/")) throw new Error("Matsuri visual contract must retain the new 上野天神祭 Detail C route.");
  if (!matsuriPublicRoutes.includes("/references/shrines/iga-sugawara-jinja/")) throw new Error("Matsuri visual contract must retain the State-free 伊賀菅原神社 seed route.");
  if (!matsuriPublicRoutes.includes("/organizations/ueno-bunka-bijutsu-hozonkai/")) throw new Error("Matsuri visual contract must retain the 上野文化美術保存会 organization route.");
  if (!matsuriPublicRoutes.includes("/places/iga-sugawara-jinja/")) throw new Error("Matsuri visual contract must retain the 菅原神社 Place route.");
  if (!matsuriPublicRoutes.includes("/places/ueno-tenjin-route/")) throw new Error("Matsuri visual contract must retain the route-based 上野天神祭巡行区域 Place route.");

  for (const route of matsuriPublicRoutes) {
    if (!route.startsWith("/") || !route.endsWith("/")) {
      throw new Error(`Matsuri visual route must be root-relative and end with a slash: ${route}`);
    }
  }

  return true;
}
