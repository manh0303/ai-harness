# TechSpec

Status: draft / pending-review
Source revision: UNVERIFIED
Canonical storage / source-write policy: pending

## Feature overview and requirements
Link approved or provisional requirement IDs and authoritative source revisions.

## Applicable design and contracts
UNVERIFIED: inspect scoped code. Include only relevant architecture, business rules, UI flows, API/error/data/auth/integration contracts, compatibility and operational concerns.

## Risk-selected details (include only relevant subsections)

- Baseline/impact: reused modules/components and public contracts changed; source revisions.
- API: input/output/error schema, validation, authorization, limits and compatibility.
- Data: ownership, schema/constraints/indexes, query shape, migration/backfill and vendor assumptions.
- Runtime: success/failure paths, transaction boundary, concurrency invariant, conflict handling.
- Integration: timeout, retry ownership/bounds, idempotency/replay, ordering and partial failure.
- Operations: redacted logs/metrics, rollout dependencies, feature exposure and recovery/rollback limits.
- Tasks: vertical slices with observable outcome, intended files, prerequisites, test boundary and done condition.

Link canonical ADRs/design documents. These are prompts for analysis, not mandatory infrastructure.

## Verification
Link requirement → scenario → actual evidence. Record PASSED/FAILED/BLOCKED/NOT_RUN and VERIFIED/UNVERIFIED coverage. Static inspection is not runtime proof.

## Maintenance and limitations
Propose affected sections only; preserve existing edits and apply artifact/source policies. Record unknowns, evidence gaps and review decisions.

## Related-flow evidence (when applicable)
Record requirement/scenario IDs, prerequisite state, actors, ordered steps, expected/observed business outcomes, dependency scope and cleanup. Choose actual API/UI/mobile/CLI/batch flows; omit this section when no related journey is affected.

## Progress and recovery (when needed)
Tested code/config/environment revisions; completed groups with evidence references; pending/in-progress groups; owned process/session/log references; uncertain operations; checkpoint path and next action. No credentials. Reconcile stale evidence and rerun affected groups before retaining a previous PASS.
