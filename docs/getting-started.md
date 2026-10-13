# Bắt đầu với AI Harness

**Cài vào project → mở AI → giao việc → review kết quả.** Cần Node.js **22+** và một thư mục project. Với dự án mới, tạo thư mục/repository trước; Harness không tạo ứng dụng hay chạy model.

## 1. Cài vào project

Chạy tại thư mục gốc của project:

```bash
npx --yes @manhd_d/ai-harness init --detect
```

Lệnh nhận diện stack từ file ở thư mục gốc và cài hướng dẫn tương ứng. Nếu báo chưa nhận diện được, thay `--detect` theo bảng; bỏ `--detect` để chỉ cài quy tắc chung (Core):

| Project / nhu cầu | Tham số cho `init` |
| --- | --- |
| Spring Boot | `--adapters java-spring` |
| React / Next.js | `--adapters react-nextjs` |
| React Native / Expo | `--adapters react-native` |
| Python AI / RAG | `--adapters ai-python` |
| Astro tool / website | `--adapters astro` |
| Spring + Next.js | `--adapters java-spring,react-nextjs` |
| Viết tài liệu BA | `--capabilities product` |

Ví dụ vừa code Spring vừa viết tài liệu:

```bash
npx --yes @manhd_d/ai-harness init --adapters java-spring --capabilities product
```

Thêm `--capabilities uiux` khi cần UI/UX; `monetization` cho website có quảng cáo. [Danh mục đầy đủ](cli.md).
Với project đã cài, đổi lựa chọn trong `.harness/project.json` rồi dùng `update`.

## 2. Mở AI và giao việc

Mở thư mục project trong công cụ AI, rồi gửi:

> Đọc AGENTS.md và .harness/local.md. Khảo sát code, tài liệu và lệnh test hiện có;
> ghi context còn thiếu vào .harness/local.md, chỉ hỏi phần chưa rõ.
> Thực hiện yêu cầu: [mô tả công việc]. Chạy test phù hợp, báo cáo kết quả và phần chưa kiểm chứng.

Bạn có thể giao ý tưởng, tài liệu BA hoặc task code. Không cần gọi từng agent/skill.
Với web/mobile, giao màn hình hoặc tính năng theo common/API/state/navigation hiện có; [skills đã có](frontend-mobile.md).
Nếu công cụ chưa tự nạp hướng dẫn, xem [cách cấu hình công cụ AI](tool-setup/README.md).
Lệnh `setup` chỉ xuất gợi ý thiết lập, không phải bước bắt buộc để bắt đầu.

Review diff và test, rồi commit `AGENTS.md`, `.harness/`, `.agents/skills/` cùng code.
Quy tắc riêng sửa trong `.harness/local.md`; giữ nguyên file do Harness quản lý.
Lệnh/tool chung lưu trong `.harness/environment.json`; đường dẫn riêng máy trong `.harness/machine.json` được Git ignore. [Cấu hình Maven/JDK](project-configuration.md).
Cấu hình model là tùy chọn trong `.harness/agents.json`; chọn model tương thích với công cụ AI: [hướng dẫn](agent-configuration.md).

## 3. Thêm tài liệu khi cần

Với `product` đã cài, tạo bản nháp yêu cầu:

```bash
npx --yes @manhd_d/ai-harness new-doc prd-lite
```

Tính năng cần spec riêng: dùng `new-change <id>`; [hướng dẫn spec](change-readiness.md).
Task nhỏ không cần bộ tài liệu đầy đủ. Không cần cài OpenSpec CLI để tạo bản nháp.

## 4. Kiểm tra và cập nhật

`check` kiểm tra file Harness; `verify` xuất checklist. Code cần **test của project** và review thực tế.

Trước cập nhật, tạo branch và commit trạng thái hiện tại. Xem trước, áp dụng rồi kiểm tra:

```bash
npx --yes @manhd_d/ai-harness@latest update --dry-run
npx --yes @manhd_d/ai-harness@latest update
npx --yes @manhd_d/ai-harness@latest check
```

Review diff và chạy test project trước khi commit. Nếu có conflict, xem [cách xử lý](cli.md).
Dùng thường xuyên có thể cài global: `npm install -g @manhd_d/ai-harness`, rồi dùng `aih` thay cho `npx --yes @manhd_d/ai-harness`. Nâng CLI global trước khi `aih update`.

[Tra cứu & ví dụ theo nhu cầu](README.md).

## Docs/UI destinations
For idea-driven or existing-doc work, ask the AI to reuse or clarify input/output destinations,
canonical owners and source-write scope. Record them in project-owned artifacts.json/integrations.json;
`aih artifacts` shows declarations. See [Artifact contract](artifact-contract.md).

For successive features, bugfixes or a resumed session, give the host a normal request. It follows [Continuous development](continuous-development.md), rechecks the baseline and maintains only affected docs.
