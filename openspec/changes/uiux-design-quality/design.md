# Design and impact

Base: `73bc93621873f7bbcd55b62cc451481f0b013b08` on main, not earlier conversation snapshot. Existing design-delivery is reused.
Inspected: AGENTS.md, README.md, docs/architecture.md, docs/harness-maintenance.md, docs/versioning.md,
core/workflows/spec-to-code.md, UIUX manifest/skills/workflows/checks/evals, cli/capabilities.js,
cli/harness.js, tests/capabilities.test.js, tests/documentation.test.js, template/implementer entry points.

## Decisions
- Keep CLI native modules only. Existing bundle walker already installs selected supporting assets;
  no new registry, config schema, downloader or runtime is needed.
- Original local NOTTH guidance + optional pinned external handoff rather than copying ~3.6 MiB of
  UI UX Pro Max scripts/data or imposing Google's taste-design bans/perpetual motion universally.
- Reviewed sources/commits/licenses are in capability integrations/design-skills.md. No upstream
  source text/code is copied; external installations retain their own license/supporting-file obligations.
- Canonical project design file remains user-owned and may be an existing master rather than DESIGN.md.
- Reuse the six current UIUX IDs; add two namespaced skills through the manifest and skill matrix.
- Tests verify installation/routing/ownership, not aesthetics. Paired live evaluation remains NOT_RUN.

## Impact matrix

| Area | Status | Evidence / reason |
| --- | --- | --- |
| core | done | templates/AGENTS.md and core/agents/implementer.md route optional UIUX and canonical design |
| adapter | not-applicable | No stack conventions changed; common implementation contract covers UI tasks |
| capability-skill | done | UIUX 1.2.0 manifest, two skills, supporting template and pinned integration guide |
| cli-config | done | Existing bundle/lock mechanism reused; tests/ui-design.test.js covers selection/update/project ownership; no schema/runtime edits |
| workflow | done | Existing design-delivery calls direction/system/external/review; existing Figma routes retained |
| documentation | done | README/index → docs/ui-design.md; skill matrix and handoffs; short examples for two product types |
| verification | done | verification.md: 315 tests, validate, real package smoke and release metadata pass; new behavioral cases and paired visual recipe explicitly unscored |
| release-migration | done | CHANGELOG Unreleased and docs/versioning.md; distribution remains 0.17.0, Release Please-owned |

## Risks and rollback
Actual host instruction compliance and external MCP/visual quality are unverified. Third-party pins
may age; new versions require a separate review. Revert consumer snapshot/lock with matching CLI;
project DESIGN.md and external installations are independent and must not be overwritten.
