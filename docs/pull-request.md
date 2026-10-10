## Problem
Project-specific AI workspaces mix reusable workflows with domain rules and do not provide safe,
repeatable installation and upgrades across Java, web/mobile and AI projects.

## Changes
- Add shared rules, permission/security policies, five skills, five role contracts and workflows.
- Add Java/Spring, React/Next.js, React Native and AI/Python adapters.
- Add a dependency-free Python installer with init/update/check/doctor/new-change, managed AGENTS block,
  SHA-256 lock, collision/drift refusal, path protections and ordinary-error rollback.
- Add OpenSpec drafts, GitHub/GitLab/MCP templates, versioning and consumer customization guidance.
- Add deterministic CLI tests and a separate human-scored AI evaluation dataset/validator.

Change ID: `bootstrap-harness`. Scope: this new repository only. Reference: supplied crm-workspace.zip,
generalized without client-specific data, source history or third-party skill copies.

## Verification
- 33 tests passed locally on Python 3.12.14.
- Offline structure validation passed: 4 adapters, 5 skills, 44 managed files with all adapters.
- Git whitespace validation passed.
- Pending: upstream OpenSpec validation, remote Python matrix, live model evaluation.

## Limits and rollback
Role/policy Markdown is advisory; enforcement belongs to the agent host and repository settings.
Hash locks detect drift, not malicious source/lock replacement. Updates are not crash-atomic.
Commit consumer state before installation/update and revert that commit to roll back.
No release tag, deployment, merge or auto-merge is part of this PR. Owner review is required.
