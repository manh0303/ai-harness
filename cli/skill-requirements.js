import fs from 'node:fs';
import { safe, stat, isObject, HarnessError } from './files.js';
import { parseStructured } from './structured.js';
import { loadEnvironment, environmentReport } from './environment.js';
import { loadArtifactContract } from './artifacts.js';

export function skillRequirements(body) {
  const front = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(body)?.[1];
  if (front === undefined) throw new HarnessError('Skill frontmatter is required');
  const lines = front.split(/\r?\n/), starts = lines.map((l,i) => /^requires:/.test(l) ? i : -1).filter(i => i >= 0);
  if (!starts.length) return { machine: [], environment: [], mcp: [] };
  if (starts.length !== 1) throw new HarnessError('Duplicate skill requires');
  let end = starts[0] + 1;
  while (end < lines.length && (!lines[end].trim() || /^\s/.test(lines[end]))) end++;
  const requires = parseStructured(lines.slice(starts[0], end).join('\n'), 'skill requires').requires;
  if (!isObject(requires) || Object.keys(requires).some(k => !['machine','environment','mcp'].includes(k))) throw new HarnessError('Invalid skill requires');
  const result = { machine: [], environment: [], mcp: [], ...requires };
  for (const [group, entries] of Object.entries(result)) {
    const pattern = group === 'mcp' ? /^[A-Za-z0-9_.-]+$/ : /^(?:tools|files|commands)\.[a-z][a-z0-9-]*(?:\.(?:executable|path|tool|args))?$/;
    if (!Array.isArray(entries) || entries.length > 64 || new Set(entries).size !== entries.length || entries.some(v => typeof v !== 'string' || !pattern.test(v))) throw new HarnessError('Invalid skill requires.' + group);
  }
  return result;
}
export function requirementReport(root, name) {
  if (typeof name !== 'string' || !/^[a-z][a-z0-9-]*$/.test(name)) throw new HarnessError('Invalid skill name');
  // Project native/custom skills are explicit inputs too; do not scan all their bodies.
  const candidates = ['.agents/skills/', '.kiro/skills/', 'plugins/'];
  const relative = candidates.map(p => p + name + '/SKILL.md').find(p => stat(safe(root,p)));
  if (!relative) throw new HarnessError('Skill not found: ' + name);
  if (stat(safe(root,relative)).size > 65536) throw new HarnessError('Skill exceeds 64 KiB');
  const requirements = skillRequirements(fs.readFileSync(safe(root,relative),'utf8'));
  const env = loadEnvironment(root), presence = environmentReport(root), contract = loadArtifactContract(root);
  const get = (value, reference) => reference.split('.').reduce((o,k) => o && Object.hasOwn(o,k) ? o[k] : undefined, value);
  const missing = [], hostChecks = [];
  for (const group of ['machine','environment']) for (const reference of requirements[group]) {
    const value = get(group === 'machine' ? env.machine : env.shared, reference);
    const [kind,id] = reference.split('.');
    const entry = presence.entries.find(e => e.group === kind && e.id === id);
    if (value === undefined || !entry || !['present','declared'].includes(entry.status)) missing.push(group + ':' + reference);
  }
  for (const binding of requirements.mcp) {
    if (!Object.values(contract.integrations.connections).some(c => c.via === 'mcp' && c.binding === binding)) missing.push('mcp:' + binding);
    else hostChecks.push({ binding, status: 'unverified' });
  }
  return { status: missing.length ? 'blocked' : 'ok', skill: name, path: relative, requirements, missing, host_checks: hostChecks,
    note: 'Local prerequisites only. MCP access/tools still require verification in the active host; values are omitted.' };
}
