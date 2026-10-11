# Bắt đầu với AI Harness

**Cài một lần → ghi context dự án → giao việc cho AI → kiểm tra kết quả.**

Cần Node.js **22+**, Git và một repository ứng dụng đã tồn tại. AI IDE/assistant phải đọc được file trong repository; cách tự nạp `AGENTS.md` và skills phụ thuộc AI host. CLI `aih` quản lý hướng dẫn, không chạy LLM hay tạo ứng dụng.

## 1. Cài vào project

```bash
npm install -g @manhd_d/ai-harness
cd /path/to/existing-project
aih init --adapters java-spring
aih check
```

Chọn module theo nhu cầu, không cần cài cả bộ:

| Nhu cầu | Tham số cho `aih init` |
| --- | --- |
| Spring Boot API | `--adapters java-spring` |
| React/Next.js + UI | `--adapters react-nextjs --capabilities uiux` |
| Astro tool nhỏ | `--adapters astro` |
| Website có quảng cáo | `--adapters astro --capabilities monetization` |
| Viết tài liệu từ ý tưởng hoặc tài liệu BA | `--capabilities product` |
| Spring + tài liệu + Kubernetes | `--adapters java-spring,kubernetes --capabilities product,devops` |

`aih list` xem toàn bộ module. `aih init --dry-run` xem trước thay đổi với cùng tham số đã chọn. Với project đã cài, đổi module trong `.harness/project.json` rồi dùng `aih update`, không chạy lại `init` với lựa chọn khác.

## 2. Ghi context và bắt đầu giao việc

Điền `.harness/local.md` bằng thông tin thực của project:

- Mục tiêu, phạm vi và quy tắc nghiệp vụ quan trọng.
- Stack/phiên bản, database, cấu trúc service/module.
- Lệnh build/test đã xác nhận chạy được.
- Đường dẫn tài liệu BA, conventions và những ràng buộc cần giữ.

Mở project trong AI IDE và giao yêu cầu, ví dụ:

> Đọc AGENTS.md và .harness/local.md, chỉ nạp skill liên quan. Thêm API tìm kiếm khách hàng theo yêu cầu này: … Làm rõ điểm chưa chắc chắn, đề xuất acceptance scenarios; sau khi thống nhất scope, triển khai, chạy test phù hợp và báo cáo kết quả thực chạy.

Bạn không cần gọi từng role/skill thủ công. Nếu host không tự phát hiện hướng dẫn, yêu cầu assistant đọc các đường dẫn trên. `aih skills` xem danh sách; `aih skill <tên>` đọc một skill khi cần.

Review diff và kết quả test, rồi commit `AGENTS.md`, `.harness/`, `.agents/skills/` và tài liệu thay đổi cùng project. Sửa quy tắc riêng trong `.harness/local.md`; giữ nguyên snapshot do Harness quản lý.

## 3. Tài liệu và spec khi cần

Với capability `product`:

```bash
aih new-doc prd-lite
```

Lệnh tạo template `docs/product/prd-lite.md`; bạn và AI điền nội dung, nguồn và acceptance criteria. Chọn [Idea-driven](examples/idea-driven-project.md) nếu bắt đầu từ ý tưởng; chọn [Document-driven](examples/document-driven-project.md) nếu đã có tài liệu BA/Confluence.

Khi một tính năng cần proposal/design/tasks/spec riêng:

```bash
aih new-change add-customer-search
```

Đây là bản nháp trong `openspec/changes/add-customer-search/`, chưa phải spec được duyệt. Sửa nhỏ, ít rủi ro có thể bỏ qua full spec với lý do rõ ràng; không bắt mọi task tạo đủ BRD/PRD/SRS.

`aih new-change` không cần OpenSpec CLI. Chỉ cài OpenSpec riêng khi cần validator/archive của công cụ đó; xem [OpenSpec](openspec.md).

## 4. Kiểm tra đúng thứ

| Lệnh | Ý nghĩa |
| --- | --- |
| `aih check` | Kiểm tra integrity của file Harness; không kiểm thử ứng dụng |
| `aih doctor` | Thêm kiểm tra sự hiện diện của công cụ; không xác nhận công cụ chạy được |
| `aih verify --scope all` | Xuất checklist, `executed: false`; không chạy build/test |
| `aih eval --scope all` | Xuất tình huống và báo cáo chưa chấm; không gọi model |
| Lệnh test của project | Do bạn, AI host hoặc CI thực chạy để xác minh code |

Một lần `aih check` thành công không có nghĩa tính năng đã đúng. Ghi lệnh test thực chạy, kết quả và phần chưa kiểm chứng trong PR. Xem [đánh giá hành vi AI](../evals/README.md) nếu muốn đo hiệu quả Harness.

## 5. Cập nhật: CLI trước, project sau

Trên branch riêng, commit trạng thái hiện tại trước. Với cách cài global ở trên:

```bash
npm install -g @manhd_d/ai-harness@latest
aih --version
aih check
aih update --dry-run
aih update
aih check
```

`aih --version` là phiên bản CLI; `aih check` trả phiên bản snapshot trong project. `aih update` lấy bundle từ CLI đang cài (hoặc `--source`), **không tự tải npm**. Review diff, chạy test ứng dụng và commit snapshot/lock cùng nhau. Nếu báo drift, giữ lại thay đổi trong Git, chuyển tùy chỉnh sang `.harness/local.md` và khôi phục managed files trước khi update.

Nếu cài local trong project, dùng `npm install --save-dev @manhd_d/ai-harness@latest` và `npx aih` thay cho `aih`.

## Đọc thêm theo nhu cầu

- [CLI reference](cli.md) · [Full SDLC](end-to-end-workflow.md) · [Skill matrix](skill-matrix.md) · [Agent handoffs](agent-handoffs.md).
- [Spring Boot API](examples/spring-boot-api.md) · [Full-stack](examples/fullstack-web.md) · [React Native](examples/react-native-app.md) · [Python AI/RAG](examples/ai-rag-service.md).
- [Astro micro-tools](examples/astro-micro-tools.md) · [Astro + AdSense](examples/astro-adsense-microtools.md).
- [Release guide](npm-release.md): dành cho maintainer; merge source không đồng nghĩa npm đã có bản mới.
