# Matsuri Visual Review Workflow

**Status:** Implemented repository baseline / representative page-family review active

## Purpose

The Matsuri visual-review workflow preserves successful full-page renders for human UI review.

It complements, but does not replace:

- the exhaustive Detail C route and navigation gate,
- the automated browser and accessibility audit,
- the repository launch-readiness gate,
- production-origin verification.

The workflow makes page-scale problems visible, including excessive whitespace, weak hierarchy, unstable density, overly long lists, awkward mobile transformations, unloaded third-party embeds, decorative or misleading maps, explicit no-map states, and visual drift that structural checks cannot judge.

## Deployment boundary

Cloudflare is not required for the repository visual-review baseline.

The workflow must:

1. build the current Matsuri static site,
2. discover the complete generated HTML route inventory,
3. verify that every configured representative route exists,
4. start the built site on a GitHub Actions local HTTP server,
5. scroll each useful lazy embedded map into view and verify that its external frame rendered,
6. preserve explicit no-map states where no concrete ritual or main-venue anchor exists,
7. capture the representative page families with Playwright.

The default capture origin is:

```text
http://127.0.0.1:4321
```

Local-preview capture remains the reproducible repository baseline.

## Coverage model

The initial 20-route site used exhaustive screenshot coverage. Detail C completion expanded the public HTML surface to more than ninety routes, including dozens of Entity details, Place details, and seed-reference pages.

The coverage model is now split deliberately:

```text
static Detail C navigation and map-utility gate
  exhaustive across every generated Entity, Relation, Place, browse link, search URL,
  individual JSON route, concrete anchor map, and explicit location-gap state

Chromium Detail C navigation test
  exhaustive across every Entity detail and seed-reference page, including actual
  external-frame loading where a useful anchor map exists

visual screenshot workflow
  representative page-family coverage across desktop and mobile, including useful
  anchor maps and explicit no-map states
```

The shared visual-route configuration currently contains 96 representative routes.

It must include:

- Home,
- About,
- Festival, Folk Performance, and Organization browse pages,
- Region, Change, State, Search, Methodology, Data, and Status pages,
- every State browse variant,
- multiple Festival details including active, suspended, multi-place, and Tradition Unit cases,
- `御田祭` as the permanent ritual-anchor regression page,
- `新庄まつり` and the State-free `新庄天満神社` seed page as Batch 13 visual baselines,
- `日田祇園`, `岳神楽`, `大償神楽`, and `JR日田駅前` as Batch 18 breadth, component-history, and Place baselines,
- `壬生の花田植`, `壬生の花田植保存会`, `壬生の花田植会場`, and `佐陀神能` as Batch 19 breadth, organization, Place, and depth baselines,
- `山あげ祭`, the State-free `烏山八雲神社` seed page, the concrete Shrine Place, and the distributed public-performance area as Batch 20 breadth, ritual-anchor, and map-boundary baselines,
- `大日堂舞楽` as the Batch 20 occurrence-history depth baseline,
- `青柏祭`, the State-free `大地主神社` seed page, the concrete Shrine Place, and the distributed city-center route as Batch 21 breadth, ritual-anchor, and map-boundary baselines,
- `布川地区花祭` as the Batch 21 suspension-history depth baseline,
- `吉田の火祭`, the State-free `北口本宮冨士浅間神社` and `諏訪神社` seed pages, the concrete Shrine Place, and the route-based public area as Batch 22 breadth, ritual-anchor, and map-boundary baselines,
- `上野天神祭`, the State-free `菅原神社` seed page, `上野文化美術保存会`, the concrete Shrine Place, and the route-based city-center area as Batch 23 breadth, organization, ritual-anchor, and map-boundary baselines,
- `三社祭` as the Batch 23 pandemic-format depth baseline,
- `石岡のおまつり`, the State-free `常陸國總社宮` seed page, the concrete Shrine Place, and the route-based city-center area as Batch 24 breadth, ritual-anchor, and map-boundary baselines,
- `早池峰神楽` as the Batch 24 parent-record occurrence and joint-performance history baseline,
- `春日若宮おん祭`, the State-free `春日若宮` seed page, the concrete Shrine Place, the 御旅所, and the route-based 御渡り式経路 as Batch 25 breadth, ritual-anchor, and map-boundary baselines,
- `脚折雨乞` as the Batch 25 cancellation-and-return history depth baseline,
- `長浜曳山祭`, the State-free `長濱八幡宮` seed page, `公益財団法人長浜曳山文化協会`, the concrete Shrine Place, and the route-based 市街地巡行区域 as Batch 26 breadth, organization, ritual-anchor, and map-boundary baselines,
- `佐陀神能` and `島根県立美術館ホール` as the Batch 26 special-public-performance, off-site venue, Entity-to-Place navigation, and map baselines,
- `さぬき高松まつり`, `高松まつり振興会`, `高松市中央公園`, `あなぶきアリーナ香川`, and `サンポート高松多目的広場 石のステージ` as the Batch 27 breadth, organizer, historical-main-venue, venue-change, and current multi-site baselines,
- `岳神楽` and `大償神楽` as the Batch 27 component-designation-history depth baselines,
- `新居浜太鼓祭り`, `新居浜市太鼓祭り推進委員会`, `新居浜太鼓祭り市内運行区域`, and `新居浜市山根市民グラウンド` as the Batch 28 breadth, support-organization, distributed-area, and concrete-venue baselines,
- `御田祭` as the Batch 28 national-designation-history depth baseline while retaining its existing Current State and Occurrence boundaries,
- multiple Folk Performance details,
- multiple Organization details,
- at least one Shrine or Temple seed-reference page,
- at least one concrete point-like Place page,
- at least one route or distributed Place page with an explicit no-map state unless reviewed geometry exists.

