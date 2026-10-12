# Project coding conventions

## Why
Existing adapters describe architecture and security but do not give a complete new-versus-maintain
procedure or require evidence that existing shared code was considered before creating new code.

## What Changes
- Add Core mode, precedence, discovery/reuse and diff-review rules.
- Add Java/Spring, React/Next.js and React Native coding defaults with maintenance reuse checklists.
- Connect rules to generated AGENTS, setup, implementation, bugfix and review contracts.
- Add advisory checks, behavioral scenarios, install/update regression coverage and concise guidance.

## Impact
No new dependency, runner or schema. Existing project overrides survive updates. Adapter module
contracts advance to 1.1.0; distribution version remains owned by Release Please. No automatic merge,
publishing or claim of live-model compliance.
