# Project Documentation

This directory contains the public project reference documents for the Yukue Series repository.

## Working rule

Before implementing a feature, check the relevant document here. When a decision changes, update the governing document and `decision-log.md` in the same pull request whenever practical.

## Documents

| Document | Status | Purpose |
|---|---|---|
| `project-concept.md` | Current | Series purpose and boundaries |
| `product-spec.md` | Working | Product capabilities and user needs |
| `public-data-model.md` | Working | Public record model and projection rules |
| `future-site-seed-inventory.md` | F2-P02 and F2-P05 completed / F2-P09 and 2026-07-20 provenance refreshed | Relation-backed extraction and portable record references without activating future applications |
| `future-site-seed-readiness.md` | F2-P03, F2-P04, and F2-P09 completed | Public carry-forward context, identity Evidence, official provenance, and explicit target-site research gaps |
| `future-site-seed-provenance-bundle.md` | F2-P06 completed / F2-P09 and 2026-07-20 provenance refreshed | Self-contained public Source, Evidence, Place, Relation, State, and Entity context bundle |
| `future-site-seed-artifact-contract.md` | F2-P07 completed | Contract v1 for candidate inventory, provenance, summary, fields, statuses, and boundaries |
| `jinja-start-gate.md` | F2-P08 guardrail completed / F2-P09 and 2026-07-20 baseline refreshed | Machine-enforced prerequisites and inactive boundary before Jinja implementation |
| `matsuri-correction-contract.md` | F2-P10 through F2-P13 completed | Ordered full-record corrections, exact bundle order, one shared correction engine, and one shared twelve-family dataset assembler |
| `matsuri-repository-baseline.md` | Machine-checked current | Exact current bundle, correction, Entity, Analytics-boundary, and Jinja-boundary counts |
| `matsuri-mvp-spec.md` | Working | Matsuri MVP scope |
| `information-architecture.md` | Accepted direction | Home H1 and Detail C |
| `ui-direction.md` | Accepted direction | Visual character, typography, palette, layout language |
| `design-tokens.md` | Initial baseline | Shared typography, color, spacing, layout, and component tokens |
| `ui-foundation-spec.md` | Implementation spec | Shared shell, patterns, responsive and accessibility rules |
| `technical-architecture.md` | F2-24 production baseline | Build, projection, search, multi-Worker deployment, canonical metadata, crawler verification, and Search Console evidence |
| `deployment-topology.md` | Matsuri active | Exact portal and specialist-site hostnames, separate Worker boundary, active Matsuri origin, and migration invariants |
| `f2-20-custom-domain-activation.md` | Completed | Repository-managed Custom Domain, canonical build, and external verification evidence |
| `f2-22-canonical-search-verification.md` | Completed | Canonical desktop/mobile Pagefind interaction gate and evidence |
| `f2-23-crawler-reachability.md` | Completed | robots, canonical HTML, sitemap discovery, representative User-Agent, and public discovery verification |
| `f2-24-sitemap-submission-indexability.md` | Completed | Search Console submission, technical preflight, evidence rules, and completion boundary |
| `templates/matsuri-f2-24-submission-evidence.md` | Template | Public-safe sitemap submission, live-test, and indexing-request evidence format |
| `f2-25-cloudflare-web-analytics.md` | Owner access pending | Workers Web Analytics activation, machine record, evidence, and privacy boundary |
| `f2-26-f2-28-launch-closure.md` | Repository preparation complete | Post-activation deployment, traffic verification, and final launch-gate sequence |
| `templates/matsuri-f2-25-analytics-evidence.md` | Template | Public-safe Cloudflare Web Analytics activation evidence format |
| `cloudflare-pages-launch-runbook.md` | F2-16–F2-24 completed | Workers Builds contract, canonical deployment, browser Search, crawler reachability, Search Console evidence, and remaining launch sequence |
| `deployment.md` | F2-24 completed | Verified canonical Workers deployment and F2-25 Analytics boundary |
| `audits/matsuri-f2-20-canonical-activation-2026-07-12.md` | Passed audit | HTTPS, required routes, manifest origin, and canonical sitemap verification run |
| `audits/matsuri-f2-22-canonical-search-2026-07-12.md` | Passed audit | Desktop/mobile exact-name Search, filters, no-result state, and result navigation |
| `audits/matsuri-f2-23-crawler-reachability-2026-07-13.md` | Passed audit | robots, sitemap routes, self-canonical links, indexing directives, User-Agent labels, and public discovery files |
| `audits/matsuri-f2-24-search-console-2026-07-14.md` | Passed audit | Search Console sitemap acceptance, discovered pages, representative live test, indexing requests, and privacy-safe interpretation |
| `audits/yukue-f2-p04-shrine-identity-evidence-2026-07-16.md` | Passed audit | Direct identity Evidence for the five current shrine seeds |
| `audits/yukue-f2-p05-seed-handoff-provenance-2026-07-16.md` | Passed audit | Portable Place, identity Evidence, Source, and Relation Evidence references |
| `audits/yukue-f2-p06-seed-provenance-bundle-2026-07-16.md` | Passed audit | Self-contained provenance records and reference-closure verification |
| `audits/yukue-f2-p07-seed-artifact-contract-2026-07-16.md` | Passed audit | Contract v1 hosted verification and candidate-boundary enforcement |
| `audits/yukue-f2-p08-jinja-start-gate-2026-07-16.md` | Passed guardrail audit | Hosted blocked-gate verification without future-site activation |
| `audits/yukue-f2-p09-dainichireiki-official-provenance-2026-07-17.md` | Passed audit | Shrine-operated official Source, versioned Entity correction, and refreshed seed baseline |
| `audits/matsuri-f2-p10-correction-contract-2026-07-18.md` | Passed audit | All-family correction coverage, ordered version enforcement, and final-output validation |
| `audits/matsuri-f2-p11-bundle-order-contract-2026-07-18.md` | Passed audit | Exact additive and correction bundle order parity between canonical consumers |
| `audits/matsuri-f2-p12-shared-correction-engine-2026-07-18.md` | Passed audit | One shared correction implementation for the canonical loader and HTML Public Projection |
| `audits/matsuri-f2-p13-canonical-dataset-contract-2026-07-18.md` | Passed audit | One shared twelve-family canonical dataset assembler and duplicate-ID validation with or without corrections |
| `audits/matsuri-kushida-jinja-identity-evidence-2026-07-20.md` | Passed maintenance audit | Dedicated 櫛田神社 Source, second direct identity Evidence, portable provenance refresh, and blocked Jinja gate verification |
| `audits/matsuri-kushida-external-link-2026-07-23.md` | Passed maintenance audit | Complete-record correction from the festival homepage to the dedicated 櫛田神社 page |
| `audits/matsuri-aso-chichibu-identity-evidence-2026-07-20.md` | Passed maintenance audit | Dedicated 阿蘇神社 and 秩父神社 Sources, second direct identity Evidence records, portable provenance refresh, and blocked Jinja gate verification |
| `audits/matsuri-organization-source-evidence-2026-07-20.md` | Passed maintenance audit | Three organization identity Sources and Evidence records, complete-record external-link corrections, and zero remaining public Entities without external links |
| `audits/matsuri-canonical-name-provenance-2026-07-20.md` | Passed maintenance audit | Dedicated Source linkage for four canonical Entity names, one new organization identity Source and Evidence record, and preserved launch boundaries |
| `audits/matsuri-remaining-name-provenance-2026-07-20.md` | Passed maintenance audit | Direct Source linkage for 大日霊貴神社, 脚折雨乞行事保存会, and 川越まつり協賛会, with one reviewed no-change record |
| `matsuri-data-freshness-audit.md` | F2-M02 completed | Completed fixed-date audit and routine maintenance rules |
| `matsuri-relation-coverage-contract.md` | Active repository contract | Strict zero-gap Relation coverage check and review boundary |
| `audits/matsuri-f2-m02-candidate-inventory-2026-07-12.md` | Baseline completed | Initial Occurrence, State, and external-link inventory |
| `audits/matsuri-f2-m02-soma-outcome-2026-07-12.md` | Outcome resolved | 南相馬市 Evidence and `held` correction for 相馬野馬追 2026 |
| `audits/matsuri-hakata-outcome-2026-07-16.md` | Outcome resolved | Official 追い山笠 result Evidence and `held` correction for 博多祇園山笠2026 |
| `audits/matsuri-f2-m02-relation-inventory-2026-07-12.md` | Baseline completed | Initial Relation coverage inventory |
| `audits/matsuri-f2-m02-suneori-relation-2026-07-12.md` | Maintenance batch 02 | 脚折雨乞 organization and Relation correction |
| `audits/matsuri-f2-m02-nunobashi-relation-2026-07-12.md` | Maintenance batch 03 | 富山県［立山博物館］ Relation coverage |
| `release-verification.md` | F2-24 baseline | Unified release verification, topology, Search, crawler, and Search Console evidence, CI stages, and external limits |
| `release-candidate.md` | Sitemap submission and indexability verified | Origin-neutral artifact, hashes, external evidence, and F2-25 pending state |
| `repository-launch-readiness.md` | Completed through F2-24 | Required checks, verified canonical/Search/crawler/Search Console state, and remaining external gates |
| `visual-review-workflow.md` | Implemented repository baseline | Full-page screenshot capture, checks, contact sheets, and review |
| `audits/matsuri-f2-m01-visual-review-2026-07-11.md` | Passed audit | First exhaustive desktop/mobile visual review |
| `source-evidence-audit.md` | F2 baseline / 2026-07-20 provenance maintenance verified | Source metadata, Evidence targeting, freshness boundaries, external-link coverage, and canonical-name provenance closure |
| `browser-accessibility-audit.md` | F2 repository baseline | Chromium viewport matrix, WCAG checks, and keyboard behavior |
| `public-content-audit.md` | F2 repository baseline | Public content and infrastructure-status boundaries |
| `analytics.md` | Workers baseline | Analytics purpose, F2-25–27 progression, verification, and privacy boundary |
| `roadmap.md` | Current | Long-range phases and gates |
| `development-schedule.md` | Current | Concrete implementation sequence |
| `verification-policy.md` | Current | Review and publication rules |
| `source-policy.md` | Current | Source and evidence rules |
| `image-policy.md` | Current | Real-image, rights, credit, and gallery rules |
| `data-workflow.md` | Current direction | Research-to-public data workflow |
| `versioning-policy.md` | Current direction | Schema and record versioning rules |
| `machine-readable-layer.md` | Current direction | Public machine-readable outputs and crawler invariants |
| `decision-log.md` | Living | Project decisions and reversals |
| `project-status.md` | Living | Current phase and next gate |

## Schedule model

```text
roadmap.md
= long-range phases and gates

development-schedule.md
= concrete implementation and PR sequence

project-status.md
= current position and next gate
```

## Agent instruction hierarchy

Read the root `AGENTS.md` first, then the nearest nested `AGENTS.md` for the path being changed.

```text
/AGENTS.md
→ /docs/AGENTS.md
→ nearest app or package AGENTS.md
```

## Source-of-truth rule

Repository documents are the implementation reference for public project behavior. Private research notes, candidate queues, internal confidence notes, unresolved source conflicts under review, private operational notes, and internal commercial planning are not stored in this public repository.

## Update discipline

A pull request that changes public behavior should update the relevant specification when it affects record structure, publication behavior, page structure, navigation, evidence rules, image rules, UI direction, design tokens, UI foundation behavior, technical architecture, deployment topology, crawler behavior, roadmap gates, active implementation sequence, or project status.
