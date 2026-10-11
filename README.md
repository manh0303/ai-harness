# ai-harness

Framework tái sử dụng để hướng dẫn AI làm việc theo **Spec → Code → Test → Review** trong nhiều dự án.
Core dùng chung; adapter chứa quy chuẩn công nghệ; CLI cài một bản có version vào từng repository.

**Trạng thái:** 0.6.0 candidate, adapter + selective UI/UX capabilities và CLI Node.js 22+ với lệnh `aih`, không cần Python hay thư viện runtime ngoài.
Gói `@manh0303/ai-harness` chưa phát hành lên npm registry; hiện cài từ repository private hoặc tarball.
Harness không tự gọi LLM, không tự sinh ứng dụng, không tạo agent runtime, không tự merge/deploy.
Các role/skill hướng dẫn assistant đang dùng; quyền thực tế do IDE/runtime, Git và CI kiểm soát.

## Bắt đầu

Cài từ source đã review bằng tài khoản có quyền repository private:

```bash
git clone git@github.com:manh0303/ai-harness.git
cd ai-harness
# Khi review PR này: git switch feat/devops-capability-kubernetes
# Sau merge: checkout commit/tag đã review để pin phiên bản.
npm pack
npm install -g ./manh0303-ai-harness-0.6.0.tgz

cd /path/to/my-backend
aih init --adapters java-spring --dry-run
aih init --adapters java-spring
aih check
aih new-change add-order
```

Sau khi cài, dùng `aih` từ bất kỳ repository ứng dụng nào. Đích mặc định là thư mục hiện tại;
`--target /path/to/project` vẫn được hỗ trợ. Thư mục đích phải tồn tại.
`aih --help` xem lệnh, `aih --version` xem phiên bản công cụ.

Khi chủ sở hữu đã phát hành npm package và cấp quyền, cách cài sẽ là
`npm install -g @manh0303/ai-harness@0.6.0`. **Lệnh registry này chưa dùng được chỉ vì PR đã merge.**
Có thể cài tarball vào devDependencies rồi dùng `npx --no-install aih init` nếu không muốn cài global.
Xem [hướng dẫn đóng gói/phát hành](docs/npm-release.md).

Đây là cài **quy trình và context**, không scaffold source code Spring/React và không sửa build file.

## Product documentation capability — BA / PM / PO

Capability `product` cung cấp 5 role contracts, 9 skills, 3 workflows và 11 templates
để chuyển ý tưởng hoặc nguồn Confluence được cấp quyền thành BRD, PRD, user stories,
acceptance criteria và requirement traceability. Mọi tài liệu hoàn thiện là dữ liệu
**do dự án sở hữu**, nằm trong `docs/product/` của repository ứng dụng.

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

Chế độ mặc định không có `--scope` vẫn chỉ gồm adapters. Đây là hardening trên feature branch, chưa phát hành npm. Xem [release policy](docs/release-policy.md).

## Chọn adapter

| Dự án | `--adapters` |
| --- | --- |
| Java / Spring Boot | `java-spring` |
| React hoặc Next.js | `react-nextjs` |
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

Dự án được cấp phép theo [MIT License](LICENSE) — cho phép sử dụng, sửa đổi và phân phối (kể cả thương mại) theo các điều kiện trong giấy phép. Repository vẫn **private** và package npm vẫn ở chế độ `restricted`; việc thêm license không tự thay đổi quyền truy cập hoặc phát hành package.

## Tài liệu

- [Kiến trúc và ranh giới trách nhiệm](docs/architecture.md)
- [Versioning và migration](docs/versioning.md)
- [CLI contract](docs/cli.md)
- [Phân tích workspace tham khảo](docs/reference-analysis.md)
- [Hướng dẫn đóng góp](CONTRIBUTING.md)
- [Thay đổi phiên bản](CHANGELOG.md)

`harness.yaml` cố ý dùng JSON-compatible YAML 1.2 để CLI đọc bằng `JSON.parse`. Không dùng cú pháp YAML
khác cho file này. `openspec/config.yaml` vẫn là YAML thông thường do OpenSpec đọc.
