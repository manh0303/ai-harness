## ADDED Requirements
### Requirement: Proportional solution workflow
The host SHALL link source requirements, MVP, quality constraints, architecture decisions and delivery
plan to implementation; small tasks may use a compact note instead of complete document sets.
#### Scenario: Existing application
- **WHEN** approved documents and module boundaries exist
- **THEN** the host reuses them and resolves only relevant gaps before changes.
### Requirement: Explicit architecture and product decisions
MVP SHALL include a complete user outcome and minimum safety/data integrity. Architecture choices
SHALL explain alternatives and drivers; local patterns SHALL address concrete needs.
#### Scenario: Suggested Ports and Adapters
- **WHEN** a user asks for Factory in a CRUD application
- **THEN** the host distinguishes application architecture from creation patterns and justifies only necessary complexity.
### Requirement: Capability-scoped document drafts
new-doc SHALL default to Product and allow an explicitly selected installed capability's locked template.
#### Scenario: Architecture-only consumer
- **WHEN** new-doc overview --capability architecture runs with Architecture installed
- **THEN** it creates a project-owned docs/architecture/overview.md without requiring Product or overwriting files.
### Requirement: Durable context and delivery evidence
Project maps SHALL link verified source revisions and public boundaries; delivery dates and completion
claims SHALL use actual owner/team evidence.
#### Scenario: Stale project map
- **WHEN** the touched source differs from the map
- **THEN** the host identifies drift and updates affected context based on a reviewed decision.
### Requirement: Host setup transparency
Host guides SHALL cite official discovery mechanisms, preserve user configuration and provide a
read-only verification prompt and manual-loading fallback without asserting untested native integration.
#### Scenario: Skill discovery unavailable
- **WHEN** a host does not discover installed skills
- **THEN** it loads the relevant locked SKILL.md on explicit request and reports the discovery limitation.
