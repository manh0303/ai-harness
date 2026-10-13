# AI Harness

**English** · [Tiếng Việt](docs/i18n/README.vi.md)

**Reusable project instructions for AI-assisted development: Requirements → Code → Test → Review.**

Install Harness in your project, then give tasks to your preferred AI coding tool.

## What can it help with?

| Workflow | Outputs |
| --- | --- |
| **BA / PO — Business analysis & product** | Turn ideas or existing docs into BRD, PRD, SRS, user stories and acceptance criteria. |
| **SA — Solution architecture** | Architecture, non-functional requirements, technical decisions and change-impact analysis. |
| **PM — Delivery planning** | Delivery phases, dependencies, risks and scope changes. |
| **Dev / QA — Implementation & testing** | Feature implementation, debugging, tests and code review following project conventions. |
| **UI/UX & DevOps** | UI design, CI/CD, deployment and operations guidance when needed. |

Stack adapters: Spring Boot, React/Next.js, React Native/Expo, Python AI/RAG, Astro and Kubernetes.
Select only what you need; small tasks do not require a full set of docs or a spec. [Choose your stack & modules](docs/getting-started.md).

## Where can you use it?

| AI coding tool | Usage | Guide |
| --- | --- | --- |
| **Codex** | CLI or IDE extension | [Install & setup](docs/tool-setup/codex.md) |
| **Claude Code** | Run `claude` in the project terminal | [Install & setup](docs/tool-setup/claude-code.md) |
| **Cursor** | Open the project and use Agent | [Install & setup](docs/tool-setup/cursor.md) |
| **GitHub Copilot** | IDE Agent or Copilot CLI | [Install & setup](docs/tool-setup/copilot.md) |
| **Gemini CLI** | Run `gemini` in the project terminal | [Install & setup](docs/tool-setup/gemini-cli.md) |

Harness installs instructions; your AI tool executes the work. Follow each guide for tool-specific instruction loading.

## Quick start

Requires **Node.js 22+** and an AI coding tool above. Run in your project directory:

```bash
npx --yes @manhd_d/ai-harness init --detect
```

Open your AI tool in the same project and send:

> Read AGENTS.md, inspect the project and record relevant context in .harness/local.md.
> Implement: [describe your task]. Run appropriate tests and report the results.

Give tasks normally; you do not need to invoke each agent or skill, or open a chat for each role.
If `--detect` cannot identify the stack, [select modules explicitly](docs/getting-started.md).
`aih check` checks Harness files; application correctness requires project tests and review.

[Getting started](docs/getting-started.md) · [Docs & examples](docs/README.md) · [Input/output & integrations](docs/artifact-contract.md) · [Model/agent configuration](docs/agent-configuration.md)

[Contributing](CONTRIBUTING.md) · [Harness maintenance](docs/harness-maintenance.md) · [MIT](LICENSE).
