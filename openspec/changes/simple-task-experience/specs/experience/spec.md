# Task experience

## ADDED Requirements

### Requirement: Compatible readable presentation
The CLI SHALL provide optional human summaries without changing default JSON or exit semantics.

#### Scenario: Install and orient in chat
- WHEN a supported command uses --format human
- THEN it shows a bounded relevant summary and warnings without a raw managed file inventory.
- WHEN start --chat is used on any host
- THEN it returns read-only orientation without asking terminal questions or saving a task.

### Requirement: Evidence-aware next action
Status SHALL derive actions from local tasks and recovery without claiming remote delivery.

#### Scenario: Stale or uncertain recovery
- WHEN a checkpoint has changed baseline or unresolved operations
- THEN the next action calls for reconciliation before retry, with unknown remote state.

### Requirement: Proportional task and design workflow
Core SHALL route by impact, reuse decisions and load only relevant context. UIUX SHALL scope required
sections and select an authorized output type without requiring Figma.

#### Scenario: Small task and unavailable tool
- WHEN a narrow task needs no external service
- THEN it avoids unrelated setup and full document scaffolding.
- WHEN editable design is required but unavailable
- THEN it records the blocked deliverable and asks before substituting a preview.

### Requirement: Honest live validation
Evaluation SHALL distinguish local CLI evidence from observed host execution.

#### Scenario: No host executable
- WHEN live host access is unavailable
- THEN trials remain NOT_RUN and no productivity or native-discovery success is claimed.
