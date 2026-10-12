# Claude Code

Install/authenticate with [official setup](https://code.claude.com/docs/en/setup), then follow
[common setup](README.md) and launch `claude` at the repository root.

## Instructions
Current Claude documentation describes direct AGENTS.md support with version/configuration conditions.
If direct discovery is unavailable, add the following import to an existing project CLAUDE.md, or
create the file if absent, without discarding any other content:
```markdown
@AGENTS.md
```
Check the host's loaded project instructions and nested/global files. Keep one canonical AGENTS;
do not add a hook that prints a duplicate copy. The import remains a documented compatibility option.

## Skills
Claude documents .claude/skills for project skills. Harness does not assume .agents/skills is a native
Claude skill location. Manual canonical loading from AGENTS instructions works without slash registration.
If you want native invocation for a selected skill, create a small project-owned wrapper at
.claude/skills/harness-product-mvp-definition/SKILL.md:
```markdown
---
name: harness-product-mvp-definition
description: Define an MVP using this project's installed AI Harness instructions.
---
Read the applicable AGENTS.md and then the canonical project file
.agents/skills/harness-product-mvp-definition/SKILL.md. Follow its procedure and handoff;
keep actual owner decisions and verification status explicit.
```
Then use `/harness-product-mvp-definition` in a supporting session. This wrapper is a pointer,
not a copied skill body; maintain only needed wrappers and preserve existing native skills.

## Verify and use
Run the [read-only smoke prompt](README.md) before an implementation task. Check actual paths and
known decisions, then use the idea/document/SA/maintain prompts on that page. If discovery is missing,
ask to read the exact installed `.agents/skills/harness-*/SKILL.md` relevant to the task; do not paste
all skill bodies. Application commands come from local.md/environment.json and actual build files.
Follow host permission settings; no instruction creates missing account, network or tool access.

## Update / troubleshooting
Use the common reviewed CLI/snapshot update procedure. Preserve existing project/global host config,
review nested instructions and restart/reload the host when discovery changes. A Harness integrity
check is separate from host discovery, app build or behavioral compliance. Native client login/setup
was not exercised here; official references below establish the documented discovery mechanism.

## Official references (checked 2026-10-12)
- [Memory, AGENTS and imports](https://code.claude.com/docs/en/memory)
- [Project skills and invocation](https://code.claude.com/docs/en/skills)

## Native model configuration
Use [Agent preferences](../agent-configuration.md) with an explicitly available Anthropic model or
reviewed host mapping. OpenAI Sol/Astra preferences cannot run directly in Claude Code. Native model
selection follows [official model config](https://code.claude.com/docs/en/model-config); use /model and
client-supported effort controls, preserving existing settings/authentication. Native per-role agents
use [official subagent format](https://code.claude.com/docs/en/sub-agents) in .claude/agents with model
and supported effort settings. Role contracts can be referenced by a short instruction. aih does not
write these files, infer account access or equate native Claude reasoning with OpenAI reasoning.
