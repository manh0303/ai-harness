# Verification

Linux / Node v24.19.0; base bf1ae6cdb96cae93ea0f93979059a09b5bbbbb03.

## Executed

- Initial focused suite: 38/40 passed. Two fixture assertions depended on the first advisory check/
  evaluation case. New cases/checks were moved to the end to preserve existing order; no validator
  was weakened. This failure is historical, not a claim of clean first-run tests.
- Full npm test after that correction: 319 passed, no failed/skipped tests.
- Final full npm test including synthetic prior-snapshot dry-run/update test: 320 passed, zero failures/skips.
- npm run validate: PASS, no errors; six adapters/eight capabilities.
- npm run check:release: PASS; distribution 0.17.0 unchanged.
- npm run test:package: PASS, actual tarball/global/local installs and explicit engineering asset checks.
- git diff --check: PASS.

## Review

Checked AGENTS/spec-to-code → engineering-quality → existing skills/roles and selected stack rules.
Manifests declare new adapter assets and Product export workflow; old skill IDs and schemas remain.
Tests exercise Core-only exclusion, selected assets, docs/config preservation and managed drift rejection.
Reference pins are provenance documentation, not copied upstream skill implementations or dependencies.

## NOT_RUN

Live host compliance/semantic quality, paired baseline/candidate tasks, external skill execution,
real database concurrency/performance, iOS/Android devices, office export/rendering and Node22/Windows
local matrix. These need actual host/fixture/tooling and independent evidence; CI is authoritative for
its own matrix. No measured error reduction, speedup, render success or business acceptance asserted.
No merge, release, publish or external document write performed.

## Recovery

Commit current consumer state; review supporting CLI update --dry-run/update/check. Existing canonical
docs/settings remain user-owned. Revert snapshot/lock commit with matching CLI; do not edit hashes.
