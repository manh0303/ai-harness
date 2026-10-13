---
name: harness-product-business-analysis
description: Elicit actors, existing versus future processes, business rules, requirements and non-functional constraints.
---

# harness-product-business-analysis

## Input
- Evidence-backed source register and business context.
- Stakeholder decisions, goals and scope boundaries.

## Procedure
1. Identify actors, triggers, business events, permissions and upstream/downstream systems.
2. Describe AS-IS and TO-BE processes, entry/exit conditions, exceptions and alternatives; use text or Mermaid flow charts where helpful.
3. Assign stable IDs `BR-###`, `FR-###`, `NFR-###`, linked to their sources. Record proposed identifiers without reusing withdrawn IDs.
4. For each requirement specify objective, actor, rule, preconditions, outcomes, measurable validation and impact. Distinguish system constraints from user preferences.
5. Flag conflicts, compliance assumptions, data sensitivity, cross-service impact and unanswered stakeholder questions.
6. Request stakeholder review before treating inferred flows or rules as authoritative.

## Output
- `business-rules.md`, AS-IS/TO-BE flows and requirement inventory.
- Decision requests and stakeholder review checklist.

## Constraints
- No unapproved product scope expansion; no fabricated regulation or SLA.
- Do not reveal internal source material or imply stakeholder acceptance without a decision record.

## Template
Read `.harness/capabilities/product/templates/business-rules.md`; `aih new-doc business-rules` creates only a missing
draft. Reuse canonical existing documents and source pointers; never regenerate approved content by default.

## Example
Synthetic illustration: BR-001 requires organization-scoped search; AS-IS behavior and proposed TO-BE duplicate handling remain distinct.

## Quality checklist
- Business rules and AS-IS/TO-BE preserve source authority.
- Actual decisions/status and source revisions distinguish approved facts from proposals.
- Scope, relevant IDs, unresolved questions and verification limits are recorded.

## Handoff
Use `.harness/capabilities/product/workflows/product-to-solution.md`; supply reviewed source/requirement
IDs, output paths and actual owner decisions to the next BA/PO/SA/PM role as applicable. Return gaps
to their owner; a single host may perform roles sequentially without claiming independent approval.

## Continuous changes
Use Core `continuous-development.md`. Compare approved vs proposed rule/use-case/AC deltas at actual
source revisions; retain IDs and withdrawn history. Trace changed rules into API/data/event contracts
and regression expectations. Record docs–code disagreement and its decision owner before propagation.
