---
name: harness-product-acceptance-criteria
description: Write verifiable acceptance criteria in Given/When/Then for each story, including negative cases.
---

# harness-product-acceptance-criteria

## Input
- User stories and business rules with source IDs.
- Permissions, validation rules, API/domain constraints and known quality expectations.

## Procedure
1. Create unique `AC-<story-id>-NN` criteria or the team's approved scheme.
2. Cover happy path, validation errors, permission denied, empty/loading/retry/offline when relevant, data integrity and concurrency as needed.
3. Express acceptance scenarios with Given/When/Then; make outcomes observable and independently testable.
4. Trace each criterion to story/requirement and identify test level where useful (UX/API/integration).
5. Flag untestable ambiguity and request decision rather than inventing thresholds.

## Output
- `docs/product/acceptance-criteria.md` with criteria, linkage and unanswered cases.
- Candidate test-scenario checklist for QA and OpenSpec.

## Constraints
- Never claim that acceptance tests have run; these are specifications, not execution evidence.
- Avoid arbitrary time, availability and performance thresholds.

## Template
Read `.harness/capabilities/product/templates/acceptance-criteria.md`; `aih new-doc acceptance-criteria` creates only a missing
draft. Reuse canonical existing documents and source pointers; never regenerate approved content by default.

## Example
Synthetic illustration: Given an employee outside the organization, when searching its customer, then access is denied without leaking existence.

## Quality checklist
- Happy, negative and boundary cases are observable.
- Actual decisions/status and source revisions distinguish approved facts from proposals.
- Scope, relevant IDs, unresolved questions and verification limits are recorded.

## Handoff
Use `.harness/capabilities/product/workflows/product-to-solution.md`; supply reviewed source/requirement
IDs, output paths and actual owner decisions to the next BA/PO/SA/PM role as applicable. Return gaps
to their owner; a single host may perform roles sequentially without claiming independent approval.
