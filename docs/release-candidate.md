# Matsuri Release Candidate

**Status:** Repository artifact verified / external verification completed through F2-26 / F2-27 pending

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
- completed external work through F2-26,
- pending F2-27 and F2-28 work,
- public route and file inventories,
- per-file and aggregate SHA-256 digests.

Current status:

```text
repository-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-deployed-f2-27-pending
```

## F2-26 deployment metadata

```text
Source commit       108ac4e88407e1263229eb40bc88d76855e90131
Cloudflare build    7026144e-1ce0-4927-9060-64919c3a4002
Deployed at         2026-07-27T10:34:17Z
Evidence            docs/audits/matsuri-f2-26-post-activation-deployment-2026-07-27.md
```

The first deployment call received a transient provider-side 503 after successful build and asset upload. Retrying the same source build succeeded.

## Artifact mode

```text
origin-neutral-repository-candidate
```

The copied artifact omits production-origin injection. The Workers artifact is built separately with the verified canonical origin, while the release manifest records the external verification evidence.

## Completed and pending work

```text
F2-16 through F2-26  completed
F2-27                 production traffic verification pending
F2-28                 final F2 Launch Gate blocked by F2-27
```

No indexation or production-traffic receipt claim is made by the release candidate.
