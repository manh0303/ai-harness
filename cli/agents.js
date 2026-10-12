import fs from 'node:fs';
import path from 'node:path';
import { safe, stat, readJson, isObject, SLUG, SOURCE, HarnessError } from './files.js';

export const AGENT_CONFIG = '.harness/agents.json';
export const DEFAULT_AGENTS = 'config/agents.default.json';
export const PRESETS = ['recommended', 'economy', 'custom'];
export const REASONING = ['none', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max', 'ultra'];
const ROLE = /^[a-z][a-z0-9-]*:[a-z][a-z0-9-]*$/;
const text = value => typeof value === 'string' && value.trim() === value && value.length > 0
  && value.length <= 256 && !/[\x00-\x1f\x7f]/.test(value);
const requireThat = (condition, label) => { if (!condition) throw new HarnessError('Invalid agent configuration: ' + label); };
function fields(value, allowed, required, label) {
  requireThat(isObject(value) && Object.keys(value).every(key => allowed.includes(key))
    && required.every(key => Object.hasOwn(value, key)), label + ' fields');
}
function reference(value, label) {
  requireThat(text(value), label + ' must be nonempty single-line text (max 256 characters)');
  if (value.startsWith('@')) requireThat(SLUG.test(value.slice(1)), label + ' alias syntax');
  else requireThat(!/\s/.test(value), label + ' model ID must not contain whitespace');
}
function provider(value, label) { requireThat(typeof value === 'string' && SLUG.test(value), label + ' provider ID'); }
function reasoning(value, label) { requireThat(REASONING.includes(value), label + ' reasoning level'); }

export function resolveModel(config, referenceValue, visited = []) {
  if (!referenceValue.startsWith('@')) return { model: referenceValue, provider: config.provider };
  const alias = referenceValue.slice(1);
  requireThat(Object.hasOwn(config.models, alias), 'unknown alias @' + alias);
  requireThat(!visited.includes(alias), 'cyclic alias @' + alias);
  const descriptor = config.models[alias];
  const next = typeof descriptor === 'string' ? descriptor : descriptor.model;
  const resolved = resolveModel(config, next, [...visited, alias]);
  return { ...resolved, provider: typeof descriptor === 'object' ? descriptor.provider ?? resolved.provider : resolved.provider };
}

export function validateAgentConfig(config) {
  fields(config, ['schema_version', 'provider', 'defaultModel', 'defaultReasoning', 'models', 'agents', 'execution', 'hosts'],
    ['schema_version', 'provider', 'defaultModel', 'defaultReasoning', 'models', 'agents', 'execution'], 'root');
  requireThat(config.schema_version === 1, 'unsupported schema_version');
  provider(config.provider, 'default'); reference(config.defaultModel, 'defaultModel');
  reasoning(config.defaultReasoning, 'default');
  requireThat(isObject(config.models) && Object.keys(config.models).length <= 64, 'models map (max 64 aliases)');
  for (const [alias, descriptor] of Object.entries(config.models)) {
    requireThat(SLUG.test(alias), 'alias ID');
    if (typeof descriptor === 'string') reference(descriptor, 'models.' + alias);
    else {
      fields(descriptor, ['model', 'provider'], ['model'], 'models.' + alias);
      reference(descriptor.model, 'models.' + alias);
      if (descriptor.provider !== undefined) provider(descriptor.provider, 'models.' + alias);
    }
  }
  resolveModel(config, config.defaultModel);
  for (const alias of Object.keys(config.models)) resolveModel(config, '@' + alias);
  requireThat(isObject(config.agents) && Object.keys(config.agents).length <= 128, 'agents map (max 128 roles)');
  for (const [id, agent] of Object.entries(config.agents)) {
    requireThat(ROLE.test(id), 'role ID must use namespace:role');
    fields(agent, ['model', 'provider', 'reasoning', 'enabled'], [], id);
    if (agent.model !== undefined) { reference(agent.model, id); resolveModel(config, agent.model); }
    if (agent.provider !== undefined) provider(agent.provider, id);
    if (agent.reasoning !== undefined) reasoning(agent.reasoning, id);
    requireThat(agent.enabled === undefined || typeof agent.enabled === 'boolean', id + ' enabled');
  }
  const execution = config.execution;
  fields(execution, ['mode', 'maxConcurrentAgents', 'maxRounds', 'autoEscalateToPremium'],
    ['mode', 'maxConcurrentAgents', 'maxRounds', 'autoEscalateToPremium'], 'execution');
  requireThat(['single-agent', 'hybrid', 'multi-agent'].includes(execution.mode), 'execution mode');
  requireThat(Number.isSafeInteger(execution.maxConcurrentAgents) && execution.maxConcurrentAgents >= 1
    && execution.maxConcurrentAgents <= 32, 'maxConcurrentAgents must be an integer from 1 to 32');
  requireThat(execution.mode !== 'single-agent' || execution.maxConcurrentAgents === 1, 'single-agent requires maxConcurrentAgents=1');
  requireThat(Number.isSafeInteger(execution.maxRounds) && execution.maxRounds >= 1 && execution.maxRounds <= 20,
    'maxRounds must be an integer from 1 to 20');
  requireThat(execution.autoEscalateToPremium === false, 'autoEscalateToPremium must be false; select premium explicitly');
  const hosts = config.hosts ?? {};
  requireThat(isObject(hosts) && Object.keys(hosts).length <= 16, 'hosts map (max 16 profiles)');
  for (const [id, profile] of Object.entries(hosts)) {
    requireThat(SLUG.test(id), 'host ID'); fields(profile, ['models', 'reasoning'], [], 'host ' + id);
    for (const key of ['models', 'reasoning']) {
      const map = profile[key] ?? {};
      requireThat(isObject(map) && Object.keys(map).length <= 128, 'host ' + id + ' ' + key + ' map');
      for (const [from, to] of Object.entries(map)) {
        requireThat(key === 'models' ? text(from) && from.includes('/') : REASONING.includes(from), 'host mapping key');
        requireThat(text(to) && !to.startsWith('@'), 'host mapping target must be explicit native text');
      }
    }
  }
  return config;
}

function readConfiguration(root, relative) {
  const filename = safe(root, relative), info = stat(filename);
  if (!info) return null;
  requireThat(info.isFile() && info.size <= 1024 * 1024, relative + ' must be a file up to 1 MiB');
  let config;
  try { config = JSON.parse(fs.readFileSync(filename, 'utf8')); }
  catch { throw new HarnessError('Invalid JSON in ' + relative); }
  return validateAgentConfig(config);
}
export function loadAgentConfig(root) { return readConfiguration(root, AGENT_CONFIG); }

export function agentDefaults(source = SOURCE, preset = 'recommended') {
  requireThat(PRESETS.includes(preset), 'unknown preset; use recommended, economy or custom');
  // Older alternate bundles remain usable; the packaged CLI supplies the new canonical seed.
  const config = structuredClone(readConfiguration(source, DEFAULT_AGENTS) ?? readConfiguration(SOURCE, DEFAULT_AGENTS));
  requireThat(config !== null, 'missing canonical default');
  if (preset === 'economy') {
    config.defaultModel = '@economy'; config.defaultReasoning = 'low';
    config.execution.mode = 'single-agent'; config.execution.maxConcurrentAgents = 1;
    for (const agent of Object.values(config.agents)) { agent.model = '@economy'; agent.reasoning = 'low'; }
  }
  return validateAgentConfig(config);
}

export function registeredRoles(source, capabilities = []) {
  const roles = {};
  const folder = path.dirname(safe(source, 'core/agents/.role-index'));
  for (const name of fs.readdirSync(folder).filter(name => name.endsWith('.md')).sort()) {
    roles['core:' + name.slice(0, -3)] = 'core/agents/' + name;
  }
  for (const id of capabilities) {
    const metadata = readJson(safe(source, `capabilities/${id}/capability.json`));
    for (const file of metadata.agents ?? []) {
      const role = id + ':' + path.basename(file, '.md');
      roles[role] = `capabilities/${id}/${file}`;
    }
  }
  return roles;
}

export function resolveAgent(config, id) {
  const agent = Object.hasOwn(config.agents, id) ? config.agents[id] : {};
  const resolved = resolveModel(config, agent.model ?? config.defaultModel);
  return { id, ...resolved, provider: agent.provider ?? resolved.provider,
    reasoning: agent.reasoning ?? config.defaultReasoning, enabled: agent.enabled !== false,
    source: Object.hasOwn(config.agents, id) ? 'role' : 'project-default' };
}

export function agentPlan(root, host) {
  if (host !== undefined) requireThat(typeof host === 'string' && SLUG.test(host), 'host ID');
  const config = loadAgentConfig(root);
  const presets = [{ label: 'A', value: 'recommended', description: 'Sol, hybrid, at most two concurrent agents when supported.' },
    { label: 'B', value: 'economy', description: 'Economy model, single-agent roles.' },
    { label: 'C', value: 'custom', description: 'Edit provider/model/reasoning and role/host mappings explicitly.' }];
  const note = 'Read-only declaration. No provider/model probing, native config writes, agent spawning, concurrency/token enforcement or usage tracking. Verify model access, effort and delegation in the actual host before execution.';
  if (!config) return { status: 'not-configured', configured: false, presets, roles: [], note };
  const lock = readJson(safe(root, '.harness/lock.json'));
  const registry = registeredRoles(path.join(root, '.harness'), lock.capabilities ?? []);
  const ids = [...new Set([...Object.keys(registry), ...Object.keys(config.agents)])].sort();
  const profile = config.hosts?.[host] ?? {};
  const roles = ids.map(id => {
    const requested = resolveAgent(config, id);
    const active = requested.enabled && Object.hasOwn(registry, id);
    const mapping = profile.models?.[requested.provider + '/' + requested.model];
    const incompatible = !mapping && ((host === 'claude-code' &&
      (!['anthropic', 'bedrock', 'vertex'].includes(requested.provider) || requested.model.startsWith('gpt-'))) ||
      (host === 'gemini-cli' && (!['google', 'vertex'].includes(requested.provider) || requested.model.startsWith('gpt-'))));
    return { ...requested, active, contract: registry[id] ? '.harness/' + registry[id] : null,
      host_model: mapping ?? requested.model, host_reasoning: profile.reasoning?.[requested.reasoning] ?? requested.reasoning,
      mapping: mapping ? 'explicit-user-host-mapping' : 'requested',
      availability: active && incompatible ? 'incompatible-provider' : 'unverified',
      runtime_verified: false };
  });
  return { status: roles.some(role => role.active && role.availability === 'incompatible-provider') ? 'host-incompatible' : 'requires-host-verification',
    configured: true, host: host ?? null, presets, execution: config.execution, roles,
    missing_mappings: Object.keys(registry).filter(id => !Object.hasOwn(config.agents, id)), note };
}
