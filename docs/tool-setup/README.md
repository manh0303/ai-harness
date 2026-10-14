# Set up AI Harness in your AI tool

Harness installs project instructions; it does not install an IDE, start an AI model or connect accounts.
You need Node.js 22+, your chosen AI tool and a project folder. pip additionally needs Python 3.9+;
see [pip/offline setup](../python-installation.md). npm and pip use the same onboarding.

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
| **Kiro** | [IDE / CLI](https://kiro.dev/docs/getting-started/installation/) | `init --host kiro`; first session `/harness-start`, managed wrappers + SessionStart | [Setup](kiro.md) |

Existing instructions/settings remain yours. Do not replace host configs or copy the whole Harness into
them. Host/version/account capabilities vary; these guides are not live-client compatibility results.

## 3. Start the first session

Invoke **harness-start** if your client discovers the installed skill, or send this same prompt:

> Read .agents/skills/harness-start/SKILL.md and follow it for this project. My task: [task].

Kiro exposes `/harness-start`. Other clients have native discovery/import differences in the guides;
reading the canonical skill is the common fallback. It asks only missing consequential questions and
saves answers incrementally. `aih start --compact --host <host>` returns read-only orientation; use
`start`/host_prompt if terminal intake is preferred. Reuse the existing npm, pip or offline CLI.

For a loading-only check, ask the host to report selected adapters/capabilities and one exact relevant
installed skill path without executing anything; compare with project.json and actual files. Client
claims are not live compatibility evidence. `check` verifies the snapshot, not model behavior.

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
