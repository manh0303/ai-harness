# Session onboarding and knowledge freshness

## Why
Real setup feedback shows duplicate terminal/chat questions, repeated project-document retrieval,
free-text facts, late prerequisite failures, missing external-proposal sidecars and manual Kiro bridges.

## What changes
- Kiro opt-in install/update produces native canonical wrappers and SessionStart v1; first session uses /harness-start.
- The host inspects sources and interviews in the current session, saves partial facts and reuses accepted decisions.
- Optional structured local.md, host-reconciled knowledge hashes, skill requires and role extensions support progressive loading.
- Missing-only external proposal sidecars and alias-only local MCP discovery remove setup chores without granting access.

## Non-goals
No model/runtime, shell/network execution in the installer, provider key requirement, upstream OpenSpec patch,
automatic merge/publish, credential copying, guaranteed semantic freshness or claimed token reduction.
