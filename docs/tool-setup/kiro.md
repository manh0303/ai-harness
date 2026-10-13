# Kiro

## Install and open

1. Install/sign in using [official Kiro installation](https://kiro.dev/docs/getting-started/installation/).
   Choose the IDE or CLI for your environment.
2. Run [common setup](README.md) in your project root.
3. Open that folder in Kiro IDE and start a chat, or run `kiro-cli chat` from the same root.

## Load and verify

Kiro documents automatic root/nested `AGENTS.md` loading. Keep existing `.kiro/steering` files;
you do not need to generate another full set of steering docs just to use Harness.

Run the [read-only setup prompt](README.md#3-check-loading-then-give-a-task).
Ask Kiro to read the needed `.agents/skills/<installed-name>/SKILL.md` explicitly.
The official native skill path is `.kiro/skills`; this guide does not assume native discovery of
Harness's `.agents/skills`.

## Optional native skill pointer

For slash invocation, create a project-owned file
`.kiro/skills/harness-review/SKILL.md` without replacing existing files:

```markdown
---
name: harness-review
description: Review this project's changes against its installed Harness instructions.
---
Read AGENTS.md and .harness/local.md, then read and follow
.agents/skills/harness-review/SKILL.md.
Report findings, missing evidence and actual verification without changing files.
```

In Kiro IDE, inspect **Agent Steering & Skills** and the `/` skill menu.
Verify the pointer actually loads the canonical skill in your session.
Custom agents require explicit steering/skill resources; follow the official docs for your client.
The pointer is yours to maintain; Harness does not generate, update or drift-check Kiro files.

## Optional cloud/spec work

For Kiro Web, commit the Harness files to its connected branch; verify workspace/tool access.
Local steering, credentials and MCP connections are not automatically available in the cloud.
When using Kiro Specs, declare which documents are canonical and their write scope in
[Artifact contracts](../artifact-contract.md); do not silently create a competing source of truth.

Models and permissions remain Kiro-controlled; see [Agent configuration](../agent-configuration.md).

## Official references

Checked 2026-10-13; no logged-in Kiro IDE/CLI/Web or live-agent smoke was run.

- [CLI setup and commands](https://kiro.dev/docs/cli/setup/)
- [Steering, AGENTS and custom-agent scope](https://kiro.dev/docs/steering/)
- [Skills, native locations and resources](https://kiro.dev/docs/skills/)
