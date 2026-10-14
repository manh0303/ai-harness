# AI Harness

[English](../../README.md) · [Tiếng Việt](README.vi.md) · **简体中文** · [Español](README.es.md)

可复用的软件开发 Agent workflows: **Requirements → Design → Code → Test → Review.**

把想法、已有 docs 或 change request 交给 AI coding tool。Harness 帮助 AI 检查项目、澄清待定决策、实现已确认的 scope，并维护相关 spec/docs。只加载任务需要的 roles 和 skills。

Core workflows 可用于任何项目。Stack support 是可选的，不会自动选择 infrastructure 或 architecture。

需要 **Node.js 22+**。在项目根目录运行：

```bash
npx --yes @manhd_d/ai-harness init --host codex
```

host 可选 codex、claude-code、cursor、copilot、gemini-cli 或 kiro。
首次 AI 会话调用 harness-start；如果客户端未发现技能，请发送：

> Read .agents/skills/harness-start/SKILL.md and follow it for this project. My task: [task].

Kiro 提供 `/harness-start`；原生发现因客户端而异。[多 IDE 指南](../tool-setup/README.md)。

**pip / 离线安装**将在下一次审核后的版本中提供，首次发布需要配置 PyPI publisher：

```bash
python -m pip install manhd-ai-harness
aih init --host codex
```

需要 Python 3.9+ 和 Node.js 22+；使用相同 CLI/资源，不调用 npm/npx。
离线：`python -m pip install --no-index --no-deps /path/to/package.whl`。
[pip 与更新](../python-installation.md) · [备份](../configuration-backup.md)。
`npx` 不创建全局 aih；用 `npx --yes @manhd_d/ai-harness check` 检查文件完整性。

| AI tool | Setup |
| --- | --- |
| **Codex** | [使用指南](../tool-setup/codex.md) |
| **Claude Code** | [使用指南](../tool-setup/claude-code.md) |
| **Cursor** | [使用指南](../tool-setup/cursor.md) |
| **GitHub Copilot** | [使用指南](../tool-setup/copilot.md) |
| **Gemini CLI** | [使用指南](../tool-setup/gemini-cli.md) |
| **Kiro** | [使用指南](../tool-setup/kiro.md) |

[Docs 与示例](../README.md) · [Getting started](../getting-started.md) · [Input/output](../artifact-contract.md) · [Agent configuration](../agent-configuration.md) · [Continuous development](../continuous-development.md) · [MIT](../../LICENSE)
