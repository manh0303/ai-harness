# Skill matrix — 53 skills, 11 nhóm module

Đây là bảng tra cứu **ID thật** theo `SKILL.md` trong source trên `main` (5 Core, 30 capability, 18 adapter). Dùng khi cần chuyển từ [Full SDLC](end-to-end-workflow.md) tới một skill cụ thể, không nạp toàn bộ 53 skill vào prompt.

**Cách dùng:** `aih skills` xem skills đã cài, sau đó `aih skill harness-...` lấy nội dung. Danh mục này mô tả chức năng; **không** có nghĩa `aih` thực thi skills hoặc agent. Tech adapters và capabilities chỉ xuất hiện trong consumer khi được chọn; Core dùng chung.

| Stage | Chọn module | Vai trò/output mong đợi |
| --- | --- | --- |
| Discovery → Product | `product` | Source register, BRD/PRD, AC, backlog, traceability |
| UX → Figma | `uiux` | Flows, screen specs, tokens, design review |
| Spec → Code → Review | Core + adapter theo stack | OpenSpec, tests, changes, review evidence |
| Release → Operate | `devops`, `kubernetes` khi phù hợp | CI, container, manifests, rollout và SLO plan |
| Traffic → Publisher Revenue | `monetization` (optional) | SEO growth, AdSense readiness, UX/consent checks, Page RPM review |

## Core (5)

| Skill ID (nguồn) | Khi nào dùng | Mục đích | Output mong đợi |
| --- | --- | --- | --- |
| [`harness-ai-evaluation`](../core/skills/harness-ai-evaluation/SKILL.md) | QA, AI eval | Đánh giá kết quả AI với dataset và ngưỡng đã review | Report chất lượng AI, regressions, release decision |
| [`harness-debugging`](../core/skills/harness-debugging/SKILL.md) | Bugfix | Tái hiện và phân tích lỗi trước khi sửa | Reproduction, root-cause evidence, regression |
| [`harness-review`](../core/skills/harness-review/SKILL.md) | Review | Đối chiếu diff với spec và rủi ro bảo mật | Severity findings, test coverage, recommendation |
| [`harness-spec`](../core/skills/harness-spec/SKILL.md) | Technical design | Soạn OpenSpec proposal/design/tasks/delta specs | OpenSpec change và các quyết định còn thiếu |
| [`harness-tdd`](../core/skills/harness-tdd/SKILL.md) | Implementation | Red → green → refactor trên slice nhỏ | Code + test evidence |

## Product capability (13)

| Skill ID (nguồn) | Khi nào dùng | Mục đích | Output mong đợi |
| --- | --- | --- | --- |
| [`harness-product-acceptance-criteria`](../capabilities/product/skills/harness-product-acceptance-criteria/SKILL.md) | Requirements | Viết AC Given/When/Then và negative cases | `docs/product/acceptance-criteria.md` |
| [`harness-product-backlog-prioritization`](../capabilities/product/skills/harness-product-backlog-prioritization/SKILL.md) | Planning | Ưu tiên backlog dựa trên tiêu chí minh bạch | Backlog có rationale, dependencies |
| [`harness-product-brd-generation`](../capabilities/product/skills/harness-product-brd-generation/SKILL.md) | Business | Sinh bản nháp BRD gắn source IDs | `docs/product/brd.md` và business rules |
| [`harness-product-business-analysis`](../capabilities/product/skills/harness-product-business-analysis/SKILL.md) | Discovery | Phân tích AS-IS/TO-BE, actors, rules, NFR | Requirement inventory, decisions |
| [`harness-product-document-review`](../capabilities/product/skills/harness-product-document-review/SKILL.md) | Product QA | Kiểm tra tài liệu trước human approval | Review findings, rework/ready-for-review |
| [`harness-product-knowledge-analysis`](../capabilities/product/skills/harness-product-knowledge-analysis/SKILL.md) | Intake | Tổng hợp Confluence, notes, PDF theo nguồn | Source register, open questions |
| [`harness-product-prd-generation`](../capabilities/product/skills/harness-product-prd-generation/SKILL.md) | Product | Soạn PRD với scope, outcome và metrics | `docs/product/prd.md` |
| [`harness-product-traceability`](../capabilities/product/skills/harness-product-traceability/SKILL.md) | Change impact | Liên kết nguồn → stories → UI → spec | `docs/product/traceability.md` |
| [`harness-product-user-stories`](../capabilities/product/skills/harness-product-user-stories/SKILL.md) | Backlog | Phân rã epics/stories theo yêu cầu duyệt | `docs/product/backlog.md` |

