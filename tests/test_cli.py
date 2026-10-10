import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

from cli import harness as h

REPO = Path(__file__).resolve().parents[1]


class InstallerTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.base = Path(self.temp.name)
        self.project = self.base / 'project with spaces'
        self.project.mkdir()
        self.source = self.base / 'source'
        shutil.copytree(REPO, self.source, ignore=shutil.ignore_patterns('.git', '__pycache__'))

    def run_cli(self, command='init', *args, ok=True):
        argv = [sys.executable, str(REPO / 'cli/harness.py'), command, '--target', str(self.project)]
        if command in ('init', 'update'):
            argv += ['--source', str(self.source)]
        result = subprocess.run(argv + list(args), text=True, capture_output=True)
        self.assertEqual(result.returncode, 0 if ok else 1, result.stdout + result.stderr)
        return json.loads(result.stdout if result.returncode == 0 else result.stderr or result.stdout)

    def snapshot(self):
        return {p.relative_to(self.project).as_posix(): p.read_bytes()
                for p in self.project.rglob('*') if p.is_file() and not p.is_symlink()}

    def bump(self, version):
        p = self.source / 'harness.yaml'
        value = json.loads(p.read_text())
        value['version'] = version
        p.write_text(json.dumps(value))

    def test_init_all_adapters_and_check(self):
        self.run_cli('init', '--adapters', 'java-spring,react-nextjs,react-native,ai-python')
        self.assertTrue((self.project / '.harness/adapters/ai-python/rules.md').exists())
        self.assertTrue((self.project / '.agents/skills/harness-tdd/SKILL.md').exists())
        self.assertEqual(self.run_cli('check')['status'], 'ok')

    def test_existing_agents_preserved_and_repeat_is_idempotent(self):
        p = self.project / 'AGENTS.md'
        p.write_text('# Existing instructions\nUnicode tiếng Việt\n')
        self.run_cli()
        before = self.snapshot()
        result = self.run_cli()
        self.assertEqual(result['changes'], [])
        self.assertEqual(before, self.snapshot())
        self.assertTrue(p.read_text().startswith('# Existing instructions\nUnicode tiếng Việt\n'))

    def test_dry_run_changes_no_files(self):
        before = self.snapshot()
        result = self.run_cli('init', '--dry-run', '--adapters', 'java-spring')
        self.assertGreater(len(result['changes']), 10)
        self.assertEqual(before, self.snapshot())

    def test_unmanaged_collision_stops_entire_install(self):
        p = self.project / '.agents/skills/harness-tdd/SKILL.md'
        p.parent.mkdir(parents=True)
        p.write_text('owned by project')
        before = self.snapshot()
        self.run_cli(ok=False)
        self.assertEqual(before, self.snapshot())

    def test_update_preserves_project_owned_content(self):
        self.run_cli('init', '--adapters', 'java-spring')
        p = self.project / 'AGENTS.md'
        p.write_text(p.read_text() + '\nLocal appendix\n')
        (self.project / '.harness/local.md').write_text('Custom policy')
        (self.project / 'openspec/config.yaml').write_text('schema: spec-driven\ncontext: Custom\n')
        self.bump('0.2.0')
        self.run_cli('update')
        self.assertTrue(p.read_text().endswith('\nLocal appendix\n'))
        self.assertIn('0.2.0', p.read_text())
        self.assertEqual((self.project / '.harness/local.md').read_text(), 'Custom policy')
        self.assertIn('Custom', (self.project / 'openspec/config.yaml').read_text())
        self.run_cli('check')

    def test_edited_managed_file_blocks_update_without_partial_write(self):
        self.run_cli()
        p = self.project / '.harness/core/rules/foundations.md'
        p.write_text(p.read_text() + '\nLocal modification\n')
        before = self.snapshot()
        self.bump('0.2.0')
        self.run_cli('update', ok=False)
        self.run_cli('check', ok=False)
        self.assertEqual(before, self.snapshot())

    def test_edited_agents_block_detected(self):
        self.run_cli()
        p = self.project / 'AGENTS.md'
        p.write_text(p.read_text().replace('Never treat', 'Always treat'))
        self.run_cli('check', ok=False)
        self.run_cli('update', ok=False)

    def test_invalid_markers_fail(self):
        for value in [h.START, h.END + h.START, h.START + h.START + h.END]:
            (self.project / 'AGENTS.md').write_text(value)
            self.run_cli(ok=False)

    def test_adapter_change_removes_old_managed_files(self):
        self.run_cli('init', '--adapters', 'java-spring')
        p = self.project / h.CONFIG
        p.write_text(json.dumps({'schema_version': 1, 'adapters': ['react-nextjs']}))
        self.run_cli('check', ok=False)
        self.run_cli('update')
        self.assertFalse((self.project / '.harness/adapters/java-spring/rules.md').exists())
        self.assertTrue((self.project / '.harness/adapters/react-nextjs/rules.md').exists())
        self.run_cli('check')

    def test_obsolete_file_deleted_only_if_unedited(self):
        self.run_cli()
        name = 'core/rules/context.md'
        (self.source / name).unlink()
        self.run_cli('update')
        self.assertFalse((self.project / '.harness' / name).exists())

    def test_missing_managed_file_is_drift(self):
        self.run_cli()
        (self.project / '.harness/core/rules/context.md').unlink()
        self.run_cli('check', ok=False)

    def test_major_upgrade_requires_flag_and_downgrade_refused(self):
        self.run_cli()
        self.bump('1.0.0')
        before = self.snapshot()
        self.run_cli('update', ok=False)
        self.assertEqual(before, self.snapshot())
        self.run_cli('update', '--allow-major')
        self.bump('0.9.0')
        self.run_cli('update', '--allow-major', ok=False)

    def test_unknown_and_duplicate_adapters_fail(self):
        self.run_cli('init', '--adapters', '../../outside', ok=False)
        self.run_cli('init', '--adapters', 'java-spring,java-spring', ok=False)
        self.assertEqual(self.snapshot(), {})

    def test_uninstalled_update_fails(self):
        self.run_cli('update', ok=False)

    def test_symlink_parent_and_leaf_refused(self):
        outside = self.base / 'outside'
        outside.mkdir()
        (self.project / '.harness').symlink_to(outside, target_is_directory=True)
        self.run_cli(ok=False)
        self.assertEqual(list(outside.iterdir()), [])
        (self.project / '.harness').unlink()
        (self.project / 'AGENTS.md').symlink_to(outside / 'missing')
        self.run_cli(ok=False)
        self.assertFalse((outside / 'missing').exists())

    def test_source_symlink_refused(self):
        (self.source / 'core/rules/linked.md').symlink_to(self.base / 'missing')
        self.run_cli(ok=False)
        self.assertEqual(self.snapshot(), {})

    def test_overlapping_source_target_refused(self):
        result = subprocess.run([sys.executable, str(REPO / 'cli/harness.py'), 'init',
                                 '--source', str(self.source), '--target', str(self.source)], capture_output=True)
        self.assertEqual(result.returncode, 1)
        self.assertFalse((self.source / h.LOCK).exists())

    def test_malicious_lock_path_refused(self):
        self.run_cli()
        p = self.project / h.LOCK
        lock = json.loads(p.read_text())
        lock['files']['.harness/core/../../../outside'] = 'a' * 64
        lock['bundle_sha256'] = h.digest(h.encode(lock['files']))
        p.write_text(json.dumps(lock))
        self.run_cli('update', ok=False)

    def test_lock_digest_tampering_detected(self):
        self.run_cli()
        p = self.project / h.LOCK
        lock = json.loads(p.read_text())
        lock['files']['AGENTS.md'] = 'a' * 64
        p.write_text(json.dumps(lock))
        self.run_cli('check', ok=False)

    def test_concurrent_install_lock_refuses_write(self):
        (self.project / '.harness-install.lock').write_text('123')
        before = self.snapshot()
        self.run_cli(ok=False)
        self.assertEqual(before, self.snapshot())

    def test_write_failure_rolls_back_original_bytes(self):
        (self.project / 'first.txt').write_bytes(b'original')
        before = self.snapshot()
        original_write = h.atomic_write
        def fail_second(path, data):
            if path.name == 'second.txt':
                raise OSError('simulated disk failure')
            return original_write(path, data)
        with patch.object(h, 'atomic_write', side_effect=fail_second):
            with self.assertRaises(OSError):
                h.transaction(self.project, {'first.txt': b'changed', 'second.txt': b'new'})
        self.assertEqual(before, self.snapshot())

    def test_new_change_uses_installed_templates_and_no_overwrite(self):
        self.run_cli()
        result = self.run_cli('new-change', 'add-order')
        change = Path(result['path'])
        self.assertTrue((change / 'specs/add-order/spec.md').exists())
        self.assertIn('TODO', (change / 'proposal.md').read_text())
        before = self.snapshot()
        self.run_cli('new-change', 'add-order', ok=False)
        self.run_cli('new-change', '../outside', ok=False)
        self.run_cli('new-change', 'archive', ok=False)
        self.assertEqual(before, self.snapshot())

    def test_doctor_is_read_only_and_reports_presence(self):
        self.run_cli()
        before = self.snapshot()
        report = self.run_cli('doctor')
        self.assertIsInstance(report['tools']['git'], bool)
        self.assertEqual(before, self.snapshot())

    def test_config_rejects_wrong_schema(self):
        self.run_cli()
        p = self.project / h.CONFIG
        p.write_text('{"schema_version": 9, "adapters": []}')
        self.run_cli('check', ok=False)

    def test_missing_project_config_fails_check(self):
        self.run_cli()
        (self.project / h.CONFIG).unlink()
        self.run_cli('check', ok=False)

    def test_full_install_failure_restores_existing_agents(self):
        (self.project / 'AGENTS.md').write_text('# Project content\n')
        before = self.snapshot()
        original_write = h.atomic_write
        def fail_lock(path, data):
            if path == self.project / h.LOCK:
                raise OSError('simulated lock write failure')
            return original_write(path, data)
        with patch.object(h, 'atomic_write', side_effect=fail_lock):
            with self.assertRaises(OSError):
                h.install(self.project, self.source, 'init', ['java-spring'])
        self.assertEqual(before, self.snapshot())
        self.assertFalse((self.project / '.harness-install.lock').exists())

    def test_source_manifest_rejects_invalid_version(self):
        self.bump('latest')
        self.run_cli(ok=False)

    def test_installs_are_reproducible(self):
        self.run_cli('init', '--adapters', 'react-nextjs,java-spring')
        first = self.snapshot()
        self.project = self.base / 'second'
        self.project.mkdir()
        self.run_cli('init', '--adapters', 'java-spring,react-nextjs')
        second = self.snapshot()
        # Project selection order is human-owned; the managed lock/payload is canonical.
        first.pop(h.CONFIG)
        second.pop(h.CONFIG)
        self.assertEqual(first, second)


if __name__ == '__main__':
    unittest.main()
