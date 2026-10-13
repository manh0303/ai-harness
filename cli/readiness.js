import fs from 'node:fs';
import path from 'node:path';
import { safe, stat, SLUG, isObject, HarnessError } from './files.js';
import { readConfig } from './project-config.js';
import { artifactImpact } from './artifacts.js';

const text = s => typeof s === 'string' && s.trim().length > 0;
const draft = s => /\b(?:TODO|TBD|FIXME)\b|\{\{[^}]+\}\}/i.test(s);
const evidenceText = s => text(s) && !draft(s);
function prose(body) {
  let fence = null;
  return body.split(/\r?\n/).map(line => {
    const start = line.match(/^\s{0,3}([`~])\1{2,}/);
    if (start) {
      if (!fence) fence = { char: start[1], length: start[0].trim().length };
      else if (start[1] === fence.char && start[0].trim().length >= fence.length &&
        line.slice(start[0].length).trim() === '') fence = null;
      return '';
    }
    return fence ? '' : line;
  }).join('\n');
}
export function ready(root, id, stage = 'implement') {
  if (!SLUG.test(id) || id === 'archive') throw new HarnessError('Invalid change ID');
  if (!['implement', 'review'].includes(stage)) throw new HarnessError('Invalid readiness stage');
  const base = 'openspec/changes/' + id;
  const problems = [], documents = new Map();
  const read = relative => {
    const name = base + '/' + relative, p = safe(root, name), info = stat(p);
    if (!info) { problems.push('Missing ' + relative); return; }
    if (info.size > 1024 * 1024) throw new HarnessError('Change document exceeds 1 MiB');
    const body = fs.readFileSync(p, 'utf8');
    if (!body.trim()) problems.push('Empty ' + relative);
    const content = prose(body);
    if (draft(content)) problems.push('Draft placeholders in ' + relative);
    documents.set(relative, content);
  };
  for (const name of ['proposal.md', 'design.md', 'tasks.md']) read(name);
  // safe() validates parent segments using a file leaf; do not traverse symlinked folders.
  safe(root, base + '/specs/probe.md');
  const specsRoot = path.join(root, base, 'specs');
  let count = 0;
  const visit = (folder, relative, depth = 0) => {
    if (depth > 12) throw new HarnessError('Spec directory nesting exceeds limit');
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      if (entry.isSymbolicLink()) throw new HarnessError('Symlink in change specs');
      if (entry.isDirectory()) visit(path.join(folder, entry.name), relative + '/' + entry.name, depth + 1);
      else if (entry.isFile() && entry.name.endsWith('.md')) {
        if (++count > 100) throw new HarnessError('Too many spec documents');
        const name = relative + '/' + entry.name;
        read(name);
        const body = documents.get(name) || '';
        if (!/^### Requirement:/m.test(body) || !/^#### Scenario:/m.test(body) ||
            !/\bWHEN\b/.test(body) || !/\bTHEN\b/.test(body)) problems.push('Missing requirement/scenario structure in ' + name);
      }
    }
  };
  if (fs.existsSync(specsRoot)) visit(specsRoot, 'specs');
  if (!count) problems.push('Missing delta specs');

  const decisions = readConfig(root, base + '/decisions.json');
  if (!isObject(decisions) || decisions.schema_version !== 1 || typeof decisions.reviewed !== 'boolean' ||
      !Array.isArray(decisions.decisions)) problems.push('Missing/invalid decisions.json; copy the installed template for legacy changes');
  else {
    if (!decisions.reviewed) problems.push('Consequential ambiguity review is not recorded');
    const ids = new Set();
    for (const row of decisions.decisions) {
      if (!isObject(row) || !text(row.id) || ids.has(row.id) || !text(row.question) ||
          !['open', 'resolved'].includes(row.status)) { problems.push('Invalid/duplicate decision record'); continue; }
      ids.add(row.id);
      if (row.status === 'open') problems.push('Unresolved decision: ' + row.id);
      else if (!evidenceText(row.answer) || !evidenceText(row.source)) problems.push('Decision needs answer and source: ' + row.id);
    }
  }
  let postMergeLevel = null, taskCount = 0, pending = 0;
  for (const line of (documents.get('tasks.md') || '').split('\n')) {
    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (heading) {
      if (postMergeLevel !== null && heading[1].length <= postMergeLevel) postMergeLevel = null;
      if (/^(?:\d+\.?\s+)?After merge$/i.test(heading[2])) postMergeLevel = heading[1].length;
    }
    const task = line.match(/^\s*(?:[-*+]|\d+\.)\s+\[([ xX])\]/);
    if (task && postMergeLevel === null) { taskCount++; if (task[1] === ' ') pending++; }
  }
  if (!taskCount) problems.push('Missing pre-merge task checklist');
  if (stage === 'review' && pending) problems.push('Incomplete pre-merge tasks: ' + pending);

  const skipped = [];
  if (stage === 'review') {
    const verification = readConfig(root, base + '/verification.json');
    if (!isObject(verification) || verification.schema_version !== 1 || !Array.isArray(verification.checks) ||
        !verification.checks.length) problems.push('Missing verification evidence');
    else {
      const names = new Set();
      let passed = 0;
      for (const item of verification.checks) {
        if (!isObject(item) || !text(item.name) || names.has(item.name) ||
            !['passed', 'failed', 'skipped'].includes(item.status)) { problems.push('Invalid/duplicate verification record'); continue; }
        names.add(item.name);
        if (item.status === 'skipped') {
          if (!evidenceText(item.reason)) problems.push('Skipped check needs reason: ' + item.name);
          skipped.push({ name: item.name, reason: item.reason || '' });
        } else {
          if (!evidenceText(item.evidence)) problems.push('Check needs evidence: ' + item.name);
          if (item.status === 'failed') problems.push('Failed check: ' + item.name);
          else passed++;
        }
      }
      if (!passed) problems.push('No completed passing check or manual review recorded');
    }
  }
  problems.push(...artifactImpact(root, base, stage));
  return { status: problems.length ? 'blocked' : 'ready', change: id, stage, problems,
    tasks: { pre_merge: taskCount, pending }, skipped_checks: skipped, executed: false,
    next_steps: problems.length ? ['Resolve reported gaps; ask the user about unresolved consequential decisions.']
      : [stage === 'implement' ? 'Implement the agreed slice within existing authorization.'
        : 'Review actual evidence and the diff before creating a PR.'],
    note: 'Structural readiness only, not business approval, OpenSpec validation or proof of truthful test evidence.' };
}
