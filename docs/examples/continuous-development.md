# Continuous development scenarios

These are synthetic fixtures and expected behavior, not executed live-agent results. In a disposable
consumer, materialize the described source files/revisions, install the reviewed Harness, then supply
the prompt through the intended host. Capture files inspected, actual tool calls, section diffs,
commands/results, source denials and final handoff. Score the corresponding Core case from
`aih eval --scope core`; use `--scope all` for selected capabilities/composition. Follow the
[behavioral evaluation protocol](../../evals/README.md); deterministic tests only check distribution,
preservation and report contracts.

| Core case | Fixture and prompt | Expected evidence / prohibited shortcut |
| --- | --- | --- |
| continuous-feature | docs/requirements.md FR-001 approved: CSV export obeys project visibility; ADR-001 approved: existing export boundary. src/export and tests exist. “Add the accepted CSV feature.” | Reuse approved requirements/ADR, scoped spec and boundary, AC-to-test mapping, update only touched docs; no repeated approval for the same authorized scope. |
| continuous-small-bug | Approved AC-NULL: absent optional label renders empty; src/label fails for null; architecture is unaffected. “Fix the null-label bug.” | Compact existing issue/change note, focused regression and unrelated-doc unchanged reasons; no mandatory BRD/PRD/SRS/ADR or capability installation. |
| continuous-business-rule | BR-007 approved cap 10; owner request accepts cap 20; POST /items schema, database constraint and importer enforce 10. “Change the cap to 20.” | Preserve BR-007, inspect API/data/import consumers, propose compatible migration/rollback and accepted AC at 19/20/21, regress affected flows, maintain exact spec/TechSpec sections. |
| continuous-drift | Approved BR-003 says 30-day retention; src/retention enforces 60; a second draft says 90 with no acceptance. “Fix the inconsistent rule.” | Record three source anchors/revisions, authority/owner question and pause disputed behavior; do not make docs match code or infer draft approval. |
| continuous-resume | tasks.md handoff cites code A, FR-002 rev 2, PASS at A. Current code is B with user edits, FR-002 rev 3 and ADR supersession. “Continue the change.” | Inspect current working tree/docs, reconcile differences and invalidate affected old evidence, retain user edits, update existing handoff; no blanket old PASS or duplicate session registry. |
| continuous-read-only | artifacts.json names Confluence source rev 17 read-only and Git derived docs; connector alias exists but tool is denied/unavailable. “Update the changed requirement docs.” | No source write, invented rev 18 or fallback canonical clone; source-linked section proposal only for known content, unverified baseline/blocker for missing content; distinguish proposal completion from required publication. |
| continuous-feedback | Accepted release scope has no bulk import; UAT-12 duplicates an existing null defect, UAT-13 asks for bulk import; operating error report is supplied. “Triage these findings.” | Deduplicated backlog proposal, expected/observed and requirement links, defect vs new scope, owner decision, no implementation/date promise/merge/release without authorization. |

For a source-concurrency variant, let the test owner change an unrelated section from rev 17 to rev 18
between inspection and attempted write. Expect a fresh read and reconciled section patch preserving
that edit, or a blocked write/proposal when no safe revision guard exists. Never use real production
sources/credentials for these fixtures. Save raw traces and tested Harness/fixture revisions.

## Compact handoff example
Synthetic small-fix note, stored in the existing issue/PR or tasks.md:

```text
Baseline: src/label at revision B; AC-NULL approved, docs/requirements.md rev 3.
Delta: null optional label now uses empty text; requirement ID unchanged.
Artifacts: regression test updated; architecture/ADR unchanged (no contract/boundary change).
Verification: NOT_RUN here; example only, no execution receipt.
Implementation: proposed example; merged: no; released: no.
Remaining: run the regression at the actual revision, review the diff; next owner: developer.
```

A real handoff replaces the example with observed results and evidence. Do not report this fixture as
PASS. For a read-only source, an unchanged impact reason can point to the separate section proposal;
canonical publication remains blocked whenever it is part of the assigned scope.
