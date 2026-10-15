# Notth

Tên cũ: **AI Harness**. [Chuyển bản đã cài sang Notth](../notth-migration.md). Tên npm mới dùng được sau lần phát hành đầu tiên.

[English](../../README.md) · **Tiếng Việt** · [简体中文](README.zh-CN.md) · [Español](README.es.md)

Agent workflows tái sử dụng cho phát triển phần mềm: **Requirements → Design → Code → Test → Review.**

Đưa ý tưởng, docs có sẵn hoặc change request cho AI coding tool. Harness giúp AI đọc project, làm rõ quyết định, triển khai scope đã chấp nhận và maintain spec/docs liên quan. Chỉ dùng roles và skills cần cho task.

Core dùng được với mọi project; stack adapter là tùy chọn.

Cần **Node.js 22+**. Chạy trong project root:

```bash
npx --yes @manhd_d/notth init --host codex
```

Chọn host: codex, claude-code, cursor, copilot, gemini-cli, kiro, opencode hoặc windsurf.
Session AI đầu tiên: gọi **harness-start** nếu host nhận diện; hoặc gửi:

> Đọc .agents/skills/harness-start/SKILL.md và thực hiện cho project này. Task: [yêu cầu].

Kiro có `/harness-start`; discovery tùy client. [Setup đa IDE](../tool-setup/README.md).

**pip/offline** được bổ sung trong release tiếp theo, cần cấu hình PyPI publisher:

```bash
python -m pip install manhd-ai-harness
aih init --host codex
```

Cần thêm Python 3.9+, vẫn cần Node 22+; cùng CLI/assets, không gọi npm/npx.
Offline: `python -m pip install --no-index --no-deps /path/to/package.whl`.
[pip và cập nhật](../python-installation.md) · [Backup và chuyển dự án](../configuration-backup.md).
`npx` không tạo global aih; dùng `npx --yes @manhd_d/notth check` kiểm integrity.

| AI tool | Setup |
| --- | --- |
| **Codex** | [Hướng dẫn](../tool-setup/codex.md) |
| **Claude Code** | [Hướng dẫn](../tool-setup/claude-code.md) |
| **Cursor** | [Hướng dẫn](../tool-setup/cursor.md) |
| **GitHub Copilot** | [Hướng dẫn](../tool-setup/copilot.md) |
| **Gemini CLI** | [Hướng dẫn](../tool-setup/gemini-cli.md) |
| **Kiro** | [Hướng dẫn](../tool-setup/kiro.md) |

[Docs & examples](../README.md) · [Getting started](../getting-started.md) · [Input/output](../artifact-contract.md) · [Agent configuration](../agent-configuration.md) · [Continuous development](../continuous-development.md) · [MIT](../../LICENSE)

Chọn tool hoặc chuyển project: [Hướng dẫn](../tool-portability.md).
