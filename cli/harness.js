import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { loadAdapter } from './adapter-schema.js';
import { loadCapability } from './capabilities.js';
import { safe, readJson, manifest, encode, digest, stat, block, mergeAgents, payload, validateAdapters, validateCapabilities, assertSeparate, HarnessError, LOCK, CONFIG, VERSION, SLUG, isObject } from './files.js';
export * from './files.js';

function projectConfig(root, adapters, capabilities, required = false) {
  const filename = safe(root, CONFIG);
  if (required && !stat(filename)) throw new HarnessError(`Missing ${CONFIG}; restore it from Git`);
  const config = stat(filename) ? readJson(filename) : { schema_version: 1, adapters: adapters ?? [], capabilities: capabilities ?? [] };
  const keys = isObject(config) ? Object.keys(config).sort().join(',') : '';
  if (!isObject(config) || !['adapters,schema_version', 'adapters,capabilities,schema_version'].includes(keys)
      || config.schema_version !== 1) throw new HarnessError('Invalid project.json schema');
  validateAdapters(config.adapters);
  validateCapabilities(config.capabilities ?? []);
  if (adapters !== undefined && stat(filename)
      && JSON.stringify([...adapters].sort()) !== JSON.stringify([...config.adapters].sort())) {
    throw new HarnessError('Edit .harness/project.json to select adapters, then run update');
  }
  if (capabilities !== undefined && stat(filename)
      && JSON.stringify([...capabilities].sort()) !== JSON.stringify([...(config.capabilities ?? [])].sort())) {
    throw new HarnessError('Edit .harness/project.json to select capabilities, then run update');
  }
  return config;
}

export function collect(source, folder) {
  const files = {};
  const visit = name => {
    const filename = path.join(source, name);
    const info = stat(filename);
    if (!info || info.isSymbolicLink()) throw new HarnessError(`Missing/unsafe source: ${name}`);
    if (info.isDirectory()) {
      for (const child of fs.readdirSync(filename).sort()) visit(`${name}/${child}`);
    } else if (info.isFile()) files[name] = fs.readFileSync(safe(source, name));
    else throw new HarnessError(`Unsupported source entry: ${name}`);
  };
  visit(folder);
  if (!Object.keys(files).length) throw new HarnessError(`Empty source directory: ${folder}`);
  return files;
}

export function bundle(source, config) {
  const m = manifest(source), adapters = [...config.adapters].sort(), capabilities = [...(config.capabilities ?? [])].sort();
  const unknown = adapters.filter(a => !m.adapters.includes(a));
  if (unknown.length) throw new HarnessError(`Unknown adapters: ${unknown.join(', ')}`);
  const unknownCapabilities = capabilities.filter(c => !(m.capabilities ?? []).includes(c));
  if (unknownCapabilities.length) throw new HarnessError(`Unknown capabilities: ${unknownCapabilities.join(', ')}`);
  const files = {};
  for (const folder of ['core', 'integrations', 'templates', ...adapters.map(a => `adapters/${a}`), ...capabilities.map(c => `capabilities/${c}`)]) {
    for (const [name, data] of Object.entries(collect(source, folder))) {
      files[`.harness/${name}`] = data;
      if (name.startsWith('core/skills/')) files[`.agents/skills/${name.slice('core/skills/'.length)}`] = data;
    }
  }
  for (const a of adapters) {
    const info = loadAdapter(source, a);
    for (const name of info.skills) {
      const dest = `.agents/skills/${name}/SKILL.md`;
      if (Object.hasOwn(files, dest)) throw new HarnessError(`Skill collision: ${name}`);
      files[dest] = fs.readFileSync(safe(source, `adapters/${a}/skills/${name}/SKILL.md`));
    }
  }
  for (const c of capabilities) {
    const info = loadCapability(source, c);
    for (const name of info.skills) {
      const dest = `.agents/skills/${name}/SKILL.md`;
      if (Object.hasOwn(files, dest)) throw new HarnessError(`Skill collision: ${name}`);
      files[dest] = fs.readFileSync(safe(source, `capabilities/${c}/skills/${name}/SKILL.md`));
    }
  }
  const capabilityLinks = capabilities.map(c => `- For ${c} tasks, read \`.harness/capabilities/${c}/workflows/\` and discover relevant \`.agents/skills/harness-${c}-*/SKILL.md\` by description.`).join('\n')
    || '- No optional capability selected.';
  const links = adapters.map(a => `- Read \`.harness/adapters/${a}/rules.md\` and \`.harness/adapters/${a}/adapter.yaml\`; load relevant skills from \`.agents/skills/harness-${a}-*\`.`).join('\n') || '- No technology adapter selected.';
  const template = fs.readFileSync(safe(source, 'templates/AGENTS.md'), 'utf8');
  const generated = Buffer.from(template.replaceAll('{{version}}', m.version).replaceAll('{{adapters}}', links).replaceAll('{{capabilities}}', capabilityLinks).trim());
  if (!block(generated)?.equals(generated)) throw new HarnessError('AGENTS template must be one managed block');
  files['AGENTS.md'] = generated;
  const hashes = Object.fromEntries(Object.keys(files).sort().map(k => [k, digest(files[k])]));
  return { files, lock: { schema_version: 1, version: m.version, adapters, capabilities, files: hashes, bundle_sha256: digest(encode(hashes)) } };
}

