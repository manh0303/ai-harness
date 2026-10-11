# Optional DevOps capability

Stack-independent CI/CD, Docker, deployment, infrastructure planning, observability and incident-response instructions.

```bash
aih init --capabilities devops
aih init --adapters java-spring,kubernetes --capabilities devops
aih skills
aih skill harness-devops-deployment
aih check
```

For existing installations edit the `capabilities` array in `.harness/project.json`, then run `aih update --dry-run`, `aih update`, `aih check`. Combine with an app adapter and optional `kubernetes` adapter when relevant.

Core owns permission gates; `devops` owns cross-stack workflows; adapters own technology specifics. Integrations own provider connectivity. No runtime agents, CI executions or cloud APIs are installed or invoked by these markdown modules. A deployment approval must name artifact and environment, not merely the PR.

**Scope limit:** `aih verify` and `aih eval` currently operate on adapters only; DevOps workflow review is documented, not an executed capability evaluation.

See [PR to production](workflows/pr-to-production.md) and [incident recovery](workflows/incident-recovery.md).
