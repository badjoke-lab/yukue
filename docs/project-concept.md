# Yukue Series — Project Concept

## Purpose

The Yukue Series records the present condition, history, change, relationships, and evidence surrounding Japanese local traditions, religious sites, and places of memorialization.

Planned public surfaces:

- 祭のゆくえ — festivals and folk performing arts
- 神社のゆくえ — shrines
- 寺院のゆくえ — temples
- 弔いのゆくえ — cemeteries, memorial parks, columbaria, and related facilities

Development begins with 祭のゆくえ. Only Matsuri is currently activated for implementation/publication work.

## Core model

```text
Basic Profile
+
Observation
```

Basic Profile covers the profile dimensions that are actually supported for a record: names, descriptions, classification, geographic scope, Place/address, usual timing, recurrence, official links, maps, and optional approved real images.

Observation covers evidence-backed current state, verification time, occurrence history, change events, relations, designations, sources, and evidence.

A public Tier A record may not yet contain all Basic Profile or Observation dimensions. Unsupported dimensions remain absent until verified.

## Coverage model

The series is intended to become nationally useful, not remain a small curated demonstration corpus.

National breadth and record depth scale in parallel through a three-layer public model:

```text
private candidate preparation when needed
→ Tier A  Public Index
→ Tier B  Public Verified
→ Tier C  Public History / Monitoring
```

Tier A makes source-backed national discovery public before every subject has deep historical research. Tier B adds verified profile/current-observation depth. Tier C adds longitudinal history and monitoring.

The A→B target is about seven calendar days. This is a work target and prioritization rule, not a global release blocker or automatic withdrawal rule.

47 / 47 prefecture presence in Matsuri is a geographic seed baseline, not national corpus completion.

The governing scaling and public-record contract is:

```text
docs/nationwide-corpus-scaling.md
```

## Principles

- Japanese is the canonical language for records.
- Important claims should be connected to Evidence.
- Current State is not the same as a historical Event.
- A cancelled Occurrence does not automatically change long-term Entity State.
- Elapsed dates or silence do not prove that an Occurrence was held.
- Relations between festivals, performances, organizations, shrines, temples, and components are first-class data when supported.
- Private candidates remain outside the Public Projection until the Tier A minimum is reviewed.
- Reviewed Tier A records are intentionally part of the Public Projection even when Tier B/C dimensions are incomplete.
- Public delivery is static-first; dynamic infrastructure is added only when justified.
- Automation is used aggressively for discovery, drafting, provenance, dedupe, tier measurement, and review-packet generation, but unsupported public claims are never auto-approved.
- Public Tier A breadth, A→B verification, and B→C history/monitoring deepening run continuously in parallel.
- Candidate count is never substituted for public coverage.
- One overdue Tier A record does not stop unrelated valid Tier A publication.
- Valid Tier A is not automatically unpublished merely because the A→B target elapsed.
- Future-site seed records are candidate/reference material for those sites and do not automatically become future-site Tier A records.

## Non-goals

The project is not primarily a popularity ranking, review service, travel booking product, all-event calendar, or user-generated social network.

National scale does not mean publishing unsupported claims merely to increase counts. It does allow intentionally thin, reviewed Tier A Index records whose limited facts are backed by the required authoritative source and identity/geography checks.

## Four-site boundary

The public A→B→C operating principle is intended to scale across all four specialist sites, but each site defines its own Tier A identity/source minimum and Tier B verification dimensions.

Matsuri Shrine/Temple Relation seeds do not automatically become public records for 神社のゆくえ or 寺院のゆくえ.

Current Matsuri work does not authorize Jinja, Jiin, or Tomurai applications, hostnames, Workers, or publication.

## Public consistency

Public HTML, public JSON, JSON-LD, search indexes, sitemaps, and discovery files should be generated from the same approved Public Projection so that public representations remain consistent.
