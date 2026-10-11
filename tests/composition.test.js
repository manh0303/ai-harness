import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import * as h from '../cli/harness.js';
import { resolveModules, validateRegistry } from '../cli/composition.js';

let base, root, source;
beforeEach(() => {
  base = fs.mkdtempSync(path.join(os.tmpdir(), 'aih-composition-'));
  root = path.join(base, 'consumer'); source = path.join(base, 'source');
  fs.mkdirSync(root); fs.mkdirSync(source);
  for (const name of ['core', 'adapters', 'capabilities', 'integrations', 'templates', 'harness.yaml']) {
    fs.cpSync(path.join(h.SOURCE, name), path.join(source, name), {recursive:true});
  }
});
afterEach(() => fs.rmSync(base,{recursive:true,force:true}));
function change(id,update) {
  const p=path.join(source,'capabilities',id,'capability.json'), m=h.readJson(p);update(m);fs.writeFileSync(p,JSON.stringify(m));
}
function cli(args,expected=0) {
  const r=spawnSync(process.execPath,[path.join(h.SOURCE,'bin/aih.js'),...args],{cwd:root,encoding:'utf8'});
  assert.equal(r.status,expected,r.stdout+r.stderr);return JSON.parse(r.stdout||r.stderr);
}

test('resolve reports versions and optional recommendations without writes',()=>{
  const r=cli(['resolve','--source',source,'--capabilities','uiux','--adapters','java-spring']);
  assert.deepEqual(r.adapters,['java-spring']);
  assert.deepEqual(r.capabilities,['uiux']);
  assert.equal(r.modules[0].module_version,'1.0.0');
  assert.match(r.warnings[0],/recommends capability:product/);
  assert.deepEqual(fs.readdirSync(root),[]);
});

test('requires, conflicts and adapter compatibility fail before writing',()=>{
  change('uiux',m=>m.requires=['capability:product']);
  assert.throws(()=>resolveModules(source,{capabilities:['uiux']}),/Missing required/);
  cli(['init','--source',source,'--capabilities','uiux'],1);
  assert.deepEqual(fs.readdirSync(root),[]);
  assert.equal(cli(['resolve','--source',source,'--capabilities','uiux,product']).status,'ok');
  change('uiux',m=>{m.requires=[];m.conflicts=['capability:product'];});
  cli(['init','--source',source,'--capabilities','uiux,product'],1);
  assert.deepEqual(fs.readdirSync(root),[]);
  change('uiux',m=>{m.conflicts=[];m.compatible_adapters=['react-nextjs'];});
  cli(['init','--source',source,'--capabilities','uiux','--adapters','java-spring'],1);
  assert.deepEqual(fs.readdirSync(root),[]);
});

test('cycles, unknown and self references rejected',()=>{
  change('product',m=>m.requires=['capability:uiux']);
  change('uiux',m=>m.requires=['capability:product']);
  assert.throws(()=>resolveModules(source,{capabilities:['product','uiux']}),/cycle/);
  change('uiux',m=>m.requires=['capability:unknown']);
  assert.throws(()=>resolveModules(source,{capabilities:['product','uiux']}),/Unknown requires/);
  change('uiux',m=>m.requires=['capability:uiux']);
  assert.throws(()=>resolveModules(source,{capabilities:['uiux']}),/Invalid requires/);
});

test('update preserves installed ownership and refuses incompatible selection',()=>{
  h.install(root,source,{capabilities:['uiux','product']});
  assert.equal(h.check(root).status,'ok');
  const cfg=h.readJson(path.join(root,h.CONFIG));
  cfg.capabilities=['product'];fs.writeFileSync(path.join(root,h.CONFIG),JSON.stringify(cfg));
  h.install(root,source,{command:'update'});
  assert.deepEqual(h.loadLock(root).capabilities,['product']);
  assert.equal(h.check(root).status,'ok');
  const before=fs.readFileSync(path.join(root,h.LOCK));
  change('product',m=>m.requires=['capability:uiux']);
  assert.throws(()=>h.install(root,source,{command:'update'}),/Missing required/);
  assert.ok(fs.readFileSync(path.join(root,h.LOCK)).equals(before));
});

test('old module manifests without optional fields remain valid',()=>{
  change('devops',m=>{delete m.module_version;delete m.requires;delete m.recommends;delete m.conflicts;});
  assert.equal(resolveModules(source,{capabilities:['devops']}).modules[0].module_version,null);
});

test('registry validation permits alternative incompatible modules but checks all references',()=>{
  change('uiux',m=>m.conflicts=['capability:product']);
  assert.equal(validateRegistry(source).status,'ok');
  assert.equal(resolveModules(source,{capabilities:['uiux']}).status,'ok');
  assert.throws(()=>resolveModules(source,{capabilities:['uiux','product']}),/conflicts/);
  change('product',m=>m.recommends=['capability:unknown']);
  assert.throws(()=>validateRegistry(source),/Unknown recommends/);
});

test('Astro can be used core-only or combined with optional Product and UI/UX', () => {
  const minimal = cli(['resolve','--source',source,'--adapters','astro']);
  assert.deepEqual(minimal.adapters, ['astro']);
  assert.deepEqual(minimal.capabilities, []);
  const composed = cli(['resolve','--source',source,'--adapters','astro','--capabilities','product,uiux']);
  assert.deepEqual(composed.adapters, ['astro']);
  assert.deepEqual(composed.capabilities, ['product','uiux']);
  const installed = cli(['init','--source',source,'--adapters','astro','--capabilities','product,uiux']);
  assert.equal(installed.status, 'ok');
  assert.equal(h.check(root).status, 'ok');
  assert.ok(fs.existsSync(path.join(root,'.agents/skills/harness-astro-seo/SKILL.md')));
  assert.ok(fs.existsSync(path.join(root,'.agents/skills/harness-product-srs-generation/SKILL.md')));
  assert.ok(fs.existsSync(path.join(root,'.agents/skills/harness-uiux-figma-design/SKILL.md')));
  const plan = cli(['verify','--scope','all']);
  assert.equal(plan.executed, false);
});
