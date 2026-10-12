# Bắt đầu với AI Harness

**Cài một lần → ghi context dự án → giao việc cho AI → kiểm tra kết quả.**

Cần Node.js **22+**, Git và thư mục repository ứng dụng. Với dự án mới, tạo repository/thư mục trước;
`aih init` cài Harness vào đó, không scaffold Spring/Next.js/Expo. AI tool đọc được file trong repository;
cách nạp `AGENTS.md` và skills theo [setup từng host](tool-setup/README.md).

## 1. Cài vào project

```bash
npm install -g @manhd_d/ai-harness
cd /path/to/existing-project
aih init --adapters java-spring
aih check
aih setup --host codex
```

Chọn module theo nhu cầu, không cần cài cả bộ:

| Nhu cầu | Tham số cho `aih init` |
| --- | --- |
| Spring Boot API | `--adapters java-spring` |
| React/Next.js + UI | `--adapters react-nextjs --capabilities uiux` |
| React Native/Expo + UI | `--adapters react-native --capabilities uiux` |
| Astro tool nhỏ | `--adapters astro` |
| Website có quảng cáo | `--adapters astro --capabilities monetization` |
| Viết tài liệu từ ý tưởng hoặc tài liệu BA | `--capabilities product` |
| BA/PO → SA → PM cho dự án lớn hơn | `--capabilities product,architecture,delivery` + adapter thực tế |
| Spring + tài liệu + Kubernetes | `--adapters java-spring,kubernetes --capabilities product,devops` |

`aih list` xem toàn bộ module. `aih init --dry-run` xem trước thay đổi với cùng tham số đã chọn. Với project đã cài, đổi module trong `.harness/project.json` rồi dùng `aih update`, không chạy lại `init` với lựa chọn khác.

## 2. Ghi context và bắt đầu giao việc

Đổi `--host codex` thành `claude-code`, `gemini-cli`, `cursor` hoặc `copilot` theo công cụ bạn dùng;
chọn hướng dẫn tại [Coding tools](tool-setup/README.md). `aih setup` không có `--host` vẫn hợp lệ.
Init tạo `.harness/agents.json` hợp lệ: Sol được khuyến nghị, không tự chuyển Astra. Claude/Gemini cần
model native tương thích; setup báo những route cần điều chỉnh, không tự đổi model hay ghi host config.
Giữ cấu hình mặc định khi phù hợp; xem [Agent configuration](agent-configuration.md) nếu muốn chỉnh.
Chỉ cho project mới, `aih init --adapters react-nextjs --agent-preset economy` chọn single-agent tiết kiệm;
không áp preset lên cấu hình đã có.

Sau setup, nhờ AI đọc workflow `project-setup`. Đây là gợi ý cho AI host, không phải wizard
nhập liệu của CLI. AI đọc repo trước, chỉ hỏi 1–3 câu A/B/C cho điểm còn thiếu, có đề xuất và lý do.
Không cần xác nhận lại thông tin hoặc quyền triển khai đã có.

Bạn và AI ghi `.harness/local.md` bằng thông tin thực của project; AI khảo sát trước và hỏi phần thiếu:

- Mục tiêu, phạm vi và quy tắc nghiệp vụ quan trọng.
- Stack/phiên bản, database, cấu trúc service/module.
- Lệnh build/test đã xác nhận chạy được.
- Đường dẫn tài liệu BA, conventions và những ràng buộc cần giữ.

Mở project trong AI IDE và giao yêu cầu, ví dụ:

> Đọc AGENTS.md và .harness/local.md, chỉ nạp skill liên quan. Thêm API tìm kiếm khách hàng theo yêu cầu này: … Làm rõ điểm chưa chắc chắn, đề xuất acceptance scenarios; sau khi thống nhất scope, triển khai, chạy test phù hợp và báo cáo kết quả thực chạy.

Với FE/mobile, có thể giao “thêm màn hình tìm kiếm/sửa hồ sơ, dùng common/API/state/navigation hiện có”.
Adapter đã có skills cho implementation và kiểm thử; xem [hướng dẫn web/mobile](frontend-mobile.md).

Bạn không cần gọi từng role/skill thủ công. Nếu host không tự phát hiện hướng dẫn, yêu cầu assistant đọc các đường dẫn trên. `aih skills` xem danh sách; `aih skill <tên>` đọc một skill khi cần.

Review diff và kết quả test, rồi commit `AGENTS.md`, `.harness/`, `.agents/skills/` và tài liệu thay đổi cùng project. Sửa quy tắc riêng trong `.harness/local.md`; giữ nguyên snapshot do Harness quản lý.

Lệnh/tool chung thuộc `.harness/environment.json`; đường dẫn máy riêng thuộc file ignored
`.harness/machine.json`. `aih doctor` kiểm tra tham chiếu biến và sự hiện diện công cụ, không chạy chúng.
Xem [cấu hình Maven nội bộ](project-configuration.md).

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

Đây là bản nháp trong `openspec/changes/add-customer-search/`, chưa phải spec được duyệt.
AI ghi câu trả lời thực tế trong `decisions.json`; kiểm tra bằng `aih ready add-customer-search --stage implement`.
Sau code, ghi bằng chứng trong `verification.json` và chạy với `--stage review`. Xem [Change readiness](change-readiness.md). Sửa nhỏ, ít rủi ro có thể bỏ qua full spec với lý do rõ ràng; không bắt mọi task tạo đủ BRD/PRD/SRS.

`aih new-change` không cần OpenSpec CLI. Chỉ cài OpenSpec riêng khi cần validator/archive của công cụ đó; xem [OpenSpec](openspec.md).

## 4. Kiểm tra đúng thứ

| Lệnh | Ý nghĩa |
| --- | --- |
| `aih check` | Kiểm tra integrity của file Harness; không kiểm thử ứng dụng |
| `aih doctor` | Kiểm tra công cụ và environment đã cấu hình; không chạy build/test |
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

## Coding conventions

Trước code, áp dụng [Project conventions](project-conventions.md): xác định new/maintain/mixed theo module, đọc chuẩn hiện có, tìm common và ghi lý do tạo mới. AI lưu nguồn và quyết định trong `.harness/local.md`; không hỏi lại thông tin đã rõ.

Với BA/PO/SA/PM, dùng [Solution workflow](solution-workflow.md). Chỉ chọn capabilities cần thiết,
dùng tài liệu đã duyệt và ghi chú ngắn khi đủ; không nạp cả danh mục skills vào context.
