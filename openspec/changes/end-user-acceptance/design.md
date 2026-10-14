# Design and impact

Base main 70fbfd1cf3ce9b0017a7d96743c4c304754c7fd3, tree 988f7607f5fdb746341f725f9f2561a0ab73d3cf.
Local baseline tree exactly matched remote main before the feature branch. Distribution remains 0.14.0.

The dedicated Core skill and workflow activate for explicit requests or applicable affected public
journeys. Host chooses actual tools, actors, independent AC expectations, isolated fixtures and cleanup;
web interactions cannot be replaced by API or component evidence. Reuse existing Playwright/Cypress,
mobile/device, CLI/API tools; unknown/missing access is disclosed, not guessed or auto-installed.

Adaptive CLI emits metadata candidates/required context and a host prompt, with executed=false.
New optional requirement verification_target=end-user requires a web/mobile/cli/api surface. To verify
it, a matching passing journey with actual interface classification and real/not-applicable dependencies
must be linked. Mocked/unknown scopes can pass local assertions but leave end-user requirements UNVERIFIED.
Wrong-interface assertions cannot satisfy web/device requirements. Transport-only browser/mobile/CLI
PASS becomes invalid; old behavior-only reports retain their route, schema and assertion format.

Optional journey attachments are separate from ≤1 MiB JSON assertion evidence: bounded local binary
files, kind/extension, SHA-256, no symlinks, ≤50 MiB/file, ≤20/100 MiB per scenario. This is consistency,
not content decoding, execution authentication or secret scrubbing. Review attachments independently.
Screenshot metadata, recorded interaction and dependency scope are producer declarations. UAT owner
approval and independent model/Harness evaluation remain distinct.

| Area | Status | Evidence/reason |
| --- | --- | --- |
| core | done | New Core skill/workflow, test-engineer/reviewer, preferred skills, AGENTS, checks/evals |
| adapter | done | React/Next.js + React Native testing skill routes → Core; module versions 1.3.0 → 1.4.0 |
| capability-skill | done | New Core skill uses automatic distribution/discovery; matrix total 67; optional capabilities untouched |
| cli-config | done | Adaptive plan, optional report target/surface/journey/attachments; no new command/config/dependency |
| workflow | done | Spec-to-code / continuous development / adaptive verification / reviewer → actual interface handoff |
| documentation | done | End-user guide, adaptive/CLI/SDLC/frontend-mobile/hand-offs/index/getting-started/versioning |
| verification | done | 255 tests pass; validate/check:release/package pass; browser launch BLOCKED and live model/device runs NOT_RUN, detailed in verification.md |
| release-migration | done | CHANGELOG Unreleased, module bump, report/snapshot migration and rollback; no distribution bump |

Official Playwright Test/assertions/locators/trace and Microsoft Playwright MCP references reviewed
2026-10-14. A browser launch availability probe in this host failed because the runtime Playwright
browser executable is absent. No browser run or native-device pass is inferred from report unit fixtures.
