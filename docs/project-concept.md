# Yukue Series — Project Concept

## Purpose

The Yukue Series records the present condition, history, change, relationships, and evidence surrounding Japanese local traditions, religious sites, and places of memorialization.

Planned public surfaces:

- 祭のゆくえ — festivals and folk performing arts
- 神社のゆくえ — shrines
- 寺院のゆくえ — temples
- 弔いのゆくえ — cemeteries, memorial parks, columbaria, and related facilities

Development begins with 祭のゆくえ.

## Core model

```text
Basic Profile
+
Observation
```

Basic Profile covers names, descriptions, classification, place, address, usual timing, recurrence, official links, maps, and optional approved real images.

Observation covers current state, verification time, occurrence history, change events, relations, designations, sources, and evidence.

## Coverage model

The series is intended to become nationally useful, not remain a small curated demonstration corpus.

National breadth and record depth must scale together.

```text
non-public candidate discovery at large scale
+
substantive reviewed public records
+
continuous historical / observation deepening
```

A thin name/location/link index entry is not a public specialist record. It may exist only as a candidate outside the approved Public Projection.

47 / 47 prefecture presence in Matsuri is a geographic seed baseline, not national corpus completion.

The governing scaling and public-record quality contract is:

```text
docs/nationwide-corpus-scaling.md
```

## Principles

- Japanese is the canonical language for records.
- Important claims should be connected to evidence.
- Current state is not the same as a historical event.
- A cancelled occurrence does not automatically change long-term entity state.
- Relations between festivals, performances, organizations, shrines, temples, and components are first-class data.
- Only approved public records enter the Public Projection.
- Public delivery is static-first; dynamic infrastructure is added only when justified.
- Automation is used aggressively for candidate discovery, drafting, provenance, dedupe, and quality measurement, but public approval remains fail-closed.
- Existing rich records must not become a small privileged legacy tier surrounded by permanently shallow new records.
- Future-site seed records are candidate/reference material, not acceptable public primary records for the future specialist sites unless they pass that site's substantive public-record contract.

## Non-goals

The project is not primarily a popularity ranking, review service, travel booking product, all-event calendar, or user-generated social network.

National scale does not mean publishing unsupported directory shells merely to increase counts.

## Public consistency

Public HTML, public JSON, JSON-LD, search indexes, sitemaps, and discovery files should be generated from the same approved public projection so that public representations remain consistent.
