# Bắt đầu một nhiệm vụ

**Kiro: init --host kiro → session đầu tiên → /harness-start.**
Kiro tự khảo sát và hỏi trong chat; [cài/upgrade/offline](tool-setup/kiro.md).
`start --host kiro` trả plan, không phỏng vấn trong terminal. Session sau kiểm tra freshness
và chỉ bổ sung context bị ảnh hưởng. [Seed và contracts](session-onboarding.md).

**Host khác: init → start → làm việc trong AI tool.** Sau cài đặt, chạy trong project root:

```bash
npx --yes @manhd_d/ai-harness start
```

Terminal tương tác hỏi mục tiêu và task, input còn thiếu, nơi lưu draft docs khi cần.
Có cấu hình input/output thì không hỏi lại. Có task đã lưu thì chọn tiếp tục hoặc nhiệm vụ mới;
model/agent giữ mặc định của host trừ khi bạn muốn cấu hình khác. Lựa chọn được lưu trong
`.harness/start.json` và `.harness/artifacts.json`; thay cấu hình hiện có tạo backup trước.

Không có TTY (CI/pipe), `start` chỉ xuất JSON plan và không chờ stdin hoặc tự ghi lựa chọn.
Có thể lưu lựa chọn bằng flags:

```bash
aih start --goal docs --task "Implement approved requirements" --input docs/requirements --output docs/specs
aih start --goal change --task "Fix pagination"
aih start --goal resume --task "Continue the reviewed task" --change add-order
```

Goal: `idea`, `docs`, `change`, `resume`. Resume cần checkpoint/evidence đã có, kiểm tra freshness và
side effects trước tiếp tục. --input nhận đường dẫn tương đối hoặc HTTPS URL không chứa credentials;
--output chỉ nhận folder docs tương đối. Flags input/output chỉ seed khi chưa có khai báo; muốn sửa
nguồn cũ, review artifacts.json trực tiếp. Start không tự đọc tài liệu ngoài repo, không phê duyệt
nghiệp vụ hay thực thi command/model. Metadata discovery không chứng minh nội dung nguồn đúng.

Copy `host_prompt` từ kết quả vào AI tool đang mở cùng project. Host đọc task, cấu hình, nguồn và code;
hỏi tối đa 1–3 quyết định còn thiếu mỗi lượt với phương án và đề xuất có lý do. Dùng workflow/agent/skill
phù hợp đã cài; module thiếu phải được đề xuất rõ trước thay selection. Tiếp tục thực hiện khi scope và
quyền đã đủ. Root-file probes không thay thế khảo sát monorepo hoặc đọc tài liệu trong host.

Nếu bạn có nguồn/link/mô tả tự do hoặc cần output bên ngoài, đưa cho AI trong cuộc thảo luận và lưu
quyết định vào artifacts.json/integrations.json/local.md. Terminal hỏi đáp ngắn; phần BA/thiết kế nằm
trong AI tool. Core skill harness-start là điểm vào onboarding; menu slash native phụ thuộc host.

[File cấu hình, backup, cài lại và chuyển dự án](configuration-backup.md) · [AI tool setup](tool-setup/README.md).
