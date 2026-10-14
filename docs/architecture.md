# Architecture and scope

Maintainer entry point: [Harness maintenance and impact matrix](harness-maintenance.md).

AI Harness is a versioned instruction and workflow distribution framework. Its executable part is a
local installer and integrity checker. It is not an LLM gateway, an orchestration server or a sandbox.

| Layer | Responsibility | Owner |
| --- | --- | --- |
| core/rules | Evidence, context loading, code/change discipline | Harness maintainers |
| core/policies | Permission and security contracts | Maintainers plus runtime admins |
| core/skills | Repeatable task procedures | Harness maintainers |
| core/agents | Role inputs, outputs and authority limits | Harness maintainers |
| core/workflows | Stage order and review evidence | Harness maintainers |
| adapters | Technology-specific defaults and suggested checks | Adapter maintainers |
| capabilities | Optional cross-stack product, UI/UX, DevOps and ad monetization workflows | Capability maintainers |
| integrations | GitHub, GitLab and MCP setup contracts/templates | Project/runtime owners |
| templates | AGENTS entry point and OpenSpec draft structure | Harness maintainers |
| CLI + lock | Deterministic installation and update conflicts | Executable framework |
| project overrides | Domain facts, actual versions, approved exceptions | Consumer project |

## Installation design
The consumer receives a vendored .harness snapshot and .agents/skills/harness-* files. AGENTS.md gets
one marked block. The CLI leaves text outside that block intact. The generated .harness/lock.json records
schema version, release version, selected adapters, each owned content hash and an aggregate hash.
The hashes detect accidental drift; they are not signatures and cannot detect a coordinated malicious
edit to both payload and lock. Review source commit provenance and consumer lock diffs in Git.

Project-owned seeds: .harness/project.json, .harness/local.md and openspec/config.yaml. Updates preserve
their contents. Existing openspec specs/changes are never rewritten. Only previously owned, unchanged
files can be deleted when a new bundle removes them. Unknown user files are never swept away.
Identical pre-existing payload may be adopted; conflicting payload aborts the entire preflight.

init/update take an exclusive installation marker, preflight changes, and write files atomically one at
a time. Ordinary write failures roll back bytes already changed. This is not a crash-safe multi-file
filesystem transaction: a power loss, process kill or rollback I/O failure can leave partial state.
Commit consumer state before updates; after interruption inspect the marker, run check and restore from Git.
Empty directories may remain after rollback/removal. Symlinked roots/paths are intentionally unsupported.
Concurrent hostile filesystem mutation is outside the threat model; run in a trusted local workspace.

## Project environment and structural readiness

Project-owned environment.json records tools, files and command arguments; ignored machine.json may
override declared paths only. No environment values are copied into the managed lock. Installer seeds
the shared contract and preserves existing contents; the scoped ignore rule is appended transactionally.
The environment reader uses metadata/path presence only, with no execution or private-value output.

Setup is a host-facing question plan. Clarification instructions live in Core workflows.
Readiness reads project-owned OpenSpec decision/evidence sidecars and Markdown structure, returning
blocked or ready. It is not a semantic validator, runtime policy engine or approval mechanism.

## Agent/runtime boundary
Roles are Markdown handoff contracts. The host decides tool execution and delegation. A role document
does not create another agent or supply an API key. Use the same framework in an IDE assistant or your
own model-backed runtime; actual permissions, cost limits and network allowlists live in that runtime.

## Advertising monetization capability

`capabilities/monetization/` is an optional, stack-neutral guide for legitimate publisher readiness, safe ad UX, SEO and revenue analysis. It does not install provider SDKs, access Google accounts, claim consent compliance or guarantee approval/revenue. Templates are vendored into the selected consumer under `.harness/capabilities/monetization/templates/`; `aih new-doc` defaults to Product; explicit `--capability monetization` selects a declared installed template into project-owned `docs/monetization/`. Review [Monetization guide](monetization.md).

## Astro static-first adapter

Astro là technology adapter độc lập (`adapters/astro/`), không phải capability chung, dùng chung Core/Product/UIUX/DevOps khi được chọn. Sáu skills tập trung website tool tĩnh, islands, SEO, performance, Cloudflare và đường nâng cấp Micro Frontend. `aih detect` nhận diện `astro` trong root `package.json` và bỏ nhận diện React/Next chỉ đến từ `react-dom` khi dùng Astro Islands (trừ khi có `next`). Không thêm Astro runtime vào Harness và không tự chạy build/deployment. Xem [Astro walkthrough](examples/astro-micro-tools.md).

