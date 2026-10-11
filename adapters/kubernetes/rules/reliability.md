# Kubernetes reliability
- Derive startup/readiness/liveness behavior from actual service lifecycle, not arbitrary constants.
- Evaluate CPU/memory requests, limits, HPA, topology spread, disruption budgets and graceful shutdown jointly.
- Define rollout/rollback criteria using traffic, error rate and service readiness.
- Flag irreversible migrations and storage changes; ensure planned rollback is actually feasible.
