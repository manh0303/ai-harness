#!/usr/bin/env python3
"""Offline structure checks; does not replace OpenSpec or model evaluation."""
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from cli.harness import HarnessError, bundle, manifest  # noqa: E402


def validate():
    errors = []
    m = manifest(ROOT)
    for name in ['README.md', 'AGENTS.md', 'CHANGELOG.md', 'docs/architecture.md', 'docs/versioning.md',
                 'core/rules/foundations.md', 'core/rules/context.md', 'core/policies/security.md',
                 'core/policies/permissions.md', 'core/workflows/spec-to-code.md',
                 'integrations/github/README.md', 'integrations/gitlab/harness-ci.yml',
                 'integrations/mcp/server-inventory.example.json', '.github/workflows/harness.yml']:
        if not (ROOT / name).is_file() or not (ROOT / name).stat().st_size:
            errors.append('Missing/empty required file: ' + name)
    skills = list((ROOT / 'core/skills').glob('*/SKILL.md'))
    if len(skills) < 5:
        errors.append('Missing required skills')
    for p in skills:
        text = p.read_text(encoding='utf-8')
        if not text.startswith('---\n') or f'name: {p.parent.name}\n' not in text or 'description: ' not in text:
            errors.append('Invalid skill metadata: ' + str(p.relative_to(ROOT)))
        for section in ['## Input', '## Procedure', '## Output', '## Constraints']:
            if section not in text:
                errors.append(f'Missing skill section {section}: {p.parent.name}')
    for name in ['planner', 'implementer', 'reviewer', 'security-reviewer', 'test-engineer']:
        path = ROOT / f'core/agents/{name}.md'
        if not path.is_file() or any(s not in path.read_text() for s in ['## Inputs', '## Outputs', '## Permissions and limits', '## Handoff']):
            errors.append('Invalid role contract: ' + name)
    for name in m['adapters']:
        path = ROOT / f'adapters/{name}/adapter.json'
        adapter = json.loads(path.read_text())
        if adapter.get('schema_version') != 1 or adapter.get('id') != name:
            errors.append('Invalid adapter: ' + name)
        commands = adapter.get('suggested_commands')
        if not isinstance(commands, list) or any(not isinstance(c, list) or not c or any(not isinstance(v, str) for v in c) for c in commands):
            errors.append('Commands must be argument arrays: ' + name)
    # Build the complete distribution to catch collisions, unsafe files and missing templates.
    files, lock = bundle(ROOT, {'schema_version': 1, 'adapters': m['adapters']})
    if len(files) != len(lock['files']):
        errors.append('Payload ownership mismatch')
    for path in ROOT.rglob('*.md'):
        if '.git' in path.parts:
            continue
        text = path.read_text(encoding='utf-8')
        for target in re.findall(r'\[[^\]]*\]\(([^)]+)\)', text):
            if '://' in target or target.startswith(('#', 'mailto:')):
                continue
            relative = target.split('#')[0]
            if relative and not (path.parent / relative).exists():
                errors.append(f'Broken local Markdown link: {path.relative_to(ROOT)} -> {target}')
    cases = json.loads((ROOT / 'evals/cases.json').read_text())
    ids = set()
    for case in cases['cases']:
        if case['id'] in ids or not case['criteria'] or type(case['critical']) is not bool:
            errors.append('Invalid eval case: ' + case['id'])
        ids.add(case['id'])
    if f'## {m["version"]}' not in (ROOT / 'CHANGELOG.md').read_text():
        errors.append('Manifest version missing from CHANGELOG')
    return {'status': 'error' if errors else 'ok', 'version': m['version'], 'adapters': len(m['adapters']),
            'skills': len(skills), 'managed_files_all_adapters': len(files), 'errors': errors,
            'scope': 'Offline structure only; upstream OpenSpec and live model evaluation are separate'}


if __name__ == '__main__':
    try:
        result = validate()
        print(json.dumps(result, indent=2))
        raise SystemExit(1 if result['errors'] else 0)
    except (HarnessError, ValueError, OSError, KeyError, TypeError) as exc:
        print(json.dumps({'status': 'error', 'message': str(exc)}), file=sys.stderr)
        raise SystemExit(1)
