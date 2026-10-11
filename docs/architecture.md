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

## DevOps composition (0.5.0)
The `devops` capability owns cross-stack delivery, infrastructure planning and SRE procedures; the `kubernetes` adapter owns manifest and Helm rules/checks. The existing selection/lock/skill discovery mechanism composes them without an orchestrator. Provider writes require separately configured integrations, runtime permissions and action-specific authorization. `verify/eval` remain adapter-focused.
