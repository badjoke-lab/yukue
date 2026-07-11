# Matsuri F2-M01 Full-page Visual Review

**Date:** 2026-07-11  
**Work package:** F2-M01  
**Result:** Passed after bounded corrections

## Purpose

This record closes the first repository-side full-page screenshot review for `祭のゆくえ`.

The review used a GitHub Actions local preview. It does not claim Cloudflare deployment, a public URL, canonical production behavior, production Search, crawler access, Analytics, or traffic verification.

## Final execution evidence

```text
Workflow: Capture Matsuri full-page screenshots
Run ID: 29152930338
Run number: 9
Head SHA: 8417285ce5ef7064b1bc34b310169a6fa912e74b
Artifact ID: 8248671759
Artifact name: matsuri-full-page-screenshots-all-29152930338
Artifact digest: sha256:d1b6eaeca9c276ac65dc66e63261028817c9b3a27dea7018a89dd331d96866ba
Retention expires: 2026-07-25
```

Normal repository verification also passed on the same head:

```text
Workflow: CI
Run ID: 29152930340
Run number: 154
Result: success
```

## Capture coverage

```text
generated public routes   20
configured visual routes  20
desktop captured          20 / 20
mobile captured           20 / 20
total full-page PNGs      40
capture failures           0
audit failures             0
audit warnings             0
```

Viewports:

```text
desktop  1440 × 900
mobile    390 × 844
```

Rendered totals:

| Device | PNG bytes | Maximum document height | Visible empty states |
| --- | ---: | ---: | ---: |
| Desktop | 4,315,036 | 4,117 px | 8 |
| Mobile | 3,813,366 | 5,217 px | 8 |

The visible empty states correspond to intentional zero-record or no-public-record surfaces and were reviewed as part of the page images.

## Human review coverage

The complete desktop and mobile contact sheets were reviewed for all 20 routes.

Full-resolution top, middle, and bottom regions were reviewed for:

```text
/
/festivals/
/festivals/suneori-amagoi/
/search/
/methodology/
/states/active/
/status/
/changes/
```

These routes cover the Home, Browse, representative Detail, Search, long-form Reference, populated State, infrastructure Status, and Change-list families.

## Findings

### 1. Nested main landmarks

The first screenshot audit found two `main` elements on 18 routes.

Cause:

- `PageShell` already supplied `main#yk-main-content`,
- `MatsuriBrowseShell` and `MatsuriReferenceShell` each added another nested `main`.

Correction:

- the inner Browse and Reference elements were changed to `div`,
- the browser audit now requires exactly one total `main` and exactly one `main#yk-main-content`.

### 2. Raw Change Event codes

The first human screenshot review found internal vocabulary codes displayed on public pages:

```text
other
schedule_rule_changed
```

Cause:

- public label maps used obsolete or incomplete Change Event names.

Correction:

- all current Matsuri Change Event vocabulary values now have Japanese public labels,
- Home, Change Browse, and Festival Detail projections use the complete map,
- the browser audit rejects lowercase raw Change Event codes on Home and Change-list surfaces.

### 3. Orphaned mobile hero ending

The mobile Home screenshot placed only `る。` on the final headline line.

Correction:

- shared headings use balanced wrapping,
- the closing phrase `記録する。` is kept together,
- the final mobile screenshot displays:

```text
現在と変化を
記録する。
```

## Final visual result

After correction and recapture:

- all 40 screenshots were generated,
- desktop and mobile route inventories matched,
- every screenshot passed the minimum-size and SHA-256 checks,
- every page contained one H1 and one main landmark,
- no document-level horizontal overflow was recorded,
- no broken images, page errors, or console errors were recorded,
- internal Change Event codes were no longer visible,
- the mobile Home headline no longer ended with an isolated character,
- contact sheets and desktop/mobile ZIP archives were generated,
- the accepted cultural-reference visual direction remained intact.

## Intentional remaining limitations

- this is Chromium local-preview review, not production-origin review,
- tablet remains covered by the automated browser audit rather than retained full-page PNGs,
- zero-image pages intentionally contain no documentary image or placeholder,
- long Search and populated State pages remain long because the current MVP does not introduce pagination solely for visual shortening,
- human review does not claim exhaustive assistive-technology coverage.

## Closure

F2-M01 is complete.

The screenshot workflow remains available for manual execution and for automatic execution on relevant UI pull requests. Future non-trivial UI changes must record their own run, artifact, reviewed images, findings, corrections, remaining limitations, and post-fix result.
