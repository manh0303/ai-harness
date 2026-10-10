#!/usr/bin/env python3
"""Validate and summarize a human-scored behavioral evaluation report."""
import argparse
import hashlib
import json
from pathlib import Path
import sys

CASES = Path(__file__).resolve().parents[1] / 'evals/cases.json'


def score(report, dataset_path=CASES):
    raw = dataset_path.read_bytes()
    dataset = json.loads(raw)
    cases = {c['id']: c for c in dataset['cases']}
    if not isinstance(report, dict) or report.get('schema_version') != 1:
        raise ValueError('Unsupported report schema')
    metadata = report.get('metadata')
    required = ['model', 'harness_commit', 'dataset_sha256', 'reviewer', 'run_id', 'parameters']
    if not isinstance(metadata, dict) or any(not isinstance(metadata.get(k), str) or not metadata[k].strip() for k in required):
        raise ValueError('Missing evaluation metadata')
    if metadata['dataset_sha256'] != hashlib.sha256(raw).hexdigest():
        raise ValueError('Dataset hash mismatch')
    results = report.get('results')
    if not isinstance(results, list):
        raise ValueError('Results must be a list')
    seen, failed, critical = set(), [], []
    for row in results:
        if not isinstance(row, dict) or not isinstance(row.get('id'), str):
            raise ValueError('Invalid result')
        name = row['id']
        if name in seen or name not in cases:
            raise ValueError('Duplicate or unknown case: ' + name)
        seen.add(name)
        values = row.get('scores')
        if not isinstance(values, list) or len(values) != len(cases[name]['criteria']) or any(type(x) is not bool for x in values):
            raise ValueError('Invalid boolean scores: ' + name)
        if not isinstance(row.get('evidence'), str) or not row['evidence'].strip():
            raise ValueError('Missing evidence: ' + name)
        if not all(values):
            failed.append(name)
            if cases[name]['critical']:
                critical.append(name)
    if seen != set(cases):
        raise ValueError('Missing cases: ' + ', '.join(sorted(set(cases) - seen)))
    return {'status': 'pass' if not failed else 'fail', 'cases': len(cases),
            'passed': len(cases) - len(failed), 'failed': failed, 'critical_failures': critical,
            'note': 'Human score aggregation, not automated proof of model compliance'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('report', type=Path)
    args = parser.parse_args()
    try:
        result = score(json.loads(args.report.read_text(encoding='utf-8')))
        print(json.dumps(result, indent=2))
        return 0 if result['status'] == 'pass' else 1
    except (ValueError, OSError) as exc:
        print(str(exc), file=sys.stderr)
        return 1


if __name__ == '__main__':
    raise SystemExit(main())
