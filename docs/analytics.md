# Analytics Baseline

**Status:** Cloudflare Web Analytics launch sequence completed through F2-28

## Provider and delivery

```text
Worker             matsuri-yukue
Canonical hostname matsuri-yukue.badjoke-lab.com
Provider           Cloudflare Web Analytics
Activation method  automatic setup
```

No manual beacon or Analytics token is stored in the repository.

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

## Scope boundary

The baseline does not add advertising trackers, session replay, heatmaps, custom user accounts, personalized recommendations, marketing automation, another analytics provider, or a custom event pipeline.

F2-28 completion does not prove search-engine indexation and does not authorize a future specialist site.
