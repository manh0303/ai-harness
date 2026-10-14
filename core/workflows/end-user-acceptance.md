# End-user acceptance

Trigger when the user asks to test like an end user or the changed behavior has an applicable public
journey. Use harness-end-user-testing with harness-verification. This workflow is available in Core;
it requires actual host tools and app access, not a separately launched Harness runtime.

1. Read agreed AC/source revisions, saved project context, existing tests and affected routes/screens.
   Reuse prior answers. `aih verify --adaptive` supplies end_user_acceptance metadata hints and a host
   prompt; the host derives concrete scenarios from actual requirements, not generic detector rules.
2. Establish the app URL or executable/start command, local/test/staging environment, actor/test-account
   references and isolated data. Inspect existing environment.json/integrations.json; keep credentials
   in the host. Ask 1–3 missing consequential questions with alternatives and a grounded recommendation.
3. Reuse existing runners. Web: available Playwright/Cypress or authorized browser tools; native mobile:
   existing device/simulator runner; CLI: real terminal; API-only: public HTTP interface and business
   state. Documents-only changes use source review; do not invent a web app or claim browser coverage.
4. Run the agreed happy and relevant negative/role/state journeys through that interface. Web test must
   actually navigate and use controls. Fixture setup/API assertions supplement, not replace, UI steps.
   Assert visible results and persistence where specified. Record exactly which backend/services were
   real, mocked, absent by design or unknown; third-party mocks narrow the proven scope.
5. Save redacted JSON observations and optional screenshots/traces/videos into existing configured
   evidence locations (fallback local project-owned verification/ only when no external canonical route
   is required). Use schema-1 report with requirement verification_target=end-user plus the expected surface and scenario journey
   declarations; digest-check attachments as well as JSON. Raw attachments can contain secrets: review
   before retention/sharing; do not dump storage-state cookies or credential-bearing traces into Git.
6. PASSED only for actually executed scenarios whose expected AC assertions and owned cleanup pass.
   Mocked/unknown dependencies cannot establish full end-user verification. Missing browser/device,
   app/account/service access is BLOCKED; unexecuted or deliberate skips remain NOT_RUN with reasons.
   Unit/component/build/static checks are supplementary. No check-count/coverage threshold substitutes
   for the journey. CLI validation checks consistency, not real tool execution or stakeholder approval.
7. Route bugs to scoped implementation and rerun affected journeys after source changes. Preserve
   unrelated user work and stop bounded retries on persistent blockers. Reviewer's handoff includes
   AC coverage, real/mocked scope, defects, redacted evidence and actual next needs. Required missing
   journeys prevent unconditional completion; business-owner UAT and independent model eval are separate.

A small change needs only affected user journeys. Do not require every browser/platform on every task;
choose them from target users and risk, and disclose what was not exercised.
