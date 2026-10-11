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
  // Schema 1 supports optional role and template lists; legacy UI/UX stays valid.
  const required = ['schema_version', 'id', 'description', 'skills', 'workflows'];
  const allowed = new Set([...required, 'agents', 'templates']);
  if (!meta || typeof meta !== 'object' || Array.isArray(meta)
      || required.some(k => !Object.hasOwn(meta, k))
      || Object.keys(meta).some(k => !allowed.has(k))
      || meta.schema_version !== 1 || meta.id !== id
      || typeof meta.description !== 'string' || !meta.description.trim()) fail(`Invalid capability: ${id}`);
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
  for (const [kind, pattern] of [
    ['agents', new RegExp('^agents/[a-z][a-z0-9-]*[.]md$')],
    ['templates', new RegExp('^templates/[a-z][a-z0-9-]*[.]md$')],
  ]) {
    const entries = meta[kind] ?? [];
    if (!Array.isArray(entries) || !unique(entries) || !entries.every(p => typeof p === 'string' && pattern.test(p))) fail(`Invalid capability ${kind}: ${id}`);
    for (const file of entries) {
      const body = fs.readFileSync(safe(source, prefix + file), 'utf8');
      if (!body.trim()) fail(`Empty capability ${kind}: ${id}/${file}`);
      if (kind === 'agents' && !['## Inputs', '## Outputs', '## Permissions and limits', '## Handoff'].every(h => body.includes(h))) {
        fail(`Invalid capability agent contract: ${id}/${file}`);
      }
    }
  }
  return { ...meta, agents: meta.agents ?? [], templates: meta.templates ?? [] };
}

export function listCapabilities(source) {
  return (manifest(source).capabilities ?? []).map(id => {
    const { description, skills, workflows, agents, templates } = loadCapability(source, id);
    return { id, description, skills, workflows, agents, templates };
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
)],
    ['templates', /^templates\\/[a-z][a-z0-9-]*\\.md$/],
  ]) {
    const entries = meta[kind] ?? [];
    if (!Array.isArray(entries) || !unique(entries) || !entries.every(p => typeof p === 'string' && pattern.test(p))) fail(`Invalid capability ${kind}: ${id}`);
    for (const file of entries) {
      const body = fs.readFileSync(safe(source, prefix + file), 'utf8');
      if (!body.trim()) fail(`Empty capability ${kind}: ${id}/${file}`);
      if (kind === 'agents' && !['## Inputs', '## Outputs', '## Permissions and limits', '## Handoff'].every(h => body.includes(h))) {
        fail(`Invalid capability agent contract: ${id}/${file}`);
      }
    }
  }
  return { ...meta, agents: meta.agents ?? [], templates: meta.templates ?? [] };
}

export function listCapabilities(source) {
  return (manifest(source).capabilities ?? []).map(id => {
    const { description, skills, workflows, agents, templates } = loadCapability(source, id);
    return { id, description, skills, workflows, agents, templates };
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
)],
  ]) {
    const entries = meta[kind] ?? [];
    if (!Array.isArray(entries) || !unique(entries) || !entries.every(p => typeof p === 'string' && pattern.test(p))) fail(`Invalid capability ${kind}: ${id}`);
    for (const file of entries) {
      const body = fs.readFileSync(safe(source, prefix + file), 'utf8');
      if (!body.trim()) fail(`Empty capability ${kind}: ${id}/${file}`);
      if (kind === 'agents' && !['## Inputs', '## Outputs', '## Permissions and limits', '## Handoff'].every(h => body.includes(h))) {
        fail(`Invalid capability agent contract: ${id}/${file}`);
      }
    }
  }
  return { ...meta, agents: meta.agents ?? [], templates: meta.templates ?? [] };
}

export function listCapabilities(source) {
  return (manifest(source).capabilities ?? []).map(id => {
    const { description, skills, workflows, agents, templates } = loadCapability(source, id);
    return { id, description, skills, workflows, agents, templates };
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
)],
    ['templates', /^templates\\/[a-z][a-z0-9-]*\\.md$/],
  ]) {
    const entries = meta[kind] ?? [];
    if (!Array.isArray(entries) || !unique(entries) || !entries.every(p => typeof p === 'string' && pattern.test(p))) fail(`Invalid capability ${kind}: ${id}`);
    for (const file of entries) {
      const body = fs.readFileSync(safe(source, prefix + file), 'utf8');
      if (!body.trim()) fail(`Empty capability ${kind}: ${id}/${file}`);
      if (kind === 'agents' && !['## Inputs', '## Outputs', '## Permissions and limits', '## Handoff'].every(h => body.includes(h))) {
        fail(`Invalid capability agent contract: ${id}/${file}`);
      }
    }
  }
  return { ...meta, agents: meta.agents ?? [], templates: meta.templates ?? [] };
}

export function listCapabilities(source) {
  return (manifest(source).capabilities ?? []).map(id => {
    const { description, skills, workflows, agents, templates } = loadCapability(source, id);
    return { id, description, skills, workflows, agents, templates };
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
