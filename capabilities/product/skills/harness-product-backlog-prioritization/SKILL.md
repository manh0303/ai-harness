---
name: harness-product-backlog-prioritization
description: Rank proposed requirements transparently using explicit scoring assumptions and dependencies.
---

# harness-product-backlog-prioritization

## Input
- Candidate backlog with value, urgency, effort uncertainty, dependencies and business risks.
- Stakeholder prioritization method (MoSCoW, RICE or agreed alternative).

## Procedure
1. Confirm the planning horizon and decision maker.
2. Choose the approved method; when unclear, propose one with assumptions clearly labeled.
3. Record evidence separately for reach/impact/confidence/effort or MoSCoW class; never assert fabricated scores.
4. Note blocked work, security dependencies and sequencing constraints.
5. Produce a reviewable priority proposal with tradeoffs and an explicit approval field.

## Output
- Prioritized backlog with documented rationale, unknowns, dependencies and proposed milestones.
- Owner decisions required to finalize order.

## Constraints
- AI ranking is advisory; only the authorized PO/PM sets accepted priorities.
- Do not equate an estimate with a delivery commitment.

## Template
Read `.harness/capabilities/product/templates/backlog.md`; `aih new-doc backlog` creates only a missing
draft. Reuse canonical existing documents and source pointers; never regenerate approved content by default.

## Example
Synthetic illustration: Rank secure create/search before optional import using agreed value/dependencies; effort stays unknown without team input.

## Quality checklist
- Priority rationale uses evidence instead of fabricated effort scores.
- Actual decisions/status and source revisions distinguish approved facts from proposals.
- Scope, relevant IDs, unresolved questions and verification limits are recorded.

## Handoff
Use `.harness/capabilities/product/workflows/product-to-solution.md`; supply reviewed source/requirement
IDs, output paths and actual owner decisions to the next BA/PO/SA/PM role as applicable. Return gaps
to their owner; a single host may perform roles sequentially without claiming independent approval.
