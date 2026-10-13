---
name: harness-react-native-offline-sync
description: Implement offline state transitions and safe synchronization in React Native.
---

# offline-sync

## Input
Approved SA/ADR decisions for the affected scope, existing project conventions and actual stack versions. This skill implements accepted design; it does not select infrastructure, dependencies or architecture.
Offline UX, backend idempotency contract, local data policy and conflict rules.

## Procedure
1. Represent pending, syncing, successful and failed operations explicitly.
2. Assign stable operation identities for retries and isolate state by account.
3. Handle connectivity loss, app restart and concurrent server edits.
4. Test reconciliation and token expiry; record platform evidence and unavailable checks.

Use core TDD, debugging and review procedures for the common development lifecycle.

## Output
Offline flow, persistence changes and retry/conflict tests.

## Constraints
Do not silently resolve business conflicts or store credentials in ordinary local storage.
