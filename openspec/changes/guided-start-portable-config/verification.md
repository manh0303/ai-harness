# Verification

Base commit c6223c7b325111d5b81fc9ee0b853efed8c86695; local initial Git tree exactly matched
remote 1d69a8fa7f990e11712e378b48816c5860bfc0fa before changes. Main rechecked unchanged before PR.

## Required gates

| Gate | Actual result |
| --- | --- |
| npm test | 232 passed, 0 failed/skipped |
| npm run validate | status ok, zero structural/link errors |
| npm run check:release | status ok, distribution 0.13.0 unchanged |
| npm run test:package | status ok; actual offline tarball, global and local installation |
| git diff --check | passed |

13 targeted intake/portability tests exercise saved choices, update preservation, wizard repeat, invalid
inputs/checkpoints, byte-exact config roundtrip/restore-before-init, transfer autonomy removal, dry-run
conflicts and automatic before-backup, tampered/schema/path/JSON rejection, symlink/size/existing-output
refusal, ordinary write rollback, CLI flag validation, missing/blocking resume state and active marker.

Actual package smoke additionally ships all new CLI/docs assets and exercises start, backup, transfer
dry-run, fresh restore-before-init and final check via the globally installed real package. Existing local
installation smoke and full adapter/capability/migration suite also pass. Linux local execution only;
Windows/Node matrix is delegated to repository CI, not inferred from this result.

Actual PTY/manual check: fresh Core init → start → Idea → task "Plan a small inventory tool"
→ no requirement path yet → default docs/product. Process exited 0, start.json stored goal/task,
artifacts.json stored proposed docs destination, and a pre-change config backup was reported. No AI
model/API was launched and no semantic interpretation of real customer documents was evaluated.

## Limits and review

Two Core behavioral scenarios are supplied but unscored; independent intended-host/model evaluations
are NOT_RUN. Upstream OpenSpec validation is NOT_RUN (structural validate is separate). No logged-in
Confluence/Figma/native model loading, credentials/permission restoration, cloud backup copy, full repo
recovery or npm release/publish is claimed. File digests are not authentication; archive is plain text
and not a universal secret scanner. Checkpoints/docs/custom skills require independent repo/external
backup; update preserves user bytes and unknown files. Transactions roll back ordinary errors but not
power-loss/process-kill scenarios. Restore only supports known schema versions and reviewed modules.

## Local log receipts

Raw output retained in the task scratch workspace; CI is the independently accessible review evidence
once the PR run finishes. These hashes identify the local captures, not a claim that logs are published.

| Capture | SHA-256 |
| --- | --- |
| all-tests.log | `eb66baa3e24514d29e7fe259005fa4710dd83c0485c95312a2353706ab63e4be` |
| package.log | `0863a4d665f25bc9a3e511ea4d1668e2994f24f0fde620820b1cf1b4fd96ff2b` |
| final-start-tests.log | `4a6c8423632d886d7f2d510830067d7fd168443e5ff15f9f56a87b28cb8ce112` |
