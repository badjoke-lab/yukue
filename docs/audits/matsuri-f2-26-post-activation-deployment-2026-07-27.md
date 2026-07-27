# Matsuri F2-26 Post-activation Deployment Audit

**Status:** Passed

## Scope

This audit records the first accepted production deployment after the F2-25 Cloudflare Web Analytics observation.

## Accepted deployment

```text
Worker
matsuri-yukue

Canonical origin
https://matsuri-yukue.badjoke-lab.com

Source branch
main

Source commit
108ac4e88407e1263229eb40bc88d76855e90131

Cloudflare Workers Build
7026144e-1ce0-4927-9060-64919c3a4002

Deployment completed
2026-07-27T10:34:17Z
```

## Sequence verification

```text
F2-25 first verified Analytics observation  2026-07-27T09:37:29Z
F2-25 merge commit                         108ac4e88407e1263229eb40bc88d76855e90131
Accepted deployment completed              2026-07-27T10:34:17Z
Deployment occurred after observation      true
Deployment used main merge commit          true
```

The first deployment attempt for the same source commit completed the build and asset upload but received a transient provider-side `503 Service Unavailable` while creating the Worker deployment. The owner retried the same build. The retry completed the build, asset upload, and deployment successfully. No source change, manual deployment artifact, or older deployment was substituted.

## Public verification boundary

The accepted deployment is followed by the repository-hosted canonical-origin, canonical Search, crawler-reachability, F2-24 indexability-boundary, Analytics-record, and complete repository gates in the F2-26 evidence PR.

F2-26 does not claim that production traffic has appeared in the private Web Analytics dashboard. That remains F2-27.

## Privacy review

Not committed:

- Cloudflare account identity,
- private dashboard screenshots,
- Analytics tokens or beacon snippets,
- raw traffic counts,
- visitor-level data,
- private deployment credentials.

## Result

```text
F2-25 complete                    true
F2-26 complete                    true
F2-27 complete                    false
Post-activation deployment       success
Canonical hostname               matsuri-yukue.badjoke-lab.com
Privacy review                    passed
```