## Extending adapters
Add adapters/<id>/adapter.yaml (schema 2), rules.md, rules/, namespaced skills/, checks/verification.yaml
and evals/cases.json. Register the id in harness.yaml; add detection, installation and evaluation cases.
See docs/adapters.md for the strict JSON-compatible YAML contract. Detection is opt-in and read-only;
checks are advisory and never executed. Installed capabilities are read from the locked snapshot, not
from the latest global CLI source. Core TDD/debug/review are not duplicated in adapters.

## npm distribution
The package exposes bin/aih.js as `aih`. It uses native JavaScript ES modules and Node.js built-ins:
there is no Python bridge, transpilation step, runtime dependency, network client or install hook.
Source paths resolve relative to the package, not cwd. The target defaults to cwd. Local node_modules
installation is an explicit exception to overlap rejection; payload destinations never include node_modules.
The npm files allowlist ships runtime assets including the hidden OpenSpec template. A smoke test packs
and installs a real tarball globally and locally without registry access. Development tests and fixtures
are excluded from distribution. Only the development smoke script launches npm subprocesses.

## Optional capabilities (0.4.0)

Capabilities differ from technology adapters: they represent reusable workflows such as UI/UX,
not runtime stack defaults. A registered capability contains `capability.json` schema 1,
namespaced `SKILL.md` files and workflow contracts, installed only when selected. CLI copies
the selected capability under `.harness/capabilities/<id>/` and exposes its skills to
`.agents/skills/`. The existing Core and technology adapter contracts remain unchanged.

`aih skills` exposes metadata-only catalog and `aih skill <name>` retrieves a single locked
skill after drift validation. The agent host controls actual skill activation and remote MCP.
For package size, source npm distribution currently bundles all capabilities, but consumer
snapshot and AI context are selective; split distributable packages only when size warrants it.

## Product documentation capability (0.5.0)

An optional `product` capability owns business-analysis and product-documentation
role contracts and templates. Capability schema-1 now supports optional unique safe
`agents` and `templates` Markdown path lists (required fields remain unchanged).
Role files must include Inputs, Outputs, Permissions and limits, Handoff sections.
The existing `uiux` manifest without these optional fields remains valid.
Selected capability artifacts are hashed and installed with the existing lock safety.

`aih new-doc <type>` reads a locked, drift-free Product template, creates
`docs/product/<type>.md` as project-owned data, and refuses overwrite/symlinked
destinations. It never fills confidential content, fetches Confluence or auto-approves.
The approved PRD/BRD/stories/AC serve as source of truth for UI/UX and OpenSpec.

## DevOps and Kubernetes composition (0.6.0)

DevOps is an optional stack-neutral capability for release procedures and SRE; the Kubernetes adapter owns workload/Helm details. Product role/template support from 0.5 remains unchanged. Both are installed only when selected, vendored and hash-locked alongside existing modules. Integrations/runtime permissions are independently administered; no instructions can grant cloud access, override Core approval gates or trigger production changes. `aih verify`/`aih eval` use adapter-only defaults; opt in to Core and capability scenarios with `--scope all`, without executing runtime checks.

## Foundation hardening (in source; candidate not published)

`cli/composition.js` validates a selected module graph before copying managed content. Optional `module_version`, hard `requires`, soft `recommends`, `conflicts` and `compatible_adapters` use namespaced refs like `adapter:kubernetes`. Cycles, unknown refs, missing required or explicitly incompatible modules fail before writes; recommendations only warn. Config and lock schemas remain 1, and module metadata is pinned inside installed snapshots.

`aih verify/eval --scope all` reads Core, selected adapters/capabilities and matching cross-module scenarios from locked files. Default without scope is still adapter-only for compatibility. Checklists are advisory, evaluations human-scored, and no local/remote commands or models run. See [release policy](release-policy.md).

## Documented end-to-end usage

The cross-module route is described in [Getting started](getting-started.md), [Full SDLC](end-to-end-workflow.md), [Skill matrix](skill-matrix.md) and [Agent handoffs](agent-handoffs.md). All roles/skills remain instruction contracts. The four [stack walkthroughs](examples/spring-boot-api.md) illustrate permitted integrations, not a runnable scaffold or orchestration engine.

