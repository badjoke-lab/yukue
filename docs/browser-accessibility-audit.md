# Browser and Accessibility Audit

**Status:** F2 repository baseline

## Purpose

The browser audit verifies the generated Matsuri release candidate in a real Chromium browser before external deployment.

Run:

```text
pnpm check:matsuri:browser
```

The audit is also included in:

```text
pnpm verify:matsuri:pages
pnpm verify:release
```

## Browser matrix

The launch baseline uses three Chromium projects:

```text
desktop  1440 × 900
tablet    768 × 1024
mobile    390 × 844
```

The audit covers every current public Matsuri HTML route.

## Route checks

For every route and viewport, the audit checks:

- successful HTTP response,
- Japanese document language,
- non-empty page title,
- viewport metadata,
- one main landmark,
- one H1,
- no document-level horizontal overflow,
- no empty headings or skipped heading levels,
- no duplicate IDs,
- alt attributes on images,
- table headers and accessible table naming,
- accessible names for form controls, buttons, and menu summaries,
- visible text for public Current State markers,
- skip link as the first keyboard target,
- visible focused skip link,
- skip-link focus transfer to main content,
- rendered controls at least 24 CSS pixels in both dimensions,
- operable mobile menu when displayed,
- no uncaught page errors,
- no browser console errors.

## Automated WCAG scan

Desktop and mobile projects run axe checks tagged for:

```text
WCAG 2.0 A
WCAG 2.0 AA
WCAG 2.1 A
WCAG 2.1 AA
```

Tablet remains covered by the structural, responsive, keyboard, and target-size checks.

## First full-audit findings

The first browser run identified two categories:

1. a test implementation incorrectly treated the non-rendered desktop mobile-menu summary as a zero-size visible control,
2. the Search submit button had insufficient text contrast because the shared `--color-surface` token was referenced but not defined.

The audit was corrected to exclude non-rendered controls using layout boxes and client rectangles.

The shared token baseline now defines:

```text
--color-surface: var(--color-bg)
```

This gives the Search button white text on the Matsuri accent background and resolves the actual contrast failure without changing the accepted visual direction.

## CI behavior

CI installs Chromium and its required system dependencies before running the unified release verification.

When browser tests fail, CI retains:

- Playwright screenshots,
- Playwright traces,
- the unified release-verification log.

These are short-lived workflow artifacts and are not committed to the public repository.

## Relationship to visual review

The browser audit is a deterministic automated gate. Its normal screenshots are failure diagnostics only.

Successful full-page renders for subjective UI review are produced by the separate workflow governed by:

```text
docs/visual-review-workflow.md
```

The two systems have different responsibilities:

```text
browser/accessibility audit
= structure, keyboard, overflow, target size, console errors, and automated WCAG checks

visual-review workflow
= retained successful desktop/mobile full-page PNGs, contact sheets, and human page-scale review
```

A page may pass this automated audit and still require visual correction for hierarchy, whitespace, density, or mobile reading rhythm.

## Boundary

Automated browser and axe checks detect many structural, responsive, keyboard, naming, target-size, and contrast defects. They do not prove that every user with every assistive technology will encounter no barrier.

Manual review remains appropriate for subjective reading quality, cognitive clarity, zoom behavior beyond the automated matrix, assistive-technology combinations not represented by the Chromium baseline, and the full-page visual review defined separately.
