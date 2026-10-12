# Design and impact: Harness maintenance

Base: main at 5ebed0fff92f5ac7ad7d15b8c672b34da614d317. Mode: maintenance of AI Harness.
Decision source: user requested implementation of the proposed linked maintenance guide on 2026-10-12.

Reuse existing module manifests and bundle(), the node:test suite, Markdown link validation and CI
`npm test` job. Do not introduce a second module registry, custom parser, runtime dependency or CLI.
Keep canonical guidance in docs/harness-maintenance.md and link specialized guides instead of copying.

## Impact matrix

| Area | Status | Paths / evidence / reason |
| --- | --- | --- |
| core | not-applicable | No Core runtime instruction changes; root AGENTS.md is a maintainer entry point, distinct from templates/AGENTS.md. Existing Core discovery is regression-tested. |
| adapter | done | Kubernetes rules.md lacked paths declared in adapter.yaml; add three references, checks pointer and module_version 1.0.1. Other adapter rules remain unchanged. |
| capability-skill | not-applicable | No new/changed skill or capability, no registration/exposure/handoff change. Existing skill matrix checks continue to run. |
| cli-config | not-applicable | No CLI, serialized schema, ownership or package allowlist changes. Docs use existing package inclusion; no maintainer template enters consumer managed assets. |
| workflow | done | Repository AGENTS, CONTRIBUTING, maintenance guide and GitHub PR template define the maintainer handoff and completion checklist. Consumer workflow is unchanged. |
| documentation | done | README and architecture/versioning/adapters guides point to the hub; hub links canonical assets and impact template. |
| verification | done | Four new link-chain tests plus all 138 tests passed; validate, release metadata and package smoke passed. See verification.md. No live-agent trial: only existing rule discovery changes, with behavioral requirements/cases unchanged. |
| release-migration | done | CHANGELOG Unreleased and versioning note cover Kubernetes patch discovery; normal snapshot update preserves ownership. No distribution version bump; rollback consumer update commit if needed. |

## Link chain
Maintainer AGENTS/README/CONTRIBUTING → docs/harness-maintenance.md → canonical contracts and impact
template → active OpenSpec design → PR checklist → existing CI test/validate/package gates.
Kubernetes manifest → existing bundle → generated AGENTS → rules.md → three declared rules →
existing checks/evals. New tests exercise the installed link chain; no substantive cluster rule changes.

## Risks and trade-offs
String/link tests verify explicit discovery contracts, not semantic consistency. The rule-index contract
requires each declared adapter rule to appear in its index and every Core rule in generated AGENTS;
intentional future routing changes must update the guide/tests together, rather than bypass the check.
Reviewers still judge impact reasons, live-agent evidence and whether a change's actual scope is covered.

## Migration
Maintainer guide changes require no consumer migration. Kubernetes consumers receive the rule index
patch through the usual reviewed update --dry-run, update, check process; schemas and ownership remain
unchanged. The guide/template are package documentation, not managed consumer instructions.

## Open questions
No unresolved consequential design choice; user authorization covers the bounded maintenance work.
