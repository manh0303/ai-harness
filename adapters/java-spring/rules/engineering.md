# Spring and database engineering depth

Apply only relevant sections with actual Spring/JPA/database versions and accepted design decisions.
Use Core TDD/debug/review; these instructions do not select infrastructure or introduce dependencies.

## API and security
Keep request/response DTOs, validation and error mapping consistent with existing public contracts.
Enforce action AND resource/tenant authorization; test unauthenticated, forbidden, cross-owner and
invalid input. Avoid leaking internal exception details; preserve agreed status/error contracts.
Pagination must have deterministic ordering and bounded size; handle timezone/precision explicitly.

## Transactions and concurrency
Document the business invariant, commit boundary and side effects. Check proxy/self-invocation,
propagation, rollback rules and exception behavior against the actual Spring version. Async execution
does not inherit a caller transaction by assumption. Avoid holding DB transactions over slow external
calls. Keep transaction scope minimal while preserving required atomicity.
For concurrent writes choose constraints, optimistic versions, atomic conditional updates or locks
from the actual invariant and contention, not a universal lock default. Demonstrate conflicting requests
with deterministic coordination and assert final state. Do not use sleeps as the only race control.
Retry only classified transient failures with bounded backoff/jitter when repeat is safe; PostgreSQL
serialization retries need the whole transaction retried, while other databases may differ.
Idempotency must define key scope, payload matching, durable uniqueness, result replay and in-flight/
failure/expiry behavior where applicable. Do not hide arbitrary exceptions with retries.

## Queries and migrations
Inspect generated SQL and representative query shape before claiming performance. Check N+1,
fetch/pagination interaction, unnecessary entity loading and index fit; use projections/batching only
when justified. Never assert speedups without measurements. Check vendor locking/isolation semantics.
Use migration tooling already present. Plan expand/backfill/contract where old/new app versions coexist;
assess table locks, null/default/unique constraints, rollback limitations and recovery. No production
migration runs or destructive test fixtures without explicit authority.

## Integration and operations
External calls need agreed timeout, retry ownership, duplicate/failure handling and redacted diagnostic
signals. If events already exist, assess producer/consumer commit boundaries, redelivery and ordering;
do not introduce Kafka/Outbox or Redis without an approved need.
Use existing unit/integration tooling; distinguish mocks from actual database/vendor tests. Embedded or
alternative engines do not prove Oracle/PostgreSQL-specific behavior. Record blocked vendor evidence.
