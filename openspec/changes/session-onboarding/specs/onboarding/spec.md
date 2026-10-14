# Session onboarding

## ADDED Requirements

### Requirement: Kiro session entry
WHEN a user opts into Kiro on init/update THEN native canonical skill wrappers and SessionStart v1 are locked,
custom files preserved and first-session /harness-start is documented. WHEN start --host kiro runs THEN it emits
a plan without terminal questions even with TTY. SessionStart does not itself authorize an interview or saved task.

### Requirement: Reusable project context
WHEN local.md lacks frontmatter THEN legacy prose stays valid and unchanged. WHEN structured context is present
THEN bounded schema-1 YAML/JSON is validated. WHEN sources/config/bundle change THEN seed --check reports stale;
ordinary untracked code or machine-path changes do not trigger full semantic seeding. record captures host-reconciled
hashes only after declared sources exist; it does not certify semantics. Missing/unsafe/tampered data fails safely.

### Requirement: Explicit skill and role dependencies
WHEN a skill declares requires THEN catalog metadata exposes it and doctor --skill reports missing local references
without secret values. MCP declaration alone cannot prove access. WHEN a role declares extensions THEN agentPlan
supplies canonical-first load order and missing files block that role. Transfer omits old repo-specific extensions.

### Requirement: Integration and proposal helpers
WHEN sync-integrations reads Kiro settings THEN only enabled aliases are added, preserving existing declarations,
without credentials/commands/env/endpoints/autoApprove or inferred tool lists. WHEN change-sidecars runs after an
external proposal THEN missing templates are created idempotently and existing sidecars remain byte-identical.
