# Design and impact

Base: main c6223c7b325111d5b81fc9ee0b853efed8c86695, tree 1d69a8fa7f990e11712e378b48816c5860bfc0fa.
Local baseline reconstructed from authorized connector + hash-matched prior Harness snapshots;
every file blob was checked against the remote tree before changes. Work on feat/guided-start-portable-config.

Keep existing project.json/agents.json/artifacts.json/integrations.json/environment.json/local.md;
optional start.json holds task only. Sources/outputs belong to the existing artifact contract.
Terminal start asks unresolved metadata fields; non-TTY start prints a host plan without writes.
The host reads sources, clarifies semantics, selects installed roles/skills and implements authorized scope.

Archive schema 1 permits only eight shared UTF-8 config files, 1 MiB each, 12 MiB archive input,
per-file digest and CLI version. No machine/credential/native settings, managed snapshot, code/docs,
custom skills, OpenSpec changes/state/evidence. Full recovery uses Git/external backup. Archive is
plain text and local until the user copies it elsewhere; digest is not authenticity or secret detection.

Restore validates archive, staged merged config and actual target paths before transaction. No overwrite
unless --replace; dry-run reports conflicts. Explicit replace writes a before-backup and uses existing
exclusive marker + rollback machinery, without claiming crash-safe transactions. Unknown schemas fail.
Transfer only imports module/agent preferences and strips old repository autonomy. Semantically rebinding
sources/outputs/commands/domain/host permissions belongs to new-project start, never automatic inference.

| Area | Status | Evidence/reason |
| --- | --- | --- |
| core | done | templates/AGENTS.md → core/workflows/project-setup.md → core/evals/cases.json |
| adapter | not-applicable | No stack assets/detection/convention/module contracts change |
| capability-skill | not-applicable | No role/skill/manifest additions; existing selective roles referenced |
| cli-config | done | start-config/start/portable-config/main; optional schema-1 task; harness install/check preservation, guard/transaction and backup ignore |
| workflow | done | Start → canonical configs → host prompt → installed setup and continuous-development workflows; same-repo vs transfer recovery |
| documentation | done | README four languages, docs/start/configuration-backup/project-configuration/cli/getting-started/architecture/versioning/index |
| verification | done | 232 tests pass; validate/check:release/package pass; actual TTY interaction and limitations in verification.md |
| release-migration | done | CHANGELOG Unreleased + versioning; no distribution/module version changes; explicit restore/update/rollback instructions |

Core has no independently declared module_version to bump. Adapter/capability versions unchanged
because their contracts/assets are unaffected. Source docs and application tests are not backed up or run.