| [`harness-product-idea-discovery`](../capabilities/product/skills/harness-product-idea-discovery/SKILL.md) | Idea-driven | Cùng developer làm rõ ý tưởng, phương án, MVP và quyết định | `docs/discovery/idea.md` |
| [`harness-product-product-research`](../capabilities/product/skills/harness-product-product-research/SKILL.md) | Research | Tìm và phân loại bằng chứng đáng tin cậy, trade-offs | `docs/discovery/research.md` |
| [`harness-product-srs-generation`](../capabilities/product/skills/harness-product-srs-generation/SKILL.md) | Software requirements | Đặc tả FR/NFR, giao diện, luồng lỗi có trace ID | `docs/product/srs.md` |
| [`harness-product-use-case-generation`](../capabilities/product/skills/harness-product-use-case-generation/SKILL.md) | Detailed flows | Viết UC chính/phụ/lỗi liên kết FR/US/AC | `docs/product/use-cases.md` |

## Monetization capability (5)

| Skill ID (nguồn) | Khi nào dùng | Mục đích | Output mong đợi |
| --- | --- | --- | --- |
| [`harness-monetization-adsense-integration`](../capabilities/monetization/skills/harness-monetization-adsense-integration/SKILL.md) | Publisher integration | AdSense readiness, publisher ID thực, ads.txt và review-gated setup | Site monetization plan |
| [`harness-monetization-ad-placement-ux`](../capabilities/monetization/skills/harness-monetization-ad-placement-ux/SKILL.md) | Ad UI/UX | Tránh click nhầm, xung đột Generate/Download và layout shift | Ad placement review |
| [`harness-monetization-seo-growth`](../capabilities/monetization/skills/harness-monetization-seo-growth/SKILL.md) | Organic acquisition | Search intent và nội dung hữu ích, không tạo thin/spam pages | SEO experiments backlog |
| [`harness-monetization-analytics-revenue`](../capabilities/monetization/skills/harness-monetization-analytics-revenue/SKILL.md) | Traffic and revenue | Page RPM, nguồn dữ liệu thực vs dự phóng, hosting/API costs | Analytics report |
| [`harness-monetization-publisher-compliance`](../capabilities/monetization/skills/harness-monetization-publisher-compliance/SKILL.md) | Policy/consent | Invalid traffic, consent/CMP khu vực, publisher policies | Privacy + consent checklist |

## UI/UX capability (6)

| Skill ID (nguồn) | Khi nào dùng | Mục đích | Output mong đợi |
| --- | --- | --- | --- |
| [`harness-uiux-design-review`](../capabilities/uiux/skills/harness-uiux-design-review/SKILL.md) | Design review | Kiểm tra Figma về coverage và accessibility | Findings gắn requirement/node |
| [`harness-uiux-design-system`](../capabilities/uiux/skills/harness-uiux-design-system/SKILL.md) | UI system | Token ngữ nghĩa, component reuse | Design tokens và component inventory |
| [`harness-uiux-figma-design`](../capabilities/uiux/skills/harness-uiux-figma-design/SKILL.md) | Design | Tạo frame editable khi host có Figma và quyền ghi | Figma node/screen mapping |
| [`harness-uiux-requirements-analysis`](../capabilities/uiux/skills/harness-uiux-requirements-analysis/SKILL.md) | UX intake | Trích xuất yêu cầu UI có nguồn nếu cần | UI requirement IDs, unknowns |
| [`harness-uiux-screen-planning`](../capabilities/uiux/skills/harness-uiux-screen-planning/SKILL.md) | UX planning | Lập screen inventory và các states | Screen specs, requirement-to-screen |
| [`harness-uiux-user-flow`](../capabilities/uiux/skills/harness-uiux-user-flow/SKILL.md) | UX planning | Vẽ nhánh hành trình/navigation và edge cases | User-flow spec |

