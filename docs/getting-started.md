# Getting started — cài và sử dụng AI Harness

AI Harness phân phối **rules, role contracts, skills và workflows** tới repository ứng dụng. Lệnh `aih` là CLI chạy offline, không phải AI agent runner: nó không tạo ứng dụng, đọc Confluence, tạo Figma, chạy test, gọi LLM, merge PR hay deploy.

**Đọc theo thứ tự:** [Full SDLC](end-to-end-workflow.md) → [Skill matrix](skill-matrix.md) → [Agent handoffs](agent-handoffs.md) → [Ví dụ theo stack](#ví-dụ-thực-hành).

## 1. Chuẩn bị

- Node.js >=22, Git, npm và quyền đọc repository private `manh0303/ai-harness`.
- Một **repository ứng dụng đã tồn tại** và AI IDE/assistant có thể đọc file trong repository đó.
- Chỉ kết nối GitHub, Confluence, Figma hay nền tảng khác trong AI host khi cần, theo quyền đã phê duyệt.
- **OpenSpec CLI là tùy chọn**: `aih new-change` tạo bản nháp offline, còn `openspec validate` cần OpenSpec CLI cài riêng. Xem [OpenSpec](openspec.md).
- Bản nguồn hiện tại là candidate; chưa mặc định có một bản `@manh0303/ai-harness` được phát hành trên npm registry. Xem [npm release](npm-release.md).

## 2. Cài một lần từ source đã review

~~~bash
git clone git@github.com:manh0303/ai-harness.git
cd ai-harness
# Kiểm tra checkout/commit đã review; không tự giả định main là release tag.
npm test
npm run validate
npm run test:package
npm pack
npm install -g ./manh0303-ai-harness-0.6.0.tgz
aih --version
~~~

Nếu package đã được publish và bạn có quyền truy cập thì có thể cài qua registry; **đừng coi lệnh cài registry là dùng được trước khi xác minh việc phát hành**. Cài bộ `aih` không tự cài OpenSpec hay dependency Spring/React/Python cho ứng dụng.

## 3. Cài Harness vào repository ứng dụng

Ví dụ service Spring Boot có nhu cầu làm tài liệu sản phẩm và triển khai Kubernetes:

~~~bash
cd /path/to/existing-spring-service
aih resolve --adapters java-spring,kubernetes --capabilities product,devops
aih init --adapters java-spring,kubernetes --capabilities product,devops --dry-run
aih init --adapters java-spring,kubernetes --capabilities product,devops
aih check
aih skills
~~~

- `aih resolve`: kiểm tra dependency/compatibility và cảnh báo recommendation; **không cài module**.
- `aih init --dry-run`: xem diff dự kiến, **không cài đặt lâu dài**.
- `aih init`: cài snapshot đã chọn trong `.harness/`, tạo AGENTS block, ghi lock và expose skills trong `.agents/skills/`.
- `aih check`: kiểm tra integrity của file do Harness quản lý, **không kiểm thử source code ứng dụng**.
- `aih skills`: liệt kê metadata. `aih skill <tên>`: đọc **một** skill đã cài, không tự kích hoạt agent.

**Các lựa chọn phổ biến:**

| Dự án | Lựa chọn |
| --- | --- |
| API Spring | `--adapters java-spring` |
| Web React/Next.js | `--adapters react-nextjs --capabilities uiux` |
| React Native/Expo | `--adapters react-native --capabilities product,uiux` |
| Python AI/RAG | `--adapters ai-python --capabilities product` |
| Full-stack một repo | `--adapters java-spring,react-nextjs,kubernetes --capabilities product,uiux,devops` |
| Chỉ BA/PO | `--capabilities product` |
| Core-only | Không truyền adapters/capabilities |

`aih detect` kiểm tra heuristic các file trực tiếp ở target, không tìm đệ quy monorepo. Với mỗi microservice/repository độc lập, cài riêng và chỉ chọn những module thực sự cần.

## Hai hướng dẫn theo loại dự án

- [Idea-driven — có ý tưởng và muốn AI cùng thảo luận, nghiên cứu, viết tài liệu](examples/idea-driven-project.md).
- [Document-driven — có BRD/PRD/SRS từ BA, cần AI đưa vào phát triển phần mềm](examples/document-driven-project.md).

**Lưu ý:** khi PR chứa tính năng chưa merge, cần checkout đúng branch/commit đã review trước khi `npm pack`; cài từ `main` không mặc định có các tính năng chỉ có trong PR.

## 4. Bắt đầu một thay đổi có traceability

Hai workflow tài liệu: `idea-driven` khi bắt đầu từ ý tưởng thô, `document-driven` khi đã có BRD/PRD/SRS/Confluence do BA cung cấp. Cả hai dùng chung pipeline, approval và OpenSpec. Xem [Documentation workflows](documentation-workflows.md).


~~~bash
# Chỉ dùng được khi đã chọn capability product:
aih new-doc brd
aih new-doc prd
aih new-doc backlog
aih new-doc acceptance-criteria
aih new-doc traceability
aih new-doc idea       # docs/discovery/
aih new-doc research   # docs/discovery/
aih new-doc prd-lite   # docs/product/
aih new-doc srs        # docs/product/
aih new-doc use-cases  # docs/product/

# Tạo change bản nháp OpenSpec — không cần cài OpenSpec CLI:
aih new-change add-customer-api

# Đọc từng skill cần thiết:
aih skill harness-product-prd-generation
aih skill harness-spec
aih skill harness-tdd
~~~

Các lệnh `new-doc` chỉ copy template trống sang `docs/product/`; AI host/BA/PO phải điền theo nguồn đáng tin cậy và duyệt. `new-change` chỉ tạo proposal/design/tasks/spec có TODO; **không phải spec đã được approve**. Trước khi yêu cầu IDE implement, hướng assistant đọc `AGENTS.md` và `.harness/local.md` của dự án.

**Prompt mẫu gửi cho assistant:**

> Hãy đọc AGENTS.md, .harness/local.md và các skill phù hợp đã cài. Phân tích yêu cầu theo source ID, nêu các điểm chưa rõ, soạn OpenSpec change và test scenarios. Chỉ implement khi scope được duyệt; báo cáo tests thực chạy và tạo PR để tôi review, không tự merge hoặc deploy.

## 5. Verify / evaluate và release

~~~bash
aih verify --scope all
aih eval --scope all
aih check
~~~

- `verify`: checklist advisory, `executed: false`. Dùng bằng chứng chạy build/test **bên ngoài CLI**.
- `eval`: dataset và report để con người chạy bài test với một AI runtime được cấp quyền rồi chấm; **không gọi model, không tự chấm**.
- `--scope all`: Core + capability + adapter và scenario ghép module phù hợp. Không có scope thì mặc định chỉ là adapter.
- Production approval phải chỉ rõ artifact, environment và người phê duyệt; CI xanh không cấp quyền deploy.

Đọc các [approval gates trong Full SDLC](end-to-end-workflow.md) và [DevOps runbook](../capabilities/devops/workflows/pr-to-production.md).

## 6. Update bộ Harness đã cài

~~~bash
# Trên branch của consumer, commit trạng thái hiện tại trước.
# Thay đổi adapters/capabilities trong .harness/project.json nếu cần.
aih update --dry-run
aih update
aih check
~~~

Không chỉnh file snapshot dưới `.harness/core|adapters|capabilities` hoặc skill do Harness quản lý; nội dung riêng của dự án thuộc `.harness/local.md`. Nếu có drift, khôi phục từ Git và review diff; không sửa lock hash để che lỗi.

## Ví dụ thực hành

- [Spring Boot REST API với Kafka/DB/Kubernetes](examples/spring-boot-api.md)
- [Full-stack Spring + Next.js + Figma](examples/fullstack-web.md)
- [React Native/Expo có offline-sync](examples/react-native-app.md)
- [Python AI/RAG với kiểm soát truy cập](examples/ai-rag-service.md)
