import { readJson, safe, HarnessError, SLUG } from './files.js';
const requireThat = (condition, message) => { if (!condition) throw new HarnessError(message); };
const text = v => typeof v === 'string' && v.trim().length > 0;
const exact = (v, keys) => v && typeof v === 'object' && !Array.isArray(v)
  && Object.keys(v).sort().join(',') === [...keys].sort().join(',');
export function checksFrom(source, relative) {
  const doc = readJson(safe(source, relative));
  requireThat(exact(doc, ['schema_version', 'checks']) && doc.schema_version === 1 && Array.isArray(doc.checks)
    && doc.checks.length > 0, `Invalid verification: ${relative}`);
  const ids = new Set();
  for (const check of doc.checks) {
    requireThat(!ids.has(check?.id), `Duplicate checks: ${relative}`);
    requireThat(exact(check, ['id', 'title', 'command', 'when_file', 'evidence', 'execution'])
      && typeof check.id === 'string' && SLUG.test(check.id) && !ids.has(check.id)
      && text(check.title) && Array.isArray(check.command) && check.command.every(text)
      && Array.isArray(check.evidence) && check.evidence.length > 0 && check.evidence.every(text)
      && ((check.execution === 'advisory' && check.command.length > 0)
       || (check.execution === 'manual' && check.command.length === 0)), `Invalid check: ${relative}`);
    if (check.when_file !== null) {
      requireThat(typeof check.when_file === 'string', `Invalid when_file: ${relative}`);
      safe(source, check.when_file);
    }
    ids.add(check.id);
  }
  return doc.checks;
}
export function casesFrom(source, relative) {
  const doc = readJson(safe(source, relative));
  requireThat(exact(doc, ['schema_version', 'cases']) && doc.schema_version === 1 && Array.isArray(doc.cases)
    && doc.cases.length > 0, `Invalid evaluation: ${relative}`);
  const ids = new Set();
  for (const c of doc.cases) {
    requireThat(c && Object.keys(c).every(k => ['id', 'prompt', 'criteria', 'critical', 'assertions'].includes(k)) && ['id', 'prompt', 'criteria', 'critical'].every(k => Object.hasOwn(c, k))
      && typeof c.id === 'string' && SLUG.test(c.id) && !ids.has(c.id)
      && text(c.prompt) && Array.isArray(c.criteria) && c.criteria.length > 0 && c.criteria.every(text)
      && typeof c.critical === 'boolean', `Invalid eval case: ${relative}`);
    if (c.assertions !== undefined) {
      requireThat(Array.isArray(c.assertions) && c.assertions.length <= 32, `Invalid assertions: ${relative}`);
      const assertionIds = new Set();
      for (const a of c.assertions) {
        requireThat(exact(a, ['id', 'type', 'target', 'value']) && typeof a.id === 'string' && SLUG.test(a.id)
          && !assertionIds.has(a.id) && ['contains', 'not-contains'].includes(a.type)
          && ['transcript', 'tool-inputs'].includes(a.target) && text(a.value) && a.value.length <= 4096, `Invalid assertion: ${relative}`);
        assertionIds.add(a.id);
      }
    }
    ids.add(c.id);
  }
  return doc.cases;
}
