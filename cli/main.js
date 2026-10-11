import { listAdapters, detect, verify, evaluate } from './adapters.js';
import { listCapabilities, skillCatalog, readSkill } from './capabilities.js';
import { resolveModules } from './composition.js';
import { parseArgs } from 'node:util';
import { SOURCE, readJson, targetRoot, install, check, doctor, newChange, newDoc, loadLock } from './harness.js';
import path from 'node:path';

const HELP = `aih — install reusable AI development rules into a project

Usage: aih <command> [options]
  list                 List available adapters and capabilities
  skills               List installed skill names/descriptions without full content
  skill <name>         Load one installed skill on demand
  detect               Suggest adapters with evidence from target files
  resolve              Validate a module selection and show compatibility warnings
  verify               Show installed advisory checks (does not execute)
  eval                 Emit evaluation template, or score --report <file>
  init                 Install rules and selected adapters
  update               Update the installed snapshot, preserving project content
  check                Check installed file hashes and adapter selection
  doctor               Check installation and tool presence
  new-change <id>      Create an OpenSpec draft using installed templates
  new-doc <type>       Scaffold a Product document draft (requires product capability)

Options:
  --target <directory> Project directory (default: current directory)
  --detect            init only: opt in to detected stack selection
  --scope <type>      verify/eval: adapters (default), capabilities, core, all
  --report <file>     eval only: score a reviewer-completed JSON report
  --adapters <a,b>     init/resolve: java-spring,react-nextjs,react-native,ai-python,kubernetes
  --capabilities <a,b> init/resolve: uiux,product,devops
  --source <directory> init/update/list/detect/resolve: trusted alternate bundle directory
  --dry-run           init/update: preview without persistent changes
  --allow-major       init/update: acknowledge a major version migration
  -h, --help          Show help
  -v, --version       Show installed CLI version

Examples:
  aih init --adapters java-spring --capabilities uiux
  aih resolve --adapters java-spring,kubernetes --capabilities product,uiux,devops
  aih skills
  aih new-doc brd
  aih init --adapters java-spring,kubernetes --capabilities product,devops
  aih skill harness-product-brd-generation
  aih skill harness-uiux-figma-design
  aih update --dry-run
  aih new-change add-order
`;

export function main(argv = process.argv.slice(2)) {
  let args;
  try {
    args = parseArgs({ args: argv, allowPositionals: true, strict: true, tokens: true, options: {
      target: { type: 'string' }, adapters: { type: 'string' }, capabilities: { type: 'string' }, source: { type: 'string' },
      detect: { type: 'boolean' }, report: { type: 'string' }, scope: { type: 'string' },
      'dry-run': { type: 'boolean' }, 'allow-major': { type: 'boolean' },
      help: { type: 'boolean', short: 'h' }, version: { type: 'boolean', short: 'v' },
    } });
    const seen = new Set();
    for (const token of args.tokens.filter(t => t.kind === 'option')) {
      if (seen.has(token.name)) throw new Error(`Duplicate option: --${token.name}`);
      seen.add(token.name);
    }
    if (args.values.help || !argv.length) { console.log(HELP); return 0; }
    if (args.values.version) { console.log(readJson(path.join(SOURCE, 'package.json')).version); return 0; }
    const [command, name, ...extra] = args.positionals;
    if (!['init', 'update', 'check', 'doctor', 'new-change', 'new-doc', 'list', 'detect', 'resolve', 'verify', 'eval', 'skills', 'skill'].includes(command)) throw new Error(`Unknown command: ${command}`);
    if (extra.length || (!['new-change', 'new-doc', 'skill'].includes(command) && name !== undefined) || (['new-change', 'new-doc', 'skill'].includes(command) && name === undefined)) throw new Error('Unexpected or missing positional argument; run aih --help');
    const allowed = new Set(['target', ...(['init', 'update'].includes(command) ? ['source', 'dry-run', 'allow-major'] : []), ...(['init', 'resolve'].includes(command) ? ['adapters', 'capabilities'] : []), ...(command === 'init' ? ['detect'] : []), ...(['list', 'detect', 'resolve'].includes(command) ? ['source'] : []), ...(command === 'eval' ? ['report'] : []), ...(['verify', 'eval'].includes(command) ? ['scope'] : [])]);
    for (const key of Object.keys(args.values)) if (!allowed.has(key)) throw new Error(`--${key} is not supported for ${command}`);
    if (args.values.detect && args.values.adapters !== undefined) throw new Error('Choose either --detect or --adapters');
    for (const key of ['target', 'source', 'adapters', 'capabilities', 'report']) if (args.values[key] !== undefined && !args.values[key].trim()) throw new Error(`--${key} cannot be empty`);
  } catch (error) { console.error(JSON.stringify({ status: 'error', message: error.message })); return 2; }
  try {
    const { values, positionals: [command, name] } = args;
    const root = targetRoot(values.target ?? process.cwd());
    let result;
    if (command === 'init' || command === 'update') {
      const source = targetRoot(values.source ?? SOURCE);
      const selection = values.detect ? detect(root, source).adapters : undefined;
      if (values.detect && !selection.length) throw new Error('No stack detected; choose --adapters explicitly or omit --detect for core only');
      result = install(root, source, {
        command, adapters: selection ?? (values.adapters === undefined ? undefined : values.adapters.split(',').map(v => v.trim())),
        capabilities: values.capabilities === undefined ? undefined : values.capabilities.split(',').map(v => v.trim()),
        dryRun: values['dry-run'], allowMajor: values['allow-major'],
      });
    } else if (command === 'list') { const source = targetRoot(values.source ?? SOURCE); result = { ...listAdapters(source), capabilities: listCapabilities(source) }; }
    else if (command === 'skills' || command === 'skill') {
      const state = check(root);
      if (state.status !== 'ok') throw new Error(`Fix installation drift before loading skills: ${state.problems.join(', ')}`);
      const lock = loadLock(root);
      result = command === 'skills' ? skillCatalog(root, lock) : readSkill(root, lock, name);
    }
    else if (command === 'resolve') result = resolveModules(targetRoot(values.source ?? SOURCE), {
      adapters: values.adapters === undefined ? [] : values.adapters.split(',').map(x => x.trim()),
      capabilities: values.capabilities === undefined ? [] : values.capabilities.split(',').map(x => x.trim()),
    });
    else if (command === 'detect') result = detect(root, targetRoot(values.source ?? SOURCE));
    else if (command === 'verify') result = verify(root, values.scope ?? 'adapters');
    else if (command === 'eval') result = evaluate(root, values.report, values.scope ?? 'adapters');
    else if (command === 'new-change') result = newChange(root, name);
    else if (command === 'new-doc') result = newDoc(root, name);
    else result = command === 'doctor' ? doctor(root) : check(root);
    console.log(JSON.stringify(result, null, 2));
    return ['error', 'fail'].includes(result.status) ? 1 : 0;
  } catch (error) { console.error(JSON.stringify({ status: 'error', message: error.message })); return 1; }
}
