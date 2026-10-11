import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { SOURCE, manifest } from '../cli/harness.js';
import { loadAdapter } from '../cli/adapter-schema.js';
import { loadCapability } from '../cli/capabilities.js';

const read = p => fs.readFileSync(path.join(SOURCE, p), 'utf8');

test('skill matrix covers exactly every registered Core, adapter and capability skill', () => {
  const m = manifest(SOURCE);
  const core = fs.readdirSync(path.join(SOURCE, 'core/skills'), { withFileTypes: true })
    .filter(entry => entry.isDirectory()).map(entry => entry.name);
  const declared = [
    ...core,
    ...m.adapters.flatMap(id => loadAdapter(SOURCE, id).skills),
    ...(m.capabilities ?? []).flatMap(id => loadCapability(SOURCE, id).skills),
  ].sort();
  const matrix = read('docs/skill-matrix.md');
  const matches = [...matrix.matchAll(/^\| \[\x60(harness-[a-z0-9-]+)\x60\]\((\.\.\/[^)]+)\) \|/gm)]
    .map(([, name, relative]) => ({ name, relative }));
  assert.equal(matches.length, declared.length, 'Skill matrix row count drift');
  assert.deepEqual(matches.map(row => row.name).sort(), declared,
    'Skill matrix must list all registered skills exactly once');
  for (const row of matches) {
    const target = path.resolve(SOURCE, 'docs', row.relative);
    assert.ok(target.startsWith(SOURCE + path.sep), 'Link must stay inside the repo');
    assert.ok(fs.existsSync(target), 'Missing linked SKILL.md: ' + row.name);
    assert.equal(path.basename(path.dirname(target)), row.name);
  }
});

test('SDLC, handoffs and four stack examples stay discoverable from README', () => {
  const pages = [
    'docs/getting-started.md', 'docs/end-to-end-workflow.md',
    'docs/skill-matrix.md', 'docs/agent-handoffs.md',
    'docs/examples/spring-boot-api.md', 'docs/examples/fullstack-web.md',
    'docs/examples/react-native-app.md', 'docs/examples/ai-rag-service.md',
  ];
  const readme = read('README.md');
  for (const page of pages) {
    assert.ok(fs.existsSync(path.join(SOURCE, page)), 'Missing guide: ' + page);
    assert.ok(readme.includes('](' + page + ')'), 'Missing README link: ' + page);
    assert.ok(read(page).length > 700, 'Empty or truncated guide: ' + page);
  }
  const full = read('docs/end-to-end-workflow.md');
  for (const phase of ['Intake', 'Business', 'UX/UI', 'Technical spec', 'Implementation', 'Verify', 'Delivery', 'Operations']) {
    assert.ok(full.includes(phase), 'Missing SDLC phase: ' + phase);
  }
  for (const page of pages.filter(value => value.startsWith('docs/examples/'))) {
    const content = read(page);
    assert.match(content, /aih init/, 'Walkthrough must show setup');
    assert.match(content, /aih (verify|eval) --scope all/, 'Walkthrough must distinguish advisory evaluation');
    assert.match(content, /approval|approve|duyệt|phê duyệt/i, 'Walkthrough must include human gate');
  }
});

test('agent handoff guide links every Core and Product role contract', () => {
  const guide = read('docs/agent-handoffs.md');
  for (const role of fs.readdirSync(path.join(SOURCE, 'core/agents'))) {
    assert.ok(guide.includes('core/agents/' + role), 'Missing Core role: ' + role);
  }
  for (const role of loadCapability(SOURCE, 'product').agents) {
    assert.ok(guide.includes('capabilities/product/' + role), 'Missing Product role: ' + role);
  }
});

test('DevOps README reflects unified advisory eval without claiming execution', () => {
  const doc = read('capabilities/devops/README.md');
  assert.doesNotMatch(doc, /currently operate on adapters only/);
  assert.match(doc, /--scope all/);
  assert.match(doc, /Neither command executes/);
});
