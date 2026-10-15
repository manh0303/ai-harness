# Start in two minutes

Install in the project root: `npx --yes @manhd_d/notth init --host codex`.
Replace codex with your tool. With pip/global/offline, use your existing CLI instead.
The commands below use `aih`; npx users substitute `npx --yes @manhd_d/notth`.
Choose kiro, codex, claude-code, cursor, copilot, gemini-cli, opencode or windsurf.
In your AI session invoke harness-start if exposed, or ask it to read
`.agents/skills/harness-start/SKILL.md`. Describe the task directly.

## Daily use

- `aih status`: saved task, selected modules, task declarations and recovery guidance.
- `aih changes`: local OpenSpec changes and checked/unchecked task counts.
- Existing change: `aih start --goal change --change <id> --task "Your task"`.
- Existing checkpoint: `aih start --goal resume --change <id> --task "Continue the task"`.
- Stop selecting a task: `aih start --clear` (backup first; evidence/change files survive).
- `aih skills`: discover installed skills; `aih artifacts`: source/output declarations.

Say "continue" only with an actual saved task/handoff; the agent reconciles current state first.
Checks, process execution and tools depend on the selected host. No task count proves completion.
Project context belongs in local.md and existing docs; optional knowledge is source-linked.
For tests that span groups/processes, use installed Core recoverable-verification.md, persist
actual evidence and update docs incrementally. Resume re-runs groups with invalidated evidence.
Installer/check commands never start services, archive changes, merge or publish.
