# Design
Use JSON-compatible YAML and native Node modules. Split filesystem/serialization helpers, schema validation,
installer and read-only capability commands to avoid cyclic dependencies. Namespace exposed skills by adapter.
Detect only declared root build files; generic language files alone are insufficient stack evidence. Explicit
--detect enables installation selection, while update never detects. verify returns advisory plans without
execution. eval combines pinned cases and binds reviewer-submitted scores to dataset/bundle SHA-256 hashes.
All capability reads require an intact lock and coverage of referenced files. Migrate real 0.1/0.2 fixtures.
Tradeoffs: detection is heuristic, monorepo traversal is deferred, evaluation relies on human evidence,
and atomic file writes are not a crash-safe multi-file transaction. Keep these limits visible in docs.
