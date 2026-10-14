# Design

Base: main 4871cb5e54e6065c8437192357fde70a6b517ceb. Source retrieved with Git and checked
against the GitHub tree. Distribution remains 0.14.0; Product contract 1.6.0 → 1.7.0.
User provided the workflow-contract design and eight distribution/onboarding requirements.

## Decisions and compatibility
Contract/driver/evidence are separate ownership planes. Orchestrator remains a role.
Spec-to-code JSON stays in Core; idea-to-prd stays beside its canonical Product Markdown and
requires Product selected. JSON Schema serves external editors; local validation adds registry/graph
checks. Stage-table equality is enforced. Only on_reject/on_fail may participate in cycles.

Default implement/review retain the existing structural checks, including Markdown scenario structure,
resolved/reviewed decisions, task lists, evidence and artifact-impact. New named stages read installed
JSON. --workflow is explicit opt-in to all contract gates, including approval_from. Approval files are
project-owned change evidence, not managed configs or authenticated identity/permission. ready checks
entry, never completion/business truth/archive merge status. No retrospective approval requirement.

The separate script has a Claude-only headless driver and defaults to NOT_RUN. Explicit execute uses
new per-case fixtures and read-only tools, stream-json capture, a distinct model judge, literal
assertions and 3–5 repetitions. Errors retain incomplete null scores, incrementally written reports
and requested-run denominators. Human audit and other hosts remain NOT_RUN. These limited trials do
not test code execution, end-user interfaces or actual merge permissions; no statistical assurance.
The output directory is exclusive and actual process calls have timeout/size bounds. No installer import
of child_process. Host context/authentication are externally owned. No worker delegation is added.

pip ships a thin stdlib launcher plus canonical npm files allowlist. Python 3.9+ and existing Node 22+
are explicit requirements. PEP 517 backend has no build dependency, derives version from package.json,
preserves hidden template files and produces a pure wheel/sdist; no npm/npx/download is used. .venv
site-packages is an explicit additional source-overlap exception with a distribution marker; arbitrary
source/target overlap stays blocked. Runtime data/config is unchanged by CLI reinstallation.

Release Please remains the sole distribution version authority. Dynamic Python version avoids
maintaining another static version. CI tests Node and Python distributions on Linux/Windows, Python
3.9/3.12. Existing npm trusted publisher filename stays; publish tests/builds wheels from same immutable
tag before npm, then a separate OIDC PyPI job publishes tested artifacts. Registry publication cannot
be atomic: failed PyPI job is rerun independently. Maintainer must reserve/configure PyPI project
manhd-ai-harness and Trusted Publisher environment pypi. No account setup is claimed complete.

## Impact matrix

| Area | Status | Evidence / reason |
| --- | --- | --- |
| core | done | Workflow JSON/schema, orchestrator and harness-start; core approval-boundary assertion |
| adapter | not-applicable | No adapter API/rules/selection changes; same six adapters packaged and byte-compared |
| capability-skill | done | Product canonical JSON/Markdown and 1.7.0 additive module contract; Core start shared across hosts |
| cli-config | done | workflow.js/readiness/main; schema-1 approvals; safe .venv package overlap; packaged assets |
| workflow | done | Two eight-stage contracts and table equality; legacy gates preserved; human/execution limits documented |
| documentation | done | README + 3 translations, six guides, architecture, pip/contract/runner/reference/maintenance |
| verification | done | 282 tests plus validate/npm package/Python offline smoke/release checks; actual logs and NOT_RUN limitations in verification.md |
| release-migration | done | Unreleased changelog, dynamic version guard, dual-release/CI and versioning/rollback guide |

## Declaration to consumer chain
- Contract JSON/schema → Core/Product bundle → lock → workflow validate / ready → host role/gates → tests/docs.
- approvals template → managed template only → actual change-owned record → ready approval_from → external reviewer truth.
- npm files allowlist → Python PEP 517 wheel/sdist → aih launcher → shared CLI → parity/offline smoke → pip guide.
- Core cases/assertions → installed eval export/digest → separate driver → report/transcript/judge → scorer/rates → human audit.
- harness-start canonical → .agents + optional host wrappers → session prompt in six guides → scoped saved config/freshness.
No registry or host execution result is inferred from file declarations.
