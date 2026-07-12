# F2-20 Matsuri Custom Domain Activation

**Status:** Configuration committed / production deployment and external verification pending

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

On the next production `wrangler deploy`, Cloudflare should attach the hostname to Worker `matsuri-yukue`, create the required DNS record, and provision the certificate.

### Canonical build origin

The production Workers build command is:

```text
pnpm build:matsuri:workers
```

It executes:

```text
scripts/build-matsuri-workers.mjs
```

The wrapper reads the accepted origin from:

```text
config/yukue-deployment-topology.json
```

and runs the static Matsuri build with:

```text
MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com
```

The origin is public configuration, not a secret. Keeping it in the accepted topology avoids a second independent value in the Cloudflare dashboard.

## Separation from repository release candidate

The repository gate verifies two different artifacts:

```text
Workers production artifact
- built with MATSURI_PUBLIC_ORIGIN
- manifest.site_origin present
- sitemap uses the exact canonical origin

Repository release candidate
- rebuilt without MATSURI_PUBLIC_ORIGIN
- canonical_origin remains null
- preserves evidence that external activation still requires verification
```

The repository release candidate must not claim F2-20 completion merely because activation configuration exists.

## Merge and deployment sequence

```text
1. merge the F2-20 activation PR to main
2. Workers Builds runs pnpm build:matsuri:workers
3. Wrangler deploys the static artifact
4. Wrangler applies the Custom Domain route
5. Cloudflare creates DNS and certificate state
6. verify HTTPS reachability
7. run canonical deployed-origin verification
8. record F2-20 completion only after external success
```

## External completion evidence

F2-20 is complete only when all of the following are true:

```text
matsuri-yukue.badjoke-lab.com resolves
HTTPS request succeeds
served site is 祭のゆくえ
manifest.site_origin equals https://matsuri-yukue.badjoke-lab.com
sitemap locations use the exact canonical origin
canonical deployed-origin workflow succeeds
workers.dev remains non-canonical
```

## Failure boundary

If the production deployment or Custom Domain provisioning fails:

- F2-20 remains incomplete,
- F2-21 through F2-28 remain blocked,
- do not submit a sitemap,
- do not enable Analytics,
- do not mark the custom domain active in project status,
- inspect Workers Builds and Wrangler deployment logs before retrying.

## Portal protection

This activation affects only:

```text
matsuri-yukue.badjoke-lab.com
```

It must not create, attach, or redirect:

```text
yukue.badjoke-lab.com
```

The latter remains reserved for separate Worker `yukue-portal`.
