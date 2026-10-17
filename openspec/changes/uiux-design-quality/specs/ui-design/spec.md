# UI design quality

### Requirement: Selective contextual design guidance
#### Scenario: Existing brand or tiny correction
WHEN a user requests a small UI change in an existing design system
THEN the host reuses canonical tokens/components and avoids a new master, blanket aesthetic bans or unnecessary variants.

### Requirement: Optional reviewed external skills
#### Scenario: Missing upstream prerequisites
WHEN external skill source, Python, network or Stitch MCP is unavailable
THEN the host records NOT_RUN/BLOCKED, performs no automatic installation and uses accepted local guidance/preview without claiming upstream execution.

### Requirement: Preserve editable deliverables and private sources
#### Scenario: Requested design service is missing
WHEN an editable service artifact is required but its authorized connection is unavailable
THEN the host reports the deliverable blocked and asks before substitution; no private source is uploaded without authorization.

### Requirement: One canonical design source
#### Scenario: External skill proposes another master
WHEN a design source already exists and a skill proposes a different output path
THEN the existing master is preserved and any agreed export records its source/revision rather than becoming an independent master.

### Requirement: Real preview review
#### Scenario: Build passes but visible or interaction defects remain
WHEN a build passes but actual UI evidence shows clipping or keyboard failures
THEN the reviewer records findings, performs scoped fixes and rechecks actual affected views; unavailable rendering is not reported as PASS.

### Requirement: Compatible selective installation
#### Scenario: Consumer update
WHEN a consumer updates UIUX 1.1.0 to 1.2.0
THEN new skill assets are locked/exposed while existing Figma IDs and project-owned design/context survive; edited managed files block update.
