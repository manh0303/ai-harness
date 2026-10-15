# Windsurf / Cascade

Run `aih init --host windsurf` in the project root (existing snapshot: `aih update --host windsurf`).
See [common setup](README.md); for tool selection/migration use [shared setup](../tool-portability.md).

Cascade supports root/scoped `AGENTS.md`. Notth does not create a duplicate .windsurfrules or
native rules file. Existing workspace rules/settings remain project-owned. The official Windsurf
documentation currently redirects to Devin Desktop documentation; check your installed client/version.

Start a new session and ask it to read `.agents/skills/harness-start/SKILL.md`.
This explicit read is the fallback; Notth does not assert native skill discovery for this host.
Use the [loading check](README.md#3-start-the-first-session) and compare with actual project files.

## Official references

Checked 2026-10-15; no logged-in client or live-agent smoke was run:

- [AGENTS.md and scope](https://docs.windsurf.com/windsurf/cascade/agents-md)
