---
name: harness-tdd
description: Implement changed behavior through a short test-first loop.
---

# tdd

## Input
Active task, acceptance scenarios, relevant adapter, existing tests and a public behavior boundary.
## Procedure
1. Choose the smallest externally observable slice. Reuse an already agreed test boundary; ask only when ambiguity changes design.
2. Write one meaningful failing test with an independently specified expected result. Run it and verify the failure is the intended defect.
3. Add minimal implementation. Run the focused test, then relevant adjacent tests.
4. Refactor only while green and only inside the task scope. Repeat for the next slice.
5. Record command, exit status and acceptance coverage. If the environment blocks tests, report that instead of inventing green evidence.
## Output
A working slice, regression evidence and remaining unchecked tasks.
## Constraints
Mock external boundaries, not internal implementation details. Cover denial/failure behavior as needed.
Skip new tests for trivial prose edits; justify the exception. Never deploy or merge from this skill.
