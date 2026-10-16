# Design and impact

Baseline: 11d662c9064cc989373e36b8c546cfb323a9b023. JSON remains the default; presentation is explicit.
No persisted schema change. New fields derive from existing task/checkpoint declarations; unknown
remote state is never promoted to completion. Compact orientation reads local declarations but still
skips knowledge source scan/MCP. Quick/Standard/Full are host guidelines, not new machine runtimes.
UIUX adds a registered workflow and bumps its module contract; canonical Figma skills remain.
Knowledge already exposes changed_sources, so reuse it rather than introduce a second cache.
Release metadata stays Release Please-owned; historical notes are retained rather than guessed.

| Area | Status | Evidence/reason |
| --- | --- | --- |
| core | done | task-experience, AGENTS entry, onboarding/context and behavioral cases |
| adapter | not-applicable | No stack conventions, detection or adapter manifest changed |
| capability-skill | done | UIUX 1.1.0 manifest → design-delivery → existing skills/checks/evals |
| cli-config | done | presentation/main/start/status; additive fields, no stored schema change |
| workflow | done | Shared depth/context/approval/handoff referenced from entry workflows |
| documentation | done | simple-use, CLI/versioning, quickstart, host guides and four README languages |
| verification | done | evidence.md: 311 tests, validate, npm/pip smoke; live trials separately NOT_RUN |
| release-migration | done | CHANGELOG, versioning; distribution version unchanged, legacy IDs retained |

## Compatibility and rollback
Use the supporting CLI before using new flags; default JSON and bare start are unchanged. Update
consumer on a branch, inspect dry-run and check; preserve user-owned files and native configuration.
Revert installation commit together with its matching CLI to roll back. No force overwrite.
