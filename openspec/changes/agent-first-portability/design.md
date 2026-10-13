# Design and impact

Baseline: main d8091a7fbb27bde4a7ccd979b90588be3b20ecdb, distribution 0.12.0. Local baseline tree verified as 191a2fea0cd44613f5e66b8c482892af839db1d3. One feature MR; no stage approval pauses.

## Decisions
- Keep one npm package and no runtime dependency/network/subprocess. Agents remain host-controlled contracts, not an added orchestration server.
- Approved scoped SA decisions > actual conventions > adapter defaults; host/user security and permissions apply. Open choices need alternatives and owner decisions; accepted choices are reused.
- Retire Java outbox/migration and Astro Cloudflare/microfrontend SKILL assets. Old installed snapshots remain readable until reviewed update; updated missing IDs return migration guidance, not old recipes. Preserve edited managed files by aborting.
- Analysis/Discovery select canonical Product skills/assets; retain product compatibility IDs/routes. Physical canonical assets are vendored for correct references; exposed skills deduplicate by identical bytes. This is selective context, not a smaller npm download.
- PM/template aliases point to one Core contract/template; role model overrides and old output paths remain valid. Preferred skills are required/optional and source-validated; optional absence does not install modules.
- Claude import/wrappers are explicit opt-in managed assets. Hash only CLAUDE's managed block; preserve user bytes outside. New models inherit host settings, or use explicit Claude native aliases when seeding an absent config; native settings/custom agent bytes are preserved.
- Maven is bounded metadata discovery, not arbitrary XML/profile/parent resolution. Unsafe paths/entities/interpolation fail, missing/deeper modules warn.
- Checkpoint is a compact project-owned declaration with local evidence and baseline references. Replace with observed digest and preserve history. Resume flags stale sources and unknown side effects; no remote replay/usage probe. Trusted-workspace compare-before-write is not cross-host transaction enforcement.
- Autonomy/budget fields are optional declarations under schema 1, requiring scoped actions/repositories for autopilot. Actual user delegation and host/repository rules still decide execution. Harness development keeps no-auto-merge.
- Comparison helper summarizes 18 manually supplied run slots, preserving null/failed/interruptions. Actual host/model comparison remains unperformed.

## Impact matrix
| Area | Status | Evidence / reason |
| --- | --- | --- |
| core | done | Routing/continuity/review links, canonical PM, preferred skills, permissions, checks/evals and progressive AGENTS |
| adapter | done | All six manifest versions, design precedence and accepted-design inputs; four retired recipes; Java/Astro rules/checks/examples |
| capability-skill | done | Analysis/Discovery profiles, Product common contract, PM/template aliases; source/installed-reference validation and matrix |
| cli-config | done | agents/checkpoint/resume, opt-in Claude/native preset/wrappers, Maven bounds, optional autonomy/budget and preserved schema-1 ownership |
| workflow | done | Scoped agent handoffs, clarification reuse, source routing, domain/UAT and recovery/side-effect reconciliation |
| documentation | done | Agent-first guide, CLI/setup/config/migration/examples, concise README and four language selectors |
| verification | done | 217 tests; actual 0.12 fixture, tarball smoke and structural validation; live/model comparison explicitly unperformed |
| release-migration | done | Unreleased notes, independently advanced modules, distribution stays 0.12.0; proposed minor release requires reviewed release PR |

## Limitations
CLI does not execute agents, enforce quota/autonomy, authenticate producer receipts or independently discover host settings. Native wrapper live behavior needs a real host session. Checkpoints cannot recover unsaved side effects; actual state must be inspected. No model productivity results are supplied. Retired recipes are a behavioral migration requiring consumer review even though old module/role/template routes remain supported.
