# AI Harness

Bộ hướng dẫn giúp AI đọc đúng context dự án, làm rõ yêu cầu, code và kiểm tra kết quả.
Dùng cùng Codex, Claude Code, Cursor hoặc AI assistant có quyền đọc repository.

## Bắt đầu

Cần **Node.js 22+**. Chạy trong repository dự án của bạn:

```bash
npm install -g @manhd_d/ai-harness
aih init --adapters java-spring
aih check
```

Thay `java-spring` bằng `react-nextjs`, `react-native`, `astro`, `ai-python` hoặc `kubernetes` theo stack.
Chạy `aih init` không có adapter nếu chỉ cần hướng dẫn chung; `aih list` xem các module có thể chọn.

Mở project trong AI assistant, copy yêu cầu này cho lần đầu:

```text
Đọc AGENTS.md và .harness/local.md. Kiểm tra repo, giúp tôi ghi context
và lệnh build/test thực tế. Chỉ hỏi điểm còn mơ hồ bằng A/B/C có đề xuất.
Sau đó thực hiện yêu cầu: [mô tả công việc].
Chỉ đọc hướng dẫn liên quan, chạy test phù hợp và báo phần chưa kiểm chứng.
```

Từ lần sau, giao việc bình thường. AI dùng context và hướng dẫn đã cài;
**bạn không cần gọi từng skill, chuyển vai agent hay mở nhiều chat**.
Review diff và kết quả test trước khi merge. Với thay đổi nghiệp vụ/API đáng kể,
AI viết spec trong `openspec/changes/`; sửa nhỏ dùng quy trình gọn.

## Tùy chỉnh khi cần

- **Quy ước, nghiệp vụ, lệnh test:** `.harness/local.md`.
- **Maven/JDK nội bộ, đường dẫn riêng:** [Cấu hình project và máy](docs/project-configuration.md).
- **Tài liệu từ ý tưởng hoặc tài liệu BA:** thêm `--capabilities product` khi init.
- **Chọn model/agent:** [Cấu hình agent](docs/agent-configuration.md); AI host áp dụng cấu hình.

CLI cài và kiểm tra hướng dẫn; AI assistant thực hiện công việc.
`aih check` kiểm tra bộ cài, `aih verify` xuất checklist; test ứng dụng phải chạy riêng.

## Cập nhật

Commit trạng thái project trước, rồi nâng CLI và bộ hướng dẫn trong project:

```bash
npm install -g @manhd_d/ai-harness@latest
aih update --dry-run
aih update
aih check
```

[Bắt đầu chi tiết](docs/getting-started.md) · [Tài liệu](docs/README.md) · [Đóng góp](CONTRIBUTING.md) · [MIT](LICENSE)
