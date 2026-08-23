# Matsuri stabilization final operational observation

Status: owner-observation required

This runbook closes the final two private-operational observations required by `config/matsuri-stabilization-review.json`. It does not allow inference from historical F2-24/F2-27 evidence and it does not authorize Jinja until both observations are actually performed and recorded.

## 1. Cloudflare Web Analytics current traffic observation

Open Cloudflare Web Analytics for the canonical Matsuri site:

`https://matsuri-yukue.badjoke-lab.com`

Confirm only the following public-safe facts:

- the Matsuri analytics site/property is the canonical Matsuri origin;
- the dashboard currently shows traffic receipt after the 2026-08-17 F2-27 verification;
- the observation was made during the current stabilization review;
- no configuration warning or missing-site state prevents the dashboard from representing the canonical Matsuri origin.

Do **not** commit visitor counts, referrers, geography, device data, screenshots, account identity, tokens, property/account IDs, or any visitor-level information.

Record only:

- `observed_at` in UTC;
- `canonical_origin`;
- `traffic_receipt_observed: true` if actually seen;
- `private_metrics_committed: false`;
- a short sanitized note such as `Current Cloudflare Web Analytics traffic receipt observed for canonical Matsuri origin.`

If current traffic receipt cannot be seen, leave the stabilization prerequisite false and record the reason privately rather than fabricating a pass.

## 2. Google Search Console current observation

Open Google Search Console for the URL-prefix property:

`https://matsuri-yukue.badjoke-lab.com`

The stabilization review does **not** require indexation. Observe the current property and record only public-safe facts sufficient to prove that Search Console was checked during stabilization.

Confirm:

- the canonical Matsuri URL-prefix property is accessible;
- the current Search Console property can be observed;
- the sitemap/URL inspection area is available for the canonical property;
- no claim is made that any page is indexed unless independently supported and intentionally published.

Record only:

- `observed_at` in UTC;
- `canonical_origin`;
- `property_observed: true` if actually observed;
- `indexation_required: false`;
- `indexation_claimed: false` unless a separately reviewed publication explicitly changes that;
- a sanitized note such as `Current Search Console property observed during Matsuri stabilization review.`

Do **not** commit account email, owner identity, verification tokens, private screenshots, private query/performance counts, or property-management identifiers.

## 3. Completion rule

Only after **both** current observations are actually performed:

1. create a dated public-safe audit under `docs/audits/`;
2. update `config/matsuri-stabilization-review.json`:
   - `status: complete`
   - `reviewed_on: <date>`
   - `review_evidence_document: <dated audit path>`
   - `prerequisites.analytics_traffic_reviewed: true`
   - `prerequisites.search_console_observation_recorded: true`
   - `observations.search_console_observation: recorded`
   - `claims.review_complete: true`
   - `claims.jinja_stabilization_prerequisite_complete: true`
3. keep `phase_11_gate_review_authorized` unchanged unless its separate contract is satisfied;
4. update the frozen release/readiness assertions that mirror stabilization state;
5. run `pnpm check:matsuri:stabilization-review` and the complete repository gate;
6. only then update the Jinja start gate from the now-satisfied stabilization prerequisite.

## 4. Evidence boundary

Historical F2-24 Search Console submission and F2-27 Cloudflare Web Analytics traffic verification remain supporting history only. They cannot be silently reclassified as the required current stabilization observations.

A screenshot shared privately in the working conversation may be used for review, but the screenshot itself must not be committed unless it has been explicitly sanitized and publication-reviewed. Prefer recording only the public-safe conclusion.
