# Verification evidence

Initial candidate checked locally on 2026-10-10 UTC (2026-10-11 in Vietnam).

| Check | Result | Scope |
| --- | --- | --- |
| python3 -m unittest discover -s tests -v | 33 passed on Python 3.12.14 | 28 installer tests and 5 evaluation-report tests |
| python3 scripts/validate.py | Passed | 4 adapters, 5 skills, 44 managed files with all adapters |
| Git whitespace validation | Passed | Staged source diff |

The tests use temporary synthetic projects, never reference CRM data. Failure tests cover changed files,
collisions, unsafe paths, lock tampering, concurrency marker, rollback, missing config and version guards.
Evaluation report tests use explicitly synthetic scores and do not represent live model performance.

Not yet run: upstream OpenSpec CLI validation; remote GitHub Actions matrix; consumer Java/React/native
application builds; live LLM evaluations. No live provider credentials or model calls are needed for
the current offline test suite. Adapter commands are advisory examples, not tested application builds.

Self-review covered ownership boundaries, no-network behavior, plain JSON error output, documentation
limits and exclusion of reference-project details. It is not an independent security audit.
