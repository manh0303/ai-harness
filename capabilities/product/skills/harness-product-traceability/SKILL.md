---
name: harness-product-traceability
description: Maintain bidirectional links from document sources through BRD/PRD/stories to UI/UX and OpenSpec.
---

# harness-product-traceability

## Input
- Source register, approved requirements, stories, acceptance criteria, design and engineering IDs if present.

## Procedure
1. Construct a traceability matrix keyed by stable requirement IDs, with references to sources and derived artifacts.
2. Verify referential integrity: no duplicate IDs, orphan stories, orphan AC, or nonexistent source anchors.
3. Mark not-yet-created artifacts as `pending`; never manufacture Figma node IDs or repository commits.
4. Compute coverage (e.g. requirements with story, AC and review status) and explicitly state excluded or deferred items.
5. On source change, compare source version/content, create an impact report for BRD/PRD/stories/UX/OpenSpec and require approval before propagation.

## Output
- `docs/product/traceability.md` and `change-impact.md` when requested.
- Missing-link report and impacted artifacts by requirement.

## Constraints
- Links are evidence pointers, not authorization to modify external systems.
- Never rewrite approved artifacts automatically based on Confluence updates.
