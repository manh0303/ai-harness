# Design: project coding conventions

## Context
The installer recursively vendors Core and selected adapter assets and hashes them in schema-1 locks.
Generated AGENTS links Core rules and adapter indexes. Setup emits read-only host suggestions.
Existing local.md is project-owned. These existing boundaries are reused rather than introducing a
second convention engine, scanner, mandatory config format or standalone skill.

## Goals / Non-Goals
Provide proportional, evidence-based coding guidance for new, maintain and mixed module scopes.
Do not scaffold application code, infer project mode from file presence, run checks or force a new
architecture. No changes to permissions, deployment or release approval.

## Convention and Reuse Plan
Mode: maintain AI Harness. Sources: AGENTS.md, docs/architecture.md, docs/versioning.md and
docs/release-policy.md. Reuse bundle/install/update in cli/harness.js, setupPlan in cli/environment.js,
adapter.yaml rule lists, existing verification/evaluation schemas and Node test patterns.
New rules belong in core/rules and adapter rules directories; no new skill/catalog entry is needed.

## Decisions
Core owns mode/precedence/discovery/review. Stack-specific defaults live in rules/conventions.md.
Use the existing local.md seed and preserve old files byte-for-byte. Setup offers a mode question
with no guessed recommendation for unconfigured projects; all setups receive inspection guidance.
Host skips answered questions. Core entry point and workflows enforce the instruction path even when
environment configuration means no setup question is emitted. This is not runtime enforcement.

## Risks / Trade-offs
More instructions can add context cost: keep a single shared policy, scoped adapters and short task notes.
Unsafe legacy patterns must be flagged, not copied. Reuse must respect ownership and public APIs;
similar code is not necessarily the same abstraction. Behavioral scenarios require real host traces
and human scoring; structural tests cannot establish model quality.

## Migration Plan
Keep config/lock schema 1. Review update dry run, preserve local facts and unmanaged AGENTS content,
install new rule/check/eval assets, then check. Roll back the consumer installation commit if needed.
Feature PR does not bump distribution version or publish; Release Please owns that process.

## Open Questions
No unresolved implementation decisions. Live-agent behavior remains an explicit evaluation limitation.
