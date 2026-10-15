# OpenCode

Run `aih init --host opencode` in the project root (existing snapshot: `aih update --host opencode`).
See [common setup](README.md); for tool selection/migration use [shared setup](../tool-portability.md).

OpenCode reads `AGENTS.md` and discovers `.agents/skills/<name>/SKILL.md` natively.
No `.opencode/skills` copy or new opencode.json is needed for Harness.
Preserve native commands/settings, including existing OpenSpec commands. Duplicate skill names
across `.opencode`, `.claude` and `.agents` require comparison before consolidation.

Start a new session and ask it to read `.agents/skills/harness-start/SKILL.md`.
Use the [loading check](README.md#3-start-the-first-session); verify actual skill availability/permissions.

## Official references

Checked 2026-10-15; no logged-in client or live-agent smoke was run:

- [Rules and precedence](https://opencode.ai/docs/rules/)
- [Skill discovery](https://opencode.ai/docs/skills/)
