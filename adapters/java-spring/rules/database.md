# Persistence

Use the project's actual database dialect, migration tool and approved data contracts. Align Spring transaction boundaries with accepted business semantics; test rollback and concurrency where relevant. Ask only unresolved deployment/compatibility decisions before schema changes. Do not add a broker, event relay, cache, migration framework or transaction pattern from this adapter. SA assesses those options when requirements demand them.
