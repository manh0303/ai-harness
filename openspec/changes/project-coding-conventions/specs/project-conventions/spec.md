## ADDED Requirements

### Requirement: Scope-aware convention selection
The Harness SHALL instruct the host to classify affected modules as new, maintain or mixed and use
reviewed project conventions before adapter defaults within security and authorization boundaries.
#### Scenario: Maintenance in a mixed repository
- **WHEN** the target module uses a different established layout from another module
- **THEN** the host follows the target scope and identifies consequential conflicts instead of migrating it.
#### Scenario: New application
- **WHEN** no existing implementation establishes conventions
- **THEN** the host proposes a minimal applicable baseline and resolves only consequential unknowns.

### Requirement: Reuse and boundary evidence
The host SHALL search relevant code before creating new components and record inspected paths,
reuse choices, placement and reasons for new code proportional to the task.
#### Scenario: Existing common behavior
- **WHEN** a supported shared API already implements the required behavior
- **THEN** the host reuses it without creating a parallel abstraction.
#### Scenario: Inappropriate common dependency
- **WHEN** reuse would require private module imports or moving domain logic into common
- **THEN** the host preserves boundaries and explains an appropriate local implementation.
#### Scenario: Unsafe legacy pattern
- **WHEN** a neighboring implementation has unsafe authorization or secret logging
- **THEN** the host flags it and proposes a bounded safe approach instead of copying it for consistency.

### Requirement: Distribution and ownership
The installer SHALL distribute Core rules and only selected adapter convention assets while preserving
project-owned facts and unmanaged AGENTS content on update.
#### Scenario: Existing consumer update
- **WHEN** an unchanged older managed snapshot is updated
- **THEN** new rules/checks/cases are available and local.md remains byte-identical.
#### Scenario: Read-only setup
- **WHEN** setup emits project-mode suggestions
- **THEN** it writes no answers, does not infer mode, and does not run application commands.

### Requirement: Honest verification
Review SHALL distinguish application check results, manual boundary review and unperformed live-agent
evaluations from Harness snapshot validation.
#### Scenario: No architecture checker
- **WHEN** only manual dependency review is available
- **THEN** the report states that limitation and does not claim automated architecture compliance.
