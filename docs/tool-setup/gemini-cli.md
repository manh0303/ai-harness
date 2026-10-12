# Gemini CLI

Install/authenticate from [official docs](https://geminicli.com/docs/), follow [common setup](README.md)
and launch `gemini` at the initialized root.

## Instructions and skills
Gemini uses GEMINI.md by default. Merge an import into the existing root GEMINI.md if needed:
```markdown
@./AGENTS.md
```
Alternatively, merge `context.fileName` in the existing project settings.json so the list includes
AGENTS.md while preserving other configured context names. Do not replace the entire settings file
or use both routes to inflate context unnecessarily. `/memory show` checks loaded content and
`/memory reload` refreshes it according to current official docs.
Gemini documents .agents/skills as a workspace alias. Avoid duplicating the same skills in
.gemini/skills; check current discovery and ask for the installed skill needed by the task.

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
- [Context/imports/settings](https://geminicli.com/docs/cli/gemini-md/)
- [Workspace skill aliases](https://geminicli.com/docs/cli/skills/)
