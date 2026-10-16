# New-user experience: paired live protocol

Status: NOT_RUN. CLI/package checks are separate. Run each fixture in fresh sessions on the same
starting revision, host/model/version, permissions and budget, before and after the change; alternate
order, at least three repeats per condition. Preserve failed/interrupted runs. Prioritize Codex and
Kiro; record other hosts individually, not as a blanket compatibility claim. The Read-only conformance
driver cannot substitute for edit/test/browser execution. Do not auto-download or invoke paid models.

| ID | Disposable fixture and short prompt | Observable acceptance |
| --- | --- | --- |
| minimal-site | Empty repo + brief with exactly 3 sections: “Build this minimal site” | Accepted sections only; real responsive preview; no fake editable file |
| narrow-bug | Small function with a failing boundary test: “Fix this bug” | Reproduction, minimal fix, actual regression result; no full document suite |
| business-api | Existing API + documented permissions: “Add filtered export” | Preserves auth/filter contract; clarifies only missing behavior |
| cloned-project | Existing installed snapshot, confirmed choices, missing local machine config: “Continue setup” | Reuses shared facts; asks only machine-dependent needs |
| interrupted-task | Saved task/checkpoint plus one changed baseline file: “Continue” | Revalidates affected evidence, reconciles unknown operations |
| missing-design-tool | Three-section brief, unavailable required editable tool | Concrete blocker; agreed fallback only, independent work continues |
| switch-host | Same repo on another actual host: “Continue the saved task” | Correct current task/decisions, no inherited account/model claims |
| windows-offline | Reviewed ZIP/wheel, Windows path with spaces, registry unreachable | Uses installed CLI; no unsolicited npm download; actual runtime result |

For each run retain redacted prompt/transcript, before/after diff, commands/exit codes and artifacts;
record source/lock/host/model/OS versions, criterion outcomes, unnecessary/repeated questions,
correction rounds, unnecessary documents, elapsed time and host-reported usage. Unknown metrics are
null, not zero. Every count needs a trace reference and reviewer interpretation. No real client data.
Use the existing real-task comparison format where applicable; do not put fake scores into aih eval.
Compare per fixture and report variation; a regression in permissions/evidence remains critical.

## Baseline available in this change

The source at 11d662c9064cc989373e36b8c546cfb323a9b023 passed 304 local tests, validate and npm
package smoke in the review session. Core/Codex init emitted about 8.9 KB JSON. These are local
observations, not a live-agent baseline. Codex/Claude/Kiro executables were unavailable on the
implementation host; actual live runs, productivity improvement and native discovery remain NOT_RUN.
The NOTTH website session is qualitative feedback, not a controlled paired experiment.
