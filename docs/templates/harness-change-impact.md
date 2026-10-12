# Harness change impact

Maintainer-only template. Copy into the active OpenSpec design/change or use the table in a small PR.
Do not install this as a mandatory consumer application template.

- Change / objective: record the actual request and scope.
- Base commit / affected modules: record verified values.
- Decision sources: link existing decisions; list consequential unresolved questions.

Use `pending`, `done`, or `not-applicable`. Every row needs paths/evidence or a specific reason.
Keep pending work visible; no blanket not-applicable statement for the whole change.

| Area | Status | Affected paths and evidence / reason not applicable |
| --- | --- | --- |
| core | pending | Assess rule, entry point, policy and related behavior |
| adapter | pending | Assess registry, manifest, index, assets and module version |
| capability-skill | pending | Assess declaration, exposure, workflow and handoff |
| cli-config | pending | Assess schema, ownership, install/update and package contents |
| workflow | pending | Assess inputs, outputs, gates and receiving stage |
| documentation | pending | Assess usage guides, examples and links |
| verification | pending | Record actual commands/results; separate manual/live-agent evidence |
| release-migration | pending | Assess Unreleased notes, compatibility, rollback and version ownership |

## Link chain
Record declaration → distribution → discovery → use → review/check → documentation for affected
behavior. Explain any stage that does not apply. For a removal/rename, list old references reconciled.

## Validation and remaining work
Record commands actually run, outcomes, skipped checks with reasons, pending items and next owner.
Do not claim model compliance from file/link tests. Keep shared instructions in their canonical docs.
