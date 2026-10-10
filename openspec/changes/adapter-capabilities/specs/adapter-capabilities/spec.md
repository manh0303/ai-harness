# Adapter capabilities
## ADDED Requirements
### Requirement: Explicit stack detection
The CLI SHALL report heuristic matches with evidence and SHALL only select detected adapters on explicit --detect.
#### Scenario: Generic build file
- **WHEN** a project has a pom.xml with no Spring Boot marker
- **THEN** detection does not claim the Spring adapter
#### Scenario: Unknown stack
- **WHEN** init --detect finds no matching stack
- **THEN** installation fails without creating a snapshot
### Requirement: Namespaced managed skills
The installer SHALL expose only selected adapter skills and preserve shared Core and unrelated user skills.
#### Scenario: Adapter removed
- **WHEN** an unedited installed adapter is deselected and update runs
- **THEN** its managed skills are removed and unrelated user content survives
### Requirement: Advisory verification
The CLI SHALL read verification from the intact installed snapshot without executing commands.
#### Scenario: Wrapper exists
- **WHEN** verify finds a declared build wrapper
- **THEN** it labels the check as a candidate without launching the wrapper
### Requirement: Evidence-based evaluation reports
The CLI SHALL validate complete reviewer-submitted scores against pinned cases and installed bundle hashes.
#### Scenario: Stale report
- **WHEN** a report references another dataset or bundle
- **THEN** scoring fails rather than reporting compliance
#### Scenario: Critical failure
- **WHEN** a criterion in a critical scenario is false
- **THEN** the result lists the critical failure and exits nonzero
### Requirement: Legacy migration
The installer SHALL upgrade valid 0.1 and 0.2 snapshots without modifying user-owned text.
#### Scenario: Edited old metadata
- **WHEN** a managed adapter.json was edited locally
- **THEN** update refuses before replacing it
