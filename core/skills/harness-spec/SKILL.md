---
name: harness-spec
description: Turn requirements into scoped OpenSpec change artifacts.
---

# spec

## Input
User request, authoritative source links, existing specs and repository boundaries.
## Procedure
1. Read source context and identify missing or conflicting business decisions.
2. Draft proposal, design, tasks and capability delta specs in openspec/changes/<id>/.
3. Use ADDED/MODIFIED/REMOVED requirement sections and WHEN/THEN acceptance scenarios.
4. Include affected repositories, non-goals, security impact, migration and rollback.
5. Plan vertical tasks with public test boundaries and trace them to requirements.
6. Resolve consequential uncertainties; validate with the project's pinned OpenSpec CLI.
## Output
Reviewable change artifacts and an explicit list of remaining decisions.
## Constraints
Do not mark tasks complete before evidence. Do not archive until associated changes are merged.
Draft creation does not grant permission to modify another repo or access a service.
