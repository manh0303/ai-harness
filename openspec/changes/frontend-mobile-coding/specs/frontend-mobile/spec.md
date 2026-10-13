## ADDED Requirements
### Requirement: Discoverable onboarding
Quick start SHALL show init, integrity check, host setup and a prompt for repository-grounded context.
CLI tables SHALL expose existing supported flags without implying interactive/native configuration.
#### Scenario: Claude or Gemini onboarding
- **WHEN** a user selects that host
- **THEN** instructions link native setup/model compatibility and SHALL NOT imply OpenAI routes run directly.
### Requirement: Selective technology coding skills
Each web/mobile adapter SHALL declare delivery and behavior-testing skills, retaining existing skill IDs.
#### Scenario: Plain React maintenance
- **WHEN** a feature uses existing client/query/form/router APIs
- **THEN** the skill preserves them and SHALL NOT impose Next.js or duplicate common infrastructure.
### Requirement: Honest verification boundaries
Skills SHALL distinguish mocked/component evidence from actual browser/server and native/device results.
#### Scenario: Only JavaScript tests are available
- **WHEN** native or browser checks cannot run
- **THEN** those checks remain explicitly blocked with follow-up rather than implicitly passed.
### Requirement: Safe distribution and update
Declared new skills SHALL be packaged, installed/locked only when selected and removed safely on deselection.
#### Scenario: Existing custom project configuration
- **WHEN** reviewed update adds skills to a two-skill adapter bundle
- **THEN** project/local/agent/native-host/application bytes remain owned by the project and preserved.