## Solution delivery capabilities

Product 1.2.0 adds MVP/outcomes and explicit template/example/quality/handoff sections. Optional
Architecture and Delivery schema-1 modules use existing roles/templates/checks/evals and locked
installation; soft recommendations never auto-select them. Core solution-framing provides proportional
overview/MVP/NFR/architecture/impact context without requiring every capability or document.
new-doc gains explicit --capability (default Product), validating installed metadata and declared
templates and preserving project-owned outputs. See [Solution workflow](solution-workflow.md).
Host configuration bridges are user-owned recipes in [tool setup](tool-setup/README.md); no host
account configuration, native-agent installation, new dependency or orchestration engine is supplied.

## Agent configuration boundary

config/agents.default.json is the canonical recommendation, locked as templates/agents.default.json in
the snapshot. agents.json is project-owned and preserved. agents.js validates/resolves aliases and
namespaced roles; setup supplies an advisory host plan with availability unverified. No provider calls,
native writes, orchestration, usage meter or automatic escalation. Old alternate sources use the packaged
default when absent; old consumers without config remain valid. See [Agent configuration](agent-configuration.md).

## Project artifact and integration contracts
Project-owned artifacts.json/integrations.json use schema 1 independently of project/lock schemas.
The installer seeds absent configs, validates before writes, and preserves custom bytes. The shared
JSON reader does not echo parse input. artifacts.js validates local paths/refs/dependencies and
provides a read-only host plan; no provider registry, connector runtime, secrets store or discovery.
new-doc routes to an explicit docs folder or returns an external template handoff without fallback
copies. OpenSpec stays repository-owned; configured outputs add structural artifact-impact coverage
and completion to readiness. See [Artifact contract](artifact-contract.md).

See [Adaptive verification and TechSpec](adaptive-verification.md) for read-only discovery, evidence reports and selective technical documentation.

## Continuous development

The [continuous-development workflow](continuous-development.md) composes existing Core and optional Product/Architecture/Delivery contracts. Baseline/impact and handoff sections extend existing OpenSpec Markdown templates; no schema, runtime, state store or CLI command is added. Hosts reconcile revisions and perform authorized section edits; structural readiness cannot enforce semantic freshness.

## Agent-first changes (unreleased)

Optional capability profiles declare asset_owner for a canonical owner; loading validates subset membership, and installation vendors canonical assets while exposing selected skills once. Optional agent/template aliases retain old IDs/routes. Root CLAUDE managed import and native skill wrappers are opt-in locked payloads; external native settings remain project-owned. Checkpoint commands store declarations/history and compute local drift without a runtime/state server. See [Agent-first migration](agent-first.md).

## Guided intake and portable configuration

start uses terminal prompts or a non-TTY plan with saved user-owned start.json; canonical source/output
declarations remain artifacts.json. backup exports an allowlisted, bounded UTF-8 config archive only.
restore validates schema/digests/configs/paths, previews conflicts, requires explicit replacement and
saves a before-backup through the same installation guard/rollback machinery. Transfer copies only
project/agent preferences and removes repository autonomy. No credentials, machine paths, locked
payload, custom skills or checkpoint/document contents are exported. Full repo recovery remains Git
and external-source backup. See [Configuration backup](configuration-backup.md).

## End-user acceptance

Core test-engineer routes public journeys to harness-end-user-testing and the end-user-acceptance
workflow. Adaptive CLI exports tool/surface hints only; the host executes actual interfaces. Optional
schema-1 journey declarations and bounded binary attachment digests qualify explicitly requested
end-user requirements by matching surface and dependency scope. Receipts are producer declarations,
not authenticated browser/model execution or UAT approval. No browser dependency/runner enters the CLI.
See [End-user testing](end-user-testing.md).

## Session onboarding and Kiro bridge (unreleased)

Core harness-start delegates semantic seed/questions to the host. Optional local.md frontmatter is
bounded YAML/JSON; legacy prose is preserved. CLI seed stores local source/config hashes in project
knowledge.json outside the managed lock. --host kiro installs locked native wrappers and SessionStart
v1; requires are read-only prerequisites, extensions are host loading plans, MCP sync imports aliases
only. No model/runtime, provider probe, network or shell execution. See [contracts](session-onboarding.md).
