# Matsuri Release Candidate

**Status:** Repository artifact verified / crawler reachability verified / sitemap submission pending

## Purpose

After repository verification succeeds, the Matsuri static site is frozen as an immutable CI artifact for reproduction and comparison.

```text
pnpm verify:release
pnpm freeze:matsuri:release
```

The frozen site is intentionally origin-neutral. Active deployment, browser Search, and crawler-reachability evidence are recorded separately in release metadata.

## Output

```text
.release-candidate/
  README.md
  release-candidate.json
  matsuri-site/
```

## Release manifest

`release-candidate.json` records:

- source commit,
- dataset and schema versions,
- origin-neutral artifact mode,
- verified canonical hostname and origin,
- canonical-origin workflow evidence,
- canonical Search browser workflow and artifact evidence,
- crawler-reachability workflow and artifact evidence,
- completed external work through F2-23,
- pending external work from F2-24,
- public record counts and route inventory,
- per-file and aggregate SHA-256 digests.

Current status:

```text
repository-verified-crawler-reachability-verified-sitemap-submission-pending
```

Verified external metadata:

```text
canonical origin workflow run
29191904624

canonical Search workflow run
29193201911

canonical Search artifact ID
8260207484

crawler reachability workflow run
29230233384

crawler evidence artifact ID
8271238535
```

Artifact mode:

```text
origin-neutral-repository-candidate
```

The copied artifact omits `manifest.site_origin` and production canonical links because it is the reproducible origin-neutral repository candidate. The Workers artifact is built separately with the verified canonical origin.

## Completed and pending work

```text
F2-16 through F2-23  completed
F2-24 through F2-28  pending
```

The next external gate is sitemap submission and indexability checking. Successful submission must not be treated as proof of indexation.

## Reproduction

```text
pnpm install --no-frozen-lockfile
pnpm gate:matsuri:repository
```

Compare the artifact digest, per-file hashes, canonical-origin evidence, Search evidence, crawler evidence, and status fields with the CI artifact.

## Relationship to Workers Builds

Workers Builds creates the production artifact with:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

The origin-neutral candidate remains useful for reproduction, while verified external records prove the Custom Domain, canonical output, interactive Search, and crawler-facing production surface.
