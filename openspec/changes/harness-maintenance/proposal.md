# Harness maintenance contract

## Why
Rules, adapter metadata, workflows, tests and user documentation can drift when an upgrade changes
only one piece. Maintainers need one entry point that links the existing contracts and records impact.

## What Changes
Add a canonical maintenance guide, an eight-area impact template, a PR checklist and entry links from
repository AGENTS/CONTRIBUTING/README and technical guides. Add CI tests for discovery and linkage.
Fix Kubernetes's missing rule-index references uncovered by the new regression test.

## Impact
Maintainer instructions stay outside generated consumer AGENTS and managed templates. Kubernetes
gets a patch module version for rule discovery. Distribution version/schema/runtime stay unchanged.
No semantic completeness checker, automatic PR approval or claim of AI compliance is introduced.
