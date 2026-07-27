# Matsuri Release Candidate

**Status:** Repository artifact verified / F2-16 through F2-28 completed

## Purpose

After repository verification succeeds, the Matsuri static site is frozen as an immutable origin-neutral CI artifact for reproduction and comparison.

```text
pnpm verify:release
pnpm freeze:matsuri:release
```

## Release manifest

`.release-candidate/release-candidate.json` records source, dataset and schema versions, artifact mode, production evidence, F2-28 completion, route and file inventories, and SHA-256 digests.

Current status:

```text
repository-verified-crawler-reachability-verified-sitemap-submission-verified-indexability-verified-analytics-traffic-verified-f2-launch-complete
```

## Launch closure metadata

```text
F2-25 observation       2026-07-27T09:37:29Z
F2-26 deployment        2026-07-27T10:34:17Z
F2-27 traffic verified  2026-07-27T11:26:58Z
F2-28 evaluated         2026-07-27T11:45:20Z
```

Final gate record:

```text
config/matsuri-f2-launch-gate.json
docs/audits/matsuri-f2-28-final-launch-gate-2026-07-27.md
```

## Artifact mode

```text
origin-neutral-repository-candidate
```

The copied artifact omits production-origin injection. The Workers artifact is built separately with the verified canonical origin, while the release manifest records external verification evidence.

## Completion boundary

```text
F2-16 through F2-28  completed
Pending F2 launch work none
```

The release candidate does not claim search-engine indexation, include private Analytics material, or authorize Jinja.
