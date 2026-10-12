# GitHub Copilot IDE and CLI

Install/sign in with [official Copilot docs](https://docs.github.com/en/copilot). In the IDE, open
the project and use the supported Agent mode; for CLI start the authenticated `copilot` client at
the root. Apply [common setup](README.md).

## Instructions
Support for AGENTS and skills varies between IDE/CLI/cloud features. Preserve existing settings.
For a repository-wide IDE bridge, merge into .github/copilot-instructions.md:
```markdown
Before implementation, read the applicable root/nested AGENTS.md and .harness/local.md.
Follow the installed Core/selected capability workflows and only the relevant skill in .agents/skills.
Report exact source paths, owner decisions and actual verification; do not infer test results.
```
This asks the agent to read files, not an automatic content import. Verify with the smoke prompt.
Copilot CLI documents .agents/skills as a project skill directory; `/skills reload` and
`/skills info <name>` can verify discovery there. IDE support must be checked for that specific client;
use the canonical manual path when automatic discovery is unavailable.

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
- [IDE repository instructions](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/configure-custom-instructions/add-repository-instructions-in-your-ide)
- [CLI skills](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)

## Agent routing

Read [Agent preferences](../agent-configuration.md). Verify current model picker/account and effort
controls; aih setup --host copilot returns declarations only. Native per-role model switching or
concurrency requires specific client support; otherwise perform roles sequentially with the selected
session model. Never substitute premium or overwrite existing host settings automatically.
