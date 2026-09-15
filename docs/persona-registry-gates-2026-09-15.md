# Starting Six Persona Registry Gate Audit

**Date:** 2026-09-15
**Disposition:** COPY CLEARED — PUBLICATION BLOCKED
**Baseline:** `362fdba`
**Scope:** review staging only; no publication, merge, catalog import, discount change, or deployment

This audit records what can be verified from the QP-Storefront repository and the approved internal evidence. It does not convert an unverified record into `READY` and does not authorize a persona card to render a product.

## Gate rule

A persona product may be marked `READY` only when all of the following are independently evidenced in the canonical registry: canonical SKU, live price, verified image with provenance, compliant customer-facing copy, verified availability, margin at or above 54%, price at or below the $1,000 ceiling, and explicit `READY` status. The current repository does not yet provide that complete evidence model.

## Persona review

| Persona | Current mapped product IDs | What is present | Open gate |
| --- | --- | --- | --- |
| Alex | `c-23`, `c-33`, `c-52`, `c-55` | Each current record has a canonical SKU, live product price, and local image reference in `PRODUCTS`. | Registry status is `launch`, not `READY`; image provenance, verified availability, cost, and 54% margin evidence are not represented. |
| Marcus | `c-17`, `c-73`, `c-55`, `c-88`, `c-52` | `c-17`, `c-73`, `c-55`, and `c-52` have canonical SKUs and local image references. | `c-88` has no image reference; all records lack explicit `READY`, cost/margin, and provenance evidence. |
| Ken | `b-05`, `b-06`, `b-07` | The records have product names, prices, and local image references. | The three records have no canonical SKU fields. The approved Ken candidates (`SS77016`, `SV505-WRIST`, `AD553-Black`, and `WVSNVC4SG5` where applicable) are not complete product records in the current repository. |
| Jasper | `ec720`, `c-81`, `c-82`, `c-83`, `c-84` | Each current record has a canonical SKU, live product price, and local image reference. | Registry status is `launch`, not `READY`; image provenance, verified availability, cost, and 54% margin evidence are not represented. |
| Gabe | `c-56`, `c-86`, `c-87`, `c-89` | Each current record has a canonical SKU and live product price. | None of these four current records has an image reference; all lack explicit `READY`, provenance, cost, and margin evidence. |
| Simon | `c-67`, `c-68`, `c-69`, `c-70`, `c-71` | Each current record has a canonical SKU, live product price, and local image reference. | Registry status is `launch`, not `READY`; image provenance, verified availability, cost, and 54% margin evidence are not represented. |

The persona copy remains the Linda-cleared copy artifact. Product-level descriptions must not be treated as a substitute for that copy gate.

## Batch 1 evidence

| SKU | Evidence available | Missing before `READY` |
| --- | --- | --- |
| `AF514` | Joshua confirmed the canonical identity as Master Series Obedience Extreme Sex Bench with Restraint Straps. | Verified live retail price, verified image/provenance, approved tagline/copy record, availability, cost, margin, and explicit `READY` status. |
| `SV505-WRIST` | Joshua confirmed Strict Leather Premium Locking Wrist Cuffs; WSP `$60.43`, retail `$161.95`, and 76 units. | Verified image/provenance, approved tagline/copy record, cost/margin record, and explicit `READY` status. |
| `AD553-Black` | No complete repository or internal evidence was available in this audit. | Canonical identity, live price, verified image/provenance, approved copy, availability, cost, margin, and explicit `READY` status. |

## Commercial controls

**Product status:** `src/lib/sku-registry.ts` currently uses `launch`, `review`, and `shelved`; it does not define a `READY` publication status or the evidence fields required by QP-POL-007.

**Margin floor:** `Product` has no cost or margin fields, and no verifiable 54% margin calculation is present for the persona lane.

**High-ticket ceiling:** the repository contains shelved records and comments, but no complete persona-level enforcement and evidence proving the `$1,000` ceiling.

**QUEER-10:** the one-time checkout route does not accept or calculate a discount code, which is consistent with rejection of QUEER-10 at one-time checkout. However, the repository does not yet contain a test-backed recurring-only eligibility control proving that the code is accepted only for eligible recurring SBLC charges. No discount behavior was changed in this staging commit.

**Zero-product reset:** no verifiable deployment evidence was found in this repository audit proving that the catalog reset is real and reconciled on the storefront surface.

**Funnel guard:** `fix/funnel-server-pricing-guard` remains unmerged. This staging work does not merge it.

## Final disposition

The persona copy files are not publication-complete because the registry-before-publication gates remain open. This branch contains an evidence ledger only; it does not publish, map new products, alter prices, alter images, change discount rules, or touch production.

Joshua review and authorization are required before any merge or deployment.
