# AI Harness

[English](../../README.md) · **Tiếng Việt** · [简体中文](README.zh-CN.md) · [Español](README.es.md)

Agent workflows tái sử dụng cho phát triển phần mềm: **Requirements → Design → Code → Test → Review.**

Đưa ý tưởng, docs có sẵn hoặc change request cho AI coding tool. Harness giúp AI đọc project, làm rõ quyết định, triển khai scope đã chấp nhận và maintain spec/docs liên quan. Chỉ dùng roles và skills cần cho task.

Core workflows dùng được với mọi project. Stack support là tùy chọn; không tự chọn infrastructure hay architecture.

Cần Node.js 22+. Chạy trong project:

```bash
npx --yes @manhd_d/ai-harness init
```

`npx` không cài global command `aih`. Kiểm tra bằng `npx --yes @manhd_d/ai-harness check`, rồi mở cùng project trong AI tool. [Setup chung](../tool-setup/README.md).

> Read AGENTS.md. Inspect this project and its approved decisions. Implement [task], run appropriate checks and maintain affected docs.

Host chạy tests và quản lý tools, delegation, permissions. MCP/connector/API có thể cung cấp input khi host có quyền truy cập. init --detect nhận diện stack hỗ trợ; check kiểm tra integrity của Harness.

| AI tool | Setup |
| --- | --- |
| **Codex** | [Hướng dẫn](../tool-setup/codex.md) |
| **Claude Code** | [Hướng dẫn](../tool-setup/claude-code.md) |
| **Cursor** | [Hướng dẫn](../tool-setup/cursor.md) |
| **GitHub Copilot** | [Hướng dẫn](../tool-setup/copilot.md) |
| **Gemini CLI** | [Hướng dẫn](../tool-setup/gemini-cli.md) |
| **Kiro** | [Hướng dẫn](../tool-setup/kiro.md) |

[Docs & examples](../README.md) · [Getting started](../getting-started.md) · [Input/output](../artifact-contract.md) · [Agent configuration](../agent-configuration.md) · [Continuous development](../continuous-development.md) · [MIT](../../LICENSE)
