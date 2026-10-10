#!/usr/bin/env python3
"""Install versioned instructions without executing project code or model tools."""
from __future__ import annotations

import argparse
from contextlib import contextmanager
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import sys
import tempfile

SOURCE = Path(__file__).resolve().parents[1]
START = '<!-- ai-harness:start -->'
END = '<!-- ai-harness:end -->'
LOCK = '.harness/lock.json'
CONFIG = '.harness/project.json'
VERSION = re.compile(r'^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$')
SLUG = re.compile(r'^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$')


class HarnessError(Exception):
    pass


def encode(value):
    return (json.dumps(value, indent=2, ensure_ascii=False, sort_keys=True) + '\n').encode()


def digest(data):
    return hashlib.sha256(data).hexdigest()


def read_json(path):
    try:
        return json.loads(path.read_text(encoding='utf-8'))
    except (ValueError, OSError) as exc:
        raise HarnessError(f'Cannot read JSON document: {path}: {exc}') from exc


def safe(root, name):
    """Reject traversal, symlinks (including broken ones), and non-file leaves."""
    p = PurePosixPath(name)
    if not name or p.is_absolute() or '\\' in name or '..' in p.parts or str(p) != name:
        raise HarnessError(f'Unsafe relative path: {name}')
    current = root
    for part in p.parts:
        current = current / part
        if current.is_symlink():
            raise HarnessError(f'Symlink is not supported: {current}')
        if current.exists() and current != root / name and not current.is_dir():
            raise HarnessError(f'Parent is not a directory: {current}')
    if current.exists() and not current.is_file():
        raise HarnessError(f'Expected a regular file: {current}')
    return current


def target_root(value):
    raw = Path(os.path.abspath(value))
    for p in [raw, *raw.parents]:
        if p.is_symlink():
            raise HarnessError(f'Target contains a symlink: {p}')
    if not raw.is_dir():
        raise HarnessError('Target must be an existing directory')
    return raw


def block(data):
    text = data.decode('utf-8')
    if START not in text and END not in text:
        return None
    if text.count(START) != 1 or text.count(END) != 1:
        raise HarnessError('AGENTS.md has duplicate or incomplete harness markers')
    a, b = text.index(START), text.index(END) + len(END)
    if b <= a:
        raise HarnessError('AGENTS.md has reversed harness markers')
    return text[a:b].encode()


def merge_agents(existing, generated):
    old = block(existing)
    if old is None:
        separator = b'' if not existing else (b'\n' if existing.endswith(b'\n') else b'\n\n')
        return existing + separator + generated + b'\n'
    return existing.replace(old, generated, 1)


def payload(root, name):
    p = safe(root, name)
    if not p.exists():
        return None
    data = p.read_bytes()
    return block(data) if name == 'AGENTS.md' else data


def manifest(source):
    m = read_json(safe(source, 'harness.yaml'))
    if not isinstance(m, dict) or m.get('schema_version') != 1 or not VERSION.fullmatch(str(m.get('version', ''))):
        raise HarnessError('Invalid harness manifest schema/version')
    adapters = m.get('adapters')
    if not isinstance(adapters, list) or not adapters or any(not isinstance(a, str) or not SLUG.fullmatch(a) for a in adapters) or len(set(adapters)) != len(adapters):
        raise HarnessError('Invalid adapter registry')
    return m


def project_config(root, adapters=None):
    p = safe(root, CONFIG)
    config = read_json(p) if p.exists() else {'schema_version': 1, 'adapters': adapters or []}
    if not isinstance(config, dict) or set(config) != {'schema_version', 'adapters'} or config['schema_version'] != 1:
        raise HarnessError('Invalid project.json: expected schema_version and adapters')
    names = config['adapters']
    if not isinstance(names, list) or any(not isinstance(a, str) for a in names) or len(set(names)) != len(names):
        raise HarnessError('Invalid project adapters')
    if adapters is not None and p.exists() and sorted(adapters) != sorted(names):
        raise HarnessError('Edit .harness/project.json to select adapters, then run update')
    return config


def collect(source, folder):
    base = source / folder
    if base.is_symlink() or not base.is_dir():
        raise HarnessError(f'Missing/unsafe source directory: {folder}')
    result = {}
    for p in sorted(base.rglob('*')):
        if p.is_symlink():
            raise HarnessError(f'Source symlink is not supported: {p}')
        if p.is_file():
            name = p.relative_to(source).as_posix()
            result[name] = safe(source, name).read_bytes()
    if not result:
        raise HarnessError(f'Empty source directory: {folder}')
    return result


