# Incident recovery — evidence-first workflow

1. Assign commander, severity, incident ID, timezone and customer impact; preserve current state.
2. Use `harness-devops-observability` for authorized read-only logs, metrics and traces. Redact sensitive content and label facts/hypotheses.
3. Use `harness-devops-incident-response` to compare recent deploys, infrastructure events and external dependencies.
4. Propose bounded mitigations, expected impact, stop conditions and fallback; independently approve each production action.
5. Execute only through the separately authorized runtime/operator. Never bypass denial or make emergency privilege escalation implicit.
6. Validate restored user journeys and telemetry after action; command success does not establish resolution.
7. Document timeline, contributing factors, SLO impact, postmortem and accountable follow-ups.

## Deliverables
Incident summary, evidence links/timestamps, decision log and owner-approved corrective action items. Clearly distinguish observed, inferred and unverified material.
