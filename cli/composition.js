import { manifest, validateAdapters, validateCapabilities, HarnessError } from './files.js';
import { loadAdapter } from './adapter-schema.js';
import { loadCapability } from './capabilities.js';
import { moduleRef } from './module-contract.js';

export function resolveModules(source, { adapters = [], capabilities = [] } = {}) {
  validateAdapters(adapters); validateCapabilities(capabilities);
  const registry = manifest(source);
  const unknownA = adapters.filter(id => !registry.adapters.includes(id));
  const unknownC = capabilities.filter(id => !(registry.capabilities ?? []).includes(id));
  if (unknownA.length || unknownC.length) {
    throw new HarnessError(`Unknown modules: ${[
      ...unknownA.map(id => moduleRef('adapter', id)),
      ...unknownC.map(id => moduleRef('capability', id)),
    ].join(', ')}`);
  }
  const sortedA = [...adapters].sort(), sortedC = [...capabilities].sort();
  const modules = [
    ...sortedA.map(id => ({ kind: 'adapter', id, data: loadAdapter(source, id) })),
    ...sortedC.map(id => ({ kind: 'capability', id, data: loadCapability(source, id) })),
  ];
  const selected = new Map(modules.map(m => [moduleRef(m.kind, m.id), m]));
  const declared = new Set([...registry.adapters.map(x => moduleRef('adapter', x)),
    ...(registry.capabilities ?? []).map(x => moduleRef('capability', x))]);
  const warnings = [], graph = new Map();
  for (const { kind, id, data } of modules) {
    const owner = moduleRef(kind, id);
    for (const field of ['requires', 'recommends', 'conflicts']) {
      for (const ref of data[field] ?? []) {
        if (!declared.has(ref)) throw new HarnessError(`Unknown ${field} reference ${ref} in ${owner}`);
      }
    }
    for (const dep of data.requires ?? []) {
      if (!selected.has(dep)) throw new HarnessError(`Missing required module ${dep} for ${owner}`);
    }
    for (const denied of data.conflicts ?? []) {
      if (selected.has(denied)) throw new HarnessError(`Incompatible modules: ${owner} conflicts with ${denied}`);
    }
    if (data.compatible_adapters?.length) {
      for (const adapter of sortedA) {
        if (!data.compatible_adapters.includes(adapter)) {
          throw new HarnessError(`Incompatible adapter ${adapter} for ${owner}`);
        }
      }
    }
    for (const hint of data.recommends ?? []) {
      if (!selected.has(hint)) warnings.push(`${owner} recommends ${hint} (optional)`);
    }
    graph.set(owner, data.requires ?? []);
  }
  const states = new Map();
  function visit(ref) {
    if (states.get(ref) === 'visiting') throw new HarnessError(`Module dependency cycle at ${ref}`);
    if (states.get(ref) === 'done') return;
    states.set(ref, 'visiting');
    for (const dep of graph.get(ref) ?? []) visit(dep);
    states.set(ref, 'done');
  }
  for (const ref of graph.keys()) visit(ref);
  return { status: 'ok', adapters: sortedA, capabilities: sortedC,
    modules: modules.map(m => ({ id: m.id, kind: m.kind, module_version: m.data.module_version ?? null })),
    warnings };
}

/** Validate the complete catalog without pretending every registered module is selected. */
export function validateRegistry(source) {
  const registry = manifest(source);
  const entries = [
    ...registry.adapters.map(id => ({kind:'adapter',id,data:loadAdapter(source,id)})),
    ...(registry.capabilities ?? []).map(id => ({kind:'capability',id,data:loadCapability(source,id)})),
  ];
  const declared = new Set(entries.map(m=>moduleRef(m.kind,m.id)));
  const graph = new Map();
  for (const {kind,id,data} of entries) {
    const owner=moduleRef(kind,id);
    if (data.asset_owner && !declared.has(moduleRef('capability',data.asset_owner))) throw new HarnessError('Unknown capability asset owner');
    for (const field of ['requires','recommends','conflicts']) {
      for (const ref of data[field] ?? []) {
        if (!declared.has(ref)) throw new HarnessError(`Unknown ${field} reference ${ref} in ${owner}`);
      }
    }
    for (const id of data.compatible_adapters ?? []) {
      if (!registry.adapters.includes(id)) throw new HarnessError(`Unknown compatible adapter ${id} in ${owner}`);
    }
    graph.set(owner,data.requires ?? []);
  }
  const states=new Map();
  function visit(ref) {
    if (states.get(ref)==='visiting') throw new HarnessError(`Module dependency cycle at ${ref}`);
    if (states.get(ref)==='done') return;
    states.set(ref,'visiting');
    for (const dep of graph.get(ref) ?? []) visit(dep);
    states.set(ref,'done');
  }
  for (const ref of graph.keys()) visit(ref);
  return {status:'ok',modules:entries.length};
}
