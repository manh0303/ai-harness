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