def bundle(source, config):
    m = manifest(source)
    adapters = sorted(config['adapters'])
    unknown = set(adapters) - set(m['adapters'])
    if unknown:
        raise HarnessError(f'Unknown adapters: {sorted(unknown)}')
    files = {}
    for folder in ['core', 'integrations', 'templates', *[f'adapters/{a}' for a in adapters]]:
        for name, data in collect(source, folder).items():
            files['.harness/' + name] = data
            if name.startswith('core/skills/'):
                files['.agents/skills/' + name.removeprefix('core/skills/')] = data
    for a in adapters:
        info = read_json(safe(source, f'adapters/{a}/adapter.json'))
        if not isinstance(info, dict) or info.get('id') != a or info.get('schema_version') != 1:
            raise HarnessError(f'Invalid adapter: {a}')
    template = safe(source, 'templates/AGENTS.md').read_text(encoding='utf-8')
    links = '\n'.join(f'- Read `.harness/adapters/{a}/rules.md`.' for a in adapters) or '- No technology adapter selected.'
    generated = template.replace('{{version}}', m['version']).replace('{{adapters}}', links).strip().encode()
    if block(generated) != generated:
        raise HarnessError('AGENTS template must contain one complete managed block')
    files['AGENTS.md'] = generated
    # Exact content manifest is reproducible; it authenticates nothing by itself.
    hashes = {k: digest(v) for k, v in sorted(files.items())}
    lock = {'schema_version': 1, 'version': m['version'], 'adapters': adapters,
            'files': hashes, 'bundle_sha256': digest(encode(hashes))}
    return files, lock


def managed_name(name):
    return name == 'AGENTS.md' or name.startswith(('.harness/core/', '.harness/adapters/', '.harness/integrations/', '.harness/templates/', '.agents/skills/harness-'))


def load_lock(root):
    lock = read_json(safe(root, LOCK))
    if not isinstance(lock, dict) or set(lock) != {'schema_version', 'version', 'adapters', 'files', 'bundle_sha256'} or lock['schema_version'] != 1:
        raise HarnessError('Invalid lock schema')
    if not VERSION.fullmatch(str(lock['version'])) or not isinstance(lock['files'], dict) or 'AGENTS.md' not in lock['files'] or not isinstance(lock['adapters'], list):
        raise HarnessError('Invalid lock contents')
    if any(not isinstance(a, str) or not SLUG.fullmatch(a) for a in lock['adapters']) or len(set(lock['adapters'])) != len(lock['adapters']):
        raise HarnessError('Invalid lock adapters')
    for name, sha in lock['files'].items():
        if not managed_name(name) or not isinstance(sha, str) or not re.fullmatch('[0-9a-f]{64}', sha):
            raise HarnessError(f'Invalid lock entry: {name}')
        safe(root, name)
    if lock['bundle_sha256'] != digest(encode(lock['files'])):
        raise HarnessError('Lock digest mismatch')
    return lock


def drift(root, lock):
    return [name for name, sha in lock['files'].items()
            if (data := payload(root, name)) is None or digest(data) != sha]


