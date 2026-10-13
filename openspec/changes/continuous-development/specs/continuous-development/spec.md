## ADDED Requirements

### Requirement: CD-001 Approved feature baseline
The host SHALL record actual requirement/spec/ADR/code revisions and approval status, reuse existing decisions, and trace stable AC through the affected spec, code and checks.

#### Scenario: Approved feature baseline
- **WHEN** Approved feature and architecture sources are available
- **THEN** The host SHALL record actual requirement/spec/ADR/code revisions and approval status, reuse existing decisions, and trace stable AC through the affected spec, code and checks.

### Requirement: CD-002 Proportional small bugfix
The host SHALL use a compact existing note and focused regression, justify unchanged artifacts, and SHALL NOT require a full BRD/PRD/SRS/ADR pack or optional capability installation.

#### Scenario: Proportional small bugfix
- **WHEN** A compatible small bugfix has known expected behavior
- **THEN** The host SHALL use a compact existing note and focused regression, justify unchanged artifacts, and SHALL NOT require a full BRD/PRD/SRS/ADR pack or optional capability installation.

### Requirement: CD-003 Business rule contract impact
The host SHALL preserve the rule ID, analyze affected contracts/NFR/compatibility/migrations and regression boundaries, and update only affected spec/document sections.

#### Scenario: Business rule contract impact
- **WHEN** An accepted rule change affects API/data/event consumers
- **THEN** The host SHALL preserve the rule ID, analyze affected contracts/NFR/compatibility/migrations and regression boundaries, and update only affected spec/document sections.

### Requirement: CD-004 Resolve source drift
The host SHALL record concrete differences and source revisions, establish the authoritative source/owner decision before editing disputed behavior, and SHALL NOT silently choose code or docs as correct.

#### Scenario: Resolve source drift
- **WHEN** Documentation and implementation disagree without a resolved authority decision
- **THEN** The host SHALL record concrete differences and source revisions, establish the authoritative source/owner decision before editing disputed behavior, and SHALL NOT silently choose code or docs as correct.

### Requirement: CD-005 Reconcile resumed change
The host SHALL re-read current state, invalidate affected assumptions/evidence, repeat impact/checks as needed, preserve user edits and update existing change/map/decision records rather than create a parallel context store.

#### Scenario: Reconcile resumed change
- **WHEN** Current code, requirements, ADRs or user edits differ from the previous handoff
- **THEN** The host SHALL re-read current state, invalidate affected assumptions/evidence, repeat impact/checks as needed, preserve user edits and update existing change/map/decision records rather than create a parallel context store.

### Requirement: CD-006 Bounded source maintenance
The host SHALL obey read-only/propose/write and actual authorization, recheck revisions before writes, retain unrelated sections, and provide a source-linked proposal or BLOCKED handoff without fabricating access/content/publication. Proposal-only completion SHALL be distinguished from required canonical update.

#### Scenario: Bounded source maintenance
- **WHEN** Canonical source is read-only, unavailable or changed since inspection
- **THEN** The host SHALL obey read-only/propose/write and actual authorization, recheck revisions before writes, retain unrelated sections, and provide a source-linked proposal or BLOCKED handoff without fabricating access/content/publication. Proposal-only completion SHALL be distinguished from required canonical update.

### Requirement: CD-007 Feedback scope and completion
The host SHALL deduplicate proposed backlog items, distinguish defects from new scope and accepted decisions, and SHALL NOT automatically expand scope or promise dates. Completion SHALL link AC/results and docs/proposals, state BLOCKED/NOT_RUN and remaining work, and distinguish implementation complete, merged and released without static runtime PASS or self-approved business acceptance.

#### Scenario: Feedback scope and completion
- **WHEN** Bug/UAT/user/operational findings are supplied or a change is handed off
- **THEN** The host SHALL deduplicate proposed backlog items, distinguish defects from new scope and accepted decisions, and SHALL NOT automatically expand scope or promise dates. Completion SHALL link AC/results and docs/proposals, state BLOCKED/NOT_RUN and remaining work, and distinguish implementation complete, merged and released without static runtime PASS or self-approved business acceptance.
