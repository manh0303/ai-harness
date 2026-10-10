# ai-harness

Framework tái sử dụng để hướng dẫn AI làm việc theo **Spec → Code → Test → Review** trong nhiều dự án.
Core dùng chung; adapter chứa quy chuẩn công nghệ; CLI cài một bản có version vào từng repository.

**Trạng thái:** 0.1.0, bản khởi đầu chờ review. Python 3.10+, không cần thư viện ngoài hoặc API key để dùng CLI.
Harness không tự gọi LLM, không tự sinh ứng dụng, không tạo agent runtime, không tự merge/deploy.
Các role/skill hướng dẫn assistant đang dùng; quyền thực tế do IDE/runtime, Git và CI kiểm soát.

## Bắt đầu

Clone repository private bằng tài khoản có quyền. Các lệnh bên dưới chạy từ thư mục ai-harness;
project đích phải tồn tại và nằm ngoài checkout framework.

```bash
git clone git@github.com:manh0303/ai-harness.git
cd ai-harness
# Trong giai đoạn review, checkout branch được cung cấp trong PR.
# Sau khi có release, pin tag hoặc commit đã review thay vì tự theo main.

python3 cli/harness.py init --target ../my-backend --adapters java-spring --dry-run
python3 cli/harness.py init --target ../my-backend --adapters java-spring
python3 cli/harness.py check --target ../my-backend
python3 cli/harness.py new-change add-order --target ../my-backend
```

Có thể chạy `python3 -m cli ...` khi đứng ở root framework. Không có package công khai trên PyPI/npm.
Đây là cài **quy trình và context**, không scaffold source code Spring/React và không sửa build file.

## Chọn adapter

| Dự án | `--adapters` |
| --- | --- |
| Java / Spring Boot | `java-spring` |
| React hoặc Next.js | `react-nextjs` |
| React Native / Expo | `react-native` |
| Python AI, agent hoặc RAG | `ai-python` |
| Full-stack trong cùng repository | `java-spring,react-nextjs` |
| Chỉ core rules và workflow | Bỏ tùy chọn `--adapters` |

AI bằng Java có thể dùng `java-spring` cùng skill `harness-ai-evaluation`; không bắt buộc chuyển sang Python.
Với multi-repo, cài vào từng repo có thực hiện công việc. Ghi danh sách repo và thứ tự merge trong change.

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

Thêm quy ước vào `.harness/local.md` hoặc phần ngoài marker trong `AGENTS.md`.
Muốn đổi stack: chỉnh mảng `adapters` trong `.harness/project.json`, rồi chạy update.

```bash
python3 cli/harness.py update --target ../my-backend --dry-run
python3 cli/harness.py update --target ../my-backend
python3 cli/harness.py check --target ../my-backend
python3 cli/harness.py doctor --target ../my-backend
```

Source mặc định là checkout chứa CLI; có thể dùng `--source /path/to/reviewed-checkout` với init/update.
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
python3 -m unittest discover -s tests -v
python3 scripts/validate.py
```

Test CLI chạy offline trên thư mục tạm: cài/update, preservation, drift, collision, traversal/symlink,
adapter selection, version guard, reproducibility, rollback và tạo change. CI cấu hình Python 3.10/3.12/3.13.
[evals/README.md](evals/README.md) có bộ tình huống và công cụ tổng hợp đánh giá hành vi AI riêng.
Test CLI pass không có nghĩa đã chạy Spring/Next/native build hay live evaluation của LLM.

## Tài liệu

- [Kiến trúc và ranh giới trách nhiệm](docs/architecture.md)
- [Versioning và migration](docs/versioning.md)
- [CLI contract](docs/cli.md)
- [Phân tích workspace tham khảo](docs/reference-analysis.md)
- [Hướng dẫn đóng góp](CONTRIBUTING.md)
- [Thay đổi phiên bản](CHANGELOG.md)

`harness.yaml` cố ý dùng JSON-compatible YAML 1.2 để CLI chỉ cần Python stdlib. Không dùng cú pháp YAML
khác cho file này. `openspec/config.yaml` vẫn là YAML thông thường do OpenSpec đọc.
