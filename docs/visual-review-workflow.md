# Matsuri Visual Review Workflow

**Status:** Implemented repository baseline / representative page-family review active

## Purpose

The Matsuri visual-review workflow preserves successful full-page renders for human UI review.

It complements, but does not replace:

- the exhaustive Detail C route and navigation gate,
- the automated browser and accessibility audit,
- the repository launch-readiness gate,
- production-origin verification.

The workflow makes page-scale problems visible, including excessive whitespace, weak hierarchy, unstable density, overly long lists, awkward mobile transformations, unloaded third-party embeds, and visual drift that structural checks cannot judge.

## Deployment boundary

Cloudflare is not required for the repository visual-review baseline.

The workflow must:

1. build the current Matsuri static site,
2. discover the complete generated HTML route inventory,
3. verify that every configured representative route exists,
4. start the built site on a GitHub Actions local HTTP server,
5. scroll each lazy embedded map into view and verify that its external frame rendered,
6. capture the representative page families with Playwright.

The default capture origin is:

```text
http://127.0.0.1:4321
```

Local-preview capture remains the reproducible repository baseline.

## Coverage model

The initial 20-route site used exhaustive screenshot coverage. Detail C completion expanded the public HTML surface to more than ninety routes, including dozens of Entity details, Place details, and seed-reference pages.

The coverage model is now split deliberately:

```text
static Detail C navigation gate
  exhaustive across every generated Entity, Relation, Place, browse link, search URL, individual JSON route, and embedded-map contract

Chromium Detail C navigation test
  exhaustive across every Entity detail and seed-reference page, including actual external-frame loading where a map exists

visual screenshot workflow
  representative page-family coverage across desktop and mobile, including rendered embedded maps
```

The shared visual-route configuration currently contains 30 representative routes.

It must include:

- Home,
- About,
- Festival, Folk Performance, and Organization browse pages,
- Region, Change, State, Search, Methodology, Data, and Status pages,
- every State browse variant,
- multiple Festival details including active, suspended, multi-place, and Tradition Unit cases,
- multiple Folk Performance details,
- multiple Organization details,
- at least one Shrine or Temple seed-reference page,
- at least one point-like Place page,
- at least one route or distributed Place page.

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
- lazy embedded maps scrolled into view before capture,
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

With the current 30-route representative contract, an `all` capture produces:

```text
30 desktop full-page PNGs
30 mobile full-page PNGs
60 full-page PNGs total
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

An iframe tag or a successful parent-page response is not proof that a map was rendered.

Before capture, each `iframe[data-embedded-map]` must:

1. be scrolled into the current viewport,
2. navigate away from `about:blank`,
3. resolve to the approved external map origin,
4. expose a visible body,
5. contain non-trivial rendered HTML and child elements,
6. remain loaded while the full-page screenshot is taken.

The capture fails instead of preserving a blank gray map frame when these conditions are not met.

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
- an embedded map was declared but not loaded,
- embedded-map frame metrics are absent or too small to represent rendered content,
- an embedded map resolves away from the approved external origin,
- desktop and mobile captured route inventories differ.

The audit records both the complete generated HTML count and the representative screenshot count.

## Contact sheets

The workflow generates one contact sheet per device.

Contact sheets show:

- every captured representative route,
- the route label,
- the full-page silhouette in a bounded thumbnail,
- the recorded document height.

Contact sheets do not replace opening the original full-resolution PNGs when a problem is suspected. Embedded maps must be checked in the original PNG at readable scale because a blank map frame can be difficult to detect in a contact-sheet thumbnail.

## Workflow triggers

The dedicated screenshot workflow supports:

- manual `workflow_dispatch`,
- automatic pull-request runs for UI, layout, style, visual-route, screenshot-script, Playwright, and workflow changes.

The workflow is intentionally separate from the normal repository gate so that data-only and non-visual maintenance do not always generate sixty PNGs.

A data change that materially alters page length, density, images, maps, or empty states should trigger a manual screenshot run or include the relevant visual workflow path change.

## Artifact retention

GitHub Actions uploads the complete screenshot package for 14 days.

Screenshots, manifests, contact sheets, and ZIP files are workflow artifacts. They are not committed to the public repository.

## Human visual-review requirement

Automated success means only that the pages rendered and passed measurable screenshot checks.

A non-trivial UI change is not visually reviewed until the pull request records:

```text
screenshot workflow run
artifact name
reviewed desktop routes
reviewed mobile routes
problems found
changes made
intentional remaining limitations
post-fix recapture result
```

Human review should inspect:

- desktop and mobile contact sheets,
- the top, middle, and bottom of each affected full-page PNG,
- Home,
- relevant browse pages,
- representative Festival and Folk Performance details,
- an Organization detail,
- a Shrine or Temple seed-reference page,
- a point-like Place page,
- a route or distributed Place page,
- Search and one reference page for shared-shell changes.

For any page with an embedded map, the reviewer must inspect the full-resolution PNG and confirm:

- the map is not a blank gray or white rectangle,
- point, representative, and area explanations match the record type,
- map height and surrounding whitespace remain usable,
- the Place list and external map actions remain readable,
- mobile does not crop or overflow the frame.

Review questions include:

- Is the reading hierarchy clear?
- Is whitespace deliberate rather than accidental?
- Is information density appropriate?
- Are headings, labels, and values proportionate?
- Are long pages structured rather than merely tall?
- Does mobile preserve meaning without becoming cramped or excessively long?
- Are empty states honest and visually integrated?
- Do embedded maps visibly render and match their stated scope?
- Does the UI preserve the accepted cultural-reference direction rather than drifting toward tourism or SaaS styling?

## Relationship to other gates

```text
Detail C navigation and map gates
= exhaustive route, Relation, Place, search, individual-JSON, map-mode, iframe, and external-frame integrity

browser/accessibility audit
= measurable rendering, structure, keyboard, target size, and WCAG checks

visual-review workflow
= retained representative renders plus human page-scale and embedded-map review

repository launch-readiness gate
= deterministic release and data integrity contract

production verification
= deployed-origin checks
```

The visual-review workflow may expose a defect even when the repository gate is green. Such a defect must be handled as bounded UI maintenance and re-captured before visual closure is claimed.

## Baseline history

The first exhaustive 20-route review completed on 2026-07-11.

```text
Workflow run: 29152930338
Artifact: matsuri-full-page-screenshots-all-29152930338
Artifact ID: 8248671759
Artifact digest: sha256:d1b6eaeca9c276ac65dc66e63261028817c9b3a27dea7018a89dd331d96866ba
Desktop: 20 / 20
Mobile: 20 / 20
Automated failures: 0
Automated warnings: 0
```

The first review corrected nested `main` landmarks, raw internal Change Event labels, and a mobile Home headline orphan.

Detail C completion introduced the representative 30-route model while exhaustive route and interaction coverage moved to the dedicated Detail C gate. The embedded-map remediation later strengthened both the exhaustive gate and the representative screenshot workflow so a map-capable component or a blank external iframe can no longer satisfy completion.