## DevOps capability (6)

| Skill ID (nguồn) | Khi nào dùng | Mục đích | Output mong đợi |
| --- | --- | --- | --- |
| [`harness-devops-ci-cd`](../capabilities/devops/skills/harness-devops-ci-cd/SKILL.md) | Delivery | Review pipeline reproducible, least-privilege | CI plan, artifact promotion gates |
| [`harness-devops-deployment`](../capabilities/devops/skills/harness-devops-deployment/SKILL.md) | Release | Chọn rollout, abort/rollback rules | Release/rollback checklist |
| [`harness-devops-docker`](../capabilities/devops/skills/harness-devops-docker/SKILL.md) | Container | Review Dockerfile, provenance, runtime security | Container findings và scan plan |
| [`harness-devops-incident-response`](../capabilities/devops/skills/harness-devops-incident-response/SKILL.md) | Operations | Incident triage và postmortem bằng evidence | Incident timeline, approved actions |
| [`harness-devops-infrastructure`](../capabilities/devops/skills/harness-devops-infrastructure/SKILL.md) | IaC | Review infrastructure blast radius và quyền | Infrastructure diff/risk/approval plan |
| [`harness-devops-observability`](../capabilities/devops/skills/harness-devops-observability/SKILL.md) | Operations | SLI/SLO, logs, metrics, traces, alerts | Telemetry và alert spec |

## Java Spring adapter (3)

| Skill ID (nguồn) | Khi nào dùng | Mục đích | Output mong đợi |
| --- | --- | --- | --- |
| [`harness-java-spring-database-migration`](../adapters/java-spring/skills/harness-java-spring-database-migration/SKILL.md) | DB change | Expand/migrate/contract theo release tương thích | Versioned migration và recovery evidence |
| [`harness-java-spring-kafka-outbox`](../adapters/java-spring/skills/harness-java-spring-kafka-outbox/SKILL.md) | Async events | Outbox transaction và consumer dedupe | Event implementation + failure tests |
| [`harness-java-spring-spring-api`](../adapters/java-spring/skills/harness-java-spring-spring-api/SKILL.md) | Backend API | Authorization resource scoped, API contract | Endpoint + auth/contract tests |

## React / Next.js adapter (2)

| Skill ID (nguồn) | Khi nào dùng | Mục đích | Output mong đợi |
| --- | --- | --- | --- |
| [`harness-react-nextjs-accessible-ui`](../adapters/react-nextjs/skills/harness-react-nextjs-accessible-ui/SKILL.md) | Frontend | UI states và semantic accessibility | UI + accessibility/browser evidence |
| [`harness-react-nextjs-server-boundaries`](../adapters/react-nextjs/skills/harness-react-nextjs-server-boundaries/SKILL.md) | Frontend security | Server actions, auth/caching boundaries | Server/client diff + auth/cache tests |

## React Native adapter (2)

| Skill ID (nguồn) | Khi nào dùng | Mục đích | Output mong đợi |
| --- | --- | --- | --- |
| [`harness-react-native-device-permissions`](../adapters/react-native/skills/harness-react-native-device-permissions/SKILL.md) | Mobile | Permissions + deep links theo OS | Permission/nav changes + platform tests |
| [`harness-react-native-offline-sync`](../adapters/react-native/skills/harness-react-native-offline-sync/SKILL.md) | Mobile | Offline queue, retries, conflict resolution | Persistence/sync + edge-case tests |

## Python AI adapter (2)

