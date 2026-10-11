# Changelog

## Unreleased — Foundation hardening
- Document full SDLC and first-use flow, 38-skill mapping, role handoffs and four concrete stack walkthroughs; add drift test against skill manifests.
- Align READMEs, CLI documentation and npm guide with unified evaluation scopes and source candidate version.
- Add MIT License (2026 manh0303), align npm package metadata and include LICENSE in packed tarballs.
- Add independently versioned module metadata and optional requires/recommends/conflicts/compatibility constraints with read-only `aih resolve`.
- Fail closed before install/update on missing dependencies, incompatible selections and cycles; keep Product, UI/UX and DevOps composable.
- Extend `aih verify/eval --scope all` to Core, capabilities and cross-module scenarios; preserve legacy adapter-only defaults.
- Add lock-checked capability/core evaluations, review-only checks and composition regression tests.
- Check release metadata consistency and establish single-release-PR version discipline; retain v0.6.0 until a dedicated release PR.


## 0.6.0 — DevOps capability and Kubernetes adapter candidate
- Add `devops` capability with six namespaced CI/CD, Docker, deployment, infrastructure, observability and incident-response skills plus two review-gated workflows.
- Add `kubernetes` adapter with Helm/workload/rollout skills, advisory verification checks and two safety evaluation scenarios.
- Combine Product, UI/UX and DevOps with selected technology adapters using existing lock-safe installation and progressive skill discovery.
- Preserve Core human authorization requirements; no live CI dispatch, production deployment, provider writes or automatic merge.
- `aih verify` / `aih eval` remain adapter-only; capability workflow documents do not execute runtime tools.


## 0.5.0 — Product documentation capability candidate
- Add independent Product capability with 5 role contracts (BA, PM, PO, delivery PM, reviewer), 9 skills, 3 workflows, and 11 templates.
- Generate evidence-backed BRD, PRD, epics, stories, testable AC, traceability and independent review instructions.
- Add `aih new-doc <type>` for safe, non-overwriting project-owned drafts from drift-checked installed templates.
- Extend capability schema-1 with optional validated `agents` and `templates` arrays; preserve existing UI/UX metadata.
- Support `aih init --capabilities product,uiux` and a documented approved-requirements handoff to UI/UX/OpenSpec.
- No connector execution, autonomous document population, stakeholder approval, npm release or automatic merge.


## 0.4.0 — modular UI/UX capability candidate
- Add explicit `uiux` capability, six review-gated skills and document/idea-to-Figma workflows.
- Add `aih init --capabilities uiux` independent from technology adapters; update selection through project.json.
- Add progressive skill disclosure with `aih skills` (metadata) and `aih skill <name>` (locked full skill).
- Extend project/lock schema-1 compatibly with an optional capabilities field; preserve old 0.1–0.3 snapshots.
- Package capability files and maintain fail-closed drift, collision and source integrity checks.
- No live Confluence/Figma execution, npm registry publication or automatic Git merge.


## 0.3.0 — adapter capabilities candidate
- Add strict adapter.yaml schema 2 with technology rules, nine namespaced skills, advisory checks and eight evaluation scenarios.
- Add list, evidence-based detect and opt-in init --detect; preserve explicit selection and core-only defaults.
- Add verify plans and eval report generation/scoring tied to installed bundle and dataset hashes.
- Expose only selected adapter skills alongside shared Core skills; preserve lock/conflict safety.
- Migrate installed 0.1/0.2 snapshots while replacing old adapter metadata; no automatic model/build execution.


## 0.2.0 — npm CLI candidate
- Replace the Python installer with dependency-free Node.js 22+ and the `aih` npm executable.
- Default target to cwd; support --help, --version, global and local package installation.
- Preserve schema-1 Python 0.1 locks, safety checks, project-owned content and pinned templates.
- Add real legacy migration fixtures, tarball/global/local smoke tests and Node/OS CI matrix.
- Remove Python invocation entry points; see docs/versioning.md before updating CI scripts.
- Package scope is proposed; no npm publication is implied by this change.


## 0.1.0 — unreleased
- Portable core rules, permission/security contracts, five skills and five agent roles.
- Java/Spring, React/Next.js, React Native and AI/Python adapters.
- OpenSpec draft templates and local change scaffolding.
- Dependency-free Python init/update/check/doctor/new-change CLI.
- Managed block preservation, hash lock, conflict refusal, bounded install ownership and rollback tests.
- GitHub CI, GitLab/MCP integration templates and behavioral evaluation rubric.

Initial installation requires Python 3.10+ and a trusted local checkout. No prior version migration.
