# Design and impact

CLI discovery reads root metadata, not arbitrary source semantics. Pure report validation recomputes JSON-pointer assertions against hashed evidence, while execution authenticity remains independently reviewed. Product owns technical docs; Core owns verification. No custom runner, runtime dependency or config registry.

| Area | Status | Evidence / reason |
| --- | --- | --- |
| core | done | verification skill/workflow, AGENTS, test engineer, checks/evals |
| adapter | not-applicable | reuse existing detector/frameworks; no adapter contract changes |
| capability-skill | done | Product 1.4.0 skill/template/workflow, matrix |
| cli-config | done | optional CLI flags/report validator; config schemas unchanged |
| workflow | done | idea/document/change-impact to TechSpec and Core verification |
| documentation | done | adaptive guide, README/index/CLI/versioning |
| verification | done | deterministic tests and package smoke; live model BLOCKED |
| release-migration | done | Unreleased notes; distribution stays 0.10.0, no publish |
