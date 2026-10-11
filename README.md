# ai-harness

Framework tái sử dụng để hướng dẫn AI làm việc theo **Spec → Code → Test → Review** trong nhiều dự án.
Core dùng chung; adapter chứa quy chuẩn công nghệ; CLI cài một bản có version vào từng repository.

**Trạng thái:** `@manhd_d/ai-harness@0.6.0` đã phát hành công khai; bản source trên main có thể chứa thay đổi chưa release. CLI hỗ trợ Node.js 22+, 6 adapters, 4 optional capabilities và 53 skills, không cần Python hay dependency runtime ngoài.
Cài từ npm Registry bằng `npm install -g @manhd_d/ai-harness`; GitHub repository `manh0303/ai-harness` vẫn private.
Harness không tự gọi LLM, không tự sinh ứng dụng, không tạo agent runtime, không tự merge/deploy.
Các role/skill hướng dẫn assistant đang dùng; quyền thực tế do IDE/runtime, Git và CI kiểm soát.

## Hướng dẫn quy trình phát triển phần mềm (full SDLC)

Nếu lần đầu sử dụng, đọc theo thứ tự: **Cài → Product/BA/PO → UI/UX → OpenSpec → Code → Test/Review → CI/CD → Vận hành**.

- **[Getting started](docs/getting-started.md)** — cài CLI, chọn module, tạo change và kiểm tra.
- **[Hai luồng tài liệu](docs/documentation-workflows.md)** — idea-driven và document-driven, lưu trữ, version và handoff.
- **[Full SDLC: Idea → Production](docs/end-to-end-workflow.md)** — input/output, approval gate, cách phối hợp capabilities/adapters.
- **[Ma trận 53 skills](docs/skill-matrix.md)** — tra cứu skills theo stage/công nghệ và ID thật.
- **[Agent handoffs](docs/agent-handoffs.md)** — roles, trách nhiệm, ownership, evidence và bàn giao.
- **Walkthrough:** [Spring Boot API](docs/examples/spring-boot-api.md) · [Full-stack Next.js + Spring](docs/examples/fullstack-web.md) · [React Native](docs/examples/react-native-app.md) · [Python AI/RAG](docs/examples/ai-rag-service.md) · [Astro micro-tools](docs/examples/astro-micro-tools.md) · [Astro + AdSense](docs/examples/astro-adsense-microtools.md).

Harness cung cấp hướng dẫn cho AI runtime, **không** tự điều phối AI agent, tạo code, chạy test, merge hay deploy.

## Bắt đầu

Nếu muốn thử thay đổi trong PR chưa merge, checkout đúng branch đã review trước `npm pack`. Người dùng thông thường nên cài bản npm được phát hành và chỉ cập nhật snapshot sau khi review.

Cài từ source đã review bằng tài khoản có quyền repository private:

```bash
git clone git@github.com:manh0303/ai-harness.git
cd ai-harness
# Nếu thử các tính năng chưa merge trong PR #10:
git switch feat/astro-lightweight-adapter
# Sau khi merge, ưu tiên tag/commit đã review thay vì feature branch.
npm pack
npm install -g ./manhd_d-ai-harness-0.6.0.tgz

cd /path/to/my-backend
aih init --adapters java-spring --dry-run
aih init --adapters java-spring
aih check
aih new-change add-order
```

Sau khi cài, dùng `aih` từ bất kỳ repository ứng dụng nào. Đích mặc định là thư mục hiện tại;
`--target /path/to/project` vẫn được hỗ trợ. Thư mục đích phải tồn tại.
`aih --help` xem lệnh, `aih --version` xem phiên bản công cụ.

Cài bản đã phát hành từ npm bằng `npm install -g @manhd_d/ai-harness@0.6.0`; hoặc bỏ `@0.6.0` để lấy bản `latest` sau khi xác minh registry.
Có thể cài tarball vào devDependencies rồi dùng `npx --no-install aih init` nếu không muốn cài global.
Xem [hướng dẫn đóng gói/phát hành](docs/npm-release.md). Từ các phiên bản sau v0.6.0, Release Please tự đề xuất Release PR; sau khi bạn review/merge, GitHub Actions tự tạo tag/release và publish npm bằng OIDC trong workflow `npm-publish.yml` (không cần token/OTP).

