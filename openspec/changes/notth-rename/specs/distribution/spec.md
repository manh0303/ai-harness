# Distribution identity

## ADDED Requirements

### Requirement: Notth identity is consistent across npm and current repository references
The distribution SHALL use npm name @manhd_d/notth and repository manh0303/notth while preserving
the Release Please-owned version sequence and shared Python payload.

#### Scenario: Reviewed renamed release
- WHEN the release metadata and package are validated
- THEN npm manifest, lock, release configuration and publish guard agree on the new name
- AND Python still publishes as manhd-ai-harness from the same version and bundle

### Requirement: Installed AI Harness projects remain compatible
The CLI SHALL preserve legacy ownership identifiers, user data, skill IDs and configuration schemas.

#### Scenario: Update an existing installation
- WHEN an unmodified legacy managed snapshot is updated with Notth
- THEN exactly one managed AGENTS block remains and check succeeds
- AND project-owned context/config and text outside the block remain unchanged

### Requirement: Registry migration requires verified publication
Maintainer guidance SHALL require verification of the new npm package before deprecating the old one.

#### Scenario: New package needs bootstrap
- WHEN no working publisher exists for the new package
- THEN the maintainer follows authenticated publication from a reviewed release tag
- AND configures the new repository publisher before subsequent automated releases
