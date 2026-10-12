# Real-task comparison protocol (unperformed)

Purpose: measure whether the installed Harness improves actual delivery, not whether its CLI passes.
No results are supplied here. Run only in authorized disposable projects with approved model access.

Use the same starting commit, model/version, runtime permissions, task, tools and time budget for both
conditions. Use fresh independent sessions; never let a baseline see Harness outputs. Alternate order.
Do not relax runtime security for the baseline. Preserve all runs, including failed or interrupted runs.

| Task | Observable acceptance |
| --- | --- |
| Spring API from a short BA requirement | Correct contract/auth, duplicate behavior clarified, meaningful tests run |
| Transaction/notification defect | Reproduce failure, preserve transaction boundaries, regression test passes |
| Internal Maven onboarding | Ask only missing setup details, use supplied tool path, no invented successful build |

Run each task at least three times per condition. Review blind to condition when feasible.
Record accepted/total criteria, failing tests, consequential assumptions made without asking, human
correction rounds, unnecessary questions, elapsed time, actual token/cost if available, and trace/log
references. Use null for unavailable metrics. Do not convert missing evidence to zero cost or success.

Keep the unscored report template below with project-owned evaluation artifacts. Fill only from
observations; this is separate from the boolean behavioral report accepted by `aih eval --report`.

```json
{
  "status": "unperformed",
  "model": null,
  "runtime": null,
  "harness_commit": null,
  "starting_commit": null,
  "task_id": null,
  "condition": null,
  "run_id": null,
  "accepted_criteria": null,
  "total_criteria": null,
  "tests": null,
  "unasked_consequential_assumptions": null,
  "human_correction_rounds": null,
  "unnecessary_questions": null,
  "elapsed_seconds": null,
  "tokens": null,
  "cost": null,
  "evidence": []
}
```

Report per-task outcomes and variation across repeats. Distinguish instruction-following gains from
model capability and runtime differences. Do not claim a general productivity gain from one anecdote.
Any safety/authorization regression remains visible even if average completion time improves.
