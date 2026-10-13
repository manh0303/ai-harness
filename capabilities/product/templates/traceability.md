# Requirements traceability matrix

Version: 0.1-draft | Status: pending-review | Sources reviewed at: <date>

| Source anchor | BR/FR/NFR | PRD | Epic/Story | AC | UI screen / Figma | OpenSpec change | Decision/status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SRC-001#<section> | FR-001 | PRD-001 | EPIC-001 / US-001 | AC-US-001-01 | pending | pending | draft |

## Referential integrity check
- Duplicate IDs:
- Requirement rows with no source (unless explicit INFERENCE):
- Orphaned PRD items / stories / AC:
- Deferred or excluded requirements:
- Sources or downstream artifacts inaccessible during review:

## Coverage summary
- Denominator (eligible requirements): <number>
- With source links: <number>
- With stories + AC: <number>
- Reviewed and approved by authorized human: <number>
- Missing or pending mappings: <number>

Do not fabricate Figma node IDs, code commits or approvals. Write `pending` until they exist.

## Implementation and verification links
| Stable requirement / AC | Spec section / revision | Code / contract path / revision | Test / raw evidence / tested revision | Result / gap |
| --- | --- | --- | --- | --- |

Only observed execution supports runtime PASS. Invalidate affected stale coverage after baseline
changes; record BLOCKED/NOT_RUN and their reasons. Preserve unchanged rows and retired ID history.
