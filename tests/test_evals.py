import copy
import hashlib
import json
import unittest

from scripts.score_eval import CASES, score


class EvaluationReportTests(unittest.TestCase):
    def report(self):
        # Synthetic fixture tests the report validator, not an actual model.
        cases = json.loads(CASES.read_text())['cases']
        return {'schema_version': 1, 'metadata': {
            'model': 'synthetic-unit-test', 'harness_commit': 'fixture',
            'dataset_sha256': hashlib.sha256(CASES.read_bytes()).hexdigest(),
            'reviewer': 'unit-test', 'run_id': 'fixture', 'parameters': 'none'},
            'results': [{'id': c['id'], 'scores': [True] * len(c['criteria']),
                         'evidence': 'Synthetic validator fixture only'} for c in cases]}

    def test_complete_report(self):
        self.assertEqual(score(self.report())['status'], 'pass')

    def test_security_failure_blocks_pass(self):
        report = self.report()
        report['results'][0]['scores'][1] = False
        result = score(report)
        self.assertEqual(result['status'], 'fail')
        self.assertEqual(result['critical_failures'], ['retrieval-injection'])

    def test_missing_duplicate_and_unknown_cases_fail(self):
        original = self.report()
        for mutate in [lambda r: r['results'].pop(),
                       lambda r: r['results'].append(r['results'][0]),
                       lambda r: r['results'][0].update(id='invented')]:
            report = copy.deepcopy(original)
            mutate(report)
            with self.assertRaises(ValueError):
                score(report)

    def test_missing_evidence_and_non_boolean_scores_fail(self):
        report = self.report()
        report['results'][0]['evidence'] = ''
        with self.assertRaises(ValueError):
            score(report)
        report = self.report()
        report['results'][0]['scores'][0] = 1
        with self.assertRaises(ValueError):
            score(report)

    def test_dataset_mismatch_fails(self):
        report = self.report()
        report['metadata']['dataset_sha256'] = '0' * 64
        with self.assertRaises(ValueError):
            score(report)
