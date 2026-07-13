# F2-20 Matsuri Custom Domain Activation

**Status:** Completed and externally verified

## Result

```text
Canonical origin  https://matsuri-yukue.badjoke-lab.com
Worker            matsuri-yukue
```

`wrangler.jsonc` defines the Custom Domain. `scripts/build-matsuri-workers.mjs` reads the accepted origin from `config/yukue-deployment-topology.json` and injects:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

## Activation evidence

```text
Activation PR            #57
Activation merge         f978bc50a1ab51964687ec0457a448dc37b2aaf9
Verification workflow    Verify Matsuri canonical origin gate
Verification run         29191904624
Conclusion               success
```

The independent runner verified hostname resolution, HTTPS, required routes, Pagefind assets, public JSON, exact `manifest.site_origin`, and canonical sitemap locations.

Detailed record:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
```

## Artifact boundary

```text
Workers production artifact
- verified canonical origin
- exact self-canonical links
- index,follow robots metadata
- absolute canonical sitemap and robots Sitemap directive

Repository release candidate
- origin-neutral artifact
- no active-origin canonical claim
- noindex,nofollow robots metadata
- separately recorded production evidence
```

## Later gate results

```text
F2-20  Custom Domain and HTTPS — completed
F2-21  canonical manifest and sitemap — completed
F2-22  browser Pagefind Search — completed
F2-23  crawler reachability — completed
F2-24  sitemap submission and indexability — next
```

```text
Canonical Search run       29193201911 — success
Crawler reachability run   29230475619 — success
```

## Portal protection

This activation affects only `matsuri-yukue.badjoke-lab.com`. It does not create, attach, or redirect `yukue.badjoke-lab.com`, which remains reserved for separate Worker `yukue-portal`.

## Remaining boundary

Do not claim sitemap submission or indexation before F2-24, enable Analytics before F2-25, or claim final launch completion before F2-28.
