## ADDED Requirements

### Requirement: Adaptive start entry
The CLI SHALL preserve canonical project configuration and offer terminal intake or read-only non-TTY plans.
#### Scenario: Existing source answers
- **WHEN** source/output declarations or a saved task exist
- **THEN** reuse them, offer continue/new task, and do not force model configuration.
#### Scenario: Missing intake
- **WHEN** a user specifies goal/task and an undeclared input/output location
- **THEN** validate and save only accepted choices with a host handoff; backup before changing existing files.

### Requirement: Bounded user configuration backup
The CLI SHALL export only allowlisted shared settings and explain excluded docs/state/credentials.
#### Scenario: Reinstallation
- **WHEN** a user restores a valid config archive before init in a fresh copy of the same project
- **THEN** exact user bytes and selected modules survive installation.

### Requirement: Restore conflict and safety
The CLI SHALL reject unsupported schemas, invalid config/digests, unapproved paths and unsafe target entries before writes.
#### Scenario: Existing different file
- **WHEN** a config differs
- **THEN** dry-run previews conflict; restore requires --replace, writes before-backup and rolls back ordinary write failures.

### Requirement: Project transfer
The CLI SHALL reuse only module/model preferences for transfer and strip repository autonomy.
#### Scenario: Different project
- **WHEN** --transfer restores an old archive
- **THEN** old task/domain/input/output/commands/connections/OpenSpec state are excluded and the user establishes the new project context.
