import fs from 'node:fs';
import { safe, readJson, HarnessError } from './files.js';
import { validateContract } from './module-contract.js';

const slug = value => typeof value === 'string' && /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(value);
const text = value => typeof value === 'string' && Boolean(value.trim());
export const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const strings = value => Array.isArray(value) && value.length > 0 && value.every(text);
const unique = value => new Set(value).size === value.length;
export function requireThat(condition, message) { if (!condition) throw new HarnessError(message); }
function fields(value, keys, label, optional = []) {
  requireThat(object(value) && keys.every(k => Object.hasOwn(value, k))
    && Object.keys(value).every(k => keys.includes(k) || optional.includes(k)), `Invalid ${label} fields`);
}

export function loadAdapter(source, id) {
  requireThat(slug(id), 'Invalid adapter ID');
  const prefix = `adapters/${id}/`, m = readJson(safe(source, `${prefix}adapter.yaml`));
  fields(m, ['schema_version', 'id', 'description', 'detection', 'rules', 'skills', 'verification', 'evaluation'], 'adapter',
    ['module_version', 'requires', 'recommends', 'conflicts', 'compatible_adapters']);
  requireThat(m.schema_version === 2 && m.id === id && text(m.description), `Invalid adapter: ${id}`);
  validateContract(m, 'adapter', id);
  requireThat(Array.isArray(m.detection) && m.detection.length > 0, `Missing detection: ${id}`);
  for (const rule of m.detection) {
    fields(rule, ['file', 'kind', 'values'], 'detection');
    safe(source, rule.file);
    requireThat(['contains', 'dependencies'].includes(rule.kind) && strings(rule.values) && unique(rule.values), `Invalid detector: ${id}`);
  }
  requireThat(strings(m.rules) && unique(m.rules) && m.rules.every(p => /^rules\/[a-z-]+\.md$/.test(p)), `Invalid rules: ${id}`);
  for (const rule of m.rules) requireThat(fs.readFileSync(safe(source, prefix + rule), 'utf8').trim(), `Empty rule: ${rule}`);
  requireThat(Array.isArray(m.skills) && unique(m.skills) && m.skills.every(n => slug(n) && n.startsWith(`harness-${id}-`)), `Invalid skills: ${id}`);
  for (const name of m.skills) {
    const body = fs.readFileSync(safe(source, `${prefix}skills/${name}/SKILL.md`), 'utf8');
    requireThat(body.startsWith('---\n') && body.includes(`name: ${name}\n`) && body.includes('description: ')
      && ['## Input', '## Procedure', '## Output', '## Constraints'].every(s => body.includes(s)), `Invalid skill: ${name}`);
  }
  requireThat(m.verification === 'checks/verification.yaml' && m.evaluation === 'evals/cases.json', `Invalid capability paths: ${id}`);
  const verification = readJson(safe(source, prefix + m.verification));
  fields(verification, ['schema_version', 'checks'], 'verification');
  requireThat(verification.schema_version === 1 && Array.isArray(verification.checks) && verification.checks.length > 0, `Invalid checks: ${id}`);
  const checkIds = [];
  for (const c of verification.checks) {
    fields(c, ['id', 'title', 'command', 'when_file', 'evidence', 'execution'], 'check');
    requireThat(slug(c.id) && text(c.title) && Array.isArray(c.command) && c.command.every(text)
      && strings(c.evidence) && (c.execution === 'advisory' ? c.command.length > 0 : c.execution === 'manual' && c.command.length === 0), `Invalid check: ${id}`);
    if (c.when_file !== null) safe(source, c.when_file);
    checkIds.push(c.id);
  }
  requireThat(unique(checkIds), `Duplicate checks: ${id}`);
  const evaluation = readJson(safe(source, prefix + m.evaluation));
  fields(evaluation, ['schema_version', 'cases'], 'evaluation');
  requireThat(evaluation.schema_version === 1 && Array.isArray(evaluation.cases) && evaluation.cases.length > 0, `Invalid evals: ${id}`);
  const caseIds = [];
  for (const c of evaluation.cases) {
    fields(c, ['id', 'prompt', 'criteria', 'critical'], 'eval case');
    requireThat(slug(c.id) && text(c.prompt) && strings(c.criteria) && typeof c.critical === 'boolean', `Invalid eval case: ${id}`);
    caseIds.push(c.id);
  }
  requireThat(unique(caseIds), `Duplicate eval cases: ${id}`);
  return { ...m, checks: verification.checks, cases: evaluation.cases };
}
