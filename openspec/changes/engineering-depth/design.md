# Design and impact

Base: bf1ae6cdb96cae93ea0f93979059a09b5bbbbb03, current main including merged UIUX PR #61.
Read AGENTS, README, architecture, versioning, maintenance, relevant existing Core skills/roles,
Product TechSpec/document-review/templates, Architecture templates, three adapters and related tests.

## Composition decisions

- Preserve all skill IDs and total catalog size; deepen existing contracts instead of duplicating
  Superpowers/Spec Kit workflows. Do not import upstream delete-code/worker/deploy authority.
- Core engineering-quality routes only relevant perspectives. Product owns export instructions;
  actual tools/dependencies/rendering live in the host. No exporter library is included.
- Original compact arc42/MADR-informed coverage, not copied full templates or compliance certification.
- API/data/transaction guidance is in Java/Spring adapter rules, not forced on static/frontend projects.
- Pinned external reference inventory is a document, not a second runtime/plugin registry. No copied
  source means no upstream payload relicensing; future copying needs exact license review. Anthropic
  document skills are source-available and cannot be assumed MIT/Apache under the repo umbrella.
- Module versions change independently; distribution/schema versions remain unchanged. Product profiles
  reuse canonical assets; no new selectable capability/skill or mandatory prompt sequence is added.

## Impact matrix

| Area | Status | Evidence / reason |
| --- | --- | --- |
| core | done | Four existing skills, planner/documentation roles, AGENTS → engineering-quality → spec-to-code/checks/evals |
| adapter | done | Three manifests declare engineering.md, rules indexes and public skills link it; checks/evals added |
| capability-skill | done | Product 1.9.0 and Architecture 1.3.0 expand existing IDs; optional document-export workflow registered |
| cli-config | done | No CLI/config/schema changes; bundle walker packages assets; install/update/conflict ownership tests |
| workflow | done | Existing lifecycle and recovery reused, proportional routing and export stage documented |
| documentation | done | README/index → engineering guide; skill matrix/handoff/versioning and source inventory |
| verification | done | verification.md records required checks; live host, device and document-render eval explicitly NOT_RUN |
| release-migration | done | CHANGELOG Unreleased, module bumps, versioning rollback; distribution 0.17.0 unchanged |

## Risks
Instructions are not runtime enforcement. More checks do not prove fewer defects. No performance,
native platform, rendered document quality or external-skill success is claimed without actual execution.
Consumer update must preserve project docs and reject managed drift. Re-export evals after changed bundle.
