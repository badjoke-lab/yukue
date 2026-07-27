# Matsuri Release Candidate

**Status:** Repository artifact verified / external verification completed through F2-27 / F2-28 pending

## Purpose

After repository verification succeeds, the Matsuri static site is frozen as an immutable origin-neutral CI artifact for reproduction and comparison.

```text
pnpm verify:release
pnpm freeze:matsuri:release
```

## Release manifest

`.release-candidate/release-candidate.json` records:

- source commit,
- dataset and schema versions,
- origin-neutral artifact mode,
- canonical origin, Search, crawler, and Search Console evidence,
- F2-25 Analytics activation evidence,
- F2-26 post-activation production deployment evidence,
- F2-27 production traffic verification evidence,
- completed external work through F2-27,
- pending F2-28 work,
- public route and file inventories,
- per-file and aggregate SHA-256 digests.

Current status:

```text
repository-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-28-pending
```

## Analytics closure metadata

```text
F2-25 observation     2026-07-27T09:37:29Z
F2-26 source commit   108ac4e88407e1263229eb40bc88d76855e90131
F2-26 Cloudflare build 7026144e-1ce0-4927-9060-64919c3a4002
F2-26 deployed at     2026-07-27T10:34:17Z
F2-27 verified at     2026-07-27T11:26:58Z
F2-27 traffic observed yes
```

Evidence:

```text
docs/audits/matsuri-f2-25-analytics-activation-2026-07-27.md
docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md
docs/audits/matsuri-f2-27-production-traffic-2026-07-27.md
```

## Artifact mode

```text
origin-neutral-repository-candidate
```

The copied artifact omits production-origin injection. The Workers artifact is built separately with the verified canonical origin, while the release manifest records the external verification evidence.

## Completed and pending work

```text
F2-16 through F2-27  completed
F2-28                 final F2 Launch Gate pending
```

The release candidate does not claim search-engine indexation and does not include private Analytics metrics or dashboard material.
