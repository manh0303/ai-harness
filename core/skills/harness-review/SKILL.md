---
name: harness-review
description: Review a diff against requirements, repository conventions and concrete risks.
---

# review

## Input
Base/head diff, change spec, selected adapters and test evidence.
## Procedure
1. Map each changed behavior to an acceptance requirement and public interface.
2. Inspect correctness, backward compatibility, authorization, failure handling and resource usage.
3. Review tests for their ability to detect the defect; distinguish missing coverage from confirmed bugs.
4. Classify findings: blocker (security/data loss), major (wrong behavior), minor (maintainability), suggestion.
5. Provide file/line, failing scenario, impact and minimal remedy for each actionable finding.
6. Re-run a focused check when possible. Keep unverified concerns explicitly labeled.
7. For full changes, inspect decisions.json and real verification.json evidence, then use
   aih ready <id> --stage review. A ready result is not proof, approval or permission to merge.
## Output
Findings ordered by severity; requirement coverage; actual checks; residual risk; review recommendation.
## Constraints
No style churn without a project rule. No self-approval claims or automatic merge. No findings is not a security guarantee.

## Continuous changes
Use `.harness/core/workflows/continuous-development.md` to review baseline freshness, source authority,
stable requirement → spec → code → tests/evidence links and selective documentation diffs/proposals.
Check required maintenance blockers and remaining-work handoff. Separate implementation complete,
merged and released; neither a passing test nor this review supplies business approval.

For required end-user acceptance, inspect actual interface interaction, real/mocked dependency scope,
requirement surface, redacted attachments and source revision. API/unit/build evidence cannot prove a
browser/device journey. Required BLOCKED/NOT_RUN journeys prevent an unconditional completion claim.
