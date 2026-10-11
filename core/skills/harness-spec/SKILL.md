---
name: harness-spec
description: Turn requirements into scoped OpenSpec change artifacts.
---

# spec

## Input
User request, authoritative source links, existing specs and repository boundaries.
## Procedure
1. Read source context and identify missing or conflicting business decisions. Follow the installed
   clarification workflow: ask 1–3 consequential questions with A/B/C trade-offs, a grounded
   recommendation and free text. Reuse established answers and authorization.
2. Draft proposal, design, tasks and capability delta specs in openspec/changes/<id>/.
3. Use ADDED/MODIFIED/REMOVED requirement sections and WHEN/THEN acceptance scenarios.
4. Include affected repositories, non-goals, security impact, migration and rollback.
5. Plan vertical tasks with public test boundaries and trace them to requirements.
6. Record reviewed decisions, answers and source references in decisions.json. Resolve consequential
   uncertainties before the affected implementation; run aih ready <id> --stage implement.
7. Validate with the project's pinned OpenSpec CLI; structural readiness does not replace it.
## Output
Reviewable change artifacts and an explicit list of remaining decisions.
## Constraints
Do not mark tasks complete before evidence. Do not archive until associated changes are merged.
Draft creation does not grant permission to modify another repo or access a service.
