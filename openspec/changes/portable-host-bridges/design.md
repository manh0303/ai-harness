# Design and impact

Base: c2a79e1682aa8c92b7f14ede1ee0fdbbf192d9c4. User requested portable Notth setup across tools,
using uploaded reference folders as evidence, not as public distribution payload.

## Decisions
Keep --host as one selected tool per command; reject comma lists. Fresh installs generate only
the selected tool bridge.
Retain unknown safe host IDs for custom plans; no implicit all-host selection. Fresh installs seed the selected host model defaults; never rewrite existing agents.json. Previously locked bridges
persist without repeating flags. Claude selection is explicit opt-in to its import/wrappers.
Kiro's current hook is an agent prompt using relative paths, so no new root-detection shell is needed.
Cursor/Windsurf already read AGENTS.md; duplicate bridge rules add no needed behavior.

Copilot/Gemini use the existing standard managed block/merge/payload machinery. Surrounding text
is project-owned. All writes share preflight/drift/transaction/rollback. Native settings and custom
skills/commands remain untouched. No start.json reset template: absence is the existing empty state,
while the schema requires a real task. No registry/schema/version bump: bridges are CLI-owned paths.

## Impact matrix

| Area | Status | Evidence / reason |
| --- | --- | --- |
| core | not-applicable | Core workflow/policy/entry semantics unchanged; only host entry bridges added |
| adapter | not-applicable | Stack registry/manifests and module contracts unchanged |
| capability-skill | not-applicable | No new or changed skill/capability; wrappers point at existing canonical skills |
| cli-config | done | cli/harness.js, files.js, host-bridges.js, main.js; managed blocks and retained bridges |
| workflow | not-applicable | Existing harness-start workflow reused; no stages/gates or runtime added |
| documentation | done | tool-portability, eight host guides/index, README, CLI, architecture, translations, SETUP |
| verification | done | npm test: 294/294; validate/package/release metadata/offline Python smoke PASS; live-host protocol remains NOT_RUN |
| release-migration | done | CHANGELOG Unreleased; versioning documents new lock paths and rollback; release-owned version unchanged |

## Declaration-to-consumer chain
CLI host selection → package cli/*.js + templates allowlist → installed managed entry/skill wrapper →
AGENTS/canonical skill read → lock/drift/behavioral tests + packaged install → tool-portability/host guides.
Native discovery/LLM instruction compliance needs host-session evidence, not just installer tests.

## Compatibility
Plain init unchanged. --host claude-code now installs native bridges; old flags work individually.
Previous snapshots update with no lock schema migration. Older CLIs reject new Copilot/Gemini lock
paths; use reviewed supporting CLI or revert snapshot/lock together. Edited owned content and
native skill collisions fail before writes; no force-overwrite/migration of user skills.