| Skill ID (nguồn) | Khi nào dùng | Mục đích | Output mong đợi |
| --- | --- | --- | --- |
| [`harness-ai-python-rag-access`](../adapters/ai-python/skills/harness-ai-python-rag-access/SKILL.md) | RAG | Áp dụng ACL/tenant filters trước retrieval | Access-filtered retrieval + groundedness plan |
| [`harness-ai-python-tool-safety`](../adapters/ai-python/skills/harness-ai-python-tool-safety/SKILL.md) | Agent tools | Bounded tools, explicit auth, no escalation | Policy wrapper + security tests |


## Astro adapter (6)

| Skill ID (nguồn) | Khi nào dùng | Mục đích | Output mong đợi |
| --- | --- | --- | --- |
| [`harness-astro-project-architecture`](../adapters/astro/skills/harness-astro-project-architecture/SKILL.md) | Tool architecture | Static-first, tách route/tool và browser processing | Cấu trúc Astro và ADR nhỏ |
| [`harness-astro-islands`](../adapters/astro/skills/harness-astro-islands/SKILL.md) | React Islands | Hydrate tương tác có chọn lọc, không nhầm Islands với MFE | Island component và UX tests |
| [`harness-astro-seo`](../adapters/astro/skills/harness-astro-seo/SKILL.md) | SEO | Metadata, sitemap, nội dung hữu ích và a11y | Trang có metadata và kiểm chứng HTML |
| [`harness-astro-performance`](../adapters/astro/skills/harness-astro-performance/SKILL.md) | Performance | JS budget, lazy loading, Web Vitals thực đo | Benchmark/build evidence |
| [`harness-astro-cloudflare`](../adapters/astro/skills/harness-astro-cloudflare/SKILL.md) | Deploy | Static/CDN trước, Workers khi cần backend có kiểm soát | Kế hoạch Cloudflare và approval |
| [`harness-astro-microfrontend`](../adapters/astro/skills/harness-astro-microfrontend/SKILL.md) | Scale | Lộ trình tách công cụ thành deploy riêng nếu thực cần | ADR/MFE migration checklist |

## Kubernetes adapter (3)

| Skill ID (nguồn) | Khi nào dùng | Mục đích | Output mong đợi |
| --- | --- | --- | --- |
| [`harness-kubernetes-helm-release`](../adapters/kubernetes/skills/harness-kubernetes-helm-release/SKILL.md) | K8s packaging | Helm lint/template, version pin, hooks/CRDs | Chart diff + upgrade/rollback plan |
| [`harness-kubernetes-rollout-safety`](../adapters/kubernetes/skills/harness-kubernetes-rollout-safety/SKILL.md) | K8s delivery | Rollout SLO/abort/rollback with migrations | Rollout gates + safety checklist |
| [`harness-kubernetes-workload-review`](../adapters/kubernetes/skills/harness-kubernetes-workload-review/SKILL.md) | K8s workload | Probes, RBAC, resources, GitOps compatibility | Manifest review với severity và evidence |

## Quy tắc phối hợp

- `product` → `uiux`: chỉ chuyển approved BRD/PRD và stable IDs; không tự duyệt hộ stakeholder.
- `uiux` → `react-nextjs` / `react-native`: dùng screen specs/design tokens được duyệt, không suy đoán design chỉ từ screenshot.
- `harness-spec` → technology skills: OpenSpec tasks có acceptance scenarios, test boundaries và NFRs.
- `monetization` + Astro/React/UIUX: chia sẻ UX, SEO, consent và dữ liệu doanh thu; không tự nhúng quảng cáo hay tự phê duyệt AdSense.
- `devops` + `kubernetes`: DevOps lo release strategy và permission gates, Kubernetes lo manifests/Helm. Không tự deploy.
- `harness-ai-evaluation` đánh giá **hành vi AI thực tế**; `aih eval` chỉ xuất và tổng hợp report do reviewer điền.

Đối chiếu [Agent handoffs](agent-handoffs.md), [adapters](adapters.md) và [full workflow](end-to-end-workflow.md). Khi thêm skill mới, hãy cập nhật một hàng trong bảng; test tài liệu sẽ báo thiếu/trùng.
