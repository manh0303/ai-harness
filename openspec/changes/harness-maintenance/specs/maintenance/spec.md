## ADDED Requirements

### Requirement: Canonical maintainer entry point
Repository maintainer entry points SHALL link a single guide that maps component ownership and
upgrade impact without duplicating consumer instructions or release policy.
#### Scenario: Maintainer begins an upgrade
- **WHEN** a contributor follows root AGENTS, README, CONTRIBUTING or the PR template
- **THEN** the canonical guide and impact checklist are discoverable.

### Requirement: Explicit impact disposition
The guide, impact template and PR checklist SHALL cover the same eight areas with done, pending or
not-applicable status and evidence/reason. CI checks structure; reviewers judge semantic completeness.
#### Scenario: Unaffected component
- **WHEN** an area requires no code change
- **THEN** its reason remains visible rather than omitting the area or forcing unrelated edits.

### Requirement: Discoverable installed rules
Every registered adapter's declared rules SHALL be distributed and referenced in its rules index;
every Core rule SHALL be distributed and referenced from generated consumer AGENTS.
#### Scenario: Missing index reference
- **WHEN** an adapter declares a rule but the index omits its path
- **THEN** the maintenance regression test fails with the adapter/rule path.
#### Scenario: Consumer installs Core
- **WHEN** Core is bundled
- **THEN** its rule discovery links resolve and maintainer impact instructions are not installed.
