# F2-20 Matsuri Custom Domain Activation

**Status:** Completed

## Objective

Activate the decided Matsuri canonical origin:

```text
https://matsuri-yukue.badjoke-lab.com
```

on Worker:

```text
matsuri-yukue
```

without introducing dashboard-only configuration drift.

## Activation method

F2-20 is managed from the repository.

### Custom Domain

`wrangler.jsonc` defines:

```json
{
  "routes": [
    {
      "pattern": "matsuri-yukue.badjoke-lab.com",
      "custom_domain": true
    }
  ]
}
```

Cloudflare Workers Builds applies the hostname, DNS record, certificate, and static deployment from `main`.

### Canonical build origin

The production Workers build command is:

```text
pnpm build:matsuri:workers
```

`scripts/build-matsuri-workers.mjs` reads the accepted origin from:

```text
config/yukue-deployment-topology.json
```

and builds with:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

The origin is public configuration, not a secret. It is not duplicated in a dashboard-only variable.

## Separation from repository release candidate

The repository gate verifies two artifacts:

```text
Workers production artifact
- built with MATSURI_PUBLIC_ORIGIN
- manifest.site_origin present
- sitemap uses the exact canonical origin

Repository release candidate
- rebuilt without MATSURI_PUBLIC_ORIGIN
- remains origin-neutral as an artifact
- records the externally verified active canonical origin in release metadata
```

## Successful external completion evidence

```text
Active canonical origin
https://matsuri-yukue.badjoke-lab.com/

Verification workflow
Verify Matsuri canonical origin gate

GitHub Actions run
29191904624

Result
success
```

The independent GitHub Actions gate confirmed:

```text
matsuri-yukue.badjoke-lab.com resolves
HTTPS request succeeds
served site is 祭のゆくえ
required public routes respond
Pagefind assets respond
public JSON and discovery files respond
manifest.site_origin equals https://matsuri-yukue.badjoke-lab.com
sitemap locations use the exact canonical origin
workers.dev remains non-canonical
```

## Completion decision

F2-20 is complete because:

1. the code-managed Custom Domain route is deployed,
2. the canonical production build is active,
3. the exact hostname is reachable through HTTPS,
4. the live manifest and sitemap carry the accepted origin,
5. GitHub Actions run `29191904624` completed successfully.

## Next gate

```text
F2-21  canonical manifest and sitemap verification as a recorded gate
```

F2-21 must preserve exact evidence for the live `manifest.site_origin` and sitemap locations. It may reuse the successful F2-20 canonical gate as external evidence, but it must record the verified values explicitly before completion.

## Portal protection

This activation affects only:

```text
matsuri-yukue.badjoke-lab.com
```

It does not create, attach, or redirect:

```text
yukue.badjoke-lab.com
```

The latter remains reserved for separate Worker `yukue-portal`.

## Remaining restrictions

- do not submit the sitemap before F2-24,
- do not enable Cloudflare Web Analytics before F2-25,
- do not claim production traffic before F2-27,
- do not claim the final F2 Launch Gate before F2-28.
