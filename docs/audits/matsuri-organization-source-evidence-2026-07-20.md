# Matsuri Organization Source and External-link Maintenance — 2026-07-20

**Status:** Passed maintenance audit

## Scope

This bounded maintenance audit reviewed the current public Matsuri Entity projection for records that had no public external link.

The release artifact contained 44 public Entities. Three organization records had empty `external_links` arrays:

```text
org-gujo-odori-hozonkai
org-hirosaki-neputa-participant-council
org-toyama-tateyama-museum
```

The change adds:

- three public official or public-authority Sources,
- three approved `entity_identity` Evidence records,
- three complete-record Entity corrections,
- one verified external link for each affected organization,
- `maintenance-11.json` and `corrections-06.json` in both canonical dataset consumers.

## Record result

### 郡上おどり保存会

```text
Source    src-gujo-odori-activities-2026
Evidence  evd-gujo-odori-hozonkai-identity-2026
Entity    org-gujo-odori-hozonkai / record_version 2
Link      https://www.city.gujo.gifu.jp/admin/info/post-2138.html
Class     public_authority
```

### 弘前ねぷた参加団体協議会

```text
Source    src-hirosaki-neputa-council-official
Evidence  evd-hirosaki-neputa-council-identity
Entity    org-hirosaki-neputa-participant-council / record_version 2
Link      https://neputa.jp/?page_id=532
Class     official_organization
```

### 富山県［立山博物館］

```text
Source    src-tateyama-museum-official
Evidence  evd-tateyama-museum-official-identity
Entity    org-toyama-tateyama-museum / record_version 2
Link      https://tatehaku.jp/
Class     public_authority
```

## Before and after

```text
Public Entities                    44 -> 44
Entities without external links     3 -> 0
Maintenance bundles                10 -> 11
Correction bundles                  5 -> 6
Correction records                  6 -> 9
Corrected logical IDs               5 -> 8
```

No Entity was added or removed. The three records retain their stable IDs, type, lifecycle, summaries, geography, and organization classifications.

## Artifact inspection

The generated release artifact was inspected after the initial hosted verification.

```text
Public Entities                    44
Entities without external links     0
Target record versions              2 / 2 / 2
Target links present                3 / 3
Target name Source references       3 / 3
```

## Initial hosted verification

Implementation head:

```text
ca769b376e74523f41cfdf4bf1ee9b0070958829
```

```text
Repository CI                       29738521974 — success
Full-page screenshots               29738522020 — success
Bundle inventory                    29738522026 — success
Canonical dataset contract          29738522052 — success
Correction contract                 29738521976 — success
Future-site seed inventory          29738522051 — success
Future-site seed readiness          29738521996 — success
Jinja start-gate record             29738521978 — success
```

Artifacts:

```text
Release artifact ID       8459380200
Release artifact digest   sha256:9cd5f4af3136540fb658554d1412f31d06ad343566c613cd5fc6fa74e83e04a9
Screenshot artifact ID    8459367447
Screenshot digest         sha256:837374265042a4e2a2eb6b9a2dcf28da45e11a7510d4a1f0d63adec5cdba424c
```

## Boundaries

This maintenance does not:

- add or infer State,
- change any Relation or Occurrence,
- change record lifecycle,
- add a new Entity,
- activate Cloudflare Analytics,
- complete F2-25 through F2-28,
- create or authorize a Jinja application, Worker, hostname, State vocabulary, or publication.

Repository validation checks URL structure, Source metadata, Evidence references, correction order, and final public projection. It does not convert live third-party reachability into a build-time requirement. Temporary external-server failures remain a reviewed maintenance concern rather than a reason to rewrite historical conclusions automatically.
