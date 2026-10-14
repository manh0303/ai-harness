# Claude Code

## Install and open

1. Install/sign in using [official Claude Code setup](https://code.claude.com/docs/en/setup).
2. Run [common setup](README.md) in your project root.
3. Run `claude` from that same root.

## Load and verify

Direct `AGENTS.md` support requires Claude Code v2.1.277+ and the relevant instruction setting/plugin.
By default, an existing `CLAUDE.md`, `.claude/CLAUDE.md` or `CLAUDE.local.md` in the working directory
or its ancestors can prevent direct loading.

For a compatibility bridge, add this line outside code fences to the root `CLAUDE.md`; create it
if absent and keep existing content:

```markdown
@AGENTS.md
```

An import inside `.claude/CLAUDE.md` uses `@../AGENTS.md` instead.
In Claude's chat, use `/context` to inspect loaded memory files, then run the
[read-only setup prompt](README.md#3-check-loading-then-give-a-task).
Organization policies may restrict loading; an import does not bypass them.

## Skills

Claude's native project skills live in `.claude/skills`, not Harness's `.agents/skills`.
The basic setup works by asking Claude to read the needed canonical skill.
For native slash invocation, use a small pointer wrapper rather than copying the skill body.

The agent-first CLI adds opt-in `init/update --link-claude` for a managed import and
`--claude-skills` for wrappers. These flags are unreleased from the 0.12.0 npm baseline:
use them only with a reviewed source/new release that supports them. Without either flag,
Harness does not edit Claude files. See [Agent-first guide](../agent-first.md).

## Optional configuration

Use [Agent configuration](../agent-configuration.md) only when needed; keep existing settings.
Models, native agents and access remain Claude-controlled, not selected automatically by a role.

## Official references

Checked 2026-10-13; no logged-in Claude client or live-agent smoke was run.

- [Memory, AGENTS conditions and imports](https://code.claude.com/docs/en/memory)
- [Native skills](https://code.claude.com/docs/en/skills)
- [Models](https://code.claude.com/docs/en/model-config)

## Common first-session onboarding

npm and pip/offline use the same `aih init --host claude-code` bundle and canonical harness-start.
Invoke the native skill when available (Kiro: `/harness-start`), or send:

> Read .agents/skills/harness-start/SKILL.md and follow it for this project. My task: [task].

Reuse saved answers; do not start a second terminal interview. Client-specific imports/discovery above
still apply. [pip/offline prerequisites and updates](../python-installation.md).
