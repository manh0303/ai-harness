# Agent preferences, model routing and execution

Read project-owned .harness/agents.json when present. On legacy installs, absence means no declared
routing preference; use actual host settings and report the gap. `aih setup --host <id>` resolves the
contract without probing models or writing native host config. Source defaults are a recommendation,
not evidence of model/account availability. Runtime permissions and the user's current model choice win.

1. Select only relevant workflow/skills/source. Resolve namespaced role IDs against installed Core and
   selected capability contracts; inactive or disabled routing cannot remove required quality/security checks.
2. Model aliases use @name, provider/model/reasoning can be overridden per role. Missing role mappings
   inherit project defaults and must be reported; never silently substitute another provider or premium.
3. Verify requested/native model ID, reasoning support, authentication and delegation in the actual host.
   Host-incompatible or unverified choices need a grounded user decision/check before model-dependent
   execution. Explicit user mappings are declarations, not proof that a native model is available.
4. Single-agent: one session performs sequential roles and relevant skills. Hybrid: one lead and an
   independent helper only when useful, authorized and supported. Multi-agent: use separate contracts
   and concise handoffs only when runtime supports it. Follow the host's actual delegation rules.
5. Keep simple edits/clear bugfixes in one session. For parallel work isolate responsibilities/paths,
   share only scope, source references, decisions, AC and blockers; do not send every skill/doc to each worker.
6. Treat maxConcurrentAgents and maxRounds as requested caps, never counters enforced by this CLI.
   Count the lead in concurrency planning; translate native worker/thread limits only after checking
   their semantics. When a round limit is reached, checkpoint unresolved work instead of claiming done.
7. Premium/Astra is allowed only through the user's explicit model/tier selection; automatic escalation
   must remain false. An economy preference does not waive correctness/security or mandatory review.
8. No real token budget or usage meter is supplied. Read real host usage when available; report unknown
   cost/availability. Preserve existing model settings until the user agrees a native change.
9. Handoff task/role ID, actual model/effort if known, files/revision, decisions, performed checks, remaining
   questions and next owner. A same-session author review is not independent review.
