# Verification evidence

0.2.0 candidate checked locally on 2026-10-10 UTC with Node.js 24.19.0 and npm 11.9.0.

| Check | Result | Scope |
| --- | --- | --- |
| npm test | 37 passed | 32 installer tests and 5 synthetic evaluation-report tests |
| npm run validate | Passed | 4 adapters, 5 skills, 44 managed files with all adapters |
| npm run test:package | Passed | Real npm tarball, global executable and local npm exec, offline cache |

The package test covers cwd default, all adapters, hidden OpenSpec template, new-change, idempotent
update and source resolution from node_modules. The legacy migration fixture is an actual synthetic
Python 0.1 installation; Node checks original hashes and upgrades it without modifying user-owned text.
Failure tests cover drift, collisions, traversal/symlinks, lock tampering, concurrent installation,
rollback, missing config and version guards. Tests do not use CRM data or model credentials.

GitHub Actions is configured for Node 22/24 on Ubuntu and Windows; see the PR checks for remote results.
Not run: upstream OpenSpec CLI validation, consumer Java/React/native builds or live LLM evaluations.
Passing synthetic report tests is not evidence of model quality. This is not an independent security audit.
