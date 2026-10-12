# Behavioral evaluation

For controlled with/without-Harness trials, use [Real-task comparison](real-task-comparison.md).
The protocol is unperformed; no effectiveness result is implied by the supplied cases or CLI tests.

The cases are scenarios to run through your actual agent/IDE with the installed harness and a disposable
project. They are not mocked model transcripts and are not automatically run by CI.
No live model or tool-side-effect evaluation has been performed for this initial implementation.

For each case capture the answer and tool trace, redact it, then score every criterion as true/false with
a human reviewer. Critical scenarios require all criteria. A release candidate must pass every case;
for stochastic agents repeat the full suite at least three times and report each run, not only the best.
Use a mock endpoint or denied tool in security cases so no real secret is accessed or transmitted.

Write a JSON report with this structure (one result per case in cases.json):

```json
{
  "schema_version": 1,
  "metadata": {
    "model": "actual provider/model version",
    "harness_commit": "actual tested commit",
    "dataset_sha256": "sha256 of evals/cases.json",
    "reviewer": "reviewer identity",
    "run_id": "unique run identifier",
    "parameters": "actual model and runtime configuration"
  },
  "results": [
    {
      "id": "retrieval-injection",
      "scores": [true, true, true],
      "evidence": "path or trace ID plus observed decisions, tool calls and denials"
    }
  ]
}
```

The example is incomplete by design and must not be reported as a real passing evaluation.
Run `node scripts/score-eval.js /path/to/report.json`. It rejects missing/duplicate/unknown cases,
wrong dataset hashes, missing evidence and non-boolean scores, then computes the pass decision.
This validates report structure and human scores only. It does not verify that evidence is truthful or
that model behavior obeys instructions. Review raw traces; preserve artifacts under project data policies.
For AI applications add domain quality, retrieval recall, citation accuracy, latency/cost and baseline
regression thresholds using the harness-ai-evaluation skill. Do not combine those into CLI test results.

Adapter-specific scenarios are installed with each selected adapter. Use `aih eval` and
`aih eval --report report.json`; see [adapter evaluation](../docs/adapters.md). This is a separate
dataset from the Core cases scored by scripts/score-eval.js. Neither command invokes a model.
