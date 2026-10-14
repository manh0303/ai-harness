# Design and impact

Base: main e83a70da108c662479da7efd8df545274c2a1f8f, including session-onboarding PR 51.
Source: user-provided setup feedback and authorization to implement the reviewed remainder.

## Boundaries and decisions
Keep setup read-only for existing callers; --apply is explicit missing-only scaffolding, not another
installer. Validate locked payload, selection, existing configs and the complete candidate config
before transactional writes. Use snapshot-owned seeds; no managed payload/lock replacement, fabricated
machine paths/task/cache or recovery of lost custom answers. Ordinary errors roll back, crash safety
remains the existing per-file transaction limitation. Tool access and semantic interview stay in host.

Shared decisions are optional independent schema 1, distinct from existing per-change schema. Each
record has scope/status and evidence-backed answer/reason/source when confirmed. Superseded records
link same-scope confirmed replacements, allowing chains but not cycles. A legacy do_not_ask_again
flag is advisory. Read-only decisions exports project plus exact requested module; inheritance and
conflict resolution are explicit host responsibilities. No recorded value authorizes an action.

Include decisions in config archives and context hashes, exclude on transfer. Legacy archives without
it remain readable; older CLIs reject newly included paths. Same-project restore validates the whole
effective config. Compact start avoids semantic discovery/terminal intake, reports freshness unchecked.
New workflows use relevant minimum context, save partial answers and label facts/inferences/choices.

## Feedback disposition
REQ-01/02/03/05/07/08/09 and related freshness/role/skill/MCP parts already have foundations in PR 51.
REQ-04 uses existing lock-based AGENTS integrity with optional legacy-context diagnostics; no mandatory
Maven/settings convention. REQ-06 uses existing new-change/change-sidecars, not upstream CLI patching.
REQ-10 preservation stays a required check; supported custom config bytes survive update, unknown schema
fields are not guessed. REQ-11/12 add existing/new-project host workflows. REQ-13 adds shared decisions.
REQ-14 detection remains existing explicit init --detect with metadata evidence; no silent selection change.
REQ-15 adds explicit setup --apply while preserving init convenience and read-only setup compatibility.

Do not adopt automatic arbitrary AGENTS.harness.md loading, portable symlinks, a generic cross-host hook
runtime, separate execution.json, user hashes in the managed lock, self-assigned confidence or unmeasured
time/token claims. They add unsupported assumptions or redundant state. Current Kiro bridge remains
version/surface-scoped; expanding hosts needs separate host-specific implementation/live evidence.

## Impact matrix
| Area | Status | Evidence / reason |
| --- | --- | --- |
| core | done | context/clarification/project-setup, seed/greenfield workflows, template entry point and behavioral cases |
| adapter | not-applicable | No stack asset, detection, module metadata or convention defaults change |
| capability-skill | done | Existing core harness-start connects missing-only setup, decisions and the two workflows; skill ID unchanged |
| cli-config | done | setup/project-decisions modules, main/start/environment/knowledge/portable-config/harness validation; tests cover writes and compatibility |
| workflow | done | Clone, partial resume, module-scoped decisions, source reconsideration and task-depth handoffs |
| documentation | done | CLI, session, Kiro, architecture, backup and migration contracts; README quick start stays unchanged |
| verification | done | New behavior tests and real tarball smoke; logs/results in verification.md; live host/model/usage remains NOT_RUN |
| release-migration | done | Unreleased changelog/migration; distribution remains release-PR owned; old snapshots/archives stay readable |

## Declaration-to-consumer chain
decisions template → missing-only init/update/setup → project-owned decisions.json → setup/start/doctor
and harness-start/clarification → host scope/source reconciliation → tests/unscored eval → session guide.
Core workflows → bundle → canonical skill/template AGENTS paths → proportional host discovery/interview
→ partial configs/seed → package smoke plus explicit real-host protocol. No new skill registry or runner.
