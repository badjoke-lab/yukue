# Matsuri Corpus Expansion Batch 31 — 2026-08-06

## Status

Passed repository, data, Detail C, map, and visual verification. Canonical-production verification is the next separate step.

## Scope

Batch 31 continues the reviewed Matsuri breadth-and-depth track:

1. adds 三国祭 as the first reviewed primary Matsuri record for 福井県;
2. adds 三国祭保存振興会 and an evidence-backed `maintained_by` Relation;
3. adds 三國神社 as a State-free Shrine seed and concrete ritual Place;
4. keeps the old-town 山車巡行区域 as a distributed route Place rather than inventing one map point;
5. records the held unknown-scale May 19–21, 2026 edition;
6. records the April 25, 2006 福井県指定無形民俗文化財 designation;
7. deepens 布川地区花祭 with the May 4, 1976 national Important Intangible Folk Cultural Property designation;
8. preserves Detail C, Evidence, map, future-site seed, stabilization, and blocked Jinja boundaries.

## Evidence boundaries

- The 2026 三国祭 edition is `held / unknown`: the official schedule establishes the dates and the official post-event photo-contest results prove the edition occurred, but normal completion or scale of every component is not inferred.
- 三国祭保存振興会 is recorded as a maintenance and preservation body; no legal-person State is inferred.
- 三國神社 is a State-free reference seed. No Shrine Current State is inferred.
- The concrete Shrine Place is an approved map anchor. The procession route remains area precision and renders an explicit no-map state.
- The 2006 designation is bounded to the reviewed 坂井市 cultural-property record.
- The 1976 布川 designation is recorded because the national database explicitly names 布川花祭保存会 among the protection groups for `花祭`.
- 山あげ祭2026 remains unresolved because no reviewed official post-event result Evidence was available.

## New reviewed records

### 三国祭

Added:

- Festival Entity `fst-mikuni-matsuri`;
- Organization `org-mikuni-matsuri-hozon-shinkokai`;
- State-free Shrine seed `shr-mikuni-jinja`;
- concrete Place `plc-mikuni-jinja`;
- distributed route Place `plc-mikuni-matsuri-route`;
- active Current State based on official 2026 post-event evidence;
- annual Series and Recurrence Pattern for May 19–21;
- held unknown-scale 2026 Occurrence;
- 2006 prefectural-designation Change Event and Designation;
- `maintained_by` and `ritually_associated_with` Relations;
- canonical detail routes, individual JSON, search, reverse navigation, and map behavior.

### 布川地区花祭

Added:

- national-designation Change Event dated May 4, 1976;
- national Important Intangible Folk Cultural Property Designation;
- claim-specific Evidence from the 文化庁 国指定文化財等データベース.

The first CI attempt rejected the generic Source title `花祭`. The title was made claim-specific as `国指定重要無形民俗文化財「花祭」` without changing the source, date, subject, or designation claim.

## Resulting canonical corpus

Implementation validation head: `26ebae3f35a477292450ddc4b6b6c387031940aa`.

| Record family | Count |
|---|---:|
| Entity | 94 |
| Place | 89 |
| State Snapshot | 44 |
| Change Event | 93 |
| Occurrence | 152 |
| Occurrence Series | 44 |
| Recurrence Pattern | 44 |
| Relation | 56 |
| Designation | 27 |
| Source | 247 |
| Evidence | 566 |

The corpus covers 35 prefectures, leaving 12 uncovered. No sparse primary Entity remains under the current coverage rule.

Repository position:

```text
F1 batches                    13
F2 maintenance bundles        66
F2 correction bundles         17
Additive application slots    79
Correction application slots  17
Public Entities               94
Jinja State Snapshots          0
```

The blocked Jinja candidate baseline now contains 21 Relation-backed seeds, 25 direct Identity Evidence records, 21 Place references, zero approved Jinja State Snapshots, and 16 URLs classified by the current seed extractor as official. This is candidate preparation only and does not activate Jinja.

## Detail C and map review

The exhaustive contracts verified:

- 193 generated HTML routes;
- 94 Pagefind-indexed records with direct detail URLs;
- 147 Place-bearing detail pages;
- 120 useful anchored maps;
- 27 explicit location-gap pages;
- 67 Entity anchors and 53 Place anchors;
- 三国祭 and 三國神社 use the concrete Shrine anchor;
- 三国祭山車巡行区域 remains an explicit distributed-route no-map page;
- 布川地区花祭 retains its concrete 布川集会所 anchor.

## Visual review

The representative visual contract contains 109 routes and produced 218 desktop/mobile full-page screenshots.

The automated screenshot audit passed on the first attempt with:

- 109 of 109 desktop routes captured;
- 109 of 109 mobile routes captured;
- 67 of 67 embedded maps loaded on each device;
- zero failures;
- zero warnings;
- zero recorded Google Maps iframe CORS noise.

Manual full-resolution review confirmed:

- 三国祭 renders Current State, 2026 Occurrence, 2006 designation, two Places, two Relations, Evidence, and a useful 三國神社 map;
- 三国祭保存振興会 remains an Organization without unsupported Place or State claims;
- the 三國神社 reference page states its State-free boundary and renders its concrete Place and useful map;
- the 三國神社 Place page provides reverse Festival and Shrine navigation;
- the procession-route Place displays the deliberate no-map explanation instead of a false point;
- 布川地区花祭 displays the 1976 national Change Event and Designation without disturbing existing State, Occurrence, Relation, and map boundaries;
- desktop and mobile layouts remain readable, with no horizontal overflow or blank map frame.

## Validation

| Verification | Run |
|---|---:|
| Complete repository CI and release readiness | `31068434104` |
| Detail C, map utility, and exhaustive Chromium navigation | `31068434117` |
| Desktop/mobile visual capture and audit | `31068434080` |
| Corpus coverage audit | `31068434139` |
| Canonical dataset contract | `31068434057` |
| Correction contract | `31068434132` |
| Relation coverage | `31068434153` |
| Data freshness | `31068434108` |
| External-link maintenance | `31068434122` |
| Bundle inventory and repository baseline | `31068434068` |
| Future-site seed inventory | `31068434091` |
| Future-site seed readiness | `31068434125` |
| Jinja start-gate record | `31068434054` |

Artifacts:

- release candidate `8954796464`, digest `sha256:2a3beb0418cf09d06c86184e6d7c0ee8bff13043ecbcc7511092ef398864afed`;
- map utility `8954735593`, digest `sha256:3ac6b731be48fae48b3b70b7bb9d588a03f00b17ce4e23410a06011cf1014faa`;
- screenshot review `8954868777`, digest `sha256:634f76492e88ff840120ee17c8d358775d8d9423e59c2313f18926808e1977b8`;
- corpus coverage `8954713177`, digest `sha256:df43222fa2e075f0d7f61144978dfffb2f98081c73aed3773c32682f65b4055b`.

## Merge

- pull request: `#189`;
- squash merge commit: `db42b01620f7a4d183c22a7a0088e899df7f54d7`;
- merged on: `2026-08-06`.

## Boundaries

- all public claims require approved Evidence;
- a held edition does not imply normal completion of every published component;
- distributed routes are not collapsed into false point maps;
- Jinja remains blocked with zero approved Jinja State Snapshots;
- no Jinja application, Worker, hostname, or publication is created;
- private analytics, candidate material, and internal project-policy information are absent.
