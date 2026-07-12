# Matsuri Release Candidate

**Status:** Repository artifact verified / canonical origin verified / browser Search pending

## Purpose

After repository verification succeeds, the Matsuri static site is frozen as an immutable CI artifact for reproduction and comparison.

```text
pnpm verify:release
pnpm freeze:matsuri:release
```

The frozen site is intentionally origin-neutral. Active deployment state is recorded separately in release metadata and external verification evidence.

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
- canonical verification workflow evidence,
- completed external work through F2-21,
- pending external work from F2-22,
- public record counts and route inventory,
- per-file and aggregate SHA-256 digests.

Current status:

```text
repository-verified-canonical-origin-verified-browser-search-pending
```

Canonical deployment metadata:

```text
canonical_origin
https://matsuri-yukue.badjoke-lab.com

canonical verification workflow run
29191904624
```

Artifact mode:

```text
origin-neutral-repository-candidate
```

The copied artifact omits `manifest.site_origin` because it is the reproducible repository candidate. The production Workers artifact is built separately with the verified canonical origin.

## Completed and pending work

```text
F2-16 through F2-21  completed
F2-22 through F2-28  pending
```

The next external gate is browser Pagefind Search verification on the canonical origin.

## Reproduction

```text
pnpm install --no-frozen-lockfile
pnpm gate:matsuri:repository
```

Compare the resulting artifact digest, per-file hashes, canonical verification metadata, and status fields with the CI artifact.

## Relationship to Workers Builds

Workers Builds creates the production artifact from the same repository with:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

The frozen origin-neutral candidate remains useful for reproducibility, while the verified external record proves the active Custom Domain and canonical output.