@contextmanager
def installation_guard(root):
    p = safe(root, '.harness-install.lock')
    try:
        fd = os.open(p, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
    except FileExistsError as exc:
        raise HarnessError('Another installation is active; inspect .harness-install.lock before removing a stale lock') from exc
    try:
        os.write(fd, str(os.getpid()).encode())
        os.close(fd)
        yield
    finally:
        p.unlink(missing_ok=True)


def atomic_write(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(prefix='.harness-tmp-', dir=path.parent)
    try:
        with os.fdopen(fd, 'wb') as stream:
            stream.write(data)
        if path.exists():
            os.chmod(tmp, path.stat().st_mode & 0o777)
        else:
            os.chmod(tmp, 0o644)
        os.replace(tmp, path)
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)


def transaction(root, changes):
    """Preflight every path, then rollback file bytes on ordinary write failure."""
    original = {}
    for name in changes:
        p = safe(root, name)
        original[name] = p.read_bytes() if p.exists() else None
    applied = []
    try:
        for name, data in changes.items():
            p = safe(root, name)
            if data is None:
                p.unlink(missing_ok=True)
            else:
                atomic_write(p, data)
            applied.append(name)
    except Exception:
        for name in reversed(applied):
            p = safe(root, name)
            if original[name] is None:
                p.unlink(missing_ok=True)
            else:
                atomic_write(p, original[name])
        raise


def install(root, source, command, adapters, dry_run=False, allow_major=False):
    with installation_guard(root):
        has_lock = safe(root, LOCK).exists()
        if command == 'update' and not has_lock:
            raise HarnessError('Not installed; run init first')
        old = load_lock(root) if has_lock else None
        config = project_config(root, adapters)
        files, lock = bundle(source, config)
        if old:
            conflicts = drift(root, old)
            if conflicts:
                raise HarnessError('Managed files changed; reconcile in Git before updating: ' + ', '.join(conflicts))
            before = tuple(map(int, old['version'].split('.')))
            after = tuple(map(int, lock['version'].split('.')))
            if after < before:
                raise HarnessError('Downgrades are refused; revert the installation commit in Git')
            if after[0] != before[0] and not allow_major:
                raise HarnessError('Major upgrade requires --allow-major and migration review')
            if command == 'init' and old != lock:
                raise HarnessError('Already installed; use update')
        changes = {}
        for name, data in files.items():
            present = payload(root, name)
            owned = old is not None and name in old['files']
            if present is not None and not owned and present != data:
                raise HarnessError(f'Unmanaged file collision: {name}')
            if present != data:
                existing = safe(root, name).read_bytes() if safe(root, name).exists() else b''
                changes[name] = merge_agents(existing, data) if name == 'AGENTS.md' else data
        if old:
            for name in old['files'].keys() - files.keys():
                changes[name] = None
        # Seed files are project-owned after the first creation.
        for name, data in {CONFIG: encode(config), 'openspec/config.yaml': safe(source, 'templates/openspec/config.yaml').read_bytes(),
                           '.harness/local.md': b'# Project overrides\n\nRecord project facts and reviewed exceptions here. Never weaken security boundaries.\n'}.items():
            if not safe(root, name).exists():
                changes[name] = data
        new_lock = encode(lock)
        if not safe(root, LOCK).exists() or safe(root, LOCK).read_bytes() != new_lock:
            changes[LOCK] = new_lock  # Commit marker is written last.
        plan = [{'path': k, 'action': 'delete' if v is None else 'write'} for k, v in changes.items()]
        if not dry_run:
            transaction(root, changes)
        return {'status': 'planned' if dry_run else 'ok', 'version': lock['version'], 'changes': plan}


def check(root):
    lock = load_lock(root)
    if not safe(root, CONFIG).exists():
        raise HarnessError('Missing .harness/project.json; restore it from the installation commit')
    config = project_config(root)
    problems = drift(root, lock)
    if sorted(config['adapters']) != sorted(lock['adapters']):
        problems.append(CONFIG + ': adapter selection changed; run update')
    return {'status': 'error' if problems else 'ok', 'version': lock['version'], 'problems': problems}


def new_change(root, name):
    if not SLUG.fullmatch(name) or name == 'archive':
        raise HarnessError('Change ID must be a lowercase hyphenated slug, excluding archive')
    check_result = check(root)
    if check_result['status'] != 'ok':
        raise HarnessError('Fix installation drift before creating a change')
    folder = root / 'openspec' / 'changes' / name
    safe(root, f'openspec/changes/{name}/proposal.md')
    if folder.exists():
        raise HarnessError(f'Change already exists: {name}')
    mapping = {'proposal.md': 'proposal.md', 'design.md': 'design.md', 'tasks.md': 'tasks.md',
               'spec.md': 'specs/' + name + '/spec.md', '.openspec.yaml': '.openspec.yaml'}
    changes = {}
    for src, dest in mapping.items():
        # Use the pinned installed templates, not a different checkout's version.
        text = safe(root, '.harness/templates/openspec/' + src).read_text(encoding='utf-8')
        changes[f'openspec/changes/{name}/{dest}'] = text.replace('{{change_id}}', name).encode()
    with installation_guard(root):
        if folder.exists():
            raise HarnessError(f'Change already exists: {name}')
        transaction(root, changes)
    return {'status': 'ok', 'change': name, 'path': str(folder), 'note': 'Draft only; replace TODOs and validate with OpenSpec'}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    for cmd in ['init', 'update', 'check', 'doctor', 'new-change']:
        p = sub.add_parser(cmd)
        p.add_argument('--target', required=True, help='Existing project directory')
        if cmd in ('init', 'update'):
            p.add_argument('--source', default=str(SOURCE), help='Trusted local harness checkout')
            p.add_argument('--dry-run', action='store_true')
            p.add_argument('--allow-major', action='store_true')
        if cmd == 'init':
            p.add_argument('--adapters', help='Comma-separated adapter IDs')
        if cmd == 'new-change':
            p.add_argument('name')
    args = parser.parse_args(argv)
    try:
        root = target_root(args.target)
        if args.command in ('init', 'update'):
            source = target_root(args.source)
            if root == source or source in root.parents or root in source.parents:
                raise HarnessError('Source and target directories must not overlap')
            adapters = None
            if args.command == 'init' and args.adapters is not None:
                adapters = [x.strip() for x in args.adapters.split(',') if x.strip()]
            result = install(root, source, args.command, adapters, args.dry_run, args.allow_major)
        elif args.command == 'check':
            result = check(root)
        elif args.command == 'new-change':
            result = new_change(root, args.name)
        else:
            result = check(root)
            result['tools'] = {name: bool(shutil.which(name)) for name in ['git', 'python3', 'java', 'mvn', 'node', 'npm', 'openspec']}
            result['note'] = 'Tool presence only; no commands executed or compatibility claim made'
        print(json.dumps(result, indent=2, ensure_ascii=False))
        return 1 if result['status'] == 'error' else 0
    except (HarnessError, OSError, UnicodeError) as exc:
        print(json.dumps({'status': 'error', 'message': str(exc)}, ensure_ascii=False), file=sys.stderr)
        return 1


if __name__ == '__main__':
    raise SystemExit(main())
