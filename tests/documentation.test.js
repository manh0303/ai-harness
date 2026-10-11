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

test('SDLC, handoffs and five stack examples stay discoverable from README', () => {
  const pages = [
    'docs/getting-started.md', 'docs/end-to-end-workflow.md',
    'docs/skill-matrix.md', 'docs/agent-handoffs.md',
    'docs/examples/spring-boot-api.md', 'docs/examples/fullstack-web.md',
    'docs/examples/react-native-app.md', 'docs/examples/ai-rag-service.md',
    'docs/examples/astro-micro-tools.md',
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

test('Idea/document entry points and SRS are registered with real templates and appropriate storage', () => {
  const product = loadCapability(SOURCE, 'product');
  const workflowNames = ['workflows/idea-driven.md', 'workflows/document-driven.md'];
  for (const workflow of workflowNames) assert.ok(product.workflows.includes(workflow));
  for (const type of ['idea','research','prd-lite','srs','use-cases']) {
    assert.ok(product.templates.includes(`templates/${type}.md`));
    const body = read(`capabilities/product/templates/${type}.md`);
    assert.match(body, /Status:/);
    assert.match(body, /pending|draft/i);
  }
  const guide = read('docs/documentation-workflows.md');
  for (const phrase of ['Idea-driven', 'Document-driven', 'docs/discovery/', 'docs/product/', 'Confluence']) {
    assert.ok(guide.includes(phrase), 'Missing documentation topic: ' + phrase);
  }
  assert.ok(read('README.md').includes('docs/documentation-workflows.md'));
  assert.ok(read('README.md').includes('integrations/confluence/README.md'));
  assert.match(read('integrations/confluence/README.md'), /human approval/i);
  assert.match(read('integrations/confluence/README.md'), /non-executable/i);
});

test('end-to-end Idea and BA-document tutorials stay linked and actionable', () => {
  const readme = read('README.md');
  const guide = read('docs/documentation-workflows.md');
  for (const name of ['idea-driven-project.md', 'document-driven-project.md']) {
    const path = 'docs/examples/' + name;
    const content = read(path);
    assert.ok(readme.includes('](' + path + ')'), 'README must link ' + path);
    assert.ok(guide.includes('](examples/' + name + ')'), 'Documentation guide must link ' + name);
    assert.match(content, /aih init/);
    assert.match(content, /aih new-doc/);
    assert.match(content, /aih new-change/);
    assert.match(content, /AGENTS\.md/);
    assert.match(content, /review|approve|duyệt/i);
    assert.match(content, /không tự|không thể|không cần/i);
  }
  const cli = read('docs/cli.md');
  assert.match(cli, /docs\/discovery\//);
  assert.match(cli, /docs\/product\//);
});

test('Astro adapter guide, skill matrix and CLI help remain discoverable', () => {
  const m = manifest(SOURCE);
  assert.ok(m.adapters.includes('astro'));
  const astro = loadAdapter(SOURCE, 'astro');
  assert.equal(astro.skills.length, 6);
  assert.equal(astro.checks.length, 4);
  assert.equal(astro.cases.length, 4);
  const matrix = read('docs/skill-matrix.md');
  assert.match(matrix, /Astro adapter \(6\)/);
  for (const name of astro.skills) {
    assert.ok(matrix.includes('[' + String.fromCharCode(96) + name + String.fromCharCode(96) + ']'));
  }
  const readme = read('README.md');
  for (const section of ['docs/examples/astro-micro-tools.md', 'adapters/astro/README.md']) {
    assert.ok(readme.includes(section), 'Missing Astro README link: ' + section);
  }
  assert.match(read('docs/getting-started.md'), /--adapters astro/);
  assert.match(read('docs/adapters.md'), /\| astro \|/);
  assert.match(read('docs/architecture.md'), /Astro static-first adapter/);
});
