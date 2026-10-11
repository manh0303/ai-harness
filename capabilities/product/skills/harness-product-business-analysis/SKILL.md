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
