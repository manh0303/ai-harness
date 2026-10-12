# Design

## Context
Keep a dependency-free, offline instruction installer. Runtime permissions and user approval live
in the AI host. Preserve existing project files on update.

## Decisions
Shared `.harness/environment.json` defines tools, file locations, commands and required flags.
Optional `.harness/machine.json` overrides only declared executable/file paths; it cannot change
commands or weaken required flags. Machine values precede shared values. ${ENV_NAME} references
use the current process environment; no shell, dotenv or tilde expansion. Diagnostics do not print
values or arguments. Installer appends an anchored ignore rule without replacing other rules.

`aih setup` returns a read-only, host-facing question plan, not a terminal wizard. Hosts inspect
existing answers first, ask 1–3 consequential questions with recommendations justified by evidence,
and record answers. No new capability or skill group is necessary.

`aih ready ID --stage implement|review` checks missing files, draft placeholders, declared open
decisions and (for review) incomplete tasks and verification evidence. Post-merge archive tasks are
excluded only under a documented After merge section. JSON records are human/host statements,
not attestations. Code blocks are excluded from Markdown placeholder/task scans.

## Risks / Trade-offs
Structural readiness cannot detect every semantic ambiguity, invented answer or fabricated test.
Ignored files already tracked by Git remain tracked; installer does not mutate Git index.
Executable presence does not imply compatibility, trusted content or successful invocation.
No real-model benefit claim until controlled trials exist.

## Migration and rollback
Update seeds a shared environment contract and ignore rule but never creates private machine data.
Existing project-owned values survive. Existing change documents are untouched.
Revert the consumer installation commit to roll back; major migration policy remains unchanged.

## Open Questions
None blocking implementation within the user-authorized scope. Live-model evaluation remains
unperformed and must be recorded as such, not as a passing check.
