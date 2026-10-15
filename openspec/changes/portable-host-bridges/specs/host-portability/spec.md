# Host portability

## ADDED Requirements

### Requirement: Select one tool bridge transactionally
The installer SHALL accept one safe host ID on init/update, generate only the selected tool bridge
on fresh installs, retain previously managed bridges and reject comma lists before writes.

#### Scenario: Change from Kiro to Claude
- WHEN the user updates a Kiro snapshot with --host claude-code
- THEN it retains the Kiro hook/wrappers and adds the Claude entry point.
- THEN project facts, task, model settings and native config remain unchanged.

### Requirement: Preserve project instruction text
Copilot and Gemini native entry files SHALL use hashed managed blocks; surrounding text remains
project-owned. Claude SHALL reuse its managed import and canonical wrappers.

#### Scenario: Outside text changes
- WHEN a user appends team instructions outside a managed native block and updates
- THEN the appended text survives and check passes.

#### Scenario: Managed drift or skill collision
- WHEN managed bridge text changes or a conflicting native Harness skill already exists
- THEN update/init fails before any payload/config changes.

### Requirement: Reuse native discovery without duplicate payloads
Codex/Cursor/OpenCode/Windsurf SHALL use shared AGENTS.md; Kiro/Claude wrappers SHALL
reference canonical Harness skills. The installer SHALL NOT copy native settings/custom commands.

#### Scenario: Fresh project with one chosen tool
- WHEN a project selects one documented host
- THEN it receives one shared context/snapshot and the needed native bridges.
- THEN it has model defaults for the chosen host and no hardcoded machine-root hook command.

### Requirement: Keep empty task state valid
Fresh-project instructions SHALL leave start.json absent until a real task is saved.

#### Scenario: Transfer to another project
- WHEN a user follows setup/transfer instructions
- THEN project facts, decisions, knowledge and tasks are reconciled for the new project.
- THEN no invalid empty start.json or copied old lock is prescribed.
