# Bắt đầu với AI Harness

**Cài → ghi context → giao việc cho AI → review kết quả.** Cần Node.js 22+, Git,
repository ứng dụng và AI assistant có quyền đọc file.

## 1. Cài vào project

```bash
npm install -g @manhd_d/ai-harness
cd /path/to/existing-project
aih init --adapters java-spring
aih check
```

Chọn tham số theo nhu cầu:

| Project | Tham số cho `aih init` |
| --- | --- |
| Spring Boot | `--adapters java-spring` |
| React/Next.js | `--adapters react-nextjs` |
| React Native | `--adapters react-native` |
| Python AI/RAG | `--adapters ai-python` |
| Tool/website nhẹ | `--adapters astro` |
| Website có quảng cáo | `--adapters astro --capabilities monetization` |
| Viết tài liệu BA | `--capabilities product` |

Có thể kết hợp adapter bằng dấu phẩy, thêm `uiux`, `architecture`, `delivery` hoặc `devops`
khi cần. `aih list` xem toàn bộ lựa chọn. Project đã cài: sửa `.harness/project.json`
và chạy `aih update`, không init lại để đổi module.

## 2. Nhờ AI thiết lập context một lần

Mở project trong AI assistant và gửi:

```text
Đọc AGENTS.md và .harness/local.md. Kiểm tra repo, giúp tôi ghi stack,
nghiệp vụ, quy ước, tài liệu đầu vào và lệnh build/test thực tế.
Chỉ hỏi điểm còn mơ hồ bằng 1–3 câu A/B/C, có đề xuất và lý do;
lưu câu trả lời để không hỏi lại.
```

`aih setup` cung cấp gợi ý thiết lập cho AI, không phải trình nhập liệu tương tác.
Nếu assistant không tự nạp `AGENTS.md`, nhắc nó đọc file này; xem
[thiết lập theo AI tool](tool-setup/README.md).

Giữ quy ước chung trong `.harness/local.md`, lệnh/công cụ trong `.harness/environment.json`,
đường dẫn cá nhân trong `.harness/machine.json` được Git ignore.
[Maven/JDK nội bộ và biến môi trường](project-configuration.md).
Commit hướng dẫn và cấu hình chung cùng project; không ghi token/mật khẩu vào đó.

## 3. Giao việc và kiểm tra kết quả

Ví dụ: “Thêm API tạo khách hàng, không cho trùng số điện thoại.” AI đọc context,
làm rõ hành vi còn thiếu, ghi spec nếu cần, code rồi chạy test. Bạn review diff,
đối chiếu tiêu chí đã chốt với test thực chạy và phần chưa kiểm chứng.
Không cần tự gọi skill hay chuyển agent. Task nhỏ không cần đủ BRD/PRD/SRS/OpenSpec.

`aih check` kiểm tra bộ cài; `aih doctor` kiểm tra cấu hình môi trường;
`aih verify` xuất checklist. Các lệnh này không chạy build/test ứng dụng.

## Khi cần thêm

- [Tạo tài liệu từ ý tưởng hoặc nguồn BA](documentation-workflows.md).
- [OpenSpec](openspec.md) · [Kiểm tra trước code/review](change-readiness.md).
- [Coding conventions](project-conventions.md) · [Cấu hình model/agent](agent-configuration.md).
- [Cập nhật và xử lý lỗi](versioning.md#consumer-update): nâng CLI trước, rồi `aih update --dry-run`, `aih update`, `aih check`; update không tự tải npm.
- Cài CLI local: `npm install --save-dev @manhd_d/ai-harness`, dùng `npx aih` thay `aih`.
- [Toàn bộ tài liệu và ví dụ](README.md).
