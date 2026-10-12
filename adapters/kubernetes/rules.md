# Kubernetes adapter

Use this adapter for manifest, Helm and rollout decisions. Combine with the `devops` capability for broader release/incident workflows. It never grants cluster permissions.

Read `rules/architecture.md`, `rules/security.md` and `rules/reliability.md` before applying the
relevant skills declared in `adapter.yaml`. Review `checks/verification.yaml` for advisory checks.

- Respect existing namespaces, GitOps ownership, supported API versions, CRDs and overlays.
- Use immutable image provenance, explicit requests/limits, verified probes, safe termination and controlled rollout.
- Protect secrets and tenant boundaries; do not commit plaintext credentials or assume cluster-admin access.
- Distinguish static review, Helm rendering, server admission and observed health.
- Explicit human approval for production changes; no automatic apply/upgrade/rollback.
