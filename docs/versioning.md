# Versioning and migration

Framework version is in harness.yaml. Use three-part SemVer releases and Git tags vX.Y.Z after review.
0.1.0 is an initial candidate, not a claim of published/tagged release. Do not publish from a feature PR.

- Patch: compatible corrections to instructions or installer defects.
- Minor: backward-compatible adapter, skill or CLI additions.
- Major: incompatible CLI behavior, installed layout or configuration contract.
- During 0.x, potentially disruptive changes still require a migration note and explicit review.

schema_version versions serialized manifests/config/locks independently. Unsupported schemas are
rejected, not guessed. Future schema changes need an explicit migration; this version supports schema 1.
The CLI refuses all version downgrades and requires --allow-major when the major number changes.
It does not fetch releases or silently follow main. Pass a reviewed local checkout via --source.

## Release procedure
1. Update harness.yaml, CHANGELOG and migration notes. Review policy/behavior changes as code.
2. Run structural validation and CLI tests on the supported Python matrix.
3. Run the behavioral evaluation suite with the intended agent/model if prompts materially changed.
4. Inspect the install/update diff in a sample consumer; document source commit and limitations.
5. Merge by human decision, then tag the exact tested commit. No automatic merge/publish job is provided.

## Consumer update
Create a branch, commit current state, obtain the reviewed source commit/tag and inspect CHANGELOG.
Run update --dry-run; resolve conflicts by moving custom rules into .harness/local.md and restoring
managed files from the last installation commit. Apply update and run check plus application tests.
Commit the installed snapshot, selection and lock together. Revert that commit to roll back.
No destructive force mode is provided. Do not remove conflict checks or edit hashes to force an upgrade.
