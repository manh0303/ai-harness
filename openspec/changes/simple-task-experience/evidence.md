# Verification evidence

Baseline/tag v0.17.0: 11d662c9064cc989373e36b8c546cfb323a9b023. Execution: Linux, Node v24.19.0.
Changed behavior/assets/tests are recorded in [source digests](evidence/source-digests.json).

| Check | Result | Evidence |
| --- | --- | --- |
| npm test | PASS: 311 tests, zero failed/skipped | [raw log](evidence/tests.txt) |
| npm run validate | PASS: 6 adapters, 8 capabilities, 346 managed files with all adapters | [raw log](evidence/validate.txt) |
| npm run test:package | PASS: 393 package files, real offline npm install; packaged chat/human commands | [raw log](evidence/package.txt) |
| npm run check:release | PASS: distribution stays 0.17.0, 14 modules | [metadata log](evidence/metadata.txt) |
| npm run test:python | PASS: offline wheel/sdist, byte parity and update preservation | [raw log](evidence/python.txt) |
| Upgrade from v0.17.0 | PASS: 25 changed files in Core/Codex/UIUX consumer; project local.md preserved, check ok | Manual isolated consumer procedure below |
| git diff --check | PASS | Executed before commit |
| Live Codex/Claude/Kiro | NOT_RUN | Executable lookup found none; no external model invoked |
| Windows / other Node versions | NOT_RUN locally | Repository CI matrix is separate |

Upgrade procedure: export git archive v0.17.0 into a temporary source; install Core/Codex/UIUX
into a separate empty consumer; replace project-owned local.md with a sentinel; run candidate
update --dry-run, update --format human and check. The update reported 25 changes and retained
`# Keep project facts`. Exercise start --chat and status --format human against the upgraded consumer.
Automated tests also verify all eight host selections, explicit TTY bypass, option rejection before
writes, unknown delivery state, stale/invalid evidence, uncertain operations and selective UI assets.

Review: no dependencies, model calls, installer shell/network, stored schema changes or automatic
merge/publish added. Figma IDs remain. Default JSON/bare start behavior remain; new flags require a
supporting CLI. Compact next_action intentionally changes; entry_action preserves the entry hint.
The earlier tests expecting two UI workflows and entry hint as next_action were updated to the new
contracts, then the full suite passed. Human output strips terminal control characters.

Live model compliance, paired productivity results, token savings and native host loading are not
established. Follow evals/new-user-experience.md with actual authorized tools before claiming them.
