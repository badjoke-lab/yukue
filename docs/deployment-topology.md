# Yukue Series Deployment Topology

**Status:** F2-19 accepted / Matsuri canonical origin verified through F2-21

## Public topology

The Yukue Series uses one monorepo and separate public deployments.

```text
yukue.badjoke-lab.com
└─ Yukue Series portal — planned

matsuri-yukue.badjoke-lab.com
└─ 祭のゆくえ — canonical origin verified

jinja-yukue.badjoke-lab.com
└─ 神社のゆくえ — future site gate

jiin-yukue.badjoke-lab.com
└─ 寺院のゆくえ — future site gate

tomurai-yukue.badjoke-lab.com
└─ 弔いのゆくえ — future site gate
```

Machine-readable contract:

```text
config/yukue-deployment-topology.json
```

Validation:

```text
pnpm check:yukue:deployment-topology
```

## Portal and specialist-site boundary

The portal is the series entrance and cross-site guide. It is not a path container that serves every specialist site from one build.

Specialist sites must not be nested below the portal path.

Rejected:

```text
yukue.badjoke-lab.com/matsuri/
yukue.badjoke-lab.com/jinja/
yukue.badjoke-lab.com/jiin/
yukue.badjoke-lab.com/tomurai/
```

Accepted:

```text
yukue.badjoke-lab.com
matsuri-yukue.badjoke-lab.com
jinja-yukue.badjoke-lab.com
jiin-yukue.badjoke-lab.com
tomurai-yukue.badjoke-lab.com
```

This preserves independent builds, Search indexes, sitemaps, canonical URL spaces, deployment lifecycles, release gates, and rollback boundaries.

## Cloudflare deployment boundary

Each public application uses a separate Cloudflare Worker.

```text
apps/portal   → Worker yukue-portal   → yukue.badjoke-lab.com
apps/matsuri  → Worker matsuri-yukue  → matsuri-yukue.badjoke-lab.com
```

Future applications follow the same pattern only after their own project gates.

Deploying the portal later does not replace or repurpose Worker `matsuri-yukue`.

## Current activation state

```text
Portal hostname decision       accepted
Portal deployment              not activated

Matsuri hostname decision      accepted
Matsuri Custom Domain          active
Matsuri HTTPS                   verified
Matsuri manifest origin        verified
Matsuri canonical sitemap      verified
Matsuri canonical origin       https://matsuri-yukue.badjoke-lab.com
Matsuri verification run       29191904624 — success
workers.dev canonical          false
```

Detailed evidence:

```text
docs/audits/matsuri-f2-20-canonical-activation-2026-07-12.md
```

## workers.dev boundary

The permanent Workers origin remains useful for deployment and maintenance checks:

```text
https://matsuri-yukue.badjoke-lab.workers.dev/
```

It is not canonical.

## Future dedicated-domain migration

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
- active canonical origins require matching Custom Domain and external verification,
- future site hostnames do not activate those sites before their project gates.
