## ADDED Requirements

### Requirement: Machine-aware project context
The installer SHALL preserve shared project configuration and SHALL keep a machine override
path ignored without writing private path values itself.
#### Scenario: Internal Maven
- **WHEN** a project declares a Maven executable and a machine overrides its path
- **THEN** doctor checks that selected path and does not fall back to PATH or print private values.
#### Scenario: Invalid overrides
- **WHEN** a machine file changes commands, unknown tool IDs or required flags
- **THEN** schema validation fails without invoking a tool or rewriting project data.

### Requirement: Clarification before consequential work
The host SHALL inspect repository evidence and existing answers before asking 1–3 questions with
A/B/C options, a grounded recommendation, trade-offs and a free-text alternative.
#### Scenario: Missing duplicate-customer behavior
- **WHEN** authoritative sources do not define a consequential behavior
- **THEN** the host asks and records the user's decision before implementing the affected slice.
#### Scenario: Existing authorized scope
- **WHEN** answers and authorization already cover the work
- **THEN** the host continues without repeated confirmation.

### Requirement: Honest change readiness
The CLI SHALL identify missing documents, draft markers and unresolved declared decisions.
Review additionally requires completed pre-merge tasks and non-empty verification evidence.
#### Scenario: Draft change
- **WHEN** a newly scaffolded change is checked for implementation
- **THEN** readiness is blocked until placeholders and decision review are addressed.
#### Scenario: Review with skipped check
- **WHEN** a check was skipped with an explicit reason
- **THEN** the report exposes it for human review and never claims that check passed.
#### Scenario: Archive task
- **WHEN** only a task under After merge remains unchecked
- **THEN** structural review readiness does not demand premature archive or merge.
