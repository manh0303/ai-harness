# Gemini CLI

## Install and open

1. Install/sign in using [official Gemini CLI docs](https://geminicli.com/docs/).
2. Run `init --host gemini-cli` with a supporting reviewed CLI (see [common setup](README.md)).
   It adds a managed `@./AGENTS.md` import to root `GEMINI.md`, preserving other text.
3. For older CLIs, manually add the following line outside code fences to root `GEMINI.md`.
   Create it if absent; preserve its other content:

```markdown
@./AGENTS.md
```

4. Run `gemini` from that project root.

## Load and verify

Gemini uses `GEMINI.md` by default. Inside its chat, run `/memory reload`, then `/memory show`
to check imported instructions. It also discovers workspace `.agents/skills` as a native alias:
use `/skills reload` and `/skills list` to inspect them.

Run the [read-only setup prompt](README.md#3-start-the-first-session).
Do not duplicate skills into `.gemini/skills` or replace existing settings.

## Optional configuration

Instead of the import, an existing `context.fileName` setting can include `AGENTS.md`.
Choose one route and preserve other context names.
Model/provider choices remain native to Gemini; see [Agent configuration](../agent-configuration.md).
Harness does not supply credentials or create native subagents.

## Official references

Checked 2026-10-13; no logged-in Gemini client or live-agent smoke was run.

- [Context files, imports and memory checks](https://geminicli.com/docs/cli/gemini-md/)
- [Skill aliases and loading checks](https://geminicli.com/docs/cli/skills/)

## Common first-session onboarding

npm and pip/offline use the same `aih init --host gemini-cli` bundle and canonical harness-start.
Invoke the native skill when available (Kiro: `/harness-start`), or send:

> Read .agents/skills/harness-start/SKILL.md and follow it for this project. My task: [task].

Reuse saved answers; do not start a second terminal interview. Client-specific imports/discovery above
still apply. [pip/offline prerequisites and updates](../python-installation.md).
