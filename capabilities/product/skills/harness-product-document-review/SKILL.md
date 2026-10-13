---
name: harness-product-document-review
description: Review generated BRD/PRD/stories for traceability, completeness, consistency, testability and approval readiness.
---

# harness-product-document-review

## Input
- Draft documents, source register and current decision log.
- Desired review depth and accountable reviewers.

## Procedure
1. Verify every factual requirement has a cited accessible source and label inferred proposals separately.
2. Check BRD↔PRD↔story↔AC mapping, requirement ID uniqueness and glossary consistency.
3. Find missing negative paths, actor/permission assumptions, contradictory requirements and untestable criteria.
4. Report blockers, major/minor findings, exact document location, rationale, recommendation and owner.
5. Record completeness and coverage measures with denominator and caveats; list evidence that was unavailable.
6. Leave documents in `pending-review` until named humans explicitly approve; suggest next actions without auto-approving.

## Output
- `docs/product/review-report.md` with severity, source evidence, owner and disposition.
- Gate recommendation: ready-for-human-review / rework-required (never approved by AI).

## Constraints
- Do not invent reviewer signatures, user research, tests or approvals.
- Do not treat missing information as implicit consent.

## Template
Read `.harness/capabilities/product/templates/review-report.md`; `aih new-doc review-report` creates only a missing
draft. Apply the shared document contract for authority, preservation and review.

## Example
Synthetic illustration: Flag conflicting duplicate policies with exact source references; do not turn the reviewed draft into owner approval.

## Quality checklist
- Findings include source, impact and decision owner.

## Handoff
Read the shared installed contract `.harness/capabilities/product/common/document-contract.md`; pass only affected scope and relevant perspectives.
