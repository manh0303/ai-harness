# Walkthrough 3 — React Native/Expo: permission, offline và release

**Tình huống giả định:** thêm màn hình lưu nháp khi offline và đồng bộ lại khi có mạng trong ứng dụng React Native/Expo đã tồn tại. Đây là hướng dẫn công việc, **không** scaffold app, không dùng Kubernetes cho ứng dụng di động.

## 1. Init

~~~bash
cd /path/to/existing-react-native-app
aih resolve --adapters react-native --capabilities product,uiux
aih init --adapters react-native --capabilities product,uiux --dry-run
aih init --adapters react-native --capabilities product,uiux
aih check
aih skills
~~~

Nếu chỉ sửa một lỗi offline đã có ticket/AC duyệt, có thể bỏ Product và UI/UX không cần thiết, giữ Core + React Native. `aih detect` có thể nhận React Native/Expo tại thư mục target chứa `package.json`, không tự quét monorepo.

## 2. Requirements & UX

- BA/PO mô tả business rule: trạng thái draft, server authoritative fields, replay/dedupe, login/logout giữa chừng, đa thiết bị, mất mạng và dữ liệu nhạy cảm.
- Tạo draft Product theo [getting started](../getting-started.md); duyệt story/AC trước khi design.
- `harness-uiux-user-flow` và `harness-uiux-screen-planning` mô tả offline banner, pending queue, syncing, conflict, retry, auth expired và error accessibility.
- Figma chỉ ghi khi có MCP quyền hợp lệ và gate. Khi không có Figma, Markdown screen specs vẫn là bàn giao hợp lệ.

## 3. Spec và code

~~~bash
aih new-change offline-draft-sync
aih skill harness-spec
aih skill harness-tdd
aih skill harness-react-native-offline-sync
aih skill harness-react-native-device-permissions
~~~

- `offline-sync`: định nghĩa local persistence encryption/retention, idempotency key, queue/retry backoff, conflict resolution và đồng bộ lại khi token hết hạn.
- `device-permissions`: chỉ cần nếu feature có camera/location/notification/deep link; kiểm tra iOS và Android riêng, fallback khi từ chối permission.
- Spec chứa test matrix: airplane mode, offline restart, duplicate request, conflict, revoke session, low storage và app update.
- Không log token/customer payload, không giả định AsyncStorage/SecureStore đã được chọn; dùng stack đang có.

**Verification** — tùy project scripts/toolchain, không được Harness thực thi:

~~~bash
# Chỉ chạy sau khi xác nhận có scripts tương ứng trong package.json
npm test
# Expo / device build và kiểm thử emulator/thiết bị cần setup riêng
~~~

Ngoài unit tests, report thiết bị/OS và test thật trên iOS/Android, permissions denied, offline transitions và accessibility evidence.

## 4. PR và phát hành

- `harness-review` và `security-reviewer` kiểm tra mã hóa/scope lưu local, auth và routing.
- `aih verify --scope all` chỉ tạo checklist; đính kèm kết quả build/device tests thực chạy.
- Nếu dùng `devops`, đây là **release planning** chung, không phải auto publish App Store/Play Store. Approval theo signing credentials/store policy nằm ngoài `aih`.
- Nếu app phụ thuộc backend API, xác nhận contract tương thích và liên kết PR khác repo; không stage backend từ repo mobile.

**Handoff:** approved user stories/AC → offline flows → OpenSpec → persistence/sync implementation → device test evidence → reviewed PR → authorized mobile release.
