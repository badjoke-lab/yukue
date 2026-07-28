# Matsuri Detail C embedded-map remediation

**Date:** 2026-07-28  
**Status:** Passed  
**Track:** Phase 10A corrective completion

## Finding

The accepted Detail C information architecture required a `Places & Map` section, but the merged public implementation rendered only Place names, addresses or area descriptions, Place-detail links, and individual JSON.

`PlaceMap.astro` had an optional `embedUrl` path, but Entity detail pages did not supply it. Place detail pages also had no embedded map. The presence of a map-capable component was therefore incorrectly treated as completed map behavior.

The prior Detail C completion statement exceeded the implemented and verified product behavior.

## Initial remediation defect

The first remediation head added iframe markup and structural checks. Those checks passed, but the retained screenshot artifact showed blank gray map frames because lazy third-party iframes had not remained painted during full-page capture.

That result was not accepted as completion.

The visual workflow was strengthened so every lazy map iframe is scrolled into view, navigates to the approved external map origin, exposes a visible body, renders non-trivial HTML and child elements, and remains loaded while the full-page PNG is taken.

## Final implementation

The completed remediation provides:

- an embedded map on every Entity detail that contains approved Place records,
- an embedded map on every generated Place detail page,
- one external map action per rendered Place row,
- `point`, `representative`, and `area` map modes,
- area treatment for procession routes, distributed traditions, city-center events, and other records where a single point would be misleading,
- explanatory text for representative and area modes,
- lazy loading and accessible iframe titles,
- query construction from approved public Place names, addresses, and geographic context,
- no committed or rendered API key, credential, billing account, or private map configuration.

The map is a navigation aid. Canonical Place, Evidence, and Source records remain the basis of location claims.

## Exhaustive generated-output gate

The final generated-output gate reported:

```text
66 mapped detail pages
  32 Entity details
  34 Place details

80 rendered Place rows
28 point maps
 1 representative map
37 area maps
 0 API keys
```

The gate also rejected negative fixtures for:

1. a missing iframe,
2. a procession or area record regressed to point mode,
3. a leaked map API key.

The existing route-based public-content rule was not removed. It was replaced with stricter requirements that a route-based detail must use `area` mode, retain multiple Place records, include geographic context, explain that the map is not a single-location claim, render exactly one reviewed area-map iframe, and contain no API key.

## Browser verification

The focused Chromium workflow passed exhaustive navigation and actual external-frame loading for every Entity detail and seed-reference page with Place records.

```text
Workflow  Verify Matsuri Detail C navigation
Run       30359228264
Result    success
```

The browser check verifies that each map iframe:

- exists,
- uses the approved HTTPS query endpoint,
- has a non-empty title,
- exposes the declared map mode and provider marker,
- has one external map link per Place row,
- navigates to the external map frame,
- renders a non-trivial body rather than remaining `about:blank` or empty.

## Repository verification

```text
Workflow  CI
Run       30359228334
Result    success
Head      cae6d31977b17b226c9e69d0b75dba3b892657da
```

The complete repository gate passed page build, Detail C navigation, map coverage, semantic validation, Evidence, public content, browser and accessibility checks, release verification, stabilization boundaries, and Jinja guardrails.

Release candidate:

```text
Artifact ID      8688129771
Artifact name    matsuri-release-candidate-563c8cc7957251c9e672541f3e826697ac7ef9d8
Digest           sha256:93f4c522e954099b0e4bb062c9ef29c2c280af81f70f1783df636379e3b6684b
```

## Visual verification

```text
Workflow  Capture Matsuri full-page screenshots
Run       30359228304
Result    success
```

Final screenshot artifact:

```text
Artifact ID      8688130876
Artifact name    matsuri-full-page-screenshots-all-30359228304
Digest           sha256:edaea1c349a255e12fae224db38eb6cfa6fd7a537147db7bc0d59c6be1357e9b
```

Automated result:

```text
Generated HTML routes       101
Representative routes        30
Desktop captures          30/30
Mobile captures           30/30
Desktop embedded maps       9/9 loaded
Mobile embedded maps        9/9 loaded
Failures                      0
Warnings                      0
```

Full-resolution desktop and mobile review confirmed visible map rendering for:

- `脚折雨乞` — multi-Place area treatment,
- `鷹山` — route-based area treatment,
- `相馬野馬追` — distributed multi-Place area treatment,
- `早池峰神楽`,
- `大日堂舞楽`,
- `阿蘇神社` seed reference,
- `白鬚神社` Place detail,
- `祇園祭山鉾巡行路` Place detail.

The final PNGs do not contain the blank gray map frames found in the first remediation artifact. Mobile maps remain inside the viewport without horizontal overflow.

## Boundaries

- No coordinates were invented or added to canonical data.
- Query-based maps do not claim exact route geometry or an official boundary polygon.
- `area` mode deliberately shows regional context instead of a false single pin.
- External map availability remains dependent on the provider; the Place list, public JSON, Evidence, and Source records remain available independently.
- No private map account, API key, billing data, token, analytics metric, or user-level information is stored.
- No Jinja, Jiin, portal, Worker, hostname, or future-site activation is included.

## Result

The Detail C embedded-map gap is closed only at this final state: actual rendered maps exist on Entity and Place detail pages, map scope is explicit, blank embeds fail visual verification, and the requirement is enforced by static, browser, repository, and retained-screenshot gates.
