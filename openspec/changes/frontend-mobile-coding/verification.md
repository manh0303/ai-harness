# Verification: frontend/mobile coding and onboarding

Linux / Node v24.19.0. Base main: 3ae516ff481162c07dd7802d5c4366900fd62448.
Author-run structural checks and self-review, not independent review or actual app/model compliance.

| Command | Observed result |
| --- | --- |
| Skill Creator quick_validate for each new skill | All four valid |
| `npm test` | 161 passed, 0 failed, 0 skipped |
| `npm run validate` | status ok; six adapters/capabilities, 22 adapter skills, 312 managed files, no errors |
| `npm run check:release` | status ok; distribution unchanged 0.8.0, 12 module contracts |
| `npm run test:package` | status ok; 306 package files, real offline tarball/global/local installs |
| `git diff --check` | Clean |

Coverage: selected canonical/exposed skill bytes and lock/catalog, absence from deselected adapters,
dry-run nonmutation, drift refusal, manual verify/unscored eval, additive update of simulated older
two-skill adapter bundles, deselection of managed assets and preservation of local.md, exact custom
agent JSON, native host config, application files and AGENTS appendix. New skills are actually shipped,
installed/exposed and listed by the packaged CLI; matrix totals/links and existing stack examples pass.

Initial targeted checks exposed two existing hardcoded skill/evaluation counts after the additions.
They were updated to derive selected metadata; full tests then passed. First package smoke also exposed
an older hardcoded case count; changed to declared source case counts, rerun passed. No safety checks
were weakened. Initializer-only agents/openai.yaml artifacts were removed because this repository's
provider-agnostic distribution exposes SKILL.md; no personal assistant skills were installed.

Self-review follows the eight-area matrix and declaration → package → installed discovery → scoped skill
use → manual checks/unscored scenarios → guide/examples. Preserve source-driven architecture/common
reuse; no competing frameworks/libraries or runtime dependency introduced. Official primary references
and independently authored guidance are linked in docs/frontend-mobile.md.

Limits: no real React/Next.js/React Native application, browser/server, device/simulator, native build,
authenticated AI host or forward/live-model trial was run. Four new scenarios remain unscored;
unit/package results establish distribution/structure, not behavioral compliance. Local tests were Linux
Node24; Windows/Node22 evidence comes from GitHub CI, reported separately in the PR. Upstream OpenSpec
CLI was not run. No merge, release tag, npm publication, OTA/store action or native host configuration.
