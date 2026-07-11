# Matsuri Visual Review Workflow

**Status:** Implementation specification / F2-M01 active

## Purpose

The Matsuri visual-review workflow preserves successful full-page renders for human UI review.

It complements, but does not replace:

- the automated browser and accessibility audit,
- the repository launch-readiness gate,
- later production-origin verification.

The workflow is intended to make page-scale problems visible, including excessive whitespace, weak hierarchy, unstable density, overly long lists, awkward mobile transformations, and visual drift that structural checks cannot judge.

## Deployment boundary

Cloudflare is not required for the repository visual-review baseline.

The workflow must:

1. build the current Matsuri static site,
2. start the built site on a GitHub Actions local HTTP server,
3. capture that local preview with Playwright.

The default capture origin is:

```text
http://127.0.0.1:4321
```

A future production-origin capture mode may be added only after the external deployment hold is removed. Local-preview capture remains the reproducible repository baseline.

## Route contract

While Matsuri has 20 public HTML routes, visual review is exhaustive rather than sampled.

The shared visual-route configuration is the source for:

- browser audit route coverage,
- screenshot capture route coverage,
- screenshot completeness auditing.

The configured routes must match every generated public `index.html` route in `apps/matsuri/dist`.

Adding or removing a public HTML route requires updating the shared route configuration in the same change.

Representative sampling is not permitted while the public route count remains small enough for exhaustive review.

If route growth later makes exhaustive capture unreasonable, a separate governing-document update must define:

- required unique routes,
- page-family sampling,
- samples per family,
- State, image, length, and geographic-scope coverage,
- the threshold for switching away from exhaustive capture.

## Device contract

Successful full-page screenshots are captured for:

```text
desktop  1440 × 900
mobile    390 × 844
```

Tablet remains in the automated browser audit but is not part of the initial visual-review artifact set.

Both devices use:

- Chromium,
- device scale factor 1,
- reduced motion,
- a light color scheme,
- hidden caret,
- disabled screenshot animations,
- loaded document fonts before capture.

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

With the current 20-route contract, an `all` capture must produce:

```text
20 desktop full-page PNGs
20 mobile full-page PNGs
40 full-page PNGs total
```

## Capture manifest

Each device manifest records:

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
- capture failures.

The manifest is evidence of what was rendered. It is not a substitute for reviewing the PNGs.

## Automated screenshot audit

The screenshot audit must fail when:

- a configured route is missing from the generated site,
- a generated public route is missing from the visual-route configuration,
- a selected route was not captured,
- a capture returned an unsuccessful HTTP response,
- a PNG is missing or unexpectedly small,
- a page does not contain exactly one H1,
- a page does not contain exactly one main landmark,
- document-level horizontal overflow exceeds the accepted tolerance,
- a rendered image is broken,
- desktop and mobile route inventories differ.

The audit produces machine-readable JSON and a human-readable Markdown summary.

## Contact sheets

The workflow generates one contact sheet per device.

Contact sheets are navigation aids for visual review. They must show:

- every captured route,
- the route label,
- the full-page silhouette in a bounded thumbnail,
- the recorded document height.

Contact sheets do not replace opening the original full-resolution PNGs when a problem is suspected.

## Workflow triggers

The dedicated screenshot workflow supports:

- manual `workflow_dispatch`,
- automatic pull-request runs for UI, layout, style, visual-route, screenshot-script, Playwright, and workflow changes.

The workflow is intentionally separate from the normal repository gate so that data-only and non-visual maintenance do not always generate forty PNGs.

A data change that materially alters page length, density, images, or empty states should trigger a manual screenshot run or include the relevant visual workflow path change when necessary.

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

- the desktop and mobile contact sheets,
- the top, middle, and bottom of each affected full-page PNG,
- at least Home, the relevant Browse page, the representative Festival detail, Search, and one Reference page for shared-shell changes.

Review questions include:

- Is the reading hierarchy clear?
- Is whitespace deliberate rather than accidental?
- Is information density appropriate?
- Are headings, labels, and values proportionate?
- Are long pages structured rather than merely tall?
- Does mobile preserve meaning without becoming cramped or excessively long?
- Are empty states honest and visually integrated?
- Does the UI preserve the accepted cultural-reference direction rather than drifting toward tourism or SaaS styling?

## Relationship to other gates

```text
browser/accessibility audit
= measurable rendering, structure, keyboard, target size, and WCAG checks

visual-review workflow
= retained successful renders plus human page-scale review

repository launch-readiness gate
= deterministic release and data integrity contract

production verification
= later deployed-origin checks after the external hold is removed
```

The visual-review workflow may expose a defect even when the repository gate is green. Such a defect must be handled as a bounded UI maintenance change and re-captured before visual closure is claimed.
