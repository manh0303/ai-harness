---
name: harness-debugging
description: Diagnose a reproducible defect before changing production code.
---

# debugging

## Input
Observed symptom, expected result, redacted reproduction data and environment.
## Procedure
1. Establish a repeatable test or observation of the exact symptom.
2. Minimize inputs and isolate the boundary. For intermittent behavior record frequency and seed.
3. List ranked hypotheses with distinguishing predictions; test one at a time.
4. Repair the supported cause and keep a regression test.
5. Verify adjacent cases and explain the causal chain.
## Output
Reproduction, supported cause, minimal patch, before/after evidence and unresolved limitations.
## Constraints
Do not expose secrets or request production credentials. Ask for missing evidence when access blocks diagnosis.
Do not call a speculative edit a confirmed fix.
