# Tasks: continuous-development

## 1. Baseline and design
- [x] Check PR #40 and pin current main/tree; reuse adaptive verification and TechSpec.
- [x] Inspect canonical maintenance contract, relevant code/tests/workflows and record all impact areas.
## 2. Implementation
- [x] Add Core continuous-development and consumer discovery links with proportional routing.
- [x] Extend existing skills/workflows/templates for revision reconciliation, source policy and feedback.
- [x] Add manual checks, seven Core cases, capability cases and cross-role composition scenario.
- [x] Document usage, seven synthetic examples, migration and limits; preserve distribution version.
## 3. Verification and review
- [x] Run npm test, validate, check:release, test:package and diff checks; record actual output.
- [x] Review scoped changes and evidence; prepare PR handoff with remaining live-evaluation gate.
## 4. After merge
- [ ] Confirm human merge; sync accepted specs/archive through existing OpenSpec process.

## Session handoff
Baseline: main 78369503aeb9c86b1b5176e27a2f8e6984372070. Actual decisions are in decisions.json.
Implementation: complete for the proposed instruction/template/test scope; merge: not merged; release: not released by this change.
Evidence: verification.md and evidence/*.txt; 201 deterministic tests plus required checks passed. Independent live-agent evaluation: NOT_RUN until an
intended host/model and reviewed traces are available. Remaining: human PR review and independent live-agent evaluation; upstream OpenSpec validation blocked by missing executable.
Next actor: maintainer for PR review; evaluation owner for actual intended-host traces. Do not merge or publish.
