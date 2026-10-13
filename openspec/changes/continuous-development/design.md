# Design and impact assessment

## Baseline, decisions and ownership
See proposal.md for pinned code/tree and PR #40 evidence. Existing instructions are distributed from
Core/capability assets by cli/harness.js; templates/AGENTS.md is the consumer entry. User-approved task
scope governs this implementation, not approval of consumer business requirements. Project records
remain schema 1 and project-owned; no new serialized state or lifecycle enum is introduced.

## Design
Core continuous-development coordinates baseline → impact → spec → implementation → verification →
selective docs → review. Existing skills own their current responsibilities. Six Core skills remain;
Product/Architecture/Delivery stay opt-in. One host can apply the needed perspectives sequentially.
OpenSpec design.md carries current baseline/impact; tasks.md carries continuity; existing project map
and decision log carry durable facts. Changes update touched sections and recheck source revisions.
read-only source proposals are separate artifacts, never mislabeled as canonical publication. Required
blocked checks/publication prevent unconditional completion, while proposal-only work may be delivered.
Legacy artifact/decision/verification enums are preserved and documented; prose phase labels and
BLOCKED/NOT_RUN reasons do not invent parser support. No semantic enforcement is claimed for ready.

## Declaration-to-consumer chain
- core/workflows/continuous-development.md → existing recursive Core bundle → generated AGENTS and
  context/spec-to-code entry → existing Core skills → Core manual checks/evals → user guide/examples.
- Existing Product/Architecture/Delivery manifests/skills/workflows/templates → selected locked bundle
  and exposed .agents skills → scoped handoff → capability checks/evals and matching composition case.
- Existing templates/openspec/design.md and tasks.md → locked templates → newChange substitution;
  old project-owned changes preserved → installation/update and tarball smoke tests.

## Impact matrix
| Area | Status | Evidence / reason |
| --- | --- | --- |
| core | done | Consumer AGENTS/context and continuous workflow; spec/debugging/review skill links; checks/evals |
| adapter | not-applicable | No technology-specific behavior/detection/contract changed; existing adapters reused |
| capability-skill | done | Product 1.5.0 and Architecture/Delivery 1.1.0 existing manifests/skills/templates; no new roles |
| cli-config | done | Existing Markdown templates extended; newChange/bundle behavior tested; no CLI/config/schema mutation |
| workflow | done | Sequential scoped BA/PO/PM/SA/Dev/QA, resume, feedback and separate lifecycle evidence |
| documentation | done | Concise README links, dedicated guide/examples, SDLC/matrix/handoffs and translated README link |
| verification | done | 201 deterministic tests, validate, release metadata and actual package smoke passed; behavioral datasets unscored; see verification.md |
| release-migration | done | CHANGELOG Unreleased, module versions and docs/versioning migration/rollback; distribution stays 0.11.0 |

## Artifact impact
Repository-owned instructions/docs/templates/tests: update or create only touched areas; Git PR is the
reviewable proposal. Existing OpenSpec change created here. Root package/harness distribution versions,
installer/config/decision/evidence schemas, agent preferences, adapter files and release workflows:
unchanged because there is no executable or release contract change. External canonical docs/UI:
unchanged/not applicable, none requested. This Harness checkout has no configured consumer outputs,
so this assessment is canonical; do not invent an artifacts.json registry merely for this task.

## Risks and verification
Long instructions can add context cost; entry tells hosts to load scoped perspectives and skip full
packs for small fixes. Host behavior/source freshness remains a review responsibility, not a CLI
promise. Seven Core cases plus three capability cases and one composition case cover this contract;
deterministic tests assert distribution, preservation, conflict and policy/report structure only.
Windows/Node 22 and independent live-host evaluation require separate CI/runtime evidence.

## Migration and rollback
Use a reviewed source on a consumer branch; update --dry-run, update, check. Existing docs/configs,
OpenSpec changes and user AGENTS text survive; append missing baseline/handoff sections selectively.
Re-export evaluation datasets; revert the consumer snapshot commit to roll back. No npm publication.

## Open questions
None blocking this authorized implementation. Live-host evaluation and human PR review are separate
remaining gates, never fabricated as completed. See verification.md and tasks.md.
