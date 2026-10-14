# Verification

Source base: e83a70da108c662479da7efd8df545274c2a1f8f. Node.js 24.19.0 on Linux.
Source was retrieved through the authenticated GitHub connector because direct Git clone required
credentials unavailable to the shell. A local source snapshot was used for checks; its synthetic
baseline commit is not pushed. The remote feature commit uses the actual main commit as parent.

| Check | Result | Raw output |
| --- | --- | --- |
| npm test | PASS: 274 tests, 0 failures | [test](evidence/test.txt) |
| npm run validate | PASS: offline structure/links, no errors | [validate](evidence/validate.txt) |
| npm run test:package | PASS: real offline tarball/global/local install and new clone/setup/compact/decision smoke | [package](evidence/package.txt) |
| npm run check:release | PASS: metadata alignment; distribution remains 0.14.0 | [release](evidence/release.txt) |
| git diff --check | PASS | Reviewed locally before feature commit |

New tests exercise missing shared configs including project selection recovered from lock,
idempotency, exact snapshot/user/native preservation, preflight failures and ordinary rollback,
scoped decision filtering, supersession cycles/history, config backup/restore/transfer and freshness.
Existing regressions cover AGENTS integrity, structured context, Maven choices, Kiro wrappers/hooks,
external sidecars and MCP aliases. These are actual CLI/filesystem checks, not live-agent evidence.

NOT_RUN: logged-in Kiro client skill menu/SessionStart activation, live model following new workflows,
Windows/macOS execution, upstream OpenSpec CLI validation, cross-host native hook expansion and
token/time savings. No Kiro CLI/client is available here. New Core behavioral cases remain unscored;
follow [real-host protocol](../../../docs/session-onboarding.md#kiểm-chứng-bằng-host-thật) for independent
runtime evidence. Source/hash/schema declarations do not authenticate user approval or factual truth.

Migration/rollback: use a reviewed supporting CLI, backup → update --dry-run → update → check.
Preserve machine paths privately; old archives still restore, archives with the new decisions path
need the updated reader. Reconcile cache after decisions digest changes. Revert consumer snapshot
and config via Git/before-backup. No merge/tag/npm publish is performed by this feature.
