# Verification

Base: main 70fbfd1cf3ce9b0017a7d96743c4c304754c7fd3. The local baseline Git tree matched
988f7607f5fdb746341f725f9f2561a0ab73d3cf exactly; main rechecked unchanged before PR.

| Gate | Actual local result |
| --- | --- |
| npm test | 255 passed, 0 failed/skipped |
| npm run validate | status ok, zero errors; 7 Core skills |
| npm run check:release | status ok; distribution 0.14.0 unchanged; 14 module manifests valid |
| npm run test:package | status ok; real offline tarball, global/local install, end-user assets and host plan |
| git diff --check | passed |

23 new cases cover metadata tool/surface routing without forced installation, Core distribution,
legacy reports, requirement/surface scope, mocked/unknown dependency qualification, API/unit misuse,
transport-only false PASS, attachment digest/path/size/type/symlink constraints, credential-bearing URL
rejection, blockers and method/surface laundering. Report fixtures are validation data, not browser runs.

The first full suite found six old fixed Core skill-count assertions when the new skill was installed.
Updated those expectations to source Core count plus the selected declared module, retaining the actual
selection/preservation assertions. The final full suite is green. Existing actual isolated HTTP fixture
continues to test roles/state/read/owned cleanup; it is backend evidence, not browser/device evidence.

Package smoke confirms the new CLI modules/skill/workflow/docs ship and that a real installed Core
consumer discovers the end-user host plan without project dependencies. No runtime dependency or
network/browser/model executor was added to installer.

## Runtime limits

Actual Playwright library resolution succeeded in this host, but Chromium launch was BLOCKED: the
configured runtime browser executable/headless shell was absent. No browser E2E, screenshot/trace capture
or customer app journey PASS is claimed. No consumer app URL/test account was supplied. Native-device
and independent intended-host/model evaluations are NOT_RUN; two new behavioral cases remain unscored.
Upstream OpenSpec validation is NOT_RUN. Linux local checks do not substitute for the remote OS/Node CI.

Journey/dependency/actor/interaction and execution receipts are producer declarations. Digest/extension
checks do not authenticate execution, decode image/trace content or scrub binary secrets. Wrong/unknown
labels require independent raw-source/receipt review. UAT owner approval is separate.

## Migration and rollback

Reviewed snapshot update preserves user configs/docs/checkpoints; new Core skill is selective context
loaded for affected public journeys. React/Next.js and React Native modules 1.3.0 → 1.4.0. Reports retain
schema 1; new end-user fields opt in. Transport-only browser/device/CLI PASS now fails consistency
validation: rerun actual outcome assertions, never relabel transport proof to force green. Roll back
the consumer install commit and keep old report/evidence files. No merge/tag/release/npm publish.

## Local capture receipts

Raw output retained in scratch; CI provides accessible independent check evidence once its PR run
finishes. Hashes below identify local captures, not a claim that raw logs are published.

| Capture | SHA-256 |
| --- | --- |
| end-user-all.log | `0969c6093a720ab8b483367e9665ae622fa2f6e76f6668affd06d869762b19ec` |
| end-user-package.log | `67e2171dd2ae674b7bf4bc0fb2e6ec053c0abbbed32d977926725dea11ce91a3` |
| end-user-targeted.log | `0521f8ee5c211d5ed7f945f5fe13aa7d36d60ac0dd84ccd52508ccb0e41ec3af` |