A configured representative route missing from the generated site is a failure. Generated routes outside the screenshot set are not failures because exhaustive structural and navigational coverage is enforced separately.

Changing the representative count or removing a required page family requires updating this document and `config/matsuri-visual-routes.mjs` in the same pull request.

## Device contract

Successful full-page screenshots are captured for:

```text
desktop  1440 × 900
mobile    390 × 844
```

Tablet remains in the automated browser audit but is not part of the visual-review artifact set.

Both devices use:

- Chromium,
- device scale factor 1,
- reduced motion,
- a light color scheme,
- hidden caret,
- disabled screenshot animations,
- loaded document fonts before capture,
- useful lazy embedded maps scrolled into view before capture,
- external map-frame origin, body, and element-count checks before capture.

## Capture outputs

The workflow writes under:

```text
artifacts/matsuri-screenshots/
```

Required outputs:

```text
desktop/*.png
mobile/*.png
manifest.desktop.json
manifest.mobile.json
visual-audit.json
visual-audit.md
contact-sheet.desktop.png
contact-sheet.mobile.png
screenshots-desktop.zip
screenshots-mobile.zip
```

With the current 96-route representative contract, an `all` capture produces:

```text
96 desktop full-page PNGs
96 mobile full-page PNGs
192 full-page PNGs total
```

## Capture manifest

Each device manifest records:

- schema version,
- representative coverage mode,
- generated HTML route count,
- configured representative route count,
- route,
- resolved URL,
- output file,
- viewport,
- screenshot byte size,
- screenshot SHA-256,
- page title,
- H1 count,
- main-landmark count,
- document height,
- horizontal overflow pixels,
- broken image URLs,
- visible empty-state count,
- embedded-map count,
- loaded embedded-map count,
- resolved embedded-frame URL,
- embedded-frame HTML length and element count,
- capture failures.

The manifest is evidence of what was rendered. It is not a substitute for reviewing the PNGs.

## Embedded-map capture rule

An iframe tag or a successful parent-page response is not proof that a map was rendered. The presence of a rendered map is also not proof that the map is useful; usefulness is enforced separately by the map-utility gate.

Before capture, each `iframe[data-embedded-map]` must:

1. represent a concrete ritual or main-venue anchor approved by the map-utility gate,
2. be scrolled into the current viewport,
3. navigate away from `about:blank`,
4. resolve to the approved external map origin,
5. expose a visible body,
6. contain non-trivial rendered HTML and child elements,
7. remain loaded while the full-page screenshot is taken.

The capture fails instead of preserving a blank gray map frame when these conditions are not met. Pages without a concrete anchor render an explicit location-gap panel and no iframe.

## Automated screenshot audit

The screenshot audit fails when:

- a configured representative route is missing from the generated site,
- a selected representative route was not captured,
- a capture returned an unsuccessful HTTP response,
- a PNG is missing or unexpectedly small,
- a page does not contain exactly one H1,
- a page does not contain exactly one main landmark,
- document-level horizontal overflow exceeds the accepted tolerance,
- a rendered image is broken,
- a page or console error occurs,
- a declared embedded map was not loaded,
- embedded-map frame metrics are absent or too small to represent rendered content,
- an embedded map resolves away from the approved external origin,
- desktop and mobile captured route inventories differ.

The audit records both the complete generated HTML count and the representative screenshot count. The separate map-utility artifact records all anchored and location-gap detail pages.

## Contact sheets

The workflow generates one contact sheet per device.

Contact sheets show:

- every captured representative route,
- the route label,
- the full-page silhouette in a bounded thumbnail,
- the recorded document height.

Contact sheets do not replace opening the original full-resolution PNGs when a problem is suspected. Embedded maps and no-map states must be checked in the original PNG at readable scale because a blank or misleading map can be difficult to detect in a contact-sheet thumbnail.

## Workflow triggers

The dedicated screenshot workflow supports:

- manual `workflow_dispatch`,
- automatic pull-request runs for UI, layout, style, visual-route, screenshot-script, Playwright, and workflow changes.

The workflow is intentionally separate from the normal repository gate so that data-only and non-visual maintenance do not always generate one hundred ninety-two PNGs.

A data change that materially alters page length, density, images, maps, or empty states should trigger a manual screenshot run or include the relevant visual workflow path change.

## Artifact retention

GitHub Actions uploads the complete screenshot package for 14 days.
