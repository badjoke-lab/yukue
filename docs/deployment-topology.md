# Yukue Series Deployment Topology

**Status:** F2-19 accepted / F2-20 activation pending

## Decision

The Yukue Series uses one monorepo and separate public deployments.

```text
yukue.badjoke-lab.com
└─ Yukue Series portal

matsuri-yukue.badjoke-lab.com
└─ 祭のゆくえ

jinja-yukue.badjoke-lab.com
└─ 神社のゆくえ — future site gate

jiin-yukue.badjoke-lab.com
└─ 寺院のゆくえ — future site gate

tomurai-yukue.badjoke-lab.com
└─ 弔いのゆくえ — future site gate
```

The accepted machine-readable contract is:

```text
config/yukue-deployment-topology.json
```

Validate it with:

```text
pnpm check:yukue:deployment-topology
```

## Portal and specialist-site boundary

The portal is the series entrance and cross-site guide. It is not a path container that serves every specialist site from one build.

Specialist sites must not be nested below the portal path.

Rejected topology:

```text
yukue.badjoke-lab.com/matsuri/
yukue.badjoke-lab.com/jinja/
yukue.badjoke-lab.com/jiin/
yukue.badjoke-lab.com/tomurai/
```

Accepted topology:

```text
yukue.badjoke-lab.com
matsuri-yukue.badjoke-lab.com
jinja-yukue.badjoke-lab.com
jiin-yukue.badjoke-lab.com
tomurai-yukue.badjoke-lab.com
```

This keeps each site's build, sitemap, Search index, canonical URLs, deployment lifecycle, and later project gate independent.

## Cloudflare deployment boundary

Each public application uses a separate Cloudflare Worker.

```text
apps/portal   → Worker yukue-portal   → yukue.badjoke-lab.com
apps/matsuri  → Worker matsuri-yukue  → matsuri-yukue.badjoke-lab.com
```

Future applications follow the same pattern only after their own project gates.

The existing `matsuri-yukue` Worker is not replaced or repurposed when the portal is deployed. The Matsuri build command, asset directory, and Worker identity remain Matsuri-specific.

## Current activation state

```text
Portal hostname decision    accepted
Portal deployment           not activated

Matsuri hostname decision   accepted
Matsuri workers.dev origin  verified
Matsuri custom domain       not attached
MATSURI_PUBLIC_ORIGIN       unset
Active canonical origin     none
```

The hostname decision and canonical activation are separate steps.

F2-19 records the intended canonical hostname:

```text
matsuri-yukue.badjoke-lab.com
```

F2-20 will:

1. attach `matsuri-yukue.badjoke-lab.com` to Worker `matsuri-yukue`,
2. set `MATSURI_PUBLIC_ORIGIN=https://matsuri-yukue.badjoke-lab.com`,
3. trigger a production deployment,
4. confirm that the custom domain is reachable before canonical verification begins.

Until F2-20 succeeds, the build must not emit an active production `site_origin`, canonical URL set, or canonical sitemap origin.

## workers.dev boundary

The verified Workers origin remains useful for deployment and maintenance checks:

```text
https://matsuri-yukue.badjoke-lab.workers.dev/
```

It is not the canonical public origin and does not replace the custom-domain decision.

## Future dedicated-domain migration

The current topology uses `badjoke-lab.com` so deployment is not delayed by a separate domain purchase.

A later migration to a dedicated parent domain remains supported:

```text
<parent-domain>
matsuri.<parent-domain>
jinja.<parent-domain>
jiin.<parent-domain>
tomurai.<parent-domain>
```

Such a migration requires an explicit later decision, redirects, canonical changes, sitemap changes, and verification. It must not happen silently.

## Invariants

- one monorepo may contain multiple public applications,
- each public application remains separately deployable,
- each application uses a separate Worker,
- the portal is the series entrance rather than a runtime parent for specialist sites,
- workers.dev origins are never canonical,
- hostname decisions are recorded before activation,
- canonical activation occurs only after the matching custom domain and environment value are configured,
- future site hostnames do not activate those sites before their project gates.
