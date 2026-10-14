import fs from 'node:fs';
import path from 'node:path';
import { safe, stat, readJson, isObject, SLUG, HarnessError } from './files.js';
import { registeredRoles } from './agents.js';

export const CHECKS = ['spec-structure', 'decisions-resolved', 'tasks-present', 'tasks-complete', 'verification-evidence', 'artifact-impact', 'outputs-present'];
export const HUMAN_ROLES = ['spec-owner', 'product-owner', 'reviewer'];
const locations = { 'spec-to-code': 'core/workflows/spec-to-code.workflow.json', 'idea-to-prd': 'capabilities/product/workflows/idea-to-prd.workflow.json' };
const assert = (ok, message) => { if (!ok) throw new HarnessError('Invalid workflow: ' + message); };
const fields = (v, allowed, required) => isObject(v) && Object.keys(v).every(k => allowed.includes(k)) && required.every(k => Object.hasOwn(v, k));
const list = (v, accept) => Array.isArray(v) && v.length <= 64 && new Set(v).size === v.length && v.every(accept);
export function validateWorkflow(doc, roles) {
  assert(fields(doc, ['schema_version', 'id', 'stages'], ['schema_version', 'id', 'stages']) && doc.schema_version === 1 && typeof doc.id === 'string' && SLUG.test(doc.id), 'root/schema');
  assert(Array.isArray(doc.stages) && doc.stages.length > 0 && doc.stages.length <= 64, 'stages');
  const ids = new Set();
  for (const s of doc.stages) {
    assert(fields(s, ['id', 'owner', 'outputs', 'next', 'on_reject', 'on_fail', 'entry_gate', 'approval'], ['id', 'owner', 'next']), 'stage fields');
    assert(typeof s.id === 'string' && SLUG.test(s.id) && !ids.has(s.id), 'duplicate/invalid stage ID'); ids.add(s.id);
    assert(typeof s.owner === 'string' && (roles.has(s.owner) || HUMAN_ROLES.some(r => s.owner === 'human:' + r)), 'unknown owner ' + s.owner);
    assert(list(s.next, v => typeof v === 'string' && SLUG.test(v)), 'next');
    for (const k of ['on_reject', 'on_fail']) if (s[k] !== undefined) assert(typeof s[k] === 'string' && SLUG.test(s[k]), k);
    if (s.outputs !== undefined) assert(list(s.outputs, v => typeof v === 'string' && /^[A-Za-z0-9._/-]+$/.test(v) && !v.startsWith('/') && v.split('/').every(p => p && p !== '.' && p !== '..')), 'output paths');
    if (s.approval !== undefined) assert(fields(s.approval, ['role'], ['role']) && HUMAN_ROLES.includes(s.approval.role), 'approval role');
    if (s.entry_gate !== undefined) {
      assert(fields(s.entry_gate, ['deterministic', 'approval_from'], []), 'entry_gate');
      if (s.entry_gate.deterministic !== undefined) assert(list(s.entry_gate.deterministic, v => CHECKS.includes(v)), 'unknown deterministic check');
      if (s.entry_gate.approval_from !== undefined) assert(typeof s.entry_gate.approval_from === 'string', 'approval_from');
    }
  }
  const map = new Map(doc.stages.map(s => [s.id, s]));
  for (const s of doc.stages) {
    for (const target of [...s.next, ...[s.on_reject, s.on_fail].filter(v => v !== undefined)]) assert(ids.has(target), 'unknown transition ' + target);
    if (s.entry_gate?.approval_from !== undefined) assert(map.get(s.entry_gate.approval_from)?.approval, 'approval_from must reference an approval stage');
  }
  // Remove rejection/failure edges: ordinary forward transitions must form a DAG.
  const visited = new Set(), active = new Set();
  function visit(id) { assert(!active.has(id), 'forward cycle'); if (visited.has(id)) return; active.add(id); for (const n of map.get(id).next) visit(n); active.delete(id); visited.add(id); }
  for (const id of ids) visit(id);
  return doc;
}
export function loadWorkflow(source, id, capabilities = []) {
  assert(Object.hasOwn(locations, id), 'unknown workflow ID');
  assert(id !== 'idea-to-prd' || capabilities.includes('product'), 'Product workflow not installed/selected');
  const file = safe(source, locations[id]), info = stat(file);
  assert(info && info.size <= 65536, 'workflow not installed: ' + id);
  return validateWorkflow(readJson(file), new Set(Object.keys(registeredRoles(source, capabilities))));
}
export function workflowReport(source, capabilities = []) {
  const workflows = [];
  for (const [id, relative] of Object.entries(locations)) {
    if (id === 'idea-to-prd' && !capabilities.includes('product')) continue;
    if (!stat(safe(source, relative))) continue;
    const doc = loadWorkflow(source, id, capabilities);
    const md = fs.readFileSync(safe(source, relative.replace('.workflow.json', '.md')), 'utf8');
    const rows = [...md.matchAll(/^\| `([a-z][a-z0-9-]*)` \|/gm)].map(m => m[1]);
    assert(JSON.stringify(rows) === JSON.stringify(doc.stages.map(s => s.id)), id + ' Markdown stage table drift');
    workflows.push({ id, stages: doc.stages.map(s => s.id), path: relative });
  }
  return { status: 'ok', workflows, executed: false, note: 'Contract validation only; no driver or model executed.' };
}
export function readApprovals(root, base, workflow) {
  const filename = safe(root, base + '/approvals.json'), info = stat(filename);
  if (!info) return [];
  assert(info.size <= 65536, 'approvals file too large');
  const doc = readJson(filename);
  assert(fields(doc, ['schema_version', 'workflow', 'approvals'], ['schema_version', 'workflow', 'approvals']) && doc.schema_version === 1 && doc.workflow === workflow.id && Array.isArray(doc.approvals) && doc.approvals.length <= 64, 'approvals schema/workflow');
  const seen = new Set(), stages = new Map(workflow.stages.map(s => [s.id, s]));
  for (const a of doc.approvals) {
    const key = a?.stage + ':' + a?.role;
    assert(fields(a, ['stage', 'role', 'by', 'at', 'source_ref'], ['stage', 'role', 'by', 'at', 'source_ref']) && stages.get(a.stage)?.approval?.role === a.role && !seen.has(key), 'approval stage/role/duplicate');
    for (const k of ['by', 'source_ref']) assert(typeof a[k] === 'string' && a[k].trim().length > 0 && a[k].length <= 4096 && !/[\x00-\x1f]/.test(a[k]), 'approval ' + k);
    assert(typeof a.at === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(a.at) && Number.isFinite(Date.parse(a.at)), 'approval timestamp');
    seen.add(key);
  }
  return doc.approvals;
}
