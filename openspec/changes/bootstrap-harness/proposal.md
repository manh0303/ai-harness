## Why
Project-specific AI workspaces mix reusable instructions with domain details and lack repeatable upgrades.
The owner requests a private reusable framework with safe installation, technology adapters and PR review.

## Sources
- Owner's request to create manh0303/ai-harness, private, feature branch and unmerged PR.
- Supplied crm-workspace.zip; analysis recorded in docs/reference-analysis.md.

## What Changes
Introduce original core rules, policies, skills, agent contracts, workflows and OpenSpec draft templates.
Add four adapters and opt-in GitHub/GitLab/MCP integration templates.
Implement offline init/update/check/doctor/new-change commands, content locking and behavioral tests.
Add a model-behavior evaluation dataset and manual-score validator, independent of CLI tests.

## Capabilities
### New Capabilities
- `harness-installation`: Install, verify and safely update a reusable instruction snapshot.
### Modified Capabilities
None.

## Impact
Only the new ai-harness repository. No changes to reference CRM repositories, application deployments,
user model accounts or production systems. No automatic merge, live model runtime or RAG service.
Remote repository creation and review delivery require an available authorized GitHub creation path.
