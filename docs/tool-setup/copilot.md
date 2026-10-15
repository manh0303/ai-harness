# GitHub Copilot

## Install and open

1. Install/sign in using [official Copilot docs](https://docs.github.com/en/copilot).
2. Run [common setup](README.md) in your project root.
3. Open the project in your IDE's supported Agent mode, or launch `copilot` from that root.

## Load instructions

Use `init --host copilot` (existing install: `update --host copilot`) with a supporting
reviewed CLI. It appends a managed block to `.github/copilot-instructions.md`, preserving team
instructions outside the block. The block asks Copilot to read applicable `AGENTS.md`;
it is not an automatic content import. Support for `AGENTS.md` alone differs by client.

Run the [loading check](README.md#3-start-the-first-session) and inspect actual files.

## Check skills

Copilot CLI documents `.agents/skills`. Inside the CLI chat, run `/skills reload`, then
`/skills info <installed-skill-name>`. IDE skill support depends on the actual client/version;
when discovery is unavailable, ask the agent to read the canonical file explicitly.

## Optional configuration

Keep existing client settings. Model choice, native agents and permissions remain host-controlled;
see [Agent configuration](../agent-configuration.md).

## Official references

Checked 2026-10-13; no logged-in Copilot client or live-agent smoke was run.

- [Instructions by IDE](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/configure-custom-instructions/add-repository-instructions-in-your-ide)
- [CLI skill paths and loading checks](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)

## Common first-session onboarding

npm and pip/offline use the same `aih init --host copilot` bundle and canonical harness-start.
Invoke the native skill when available (Kiro: `/harness-start`), or send:

> Read .agents/skills/harness-start/SKILL.md and follow it for this project. My task: [task].

Reuse saved answers; do not start a second terminal interview. Client-specific imports/discovery above
still apply. [pip/offline prerequisites and updates](../python-installation.md).
