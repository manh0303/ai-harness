## ADDED Requirements
### Requirement: Project-owned agent configuration
init SHALL seed a valid recommended configuration and update SHALL preserve existing user bytes.
#### Scenario: Custom config survives update
- **WHEN** the project changes providers/models/roles/execution
- **THEN** a reviewed update validates but does not overwrite the file or put it in the lock.
### Requirement: Explicit model resolution
Configuration SHALL resolve aliases/provider/reasoning and reject malformed/cyclic/missing aliases.
#### Scenario: Alias typo
- **WHEN** an agent references an undeclared @alias
- **THEN** validation reports the config field without guessing a model.
### Requirement: Role identity and host boundary
Routing SHALL namespace roles and report installed role activity; model/account/effort availability
SHALL remain unverified without actual host evidence.
#### Scenario: OpenAI preference on Claude
- **WHEN** no user host mapping or compatible provider is supplied
- **THEN** setup flags incompatibility and does not change the provider/model automatically.
### Requirement: Advisory execution and premium opt-in
Single/hybrid/multi and concurrency/round limits SHALL remain declarative; no premium escalation occurs.
#### Scenario: Hybrid on unsupported host
- **WHEN** host delegation is unavailable
- **THEN** the host uses sequential roles or reports the limitation, never claims JSON spawned agents.
### Requirement: Non-interactive presets and backwards compatibility
init SHALL support recommended/economy/custom without terminal prompts and setup SHALL be read-only.
#### Scenario: Existing configuration with explicit preset
- **WHEN** a preset is requested against an existing project-owned config
- **THEN** installer refuses overwrite and directs the user to edit the file explicitly.
