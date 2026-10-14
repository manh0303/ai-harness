# Verification

Source base: 9f190806cfa4580c20604395706a185151357808. Completed 2026-10-14 in Linux/Node environment.

| Check | Result | Evidence |
| --- | --- | --- |
| npm test | PASS, 266 tests, 0 failures | [Raw log](evidence/test.txt) |
| npm run validate | PASS, no errors, 8 Core skills | [Raw log](evidence/validate.txt) |
| npm run test:package | PASS, 360 packaged files; real offline pack/global/local install | [Raw log](evidence/package.txt) |
| npm run check:release | PASS; distribution 0.14.0 unchanged | [Raw log](evidence/release.txt) |
| Final README/documentation tests | PASS, 26 tests after quick-start reorder | node --test tests/documentation.test.js tests/agent-first.test.js |
| Real terminal TTY start --host kiro | PASS; stdin/stdout both TTY, emitted JSON and exited 0 without interview | Manual isolated temporary consumer, cleaned after run |
| git diff --check | PASS | Local diff inspection |

New behavior coverage: native wrappers/hook/retention, unmanaged collisions, edited managed hook,
dry-run/ordinary write rollback, standard/JSON YAML and legacy prose, source additions/deletions/edits,
code/machine exclusion, unsafe/private/symlink/tampered inputs, prerequisite presence without secret values,
MCP runtime unverified, extension load order/missing/transfer filtering, missing-only proposal sidecars,
alias-only MCP import/collisions/disabled servers/private-value omission, and packaged seed/doctor/update.

NOT_RUN: logged-in Kiro IDE/CLI/Web skill menu/SessionStart activation, live model semantic adherence,
upstream OpenSpec validator, Windows/macOS runtime and token/cost measurements. Official host schemas
were checked; passing local tests is not proof of live host behavior. CI owns the supported OS/Node matrix.
No merge, tag, npm publish or distribution version bump performed. Release Please remains the release owner.
