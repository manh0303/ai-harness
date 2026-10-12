# Agent configuration and model routing
## Why
Role contracts exist but model/reasoning/execution preferences are not centrally declared. Users need
portable project-owned settings and clear host compatibility limits without an orchestration runtime.
## What Changes
Add config/agents.default.json, project-owned agents.json, recommended/economy/custom init presets,
strict validation and read-only setup routing/host guidance. Namespace roles and preserve overrides.
Add token-conscious workflow, documentation and tests. Fix version-hardcoded release update regression.
## Impact
No network/provider call, agent runner, usage meter or automatic native-config write. Project/config/lock
schemas remain 1; agent configuration has its own schema 1. Distribution version remains release-owned.
