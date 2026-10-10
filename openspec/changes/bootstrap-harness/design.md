## Context
The reference demonstrates shared instructions and OpenSpec workflows but contains project-specific facts.
Consumers span multiple technology stacks and need predictable updates without losing local conventions.

## Goals / Non-Goals
Provide a minimal usable framework, safe local installation, explicit ownership and review evidence.
Do not implement LLM orchestration, agent sandboxing, dependency installation or production deployment.

## Decisions
- Python standard library CLI: no install-time dependency or network requirement; requires Python 3.10+.
- Vendored snapshot: reviewable and usable offline; duplicates some Markdown across consumer repos.
- One managed AGENTS block: preserves user prose while detecting changes inside framework ownership.
- SHA-256 lock and preflight: detect drift; not a substitute for signed provenance or Git review.
- Explicit adapters: avoids guessing project versions and never executes suggested build commands.
- Project-owned overrides: avoids a complex rule-merge engine or silent override of security policies.
- Conventional OpenSpec drafts: delegate actual validation/archive semantics to upstream.

## Risks / Trade-offs
Instruction adherence depends on the agent runtime. Use external permissions and independent evaluations.
Multi-file writes are not crash-atomic; ordinary errors roll back bytes, but Git remains recovery authority.
Local references must be trusted; symlinks and overlapping source/target roots are unsupported.

## Migration Plan
Initial v0.1.0 candidate. Install on a consumer branch, inspect diff and run check/application gates.
Release only after human review. Revert the installation commit to roll back. No automatic migration.

## Open Questions
Choose long-term distribution license and intended runtime-specific live evaluation environment separately.
