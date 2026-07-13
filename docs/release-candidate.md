# Matsuri Release Candidate

**Status:** Repository artifact verified / canonical Search verified / crawler review pending

## Purpose

After repository verification succeeds, the Matsuri static site is frozen as an immutable CI artifact for reproduction and comparison.

```text
pnpm verify:release
pnpm freeze:matsuri:release
```

The frozen site is intentionally origin-neutral. Active deployment and browser Search evidence are recorded separately in release metadata.

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
- canonical origin workflow evidence,
- canonical Search workflow and artifact evidence,
- completed external work through F2-22,
- pending external work from F2-23,
- public record counts and route inventory,
- per-file and aggregate SHA-256 digests.

Current status:

```text
repository-verified-canonical-search-verified-crawler-review-pending
```

Verified external metadata:

```text
canonical_origin
https://matsuri-yukue.badjoke-lab.com

canonical origin verification run
29191904624

browser Search verification run
29227591583

browser Search artifact ID
8270324780
```

Artifact mode:

```text
origin-neutral-repository-candidate
```

The copied artifact omits `manifest.site_origin` because it is the reproducible repository candidate. The production Workers artifact is built separately with the verified canonical origin.

## Completed and pending work

```text
F2-16 through F2-22  completed
F2-23 through F2-28  pending
```

The next external gate is crawler reachability and robots/canonical/sitemap review.

## Reproduction

```text
pnpm install --no-frozen-lockfile
pnpm gate:matsuri:repository
```

Compare the resulting artifact digest, per-file hashes, canonical and Search verification metadata, and status fields with the CI artifact.

## Relationship to Workers Builds

Workers Builds creates the production artifact from the same repository with:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

The frozen origin-neutral candidate remains useful for reproducibility, while the verified external records prove the active Custom Domain, canonical output, and interactive Search behavior.
