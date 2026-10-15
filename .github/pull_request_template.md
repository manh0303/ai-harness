## Problem and result
What concrete problem does this solve, and how does behavior change?

## Change impact
Follow [Harness maintenance](https://github.com/manh0303/notth/blob/main/docs/harness-maintenance.md).
Link the OpenSpec change and its impact table, or fill the table below for a small change.
Use `done`, `pending`, or `not-applicable` with evidence or a specific reason for every row.
If using a linked table, remove this duplicate table and keep a direct link to the reviewed record.

| Area | Status | Paths / evidence / reason |
| --- | --- | --- |
| core | pending | |
| adapter | pending | |
| capability-skill | pending | |
| cli-config | pending | |
| workflow | pending | |
| documentation | pending | |
| verification | pending | |
| release-migration | pending | |

## Validation
- Commands actually run and results:
- Manual review and live-agent evaluation (separate from CLI tests):
- Skipped checks, remaining work and owner:
- Compatibility / consumer update / rollback:

## Review checklist
- [ ] Impact table covers every area, with no unexplained omissions; pending work is disclosed.
- [ ] Affected declaration → distribution → discovery → use → review → documentation links are checked.
- [ ] `npm test`, `npm run validate`, `npm run test:package` results or concrete blockers are recorded.
- [ ] Changelog/migration/module version impact reviewed; feature PR does not bump distribution version.
- [ ] No automatic merge/publish; live-model compliance is not inferred from structural tests.
