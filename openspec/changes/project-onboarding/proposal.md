# Missing-only setup and scoped project context

## Why
Setup feedback identifies repeated discovery/questions, mixed shared/machine knowledge and unclear
clone/new-project journeys. Session onboarding already landed; implement its remaining gaps without
replacing the established one-command install and /harness-start entry point or adding a model runtime.

## Changes
- Retain read-only setup; opt-in --apply/--dry-run creates missing user config from installed templates.
- Add source-linked project/module decisions with explicit status/history, same-project backup and no transfer.
- Add progressive existing/new-project workflows and compact orientation; preserve partial answers.
- Verify clone, freshness, preservation and rollback with CLI/package tests; document a real-host protocol.

## Acceptance
Existing config and managed payload/lock survive setup/update byte-for-byte. Lost customized answers
require backup/Git, never guessed defaults. Decisions do not grant permissions or permanent approval.
No network/subprocess/model runtime enters the installer. Live Kiro/token claims require actual evidence.
