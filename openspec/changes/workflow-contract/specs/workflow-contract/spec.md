## ADDED Requirements

### Requirement: Interchangeable bounded workflow contracts
Harness SHALL distribute schema-1 spec-to-code and selected Product idea-to-prd stage contracts,
validate shape/unique IDs/registered owners/known checks/valid targets/approval references, reject
forward cycles, and verify Markdown stage-table equality. Roles SHALL remain execution-neutral.

#### Scenario: Invalid forward transition
- WHEN a JSON contract refers to an unknown stage or contains a next-only cycle
- THEN installed workflow validation SHALL fail without executing commands or writing state.

#### Scenario: Optional Product
- WHEN a Core-only consumer asks for idea-to-prd
- THEN it SHALL report the missing Product selection instead of substituting roles or installing it.

### Requirement: Compatible entry readiness and declared review
Legacy implement/review SHALL retain structural behavior. Explicit workflow readiness SHALL evaluate
entry gates and matching stage/role approval records; identity/authority/truth/freshness SHALL remain
external responsibilities. Project/lock schema SHALL remain 1.

#### Scenario: Opt-in review gate
- WHEN implement readiness explicitly selects spec-to-code without a review-spec record
- THEN it SHALL be blocked while the equivalent legacy structural check remains compatible.

#### Scenario: Recorded external review
- WHEN a valid matching approval declaration is present
- THEN its presence MAY satisfy approval_from but SHALL NOT grant merge/deploy permission or prove identity.

### Requirement: Separate evidence-producing conformance driver
Host calls SHALL exist outside installer execution. A Claude driver SHALL capture fixture transcripts,
independent judge scores and optional literal assertions across 3–5 trials, persist partial progress,
reject incomplete reports for scoring and report requested/completed rates separately.

#### Scenario: Host failure
- WHEN host or judge errors/times out or lacks actual output
- THEN affected scores SHALL remain unscored and the suite SHALL not claim full PASS.

#### Scenario: Not executed
- WHEN execution is not explicitly selected or another host has no driver
- THEN status SHALL remain NOT_RUN with null observed pass rate.

### Requirement: npm-independent shared Python distribution
A Python package SHALL bundle the canonical npm payload and derive version from package.json.
It SHALL require Python 3.9+ and Node.js 22+, with no Python runtime/build dependency or npm/npx call.
Same-tag release automation SHALL validate both packages and publish npm and PyPI with OIDC.

#### Scenario: Restricted network installation
- WHEN a reviewed wheel is installed with pip --no-index --no-deps
- THEN aih SHALL work with existing Node without contacting npm/PyPI and preserve project config on reinstall/update.

#### Scenario: Missing runtime
- WHEN Node.js 22+ cannot be found
- THEN launcher SHALL return an actionable error instead of downloading a runtime or using npm.

### Requirement: Host-neutral progressive onboarding
Six host guides and README SHALL use the canonical harness-start flow with native invocation or
explicit skill-read fallback, reuse saved answers and preserve client-specific loading limits.

#### Scenario: Non-Kiro first session
- WHEN Codex/Claude/Cursor/Copilot/Gemini begins in an installed project
- THEN the shared start skill SHALL inspect context and ask only missing consequential questions.
