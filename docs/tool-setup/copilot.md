# GitHub Copilot

## Install and open

1. Install/sign in using [official Copilot docs](https://docs.github.com/en/copilot).
2. Run [common setup](README.md) in your project root.
3. Open the project in your IDE's supported Agent mode, or launch `copilot` from that root.

## Load instructions

Instruction support differs by client. VS Code documents `AGENTS.md`; do not assume every IDE behaves
the same way. For a client needing a bridge, add this to the existing
`.github/copilot-instructions.md` (create it if absent, preserving other instructions):

```markdown
Read the applicable AGENTS.md and .harness/local.md before implementation.
Use only the relevant installed skill from .agents/skills and report actual verification.
```

This is a request to read files, not a content import. Run the
[read-only setup prompt](README.md#3-check-loading-then-give-a-task) and compare with actual files.

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
