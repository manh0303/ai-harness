# Kubernetes security
- Prefer dedicated service accounts, least privilege RBAC, non-root containers and restricted capabilities.
- Review admission policy, registry provenance, network policies and access to mounted secret volumes.
- Avoid broad cluster roles, privileged/hostNetwork/hostPath workloads without documented review.
- Never embed credentials in manifests or logs; require explicit context and namespace for authorized cluster reads.
