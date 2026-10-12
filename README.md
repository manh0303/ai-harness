# AI Harness

**Giúp AI làm việc theo quy trình: hiểu yêu cầu → code → test → review.**

Cài hướng dẫn vào project, rồi giao việc cho AI bằng ngôn ngữ bình thường.
Dùng với Codex, Claude Code, Cursor và các công cụ AI đọc được repository.

## Bắt đầu

Cần **Node.js 22+**. Chạy trong project của bạn:

```bash
npm install -g @manhd_d/ai-harness
aih init --detect
```

`--detect` chọn adapter theo file trong repo. Nếu chưa nhận diện được stack, dùng `aih init` để cài Core; hoặc chọn cụ thể, ví dụ `aih init --adapters java-spring`.

Mở project trong công cụ AI và gửi:

```text
Đọc AGENTS.md. Khảo sát repo và giúp tôi thiết lập context dự án.
Chỉ hỏi thông tin còn thiếu bằng A/B/C, có lựa chọn đề xuất và lý do.
Lưu thông tin chung vào .harness/local.md; đường dẫn riêng máy lưu riêng.
Sau đó thực hiện yêu cầu: <mô tả công việc>.
Chạy test phù hợp và báo tiêu chí đã đạt, chưa đạt hoặc chưa kiểm chứng.
```

**Bạn giao việc; AI đọc workflow và skill phù hợp.** Không cần gọi từng role hay mở chat cho từng agent. Với thay đổi lớn, làm rõ yêu cầu và ghi spec trong `openspec/` trước khi code; sửa nhỏ dùng quy trình ngắn.

Review code và kết quả test, rồi commit cấu hình Harness cùng project. CLI cài/kiểm tra hướng dẫn; AI host thực thi công việc. `aih check` kiểm tra bộ cài, `aih verify` xuất checklist; cả hai không chạy test ứng dụng.

## Chọn thêm khi cần

| Nhu cầu | Lệnh khởi tạo thay cho `aih init --detect` |
| --- | --- |
| Spring Boot | `aih init --adapters java-spring` |
| React / Next.js | `aih init --adapters react-nextjs` |
| React Native | `aih init --adapters react-native` |
| Từ ý tưởng / tài liệu BA | `aih init --capabilities product` |

Có thể kết hợp adapter với capability: `aih init --adapters java-spring --capabilities product`.
Xem tất cả bằng `aih list`. Project đã cài: chỉnh `.harness/project.json` rồi `aih update`.

## Cập nhật

Commit trạng thái hiện tại, sau đó:

```bash
npm install -g @manhd_d/ai-harness@latest
aih update --dry-run
aih update
aih check
```

Review diff trước khi áp dụng. `aih update` dùng phiên bản CLI đang cài; giữ nội dung cấu hình riêng của project.

[Bắt đầu chi tiết](docs/getting-started.md) · [Tra cứu tài liệu](docs/README.md) · [Bảo trì Harness](docs/harness-maintenance.md) · [MIT](LICENSE)
