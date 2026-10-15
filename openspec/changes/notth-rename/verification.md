# Verification: Notth rename

Base: fdcde5b32263b5a59d0482bce0e321903c7c2444 (main after v0.15.0).
Local verification: Linux, Node 24, 2026-10-15. Distribution remains 0.15.0; Release Please owns the next bump.

| Check | Result | Evidence |
| --- | --- | --- |
| npm test | PASS: 283 tests, zero failures | [raw output](evidence/test.txt) |
| npm run validate | PASS: offline structure/links | [raw output](evidence/validate.txt) |
| npm run check:release | PASS: same version, renamed npm metadata | [raw output](evidence/release.txt) |
| npm run test:package | PASS: real offline tarball/global shim/local npm exec | [raw output](evidence/package.txt) |
| python scripts/smoke-python.py | PASS: wheel/sdist bytes, offline install/update/reinstall, Node failure | [raw output](evidence/python.txt) |
| git diff --check | PASS | Local whitespace validation |

Regression: synthetic legacy manifest/name and AGENTS title update to Notth, exactly one managed
block remains, check passes, local.md/config and outside-block text survive, second update idempotent.
Original release fixtures remain unchanged, exercising older migration contracts too.

Read-only public registry lookup returned E404 for @manhd_d/notth; this does not reserve the name.
No new npm/PyPI publish, old-package deprecation, login, publisher configuration or native host/model
execution was performed. Windows/macOS tests were not run locally; CI supplies its declared matrix.
Branding does not change semantic AI instructions, so no new live-model effectiveness claim is made.
