# AI Harness

**Giúp AI làm việc theo quy tắc của project: hiểu yêu cầu → viết code → test → review.**

Cài bộ hướng dẫn vào project, rồi giao việc cho công cụ AI bạn đang dùng.

## Làm được gì?

| Nhóm công việc | Kết quả |
| --- | --- |
| **BA / PO — Phân tích & sản phẩm** | Từ ý tưởng hoặc tài liệu có sẵn đến BRD, PRD, SRS, user stories và tiêu chí nghiệm thu. |
| **SA — Kiến trúc giải pháp** | Thiết kế kiến trúc, yêu cầu phi chức năng, quyết định kỹ thuật và phân tích ảnh hưởng. |
| **PM — Kế hoạch triển khai** | Chia giai đoạn, xác định phụ thuộc, theo dõi rủi ro và thay đổi phạm vi. |
| **Dev / QA — Code & kiểm thử** | Triển khai tính năng, sửa lỗi, viết test và review theo quy ước của project. |
| **UI/UX & DevOps** | Thiết kế giao diện, chuẩn bị CI/CD, triển khai và vận hành khi cần. |

Hỗ trợ Spring Boot, React/Next.js, React Native/Expo, Python AI/RAG, Astro và Kubernetes.
Chỉ chọn phần cần dùng; task nhỏ không cần đủ bộ tài liệu. [Chọn stack & module](docs/getting-started.md).

## Chạy ở đâu?

| Công cụ AI | Cách sử dụng | Hướng dẫn |
| --- | --- | --- |
| **Codex** | CLI hoặc extension trong IDE | [Cài đặt & thiết lập](docs/tool-setup/codex.md) |
| **Claude Code** | Chạy `claude` trong terminal của project | [Cài đặt & thiết lập](docs/tool-setup/claude-code.md) |
| **Cursor** | Mở project, giao việc trong Agent | [Cài đặt & thiết lập](docs/tool-setup/cursor.md) |
| **GitHub Copilot** | Agent trong IDE hoặc Copilot CLI | [Cài đặt & thiết lập](docs/tool-setup/copilot.md) |
| **Gemini CLI** | Chạy `gemini` trong terminal của project | [Cài đặt & thiết lập](docs/tool-setup/gemini-cli.md) |

Harness cài hướng dẫn; công cụ AI thực hiện công việc. Cách nạp hướng dẫn tùy công cụ, theo link trên.

## Bắt đầu

Cần **Node.js 22+** và một công cụ AI ở bảng trên. Chạy trong thư mục project:

```bash
npx --yes @manhd_d/ai-harness init --detect
```

Mở công cụ AI tại cùng project, rồi gửi:

> Đọc AGENTS.md, khảo sát project và ghi context cần thiết vào .harness/local.md.
> Thực hiện yêu cầu: [mô tả công việc]. Chạy test phù hợp và báo cáo kết quả.

Bạn giao việc bình thường, không cần gọi từng agent, skill hay mở chat riêng cho từng vai.
Nếu `--detect` chưa nhận diện được stack, [chọn module thủ công](docs/getting-started.md).
`aih check` chỉ kiểm tra file Harness; tính năng đúng hay chưa cần test của project và review.

[Bắt đầu chi tiết](docs/getting-started.md) · [Tra cứu & ví dụ](docs/README.md) · [Cấu hình model/agent](docs/agent-configuration.md)

Đóng góp: [Contributing](CONTRIBUTING.md) · [Bảo trì Harness](docs/harness-maintenance.md) · [MIT](LICENSE).
