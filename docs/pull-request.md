# Replace Python installer with npm aih CLI

Consumers can install the packaged framework and run `aih init --adapters java-spring` inside their
project, without Python or an explicit --target. The CLI uses Node.js 22+ built-ins and preserves
schema-1 locks and user-owned content from Python 0.1 installations.

Includes global/local npm packaging, cwd/source resolution, help/version commands, migration guidance,
restricted publication defaults and Node 22/24 CI on Ubuntu/Windows. Old Python invocation paths are
removed; automation must switch to aih or node bin/aih.js. No package has been published to npm.

Validation: 37 tests, structural validation and actual offline npm tarball installation smoke tests
passed locally on Node 24.19.0. See PR checks for the remote matrix. Live LLM evaluations and consumer
application builds were not run. Human review/merge and any registry publication remain separate.
