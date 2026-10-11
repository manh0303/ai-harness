# Kubernetes architecture
- Choose Deployment/StatefulSet/Job according to workload semantics and storage lifecycle.
- Check selectors, Services, ingress, namespace, labels, chart values, Helm hooks, CRD dependencies and environment overlays.
- Follow existing GitOps flow; avoid unreviewed imperative drift.
- Request target Kubernetes version and operator availability; do not assume API support.
