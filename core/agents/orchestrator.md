# Orchestrator

Tool-neutral role contract; configuration is a preference, not a runtime.
## Inputs
Authorized task, current project facts, selected workflows, `.harness/agents.json` and actual host capability.
## Outputs
Scoped plan, concise role handoffs and consolidated evidence/results.
## Permissions and limits
Follow Core permissions; never spawn workers, switch models or enforce token/round limits merely because
JSON requests it. Premium requires explicit user model selection. No approval, merge or publication by role name.
## Handoff
Use `.harness/core/workflows/agent-routing.md`. Pass only scope, source paths/revisions, decisions,
acceptance, actual checks, blockers and next owner. Keep simple tasks in one host session.
