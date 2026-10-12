# Bắt đầu với AI Harness

**Cài → nhờ AI thiết lập context → giao việc → review kết quả.** Cần Node.js **22+**, Git và công cụ AI đọc được repository.

## 1. Cài trong project

```bash
npm install -g @manhd_d/ai-harness
cd /path/to/project
aih init --detect
```

Nếu chưa có stack hoặc không nhận diện được, dùng `aih init` cho Core. Muốn chọn cụ thể, thay lệnh init bằng:

| Project | Lệnh |
| --- | --- |
| Spring Boot | `aih init --adapters java-spring` |
| React / Next.js | `aih init --adapters react-nextjs` |
| React Native | `aih init --adapters react-native` |
| Astro | `aih init --adapters astro` |
| Website có quảng cáo | `aih init --adapters astro --capabilities monetization` |
| Ý tưởng / tài liệu BA | `aih init --capabilities product` |

Kết hợp module bằng dấu phẩy khi cần, ví dụ `--adapters java-spring,react-nextjs --capabilities product`.
`aih list` liệt kê module. Project đã cài thì chỉnh `.harness/project.json` và chạy `aih update`.

## 2. Nhờ AI thiết lập và làm việc

Mở project trong công cụ AI. Gửi mẫu yêu cầu trong [README](../README.md), hoặc:

```text
Đọc AGENTS.md, khảo sát repo và thiết lập context dự án.
Hỏi phần còn thiếu bằng A/B/C có đề xuất. Thực hiện: <yêu cầu>.
Chạy test và đối chiếu kết quả với tiêu chí nghiệm thu đã thống nhất.
```

AI ghi nghiệp vụ, stack, quy ước, nguồn tài liệu và lệnh build/test vào `.harness/local.md`.
Lệnh/tool có cấu trúc lưu trong `.harness/environment.json`; đường dẫn riêng máy lưu trong
`.harness/machine.json` được Git ignore. Không ghi mật khẩu/token vào các file này.
Xem [Maven/JDK nội bộ](project-configuration.md) nếu cần.

Không phải gọi từng skill/role thủ công. AI đọc `AGENTS.md` và chỉ nạp hướng dẫn liên quan;
khả năng tự nạp và chạy công cụ phụ thuộc [AI host](tool-setup/README.md).
`aih setup` là gợi ý cho AI, không phải trình hỏi đáp tương tác. `aih doctor` kiểm tra cấu hình/công cụ,
không chạy build. Model/vai có thể tùy chỉnh trong `.harness/agents.json`: [Agent configuration](agent-configuration.md).

## 3. Review và lưu kết quả

Với tính năng lớn, AI làm rõ yêu cầu rồi viết spec trong `openspec/changes/` trước khi code.
`aih new-change <id>` tạo khung; `aih ready <id> --stage implement|review` kiểm tra cấu trúc và bằng chứng khai báo.
Sửa nhỏ dùng quy trình ngắn. Có capability `product`, `aih new-doc prd-lite` tạo khung tài liệu để bạn và AI điền.

Bạn review diff, tiêu chí nghiệm thu và test thực chạy. `aih check` kiểm tra file Harness;
`aih verify` xuất checklist; chúng không xác nhận code đúng nghiệp vụ.
Commit `AGENTS.md`, `.harness/`, `.agents/skills/` và tài liệu thay đổi cùng project;
không commit `.harness/machine.json`. Tùy chỉnh trong `.harness/local.md`, giữ nguyên file do Harness quản lý.

## Cập nhật

Commit trạng thái hiện tại và xem trước thay đổi:

```bash
npm install -g @manhd_d/ai-harness@latest
aih update --dry-run
aih update
aih check
```

`aih update` dùng bundle của CLI đang cài, không tự tải npm. Nếu có file quản lý bị sửa, chuyển tùy chỉnh
sang `.harness/local.md` rồi khôi phục file đó từ Git trước khi cập nhật. Xem [Versioning](versioning.md).

[Tra cứu theo nhu cầu](README.md) · [CLI reference](cli.md).
