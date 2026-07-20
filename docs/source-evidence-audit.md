# Source and Evidence Audit

**Status:** F2 repository baseline / 2026-07-20 organization and canonical-name provenance maintenance verified

## Purpose

The Source and Evidence audit verifies that launch-critical public assertions are supported by public, reviewable records rather than only by structurally valid references.

Run:

```text
pnpm check:matsuri:evidence
```

The audit is also included in:

```text
pnpm verify:matsuri:pages
pnpm verify:release
```

## Source requirements

Every public Source must provide:

- a usable title,
- a publisher,
- a language marker,
- a public HTTP or HTTPS URL,
- a valid access date,
- no local, placeholder, or credential-bearing URL.

When an archive URL is present, it must also be a valid public HTTP or HTTPS URL.

Source publication, update, and access dates must not occur after the audit date.

Every Source must be referenced by at least one public Evidence record, Entity name, or Place record. Unused Sources are not retained in the launch dataset.

## Evidence requirements

Every public Evidence record must:

- be approved,
- reference an existing Source,
- provide a descriptive Japanese summary,
- provide an assertion code,
- provide a valid capture date,
- avoid merely repeating the Source title.

## Critical target symmetry

The following record families require Evidence:

```text
State Snapshot
Change Event
Occurrence
Relation
Designation
Recurrence Pattern
```

For each record:

- at least one Evidence ID is required,
- every Evidence ID must exist,
- Evidence target type must match the record family,
- Evidence target ID must equal the record ID,
- the assertion code must use the expected family-specific prefix,
- every critical Evidence record must be linked back from its target record.

This prevents a valid Source from being attached to the wrong assertion or from existing as an unlinked Evidence record.

## Current State freshness

Approved State Snapshots receive stricter treatment than historical records.

They require:

- an auditable Evidence capture or Source access date,
- at least one Source that is not classified as social media,
- a freshest Evidence date no older than the configured threshold.

Default threshold:

```text
730 days
```

Reproducible or stricter audits may use:

```text
MATSURI_AUDIT_DATE=YYYY-MM-DD
MATSURI_CURRENT_STATE_MAX_AGE_DAYS=<positive integer>
pnpm check:matsuri:evidence
```

The threshold is a launch-maintenance tripwire. It does not mean every historical Source must be recent.

## 2026-07-20 organization Source and external-link maintenance

The current public release projection contained 44 Entities. Three organization records had empty `external_links` arrays:

```text
org-gujo-odori-hozonkai
org-hirosaki-neputa-participant-council
org-toyama-tateyama-museum
```

Reviewed maintenance added one official or public-authority Source, one approved direct Entity-identity Evidence record, and one complete-record external-link correction for each organization.

Artifact inspection confirmed:

```text
Public Entities                    44
Entities without external links     0
Maintenance bundles                11
Correction bundles                  6
Correction records                  9
Corrected logical IDs               8
```

The detailed record, Source, Evidence, hosted verification, and artifact evidence are preserved in:

```text
docs/audits/matsuri-organization-source-evidence-2026-07-20.md
```

This maintenance strengthens reviewability and user navigation. It does not make live external reachability a repository-gate requirement and does not change State, Relation, Occurrence, lifecycle, Cloudflare gates, or future-site authorization.

## 2026-07-20 canonical-name provenance closure

Dedicated Entity-identity Sources existed for 阿蘇神社, 櫛田神社, and 秩父神社, but their preferred canonical names still referenced only an older restoration, festival schedule, or festival-specific Source. 博多祇園山笠振興会 likewise depended on the annual schedule despite having a dedicated official organization page available.

Reviewed maintenance added one official Source and one approved Entity-identity Evidence record for 博多祇園山笠振興会, then used complete-record corrections to connect all four preferred canonical names to their dedicated identity Sources while retaining their earlier context Sources.

Artifact inspection confirmed:

```text
Public Entities                         44
Entities without external links          0
Target record versions               2 / 2 / 2 / 2
Canonical names with prior Source         4 / 4
Canonical names with identity Source      4 / 4
Maintenance bundles                     12
Correction bundles                       7
Correction records                      13
Corrected logical IDs                   12
```

The detailed record, Source, Evidence, hosted verification, and artifact evidence are preserved in:

```text
docs/audits/matsuri-canonical-name-provenance-2026-07-20.md
```

This correction closes reference provenance without changing the displayed names, summaries, geography, lifecycle, external links, State, Relation, Occurrence, Cloudflare gates, or future-site authorization.

## 2026-07-20 remaining canonical-name provenance closure

The remaining review found three preferred names that could be connected to stronger direct identity Sources without replacing their existing context Sources:

```text
大日霊貴神社
脚折雨乞行事保存会
川越まつり協賛会
```

The existing shrine-operated Source was attached to the preferred 大日霊貴神社 name. New public-authority and official-tourism Sources plus approved Entity-identity Evidence were added for 脚折雨乞行事保存会 and 川越まつり協賛会. The 弘前ねぷた300年祭実行委員会 record was reviewed but required no change because its existing Source already resolves to the dedicated official page.

Artifact inspection confirmed:

```text
Public Entities                           44
Entities without external links            0
Target record versions                 3 / 2 / 2
Canonical names with prior Source           3 / 3
Canonical names with direct Source          3 / 3
Maintenance bundles                       13
Correction bundles                         8
Correction records                        16
Corrected logical IDs                     14
```

The detailed record, Source, Evidence, hosted verification, and artifact evidence are preserved in:

```text
docs/audits/matsuri-remaining-name-provenance-2026-07-20.md
```

This maintenance does not change displayed names, summaries, geography, lifecycle, external links, State, Relation, Occurrence, Cloudflare gates, or future-site authorization.

## External reachability boundary

The repository audit validates URL structure and metadata. It does not claim that every external Source URL is reachable at build time.

Live external reachability is intentionally separate because:

- external servers can be temporarily unavailable,
- rate limits and bot protection can make CI results unstable,
- a temporary network failure should not silently change a public historical conclusion.

Source replacement, archive capture, or assertion correction remains a reviewed data task.
