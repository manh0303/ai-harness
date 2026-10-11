import { HarnessError, VERSION, SLUG } from './files.js';

// Optional schema-1/2 extensions: old manifests remain readable.
const REF = /^(adapter|capability):([a-z][a-z0-9]*(?:-[a-z0-9]+)*)$/;
const fail = message => { throw new HarnessError(message); };
const unique = xs => new Set(xs).size === xs.length;

export function validateContract(meta, kind, id) {
  if (meta.module_version !== undefined && (typeof meta.module_version !== 'string' || !VERSION.test(meta.module_version))) {
    fail(`Invalid module_version: ${kind}:${id}`);
  }
  const self = `${kind}:${id}`;
  for (const field of ['requires', 'recommends', 'conflicts']) {
    const refs = meta[field] ?? [];
    if (!Array.isArray(refs) || !unique(refs) || refs.some(ref => typeof ref !== 'string' || !REF.test(ref) || ref === self)) {
      fail(`Invalid ${field}: ${self}`);
    }
  }
  if ((meta.requires ?? []).some(ref => (meta.conflicts ?? []).includes(ref))) {
    fail(`Contradictory requires/conflicts: ${self}`);
  }
  if (meta.compatible_adapters !== undefined && (!Array.isArray(meta.compatible_adapters)
    || !unique(meta.compatible_adapters)
    || meta.compatible_adapters.some(id => typeof id !== 'string' || !SLUG.test(id)))) {
    fail(`Invalid compatible_adapters: ${self}`);
  }
}

export function moduleRef(kind, id) { return `${kind}:${id}`; }