function managedName(name) {
  return name === 'AGENTS.md' || ['.harness/core/', '.harness/adapters/', '.harness/capabilities/', '.harness/integrations/', '.harness/templates/', '.agents/skills/harness-'].some(prefix => name.startsWith(prefix));
}

export function loadLock(root) {
  const lock = readJson(safe(root, LOCK));
  if (!isObject(lock) || !['adapters,bundle_sha256,files,schema_version,version',
      'adapters,bundle_sha256,capabilities,files,schema_version,version'].includes(Object.keys(lock).sort().join(','))
      || lock.schema_version !== 1 || !VERSION.test(lock.version) || !isObject(lock.files)
      || !Object.hasOwn(lock.files, 'AGENTS.md')) throw new HarnessError('Invalid lock schema/content');
  validateAdapters(lock.adapters);
  validateCapabilities(lock.capabilities ?? []);
  for (const [name, sha] of Object.entries(lock.files)) {
    if (!managedName(name) || typeof sha !== 'string' || !/^[0-9a-f]{64}$/.test(sha)) throw new HarnessError(`Invalid lock entry: ${name}`);
    safe(root, name);
  }
  if (lock.bundle_sha256 !== digest(encode(lock.files))) throw new HarnessError('Lock digest mismatch');
  return lock;
}

function drift(root, lock) {
  return Object.entries(lock.files).filter(([name, sha]) => {
    const data = payload(root, name);
    return data === null || digest(data) !== sha;
  }).map(([name]) => name);
}

function guard(root, operation) {
  const filename = safe(root, '.harness-install.lock');
  let fd;
  try { fd = fs.openSync(filename, 'wx', 0o600); }
  catch (error) {
    if (error.code === 'EEXIST') throw new HarnessError('Another installation is active; inspect .harness-install.lock before removing a stale lock');
    throw error;
  }
  try { fs.writeSync(fd, String(process.pid)); return operation(); }
  finally { fs.closeSync(fd); fs.unlinkSync(filename); }
}

export function atomicWrite(filename, data) {
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  const tmp = path.join(path.dirname(filename), `.harness-tmp-${randomUUID()}`);
  try {
    fs.writeFileSync(tmp, data, { flag: 'wx', mode: 0o600 });
    fs.chmodSync(tmp, stat(filename) ? fs.statSync(filename).mode & 0o777 : 0o644);
    fs.renameSync(tmp, filename);
  } finally { fs.rmSync(tmp, { force: true }); }
}

export function transaction(root, changes, writer = atomicWrite) {
  const originals = {}, applied = [];
  for (const name of Object.keys(changes)) {
    const filename = safe(root, name);
    originals[name] = stat(filename) ? fs.readFileSync(filename) : null;
  }
  try {
    for (const [name, data] of Object.entries(changes)) {
      const filename = safe(root, name);
      if (data === null) fs.rmSync(filename, { force: true });
      else writer(filename, data);
      applied.push(name);
    }
  } catch (error) {
    for (const name of applied.reverse()) {
      const filename = safe(root, name);
      if (originals[name] === null) fs.rmSync(filename, { force: true });
      else atomicWrite(filename, originals[name]);
    }
    throw error;
  }
}

