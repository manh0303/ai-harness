# Design: solution delivery

## Context
Base main: 686b64a620a6bc6256f567bfd564cbaea0acdc6c. Existing Product has 13 skills,
5 roles and 16 templates. Capability schema already supports roles/templates/checks/evals;
bundle() recursively vendors selected assets and exposes declared SKILL.md files. Reuse those contracts.

## Goals / Non-Goals
Give BA/PO/SA/PM a consistent overview and handoff without mandatory documentation for every task.
Host executes approved commands; role contracts do not spawn workers, approve decisions or grant tools.
No model quota estimates, production changes, third-party engine installation or imported source code.

## Convention and Reuse Plan
Maintain Harness's Node built-ins, manifest-driven composition, locked templates, refusal on drift,
transactional writes and project-owned outputs. new-doc defaults to Product for backward compatibility;
--capability selects another installed capability's declared template and docs namespace.
Keep compatibility Product PM role/template IDs; route richer delivery work to optional Delivery.

## Decisions
MVP = a usable value-bearing journey with explicit in/out scope, minimum safety/data quality and AC.
Architectural styles and local patterns are separate decisions; ask 2–3 grounded alternatives only
when material unknowns remain. Existing project decisions take precedence; record traceable ADRs and
measurable NFR scenarios without inventing targets. Product owns value/MVP; Architecture owns solution
trade-offs; Delivery owns sequencing/risks using team estimates, not unilateral dates.
Maintain a small project map linked to actual source revision, public module APIs and decisions.
Host setup uses thin project-owned bridges and manual skill loading fallback; installer does not
rewrite host configuration or claim a native role/plugin is installed.

## Impact matrix
| Area | Status | Paths / evidence / reason |
| --- | --- | --- |
| core | done | Proportional overview/impact workflow and entry/role handoff; Core checks/evals. |
| adapter | not-applicable | Existing adapter contracts and detection remain; Architecture sends accepted decisions to selected adapter rules. |
| capability-skill | done | Product additions/quality; Architecture/Delivery manifests, roles, skills, workflows/templates/checks/evals; registry/matrix. |
| cli-config | done | Explicit new-doc --capability, existing default paths and locked-file safety; no schema change. |
| workflow | done | Product → Architecture → Delivery → Core/adapter with return paths and existing-document entry. |
| documentation | done | Research/provenance, SDLC, examples, handoffs, CLI and five official-source host guides. |
| verification | done | Selected install/exposure, template routes, drift/remove/update ownership, scope eval and tarball checks; live-model evaluations separate. |
| release-migration | done | Unreleased notes, module versions and compatibility/migration; no distribution bump. |

## Risks / Trade-offs
Context cost: choose modules/skills by task and summarize with links; no loading every skill body.
A role name is not stakeholder approval. Reusing a legacy technical layout cannot copy known unsafe
patterns. Written NFR targets need evidence/owner confirmation; estimates remain hypotheses.
Host discovery varies by client/version; verify locally with read-only smoke prompt and documented fallback.

## Migration Plan
Commit consumer snapshot, select optional architecture/delivery in project.json, reviewed update dry-run,
update and check. Preserve local.md, host bridges, existing Product docs and old changes. Existing
new-doc calls still target Product. Re-export eval reports after bundle changes. Revert update commit
for rollback. No automatic migration of old delivery-plan documents.

## Open Questions
No consequential unknown blocks implementation. PM-Skills resolves to phuryn/pm-skills; research-only.
Actual host authentication/AI behavior and Windows/Node22 checks require separate external evidence.

## Verification disposition
146 tests passed locally, structure/release metadata and actual offline tarball installs passed.
See verification.md for commands, corrected old registry expectations and limits. New scenarios remain
unscored; authenticated native-host/live-agent, Windows and Node22 runs are separate evidence.
