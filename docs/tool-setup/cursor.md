# Cursor

## Install and open

1. Install/sign in using [official Cursor docs](https://cursor.com/docs).
2. Open your project folder in Cursor; use its integrated terminal for [common setup](README.md).
3. Start an Agent chat in that same workspace.

## Load and verify

Cursor supports root/nested `AGENTS.md` and project `.agents/skills`; no extra rule is needed for normal setup.
Preserve existing `.cursor/rules` and inspect their scope if instructions conflict.

Open **Customize → Skills** to inspect discovered skills, then run the
[read-only setup prompt](README.md#3-check-loading-then-give-a-task). If an installed skill is missing,
reload the session or ask Agent to read its exact canonical file.

## Optional configuration

Model/account choices and native delegation remain host-controlled; see [Agent configuration](../agent-configuration.md).
For cloud work, commit the installed project files to the connected branch. Do not assume personal skills,
local files or credentials are available remotely; see the official skill guide's cloud limitations.

## Official references

Checked 2026-10-13; no logged-in Cursor client or live-agent smoke was run.

- [Rules and AGENTS](https://cursor.com/docs/rules)
- [Skills, discovery and cloud scope](https://cursor.com/docs/skills)
