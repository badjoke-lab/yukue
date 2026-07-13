# F2-20 Matsuri Custom Domain Activation

**Status:** Completed and externally verified

## Result

The Matsuri canonical origin is active:

```text
https://matsuri-yukue.badjoke-lab.com
```

on Worker:

```text
matsuri-yukue
```

## Repository-managed activation

`wrangler.jsonc` defines the Custom Domain. The production Workers build runs:

```text
pnpm build:matsuri:workers
```

`scripts/build-matsuri-workers.mjs` reads the accepted origin from `config/yukue-deployment-topology.json` and injects:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

The origin is public configuration rather than a secret or a duplicate dashboard value.

## Activation evidence

```text
Activation PR
#57

Activation merge commit
f978bc50a1ab51964687ec0457a448dc37b2aaf9

Canonical verification workflow
Verify Matsuri canonical origin gate

Verification run
29191904624

Conclusion
success
```

The independent GitHub-hosted runner verified hostname resolution, HTTPS, required public routes, Pagefind runtime assets, public JSON, exact `manifest.site_origin`, and exact canonical sitemap locations.

Detailed record:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
```

## Artifact boundary

The repository gate verifies two build artifacts and separate external evidence:

```text
Workers production artifact
- built with the verified canonical origin
- manifest.site_origin present
- sitemap uses the exact canonical origin

Repository release candidate
- rebuilt without MATSURI_PUBLIC_ORIGIN
- origin-neutral artifact copy
- release metadata records canonical-origin evidence
- release metadata records canonical Search evidence
```

## Gate result

```text
F2-20  Custom Domain activation, canonical build, HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Pagefind Search verification — completed
F2-23  crawler-reachability review — next
```

F2-22 completion evidence:

```text
Workflow  Verify Matsuri canonical Search
Run       29193201911 — success
Audit     docs/audits/matsuri-f2-22-canonical-search-2026-07-12.md
```

## Portal protection

This activation affects only:

```text
matsuri-yukue.badjoke-lab.com
```

It does not create, attach, or redirect:

```text
yukue.badjoke-lab.com
```

The portal hostname remains reserved for separate Worker `yukue-portal`.

## Remaining boundary

Do not submit the sitemap before F2-24, enable Analytics before F2-25, or claim final launch completion before F2-28.
