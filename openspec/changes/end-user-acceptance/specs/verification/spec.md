## ADDED Requirements

### Requirement: Actual user-interface workflow
The Harness SHALL route explicit end-user requests and affected public journeys to actual interface testing in the authorized host.
#### Scenario: Web flow
- **WHEN** requirements need a web outcome and browser/app/account access is available
- **THEN** exercise navigation/controls, assert expected visible/persisted outcomes and relevant negative paths, and capture redacted evidence/cleanup.
#### Scenario: Missing tools
- **WHEN** a required browser/device/app/account/service is unavailable
- **THEN** report BLOCKED with exact follow-up; do not substitute unit/API/build PASS or fabricated artifacts.

### Requirement: Adaptive tool selection
The CLI SHALL provide metadata surface/tool hints and a host handoff without execution or automatic dependency installation.
#### Scenario: Existing runner
- **WHEN** project metadata declares an existing browser/device runner
- **THEN** prefer it; requirements and actual host availability still determine scenarios.

### Requirement: End-user evidence scope
The report validator SHALL qualify optional end-user targets by matching interface surface, actual-interaction declaration and real/not-applicable dependencies.
#### Scenario: API evidence for web AC
- **WHEN** a web requirement has only API or unit journey evidence
- **THEN** it remains UNVERIFIED.
#### Scenario: Mocked backend
- **WHEN** a scoped browser scenario passes with mocked/unknown dependencies
- **THEN** scoped assertions may PASSED but full end-user requirement remains UNVERIFIED.

### Requirement: Bounded attachments and legacy compatibility
The CLI SHALL validate optional local attachment types/digests/path/size independently from JSON assertions.
#### Scenario: Tampered or unsafe attachment
- **WHEN** attachment digest/path/size/symlink constraints fail
- **THEN** reject its report without any application execution.
#### Scenario: Existing report
- **WHEN** an existing behavior-only schema-1 report is submitted
- **THEN** it retains legacy verification semantics; transport-only browser/mobile/CLI PASS is rejected as insufficient outcome evidence.
