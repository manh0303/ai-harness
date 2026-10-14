import fs from 'node:fs';
import { safe, stat, digest, isObject, HarnessError } from './files.js';
const text = value => typeof value === 'string' && value.trim().length > 0 && !/[\0\r\n]/.test(value);
const assert = (ok, message) => { if (!ok) throw new HarnessError('Invalid user journey: ' + message); };
const interactions = { web: 'browser', mobile: 'device', cli: 'terminal', api: 'http' };
export function reviewJourney(root, row) {
  if (row.journey === undefined) return { acceptance_scope: 'not-declared' };
  const journey = row.journey;
  assert(isObject(journey) && Object.keys(journey).every(k => ['surface', 'actor', 'entrypoint', 'interaction', 'dependencies', 'attachments'].includes(k)), 'fields');
  assert(Object.hasOwn(interactions, journey.surface) && text(journey.actor) && text(journey.entrypoint), 'surface/actor/entrypoint');
  assert(journey.interaction === interactions[journey.surface], 'surface must be exercised by its actual interface');
  assert(['real', 'mocked', 'not-applicable', 'unknown'].includes(journey.dependencies), 'dependency classification');
  if (/^https?:\/\//.test(journey.entrypoint)) {
    let url; try { url = new URL(journey.entrypoint); } catch { throw new HarnessError('Invalid user journey: entrypoint URL'); }
    assert(!url.username && !url.password && ![...url.searchParams.keys()].some(k => /^(?:token|access_token|api[_-]?key|password|secret|authorization|sig|signature)$/i.test(k)), 'entrypoint must not contain credentials');
  }
  const method = { 'browser-e2e': 'web', 'mobile-e2e': 'mobile', 'cli-e2e': 'cli', api: 'api', 'backend-e2e': 'api', authorization: 'api', security: 'api' }[row.method];
  assert(method ? method === journey.surface : ['end-user', 'business-workflow'].includes(row.method), 'scenario method/surface mismatch');
  assert(Array.isArray(journey.attachments) && journey.attachments.length <= 20, 'attachment list (max 20)');
  const kinds = { screenshot: /\.(?:png|jpe?g|webp)$/i, trace: /\.zip$/i, video: /\.(?:webm|mp4)$/i, report: /\.(?:html|json)$/i };
  const paths = new Set(); let totalSize = 0;
  for (const ref of journey.attachments) {
    assert(isObject(ref) && Object.keys(ref).sort().join(',') === 'kind,path,sha256' && Object.hasOwn(kinds, ref.kind)
      && text(ref.path) && kinds[ref.kind].test(ref.path) && /^[a-f0-9]{64}$/.test(ref.sha256), 'attachment type/path/digest');
    assert(!paths.has(ref.path), 'duplicate attachment'); paths.add(ref.path);
    const filename = safe(root, ref.path), info = stat(filename);
    assert(info?.isFile() && info.size > 0 && info.size <= 50 * 1024 * 1024, 'attachment missing/empty/over 50 MiB');
    totalSize += info.size; assert(totalSize <= 100 * 1024 * 1024, 'attachments exceed 100 MiB total');
    assert(digest(fs.readFileSync(filename)) === ref.sha256, 'attachment digest mismatch');
  }
  const scope = !row.executed ? 'not-executed' : journey.dependencies === 'mocked' ? 'interface-only'
    : journey.dependencies === 'unknown' ? 'unverified-dependencies' : 'end-user';
  return { journey, acceptance_scope: scope };
}
