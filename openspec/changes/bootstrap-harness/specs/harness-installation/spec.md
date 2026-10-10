## ADDED Requirements

### Requirement: Reusable installation
The CLI SHALL install shared core content and only explicitly selected technology adapters without network access.

#### Scenario: Install a Java and web project
- **WHEN** init selects java-spring and react-nextjs for an existing project directory
- **THEN** both adapters, core assets, skills and a content lock are installed without executing project commands

### Requirement: Preserve consumer content
The CLI SHALL preserve existing content outside its ownership and reject conflicting owned-file changes.

#### Scenario: Existing instructions
- **WHEN** AGENTS.md contains project text outside the managed block
- **THEN** installation and update preserve that text

#### Scenario: Edited managed asset
- **WHEN** a locked file differs from its recorded hash
- **THEN** update fails before modifying the payload and reports the conflict

### Requirement: Safe paths and bounded ownership
The CLI MUST reject path traversal, symlinks and overlapping source/target directories.

#### Scenario: Symlinked destination
- **WHEN** a destination parent or leaf is a symlink
- **THEN** the operation fails without modifying the symlink target

### Requirement: Versioned updates
The CLI SHALL refuse downgrades and require an explicit flag for major upgrades.

#### Scenario: Major version changes
- **WHEN** update changes the major version without --allow-major
- **THEN** it fails and leaves the installed snapshot intact

### Requirement: Verification and recovery
The CLI SHALL report managed-file drift and restore already changed file bytes after an ordinary write failure.

#### Scenario: Write fails midway
- **WHEN** a later file write raises an I/O error while previous writes succeeded
- **THEN** previous file bytes are restored where rollback I/O remains available

### Requirement: Draft-only change creation
The CLI SHALL scaffold a new OpenSpec change without approving, implementing, archiving or merging it.

#### Scenario: Existing change ID
- **WHEN** the requested change directory already exists
- **THEN** new-change fails without overwriting its contents
