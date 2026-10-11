# Versioning and migration

Framework version is in harness.yaml and package.json; keep both and package-lock.json synchronized. Use three-part SemVer releases and Git tags vX.Y.Z after review.
0.6.0 was initially published manually to npm. Future versions are prepared by Release Please after human PR review; do not publish directly from a feature PR.

- Patch: compatible corrections to instructions or installer defects.
- Minor: backward-compatible adapter, skill or CLI additions.
- Major: incompatible CLI behavior, installed layout or configuration contract.
- During 0.x, potentially disruptive changes still require a migration note and explicit review.

schema_version versions serialized manifests/config/locks independently. Unsupported schemas are
rejected, not guessed. Future schema changes need an explicit migration; this version supports schema 1.
The CLI refuses all version downgrades and requires --allow-major when the major number changes.
It does not fetch releases or silently follow main. Pass a reviewed local checkout via --source.

See [release policy](release-policy.md) for independently versioned module contracts and single release-PR version ownership.

## Release procedure

**Current automation (after v0.6.0):** Release Please maintains the root distribution version, changelog and JSON-formatted harness.yaml. The human review/merge of its generated Release PR is the explicit publishing approval. See [npm release](npm-release.md).
1. Update harness.yaml, CHANGELOG and migration notes. Review policy/behavior changes as code.
2. Run structural validation and CLI tests on the supported Node.js 22/24 and OS matrix, including actual npm package smoke tests.
3. Run the behavioral evaluation suite with the intended agent/model if prompts materially changed.
4. Inspect the install/update diff in a sample consumer; document source commit and limitations.
5. Merge feature PR by human decision. Release Please opens a separate version/changelog PR; after human review and merge, the release workflow creates the tag and GitHub Release and publishes npm from the same workflow through OIDC. Merge of feature PR alone does not publish.

## Consumer update
Create a branch, commit current state, obtain the reviewed source commit/tag and inspect CHANGELOG.
Run update --dry-run; resolve conflicts by moving custom rules into .harness/local.md and restoring
managed files from the last installation commit. Apply update and run check plus application tests.
Commit the installed snapshot, selection and lock together. Revert that commit to roll back.
No destructive force mode is provided. Do not remove conflict checks or edit hashes to force an upgrade.

## 0.1 → 0.2 migration
0.2 replaces the Python entry points with Node.js 22+ and the npm `aih` executable. This is an explicitly
reviewed 0.x CLI change: scripts invoking cli/harness.py or python -m cli must switch to aih or
node /trusted/package/bin/aih.js. Python is no longer required by the installer. The ai-python adapter
still documents Python application tooling; that is independent of the installer runtime.

The installed layout and schema-1 lock/config remain compatible. Install the new CLI, commit existing
consumer state, then run `aih check`, `aih update --dry-run`, `aih update`, and `aih check` in the project.
The migration test uses a real synthetic Python 0.1 installation, including original SHA-256 hashes.
Modified managed files block migration; local.md, project config, OpenSpec changes and text outside the
AGENTS markers survive. The npm tool version and the installed snapshot version may differ until update.

See [npm release procedure](npm-release.md). Repository merge does not publish a registry package.

## 0.2 → 0.3 migration
Adapter metadata moves from adapter.json schema 1 to adapter.yaml schema 2. All YAML files parsed by
the harness remain JSON-compatible YAML 1.2; no generic YAML parser or runtime dependency is added.
Installed project/lock schema stays 1. Both Python 0.1 and npm 0.2 snapshots can update directly to 0.3.

On a consumer branch, run aih check, aih update --dry-run, aih update and aih check. Unmodified old
adapter.json files are removed; new rule/check/evaluation files and exposed skills are added. Edited
old files block the whole update. Project config, local.md, OpenSpec changes and AGENTS text outside
markers remain project-owned. Review the expanded managed snapshot before committing.

Existing snapshots still support check/doctor with the new CLI. verify/eval require 0.3 adapter assets
and explain when update is required. Changing adapters in project.json plus update removes only unchanged
managed skills of deselected adapters. init still defaults to core-only; detection never silently changes
an installed selection. Installing the CLI alone does not update the consumer snapshot.

Custom source adapters must adopt schema 2 before use with the 0.3 installer. The legacy adapter.json
source format is not accepted; backward compatibility covers installed snapshots, not old source bundles.

## 0.3 → 0.4 migration
Project config and lock schema remain version 1. New installations write `capabilities: []`;
older snapshots without that field remain readable by `aih check` and upgrade with
`aih update`. The new field is optional for existing projects. To opt in, add
`"capabilities": ["uiux"]` in project.json, review `aih update --dry-run`, update and
check on a branch. Existing adapters, local overrides, old OpenSpec changes and AGENTS
content outside markers remain preserved. Unmodified deselected capability files may be
removed through update; edited managed files block changes. This is a monorepo single-package
release, not remote lazy downloads. Figma/Confluence accounts are not configured by CLI.

## 0.4 → 0.5 migration

Installed project config and lock remain schema 1. `product` is opt-in for new
or already-installed consumers. Existing UI/UX capability metadata remains valid;
Product additionally declares optional validated agents/templates lists. Review
`aih update --dry-run` before update. Generated `docs/product/` drafts from
`aih new-doc` are project-owned, never managed or removed by subsequent updates.
Do not treat raw Confluence data, drafts or AI review as approved business decisions.

## 0.5 → 0.6 migration

No new configuration/lock schema version: 0.5 Product templates, `aih new-doc`, UI/UX and all earlier adapter selections stay compatible. New DevOps and Kubernetes modules are opt-in. On a consumer branch, pin a reviewed 0.6 source/package, add `"devops"` to `.harness/project.json` capabilities and/or `"kubernetes"` to adapters, then run `aih update --dry-run`, `aih update` and `aih check`. Unmodified installed payload updates safely; any drift still blocks update. Application DevOps workflows remain instruction-only and do not deploy production workloads; a separate repository-level npm workflow publishes only after a human-approved Release Please PR creates a tagged GitHub Release.

## Foundation hardening (unreleased after 0.6)

Module contracts gain optional version and dependency fields without changing config/lock schema 1. Existing consumer snapshots retain default adapter-only verify/eval. After a reviewed update, `--scope all` enables locked Core/capability/composition evaluation, and `--scope core` works in core-only projects. Feature branches keep the latest release version; Release Please's generated PR chooses and synchronizes the next number. Use tagged releases for other consumers rather than interpreting an unreleased commit as a published update.
