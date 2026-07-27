# Analytics Baseline

**Status:** Cloudflare Web Analytics enabled / F2-26 deployment completed / F2-27 traffic verification pending

## Purpose

The launch analytics baseline is limited to confirming that the public site is reached, public pages load, Core Web Vitals can be observed, and Search is used as a navigation surface. It is not an advertising, profiling, replay, personalization, or cross-site tracking system.

## Provider and delivery

```text
Worker             matsuri-yukue
Canonical hostname matsuri-yukue.badjoke-lab.com
Provider           Cloudflare Web Analytics
Activation method  automatic setup
```

No manual beacon or Analytics token is stored in the repository.

## Gate separation

```text
F2-25  Automatic setup observed enabled — completed
F2-26  production deployment after activation — completed
F2-27  private-dashboard traffic verification — pending
F2-28  final F2 Launch Gate — pending
```

Machine record:

```text
config/matsuri-analytics-activation.json
```

Validation:

```text
pnpm check:matsuri:analytics-activation-record
```

## F2-25 evidence

```text
First verified enabled observation
2026-07-27T09:37:29Z

Evidence
docs/audits/matsuri-f2-25-analytics-activation-2026-07-27.md
```

The setting was already enabled when observed; no older exact activation time is invented.

## F2-26 evidence

```text
Source commit
108ac4e88407e1263229eb40bc88d76855e90131

Cloudflare Workers Build
7026144e-1ce0-4927-9060-64919c3a4002

Deployment completed
2026-07-27T10:34:17Z

Evidence
docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md
```

A transient provider-side 503 affected the first deployment call after successful build and asset upload. Retrying the same source build succeeded. F2-26 does not prove traffic receipt.

## F2-27 verification

Visit:

```text
/
/festivals/
/search/
/festivals/suneori-amagoi/
```

Then confirm traffic for the canonical hostname in the private dashboard. Public evidence may record only hostname, UTC verification time, representative routes, traffic observed yes/no, and privacy review.

Do not commit raw traffic counts, geography, referrers, device detail, account identity, tokens, visitor-level data, or dashboard screenshots.

## Scope boundary

The baseline does not add advertising trackers, session replay, heatmaps, custom user accounts, personalized recommendations, marketing automation, another analytics provider, or a custom event pipeline.
