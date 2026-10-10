# npm CLI
## ADDED Requirements
### Requirement: Install with a standalone command
The distribution SHALL expose aih through npm and SHALL require no Python runtime.
#### Scenario: Global installation
- **WHEN** a user installs the tarball globally and invokes aih init in an existing project
- **THEN** the current directory receives the requested adapter snapshot and passes aih check
#### Scenario: Local installation
- **WHEN** a user installs the tarball under project/node_modules and runs aih using npm exec
- **THEN** installation succeeds using the package's own assets
### Requirement: Preserve legacy projects
The installer SHALL accept valid schema-1 Python 0.1 locks and preserve user-owned content on update.
#### Scenario: Edited managed file
- **WHEN** a legacy managed file differs from its recorded hash
- **THEN** update refuses before changing the project
### Requirement: Separate installation from publication
The repository SHALL document private source installation and SHALL NOT imply registry availability.
#### Scenario: Review build
- **WHEN** a maintainer runs the package smoke test
- **THEN** a tarball is installed offline without publishing any package
