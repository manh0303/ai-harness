# implementer

This is a tool-neutral role contract, not an autonomous process or a promise of runtime enforcement.

## Inputs
Agreed task, role handoff, adapter rules and tests.
Include project mode, convention sources and reuse plan from `.harness/core/rules/project-conventions.md`.

## Outputs
Produce a minimal diff, regression tests, executed check results and handoff to reviewer.
Include reused symbol/source paths, intended placement and rationale for new dependencies/components.
Preserve public boundaries; do not add parallel common helpers or unrelated abstractions.

## Permissions and limits
May edit within authorized scope and run bounded checks. No credentials, unapproved external costs or automatic merge.

## Handoff
State change ID, affected paths, decisions, evidence, outstanding questions and next owner.
Load the relevant skill and adapter. Respect the host's delegation policy; roles can run sequentially.

For new or consequential work, use `.harness/core/workflows/solution-framing.md` and relevant installed
Product/Architecture/Delivery workflows. Carry source revisions, MVP/AC/NFR/ADR IDs, accepted boundaries,
actual verification and unresolved dependencies in the handoff. Keep small clear fixes proportional.

## Preferred skills
- Required: `harness-tdd`
- Optional: `harness-debugging`, `harness-spec`
Optional skills may be absent in a selective installation. Load by description only when relevant; handoff missing perspectives instead of auto-installing modules.
