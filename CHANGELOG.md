# Changelog

## Unreleased — Simpler onboarding and release regression coverage
- Start with npm install, minimal module selection and project context; clarify advisory commands and the two-step CLI/snapshot update.
- Link progressive context rules from the generated AGENTS entry point; retain project ownership and runtime boundaries.
- Exercise legacy migrations against both the current and next patch version; document recovery from a failed immutable release tag.

## Unreleased — Release validation compatibility
- Accept Release Please's linked version headings for version 0.6.1 in both validation commands while retaining strict matching of the current distribution version.

## Unreleased — Release migration tests
- Fix legacy upgrade tests to assert the current Harness source version rather than hardcoding 0.6.0, allowing Release Please version PRs to pass CI without weakening migration checks.

## Unreleased — npm 12 pack metadata compatibility
- Make package smoke tests support both npm 10/11 array-form and npm 12 package-keyed JSON output from `npm pack --json`.
- Validate archive metadata before accessing `files`, with explicit diagnostics instead of an undefined-property crash.
- Add parser regression tests and a Windows/Node 24/npm 12 CI smoke job; do not relax package safety checks.

## Unreleased — npm public release setup
- Align public npm package scope `@manhd_d/ai-harness` and lockfile while GitHub repository stays private under `manh0303`.
- Add explicit GitHub Release-triggered npm OIDC publishing, tag/version checks, package tests and maintainer-controlled first publication.

## Unreleased — Optional monetization capability
- Add stack-independent `monetization` capability with five instruction skills (AdSense integration, safe ad placement, SEO growth, analytics/revenue, publisher compliance), two review-gated workflows, four project-owned Markdown templates, four advisory checks and four synthetic evaluation cases.
- Document owner-approved ads.txt/publisher account information, EEA/UK/Swiss consent/CMP review, invalid traffic safeguards and evidence-labeled Page RPM scenarios; no guarantees of approval, clicks, ranking or earnings.
- Support opt-in use with Astro, React/Next.js or other app adapters; only selected capabilities are vendored into consumer projects.
- Update CLI help, examples, skill matrix and SDK-independent usage. Distribution remains 0.6.0 candidate pending separate release; no live AdSense/Analytics/Search Console integration or automatic publishing.


## Unreleased — Astro lightweight web adapter
- Add opt-in `astro` technology adapter with 6 namespaced skills for architecture, Islands/React integration, SEO, performance, Cloudflare and staged microfrontend migration.
- Add static-first/privacy/deployment rules, advisory verification and evidence-based eval cases; Astro dependency detection suppresses spurious React/Next.js from `react-dom` islands unless `next` is also declared.
- Update CLI help, adapter discovery docs, skill matrix, getting started, SDLC overview and Astro micro-tool walkthrough.
- Add Astro detection, composition, locked-skill, update and documentation regression tests. Keep npm distribution version 0.6.0 candidate; no auto-deploy or publishing.


## Unreleased — Documentation & Discovery (planned v0.7.0)
- Support complementary Idea-driven and Document-driven Product workflows without duplicating enterprise BA sources or forcing all documents on small projects.
- Add four Product skills (idea discovery, evidence-backed research, SRS, use cases) and five document templates (idea, research, PRD-lite, SRS, use cases); totals: 13 Product skills, 5 workflows, 16 templates.
- Route new idea/research drafts safely to consumer `docs/discovery/`; keep Product documents under `docs/product/` with pinned templates and integrity checks.
- Add Confluence read/export contract with explicit permissions, version/approval gates; no live remote API calls or automatic AI execution.
- Add regression tests and documentation links; release version stays at 0.6.0 pending an independently reviewed release PR.


## Unreleased — Foundation hardening
- Document full SDLC and first-use flow, 38-skill mapping, role handoffs and four concrete stack walkthroughs; add drift test against skill manifests.
- Align READMEs, CLI documentation and npm guide with unified evaluation scopes and source candidate version.
- Add MIT License (2026 manh0303), align npm package metadata and include LICENSE in packed tarballs.
- Add independently versioned module metadata and optional requires/recommends/conflicts/compatibility constraints with read-only `aih resolve`.
- Fail closed before install/update on missing dependencies, incompatible selections and cycles; keep Product, UI/UX and DevOps composable.
- Extend `aih verify/eval --scope all` to Core, capabilities and cross-module scenarios; preserve legacy adapter-only defaults.
- Add lock-checked capability/core evaluations, review-only checks and composition regression tests.
- Check release metadata consistency and establish single-release-PR version discipline; retain v0.6.0 until a dedicated release PR.


## [0.6.2](https://github.com/manh0303/ai-harness/compare/v0.6.1...v0.6.2) (2026-10-11)


### Bug Fixes

* **release:** support linked Release Please changelog headings ([8084940](https://github.com/manh0303/ai-harness/commit/80849408a349305ef5cdfb0c0eb0206ea8242eb8))
* simplify onboarding and guard release version migrations ([43efbb2](https://github.com/manh0303/ai-harness/commit/43efbb24e26d190b7a2b8dd2fbd5a9a5ee5368a1))
* **test:** unblock Release Please version bump CI ([63ba179](https://github.com/manh0303/ai-harness/commit/63ba17974cafad40e6ff5b483c126afdfc49df44))

## [0.6.1](https://github.com/manh0303/ai-harness/compare/v0.6.0...v0.6.1) (2026-10-11)


### Bug Fixes

* **release:** automate npm publishing with Release Please and OIDC ([d39f284](https://github.com/manh0303/ai-harness/commit/d39f2843bd2700d9be8f70981135b8502b691303))
* **release:** automate npm releases with Release Please and OIDC ([0b293c5](https://github.com/manh0303/ai-harness/commit/0b293c520601cf2f21ed10d0dd3973f659647cc0))

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
