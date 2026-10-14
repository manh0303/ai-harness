# Codex

## Install and open

1. Install/sign in using the [official quickstart](https://developers.openai.com/codex/quickstart/).
2. Run [common setup](README.md) in your project root.
3. Open that project in the Codex IDE extension, or run `codex` there.

For a connected cloud workspace, commit the Harness snapshot to the branch used by the host.
Cloud execution also needs the project's build tools and authorized repository access.

## Load and verify

Codex discovers root/applicable nested `AGENTS.md` and repository `.agents/skills`.
An `AGENTS.override.md` can take precedence in the same directory; inspect it when instructions differ.
Do not add a duplicate rule file or change global configuration just to start.

Start a new session after installation if needed. Run the [read-only setup prompt](README.md#3-check-loading-then-give-a-task)
and compare its paths/selections with your files. Ask for the needed skill by name or exact path.

## Optional configuration

The host chooses models and actual subagents; Harness role files do not create native agents.
See [Agent configuration](../agent-configuration.md) only when you need custom routing.
Keep existing native settings and permissions; no model subscription or tool access is supplied by Harness.

## Official references

Checked 2026-10-13; no logged-in Codex client or live-agent smoke was run.

- [AGENTS discovery and verification](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Skill discovery](https://learn.chatgpt.com/docs/build-skills)

## Common first-session onboarding

npm and pip/offline use the same `aih init --host codex` bundle and canonical harness-start.
Invoke the native skill when available (Kiro: `/harness-start`), or send:

> Read .agents/skills/harness-start/SKILL.md and follow it for this project. My task: [task].

Reuse saved answers; do not start a second terminal interview. Client-specific imports/discovery above
still apply. [pip/offline prerequisites and updates](../python-installation.md).
