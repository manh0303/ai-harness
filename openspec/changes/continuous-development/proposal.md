# Continuous development & living documentation

## Sources and baseline
User task: successive feature/bugfix/business-rule changes with living documentation and one unmerged
PR. GitHub PR #40 was checked before implementation: merged at 2026-10-13T04:59:52Z, merge commit
09d13292f90eb8d659b43367d5f69986190bbc6e. Its adaptive verification and Product TechSpec are reused.
Base main: 78369503aeb9c86b1b5176e27a2f8e6984372070, tree 9dbb3f76a5ff435734708267c018104ddb5742e1,
distribution 0.11.0. Private repository snapshot obtained via authorized GitHub connector; reconstructed
local baseline tree exactly matches the remote tree. Local baseline commit is synthetic, not GitHub history.

## Why
Existing workflows describe initial delivery and individual artifact/evidence handling, but lack a
single consumer entry point reconciling current revisions with old handoffs and maintaining scoped
requirements/architecture/docs across changes. Feedback needs an explicit proposal boundary.

## What changes
Compose existing workflows/skills with Core continuous-development; extend existing OpenSpec
Markdown records, project-map/traceability/backlog templates, manual checks and unscored evals.
Support proportional small fixes, section-level source-policy maintenance, baseline drift and feedback.

## Capabilities
### New capabilities
- continuous-development: lifecycle coordination through existing records and host tools.
### Modified capabilities
- Product: feedback, stable traceability and selective maintenance; module 1.5.0.
- Architecture and Delivery: baseline/authority and evidence handoff; modules 1.1.0.

## Non-goals and authorization
No CLI command, schema, background watcher, runtime, network execution, new roles or skills. No adapter
changes. No full doc pack required for small tools. No merge, release, tag or npm publication. No claim
of live-agent effectiveness from deterministic checks. OpenSpec archive waits for merge.
