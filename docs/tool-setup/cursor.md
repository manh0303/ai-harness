# Cursor

Install/sign in via [official Cursor docs](https://cursor.com/docs). Open the repository folder and
Agent, then follow [common setup](README.md).

## Instructions and skills
Cursor supports project/nested AGENTS.md and .agents/skills. Preserve existing .cursor/rules and
check their scope with project conventions before adding another rule. Ask Agent to read applicable
AGENTS/local.md and use one installed skill; inspect discovery in the current client.
If a specific workspace needs an explicit rule pointer, create a project-owned .cursor/rules/harness.mdc:
```markdown
---
description: Use the installed AI Harness for this repository.
alwaysApply: true
---
Read the applicable AGENTS.md and its referenced project context before changing code.
Load only the installed skill needed for the task from .agents/skills.
```
Do not copy the full Harness snapshot into the rule. AGENTS already supplies the canonical entry;
use this bridge only if needed, avoiding contradictory project/global/nested instructions.

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
- [Rules and AGENTS](https://cursor.com/docs/rules)
- [Skills and .agents discovery](https://cursor.com/docs/skills)
