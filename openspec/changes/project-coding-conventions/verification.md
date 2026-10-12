# Verification evidence

Environment: Linux, Node v24.19.0. Source base: `2bd106a186e04cb8d616f3dd2e6cdad962ba76bd`.
These are author-run checks and self-review, not independent human or live-agent evaluation.

| Command | Observed outcome |
| --- | --- |
| `node --test tests/project-conventions.test.js tests/setup-readiness.test.js tests/composition.test.js` | 26 passed, 0 failed |
| `npm test` | 134 passed, 0 failed, 0 skipped |
| `npm run validate` | status ok; 6 adapters, 4 capabilities, 250 managed files; no errors |
| `npm run test:package` | status ok; 246 package files; offline tarball, global CLI and local npm exec checks passed |
| `git diff --check` | No whitespace errors |

The first full test run caught a stale assertion expecting four evaluation cases for Java/Spring plus
React Native. Each gained one new scenario, so the expected count was updated to six; the full rerun
passed. Package smoke likewise expects eleven cases for its four selected adapters and verifies the
new convention assets byte-for-byte in the actual installed package.

The eight new tests cover Core-only and three selective installs, legacy update preserving local.md
and unmanaged AGENTS content, read-only setup without guessed mode, advisory/unscored evaluation
and drift refusal, and installed design-template propagation. Existing migration/safety tests still pass.

Self-review confirmed mode is not inferred from stack detection; configured tools do not suppress the
host instruction to inspect conventions; existing project facts are preserved; public module boundaries
and security take precedence over blind reuse; and distribution version stays release-PR owned.

Limitations: no live-agent behavioral trials, no Windows or Node 22 local run, and no application lint,
native build or architecture enforcement is implied. The new behavioral cases require an actual target
host plus human-reviewed traces before reporting effectiveness. CI results are separate evidence.
