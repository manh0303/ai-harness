# Verification evidence

0.3.0 candidate checked locally with Node.js 24.19.0 and npm 11.9.0.

| Check | Scope |
| --- | --- |
| npm test | 56 tests: installer, legacy migration, detection/schema, capability isolation and synthetic report validation |
| npm run validate | 4 adapters, 5 Core skills, 9 adapter skills, 86 managed files with all adapters |
| npm run test:package | Actual offline tarball global/local installs, detect, exposed skills, pinned verify/eval, OpenSpec templates |

Legacy fixtures are real synthetic Python 0.1 and npm 0.2 installations with their original hashes.
Migration tests preserve user notes, replace metadata, install skills, and refuse edited managed content.
Detection tests distinguish generic Java/Python and React Native/web, stay module-local and reject unsafe
or oversized probes. Capability tests reject drift, stale reports and unlocked injected metadata.

The GitHub matrix runs Node 22/24 on Ubuntu and Windows; the PR reports the final run status.
No reference CRM data, model credentials or live provider calls are used. Evaluation report unit tests
are synthetic and do not demonstrate model quality. No consumer Spring/React/native builds, upstream
OpenSpec CLI validation or independent security audit were performed. Verification plans never execute
application commands. Live behavioral evaluation remains a separately authorized, evidence-recorded activity.
