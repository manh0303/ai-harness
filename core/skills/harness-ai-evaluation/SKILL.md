---
name: harness-ai-evaluation
description: Evaluate AI behavior against a versioned, redacted acceptance dataset.
---

# ai-evaluation

## Input
Task definition, dataset version, baseline, model/prompt versions, tools, budget and acceptance thresholds.
## Procedure
1. Separate deterministic code tests from model behavior evaluation.
2. Cover representative successful cases, refusal/abstention, injection, unauthorized retrieval and tool failure.
3. Define metrics before execution: task success, citation correctness, denied side effects, latency and cost.
4. Run reproducible seeds where supported; repeat stochastic cases and retain distributions, not only averages.
5. Compare against baseline with a documented rubric; investigate every security regression.
6. Record evaluator identity, model/version, parameters, dataset hash, sample count and sanitized evidence.
## Output
Evaluation report with thresholds, measured results, regressions and release decision.
## Constraints
No live model call without authorized provider/budget. No production personal data. A lexical assertion is not
proof of model compliance; human review is required for ambiguous judgments.
