# Java / Spring Boot adapter

## Design authority
Actual host/user permissions apply. For design within its scope: approved SA/ADR decisions > existing project conventions > adapter defaults. Proposed technologies need alternatives, trade-offs and an owner decision before implementation; accepted choices are reused without asking again. Selecting this adapter does not select any infrastructure or pattern.

Read the actual build files, JDK toolchain, Spring BOM, database dialect and local conventions first.
Prefer the project's Maven/Gradle wrapper. No Spring, Java or dependency upgrades are implied by installation.

## Architecture
Use constructor injection and feature-oriented boundaries. Keep transport, application logic and persistence
separate where the project already does so. Do not mandate microservices or Modulith for every app.
For Modulith projects verify module dependencies; use public module APIs, not another module's internals.

## Correctness and data
Use explicit transaction boundaries. Test concurrent updates and idempotency for retried writes.
Use BigDecimal with an explicit rounding policy for money. Use Instant/offset-aware times and an explicit
business timezone. Avoid accidental N+1 queries and unbounded queries; define pagination and indexes.
For messaging or consistency changes, use approved SA contracts and existing project mechanisms. Do not select a messaging pattern from this adapter.
Retries require bounds and retryable error classification. Async work needs a managed executor.

## Contracts and security
Validate requests at the boundary and authorize both action and resource scope. Preserve established
API contracts. For a new API choose documented HTTP semantics and a consistent error representation.
Do not copy legacy HTTP-200-for-all-errors or fail-open auth behavior into a new project by default.
Migrations must match the actual database and deployment process; include compatibility and rollback.

## Verification
Use the existing JUnit stack. Use slice/unit tests for behavior and integration tests for database,
transaction and security semantics. Container-backed DB tests should use the deployed dialect where possible.
Run the declared build verification command, migration checks and boundary checks when applicable.
Tools/commands in adapter.yaml are examples for review, never automatically executed.

## Capability index

For API/data/transaction changes read rules/engineering.md selectively: transaction/concurrency,
idempotency, query/migration and real vendor-test evidence. No infrastructure choice is implied.

Read rules/conventions.md before coding, then relevant rules/architecture.md, rules/security.md,
rules/database.md and rules/performance.md. Project conventions take precedence over adapter defaults.
Use only relevant adapter skills listed in adapter.yaml; core TDD, debugging and review remain shared.
Review checks/verification.yaml before choosing commands. No check executes automatically.
