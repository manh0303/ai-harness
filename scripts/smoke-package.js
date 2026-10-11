#!/usr/bin/env node
// Exercises an actual npm tarball, global bin shim and local npx without registry access.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { SOURCE, manifest, readJson } from '../cli/harness.js';
import { parsePackMetadata } from './pack-metadata.js';

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
  const packageName = readJson(path.join(SOURCE, 'package.json')).name;
  const packed = parsePackMetadata(npm(['pack', '--ignore-scripts', '--json', '--pack-destination', temp]), packageName);
  const names = packed.files.map(f => f.path);
  for (const required of ['LICENSE', 'bin/aih.js', 'cli/harness.js', 'cli/adapters.js', 'cli/composition.js', 'cli/module-contract.js', 'cli/evaluation-contract.js', 'cli/adapter-schema.js', 'cli/capabilities.js', 'cli/files.js', 'capabilities/uiux/capability.json', 'capabilities/product/capability.json', 'capabilities/devops/capability.json', 'capabilities/devops/evals/cases.json', 'capabilities/monetization/capability.json', 'capabilities/monetization/skills/harness-monetization-adsense-integration/SKILL.md', 'capabilities/monetization/templates/analytics-report.md', 'core/evals/composition.json', 'adapters/kubernetes/adapter.yaml', 'adapters/astro/adapter.yaml', 'adapters/astro/skills/harness-astro-islands/SKILL.md', 'capabilities/product/templates/brd.md', 'scripts/score-eval.js', 'harness.yaml', 'core/skills/harness-tdd/SKILL.md',
    'templates/openspec/.openspec.yaml', 'templates/AGENTS.md', ...manifest(SOURCE).adapters.map(a => `adapters/${a}/rules.md`)]) assert.ok(names.includes(required), `Missing packaged asset: ${required}`);
  assert.ok(!names.some(n => n.endsWith('.py') || n.startsWith('tests/') || n.startsWith('.git/') || n.endsWith('.tgz')));
  assert.ok(!names.some(n => /(^|\/)\.env(?:\.|$)/.test(n)));
  assert.equal(path.basename(packed.filename), packed.filename, 'npm pack returned an unsafe archive filename');
  const archive = path.join(temp, packed.filename), prefix = path.join(temp, 'global');
  assert.ok(fs.existsSync(archive) && fs.statSync(archive).isFile(), `npm pack did not write ${archive}`);
  npm(['install', '--global', '--prefix', prefix, '--ignore-scripts', '--no-audit', '--no-fund', archive]);
  const target = path.join(temp, 'consumer project'); fs.mkdirSync(target);
  const bin = process.platform === 'win32' ? path.join(prefix, 'aih.cmd') : path.join(prefix, 'bin/aih');
  const run = args => process.platform === 'win32'
    ? command(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `""${bin}" ${args.join(' ')}"`], target, { windowsVerbatimArguments: true })
    : command(bin, args, target);
  assert.equal(run(['--version']).trim(), readJson(path.join(SOURCE, 'package.json')).version);
  JSON.parse(run(['init', '--adapters', 'java-spring,react-nextjs,react-native,ai-python']));
  assert.equal(JSON.parse(run(['check'])).status, 'ok');
  assert.equal(JSON.parse(run(['list'])).adapters.length, manifest(SOURCE).adapters.length);
  assert.equal(JSON.parse(run(['list'])).capabilities.length, manifest(SOURCE).capabilities.length);
  const uiuxTarget = path.join(temp, 'uiux project'); fs.mkdirSync(uiuxTarget);
  const uiuxOut = process.platform === 'win32'
    ? command(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `""${bin}" init --capabilities uiux"`], uiuxTarget, { windowsVerbatimArguments: true })
    : command(bin, ['init', '--capabilities', 'uiux'], uiuxTarget);
  assert.equal(JSON.parse(uiuxOut).status, 'ok');
  assert.ok(fs.existsSync(path.join(uiuxTarget, '.agents/skills/harness-uiux-figma-design/SKILL.md')));
  const astroTarget = path.join(temp, 'astro project'); fs.mkdirSync(astroTarget);
  fs.writeFileSync(path.join(astroTarget, 'package.json'), JSON.stringify({ private:true,
    dependencies: { astro: '^5', '@astrojs/react': '^4', 'react-dom': '^19' } }));
  const inAstro = args => process.platform === 'win32'
    ? command(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `""${bin}" ${args.join(' ')}"`], astroTarget, { windowsVerbatimArguments: true })
    : command(bin, args, astroTarget);
  assert.deepEqual(JSON.parse(inAstro(['detect'])).adapters, ['astro']);
  assert.equal(JSON.parse(inAstro(['init', '--detect'])).status, 'ok');
  assert.ok(fs.existsSync(path.join(astroTarget, '.agents/skills/harness-astro-islands/SKILL.md')));
  assert.equal(JSON.parse(inAstro(['check'])).status, 'ok');
  const monetizationTarget = path.join(temp, 'monetization site'); fs.mkdirSync(monetizationTarget);
  const monetizeRun = args => process.platform === 'win32'
    ? command(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `""${bin}" ${args.join(' ')}"`], monetizationTarget, { windowsVerbatimArguments: true })
    : command(bin, args, monetizationTarget);
  assert.equal(JSON.parse(monetizeRun(['init','--capabilities','monetization'])).status,'ok');
  assert.ok(fs.existsSync(path.join(monetizationTarget,'.agents/skills/harness-monetization-adsense-integration/SKILL.md')));
  assert.ok(fs.existsSync(path.join(monetizationTarget,'.harness/capabilities/monetization/templates/site-monetization-plan.md')));
  assert.equal(JSON.parse(monetizeRun(['check'])).status,'ok');
  assert.equal(JSON.parse(monetizeRun(['verify','--scope','capabilities'])).executed,false);
  assert.equal(JSON.parse(monetizeRun(['eval','--scope','capabilities'])).dataset.cases.length,4);
  const productTarget = path.join(temp, 'product project'); fs.mkdirSync(productTarget);
  const productOut = process.platform === 'win32'
    ? command(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `""${bin}" init --capabilities product,uiux"`], productTarget, { windowsVerbatimArguments: true })
    : command(bin, ['init', '--capabilities', 'product,uiux'], productTarget);
  assert.equal(JSON.parse(productOut).status, 'ok');
  assert.ok(fs.existsSync(path.join(productTarget, '.harness/capabilities/product/templates/prd.md')));
  assert.ok(fs.existsSync(path.join(productTarget, '.agents/skills/harness-product-prd-generation/SKILL.md')));
  assert.ok(fs.existsSync(path.join(productTarget, '.agents/skills/harness-uiux-figma-design/SKILL.md')));
  const productDocOut = process.platform === 'win32'
    ? command(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `""${bin}" new-doc brd"`], productTarget, { windowsVerbatimArguments: true })
    : command(bin, ['new-doc', 'brd'], productTarget);
  assert.equal(JSON.parse(productDocOut).status, 'ok');
  assert.ok(fs.existsSync(path.join(productTarget, 'docs/product/brd.md')));
  assert.equal(JSON.parse(run(['verify'])).executed, false);
  assert.equal(JSON.parse(run(['eval'])).dataset.cases.length, 8);
  assert.ok(JSON.parse(run(['eval', '--scope', 'all'])).dataset.cases.some(x => x.id.startsWith('core/')));
  assert.ok(fs.existsSync(path.join(target, '.agents/skills/harness-java-spring-kafka-outbox/SKILL.md')));
  JSON.parse(run(['new-change', 'package-smoke']));
  assert.ok(fs.existsSync(path.join(target, 'openspec/changes/package-smoke/.openspec.yaml')));
  assert.deepEqual(JSON.parse(run(['update'])).changes, []);
  // Local installation lives inside the target: this must not trigger overlap protection.
  const local = path.join(temp, 'local-consumer'); fs.mkdirSync(local); fs.writeFileSync(path.join(local, 'package.json'), '{"private":true}'); fs.writeFileSync(path.join(local, 'pom.xml'), '<groupId>org.springframework.boot</groupId>');
  npm(['install', '--ignore-scripts', '--no-audit', '--no-fund', archive], local);
  const localResult = JSON.parse(npm(['exec', '--offline', '--', 'aih', 'init', '--detect'], local));
  assert.equal(localResult.status, 'ok');
  assert.equal(JSON.parse(npm(['exec', '--offline', '--', 'aih', 'check'], local)).status, 'ok');
  console.log(JSON.stringify({ status: 'ok', version: packed.version, package_files: names.length,
    checks: ['npm pack assets', 'global aih shim', 'cwd default', 'all adapters and skills', 'selective UI/UX capability', 'product document bundle', 'monetization bundle and advisory checks', 'Astro packaged detection and skills', 'installed verify/eval', 'stack detection', 'new-change dotfile', 'idempotent update', 'local npm exec without network'] }, null, 2));
} finally { fs.rmSync(temp, { recursive: true, force: true }); }