Đây là cài **quy trình và context**, không scaffold source code Spring/React và không sửa build file.

## Hai chế độ tài liệu — Idea-driven / Document-driven

**Idea-driven:** Từ ý tưởng của developer → thảo luận → nghiên cứu có nguồn → PRD-lite hoặc BRD/PRD/SRS/use cases → duyệt → OpenSpec. **Document-driven:** Từ BRD/PRD/SRS/Confluence đã có của BA → kiểm tra source version, gap và traceability → technical spec và code. Không tự ghi đè tài liệu BA đã duyệt. Hai chế độ có thể sử dụng luân phiên trong cùng một dự án.

Xem hai hướng dẫn thực hành: [Bắt đầu từ ý tưởng](docs/examples/idea-driven-project.md) · [Dự án đã có tài liệu BA](docs/examples/document-driven-project.md). Xem thêm [Documentation workflows](docs/documentation-workflows.md) và [Confluence integration contract](integrations/confluence/README.md). `aih` only creates templates and ships instructions; AI host handles research/content, and external publishing requires independently authorized tooling.

```bash
aih init --capabilities product
aih new-doc idea       # docs/discovery/idea.md
aih new-doc research   # docs/discovery/research.md
aih new-doc prd-lite   # docs/product/prd-lite.md
aih new-doc srs        # docs/product/srs.md
aih new-doc use-cases  # docs/product/use-cases.md
```

## Product documentation capability — BA / PM / PO

Capability `product` cung cấp 5 role contracts, 13 skills, 5 workflows và 16 templates
để chuyển ý tưởng hoặc nguồn Confluence được cấp quyền thành BRD, PRD, user stories,
acceptance criteria và requirement traceability. Mọi tài liệu hoàn thiện là dữ liệu
**do dự án sở hữu**, nằm trong `docs/discovery/` (ý tưởng, nghiên cứu) hoặc `docs/product/` (yêu cầu) của repository ứng dụng.

```bash
# Khởi tạo dự án mới chỉ cần Product
aih init --capabilities product
# Kết hợp Product + UI/UX + React
aih init --capabilities product,uiux --adapters react-nextjs
# Tạo file mẫu để AI điền bằng tài liệu được cấp phép, không tự điền nội dung
aih new-doc brd
aih new-doc prd
aih new-doc backlog
aih new-doc acceptance-criteria
aih new-doc traceability
aih skills
aih skill harness-product-prd-generation
aih check
```

Dự án đã cài đặt cần sửa `.harness/project.json`, bổ sung `product` vào
`capabilities` rồi chạy `aih update --dry-run`, `aih update`, `aih check`.
CLI chỉ tạo **bản mẫu** khi dùng `new-doc`. Việc phân tích và điền nội dung cần
AI runtime có quyền đọc nguồn, kiểm tra bằng chứng và được BA/PM/PO phê duyệt.
Xem [Product capability](capabilities/product/README.md).

## Astro cho micro-tools, React Islands và Cloudflare

Chọn [adapter Astro](adapters/astro/README.md) nếu bạn làm trang công cụ nhỏ, SEO landing page hoặc portfolio nhiều utilities. **Static-first:** TypeScript/browser xử lý trước; React Islands chỉ cho UI tương tác; Cloudflare Workers/API và MFE chỉ khi có nhu cầu thực. Astro Islands không phải các micro frontend deploy độc lập. Xem [walkthrough đầy đủ](docs/examples/astro-micro-tools.md).

```bash
cd /path/to/existing-astro-project
aih resolve --adapters astro --capabilities product,uiux
aih init --adapters astro --capabilities product,uiux --dry-run
aih init --adapters astro --capabilities product,uiux
aih check
aih skills
aih skill harness-astro-project-architecture
aih skill harness-astro-islands
aih skill harness-astro-cloudflare
aih verify --scope all  # advisory; không tự chạy build/deploy
```

Không bắt buộc Product/UIUX; nếu chỉ cần code, dùng `aih init --adapters astro`. Trong dự án đã cài Harness: sửa `.harness/project.json` và chạy `aih update --dry-run`, `aih update`, `aih check`. `aih detect` nhận diện `astro` từ `package.json`; `react-dom` vì React Islands không tự khiến CLI cài `react-nextjs` trừ khi dự án còn dùng `next`. CLI chỉ cài rules/skills, **không** tạo Astro app, cài React hay deploy lên Cloudflare.

