import { startPlan, saveStart, guidedStart } from './start.js';
import { backupConfig, restoreConfig } from './portable-config.js';
import { listAdapters, detect, verify, evaluate } from './adapters.js';
import { listCapabilities, skillCatalog, readSkill } from './capabilities.js';
import { resolveModules } from './composition.js';
import { parseArgs } from 'node:util';
import { setupPlan } from './environment.js';
import { ready } from './readiness.js';
import { resumePlan } from './checkpoint.js';
import { agentPlan } from './agents.js';
import { adaptiveVerification } from './verification.js';
import { reviewVerification } from './verification-report.js';
import { artifactReport } from './artifacts.js';
import { SOURCE, readJson, targetRoot, install, check, doctor, newChange, newDoc, loadLock, saveCheckpoint } from './harness.js';
import path from 'node:path';

const HELP = `aih — install reusable AI development rules into a project

Usage: aih <command> [options]
  list                 List available adapters and capabilities
  checkpoint <id>      Save a validated --report handoff; replace with --expected digest
  resume <id>          Inspect checkpoint freshness and side effects before continuation
  agents               Show installed agent contracts and declared model/skill routing
  skills               List installed skill names/descriptions without full content
  skill <name>         Load one installed skill on demand
  detect               Suggest adapters with evidence from target files
  resolve              Validate a module selection and show compatibility warnings
  verify               Plan checks or validate --report evidence (does not execute)
  eval                 Emit evaluation template, or score --report <file>
  init                 Install rules and selected adapters
  update               Apply the installed CLI bundle to the project (no download)
  check                Check Harness file integrity, not application tests
  doctor               Check installation, configured paths and tool presence
  start                Guide intake; reuse saved answers and hand off to your AI host
  backup               Export user configuration (not docs/checkpoints/secrets)
  restore              Restore --from backup; --transfer reuses modules/model preferences
  setup                Suggest first-run questions for the AI host (read-only)
  artifacts            Show input/output/storage and connection declarations (read-only)
  ready <id>           Check structural change readiness, not approval
  new-change <id>      Create an OpenSpec draft using installed templates
  new-doc <type>       Scaffold a locked capability template (default: product)

Options:
  --goal <type>       start: idea, docs, change, resume (saves with --task)
  --task <text>       start: task description; --change supplies resume checkpoint ID
  --input <path/url>  start: seed requirements only if no inputs declared
  --output <path>     start: draft docs directory; backup: archive path
  --from <file>       restore: project-relative archive file
  --transfer          restore: only modules/agent models; omit old autonomy
  --replace           restore: explicit replacement; automatic before-backup
  --target <directory> Project directory (default: current directory)
  --detect            init only: opt in to detected stack selection
  --stage <type>      ready only: implement (default) or review
  --capability <id>   new-doc only: installed template owner (default: product)
  --agent-preset <id> init only: recommended (default), economy, custom; no overwrite
  --link-claude       init/update: opt in to a managed CLAUDE.md import
  --claude-skills     init/update: opt in to canonical .claude/skills wrappers
  --host <id>         init/setup/agents: codex,claude-code,gemini-cli,cursor,copilot or custom host ID
  --scope <type>      verify/eval: adapters (default), capabilities, core, all
  --adaptive          verify: discover a read-only project verification plan
  --expected <sha>    checkpoint: observed prior checkpoint digest for replacement
  --report <file>     checkpoint: save handoff; eval: score; verify: validate evidence; new-doc techspec: link evidence
  --adapters <a,b>     init/resolve: java-spring,react-nextjs,react-native,ai-python,kubernetes,astro
  --capabilities <a,b> init/resolve: uiux,product,architecture,delivery,devops,monetization
  --source <directory> init/update/list/detect/resolve: trusted alternate bundle directory
  --dry-run           init/update: preview without persistent changes
  --allow-major       init/update: acknowledge a major version migration
  -h, --help          Show help
  -v, --version       Show installed CLI version

Start: init → start → open your AI host and send the returned host_prompt.
User settings: .harness/; backup exports only documented user files.
Restore config before init on a fresh project; --transfer excludes old sources/tasks.
The host runs application tests; verify prints plans or validates supplied evidence.
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
  aih verify --adaptive
  aih verify --report verification/report.json
  aih new-doc techspec --report verification/report.json
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
      goal: { type: 'string' }, task: { type: 'string' }, change: { type: 'string' }, input: { type: 'string' }, output: { type: 'string' }, from: { type: 'string' }, transfer: { type: 'boolean' }, replace: { type: 'boolean' }, target: { type: 'string' }, adapters: { type: 'string' }, capabilities: { type: 'string' }, capability: { type: 'string' }, source: { type: 'string' },
      'agent-preset': { type: 'string' }, host: { type: 'string' }, expected: { type: 'string' },
      'link-claude': { type: 'boolean' }, 'claude-skills': { type: 'boolean' }, adaptive: { type: 'boolean' }, detect: { type: 'boolean' }, report: { type: 'string' }, scope: { type: 'string' }, stage: { type: 'string' },
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
    if (!['start', 'backup', 'restore', 'init', 'update', 'check', 'doctor', 'new-change', 'new-doc', 'list', 'detect', 'resolve', 'verify', 'eval', 'skills', 'skill', 'setup', 'ready', 'artifacts', 'agents', 'checkpoint', 'resume'].includes(command)) throw new Error(`Unknown command: ${command}`);
    if (extra.length || (!['new-change', 'new-doc', 'skill', 'ready', 'checkpoint', 'resume'].includes(command) && name !== undefined) || (['new-change', 'new-doc', 'skill', 'ready', 'checkpoint', 'resume'].includes(command) && name === undefined)) throw new Error('Unexpected or missing positional argument; run aih --help');
    const allowed = new Set(['target', ...(['init', 'update'].includes(command) ? ['source', 'dry-run', 'allow-major'] : []), ...(['init', 'resolve'].includes(command) ? ['adapters', 'capabilities'] : []), ...(command === 'init' ? ['detect'] : []), ...(['list', 'detect', 'resolve'].includes(command) ? ['source'] : []), ...(command === 'eval' ? ['report'] : []), ...(command === 'ready' ? ['stage'] : []), ...(['verify', 'eval'].includes(command) ? ['scope'] : [])]);
    if (command === 'start') for (const key of ['goal','task','change','input','output','host']) allowed.add(key);
    if (command === 'backup') allowed.add('output');
    if (command === 'restore') { for (const key of ['from','transfer','replace','dry-run']) allowed.add(key); if (!args.values.from) throw new Error('restore requires --from'); }
    if (command === 'start' && !args.values.goal && ['task','change','input','output'].some(key => args.values[key] !== undefined)) throw new Error('start saving options require --goal');
    if (command === 'checkpoint') { allowed.add('report'); allowed.add('expected'); if (!args.values.report) throw new Error('checkpoint requires --report'); }
    if (command === 'new-doc') { allowed.add('capability'); allowed.add('report'); }
    if (command === 'verify') { allowed.add('adaptive'); allowed.add('report'); }
    if (args.values.adaptive && args.values.report) throw new Error('Choose --adaptive or --report');
    if (args.values.scope && (args.values.adaptive || (command === 'verify' && args.values.report))) throw new Error('--scope applies only to advisory checks');
    if (command === 'init') allowed.add('agent-preset');
    if (['setup','agents','init'].includes(command)) allowed.add('host');
    if (['init','update'].includes(command)) { allowed.add('link-claude'); allowed.add('claude-skills'); }
    for (const key of Object.keys(args.values)) if (!allowed.has(key)) throw new Error(`--${key} is not supported for ${command}`);
    if (args.values.detect && args.values.adapters !== undefined) throw new Error('Choose either --detect or --adapters');
    for (const key of ['goal', 'task', 'change', 'input', 'output', 'from', 'target', 'source', 'adapters', 'capabilities', 'capability', 'report', 'agent-preset', 'host']) if (args.values[key] !== undefined && !args.values[key].trim()) throw new Error(`--${key} cannot be empty`);
  } catch (error) { console.error(JSON.stringify({ status: 'error', message: error.message })); return 2; }
  try {
    const { values, positionals: [command, name] } = args;
    const root = targetRoot(values.target ?? process.cwd());
    let result;
    if (command === 'start') {
      if (!values.goal && process.stdin.isTTY && process.stdout.isTTY) return guidedStart(root, { host: values.host }).then(value => { console.log(JSON.stringify(value, null, 2)); return value.status === 'blocked' ? 1 : 0; }).catch(error => { console.error(JSON.stringify({ status: 'error', message: error.message })); return 1; });
      result = values.goal ? saveStart(root, { goal: values.goal, task: values.task, changeId: values.change, input: values.input, output: values.output, host: values.host }) : startPlan(root, values.host);
    } else if (command === 'backup') result = backupConfig(root, values.output);
    else if (command === 'restore') result = restoreConfig(root, values.from, { dryRun: values['dry-run'], transfer: values.transfer, replace: values.replace });
    else if (command === 'init' || command === 'update') {
      const source = targetRoot(values.source ?? SOURCE);
      const selection = values.detect ? detect(root, source).adapters : undefined;
      if (values.detect && !selection.length) throw new Error('No stack detected; choose --adapters explicitly or omit --detect for core only');
      result = install(root, source, {
        command, adapters: selection ?? (values.adapters === undefined ? undefined : values.adapters.split(',').map(v => v.trim())),
        agentPreset: values['agent-preset'], host: values.host, linkClaude: values['link-claude'], claudeSkills: values['claude-skills'],
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
    else if (command === 'verify') {
      if (values.adaptive || values.report) { if (check(root).status !== 'ok') throw new Error('Fix installation drift before verification'); }
      result = values.report ? reviewVerification(root, values.report) : values.adaptive ? adaptiveVerification(root, SOURCE) : verify(root, values.scope ?? 'adapters');
    }
    else if (command === 'eval') result = evaluate(root, values.report, values.scope ?? 'adapters');
    else if (command === 'checkpoint') result = saveCheckpoint(root, name, values.report, values.expected);
    else if (command === 'resume') { if (check(root).status !== 'ok') throw new Error('Fix installation drift before resume'); result = resumePlan(root, name); }
    else if (command === 'agents') { if (check(root).status !== 'ok') throw new Error('Fix installation drift before reading agents'); result = agentPlan(root, values.host); }
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
    else if (command === 'new-doc') result = newDoc(root, name, values.capability ?? 'product', { report: values.report });
    else result = command === 'doctor' ? doctor(root) : check(root);
    if (command === 'init' || command === 'update') result.next_steps = values['dry-run']
      ? ['Review the proposed changes, then repeat without --dry-run.']
      : ['Run start with the same CLI (aih start or npx --yes @manhd_d/ai-harness start); open your AI host and send host_prompt.',
         'Review local.md/environment.json and artifacts.json/integrations.json; record input/output/storage/ownership, keep credentials in the host and personal paths in ignored machine.json.',
         'Run doctor and review/commit shared configuration and snapshot. Use backup; copy its file outside the repo. See docs/configuration-backup.md.'];
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
