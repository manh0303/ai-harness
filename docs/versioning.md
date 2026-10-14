# Versioning and migration

Maintainer entry point: [Harness maintenance and impact matrix](harness-maintenance.md).

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

## Project setup and readiness additions (unreleased)

The project/lock schema remains 1. Update adds optional project-owned environment.json plus the
scoped machine.json ignore rule and new managed workflows/templates. Existing local.md, environment,
machine data and old OpenSpec changes survive. No machine paths are created or committed automatically.
Doctor only enforces declared required environment entries; empty or absent configuration remains valid.
Existing changes need decision/evidence sidecars only when using the new ready command.

## Consumer update
For global npm installs, first run `npm install -g @manhd_d/ai-harness@latest`.
For local installs, update the local dependency and use `npx aih`.
`aih --version` identifies the CLI; `aih check` identifies the installed project snapshot.
`aih update` applies the installed CLI bundle (or explicit `--source`), without fetching releases.

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

## Project coding conventions (unreleased)

Config and lock remain schema 1. Core adds project-conventions.md; Java/Spring, React/Next.js and React Native module contracts advance to 1.1.0 with conventions, manual checks and evaluation cases. Distribution version remains release-PR owned. Reviewed update adds managed assets and preserves existing local.md, environment and unmanaged AGENTS text. Old local.md is not rewritten; the host can append missing facts after inspection. Re-export evaluation datasets/reports after update because bundle hashes change. See [Project conventions](project-conventions.md).

## Harness maintenance contract (unreleased)

Maintainer guidance and impact templates do not alter consumer instructions or schemas. Kubernetes module 1.0.1 adds discovery links to its existing rules; use the usual reviewed update dry-run/update/check sequence. Project-owned files remain preserved, and rollback uses the consumer installation commit. Distribution version remains Release Please-owned.

## Product, Architecture and Delivery (unreleased)

Product module 1.2.0 is additive; Architecture/Delivery start at 1.0.0 and are optional. Distribution
version remains Release Please-owned. Config/lock/capability schemas stay 1. Existing new-doc calls
keep Product paths and old PM role/plan template IDs. Explicit --capability selects another installed
module and requires declared locked metadata/templates; undeclared files are not document types.
On a consumer branch add architecture/delivery to project.json if needed, review update --dry-run,
update and check; existing docs, local facts and host bridges remain project-owned. Re-export eval
reports for the changed bundle. No automatic old-plan migration; revert installation commit to roll back.

## Agent routing and release-test repair (unreleased)

Agent config uses independent schema 1; project/lock schema remains 1. Reviewed update adds a locked
default and seeds agents.json only if absent; custom bytes and host files survive. Old alternate source
bundles use the CLI canonical seed if necessary. Existing configs are validated before writes and new
role gaps inherit/report project defaults. Inspect new payload/update diff; re-export eval reports after
bundle changes. Revert consumer installation commit for rollback. Release update tests use relative
versions instead of hardcoded 0.7.0, preserving downgrade refusal on future release branches.

## Frontend/mobile coding and onboarding (unreleased)

React/Next.js and React Native module contracts advance from 1.1.0 to 1.2.0 additively: existing skill
IDs remain, feature/screen and behavior-testing skills plus manual checks/unscored cases are added.
Project/lock/agent schemas and the distribution version stay unchanged. Existing consumers run the
usual reviewed update dry-run/update/check; local.md, agents.json, native host config and app files are
project-owned and preserved. Re-export eval reports after bundle changes; revert the consumer install
commit for rollback. See [Frontend/mobile coding](frontend-mobile.md).

## Artifact contract and integrations (unreleased)
New project-owned schema-1 artifacts.json/integrations.json are optional on legacy installs and
seeded when absent; custom bytes, source docs and native host configs are preserved. Project/lock
schemas remain 1. Product 1.3.0 and UIUX 1.0.1 connect routing/maintenance guidance. Configured docs
outputs override new-doc routes; external destinations return a handoff without local/remote writes.
Configured output contracts require artifact-impact.json in existing changes when using ready; copy
the installed template and record reviewed impact. No automatic migration of source documents or
external publication. Review update --dry-run/update/check; rollback through Git. See [Artifact contract](artifact-contract.md).

