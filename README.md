# AI Harness

**Giúp AI làm việc theo quy tắc của project: hiểu yêu cầu → viết code → test → review.**

Dùng với Codex, Claude Code, Cursor và các AI coding tools đọc được file trong project.

## Bắt đầu

Cần **Node.js 22+**. Chạy trong thư mục project của bạn:

```bash
npx --yes @manhd_d/ai-harness init --detect
```

Mở project trong công cụ AI bạn dùng, rồi gửi:

> Đọc AGENTS.md, khảo sát project và ghi context cần thiết vào .harness/local.md.
> Thực hiện yêu cầu: [mô tả công việc]. Chạy test phù hợp và báo cáo kết quả.

Bạn giao việc bình thường, không cần gọi từng agent, skill hay mở chat riêng cho từng vai. Harness cài hướng dẫn; công cụ AI thực hiện công việc.
`--detect` nhận diện stack từ file ở thư mục gốc; nếu báo chưa nhận diện được, chọn stack theo [hướng dẫn bắt đầu](docs/getting-started.md).

## Chọn theo nhu cầu

- **Code:** Spring Boot, React/Next.js, React Native, Python AI/RAG, Astro, Kubernetes.
- **Tài liệu:** từ ý tưởng hoặc tài liệu BA đã có đến yêu cầu và kế hoạch triển khai.
- **Mở rộng:** UI/UX, kiến trúc, quản lý tiến độ, DevOps khi cần.

Chỉ cài phần cần dùng. Task nhỏ không cần đủ BRD/PRD/SRS hay spec.

## Tài liệu

[Bắt đầu & chọn stack](docs/getting-started.md) · [Tra cứu & ví dụ](docs/README.md) · [Cấu hình công cụ AI](docs/tool-setup/README.md)

`aih check` chỉ kiểm tra file Harness; tính năng đúng hay chưa cần test của project và review.

Đóng góp: [Contributing](CONTRIBUTING.md) · [Bảo trì Harness](docs/harness-maintenance.md).
License: [MIT](LICENSE).
