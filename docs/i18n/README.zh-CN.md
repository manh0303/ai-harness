# AI Harness

[English](../../README.md) · [Tiếng Việt](README.vi.md) · **简体中文** · [Español](README.es.md)

可复用的软件开发 Agent workflows: **Requirements → Design → Code → Test → Review.**

把想法、已有 docs 或 change request 交给 AI coding tool。Harness 帮助 AI 检查项目、澄清待定决策、实现已确认的 scope，并维护相关 spec/docs。只加载任务需要的 roles 和 skills。

Core workflows 可用于任何项目。Stack support 是可选的，不会自动选择 infrastructure 或 architecture。

需要 Node.js 22+。在项目目录运行：

**Kiro:** 安装后打开首次聊天并选择 `/harness-start`。[指南](../tool-setup/kiro.md)。

```bash
npx --yes @manhd_d/ai-harness init --host kiro
```

**其他工具：**

```bash
npx --yes @manhd_d/ai-harness init
npx --yes @manhd_d/ai-harness start
```


运行 `start` 获取引导，然后将 `host_prompt` 发送给 AI 工具。[配置备份与项目迁移](../configuration-backup.md)。

`npx` 不会安装全局 `aih` command。使用 `npx --yes @manhd_d/ai-harness check` 检查，然后在 AI tool 中打开同一项目。[通用 Setup](../tool-setup/README.md)。

> Read AGENTS.md. Inspect this project and its approved decisions. Implement [task], run appropriate checks and maintain affected docs.

Host 执行 tests，并控制 tools、delegation 和 permissions。MCP/connector/API 可在 host 获得访问权限后提供 input。init --detect 用于支持的 stack；check 检查 Harness integrity。

| AI tool | Setup |
| --- | --- |
| **Codex** | [使用指南](../tool-setup/codex.md) |
| **Claude Code** | [使用指南](../tool-setup/claude-code.md) |
| **Cursor** | [使用指南](../tool-setup/cursor.md) |
| **GitHub Copilot** | [使用指南](../tool-setup/copilot.md) |
| **Gemini CLI** | [使用指南](../tool-setup/gemini-cli.md) |
| **Kiro** | [使用指南](../tool-setup/kiro.md) |

[Docs 与示例](../README.md) · [Getting started](../getting-started.md) · [Input/output](../artifact-contract.md) · [Agent configuration](../agent-configuration.md) · [Continuous development](../continuous-development.md) · [MIT](../../LICENSE)
