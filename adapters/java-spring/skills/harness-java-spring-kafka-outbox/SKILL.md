---
name: harness-java-spring-kafka-outbox
description: Implement transactional event publication and deduplicating consumers.
---

# kafka-outbox

## Input
Event contract, transaction manager, broker delivery semantics and consumer retry policy.

## Procedure
1. Persist business state and outbox row in one database transaction.
2. Separate publication retries from request handling; handle crash after publish before marking sent.
3. Make consumers deduplicate using a durable event identity within the consuming transaction.
4. Test rollback, duplicate delivery, relay restart and poison-message behavior.

Use core TDD, debugging and review procedures for the common development lifecycle.

## Output
Outbox/consumer implementation, migration and failure-mode tests.

## Constraints
Do not claim exactly-once end-to-end delivery from Kafka producer settings alone.
