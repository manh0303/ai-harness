# Design
Use native ES modules with no runtime dependencies; npm bin points to a small executable entry point.
Resolve source from import.meta.url and target from cwd. Allow source under target/node_modules only
for the local-install case. Retain SHA-256 lock serialization compatible with Python 0.1. Use exclusive
markers, preflight and rollback on ordinary I/O failure. Test legacy snapshots and actual npm installs.
Maintain restricted publishConfig and a manual release procedure. No install hooks or network code.
