# AI Harness

**Bộ quy tắc, skills và workflows tái sử dụng để AI hỗ trợ phát triển phần mềm theo quy trình _Spec → Code → Test → Review_.**

AI Harness cài context vào từng repository qua CLI `aih`. Có thể kết hợp các technology adapters và capabilities theo nhu cầu; không phụ thuộc một IDE hay mô hình AI cụ thể.

> Yêu cầu **Node.js 22+**. CLI không tự chạy LLM, viết code, phê duyệt tài liệu, merge PR hoặc deploy.

## Cài đặt và dùng nhanh

```bash
npm install -g @manhd_d/ai-harness

# Chạy trong một project đã tồn tại
cd /path/to/project
aih init --adapters java-spring
aih check
aih setup --host codex
```

Đổi adapter thành `react-nextjs` cho React/Next.js hoặc `react-native` cho React Native/Expo.
Đổi `--host` thành `claude-code`, `gemini-cli`, `cursor` hoặc `copilot` theo công cụ bạn dùng;
xem [setup AI coding tool](docs/tool-setup/README.md) để nạp hướng dẫn và chọn model tương thích.

Mở project trong AI tool và giao: **“Đọc AGENTS.md và workflow project-setup, khảo sát repo, hỏi phần còn thiếu
và ghi context/lệnh test đã xác nhận vào .harness/local.md.”** Sau đó giao task bình thường; AI chỉ nạp skill liên quan.

Thêm `--capabilities product` khi cần tài liệu BA; `aih new-doc prd-lite` tạo template, `aih new-change <id>` tạo spec nháp khi cần. Không bắt mọi task tạo đủ tài liệu. Xem [Getting started](docs/getting-started.md) và [CLI reference](docs/cli.md).

**Phân biệt:** `aih check` kiểm tra file Harness; `aih verify` xuất checklist; build/test ứng dụng do AI host hoặc CI thực chạy. CLI không bảo đảm AI sẽ tuân thủ hướng dẫn; xem [đánh giá hành vi](evals/README.md).

`aih setup` đưa gợi ý câu hỏi cho AI host; AI hỏi phần còn mơ hồ bằng A/B/C có đề xuất và lưu câu trả lời.
Cấu hình Maven/JDK riêng từng máy: [Project configuration](docs/project-configuration.md).
Trước code/review tính năng có spec: [Change readiness](docs/change-readiness.md).


Coding convention cho dự án mới/maintain: [Project conventions](docs/project-conventions.md).
AI đọc cấu trúc, tìm common phù hợp trước khi tạo mới và review ranh giới module.

Cấu hình agent/model: [Agent configuration](docs/agent-configuration.md).
`aih init` tạo `.harness/agents.json` mặc định; không cần nhập cấu hình thủ công.
`aih setup` chỉ xuất kế hoạch, không ghi config native hay tự đổi model.

## Thành phần

| Nhóm | Hỗ trợ |
| --- | --- |
| **Core** | Rules, agent roles, skills, workflows, review & verification |
| **Adapters** | Java Spring Boot, React/Next.js, React Native, Python AI/RAG, Kubernetes, Astro |
| **Capabilities** | Product/BA/PO, Architecture/SA, Delivery/PM, UI/UX & Figma, DevOps |
| **OpenSpec** | Template cho proposal, design, tasks và spec có review |

Bạn chỉ chọn module cần dùng, ví dụ `aih init --adapters astro` cho website và công cụ nhỏ, nhẹ. Xem [Astro adapter](adapters/astro/README.md).

BA → PO → SA → PM → Dev/QA: [Solution workflow](docs/solution-workflow.md).
Setup Codex, Claude Code, Cursor, Copilot, Gemini CLI: [Coding tools](docs/tool-setup/README.md).
Code frontend/mobile, chọn và dùng skills: [React/Next.js & React Native](docs/frontend-mobile.md).

## Hai luồng làm việc

- **Idea-driven:** Ý tưởng → thảo luận/nghiên cứu → BRD/PRD/SRS → UI/UX → spec → code.
- **Document-driven:** BRD/PRD/SRS/Confluence đã có → phân tích gap → technical spec → code.

Chi tiết: [Documentation workflows](docs/documentation-workflows.md) · [Confluence integration](integrations/confluence/README.md).

## Tài liệu

Nâng cấp chính AI Harness: [Quy trình bảo trì và ma trận ảnh hưởng](docs/harness-maintenance.md).

| Mục đích | Hướng dẫn |
| --- | --- |
| Bắt đầu | [Getting started](docs/getting-started.md) |
| Phát triển end-to-end | [Full SDLC](docs/end-to-end-workflow.md) · [Agent handoffs](docs/agent-handoffs.md) |
| Tra cứu kỹ năng | [Skill matrix](docs/skill-matrix.md) · [CLI reference](docs/cli.md) |
| Tài liệu sản phẩm | [Idea-driven example](docs/examples/idea-driven-project.md) · [Document-driven example](docs/examples/document-driven-project.md) |
| Ví dụ backend/full-stack | [Spring Boot API](docs/examples/spring-boot-api.md) · [Spring + Next.js](docs/examples/fullstack-web.md) |
| Ví dụ mobile/AI | [React Native](docs/examples/react-native-app.md) · [Python AI/RAG](docs/examples/ai-rag-service.md) |
| Micro-tools/website | [Astro micro-tools](docs/examples/astro-micro-tools.md) |
| Phát hành npm | [Release guide](docs/npm-release.md) · [Changelog](CHANGELOG.md) |

## Kiểm tra và cập nhật

```bash
# Trong repository AI Harness (maintainer)
npm test
npm run validate
npm run test:package

# Nâng CLI global, rồi cập nhật snapshot trong project
npm install -g @manhd_d/ai-harness@latest
aih update --dry-run
aih update
aih check
```

**License:** [MIT](LICENSE). GitHub source có thể private; package `@manhd_d/ai-harness` được phát hành công khai qua npm.
