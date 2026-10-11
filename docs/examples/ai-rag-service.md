# Walkthrough 4 — Python AI/RAG service có kiểm soát truy cập

**Tình huống giả định:** API hỏi đáp tri thức doanh nghiệp (Confluence/PDF) với quyền theo tenant/nhóm, citations, tool calling có giới hạn và AI quality gates. Nếu tài liệu ít, **không cần RAG**; trước tiên đo chất lượng retrieval và quyết định phương án phù hợp.

## 1. Init theo phạm vi

~~~bash
cd /path/to/existing-python-ai-service
aih resolve --adapters ai-python --capabilities product,devops
aih init --adapters ai-python --capabilities product,devops --dry-run
aih init --adapters ai-python --capabilities product,devops
aih check
aih skills
~~~

Nếu AI application triển khai trên Kubernetes, cân nhắc thêm adapter `kubernetes`. Các framework Python, vector DB và API key **không** được `aih` cài/cấp. Dùng `java-spring` thêm nếu service thực tế viết bằng Spring Boot thay vì Python; `ai-python` không phải bắt buộc cho mọi AI application.

## 2. Business/data intake và security gate

- BA/PO ghi nguồn tài liệu, owner, tenant/scope, revision, retention, consent và loại dữ liệu nhạy cảm; output là `source-register` và các `FR/NFR/AC` được duyệt.
- Design nêu rõ boundary: caller identity → authorized retrieval filter → chunk/citation → grounded answer, deny-by-default và audit metadata tối thiểu.
- Test scenarios: tenant A tìm thấy document B có độ giống cao vẫn **không lộ nội dung B**, missing access claim, prompt injection trong retrieved text, stale sources, no-evidence abstention, latency/cost budgets.
- Không upload tài liệu bí mật vào eval fixtures; dùng synthetic corpus với auth giả lập.

## 3. Spec & implementation

~~~bash
aih new-change authorized-knowledge-search
aih skill harness-spec
aih skill harness-tdd
aih skill harness-ai-python-rag-access
aih skill harness-ai-python-tool-safety
aih skill harness-ai-evaluation
~~~

- `rag-access`: filter ACL **trước khi tài liệu được trả về model**, kết quả có source chunk/revision, giữ cross-tenant isolation; không dựa vào prompt "đừng tiết lộ".
- `tool-safety`: schema, allowlist, scoped credentials, bounded timeout/token/cost, human approval cho mutation, test denied actions.
- `harness-ai-evaluation`: versioned datasets, recall/groundedness/citation accuracy, denied leakage, regressions, latency/cost. Define measurement trước khi thử provider.
- Với project có nhiều trang tài liệu mới cần index hoặc phân vùng semantic search, tách pipeline ingestion/retention và ACL ở storage/retriever. Mô tả nguồn nào thực sự truy cập được.

## 4. Tests và LLM evaluation

~~~bash
# Thực hiện ở môi trường disposable sau khi xác nhận tool/test deps của repo:
# python -m pytest  # chỉ khi dependency pytest đã cài và repo sử dụng nó
aih verify --scope all
aih eval --scope all
aih check
~~~

`aih eval --scope all` cung cấp cases/report chưa chấm; chạy model/tập dữ liệu kiểm thử **bên ngoài CLI**, ghi trace đã redact và reviewer điền report. Báo real pass/fail; **không dùng synthetic score của unit test như bằng chứng model đạt chất lượng**. Kịch bản cross-module DevOps xuất hiện nếu chọn và phù hợp.

## 5. PR → deployment/operations

- PR chứa OpenSpec change, ACL tests, retrieved citation evidence, eval threshold results, cost/latency assumptions, prompt-injection defense và failures.
- `harness-devops-ci-cd` / `harness-devops-deployment` lên kế hoạch artifact/staging/rollback. `harness-devops-observability` nêu access-deny counters, retrieval failures, token/cost, latency, errors, SLO.
- Secrets thuộc secret manager/runtime, không hardcode vào prompts, report hoặc Git. Production deploy chỉ khi có authorization riêng.
- Sau rollout, theo dõi drift source revision, tenant leak alerts và versioned dataset regressions.

**Handoff:** approved data-use rules → retrieval design → OpenSpec → ACL-enforced RAG and tool wrappers → human-reviewed model evidence → PR → controlled deployment/monitoring.
