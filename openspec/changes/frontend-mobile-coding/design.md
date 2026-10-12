# Design and impact

Base main: 3ae516ff481162c07dd7802d5c4366900fd62448 (distribution 0.8.0).
Use existing adapter contracts and skill distribution; do not add a frontend capability/registry.

## Decisions and trade-offs
- Add two skills per adapter: ordinary feature/screen delivery and stack-specific behavior testing.
  Existing specialized skills and IDs remain. Generic TDD/debug/review stay in Core, UX/Figma stays optional.
- Keep each body self-contained and refer only to installed paths; no copied external skill pack,
  generated provider UI metadata, scripts or resources are shipped. The existing adapter contract exposes
  SKILL.md only. Skills were initialized and validated using Skill Creator; declarations use repo conventions.
- Preserve frameworks, API/query/form/navigation/theme public APIs. Do not prescribe Redux, Zustand,
  TanStack Query, React Hook Form, Expo, Playwright or a navigation library. New architecture/patterns
  require a concrete need and proportional decision; no empty layers or speculative wrappers.
- CLI behavior is unchanged. Init is non-interactive; setup is an advisory plan. Host mapping is explicit
  and existing native config/user preferences retain ownership. Current flags are made discoverable.
- Additive module contracts advance to 1.2.0; schemas, distribution version and current agent role IDs
  stay unchanged. Content increases only in selected snapshots; skill bodies load progressively.
- Author independently from official React state, Next testing, React Native testing and optional React
  Navigation auth guidance linked in docs/frontend-mobile.md (checked 2026-10-12). No source code copied.

## Impact matrix
| Area | Status | Evidence / reason |
| --- | --- | --- |
| core | not-applicable | Existing TDD/review/rules/roles remain authoritative; no Core behavior or default agent mapping change. |
| adapter | done | Both manifests 1.2.0, two new skills each, discovery index, manual checks and unscored cases. Detection/schema unchanged. |
| capability-skill | done | Four adapter skills have input/procedure/output/example/quality/constraints/handoff and exposed consumer paths; optional capability handoffs reuse existing IDs, no capability manifest change. |
| cli-config | done | No executable CLI change; command-table flags corrected, init/setup prompts clarified. Existing install/lock/allowlist used with selection/preservation tests. |
| workflow | done | SDLC/handoff and full-stack/mobile examples route the new skills through current roles; no workflow engine. |
| documentation | done | README/getting-started/CLI/skill matrix/adapters/frontend-mobile/examples/versioning updated and linked. |
| verification | done | 161 tests passed, validate (312 managed files/22 adapter skills), release check and actual tarball smoke (306 files); selection/update/deselection/custom preservation tested. See verification.md; behavioral scenarios stay unscored. |
| release-migration | done | Unreleased changelog, additive module bumps and consumer update/rollback; distribution remains Release Please-owned. No automatic merge/publish. |

## Risks and limits
Instructions may not be followed by every host. Checklists/eval templates are not test execution.
Browser/server, iOS/Android/device and actual model compliance need their own evidence. Missing native
toolchains must remain blocked, not counted as passed. Existing app/common files and custom configs
must survive update; edited managed skills must still refuse writes.
