# AI Harness

[English](../../README.md) · [Tiếng Việt](README.vi.md) · [简体中文](README.zh-CN.md) · **Español**

Agent workflows reutilizables para desarrollar software: **Requirements → Design → Code → Test → Review.**

Entrega una idea, docs existentes o un change request a tu AI coding tool. Harness ayuda a inspeccionar el proyecto, aclarar decisiones, implementar el scope aceptado y mantener los spec/docs afectados. Carga solo los roles y skills necesarios.

Los Core workflows sirven para cualquier proyecto. El stack support es opcional y no elige infrastructure ni architecture.

Requiere Node.js 22+. Ejecuta en el directorio del proyecto:

```bash
npx --yes @manhd_d/ai-harness init
```

`npx` no instala el command global `aih`. Comprueba con `npx --yes @manhd_d/ai-harness check` y abre el mismo proyecto en tu AI tool. [Setup común](../tool-setup/README.md).

> Read AGENTS.md. Inspect this project and its approved decisions. Implement [task], run appropriate checks and maintain affected docs.

El host ejecuta tests y controla tools, delegation y permissions. MCP/connector/API pueden aportar input con acceso autorizado. init --detect identifica stacks compatibles; check comprueba la integrity de Harness.

| AI tool | Setup |
| --- | --- |
| **Codex** | [Guía](../tool-setup/codex.md) |
| **Claude Code** | [Guía](../tool-setup/claude-code.md) |
| **Cursor** | [Guía](../tool-setup/cursor.md) |
| **GitHub Copilot** | [Guía](../tool-setup/copilot.md) |
| **Gemini CLI** | [Guía](../tool-setup/gemini-cli.md) |
| **Kiro** | [Guía](../tool-setup/kiro.md) |

[Docs y ejemplos](../README.md) · [Getting started](../getting-started.md) · [Input/output](../artifact-contract.md) · [Agent configuration](../agent-configuration.md) · [Continuous development](../continuous-development.md) · [MIT](../../LICENSE)
