# Spec → Code → Test → Review

| Stage | Input | Output and gate |
| --- | --- | --- |
| Discover | Request, repository, linked sources | Scope, uncertainties, affected repos and risks |
| Specify | Agreed behavior | proposal, design, delta specs and vertical tasks |
| Review spec | Acceptance scenarios and design | Owner agreement for consequential choices; explicit task authorization may already cover routine choices |
| Implement | One task with a public test boundary | Failing meaningful test, minimal implementation, green test |
| Verify | Changed behavior | Relevant automated checks and honest skipped-check list |
| Review | Diff plus spec | Findings on correctness, security, compatibility and requirements |
| Deliver | Reviewed branch | PR with change ID, evidence, residual risks and rollback plan |
| Archive | All associated PRs merged | Sync accepted specs and archive via OpenSpec in a separate reviewed change if needed |

Use the harness-spec skill to draft and harness-tdd to implement. Use harness-debugging when diagnosing
an observed defect. Agents are roles, not automatically spawned workers; a single assistant can perform
them sequentially. Respect the host's delegation rules.
Small documentation edits or obvious low-risk fixes may skip a full spec with a rationale in the PR.
Security-sensitive or externally visible behavior changes need explicit acceptance scenarios.
Never archive an unmerged proposal as implemented. CI remains authoritative for actual check results.
