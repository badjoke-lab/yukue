# Matsuri Release Candidate

**Status:** F2 repository baseline

## Purpose

After the complete repository verification succeeds, the Matsuri static site can be frozen as an immutable CI artifact for later external deployment.

Run locally after a successful verification:

```text
pnpm verify:release
pnpm freeze:matsuri:release
```

The freeze command does not rebuild or revalidate the site. It copies the exact `apps/matsuri/dist` artifact that just passed the unified verification contract.

## Output

The command writes:

```text
.release-candidate/
  README.md
  release-candidate.json
  matsuri-site/
```

`matsuri-site/` is the exact static Cloudflare Pages candidate.

## Release manifest

`release-candidate.json` records:

- source commit,
- project and site IDs,
- dataset and schema versions,
- repository-verification status,
- canonical origin as unconfigured,
- completed repository work,
- external work that remains pending,
- public record counts,
- machine-readable file inventory,
- public route inventory,
- total artifact file count and byte size,
- SHA-256 for every artifact file,
- one aggregate SHA-256 for the complete ordered artifact inventory.

The aggregate digest is derived from each file path, byte size, and file digest. It identifies the exact static candidate independently of the workflow ZIP container.

## Held external boundary

The F2-14 repository candidate requires `MATSURI_PUBLIC_ORIGIN` to remain unset.

The freeze command fails when:

- the verified `dist` directory is missing,
- a production `MATSURI_PUBLIC_ORIGIN` is set,
- `manifest.site_origin` is present,
- the frozen route inventory differs from `sitemap.xml`.

This prevents a placeholder or prematurely selected production origin from entering the repository-side candidate.

The candidate explicitly records F2-16 through F2-28 as pending external work.

## CI artifact

After `pnpm verify:release` succeeds, CI runs:

```text
pnpm freeze:matsuri:release
```

It uploads `.release-candidate/` as:

```text
matsuri-release-candidate-<commit-sha>
```

The artifact is retained for 30 days.

A passing build therefore produces both:

1. evidence that the full verification contract passed,
2. a content-addressed copy of the exact static site that passed it.

## Reproduction

To reproduce the candidate from the recorded source commit:

```text
pnpm install --no-frozen-lockfile
pnpm verify:release
pnpm freeze:matsuri:release
```

Compare the resulting `artifact_sha256` and per-file hashes with the CI release manifest.

Differences indicate a dependency, environment, source, or build-output difference that must be understood before treating the artifacts as equivalent.
