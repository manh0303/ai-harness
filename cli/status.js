import fs from 'node:fs';
import path from 'node:path';
import { safe, stat, SLUG, HarnessError } from './files.js';
import { check, loadLock } from './harness.js';
import { loadStartConfig } from './start-config.js';
import { resumePlan } from './checkpoint.js';

function taskSummary(root, id) {
  const name = 'openspec/changes/' + id + '/tasks.md', filename = safe(root, name), info = stat(filename);
  if (!info) return { path: null, checked: 0, unchecked: 0, first_unchecked: null };
  if (info.size > 1024 * 1024) throw new HarnessError('tasks.md exceeds 1 MiB');
  // Fenced examples are not task declarations. Checkboxes are declarations, not test evidence.
  const lines = fs.readFileSync(filename, 'utf8').split(/\r?\n/);
  let fence = null, checked = 0, unchecked = 0, first = null;
  for (const line of lines) {
    const marker = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (marker) { if (!fence) fence = marker[1]; else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null; continue; }
    if (fence) continue;
    const task = line.match(/^\s*[-*+] \[([ xX])\]\s+(.+)$/);
    if (!task) continue;
    if (task[1] !== ' ') checked++;
    else { unchecked++; first ??= task[2].slice(0, 512); }
  }
  return { path: name, checked, unchecked, first_unchecked: first };
}
export function changesReport(root) {
  if (check(root).status !== 'ok') throw new HarnessError('Fix installation drift before reading changes');
  const saved = loadStartConfig(root), directory = path.dirname(safe(root, 'openspec/changes/.status-probe'));
  if (!fs.existsSync(directory)) return { status: 'ok', changes: [], truncated: false, executed: false };
  const ids = fs.readdirSync(directory).filter(id => id !== 'archive' && SLUG.test(id)).sort();
  const changes = ids.slice(0, 100).map(id => {
    const proposal = 'openspec/changes/' + id + '/proposal.md';
    const present = Boolean(stat(safe(root, proposal)));
    return { id, active: saved?.change_id === id, proposal: present ? proposal : null,
      tasks: taskSummary(root, id), checkpoint: Boolean(stat(safe(root, 'openspec/changes/' + id + '/checkpoint.json'))) };
  });
  return { status: 'ok', changes, truncated: ids.length > 100, executed: false,
    note: 'Local declarations only. Checked tasks do not prove verification, approval, merge or release. Archive is excluded; no files changed.' };
}
export function statusReport(root) {
  const catalog = changesReport(root), saved = loadStartConfig(root), lock = loadLock(root);
  const active = catalog.changes.find(row => row.id === saved?.change_id) ?? (saved?.change_id ? { tasks: taskSummary(root, saved.change_id), checkpoint: Boolean(stat(safe(root, 'openspec/changes/' + saved.change_id + '/checkpoint.json'))) } : null);
  let recovery = null;
  if (saved?.change_id && (saved.goal === 'resume' || active?.checkpoint)) {
    try { recovery = resumePlan(root, saved.change_id); }
    catch (error) { if (!(error instanceof HarnessError)) throw error; recovery = { status: 'blocked', next_action: 'Reconcile checkpoint and evidence before resuming.' }; }
  }
  return { status: recovery?.status === 'blocked' ? 'blocked' : 'ok', executed: false,
    version: lock.version, adapters: lock.adapters, capabilities: lock.capabilities ?? [], task: saved?.task ?? null,
    goal: saved?.goal ?? null, change: saved?.change_id ?? null, tasks: active?.tasks ?? null, recovery,
    next_action: recovery?.next_action ?? (saved ? 'Read relevant context and reconcile current requirements/code before continuing the saved task.' : 'Give your task to harness-start in your chosen AI tool.'),
    note: 'Read-only orientation. First unchecked task is a candidate, not a dependency decision. No process, model, MCP or remote state is inspected.' };
}
