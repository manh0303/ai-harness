# Agent-first task routing

Read project-owned agents.json and actual host capabilities. aih agents resolves installed contracts,
canonical aliases and preferred skills without spawning workers or probing providers.

1. Orchestrator scopes the request, existing decisions, sources and affected repositories. Keep small
   clear edits in one session; roles are perspectives unless actual delegation is supported/authorized.
2. BA handles requirements/domain/AC gaps. PO/Product Manager handles value, scope and feedback.
   SA handles open architecture/technology choices. PM handles dependencies, risks and handoff.
   Developer implements accepted contracts; QA/Reviewer checks actual behavior and evidence.
3. Approved SA/ADR decisions > scoped project conventions > adapter defaults, subject to actual
   user/host permission and security. Do not select a broker, cache, provider, layout or pattern because
   an adapter exists. SA proposes 2–3 viable options/trade-offs only for real open decisions, and
   records the user's choice before consequential implementation. Do not ask again about approved facts.
4. Load only relevant preferred skills by description; optional skills may be absent. Product is the
   compatibility bundle; analysis/discovery expose selected canonical skills. PM role IDs are aliases
   of core:project-manager. Contracts with the same canonical_id are one responsibility, not workers.
5. Host-native model is the default. init --host claude-code seeds native Anthropic aliases only when
   agents.json is absent; existing model choices are preserved. Requested effort/model/access remains
   unverified until checked in the host. Never escalate to paid/premium automatically.
6. execution mode/concurrency/rounds, optional autonomy and budget are declarations, not enforcement.
   An autopilot declaration needs explicit actions/repository scope and actual user delegation; it
   cannot override host denials, branch protection, source-write policy or this repository's rules.
7. When budget/rounds/access prevents progress, checkpoint completed evidence, pending tasks, blockers
   and next action. Record usage/quota only from an actual host source; unknown remains unknown.
8. Handoff scope, baseline revisions, AC/ADR/decisions, authorized actions, actual evidence, side-effect
   receipts and next owner. Reconcile checkpoint and current source/remote state before retries.

Use continuous-development.md for full changes/resume. No CLI orchestration runtime or paid model calls.

Before applying a role, read contract_load_order from aih agents: the canonical core/capability contract,
then project-owned extensions in declared order. Extensions specialize domain facts; they cannot grant
permissions or weaken core security. Missing extensions block that role; reconcile contradictory facts
with the owner. Before a selected skill use aih doctor --skill <name> for declared requires; verify MCP
access/tools in the actual host even when local prerequisites pass.
