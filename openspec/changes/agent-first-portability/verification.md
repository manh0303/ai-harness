# Actual verification

Environment: Node v24.19.0/Linux. Baseline main d8091a7fbb27bde4a7ccd979b90588be3b20ecdb (0.12.0).

- npm test: PASSED, 217 tests, zero failures. New coverage includes real 0.12 snapshot upgrade/retirement, edited recipe refusal, brownfield init-detect/idempotency, BOM/CRLF/native content, rollback/collisions, canonical aliases, external profile routing, safe Maven bounds, checkpoint history/staleness/unknown side effects, null/manual comparison metrics and language parity.
- npm run validate: PASSED; six Core skills, six adapters, eight capabilities, 18 adapter skills; source and installed Product shared references/agent preferences checked.
- npm run check:release: PASSED; distribution 0.12.0, fourteen module contracts.
- npm run test:package: PASSED; actual offline npm tarball global/local installs, canonical PM/template routing, host-native seed, optional Claude import/wrapper idempotency, Analysis/Discovery union, comparison template and checkpoint/resume.
- git diff --check: PASSED.
- AGENTS source template measured: 2,742 -> 2,022 bytes. This is a byte comparison, not measured token use or model performance.

Manual review inspected source ownership/aliases, retired recipe references, CLI execution boundary and official Claude memory/skills/model-alias docs. Raw local command logs were observed; CI will independently execute the committed bundle.

UNPERFORMED: live Claude wrapper/instruction loading, independent multi-agent/model runs and 18-run productivity benchmark. Actual host/provider/budget/observations are not configured. New eval scenarios remain unscored; deterministic passing tests do not prove model compliance or quota enforcement.
