import { listAdapters, detect, verify, evaluate } from './adapters.js';
import { listCapabilities, skillCatalog, readSkill } from './capabilities.js';
import { resolveModules } from './composition.js';
import { parseArgs } from 'node:util';
import { setupPlan } from './environment.js';
import { ready } from './readiness.js';
import { artifactReport } from './artifacts.js';
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
  update               Apply the installed CLI bundle to the project (no download)
  check                Check Harness file integrity, not application tests
  doctor               Check installation, configured paths and tool presence
  setup                Suggest first-run questions for the AI host (read-only)
  artifacts            Show input/output/storage and connection declarations (read-only)
  ready <id>           Check structural change readiness, not approval
  new-change <id>      Create an OpenSpec draft using installed templates
  new-doc <type>       Scaffold a locked capability template (default: product)

Options:
  --target <directory> Project directory (default: current directory)
  --detect            init only: opt in to detected stack selection
  --stage <type>      ready only: implement (default) or review
  --capability <id>   new-doc only: installed template owner (default: product)
  --agent-preset <id> init only: recommended (default), economy, custom; no overwrite
  --host <id>         setup only: codex,claude-code,gemini-cli,cursor,copilot or custom host ID
  --scope <type>      verify/eval: adapters (default), capabilities, core, all
  --report <file>     eval only: score a reviewer-completed JSON report
  --adapters <a,b>     init/resolve: java-spring,react-nextjs,react-native,ai-python,kubernetes,astro
  --capabilities <a,b> init/resolve: uiux,product,architecture,delivery,devops,monetization
  --source <directory> init/update/list/detect/resolve: trusted alternate bundle directory
  --dry-run           init/update: preview without persistent changes
  --allow-major       init/update: acknowledge a major version migration
  -h, --help          Show help
  -v, --version       Show installed CLI version

Start: init → fill .harness/local.md → ask your AI host to read AGENTS.md.
The host runs application tests; verify only prints a checklist.
Update a global CLI with npm install -g @manhd_d/ai-harness@latest,
then run aih update --dry-run, aih update, and aih check in the project.

Examples:
  aih init --adapters java-spring --capabilities uiux
  aih init --adapters astro --capabilities product,uiux
  aih init --adapters astro --capabilities monetization
  aih resolve --adapters java-spring,kubernetes --capabilities product,uiux,devops
  aih setup
  aih init --agent-preset economy
  aih setup --host codex
  aih doctor
  aih ready add-order --stage implement
  aih skills
  aih new-doc brd
  aih new-doc idea
  aih new-doc research
  aih new-doc prd-lite
  aih new-doc srs
  aih new-doc use-cases
  aih new-doc mvp
  aih new-doc overview --capability architecture
  aih new-doc delivery-plan --capability delivery
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
      target: { type: 'string' }, adapters: { type: 'string' }, capabilities: { type: 'string' }, capability: { type: 'string' }, source: { type: 'string' },
      'agent-preset': { type: 'string' }, host: { type: 'string' },
      detect: { type: 'boolean' }, report: { type: 'string' }, scope: { type: 'string' }, stage: { type: 'string' },
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
    if (!['init', 'update', 'check', 'doctor', 'new-change', 'new-doc', 'list', 'detect', 'resolve', 'verify', 'eval', 'skills', 'skill', 'setup', 'ready', 'artifacts'].includes(command)) throw new Error(`Unknown command: ${command}`);
    if (extra.length || (!['new-change', 'new-doc', 'skill', 'ready'].includes(command) && name !== undefined) || (['new-change', 'new-doc', 'skill', 'ready'].includes(command) && name === undefined)) throw new Error('Unexpected or missing positional argument; run aih --help');
    const allowed = new Set(['target', ...(['init', 'update'].includes(command) ? ['source', 'dry-run', 'allow-major'] : []), ...(['init', 'resolve'].includes(command) ? ['adapters', 'capabilities'] : []), ...(command === 'init' ? ['detect'] : []), ...(['list', 'detect', 'resolve'].includes(command) ? ['source'] : []), ...(command === 'eval' ? ['report'] : []), ...(command === 'ready' ? ['stage'] : []), ...(['verify', 'eval'].includes(command) ? ['scope'] : [])]);
    if (command === 'new-doc') allowed.add('capability');
    if (command === 'init') allowed.add('agent-preset');
    if (command === 'setup') allowed.add('host');
    for (const key of Object.keys(args.values)) if (!allowed.has(key)) throw new Error(`--${key} is not supported for ${command}`);
    if (args.values.detect && args.values.adapters !== undefined) throw new Error('Choose either --detect or --adapters');
    for (const key of ['target', 'source', 'adapters', 'capabilities', 'capability', 'report', 'agent-preset', 'host']) if (args.values[key] !== undefined && !args.values[key].trim()) throw new Error(`--${key} cannot be empty`);
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
        agentPreset: values['agent-preset'],
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
    else if (command === 'artifacts') {
      if (check(root).status !== 'ok') throw new Error('Fix installation drift before reading artifact declarations');
      result = artifactReport(root);
    }
    else if (command === 'setup' || command === 'ready') {
      const state = check(root);
      if (state.status !== 'ok') throw new Error('Fix installation drift before setup/readiness checks');
      result = command === 'setup' ? setupPlan(root, loadLock(root).adapters, process.env, values.host) : ready(root, name, values.stage ?? 'implement');
    }
    else if (command === 'new-change') result = newChange(root, name);
    else if (command === 'new-doc') result = newDoc(root, name, values.capability ?? 'product');
    else result = command === 'doctor' ? doctor(root) : check(root);
    if (command === 'init' || command === 'update') result.next_steps = values['dry-run']
      ? ['Review the proposed changes, then repeat without --dry-run.']
      : ['Run aih setup; ask your AI host to read AGENTS.md and the project-setup workflow.',
         'Review local.md/environment.json and artifacts.json/integrations.json; record input/output/storage/ownership, keep credentials in the host and personal paths in ignored machine.json.',
         'Run aih doctor and review/commit the shared configuration and snapshot.'];
    if (command === 'new-change') result.next_steps = [
      'Resolve consequential ambiguity with the user and record answers/sources in decisions.json.',
      'When artifact outputs are configured, record create/update/unchanged impact and source-write policy in artifact-impact.json.',
      'Fill the change documents, then run aih ready ' + name + ' --stage implement.',
      'After implementation, record actual verification evidence and run aih ready ' + name + ' --stage review.'];
    if (command === 'new-doc') result.next_steps = ['Populate the draft from authorized sources; clarify missing decisions before implementation.'];
    console.log(JSON.stringify(result, null, 2));
    return ['error', 'fail', 'blocked'].includes(result.status) ? 1 : 0;
  } catch (error) { console.error(JSON.stringify({ status: 'error', message: error.message })); return 1; }
}
