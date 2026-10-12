# Agent routing design
Base main: 769e82806b7d80b9874f3b5eb94fcdcdfb98a9ae. Maintain existing Node built-ins, snapshot ownership,
transactional install and advisory setup; no provider runtime or extra CLI config command.

## Decisions and trade-offs
Canonical default lives in config/agents.default.json, shipped and locked as
.harness/templates/agents.default.json. New project agents.json is seeded but never managed/overwritten.
Old alternate sources without a default use the installed CLI's canonical default; missing agents.json
on old consumers remains valid and a reviewed update seeds it. Existing valid user configs stay byte-identical.
Aliases use explicit @name to distinguish alias typos from opaque provider model IDs. Alias descriptors
may supply provider; role provider override wins, then descriptor provider, then project provider.
Reasoning/model/execution validation is structural, not account availability. Namespaced roles derive
from current Core files/capability manifests; missing mappings inherit project defaults and are reported.
Add Core orchestrator/documentation role contracts with no provider hardcoding; active roles depend on
installed selection, while defaults include all currently registered role IDs to avoid namespace collisions.
Presets are non-interactive; explicit preset cannot overwrite existing project config. Recommended is
Sol medium with high for orchestration/architecture/review/security, Luna low documentation; economy
is single-agent. Premium is opt-in by explicit model/alias choice; automatic escalation must remain false.
Concurrency 1–32 and rounds 1–20 are advisory bounds, not runtime enforcement. Host mapping is optional
and explicit; defaults cannot be treated as Claude/Gemini-compatible OpenAI execution. Native availability
and effort remain unverified until checked in the actual host. setup --host prints a plan only.

## Impact matrix
| Area | Status | Paths / evidence / reason |
| --- | --- | --- |
| core | done | Routing workflow, two role contracts, AGENTS template entry and manual checks/unscored eval. |
| adapter | not-applicable | Stack detection/rules unchanged; no provider hardcoding in adapters. |
| capability-skill | done | Namespaced registry derives capability manifest roles; all existing contracts retained. Handoff guide links new Core roles; no skill IDs changed. |
| cli-config | done | cli/agents.js validator/resolver, project-owned seed, locked default asset, init/setup flags and package allowlist; old lock/project schemas retained. |
| workflow | done | core/workflows/agent-routing.md documents single/hybrid/multi advisory strategy and scoped handoff; SDLC links it. |
| documentation | done | Agent config/reference/architecture/project config/maintenance/handoffs/SDLC and five host recipes, with primary native references. |
| verification | done | tests/agent-routing.test.js, version-independent tests/cli.test.js, validate and tarball smoke; results and limits in verification.md. |
| release-migration | done | Changelog Unreleased, ownership/migration guides; fix CI test without weakening downgrade checks. Release PR #27 repaired separately; release workflow rerun succeeded, publish skipped pending human merge. |

## Release action boundary
User also requests running release/npm workflow, but explicitly forbids automatic merge. Inspect current
release workflow and rerun its existing main prepare job when callable. Fix Release PR test branch if
needed for review. A new npm version still requires the human merge step; do not create a tag/version
or republish an immutable existing package to bypass that gate.

## Risks and validation
Declared native mappings can be wrong; never label them live-verified. Unsupported host/model choices
must be surfaced before execution, with no silent premium/provider substitution. Preserve files and
validate before mutations, including dry-run/symlink/collision behavior. Test simulated release versions
beyond current source. Native/model login, concurrency, tokens and real usage remain unmeasured.
