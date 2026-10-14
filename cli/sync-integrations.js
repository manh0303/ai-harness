import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { stat, isObject, SLUG, encode, safe, HarnessError } from './files.js';
import { loadArtifactContract, INTEGRATIONS } from './artifacts.js';
import { check, guard, transaction } from './harness.js';

export function syncIntegrations(root, { host = 'kiro', from, dryRun = false } = {}) {
  if (host !== 'kiro') throw new HarnessError('MCP config discovery currently supports --host kiro');
  if (check(root).status !== 'ok') throw new HarnessError('Fix installation drift before syncing integrations');
  // Explicit input overrides the standard project/user Kiro settings. Never copy values.
  const names = from ? [path.resolve(from)] : [path.join(os.homedir(), '.kiro/settings/mcp.json'), path.join(root,'.kiro/settings/mcp.json')];
  const servers = new Set(); let found = false;
  for (const filename of names) {
    for (let p = filename; ; p = path.dirname(p)) {
      if (stat(p)?.isSymbolicLink()) throw new HarnessError('Symlinked MCP config is unsupported');
      if (path.dirname(p) === p) break;
    }
    const info = stat(filename);
    if (!info) { if (from) throw new HarnessError('MCP config not found'); continue; }
    if (!info.isFile() || info.size > 1024 * 1024) throw new HarnessError('MCP config must be a file up to 1 MiB');
    let config;
    try { config = JSON.parse(fs.readFileSync(filename,'utf8')); } catch { throw new HarnessError('Invalid MCP config JSON (values omitted)'); }
    if (!isObject(config) || !isObject(config.mcpServers)) throw new HarnessError('MCP config requires mcpServers');
    found = true;
    for (const [binding, server] of Object.entries(config.mcpServers)) {
      if (!/^[A-Za-z0-9_.-]{1,128}$/.test(binding) || !isObject(server)) throw new HarnessError('Invalid MCP server declaration');
      if (server.disabled === true) servers.delete(binding); else servers.add(binding);
    }
  }
  if (!found) return { status: 'planned', discovered: [], added: [], note: 'No Kiro MCP config found. Verify active host connections directly.' };
  if (servers.size > 128) throw new HarnessError('MCP inventory exceeds 128 servers');
  return guard(root, () => {
    const integrations = structuredClone(loadArtifactContract(root).integrations), added = [];
    for (const binding of [...servers].sort()) {
      if (Object.values(integrations.connections).some(c => c.via === 'mcp' && c.binding === binding)) continue;
      const base = binding.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
      let id = /^[a-z]/.test(base) ? base : 'mcp-' + base;
      if (!SLUG.test(id)) throw new HarnessError('Cannot create a safe MCP alias');
      let suffix = 2; const initial = id;
      while (Object.hasOwn(integrations.connections,id)) id = initial + '-' + suffix++;
      integrations.connections[id] = { via: 'mcp', binding, purpose: 'Discovered Kiro server; verify purpose, scope and actual tools in the host.', access: 'read-only' };
      added.push(id);
    }
    if (!dryRun && added.length) transaction(root, { [INTEGRATIONS]: encode(integrations) });
    return { status: dryRun ? 'planned' : 'ok', discovered: [...servers].sort(), added, availability: 'unverified', tools: 'host-discovery-required',
      note: 'Aliases only; no credentials, endpoints, commands, env or autoApprove lists copied. Existing declarations preserved; absent servers are not deleted. Declared read-only access does not constrain the server.' };
  });
}
