# Verification: agent configuration and model routing

Environment: Linux / Node v24.19.0. Base main: 769e82806b7d80b9874f3b5eb94fcdcdfb98a9ae.
Author-run structural checks and self-review; no independent human review or authenticated host trial.

| Command | Observed result |
| --- | --- |
| Targeted routing/CLI/setup tests | 56 passed, 0 failed |
| `npm test` | 158 passed, 0 failed, 0 skipped |
| `npm run validate` | status ok, 6 adapters, 6 capabilities, 304 managed files, no errors |
| `npm run check:release` | status ok, unchanged distribution 0.7.0, 12 module contracts |
| `npm run test:package` | status ok, 301 package files; actual offline tarball/global/local installs |
| `git diff --check` | Clean |

Coverage: recommended/economy/custom presets, full namespaced role coverage, provider/effort
precedence, missing/cyclic aliases, invalid fields/execution/limits, dry-run/refusal atomicity,
byte-identical custom configuration/native file preservation, old published snapshot/source fallback,
managed-default drift/symlinks, read-only host incompatibility and unverified native mappings.
Package smoke checks the shipped canonical default, resolver/workflow, seeded project config and
setup host plan. The first targeted run exposed directory handling in safe path resolution; fixed
before rerunning the checks above. Same-session self-review is not independent review.

## Separate release regression and workflow action

Release PR #27 had a version-hardcoded update test that attempted 0.8.0 → 0.7.0. The test now derives
a next patch and also exercises a future minor, preserving the actual downgrade guard. An isolated
candidate using the actual PR's five release metadata files plus only the repaired test passed
147/147 tests, validate (300 managed files), check:release (0.8.0/12 contracts) and actual package smoke.
This candidate excludes the new agent feature. The test-only repair was pushed to the Release PR at
6963fc30964d4f10ff98e8b1d9bc723282110c49 to trigger CI; the feature also retains the fix for future releases.

The existing main release-please job was rerun in
[workflow run 38237833549](https://github.com/manh0303/ai-harness/actions/runs/38237833549), attempt 2:
completed/success. The publish job was skipped because no release was approved/created. No PR was
merged, no tag created, and no new npm version published by this task. Human review/merge is still
required; live CI status is reported in the PR/final response rather than inferred from local tests.

## Limits

All runtime_verified values are false. No account model/effort probe, authenticated native host smoke,
subagent concurrency trial, real usage measurement or behavioral model evaluation was performed.
Codex/Claude/Gemini native recipes cite current official docs; Cursor/Copilot controls remain client
dependent. Schema enums and limits are declarative. The new behavioral scenario remains unscored.
Windows/Node22 evidence is supplied by repository CI, not these Linux Node24 local runs. Upstream
OpenSpec CLI was not installed/run. Keep this change active until reviewed/merged, then archive.
