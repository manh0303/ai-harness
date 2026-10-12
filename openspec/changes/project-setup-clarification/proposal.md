# Project setup, clarification and readiness

## Why
Project-specific Maven/JDK paths cannot be represented as reusable adapter defaults. Users need a
short first-run conversation, explicit answers before consequential implementation, and evidence
that an OpenSpec change is ready for its next stage.

## Sources
- User discussion: project/internal Maven setup and A/B/C questions, 2026-10-12 (Asia/Ho_Chi_Minh).
- Existing CLI, ownership contracts and advisory verification on main 8684f8d.
- User authorized development of the consolidated gaps; routine implementation choices are delegated.

## What Changes
- Optional shared environment contract plus ignored, narrowly scoped machine overrides.
- Read-only setup suggestions and doctor diagnostics without command execution or value disclosure.
- Host-led clarification workflow, with choices/recommendations and persisted decision records.
- Structural implement/review readiness checks; no semantic approval or test execution.
- Next-step guidance and a controlled real-task comparison protocol.

## Capabilities
### New Capabilities
- `project-setup`: machine-aware context and explicit decision/evidence handoffs.
### Modified Capabilities
- CLI installer: preserve project-owned seeds and ignore machine configuration.
- OpenSpec scaffold: decision and verification sidecars.

## Impact
One repository and npm CLI. No new dependency, network call, runner, RAG, auto-merge or publication.
Existing locks and project.json stay schema 1. Legacy changes require explicit sidecar adoption only
when using the new ready command; existing commands continue to work.
