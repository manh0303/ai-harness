# Design: Notth rename

## Identity and compatibility
Product Notth → package.json/package-lock.json/harness.yaml → npm allowlist and shared Python bundle
→ CLI help/README/host guides → reviewed aih update → integrity/package/migration checks.
Release Please keeps one distribution version; its package-name and release workflow guard use
@manhd_d/notth. Root manifest display name becomes notth. Internal installed paths, ownership markers,
archive kind, schemas, skills and Python distribution/import name are compatibility identifiers.
Old release evidence, changelog history and fixture bytes remain historical, not rewritten branding.

## First publication and external configuration
The repository rename does not rename registry packages or their publisher bindings. New npm name
requires a reviewed first publication plus new Trusted Publisher. PyPI retains manhd-ai-harness but
its repository claim must become notth. Package deprecation happens only after new install verification.
These external actions remain pending owner setup. No credentials are added to code/workflows.

## Maintenance impact
| Area | Status | Evidence / reason |
| --- | --- | --- |
| core | done | templates/AGENTS.md display branding; legacy ownership constants unchanged |
| adapter | not-applicable | No stack assets, detection or module contracts change |
| capability-skill | not-applicable | Existing IDs, manifests and procedures remain unchanged |
| cli-config | done | cli/main.js help, metadata/lock/harness display; CLI migration regression |
| workflow | done | npm-publish.yml identity guard, Release Please package-name; execution gates unchanged |
| documentation | done | Four README languages, host/setup/release docs and notth-migration.md |
| verification | done | Existing required gates plus actual npm tarball/Python smoke and migration regression; results in verification.md |
| release-migration | done | CHANGELOG Unreleased, versioning and migration/first-publish guide; distribution version unchanged |

## Tradeoffs
Keep the old aih command and .harness layout to avoid breaking consumers. Python name is intentionally
independent of npm branding; renaming it would need a separate registry migration. No automatic
unpublish/deprecate action is introduced. A first release can fail OIDC until bootstrap is complete;
manual recovery uses the exact reviewed tag and must not republish an existing version.
