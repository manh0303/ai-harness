# Spec → Code → Test → Review

| Stage | Input | Output and gate |
| --- | --- | --- |
| Discover | Request, repository, linked sources | Scope, uncertainties, affected repos and risks; use clarification workflow for consequential unknowns |
| Specify | Agreed behavior | proposal, design, delta specs and vertical tasks |
| Review spec | Acceptance scenarios and design | Owner agreement for consequential choices; explicit task authorization may already cover routine choices |
| Implement | One task with a public test boundary | Failing meaningful test, minimal implementation, green test |
| Verify | Changed behavior | Relevant automated checks and honest skipped-check list |
| Review | Diff plus spec | Findings on correctness, security, compatibility and requirements |
| Deliver | Reviewed branch | PR with change ID, evidence, residual risks and rollback plan |
| Archive | All associated PRs merged | Sync accepted specs and archive via OpenSpec in a separate reviewed change if needed |

For first use, read `project-setup.md` in this workflow directory. Before implementing consequential
unknowns, follow `clarification.md`: inspect existing answers, ask 1–3 A/B/C questions with grounded
recommendations, and record answers/source in the change's decisions.json. Do not ask again once
scope and authorization are already clear. Run `aih ready <id> --stage implement` after drafting;
record actual checks in verification.json and use `--stage review` before handoff. These commands
check structure, not business approval or the truth of test evidence.

Use the harness-spec skill to draft and harness-tdd to implement. Use harness-debugging when diagnosing
an observed defect. Agents are roles, not automatically spawned workers; a single assistant can perform
them sequentially. Respect the host's delegation rules.
Small documentation edits or obvious low-risk fixes may skip a full spec with a rationale in the PR.
Security-sensitive or externally visible behavior changes need explicit acceptance scenarios.
Never archive an unmerged proposal as implemented. CI remains authoritative for actual check results.
