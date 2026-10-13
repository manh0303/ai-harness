# AI Harness

**English** · [Tiếng Việt](docs/i18n/README.vi.md) · [简体中文](docs/i18n/README.zh-CN.md) · [Español](docs/i18n/README.es.md)

Reusable agent workflows for software development: **Requirements → Design → Code → Test → Review.**

Give an idea, existing docs or a change request to your AI coding tool. Harness helps it inspect the project, clarify open decisions, implement accepted scope and maintain relevant specs/docs. Use only the roles and skills the task needs.

Works with any project through Core workflows. Optional stack support: Spring Boot, React/Next.js, React Native, Python, Astro and Kubernetes. Stack selection does not choose infrastructure or architecture.

## Quick start

Install/sign in to an AI tool below. Requires Node.js 22+. Run in your **project root** terminal:

```bash
npx --yes @manhd_d/ai-harness init
```

`npx` does not install a global `aih` command. Check the installation with
`npx --yes @manhd_d/ai-harness check`; then open the same project in your AI tool.

Then ask your AI tool:

> Read AGENTS.md. Inspect this project and its approved decisions. Implement [task], run appropriate checks and maintain the affected docs.

Use `init --detect` for supported stack detection. Existing project instructions and custom skills are preserved; `check` checks Harness integrity. Your host executes application tests and controls tools, delegation and permissions.

## Where it runs

| AI tool | Environment | Install the tool | Harness setup |
| --- | --- | --- | --- |
| **Codex** | CLI, IDE or connected cloud workspace | [Install](https://developers.openai.com/codex/quickstart/) | [Guide](docs/tool-setup/codex.md) |
| **Claude Code** | Project terminal | [Install](https://code.claude.com/docs/en/setup) | [Guide](docs/tool-setup/claude-code.md) |
| **Cursor** | IDE Agent | [Install](https://cursor.com/docs) | [Guide](docs/tool-setup/cursor.md) |
| **GitHub Copilot** | IDE Agent or CLI | [Install](https://docs.github.com/en/copilot) | [Guide](docs/tool-setup/copilot.md) |
| **Gemini CLI** | Project terminal | [Install](https://geminicli.com/docs/) | [Guide](docs/tool-setup/gemini-cli.md) |
| **Kiro** | IDE, CLI or connected Web workspace | [Install](https://kiro.dev/docs/getting-started/installation/) | [Guide](docs/tool-setup/kiro.md) |

Local/cloud execution and external inputs depend on the host's actual access. MCP/connector/API connections can supply docs, designs, tickets and evidence under project source policies.

[Getting started](docs/getting-started.md) · [Docs & examples](docs/README.md) · [Input/output](docs/artifact-contract.md) · [Agent configuration](docs/agent-configuration.md) · [Continuous development](docs/continuous-development.md)

[Contributing](CONTRIBUTING.md) · [Harness maintenance](docs/harness-maintenance.md) · [MIT](LICENSE)
