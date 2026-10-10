# npm CLI
## Why
Consumers need a directly invokable aih command, without installing Python or supplying --target each time.
## What changes
Distribute native Node.js CLI and all framework assets through an npm tarball. Preserve installed schema 1,
conflict refusal and user content. Replace Python invocation, document migration and private publication.
## Impact
Requires Node.js 22+. Existing Python-based automation must change its invocation. No automatic registry
publication, merge or consumer application changes.
