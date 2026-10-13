# Verification evidence and limits

## Baseline and local execution
Base: 78369503aeb9c86b1b5176e27a2f8e6984372070. Reconstructed baseline tree exactly matches
remote 9dbb3f76a5ff435734708267c018104ddb5742e1. Tests ran against the proposed working tree
on Linux, Node 24.19.0, npm 11.9.0; logs and SHA-256 receipts are in verification.json.
Evidence describes this change's instruction/template/test payload, not a consumer application's runtime.

| Check | Result | Evidence |
| --- | --- | --- |
| npm test | PASS — 201 tests, zero failed/skipped | [Raw output](evidence/test.txt) |
| npm run validate | PASS — structure and local links | [Raw output](evidence/validate.txt) |
| npm run check:release | PASS — distribution stays 0.11.0 | [Raw output](evidence/release.txt) |
| npm run test:package | PASS — actual offline tarball, global/local install | [Raw output](evidence/package.txt) |
| git diff --check | PASS — no whitespace errors | Local command exit 0 |
| Upstream OpenSpec validator | BLOCKED — executable/pinned local dependency unavailable | No upstream validation claim |
| Independent live-agent evaluation | NOT_RUN — no intended-host run/scored raw traces captured | Cases remain null/unscored |

## Acceptance coverage
Manual instruction/source review below is author review, not independent approval or observed live
agent behavior. The seven Core scenarios and fixture setup are in [examples](../../../docs/examples/continuous-development.md).

| Requirement | Instruction/template evidence | Deterministic evidence / live limit |
| --- | --- | --- |
| CD-001 approved feature | Core baseline/impact, harness-spec, design baseline and stable traceability | Core-only install/discovery/newChange tests; continuous-feature unscored |
| CD-002 small bugfix | Entry depth, debugging compact note, unchanged reasons | No mandatory capabilities in Core-only install; continuous-small-bug unscored |
| CD-003 business rule | Cross-role impact, BA/SA skill deltas and code/test traceability | Selected skill distribution/checks and existing contract tests; continuous-business-rule unscored |
| CD-004 drift | Core authority resolution, Architecture drift and TechSpec conflict rule | Installed workflow and eval distribution only; continuous-drift unscored |
| CD-005 resumed baseline | Baseline reconciliation, project-map and tasks handoff | Synthetic older-source update preserves user docs/code/handoff/decisions/routes; dry-run and conflict tests; continuous-resume unscored |
| CD-006 external policy | Source policy, pre-write revision checks, proposal vs publication | Existing artifact contract rejects read-only update; required publication BLOCKED; alias remains unverified; continuous-read-only unscored |
| CD-007 feedback/completion | Backlog triage, Delivery evidence, Core completion and separate lifecycle | All seven cases exported unscored; composition selected only for matching modules; continuous-feedback unscored |

New tests do not simulate AI decisions or prove semantic source reconciliation. Existing adaptive
verification/report/TechSpec tests are reused (including actual isolated HTTP fixture assertions);
no new application runtime result is inferred. The package smoke exercises installed workflow discovery
and all seven unscored Core cases. No release/publish commands executed.

## Review and next step
Reviewed source vs request for proportional depth, current-source authority, stable IDs, preservation,
source-write constraints, schema compatibility and no automatic feedback expansion. No CLI/runtime or
adapter implementation changed. Product/Architecture/Delivery changes are additive; consumer schemas
remain 1. Re-export eval datasets after update; existing reports have older bundle digests.

Maintainer should review the PR and run actual consumer-host cases with raw traces and independent
scoring before claiming behavioral effectiveness. CI matrix results must be checked on the PR; this
local report does not claim Windows or Node 22 execution. Implementation complete does not mean
merged/released. Archive only after actual human merge; do not release or publish as part of this task.
