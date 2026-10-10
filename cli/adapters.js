import fs from 'node:fs';
import path from 'node:path';
import { safe, readJson, manifest, HarnessError, check, loadLock, encode, digest } from './harness.js';
import { scoreDataset } from '../scripts/score-eval.js';

import { loadAdapter, requireThat, object } from './adapter-schema.js';
export { loadAdapter } from './adapter-schema.js';

export function listAdapters(source) {
  return { status: 'ok', adapters: manifest(source).adapters.map(id => {
    const a = loadAdapter(source, id);
    return { id, description: a.description, skills: a.skills, detection: a.detection };
  }) };
}

function exists(root, file) { return fs.existsSync(safe(root, file)); }
function probe(root, file) {
  const filename = safe(root, file);
  if (!fs.existsSync(filename)) return null;
  requireThat(fs.statSync(filename).size <= 1024 * 1024, `Detection file exceeds 1 MiB: ${file}`);
  return fs.readFileSync(filename, 'utf8');
}
export function detect(root, source) {
  const matches = [];
  for (const id of manifest(source).adapters) {
    const a = loadAdapter(source, id), evidence = [];
    for (const rule of a.detection) {
      const body = probe(root, rule.file);
      if (body === null) continue;
      let found;
      if (rule.kind === 'dependencies') {
        let pkg; try { pkg = JSON.parse(body); } catch { throw new HarnessError(`Invalid JSON during detection: ${rule.file}`); }
        requireThat(object(pkg), `Invalid package metadata: ${rule.file}`);
        const deps = new Set();
        for (const field of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']) {
          if (pkg[field] === undefined) continue;
          requireThat(object(pkg[field]), `Invalid ${field}: ${rule.file}`);
          for (const key of Object.keys(pkg[field])) deps.add(key);
        }
        found = rule.values.filter(v => deps.has(v));
      } else found = rule.values.filter(v => body.includes(v));
      if (found.length) evidence.push({ file: rule.file, kind: rule.kind, matched: found });
    }
    if (evidence.length) matches.push({ id, evidence });
  }
  return { status: 'ok', adapters: matches.map(m => m.id).sort(), matches,
    note: 'Heuristic, current target only; review evidence. No recursive monorepo scan or application execution.' };
}

function installedAdapters(root) {
  const result = check(root);
  requireThat(result.status === 'ok', 'Fix installation drift before reading capabilities');
  const lock = loadLock(root), source = path.join(root, '.harness');
  // Require capability files to be covered by the installed lock, not merely present nearby.
  const adapters = lock.adapters.map(id => {
    requireThat(Object.hasOwn(lock.files, `.harness/adapters/${id}/adapter.yaml`), `Adapter ${id} needs aih update to enable capabilities`);
    const a = loadAdapter(source, id);
    for (const file of [a.verification, a.evaluation, ...a.rules, ...a.skills.map(s => `skills/${s}/SKILL.md`)]) {
      requireThat(Object.hasOwn(lock.files, `.harness/adapters/${id}/${file}`), `Capability is not locked: ${id}/${file}`);
    }
    return a;
  });
  return { adapters, lock };
}

export function verify(root) {
  const { adapters, lock } = installedAdapters(root);
  return { status: 'planned', version: lock.version, executed: false,
    checks: adapters.flatMap(a => a.checks.map(c => ({ adapter: a.id, ...c,
      applicability: c.when_file === null ? 'review-required' : exists(root, c.when_file) ? 'candidate' : 'not-detected' }))),
    note: 'Advisory only. Inspect scripts, package manager, platform and authorization before executing; placeholders require replacement. No application test has run.' };
}

export function evaluate(root, reportPath) {
  const { adapters, lock } = installedAdapters(root);
  requireThat(adapters.length > 0, 'Select at least one adapter to evaluate');
  const dataset = { schema_version: 1, cases: adapters.flatMap(a => a.cases.map(c => ({ ...c, id: `${a.id}/${c.id}` }))) };
  const bytes = encode(dataset), hash = digest(bytes);
  if (!reportPath) return { status: 'planned', dataset, report: { schema_version: 1,
    metadata: { model: '', harness_commit: '', dataset_sha256: hash, bundle_sha256: lock.bundle_sha256, reviewer: '', run_id: '', parameters: '' },
    results: dataset.cases.map(c => ({ id: c.id, scores: c.criteria.map(() => null), evidence: '' })) },
    note: 'Run scenarios separately with an authorized agent, record evidence, then have a reviewer fill boolean scores. No model is invoked.' };
  const report = readJson(path.resolve(reportPath));
  requireThat(report?.metadata?.bundle_sha256 === lock.bundle_sha256, 'Evaluation report belongs to a different installed bundle');
  return { ...scoreDataset(report, bytes), version: lock.version, dataset_sha256: hash };
}
