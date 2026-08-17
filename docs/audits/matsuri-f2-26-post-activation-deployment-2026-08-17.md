# Matsuri F2-26 Post-activation Deployment Audit — 2026-08-17

**Status:** Passed

## Scope

This audit records the real production deployment performed after the newly verified Cloudflare Web Analytics activation on 2026-08-17 JST. It supersedes the July F2-26 sequence as Analytics activation evidence because the July F2-25 premise was later retracted.

## Accepted deployment

```text
Worker
matsuri-yukue

Canonical origin
https://matsuri-yukue.badjoke-lab.com

Source branch
main

Source commit
d3cc420b0b30758ae05ae41496bda53280d10c38

Cloudflare Workers Build
5bd6df31

Deployment completed
2026-08-16T16:46:40Z
```

The build used `pnpm build:matsuri:workers` and the production deploy command `npx wrangler deploy`. Cloudflare reported the custom domain `matsuri-yukue.badjoke-lab.com` and Current Version ID `3e4f46ad-41fb-4ec9-9a2a-0947ddc400da`.

The build configuration also contained `PUBLIC_GA4_MEASUREMENT_ID`; the measurement value itself is public configuration, not a secret, but this F2-26 audit is specifically about the Cloudflare Web Analytics post-activation deployment sequence.

## Sequence verification

```text
New F2-25 activation observed   2026-08-16T15:23:34Z
Accepted production deployment  2026-08-16T16:46:40Z
Deployment occurred after F2-25 true
Production branch                main
```

## Boundary

This audit proves only that a production deployment occurred after the real Analytics activation. It does not by itself prove that Cloudflare Web Analytics accepted a browser RUM event; that is recorded separately in the corrected F2-27 audit.

No private Cloudflare account identity, API token, dashboard screenshot, visitor count, referrer, geography, or visitor-level data is committed.
