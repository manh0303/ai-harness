---
name: harness-ai-python-tool-safety
description: Build bounded model tool calls with independent authorization.
---

# tool-safety

## Input
Tool contracts, runtime permission policy, budget/timeouts and side-effect boundaries.

## Procedure
1. Validate structured tool arguments and enforce an explicit tool allowlist.
2. Check caller permission in host code independently of model output.
3. Bound retries/timeouts and prevent duplicate side effects with stable operation identity.
4. Test malicious arguments, denied tools, cancellation and invalid model outputs with mocks.

Use core TDD, debugging and review procedures for the common development lifecycle.

## Output
Tool wrapper, policy tests and separately scoped live-evaluation plan.

## Constraints
No live calls or paid evaluation without existing authorization; no secrets in fixtures.
