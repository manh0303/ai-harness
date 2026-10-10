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
Add adapters/<id>/adapter.json and rules.md; register the id in harness.yaml; add a consumer smoke case,
update docs and version. IDs are lowercase hyphenated names. The installer does not auto-detect a stack
or execute suggested_commands, so installing a new adapter cannot silently run project code.