## Monetization — kiếm tiền hợp lệ từ quảng cáo

Capability `monetization` độc lập với Astro, React/Next.js và các adapter khác. Với website micro-tools miễn phí, ưu tiên **giá trị sản phẩm → SEO → kiểm tra AdSense/consent → ad placement an toàn → đo traffic và Page RPM thực tế**. Năm skills giúp phân tích các bước; không tự tạo tài khoản, xin duyệt site, nhúng ad code hoặc kéo doanh thu từ Google.

```bash
# Website Astro có mục tiêu doanh thu quảng cáo
aih resolve --adapters astro --capabilities monetization
aih init --adapters astro --capabilities monetization --dry-run
aih init --adapters astro --capabilities monetization
aih check
aih skill harness-monetization-adsense-integration
aih skill harness-monetization-ad-placement-ux
aih skill harness-monetization-analytics-revenue
aih verify --scope capabilities  # manual checklist, không chạy provider checks
```

Nếu cần Product + UI/UX thì chọn `--capabilities product,uiux,monetization`. Dự án đã cài Harness phải sửa `.harness/project.json`, rồi `aih update --dry-run`, `aih update`, `aih check`. Templates monetization nằm trong `.harness/capabilities/monetization/templates/`; tự copy vào `docs/monetization/` khi được quyền — `aih new-doc` chỉ dùng cho Product.

Hướng dẫn: [Monetization](docs/monetization.md) · [Astro + AdSense walkthrough](docs/examples/astro-adsense-microtools.md) · [Capability README](capabilities/monetization/README.md). Không hứa AdSense sẽ phê duyệt hay đảm bảo thu nhập; quảng cáo phải tuân thủ chính sách và không được nhầm với nút tool.

## Optional UI/UX capability

UI/UX là **capability** độc lập với technology adapter. Chọn khi cần chuyển ý tưởng, PRD hoặc
Confluence thành requirement, UX flow, screen inventory rồi tạo Figma bằng agent đã kết nối.
Không tự động gọi LLM, đọc Confluence hay viết Figma. Phải cấp quyền MCP cho host và duyệt trước
khi chỉnh sửa file Figma hoặc màn hình đã được duyệt.

```bash
# Dự án chỉ cần design, không cần adapter công nghệ
aih init --capabilities uiux

# Dự án vừa React vừa thiết kế UI/UX
aih init --adapters react-nextjs --capabilities uiux

# Sau khi cài, xem metadata kỹ năng trước, chỉ nạp nội dung khi cần
aih skills
aih skill harness-uiux-figma-design

# Bổ sung UI/UX vào một project đã cài: sửa mảng capabilities
# trong .harness/project.json, sau đó:
aih update --dry-run
aih update
aih check
```

`aih list` liệt kê cả adapters và capabilities; `aih skills` chỉ trả tên + mô tả,
`aih skill <name>` mới trả nội dung đầy đủ của skill đã cài và được lock. Không có network
download độc lập: npm tarball vẫn chứa mọi capability, nhưng dự án chỉ nhận capability đã chọn.
Xem [tài liệu capability](capabilities/uiux/README.md) và [quy trình docs-to-figma](capabilities/uiux/workflows/docs-to-figma.md).

## DevOps capability + Kubernetes adapter

`devops` cung cấp 6 skills cho CI/CD, Docker, release, infrastructure review,
observability và incident response, cùng 2 workflows có cổng phê duyệt.
`kubernetes` là adapter riêng cho manifest, Helm và rollout safety.

```bash
aih init --adapters java-spring,kubernetes --capabilities devops
# Kết hợp cả Product + UI/UX + DevOps
aih init --adapters java-spring,kubernetes --capabilities product,uiux,devops
aih skills
aih skill harness-devops-deployment
aih verify                  # chỉ gợi ý kiểm tra, không chạy
aih check
```

Các lệnh không gọi cloud API, không triển khai production hay cấp quyền kết nối.
Xem [DevOps capability](capabilities/devops/README.md) và [quy tắc adapters](docs/adapters.md).