export function install(root, source, { command = 'init', adapters, capabilities, dryRun = false, allowMajor = false, writer } = {}) {
  assertSeparate(root, source);
  return guard(root, () => {
    const hasLock = Boolean(stat(safe(root, LOCK)));
    if (command === 'update' && !hasLock) throw new HarnessError('Not installed; run init first');
    const old = hasLock ? loadLock(root) : null;
    const config = projectConfig(root, adapters, capabilities, hasLock);
    const { files, lock } = bundle(source, config);
    if (old) {
      const conflicts = drift(root, old);
      if (conflicts.length) throw new HarnessError(`Managed files changed; reconcile in Git before updating: ${conflicts.join(', ')}`);
      const before = old.version.split('.').map(BigInt), after = lock.version.split('.').map(BigInt);
      const diff = after.findIndex((v, i) => v !== before[i]);
      if (diff !== -1 && after[diff] < before[diff]) throw new HarnessError('Downgrades are refused; revert the installation commit in Git');
      if (after[0] !== before[0] && !allowMajor) throw new HarnessError('Major upgrade requires --allow-major and migration review');
      if (command === 'init' && !encode(old).equals(encode(lock))) throw new HarnessError('Already installed; use update');
    }
    const changes = {};
    for (const [name, data] of Object.entries(files)) {
      const present = payload(root, name), owned = old && Object.hasOwn(old.files, name);
      if (present !== null && !owned && !present.equals(data)) throw new HarnessError(`Unmanaged file collision: ${name}`);
      if (present === null || !present.equals(data)) {
        const filename = safe(root, name);
        const existing = stat(filename) ? fs.readFileSync(filename) : Buffer.alloc(0);
        changes[name] = name === 'AGENTS.md' ? mergeAgents(existing, data) : data;
      }
    }
    if (old) for (const name of Object.keys(old.files)) if (!Object.hasOwn(files, name)) changes[name] = null;
    const seeds = {
      [CONFIG]: encode(config),
      'openspec/config.yaml': fs.readFileSync(safe(source, 'templates/openspec/config.yaml')),
      '.harness/local.md': Buffer.from('# Project overrides\n\nRecord project facts and reviewed exceptions here. Never weaken security boundaries.\n'),
    };
    for (const [name, data] of Object.entries(seeds)) if (!stat(safe(root, name))) changes[name] = data;
    const newLock = encode(lock);
    if (!hasLock || !fs.readFileSync(safe(root, LOCK)).equals(newLock)) changes[LOCK] = newLock;
    const plan = Object.entries(changes).map(([name, data]) => ({ path: name, action: data === null ? 'delete' : 'write' }));
    if (!dryRun) transaction(root, changes, writer);
    return { status: dryRun ? 'planned' : 'ok', version: lock.version, changes: plan };
  });
}

export function check(root) {
  const lock = loadLock(root), config = projectConfig(root, undefined, undefined, true);
  const problems = drift(root, lock);
  if (JSON.stringify([...config.adapters].sort()) !== JSON.stringify([...lock.adapters].sort())) problems.push(`${CONFIG}: adapter selection changed; run update`);
  if (JSON.stringify([...(config.capabilities ?? [])].sort()) !== JSON.stringify([...(lock.capabilities ?? [])].sort())) problems.push(`${CONFIG}: capability selection changed; run update`);
  return { status: problems.length ? 'error' : 'ok', version: lock.version, problems };
}

export function newChange(root, name) {
  if (!SLUG.test(name) || name === 'archive') throw new HarnessError('Change ID must be a lowercase hyphenated slug, excluding archive');
  return guard(root, () => {
    if (check(root).status !== 'ok') throw new HarnessError('Fix installation drift before creating a change');
    const folder = path.join(root, 'openspec', 'changes', name);
    safe(root, `openspec/changes/${name}/proposal.md`);
    if (stat(folder)) throw new HarnessError(`Change already exists: ${name}`);
    const mapping = { 'proposal.md': 'proposal.md', 'design.md': 'design.md', 'tasks.md': 'tasks.md', 'spec.md': `specs/${name}/spec.md`, '.openspec.yaml': '.openspec.yaml' };
    const changes = {};
    for (const [src, dest] of Object.entries(mapping)) {
      const text = fs.readFileSync(safe(root, `.harness/templates/openspec/${src}`), 'utf8');
      changes[`openspec/changes/${name}/${dest}`] = Buffer.from(text.replaceAll('{{change_id}}', name));
    }
    transaction(root, changes);
    return { status: 'ok', change: name, path: folder, note: 'Draft only; replace TODOs and validate with OpenSpec' };
  });
}

// Product drafts are project-owned and never added to the managed bundle.
export function newDoc(root, name) {
  if (!SLUG.test(name)) throw new HarnessError('Document type must be a lowercase hyphenated slug');
  return guard(root, () => {
    if (check(root).status !== 'ok') throw new HarnessError('Fix installation drift before creating a document');
    const lock = loadLock(root);
    if (!(lock.capabilities ?? []).includes('product')) throw new HarnessError('Product capability is not installed');
    const sourceName = `.harness/capabilities/product/templates/${name}.md`;
    if (!Object.hasOwn(lock.files, sourceName)) throw new HarnessError(`Unknown product document type: ${name}`);
    const outputName = `docs/product/${name}.md`;
    if (stat(safe(root, outputName))) throw new HarnessError(`Document already exists: ${outputName}`);
    transaction(root, { [outputName]: fs.readFileSync(safe(root, sourceName)) });
    return { status: 'ok', type: name, path: outputName,
      note: 'Template only; populate from authorized evidence and obtain human approval.' };
  });
}

export function doctor(root) {
  const extensions = process.platform === 'win32' ? (process.env.PATHEXT || '.EXE;.CMD;.BAT').split(';') : [''];
  const tools = {};
  for (const name of ['git', 'node', 'npm', 'java', 'mvn', 'openspec']) {
    tools[name] = (process.env.PATH || '').split(path.delimiter).filter(Boolean).some(dir => extensions.some(ext => {
      try { const p = path.join(dir, name + ext); fs.accessSync(p, fs.constants.X_OK); return fs.statSync(p).isFile(); }
      catch { return false; }
    }));
  }
  return { ...check(root), tools, note: 'Tool presence only; no commands executed or compatibility claim made' };
}
