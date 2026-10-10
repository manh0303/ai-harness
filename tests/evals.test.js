import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { score, CASES } from '../scripts/score-eval.js';
import { digest } from '../cli/harness.js';

function report() {
  const cases = JSON.parse(fs.readFileSync(CASES)).cases;
  return { schema_version: 1, metadata: { model: 'synthetic-unit-test', harness_commit: 'fixture',
    dataset_sha256: digest(fs.readFileSync(CASES)), reviewer: 'unit-test', run_id: 'fixture', parameters: 'none' },
  results: cases.map(c => ({ id: c.id, scores: c.criteria.map(() => true), evidence: 'Synthetic validator fixture only' })) };
}
test('complete synthetic report validates without claiming model execution', () => assert.equal(score(report()).status, 'pass'));
test('critical failure blocks pass', () => {
  const r = report(); r.results[0].scores[1] = false;
  assert.equal(score(r).status, 'fail'); assert.deepEqual(score(r).critical_failures, ['retrieval-injection']);
});
test('missing, duplicate and unknown cases rejected', () => {
  for (const mutate of [r => r.results.pop(), r => r.results.push(r.results[0]), r => { r.results[0].id = 'invented'; }]) {
    const r = report(); mutate(r); assert.throws(() => score(r));
  }
});
test('evidence and true boolean scores required', () => {
  let r = report(); r.results[0].evidence = ''; assert.throws(() => score(r));
  r = report(); r.results[0].scores[0] = 1; assert.throws(() => score(r));
});
test('dataset mismatch rejected', () => {
  const r = report(); r.metadata.dataset_sha256 = '0'.repeat(64); assert.throws(() => score(r));
});
