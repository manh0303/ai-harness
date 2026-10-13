# Set up AI Harness in your AI tool

Harness installs project instructions; it does not install an IDE, start an AI model or connect accounts.
You need Node.js 22+, your chosen AI tool and a project folder.

## 1. Install Harness in your project

Open a terminal in the **project root** (the folder you open in your IDE), not in the ai-harness source repo:

```bash
npx --yes @manhd_d/ai-harness init
npx --yes @manhd_d/ai-harness check
```

For a new app, create its repository/folder first. Core works with any stack.
Use `init --detect` instead of `init` to select supported stacks, or choose optional adapters/capabilities
in [Getting started](../getting-started.md). For an existing Harness installation, use the update steps below.

`npx` does not install a global `aih` command. Optional: run
`npm install -g @manhd_d/ai-harness`, then use `aih` instead of `npx --yes @manhd_d/ai-harness`.

## 2. Open your AI tool

Install/sign in through its official guide, open this same project and follow the matching Harness guide:

| AI tool | Install the tool | Load Harness | Guide |
| --- | --- | --- | --- |
| **Codex** | [CLI / IDE](https://developers.openai.com/codex/quickstart/) | `AGENTS.md`; native `.agents/skills` | [Setup](codex.md) |
| **Claude Code** | [Install](https://code.claude.com/docs/en/setup) | `AGENTS.md` when enabled/not shadowed; otherwise a `CLAUDE.md` import | [Setup](claude-code.md) |
| **Cursor** | [Install](https://cursor.com/docs) | `AGENTS.md`; native `.agents/skills` | [Setup](cursor.md) |
| **GitHub Copilot** | [Install](https://docs.github.com/en/copilot) | Client-specific instructions; CLI native `.agents/skills` | [Setup](copilot.md) |
| **Gemini CLI** | [Install](https://geminicli.com/docs/) | `GEMINI.md` import; native `.agents/skills` alias | [Setup](gemini-cli.md) |
| **Kiro** | [IDE / CLI](https://kiro.dev/docs/getting-started/installation/) | `AGENTS.md`; read canonical skills explicitly or use optional native pointers | [Setup](kiro.md) |

Existing instructions/settings remain yours. Do not replace host configs or copy the whole Harness into
them. Host/version/account capabilities vary; these guides are not live-client compatibility results.

## 3. Check loading, then give a task

Send this **read-only prompt** in the AI chat:

> Read AGENTS.md and .harness/local.md. Do not change files or run commands.
> State the selected adapters/capabilities from .harness/project.json, the project's known decisions,
> and one relevant installed skill with its exact path. Report anything you cannot read.

Compare the answer with the actual files; a model's assertion alone does not prove loading.
If skills are not discovered, ask it to read the needed `.agents/skills/<installed-name>/SKILL.md`.
The tool guides show additional native loading checks. `check` verifies Harness files, not AI behavior.

Then give your normal task:

> Read AGENTS.md. Inspect the project and approved decisions. Implement [task], run appropriate
> project tests and maintain affected specs/docs. Report actual results and anything blocked.

You do not need to configure models, native subagents or MCP to begin. Harness role files are contracts,
not automatically created native agents. See [Agent configuration](../agent-configuration.md) when needed.

## Existing installs and updates

Commit your current project state on a branch. Review and apply the new snapshot:

```bash
npx --yes @manhd_d/ai-harness@latest update --dry-run
npx --yes @manhd_d/ai-harness@latest update
npx --yes @manhd_d/ai-harness@latest check
```

Review the diff, run project tests and restart/reload your AI session if needed. With a global install,
upgrade the CLI first. Keep project context in `.harness/local.md`; do not edit managed skills.

For cloud work, the connected workspace must contain the installed project files and application tools;
commit the snapshot to the working branch when the host obtains code from Git. Local-only files,
credentials and MCP access are not automatically available remotely. Configure authorized connections
through the host, then record source/output policies in [Artifact contracts](../artifact-contract.md).

Official discovery references checked 2026-10-13; native login, cloud access and live-agent behavior
were not tested here.
