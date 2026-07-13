# Matsuri Release Candidate

**Status:** Repository artifact verified / canonical origin, browser Search, and crawler reachability verified / sitemap submission pending

## Purpose

The Matsuri static site is frozen as an origin-neutral, content-addressed CI artifact for reproduction and comparison.

```text
pnpm verify:release
pnpm freeze:matsuri:release
```

Active production evidence is recorded separately in release metadata.

## Output

```text
.release-candidate/
  README.md
  release-candidate.json
  matsuri-site/
```

## Release manifest

`release-candidate.json` records:

- source commit and data versions,
- origin-neutral artifact mode,
- verified canonical origin,
- canonical-origin workflow evidence,
- browser Search workflow and artifact evidence,
- crawler-reachability workflow and artifact evidence,
- completed external work through F2-23,
- pending external work from F2-24,
- route, file, byte, and SHA-256 inventories.

Current status:

```text
repository-verified-canonical-origin-browser-search-and-crawler-reachability-verified-sitemap-submission-pending
```

External evidence:

```text
Canonical origin run       29191904624
Canonical Search run       29193201911
Canonical Search artifact  8260207484
Crawler reachability run   29230475619
Crawler artifact           8271321515
```

Artifact mode:

```text
origin-neutral-repository-candidate
```

The copied artifact omits active-origin canonical claims and uses origin-neutral indexing metadata. The production Workers artifact is built separately with the verified canonical origin, self-canonical links, and index/follow metadata.

## Completed and pending work

```text
F2-16 through F2-23  completed
F2-24 through F2-28  pending
```

The next external gate is sitemap submission and indexability checking. Analytics remains F2-25.

## Reproduction

```text
pnpm install --no-frozen-lockfile
pnpm gate:matsuri:repository
```

Compare artifact hashes, canonical-origin metadata, browser Search evidence, crawler evidence, and status fields with CI.