## Module composition & evaluation (unreleased)

Module manifests có `module_version` và các metadata phụ thuộc, khuyến nghị, xung đột. Kiểm tra trước khi cài:

```bash
aih resolve --adapters java-spring,kubernetes --capabilities product,uiux,devops
aih verify --scope all     # checklist tư vấn, không chạy
aih eval --scope all       # báo cáo chưa chấm, không gọi model
```

Chế độ mặc định không có `--scope` vẫn chỉ gồm adapters. Foundation Hardening đã có trong source; người dùng registry cần kiểm tra version đã phát hành bằng `npm view @manhd_d/ai-harness version` để không nhầm với thay đổi mới chưa phát hành. Xem [release policy](docs/release-policy.md).

## Chọn adapter

| Dự án | `--adapters` |
| --- | --- |
| Java / Spring Boot | `java-spring` |
| React hoặc Next.js | `react-nextjs` |
| Astro micro-tools / static SEO | `astro` |
| React Native / Expo | `react-native` |
| Python AI, agent hoặc RAG | `ai-python` |
| Kubernetes / Helm workloads | `kubernetes` |
| Full-stack trong cùng repository | `java-spring,react-nextjs` |
| Chỉ core rules và workflow | Bỏ tùy chọn `--adapters` |

AI bằng Java có thể dùng `java-spring` cùng skill `harness-ai-evaluation`; không bắt buộc chuyển sang Python.
Với multi-repo, cài vào từng repo có thực hiện công việc. Ghi danh sách repo và thứ tự merge trong change.

## Nhận diện stack và dùng adapter

```bash
aih list
aih detect
aih init --detect --dry-run
aih init --detect
aih verify
aih eval
```

`detect` báo adapter đề xuất kèm bằng chứng; chỉ đọc file ngay trong thư mục đích, không quét đệ quy
monorepo. Dùng `--target apps/backend` cho từng module. Spring cần dấu hiệu Spring Boot trong Maven/Gradle;
React Native được phân biệt với web; AI/Python dựa trên tên thư viện trong pyproject/requirements.
Đây là heuristic: có thể bỏ sót dependency gián tiếp hoặc khớp comment. Review kết quả trước khi cài.
`init --detect` là lựa chọn chủ động; không tìm thấy stack thì dừng. `init` không có flag vẫn cài core-only.
Có thể dùng `--adapters` để chọn chính xác. Update giữ lựa chọn trong project.json, không tự nhận diện lại.

Mỗi adapter có `adapter.yaml`, `rules/`, `skills/`, `checks/verification.yaml` và `evals/cases.json`.
Skills của adapter đã chọn được cài vào `.agents/skills/harness-<adapter>-*`; Core giữ TDD/debug/review dùng chung.
`aih verify` chỉ xuất checklist và lệnh gợi ý, **không chạy test/build**. `aih eval` xuất tình huống và mẫu
báo cáo chưa chấm; `aih eval --report report.json` tổng hợp điểm có bằng chứng, **không gọi model**.
Xem [hướng dẫn adapter và đánh giá](docs/adapters.md) trước khi điền báo cáo.

## Dự án nhận những gì?

| Đường dẫn | Cách quản lý |
| --- | --- |
| `AGENTS.md` | Thêm/cập nhật một block có marker; giữ nguyên nội dung bên ngoài |
| `.harness/core/`, `adapters/`, `integrations/`, `templates/` | Snapshot framework, được lock bằng hash |
| `.agents/skills/harness-*/` | Skill dùng trong project; cách kích hoạt tùy assistant |
| `.harness/lock.json` | Version, adapters và SHA-256 của nội dung được quản lý |
| `.harness/project.json` | Dự án sở hữu; chọn adapter |
| `.harness/local.md` | Dự án sở hữu; domain, build command, convention riêng |
| `openspec/config.yaml` | Chỉ tạo nếu chưa có; giữ cấu hình hiện tại |
| `openspec/changes/<id>/` | Chỉ tạo khi gọi `new-change`; còn TODO cần hoàn thiện |

