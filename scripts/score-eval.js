#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { SOURCE, digest } from '../cli/files.js';

export const CASES = path.join(SOURCE, 'evals/cases.json');
export function score(report, datasetPath = CASES) {
  return scoreDataset(report, fs.readFileSync(datasetPath));
}
export function scoreDataset(report, raw) {
  const dataset = JSON.parse(raw);
  const cases = new Map(dataset.cases.map(c => [c.id, c]));
  if (!report || report.schema_version !== 1) throw new Error('Unsupported report schema');
  const metadata = report.metadata;
  const required = ['model', 'harness_commit', 'dataset_sha256', 'reviewer', 'run_id', 'parameters'];
  if (!metadata || required.some(k => typeof metadata[k] !== 'string' || !metadata[k].trim())) throw new Error('Missing evaluation metadata');
  if (metadata.dataset_sha256 !== digest(raw)) throw new Error('Dataset hash mismatch');
  if (!Array.isArray(report.results)) throw new Error('Results must be a list');
  const seen = new Set(), failed = [], critical = [];
  for (const row of report.results) {
    if (!row || typeof row.id !== 'string') throw new Error('Invalid result');
    if (seen.has(row.id) || !cases.has(row.id)) throw new Error(`Duplicate or unknown case: ${row.id}`);
    seen.add(row.id);
    if (!Array.isArray(row.scores) || row.scores.length !== cases.get(row.id).criteria.length
        || row.scores.some(v => typeof v !== 'boolean')) throw new Error(`Invalid boolean scores: ${row.id}`);
    if (typeof row.evidence !== 'string' || !row.evidence.trim()) throw new Error(`Missing evidence: ${row.id}`);
    if (row.assertions !== undefined && (!Array.isArray(row.assertions) || row.assertions.some(v => typeof v !== 'boolean'))) throw new Error(`Invalid assertion scores: ${row.id}`);
    if (cases.get(row.id).assertions?.length && row.assertions?.length !== cases.get(row.id).assertions.length) throw new Error(`Missing assertion scores: ${row.id}`);
    if (!row.scores.every(Boolean) || row.assertions?.some(v => !v)) { failed.push(row.id); if (cases.get(row.id).critical) critical.push(row.id); }
  }
  if (seen.size !== cases.size) throw new Error(`Missing cases: ${[...cases.keys()].filter(k => !seen.has(k)).join(', ')}`);
  return { status: failed.length ? 'fail' : 'pass', cases: cases.size, passed: cases.size - failed.length, failed,
    critical_failures: critical, note: 'Human score aggregation, not automated proof of model compliance' };
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    if (process.argv.length !== 3) throw new Error('Usage: node scripts/score-eval.js REPORT.json');
    const result = score(JSON.parse(fs.readFileSync(process.argv[2], 'utf8')));
    console.log(JSON.stringify(result, null, 2)); process.exitCode = result.status === 'pass' ? 0 : 1;
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
