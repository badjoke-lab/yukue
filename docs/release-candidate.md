# Matsuri Release Candidate

**Status:** F2 repository baseline / canonical hostname decided / activation pending

## Purpose

After complete repository verification succeeds, the Matsuri static site is frozen as an immutable CI artifact for external deployment comparison and reproduction.

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

`matsuri-site/` is the exact static Workers Static Assets candidate.

## Release manifest

`release-candidate.json` records:

- source commit,
- project and site IDs,
- dataset and schema versions,
- repository-verification and external-activation status,
- accepted canonical hostname and origin decisions,
- active canonical origin as unconfigured,
- completed repository work,
- completed external work through F2-19,
- external work that remains pending from F2-20,
- public record counts,
- machine-readable file inventory,
- public route inventory,
- total artifact file count and byte size,
- SHA-256 for every artifact file,
- one aggregate SHA-256 for the complete ordered artifact inventory.

The aggregate digest is derived from each file path, byte size, and file digest. It identifies the exact static candidate independently of the workflow ZIP container.

## Canonical decision boundary

The accepted decisions are:

```text
portal_origin_decision
https://yukue.badjoke-lab.com

canonical_hostname_decision
matsuri-yukue.badjoke-lab.com

canonical_origin_decision
https://matsuri-yukue.badjoke-lab.com
```

These fields record F2-19 intent. They do not mean that the Matsuri custom domain is attached or active.

The active field remains:

```text
canonical_origin: null
```

until F2-20 succeeds.

The repository candidate requires `MATSURI_PUBLIC_ORIGIN` to remain unset until F2-20.

The freeze command fails when:

- the verified `dist` directory is missing,
- a production `MATSURI_PUBLIC_ORIGIN` is set before F2-20,
- `manifest.site_origin` is present before activation,
- the frozen route inventory differs from `sitemap.xml`,
- the accepted deployment topology does not contain the Matsuri decision.

This prevents a placeholder, preview URL, workers.dev URL, or decided-but-not-attached hostname from entering the repository-side artifact as an active canonical origin.

## External work state

Completed external work:

```text
F2-16  Workers Builds connection
F2-17  first Workers Static Assets deployment
F2-18  deployed-origin smoke verification
F2-19  exact canonical Matsuri hostname decision
```

Pending external work:

```text
F2-20 through F2-28
```

Current release status value:

```text
repository-verified-deployed-origin-verified-canonical-hostname-decided-domain-attachment-pending
```

This means the repository artifact is verified, the workers.dev deployment is verified, the intended custom hostname is decided, and the custom-domain attachment and active canonical build remain pending.

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
pnpm gate:matsuri:repository
```

Compare the resulting `artifact_sha256`, per-file hashes, status fields, and hostname decisions with the CI release manifest.

Differences indicate a dependency, environment, source, topology, or build-output difference that must be understood before treating the artifacts as equivalent.

## Relationship to Cloudflare Workers Builds

Workers Builds builds from the Git repository rather than uploading the frozen CI artifact directly.

The frozen candidate remains useful for:

- proving what the repository gate accepted,
- comparing route and file inventories,
- reproducing the Workers build from the same source commit,
- confirming the exact F2-19 hostname decision,
- diagnosing differences between repository and external build environments.

The external launch settings are governed by:

```text
docs/cloudflare-pages-launch-runbook.md
docs/deployment-topology.md
```
