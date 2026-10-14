# Delta requirements

## ADDED Requirements

### Requirement: Missing-only shared setup
The CLI SHALL keep setup read-only by default and SHALL support explicit --apply with optional --dry-run
to create missing shared config from a validated installed snapshot. It SHALL preserve existing user
bytes, payload/lock and machine data; no task or knowledge completion SHALL be invented.

#### Scenario: New teammate restores missing seeds
- GIVEN an intact installed snapshot and missing shared config
- WHEN setup --apply is requested
- THEN selection is recovered from the lock, missing configs are created and lock/payload are unchanged
- AND repeating the operation creates no changes

#### Scenario: Unsafe or invalid inputs
- GIVEN managed drift, changed module selection or invalid existing/proposed config
- WHEN setup --apply is requested
- THEN it fails before writes; ordinary write failures roll back already-applied changes

### Requirement: Scoped shared decisions
Project/module decisions SHALL be optional schema-1 project-owned data, distinct from change-local
decisions. Confirmed choices SHALL record answer/reason/source. Superseded records SHALL preserve
history and link same-scope confirmed replacement chains without cycles. Proposals SHALL not be approval.

#### Scenario: Reuse and reconsider
- GIVEN applicable confirmed choices and superseded/proposed history
- WHEN a host starts a task
- THEN it reuses only applicable confirmed choices and inspects changed sources before asking
- AND do_not_ask_again never prevents material reconsideration or supplies permissions

#### Scenario: Portability
- GIVEN shared choices and a reconciled cache
- WHEN config backup/restore or transfer occurs
- THEN same-project backup/restore retains the choices while transfer omits them
- AND changing choices marks context stale

### Requirement: Proportional host interview and honest evidence
Existing/new-project guidance SHALL progressively establish relevant facts, save partial answers and
reuse them after interruption. Compact start SHALL be read-only orientation with freshness unchecked.
CLI/package checks SHALL not be presented as live model, hook or token-saving evidence.

#### Scenario: Interrupted new-project interview
- GIVEN saved user outcomes and confirmed choices but incomplete tooling
- WHEN onboarding resumes
- THEN the host asks only missing consequential questions and saves useful answers incrementally
- AND it does not force irrelevant stack/CI/MCP decisions or fabricate completed reconciliation
