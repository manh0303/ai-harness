# Architecture and scope

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

## Agent/runtime boundary
Roles are Markdown handoff contracts. The host decides tool execution and delegation. A role document
does not create another agent or supply an API key. Use the same framework in an IDE assistant or your
own model-backed runtime; actual permissions, cost limits and network allowlists live in that runtime.

## Advertising monetization capability

`capabilities/monetization/` is an optional, stack-neutral guide for legitimate publisher readiness, safe ad UX, SEO and revenue analysis. It does not install provider SDKs, access Google accounts, claim consent compliance or guarantee approval/revenue. Templates are vendored into the selected consumer under `.harness/capabilities/monetization/templates/`; `aih new-doc` still only scaffolds Product documents. Owners copy monetization templates to project-owned `docs/monetization/` using authorized filesystem tools. Review [Monetization guide](monetization.md).

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

The cross-module route is described in [Getting started](getting-started.md), [Full SDLC](end-to-end-workflow.md), [48-skill matrix](skill-matrix.md) and [Agent handoffs](agent-handoffs.md). All roles/skills remain instruction contracts. The four [stack walkthroughs](examples/spring-boot-api.md) illustrate permitted integrations, not a runnable scaffold or orchestration engine.
