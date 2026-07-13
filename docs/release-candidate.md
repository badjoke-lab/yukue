# Matsuri Release Candidate

**Status:** Repository artifact verified / canonical origin and browser Search verified / crawler review pending

## Purpose

After repository verification succeeds, the Matsuri static site is frozen as an immutable CI artifact for reproduction and comparison.

```text
pnpm verify:release
pnpm freeze:matsuri:release
```

The frozen site is intentionally origin-neutral. Active deployment and browser Search state are recorded separately in release metadata and external verification evidence.

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
- canonical HTTP verification evidence,
- canonical browser Search verification evidence,
- completed external work through F2-22,
- pending external work from F2-23,
- public record counts and route inventory,
- per-file and aggregate SHA-256 digests.

Current status:

```text
repository-verified-canonical-origin-and-browser-search-verified-crawler-review-pending
```

External verification metadata:

```text
canonical_origin
https://matsuri-yukue.badjoke-lab.com

canonical HTTP workflow run
29191904624

browser Search workflow run
29227617530

browser Search artifact
matsuri-f2-22-browser-search-2fd5f4f5f1716d8f72e55f661eaa2c17f27a8ddd
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

The next external gate is the live crawler-reachability review.

## Reproduction

```text
pnpm install --no-frozen-lockfile
pnpm gate:matsuri:repository
```

Compare the resulting artifact digest, per-file hashes, canonical and browser Search verification metadata, and status fields with the CI artifact.

## Relationship to Workers Builds

Workers Builds creates the production artifact from the same repository with:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

The frozen origin-neutral candidate remains useful for reproducibility, while the verified external records prove the active Custom Domain, canonical output, and live browser Search behavior.
