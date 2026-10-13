# Design
## Context and decisions
Keep project/lock schema 1 and add independent schema-1 artifacts/integrations files. Both are
project-owned seeds; absent legacy configs are valid, invalid existing configs abort before writes,
and update never rewrites custom bytes. Avoid widening strict project.json or repurposing environment.
Use a shared JSON reader with size/path checks and input-free parse diagnostics.

Input/output IDs and kinds are open slugs. Location is a repository path or credential-free HTTPS URL;
connections are arbitrary MCP/connector/manual host aliases, not a vendor registry. Host credentials,
tools, concurrency checks and actual user/runtime permissions remain external. Connection declarations
cannot establish availability; reports say unverified.

At most one canonical artifact per kind/capability avoids duplicate masters. Distinct authoritative
documents may use distinct kinds or one collection source. Output sources/dependencies are validated,
including cycles. Local docs routes are per capability; configured contracts must choose a route before
new-doc. External new-doc returns the locked template and target, creates no local fallback and performs
no publication. OpenSpec stays at repository openspec; external specs can be inputs/exports.

Configured outputs opt in to reviewed artifact-impact coverage in readiness. Every output is affected
or has an unchanged reason; changed read-only artifacts are blocked. Pending is valid for implementation;
review needs done/evidence. This is structure, not semantic synchronization or proof of truthful evidence.
Register high-level deliverable groups, not every page, to keep impact review proportional.

## Alternatives and trade-offs
A single broad tools config would blur resource locations, build tools and native credentials. Two small
project contracts keep ownership clear without building an orchestrator. Automatic connector discovery
or publication was rejected because host schemas/accounts/permissions differ. No generalized document
sync engine is introduced; the host maintains source revisions and reviewed diffs.

## Impact matrix
| Area | Status | Evidence / reason |
| --- | --- | --- |
| core | done | New artifact workflow, AGENTS discovery, setup/spec flow, advisory check and three unscored eval cases. |
| adapter | not-applicable | No adapter assets, registry, module contracts or detection changes. |
| capability-skill | done | Product 1.3.0 and UIUX 1.0.1 workflow routing/source-policy/maintenance links; skills and template catalogs unchanged. |
| cli-config | done | Schema/ref/path/policy/graph validation, preserved seeds, artifacts report, setup, routed new-doc and readiness; tests cover preflight/rollback. |
| workflow | done | Idea/document/UI flows reuse storage decisions and explicit host authorization; impact plan/evidence connects docs/spec/UI/code. |
| documentation | done | Artifact guide and examples, configuration/CLI/readiness/architecture/versioning, README translations and docs index. |
| verification | done | 172 tests, validation, release metadata and real npm tarball smoke; structural eval scenarios remain unscored. |
| release-migration | done | CHANGELOG Unreleased, module bumps and opt-in/legacy migration guidance; distribution version stays release-PR owned. |

## Compatibility and rollback
Legacy/unconfigured routes/readiness stay valid. Reviewed update seeds missing files, preserves old docs,
custom config and host settings; opting into outputs requires adding impact sidecars to old changes.
Review update diff and application tests. Revert the consumer installation/config commit to roll back;
never move immutable release tags or overwrite external revisions.

## Risks and limitations
JSON declarations are not connector enforcement, business approval or a semantic consistency validator.
A host must compare revisions and use safe concurrency or stop before writes. Credential keys/URL
parameters are rejected, but all secrets cannot be detected; keep credentials in the host secret store.
No live Figma/Confluence/Jira/database or model-compliance evaluation was run.
