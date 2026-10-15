# Reusable design and impact

Base: 854e19e, following portable-host-bridges (base main c2a79e1682aa8c92b7f14ede1ee0fdbbf192d9c4).

## Decisions
Core owns source-linked optional knowledge and host-neutral recoverable execution contracts.
Product retains TechSpec ownership and advances to 1.8.0. Adapters provide only their actual stack
commands/conventions; native bridges provide discovery, not a workflow runtime. Unknown host
capability is BLOCKED with explicit file-reading fallback, not a fabricated Kiro tool.

status/changes are bounded read-only metadata, ignore archive/fenced task examples, and never infer
approval/completion from boxes. start binds change_id to an existing proposal for goal=change; resume
still validates an existing checkpoint/evidence. Optional schema-1 field semantics are additive but
old CLIs reject the new goal/id combination. Clear backs up config then deletes only saved intake;
no task-state database, process stop, archive or silent JSON migration is added.

Command args may use ${files.<id>}: machine override then project declaration, followed by environment
expansion. Reader reports status/missing references only; no values, execution, recursive file expansion
or settings reads. Hosts apply the same resolution procedure before authorized execution.

Knowledge uses existing canonical docs/index when possible. An installed template is optional and
contains no project facts. Seed local sources and artifacts/integrations remain authoritative; no
second source registry or mandatory domain tree. Grouped verification uses existing checkpoint,
verification reports, evidence hashes and source-write policy. Prior PASS is retained only for a valid
baseline; unknown side effects, stale groups/process identity require reconciliation.

## Impact matrix

| Area | Status | Paths / evidence |
| --- | --- | --- |
| core | done | project-knowledge/recoverable-verification workflows; seed/adaptive/solution-framing/AGENTS/test-engineer/verification/start links; checks and two unscored eval cases |
| adapter | not-applicable | No stack command/convention/manifest change; all stacks reuse Core; no default topology |
| capability-skill | done | Existing Product TechSpec workflow/template/skill/check expanded; version 1.8.0; no new skill registry |
| cli-config | done | status.js, main.js, start/config, environment; templates and existing package allowlist; project-owned state preserved |
| workflow | done | Entry links from onboarding/verification and Product; process/evidence ownership and recovery/related flow handoff explicit |
| documentation | done | reusable-workflows, start, CLI, configuration, architecture/versioning, README/index and packaged quickstart |
| verification | done | npm test 304/304; validate, package smoke, check:release and offline Python smoke PASS; diff reviewed; live host cases NOT_RUN |
| release-migration | done | CHANGELOG, Product version, versioning/rollback; no distribution bump or publish |

## Declaration → distribution → discovery → use → review → docs
CLI/templates/Core/Product assets use existing package allowlist → installed locked paths →
AGENTS and existing skills/roles/workflows → host-selected project checks → manual checklist/evals
and deterministic tests/package smoke → reusable-workflows and tool setup. No locked file is hand-edited.

## Limitations
No runtime/process restart/quota/MCP grant or verified model compliance. Knowledge docs are project-owned
and excluded from config-only backups; Git/source system backs them up. User decides scope/authority;
reference-document estimated effort is not adopted as measured data.
