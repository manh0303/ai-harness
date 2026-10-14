# Verification

Base main: 4871cb5e54e6065c8437192357fde70a6b517ceb. Linux, Node 24.19.0, Python 3.12.14.
Source cloned through Git and blob-checked against the GitHub main tree before changes.

| Check | Result | Evidence |
| --- | --- | --- |
| npm test | PASS: 282 tests, 0 failures | [raw output](evidence/test.txt) |
| npm run validate | PASS: structure/links/contract-table/manifest, no errors | [raw output](evidence/validate.txt) |
| npm run test:package | PASS: actual offline npm tarball/global/local installs | [raw output](evidence/package.txt) |
| python scripts/smoke-python.py | PASS: real wheel/sdist, pip no-index, .venv, byte parity, update/reinstall preservation, missing Node | [raw output](evidence/python.txt) |
| npm run check:release | PASS: distribution metadata stays 0.14.0; Python dynamic version | [raw output](evidence/release.txt) |
| git diff --check | PASS | Final local diff review |

Workflow tests cover invalid IDs/owners/checks/targets/forward cycles, permitted feedback, installed
lock drift, Product selection, stage-table equality, schema/check registry parity, opt-in approvals,
legacy ready behavior, and incorrect approval records. Existing readiness tests cover Markdown
scenario/decision/evidence/task validation, source/path safety and artifact impacts.

Runner tests use injected protocol fixtures (not live AI), actual Node subprocess exit/timeout checks,
dry NOT_RUN/null reports, host/judge failure handling, independent model configuration, transcripts,
assertion failures/missing-score rejection, requested/completed rate aggregation and existing scoring.
The Read-only driver does not claim code execution, multiagent or actual remote-action conformance.
Python package smoke compares every shared payload byte, installs in .venv beneath a project with
spaces, uses Node directly, force-reinstalls/updates without losing user content, exercises missing
Node, and rebuilds the exact wheel from sdist with pip --no-index and no build/runtime dependencies.

NOT_RUN: authenticated Claude/model trials, human sample audit, Windows/Python 3.9 execution on this
machine, upstream OpenSpec CLI semantic validation, IDE-native skill invocation/activation, other-host
or Temporal drivers, registry publication. CI declares Linux/Windows and Python 3.9/3.12; local success
is not proof that remote CI has run. PyPI project name reservation/Trusted Publisher/environment setup
are maintainer prerequisites; availability/account state has not been confirmed here.

Migration: reviewed CLI upgrade → backup → update --dry-run → update → check; old implement/review
remain compatible, --workflow opts into recorded entry approvals. New stage commands require updated
CLI and snapshot. Preserve actual review sources when recording approvals; records do not authenticate
identity or revision freshness. Re-export changed eval datasets/reports. pip needs Node 22+ and Python
3.9+, no npm/npx; avoid ambiguous launchers in PATH. Roll back consumer snapshot/config through Git
and before-backup. No version bump, feature auto-merge, release tag or publish is part of this PR.
