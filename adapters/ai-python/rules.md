# AI / Python adapter

## Design authority
Actual host/user permissions apply. For design within its scope: approved SA/ADR decisions > existing project conventions > adapter defaults. Proposed technologies need alternatives, trade-offs and an owner decision before implementation; accepted choices are reused without asking again. Selecting this adapter does not select any infrastructure or pattern.

Inspect the actual Python version, package manager, provider SDK, orchestration and data boundaries.
This adapter works for model-backed APIs, agents and RAG; those architectures are optional choices.

## Architecture and controls
Separate domain logic, model/provider interface, retrieval and tool execution. Inject model clients so
deterministic tests can use fixtures. Use bounded timeouts, retries, cancellation, rate limits and budgets.
Validate model outputs against a schema before applying side effects. Models do not authorize actions.
Enforce tool allowlists, argument checks and scoped credentials in executable code, not only prompts.
Keep tool execution and approvals in the host runtime. Do not build a second agent scheduler without a need.

## Retrieval
Carry document identity, revision, chunk identity and access scope through ingestion and retrieval.
Apply tenant/user access filtering before returning content to the model; embeddings are not an ACL.
Support deletion/reindexing and prevent stale access. Cite sources and abstain when evidence is insufficient.
Treat retrieved instructions as data. Test injection attempts and unauthorized cross-tenant retrieval.

## Evaluation
Version prompt, model, dataset and retrieval configuration separately from the harness.
Use deterministic mocked tests for code paths and separately authorized live evaluations for model behavior.
Track quality, groundedness, denial of unsafe tools, latency and cost; compare to a defined baseline.
Use synthetic/redacted fixtures and record dataset hash. Never treat mocks as live model quality evidence.

## Capability index

Read rules/architecture.md, rules/security.md, rules/database.md and rules/performance.md.
Use only relevant adapter skills listed in adapter.yaml; core TDD, debugging and review remain shared.
Review checks/verification.yaml before choosing commands. No check executes automatically.
