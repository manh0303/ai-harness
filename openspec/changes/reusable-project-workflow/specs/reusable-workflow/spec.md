# Reusable workflow

## ADDED Requirements

### Requirement: Tool-neutral daily orientation
The CLI SHALL expose read-only status and bounded local changes without deriving delivery approval.

#### Scenario: Project and tool differ from the feedback source
- WHEN a user installs Core or a selected stack with their one chosen host
- THEN status/task selection behaves identically without assuming a domain/service fleet/IDE.
- THEN an optional knowledge tree is not automatically created.

### Requirement: Select and clear saved work safely
Start SHALL permit a change selection referencing an existing proposal, preserve resume checkpoint
gates, and clear saved intake only after backup while preserving change/evidence/docs.

#### Scenario: Select a change without checkpoint
- WHEN start saves goal=change with an existing proposal ID
- THEN status reports the saved ID/task and checkbox declarations without calling them verified.

#### Scenario: Invalid selection or incompatible flags
- WHEN a proposal is missing or an unsafe ID/clear combination is supplied
- THEN the CLI fails before changing saved state.

### Requirement: Portable declared file arguments
Command references SHALL reuse declared files with machine overrides and environment expansion,
without execution or value exposure.

#### Scenario: Machine-specific config file
- WHEN args reference ${files.config} and machine.json overrides that declared file path
- THEN doctor checks the selected path/reference without printing it or launching a command.

### Requirement: Recoverable verification and knowledge
Core instructions SHALL use actual project/host capabilities, source-linked optional knowledge,
incremental evidence/docs and existing baseline-aware checkpoint recovery.

#### Scenario: Interrupted grouped verification
- WHEN source/config/fixture state changes or a prior write has uncertain outcome
- THEN the host reconciles current state/ownership and reruns affected groups before trusting PASS.
- THEN missing host process tooling is BLOCKED and no unrelated process/shared DB is modified.

#### Scenario: Optional knowledge index
- WHEN a useful index is needed for a larger project
- THEN it points to authoritative sources/revisions at the declared location, without importing
  reference-domain rules or forcing a mandatory full tree/quiz.
