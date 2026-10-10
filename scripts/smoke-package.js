#!/usr/bin/env node
// Exercises an actual npm tarball, global bin shim and local npx without registry access.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { SOURCE, manifest, readJson } from '../cli/harness.js';

const npmCli = process.env.npm_execpath;
if (!npmCli || !fs.existsSync(npmCli)) throw new Error('Run this check through: npm run test:package');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'aih-npm-'));
const env = { ...process.env, npm_config_offline: 'true', npm_config_audit: 'false', npm_config_fund: 'false',
  npm_config_cache: path.join(temp, 'cache'), npm_config_update_notifier: 'false' };
function command(exe, args, cwd, options = {}) {
  const result = spawnSync(exe, args, { cwd, env, encoding: 'utf8', timeout: 120000, ...options });
  assert.equal(result.status, 0, `${exe} ${args.join(' ')}\n${result.stdout}\n${result.stderr}\n${result.error ?? ''}`);
  return result.stdout;
}
const npm = (args, cwd = SOURCE) => command(process.execPath, [npmCli, ...args], cwd);
try {
  const packed = JSON.parse(npm(['pack', '--ignore-scripts', '--json', '--pack-destination', temp]))[0];
  const names = packed.files.map(f => f.path);
  for (const required of ['bin/aih.js', 'cli/harness.js', 'harness.yaml', 'core/skills/harness-tdd/SKILL.md',
    'templates/openspec/.openspec.yaml', 'templates/AGENTS.md', ...manifest(SOURCE).adapters.map(a => `adapters/${a}/rules.md`)]) assert.ok(names.includes(required), `Missing packaged asset: ${required}`);
  assert.ok(!names.some(n => n.endsWith('.py') || n.startsWith('tests/') || n.startsWith('.git/') || n.endsWith('.tgz')));
  assert.ok(!names.some(n => /(^|\/)\.env(?:\.|$)/.test(n)));
  const archive = path.join(temp, packed.filename), prefix = path.join(temp, 'global');
  npm(['install', '--global', '--prefix', prefix, '--ignore-scripts', '--no-audit', '--no-fund', archive]);
  const target = path.join(temp, 'consumer project'); fs.mkdirSync(target);
  const bin = process.platform === 'win32' ? path.join(prefix, 'aih.cmd') : path.join(prefix, 'bin/aih');
  const run = args => process.platform === 'win32'
    ? command(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `""${bin}" ${args.join(' ')}"`], target, { windowsVerbatimArguments: true })
    : command(bin, args, target);
  assert.equal(run(['--version']).trim(), readJson(path.join(SOURCE, 'package.json')).version);
  JSON.parse(run(['init', '--adapters', 'java-spring,react-nextjs,react-native,ai-python']));
  assert.equal(JSON.parse(run(['check'])).status, 'ok');
  JSON.parse(run(['new-change', 'package-smoke']));
  assert.ok(fs.existsSync(path.join(target, 'openspec/changes/package-smoke/.openspec.yaml')));
  assert.deepEqual(JSON.parse(run(['update'])).changes, []);
  // Local installation lives inside the target: this must not trigger overlap protection.
  const local = path.join(temp, 'local-consumer'); fs.mkdirSync(local); fs.writeFileSync(path.join(local, 'package.json'), '{"private":true}');
  npm(['install', '--ignore-scripts', '--no-audit', '--no-fund', archive], local);
  const localResult = JSON.parse(npm(['exec', '--offline', '--', 'aih', 'init', '--adapters', 'java-spring'], local));
  assert.equal(localResult.status, 'ok');
  assert.equal(JSON.parse(npm(['exec', '--offline', '--', 'aih', 'check'], local)).status, 'ok');
  console.log(JSON.stringify({ status: 'ok', version: packed.version, package_files: names.length,
    checks: ['npm pack assets', 'global aih shim', 'cwd default', 'all adapters', 'new-change dotfile', 'idempotent update', 'local npm exec without network'] }, null, 2));
} finally { fs.rmSync(temp, { recursive: true, force: true }); }