## Adaptive verification migration (unreleased)

Project/lock/artifact schemas and distribution version remain unchanged. Review source, update --dry-run, update and check to receive new managed Core skills and Product 1.4.0 templates. Existing project docs/configs remain owned by the project; new-doc never overwrites. New --adaptive/--report flags are optional; plain verify remains advisory. Revert the snapshot update commit to roll back.

## Continuous development migration (unreleased)

Product advances to 1.5.0; Architecture and Delivery to 1.1.0. Distribution version remains 0.11.0 and release-PR owned; no publish is part of this change. Config/lock/artifact/decision/evidence schemas stay unchanged. Reviewed update --dry-run/update/check adds the Core workflow and refreshed templates/skills. Existing project docs, changes, configs and handoffs remain project-owned; append missing baseline/handoff fields selectively. Re-export eval datasets after bundle changes; revert the consumer snapshot commit to roll back. See [Continuous development](continuous-development.md).

## Agent-first migration from 0.12.0 (unreleased)

Distribution version remains 0.12.0 until Release Please prepares a reviewed release. Plan a minor release with optional profiles/config fields and retained product/PM/template routes; four named recipes are retired with explicit migration guidance. Module versions advance; project/lock/config schema versions stay 1, with opt-in Claude managed paths. Old edited managed recipes/imports block update. Model/native settings and user docs are preserved; existing agent config is not replaced by host-native defaults. Check reviewed update --dry-run/update/check, retired catalog, required skill references and aliases; re-export evaluations and revert consumer snapshot commit for rollback. See [Agent-first guide](agent-first.md).

## Tool setup documentation (unreleased)

Kiro and the six-host onboarding refresh change documentation only. Distribution/module versions,
registry manifests, schemas and installed payload remain unchanged; this is a patch-level documentation
correction for the release PR to include. No consumer migration or snapshot update is required solely
for these guides. Kiro skill pointers are optional, project-owned and not generated/updated by Harness;
keep existing native configs. Claude agent-first flags are not in the 0.12.0 npm baseline: use the manual
import or a reviewed version that supports them. See [Tool setup](tool-setup/README.md).

## Guided start and portable user configuration (unreleased)

Distribution remains release-PR owned. Project/lock/agent/artifact schemas stay 1; optional user-owned
start.json and a separate allowlisted archive schema start at 1. update preserves user settings and
adds backup-folder ignore with the managed intake workflow. Existing config paths are retained; no
second user configuration directory is introduced. Run reviewed update --dry-run/update/check and
re-export evals. New commands require a supporting CLI release. Restore before init on a fresh repo;
transfer intentionally omits sources/tasks/state/autonomy. Unknown schema versions fail with no writes,
not automatic migration. Roll back the consumer snapshot via Git and settings via before-backup.
See [Configuration backup](configuration-backup.md).

## End-user acceptance (unreleased after 0.14.0)

Core adds a tool-neutral skill/workflow and optional adaptive-plan output. React/Next.js and React Native
modules advance to 1.4.0 for additive Core QA routing. Distribution stays release-PR owned; project/lock/
verification schemas remain 1. Existing behavior reports remain valid; optional end-user targets need
a matching real/not-applicable dependency interface journey. Browser/mobile/CLI reports claiming PASS
from transport-only assertions now fail consistency validation; rerun with actual user outcome evidence,
do not relabel transport observations as UI proof. Snapshot update preserves user config/docs/state.
Review update --dry-run/update/check; re-export eval datasets after bundle changes. Report files and
attachments are project-owned. Roll back the consumer snapshot commit and retain previous reports.
See [End-user guide](end-user-testing.md).

## Session onboarding migration (unreleased)

Distribution version stays release-PR owned. Project/lock/config schemas remain 1; optional structured
local.md and knowledge cache use independent schema 1. Legacy prose/configs survive. Use reviewed CLI:
backup, update --host kiro --dry-run, update --host kiro, check; first Kiro chat: /harness-start. Native
collisions/edited files block writes. Hook v1 targets IDE 1.x/CLI V3; older clients need a compatible
bridge. Revert consumer snapshot in Git, then reconcile cache. Config backup omits knowledge cache;
transfer removes old role extensions/autonomy. [Guide](tool-setup/kiro.md).
