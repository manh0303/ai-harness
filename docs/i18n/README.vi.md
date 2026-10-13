# AI Harness

[English](../../README.md) · **Tiếng Việt**

**Bộ hướng dẫn cho AI phát triển project theo workflow: Requirements → Code → Test → Review.**

Cài bộ hướng dẫn vào project, rồi giao việc cho công cụ AI bạn đang dùng.

## Hỗ trợ workflow nào?

| Workflow | Outputs |
| --- | --- |
| **BA / PO — Business analysis & product** | Từ ý tưởng hoặc docs có sẵn đến BRD, PRD, SRS, user stories và acceptance criteria. |
| **SA — Solution architecture** | Architecture, non-functional requirements, technical decisions và change-impact analysis. |
| **PM — Delivery planning** | Delivery phases, dependencies, risks và scope changes. |
| **Dev / QA — Implementation & testing** | Feature implementation, debugging, tests và code review theo project conventions. |
| **UI/UX & DevOps** | UI design, CI/CD, deployment và operations guidance khi cần. |

Hỗ trợ Spring Boot, React/Next.js, React Native/Expo, Python AI/RAG, Astro và Kubernetes.
Chỉ chọn phần cần dùng; task nhỏ không cần đủ bộ docs hay spec. [Chọn stack & module](../../docs/getting-started.md).

## Chạy ở đâu?

| Công cụ AI | Cách sử dụng | Hướng dẫn |
| --- | --- | --- |
| **Codex** | CLI hoặc extension trong IDE | [Cài đặt & thiết lập](../../docs/tool-setup/codex.md) |
| **Claude Code** | Chạy `claude` trong terminal của project | [Cài đặt & thiết lập](../../docs/tool-setup/claude-code.md) |
| **Cursor** | Mở project, giao việc trong Agent | [Cài đặt & thiết lập](../../docs/tool-setup/cursor.md) |
| **GitHub Copilot** | Agent trong IDE hoặc Copilot CLI | [Cài đặt & thiết lập](../../docs/tool-setup/copilot.md) |
| **Gemini CLI** | Chạy `gemini` trong terminal của project | [Cài đặt & thiết lập](../../docs/tool-setup/gemini-cli.md) |

Harness cài hướng dẫn; công cụ AI thực hiện công việc. Cách nạp hướng dẫn tùy công cụ, theo link trên.

## Quick start

Cần **Node.js 22+** và một công cụ AI ở bảng trên. Chạy trong thư mục project:

```bash
npx --yes @manhd_d/ai-harness init --detect
```

Mở công cụ AI tại cùng project, rồi gửi:

> Đọc AGENTS.md, khảo sát project và ghi context cần thiết vào .harness/local.md.
> Thực hiện yêu cầu: [mô tả công việc]. Chạy test phù hợp và báo cáo kết quả.

Bạn giao việc bình thường, không cần gọi từng agent, skill hay mở chat riêng cho từng vai.
Nếu `--detect` chưa nhận diện được stack, [chọn module thủ công](../../docs/getting-started.md).
`aih check` chỉ kiểm tra file Harness; tính năng đúng hay chưa cần test của project và review.

[Getting started](../../docs/getting-started.md) · [Docs & examples](../../docs/README.md) · [Input/output & integrations](../../docs/artifact-contract.md) · [Model/agent configuration](../../docs/agent-configuration.md)

Đóng góp: [Contributing](../../CONTRIBUTING.md) · [Bảo trì Harness](../../docs/harness-maintenance.md) · [MIT](../../LICENSE).
