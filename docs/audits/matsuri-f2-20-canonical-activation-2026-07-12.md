# Matsuri F2-20 Canonical Activation Verification

**Verification date:** 2026-07-12  
**Status:** F2-20 and F2-21 external conditions passed  
**Canonical origin:** `https://matsuri-yukue.badjoke-lab.com`

## Activation source

The production configuration was merged through PR #57.

```text
Merge commit
f978bc50a1ab51964687ec0457a448dc37b2aaf9

Worker
matsuri-yukue

Custom Domain
matsuri-yukue.badjoke-lab.com
```

The repository-managed activation consists of:

```text
wrangler.jsonc
  routes[0].pattern       matsuri-yukue.badjoke-lab.com
  routes[0].custom_domain true

scripts/build-matsuri-workers.mjs
  MATSURI_PUBLIC_ORIGIN   https://matsuri-yukue.badjoke-lab.com
```

## Independent external verification

GitHub Actions executed the canonical-origin gate from an independent hosted runner.

```text
Workflow
Verify Matsuri canonical origin gate

Run ID
29191904624

Job
verify-canonical-origin

Conclusion
success

Successful attempt
1 of 18
```

The gate used:

```text
MATSURI_CHECK_ORIGIN=https://matsuri-yukue.badjoke-lab.com
node scripts/check-matsuri-deployed.mjs --canonical
```

## Verified external conditions

The successful gate establishes:

- the custom hostname resolves from the GitHub Actions network,
- HTTPS requests succeed,
- all required public HTML routes respond successfully,
- the Pagefind runtime asset responds,
- public JSON and discovery files respond,
- the deployed site identifies itself as Matsuri,
- the representative Entity `fst-suneori-amagoi` is present,
- `manifest.site_origin` equals `https://matsuri-yukue.badjoke-lab.com`,
- `sitemap.xml` contains canonical absolute locations using the exact origin,
- the workers.dev deployment remains a non-canonical deployment origin by project policy.

## Gate result

```text
F2-20  custom-domain attachment, canonical build, HTTPS verification — completed
F2-21  canonical manifest and sitemap verification — completed
F2-22  browser Pagefind Search verification — next external gate
```

## Boundary

This verification does not establish:

- interactive browser Search behavior on the canonical origin,
- crawler reachability beyond the fetched launch files,
- search-engine sitemap submission,
- indexation,
- Web Analytics activation,
- production traffic recording,
- final F2 launch completion.

Those remain F2-22 through F2-28.
