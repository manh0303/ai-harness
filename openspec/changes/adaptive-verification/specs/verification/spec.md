# Requirements

## ADDED Requirements

### Requirement: Proportional verification
The host SHALL discover scoped requirements/code/contracts and actual tools before selecting existing verification methods. Metadata-only CLI discovery SHALL remain unexecuted.

#### Scenario: Static project
A static project without API evidence SHALL NOT be forced into an API suite.

### Requirement: Honest evidence
Executed PASSED scenarios SHALL include digest-checked observations, requirement-linked assertions, bounded receipts and successful owned mutation cleanup. HTTP 200 and arbitrary exceptions SHALL NOT imply success. Unexecuted work SHALL remain BLOCKED/NOT_RUN; static claims UNVERIFIED.

#### Scenario: Failed business assertion
A typed PASS with mismatched JSON observation SHALL be rejected.

### Requirement: Selective TechSpec
Product SHALL combine requirements/code/contracts/evidence, preserve existing edits and source policies, route missing drafts through existing artifact outputs, and never overwrite existing documents automatically.

#### Scenario: Existing canonical document
CLI draft creation SHALL refuse an existing output; host SHALL propose affected sections only.
