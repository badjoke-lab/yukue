# Matsuri Remaining Canonical Name Provenance — 2026-07-20

**Status:** Passed maintenance audit

## Scope

This bounded audit reviewed the remaining preferred Entity names whose provenance depended only on an older event-specific, cancellation, or municipal record even though a more direct current or shrine-operated Source was available.

The reviewed targets were:

```text
shr-dainichireiki-jinja
org-suneori-amagoi-hozonkai
org-kawagoe-matsuri-kyosankai
org-hirosaki-neputa-300-committee
```

The 弘前ねぷた300年祭実行委員会 record required no change. Its existing `src-hirosaki-neputa-300-program` already resolves to the dedicated official tourism page for 弘前ねぷた300年祭 and directly identifies the committee and its city-office secretariat.

## Added Sources and Evidence

### 脚折雨乞行事保存会

```text
Source    src-suneori-amagoi-bunka
Evidence  evd-suneori-amagoi-hozonkai-bunka-identity
URL       https://kunishitei.bunka.go.jp/heritage/detail/312/00000802
Class     public_authority
```

The Agency for Cultural Affairs database identifies 脚折雨乞行事保存会 as the protection organization for 脚折の雨乞行事.

### 川越まつり協賛会

```text
Source    src-kawagoe-matsuri-organizer-2026
Evidence  evd-kawagoe-matsuri-kyosankai-current-identity
URL       https://koedo.or.jp/event/%E5%B7%9D%E8%B6%8A%E3%81%BE%E3%81%A4%E3%82%8A-4/
Class     official_tourism
```

The current 2026 page published by the official tourism association identifies 川越まつり協賛会事務局, located within the municipal tourism section, as the inquiry point for the festival.

## Complete-record corrections

`corrections-08.json` preserves every prior context Source and adds the more direct identity Source to the preferred canonical name.

```text
大日霊貴神社          record_version 2 -> 3
脚折雨乞行事保存会    record_version 1 -> 2
川越まつり協賛会      record_version 1 -> 2
```

For 大日霊貴神社, the existing shrine-operated `src-dainichireiki-jinja-official` Source is added to the preferred canonical name. No duplicate Source or Evidence record is created.

## Generated result

Release-artifact inspection confirmed:

```text
Public Entities                           44
Entities without external links            0
Target record versions                 3 / 2 / 2
Target canonical names with old Source      3 / 3
Target canonical names with direct Source   3 / 3
Maintenance bundles                       13
Correction bundles                         8
Correction records                        16
Corrected logical IDs                     14
```

## Initial hosted verification

Implementation head:

```text
aac5754d73ffe043dd8d01680f7e9cb8a1bfb20c
```

```text
Repository CI                       29746848240 — success
Full-page screenshots               29746848523 — success
Bundle inventory                    29746848282 — success
Canonical dataset contract          29746848184 — success
Correction contract                 29746848340 — success
Future-site seed inventory          29746848333 — success
Future-site seed readiness          29746848297 — success
Jinja start-gate record             29746848313 — success
```

Artifacts:

```text
Release artifact ID       8462812656
Release artifact digest   sha256:8e18eb77dc0f00e81ee7f7eb4d08eb12f2acc951f43b3d1fda0b15f1bf65d8a5
Screenshot artifact ID    8462794699
Screenshot digest         sha256:d3324359ac56bd66ad6980255faab3bd199f124131cc2aa7916a289a54c72b7c
Seed artifact ID          8462766065
Seed artifact digest      sha256:6dbc9b9da3eaff9fc0222a10b32bf8dd7dc32309514168c3b1f9b3a7b29fa8f6
```

## Boundaries

This maintenance does not:

- add or remove an Entity,
- infer or modify State,
- change a Relation or Occurrence,
- change lifecycle, summary, geography, or external links,
- activate Cloudflare Analytics,
- complete F2-25 through F2-28,
- create or authorize a Jinja application, Worker, hostname, State vocabulary, or publication.
