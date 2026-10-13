# Agent-first portability

## ADDED Requirements

### Requirement: Scoped agent/design authority
The host SHALL select only relevant agent contracts and skills. Approved scoped SA/ADR decisions SHALL precede project conventions and adapter defaults without overriding actual permission/security boundaries. Installing an adapter SHALL NOT select infrastructure or a design pattern.

#### Scenario: Simple Spring CRUD
- WHEN approved design uses existing synchronous APIs
- THEN the adapter does not add a broker/cache/outbox and open design questions go to SA/owner.

### Requirement: Canonical profiles and aliases
Analysis/Discovery SHALL expose canonical Product skills selectively. Identical shared skills SHALL be exposed once. Existing product/PM/template IDs/routes SHALL remain usable with canonical ownership; existing docs/configs SHALL be preserved.

#### Scenario: Profile external document route
- WHEN Analysis requests TechSpec and canonical Product output is external
- THEN return the external handoff without creating a local fallback.

### Requirement: Brownfield native bridge
Default installation SHALL preserve CLAUDE.md/native settings/custom skills. Opt-in linking/wrappers SHALL preserve unrelated bytes, be idempotent, reject collisions and detect managed drift. Doctor SHALL distinguish local hints from verified host loading.

#### Scenario: Existing AGENTS and CLAUDE
- WHEN init --detect --link-claude is applied twice
- THEN old user text remains, the import is not duplicated and managed edits are detected.

### Requirement: Bounded Maven metadata
Detect SHALL follow declared safe modules at most two levels with explicit count/size bounds and per-POM evidence, without network/XML entity expansion.

#### Scenario: Spring child module
- WHEN root POM has no Spring dependency but a declared child does
- THEN Spring is a candidate with the child's path evidence.

### Requirement: Meaningful-step recovery
Checkpoint SHALL retain baseline/evidence, completed/pending tasks, blockers, side-effect identities/status and next action. Replacement SHALL require the observed prior digest and preserve history. Resume SHALL be read-only, flag stale source and require unknown side-effect reconciliation before retries.

#### Scenario: Interrupted publication
- WHEN checkpoint publication status is unknown and source changed
- THEN inspect actual source/remote state; do not blindly repeat publication or claim old verification is current.

### Requirement: Honest comparison and usage
The local comparison helper SHALL validate/summarize 3 tasks × 3 repeats × 2 conditions using supplied observations only. Missing values SHALL remain null; failures/interruptions SHALL remain visible. Optional autonomy/budget SHALL remain declarations requiring actual host/user authorization.

#### Scenario: No observed runs
- WHEN the comparison template is unperformed
- THEN all metrics remain null and no productivity improvement is inferred.