Commit các file đã cài vào repository ứng dụng để cả team dùng đúng một phiên bản. Không commit secrets.
Hãy hướng assistant đọc `AGENTS.md`; việc tự phát hiện file/skill phụ thuộc công cụ bạn sử dụng.
CLI không cấu hình tài khoản, plugin cá nhân hoặc MCP server của assistant.

## Tùy biến và cập nhật

Cài phiên bản công cụ mới trước, rồi chạy `aih update` trong từng dự án để cập nhật snapshot.
Lockfile từ CLI Python 0.1 vẫn được hỗ trợ; xem [migration](docs/versioning.md).

Thêm quy ước vào `.harness/local.md` hoặc phần ngoài marker trong `AGENTS.md`.
Muốn đổi stack: chỉnh mảng `adapters` trong `.harness/project.json`, rồi chạy update.

```bash
aih update --dry-run
aih update
aih check
aih doctor
```

Source mặc định là package đã cài chứa CLI; có thể dùng `--source /path/to/reviewed-checkout` với init/update.
Cập nhật dừng khi file managed bị sửa, không có chế độ force. Đưa tùy biến sang local.md rồi restore
file managed từ commit cài trước đó. Major upgrade cần `--allow-major`; downgrade dùng Git revert.
Dry-run không để lại thay đổi file, nhưng tạo/xóa marker khóa trong lúc lập kế hoạch nên cần quyền ghi.
Doctor chỉ kiểm tra tool có trên PATH; không xác nhận version hay build chạy thành công.

## OpenSpec

Framework tạo cấu trúc tương thích workflow `spec-driven` và không cài OpenSpec thay bạn.
`new-change` tạo proposal/design/tasks/delta spec bằng template đã pin trong project; đây là bản nháp.
Hoàn thiện TODO, review yêu cầu, rồi dùng OpenSpec CLI do dự án cài và pin phiên bản:

```bash
# Chạy tại repository ứng dụng sau khi cài OpenSpec theo hướng dẫn upstream.
openspec validate add-order --strict
```

Xem [docs/openspec.md](docs/openspec.md). Chỉ archive sau khi mọi PR liên quan đã merge.

## Kiểm thử

```bash
npm test
npm run validate
npm run test:package
```

Test CLI chạy offline trên thư mục tạm: cài/update, preservation, drift, collision, traversal/symlink,
adapter selection, version guard, reproducibility, rollback và tạo change. CI cấu hình Node.js 22/24 trên Linux và Windows.
[evals/README.md](evals/README.md) có bộ tình huống và công cụ tổng hợp đánh giá hành vi AI riêng.
Test CLI pass không có nghĩa đã chạy Spring/Next/native build hay live evaluation của LLM.

## License

Dự án được cấp phép theo [MIT License](LICENSE) — cho phép sử dụng, sửa đổi và phân phối (kể cả thương mại) theo các điều kiện trong giấy phép. Repository vẫn **private** và package npm đã cấu hình `public`; việc thêm license không tự thay đổi quyền truy cập hoặc phát hành package.

## Tài liệu

- [Getting started](docs/getting-started.md)
- [Documentation workflows](docs/documentation-workflows.md)
- [Walkthrough Idea-driven](docs/examples/idea-driven-project.md)
- [Walkthrough Document-driven](docs/examples/document-driven-project.md)
- [Astro micro-tool walkthrough](docs/examples/astro-micro-tools.md)
- [Website advertising monetization](docs/monetization.md)
- [Astro + AdSense walkthrough](docs/examples/astro-adsense-microtools.md)
- [Full SDLC](docs/end-to-end-workflow.md)
- [Skill matrix](docs/skill-matrix.md)
- [Agent handoffs](docs/agent-handoffs.md)
- [Kiến trúc và ranh giới trách nhiệm](docs/architecture.md)
- [Versioning và migration](docs/versioning.md)
- [CLI contract](docs/cli.md)
- [Phân tích workspace tham khảo](docs/reference-analysis.md)
- [Hướng dẫn đóng góp](CONTRIBUTING.md)
- [Thay đổi phiên bản](CHANGELOG.md)

`harness.yaml` cố ý dùng JSON-compatible YAML 1.2 để CLI đọc bằng `JSON.parse`. Không dùng cú pháp YAML
khác cho file này. `openspec/config.yaml` vẫn là YAML thông thường do OpenSpec đọc.
