---
name: harness-product-user-stories
description: Turn approved requirements into atomic epics and user stories with traceable roles and outcomes.
---

# harness-product-user-stories

## Input
- Approved PRD and requirement inventory, persona list and business rules.
- Team delivery conventions and decomposition boundaries.

## Procedure
1. Group product goals into epics with stable `EPIC-###` IDs and trace to product goals.
2. Write small outcome-focused `US-###` stories: As a <role>, I want <capability>, so that <benefit>.
3. Capture preconditions, success/failure paths, edge cases, non-functional constraints and dependencies.
4. Associate each story to its parent epic, `PRD-###`, `FR-###` and evidence; mark inferred stories as candidates.
5. Hand off stories to acceptance-criteria skill; flag stories that cannot be tested or have unresolved decisions.

## Output
- `docs/product/backlog.md` with epics, story IDs, sources, acceptance links and status.
- Unresolved decomposition/priority decisions.

## Constraints
- Do not fabricate persona needs or change scope via user-story rewriting.
- A story marked Ready requires actual acceptance criteria and PO review.

## Template
Read `.harness/capabilities/product/templates/backlog.md`; `aih new-doc backlog` creates only a missing
draft. Reuse canonical existing documents and source pointers; never regenerate approved content by default.

## Example
Synthetic illustration: US-001: authorized employee finds a customer; links FR-001 and AC-US-001-01, with access-denial criteria.

## Quality checklist
- Story has user value, dependency and observable acceptance.
- Actual decisions/status and source revisions distinguish approved facts from proposals.
- Scope, relevant IDs, unresolved questions and verification limits are recorded.

## Handoff
Use `.harness/capabilities/product/workflows/product-to-solution.md`; supply reviewed source/requirement
IDs, output paths and actual owner decisions to the next BA/PO/SA/PM role as applicable. Return gaps
to their owner; a single host may perform roles sequentially without claiming independent approval.
