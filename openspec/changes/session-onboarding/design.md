# Design and impact

Base: manh0303/ai-harness main 9f190806cfa4580c20604395706a185151357808.
Source: user-provided Kiro setup feedback and request to begin the first session with /harness-start.
Reviewed official Kiro skills/hooks references on 2026-10-14; live client unavailable.

## Decisions
Keep AI understanding and questions in the host. CLI performs bounded deterministic checks, local config writes,
and hash records only. --host kiro selects locked wrappers/hook, retained by later updates. Existing native custom
files survive; collisions and managed edits abort before writes. Current hook schema requires IDE 1.x / CLI V3.

Keep schema-1 project/lock/config compatibility and legacy free text. Structured local frontmatter uses an explicitly
bounded YAML/JSON subset. Knowledge hashes live outside the installer lock, follow build/convention/source changes
and shared context, and omit machine data. Host source inspection must precede record; hash equality is not truth.

Skills declare optional requires, catalogs expose metadata and doctor checks local prerequisites. Actual MCP access
is always unverified by config inspection. Role extensions supply explicit canonical-first loading order without an
agent runtime. Missing extensions block that role; transfer removes repo-specific extension paths.

aih new-change already creates decision/evidence/impact sidecars. External propose flows now use change-sidecars,
creating missing templates only. No upstream CLI behavior is claimed. MCP config import copies enabled names only,
preserves existing scope/permissions and does not infer tools from autoApprove.

## Impact matrix

| Area | Status | Evidence / reason |
| --- | --- | --- |
| core | done | templates/AGENTS.md, context rule, project-setup/agent-routing/spec workflow and unscored Core scenario |
| adapter | not-applicable | No adapter manifest, convention, assets or stack detection contract changes |
| capability-skill | done | New Core harness-start, canonical catalog requires metadata, full skill-matrix coverage |
| cli-config | done | kiro/knowledge/structured/requirements/sync modules, main/install validation and sidecar helper; transactional writes/conflicts tested |
| workflow | done | In-session intake, seed reconciliation and extension/prerequisite handoffs connected to existing workflows |
| documentation | done | README languages, getting-started/start/Kiro/contracts/CLI/config/architecture/backup docs |
| verification | done | New behavior tests, full suite, validate, real tarball/global/local smoke, release check; live model/client explicitly NOT_RUN |
| release-migration | done | Unreleased changelog + versioning/Kiro upgrade/offline/rollback notes; distribution version unchanged for Release Please |

## Link chain
Core skill -> bundle .harness/core + .agents/skills -> native .kiro/skills wrapper -> /harness-start -> project/setup
and source reconciliation -> doctor/seed/check -> Kiro guide. Role config -> agentPlan.contract_load_order -> routing
workflow -> source/missing-file tests. requires -> skill catalog -> doctor -> host MCP checks. Source hash -> seed --check
-> relevant host inspection -> seed --record -> source drift tests. External propose -> change-sidecars -> readiness.

## Limitations
Live Kiro skill menu/SessionStart, semantic behavior, upstream OpenSpec validation and token savings were not measured.
Remote revisions and module-specific instruction applicability still require host inspection. Hashes are not signatures.
