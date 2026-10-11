# AI Harness

**Bộ quy tắc, skills và workflows tái sử dụng để AI hỗ trợ phát triển phần mềm theo quy trình _Spec → Code → Test → Review_.**

AI Harness cài context vào từng repository qua CLI `aih`. Có thể kết hợp các technology adapters và capabilities theo nhu cầu; không phụ thuộc một IDE hay mô hình AI cụ thể.

> Yêu cầu **Node.js 22+**. CLI không tự chạy LLM, viết code, phê duyệt tài liệu, merge PR hoặc deploy.

## Cài đặt và dùng nhanh

```bash
npm install -g @manhd_d/ai-harness

# Chạy trong một project đã tồn tại
aih init --adapters java-spring --capabilities product
aih check
aih skills

# Tạo bản nháp tài liệu và thay đổi theo spec
aih new-doc prd
aih new-change add-user-management
```

Đổi `java-spring` thành adapter phù hợp; bỏ `--capabilities product` nếu không cần tạo tài liệu BA. Xem [Getting started](docs/getting-started.md) và [CLI reference](docs/cli.md).

## Thành phần

| Nhóm | Hỗ trợ |
| --- | --- |
| **Core** | Rules, agent roles, skills, workflows, review & verification |
| **Adapters** | Java Spring Boot, React/Next.js, React Native, Python AI/RAG, Kubernetes, Astro |
| **Capabilities** | Product/BA/PO, UI/UX & Figma, DevOps, Monetization/AdSense |
| **OpenSpec** | Template cho proposal, design, tasks và spec có review |

Bạn chỉ chọn module cần dùng, ví dụ `aih init --adapters astro --capabilities monetization` cho website công cụ nhỏ có quảng cáo. Xem [Astro adapter](adapters/astro/README.md) và [Monetization capability](capabilities/monetization/README.md).

## Hai luồng làm việc

- **Idea-driven:** Ý tưởng → thảo luận/nghiên cứu → BRD/PRD/SRS → UI/UX → spec → code.
- **Document-driven:** BRD/PRD/SRS/Confluence đã có → phân tích gap → technical spec → code.

Chi tiết: [Documentation workflows](docs/documentation-workflows.md) · [Confluence integration](integrations/confluence/README.md).

## Tài liệu

| Mục đích | Hướng dẫn |
| --- | --- |
| Bắt đầu | [Getting started](docs/getting-started.md) |
| Phát triển end-to-end | [Full SDLC](docs/end-to-end-workflow.md) · [Agent handoffs](docs/agent-handoffs.md) |
| Tra cứu kỹ năng | [Skill matrix](docs/skill-matrix.md) · [CLI reference](docs/cli.md) |
| Tài liệu sản phẩm | [Idea-driven example](docs/examples/idea-driven-project.md) · [Document-driven example](docs/examples/document-driven-project.md) |
| Ví dụ backend/full-stack | [Spring Boot API](docs/examples/spring-boot-api.md) · [Spring + Next.js](docs/examples/fullstack-web.md) |
| Ví dụ mobile/AI | [React Native](docs/examples/react-native-app.md) · [Python AI/RAG](docs/examples/ai-rag-service.md) |
| Micro-tools/website | [Astro micro-tools](docs/examples/astro-micro-tools.md) · [Astro + AdSense](docs/examples/astro-adsense-microtools.md) · [Monetization](docs/monetization.md) |
| Phát hành npm | [Release guide](docs/npm-release.md) · [Changelog](CHANGELOG.md) |

## Kiểm tra và cập nhật

```bash
# Trong repository AI Harness (maintainer)
npm test
npm run validate
npm run test:package

# Trong project đã cài Harness
aih update --dry-run
aih update
aih check
```

**License:** [MIT](LICENSE). GitHub source có thể private; package `@manhd_d/ai-harness` được phát hành công khai qua npm.
