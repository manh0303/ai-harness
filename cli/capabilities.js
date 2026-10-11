import fs from 'node:fs';
import { manifest, readJson, safe, SLUG, HarnessError, payload } from './files.js';

const validName = name => typeof name === 'string' && SLUG.test(name);
const fail = message => { throw new HarnessError(message); };
const exact = (value, fields) => value && typeof value === 'object' && !Array.isArray(value)
  && Object.keys(value).sort().join(',') === [...fields].sort().join(',');
const unique = values => new Set(values).size === values.length;

function skillMetadata(body, name) {
  const front = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(body);
  if (!front || !front[1].split(/\r?\n/).includes(`name: ${name}`)) fail(`Invalid skill metadata: ${name}`);
  const description = front[1].split(/\r?\n/).find(line => line.startsWith('description: '))?.slice(13)?.trim();
  if (!description) fail(`Missing skill description: ${name}`);
  for (const heading of ['## Input', '## Procedure', '## Output', '## Constraints']) {
    if (!body.includes(heading)) fail(`Missing ${heading} in skill: ${name}`);
  }
  return { name, description };
}

export function loadCapability(source, id) {
  if (!validName(id)) fail('Invalid capability ID');
  const prefix = `capabilities/${id}/`;
  const meta = readJson(safe(source, prefix + 'capability.json'));
  if (!exact(meta, ['schema_version', 'id', 'description', 'skills', 'workflows'])
      || meta.schema_version !== 1 || meta.id !== id || typeof meta.description !== 'string' || !meta.description.trim()) fail(`Invalid capability: ${id}`);
  if (!Array.isArray(meta.skills) || !meta.skills.length || !unique(meta.skills)
      || !meta.skills.every(name => validName(name) && name.startsWith(`harness-${id}-`))) fail(`Invalid capability skills: ${id}`);
  if (!Array.isArray(meta.workflows) || !meta.workflows.length || !unique(meta.workflows)
      || !meta.workflows.every(p => /^workflows\/[a-z][a-z0-9-]*\.md$/.test(p))) fail(`Invalid capability workflows: ${id}`);
  for (const name of meta.skills) {
    skillMetadata(fs.readFileSync(safe(source, prefix + `skills/${name}/SKILL.md`), 'utf8'), name);
  }
  for (const workflow of meta.workflows) {
    if (!fs.readFileSync(safe(source, prefix + workflow), 'utf8').trim()) fail(`Empty capability workflow: ${id}/${workflow}`);
  }
  return meta;
}

export function listCapabilities(source) {
  return (manifest(source).capabilities ?? []).map(id => {
    const { description, skills, workflows } = loadCapability(source, id);
    return { id, description, skills, workflows };
  });
}

// Progressive disclosure: return metadata only; never include skill bodies in a catalog.
export function skillCatalog(root, lock) {
  const skills = Object.keys(lock.files).filter(p => /^\.agents\/skills\/harness-[a-z0-9-]+\/SKILL\.md$/.test(p)).sort()
    .map(p => {
      const name = p.split('/')[2];
      const contents = payload(root, p).toString('utf8');
      return { ...skillMetadata(contents, name), path: p };
    });
  return { status: 'ok', version: lock.version, skills, note: 'Descriptions only. Use aih skill <name> to fetch full instructions when relevant.' };
}

export function readSkill(root, lock, name) {
  if (!validName(name) || !name.startsWith('harness-')) fail('Invalid skill name');
  const relative = `.agents/skills/${name}/SKILL.md`;
  if (!Object.hasOwn(lock.files, relative)) fail(`Skill is not installed: ${name}`);
  const content = payload(root, relative).toString('utf8');
  skillMetadata(content, name);
  return { status: 'ok', name, path: relative, content };
}
