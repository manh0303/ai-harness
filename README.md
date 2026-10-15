# Notth

**English** · [Tiếng Việt](docs/i18n/README.vi.md) · [简体中文](docs/i18n/README.zh-CN.md) · [Español](docs/i18n/README.es.md)

Reusable agent workflows for software development: **Requirements → Design → Code → Test → Review.**

Give an idea, existing docs or a change request to your AI coding tool. Harness helps it inspect the project, clarify open decisions, implement accepted scope and maintain relevant specs/docs. Use only the roles and skills the task needs.

Works with any project through Core workflows. Optional stack support: Spring Boot, React/Next.js, React Native, Python, Astro and Kubernetes. Stack selection does not choose infrastructure or architecture.

Previously **AI Harness**. [Existing installation → Notth](docs/notth-migration.md).
Registry commands require a published package containing the selected host support.
If npm returns E404, use the [reviewed source/offline path](docs/getting-started.md#cài-từ-source-khi-registry-chưa-có-package).

## Quick start

Requires **Node.js 22+** and your AI coding tool. Run in your **project root**:

```bash
npx --yes @manhd_d/notth init --host codex
```

Set `--host` to `codex`, `claude-code`, `cursor`, `copilot`, `gemini-cli`, `kiro`, `opencode` or `windsurf`.
Choose the one tool you use; Notth installs only its required bridge.
[Shared setup and migration](docs/tool-portability.md).
In your first AI session, invoke **harness-start** if the host exposes it, or send:

> Read .agents/skills/harness-start/SKILL.md and follow it for this project. My task: [task].

The agent inspects the project, asks only missing questions, saves context and continues your task.
Review its changes and test results. In later sessions, describe the next task directly or ask to resume saved work.
No terminal interview, model configuration or manual skill sequence is required. Kiro exposes
`/harness-start`; native discovery varies by client. [Host guides](docs/tool-setup/README.md).
`npx` does not create a global command; use `npx --yes @manhd_d/notth check` to check integrity.

**pip / restricted networks** (requires a published wheel on PyPI; otherwise use a reviewed offline wheel):

```bash
python -m pip install manhd-ai-harness
aih init --host codex
```

Requires Python 3.9+ **and Node.js 22+**. The wheel bundles the same JavaScript CLI and assets;
it never calls npm or `npx`. Offline: `python -m pip install --no-index --no-deps /path/to/package.whl`.
[Offline install & update](docs/python-installation.md) · [Settings & backup](docs/configuration-backup.md).

Use `init --detect` for stack detection. Your host runs tests and controls tools, delegation and permissions.
Harness owns workflow contracts and evidence formats; hosts or separate drivers execute them.
[Workflow contracts](docs/workflow-contract.md) · [Conformance runner](docs/conformance-runner.md).

## Where it runs

| AI tool | Environment | Install the tool | Harness setup |
| --- | --- | --- | --- |
| **Codex** | CLI, IDE or connected cloud workspace | [Install](https://developers.openai.com/codex/quickstart/) | [Guide](docs/tool-setup/codex.md) |
| **Claude Code** | Project terminal | [Install](https://code.claude.com/docs/en/setup) | [Guide](docs/tool-setup/claude-code.md) |
| **Cursor** | IDE Agent | [Install](https://cursor.com/docs) | [Guide](docs/tool-setup/cursor.md) |
| **GitHub Copilot** | IDE Agent or CLI | [Install](https://docs.github.com/en/copilot) | [Guide](docs/tool-setup/copilot.md) |
| **Gemini CLI** | Project terminal | [Install](https://geminicli.com/docs/) | [Guide](docs/tool-setup/gemini-cli.md) |
| **OpenCode** | Terminal / IDE | [Install](https://opencode.ai/docs/) | [Guide](docs/tool-setup/opencode.md) |
| **Windsurf** | IDE Cascade | [Install](https://docs.windsurf.com/) | [Guide](docs/tool-setup/windsurf.md) |
| **Kiro** | IDE, CLI or connected Web workspace | [Install](https://kiro.dev/docs/getting-started/installation/) | [Guide](docs/tool-setup/kiro.md) |

Local/cloud execution and external inputs depend on the host's actual access. MCP/connector/API connections can supply docs, designs, tickets and evidence under project source policies.

[Daily use & recovery](docs/reusable-workflows.md) · [Getting started](docs/getting-started.md) · [Docs & examples](docs/README.md) · [Input/output](docs/artifact-contract.md) · [Agent configuration](docs/agent-configuration.md) · [Continuous development](docs/continuous-development.md)

[Contributing](CONTRIBUTING.md) · [Harness maintenance](docs/harness-maintenance.md) · [MIT](LICENSE)
