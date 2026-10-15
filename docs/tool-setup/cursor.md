# Cursor

## Install and open

1. Install/sign in using [official Cursor docs](https://cursor.com/docs).
2. Open your project folder in Cursor; use its integrated terminal for [common setup](README.md).
3. Start an Agent chat in that same workspace.

## Load and verify

Cursor supports root/nested `AGENTS.md` and project `.agents/skills`; no extra rule is needed for normal setup.
Preserve existing `.cursor/rules` and inspect their scope if instructions conflict.

Open **Customize → Skills** to inspect discovered skills, then run the
[read-only setup prompt](README.md#3-start-the-first-session). If an installed skill is missing,
reload the session or ask Agent to read its exact canonical file.

## Optional configuration

Model/account choices and native delegation remain host-controlled; see [Agent configuration](../agent-configuration.md).
For cloud work, commit the installed project files to the connected branch. Do not assume personal skills,
local files or credentials are available remotely; see the official skill guide's cloud limitations.

## Official references

Checked 2026-10-13; no logged-in Cursor client or live-agent smoke was run.

- [Rules and AGENTS](https://cursor.com/docs/rules)
- [Skills, discovery and cloud scope](https://cursor.com/docs/skills)

## Common first-session onboarding

npm and pip/offline use the same `aih init --host cursor` bundle and canonical harness-start.
Invoke the native skill when available (Kiro: `/harness-start`), or send:

> Read .agents/skills/harness-start/SKILL.md and follow it for this project. My task: [task].

Reuse saved answers; do not start a second terminal interview. Client-specific imports/discovery above
still apply. [pip/offline prerequisites and updates](../python-installation.md).
