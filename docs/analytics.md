# Analytics Baseline

**Status:** Cloudflare Web Analytics launch sequence completed through F2-28 / optional GA4 supplemental layer prepared post-launch

## Provider and delivery

The F2 launch baseline remains:

```text
Worker             matsuri-yukue
Canonical hostname matsuri-yukue.badjoke-lab.com
Baseline provider  Cloudflare Web Analytics
Activation method  automatic setup
```

No manual Cloudflare beacon or Analytics token is stored in the repository.

## Completed gate sequence

```text
F2-25  Automatic setup observed enabled — completed
F2-26  production deployment after activation — completed
F2-27  private-dashboard traffic verification — completed
F2-28  final F2 Launch Gate — completed
```

Machine records:

```text
config/matsuri-analytics-activation.json
config/matsuri-f2-launch-gate.json
```

Evidence:

```text
F2-25 observation       2026-07-27T09:37:29Z
F2-26 deployment        2026-07-27T10:34:17Z
F2-27 traffic verified  2026-07-27T11:26:58Z
F2-28 evaluated         2026-07-27T11:45:20Z
```

Public audits are under `docs/audits/`. The private dashboard screenshot and raw metrics are not committed.

## Post-launch GA4 supplemental layer

Starting 2026-08-12, Matsuri may additionally load Google Analytics 4 as a supplemental measurement layer. This does not replace Cloudflare Web Analytics and does not rewrite the historical F2-25 through F2-28 baseline.

The shared page shell reads:

```text
PUBLIC_GA4_MEASUREMENT_ID
```

Behavior:

- when unset, no Google tag is emitted;
- when set to a valid `G-...` Measurement ID, exactly one Google tag loader and one GA4 configuration call are emitted per page;
- invalid values do not enable the tag;
- repository verification rejects duplicate Google tags and mismatched configured IDs;
- the production Measurement ID is configured per deployed site so future specialist sites cannot accidentally share the Matsuri stream.

The Measurement ID itself is public website configuration rather than an authentication secret, but the repository does not hard-code a shared ID because each specialist site must keep its analytics property or stream identity explicit and independently configurable.

GA4 activation is complete only after the owner confirms the Matsuri GA4 property/web stream, configures the production `G-...` value, deploys the resulting build, and confirms receipt in GA4. A code hook alone is not evidence that GA4 is active or receiving traffic.

## Stabilization boundary

The active Matsuri stabilization review still requires a **current Cloudflare Web Analytics traffic observation** under `docs/matsuri-stabilization-review.md`. GA4 does not satisfy or replace that requirement.

Likewise, historical F2-27 Cloudflare traffic verification is not silently reused as the current stabilization observation.

## Scope boundary

The original F2 baseline did not add advertising trackers, session replay, heatmaps, custom user accounts, personalized recommendations, marketing automation, another analytics provider, or a custom event pipeline. That statement describes the completed launch baseline.

The post-launch GA4 layer adds only aggregate GA4 page measurement when explicitly configured. It does not authorize advertising features, session replay, heatmaps, personalized recommendations, marketing automation, a custom event pipeline, or publication of private analytics metrics.

F2-28 completion does not prove search-engine indexation and does not authorize a future specialist site.
