# Change impact analysis — requirements, UI and implementation

## Trigger
A Confluence page, approved brief, BRD/PRD requirement or business rule changed.

## Steps
1. Compare approved source version with the newly retrieved authorized version and note added/removed/changed claims; do not assume link text reflects changes.
2. Identify affected BR/FR/NFR, PRD requirements, epics, stories, acceptance criteria using traceability IDs.
3. Identify downstream UI screen IDs and OpenSpec changes only when real mapping entries exist; `pending` is not evidence of a completed artifact.
4. Analyze scope, security, privacy, business process, cost and schedule impacts. Ask accountable owners to decide whether to accept the change.
5. Draft proposed changes with new source anchors and a rollback/review plan; never overwrite approved Figma, code or product docs automatically.
6. Re-run document-review and request a new human approval before downstream handoff.

## Output
A `docs/product/change-impact.md` mapping `old source version → new version → affected IDs → proposed change → owner/status` and explicit review checkpoints. No automatic external updates.
