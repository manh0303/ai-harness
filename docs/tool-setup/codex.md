# Codex CLI and IDE

Install/authenticate Codex from [official CLI](https://developers.openai.com/codex/cli/) or
[IDE extension](https://developers.openai.com/codex/ide/), then follow [common setup](README.md).
Launch `codex` or open the IDE at the initialized repository root.

## Instructions and skills
Codex reads AGENTS.md through its project hierarchy and can prefer AGENTS.override.md. Inspect
applicable global/nested overrides when behavior differs; do not overwrite user defaults.
Harness exposes declared skills in .agents/skills, the documented repository skill path. Start a new
session after setup/update if needed; ask for one installed skill by name or canonical path.
Markdown role contracts in .harness/core/agents and selected capabilities are read by the host;
they are not automatically installed as native Codex subagents. .harness/local.md remains project context.

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
- [AGENTS discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Skill discovery](https://learn.chatgpt.com/docs/build-skills)
