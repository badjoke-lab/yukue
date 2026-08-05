# Matsuri Visual Review Workflow

**Status:** Implemented repository baseline / representative page-family review active

## Purpose

The Matsuri visual-review workflow preserves successful full-page renders for human UI review. It complements, but does not replace, the exhaustive Detail C route and navigation gate, automated browser and accessibility audits, the repository launch-readiness gate, or production-origin verification.

The workflow makes page-scale problems visible, including excessive whitespace, weak hierarchy, unstable density, awkward mobile transformations, unloaded third-party embeds, decorative or misleading maps, explicit no-map states, and visual drift that structural checks cannot judge.

## Deployment boundary

Cloudflare is not required for the repository visual-review baseline. The workflow must:

1. build the current Matsuri static site;
2. discover the complete generated HTML route inventory;
3. verify that every configured representative route exists;
4. start the built site on a local GitHub Actions HTTP server;
5. scroll each useful lazy embedded map into view and verify that its external frame rendered;
6. preserve explicit no-map states where no concrete ritual or main-venue anchor exists;
7. capture the representative page families with Playwright.

The default capture origin is:

```text
http://127.0.0.1:4321
```

Local-preview capture remains the reproducible repository baseline.

## Coverage model

The initial 20-route site used exhaustive screenshot coverage. Detail C completion expanded the public HTML surface beyond one hundred routes, including Entity details, Place details, and seed-reference pages.

The coverage model is split deliberately:

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

The shared visual-route configuration currently contains **104 representative routes**.

It includes:

- Home, About, browse, Region, Change, State, Search, Methodology, Data, and Status pages;
- every State browse variant;
- Festival details covering active, suspended, multi-place, modified, civic, and ritual cases;
- Folk Performance and Organization details;
- Shrine seed-reference pages;
- concrete point-like Place pages and distributed Place pages with explicit no-map states;
- the retained Batch 13 through Batch 28 regression pages documented by prior corpus audits;
- `浜松まつり`, `浜松まつり組織委員会`, `中田島凧揚げ会場`, and `浜松まつり中心市街地御殿屋台引き回し区域` as the Batch 29 breadth, organizer, concrete-venue, and distributed-area baselines;
- `布橋灌頂会` as the Batch 29 held-2022 and scheduled-2026 occurrence-history depth baseline;
- `西大寺会陽`, `西大寺会陽奉賛会`, and `西大寺観音院` as the Batch 30 breadth, organizer, ritual-site, current-state, occurrence, and national-designation baselines;
- `相馬野馬追` as the Batch 30 held-2025 occurrence and women-rider participation-rule change depth baseline.

A configured representative route missing from the generated site is a failure. Generated routes outside the screenshot set are not failures because exhaustive structural and navigational coverage is enforced separately.

Changing the representative count or removing a required page family requires updating this document and `config/matsuri-visual-routes.mjs` in the same pull request.

## Device contract

Successful full-page screenshots are captured for:

```text
desktop  1440 × 900
mobile    390 × 844
```

Tablet remains in the automated browser audit but is not part of the visual-review artifact set.

Both devices use Chromium, device scale factor 1, reduced motion, a light color scheme, hidden caret, disabled screenshot animations, loaded document fonts, and verified external map frames.

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

With the current 104-route representative contract, an `all` capture produces:

```text
104 desktop full-page PNGs
104 mobile full-page PNGs
208 full-page PNGs total
```

## Capture manifest

Each device manifest records the coverage mode, generated and configured route counts, route and resolved URL, output file, viewport, byte size, SHA-256, title, H1 and main-landmark counts, document height, horizontal overflow, broken images, empty states, embedded-map counts and frame metrics, and capture failures.

The manifest is evidence of what was rendered. It is not a substitute for reviewing the PNGs.

## Embedded-map capture rule

An iframe tag or a successful parent-page response is not proof that a map rendered or that it is useful. Before capture, each `iframe[data-embedded-map]` must represent an approved concrete ritual or main-venue anchor, be scrolled into view, navigate away from `about:blank`, resolve to the approved external map origin, expose a visible body, contain non-trivial rendered HTML and child elements, and remain loaded during the full-page screenshot.

The capture fails instead of preserving a blank map frame. Pages without a concrete anchor render an explicit location-gap panel and no iframe.

## Automated screenshot audit

The screenshot audit fails when:

- a configured route is missing or was not captured;
- a response is unsuccessful or a PNG is missing or unexpectedly small;
- a page lacks exactly one H1 and one main landmark;
- horizontal overflow exceeds tolerance;
- an image is broken or a page or console error occurs;
- a declared embedded map did not load or resolved away from the approved origin;
- embedded-frame metrics are absent or too small;
- desktop and mobile route inventories differ.

The separate map-utility artifact records all anchored and location-gap detail pages.

## Contact sheets

The workflow generates one contact sheet per device containing every representative route, route label, bounded full-page silhouette, and recorded document height. Contact sheets do not replace opening original full-resolution PNGs when a problem is suspected.

## Workflow triggers

The dedicated screenshot workflow supports manual `workflow_dispatch` and automatic pull-request runs for UI, layout, style, visual-route, screenshot-script, Playwright, and workflow changes.

The workflow is separate from the normal repository gate so that data-only maintenance does not always generate two hundred eight PNGs. A data change that materially alters page length, density, maps, or empty states should trigger the visual workflow by updating the representative contract.

## Artifact retention

GitHub Actions uploads the complete screenshot package for 14 days.